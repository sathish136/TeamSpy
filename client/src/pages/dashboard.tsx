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

  const unreadAlerts = alerts?.filter((alert: any) => !alert.isRead) || [];

  return (
    <div className="min-h-screen bg-teramind-light">
      <Sidebar />
      
      {/* Main Content */}
      <div className="ml-64">
        {/* Top Header */}
        <header className="bg-gradient-to-r from-[#FF6B35] to-orange-500 text-white px-6 py-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-semibold">Dashboard</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="relative">
                <input 
                  type="search" 
                  placeholder="Search..." 
                  className="bg-white bg-opacity-20 placeholder-orange-100 text-white rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <Search className="absolute right-3 top-3 h-4 w-4 text-orange-100" />
              </div>
              
              <div className="flex items-center space-x-4">
                <button className="relative">
                  <Bell className="h-5 w-5" />
                  {unreadAlerts.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {unreadAlerts.length}
                    </span>
                  )}
                </button>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium">Main Admin</span>
                </div>
                
                <Button 
                  variant="ghost" 
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white border-white"
                >
                  EXPLAIN THIS PAGE
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {/* Date Range and Actions */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="bg-white rounded-lg px-4 py-2 shadow-sm border flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium">Jan 15, 2025 - Jan 22, 2025</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline">EDIT</Button>
              <Button className="bg-[#FF6B35] hover:bg-orange-600">ADD WIDGETS</Button>
            </div>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Employee Table */}
            <div className="xl:col-span-3">
              <EmployeeTable employees={employees} isLoading={employeesLoading} />
            </div>

            {/* Right Sidebar Widgets */}
            <div className="space-y-6">
              <ActivityChart />
              <LiveStats />
              <NotificationsWidget alerts={unreadAlerts} />
            </div>
          </div>

          {/* Bottom Analytics Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <TimeTrackingChart />
            <TopApplications />
          </div>
        </main>
      </div>
    </div>
  );
}
