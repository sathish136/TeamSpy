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
  type InsertAlertRule,
  employees,
  sessions,
  applications,
  websites,
  keystrokes,
  screenshots,
  clipboardEvents,
  fileActivities,
  printJobs,
  communications,
  networkActivity,
  alertRules,
  activities,
  timeTracking,
  alerts
} from "@shared/schema";
import { randomUUID } from "crypto";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";

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
        lastActive: new Date(),
        isOnline: emp.isOnline ?? false
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
        timestamp: new Date(),
        isRead: alert.isRead ?? false
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
      timestamp: new Date(),
      application: activity.application ?? null,
      website: activity.website ?? null
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

  // Stub implementations for new monitoring methods (MemStorage doesn't support these yet)
  async getSessions(employeeId?: string): Promise<Session[]> {
    return [];
  }

  async createSession(session: InsertSession): Promise<Session> {
    const id = randomUUID();
    const newSession: Session = {
      ...session,
      id,
      timestamp: new Date(),
      computerName: session.computerName ?? null,
      ipAddress: session.ipAddress ?? null,
      metadata: session.metadata ?? null
    };
    return newSession;
  }

  async getApplications(employeeId?: string): Promise<Application[]> {
    return [];
  }

  async createApplication(application: InsertApplication): Promise<Application> {
    const id = randomUUID();
    const newApplication: Application = {
      ...application,
      id,
      timestamp: new Date(),
      applicationPath: application.applicationPath ?? null,
      windowTitle: application.windowTitle ?? null,
      duration: application.duration ?? null,
      category: application.category ?? "neutral"
    };
    return newApplication;
  }

  async getWebsites(employeeId?: string): Promise<Website[]> {
    return [];
  }

  async createWebsite(website: InsertWebsite): Promise<Website> {
    const id = randomUUID();
    const newWebsite: Website = {
      ...website,
      id,
      visitTime: new Date(),
      title: website.title ?? null,
      domain: website.domain ?? null,
      duration: website.duration ?? null,
      category: website.category ?? "neutral"
    };
    return newWebsite;
  }

  async getKeystrokes(employeeId?: string): Promise<Keystroke[]> {
    return [];
  }

  async createKeystroke(keystroke: InsertKeystroke): Promise<Keystroke> {
    const id = randomUUID();
    const newKeystroke: Keystroke = {
      ...keystroke,
      id,
      timestamp: new Date(),
      applicationName: keystroke.applicationName ?? null,
      windowTitle: keystroke.windowTitle ?? null,
      keystrokeCount: keystroke.keystrokeCount ?? null,
      duration: keystroke.duration ?? null,
      isEnabled: keystroke.isEnabled ?? false
    };
    return newKeystroke;
  }

  async getScreenshots(employeeId?: string): Promise<Screenshot[]> {
    return [];
  }

  async createScreenshot(screenshot: InsertScreenshot): Promise<Screenshot> {
    const id = randomUUID();
    const newScreenshot: Screenshot = {
      ...screenshot,
      id,
      timestamp: new Date(),
      screenNumber: screenshot.screenNumber ?? 1,
      fileSize: screenshot.fileSize ?? null,
      metadata: screenshot.metadata ?? null
    };
    return newScreenshot;
  }

  async getClipboardEvents(employeeId?: string): Promise<ClipboardEvent[]> {
    return [];
  }

  async createClipboardEvent(event: InsertClipboardEvent): Promise<ClipboardEvent> {
    const id = randomUUID();
    const newEvent: ClipboardEvent = {
      ...event,
      id,
      timestamp: new Date(),
      applicationName: event.applicationName ?? null,
      dataType: event.dataType ?? null,
      dataSize: event.dataSize ?? null,
      isMonitored: event.isMonitored ?? true
    };
    return newEvent;
  }

  async getFileActivities(employeeId?: string): Promise<FileActivity[]> {
    return [];
  }

  async createFileActivity(activity: InsertFileActivity): Promise<FileActivity> {
    const id = randomUUID();
    const newActivity: FileActivity = {
      ...activity,
      id,
      timestamp: new Date(),
      fileSize: activity.fileSize ?? null,
      fileType: activity.fileType ?? null,
      destinationPath: activity.destinationPath ?? null,
      applicationName: activity.applicationName ?? null,
      riskLevel: activity.riskLevel ?? "low"
    };
    return newActivity;
  }

  async getPrintJobs(employeeId?: string): Promise<PrintJob[]> {
    return [];
  }

  async createPrintJob(job: InsertPrintJob): Promise<PrintJob> {
    const id = randomUUID();
    const newJob: PrintJob = {
      ...job,
      id,
      timestamp: new Date(),
      pages: job.pages ?? null,
      copies: job.copies ?? null,
      applicationName: job.applicationName ?? null,
      fileSize: job.fileSize ?? null,
      status: job.status ?? "queued"
    };
    return newJob;
  }

  async getCommunications(employeeId?: string): Promise<Communication[]> {
    return [];
  }

  async createCommunication(communication: InsertCommunication): Promise<Communication> {
    const id = randomUUID();
    const newCommunication: Communication = {
      ...communication,
      id,
      timestamp: new Date(),
      participants: communication.participants ?? null,
      subject: communication.subject ?? null,
      duration: communication.duration ?? null,
      isIncoming: communication.isIncoming ?? null,
      isMonitored: communication.isMonitored ?? true
    };
    return newCommunication;
  }

  async getNetworkActivity(employeeId?: string): Promise<NetworkActivity[]> {
    return [];
  }

  async createNetworkActivity(activity: InsertNetworkActivity): Promise<NetworkActivity> {
    const id = randomUUID();
    const newActivity: NetworkActivity = {
      ...activity,
      id,
      startTime: new Date(),
      destinationPort: activity.destinationPort ?? null,
      protocol: activity.protocol ?? null,
      domain: activity.domain ?? null,
      bytesUploaded: activity.bytesUploaded ?? null,
      bytesDownloaded: activity.bytesDownloaded ?? null,
      endTime: activity.endTime ?? null,
      applicationName: activity.applicationName ?? null,
      riskLevel: activity.riskLevel ?? "low"
    };
    return newActivity;
  }

  async getAlertRules(): Promise<AlertRule[]> {
    return [];
  }

  async createAlertRule(rule: InsertAlertRule): Promise<AlertRule> {
    const id = randomUUID();
    const newRule: AlertRule = {
      ...rule,
      id,
      createdAt: new Date(),
      description: rule.description ?? null,
      severity: rule.severity ?? "medium",
      isActive: rule.isActive ?? true
    };
    return newRule;
  }

  async updateAlertRule(id: string, rule: Partial<AlertRule>): Promise<AlertRule | undefined> {
    return undefined;
  }

  async deleteAlertRule(id: string): Promise<boolean> {
    return false;
  }
}

// Database Storage Implementation
export class DatabaseStorage implements IStorage {
  // Employee methods
  async getEmployees(): Promise<Employee[]> {
    return await db.select().from(employees);
  }

  async getEmployee(id: string): Promise<Employee | undefined> {
    const [employee] = await db.select().from(employees).where(eq(employees.id, id));
    return employee || undefined;
  }

  async createEmployee(employee: InsertEmployee): Promise<Employee> {
    const [newEmployee] = await db.insert(employees).values(employee).returning();
    return newEmployee;
  }

  async updateEmployee(id: string, employee: Partial<Employee>): Promise<Employee | undefined> {
    const [updated] = await db.update(employees).set(employee).where(eq(employees.id, id)).returning();
    return updated || undefined;
  }

  // Session monitoring methods
  async getSessions(employeeId?: string): Promise<Session[]> {
    if (employeeId) {
      return await db.select().from(sessions).where(eq(sessions.employeeId, employeeId)).orderBy(desc(sessions.timestamp));
    }
    return await db.select().from(sessions).orderBy(desc(sessions.timestamp));
  }

  async createSession(session: InsertSession): Promise<Session> {
    const [newSession] = await db.insert(sessions).values(session).returning();
    return newSession;
  }

  // Application tracking methods
  async getApplications(employeeId?: string): Promise<Application[]> {
    if (employeeId) {
      return await db.select().from(applications).where(eq(applications.employeeId, employeeId)).orderBy(desc(applications.timestamp));
    }
    return await db.select().from(applications).orderBy(desc(applications.timestamp));
  }

  async createApplication(application: InsertApplication): Promise<Application> {
    const [newApplication] = await db.insert(applications).values(application).returning();
    return newApplication;
  }

  // Website monitoring methods
  async getWebsites(employeeId?: string): Promise<Website[]> {
    if (employeeId) {
      return await db.select().from(websites).where(eq(websites.employeeId, employeeId)).orderBy(desc(websites.visitTime));
    }
    return await db.select().from(websites).orderBy(desc(websites.visitTime));
  }

  async createWebsite(website: InsertWebsite): Promise<Website> {
    const [newWebsite] = await db.insert(websites).values(website).returning();
    return newWebsite;
  }

  // Keystroke logging methods
  async getKeystrokes(employeeId?: string): Promise<Keystroke[]> {
    if (employeeId) {
      return await db.select().from(keystrokes).where(eq(keystrokes.employeeId, employeeId)).orderBy(desc(keystrokes.timestamp));
    }
    return await db.select().from(keystrokes).orderBy(desc(keystrokes.timestamp));
  }

  async createKeystroke(keystroke: InsertKeystroke): Promise<Keystroke> {
    const [newKeystroke] = await db.insert(keystrokes).values(keystroke).returning();
    return newKeystroke;
  }

  // Screenshot methods
  async getScreenshots(employeeId?: string): Promise<Screenshot[]> {
    if (employeeId) {
      return await db.select().from(screenshots).where(eq(screenshots.employeeId, employeeId)).orderBy(desc(screenshots.timestamp));
    }
    return await db.select().from(screenshots).orderBy(desc(screenshots.timestamp));
  }

  async createScreenshot(screenshot: InsertScreenshot): Promise<Screenshot> {
    const [newScreenshot] = await db.insert(screenshots).values(screenshot).returning();
    return newScreenshot;
  }

  // Clipboard monitoring methods
  async getClipboardEvents(employeeId?: string): Promise<ClipboardEvent[]> {
    if (employeeId) {
      return await db.select().from(clipboardEvents).where(eq(clipboardEvents.employeeId, employeeId)).orderBy(desc(clipboardEvents.timestamp));
    }
    return await db.select().from(clipboardEvents).orderBy(desc(clipboardEvents.timestamp));
  }

  async createClipboardEvent(event: InsertClipboardEvent): Promise<ClipboardEvent> {
    const [newEvent] = await db.insert(clipboardEvents).values(event).returning();
    return newEvent;
  }

  // File activity methods
  async getFileActivities(employeeId?: string): Promise<FileActivity[]> {
    if (employeeId) {
      return await db.select().from(fileActivities).where(eq(fileActivities.employeeId, employeeId)).orderBy(desc(fileActivities.timestamp));
    }
    return await db.select().from(fileActivities).orderBy(desc(fileActivities.timestamp));
  }

  async createFileActivity(activity: InsertFileActivity): Promise<FileActivity> {
    const [newActivity] = await db.insert(fileActivities).values(activity).returning();
    return newActivity;
  }

  // Print job methods
  async getPrintJobs(employeeId?: string): Promise<PrintJob[]> {
    if (employeeId) {
      return await db.select().from(printJobs).where(eq(printJobs.employeeId, employeeId)).orderBy(desc(printJobs.timestamp));
    }
    return await db.select().from(printJobs).orderBy(desc(printJobs.timestamp));
  }

  async createPrintJob(job: InsertPrintJob): Promise<PrintJob> {
    const [newJob] = await db.insert(printJobs).values(job).returning();
    return newJob;
  }

  // Communication methods
  async getCommunications(employeeId?: string): Promise<Communication[]> {
    if (employeeId) {
      return await db.select().from(communications).where(eq(communications.employeeId, employeeId)).orderBy(desc(communications.timestamp));
    }
    return await db.select().from(communications).orderBy(desc(communications.timestamp));
  }

  async createCommunication(communication: InsertCommunication): Promise<Communication> {
    const [newCommunication] = await db.insert(communications).values(communication).returning();
    return newCommunication;
  }

  // Network activity methods
  async getNetworkActivity(employeeId?: string): Promise<NetworkActivity[]> {
    if (employeeId) {
      return await db.select().from(networkActivity).where(eq(networkActivity.employeeId, employeeId)).orderBy(desc(networkActivity.startTime));
    }
    return await db.select().from(networkActivity).orderBy(desc(networkActivity.startTime));
  }

  async createNetworkActivity(activity: InsertNetworkActivity): Promise<NetworkActivity> {
    const [newActivity] = await db.insert(networkActivity).values(activity).returning();
    return newActivity;
  }

  // Alert rule methods
  async getAlertRules(): Promise<AlertRule[]> {
    return await db.select().from(alertRules).orderBy(desc(alertRules.createdAt));
  }

  async createAlertRule(rule: InsertAlertRule): Promise<AlertRule> {
    const [newRule] = await db.insert(alertRules).values(rule).returning();
    return newRule;
  }

  async updateAlertRule(id: string, rule: Partial<AlertRule>): Promise<AlertRule | undefined> {
    const [updated] = await db.update(alertRules).set(rule).where(eq(alertRules.id, id)).returning();
    return updated || undefined;
  }

  async deleteAlertRule(id: string): Promise<boolean> {
    const result = await db.delete(alertRules).where(eq(alertRules.id, id));
    return result.rowCount > 0;
  }

  // Activity methods
  async getActivities(employeeId?: string): Promise<Activity[]> {
    if (employeeId) {
      return await db.select().from(activities).where(eq(activities.employeeId, employeeId)).orderBy(desc(activities.timestamp));
    }
    return await db.select().from(activities).orderBy(desc(activities.timestamp));
  }

  async createActivity(activity: InsertActivity): Promise<Activity> {
    const [newActivity] = await db.insert(activities).values(activity).returning();
    return newActivity;
  }

  // Time tracking methods
  async getTimeTracking(employeeId?: string, date?: string): Promise<TimeTracking[]> {
    let query = db.select().from(timeTracking);
    
    if (employeeId && date) {
      query = query.where(and(eq(timeTracking.employeeId, employeeId), eq(timeTracking.date, date)));
    } else if (employeeId) {
      query = query.where(eq(timeTracking.employeeId, employeeId));
    } else if (date) {
      query = query.where(eq(timeTracking.date, date));
    }
    
    return await query;
  }

  async createTimeTracking(timeTrackingData: InsertTimeTracking): Promise<TimeTracking> {
    const [newTimeTracking] = await db.insert(timeTracking).values(timeTrackingData).returning();
    return newTimeTracking;
  }

  // Alert methods
  async getAlerts(limit?: number): Promise<Alert[]> {
    let query = db.select().from(alerts).orderBy(desc(alerts.timestamp));
    
    if (limit) {
      query = query.limit(limit);
    }
    
    return await query;
  }

  async createAlert(alert: InsertAlert): Promise<Alert> {
    const [newAlert] = await db.insert(alerts).values(alert).returning();
    return newAlert;
  }

  async markAlertAsRead(id: string): Promise<Alert | undefined> {
    const [updated] = await db.update(alerts).set({ isRead: true }).where(eq(alerts.id, id)).returning();
    return updated || undefined;
  }
}

// Choose storage implementation based on environment
export const storage = process.env.DATABASE_URL ? new DatabaseStorage() : new MemStorage();
