# Movie Finder & Watchlist

A comprehensive movie search and personal watchlist application built with Next.js App Router, Prisma, PostgreSQL (Supabase), and the TMDB API.

## Features

- **Movie Search:** Fast and responsive movie search by title using the TMDB API.
- **Detailed Movie Pages:** View full details including poster, backdrop, runtime, genre, ratings, and top cast members.
- **Personal Watchlist:** Users can add and remove movies from their own persistent watchlist.
- **Anonymous Sessions:** Watchlists are tied securely to the user's browser session via a `viewerId` without requiring a full authentication/login flow.
- **Responsive UI:** Clean, modern, accessible interface built with Tailwind CSS and Shadcn UI.
- **Loading & Error States:** Full `Suspense` loading skeletons and graceful error boundaries for a premium user experience.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Shadcn UI
- **Database:** PostgreSQL (Hosted on Supabase)
- **ORM:** Prisma
- **Data Fetching:** Axios
- **External API:** The Movie Database (TMDB) API v4

## Local Development Setup

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Environment Variables:**
   Create a `.env` file in the root of the project with your credentials:
   ```env
   # Transaction pooler (for serverless environments/standard queries)
   DATABASE_URL="postgresql://postgres.[your-project]:[encoded-password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"

   # Session pooler (for Prisma migrations)
   DIRECT_URL="postgresql://postgres.[your-project]:[encoded-password]@aws-0-[region].pooler.supabase.com:5432/postgres"

   # TMDB v4 Read Access Token
   TMDB_ACCESS_TOKEN="your_tmdb_token_here"
   ```

3. **Initialize Database Schema:**
   Sync the Prisma schema with your PostgreSQL database:
   ```bash
   npx prisma db push
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

This application is configured for seamless deployment on **Render**. 
When deploying, ensure that your Render Project Environment Variables contain `DATABASE_URL`, `DIRECT_URL`, and `TMDB_ACCESS_TOKEN`. Render will automatically run `prisma generate` during the build phase.

## Disclaimer

This product uses the TMDB API.
