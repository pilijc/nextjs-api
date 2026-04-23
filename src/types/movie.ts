/**
 * Shared types for movie data from TMDB.
 */

export interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  overview: string;
}

export interface MovieSearchResult {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface MovieDetails extends Movie {
  runtime: number | null;
  genres: Array<{ id: number; name: string }>;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface MovieCreditsResponse {
  id: number;
  cast: CastMember[];
}

export interface MovieVideo {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
}

export interface MovieVideosResponse {
  id: number;
  results: MovieVideo[];
}
