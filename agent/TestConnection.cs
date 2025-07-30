using System;
using System.Threading.Tasks;

namespace TeamSpy.Agent
{
    class TestConnection
    {
        static async Task Main(string[] args)
        {
            Console.WriteLine("WorkView .NET Agent Connection Test");
            Console.WriteLine("=" + new string('=', 38));

            string serverUrl = "http://localhost:5000";
            string employeeId = "test_dotnet_001";

            if (args.Length >= 2)
            {
                serverUrl = args[0];
                employeeId = args[1];
            }

            Console.WriteLine($"🔗 Testing connection to WorkView Dashboard at {serverUrl}");
            Console.WriteLine($"👤 Employee ID: {employeeId}");

            try
            {
                var apiClient = new ApiClient(serverUrl, employeeId);

                // Test agent registration
                Console.WriteLine("📋 Testing agent registration...");
                bool registered = await apiClient.RegisterAgent();

                if (registered)
                {
                    Console.WriteLine("✅ Agent registration successful");
                    
                    // Test heartbeat
                    Console.WriteLine("💓 Testing heartbeat...");
                    bool heartbeat = await apiClient.SendHeartbeat();
                    
                    if (heartbeat)
                    {
                        Console.WriteLine("✅ Heartbeat successful");
                    }
                    else
                    {
                        Console.WriteLine("❌ Heartbeat failed");
                    }

                    // Test logging a session event
                    Console.WriteLine("📝 Testing session logging...");
                    bool sessionLogged = await apiClient.LogSession("login", new { test = true });
                    
                    if (sessionLogged)
                    {
                        Console.WriteLine("✅ Session logging successful");
                    }
                    else
                    {
                        Console.WriteLine("❌ Session logging failed");
                    }

                    Console.WriteLine("\n🎉 .NET Agent connection test successful!");
                    Console.WriteLine("Your .NET agent is ready to connect to WorkView Dashboard");
                }
                else
                {
                    Console.WriteLine("❌ Agent registration failed!");
                    Console.WriteLine("Please check your server URL and configuration");
                }

                apiClient.Dispose();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ Connection test failed: {ex.Message}");
                Console.WriteLine("Please check that the WorkView server is running and accessible");
            }
        }
    }
}