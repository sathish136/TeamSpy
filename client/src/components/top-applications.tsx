import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function TopApplications() {
  const applications = [
    {
      name: "Microsoft Teams",
      category: "Communication",
      time: "3.2h",
      icon: "fab fa-microsoft",
      iconColor: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      name: "Slack",
      category: "Communication", 
      time: "2.8h",
      icon: "fab fa-slack",
      iconColor: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      name: "Google Drive",
      category: "Productivity",
      time: "2.1h", 
      icon: "fab fa-google",
      iconColor: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      name: "Email Client",
      category: "Communication",
      time: "1.9h",
      icon: "fas fa-envelope", 
      iconColor: "text-gray-600",
      bgColor: "bg-gray-100"
    },
    {
      name: "YouTube",
      category: "Entertainment",
      time: "0.7h",
      icon: "fab fa-youtube",
      iconColor: "text-red-600", 
      bgColor: "bg-red-100"
    }
  ];

  const usageCategories = [
    { label: "Productive", percentage: 82, color: "bg-green-400" },
    { label: "Unproductive", percentage: 18, color: "bg-red-400" }
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
        <CardTitle className="text-lg font-semibold">Top Applications</CardTitle>
        <Button variant="ghost" className="text-[#FF6B35] hover:text-orange-600 p-0">
          View All
        </Button>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {applications.map((app) => (
          <div key={app.name} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 ${app.bgColor} rounded-lg flex items-center justify-center`}>
                <i className={`${app.icon} ${app.iconColor}`} />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">{app.name}</div>
                <div className="text-xs text-gray-500">{app.category}</div>
              </div>
            </div>
            <div className="text-sm font-medium text-gray-900">{app.time}</div>
          </div>
        ))}
        
        {/* Usage breakdown chart */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="text-sm font-medium text-gray-900 mb-3">Usage Categories</div>
          <div className="space-y-2">
            {usageCategories.map((category) => (
              <div key={category.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-600">{category.label}</span>
                  <span className={`text-xs font-medium ${
                    category.label === "Productive" ? "text-green-600" : "text-red-600"
                  }`}>
                    {category.percentage}%
                  </span>
                </div>
                <Progress value={category.percentage} className="h-1.5" />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
