"use client";

import { useRef } from "react";
import MediaCard from "./MediaCard";

export default function LatestUploads({ videos = [] }) {
  const scrollRef = useRef(null);

  if (!videos || videos.length === 0) return null;

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth * 0.75;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="mt-[48px] px-[6vw] relative group">
      <div className="flex items-center justify-between mb-6">
        <h2 className="type-heading-xl flex items-center gap-4 text-white mb-2">
          <span className="w-1 h-8 md:h-12 bg-[#e50914] rounded-full"></span>
          Latest Uploads
        </h2>
        
        <div className="flex gap-2">
          <button suppressHydrationWarning onClick={() => scroll('left')} className="p-2 rounded-full bg-white/5 hover:bg-white/20 text-white transition-colors" aria-label="Scroll left">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button suppressHydrationWarning onClick={() => scroll('right')} className="p-2 rounded-full bg-white/5 hover:bg-white/20 text-white transition-colors" aria-label="Scroll right">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>
      
      {/* Hide scrollbar but allow horizontal scroll */}
      <div 
        ref={scrollRef}
        className="flex gap-[16px] overflow-x-auto video-rail pb-8 snap-x snap-mandatory scroll-smooth" 
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {videos.map((video) => (
          <div key={video.id} className="w-[85vw] md:w-[calc(50%-8px)] lg:w-[calc(25%-12px)] shrink-0 snap-start">
            <MediaCard video={video} />
          </div>
        ))}
      </div>
    </section>
  );
}
