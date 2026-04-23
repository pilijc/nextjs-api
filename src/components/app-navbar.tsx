import Link from "next/link"
import { Film, ListVideo } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"

/**
 * Renders the shared top navigation for the movie finder app.
 */
export function AppNavbar() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Film className="size-5" aria-hidden="true" />
          </span>
          <span>Movie Finder</span>
        </Link>

        <nav className="flex items-center gap-2" aria-label="Main navigation">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">Search</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/watchlist" className="gap-2">
              <ListVideo className="size-4" aria-hidden="true" />
              Watchlist
            </Link>
          </Button>
          <ModeToggle />
        </nav>
      </div>
    </header>
  )
}
