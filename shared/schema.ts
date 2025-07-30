import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const employees = pgTable("employees", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  avatar: text("avatar").notNull(),
  location: text("location").notNull(),
  computer: text("computer").notNull(),
  currentTask: text("current_task").notNull(),
  currentActivity: text("current_activity").notNull(),
  timeWorked: text("time_worked").notNull(),
  status: text("status").notNull(), // online, idle, offline
  isOnline: boolean("is_online").notNull().default(false),
  lastActive: timestamp("last_active").notNull().default(sql`now()`),
});

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
  type: text("type").notNull(), // violation, idle, login
  title: text("title").notNull(),
  description: text("description").notNull(),
  severity: text("severity").notNull(), // high, medium, low
  timestamp: timestamp("timestamp").notNull().default(sql`now()`),
  isRead: boolean("is_read").notNull().default(false),
});

export const insertEmployeeSchema = createInsertSchema(employees).omit({
  id: true,
  lastActive: true,
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

export type Employee = typeof employees.$inferSelect;
export type InsertEmployee = z.infer<typeof insertEmployeeSchema>;
export type Activity = typeof activities.$inferSelect;
export type InsertActivity = z.infer<typeof insertActivitySchema>;
export type TimeTracking = typeof timeTracking.$inferSelect;
export type InsertTimeTracking = z.infer<typeof insertTimeTrackingSchema>;
export type Alert = typeof alerts.$inferSelect;
export type InsertAlert = z.infer<typeof insertAlertSchema>;
