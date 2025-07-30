#!/usr/bin/env python3
"""
Simple test script to verify WorkView Agent can connect to the dashboard
"""

import json
import requests
import socket
import platform
import sys

def get_local_ip():
    """Get the local IP address"""
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except:
        return "127.0.0.1"

def test_agent_connection():
    """Test agent connection to WorkView dashboard"""
    
    # Load configuration
    try:
        with open('agent_config.json', 'r') as f:
            config = json.load(f)
    except FileNotFoundError:
        print("❌ agent_config.json not found")
        return False
    
    server_url = config['server_url']
    employee_id = config['employee_id']
    
    print(f"🔗 Testing connection to WorkView Dashboard at {server_url}")
    print(f"👤 Employee ID: {employee_id}")
    
    # Test basic API connectivity
    try:
        response = requests.get(f"{server_url}/api/employees", timeout=5)
        if response.status_code == 200:
            print("✅ API connection successful")
        else:
            print(f"❌ API connection failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Cannot connect to server: {str(e)}")
        return False
    
    # Test agent registration
    try:
        registration_data = {
            "employeeId": employee_id,
            "computerName": platform.node(),
            "ipAddress": get_local_ip(),
            "agentVersion": "1.0.0",
            "operatingSystem": platform.system()
        }
        
        response = requests.post(
            f"{server_url}/api/agent/register", 
            json=registration_data,
            headers={'Content-Type': 'application/json'},
            timeout=10
        )
        
        if response.status_code == 200:
            result = response.json()
            print("✅ Agent registration successful")
            print(f"📋 Employee: {result.get('employee', {}).get('name', 'Unknown')}")
            return True
        else:
            print(f"❌ Agent registration failed: {response.status_code}")
            print(f"Response: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Registration error: {str(e)}")
        return False

if __name__ == "__main__":
    print("WorkView Agent Connection Test")
    print("=" * 40)
    
    success = test_agent_connection()
    
    if success:
        print("\n🎉 Agent connection test successful!")
        print("Your agent is ready to connect to WorkView Dashboard")
    else:
        print("\n❌ Agent connection test failed!")
        print("Please check your configuration and server status")
        sys.exit(1)