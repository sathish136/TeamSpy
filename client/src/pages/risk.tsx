import { useQuery } from "@tanstack/react-query";
import Sidebar from "@/components/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Search, Bell, User, AlertTriangle, Shield, Lock, Eye, FileX } from "lucide-react";

export default function Risk() {
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
                <h1 className="text-sm font-medium text-white">Risk Management</h1>
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
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                    3
                  </span>
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

        {/* Risk Content */}
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Security Risk Assessment</h2>
            <p className="text-gray-600">Monitor security threats and policy violations</p>
          </div>

          {/* Risk Level Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card className="border-red-200">
              <CardContent className="p-4">
                <div className="flex items-center">
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900">Critical Risks</h3>
                    <p className="text-2xl font-bold text-red-600">2</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-orange-200">
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Shield className="h-8 w-8 text-orange-600" />
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900">High Risks</h3>
                    <p className="text-2xl font-bold text-orange-600">5</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-yellow-200">
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Eye className="h-8 w-8 text-yellow-600" />
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900">Medium Risks</h3>
                    <p className="text-2xl font-bold text-yellow-600">12</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Lock className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900">Secure</h3>
                    <p className="text-2xl font-bold text-green-600">76%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Active Threats */}
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              <strong>Critical Alert:</strong> Suspicious file download detected from employee workstation. Immediate action required.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Security Events */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Security Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { 
                      type: "Policy Violation", 
                      employee: "Mike Wilson", 
                      description: "Unauthorized software installation",
                      time: "2 minutes ago",
                      severity: "high"
                    },
                    { 
                      type: "Suspicious Activity", 
                      employee: "Sarah Johnson", 
                      description: "Multiple failed login attempts",
                      time: "15 minutes ago",
                      severity: "critical"
                    },
                    { 
                      type: "Data Access", 
                      employee: "David Chen", 
                      description: "Accessed confidential files outside business hours",
                      time: "1 hour ago",
                      severity: "medium"
                    },
                    { 
                      type: "USB Activity", 
                      employee: "Anna Martinez", 
                      description: "External device connected",
                      time: "2 hours ago",
                      severity: "low"
                    },
                  ].map((event, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <Badge 
                              variant="outline"
                              className={
                                event.severity === 'critical' ? 'border-red-200 text-red-800 bg-red-50' :
                                event.severity === 'high' ? 'border-orange-200 text-orange-800 bg-orange-50' :
                                event.severity === 'medium' ? 'border-yellow-200 text-yellow-800 bg-yellow-50' :
                                'border-blue-200 text-blue-800 bg-blue-50'
                              }
                            >
                              {event.type}
                            </Badge>
                            <span className="text-xs text-gray-500">{event.time}</span>
                          </div>
                          <p className="font-medium text-gray-900">{event.employee}</p>
                          <p className="text-sm text-gray-600">{event.description}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Investigate
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Risk Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Risk Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { category: "Data Leakage", count: 3, trend: "up", color: "red" },
                    { category: "Unauthorized Access", count: 5, trend: "stable", color: "orange" },
                    { category: "Policy Violations", count: 8, trend: "down", color: "yellow" },
                    { category: "Malware/Virus", count: 1, trend: "stable", color: "purple" },
                    { category: "Phishing Attempts", count: 2, trend: "up", color: "blue" },
                    { category: "Insider Threats", count: 1, trend: "stable", color: "gray" },
                  ].map((risk, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full bg-${risk.color}-500`}></div>
                        <span className="font-medium text-gray-900">{risk.category}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-lg font-bold text-gray-900">{risk.count}</span>
                        <Badge 
                          variant="outline"
                          className={
                            risk.trend === 'up' ? 'border-red-200 text-red-800' :
                            risk.trend === 'down' ? 'border-green-200 text-green-800' :
                            'border-gray-200 text-gray-800'
                          }
                        >
                          {risk.trend === 'up' ? '↗' : risk.trend === 'down' ? '↘' : '→'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Security Policies */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Security Policy Compliance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { policy: "Password Policy", compliance: 95, violations: 2 },
                  { policy: "Data Access Policy", compliance: 87, violations: 5 },
                  { policy: "Software Installation", compliance: 92, violations: 3 },
                  { policy: "Internet Usage", compliance: 78, violations: 8 },
                  { policy: "Email Security", compliance: 96, violations: 1 },
                  { policy: "Device Security", compliance: 89, violations: 4 },
                ].map((policy, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">{policy.policy}</h4>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Compliance</span>
                      <span className={`text-sm font-bold ${
                        policy.compliance >= 95 ? 'text-green-600' :
                        policy.compliance >= 85 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {policy.compliance}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Violations</span>
                      <span className="text-sm font-bold text-red-600">{policy.violations}</span>
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