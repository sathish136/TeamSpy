import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function TimeTrackingChart() {
  const weekData = [
    { day: "Mon", height: 65, isWeekend: false },
    { day: "Tue", height: 80, isWeekend: false },
    { day: "Wed", height: 75, isWeekend: false },
    { day: "Thu", height: 90, isWeekend: false },
    { day: "Fri", height: 85, isWeekend: false },
    { day: "Sat", height: 30, isWeekend: true },
    { day: "Sun", height: 25, isWeekend: true },
  ];

  const timeStats = [
    { label: "Total Hours", value: "42.5h", color: "text-gray-900" },
    { label: "Productive", value: "38.2h", color: "text-green-600" },
    { label: "Idle Time", value: "4.3h", color: "text-yellow-600" },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
        <CardTitle className="text-lg font-semibold">Time Tracking Overview</CardTitle>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">Today</Button>
          <Button size="sm" className="bg-workview-primary hover:bg-workview-primary-dark">Week</Button>
          <Button variant="outline" size="sm">Month</Button>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Chart visualization */}
        <div className="h-64 bg-gray-50 rounded-lg flex items-end justify-center p-4">
          <div className="flex items-end space-x-2 h-full w-full">
            {weekData.map((data) => (
              <div key={data.day} className="flex-1 flex flex-col justify-end">
                <div
                  className={`rounded-t ${data.isWeekend ? 'bg-gray-300' : 'bg-workview-primary'}`}
                  style={{ height: `${data.height}%` }}
                />
                <div className="text-xs text-center text-gray-500 mt-2">{data.day}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-6">
          {timeStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
