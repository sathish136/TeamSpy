import { useQuery } from "@tanstack/react-query";
import Sidebar from "@/components/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Search, Bell, User, Laptop, Monitor, HardDrive, Cpu, Wifi, Battery } from "lucide-react";

export default function Computers() {
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
                <h1 className="text-sm font-medium text-white">Computer Management</h1>
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

        {/* Computer Content */}
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Computer Fleet Management</h2>
            <p className="text-gray-600">Monitor and manage all workplace computers</p>
          </div>

          {/* Computer Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Laptop className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900">Total Computers</h3>
                    <p className="text-2xl font-bold text-gray-900">32</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Monitor className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900">Online</h3>
                    <p className="text-2xl font-bold text-green-600">28</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Wifi className="h-8 w-8 text-orange-600" />
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900">Network Issues</h3>
                    <p className="text-2xl font-bold text-orange-600">2</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <HardDrive className="h-8 w-8 text-red-600" />
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900">Low Storage</h3>
                    <p className="text-2xl font-bold text-red-600">4</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Computer List */}
            <Card>
              <CardHeader>
                <CardTitle>Computer Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { 
                      name: "DESK-001", 
                      user: "Seth McGregor", 
                      status: "online", 
                      cpu: 23, 
                      memory: 67, 
                      storage: 45,
                      lastSeen: "Active now"
                    },
                    { 
                      name: "DESK-002", 
                      user: "Anna Martinez", 
                      status: "online", 
                      cpu: 45, 
                      memory: 52, 
                      storage: 78,
                      lastSeen: "Active now"
                    },
                    { 
                      name: "DESK-003", 
                      user: "David Chen", 
                      status: "idle", 
                      cpu: 5, 
                      memory: 34, 
                      storage: 92,
                      lastSeen: "5 minutes ago"
                    },
                    { 
                      name: "DESK-004", 
                      user: "Sarah Johnson", 
                      status: "online", 
                      cpu: 67, 
                      memory: 89, 
                      storage: 34,
                      lastSeen: "Active now"
                    },
                    { 
                      name: "DESK-005", 
                      user: "Mike Wilson", 
                      status: "offline", 
                      cpu: 0, 
                      memory: 0, 
                      storage: 56,
                      lastSeen: "2 hours ago"
                    },
                  ].map((computer, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-medium text-gray-900">{computer.name}</h4>
                          <p className="text-sm text-gray-600">{computer.user}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge 
                            variant={computer.status === 'online' ? 'default' : computer.status === 'idle' ? 'secondary' : 'outline'}
                            className={
                              computer.status === 'online' ? 'bg-green-100 text-green-800' :
                              computer.status === 'idle' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }
                          >
                            {computer.status}
                          </Badge>
                          <Button variant="outline" size="sm">
                            Details
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-3 text-sm">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span>CPU</span>
                            <span>{computer.cpu}%</span>
                          </div>
                          <Progress value={computer.cpu} className="h-1" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span>Memory</span>
                            <span>{computer.memory}%</span>
                          </div>
                          <Progress value={computer.memory} className="h-1" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span>Storage</span>
                            <span>{computer.storage}%</span>
                          </div>
                          <Progress value={computer.storage} className="h-1" />
                        </div>
                      </div>
                      
                      <p className="text-xs text-gray-500 mt-2">{computer.lastSeen}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* System Health */}
            <Card>
              <CardHeader>
                <CardTitle>Fleet Health Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Average CPU Usage</span>
                      <span className="text-sm text-gray-600">28%</span>
                    </div>
                    <Progress value={28} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Average Memory Usage</span>
                      <span className="text-sm text-gray-600">48%</span>
                    </div>
                    <Progress value={48} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Average Storage Usage</span>
                      <span className="text-sm text-gray-600">61%</span>
                    </div>
                    <Progress value={61} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Network Connectivity</span>
                      <span className="text-sm text-gray-600">94%</span>
                    </div>
                    <Progress value={94} className="h-2" />
                  </div>

                  <div className="space-y-3 pt-4 border-t">
                    <h4 className="font-medium text-gray-900">Alerts & Issues</h4>
                    <div className="space-y-2">
                      <div className="p-2 bg-red-50 rounded text-sm">
                        <span className="font-medium text-red-800">DESK-003:</span>
                        <span className="text-red-700 ml-1">Storage 92% full</span>
                      </div>
                      <div className="p-2 bg-orange-50 rounded text-sm">
                        <span className="font-medium text-orange-800">DESK-007:</span>
                        <span className="text-orange-700 ml-1">High memory usage</span>
                      </div>
                      <div className="p-2 bg-yellow-50 rounded text-sm">
                        <span className="font-medium text-yellow-800">DESK-012:</span>
                        <span className="text-yellow-700 ml-1">Network latency high</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Hardware Information */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Hardware Inventory</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { model: "Dell OptiPlex 7090", count: 12, os: "Windows 11", warranty: "Active" },
                  { model: "HP EliteDesk 800", count: 8, os: "Windows 10", warranty: "Active" },
                  { model: "Lenovo ThinkCentre M720", count: 6, os: "Windows 11", warranty: "Expired" },
                  { model: "Apple iMac 24\"", count: 4, os: "macOS", warranty: "Active" },
                  { model: "ASUS VivoPC", count: 2, os: "Ubuntu", warranty: "Active" },
                ].map((hardware, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">{hardware.model}</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Count:</span>
                        <span className="font-medium">{hardware.count}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>OS:</span>
                        <span className="font-medium">{hardware.os}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Warranty:</span>
                        <Badge 
                          variant="outline"
                          className={
                            hardware.warranty === 'Active' 
                              ? 'border-green-200 text-green-800' 
                              : 'border-red-200 text-red-800'
                          }
                        >
                          {hardware.warranty}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}