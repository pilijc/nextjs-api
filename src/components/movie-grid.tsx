import { Movie } from "@/types/movie";
import { MovieCard } from "./movie-card";
import { EmptyState } from "./ui/empty-state";

/**
 * Renders a responsive grid of movie cards.
 */
export function MovieGrid({ movies }: { movies: Movie[] }) {
  if (!movies || movies.length === 0) {
    return (
      <EmptyState 
        title="No movies found" 
        message="Try adjusting your search query." 
      />
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
