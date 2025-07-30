import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertEmployeeSchema, 
  insertActivitySchema, 
  insertAlertSchema,
  insertSessionSchema,
  insertApplicationSchema,
  insertWebsiteSchema,
  insertKeystrokeSchema,
  insertScreenshotSchema,
  insertClipboardEventSchema,
  insertFileActivitySchema,
  insertPrintJobSchema,
  insertCommunicationSchema,
  insertNetworkActivitySchema,
  insertAlertRuleSchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Employee routes
  app.get("/api/employees", async (req, res) => {
    try {
      const employees = await storage.getEmployees();
      res.json(employees);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch employees" });
    }
  });

  app.get("/api/employees/:id", async (req, res) => {
    try {
      const employee = await storage.getEmployee(req.params.id);
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
      res.json(employee);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch employee" });
    }
  });

  app.post("/api/employees", async (req, res) => {
    try {
      const employeeData = insertEmployeeSchema.parse(req.body);
      const employee = await storage.createEmployee(employeeData);
      res.status(201).json(employee);
    } catch (error) {
      res.status(400).json({ message: "Invalid employee data" });
    }
  });

  app.patch("/api/employees/:id", async (req, res) => {
    try {
      const employee = await storage.updateEmployee(req.params.id, req.body);
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
      res.json(employee);
    } catch (error) {
      res.status(500).json({ message: "Failed to update employee" });
    }
  });

  // Activity routes
  app.get("/api/activities", async (req, res) => {
    try {
      const employeeId = req.query.employeeId as string | undefined;
      const activities = await storage.getActivities(employeeId);
      res.json(activities);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch activities" });
    }
  });

  // Agent registration and heartbeat endpoint
  app.post("/api/agent/register", async (req, res) => {
    try {
      const { employeeId, computerName, ipAddress, agentVersion, operatingSystem } = req.body;
      
      // Update or create employee with agent information
      let employee = await storage.getEmployee(employeeId);
      if (!employee) {
        // Create new employee if not exists
        const employeeData = insertEmployeeSchema.parse({
          id: employeeId,
          name: `Employee ${employeeId}`,
          computer: computerName,
          computerName,
          ipAddress,
          agentVersion,
          operatingSystem,
          status: "online",
          isOnline: true
        });
        employee = await storage.createEmployee(employeeData);
      } else {
        // Update existing employee with agent info
        employee = await storage.updateEmployee(employeeId, {
          computerName,
          ipAddress,
          agentVersion,
          operatingSystem,
          status: "online",
          isOnline: true,
          lastActive: new Date()
        });
      }
      
      res.json({ message: "Agent registered successfully", employee });
    } catch (error) {
      console.error("Agent registration error:", error);
      res.status(400).json({ message: "Agent registration failed" });
    }
  });

  app.post("/api/agent/heartbeat", async (req, res) => {
    try {
      const { employeeId } = req.body;
      
      // Update employee last active time
      const employee = await storage.updateEmployee(employeeId, {
        lastActive: new Date(),
        isOnline: true,
        status: "online"
      });
      
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
      
      res.json({ message: "Heartbeat received", status: "online" });
    } catch (error) {
      res.status(400).json({ message: "Heartbeat failed" });
    }
  });

  app.post("/api/agent/data", async (req, res) => {
    try {
      // For now, just log the data. We can add schema validation later.
      console.log("Received data from agent:", req.body);
      res.status(200).json({ message: "Data received" });
    } catch (error) {
      res.status(400).json({ message: "Invalid data" });
    }
  });

  app.post("/api/activities", async (req, res) => {
    try {
      const activityData = insertActivitySchema.parse(req.body);
      const activity = await storage.createActivity(activityData);
      res.status(201).json(activity);
    } catch (error) {
      res.status(400).json({ message: "Invalid activity data" });
    }
  });

  // Agent Data Collection API Routes
  
  // Session monitoring routes
  app.get("/api/sessions", async (req, res) => {
    try {
      const employeeId = req.query.employeeId as string | undefined;
      const sessions = await storage.getSessions(employeeId);
      res.json(sessions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch sessions" });
    }
  });

  app.post("/api/sessions", async (req, res) => {
    try {
      const sessionData = insertSessionSchema.parse(req.body);
      const session = await storage.createSession(sessionData);
      res.status(201).json(session);
    } catch (error) {
      res.status(400).json({ message: "Invalid session data" });
    }
  });

  // Application tracking routes
  app.get("/api/applications", async (req, res) => {
    try {
      const employeeId = req.query.employeeId as string | undefined;
      const applications = await storage.getApplications(employeeId);
      res.json(applications);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch applications" });
    }
  });

  app.post("/api/applications", async (req, res) => {
    try {
      const applicationData = insertApplicationSchema.parse(req.body);
      const application = await storage.createApplication(applicationData);
      res.status(201).json(application);
    } catch (error) {
      res.status(400).json({ message: "Invalid application data" });
    }
  });

  // Website monitoring routes
  app.get("/api/websites", async (req, res) => {
    try {
      const employeeId = req.query.employeeId as string | undefined;
      const websites = await storage.getWebsites(employeeId);
      res.json(websites);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch websites" });
    }
  });

  app.post("/api/websites", async (req, res) => {
    try {
      const websiteData = insertWebsiteSchema.parse(req.body);
      const website = await storage.createWebsite(websiteData);
      res.status(201).json(website);
    } catch (error) {
      res.status(400).json({ message: "Invalid website data" });
    }
  });

  // Keystroke logging routes
  app.get("/api/keystrokes", async (req, res) => {
    try {
      const employeeId = req.query.employeeId as string | undefined;
      const keystrokes = await storage.getKeystrokes(employeeId);
      res.json(keystrokes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch keystrokes" });
    }
  });

  app.post("/api/keystrokes", async (req, res) => {
    try {
      const keystrokeData = insertKeystrokeSchema.parse(req.body);
      const keystroke = await storage.createKeystroke(keystrokeData);
      res.status(201).json(keystroke);
    } catch (error) {
      res.status(400).json({ message: "Invalid keystroke data" });
    }
  });

  // Screenshot routes
  app.get("/api/screenshots", async (req, res) => {
    try {
      const employeeId = req.query.employeeId as string | undefined;
      const screenshots = await storage.getScreenshots(employeeId);
      res.json(screenshots);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch screenshots" });
    }
  });

  app.post("/api/screenshots", async (req, res) => {
    try {
      const screenshotData = insertScreenshotSchema.parse(req.body);
      const screenshot = await storage.createScreenshot(screenshotData);
      res.status(201).json(screenshot);
    } catch (error) {
      res.status(400).json({ message: "Invalid screenshot data" });
    }
  });

  // Clipboard monitoring routes
  app.get("/api/clipboard-events", async (req, res) => {
    try {
      const employeeId = req.query.employeeId as string | undefined;
      const events = await storage.getClipboardEvents(employeeId);
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch clipboard events" });
    }
  });

  app.post("/api/clipboard-events", async (req, res) => {
    try {
      const eventData = insertClipboardEventSchema.parse(req.body);
      const event = await storage.createClipboardEvent(eventData);
      res.status(201).json(event);
    } catch (error) {
      res.status(400).json({ message: "Invalid clipboard event data" });
    }
  });

  // File activity routes
  app.get("/api/file-activities", async (req, res) => {
    try {
      const employeeId = req.query.employeeId as string | undefined;
      const activities = await storage.getFileActivities(employeeId);
      res.json(activities);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch file activities" });
    }
  });

  app.post("/api/file-activities", async (req, res) => {
    try {
      const activityData = insertFileActivitySchema.parse(req.body);
      const activity = await storage.createFileActivity(activityData);
      res.status(201).json(activity);
    } catch (error) {
      res.status(400).json({ message: "Invalid file activity data" });
    }
  });

  // Print job routes
  app.get("/api/print-jobs", async (req, res) => {
    try {
      const employeeId = req.query.employeeId as string | undefined;
      const jobs = await storage.getPrintJobs(employeeId);
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch print jobs" });
    }
  });

  app.post("/api/print-jobs", async (req, res) => {
    try {
      const jobData = insertPrintJobSchema.parse(req.body);
      const job = await storage.createPrintJob(jobData);
      res.status(201).json(job);
    } catch (error) {
      res.status(400).json({ message: "Invalid print job data" });
    }
  });

  // Communication monitoring routes
  app.get("/api/communications", async (req, res) => {
    try {
      const employeeId = req.query.employeeId as string | undefined;
      const communications = await storage.getCommunications(employeeId);
      res.json(communications);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch communications" });
    }
  });

  app.post("/api/communications", async (req, res) => {
    try {
      const communicationData = insertCommunicationSchema.parse(req.body);
      const communication = await storage.createCommunication(communicationData);
      res.status(201).json(communication);
    } catch (error) {
      res.status(400).json({ message: "Invalid communication data" });
    }
  });

  // Network activity routes
  app.get("/api/network-activity", async (req, res) => {
    try {
      const employeeId = req.query.employeeId as string | undefined;
      const activities = await storage.getNetworkActivity(employeeId);
      res.json(activities);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch network activities" });
    }
  });

  app.post("/api/network-activity", async (req, res) => {
    try {
      const activityData = insertNetworkActivitySchema.parse(req.body);
      const activity = await storage.createNetworkActivity(activityData);
      res.status(201).json(activity);
    } catch (error) {
      res.status(400).json({ message: "Invalid network activity data" });
    }
  });

  // Alert rules routes
  app.get("/api/alert-rules", async (req, res) => {
    try {
      const rules = await storage.getAlertRules();
      res.json(rules);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch alert rules" });
    }
  });

  app.post("/api/alert-rules", async (req, res) => {
    try {
      const ruleData = insertAlertRuleSchema.parse(req.body);
      const rule = await storage.createAlertRule(ruleData);
      res.status(201).json(rule);
    } catch (error) {
      res.status(400).json({ message: "Invalid alert rule data" });
    }
  });

  app.patch("/api/alert-rules/:id", async (req, res) => {
    try {
      const rule = await storage.updateAlertRule(req.params.id, req.body);
      if (!rule) {
        return res.status(404).json({ message: "Alert rule not found" });
      }
      res.json(rule);
    } catch (error) {
      res.status(500).json({ message: "Failed to update alert rule" });
    }
  });

  app.delete("/api/alert-rules/:id", async (req, res) => {
    try {
      const success = await storage.deleteAlertRule(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Alert rule not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete alert rule" });
    }
  });

  // Time tracking routes
  app.get("/api/time-tracking", async (req, res) => {
    try {
      const employeeId = req.query.employeeId as string | undefined;
      const date = req.query.date as string | undefined;
      const timeTracking = await storage.getTimeTracking(employeeId, date);
      res.json(timeTracking);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch time tracking data" });
    }
  });

  // Alert routes
  app.get("/api/alerts", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const alerts = await storage.getAlerts(limit);
      res.json(alerts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch alerts" });
    }
  });

  app.post("/api/alerts", async (req, res) => {
    try {
      const alertData = insertAlertSchema.parse(req.body);
      const alert = await storage.createAlert(alertData);
      res.status(201).json(alert);
    } catch (error) {
      res.status(400).json({ message: "Invalid alert data" });
    }
  });

  app.patch("/api/alerts/:id/read", async (req, res) => {
    try {
      const alert = await storage.markAlertAsRead(req.params.id);
      if (!alert) {
        return res.status(404).json({ message: "Alert not found" });
      }
      res.json(alert);
    } catch (error) {
      res.status(500).json({ message: "Failed to mark alert as read" });
    }
  });

  // Dashboard statistics
  app.get("/api/dashboard/stats", async (req, res) => {
    try {
      const employees = await storage.getEmployees();
      const onlineEmployees = employees.filter(emp => emp.status === "online");
      const idleEmployees = employees.filter(emp => emp.status === "idle");
      const offlineEmployees = employees.filter(emp => emp.status === "offline");

      const stats = {
        online: onlineEmployees.length,
        idle: idleEmployees.length,
        offline: offlineEmployees.length,
        total: employees.length
      };

      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch dashboard statistics" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
