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
  
  // Activity methods
  getActivities(employeeId?: string): Promise<Activity[]>;
  createActivity(activity: InsertActivity): Promise<Activity>;
  
  // Time tracking methods
  getTimeTracking(employeeId?: string): Promise<TimeTracking[]>;
  createTimeTracking(timeTracking: InsertTimeTracking): Promise<TimeTracking>;
  
  // Alert methods
  getAlerts(employeeId?: string): Promise<Alert[]>;
  createAlert(alert: InsertAlert): Promise<Alert>;
  updateAlert(id: string, alert: Partial<Alert>): Promise<Alert | undefined>;
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
    // Ready for real data from .NET agent - no dummy data
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
      timestamp: new Date()
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
      createdAt: new Date(),
      isActive: rule.isActive ?? true
    };
    this.alertRules.set(id, newRule);
    return newRule;
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
  async getTimeTracking(employeeId?: string): Promise<TimeTracking[]> {
    const timeTracking = Array.from(this.timeTracking.values());
    if (employeeId) {
      return timeTracking.filter(tracking => tracking.employeeId === employeeId);
    }
    return timeTracking;
  }

  async createTimeTracking(timeTracking: InsertTimeTracking): Promise<TimeTracking> {
    const id = randomUUID();
    const newTimeTracking: TimeTracking = {
      ...timeTracking,
      id,
      date: new Date()
    };
    this.timeTracking.set(id, newTimeTracking);
    return newTimeTracking;
  }

  // Alert methods
  async getAlerts(employeeId?: string): Promise<Alert[]> {
    const alerts = Array.from(this.alerts.values());
    if (employeeId) {
      return alerts.filter(alert => alert.employeeId === employeeId);
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

  async updateAlert(id: string, alert: Partial<Alert>): Promise<Alert | undefined> {
    const existing = this.alerts.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...alert };
    this.alerts.set(id, updated);
    return updated;
  }
}

export const storage = new MemStorage();