import { useQuery } from "@tanstack/react-query";
import Sidebar from "@/components/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Download, Filter, Search, Bell, User } from "lucide-react";

export default function Reports() {
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
                <h1 className="text-sm font-medium text-white">Reports</h1>
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

        {/* Reports Content */}
        <div className="p-6">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Employee Reports</h2>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Date Range
                </Button>
                <Button className="bg-workview-primary hover:bg-workview-primary/90">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Productivity Report */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Productivity Report</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Weekly productivity analysis for all employees</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Average Productivity</span>
                    <span className="font-semibold text-green-600">87%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Active Hours</span>
                    <span className="font-semibold">156.5h</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Idle Time</span>
                    <span className="font-semibold text-orange-600">23.5h</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  View Details
                </Button>
              </CardContent>
            </Card>

            {/* Time Tracking Report */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Time Tracking Report</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Detailed time analysis and attendance</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Total Hours</span>
                    <span className="font-semibold">180h</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>On Time</span>
                    <span className="font-semibold text-green-600">95%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Late Arrivals</span>
                    <span className="font-semibold text-red-600">3</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  View Details
                </Button>
              </CardContent>
            </Card>

            {/* Application Usage Report */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Application Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Most used applications and websites</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Work Applications</span>
                    <span className="font-semibold text-green-600">78%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Communication</span>
                    <span className="font-semibold">15%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Other</span>
                    <span className="font-semibold text-orange-600">7%</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  View Details
                </Button>
              </CardContent>
            </Card>

            {/* Security Report */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Security Report</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Security violations and risk assessment</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Violations</span>
                    <span className="font-semibold text-red-600">2</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Risk Level</span>
                    <span className="font-semibold text-yellow-600">Medium</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Compliance</span>
                    <span className="font-semibold text-green-600">98%</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  View Details
                </Button>
              </CardContent>
            </Card>

            {/* Weekly Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Weekly Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Overall performance summary</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Overall Score</span>
                    <span className="font-semibold text-green-600">A-</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Improvement</span>
                    <span className="font-semibold text-green-600">+5%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Next Review</span>
                    <span className="font-semibold">7 days</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  View Details
                </Button>
              </CardContent>
            </Card>

            {/* Custom Report */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Custom Report</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Create your own custom reports</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Templates</span>
                    <span className="font-semibold">12</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Saved Reports</span>
                    <span className="font-semibold">5</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Scheduled</span>
                    <span className="font-semibold text-blue-600">3</span>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-workview-primary hover:bg-workview-primary/90">
                  Create Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}