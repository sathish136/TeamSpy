using Microsoft.Win32;

namespace TeamSpy.Agent
{
    class Program
    {
        private static DatabaseManager? _dbManager;
        private static ApiClient? _apiClient;
        private static Timer? _heartbeatTimer;

        static async Task Main(string[] args)
        {
            // Configuration - you can modify these values
            string serverUrl = "http://localhost:5000";  // Change to your WorkView server URL
            string employeeId = "emp_001";  // Change to unique employee ID
            
            // Override from command line if provided
            if (args.Length >= 2)
            {
                serverUrl = args[0];
                employeeId = args[1];
            }

            Console.WriteLine("Starting WorkView Agent for monitoring...");
            Console.WriteLine($"Server: {serverUrl}");
            Console.WriteLine($"Employee ID: {employeeId}");

            // Initialize API client
            _apiClient = new ApiClient(serverUrl, employeeId);
            
            // Register agent with server
            bool registered = await _apiClient.RegisterAgent();
            if (!registered)
            {
                Console.WriteLine("Failed to register agent. Continuing with local monitoring only.");
            }

            // Start heartbeat timer (every 30 seconds)
            _heartbeatTimer = new Timer(async _ => await _apiClient?.SendHeartbeat(), null, TimeSpan.Zero, TimeSpan.FromSeconds(30));

            _dbManager = new DatabaseManager("monitoring.db");

            if (args.Length > 2 && args[2].StartsWith("--report"))
            {
                HandleReportGeneration(args[2..]);
                return;
            }

            var appTracker = new ApplicationTracker(_dbManager, _apiClient);
            var webMonitor = new WebsiteMonitor(_dbManager, _apiClient);
            var keyLogger = new KeyLogger(_dbManager);
            var clipboardMonitor = new ClipboardMonitor(_dbManager);
            var fileAccessMonitor = new FileAccessMonitor(_dbManager, _apiClient);
            var communicationMonitor = new CommunicationMonitor(_dbManager);
            var networkMonitor = new NetworkMonitor(_dbManager);

            // Start Session Monitoring
            SystemEvents.SessionSwitch += new SessionSwitchEventHandler(SystemEvents_SessionSwitch);

            // Log initial login session
            await _apiClient?.LogSession("login", new { startup_time = DateTime.Now });

            appTracker.Start();
            webMonitor.Start();
            keyLogger.Start();
            clipboardMonitor.Start();
            fileAccessMonitor.Start();
            communicationMonitor.Start();
            networkMonitor.Start();

            Console.WriteLine("WorkView Agent is running. Press Enter to exit.");
            Console.ReadLine(); // Keep the agent running

            // Stop services gracefully
            await _apiClient?.LogSession("logout", new { shutdown_time = DateTime.Now });
            
            _heartbeatTimer?.Dispose();
            networkMonitor.Stop();
            communicationMonitor.Stop();
            fileAccessMonitor.Stop();
            clipboardMonitor.Stop();
            keyLogger.Stop();
            webMonitor.Stop();
            appTracker.Stop();
            SystemEvents.SessionSwitch -= new SessionSwitchEventHandler(SystemEvents_SessionSwitch);
            _apiClient?.Dispose();
            Console.WriteLine("WorkView Agent stopped.");
        }

        static async void SystemEvents_SessionSwitch(object sender, SessionSwitchEventArgs e)
        {
            if (_dbManager != null)
            {
                _dbManager.LogSessionEvent(DateTime.Now, e.Reason.ToString());
            }
            
            // Also send to API
            if (_apiClient != null)
            {
                string sessionType = e.Reason.ToString().ToLower();
                await _apiClient.LogSession(sessionType, new { reason = e.Reason.ToString() });
            }
        }

        private static void HandleReportGeneration(string[] args)
        {
            if (_dbManager == null) return;

            switch (args[0].ToLower())
            {
                case "--report-web":
                    _dbManager.GenerateWebUsageReport();
                    break;
                case "--report-app":
                    _dbManager.GenerateAppUsageReport();
                    break;
                case "--report-session":
                    _dbManager.GenerateSessionReport();
                    break;
                case "--report-keys":
                    _dbManager.GenerateKeyReport();
                    break;
                case "--report-clipboard":
                    _dbManager.GenerateClipboardReport();
                    break;
                case "--report-file-access":
                    _dbManager.GenerateFileAccessReport();
                    break;
                case "--report-communication":
                    _dbManager.GenerateCommunicationReport();
                    break;
                case "--report-network":
                    _dbManager.GenerateNetworkReport();
                    break;
                default:
                    Console.WriteLine("Invalid report type specified.");
                    break;
            }
        }
    }
}
