import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert } from "@shared/schema";
import { formatDistanceToNow } from "date-fns";

interface NotificationsWidgetProps {
  alerts: Alert[];
}

export default function NotificationsWidget({ alerts }: NotificationsWidgetProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-red-50";
      case "medium": return "bg-yellow-50";
      case "low": return "bg-blue-50";
      default: return "bg-gray-50";
    }
  };

  const getSeverityDotColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-red-400";
      case "medium": return "bg-yellow-400";
      case "low": return "bg-blue-400";
      default: return "bg-gray-400";
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-semibold">Recent Alerts</CardTitle>
        {alerts.length > 0 && (
          <Badge variant="destructive" className="text-[10px] px-1.5 py-0.5">
            {alerts.length}
          </Badge>
        )}
      </CardHeader>
      
      <CardContent className="space-y-3">
        {alerts.length === 0 ? (
          <div className="text-center text-gray-500 py-4">
            No recent alerts
          </div>
        ) : (
          alerts.slice(0, 3).map((alert) => (
            <div
              key={alert.id}
              className={`flex items-start space-x-3 p-3 rounded-lg ${getSeverityColor(alert.severity)}`}
            >
              <div className={`w-1.5 h-1.5 ${getSeverityDotColor(alert.severity)} rounded-full mt-1.5`} />
              <div className="flex-1">
                <div className="text-xs font-medium text-gray-900">{alert.title}</div>
                <div className="text-[10px] text-gray-600">{alert.description}</div>
                <div className="text-[10px] text-gray-500 mt-1">
                  {formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}
                </div>
              </div>
            </div>
          ))
        )}
        
        {alerts.length > 0 && (
          <button className="w-full mt-4 text-center text-xs workview-primary hover:workview-primary-dark font-medium">
            View All Alerts
          </button>
        )}
      </CardContent>
    </Card>
  );
}
