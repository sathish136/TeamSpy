import { Employee, Activity, Alert, TimeTracking } from "@shared/schema";

// This file contains mock data generators for development
// In a real application, this would come from APIs

export const generateMockEmployees = (): Employee[] => [
  {
    id: "1",
    name: "Seth McGregor",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    location: "Germany / Frankfurt",
    computer: "win-nt35short864",
    currentTask: "Project Tasks",
    currentActivity: "www.slack.com",
    timeWorked: "7:48",
    status: "online",
    isOnline: true,
    lastActive: new Date()
  },
  {
    id: "2", 
    name: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    location: "Germany / Frankfurt",
    computer: "win-nt35short864", 
    currentTask: "Microsoft Teams",
    currentActivity: "teams.microsoft.com",
    timeWorked: "8:24",
    status: "online",
    isOnline: true,
    lastActive: new Date()
  },
  {
    id: "3",
    name: "Michael Chen", 
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    location: "Germany / Frankfurt",
    computer: "win-nt35short864",
    currentTask: "Project Tasks", 
    currentActivity: "www.youtube.com",
    timeWorked: "7:45",
    status: "online",
    isOnline: true,
    lastActive: new Date()
  }
];

export const generateMockActivities = (): Activity[] => [
  {
    id: "1",
    employeeId: "1",
    activityType: "productive",
    application: "Slack",
    website: "www.slack.com",
    duration: 180,
    timestamp: new Date()
  }
];

export const generateMockAlerts = (): Alert[] => [
  {
    id: "1",
    employeeId: "3",
    type: "violation",
    title: "Policy Violation",
    description: "Michael Chen accessed restricted website",
    severity: "high",
    timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
    isRead: false
  }
];
