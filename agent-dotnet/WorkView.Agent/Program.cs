using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using WorkView.Agent.Services;
using WorkView.Agent.Utils;

namespace WorkView.Agent;

class Program
{
    static async Task Main(string[] args)
    {
        // Parse command line arguments
        var configuration = ParseArguments(args);
        if (configuration == null)
        {
            ShowUsage();
            return;
        }

        // Build configuration
        var config = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", optional: true)
            .AddEnvironmentVariables()
            .Build();

        // Create host
        var host = Host.CreateDefaultBuilder(args)
            .ConfigureServices((context, services) =>
            {
                // Add configuration
                services.AddSingleton(configuration);
                
                // Add HTTP client
                services.AddHttpClient<IWorkViewApiClient, WorkViewApiClient>((serviceProvider, client) =>
                {
                    var config = serviceProvider.GetRequiredService<MonitoringConfiguration>();
                    return new WorkViewApiClient(client, 
                        serviceProvider.GetRequiredService<ILogger<WorkViewApiClient>>(),
                        config.ServerUrl, 
                        config.ApiKey);
                });

                // Add monitoring service
                services.AddHostedService<MonitoringService>();
                
                // Add logging
                services.AddLogging(builder =>
                {
                    builder.AddConsole();
                    builder.AddDebug();
                    builder.SetMinimumLevel(LogLevel.Information);
                });
            })
            .UseConsoleLifetime()
            .Build();

        try
        {
            Console.WriteLine("WorkView Agent starting...");
            Console.WriteLine($"Employee ID: {configuration.EmployeeId}");
            Console.WriteLine($"Server: {configuration.ServerUrl}");
            Console.WriteLine("Press Ctrl+C to stop the agent");
            Console.WriteLine();

            await host.RunAsync();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Agent error: {ex.Message}");
            Environment.Exit(1);
        }
    }

    private static MonitoringConfiguration? ParseArguments(string[] args)
    {
        if (args.Length < 2)
        {
            return null;
        }

        var config = new MonitoringConfiguration
        {
            ServerUrl = args[0],
            EmployeeId = args[1]
        };

        if (args.Length > 2)
        {
            config.ApiKey = args[2];
        }

        // Parse additional options
        for (int i = 3; i < args.Length; i++)
        {
            var arg = args[i].ToLowerInvariant();
            switch (arg)
            {
                case "--no-screenshots":
                    config.ScreenshotEnabled = false;
                    break;
                case "--no-keystrokes":
                    config.KeystrokeLoggingEnabled = false;
                    break;
                case "--enable-keystrokes":
                    config.KeystrokeLoggingEnabled = true;
                    break;
                case "--no-files":
                    config.FileMonitoringEnabled = false;
                    break;
                case "--no-network":
                    config.NetworkMonitoringEnabled = false;
                    break;
                case "--debug":
                    // Would set debug logging level
                    break;
            }
        }

        // Set defaults
        config.SetDefaults();

        return config;
    }

    private static void ShowUsage()
    {
        Console.WriteLine("WorkView Agent v1.0.0");
        Console.WriteLine("Employee monitoring agent for WorkView dashboard");
        Console.WriteLine();
        Console.WriteLine("Usage:");
        Console.WriteLine("  WorkView.Agent.exe <server_url> <employee_id> [api_key] [options]");
        Console.WriteLine();
        Console.WriteLine("Arguments:");
        Console.WriteLine("  server_url    WorkView server URL (e.g., https://workview.company.com)");
        Console.WriteLine("  employee_id   Unique employee identifier");
        Console.WriteLine("  api_key       Optional API key for authentication");
        Console.WriteLine();
        Console.WriteLine("Options:");
        Console.WriteLine("  --no-screenshots     Disable screenshot capture");
        Console.WriteLine("  --no-keystrokes      Disable keystroke logging (default)");
        Console.WriteLine("  --enable-keystrokes  Enable keystroke logging (requires consent)");
        Console.WriteLine("  --no-files           Disable file monitoring");
        Console.WriteLine("  --no-network         Disable network monitoring");
        Console.WriteLine("  --debug              Enable debug logging");
        Console.WriteLine();
        Console.WriteLine("Examples:");
        Console.WriteLine("  WorkView.Agent.exe http://localhost:5000 emp123");
        Console.WriteLine("  WorkView.Agent.exe https://workview.company.com emp123 sk_live_abc123");
        Console.WriteLine("  WorkView.Agent.exe https://your-app.replit.app emp123 --no-screenshots");
        Console.WriteLine();
        Console.WriteLine("Configuration:");
        Console.WriteLine("  Additional settings can be configured in appsettings.json");
        Console.WriteLine();
        Console.WriteLine("Legal Notice:");
        Console.WriteLine("  Employee monitoring must comply with local laws and regulations.");
        Console.WriteLine("  Ensure proper employee consent and data protection compliance.");
    }
}