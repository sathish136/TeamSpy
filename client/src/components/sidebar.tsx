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
    <div className="fixed inset-y-0 left-0 w-64 bg-workview-dark text-white z-50">
      <div className="flex items-center px-6 py-4 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-workview-primary rounded flex items-center justify-center">
            <Shield className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-semibold">WORKVIEW</span>
        </div>
      </div>
      
      <nav className="mt-6">
        <div className="px-6 mb-3">
          <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Main</div>
        </div>
        
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.path || (item.path === "/" && location === "/dashboard");
            
            return (
              <li key={item.path}>
                <Link href={item.path}>
                  <div className={`flex items-center px-3 py-2 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                    isActive 
                      ? "bg-workview-primary text-white" 
                      : "text-gray-300 hover:bg-gray-700"
                  }`}>
                    <Icon className="w-4 h-4 mr-2.5" />
                    {item.label}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
        

      </nav>
    </div>
  );
}
