using System;
using System.Diagnostics;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading;
using System.Windows.Automation;
using TeamSpy.Agent;

namespace TeamSpy.Agent
{
    public class WebsiteMonitor
    {
        private System.Threading.Timer? _timer;
        private string _lastUrl = string.Empty;
        private DateTime _startTime;
        private readonly DatabaseManager _dbManager;

        [DllImport("user32.dll")]
        private static extern IntPtr GetForegroundWindow();

        [DllImport("user32.dll", SetLastError = true)]
        private static extern uint GetWindowThreadProcessId(IntPtr hWnd, out uint processId);

        public WebsiteMonitor(DatabaseManager dbManager)
        {
            _dbManager = dbManager;
        }

        public void Start()
        {
            Console.WriteLine("Starting Website Monitor...");
            _timer = new System.Threading.Timer(Monitor, null, 0, 2000); // Check every 2 seconds
        }

        private void Monitor(object? state)
        {
            try
            {
                IntPtr handle = GetForegroundWindow();
                if (handle == IntPtr.Zero) return; // No foreground window

                GetWindowThreadProcessId(handle, out uint processId);
                if (processId == 0) return;

                Process p = Process.GetProcessById((int)processId);
                if (p == null) return;

                string processName = p.ProcessName.ToLower();
                if (processName == "chrome" || processName == "msedge" || processName == "firefox")
                {
                    string? url = GetBrowserUrl(p);
                    if (!string.IsNullOrEmpty(url) && url != _lastUrl)
                    {
                        if (_startTime != default && !string.IsNullOrEmpty(_lastUrl))
                        {
                            _dbManager.LogWebUsage(DateTime.Now, _lastUrl, (int)(DateTime.Now - _startTime).TotalSeconds);
                        }
                        _lastUrl = url;
                        _startTime = DateTime.Now;
                        Console.WriteLine($"{DateTime.Now}: Navigated to '{url}'");
                    }
                }
                else
                {
                    // If the foreground window is not a browser, log the end of the last website visit.
                    if (_startTime != default && !string.IsNullOrEmpty(_lastUrl))
                    {
                        _dbManager.LogWebUsage(DateTime.Now, _lastUrl, (int)(DateTime.Now - _startTime).TotalSeconds);
                    }
                    _lastUrl = string.Empty;
                }
            }
            catch (Exception)
            {
                // Ignore exceptions that can occur when a process closes unexpectedly.
            }
        }

        private string? GetBrowserUrl(Process process)
        {
            if (process == null || process.MainWindowHandle == IntPtr.Zero)
                return null;

            try
            {
                AutomationElement element = AutomationElement.FromHandle(process.MainWindowHandle);
                if (element == null) return null;

                // Condition for address bar in Chrome, Edge, Firefox
                var addressBarCondition = new OrCondition(
                    new PropertyCondition(AutomationElement.AutomationIdProperty, "url_field"), // Firefox
                    new PropertyCondition(AutomationElement.AutomationIdProperty, "address_bar"), // Older Firefox
                    new AndCondition(
                        new PropertyCondition(AutomationElement.ControlTypeProperty, ControlType.Edit),
                        new PropertyCondition(AutomationElement.NameProperty, "Address and search bar") // Chrome/Edge
                    )
                );

                var addressBar = element.FindFirst(TreeScope.Descendants, addressBarCondition);

                if (addressBar != null)
                {
                    return addressBar.GetCurrentPropertyValue(ValuePattern.ValueProperty) as string;
                }
            }
            catch (Exception) { /* Ignore exceptions, e.g., if browser is closing */ }

            return null;
        }

        public void Stop()
        {
            _timer?.Change(Timeout.Infinite, 0);
            if (_startTime != default && !string.IsNullOrEmpty(_lastUrl))
            {
                _dbManager.LogWebUsage(DateTime.Now, _lastUrl, (int)(DateTime.Now - _startTime).TotalSeconds);
            }
            Console.WriteLine("Stopped Website Monitor.");
        }
    }
}
