"use client";

import { useWatchlist } from "@/hooks/use-watchlist";
import { Loader2, Trash2, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getPosterUrl } from "@/services/tmdb.service";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { MovieGridSkeleton } from "@/components/ui/skeleton-card";

/**
 * Renders the personal watchlist page.
 */
export default function WatchlistPage() {
  const { watchlist, isLoading, removeWatchlistItem } = useWatchlist();

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Your Watchlist</h1>
        <p className="mt-1 text-muted-foreground">
          Movies you&apos;ve saved to watch later.
        </p>
      </div>

      {isLoading ? (
        <MovieGridSkeleton count={5} />
      ) : watchlist.length === 0 ? (
        <EmptyState 
          title="Your watchlist is empty"
          message="Search for movies and add them to your watchlist."
          action={
            <Button asChild className="mt-6">
              <Link href="/">Find Movies</Link>
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {watchlist.map((item) => {
            const year = item.releaseDate ? new Date(item.releaseDate).getFullYear() : "N/A";
            const rating = item.voteAverage ? item.voteAverage.toFixed(1) : "NR";

            return (
              <div key={item.id} className="group relative flex flex-col gap-2 rounded-lg border bg-card p-2 text-card-foreground shadow-sm transition-all hover:shadow-md">
                <Link href={`/movie/${item.movieId}`} className="absolute inset-0 z-10">
                  <span className="sr-only">View details for {item.title}</span>
                </Link>
                <div className="relative aspect-[2/3] w-full overflow-hidden rounded-md bg-muted">
                  {item.posterPath ? (
                    <Image
                      src={getPosterUrl(item.posterPath)}
                      alt={`Poster for ${item.title}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                      No Poster
                    </div>
                  )}
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute right-2 top-2 z-20 h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                    onClick={(e) => {
                      e.preventDefault();
                      removeWatchlistItem(item.movieId);
                    }}
                    title="Remove from watchlist"
                  >
                    <Trash2 className="size-4" />
                    <span className="sr-only">Remove from watchlist</span>
                  </Button>
                </div>
                <div className="flex flex-1 flex-col justify-between p-1">
                  <div>
                    <h3 className="line-clamp-1 font-semibold" title={item.title}>
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{year}</p>
                  </div>
                  <div className="mt-2 flex items-center gap-1 text-sm font-medium">
                    <Star className="size-4 fill-primary text-primary" aria-hidden="true" />
                    <span>{rating}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
