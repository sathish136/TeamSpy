import { useQuery } from "@tanstack/react-query";
import Sidebar from "@/components/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Search, Bell, User, Monitor, Activity, Wifi, HardDrive, Cpu } from "lucide-react";

export default function Monitoring() {
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
                <h1 className="text-sm font-medium text-white">Real-time Monitoring</h1>
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

        {/* Monitoring Content */}
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">System Monitoring</h2>
            <p className="text-gray-600">Real-time monitoring of employee computers and network activity</p>
          </div>

          {/* System Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Monitor className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900">Active Screens</h3>
                    <p className="text-2xl font-bold text-gray-900">24</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Activity className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900">CPU Usage</h3>
                    <p className="text-2xl font-bold text-gray-900">45%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Wifi className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900">Network Load</h3>
                    <p className="text-2xl font-bold text-gray-900">76%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <HardDrive className="h-8 w-8 text-orange-600" />
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900">Storage Used</h3>
                    <p className="text-2xl font-bold text-gray-900">62%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Live Employee Monitoring */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Live Employee Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Seth McGregor", status: "active", app: "Microsoft Word", cpu: 23 },
                    { name: "Anna Martinez", status: "active", app: "Google Chrome", cpu: 45 },
                    { name: "David Chen", status: "idle", app: "Slack", cpu: 5 },
                    { name: "Sarah Johnson", status: "active", app: "Visual Studio Code", cpu: 67 },
                    { name: "Mike Wilson", status: "away", app: "Outlook", cpu: 12 },
                  ].map((employee, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{employee.name}</p>
                          <p className="text-sm text-gray-600">{employee.app}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge 
                          variant={employee.status === 'active' ? 'default' : employee.status === 'idle' ? 'secondary' : 'outline'}
                          className={
                            employee.status === 'active' ? 'bg-green-100 text-green-800' :
                            employee.status === 'idle' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }
                        >
                          {employee.status}
                        </Badge>
                        <div className="text-right">
                          <p className="text-sm font-medium">{employee.cpu}%</p>
                          <p className="text-xs text-gray-600">CPU</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">CPU Usage</span>
                      <span className="text-sm text-gray-600">45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Memory Usage</span>
                      <span className="text-sm text-gray-600">68%</span>
                    </div>
                    <Progress value={68} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Network Load</span>
                      <span className="text-sm text-gray-600">76%</span>
                    </div>
                    <Progress value={76} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Disk Usage</span>
                      <span className="text-sm text-gray-600">62%</span>
                    </div>
                    <Progress value={62} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Bandwidth</span>
                      <span className="text-sm text-gray-600">34%</span>
                    </div>
                    <Progress value={34} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Active Applications */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Most Active Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { app: "Microsoft Word", users: 12, usage: "High" },
                  { app: "Google Chrome", users: 18, usage: "Very High" },
                  { app: "Visual Studio Code", users: 8, usage: "High" },
                  { app: "Slack", users: 24, usage: "Medium" },
                  { app: "Excel", users: 15, usage: "High" },
                  { app: "Photoshop", users: 3, usage: "Low" },
                ].map((app, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{app.app}</h4>
                      <Badge 
                        variant="outline"
                        className={
                          app.usage === "Very High" ? "border-red-200 text-red-800" :
                          app.usage === "High" ? "border-orange-200 text-orange-800" :
                          app.usage === "Medium" ? "border-yellow-200 text-yellow-800" :
                          "border-green-200 text-green-800"
                        }
                      >
                        {app.usage}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{app.users} active users</p>
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