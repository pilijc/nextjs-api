"use client";

import { Star } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  initialRating?: number | null;
  onRate: (rating: number) => void;
}

/**
 * A clickable 5-star rating component for the user's custom database ratings.
 */
export function RatingStars({ initialRating, onRate }: RatingStarsProps) {
  const [hover, setHover] = useState(0);
  const rating = initialRating || 0;

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onRate(star);
          }}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          className="focus:outline-none transition-transform hover:scale-110"
          aria-label={`Rate ${star} stars`}
        >
          <Star
            className={cn(
              "size-5 transition-colors",
              (hover || rating) >= star
                ? "fill-yellow-400 text-yellow-400"
                : "fill-muted text-muted-foreground hover:fill-yellow-400/50 hover:text-yellow-400/50"
            )}
          />
        </button>
      ))}
    </div>
  );
}
