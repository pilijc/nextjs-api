"use client";

import { Search, Film, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { cn } from "@/lib/utils";

type SearchType = "movie" | "cast";

/**
 * A reusable search bar for querying movies or cast members.
 */
export function SearchBar({ defaultValue = "" }: { defaultValue?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(defaultValue || searchParams.get("query") || "");
  const [type, setType] = useState<SearchType>(
    (searchParams.get("type") as SearchType) || "movie"
  );

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query.trim())}&type=${type}`);
    }
  };

  return (
    <div className="flex w-full max-w-2xl flex-col gap-3">
      {/* Type toggle tabs */}
      <div className="flex gap-1 rounded-lg border bg-muted p-1 w-fit">
        {([
          { value: "movie", label: "Movie", icon: Film },
          { value: "cast", label: "Cast / Actor", icon: Users },
        ] as { value: SearchType; label: string; icon: React.ElementType }[]).map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            type="button"
            onClick={() => setType(value)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all",
              type === value
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon className="size-3.5" />
            {label}
          </button>
        ))}
      </div>

      {/* Search input */}
      <form onSubmit={handleSearch} className="flex w-full flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="movie-search">
          {type === "movie" ? "Search movies by title" : "Search by cast or actor name"}
        </label>
        <input
          id="movie-search"
          name="query"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={type === "movie" ? "Search movies by title..." : "Search by actor or cast name..."}
          className="min-h-11 flex-1 rounded-md border border-input bg-background px-4 text-base shadow-xs outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
        />
        <Button type="submit" size="lg" className="gap-2" disabled={!query.trim()}>
          <Search className="size-4" aria-hidden="true" />
          Search
        </Button>
      </form>
    </div>
  );
}
