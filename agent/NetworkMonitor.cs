using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.NetworkInformation;
using System.Threading;
using System.Threading.Tasks;

namespace TeamSpy.Agent
{
    public class NetworkMonitor
    {
        private System.Threading.Timer? _timer;
        private readonly DatabaseManager _dbManager;
        private readonly HashSet<string> _activeConnections = new HashSet<string>();

        public NetworkMonitor(DatabaseManager dbManager)
        {
            _dbManager = dbManager;
        }

        public void Start()
        {
            Console.WriteLine("Starting Network Monitor...");
            _timer = new System.Threading.Timer(async (state) => await MonitorNetworkActivity(state), null, 0, 10000); // Check every 10 seconds
        }

        private async Task MonitorNetworkActivity(object? state)
        {
            try
            {
                var properties = IPGlobalProperties.GetIPGlobalProperties();
                var connections = properties.GetActiveTcpConnections();

                foreach (var connection in connections)
                {
                    if (connection.State == TcpState.Established)
                    {
                        var remoteAddress = connection.RemoteEndPoint.Address;

                        // Ignore loopback connections to reduce noise
                        if (IPAddress.IsLoopback(remoteAddress))
                        {
                            continue;
                        }

                        string connectionIdentifier = $"{connection.LocalEndPoint}:{connection.RemoteEndPoint}";

                        // Check if we are already tracking this connection
                        if (_activeConnections.Contains(connectionIdentifier))
                        {
                            continue;
                        }

                        // Add to tracked connections
                        _activeConnections.Add(connectionIdentifier);

                        string domain = await GetDomainFromIp(remoteAddress);
                        string currentUser = Environment.UserName;

                        _dbManager.LogNetworkActivity(DateTime.Now, currentUser, remoteAddress.ToString(), connection.RemoteEndPoint.Port, domain);
                    }
                }
            }
            catch (Exception) { /* Ignore exceptions */ }
        }

        private async Task<string> GetDomainFromIp(IPAddress ipAddress)
        { 
            try
            {
                IPHostEntry hostEntry = await Dns.GetHostEntryAsync(ipAddress);
                return hostEntry.HostName;
            }
            catch (Exception)
            {
                return ipAddress.ToString();
            }
        }

        public void Stop()
        {
            _timer?.Change(Timeout.Infinite, 0);
            Console.WriteLine("Stopped Network Monitor.");
        }
    }
}
