import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Filter, Download } from "lucide-react";
import { Employee } from "@shared/schema";

interface EmployeeTableProps {
  employees?: Employee[];
  isLoading: boolean;
}

const ActivityIndicator = ({ activity }: { activity: string }) => {
  // Create activity bars based on the current activity
  const getActivityBars = () => {
    const bars = [];
    for (let i = 0; i < 5; i++) {
      let color = "bg-green-400";
      if (activity.includes("youtube")) color = i === 1 ? "bg-red-400" : "bg-green-400";
      else if (activity.includes("linkedin")) color = i === 3 ? "bg-yellow-400" : "bg-green-400";
      else if (activity.includes("teams")) color = i === 4 ? "bg-yellow-400" : "bg-green-400";
      else if (activity.includes("slack")) color = i === 3 ? "bg-yellow-400" : "bg-green-400";
      else if (activity.includes("drive")) color = i === 2 ? "bg-yellow-400" : "bg-green-400";
      
      bars.push(
        <div key={i} className={`w-1 h-4 ${color} rounded-sm`} />
      );
    }
    return bars;
  };

  return (
    <div className="flex items-center space-x-1">
      {getActivityBars()}
    </div>
  );
};

export default function EmployeeTable({ employees, isLoading }: EmployeeTableProps) {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="px-6 py-4 border-b bg-gray-50">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Online Employees</h2>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">
              {employees?.filter(emp => emp.isOnline).length || 0} online, 0 idle
            </span>
            <div className="flex items-center space-x-2">
              <button className="p-1 hover:bg-gray-200 rounded">
                <Filter className="h-4 w-4 text-gray-400" />
              </button>
              <button className="p-1 hover:bg-gray-200 rounded">
                <Download className="h-4 w-4 text-gray-400" />
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Computer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Task
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Activity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time Worked
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Activity
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employees?.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50 cursor-pointer">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={employee.avatar} alt={employee.name} />
                        <AvatarFallback>
                          {employee.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                        <div className="flex items-center">
                          <div className={`w-2 h-2 rounded-full mr-2 ${
                            employee.isOnline ? 'bg-green-400' : 'bg-gray-400'
                          }`} />
                          <Badge variant={employee.isOnline ? "default" : "secondary"} className="text-xs">
                            {employee.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {employee.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {employee.computer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {employee.currentTask}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                    {employee.currentActivity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {employee.timeWorked}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <ActivityIndicator activity={employee.currentActivity} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 border-t bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing 1 to {employees?.length || 0} of {employees?.length || 0} employees
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-sm border rounded-md hover:bg-gray-100 disabled:opacity-50" disabled>
                Previous
              </button>
              <button className="px-3 py-1 text-sm border rounded-md hover:bg-gray-100" disabled>
                Next
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
