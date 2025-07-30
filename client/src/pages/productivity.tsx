import { useQuery } from "@tanstack/react-query";
import Sidebar from "@/components/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Search, Bell, User, TrendingUp, Target, Award, BarChart } from "lucide-react";

export default function Productivity() {
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
                <h1 className="text-sm font-medium text-white">Productivity Analytics</h1>
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

        {/* Productivity Content */}
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Productivity Dashboard</h2>
            <p className="text-gray-600">Track and analyze employee productivity metrics</p>
          </div>

          {/* Productivity Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900">Overall Score</h3>
                    <p className="text-2xl font-bold text-green-600">87%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Target className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900">Goals Met</h3>
                    <p className="text-2xl font-bold text-blue-600">23/28</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Award className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900">Top Performers</h3>
                    <p className="text-2xl font-bold text-purple-600">8</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <BarChart className="h-8 w-8 text-orange-600" />
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900">Improvement</h3>
                    <p className="text-2xl font-bold text-orange-600">+5.2%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Employee Productivity Ranking */}
            <Card>
              <CardHeader>
                <CardTitle>Employee Productivity Ranking</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Sarah Johnson", score: 95, change: "+3%", rank: 1 },
                    { name: "David Chen", score: 92, change: "+1%", rank: 2 },
                    { name: "Anna Martinez", score: 89, change: "-2%", rank: 3 },
                    { name: "Seth McGregor", score: 87, change: "+5%", rank: 4 },
                    { name: "Mike Wilson", score: 84, change: "+2%", rank: 5 },
                    { name: "Lisa Brown", score: 81, change: "-1%", rank: 6 },
                  ].map((employee, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                          employee.rank === 1 ? 'bg-yellow-500' :
                          employee.rank === 2 ? 'bg-gray-400' :
                          employee.rank === 3 ? 'bg-amber-600' :
                          'bg-gray-600'
                        }`}>
                          {employee.rank}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{employee.name}</p>
                          <p className="text-sm text-gray-600">Productivity Score</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">{employee.score}%</p>
                        <p className={`text-sm ${
                          employee.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {employee.change}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Productivity Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Productivity Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Focus Time</span>
                      <span className="text-sm text-gray-600">6.2h avg/day</span>
                    </div>
                    <Progress value={78} className="h-2" />
                    <p className="text-xs text-gray-500 mt-1">Target: 8h/day</p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Task Completion</span>
                      <span className="text-sm text-gray-600">82%</span>
                    </div>
                    <Progress value={82} className="h-2" />
                    <p className="text-xs text-gray-500 mt-1">Target: 85%</p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Meeting Efficiency</span>
                      <span className="text-sm text-gray-600">67%</span>
                    </div>
                    <Progress value={67} className="h-2" />
                    <p className="text-xs text-gray-500 mt-1">Target: 75%</p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Response Time</span>
                      <span className="text-sm text-gray-600">94%</span>
                    </div>
                    <Progress value={94} className="h-2" />
                    <p className="text-xs text-gray-500 mt-1">Target: 90%</p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Collaboration</span>
                      <span className="text-sm text-gray-600">71%</span>
                    </div>
                    <Progress value={71} className="h-2" />
                    <p className="text-xs text-gray-500 mt-1">Target: 80%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Productivity Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Productive Apps</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { app: "Visual Studio Code", time: "4.2h", productivity: 95 },
                    { app: "Microsoft Word", time: "3.1h", productivity: 89 },
                    { app: "Excel", time: "2.8h", productivity: 87 },
                    { app: "Figma", time: "2.3h", productivity: 92 },
                    { app: "Slack", time: "1.9h", productivity: 76 },
                  ].map((app, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{app.app}</p>
                        <p className="text-sm text-gray-600">{app.time} daily</p>
                      </div>
                      <Badge 
                        variant="outline"
                        className={
                          app.productivity >= 90 ? 'border-green-200 text-green-800' :
                          app.productivity >= 80 ? 'border-blue-200 text-blue-800' :
                          'border-orange-200 text-orange-800'
                        }
                      >
                        {app.productivity}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Peak Performance Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { time: "9:00 - 10:00", score: 92 },
                    { time: "10:00 - 11:00", score: 89 },
                    { time: "14:00 - 15:00", score: 87 },
                    { time: "15:00 - 16:00", score: 85 },
                    { time: "11:00 - 12:00", score: 83 },
                  ].map((hour, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">{hour.time}</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={hour.score} className="h-2 w-16" />
                        <span className="text-sm text-gray-600">{hour.score}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Productivity Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-1">Improvement Areas</h4>
                    <p className="text-sm text-green-700">
                      Focus time increased by 12% this week
                    </p>
                  </div>
                  
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-1">Stable Performance</h4>
                    <p className="text-sm text-blue-700">
                      Task completion remains consistent
                    </p>
                  </div>
                  
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <h4 className="font-medium text-orange-800 mb-1">Needs Attention</h4>
                    <p className="text-sm text-orange-700">
                      Meeting efficiency below target
                    </p>
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