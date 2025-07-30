# WorkView .NET Agent

A comprehensive employee monitoring agent built with .NET 6 that collects system activities and sends them to the WorkView dashboard.

## Features

### Core Monitoring Capabilities
- **Session Monitoring**: Login, logout, lock, unlock events with Windows event integration
- **Application Tracking**: Real-time process monitoring with productivity categorization
- **Website Monitoring**: Browser activity tracking with domain categorization
- **Network Activity**: Connection monitoring with risk assessment
- **File System Monitoring**: File operations tracking with risk analysis
- **Screen Capture**: Periodic screenshot capture with compression
- **System Information**: Hardware and OS details collection

### Advanced Features (Optional)
- **Keystroke Logging**: Keyboard input monitoring (disabled by default, requires consent)
- **Clipboard Monitoring**: Copy/paste event tracking
- **Print Job Monitoring**: Document printing activities
- **Communication Metadata**: Email/chat application monitoring
- **USB Device Detection**: External storage device monitoring
- **Risk Assessment**: Automatic security risk scoring

### Security & Compliance
- **Privacy Controls**: Granular feature toggles with consent requirements
- **Data Encryption**: HTTPS-only communication with optional API authentication
- **Risk Scoring**: Real-time threat assessment for files and network activity
- **Audit Logging**: Complete activity trail for compliance reporting
- **Configurable Policies**: Customizable monitoring rules and thresholds

## System Requirements

- **Operating System**: Windows 10/11 (primary), Windows Server 2019/2022
- **Framework**: .NET 6.0 Runtime or later
- **Permissions**: Administrator privileges recommended for full monitoring
- **Network**: Internet access to WorkView server
- **Storage**: 100MB disk space minimum (more for screenshots)

## Installation

### Pre-built Binary
1. Download the latest release from the releases page
2. Extract to a folder (e.g., `C:\Program Files\WorkView Agent\`)
3. Run as administrator for full functionality

### Build from Source
```bash
# Clone the repository
git clone https://github.com/your-org/workview-agent.git
cd workview-agent/agent-dotnet

# Restore dependencies
dotnet restore

# Build the application
dotnet build --configuration Release

# Publish for deployment
dotnet publish --configuration Release --runtime win-x64 --self-contained true
```

## Configuration

### Command Line Usage
```bash
# Basic usage
WorkView.Agent.exe <server_url> <employee_id>

# With API key authentication
WorkView.Agent.exe <server_url> <employee_id> <api_key>

# With feature flags
WorkView.Agent.exe <server_url> <employee_id> --no-screenshots --enable-keystrokes
```

### Examples
```bash
# Local development server
WorkView.Agent.exe http://localhost:5000 emp123

# Production server with authentication
WorkView.Agent.exe https://workview.company.com emp123 sk_live_abc123def456

# Replit deployment
WorkView.Agent.exe https://your-app.replit.app emp123

# Privacy-focused configuration
WorkView.Agent.exe https://workview.company.com emp123 --no-screenshots --no-keystrokes
```

### Configuration File (appsettings.json)
```json
{
  "WorkViewAgent": {
    "MonitoringEnabled": true,
    "KeystrokeLoggingEnabled": false,
    "ScreenshotEnabled": true,
    "FileMonitoringEnabled": true,
    "NetworkMonitoringEnabled": true,
    
    "HeartbeatInterval": 30,
    "ScreenshotInterval": 300,
    "AppCheckInterval": 10,
    
    "MonitoredDirectories": [
      "%USERPROFILE%\\Desktop",
      "%USERPROFILE%\\Documents"
    ],
    
    "TrustedDomains": [
      "microsoft.com",
      "github.com",
      "stackoverflow.com"
    ]
  }
}
```

### Environment Variables
```bash
# Server configuration
WORKVIEW_SERVER_URL=https://workview.company.com
WORKVIEW_EMPLOYEE_ID=emp123
WORKVIEW_API_KEY=sk_live_abc123

# Feature toggles
WORKVIEW_SCREENSHOTS_ENABLED=true
WORKVIEW_KEYSTROKES_ENABLED=false
WORKVIEW_FILES_ENABLED=true
```

## Data Collection

### Session Events
- User login/logout with timestamps
- Screen lock/unlock detection
- System boot/shutdown events
- Idle time calculation
- Session duration tracking

### Application Monitoring
- Process start/stop events with full paths
- Window focus changes and titles
- Application usage duration
- Productivity categorization (productive/neutral/unproductive)
- Memory and CPU usage correlation

### File System Activities
- File creation, modification, deletion events
- Directory monitoring with configurable paths
- USB and external device file transfers
- File size and type classification
- Risk assessment based on file properties

### Network Monitoring
- Outbound connection tracking
- Destination IP addresses and ports
- Protocol identification (TCP/UDP/HTTP/HTTPS)
- Domain name resolution
- Bandwidth usage estimation
- Risk scoring for external connections

### Security Monitoring
- Executable file execution tracking
- Registry access monitoring
- Administrative privilege usage
- Suspicious file pattern detection
- Network anomaly identification

## Running as a Windows Service

### Manual Service Installation
```batch
# Install the agent as a Windows service
sc create "WorkView Agent" binPath="C:\Program Files\WorkView Agent\WorkView.Agent.exe https://workview.company.com emp123" start=auto

# Start the service
sc start "WorkView Agent"

# Check service status
sc query "WorkView Agent"

# Stop and remove service
sc stop "WorkView Agent"
sc delete "WorkView Agent"
```

### PowerShell Service Management
```powershell
# Create and configure service
New-Service -Name "WorkViewAgent" -BinaryPathName "C:\Program Files\WorkView Agent\WorkView.Agent.exe https://workview.company.com emp123" -StartupType Automatic -Description "WorkView Employee Monitoring Agent"

# Start service
Start-Service -Name "WorkViewAgent"

# Check service status
Get-Service -Name "WorkViewAgent"

# Stop and remove service
Stop-Service -Name "WorkViewAgent"
Remove-Service -Name "WorkViewAgent"
```

## API Integration

The agent communicates with the WorkView server using these endpoints:

### Authentication
```http
Authorization: Bearer <api_key>
Content-Type: application/json
```

### Data Submission Endpoints
- `POST /api/sessions` - Session login/logout events
- `POST /api/applications` - Application usage events
- `POST /api/websites` - Website visit tracking
- `POST /api/keystrokes` - Keystroke data (if enabled)
- `POST /api/screenshots` - Screenshot metadata
- `POST /api/clipboard-events` - Clipboard operations
- `POST /api/file-activities` - File system operations
- `POST /api/print-jobs` - Print job tracking
- `POST /api/communications` - Email/chat metadata
- `POST /api/network-activity` - Network connections
- `PATCH /api/employees/{id}` - Employee status updates

### Data Format Example
```json
{
  "employeeId": "emp123",
  "applicationName": "notepad.exe",
  "action": "open",
  "windowTitle": "Untitled - Notepad",
  "category": "productive",
  "timestamp": "2025-01-30T04:30:00Z"
}
```

## Security Considerations

### Data Protection
- All communication uses HTTPS encryption
- Optional API key authentication
- Local data encryption for sensitive information
- Automatic data retention policies
- Secure credential storage

### Privacy Controls
- Keystroke logging disabled by default
- User consent mechanisms for sensitive features
- Configurable monitoring scope
- Data anonymization options
- Opt-out capabilities for non-essential monitoring

### Compliance Features
- GDPR-compliant data handling
- Employee notification mechanisms
- Audit trail maintenance
- Data export capabilities
- Right to deletion support

## Performance & Resource Usage

### System Impact
- **CPU Usage**: < 5% on average
- **Memory Usage**: < 100MB typical
- **Disk Usage**: Variable based on screenshot frequency
- **Network Usage**: < 1MB per hour for data transmission

### Optimization Settings
- Configurable monitoring intervals
- Screenshot compression and resizing
- Selective feature enabling/disabling
- Efficient file watching with filters
- Background processing optimization

## Troubleshooting

### Common Issues

#### Agent Won't Start
```bash
# Check .NET runtime installation
dotnet --version

# Verify permissions
# Run as administrator

# Check configuration
WorkView.Agent.exe --help
```

#### Connection Issues
```bash
# Test server connectivity
curl -I https://workview.company.com/api/health

# Check firewall settings
netsh advfirewall firewall show rule name="WorkView Agent"

# Verify API key (if using)
# Check server logs for authentication errors
```

#### High Resource Usage
```json
{
  "ScreenshotInterval": 600,
  "AppCheckInterval": 30,
  "CompressScreenshots": true,
  "MaxScreenshotSize": 1280
}
```

### Debug Mode
```bash
# Enable verbose logging
WorkView.Agent.exe <server_url> <employee_id> --debug

# Check log files
type "%TEMP%\WorkViewAgent\logs\agent.log"
```

### Performance Monitoring
```powershell
# Monitor agent performance
Get-Process -Name "WorkView.Agent" | Select-Object CPU, WorkingSet, VirtualMemorySize

# Check network usage
Get-NetTCPConnection -OwningProcess (Get-Process "WorkView.Agent").Id
```

## Legal & Compliance

### Employee Rights
⚠️ **Important Legal Notice**: Employee monitoring must comply with applicable laws:

- **Employee Consent**: Obtain explicit consent where required by law
- **Transparency**: Clearly communicate monitoring policies
- **Data Protection**: Comply with GDPR, CCPA, and local regulations
- **Purpose Limitation**: Monitor only for legitimate business purposes
- **Data Minimization**: Collect only necessary information
- **Retention Policies**: Implement appropriate data retention limits

### Best Practices
1. **Policy Documentation**: Maintain clear monitoring policies
2. **Regular Audits**: Review data collection practices
3. **Training**: Educate managers on proper monitoring use
4. **Technical Safeguards**: Implement appropriate security measures
5. **Legal Review**: Consult legal counsel before deployment

### Data Subject Rights
- Right to access collected data
- Right to rectification of inaccurate data
- Right to erasure (right to be forgotten)
- Right to data portability
- Right to object to processing

## Support & Development

### Bug Reports
Please report issues with:
- Agent version and build information
- Operating system details
- Error messages and logs
- Steps to reproduce the issue

### Feature Requests
Submit enhancement requests including:
- Business justification
- Detailed requirements
- Compliance considerations
- Integration impact assessment

### Contributing
1. Fork the repository
2. Create a feature branch
3. Implement changes with tests
4. Submit a pull request with documentation

## License

This software is proprietary to WorkView and is licensed for use only with authorized WorkView deployments. Unauthorized use, modification, or distribution is prohibited.

Copyright © 2025 WorkView. All rights reserved.