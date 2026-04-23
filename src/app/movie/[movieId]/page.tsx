import Image from "next/image";
import { notFound } from "next/navigation";
import { Star, Clock, Calendar } from "lucide-react";
import { getMovieDetails, getMovieCredits, getPosterUrl, getBackdropUrl } from "@/services/tmdb.service";
import { WatchlistButton } from "@/components/watchlist-button";
import { ErrorState } from "@/components/ui/error-state";

/**
 * Server component that renders the details of a specific movie.
 */
export default async function MovieDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  
  try {
    const [movie, credits] = await Promise.all([
      getMovieDetails(params.id),
      getMovieCredits(params.id),
    ]);

    const year = movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A";
    const runtime = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : "N/A";
    const backdropUrl = getBackdropUrl(movie.backdrop_path);

    return (
      <main className="w-full">
        {/* Backdrop Header */}
        <div className="relative h-[30vh] w-full bg-muted md:h-[40vh]">
          {backdropUrl ? (
            <Image
              src={backdropUrl}
              alt="Backdrop"
              fill
              className="object-cover opacity-30"
              priority
            />
          ) : (
            <div className="h-full w-full bg-slate-900" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        </div>

        <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
          <div className="relative -mt-32 flex flex-col gap-8 md:-mt-48 md:flex-row">
            {/* Poster */}
            <div className="relative aspect-[2/3] w-48 shrink-0 overflow-hidden rounded-lg shadow-lg md:w-72">
              <Image
                src={getPosterUrl(movie.poster_path)}
                alt={`Poster for ${movie.title}`}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Details */}
            <div className="flex flex-col justify-end pb-4 pt-8 md:pt-48">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{movie.title}</h1>
              
              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="size-4 fill-primary text-primary" />
                  <span className="font-medium text-foreground">{movie.vote_average.toFixed(1)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="size-4" />
                  <span>{year}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="size-4" />
                  <span>{runtime}</span>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              <p className="mt-6 max-w-3xl leading-7 text-muted-foreground">
                {movie.overview || "No overview available."}
              </p>

              <div className="mt-8">
                <WatchlistButton movie={movie} />
              </div>
            </div>
          </div>

          {/* Cast */}
          <div className="mt-16">
            <h2 className="mb-6 text-2xl font-bold">Top Cast</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {credits.cast.slice(0, 12).map((actor) => (
                <div key={actor.id} className="flex flex-col items-center text-center">
                  <div className="relative mb-2 aspect-square w-24 overflow-hidden rounded-full bg-muted">
                    {actor.profile_path ? (
                      <Image
                        src={getPosterUrl(actor.profile_path)}
                        alt={actor.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-secondary text-xs text-muted-foreground">
                        N/A
                      </div>
                    )}
                  </div>
                  <span className="text-sm font-medium">{actor.name}</span>
                  <span className="text-xs text-muted-foreground">{actor.character}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  } catch (error: any) {
    if (error?.response?.status === 404) {
      notFound();
    }
    return (
      <main className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <ErrorState 
          title="Error Loading Movie" 
          message="We couldn't fetch the details for this movie." 
        />
      </main>
    );
  }
}
