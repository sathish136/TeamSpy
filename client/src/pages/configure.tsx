import { useQuery } from "@tanstack/react-query";
import Sidebar from "@/components/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Search, Bell, User, Settings, Shield, Clock, Monitor, AlertTriangle } from "lucide-react";

export default function Configure() {
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
                <h1 className="text-sm font-medium text-white">System Configuration</h1>
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

        {/* Configuration Content */}
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">System Configuration</h2>
            <p className="text-gray-600">Configure monitoring policies and system settings</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monitoring Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Monitor className="h-5 w-5 mr-2" />
                  Monitoring Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="screen-capture">Screen Capture</Label>
                      <p className="text-sm text-gray-600">Take periodic screenshots</p>
                    </div>
                    <Switch id="screen-capture" defaultChecked />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="capture-interval">Capture Interval (minutes)</Label>
                    <Input id="capture-interval" type="number" defaultValue="5" className="w-20" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="app-tracking">Application Tracking</Label>
                      <p className="text-sm text-gray-600">Monitor active applications</p>
                    </div>
                    <Switch id="app-tracking" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="keystroke-logging">Keystroke Logging</Label>
                      <p className="text-sm text-gray-600">Log keyboard activity</p>
                    </div>
                    <Switch id="keystroke-logging" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="website-tracking">Website Tracking</Label>
                      <p className="text-sm text-gray-600">Monitor visited websites</p>
                    </div>
                    <Switch id="website-tracking" defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Policies */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Security Policies
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="usb-blocking">USB Device Blocking</Label>
                      <p className="text-sm text-gray-600">Block unauthorized USB devices</p>
                    </div>
                    <Switch id="usb-blocking" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="file-transfer">File Transfer Monitoring</Label>
                      <p className="text-sm text-gray-600">Monitor file uploads/downloads</p>
                    </div>
                    <Switch id="file-transfer" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="software-installation">Software Installation Control</Label>
                      <p className="text-sm text-gray-600">Require approval for new software</p>
                    </div>
                    <Switch id="software-installation" defaultChecked />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password-policy">Password Requirements</Label>
                    <Textarea 
                      id="password-policy" 
                      placeholder="Define password complexity requirements..."
                      className="h-20"
                      defaultValue="Minimum 8 characters, uppercase, lowercase, number, special character"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Time & Attendance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Time & Attendance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="work-start">Work Day Start</Label>
                      <Input id="work-start" type="time" defaultValue="09:00" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="work-end">Work Day End</Label>
                      <Input id="work-end" type="time" defaultValue="17:00" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="idle-time">Idle Time Threshold (minutes)</Label>
                    <Input id="idle-time" type="number" defaultValue="10" className="w-20" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-break">Automatic Break Detection</Label>
                      <p className="text-sm text-gray-600">Detect when employees take breaks</p>
                    </div>
                    <Switch id="auto-break" defaultChecked />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="break-duration">Maximum Break Duration (minutes)</Label>
                    <Input id="break-duration" type="number" defaultValue="60" className="w-20" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Alert Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Alert Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="real-time-alerts">Real-time Alerts</Label>
                      <p className="text-sm text-gray-600">Instant notifications for violations</p>
                    </div>
                    <Switch id="real-time-alerts" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-gray-600">Send alerts via email</p>
                    </div>
                    <Switch id="email-notifications" defaultChecked />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="admin-email">Admin Email Address</Label>
                    <Input id="admin-email" type="email" defaultValue="admin@company.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="alert-threshold">Alert Threshold Level</Label>
                    <select className="w-full p-2 border border-gray-300 rounded-md">
                      <option value="low">Low - All activities</option>
                      <option value="medium" selected>Medium - Important events</option>
                      <option value="high">High - Critical only</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Blocked Websites & Applications */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Blocked Websites</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="blocked-sites">Add Website URL</Label>
                    <div className="flex space-x-2">
                      <Input id="blocked-sites" placeholder="facebook.com" />
                      <Button>Add</Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Currently Blocked:</h4>
                    <div className="space-y-2">
                      {[
                        "facebook.com",
                        "twitter.com", 
                        "youtube.com",
                        "instagram.com",
                        "tiktok.com"
                      ].map((site, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm">{site}</span>
                          <Button variant="outline" size="sm">Remove</Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Blocked Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="blocked-apps">Add Application Name</Label>
                    <div className="flex space-x-2">
                      <Input id="blocked-apps" placeholder="games.exe" />
                      <Button>Add</Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Currently Blocked:</h4>
                    <div className="space-y-2">
                      {[
                        "steam.exe",
                        "discord.exe",
                        "spotify.exe",
                        "gaming-client.exe"
                      ].map((app, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm">{app}</span>
                          <Button variant="outline" size="sm">Remove</Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Save Configuration */}
          <div className="mt-8 flex justify-end space-x-4">
            <Button variant="outline">Reset to Defaults</Button>
            <Button className="bg-workview-primary hover:bg-workview-primary/90">
              Save Configuration
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}