# Bay Area Small Business Money Flow Study - Landing Page

## Overview

A professional, SF 49ers-themed full-stack application designed to recruit Bay Area small business owners for a research study about money flow and cash management. The application features a modern landing page with Airtable form integration for participant sign-ups, a comprehensive admin dashboard for managing testimonials, built with React, TypeScript, Tailwind CSS, Express.js, and PostgreSQL.

The project follows a complete full-stack architecture with:
- Landing page with Airtable form integration and testimonials section
- Session-based admin authentication system
- Protected admin dashboard for managing testimonials
- PostgreSQL database with Drizzle ORM for data persistence

The design emphasizes accessibility, responsiveness, security, and professional presentation suitable for research contexts.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type safety and modern component patterns
- Vite as the build tool and development server for fast HMR and optimized production builds
- Wouter for lightweight client-side routing (single-page application)
- React Query (@tanstack/react-query) for server state management (configured but not actively used)

**Design System**
- Tailwind CSS for utility-first styling with custom design tokens
- shadcn/ui component library ("new-york" variant) providing a comprehensive set of accessible, customizable React components
- SF 49ers-inspired theme with scarlet red (#AA0000) and metallic gold (#B3995D) color palette
- Color scheme: neutral-900 for primary text, neutral-600 for secondary, scarlet red for CTAs and interactive elements
- Hero gradient: Red-to-gold (from-red-50 via-amber-50 to-yellow-50)
- Section backgrounds: Alternating white, light red (red-50), and light gold (amber-50) tints
- Responsive mobile-first design with breakpoint-based layouts

**Component Architecture**
- Single-page layout with smooth scroll navigation to anchor sections
- Sticky header navigation with backdrop blur effects
- Component structure: Header, Hero (Golden Gate Bridge background), Why, What, Who (with Bay Area map), Join (Airtable form CTAs), FAQ, Footer
- Radix UI primitives for accessible interactive components (accordion, dialog, etc.)
- Circular logo with rounded-full styling to prevent square background showing through transparent header
- "Who" section features Bay Area subregions map in responsive two-column layout (45%/55% split on desktop) with business types grid

**State Management**
- Minimal local state using React hooks (useEffect for scroll behavior)
- No complex global state management needed for current functionality

### Backend Architecture

**Server Framework**
- Express.js with TypeScript for Node.js server
- ESM module system throughout the codebase
- Development vs production environment handling via NODE_ENV

**Development Tooling**
- tsx for running TypeScript in development without compilation
- esbuild for production server bundling (fast compilation, tree-shaking)
- Vite middleware integration for development server with HMR
- Custom logging middleware for API request tracking

**API Structure**
- Minimal API surface - routes configured in server/routes.ts but currently unused
- Placeholder storage layer (MemStorage) with user CRUD operations
- Prepared for future backend expansion (authentication, data collection)

**Database Layer**
- Drizzle ORM configured for PostgreSQL (via @neondatabase/serverless)
- Schema defined in shared/schema.ts with user table (id, username, password)
- Migration system configured but database currently optional
- Uses Drizzle-Zod for schema validation

### Design Patterns

**Styling Philosophy**
- Reference-based approach drawing from modern SaaS landing pages
- Professional research-focused aesthetic with emphasis on trust and clarity
- Systematic spacing using Tailwind units (3, 4, 6, 8, 10, 14, 16)
- Consistent component padding patterns (p-6 for cards, px-6 py-3 for buttons)
- Responsive grid layouts: mobile-first single column scaling to 2-3 column grids

**Type Safety**
- Strict TypeScript configuration with incremental builds
- Shared types between client and server via path aliases (@shared/*)
- Zod schemas for runtime validation (integrated with Drizzle)

**Code Organization**
- Path aliases for clean imports: @/ for client, @shared/ for shared code, @assets/ for static assets
- Separation of concerns: client/, server/, shared/ directories
- Component co-location: UI components in client/src/components/ui/
- Single page component architecture (home.tsx contains all landing page logic)

## External Dependencies

### Core Services

**Airtable Integration**
- Direct form links for study participant sign-ups
- Form URL: https://airtable.com/app7zSIVoUGYjyCDL/pago2glKfdgI0sxqM/form
- Three CTAs throughout the landing page (header, hero, join section)

**Database (Optional)**
- Neon Serverless PostgreSQL configured but not required for basic operation
- Connection via DATABASE_URL environment variable
- Drizzle ORM for type-safe database operations when database is provisioned

### Third-Party Libraries

**UI & Styling**
- Radix UI components (20+ primitives: accordion, dialog, dropdown, popover, etc.)
- class-variance-authority for variant-based component styling
- clsx & tailwind-merge for conditional CSS class composition
- Lucide React for iconography

**Development Tools**
- Replit-specific plugins: runtime error modal, cartographer, dev banner (development only)
- PostCSS with Tailwind CSS and Autoprefixer for CSS processing
- Embla Carousel for potential carousel functionality

**Build & Runtime**
- date-fns for date manipulation utilities
- nanoid for unique ID generation
- connect-pg-simple for PostgreSQL session storage (configured but unused)

### Environment Variables

**Required for Full Functionality**
- `DATABASE_URL`: PostgreSQL connection string (optional, for future features)
- `NODE_ENV`: Environment flag (development/production)

**Optional/Development**
- `REPL_ID`: Replit-specific identifier for development plugins