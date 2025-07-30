namespace WorkView.Agent.Utils;

public static class RiskAssessment
{
    private static readonly HashSet<string> HighRiskExtensions = new(StringComparer.OrdinalIgnoreCase)
    {
        ".exe", ".bat", ".cmd", ".ps1", ".vbs", ".js", ".jar", ".com", ".scr", 
        ".msi", ".reg", ".dll", ".sys", ".drv", ".ocx", ".cpl", ".inf", ".pif"
    };

    private static readonly HashSet<string> MediumRiskExtensions = new(StringComparer.OrdinalIgnoreCase)
    {
        ".zip", ".rar", ".7z", ".tar", ".gz", ".iso", ".dmg", ".pkg", ".deb", ".rpm",
        ".docm", ".xlsm", ".pptm", ".doc", ".xls", ".ppt", ".pdf", ".rtf"
    };

    private static readonly HashSet<string> SensitiveDirectories = new(StringComparer.OrdinalIgnoreCase)
    {
        @"C:\Windows\System32", @"C:\Windows\SysWOW64", @"C:\Program Files", @"C:\Program Files (x86)",
        @"C:\Users\Public", @"C:\ProgramData", "/etc/", "/usr/bin/", "/usr/sbin/", "/bin/", "/sbin/",
        "/var/", "/opt/", "/System/", "/Library/", "/Applications/"
    };

    private static readonly HashSet<string> HighRiskActions = new(StringComparer.OrdinalIgnoreCase)
    {
        "usb_transfer", "delete", "modify"
    };

    private static readonly HashSet<int> HighRiskPorts = new()
    {
        22, 23, 135, 139, 445, 1433, 1521, 3306, 3389, 5432, 5900, 5985, 5986
    };

    private static readonly HashSet<int> MediumRiskPorts = new()
    {
        21, 25, 53, 110, 143, 993, 995, 8080, 8443, 9090
    };

    public static string AssessFileRisk(string filePath, string action)
    {
        try
        {
            var extension = Path.GetExtension(filePath);
            var directory = Path.GetDirectoryName(filePath) ?? "";
            var fileName = Path.GetFileName(filePath);

            // Check for high-risk file extensions
            if (HighRiskExtensions.Contains(extension))
                return "critical";

            // Check for high-risk actions on sensitive files
            if (HighRiskActions.Contains(action))
            {
                if (MediumRiskExtensions.Contains(extension))
                    return "high";
                
                if (IsSensitiveDirectory(directory))
                    return "high";
            }

            // Check for sensitive directories
            if (IsSensitiveDirectory(directory))
                return "medium";

            // Check for medium-risk extensions
            if (MediumRiskExtensions.Contains(extension))
                return "medium";

            // Check for USB/external device transfers
            if (action.Equals("usb_transfer", StringComparison.OrdinalIgnoreCase))
                return "medium";

            // Check for suspicious file names
            if (IsSuspiciousFileName(fileName))
                return "medium";

            return "low";
        }
        catch
        {
            return "medium"; // Default to medium if assessment fails
        }
    }

    public static string AssessNetworkRisk(string destinationIp, int? destinationPort)
    {
        try
        {
            // Check for high-risk ports
            if (destinationPort.HasValue && HighRiskPorts.Contains(destinationPort.Value))
                return "critical";

            // Check for medium-risk ports
            if (destinationPort.HasValue && MediumRiskPorts.Contains(destinationPort.Value))
                return "high";

            // Check for internal network (generally lower risk)
            if (IsInternalNetwork(destinationIp))
                return "low";

            // Check for known malicious IP ranges (this would be enhanced with threat intelligence)
            if (IsSuspiciousIpRange(destinationIp))
                return "high";

            // External connections on standard ports
            if (destinationPort.HasValue && (destinationPort.Value == 80 || destinationPort.Value == 443))
                return "low";

            // Unknown external connections
            return "medium";
        }
        catch
        {
            return "medium"; // Default to medium if assessment fails
        }
    }

    public static string AssessApplicationRisk(string applicationName, string action)
    {
        try
        {
            var appLower = applicationName.ToLowerInvariant();

            // High-risk applications
            var highRiskApps = new[] { "cmd", "powershell", "regedit", "taskmgr", "services", "mmc" };
            if (highRiskApps.Any(riskApp => appLower.Contains(riskApp)))
                return "high";

            // Medium-risk applications
            var mediumRiskApps = new[] { "notepad", "explorer", "control", "msconfig" };
            if (mediumRiskApps.Any(riskApp => appLower.Contains(riskApp)))
                return "medium";

            // Check for development tools (generally low risk but worth monitoring)
            var devTools = new[] { "code", "devenv", "git", "docker" };
            if (devTools.Any(tool => appLower.Contains(tool)))
                return "low";

            return "low";
        }
        catch
        {
            return "medium";
        }
    }

    private static bool IsSensitiveDirectory(string directory)
    {
        return SensitiveDirectories.Any(sensitiveDir => 
            directory.StartsWith(sensitiveDir, StringComparison.OrdinalIgnoreCase));
    }

    private static bool IsSuspiciousFileName(string fileName)
    {
        var suspiciousKeywords = new[] 
        {
            "password", "secret", "key", "token", "credential", "private", "confidential",
            "backup", "dump", "export", "temp", "tmp", "cache"
        };

        var fileNameLower = fileName.ToLowerInvariant();
        return suspiciousKeywords.Any(keyword => fileNameLower.Contains(keyword));
    }

    private static bool IsInternalNetwork(string ipAddress)
    {
        try
        {
            var ip = System.Net.IPAddress.Parse(ipAddress);
            var bytes = ip.GetAddressBytes();

            // Check for private IP ranges
            return (bytes[0] == 10) ||
                   (bytes[0] == 172 && bytes[1] >= 16 && bytes[1] <= 31) ||
                   (bytes[0] == 192 && bytes[1] == 168) ||
                   (bytes[0] == 127); // Loopback
        }
        catch
        {
            return false;
        }
    }

    private static bool IsSuspiciousIpRange(string ipAddress)
    {
        // This would be enhanced with real threat intelligence feeds
        // For now, just check for some known suspicious ranges
        
        try
        {
            var ip = System.Net.IPAddress.Parse(ipAddress);
            var bytes = ip.GetAddressBytes();

            // Example: Block certain ranges (this is just an example)
            // In production, this would use threat intelligence APIs
            
            return false; // Placeholder
        }
        catch
        {
            return false;
        }
    }
}