import Link from "next/link"
import { Search, ListVideo } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Suspense } from "react"
import { SearchBar } from "@/components/search-bar"
import { TrendingCarousel } from "@/components/trending-carousel"
import { getTrendingMovies } from "@/services/tmdb.service"

function SearchBarFallback() {
  return <div className="h-11 w-full max-w-2xl rounded-md border bg-muted animate-pulse" />
}
import { Separator } from "@/components/ui/separator"

/**
 * Renders the movie finder homepage with the initial search entry point.
 */
export default async function Page() {
  let trendingMovies = [];
  try {
    const data = await getTrendingMovies();
    trendingMovies = data.results;
  } catch (error) {
    console.error("Failed to fetch trending movies");
  }
  return (
    <div className="flex flex-col w-full min-h-screen pb-12">
      {/* Full-width Hero Slider */}
      {trendingMovies.length > 0 && (
        <TrendingCarousel movies={trendingMovies} />
      )}

      {/* Main Content Area */}
      <main className="mx-auto flex w-full max-w-6xl flex-col px-4 pt-12 sm:px-6 lg:pt-16">
        <section className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="space-y-7">
            <div className="space-y-4">
              <p className="text-sm font-medium text-primary">Movie IT</p>
              <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
                Find your next movie and keep a watchlist ready.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
                Search titles, preview movie details, and save films you want to watch later.
              </p>
            </div>

            <Suspense fallback={<SearchBarFallback />}>
              <SearchBar />
            </Suspense>
            <p className="text-sm text-muted-foreground">
              This product uses the TMDB API.
            </p>
          </div>

          <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
            <div className="space-y-4">
              <div className="flex size-12 items-center justify-center rounded-md bg-primary/10 text-primary">
                <ListVideo className="size-6" aria-hidden="true" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold">Your movie list starts here</h2>
                <p className="leading-7 text-muted-foreground">
                  Search first, then save favorite results into a personal watchlist in the next build steps.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Separator className="my-12" />
      </main>
    </div>
  )
}
