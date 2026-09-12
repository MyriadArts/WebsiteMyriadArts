"use client";

import { useState } from "react";
import Thumbnail from "../Thumbnail";
import { useSearchParams } from "next/navigation";

export default function VideoPlayerHero({ video }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const searchParams = useSearchParams();
  const listParam = searchParams.get("list");

  if (!video) return null;

  // Build iframe src
  const iframeSrc = `${video.embedUrl}?autoplay=1&modestbranding=1&rel=0`;

  return (
    <section className="relative w-full aspect-video max-h-[85vh] bg-black flex items-center justify-center overflow-hidden group">
      {!isPlaying ? (
        <>
          <div className="absolute inset-0 z-0">
            <Thumbnail
              video={video}
              className="w-full h-full object-cover opacity-60"
              priority={true}
            />
            {/* Gradient overlay from original design */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0f0f] via-transparent to-transparent opacity-80"></div>
          </div>
          
          <button suppressHydrationWarning
            onClick={() => setIsPlaying(true)}
            className="relative z-10 w-[80px] h-[56px] rounded-[16px] bg-[#e50914] flex items-center justify-center transition-all duration-300 hover:scale-105 group-hover:bg-[#f40612] shadow-lg"
            aria-label="Play video"
          >
            <span className="material-symbols-outlined text-white text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              play_arrow
            </span>
          </button>

          {/* Fake progress bar from the HTML design to show it's a player */}
          <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#282a2b]">
            <div className="h-full bg-[#e50914] w-[65%] relative transition-all">
              {/* Playhead handle */}
              <div className="absolute top-1/2 -translate-y-1/2 -right-[6px] w-[12px] h-[12px] bg-white rounded-full shadow-md"></div>
            </div>
          </div>
        </>
      ) : (
        <div className="w-full h-full z-20 bg-black">
          <iframe
            src={iframeSrc}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      )}
    </section>
  );
}
