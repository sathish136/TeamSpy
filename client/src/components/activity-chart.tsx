import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { MoreHorizontal } from "lucide-react";

export default function ActivityChart() {
  const activityData = [
    { label: "Productive", percentage: 78, color: "bg-green-400" },
    { label: "Neutral", percentage: 15, color: "bg-yellow-400" },
    { label: "Unproductive", percentage: 7, color: "bg-red-400" },
  ];

  const chartBars = [60, 80, 40, 90, 70, 30, 85, 95, 45, 75];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-semibold">Activity Overview</CardTitle>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreHorizontal className="h-3.5 w-3.5" />
        </button>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {activityData.map((item) => (
          <div key={item.label} className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600">{item.label}</span>
              <span className={`text-xs font-medium ${
                item.label === "Productive" ? "text-green-600" :
                item.label === "Neutral" ? "text-yellow-600" : "text-red-600"
              }`}>
                {item.percentage}%
              </span>
            </div>
            <Progress value={item.percentage} className="h-1.5" />
          </div>
        ))}
        
        {/* Mini Activity Chart */}
        <div className="mt-6 h-24 bg-gray-50 rounded-lg flex items-end justify-center p-2">
          <div className="flex items-end space-x-1 h-full">
            {chartBars.map((height, index) => (
              <div
                key={index}
                className={`w-2 rounded-t ${
                  height > 70 ? "bg-green-400" : 
                  height > 40 ? "bg-yellow-400" : "bg-red-400"
                }`}
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
