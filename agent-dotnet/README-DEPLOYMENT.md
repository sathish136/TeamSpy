# Simple WorkView Agent Deployment

## Quick Start (Zero Configuration)

### 1. Build the Agent
```bash
cd agent-dotnet
dotnet run build-agent.bat
```

### 2. Deploy to 200 Systems
1. Copy the `deployment` folder to each computer
2. Run `WorkView.Agent.exe` (no parameters needed)
3. Done! Data flows automatically to your dashboard

## What Happens Automatically

- **Server Connection**: Auto-connects to `http://10.15.115.120:5000`
- **Employee ID**: Auto-generated from computer name + MAC address
- **System Detection**: Automatically detects all system information
- **Data Sync**: Starts monitoring and sending data immediately

## Example Auto-Generated Employee IDs
- Computer "DESKTOP-ABC123" → Employee ID: "EMP-A1B2C3D4"
- Computer "LAPTOP-XYZ789" → Employee ID: "EMP-X9Y8Z7W6"

## Monitoring Features (Enabled by Default)
- ✅ Application usage tracking
- ✅ Website visit monitoring  
- ✅ File system activity
- ✅ Network connections
- ✅ Screenshot capture (every 5 minutes)
- ❌ Keystroke logging (disabled for privacy)

## Manual Override (Optional)
If you need custom configuration:
```bash
WorkView.Agent.exe http://your-server.com custom-employee-id
```

## Viewing Data
Open your dashboard at: `http://10.15.115.120:5000`
All connected agents will appear automatically with their system information.

## System Requirements
- Windows 10/11
- No .NET installation required (self-contained)
- Internet access to reach your server
- ~50MB disk space

## Troubleshooting
- **Agent won't start**: Run as Administrator
- **No data in dashboard**: Check firewall allows port 5000
- **Connection errors**: Verify server IP `10.15.115.120:5000` is accessible

Your dashboard is already running and ready to receive data from all 200 systems!