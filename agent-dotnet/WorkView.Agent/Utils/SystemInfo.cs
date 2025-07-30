using System.Net;
using System.Net.Sockets;
using System.Reflection;

namespace WorkView.Agent.Utils;

public class SystemInfo
{
    public string ComputerName { get; }
    public string IpAddress { get; }
    public string AgentVersion { get; }
    public string OperatingSystem { get; }

    public SystemInfo()
    {
        ComputerName = Environment.MachineName;
        IpAddress = GetLocalIPAddress();
        AgentVersion = GetAgentVersion();
        OperatingSystem = GetOperatingSystemInfo();
    }

    private string GetLocalIPAddress()
    {
        try
        {
            using var socket = new Socket(AddressFamily.InterNetwork, SocketType.Dgram, 0);
            socket.Connect("8.8.8.8", 65530);
            var endPoint = socket.LocalEndPoint as IPEndPoint;
            return endPoint?.Address.ToString() ?? "127.0.0.1";
        }
        catch
        {
            return "127.0.0.1";
        }
    }

    private string GetAgentVersion()
    {
        return Assembly.GetExecutingAssembly()
            .GetCustomAttribute<AssemblyFileVersionAttribute>()?
            .Version ?? "1.0.0.0";
    }

    private string GetOperatingSystemInfo()
    {
        return $"{Environment.OSVersion.Platform} {Environment.OSVersion.Version}";
    }
}