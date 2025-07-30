# WorkView Desktop Agent

A comprehensive employee monitoring agent that collects system activities and sends them to the WorkView dashboard.

## Features

### Core Monitoring
- **Session Monitoring**: Login, logout, lock, unlock events
- **Application Tracking**: Application open/close/focus events with categorization
- **Website Monitoring**: URLs visited with time tracking and categorization
- **Network Activity**: IP addresses accessed, bandwidth usage, protocol analysis

### Advanced Monitoring (Optional)
- **Keystroke Logging**: Keyboard input monitoring (requires explicit consent)
- **Screen Recording**: Periodic screenshot capture
- **Clipboard Monitoring**: Copy/paste event tracking
- **File Access Logging**: File operations with risk assessment
- **Print Monitoring**: Document printing activities
- **Communication Metadata**: Email/chat participants and subjects

### Security & Compliance
- **Risk Assessment**: Automatic risk scoring for file and network activities
- **Privacy Controls**: Optional features require explicit permission
- **Real-time Alerts**: Immediate notification of policy violations
- **Audit Trail**: Complete activity logging for compliance

## Installation

1. Install Python 3.7 or higher
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Usage

### Basic Usage
```bash
python workview_agent.py <server_url> <employee_id>
```

### With API Key
```bash
python workview_agent.py <server_url> <employee_id> <api_key>
```

### Examples
```bash
# Connect to local WorkView server
python workview_agent.py http://localhost:5000 emp123

# Connect to production server with API key
python workview_agent.py https://workview.company.com emp123 sk_live_abc123

# Connect to Replit deployment
python workview_agent.py https://your-app.replit.app emp123
```

## Configuration

The agent can be configured by modifying the `WorkViewAgent` class initialization:

```python
agent = WorkViewAgent(server_url, employee_id, api_key)

# Enable/disable monitoring features
agent.keystroke_logging_enabled = False  # Requires consent
agent.screenshot_enabled = True
agent.file_monitoring_enabled = True
agent.network_monitoring_enabled = True

# Adjust monitoring intervals
agent.heartbeat_interval = 30        # Employee status updates (seconds)
agent.screenshot_interval = 300      # Screenshot capture (seconds)
agent.app_check_interval = 10        # Application monitoring (seconds)
```

## Data Collection

### Session Events
- Login/logout timestamps
- Screen lock/unlock events
- Idle time detection
- System boot/shutdown

### Application Monitoring
- Process start/stop events
- Window focus changes
- Application categorization (productive/neutral/unproductive)
- Usage duration tracking

### Website Tracking
- Browser URL monitoring
- Page titles and domains
- Time spent per site
- Website categorization

### File Activities
- File open/create/delete/modify events
- USB transfer detection
- File size and type tracking
- Risk level assessment

### Network Monitoring
- Outbound connections
- IP addresses and ports
- Bandwidth usage
- Protocol analysis

### Security Features
- Real-time threat detection
- Policy violation alerts
- USB device monitoring
- Suspicious file access detection

## API Endpoints

The agent communicates with these WorkView API endpoints:

- `POST /api/sessions` - Session events
- `POST /api/applications` - Application events
- `POST /api/websites` - Website visits
- `POST /api/keystrokes` - Keystroke data (optional)
- `POST /api/screenshots` - Screenshot metadata
- `POST /api/clipboard-events` - Clipboard activities
- `POST /api/file-activities` - File operations
- `POST /api/print-jobs` - Print activities
- `POST /api/communications` - Email/chat metadata
- `POST /api/network-activity` - Network connections
- `PATCH /api/employees/{id}` - Employee status updates

## Security & Privacy

### Data Protection
- All data transmission uses HTTPS
- Optional API key authentication
- No sensitive content is collected without explicit consent
- Keystroke logging is disabled by default

### Compliance
- GDPR-compliant data collection
- Employee consent mechanisms
- Data retention policies
- Audit trail maintenance

### Risk Assessment
The agent automatically assesses risk levels for activities:

- **File Activities**: Based on file types, locations, and actions
- **Network Activities**: Based on destinations, ports, and protocols
- **Application Usage**: Based on productivity categorization
- **Security Events**: Based on threat detection rules

## Running as a Service

### Windows Service
```batch
# Install as Windows service
python workview_agent.py --install-service

# Start service
net start WorkViewAgent
```

### Linux Service (systemd)
```bash
# Create service file
sudo cp workview-agent.service /etc/systemd/system/

# Enable and start
sudo systemctl enable workview-agent
sudo systemctl start workview-agent
```

### macOS LaunchAgent
```bash
# Copy plist file
cp com.workview.agent.plist ~/Library/LaunchAgents/

# Load and start
launchctl load ~/Library/LaunchAgents/com.workview.agent.plist
```

## Troubleshooting

### Connection Issues
- Verify server URL is accessible
- Check firewall settings
- Ensure API key is correct (if using)

### Permission Issues
- Run as administrator/root for system monitoring
- Grant necessary permissions on macOS/Linux
- Check antivirus software blocking

### Performance
- Adjust monitoring intervals for lower resource usage
- Disable unused monitoring features
- Monitor system resource consumption

## Legal Considerations

⚠️ **Important**: Employee monitoring must comply with local laws and regulations:

- Obtain proper employee consent
- Follow data protection regulations (GDPR, CCPA)
- Implement appropriate data retention policies
- Ensure transparent monitoring policies
- Respect employee privacy rights

Always consult with legal counsel before implementing employee monitoring systems.