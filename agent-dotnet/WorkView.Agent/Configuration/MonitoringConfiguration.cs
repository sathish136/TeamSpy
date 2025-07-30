namespace WorkView.Agent.Utils;

public class MonitoringConfiguration
{
    public string ServerUrl { get; set; } = string.Empty;
    public string EmployeeId { get; set; } = string.Empty;
    public string? ApiKey { get; set; }

    // Monitoring flags
    public bool MonitoringEnabled { get; set; } = true;
    public bool KeystrokeLoggingEnabled { get; set; } = false; // Requires explicit consent
    public bool ScreenshotEnabled { get; set; } = true;
    public bool FileMonitoringEnabled { get; set; } = true;
    public bool NetworkMonitoringEnabled { get; set; } = true;
    public bool ClipboardMonitoringEnabled { get; set; } = true;
    public bool PrintMonitoringEnabled { get; set; } = true;
    public bool CommunicationMonitoringEnabled { get; set; } = true;

    // Data collection intervals (seconds)
    public int HeartbeatInterval { get; set; } = 30;
    public int ScreenshotInterval { get; set; } = 300; // 5 minutes
    public int AppCheckInterval { get; set; } = 10;
    public int NetworkCheckInterval { get; set; } = 60;
    public int FileWatcherInterval { get; set; } = 5;

    // File monitoring settings
    public List<string> MonitoredDirectories { get; set; } = new();
    public List<string> ExcludedExtensions { get; set; } = new();
    public bool MonitorSubdirectories { get; set; } = true;

    // Screenshot settings
    public int ScreenshotQuality { get; set; } = 85; // JPEG quality 1-100
    public bool CompressScreenshots { get; set; } = true;
    public int MaxScreenshotSize { get; set; } = 1920; // Max width/height in pixels

    // Network monitoring settings
    public List<string> TrustedDomains { get; set; } = new();
    public List<int> MonitoredPorts { get; set; } = new();
    public bool LogInternalTraffic { get; set; } = false;

    // Risk assessment settings
    public List<string> HighRiskExtensions { get; set; } = new();
    public List<string> BlockedApplications { get; set; } = new();
    public List<string> SensitivePaths { get; set; } = new();

    // Alert settings
    public bool EnableRealTimeAlerts { get; set; } = true;
    public int AlertThrottleSeconds { get; set; } = 60;
    public List<string> AlertRecipients { get; set; } = new();

    public void SetDefaults()
    {
        if (!MonitoredDirectories.Any())
        {
            MonitoredDirectories.AddRange(new[]
            {
                Environment.GetFolderPath(Environment.SpecialFolder.Desktop),
                Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments),
                Environment.GetFolderPath(Environment.SpecialFolder.UserProfile)
            });
        }

        if (!ExcludedExtensions.Any())
        {
            ExcludedExtensions.AddRange(new[]
            {
                ".tmp", ".log", ".cache", ".temp", ".bak", ".swp", ".~"
            });
        }

        if (!TrustedDomains.Any())
        {
            TrustedDomains.AddRange(new[]
            {
                "microsoft.com", "office.com", "office365.com", "github.com",
                "stackoverflow.com", "google.com"
            });
        }

        if (!HighRiskExtensions.Any())
        {
            HighRiskExtensions.AddRange(new[]
            {
                ".exe", ".bat", ".cmd", ".ps1", ".vbs", ".js", ".jar", ".msi"
            });
        }
    }
}