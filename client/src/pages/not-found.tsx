import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Home, Clock } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-workview-light">
      <Card className="w-full max-w-lg mx-4 shadow-lg border-0">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-10 w-10 text-red-500" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-gray-900">404</CardTitle>
          <p className="text-xl text-gray-600">Page Not Found</p>
        </CardHeader>
        
        <CardContent className="text-center">
          <p className="text-gray-600 mb-6">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              onClick={() => setLocation('/dashboard')}
              className="bg-workview-primary hover:bg-workview-primary/90 text-white"
            >
              <Home className="h-4 w-4 mr-2" />
              Go to Dashboard
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => setLocation('/time-tracking')}
              className="border-workview-primary text-workview-primary hover:bg-workview-primary hover:text-white"
            >
              <Clock className="h-4 w-4 mr-2" />
              Time Tracking
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
