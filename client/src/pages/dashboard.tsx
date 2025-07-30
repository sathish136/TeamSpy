import { useQuery } from "@tanstack/react-query";
import Sidebar from "@/components/sidebar";
import EmployeeTable from "@/components/employee-table";
import ActivityChart from "@/components/activity-chart";
import LiveStats from "@/components/live-stats";
import NotificationsWidget from "@/components/notifications-widget";
import TimeTrackingChart from "@/components/time-tracking-chart";
import TopApplications from "@/components/top-applications";
import { Button } from "@/components/ui/button";
import { Calendar, Search, Bell, User } from "lucide-react";

export default function Dashboard() {
  const { data: employees, isLoading: employeesLoading } = useQuery({
    queryKey: ["/api/employees"],
  });

  const { data: alerts } = useQuery({
    queryKey: ["/api/alerts"],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const unreadAlerts = (alerts as any[])?.filter((alert: any) => !alert.isRead) || [];

  return (
    <div className="min-h-screen bg-workview-light">
      <Sidebar />
      
      {/* Main Content */}
      <div className="ml-64">
        {/* Top Header */}
        <header className="bg-gradient-to-r from-workview-primary to-workview-primary-dark text-white px-6 py-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <h1 className="text-sm font-medium">Dashboard</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="relative">
                <input 
                  type="search" 
                  placeholder="Search..." 
                  className="bg-white bg-opacity-20 placeholder-blue-100 text-white rounded-md px-2.5 py-1 w-48 text-xs focus:outline-none focus:ring-2 focus:ring-white"
                />
                <Search className="absolute right-2 top-2 h-3 w-3 text-blue-100" />
              </div>
              
              <div className="flex items-center space-x-4">
                <button className="relative">
                  <Bell className="h-4 w-4" />
                  {unreadAlerts.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                      {unreadAlerts.length}
                    </span>
                  )}
                </button>
                
                <div className="flex items-center space-x-3">
                  <div className="w-7 h-7 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <User className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-[10px] font-medium">Main Admin</span>
                </div>
                
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white border-white text-[10px] px-2 py-1"
                >
                  EXPLAIN THIS PAGE
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
              <Button variant="outline" size="sm" className="text-[10px] px-2 py-1">EDIT</Button>
              <Button size="sm" className="bg-workview-primary hover:bg-workview-primary-dark text-[10px] px-2 py-1">ADD WIDGETS</Button>
            </div>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
            {/* Employee Table */}
            <div className="xl:col-span-3">
              <EmployeeTable employees={employees as any} isLoading={employeesLoading} />
            </div>

            {/* Right Sidebar Widgets */}
            <div className="space-y-4">
              <ActivityChart />
              <LiveStats />
              <NotificationsWidget alerts={unreadAlerts} />
            </div>
          </div>

          {/* Bottom Analytics Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
            <TimeTrackingChart />
            <TopApplications />
          </div>
        </main>
      </div>
    </div>
  );
}
