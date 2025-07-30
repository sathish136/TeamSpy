using System.Diagnostics;
using System.Management;
using System.Runtime.InteropServices;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using WorkView.Agent.Models;
using WorkView.Agent.Utils;

namespace WorkView.Agent.Services;

public class MonitoringService : BackgroundService
{
    private readonly IWorkViewApiClient _apiClient;
    private readonly ILogger<MonitoringService> _logger;
    private readonly MonitoringConfiguration _config;
    private readonly SystemInfo _systemInfo;
    
    // Monitoring state
    private readonly HashSet<string> _runningProcesses = new();
    private readonly Dictionary<string, DateTime> _applicationStartTimes = new();
    private DateTime _lastHeartbeat = DateTime.MinValue;
    private DateTime _lastScreenshot = DateTime.MinValue;

    public MonitoringService(
        IWorkViewApiClient apiClient, 
        ILogger<MonitoringService> logger,
        MonitoringConfiguration config)
    {
        _apiClient = apiClient;
        _logger = logger;
        _config = config;
        _systemInfo = new SystemInfo();
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("WorkView Agent v{Version} starting monitoring...", _systemInfo.AgentVersion);
        _logger.LogInformation("Employee ID: {EmployeeId}", _config.EmployeeId);
        _logger.LogInformation("Computer: {ComputerName} ({OS})", _systemInfo.ComputerName, _systemInfo.OperatingSystem);
        _logger.LogInformation("Server: {ServerUrl}", _config.ServerUrl);

        // Log initial session
        await LogSessionEvent("login", new Dictionary<string, object>
        {
            ["os"] = _systemInfo.OperatingSystem,
            ["agent_version"] = _systemInfo.AgentVersion,
            ["startup_time"] = DateTime.Now
        });

        // Update employee status
        await UpdateEmployeeStatus("online");

        // Start monitoring tasks
        var tasks = new List<Task>
        {
            MonitorApplicationsAsync(stoppingToken),
            MonitorNetworkAsync(stoppingToken),
            RunPeriodicTasksAsync(stoppingToken)
        };

        if (_config.FileMonitoringEnabled)
        {
            tasks.Add(MonitorFileSystemAsync(stoppingToken));
        }

        if (_config.ScreenshotEnabled)
        {
            tasks.Add(TakePeriodicScreenshotsAsync(stoppingToken));
        }

        if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
        {
            tasks.Add(MonitorWindowsEventsAsync(stoppingToken));
        }

        try
        {
            await Task.WhenAll(tasks);
        }
        catch (OperationCanceledException)
        {
            _logger.LogInformation("Monitoring service stopped.");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Monitoring service error: {Message}", ex.Message);
        }
        finally
        {
            await LogSessionEvent("logout", new Dictionary<string, object>
            {
                ["shutdown_time"] = DateTime.Now
            });
            await UpdateEmployeeStatus("offline");
        }
    }

    private async Task MonitorApplicationsAsync(CancellationToken cancellationToken)
    {
        while (!cancellationToken.IsCancellationRequested)
        {
            try
            {
                var currentProcesses = new HashSet<string>();
                
                foreach (var process in Process.GetProcesses())
                {
                    try
                    {
                        if (!string.IsNullOrEmpty(process.ProcessName))
                        {
                            currentProcesses.Add(process.ProcessName);
                        }
                    }
                    catch (Exception ex)
                    {
                        _logger.LogDebug("Error reading process {ProcessId}: {Message}", process.Id, ex.Message);
                    }
                }

                // Detect new applications
                var newProcesses = currentProcesses.Except(_runningProcesses);
                foreach (var processName in newProcesses)
                {
                    _applicationStartTimes[processName] = DateTime.Now;
                    await LogApplicationEvent(processName, "open");
                }

                // Detect closed applications
                var closedProcesses = _runningProcesses.Except(currentProcesses);
                foreach (var processName in closedProcesses)
                {
                    if (_applicationStartTimes.TryGetValue(processName, out var startTime))
                    {
                        var duration = (int)(DateTime.Now - startTime).TotalSeconds;
                        await LogApplicationEvent(processName, "close", duration: duration);
                        _applicationStartTimes.Remove(processName);
                    }
                    else
                    {
                        await LogApplicationEvent(processName, "close");
                    }
                }

                _runningProcesses.Clear();
                foreach (var process in currentProcesses)
                {
                    _runningProcesses.Add(process);
                }

                await Task.Delay(TimeSpan.FromSeconds(_config.AppCheckInterval), cancellationToken);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Application monitoring error: {Message}", ex.Message);
                await Task.Delay(TimeSpan.FromSeconds(_config.AppCheckInterval), cancellationToken);
            }
        }
    }

    private async Task MonitorNetworkAsync(CancellationToken cancellationToken)
    {
        if (!_config.NetworkMonitoringEnabled)
            return;

        while (!cancellationToken.IsCancellationRequested)
        {
            try
            {
                // Network monitoring implementation would go here
                // This is a simplified version - in production you'd use libraries like 
                // WinPcap, SharpPcap, or WMI for detailed network monitoring
                
                await Task.Delay(TimeSpan.FromMinutes(1), cancellationToken);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Network monitoring error: {Message}", ex.Message);
                await Task.Delay(TimeSpan.FromMinutes(1), cancellationToken);
            }
        }
    }

    private async Task MonitorFileSystemAsync(CancellationToken cancellationToken)
    {
        try
        {
            var watchers = new List<FileSystemWatcher>();
            
            // Monitor common directories
            var pathsToMonitor = new[]
            {
                Environment.GetFolderPath(Environment.SpecialFolder.Desktop),
                Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments),
                Environment.GetFolderPath(Environment.SpecialFolder.DesktopDirectory)
            };

            foreach (var path in pathsToMonitor.Where(Directory.Exists))
            {
                var watcher = new FileSystemWatcher(path)
                {
                    IncludeSubdirectories = true,
                    NotifyFilter = NotifyFilters.FileName | NotifyFilters.CreationTime | NotifyFilters.LastWrite
                };

                watcher.Created += async (sender, e) => await LogFileActivity(e.FullPath, "create");
                watcher.Deleted += async (sender, e) => await LogFileActivity(e.FullPath, "delete");
                watcher.Changed += async (sender, e) => await LogFileActivity(e.FullPath, "modify");

                watcher.EnableRaisingEvents = true;
                watchers.Add(watcher);
            }

            // Keep watchers alive
            await Task.Delay(-1, cancellationToken);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "File system monitoring error: {Message}", ex.Message);
        }
    }

    private async Task TakePeriodicScreenshotsAsync(CancellationToken cancellationToken)
    {
        while (!cancellationToken.IsCancellationRequested)
        {
            try
            {
                if (DateTime.Now - _lastScreenshot >= TimeSpan.FromSeconds(_config.ScreenshotInterval))
                {
                    await CaptureScreenshot();
                    _lastScreenshot = DateTime.Now;
                }

                await Task.Delay(TimeSpan.FromSeconds(30), cancellationToken);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Screenshot monitoring error: {Message}", ex.Message);
                await Task.Delay(TimeSpan.FromSeconds(30), cancellationToken);
            }
        }
    }

    private async Task MonitorWindowsEventsAsync(CancellationToken cancellationToken)
    {
        if (!RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
            return;

        try
        {
            // Monitor Windows events using WMI
            var query = new WqlEventQuery("SELECT * FROM Win32_LogonSession");
            using var watcher = new ManagementEventWatcher(query);
            
            watcher.EventArrived += async (sender, e) =>
            {
                await LogSessionEvent("login", new Dictionary<string, object>
                {
                    ["wmi_event"] = true,
                    ["event_time"] = DateTime.Now
                });
            };

            watcher.Start();
            await Task.Delay(-1, cancellationToken);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Windows events monitoring error: {Message}", ex.Message);
        }
    }

    private async Task RunPeriodicTasksAsync(CancellationToken cancellationToken)
    {
        while (!cancellationToken.IsCancellationRequested)
        {
            try
            {
                // Send heartbeat
                if (DateTime.Now - _lastHeartbeat >= TimeSpan.FromSeconds(_config.HeartbeatInterval))
                {
                    await UpdateEmployeeStatus("online");
                    _lastHeartbeat = DateTime.Now;
                }

                await Task.Delay(TimeSpan.FromSeconds(10), cancellationToken);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Periodic tasks error: {Message}", ex.Message);
                await Task.Delay(TimeSpan.FromSeconds(10), cancellationToken);
            }
        }
    }

    private async Task LogSessionEvent(string sessionType, Dictionary<string, object>? metadata = null)
    {
        var sessionEvent = new SessionEvent
        {
            EmployeeId = _config.EmployeeId,
            SessionType = sessionType,
            ComputerName = _systemInfo.ComputerName,
            IpAddress = _systemInfo.IpAddress,
            Metadata = metadata
        };

        await _apiClient.SendSessionEventAsync(sessionEvent);
    }

    private async Task LogApplicationEvent(string appName, string action, string? windowTitle = null, int? duration = null)
    {
        var applicationEvent = new ApplicationEvent
        {
            EmployeeId = _config.EmployeeId,
            ApplicationName = appName,
            Action = action,
            WindowTitle = windowTitle,
            Duration = duration,
            Category = CategoryHelper.CategorizeApplication(appName)
        };

        await _apiClient.SendApplicationEventAsync(applicationEvent);
    }

    private async Task LogFileActivity(string filePath, string action)
    {
        try
        {
            var fileInfo = new FileInfo(filePath);
            var fileActivity = new FileActivityEvent
            {
                EmployeeId = _config.EmployeeId,
                FilePath = filePath,
                FileName = Path.GetFileName(filePath),
                Action = action,
                FileSize = fileInfo.Exists ? fileInfo.Length : null,
                FileType = Path.GetExtension(filePath),
                RiskLevel = RiskAssessment.AssessFileRisk(filePath, action)
            };

            await _apiClient.SendFileActivityEventAsync(fileActivity);
        }
        catch (Exception ex)
        {
            _logger.LogDebug("Error logging file activity for {FilePath}: {Message}", filePath, ex.Message);
        }
    }

    private async Task CaptureScreenshot()
    {
        try
        {
            var timestamp = DateTime.Now.ToString("yyyyMMdd_HHmmss");
            var fileName = $"screenshot_{_config.EmployeeId}_{timestamp}.png";
            var filePath = Path.Combine(Path.GetTempPath(), "WorkViewScreenshots", fileName);
            
            // Ensure directory exists
            Directory.CreateDirectory(Path.GetDirectoryName(filePath)!);

            // Take screenshot using System.Drawing
            var bounds = System.Windows.Forms.Screen.PrimaryScreen.Bounds;
            using var bitmap = new System.Drawing.Bitmap(bounds.Width, bounds.Height);
            using var graphics = System.Drawing.Graphics.FromImage(bitmap);
            
            graphics.CopyFromScreen(bounds.X, bounds.Y, 0, 0, bounds.Size);
            bitmap.Save(filePath, System.Drawing.Imaging.ImageFormat.Png);

            var fileInfo = new FileInfo(filePath);
            var screenshotEvent = new ScreenshotEvent
            {
                EmployeeId = _config.EmployeeId,
                FilePath = filePath,
                FileName = fileName,
                ScreenNumber = 1,
                FileSize = fileInfo.Length,
                Metadata = new Dictionary<string, object>
                {
                    ["resolution"] = $"{bounds.Width}x{bounds.Height}",
                    ["timestamp"] = timestamp
                }
            };

            await _apiClient.SendScreenshotEventAsync(screenshotEvent);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Screenshot capture error: {Message}", ex.Message);
        }
    }

    private async Task UpdateEmployeeStatus(string status)
    {
        var statusUpdate = new EmployeeStatusUpdate
        {
            Status = status,
            LastActive = DateTime.Now,
            ComputerName = _systemInfo.ComputerName,
            IpAddress = _systemInfo.IpAddress,
            AgentVersion = _systemInfo.AgentVersion,
            OperatingSystem = _systemInfo.OperatingSystem
        };

        await _apiClient.UpdateEmployeeStatusAsync(_config.EmployeeId, statusUpdate);
    }
}