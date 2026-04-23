"use client";

import { Button } from "@/components/ui/button";
import { Plus, Check, Loader2 } from "lucide-react";
import { useWatchlist } from "@/hooks/use-watchlist";
import { Movie } from "@/types/movie";
import { RatingStars } from "@/components/rating-stars";
import { cn } from "@/lib/utils";

/**
 * A client component button to add or remove a movie from the watchlist.
 */
export function WatchlistButton({ movie }: { movie: Movie }) {
  const { watchlist, isInWatchlist, addWatchlistItem, removeWatchlistItem, updateRating, isLoading } = useWatchlist();

  if (isLoading) {
    return (
      <Button variant="outline" size="lg" disabled className="gap-2">
        <Loader2 className="size-4 animate-spin" />
        Loading...
      </Button>
    );
  }

  const isSaved = isInWatchlist(movie.id);
  const watchlistItem = watchlist.find((item) => item.movieId === movie.id);

  return (
    <div className="flex flex-col gap-4 items-start min-h-[90px]">
      <Button
        variant={isSaved ? "secondary" : "default"}
        size="lg"
        className="gap-2 transition-all"
        onClick={() => isSaved ? removeWatchlistItem(movie.id) : addWatchlistItem(movie)}
      >
        {isSaved ? <Check className="size-4" /> : <Plus className="size-4" />}
        {isSaved ? "Saved to Watchlist" : "Add to Watchlist"}
      </Button>
      
      <div 
        className={cn(
          "flex flex-col gap-1 transition-all duration-500 ease-out",
          isSaved ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
        )}
      >
        <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Your Rating</span>
        <RatingStars initialRating={watchlistItem?.rating} onRate={(r) => updateRating(movie.id, r)} />
      </div>
    </div>
  );
}
