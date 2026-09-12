"use client";

import Link from "next/link";

const PlaylistCard = ({ playlist, className = "", isLarge = false }) => {
  if (!playlist) return null;
  return (
    <Link 
      href={`/media/playlist/${encodeURIComponent(playlist.name)}`}
      className={`relative group rounded-xl overflow-hidden card-hover-effect cursor-pointer ${className}`}
    >
      <img 
        className="w-full h-full object-cover" 
        src={playlist.thumbnail?.high || playlist.thumbnail?.default || "/images/media/media-event-feature.png"} 
        alt={playlist.name} 
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = "/images/media/media-event-feature.png";
        }}
      />
      <div className={`absolute inset-0 flex flex-col justify-end p-6 md:p-10 ${
        isLarge 
          ? "bg-gradient-to-t from-black via-black/40 to-transparent" 
          : "bg-black/60 group-hover:bg-black/40 transition-colors"
      }`}>
        {isLarge && (
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-[#e50914] text-[10px] font-bold px-2 py-0.5 rounded text-[#fff7f6]">ORIGINAL SERIES</span>
            <span className="text-[#e9bcb6] text-sm">{playlist.videoCount} Episodes</span>
          </div>
        )}
        <h3 className={`font-['Montserrat'] font-[700] text-[#e2e2e2] ${
          isLarge ? "text-[32px] md:text-[48px] leading-[1.2] mb-4" : "text-[24px] leading-[32px] mb-2"
        }`}>
          {playlist.name}
        </h3>
        {isLarge ? (
          <>
            <p className="font-['Inter'] text-[16px] leading-[24px] font-[400] text-[#e9bcb6] max-w-lg mb-6 line-clamp-2">
              Dive deep into the creative process of the world's most innovative performers in this exclusive docu-series.
            </p>
            <button suppressHydrationWarning className="w-fit bg-white text-black px-6 py-2 md:px-8 md:py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-white/90">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
              Watch Series
            </button>
          </>
        ) : (
          <p className="text-sm text-[#e9bcb6]">{playlist.videoCount} videos</p>
        )}
      </div>
    </Link>
  );
};

const SectionRenderer = ({ title, targetPlaylists, allPlaylists, compact = false }) => {
  // Find matching playlists from the data
  const playlists = targetPlaylists
    .map(name => allPlaylists.find(p => p.name === name))
    .filter(Boolean);

  if (playlists.length === 0) return null;

  return (
    <div id={title.toLowerCase()} className={compact ? "mb-16 last:mb-0 scroll-mt-28" : "mb-32 md:mb-40 pt-4 scroll-mt-28"}>
      <div className="mb-8">
        <div>
          <h2 className={`font-evelins tracking-wide text-center font-light w-full ${compact ? "text-4xl md:text-5xl leading-[1.1]" : "text-5xl md:text-6xl lg:text-[5rem] leading-[1.1]"}`}>
            {title.split(' ').length > 1 ? (
              <>
                <span className="text-white">{title.split(' ').slice(0, -1).join(' ')}</span>{' '}
                <span className="text-[#c1121f]">{title.split(' ').slice(-1)[0]}</span>
              </>
            ) : (
              <span className="text-white">{title}</span>
            )}
          </h2>
        </div>
      </div>

      {compact ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {playlists.map((pl, idx) => (
            <PlaylistCard key={idx} playlist={pl} className="h-[230px] md:h-[260px]" isLarge={false} />
          ))}
        </div>
      ) : (
        <>
          {/* Layout for 3 or more playlists (Bento Grid) */}
          {playlists.length >= 3 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px] h-auto md:h-[500px]">
              <PlaylistCard playlist={playlists[0]} className="md:col-span-2 h-[400px] md:h-full" isLarge={true} />
              <div className="flex flex-col gap-[24px] h-[400px] md:h-full">
                <PlaylistCard playlist={playlists[1]} className="flex-1" />
                <PlaylistCard playlist={playlists[2]} className="flex-1" />
              </div>
            </div>
          )}

          {/* Layout for 2 playlists (Split Equal) */}
          {playlists.length === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] h-auto md:h-[400px]">
              <PlaylistCard playlist={playlists[0]} className="h-[400px] md:h-full" />
              <PlaylistCard playlist={playlists[1]} className="h-[400px] md:h-full" />
            </div>
          )}

          {/* Layout for 1 playlist (Full Width) */}
          {playlists.length === 1 && (
            <div className="grid grid-cols-1 gap-[24px] h-auto md:h-[500px]">
              <PlaylistCard playlist={playlists[0]} className="h-[400px] md:h-full" isLarge={true} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default function CuratedCollections({ allPlaylists = [], compact = false, noPadding = false }) {
  return (
    <section className={`${noPadding ? "" : "px-[6vw]"} ${compact ? "mt-12 pb-4" : "mt-[64px] pb-24 md:pb-36 mb-16"}`}>
      <SectionRenderer 
        title="Podcasts"
        targetPlaylists={["Mini Podcast", "Unfiltered with Shreyas", "Can We Talk"]}
        allPlaylists={allPlaylists}
        compact={compact}
      />
      
      <SectionRenderer 
        title="Interviews"
        targetPlaylists={["Potbhar Gappa", "Chance Pe Dance", "Thet Manatun (No filter)"]}
        allPlaylists={allPlaylists}
        compact={compact}
      />
      
      <SectionRenderer 
        title="Performances"
        targetPlaylists={["Dance Antakshari", "Aaja Nachle - Bollywood & Freestyle", "Vaarsa - Reliving The Folk Art of India"]}
        allPlaylists={allPlaylists}
        compact={compact}
      />
    </section>
  );
}
