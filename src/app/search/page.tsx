import { Suspense } from "react";
import { SearchBar } from "@/components/search-bar";
import { MovieGrid } from "@/components/movie-grid";
import { searchMovies } from "@/services/tmdb.service";
import { Loader2 } from "lucide-react";
import { MovieGridSkeleton } from "@/components/ui/skeleton-card";

import { ErrorState } from "@/components/ui/error-state";

/**
 * Server component that fetches and displays search results.
 */
async function SearchResults({ query }: { query: string }) {
  if (!query) {
    return null;
  }

  try {
    const data = await searchMovies(query);
    return <MovieGrid movies={data.results} />;
  } catch (error) {
    return (
      <ErrorState 
        title="Error fetching movies" 
        message="Please check your connection and try again." 
      />
    );
  }
}

/**
 * Renders the search page with results.
 */
export default async function SearchPage(props: { searchParams: Promise<{ query?: string }> }) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Search Movies</h1>
          {query && (
            <p className="mt-1 text-muted-foreground">
              Showing results for &quot;{query}&quot;
            </p>
          )}
        </div>
      </div>

      <div className="mb-8">
        <Suspense fallback={<div className="h-11 w-full max-w-2xl rounded-md border bg-muted animate-pulse" />}>
          <SearchBar defaultValue={query} />
        </Suspense>
      </div>

      <Suspense
        key={query}
        fallback={<MovieGridSkeleton count={10} />}
      >
        <SearchResults query={query} />
      </Suspense>
    </main>
  );
}
