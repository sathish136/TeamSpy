import { useQuery } from "@tanstack/react-query";
import Sidebar from "@/components/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Calendar, 
  Search, 
  Bell, 
  User, 
  Clock, 
  Play, 
  Pause, 
  Square,
  Download,
  Filter,
  MoreHorizontal,
  TrendingUp,
  TrendingDown
} from "lucide-react";

export default function TimeTracking() {
  const { data: employees } = useQuery({
    queryKey: ["/api/employees"],
  });

  const { data: alerts } = useQuery({
    queryKey: ["/api/alerts"],
    refetchInterval: 30000,
  });

  const unreadAlerts = (alerts as any[])?.filter((alert: any) => !alert.isRead) || [];

  // Mock time tracking data
  const timeTrackingData = [
    {
      id: 1,
      employee: "Seth McGregor",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      status: "active",
      todayHours: "7h 23m",
      weekHours: "42h 15m",
      currentTask: "Frontend Development",
      startTime: "09:00 AM",
      productivity: 87,
      breaks: 3,
      overtime: "1h 23m"
    },
    {
      id: 2,
      employee: "Maria Rodriguez",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b25b6b5f?w=150&h=150&fit=crop&crop=face",
      status: "break",
      todayHours: "6h 45m",
      weekHours: "38h 30m",
      currentTask: "Database Design",
      startTime: "08:30 AM",
      productivity: 92,
      breaks: 2,
      overtime: "0h 00m"
    },
    {
      id: 3,
      employee: "David Chen",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      status: "offline",
      todayHours: "8h 00m",
      weekHours: "40h 00m",
      currentTask: "Code Review",
      startTime: "09:15 AM",
      productivity: 78,
      breaks: 4,
      overtime: "0h 00m"
    },
    {
      id: 4,
      employee: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      status: "active",
      todayHours: "6h 12m",
      weekHours: "35h 45m",
      currentTask: "UI Testing",
      startTime: "10:00 AM",
      productivity: 95,
      breaks: 1,
      overtime: "0h 00m"
    }
  ];

  const weeklyStats = {
    totalHours: "156h 30m",
    avgDaily: "7h 49m",
    productivity: 88,
    overtime: "12h 45m",
    breaks: 45
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500";
      case "break": return "bg-yellow-500";
      case "offline": return "bg-gray-400";
      default: return "bg-gray-400";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active": return "Working";
      case "break": return "On Break";
      case "offline": return "Offline";
      default: return "Unknown";
    }
  };

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
                <h1 className="text-sm font-medium text-white">Time Tracking</h1>
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
                  {unreadAlerts.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                      {unreadAlerts.length}
                    </span>
                  )}
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

        {/* Dashboard Content */}
        <main className="p-4">
          {/* Date Range and Actions */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="bg-white rounded-md px-2.5 py-1.5 shadow-sm border flex items-center space-x-1.5">
                <Calendar className="h-3 w-3 text-gray-500" />
                <span className="text-[10px] font-medium">Jan 15, 2025 - Jan 22, 2025</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="text-[10px] px-2 py-1">
                <Download className="h-3 w-3 mr-1" />
                EXPORT
              </Button>
              <Button size="sm" className="bg-workview-primary hover:bg-workview-primary-dark text-[10px] px-2 py-1">
                <Filter className="h-3 w-3 mr-1" />
                FILTER
              </Button>
            </div>
          </div>

          {/* Weekly Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
            <Card>
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-gray-600">Total Hours</p>
                    <p className="text-lg font-bold text-gray-900">{weeklyStats.totalHours}</p>
                  </div>
                  <Clock className="h-4 w-4 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-gray-600">Avg Daily</p>
                    <p className="text-lg font-bold text-gray-900">{weeklyStats.avgDaily}</p>
                  </div>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-gray-600">Productivity</p>
                    <p className="text-lg font-bold text-green-600">{weeklyStats.productivity}%</p>
                  </div>
                  <div className="w-4 h-4 bg-green-500 rounded-full" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-gray-600">Overtime</p>
                    <p className="text-lg font-bold text-orange-600">{weeklyStats.overtime}</p>
                  </div>
                  <TrendingDown className="h-4 w-4 text-orange-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-gray-600">Total Breaks</p>
                    <p className="text-lg font-bold text-gray-900">{weeklyStats.breaks}</p>
                  </div>
                  <Pause className="h-4 w-4 text-gray-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Time Tracking Table */}
          <Card className="overflow-hidden">
            <CardHeader className="px-4 py-3 border-b bg-gray-50">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-semibold text-gray-900">Employee Time Tracking</h2>
                <div className="flex items-center space-x-3">
                  <span className="text-[10px] text-gray-500">
                    {timeTrackingData.filter(emp => emp.status === "active").length} active, {timeTrackingData.filter(emp => emp.status === "break").length} on break
                  </span>
                  <div className="flex items-center space-x-1.5">
                    <button className="p-1 hover:bg-gray-200 rounded">
                      <Filter className="h-3 w-3 text-gray-400" />
                    </button>
                    <button className="p-1 hover:bg-gray-200 rounded">
                      <Download className="h-3 w-3 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-4 py-2.5 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                        Employee
                      </th>
                      <th className="px-4 py-2.5 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-2.5 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                        Today Hours
                      </th>
                      <th className="px-4 py-2.5 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                        Week Hours
                      </th>
                      <th className="px-4 py-2.5 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                        Current Task
                      </th>
                      <th className="px-4 py-2.5 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                        Productivity
                      </th>
                      <th className="px-4 py-2.5 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                        Breaks
                      </th>
                      <th className="px-4 py-2.5 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                        Overtime
                      </th>
                      <th className="px-4 py-2.5 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {timeTrackingData.map((employee) => (
                      <tr key={employee.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center">
                            <img 
                              className="h-8 w-8 rounded-full" 
                              src={employee.avatar} 
                              alt={employee.employee}
                            />
                            <div className="ml-3">
                              <div className="text-xs font-medium text-gray-900">{employee.employee}</div>
                              <div className="text-[10px] text-gray-500">Started: {employee.startTime}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${getStatusColor(employee.status)}`} />
                            <Badge 
                              variant={employee.status === "active" ? "default" : employee.status === "break" ? "secondary" : "outline"} 
                              className="text-[10px] px-1.5 py-0.5"
                            >
                              {getStatusText(employee.status)}
                            </Badge>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-xs font-medium text-gray-900">
                          {employee.todayHours}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-900">
                          {employee.weekHours}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-xs text-blue-600">
                          {employee.currentTask}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <Progress value={employee.productivity} className="h-1.5 w-12" />
                            <span className="text-xs font-medium text-gray-900">{employee.productivity}%</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-900">
                          {employee.breaks}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-900">
                          <span className={employee.overtime !== "0h 00m" ? "text-orange-600 font-medium" : ""}>
                            {employee.overtime}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center space-x-1">
                            <button className="p-1 hover:bg-gray-200 rounded" title="Start Timer">
                              <Play className="h-3 w-3 text-green-600" />
                            </button>
                            <button className="p-1 hover:bg-gray-200 rounded" title="Pause Timer">
                              <Pause className="h-3 w-3 text-yellow-600" />
                            </button>
                            <button className="p-1 hover:bg-gray-200 rounded" title="Stop Timer">
                              <Square className="h-3 w-3 text-red-600" />
                            </button>
                            <button className="p-1 hover:bg-gray-200 rounded" title="More Options">
                              <MoreHorizontal className="h-3 w-3 text-gray-400" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="px-4 py-3 border-t bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    Showing 1 to {timeTrackingData.length} of {timeTrackingData.length} employees
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="px-2 py-1 text-xs border rounded hover:bg-gray-100 disabled:opacity-50" disabled>
                      Previous
                    </button>
                    <button className="px-2 py-1 text-xs border rounded hover:bg-gray-100" disabled>
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}