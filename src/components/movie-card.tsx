import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Movie } from "@/types/movie";
import { getPosterUrl } from "@/services/tmdb.service";

/**
 * Renders a movie card with poster, title, year, and rating.
 */
export function MovieCard({ movie }: { movie: Movie }) {
  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A";
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "NR";

  return (
    <div className="group relative flex flex-col gap-2 rounded-lg border bg-card p-2 text-card-foreground shadow-sm transition-all hover:shadow-md">
      <Link href={`/movie/${movie.id}`} className="absolute inset-0 z-10">
        <span className="sr-only">View details for {movie.title}</span>
      </Link>
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-md bg-muted">
        {movie.poster_path ? (
          <Image
            src={getPosterUrl(movie.poster_path)}
            alt={`Poster for ${movie.title}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
            No Poster
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col justify-between p-1">
        <div>
          <h3 className="line-clamp-1 font-semibold" title={movie.title}>
            {movie.title}
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
}
