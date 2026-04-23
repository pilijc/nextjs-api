"use client";

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

/**
 * A reusable search bar for querying movies.
 */
export function SearchBar({ defaultValue = "" }: { defaultValue?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(defaultValue || searchParams.get("query") || "");

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex w-full max-w-2xl flex-col gap-3 sm:flex-row">
      <label className="sr-only" htmlFor="movie-search">
        Search movies by title
      </label>
      <input
        id="movie-search"
        name="query"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies by title..."
        className="min-h-11 flex-1 rounded-md border border-input bg-background px-4 text-base shadow-xs outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
      />
      <Button type="submit" size="lg" className="gap-2" disabled={!query.trim()}>
        <Search className="size-4" aria-hidden="true" />
        Search
      </Button>
    </form>
  );
}
