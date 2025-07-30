import { 
  type Employee, 
  type InsertEmployee,
  type Activity,
  type InsertActivity,
  type TimeTracking,
  type InsertTimeTracking,
  type Alert,
  type InsertAlert,
  type Session,
  type InsertSession,
  type Application,
  type InsertApplication,
  type Website,
  type InsertWebsite,
  type Keystroke,
  type InsertKeystroke,
  type Screenshot,
  type InsertScreenshot,
  type ClipboardEvent,
  type InsertClipboardEvent,
  type FileActivity,
  type InsertFileActivity,
  type PrintJob,
  type InsertPrintJob,
  type Communication,
  type InsertCommunication,
  type NetworkActivity,
  type InsertNetworkActivity,
  type AlertRule,
  type InsertAlertRule
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Employee methods
  getEmployees(): Promise<Employee[]>;
  getEmployee(id: string): Promise<Employee | undefined>;
  createEmployee(employee: InsertEmployee): Promise<Employee>;
  updateEmployee(id: string, employee: Partial<Employee>): Promise<Employee | undefined>;
  
  // Session monitoring methods
  getSessions(employeeId?: string): Promise<Session[]>;
  createSession(session: InsertSession): Promise<Session>;
  
  // Application tracking methods
  getApplications(employeeId?: string): Promise<Application[]>;
  createApplication(application: InsertApplication): Promise<Application>;
  
  // Website monitoring methods
  getWebsites(employeeId?: string): Promise<Website[]>;
  createWebsite(website: InsertWebsite): Promise<Website>;
  
  // Keystroke logging methods
  getKeystrokes(employeeId?: string): Promise<Keystroke[]>;
  createKeystroke(keystroke: InsertKeystroke): Promise<Keystroke>;
  
  // Screenshot methods
  getScreenshots(employeeId?: string): Promise<Screenshot[]>;
  createScreenshot(screenshot: InsertScreenshot): Promise<Screenshot>;
  
  // Clipboard monitoring methods
  getClipboardEvents(employeeId?: string): Promise<ClipboardEvent[]>;
  createClipboardEvent(event: InsertClipboardEvent): Promise<ClipboardEvent>;
  
  // File activity methods
  getFileActivities(employeeId?: string): Promise<FileActivity[]>;
  createFileActivity(activity: InsertFileActivity): Promise<FileActivity>;
  
  // Print job methods
  getPrintJobs(employeeId?: string): Promise<PrintJob[]>;
  createPrintJob(job: InsertPrintJob): Promise<PrintJob>;
  
  // Communication methods
  getCommunications(employeeId?: string): Promise<Communication[]>;
  createCommunication(communication: InsertCommunication): Promise<Communication>;
  
  // Network activity methods
  getNetworkActivity(employeeId?: string): Promise<NetworkActivity[]>;
  createNetworkActivity(activity: InsertNetworkActivity): Promise<NetworkActivity>;
  
  // Alert rule methods
  getAlertRules(): Promise<AlertRule[]>;
  createAlertRule(rule: InsertAlertRule): Promise<AlertRule>;
  updateAlertRule(id: string, rule: Partial<AlertRule>): Promise<AlertRule | undefined>;
  deleteAlertRule(id: string): Promise<boolean>;
  
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
  private sessions: Map<string, Session>;
  private applications: Map<string, Application>;
  private websites: Map<string, Website>;
  private keystrokes: Map<string, Keystroke>;
  private screenshots: Map<string, Screenshot>;
  private clipboardEvents: Map<string, ClipboardEvent>;
  private fileActivities: Map<string, FileActivity>;
  private printJobs: Map<string, PrintJob>;
  private communications: Map<string, Communication>;
  private networkActivity: Map<string, NetworkActivity>;
  private alertRules: Map<string, AlertRule>;
  private activities: Map<string, Activity>;
  private timeTracking: Map<string, TimeTracking>;
  private alerts: Map<string, Alert>;

  constructor() {
    this.employees = new Map();
    this.sessions = new Map();
    this.applications = new Map();
    this.websites = new Map();
    this.keystrokes = new Map();
    this.screenshots = new Map();
    this.clipboardEvents = new Map();
    this.fileActivities = new Map();
    this.printJobs = new Map();
    this.communications = new Map();
    this.networkActivity = new Map();
    this.alertRules = new Map();
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
        email: null,
        department: null,
        position: null,
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        location: "Germany / Frankfurt",
        computer: "win-nt35short864",
        currentTask: "Project Tasks",
        currentActivity: "www.slack.com",
        timeWorked: "7:48",
        status: "online",
        isOnline: true,
        computerName: null,
        ipAddress: null,
        agentVersion: null,
        operatingSystem: null,
        workingHours: { start: "09:00", end: "17:00" }
      },
      {
        name: "Sarah Johnson",
        email: null,
        department: null,
        position: null,
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        location: "Germany / Frankfurt",
        computer: "win-nt35short864",
        currentTask: "Microsoft Teams",
        currentActivity: "teams.microsoft.com",
        timeWorked: "8:24",
        status: "online",
        isOnline: true,
        computerName: null,
        ipAddress: null,
        agentVersion: null,
        operatingSystem: null,
        workingHours: { start: "09:00", end: "17:00" }
      },
      {
        name: "Michael Chen",
        email: null,
        department: null,
        position: null,
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        location: "Germany / Frankfurt",
        computer: "win-nt35short864",
        currentTask: "Project Tasks",
        currentActivity: "www.youtube.com",
        timeWorked: "7:45",
        status: "online",
        isOnline: true,
        computerName: null,
        ipAddress: null,
        agentVersion: null,
        operatingSystem: null,
        workingHours: { start: "09:00", end: "17:00" }
      },
      {
        name: "Emily Rodriguez",
        email: null,
        department: null,
        position: null,
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        location: "Germany / Frankfurt",
        computer: "win-nt35short864",
        currentTask: "Project Tasks",
        currentActivity: "mail.google.com",
        timeWorked: "7:48",
        status: "online",
        isOnline: true,
        computerName: null,
        ipAddress: null,
        agentVersion: null,
        operatingSystem: null,
        workingHours: { start: "09:00", end: "17:00" }
      },
      {
        name: "David Thompson",
        email: null,
        department: null,
        position: null,
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        location: "Germany / Frankfurt",
        computer: "win-nt35short864",
        currentTask: "Project Tasks",
        currentActivity: "drive.google.com",
        timeWorked: "7:48",
        status: "online",
        isOnline: true,
        computerName: null,
        ipAddress: null,
        agentVersion: null,
        operatingSystem: null,
        workingHours: { start: "09:00", end: "17:00" }
      },
      {
        name: "Jessica Wilson",
        email: null,
        department: null,
        position: null,
        avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        location: "Germany / Frankfurt",
        computer: "win-nt35short864",
        currentTask: "Project Tasks",
        currentActivity: "www.linkedin.com",
        timeWorked: "7:52",
        status: "online",
        isOnline: true,
        computerName: null,
        ipAddress: null,
        agentVersion: null,
        operatingSystem: null,
        workingHours: { start: "09:00", end: "17:00" }
      }
    ];

    employeesData.forEach(emp => {
      const id = randomUUID();
      const employee: Employee = {
        ...emp,
        id,
        lastActive: new Date(),
        isOnline: emp.isOnline ?? false
      };
      this.employees.set(id, employee);
    });

    // Seed alerts
    const alertsData: InsertAlert[] = [
      {
        employeeId: Array.from(this.employees.keys())[2], // Michael Chen
        ruleId: null,
        type: "violation",
        title: "Policy Violation",
        description: "Michael Chen accessed restricted website",
        severity: "high",
        isRead: false,
        metadata: null
      },
      {
        employeeId: Array.from(this.employees.keys())[1], // Sarah Johnson
        ruleId: null,
        type: "idle",
        title: "Extended Idle Time",
        description: "Sarah Johnson idle for 15+ minutes",
        severity: "medium",
        isRead: false,
        metadata: null
      },
      {
        employeeId: Array.from(this.employees.keys())[3], // Emily Rodriguez
        ruleId: null,
        type: "login",
        title: "New Login",
        description: "Emily Rodriguez logged in from new device",
        severity: "low",
        isRead: false,
        metadata: null
      }
    ];

    alertsData.forEach(alert => {
      const id = randomUUID();
      const alertRecord: Alert = {
        ...alert,
        id,
        timestamp: new Date(),
        isRead: alert.isRead ?? false
      };
      this.alerts.set(id, alertRecord);
    });
  }

  // Employee methods
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
      lastActive: new Date(),
      isOnline: employee.isOnline ?? false
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

  // Session methods
  async getSessions(employeeId?: string): Promise<Session[]> {
    const sessions = Array.from(this.sessions.values());
    if (employeeId) {
      return sessions.filter(session => session.employeeId === employeeId);
    }
    return sessions;
  }

  async createSession(session: InsertSession): Promise<Session> {
    const id = randomUUID();
    const newSession: Session = {
      ...session,
      id,
      timestamp: new Date()
    };
    this.sessions.set(id, newSession);
    return newSession;
  }

  // Application methods
  async getApplications(employeeId?: string): Promise<Application[]> {
    const applications = Array.from(this.applications.values());
    if (employeeId) {
      return applications.filter(app => app.employeeId === employeeId);
    }
    return applications;
  }

  async createApplication(application: InsertApplication): Promise<Application> {
    const id = randomUUID();
    const newApplication: Application = {
      ...application,
      id,
      timestamp: new Date()
    };
    this.applications.set(id, newApplication);
    return newApplication;
  }

  // Website methods
  async getWebsites(employeeId?: string): Promise<Website[]> {
    const websites = Array.from(this.websites.values());
    if (employeeId) {
      return websites.filter(website => website.employeeId === employeeId);
    }
    return websites;
  }

  async createWebsite(website: InsertWebsite): Promise<Website> {
    const id = randomUUID();
    const newWebsite: Website = {
      ...website,
      id,
      visitTime: new Date()
    };
    this.websites.set(id, newWebsite);
    return newWebsite;
  }

  // Keystroke methods
  async getKeystrokes(employeeId?: string): Promise<Keystroke[]> {
    const keystrokes = Array.from(this.keystrokes.values());
    if (employeeId) {
      return keystrokes.filter(keystroke => keystroke.employeeId === employeeId);
    }
    return keystrokes;
  }

  async createKeystroke(keystroke: InsertKeystroke): Promise<Keystroke> {
    const id = randomUUID();
    const newKeystroke: Keystroke = {
      ...keystroke,
      id,
      timestamp: new Date()
    };
    this.keystrokes.set(id, newKeystroke);
    return newKeystroke;
  }

  // Screenshot methods
  async getScreenshots(employeeId?: string): Promise<Screenshot[]> {
    const screenshots = Array.from(this.screenshots.values());
    if (employeeId) {
      return screenshots.filter(screenshot => screenshot.employeeId === employeeId);
    }
    return screenshots;
  }

  async createScreenshot(screenshot: InsertScreenshot): Promise<Screenshot> {
    const id = randomUUID();
    const newScreenshot: Screenshot = {
      ...screenshot,
      id,
      timestamp: new Date()
    };
    this.screenshots.set(id, newScreenshot);
    return newScreenshot;
  }

  // Clipboard methods
  async getClipboardEvents(employeeId?: string): Promise<ClipboardEvent[]> {
    const events = Array.from(this.clipboardEvents.values());
    if (employeeId) {
      return events.filter(event => event.employeeId === employeeId);
    }
    return events;
  }

  async createClipboardEvent(event: InsertClipboardEvent): Promise<ClipboardEvent> {
    const id = randomUUID();
    const newEvent: ClipboardEvent = {
      ...event,
      id,
      timestamp: new Date()
    };
    this.clipboardEvents.set(id, newEvent);
    return newEvent;
  }

  // File activity methods
  async getFileActivities(employeeId?: string): Promise<FileActivity[]> {
    const activities = Array.from(this.fileActivities.values());
    if (employeeId) {
      return activities.filter(activity => activity.employeeId === employeeId);
    }
    return activities;
  }

  async createFileActivity(activity: InsertFileActivity): Promise<FileActivity> {
    const id = randomUUID();
    const newActivity: FileActivity = {
      ...activity,
      id,
      timestamp: new Date()
    };
    this.fileActivities.set(id, newActivity);
    return newActivity;
  }

  // Print job methods
  async getPrintJobs(employeeId?: string): Promise<PrintJob[]> {
    const jobs = Array.from(this.printJobs.values());
    if (employeeId) {
      return jobs.filter(job => job.employeeId === employeeId);
    }
    return jobs;
  }

  async createPrintJob(job: InsertPrintJob): Promise<PrintJob> {
    const id = randomUUID();
    const newJob: PrintJob = {
      ...job,
      id,
      timestamp: new Date()
    };
    this.printJobs.set(id, newJob);
    return newJob;
  }

  // Communication methods
  async getCommunications(employeeId?: string): Promise<Communication[]> {
    const communications = Array.from(this.communications.values());
    if (employeeId) {
      return communications.filter(comm => comm.employeeId === employeeId);
    }
    return communications;
  }

  async createCommunication(communication: InsertCommunication): Promise<Communication> {
    const id = randomUUID();
    const newCommunication: Communication = {
      ...communication,
      id,
      timestamp: new Date()
    };
    this.communications.set(id, newCommunication);
    return newCommunication;
  }

  // Network activity methods
  async getNetworkActivity(employeeId?: string): Promise<NetworkActivity[]> {
    const activities = Array.from(this.networkActivity.values());
    if (employeeId) {
      return activities.filter(activity => activity.employeeId === employeeId);
    }
    return activities;
  }

  async createNetworkActivity(activity: InsertNetworkActivity): Promise<NetworkActivity> {
    const id = randomUUID();
    const newActivity: NetworkActivity = {
      ...activity,
      id,
      startTime: new Date(),
      endTime: null
    };
    this.networkActivity.set(id, newActivity);
    return newActivity;
  }

  // Alert rule methods
  async getAlertRules(): Promise<AlertRule[]> {
    return Array.from(this.alertRules.values());
  }

  async createAlertRule(rule: InsertAlertRule): Promise<AlertRule> {
    const id = randomUUID();
    const newRule: AlertRule = {
      ...rule,
      id,
      createdAt: new Date()
    };
    this.alertRules.set(id, newRule);
    return newRule;
  }

  async updateAlertRule(id: string, rule: Partial<AlertRule>): Promise<AlertRule | undefined> {
    const existing = this.alertRules.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...rule };
    this.alertRules.set(id, updated);
    return updated;
  }

  async deleteAlertRule(id: string): Promise<boolean> {
    return this.alertRules.delete(id);
  }

  // Activity methods
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

  // Time tracking methods
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

  async createTimeTracking(timeTrackingData: InsertTimeTracking): Promise<TimeTracking> {
    const id = randomUUID();
    const newTimeTracking: TimeTracking = {
      ...timeTrackingData,
      id
    };
    this.timeTracking.set(id, newTimeTracking);
    return newTimeTracking;
  }

  // Alert methods
  async getAlerts(limit?: number): Promise<Alert[]> {
    const alerts = Array.from(this.alerts.values()).sort((a, b) => 
      b.timestamp.getTime() - a.timestamp.getTime()
    );
    
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
      timestamp: new Date(),
      isRead: alert.isRead ?? false
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

// Choose storage implementation - always use MemStorage for development
export const storage = new MemStorage();