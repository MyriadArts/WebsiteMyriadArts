"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function MediaHero({ videos = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!videos || videos.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % videos.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [videos]);

  if (!videos || videos.length === 0) {
    return (
      <section className="relative h-[750px] w-full flex items-end px-[6vw] pb-24 pt-20 overflow-hidden">
        {/* Background with subtle red spotlight (replicates Three.js shader) */}
        <div className="absolute inset-0 bg-transparent -z-10">
          <div className="absolute inset-x-0 top-0 h-[600px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#E50014]/20 via-transparent to-transparent opacity-80 mix-blend-screen"></div>
        </div>
        
        {/* Scrim Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent z-10"></div>
        
        <div className="relative z-20 max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-[#e50914] text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 animate-pulse">
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span> LIVE
            </span>
            <span className="text-[#e9bcb6] font-['Inter'] text-[14px] leading-[20px] tracking-widest font-[700] uppercase">
              Official Channel Spotlight
            </span>
          </div>
          <h1 className="font-sans font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-4 leading-[1.35]">
            The Grand Premiere: A<br />Cinematic Performance<br />Journey
          </h1>
          <p className="font-sans text-sm sm:text-base text-[#e9bcb6] mb-8 max-w-2xl leading-[1.6]">
            Experience our highly anticipated full-length stage production, captured in multi-angle 4K with spatial audio. A digital ecosystem built for arts enthusiasts to witness the magic of performing arts from any corner of the globe.
          </p>
          
          <div className="flex flex-wrap gap-4 mt-8">
            <button suppressHydrationWarning className="type-button bg-[#e50914] text-[#fff7f6] px-6 py-3 rounded-lg flex items-center gap-2 hover:brightness-110 transition-all card-hover-effect">
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
              Watch Now
            </button>
            <button suppressHydrationWarning className="type-button bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-white/20 transition-all">
              <span className="material-symbols-outlined text-[20px]">info</span>
              View Details
            </button>
          </div>
        </div>
  
        {/* Stats Overlay */}
        <div className="absolute right-[6vw] bottom-24 hidden md:flex flex-col gap-6 text-right z-20">
          <div>
            <div className="font-evelins text-[32px] leading-[40px] tracking-wider text-[#ffb4aa]">50K+</div>
            <div className="font-sans text-[14px] leading-[20px] tracking-[0.05em] font-[600] text-[#e9bcb6]">Subscribers</div>
          </div>
          <div>
            <div className="font-evelins text-[32px] leading-[40px] tracking-wider text-[#ffb4aa]">2M+</div>
            <div className="font-sans text-[14px] leading-[20px] tracking-[0.05em] font-[600] text-[#e9bcb6]">Total Views</div>
          </div>
        </div>
      </section>
    );
  }

  const currentVideo = videos[currentIndex];

  return (
    <section className="relative min-h-[640px] md:min-h-[760px] lg:min-h-[820px] h-[85vh] max-h-[900px] w-full overflow-hidden">
      {/* Background Images */}
      {videos.map((video, index) => (
        <div
          key={video.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100 z-0" : "opacity-0 -z-10"
          }`}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${video.thumbnail?.high || video.thumbnail?.medium || ""}')` }}
          />
          {/* Netflix style gradients: fade from bottom and fade from left */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/70 to-transparent w-full md:w-3/4"></div>
        </div>
      ))}
      
      {/* Content */}
      <div className="relative z-20 h-full w-full flex items-end px-[6vw] pb-16 md:pb-24 pt-20 pointer-events-none">
        <div className="max-w-[720px] pointer-events-auto">
          {/* Series badge */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1.5">
              <span className="w-[12px] h-[20px] bg-[#e50914] rounded-sm"></span>
              <span className="text-[#e2e2e2] font-evelins tracking-widest text-[15px] md:text-[16px] font-[700] uppercase">
                {currentVideo.category?.replace(/-/g, ' ') || "Featured"}
              </span>
            </div>
          </div>
          
          <h1 className="font-sans font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-4 md:mb-6 drop-shadow-lg leading-[1.55] md:leading-[1.6] max-w-3xl pt-3 pb-1 overflow-visible">
            {currentVideo.title}
          </h1>
          
          <p className="font-sans text-sm sm:text-base text-white/90 mb-6 md:mb-8 max-w-2xl line-clamp-2 md:line-clamp-3 leading-[1.85] drop-shadow-md">
            {currentVideo.shortDescription || currentVideo.description}
          </p>
          
          <div className="flex flex-wrap gap-4 mt-2">
            <Link href={`/media/${currentVideo.slug}`} className="pointer-events-auto">
              <button suppressHydrationWarning className="type-button bg-white text-black px-6 md:px-8 py-2 md:py-3 rounded-[4px] flex items-center justify-center gap-3 hover:bg-white/80 transition-colors">
                <span className="material-symbols-outlined text-[28px] md:text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                Play
              </button>
            </Link>
            <Link href={`/media/${currentVideo.slug}`} className="pointer-events-auto">
              <button suppressHydrationWarning className="type-button bg-[#6d6d6e]/70 text-white px-6 md:px-8 py-2 md:py-3 rounded-[4px] flex items-center justify-center gap-3 hover:bg-[#6d6d6e]/50 transition-colors">
                <span className="material-symbols-outlined text-[24px] md:text-[28px]">info</span>
                More Info
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-12 right-[6vw] flex gap-2 z-20 pointer-events-auto">
        {videos.map((_, index) => (
          <button
            key={index}
            suppressHydrationWarning

            onClick={() => setCurrentIndex(index)}
            className={`h-1 rounded-full transition-all duration-500 ease-in-out ${
              index === currentIndex ? "w-6 bg-white" : "w-3 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
