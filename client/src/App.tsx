import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Dashboard from "@/pages/dashboard";
import TimeTracking from "@/pages/time-tracking";
import Reports from "@/pages/reports";
import Monitoring from "@/pages/monitoring";
import Risk from "@/pages/risk";
import Productivity from "@/pages/productivity";
import Employees from "@/pages/employees";
import Computers from "@/pages/computers";
import Configure from "@/pages/configure";
import System from "@/pages/system";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/time-tracking" component={TimeTracking} />
      <Route path="/reports" component={Reports} />
      <Route path="/monitoring" component={Monitoring} />
      <Route path="/risk" component={Risk} />
      <Route path="/productivity" component={Productivity} />
      <Route path="/employees" component={Employees} />
      <Route path="/computers" component={Computers} />
      <Route path="/configure" component={Configure} />
      <Route path="/system" component={System} />
      {/* All other routes show 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
