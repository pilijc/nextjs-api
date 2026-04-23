import Link from "next/link"
import { Clapperboard, ListVideo } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"

/**
 * Renders the shared top navigation for the movie finder app.
 */
export function AppNavbar() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/10 bg-transparent transition-colors duration-300">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 group">
          {/* Gradient logo mark */}
          <span className="relative flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-primary/80 to-cyan-500 shadow-lg shadow-primary/30 group-hover:shadow-primary/50 transition-shadow duration-300">
            <Clapperboard className="size-4 text-white drop-shadow" aria-hidden="true" />
          </span>
          <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
            Movie <span className="text-primary">IT</span>
          </span>
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
