# Project Structure Overview

This document provides a high-level overview of the `skill-test-app` project structure and organization.

## Directory Tree

```text
skill-test-app/
├── src/
│   ├── app/                # Next.js App Router (Pages, Layouts, APIs)
│   │   ├── api/            # Backend API routes
│   │   │   └── users/      # User-related endpoints
│   │   ├── globals.css     # Global styles (Tailwind imports)
│   │   ├── layout.tsx      # Root layout (Metadata, Providers)
│   │   └── page.tsx        # Homepage
│   ├── components/         # Reusable React components
│   │   ├── forms/          # Form-specific components
│   │   └── ui/             # Shadcn UI primitives (Buttons, Inputs, etc.)
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions and shared libraries
│   ├── services/           # Data fetching and external API logic
│   └── types/              # TypeScript interfaces and types
├── public/                 # Static assets (images, icons)
├── package.json            # Dependencies and script definitions
├── tsconfig.json           # TypeScript configuration
└── next.config.ts          # Next.js specific configuration
```

## Key Directories Explained

- **`src/app/`**: Contains the core application logic using Next.js App Router. Each subdirectory typically represents a route or an API endpoint.
- **`src/components/`**: Organized into `ui` (primitive components from Shadcn) and feature-specific components like `forms`.
- **`src/lib/`**: Shared utility functions (e.g., Tailwind merge utilities, data formatters).
- **`src/services/`**: Centralized logic for external API calls and data fetching.
- **`src/types/`**: Global TypeScript definitions and interfaces to ensure type safety across the project.
