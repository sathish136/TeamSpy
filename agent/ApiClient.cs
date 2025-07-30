using System;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace TeamSpy.Agent
{
    public class ApiClient
    {
        private readonly HttpClient _httpClient;
        private readonly string _serverUrl;
        private readonly string _employeeId;
        private readonly string _computerName;
        private readonly string _ipAddress;

        public ApiClient(string serverUrl, string employeeId)
        {
            _httpClient = new HttpClient();
            _serverUrl = serverUrl.TrimEnd('/');
            _employeeId = employeeId;
            _computerName = Environment.MachineName;
            _ipAddress = GetLocalIPAddress();
        }

        private string GetLocalIPAddress()
        {
            try
            {
                using (var socket = new System.Net.Sockets.Socket(System.Net.Sockets.AddressFamily.InterNetwork, System.Net.Sockets.SocketType.Dgram, 0))
                {
                    socket.Connect("8.8.8.8", 65530);
                    var endPoint = socket.LocalEndPoint as System.Net.IPEndPoint;
                    return endPoint?.Address.ToString() ?? "127.0.0.1";
                }
            }
            catch
            {
                return "127.0.0.1";
            }
        }

        public async Task<bool> RegisterAgent()
        {
            try
            {
                var registrationData = new
                {
                    employeeId = _employeeId,
                    computerName = _computerName,
                    ipAddress = _ipAddress,
                    agentVersion = "1.0.0",
                    operatingSystem = "Windows"
                };

                var json = JsonSerializer.Serialize(registrationData);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                var response = await _httpClient.PostAsync($"{_serverUrl}/api/agent/register", content);
                
                if (response.IsSuccessStatusCode)
                {
                    Console.WriteLine("✅ Agent registered successfully");
                    return true;
                }
                else
                {
                    Console.WriteLine($"❌ Agent registration failed: {response.StatusCode}");
                    return false;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ Registration error: {ex.Message}");
                return false;
            }
        }

        public async Task<bool> SendHeartbeat()
        {
            try
            {
                var heartbeatData = new { employeeId = _employeeId };
                var json = JsonSerializer.Serialize(heartbeatData);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                var response = await _httpClient.PostAsync($"{_serverUrl}/api/agent/heartbeat", content);
                return response.IsSuccessStatusCode;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> LogSession(string sessionType, object metadata = null)
        {
            try
            {
                var sessionData = new
                {
                    employeeId = _employeeId,
                    sessionType = sessionType,
                    computerName = _computerName,
                    ipAddress = _ipAddress,
                    metadata = metadata ?? new { }
                };

                var json = JsonSerializer.Serialize(sessionData);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                var response = await _httpClient.PostAsync($"{_serverUrl}/api/sessions", content);
                return response.IsSuccessStatusCode;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> LogApplication(string applicationName, string action, string windowTitle = null, string applicationPath = null)
        {
            try
            {
                var appData = new
                {
                    employeeId = _employeeId,
                    applicationName = applicationName,
                    action = action,
                    windowTitle = windowTitle,
                    applicationPath = applicationPath,
                    category = CategorizeApplication(applicationName)
                };

                var json = JsonSerializer.Serialize(appData);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                var response = await _httpClient.PostAsync($"{_serverUrl}/api/applications", content);
                return response.IsSuccessStatusCode;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> LogWebsite(string url, string title = null, int? duration = null)
        {
            try
            {
                var uri = new Uri(url);
                var websiteData = new
                {
                    employeeId = _employeeId,
                    url = url,
                    title = title,
                    domain = uri.Host,
                    duration = duration,
                    category = CategorizeWebsite(uri.Host)
                };

                var json = JsonSerializer.Serialize(websiteData);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                var response = await _httpClient.PostAsync($"{_serverUrl}/api/websites", content);
                return response.IsSuccessStatusCode;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> LogFileActivity(string filePath, string fileName, string action, string applicationType = null)
        {
            try
            {
                var fileData = new
                {
                    employeeId = _employeeId,
                    filePath = filePath,
                    fileName = fileName,
                    action = action,
                    applicationName = applicationType,
                    riskLevel = "low"
                };

                var json = JsonSerializer.Serialize(fileData);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                var response = await _httpClient.PostAsync($"{_serverUrl}/api/file-activities", content);
                return response.IsSuccessStatusCode;
            }
            catch
            {
                return false;
            }
        }

        private string CategorizeApplication(string applicationName)
        {
            var productive = new[] { "excel", "word", "powerpoint", "outlook", "teams", "visual studio", "code", "notepad" };
            var unproductive = new[] { "steam", "game", "youtube", "facebook", "instagram", "tiktok" };

            applicationName = applicationName.ToLower();

            foreach (var app in productive)
            {
                if (applicationName.Contains(app)) return "productive";
            }

            foreach (var app in unproductive)
            {
                if (applicationName.Contains(app)) return "unproductive";
            }

            return "neutral";
        }

        private string CategorizeWebsite(string domain)
        {
            var productive = new[] { "github.com", "stackoverflow.com", "docs.microsoft.com", "google.com/search" };
            var unproductive = new[] { "youtube.com", "facebook.com", "instagram.com", "tiktok.com", "reddit.com" };

            domain = domain.ToLower();

            foreach (var site in productive)
            {
                if (domain.Contains(site)) return "productive";
            }

            foreach (var site in unproductive)
            {
                if (domain.Contains(site)) return "unproductive";
            }

            return "neutral";
        }

        public void Dispose()
        {
            _httpClient?.Dispose();
        }
    }
}