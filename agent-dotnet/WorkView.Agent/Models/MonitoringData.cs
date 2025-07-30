using System.Text.Json.Serialization;

namespace WorkView.Agent.Models;

public class SessionEvent
{
    [JsonPropertyName("employeeId")]
    public string EmployeeId { get; set; } = string.Empty;
    
    [JsonPropertyName("sessionType")]
    public string SessionType { get; set; } = string.Empty; // login, logout, lock, unlock, idle_start, idle_end
    
    [JsonPropertyName("computerName")]
    public string? ComputerName { get; set; }
    
    [JsonPropertyName("ipAddress")]
    public string? IpAddress { get; set; }
    
    [JsonPropertyName("metadata")]
    public Dictionary<string, object>? Metadata { get; set; }
}

public class ApplicationEvent
{
    [JsonPropertyName("employeeId")]
    public string EmployeeId { get; set; } = string.Empty;
    
    [JsonPropertyName("applicationName")]
    public string ApplicationName { get; set; } = string.Empty;
    
    [JsonPropertyName("applicationPath")]
    public string? ApplicationPath { get; set; }
    
    [JsonPropertyName("windowTitle")]
    public string? WindowTitle { get; set; }
    
    [JsonPropertyName("action")]
    public string Action { get; set; } = string.Empty; // open, close, focus, blur
    
    [JsonPropertyName("duration")]
    public int? Duration { get; set; }
    
    [JsonPropertyName("category")]
    public string Category { get; set; } = "neutral"; // productive, neutral, unproductive
}

public class WebsiteEvent
{
    [JsonPropertyName("employeeId")]
    public string EmployeeId { get; set; } = string.Empty;
    
    [JsonPropertyName("url")]
    public string Url { get; set; } = string.Empty;
    
    [JsonPropertyName("title")]
    public string? Title { get; set; }
    
    [JsonPropertyName("domain")]
    public string? Domain { get; set; }
    
    [JsonPropertyName("duration")]
    public int? Duration { get; set; }
    
    [JsonPropertyName("category")]
    public string Category { get; set; } = "neutral";
}

public class KeystrokeEvent
{
    [JsonPropertyName("employeeId")]
    public string EmployeeId { get; set; } = string.Empty;
    
    [JsonPropertyName("applicationName")]
    public string? ApplicationName { get; set; }
    
    [JsonPropertyName("windowTitle")]
    public string? WindowTitle { get; set; }
    
    [JsonPropertyName("keystrokeCount")]
    public int KeystrokeCount { get; set; }
    
    [JsonPropertyName("duration")]
    public int Duration { get; set; }
    
    [JsonPropertyName("isEnabled")]
    public bool IsEnabled { get; set; }
}

public class ScreenshotEvent
{
    [JsonPropertyName("employeeId")]
    public string EmployeeId { get; set; } = string.Empty;
    
    [JsonPropertyName("filePath")]
    public string FilePath { get; set; } = string.Empty;
    
    [JsonPropertyName("fileName")]
    public string FileName { get; set; } = string.Empty;
    
    [JsonPropertyName("screenNumber")]
    public int ScreenNumber { get; set; } = 1;
    
    [JsonPropertyName("fileSize")]
    public long? FileSize { get; set; }
    
    [JsonPropertyName("metadata")]
    public Dictionary<string, object>? Metadata { get; set; }
}

public class ClipboardEvent
{
    [JsonPropertyName("employeeId")]
    public string EmployeeId { get; set; } = string.Empty;
    
    [JsonPropertyName("eventType")]
    public string EventType { get; set; } = string.Empty; // copy, paste, cut
    
    [JsonPropertyName("applicationName")]
    public string? ApplicationName { get; set; }
    
    [JsonPropertyName("dataType")]
    public string? DataType { get; set; } // text, image, file
    
    [JsonPropertyName("dataSize")]
    public long? DataSize { get; set; }
    
    [JsonPropertyName("isMonitored")]
    public bool IsMonitored { get; set; } = true;
}

public class FileActivityEvent
{
    [JsonPropertyName("employeeId")]
    public string EmployeeId { get; set; } = string.Empty;
    
    [JsonPropertyName("filePath")]
    public string FilePath { get; set; } = string.Empty;
    
    [JsonPropertyName("fileName")]
    public string FileName { get; set; } = string.Empty;
    
    [JsonPropertyName("action")]
    public string Action { get; set; } = string.Empty; // open, create, delete, modify, copy, move, usb_transfer
    
    [JsonPropertyName("fileSize")]
    public long? FileSize { get; set; }
    
    [JsonPropertyName("fileType")]
    public string? FileType { get; set; }
    
    [JsonPropertyName("destinationPath")]
    public string? DestinationPath { get; set; }
    
    [JsonPropertyName("applicationName")]
    public string? ApplicationName { get; set; }
    
    [JsonPropertyName("riskLevel")]
    public string RiskLevel { get; set; } = "low"; // low, medium, high, critical
}

public class PrintJobEvent
{
    [JsonPropertyName("employeeId")]
    public string EmployeeId { get; set; } = string.Empty;
    
    [JsonPropertyName("documentName")]
    public string DocumentName { get; set; } = string.Empty;
    
    [JsonPropertyName("printerName")]
    public string PrinterName { get; set; } = string.Empty;
    
    [JsonPropertyName("pages")]
    public int? Pages { get; set; }
    
    [JsonPropertyName("copies")]
    public int? Copies { get; set; }
    
    [JsonPropertyName("applicationName")]
    public string? ApplicationName { get; set; }
    
    [JsonPropertyName("fileSize")]
    public long? FileSize { get; set; }
    
    [JsonPropertyName("status")]
    public string Status { get; set; } = "queued";
}

public class CommunicationEvent
{
    [JsonPropertyName("employeeId")]
    public string EmployeeId { get; set; } = string.Empty;
    
    [JsonPropertyName("type")]
    public string Type { get; set; } = string.Empty; // email, chat, video_call, voice_call
    
    [JsonPropertyName("applicationName")]
    public string ApplicationName { get; set; } = string.Empty;
    
    [JsonPropertyName("participants")]
    public List<string>? Participants { get; set; }
    
    [JsonPropertyName("subject")]
    public string? Subject { get; set; }
    
    [JsonPropertyName("duration")]
    public int? Duration { get; set; }
    
    [JsonPropertyName("isIncoming")]
    public bool? IsIncoming { get; set; }
    
    [JsonPropertyName("isMonitored")]
    public bool IsMonitored { get; set; } = true;
}

public class NetworkActivityEvent
{
    [JsonPropertyName("employeeId")]
    public string EmployeeId { get; set; } = string.Empty;
    
    [JsonPropertyName("destinationIp")]
    public string DestinationIp { get; set; } = string.Empty;
    
    [JsonPropertyName("destinationPort")]
    public int? DestinationPort { get; set; }
    
    [JsonPropertyName("protocol")]
    public string? Protocol { get; set; } // TCP, UDP, HTTP, HTTPS, FTP, SSH
    
    [JsonPropertyName("domain")]
    public string? Domain { get; set; }
    
    [JsonPropertyName("bytesUploaded")]
    public long? BytesUploaded { get; set; }
    
    [JsonPropertyName("bytesDownloaded")]
    public long? BytesDownloaded { get; set; }
    
    [JsonPropertyName("applicationName")]
    public string? ApplicationName { get; set; }
    
    [JsonPropertyName("riskLevel")]
    public string RiskLevel { get; set; } = "low";
}

public class EmployeeStatusUpdate
{
    [JsonPropertyName("status")]
    public string Status { get; set; } = string.Empty; // online, idle, offline
    
    [JsonPropertyName("lastActive")]
    public DateTime LastActive { get; set; }
    
    [JsonPropertyName("computerName")]
    public string? ComputerName { get; set; }
    
    [JsonPropertyName("ipAddress")]
    public string? IpAddress { get; set; }
    
    [JsonPropertyName("agentVersion")]
    public string? AgentVersion { get; set; }
    
    [JsonPropertyName("operatingSystem")]
    public string? OperatingSystem { get; set; }
}