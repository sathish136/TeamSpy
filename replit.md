# WorkView - Employee Monitoring Dashboard

## Overview

This is a modern employee monitoring dashboard application built as a full-stack TypeScript project. The application provides real-time tracking of employee activities, time management, and productivity analytics similar to enterprise monitoring solutions like Teramind. The system has been rebranded as "WorkView" with an improved professional blue color scheme.

## User Preferences

Preferred communication style: Simple, everyday language.
Navigation: Only Dashboard and Time Tracking pages should be accessible - all other routes show 404 error pages.
Deployment: Need simple .exe file that runs on 200 systems with zero configuration, automatically connects to server at 10.15.115.120:5000
Agent Integration: Python and C# monitoring agents available for connecting desktop systems to WorkView dashboard

## Recent Changes

- ✅ **2025-01-30**: Successfully migrated project from Replit Agent to standard Replit environment
- ✅ **2025-01-30**: Added agent registration API endpoints (`/api/agent/register`, `/api/agent/heartbeat`)
- ✅ **2025-01-30**: Created agent configuration file (`agent_config.json`) for easy setup
- ✅ **2025-01-30**: Verified API connectivity with test agent registration (200 response)
- ✅ **2025-01-30**: All required packages installed and workflow running on port 5000
- ✅ **2025-01-30**: Added .NET ApiClient class for desktop agent integration
- ✅ **2025-01-30**: Updated Program.cs with automatic agent registration and heartbeat
- ✅ **2025-01-30**: Created test connection utilities for both Python and C# agents

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **API Pattern**: RESTful API design
- **Storage**: In-memory storage implementation with interface for future database integration
- **Development**: Hot module replacement via Vite middleware

### UI Component System
- **Design System**: shadcn/ui components built on Radix UI primitives
- **Theme**: Custom WorkView branding with professional blue (HSL 220, 90%, 56%) primary colors
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Icons**: Lucide React icon library

## Key Components

### Data Models
The application uses a shared schema system with the following core entities:
- **Employees**: User profiles with status, location, and current activity
- **Activities**: Tracked application/website usage with productivity categorization
- **Time Tracking**: Daily hour summaries (total, productive, idle)
- **Alerts**: System notifications for violations, idle time, and login events

### Storage Layer
- **Interface**: `IStorage` defines methods for CRUD operations
- **Implementation**: `MemStorage` provides in-memory data with seed data
- **Future Ready**: Designed for easy database integration (Drizzle ORM configured for PostgreSQL)

### API Endpoints
- `GET /api/employees` - List all employees
- `GET /api/employees/:id` - Get specific employee
- `POST /api/employees` - Create new employee
- `PATCH /api/employees/:id` - Update employee
- Similar patterns for activities, time tracking, and alerts

### Dashboard Features
- **Real-time Stats**: Live employee status (online/idle/offline)
- **Activity Monitoring**: Application and website usage tracking
- **Time Tracking**: Visual charts showing work hours and productivity
- **Alert System**: Notifications for policy violations and unusual activity
- **Employee Table**: Comprehensive view of all monitored employees

## Data Flow

1. **Client Requests**: React components use TanStack Query hooks to fetch data
2. **API Layer**: Express routes handle HTTP requests and validate input using Zod schemas
3. **Storage Layer**: Memory storage provides immediate data access with simulated delays
4. **Real-time Updates**: Periodic polling (30-second intervals) for live statistics
5. **State Management**: Query client handles caching, background updates, and error states

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, TanStack Query
- **Backend**: Express.js, Node.js built-ins
- **TypeScript**: Full type safety across frontend and backend
- **Build Tools**: Vite, ESBuild, PostCSS

### UI and Styling
- **Component Library**: Radix UI primitives for accessibility
- **Styling**: Tailwind CSS for utility-first styling
- **Icons**: Lucide React for consistent iconography
- **Date Handling**: date-fns for time formatting

### Database Preparation
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Schema**: Shared TypeScript types generated from Drizzle schemas
- **Migrations**: Drizzle Kit for database schema management
- **Connection**: Neon Database serverless PostgreSQL support

### Development Tools
- **Hot Reload**: Vite plugin for runtime error overlay
- **Path Aliases**: TypeScript path mapping for clean imports
- **Environment**: Cross-platform development with ES modules

## Deployment Strategy

### Development Mode
- **Frontend**: Vite dev server with HMR
- **Backend**: tsx for TypeScript execution with auto-restart
- **Database**: In-memory storage for immediate development
- **Environment**: Replit-optimized with dev banner integration

### Production Build
- **Frontend**: Vite builds static assets to `dist/public`
- **Backend**: ESBuild bundles server code to `dist/index.js`
- **Database**: PostgreSQL via DATABASE_URL environment variable
- **Serving**: Express serves both API and static frontend files

### Database Migration Path
The application is designed to seamlessly transition from in-memory storage to PostgreSQL:
1. Environment variable `DATABASE_URL` triggers database mode
2. Drizzle schemas already define the table structure
3. Migration files ready in `./migrations` directory
4. Storage interface allows hot-swapping implementations

The architecture supports both development (memory) and production (database) modes without code changes to the business logic.

## Desktop Agent System

### Agent Development
- **Python Agent**: Comprehensive monitoring agent with cross-platform support
- **C# .NET Agent**: Windows-focused enterprise agent with advanced system integration
- **API Communication**: RESTful endpoints for all monitoring data types

### Monitoring Capabilities
Both agents support comprehensive data collection:
- Session monitoring (login/logout/lock/unlock)
- Application tracking with productivity categorization
- Website monitoring with domain analysis
- Network activity monitoring with risk assessment
- File system monitoring with USB detection
- Screen capture (periodic screenshots)
- Print job monitoring
- Email/chat metadata collection
- Keystroke logging (optional, requires consent)
- Clipboard monitoring

### Data Collection Architecture
- **Database Integration**: PostgreSQL schema supports all monitoring data types
- **API Endpoints**: Comprehensive REST API for agent data submission
- **Real-time Processing**: Live data ingestion with automatic categorization
- **Risk Assessment**: Built-in security analysis for files and network activity

### Agent Deployment
- **Python Agent**: Cross-platform with pip installation
- **C# Agent**: Windows service with MSI installer
- **Configuration**: JSON-based configuration with environment variable support
- **Authentication**: Optional API key authentication for secure communication

### Security & Compliance
- **Privacy Controls**: Granular feature toggles with consent management
- **Data Encryption**: HTTPS-only communication with credential protection
- **Risk Scoring**: Automatic threat assessment for monitored activities
- **Audit Trail**: Complete monitoring history for compliance reporting