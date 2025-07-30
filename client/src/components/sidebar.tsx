import { Link, useLocation } from "wouter";
import { 
  Shield, 
  BarChart3, 
  Clock, 
  Monitor, 
  AlertTriangle, 
  TrendingUp, 
  Users, 
  Laptop, 
  Settings, 
  Server 
} from "lucide-react";
import { Button } from "@/components/ui/button";

const menuItems = [
  { icon: BarChart3, label: "Dashboard", path: "/" },
  { icon: Clock, label: "Time Tracking", path: "/time-tracking" },
  { icon: BarChart3, label: "Reports", path: "/reports" },
  { icon: Monitor, label: "Monitoring", path: "/monitoring" },
  { icon: AlertTriangle, label: "Risk", path: "/risk" },
  { icon: TrendingUp, label: "Productivity", path: "/productivity" },
  { icon: Users, label: "Employees", path: "/employees" },
  { icon: Laptop, label: "Computers", path: "/computers" },
  { icon: Settings, label: "Configure", path: "/configure" },
  { icon: Server, label: "System", path: "/system" },
];

export default function Sidebar() {
  const [location] = useLocation();

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-teramind-dark text-white z-50">
      <div className="flex items-center px-6 py-4 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-[#FF6B35] rounded flex items-center justify-center">
            <Shield className="h-4 w-4 text-white" />
          </div>
          <span className="text-xl font-bold">TERAMIND</span>
        </div>
      </div>
      
      <nav className="mt-6">
        <div className="px-6 mb-4">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Main</div>
        </div>
        
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.path || (item.path === "/" && location === "/dashboard");
            
            return (
              <li key={item.path}>
                <Link href={item.path}>
                  <a className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive 
                      ? "bg-[#FF6B35] text-white" 
                      : "text-gray-300 hover:bg-gray-700"
                  }`}>
                    <Icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
        
        <div className="px-6 mt-8 mb-4">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Trial Info</div>
        </div>
        
        <div className="px-6">
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="text-sm font-medium mb-2">Free Trial</div>
            <div className="text-xs text-gray-300 mb-3">14 days remaining</div>
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white text-xs font-medium">
              START A FREE TRIAL
            </Button>
          </div>
        </div>
      </nav>
    </div>
  );
}
