import { useQuery } from "@tanstack/react-query";
import Sidebar from "@/components/sidebar";
import EmployeeTable from "@/components/employee-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Bell, User, UserPlus, Users, UserCheck, UserX } from "lucide-react";

export default function Employees() {
  const { data: employees, isLoading: employeesLoading } = useQuery({
    queryKey: ["/api/employees"],
  });

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
                <h1 className="text-sm font-medium text-white">Employee Management</h1>
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

        {/* Employee Content */}
        <div className="p-6">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Employee Directory</h2>
                <p className="text-gray-600">Manage and monitor all employees</p>
              </div>
              <Button className="bg-workview-primary hover:bg-workview-primary/90">
                <UserPlus className="h-4 w-4 mr-2" />
                Add Employee
              </Button>
            </div>
          </div>

          {/* Employee Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900">Total Employees</h3>
                    <p className="text-2xl font-bold text-gray-900">{(employees as any[])?.length || 0}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <UserCheck className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900">Active</h3>
                    <p className="text-2xl font-bold text-green-600">
                      {(employees as any[])?.filter((emp: any) => emp.status === 'online')?.length || 0}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <UserX className="h-8 w-8 text-red-600" />
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900">Offline</h3>
                    <p className="text-2xl font-bold text-red-600">
                      {(employees as any[])?.filter((emp: any) => emp.status === 'offline')?.length || 0}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <User className="h-8 w-8 text-yellow-600" />
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900">Idle</h3>
                    <p className="text-2xl font-bold text-yellow-600">
                      {(employees as any[])?.filter((emp: any) => emp.status === 'idle')?.length || 0}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Employee List */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>All Employees</CardTitle>
                </CardHeader>
                <CardContent>
                  {employeesLoading ? (
                    <div className="flex items-center justify-center h-32">
                      <div className="text-gray-500">Loading employees...</div>
                    </div>
                  ) : (
                    <EmployeeTable isLoading={employeesLoading} />
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Employee Quick Stats */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Department Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { dept: "Engineering", count: 12, active: 10 },
                      { dept: "Marketing", count: 8, active: 7 },
                      { dept: "Sales", count: 6, active: 5 },
                      { dept: "Design", count: 4, active: 4 },
                      { dept: "HR", count: 2, active: 2 },
                    ].map((dept, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{dept.dept}</p>
                          <p className="text-sm text-gray-600">{dept.count} employees</p>
                        </div>
                        <Badge 
                          variant="outline"
                          className="bg-green-50 border-green-200 text-green-800"
                        >
                          {dept.active} active
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { action: "Login", employee: "Sarah Johnson", time: "2 min ago" },
                      { action: "Task Complete", employee: "David Chen", time: "15 min ago" },
                      { action: "Break Started", employee: "Anna Martinez", time: "23 min ago" },
                      { action: "Login", employee: "Mike Wilson", time: "1 hour ago" },
                      { action: "Logout", employee: "Lisa Brown", time: "2 hours ago" },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <div>
                          <span className="font-medium text-gray-900">{activity.employee}</span>
                          <span className="text-gray-600 ml-2">{activity.action}</span>
                        </div>
                        <span className="text-gray-500">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Average Productivity</span>
                      <span className="font-bold text-green-600">87%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">On-time Attendance</span>
                      <span className="font-bold text-blue-600">94%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Task Completion</span>
                      <span className="font-bold text-purple-600">91%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Policy Compliance</span>
                      <span className="font-bold text-orange-600">96%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}