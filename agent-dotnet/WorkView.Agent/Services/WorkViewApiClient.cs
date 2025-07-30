using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Logging;
using WorkView.Agent.Models;

namespace WorkView.Agent.Services;

public interface IWorkViewApiClient
{
    Task<bool> SendSessionEventAsync(SessionEvent sessionEvent);
    Task<bool> SendApplicationEventAsync(ApplicationEvent applicationEvent);
    Task<bool> SendWebsiteEventAsync(WebsiteEvent websiteEvent);
    Task<bool> SendKeystrokeEventAsync(KeystrokeEvent keystrokeEvent);
    Task<bool> SendScreenshotEventAsync(ScreenshotEvent screenshotEvent);
    Task<bool> SendClipboardEventAsync(ClipboardEvent clipboardEvent);
    Task<bool> SendFileActivityEventAsync(FileActivityEvent fileActivityEvent);
    Task<bool> SendPrintJobEventAsync(PrintJobEvent printJobEvent);
    Task<bool> SendCommunicationEventAsync(CommunicationEvent communicationEvent);
    Task<bool> SendNetworkActivityEventAsync(NetworkActivityEvent networkActivityEvent);
    Task<bool> UpdateEmployeeStatusAsync(string employeeId, EmployeeStatusUpdate statusUpdate);
}

public class WorkViewApiClient : IWorkViewApiClient
{
    private readonly HttpClient _httpClient;
    private readonly ILogger<WorkViewApiClient> _logger;
    private readonly string _baseUrl;
    private readonly string? _apiKey;

    public WorkViewApiClient(HttpClient httpClient, ILogger<WorkViewApiClient> logger, string baseUrl, string? apiKey = null)
    {
        _httpClient = httpClient;
        _logger = logger;
        _baseUrl = baseUrl.TrimEnd('/');
        _apiKey = apiKey;
        
        // Configure HTTP client
        _httpClient.Timeout = TimeSpan.FromSeconds(30);
        _httpClient.DefaultRequestHeaders.Add("User-Agent", "WorkView-Agent/1.0.0");
        
        if (!string.IsNullOrEmpty(_apiKey))
        {
            _httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", _apiKey);
        }
    }

    public async Task<bool> SendSessionEventAsync(SessionEvent sessionEvent)
    {
        return await SendEventAsync("sessions", sessionEvent);
    }

    public async Task<bool> SendApplicationEventAsync(ApplicationEvent applicationEvent)
    {
        return await SendEventAsync("applications", applicationEvent);
    }

    public async Task<bool> SendWebsiteEventAsync(WebsiteEvent websiteEvent)
    {
        return await SendEventAsync("websites", websiteEvent);
    }

    public async Task<bool> SendKeystrokeEventAsync(KeystrokeEvent keystrokeEvent)
    {
        return await SendEventAsync("keystrokes", keystrokeEvent);
    }

    public async Task<bool> SendScreenshotEventAsync(ScreenshotEvent screenshotEvent)
    {
        return await SendEventAsync("screenshots", screenshotEvent);
    }

    public async Task<bool> SendClipboardEventAsync(ClipboardEvent clipboardEvent)
    {
        return await SendEventAsync("clipboard-events", clipboardEvent);
    }

    public async Task<bool> SendFileActivityEventAsync(FileActivityEvent fileActivityEvent)
    {
        return await SendEventAsync("file-activities", fileActivityEvent);
    }

    public async Task<bool> SendPrintJobEventAsync(PrintJobEvent printJobEvent)
    {
        return await SendEventAsync("print-jobs", printJobEvent);
    }

    public async Task<bool> SendCommunicationEventAsync(CommunicationEvent communicationEvent)
    {
        return await SendEventAsync("communications", communicationEvent);
    }

    public async Task<bool> SendNetworkActivityEventAsync(NetworkActivityEvent networkActivityEvent)
    {
        return await SendEventAsync("network-activity", networkActivityEvent);
    }

    public async Task<bool> UpdateEmployeeStatusAsync(string employeeId, EmployeeStatusUpdate statusUpdate)
    {
        return await SendEventAsync($"employees/{employeeId}", statusUpdate, HttpMethod.Patch);
    }

    private async Task<bool> SendEventAsync<T>(string endpoint, T data, HttpMethod? method = null)
    {
        try
        {
            var url = $"{_baseUrl}/api/{endpoint}";
            var json = JsonSerializer.Serialize(data, new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            });
            
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            
            HttpResponseMessage response;
            if (method == HttpMethod.Patch)
            {
                response = await _httpClient.PatchAsync(url, content);
            }
            else
            {
                response = await _httpClient.PostAsync(url, content);
            }

            if (response.IsSuccessStatusCode)
            {
                _logger.LogDebug("✓ Sent {Endpoint}: {StatusCode}", endpoint, response.StatusCode);
                return true;
            }
            else
            {
                var errorContent = await response.Content.ReadAsStringAsync();
                _logger.LogWarning("✗ Failed {Endpoint}: {StatusCode} - {Error}", endpoint, response.StatusCode, errorContent);
                return false;
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "✗ API Error {Endpoint}: {Message}", endpoint, ex.Message);
            return false;
        }
    }
}