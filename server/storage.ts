import { 
  type Employee, 
  type InsertEmployee,
  type Activity,
  type InsertActivity,
  type TimeTracking,
  type InsertTimeTracking,
  type Alert,
  type InsertAlert
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Employee methods
  getEmployees(): Promise<Employee[]>;
  getEmployee(id: string): Promise<Employee | undefined>;
  createEmployee(employee: InsertEmployee): Promise<Employee>;
  updateEmployee(id: string, employee: Partial<Employee>): Promise<Employee | undefined>;
  
  // Activity methods
  getActivities(employeeId?: string): Promise<Activity[]>;
  createActivity(activity: InsertActivity): Promise<Activity>;
  
  // Time tracking methods
  getTimeTracking(employeeId?: string, date?: string): Promise<TimeTracking[]>;
  createTimeTracking(timeTracking: InsertTimeTracking): Promise<TimeTracking>;
  
  // Alert methods
  getAlerts(limit?: number): Promise<Alert[]>;
  createAlert(alert: InsertAlert): Promise<Alert>;
  markAlertAsRead(id: string): Promise<Alert | undefined>;
}

export class MemStorage implements IStorage {
  private employees: Map<string, Employee>;
  private activities: Map<string, Activity>;
  private timeTracking: Map<string, TimeTracking>;
  private alerts: Map<string, Alert>;

  constructor() {
    this.employees = new Map();
    this.activities = new Map();
    this.timeTracking = new Map();
    this.alerts = new Map();
    this.seedData();
  }

  private seedData() {
    // Seed employees
    const employeesData: InsertEmployee[] = [
      {
        name: "Seth McGregor",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        location: "Germany / Frankfurt",
        computer: "win-nt35short864",
        currentTask: "Project Tasks",
        currentActivity: "www.slack.com",
        timeWorked: "7:48",
        status: "online",
        isOnline: true
      },
      {
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        location: "Germany / Frankfurt",
        computer: "win-nt35short864",
        currentTask: "Microsoft Teams",
        currentActivity: "teams.microsoft.com",
        timeWorked: "8:24",
        status: "online",
        isOnline: true
      },
      {
        name: "Michael Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        location: "Germany / Frankfurt",
        computer: "win-nt35short864",
        currentTask: "Project Tasks",
        currentActivity: "www.youtube.com",
        timeWorked: "7:45",
        status: "online",
        isOnline: true
      },
      {
        name: "Emily Rodriguez",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        location: "Germany / Frankfurt",
        computer: "win-nt35short864",
        currentTask: "Project Tasks",
        currentActivity: "mail.google.com",
        timeWorked: "7:48",
        status: "online",
        isOnline: true
      },
      {
        name: "David Thompson",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        location: "Germany / Frankfurt",
        computer: "win-nt35short864",
        currentTask: "Project Tasks",
        currentActivity: "drive.google.com",
        timeWorked: "7:48",
        status: "online",
        isOnline: true
      },
      {
        name: "Jessica Wilson",
        avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        location: "Germany / Frankfurt",
        computer: "win-nt35short864",
        currentTask: "Project Tasks",
        currentActivity: "www.linkedin.com",
        timeWorked: "7:52",
        status: "online",
        isOnline: true
      }
    ];

    employeesData.forEach(emp => {
      const id = randomUUID();
      const employee: Employee = {
        ...emp,
        id,
        lastActive: new Date()
      };
      this.employees.set(id, employee);
    });

    // Seed alerts
    const alertsData: InsertAlert[] = [
      {
        employeeId: Array.from(this.employees.keys())[2], // Michael Chen
        type: "violation",
        title: "Policy Violation",
        description: "Michael Chen accessed restricted website",
        severity: "high",
        isRead: false
      },
      {
        employeeId: Array.from(this.employees.keys())[1], // Sarah Johnson
        type: "idle",
        title: "Extended Idle Time",
        description: "Sarah Johnson idle for 15+ minutes",
        severity: "medium",
        isRead: false
      },
      {
        employeeId: Array.from(this.employees.keys())[3], // Emily Rodriguez
        type: "login",
        title: "New Login",
        description: "Emily Rodriguez logged in from new device",
        severity: "low",
        isRead: false
      }
    ];

    alertsData.forEach(alert => {
      const id = randomUUID();
      const alertRecord: Alert = {
        ...alert,
        id,
        timestamp: new Date()
      };
      this.alerts.set(id, alertRecord);
    });
  }

  async getEmployees(): Promise<Employee[]> {
    return Array.from(this.employees.values());
  }

  async getEmployee(id: string): Promise<Employee | undefined> {
    return this.employees.get(id);
  }

  async createEmployee(employee: InsertEmployee): Promise<Employee> {
    const id = randomUUID();
    const newEmployee: Employee = {
      ...employee,
      id,
      lastActive: new Date()
    };
    this.employees.set(id, newEmployee);
    return newEmployee;
  }

  async updateEmployee(id: string, employee: Partial<Employee>): Promise<Employee | undefined> {
    const existing = this.employees.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...employee };
    this.employees.set(id, updated);
    return updated;
  }

  async getActivities(employeeId?: string): Promise<Activity[]> {
    const activities = Array.from(this.activities.values());
    if (employeeId) {
      return activities.filter(activity => activity.employeeId === employeeId);
    }
    return activities;
  }

  async createActivity(activity: InsertActivity): Promise<Activity> {
    const id = randomUUID();
    const newActivity: Activity = {
      ...activity,
      id,
      timestamp: new Date()
    };
    this.activities.set(id, newActivity);
    return newActivity;
  }

  async getTimeTracking(employeeId?: string, date?: string): Promise<TimeTracking[]> {
    const timeTracking = Array.from(this.timeTracking.values());
    let filtered = timeTracking;
    
    if (employeeId) {
      filtered = filtered.filter(record => record.employeeId === employeeId);
    }
    
    if (date) {
      filtered = filtered.filter(record => record.date === date);
    }
    
    return filtered;
  }

  async createTimeTracking(timeTracking: InsertTimeTracking): Promise<TimeTracking> {
    const id = randomUUID();
    const newTimeTracking: TimeTracking = {
      ...timeTracking,
      id
    };
    this.timeTracking.set(id, newTimeTracking);
    return newTimeTracking;
  }

  async getAlerts(limit?: number): Promise<Alert[]> {
    const alerts = Array.from(this.alerts.values())
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    
    if (limit) {
      return alerts.slice(0, limit);
    }
    
    return alerts;
  }

  async createAlert(alert: InsertAlert): Promise<Alert> {
    const id = randomUUID();
    const newAlert: Alert = {
      ...alert,
      id,
      timestamp: new Date()
    };
    this.alerts.set(id, newAlert);
    return newAlert;
  }

  async markAlertAsRead(id: string): Promise<Alert | undefined> {
    const alert = this.alerts.get(id);
    if (!alert) return undefined;
    
    const updated = { ...alert, isRead: true };
    this.alerts.set(id, updated);
    return updated;
  }
}

export const storage = new MemStorage();
