"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface HeroBannerProps {
  backdropUrl: string | null;
  videoKey: string | null;
  title: string;
}

/**
 * A Netflix-style Hero Banner that displays a backdrop image 
 * and seamlessly crossfades to an auto-playing trailer after 5 seconds.
 */
export function HeroBanner({ backdropUrl, videoKey, title }: HeroBannerProps) {
  const [playVideo, setPlayVideo] = useState(false);

  useEffect(() => {
    // Only attempt to play video if we have a valid YouTube key
    if (!videoKey) return;

    // Wait 5 seconds before crossfading to the trailer
    const timer = setTimeout(() => {
      setPlayVideo(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, [videoKey]);

  return (
    <div className="relative h-[35vh] w-full bg-slate-950 md:h-[55vh] overflow-hidden">
      {/* 1. The Backdrop Image (Fades out when video plays) */}
      {backdropUrl && (
        <Image
          src={backdropUrl}
          alt={`Backdrop for ${title}`}
          fill
          className={cn(
            "object-cover transition-opacity duration-1000",
            playVideo ? "opacity-0" : "opacity-40"
          )}
          priority
        />
      )}

      {/* 2. The Auto-playing YouTube Trailer */}
      {videoKey && playVideo && (
        // We scale the video up to hide the YouTube title bar and black bars
        <div className="absolute inset-0 z-0 w-full h-full pointer-events-none scale-[1.35] md:scale-[1.15] opacity-50 animate-in fade-in duration-1000">
          <iframe
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=1&controls=0&modestbranding=1&loop=1&playlist=${videoKey}&rel=0&showinfo=0`}
            title={`${title} Trailer`}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>
      )}

      {/* 3. The Gradient Overlay to blend with the rest of the page */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent z-10" />
    </div>
  );
}
