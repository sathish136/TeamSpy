import { useQuery } from "@tanstack/react-query";
import Sidebar from "@/components/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Search, Bell, User, Server, Database, Cpu, HardDrive, Wifi, Activity } from "lucide-react";

export default function System() {
  return (
    <div className="min-h-screen bg-workview-light">
      <Sidebar />
      
      {/* Main Content */}
      <div className="ml-64">
        {/* Top Header */}
        <header className="bg-gray-800 text-white px-6 py-4 shadow-lg border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <h1 className="text-sm font-medium text-white">System Administration</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="relative">
                <input 
                  type="search" 
                  placeholder="Search..." 
                  className="bg-gray-700 placeholder-gray-400 text-white rounded-md px-2.5 py-1 w-48 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-600"
                />
                <Search className="absolute right-2 top-2 h-3 w-3 text-gray-400" />
              </div>
              
              <div className="flex items-center space-x-4">
                <button className="relative text-white hover:text-gray-300">
                  <Bell className="h-4 w-4" />
                </button>
                
                <div className="flex items-center space-x-3">
                  <div className="w-7 h-7 bg-gray-700 rounded-full flex items-center justify-center">
                    <User className="h-3.5 w-3.5 text-white" />
                  </div>
                  <span className="text-[10px] font-medium text-white">Main Admin</span>
                </div>
                
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600 text-[10px] px-2 py-1"
                >
                  HELP
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* System Content */}
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">System Health & Performance</h2>
            <p className="text-gray-600">Monitor server status and system resources</p>
          </div>

          {/* System Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card className="border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Server className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900">Server Status</h3>
                    <p className="text-lg font-bold text-green-600">Online</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Database className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900">Database</h3>
                    <p className="text-lg font-bold text-blue-600">Active</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Activity className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900">Uptime</h3>
                    <p className="text-lg font-bold text-purple-600">99.9%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Wifi className="h-8 w-8 text-orange-600" />
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900">Network</h3>
                    <p className="text-lg font-bold text-orange-600">Stable</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* System Resources */}
            <Card>
              <CardHeader>
                <CardTitle>Server Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <Cpu className="h-4 w-4 mr-2 text-blue-600" />
                        <span className="text-sm font-medium">CPU Usage</span>
                      </div>
                      <span className="text-sm text-gray-600">23%</span>
                    </div>
                    <Progress value={23} className="h-2" />
                    <p className="text-xs text-gray-500 mt-1">Intel Xeon E5-2680 v4</p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <Activity className="h-4 w-4 mr-2 text-green-600" />
                        <span className="text-sm font-medium">Memory Usage</span>
                      </div>
                      <span className="text-sm text-gray-600">45% (18GB/40GB)</span>
                    </div>
                    <Progress value={45} className="h-2" />
                    <p className="text-xs text-gray-500 mt-1">DDR4 ECC Memory</p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <HardDrive className="h-4 w-4 mr-2 text-orange-600" />
                        <span className="text-sm font-medium">Disk Usage</span>
                      </div>
                      <span className="text-sm text-gray-600">62% (620GB/1TB)</span>
                    </div>
                    <Progress value={62} className="h-2" />
                    <p className="text-xs text-gray-500 mt-1">SSD RAID 1 Configuration</p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <Wifi className="h-4 w-4 mr-2 text-purple-600" />
                        <span className="text-sm font-medium">Network I/O</span>
                      </div>
                      <span className="text-sm text-gray-600">156 Mbps</span>
                    </div>
                    <Progress value={34} className="h-2" />
                    <p className="text-xs text-gray-500 mt-1">Gigabit Ethernet</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* System Services */}
            <Card>
              <CardHeader>
                <CardTitle>System Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { service: "WorkView Monitor", status: "running", cpu: 12, memory: 234 },
                    { service: "Database Server", status: "running", cpu: 8, memory: 1024 },
                    { service: "Web Server", status: "running", cpu: 5, memory: 156 },
                    { service: "File Transfer Service", status: "running", cpu: 2, memory: 89 },
                    { service: "Authentication Service", status: "running", cpu: 1, memory: 67 },
                    { service: "Backup Service", status: "stopped", cpu: 0, memory: 0 },
                  ].map((service, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">{service.service}</h4>
                        <p className="text-sm text-gray-600">
                          CPU: {service.cpu}% | Memory: {service.memory}MB
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={service.status === 'running' ? 'default' : 'outline'}
                          className={
                            service.status === 'running' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }
                        >
                          {service.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          {service.status === 'running' ? 'Stop' : 'Start'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* System Logs & Events */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent System Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { time: "10:23 AM", event: "Database backup completed successfully", type: "info" },
                    { time: "10:15 AM", event: "New employee workstation connected", type: "info" },
                    { time: "09:45 AM", event: "System update installed", type: "success" },
                    { time: "09:30 AM", event: "High memory usage detected", type: "warning" },
                    { time: "09:12 AM", event: "Security scan completed - no threats found", type: "success" },
                    { time: "08:55 AM", event: "Failed login attempt from unknown IP", type: "error" },
                  ].map((log, index) => (
                    <div key={index} className="flex items-start space-x-3 p-2">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        log.type === 'success' ? 'bg-green-500' :
                        log.type === 'warning' ? 'bg-yellow-500' :
                        log.type === 'error' ? 'bg-red-500' :
                        'bg-blue-500'
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{log.event}</p>
                        <p className="text-xs text-gray-500">{log.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Maintenance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">Scheduled Maintenance</h4>
                    <p className="text-sm text-blue-700 mb-2">Database optimization and cleanup</p>
                    <p className="text-xs text-blue-600">Next run: Tonight at 2:00 AM</p>
                  </div>
                  
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2">Last Backup</h4>
                    <p className="text-sm text-green-700 mb-2">Full system backup completed</p>
                    <p className="text-xs text-green-600">2 hours ago - 2.3GB</p>
                  </div>
                  
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <h4 className="font-medium text-orange-800 mb-2">System Updates</h4>
                    <p className="text-sm text-orange-700 mb-2">3 security updates available</p>
                    <Button size="sm" className="mt-2">Install Updates</Button>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">Quick Actions</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm">Restart Services</Button>
                      <Button variant="outline" size="sm">Clear Cache</Button>
                      <Button variant="outline" size="sm">Export Logs</Button>
                      <Button variant="outline" size="sm">Run Diagnostics</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}