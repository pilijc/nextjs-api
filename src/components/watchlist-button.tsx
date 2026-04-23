"use client";

import { Button } from "@/components/ui/button";
import { Plus, Check, Loader2 } from "lucide-react";
import { useWatchlist } from "@/hooks/use-watchlist";
import { Movie } from "@/types/movie";

/**
 * A client component button to add or remove a movie from the watchlist.
 */
export function WatchlistButton({ movie }: { movie: Movie }) {
  const { isInWatchlist, addWatchlistItem, removeWatchlistItem, isLoading } = useWatchlist();

  if (isLoading) {
    return (
      <Button variant="outline" size="lg" disabled className="gap-2">
        <Loader2 className="size-4 animate-spin" />
        Loading...
      </Button>
    );
  }

  const isSaved = isInWatchlist(movie.id);

  if (isSaved) {
    return (
      <Button
        variant="secondary"
        size="lg"
        className="gap-2"
        onClick={() => removeWatchlistItem(movie.id)}
      >
        <Check className="size-4" />
        Saved to Watchlist
      </Button>
    );
  }

  return (
    <Button
      variant="default"
      size="lg"
      className="gap-2"
      onClick={() => addWatchlistItem(movie)}
    >
      <Plus className="size-4" />
      Add to Watchlist
    </Button>
  );
}
