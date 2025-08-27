# Festival Science Film - Replit Project Guide

## Overview

This is a web application for the "Festival znanstvenog filma" (Festival of Science Film) featuring the 2025 theme "Green Jobs - Zeleni poslovi budućnosti" (Green Jobs - The Green Jobs of the Future). The application serves as a comprehensive festival website showcasing documentary films about sustainable development, renewable energy, and green careers across multiple Croatian cities.

The project is built as a full-stack web application with a React frontend and Express backend, featuring a film catalog, location information, scheduling system, and festival details. It's designed to be a single-page application with smooth scrolling navigation and responsive design.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **Routing**: Wouter for lightweight client-side routing
- **UI Framework**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query (React Query) for server state management
- **Styling**: CSS custom properties for theming with light/dark mode support

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **API Design**: RESTful API endpoints following conventional patterns
- **Data Layer**: In-memory storage with interface abstraction for future database integration
- **Development Setup**: Vite middleware integration for seamless full-stack development

### Data Storage Architecture
- **Current Implementation**: In-memory storage using Map data structures
- **Database Ready**: Drizzle ORM configured for PostgreSQL migration
- **Schema Design**: Well-defined TypeScript schemas for Films, Locations, and Schedule Events
- **Data Validation**: Zod schemas for runtime type checking and validation

### Component Architecture
- **Design System**: shadcn/ui components with Radix UI primitives
- **Layout Pattern**: Section-based homepage with smooth scroll navigation
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Accessibility**: Semantic HTML with proper ARIA labels and test IDs

### Development Workflow
- **Type Safety**: Full TypeScript coverage across frontend, backend, and shared schemas
- **Code Organization**: Monorepo structure with shared types between client and server
- **Asset Management**: Optimized image loading with external CDN resources
- **Error Handling**: Centralized error boundaries and API error handling

## External Dependencies

### UI and Styling
- **shadcn/ui**: Modern component library built on Radix UI primitives
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Radix UI**: Headless UI components for accessibility and behavior
- **Lucide React**: Icon library for consistent iconography

### Backend Services
- **Neon Database**: Serverless PostgreSQL for production data storage
- **Drizzle ORM**: Type-safe database client with migration support
- **Express Session**: Session management with PostgreSQL session store

### Development Tools
- **Vite**: Fast build tool with HMR and optimization features
- **TypeScript**: Static typing for enhanced developer experience
- **ESBuild**: Fast JavaScript bundler for production builds
- **Replit Integration**: Development environment optimizations

### External APIs and Services
- **Google Fonts**: Typography with Inter, DM Sans, and other web fonts
- **Unsplash/Pixabay**: High-quality images for film and location showcases
- **Replit Services**: Development banner and environment detection

### Runtime Dependencies
- **TanStack Query**: Powerful data fetching and caching library
- **Wouter**: Minimalist routing library for React
- **Date-fns**: Modern date utility library for scheduling features
- **Class Variance Authority**: Utility for managing component variants