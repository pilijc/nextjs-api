import { Suspense } from "react"
import { SearchBar } from "@/components/search-bar"
import { TrendingCarousel } from "@/components/trending-carousel"
import { getTrendingMovies } from "@/services/tmdb.service"
import { Search, Bookmark, Star, Zap } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

function SearchBarFallback() {
  return <div className="h-12 w-full rounded-full border bg-muted animate-pulse" />
}

/**
 * Renders the Movie IT homepage with the trending hero carousel and search section.
 */
export default async function Page() {
  let trendingMovies: Awaited<ReturnType<typeof getTrendingMovies>>["results"] = [];
  try {
    const data = await getTrendingMovies();
    trendingMovies = data.results;
  } catch (error) {
    console.error("Failed to fetch trending movies");
  }

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Full-width Hero Slider */}
      {trendingMovies.length > 0 && (
        <TrendingCarousel movies={trendingMovies} />
      )}

      {/* Search Section */}
      <main className="w-full">
        {/* Search Hero */}
        <section className="relative overflow-hidden border-b">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary uppercase tracking-widest mb-6">
              <Zap className="size-3" />
              Powered by TMDB
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              Discover your next
              <span className="text-primary"> favorite film</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Search millions of movies, explore ratings and overviews, and build a personal watchlist — no account needed.
            </p>
            <div className="max-w-2xl mx-auto">
              <Suspense fallback={<SearchBarFallback />}>
                <SearchBar />
              </Suspense>
            </div>
          </div>
        </section>

        {/* Features Strip */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 py-14 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex flex-col items-start gap-3 rounded-2xl border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Search className="size-5" />
            </div>
            <h2 className="font-bold text-lg">Instant Search</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Search by title and get instant, beautifully presented results with posters, ratings, and release dates.
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 rounded-2xl border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Bookmark className="size-5" />
            </div>
            <h2 className="font-bold text-lg">Personal Watchlist</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Save any movie to your watchlist instantly. No sign-up required — your list is remembered automatically.
            </p>
            <Button variant="ghost" className="px-0 text-primary hover:text-primary/80 hover:bg-transparent text-sm font-semibold" asChild>
              <Link href="/watchlist">Open Watchlist →</Link>
            </Button>
          </div>

          <div className="flex flex-col items-start gap-3 rounded-2xl border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Star className="size-5" />
            </div>
            <h2 className="font-bold text-lg">Rate What You Watch</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Give your own 1–5 star ratings to movies in your watchlist. Your ratings, your taste — saved privately.
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}
