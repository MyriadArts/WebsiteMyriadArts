"use client";

import MediaCard from "../MediaCard";

export default function PlaylistQueue({ playlist, videos, currentVideoId }) {
  if (!videos || videos.length === 0) return null;

  return (
    <aside className="bg-[#1a1a1a] rounded-xl p-4 border border-white/10 mb-6">
      <div className="mb-4 pb-4 border-b border-white/10">
        <h3 className="text-center font-['Montserrat'] text-[20px] leading-[28px] font-[700] text-[#ffffff] mb-1">
          {playlist}
        </h3>
        <p className="font-['Inter'] text-[12px] leading-[16px] font-[500] text-[#e9bcb6]">
          {videos.length} {videos.length === 1 ? 'Video' : 'Videos'}
        </p>
      </div>
      
      <div className="space-y-3 max-h-[500px] overflow-y-auto overflow-x-hidden pr-2 custom-scrollbar overscroll-contain pointer-events-auto">
        {videos.map((video, index) => {
          const isCurrent = video.id === currentVideoId;
          return (
            <div 
              key={video.id} 
              className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${isCurrent ? 'bg-[#e50914]/10 border border-[#e50914]/30' : 'hover:bg-white/5'}`}
            >
              <div className="text-[#888] font-mono text-[12px] font-bold w-4 text-center shrink-0">
                {isCurrent ? <span className="material-symbols-outlined text-[16px] text-[#e50914]">play_arrow</span> : index + 1}
              </div>
              <div className="flex-1">
                <MediaCard video={video} variant="compact" playlistContext={playlist} />
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
