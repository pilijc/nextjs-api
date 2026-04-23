import Link from "next/link"
import { Search, ListVideo } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SearchBar } from "@/components/search-bar"
import { Separator } from "@/components/ui/separator"

/**
 * Renders the movie finder homepage with the initial search entry point.
 */
export default function Page() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col px-4 py-12 sm:px-6 lg:py-16">
      <section className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="space-y-7">
          <div className="space-y-4">
            <p className="text-sm font-medium text-primary">Movie Finder and Watchlist</p>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
              Find your next movie and keep a watchlist ready.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
              Search titles, preview movie details, and save films you want to watch later.
            </p>
          </div>

          <SearchBar />
          <p className="text-sm text-muted-foreground">
            This product uses the TMDB API but is not endorsed or certified by TMDB.
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

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Search movies</h2>
            <p className="text-muted-foreground">
              Look up movies by title and browse clean results with posters, years, and ratings.
            </p>
            <Button asChild variant="secondary">
              <Link href="/">Start searching</Link>
            </Button>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Your watchlist</h2>
            <p className="text-muted-foreground">
              Saved movies will appear here once the watchlist feature is connected.
            </p>
            <Button asChild variant="outline">
              <Link href="/watchlist">Open watchlist</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
