#!/usr/bin/env python3
"""
WorkView Desktop Agent
A comprehensive employee monitoring agent that collects various system activities
and sends them to the WorkView dashboard via API.

Features:
- Session monitoring (login/logout/lock/unlock)
- Application tracking (open/close/focus)
- Website monitoring (URLs visited)
- Keystroke logging (optional, requires permissions)
- Screenshot capture (periodic)
- Clipboard monitoring
- File access logging
- Print job monitoring
- Email/chat metadata collection
- Network activity monitoring
- Real-time alert triggers
"""

import os
import sys
import time
import json
import requests
import threading
import datetime
import psutil
import socket
import platform
import subprocess
from typing import Dict, List, Optional
import urllib.parse

class WorkViewAgent:
    def __init__(self, server_url: str, employee_id: str, api_key: str = None):
        self.server_url = server_url.rstrip('/')
        self.employee_id = employee_id
        self.api_key = api_key
        self.computer_name = platform.node()
        self.ip_address = self.get_local_ip()
        self.agent_version = "1.0.0"
        self.os_name = platform.system()
        
        # Monitoring flags
        self.monitoring_enabled = True
        self.keystroke_logging_enabled = False  # Requires explicit consent
        self.screenshot_enabled = True
        self.file_monitoring_enabled = True
        self.network_monitoring_enabled = True
        
        # Data collection intervals (seconds)
        self.heartbeat_interval = 30
        self.screenshot_interval = 300  # 5 minutes
        self.app_check_interval = 10
        
        print(f"WorkView Agent v{self.agent_version} initialized")
        print(f"Employee ID: {self.employee_id}")
        print(f"Computer: {self.computer_name} ({self.os_name})")
        print(f"Server: {self.server_url}")

    def get_local_ip(self) -> str:
        """Get the local IP address"""
        try:
            # Connect to a remote server to get local IP
            s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
            s.connect(("8.8.8.8", 80))
            ip = s.getsockname()[0]
            s.close()
            return ip
        except:
            return "127.0.0.1"

    def make_api_request(self, endpoint: str, method: str = "POST", data: Dict = None) -> bool:
        """Make API request to WorkView server"""
        try:
            url = f"{self.server_url}/api/{endpoint}"
            headers = {'Content-Type': 'application/json'}
            
            if self.api_key:
                headers['Authorization'] = f"Bearer {self.api_key}"
            
            if method == "POST":
                response = requests.post(url, json=data, headers=headers, timeout=10)
            elif method == "GET":
                response = requests.get(url, headers=headers, timeout=10)
            else:
                return False
                
            if response.status_code in [200, 201]:
                print(f"✓ Sent {endpoint}: {response.status_code}")
                return True
            else:
                print(f"✗ Failed {endpoint}: {response.status_code} - {response.text}")
                return False
                
        except Exception as e:
            print(f"✗ API Error {endpoint}: {str(e)}")
            return False

    def log_session_event(self, session_type: str, metadata: Dict = None):
        """Log session events (login, logout, lock, unlock)"""
        data = {
            "employeeId": self.employee_id,
            "sessionType": session_type,
            "computerName": self.computer_name,
            "ipAddress": self.ip_address,
            "metadata": metadata or {}
        }
        self.make_api_request("sessions", data=data)

    def log_application_event(self, app_name: str, action: str, window_title: str = None, app_path: str = None):
        """Log application events (open, close, focus, blur)"""
        data = {
            "employeeId": self.employee_id,
            "applicationName": app_name,
            "action": action,
            "windowTitle": window_title,
            "applicationPath": app_path,
            "category": self.categorize_application(app_name)
        }
        self.make_api_request("applications", data=data)

    def log_website_visit(self, url: str, title: str = None, duration: int = None):
        """Log website visits"""
        try:
            parsed_url = urllib.parse.urlparse(url)
            domain = parsed_url.netloc
            
            data = {
                "employeeId": self.employee_id,
                "url": url,
                "title": title,
                "domain": domain,
                "duration": duration,
                "category": self.categorize_website(domain)
            }
            self.make_api_request("websites", data=data)
        except Exception as e:
            print(f"Error logging website: {e}")

    def log_keystroke_activity(self, app_name: str, window_title: str, keystroke_count: int, duration: int):
        """Log keystroke activity (optional feature)"""
        if not self.keystroke_logging_enabled:
            return
            
        data = {
            "employeeId": self.employee_id,
            "applicationName": app_name,
            "windowTitle": window_title,
            "keystrokeCount": keystroke_count,
            "duration": duration,
            "isEnabled": True
        }
        self.make_api_request("keystrokes", data=data)

    def capture_screenshot(self):
        """Capture screenshot and log to server"""
        if not self.screenshot_enabled:
            return
            
        try:
            # This would use a screenshot library like Pillow or PyAutoGUI
            # For demo purposes, we'll simulate the screenshot capture
            timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"screenshot_{self.employee_id}_{timestamp}.png"
            filepath = f"/tmp/screenshots/{filename}"  # Would be actual path
            
            data = {
                "employeeId": self.employee_id,
                "filePath": filepath,
                "fileName": filename,
                "screenNumber": 1,
                "fileSize": 1024000,  # Simulated file size
                "metadata": {
                    "resolution": "1920x1080",
                    "timestamp": timestamp
                }
            }
            self.make_api_request("screenshots", data=data)
            
        except Exception as e:
            print(f"Screenshot error: {e}")

    def log_clipboard_event(self, event_type: str, app_name: str, data_type: str = "text", data_size: int = 0):
        """Log clipboard events (copy, paste, cut)"""
        data = {
            "employeeId": self.employee_id,
            "eventType": event_type,
            "applicationName": app_name,
            "dataType": data_type,
            "dataSize": data_size,
            "isMonitored": True
        }
        self.make_api_request("clipboard-events", data=data)

    def log_file_activity(self, filepath: str, action: str, app_name: str = None, destination: str = None):
        """Log file access activities"""
        if not self.file_monitoring_enabled:
            return
            
        try:
            filename = os.path.basename(filepath)
            file_size = os.path.getsize(filepath) if os.path.exists(filepath) else 0
            file_ext = os.path.splitext(filename)[1]
            
            data = {
                "employeeId": self.employee_id,
                "filePath": filepath,
                "fileName": filename,
                "action": action,
                "fileSize": file_size,
                "fileType": file_ext,
                "destinationPath": destination,
                "applicationName": app_name,
                "riskLevel": self.assess_file_risk(filepath, action)
            }
            self.make_api_request("file-activities", data=data)
            
        except Exception as e:
            print(f"File activity error: {e}")

    def log_print_job(self, document_name: str, printer_name: str, pages: int = 1, copies: int = 1):
        """Log print jobs"""
        data = {
            "employeeId": self.employee_id,
            "documentName": document_name,
            "printerName": printer_name,
            "pages": pages,
            "copies": copies,
            "applicationName": self.get_active_application(),
            "status": "queued"
        }
        self.make_api_request("print-jobs", data=data)

    def log_communication(self, comm_type: str, app_name: str, participants: List[str], subject: str = None, is_incoming: bool = False):
        """Log email/chat metadata"""
        data = {
            "employeeId": self.employee_id,
            "type": comm_type,
            "applicationName": app_name,
            "participants": participants,
            "subject": subject,
            "isIncoming": is_incoming,
            "isMonitored": True
        }
        self.make_api_request("communications", data=data)

    def log_network_activity(self, dest_ip: str, dest_port: int, protocol: str, app_name: str, bytes_up: int = 0, bytes_down: int = 0):
        """Log network activity"""
        if not self.network_monitoring_enabled:
            return
            
        data = {
            "employeeId": self.employee_id,
            "destinationIp": dest_ip,
            "destinationPort": dest_port,
            "protocol": protocol,
            "bytesUploaded": bytes_up,
            "bytesDownloaded": bytes_down,
            "applicationName": app_name,
            "riskLevel": self.assess_network_risk(dest_ip, dest_port)
        }
        self.make_api_request("network-activity", data=data)

    def categorize_application(self, app_name: str) -> str:
        """Categorize application as productive, neutral, or unproductive"""
        productive_apps = ["code", "excel", "word", "outlook", "teams", "slack", "notion", "figma"]
        unproductive_apps = ["game", "facebook", "youtube", "netflix", "spotify", "tiktok"]
        
        app_lower = app_name.lower()
        
        for prod_app in productive_apps:
            if prod_app in app_lower:
                return "productive"
                
        for unprod_app in unproductive_apps:
            if unprod_app in app_lower:
                return "unproductive"
                
        return "neutral"

    def categorize_website(self, domain: str) -> str:
        """Categorize website as productive, neutral, or unproductive"""
        productive_domains = ["github.com", "stackoverflow.com", "docs.microsoft.com", "google.com/search"]
        unproductive_domains = ["facebook.com", "youtube.com", "netflix.com", "tiktok.com", "instagram.com"]
        
        domain_lower = domain.lower()
        
        for prod_domain in productive_domains:
            if prod_domain in domain_lower:
                return "productive"
                
        for unprod_domain in unproductive_domains:
            if unprod_domain in domain_lower:
                return "unproductive"
                
        return "neutral"

    def assess_file_risk(self, filepath: str, action: str) -> str:
        """Assess risk level of file activity"""
        high_risk_extensions = [".exe", ".bat", ".cmd", ".ps1", ".vbs"]
        sensitive_paths = ["/etc/", "C:\\Windows\\System32", "C:\\Program Files"]
        usb_actions = ["usb_transfer", "copy", "move"]
        
        file_ext = os.path.splitext(filepath)[1].lower()
        
        if file_ext in high_risk_extensions:
            return "high"
        
        if action in usb_actions:
            return "medium"
            
        for sensitive_path in sensitive_paths:
            if sensitive_path in filepath:
                return "medium"
                
        return "low"

    def assess_network_risk(self, dest_ip: str, dest_port: int) -> str:
        """Assess risk level of network activity"""
        # Check for suspicious ports or IP ranges
        high_risk_ports = [22, 23, 3389, 5900]  # SSH, Telnet, RDP, VNC
        
        if dest_port in high_risk_ports:
            return "high"
        
        # Check for internal network access
        if dest_ip.startswith("192.168.") or dest_ip.startswith("10.") or dest_ip.startswith("172."):
            return "low"
        
        return "medium"

    def get_active_application(self) -> str:
        """Get currently active application name"""
        try:
            # This would use OS-specific methods to get the active window
            # For demo, return a placeholder
            return "Unknown Application"
        except:
            return "Unknown Application"

    def update_employee_status(self, status: str):
        """Update employee online status"""
        data = {
            "status": status,
            "lastActive": datetime.datetime.now().isoformat(),
            "computerName": self.computer_name,
            "ipAddress": self.ip_address,
            "agentVersion": self.agent_version,
            "operatingSystem": self.os_name
        }
        self.make_api_request(f"employees/{self.employee_id}", method="PATCH", data=data)

    def monitor_applications(self):
        """Monitor running applications"""
        previous_apps = set()
        
        while self.monitoring_enabled:
            try:
                current_apps = set()
                
                # Get running processes
                for process in psutil.process_iter(['pid', 'name']):
                    try:
                        process_name = process.info['name']
                        current_apps.add(process_name)
                    except (psutil.NoSuchProcess, psutil.AccessDenied):
                        continue
                
                # Detect new applications
                new_apps = current_apps - previous_apps
                for app in new_apps:
                    self.log_application_event(app, "open")
                
                # Detect closed applications
                closed_apps = previous_apps - current_apps
                for app in closed_apps:
                    self.log_application_event(app, "close")
                
                previous_apps = current_apps
                time.sleep(self.app_check_interval)
                
            except Exception as e:
                print(f"Application monitoring error: {e}")
                time.sleep(self.app_check_interval)

    def monitor_network(self):
        """Monitor network connections"""
        while self.monitoring_enabled and self.network_monitoring_enabled:
            try:
                connections = psutil.net_connections(kind='inet')
                
                for conn in connections:
                    if conn.raddr:  # Only external connections
                        dest_ip, dest_port = conn.raddr
                        protocol = "TCP" if conn.type == socket.SOCK_STREAM else "UDP"
                        
                        # Get process name if available
                        app_name = "Unknown"
                        try:
                            if conn.pid:
                                process = psutil.Process(conn.pid)
                                app_name = process.name()
                        except:
                            pass
                        
                        self.log_network_activity(dest_ip, dest_port, protocol, app_name)
                
                time.sleep(60)  # Check every minute
                
            except Exception as e:
                print(f"Network monitoring error: {e}")
                time.sleep(60)

    def run_periodic_tasks(self):
        """Run periodic tasks like screenshots and heartbeat"""
        last_screenshot = 0
        last_heartbeat = 0
        
        while self.monitoring_enabled:
            current_time = time.time()
            
            # Take screenshot periodically
            if current_time - last_screenshot >= self.screenshot_interval:
                self.capture_screenshot()
                last_screenshot = current_time
            
            # Send heartbeat
            if current_time - last_heartbeat >= self.heartbeat_interval:
                self.update_employee_status("online")
                last_heartbeat = current_time
            
            time.sleep(10)  # Check every 10 seconds

    def start_monitoring(self):
        """Start all monitoring threads"""
        print("Starting WorkView Agent monitoring...")
        
        # Log initial session
        self.log_session_event("login", {
            "os": self.os_name,
            "agent_version": self.agent_version,
            "startup_time": datetime.datetime.now().isoformat()
        })
        
        # Update employee status
        self.update_employee_status("online")
        
        # Start monitoring threads
        threads = [
            threading.Thread(target=self.monitor_applications, daemon=True),
            threading.Thread(target=self.monitor_network, daemon=True),
            threading.Thread(target=self.run_periodic_tasks, daemon=True)
        ]
        
        for thread in threads:
            thread.start()
        
        print("All monitoring services started!")
        
        try:
            # Keep main thread alive
            while self.monitoring_enabled:
                time.sleep(1)
        except KeyboardInterrupt:
            print("\nShutting down WorkView Agent...")
            self.stop_monitoring()

    def stop_monitoring(self):
        """Stop all monitoring"""
        self.monitoring_enabled = False
        
        # Log session end
        self.log_session_event("logout", {
            "shutdown_time": datetime.datetime.now().isoformat()
        })
        
        # Update status
        self.update_employee_status("offline")
        
        print("WorkView Agent stopped.")

def main():
    """Main entry point"""
    if len(sys.argv) < 3:
        print("Usage: python workview_agent.py <server_url> <employee_id> [api_key]")
        print("Example: python workview_agent.py http://localhost:5000 emp123")
        sys.exit(1)
    
    server_url = sys.argv[1]
    employee_id = sys.argv[2]
    api_key = sys.argv[3] if len(sys.argv) > 3 else None
    
    agent = WorkViewAgent(server_url, employee_id, api_key)
    agent.start_monitoring()

if __name__ == "__main__":
    main()