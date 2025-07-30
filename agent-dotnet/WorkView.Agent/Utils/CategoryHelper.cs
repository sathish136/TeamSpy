namespace WorkView.Agent.Utils;

public static class CategoryHelper
{
    private static readonly HashSet<string> ProductiveApps = new(StringComparer.OrdinalIgnoreCase)
    {
        "code", "devenv", "visual studio", "excel", "winword", "outlook", "teams", 
        "slack", "notion", "figma", "photoshop", "illustrator", "notepad++", 
        "sublime_text", "atom", "webstorm", "intellij", "eclipse", "netbeans",
        "sqlserver", "ssms", "mysql", "pgadmin", "postman", "fiddler", "wireshark"
    };

    private static readonly HashSet<string> UnproductiveApps = new(StringComparer.OrdinalIgnoreCase)
    {
        "game", "steam", "origin", "epicgames", "uplay", "battle.net", "minecraft",
        "fortnite", "valorant", "league", "dota", "csgo", "overwatch", "wow",
        "spotify", "itunes", "vlc", "netflix", "hulu", "disney", "prime video",
        "chrome", "firefox", "edge", "safari", "opera" // Browsers are neutral by default
    };

    private static readonly HashSet<string> ProductiveDomains = new(StringComparer.OrdinalIgnoreCase)
    {
        "github.com", "gitlab.com", "bitbucket.org", "stackoverflow.com", "stackexchange.com",
        "docs.microsoft.com", "developer.mozilla.org", "w3schools.com", "codecademy.com",
        "coursera.org", "udemy.com", "pluralsight.com", "linkedin.com/learning",
        "google.com/search", "bing.com/search", "duckduckgo.com", "atlassian.net",
        "office.com", "office365.com", "teams.microsoft.com", "slack.com",
        "zoom.us", "webex.com", "gotomeeting.com", "figma.com", "canva.com"
    };

    private static readonly HashSet<string> UnproductiveDomains = new(StringComparer.OrdinalIgnoreCase)
    {
        "facebook.com", "instagram.com", "twitter.com", "x.com", "tiktok.com", "snapchat.com",
        "youtube.com", "twitch.tv", "netflix.com", "hulu.com", "disney.com", "primevideo.com",
        "reddit.com", "9gag.com", "imgur.com", "pinterest.com", "tumblr.com",
        "gaming.com", "steam.com", "epicgames.com", "origin.com", "battle.net",
        "spotify.com", "apple.com/music", "pandora.com", "soundcloud.com"
    };

    public static string CategorizeApplication(string appName)
    {
        if (string.IsNullOrWhiteSpace(appName))
            return "neutral";

        var appLower = appName.ToLowerInvariant();

        // Check for exact matches first
        if (ProductiveApps.Any(prodApp => appLower.Contains(prodApp)))
            return "productive";

        if (UnproductiveApps.Any(unprodApp => appLower.Contains(unprodApp)))
            return "unproductive";

        // Additional heuristics
        if (IsCodeEditor(appLower) || IsOfficeApp(appLower) || IsDevelopmentTool(appLower))
            return "productive";

        if (IsGameRelated(appLower) || IsEntertainment(appLower))
            return "unproductive";

        return "neutral";
    }

    public static string CategorizeWebsite(string domain)
    {
        if (string.IsNullOrWhiteSpace(domain))
            return "neutral";

        var domainLower = domain.ToLowerInvariant();

        // Remove www. prefix if present
        if (domainLower.StartsWith("www."))
            domainLower = domainLower[4..];

        // Check for exact matches
        if (ProductiveDomains.Any(prodDomain => domainLower.Contains(prodDomain)))
            return "productive";

        if (UnproductiveDomains.Any(unprodDomain => domainLower.Contains(unprodDomain)))
            return "unproductive";

        // Additional heuristics for domains
        if (IsWorkRelatedDomain(domainLower) || IsEducationalDomain(domainLower))
            return "productive";

        if (IsSocialMediaDomain(domainLower) || IsEntertainmentDomain(domainLower))
            return "unproductive";

        return "neutral";
    }

    private static bool IsCodeEditor(string appName)
    {
        var codeEditors = new[] { "code", "notepad++", "sublime", "atom", "vim", "emacs", "nano" };
        return codeEditors.Any(editor => appName.Contains(editor));
    }

    private static bool IsOfficeApp(string appName)
    {
        var officeApps = new[] { "word", "excel", "powerpoint", "outlook", "onenote", "access", "publisher" };
        return officeApps.Any(office => appName.Contains(office));
    }

    private static bool IsDevelopmentTool(string appName)
    {
        var devTools = new[] { "git", "docker", "kubectl", "terraform", "ansible", "jenkins", "azure", "aws" };
        return devTools.Any(tool => appName.Contains(tool));
    }

    private static bool IsGameRelated(string appName)
    {
        var gameKeywords = new[] { "game", "play", "steam", "epic", "battle", "blizzard", "riot" };
        return gameKeywords.Any(keyword => appName.Contains(keyword));
    }

    private static bool IsEntertainment(string appName)
    {
        var entertainmentKeywords = new[] { "music", "video", "media", "player", "stream" };
        return entertainmentKeywords.Any(keyword => appName.Contains(keyword));
    }

    private static bool IsWorkRelatedDomain(string domain)
    {
        var workKeywords = new[] { "docs.", "drive.", "sharepoint.", "onedrive.", "dropbox.", "box.", "trello.", "asana.", "monday." };
        return workKeywords.Any(keyword => domain.Contains(keyword));
    }

    private static bool IsEducationalDomain(string domain)
    {
        var eduKeywords = new[] { ".edu", "learn", "course", "tutorial", "documentation", "wiki", "manual" };
        return eduKeywords.Any(keyword => domain.Contains(keyword));
    }

    private static bool IsSocialMediaDomain(string domain)
    {
        var socialKeywords = new[] { "social", "chat", "forum", "community", "discussion" };
        return socialKeywords.Any(keyword => domain.Contains(keyword));
    }

    private static bool IsEntertainmentDomain(string domain)
    {
        var entertainmentKeywords = new[] { "video", "music", "game", "stream", "entertainment", "fun" };
        return entertainmentKeywords.Any(keyword => domain.Contains(keyword));
    }
}