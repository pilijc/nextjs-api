"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Movie } from "@/types/movie";

export interface WatchlistItem {
  id: string;
  viewerId: string;
  movieId: number;
  title: string;
  posterPath: string | null;
  releaseDate: string | null;
  voteAverage: number;
  createdAt: string;
}

const VIEWER_ID_KEY = "movie_finder_viewer_id";

/**
 * Gets or creates an anonymous viewer ID in localStorage.
 */
export function getOrCreateViewerId(): string {
  if (typeof window === "undefined") return "";
  let viewerId = localStorage.getItem(VIEWER_ID_KEY);
  if (!viewerId) {
    viewerId = crypto.randomUUID();
    localStorage.setItem(VIEWER_ID_KEY, viewerId);
  }
  return viewerId;
}

/**
 * Hook to manage watchlist state and API interactions.
 */
export function useWatchlist() {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWatchlist = async () => {
      const viewerId = getOrCreateViewerId();
      if (!viewerId) return;

      try {
        const response = await axios.get<WatchlistItem[]>(`/api/watchlist?viewerId=${viewerId}`);
        setWatchlist(response.data);
      } catch (error) {
        toast.error("Failed to load watchlist");
      } finally {
        setIsLoading(false);
      }
    };

    fetchWatchlist();
  }, []);

  const isInWatchlist = (movieId: number) => {
    return watchlist.some((item) => item.movieId === movieId);
  };

  const addWatchlistItem = async (movie: Movie) => {
    const viewerId = getOrCreateViewerId();
    const previousWatchlist = [...watchlist];
    
    // Optimistic update
    const newItem: WatchlistItem = {
      id: "temp-" + Date.now(),
      viewerId,
      movieId: movie.id,
      title: movie.title,
      posterPath: movie.poster_path,
      releaseDate: movie.release_date,
      voteAverage: movie.vote_average,
      createdAt: new Date().toISOString(),
    };
    
    setWatchlist((prev) => [...prev, newItem]);

    try {
      const response = await axios.post<WatchlistItem>("/api/watchlist", {
        viewerId,
        movieId: movie.id,
        title: movie.title,
        posterPath: movie.poster_path,
        releaseDate: movie.release_date,
        voteAverage: movie.vote_average,
      });
      
      // Update with real item
      setWatchlist((prev) => prev.map((item) => item.id === newItem.id ? response.data : item));
      toast.success("Added to watchlist");
    } catch (error) {
      setWatchlist(previousWatchlist);
      toast.error("Failed to add to watchlist");
    }
  };

  const removeWatchlistItem = async (movieId: number) => {
    const viewerId = getOrCreateViewerId();
    const previousWatchlist = [...watchlist];
    
    // Optimistic update
    setWatchlist((prev) => prev.filter((item) => item.movieId !== movieId));

    try {
      await axios.delete(`/api/watchlist/${movieId}?viewerId=${viewerId}`);
      toast.success("Removed from watchlist");
    } catch (error) {
      setWatchlist(previousWatchlist);
      toast.error("Failed to remove from watchlist");
    }
  };

  return {
    watchlist,
    isLoading,
    isInWatchlist,
    addWatchlistItem,
    removeWatchlistItem,
  };
}
