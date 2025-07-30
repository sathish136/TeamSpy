import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LiveStats() {
  const { data: stats } = useQuery({
    queryKey: ["/api/dashboard/stats"],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const statsData = [
    { label: "Online", value: (stats as any)?.online || 0, color: "bg-green-400" },
    { label: "Idle", value: (stats as any)?.idle || 0, color: "bg-yellow-400" },
    { label: "Offline", value: (stats as any)?.offline || 0, color: "bg-gray-400" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Live Statistics</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {statsData.map((item) => (
          <div key={item.label} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 ${item.color} rounded-full`} />
              <span className="text-sm text-gray-600">{item.label}</span>
            </div>
            <span className="text-lg font-bold text-gray-900">{item.value}</span>
          </div>
        ))}
        
        <div className="border-t pt-4 mt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Total Employees</span>
            <span className="text-lg font-bold text-gray-900">{(stats as any)?.total || 0}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
