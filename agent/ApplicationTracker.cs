using System;
using System.Diagnostics;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading;

namespace TeamSpy.Agent
{
    public class ApplicationTracker
    {
        private System.Threading.Timer? _timer;
        private string _lastWindowTitle = string.Empty;
        private string _lastProcessName = string.Empty;
        private DateTime _startTime;
        private readonly DatabaseManager _dbManager;

        [DllImport("user32.dll")]
        private static extern IntPtr GetForegroundWindow();

        [DllImport("user32.dll")]
        private static extern int GetWindowText(IntPtr hWnd, StringBuilder text, int count);

        [DllImport("user32.dll", SetLastError = true)]
        private static extern uint GetWindowThreadProcessId(IntPtr hWnd, out uint processId);

        public ApplicationTracker(DatabaseManager dbManager)
        {
            _dbManager = dbManager;
        }

        public void Start()
        {
            Console.WriteLine("Starting Application Tracker...");
            _timer = new System.Threading.Timer(Track, null, 0, 1000); // Check every second
        }

        private void Track(object? state)
        {
            try
            {
                IntPtr handle = GetForegroundWindow();
                if (handle == IntPtr.Zero) return;

                GetWindowThreadProcessId(handle, out uint processId);
                if (processId == 0) return;

                Process p = Process.GetProcessById((int)processId);
                if (p == null) return;

                string currentWindowTitle = p.MainWindowTitle;
                if (string.IsNullOrEmpty(currentWindowTitle))
                {
                    currentWindowTitle = p.ProcessName;
                }

                if (currentWindowTitle != _lastWindowTitle)
                {
                    if (!string.IsNullOrEmpty(_lastWindowTitle))
                    {
                        if (_startTime != default)
                        {
                            _dbManager.LogAppUsage(DateTime.Now, _lastProcessName, _lastWindowTitle, (int)(DateTime.Now - _startTime).TotalSeconds);
                        }
                    }

                    _lastWindowTitle = currentWindowTitle;
                    _lastProcessName = p.ProcessName;
                    _startTime = DateTime.Now;

                    Console.WriteLine($"{DateTime.Now}: Switched to '{p.ProcessName}' - '{currentWindowTitle}'");
                }
            }
            catch (Exception) { /* Ignore errors */ }
        }

        private void LogApplicationUsage()
        {
            TimeSpan duration = DateTime.Now - _startTime;
            if (duration.TotalSeconds > 1 && !string.IsNullOrEmpty(_lastWindowTitle))
            {
                Console.WriteLine($"{DateTime.Now}: Used '{_lastWindowTitle}' for {duration.TotalSeconds:F0} seconds");
                _dbManager.LogAppUsage(DateTime.Now, _lastProcessName, _lastWindowTitle, (int)duration.TotalSeconds);
            }
        }

        public void Stop()
        {
            _timer?.Change(Timeout.Infinite, 0);
            LogApplicationUsage(); // Log usage for the last active application
            Console.WriteLine("Stopped Application Tracker.");
        }
    }
}
