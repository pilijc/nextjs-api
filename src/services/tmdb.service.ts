import axios from "axios";
import { MovieSearchResult, MovieDetails, MovieCreditsResponse } from "@/types/movie";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const FALLBACK_POSTER_URL = "/placeholder-poster.png"; // We should create this placeholder if it doesn't exist, or use a gray box

const tmdbClient = axios.create({
  baseURL: TMDB_BASE_URL,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
  },
});

/**
 * Helper to get the full poster URL, or a fallback if not available.
 */
export function getPosterUrl(posterPath: string | null): string {
  if (!posterPath) return FALLBACK_POSTER_URL;
  return `${TMDB_IMAGE_BASE_URL}${posterPath}`;
}

/**
 * Helper to get the full backdrop URL.
 */
export function getBackdropUrl(backdropPath: string | null): string | null {
  if (!backdropPath) return null;
  return `https://image.tmdb.org/t/p/original${backdropPath}`;
}

/**
 * Searches for movies by title query.
 */
export async function searchMovies(query: string, page: number = 1): Promise<MovieSearchResult> {
  const response = await tmdbClient.get<MovieSearchResult>("/search/movie", {
    params: { query, page, include_adult: false },
  });
  return response.data;
}

/**
 * Fetches detailed information for a specific movie by ID.
 */
export async function getMovieDetails(id: number | string): Promise<MovieDetails> {
  const response = await tmdbClient.get<MovieDetails>(`/movie/${id}`);
  return response.data;
}

/**
 * Fetches the cast and crew credits for a specific movie.
 */
export async function getMovieCredits(id: number | string): Promise<MovieCreditsResponse> {
  const response = await tmdbClient.get<MovieCreditsResponse>(`/movie/${id}/credits`);
  return response.data;
}
