# Project Structure Overview

This document provides a high-level overview of the **Movie Finder & Watchlist** application structure and organization.

## Tech Stack Overview
- **Core:** Next.js 16 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS (v4), Shadcn UI, Lucide React (Icons)
- **Database Layer:** Prisma ORM, PostgreSQL (via Supabase)
- **Networking:** Axios, TMDB API (The Movie Database)

## Directory Tree

```text
skill-test-app/
├── prisma/
│   └── schema.prisma         # Database schema defining the WatchlistItem model
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── api/              # Backend API routes
│   │   │   └── watchlist/    # GET, POST, DELETE endpoints for watchlist sync
│   │   ├── movie/[id]/       # Dynamic route for individual movie details
│   │   ├── search/           # Search results page route
│   │   ├── watchlist/        # User's personal watchlist page route
│   │   ├── globals.css       # Global styling and Tailwind root configuration
│   │   ├── layout.tsx        # Shared app shell, navigation, and Theme providers
│   │   └── page.tsx          # Homepage search entry point
│   │
│   ├── components/           # Reusable React components
│   │   ├── ui/               # Shadcn UI primitives (Buttons, Separators, Toasts)
│   │   ├── app-navbar.tsx    # Shared top navigation component
│   │   ├── mode-toggle.tsx   # Light/Dark mode switch
│   │   ├── movie-card.tsx    # Individual movie display card
│   │   ├── movie-grid.tsx    # Responsive grid layout wrapper for cards
│   │   ├── search-bar.tsx    # Reusable query input form
│   │   └── watchlist-button.tsx # Interactive button for adding/removing movies
│   │
│   ├── hooks/                # Custom React hooks
│   │   └── use-watchlist.ts  # Logic for optimistic UI updates and local viewerId
│   │
│   ├── lib/                  # Utility functions and shared singletons
│   │   ├── prisma.ts         # Global Prisma client singleton
│   │   └── utils.ts          # Tailwind class merging utilities (cn)
│   │
│   ├── services/             # Data fetching & External logic
│   │   └── tmdb.service.ts   # Axios client and TMDB API fetch wrappers
│   │
│   └── types/                # TypeScript interface definitions
│       └── movie.ts          # Core domain models (Movie, CastMember, etc.)
│
├── .env.example              # Template for required environment variables
├── next.config.ts            # Next.js configuration (allows external TMDB images)
├── package.json              # NPM dependencies and scripts
└── tsconfig.json             # TypeScript compiler settings
```

## Architecture Notes

### State & Storage
Instead of implementing a heavy authentication flow (NextAuth/Clerk), the application utilizes an anonymous browser `viewerId` stored in `localStorage` inside the `use-watchlist.ts` hook. This `viewerId` is passed in API calls to the PostgreSQL database, acting as a lightweight session tracker allowing users to have personal watchlists instantly.

### Component Rendering
- **Server Components (Default):** Route pages (`/search`, `/movie/[id]`) default to executing on the server. They safely securely fetch data from the TMDB API without exposing the `TMDB_ACCESS_TOKEN` to the browser.
- **Client Components (`"use client"`):** Interactive components like the `<SearchBar />` (which reads from Next router) and the `<WatchlistButton />` (which interacts with `localStorage` and toasts) execute client-side.

### Error & Loading Handling
Next.js `Suspense` boundaries are paired with generic `MovieGridSkeleton` elements to display instantaneous visual feedback. Fallbacks like `ErrorState` and `EmptyState` gracefully catch edge cases such as network timeouts or failed search queries.

## Why This Architecture Excels

This architecture provides a premier balance of user experience and developer velocity:

- **Zero-Friction User Onboarding:** By utilizing an anonymous `localStorage` session tracker rather than a rigid authentication gate, users can begin adding to their watchlist instantly. There are no forms to fill out, no passwords to forget, and absolutely zero barrier to entry.
- **Server-Side Security & SEO:** By fetching TMDB data exclusively within Server Components, the application achieves lightning-fast page loads and excellent Search Engine Optimization (SEO). Crucially, this entirely shields the `TMDB_ACCESS_TOKEN` from the client's browser, preventing API quota abuse.
- **Instantaneous "Optimistic" UI:** Client-side hooks immediately update the interface (like adding a green checkmark to a button) *before* the PostgreSQL database even finishes responding, creating a deeply satisfying and lag-free user experience.
- **Bulletproof Type Safety:** Integrating Prisma with end-to-end TypeScript ensures that the database schema is intrinsically locked to the application logic. Changes to the database immediately alert developers to any mismatches in the codebase.
- **Highly Cost-Efficient Deployment:** Running Next.js on Vercel paired with a connection-pooled Supabase database is exceptionally lightweight, allowing the application to comfortably scale on entirely free-tier infrastructure.
