import Link from "next/link";
import { getFeaturedVideos, getLatestVideos } from "../../lib/media";

import MediaCard from "./MediaCard";

export default function FeaturedCollection() {
  let videos = getFeaturedVideos();
  // Fallback if no featured videos are set
  if (!videos || videos.length === 0) {
    videos = getLatestVideos(4);
  }

  // The design shows 4 trending videos in a grid
  const displayVideos = videos.slice(0, 4);

  return (
    <section className="mt-[48px] px-[6vw] bg-[#141414]/30 py-16">
      <div className="flex items-center gap-3 mb-10">
        <span className="material-symbols-outlined text-[#ffb4aa] text-3xl">
          workspace_premium
        </span>
        <h2 className="font-['Montserrat'] text-[32px] leading-[40px] font-[700] text-[#e2e2e2]">
          Calakar Essentials
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[16px]">
        {displayVideos.map((video) => (
          <MediaCard key={video.id} video={video} />
        ))}
      </div>
    </section>
  );
}
