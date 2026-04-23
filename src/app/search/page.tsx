import { Suspense } from "react";
import { SearchBar } from "@/components/search-bar";
import { MovieGrid } from "@/components/movie-grid";
import { searchMovies, searchPerson, getPersonMovieCredits } from "@/services/tmdb.service";
import { MovieGridSkeleton } from "@/components/ui/skeleton-card";
import { ErrorState } from "@/components/ui/error-state";
import { EmptyState } from "@/components/ui/empty-state";
import Image from "next/image";
import { getPosterUrl } from "@/services/tmdb.service";
import { Person, PersonMovieCredit } from "@/types/movie";
import { Movie } from "@/types/movie";

/**
 * Renders movie search results.
 */
async function MovieSearchResults({ query }: { query: string }) {
  if (!query) return null;
  try {
    const data = await searchMovies(query);
    if (data.results.length === 0) {
      return <EmptyState title="No movies found" message={`No results for "${query}". Try a different title.`} />;
    }
    return <MovieGrid movies={data.results} />;
  } catch {
    return <ErrorState title="Error fetching movies" message="Please check your connection and try again." />;
  }
}

/**
 * Shows person cards from a cast/actor search.
 */
async function CastSearchResults({ query }: { query: string }) {
  if (!query) return null;
  try {
    const data = await searchPerson(query);
    if (data.results.length === 0) {
      return <EmptyState title="No people found" message={`No cast members found for "${query}". Try a different name.`} />;
    }
    return (
      <div className="flex flex-col gap-10">
        {data.results.slice(0, 5).map(async (person: Person) => {
          let credits: PersonMovieCredit[] = [];
          try {
            const creditData = await getPersonMovieCredits(person.id);
            credits = creditData.cast
              .filter((m) => m.poster_path)
              .sort((a, b) => b.vote_average - a.vote_average)
              .slice(0, 8);
          } catch { /* silently ignore */ }

          return (
            <div key={person.id} className="flex flex-col gap-4">
              {/* Person header */}
              <div className="flex items-center gap-4">
                <div className="relative size-16 shrink-0 overflow-hidden rounded-full bg-muted ring-2 ring-primary/20">
                  {person.profile_path ? (
                    <Image
                      src={getPosterUrl(person.profile_path)}
                      alt={person.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xl font-bold text-muted-foreground">
                      {person.name[0]}
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-bold">{person.name}</h2>
                  <p className="text-sm text-muted-foreground">{person.known_for_department}</p>
                </div>
              </div>

              {/* Their filmography */}
              {credits.length > 0 ? (
                <MovieGrid movies={credits as unknown as Movie[]} />
              ) : (
                <p className="text-sm text-muted-foreground">No notable movies found.</p>
              )}
            </div>
          );
        })}
      </div>
    );
  } catch {
    return <ErrorState title="Error fetching cast" message="Please check your connection and try again." />;
  }
}

/**
 * Renders the search page, supporting both movie and cast search modes.
 */
export default async function SearchPage(props: {
  searchParams: Promise<{ query?: string; type?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const type = searchParams?.type === "cast" ? "cast" : "movie";

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">{type === "cast" ? "Search by Cast" : "Search Movies"}</h1>
          {query && (
            <p className="mt-1 text-muted-foreground">
              {type === "cast" ? "Movies featuring" : "Showing results for"} &quot;{query}&quot;
            </p>
          )}
        </div>
      </div>

      <div className="mb-8">
        <Suspense fallback={<div className="h-20 w-full max-w-2xl rounded-md border bg-muted animate-pulse" />}>
          <SearchBar defaultValue={query} />
        </Suspense>
      </div>

      <Suspense key={`${type}-${query}`} fallback={<MovieGridSkeleton count={10} />}>
        {type === "cast" ? (
          <CastSearchResults query={query} />
        ) : (
          <MovieSearchResults query={query} />
        )}
      </Suspense>
    </main>
  );
}
