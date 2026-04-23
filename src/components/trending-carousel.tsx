"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { Movie } from "@/types/movie";
import { getBackdropUrl } from "@/services/tmdb.service";
import { Info, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * A full-width draggable Hero Slider displaying trending movies.
 */
export function TrendingCarousel({ movies }: { movies: Movie[] }) {
  const validMovies = movies.filter((m) => m.backdrop_path).slice(0, 5); // Limit to top 5
  
  // Drag-to-scroll state for desktop mouse users
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  if (validMovies.length === 0) return null;

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault(); // prevent text selection
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Scroll speed multiplier
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  // Prevent link click when user is dragging (not clicking)
  const handleLinkClick = (e: React.MouseEvent) => {
    if (isDragging) {
      e.preventDefault();
    }
  };

  return (
    <div 
      className="w-full flex overflow-x-auto snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden cursor-grab active:cursor-grabbing bg-background"
      ref={scrollRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      {validMovies.map((movie) => (
        <div 
          key={movie.id}
          className="relative w-full h-[65vh] min-h-[500px] max-h-[800px] shrink-0 snap-center select-none bg-background"
        >
          <Image
            src={getBackdropUrl(movie.backdrop_path) as string}
            alt={movie.title}
            fill
            className="object-cover object-top pointer-events-none"
            priority
            draggable={false}
          />
          {/* Vignette Gradients for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent w-full md:w-3/4 pointer-events-none" />
          
          {/* Content overlay — sits at the bottom, away from the navbar */}
          <div className="absolute inset-0 z-20 flex flex-col justify-end pb-12 sm:pb-20 px-6 sm:px-12 md:px-24 pointer-events-none">
            <div className="max-w-2xl">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tighter mb-3 uppercase drop-shadow-lg leading-none">
                {movie.title}
              </h2>
              
              <div className="flex items-center gap-3 text-sm sm:text-base font-semibold text-slate-300 mb-6 drop-shadow">
                <span className="flex items-center gap-1 text-red-500">
                  ★ {movie.vote_average.toFixed(1)}
                </span>
                <span>&bull;</span>
                <span>{movie.release_date?.substring(0, 4)}</span>
              </div>

              <p className="text-slate-200 text-sm sm:text-base md:text-lg line-clamp-3 mb-8 drop-shadow-md leading-relaxed max-w-xl">
                {movie.overview}
              </p>

              <div className="flex items-center gap-4 pointer-events-auto">
                <Button size="lg" variant="secondary" className="rounded-full px-8 gap-2 bg-black/60 hover:bg-black/80 text-white border border-white/20 backdrop-blur-md" asChild onClick={handleLinkClick}>
                  <Link href={`/movie/${movie.id}`} draggable={false}>
                    <Info className="size-5" />
                    View Details
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
