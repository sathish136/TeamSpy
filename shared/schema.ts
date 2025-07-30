import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Enhanced employees table with agent information
export const employees = pgTable("employees", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email"),
  department: text("department"),
  position: text("position"),
  avatar: text("avatar"),
  location: text("location"),
  computer: text("computer").notNull(),
  currentTask: text("current_task"),
  currentActivity: text("current_activity"),
  timeWorked: text("time_worked"),
  status: text("status").notNull().default("offline"), // online, idle, offline
  isOnline: boolean("is_online").notNull().default(false),
  lastActive: timestamp("last_active").notNull().default(sql`now()`),
  computerName: text("computer_name"),
  ipAddress: text("ip_address"),
  agentVersion: text("agent_version"),
  operatingSystem: text("operating_system"),
  workingHours: jsonb("working_hours").default('{"start": "09:00", "end": "17:00"}'),
});

// Session monitoring - logins, logouts, lock/unlock
export const sessions = pgTable("sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  employeeId: varchar("employee_id").notNull().references(() => employees.id),
  sessionType: text("session_type").notNull(), // login, logout, lock, unlock, idle_start, idle_end
  timestamp: timestamp("timestamp").notNull().default(sql`now()`),
  computerName: text("computer_name"),
  ipAddress: text("ip_address"),
  metadata: jsonb("metadata"),
});

// Application tracking - app open/close times, usage duration
export const applications = pgTable("applications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  employeeId: varchar("employee_id").notNull().references(() => employees.id),
  applicationName: text("application_name").notNull(),
  applicationPath: text("application_path"),
  windowTitle: text("window_title"),
  action: text("action").notNull(), // open, close, focus, blur
  timestamp: timestamp("timestamp").notNull().default(sql`now()`),
  duration: integer("duration"), // in seconds for close events
  category: text("category").default("neutral"), // productive, neutral, unproductive
});

// Website monitoring - URLs visited, time spent per site
export const websites = pgTable("websites", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  employeeId: varchar("employee_id").notNull().references(() => employees.id),
  url: text("url").notNull(),
  title: text("title"),
  domain: text("domain"),
  visitTime: timestamp("visit_time").notNull().default(sql`now()`),
  duration: integer("duration"), // in seconds
  category: text("category").default("neutral"), // productive, neutral, unproductive, blocked
});

// Keystroke logging (optional) - monitor keyboard input
export const keystrokes = pgTable("keystrokes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  employeeId: varchar("employee_id").notNull().references(() => employees.id),
  applicationName: text("application_name"),
  windowTitle: text("window_title"),
  keystrokeCount: integer("keystroke_count"),
  timestamp: timestamp("timestamp").notNull().default(sql`now()`),
  duration: integer("duration"), // in seconds for the logging period
  isEnabled: boolean("is_enabled").default(false),
});

// Screen recording - periodic screenshot capture
export const screenshots = pgTable("screenshots", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  employeeId: varchar("employee_id").notNull().references(() => employees.id),
  filePath: text("file_path").notNull(),
  fileName: text("file_name").notNull(),
  timestamp: timestamp("timestamp").notNull().default(sql`now()`),
  screenNumber: integer("screen_number").default(1),
  fileSize: integer("file_size"), // in bytes
  metadata: jsonb("metadata"),
});

// Clipboard monitoring - track copy-paste events
export const clipboardEvents = pgTable("clipboard_events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  employeeId: varchar("employee_id").notNull().references(() => employees.id),
  eventType: text("event_type").notNull(), // copy, paste, cut
  applicationName: text("application_name"),
  dataType: text("data_type"), // text, image, file
  dataSize: integer("data_size"), // in bytes
  timestamp: timestamp("timestamp").notNull().default(sql`now()`),
  isMonitored: boolean("is_monitored").default(true),
});

// File access logging - open, create, delete, modify, USB transfer
export const fileActivities = pgTable("file_activities", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  employeeId: varchar("employee_id").notNull().references(() => employees.id),
  filePath: text("file_path").notNull(),
  fileName: text("file_name").notNull(),
  action: text("action").notNull(), // open, create, delete, modify, copy, move, usb_transfer
  fileSize: integer("file_size"), // in bytes
  fileType: text("file_type"),
  destinationPath: text("destination_path"), // for copy/move/usb operations
  timestamp: timestamp("timestamp").notNull().default(sql`now()`),
  applicationName: text("application_name"),
  riskLevel: text("risk_level").default("low"), // low, medium, high, critical
});

// Print monitoring - track printed documents
export const printJobs = pgTable("print_jobs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  employeeId: varchar("employee_id").notNull().references(() => employees.id),
  documentName: text("document_name").notNull(),
  printerName: text("printer_name").notNull(),
  pages: integer("pages"),
  copies: integer("copies"),
  timestamp: timestamp("timestamp").notNull().default(sql`now()`),
  applicationName: text("application_name"),
  fileSize: integer("file_size"), // in bytes
  status: text("status").default("queued"), // queued, printing, completed, failed
});

// Email/Chat metadata - who, when, subject line
export const communications = pgTable("communications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  employeeId: varchar("employee_id").notNull().references(() => employees.id),
  type: text("type").notNull(), // email, chat, video_call, voice_call
  applicationName: text("application_name").notNull(),
  participants: jsonb("participants"), // array of email addresses or usernames
  subject: text("subject"),
  timestamp: timestamp("timestamp").notNull().default(sql`now()`),
  duration: integer("duration"), // in seconds for calls
  isIncoming: boolean("is_incoming"),
  isMonitored: boolean("is_monitored").default(true),
});

// Network usage monitoring - IP addresses accessed, bandwidth used
export const networkActivity = pgTable("network_activity", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  employeeId: varchar("employee_id").notNull().references(() => employees.id),
  destinationIp: text("destination_ip").notNull(),
  destinationPort: integer("destination_port"),
  protocol: text("protocol"), // TCP, UDP, HTTP, HTTPS, FTP, SSH
  domain: text("domain"),
  bytesUploaded: integer("bytes_uploaded"),
  bytesDownloaded: integer("bytes_downloaded"),
  startTime: timestamp("start_time").notNull().default(sql`now()`),
  endTime: timestamp("end_time"),
  applicationName: text("application_name"),
  riskLevel: text("risk_level").default("low"), // low, medium, high, critical
});

// Alert triggers / Rules engine
export const alertRules = pgTable("alert_rules", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  ruleType: text("rule_type").notNull(), // website_blocked, usb_connected, file_transfer, idle_time, keyword_detected, application_blocked
  conditions: jsonb("conditions").notNull(), // rule conditions as JSON
  actions: jsonb("actions").notNull(), // actions to take as JSON
  severity: text("severity").default("medium"), // low, medium, high, critical
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

// Original tables updated
export const activities = pgTable("activities", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  employeeId: varchar("employee_id").notNull().references(() => employees.id),
  activityType: text("activity_type").notNull(), // productive, neutral, unproductive
  application: text("application"),
  website: text("website"),
  duration: integer("duration").notNull(), // in minutes
  timestamp: timestamp("timestamp").notNull().default(sql`now()`),
});

export const timeTracking = pgTable("time_tracking", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  employeeId: varchar("employee_id").notNull().references(() => employees.id),
  date: text("date").notNull(), // YYYY-MM-DD
  totalHours: integer("total_hours").notNull(), // in minutes
  productiveHours: integer("productive_hours").notNull(), // in minutes
  idleHours: integer("idle_hours").notNull(), // in minutes
});

export const alerts = pgTable("alerts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  employeeId: varchar("employee_id").notNull().references(() => employees.id),
  ruleId: varchar("rule_id").references(() => alertRules.id),
  type: text("type").notNull(), // violation, idle, login, security, file_transfer, usb, application, website
  title: text("title").notNull(),
  description: text("description").notNull(),
  severity: text("severity").notNull(), // high, medium, low, critical
  timestamp: timestamp("timestamp").notNull().default(sql`now()`),
  isRead: boolean("is_read").notNull().default(false),
  metadata: jsonb("metadata"),
});

// Insert schemas for all tables
export const insertEmployeeSchema = createInsertSchema(employees).omit({
  id: true,
  lastActive: true,
});

export const insertSessionSchema = createInsertSchema(sessions).omit({
  id: true,
  timestamp: true,
});

export const insertApplicationSchema = createInsertSchema(applications).omit({
  id: true,
  timestamp: true,
});

export const insertWebsiteSchema = createInsertSchema(websites).omit({
  id: true,
  visitTime: true,
});

export const insertKeystrokeSchema = createInsertSchema(keystrokes).omit({
  id: true,
  timestamp: true,
});

export const insertScreenshotSchema = createInsertSchema(screenshots).omit({
  id: true,
  timestamp: true,
});

export const insertClipboardEventSchema = createInsertSchema(clipboardEvents).omit({
  id: true,
  timestamp: true,
});

export const insertFileActivitySchema = createInsertSchema(fileActivities).omit({
  id: true,
  timestamp: true,
});

export const insertPrintJobSchema = createInsertSchema(printJobs).omit({
  id: true,
  timestamp: true,
});

export const insertCommunicationSchema = createInsertSchema(communications).omit({
  id: true,
  timestamp: true,
});

export const insertNetworkActivitySchema = createInsertSchema(networkActivity).omit({
  id: true,
  startTime: true,
});

export const insertAlertRuleSchema = createInsertSchema(alertRules).omit({
  id: true,
  createdAt: true,
});

export const insertActivitySchema = createInsertSchema(activities).omit({
  id: true,
  timestamp: true,
});

export const insertTimeTrackingSchema = createInsertSchema(timeTracking).omit({
  id: true,
});

export const insertAlertSchema = createInsertSchema(alerts).omit({
  id: true,
  timestamp: true,
});

// Type exports
export type Employee = typeof employees.$inferSelect;
export type InsertEmployee = z.infer<typeof insertEmployeeSchema>;

export type Session = typeof sessions.$inferSelect;
export type InsertSession = z.infer<typeof insertSessionSchema>;

export type Application = typeof applications.$inferSelect;
export type InsertApplication = z.infer<typeof insertApplicationSchema>;

export type Website = typeof websites.$inferSelect;
export type InsertWebsite = z.infer<typeof insertWebsiteSchema>;

export type Keystroke = typeof keystrokes.$inferSelect;
export type InsertKeystroke = z.infer<typeof insertKeystrokeSchema>;

export type Screenshot = typeof screenshots.$inferSelect;
export type InsertScreenshot = z.infer<typeof insertScreenshotSchema>;

export type ClipboardEvent = typeof clipboardEvents.$inferSelect;
export type InsertClipboardEvent = z.infer<typeof insertClipboardEventSchema>;

export type FileActivity = typeof fileActivities.$inferSelect;
export type InsertFileActivity = z.infer<typeof insertFileActivitySchema>;

export type PrintJob = typeof printJobs.$inferSelect;
export type InsertPrintJob = z.infer<typeof insertPrintJobSchema>;

export type Communication = typeof communications.$inferSelect;
export type InsertCommunication = z.infer<typeof insertCommunicationSchema>;

export type NetworkActivity = typeof networkActivity.$inferSelect;
export type InsertNetworkActivity = z.infer<typeof insertNetworkActivitySchema>;

export type AlertRule = typeof alertRules.$inferSelect;
export type InsertAlertRule = z.infer<typeof insertAlertRuleSchema>;

export type Activity = typeof activities.$inferSelect;
export type InsertActivity = z.infer<typeof insertActivitySchema>;

export type TimeTracking = typeof timeTracking.$inferSelect;
export type InsertTimeTracking = z.infer<typeof insertTimeTrackingSchema>;

export type Alert = typeof alerts.$inferSelect;
export type InsertAlert = z.infer<typeof insertAlertSchema>;
