# Employee Monitoring Dashboard

## Overview

This is a modern employee monitoring dashboard application built as a full-stack TypeScript project. The application provides real-time tracking of employee activities, time management, and productivity analytics similar to enterprise monitoring solutions like Teramind.

## User Preferences

Preferred communication style: Simple, everyday language.

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
- **Theme**: Custom Teramind branding with orange (#FF6B35) accent colors
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