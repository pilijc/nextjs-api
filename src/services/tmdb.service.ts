import axios from "axios";
import { MovieSearchResult, MovieDetails, MovieCreditsResponse, MovieVideosResponse, PersonSearchResult, PersonMovieCreditsResponse } from "@/types/movie";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const FALLBACK_POSTER_URL = "/placeholder-poster.png"; // We should create this placeholder if it doesn't exist, or use a gray box

const tmdbClient = axios.create({
  baseURL: TMDB_BASE_URL,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
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

/**
 * Fetches the videos (trailers, teasers, etc.) for a specific movie.
 */
export async function getMovieVideos(id: number | string): Promise<MovieVideosResponse> {
  const response = await tmdbClient.get<MovieVideosResponse>(`/movie/${id}/videos`);
  return response.data;
}

/**
 * Fetches the daily trending movies.
 */
export async function getTrendingMovies(): Promise<MovieSearchResult> {
  const response = await tmdbClient.get<MovieSearchResult>("/trending/movie/day");
  return response.data;
}

/**
 * Searches for people (actors, directors, etc.) by name.
 */
export async function searchPerson(query: string): Promise<PersonSearchResult> {
  const response = await tmdbClient.get<PersonSearchResult>("/search/person", {
    params: { query, include_adult: false },
  });
  return response.data;
}

/**
 * Fetches the movie credits (filmography) for a specific person.
 */
export async function getPersonMovieCredits(personId: number | string): Promise<PersonMovieCreditsResponse> {
  const response = await tmdbClient.get<PersonMovieCreditsResponse>(`/person/${personId}/movie_credits`);
  return response.data;
}
