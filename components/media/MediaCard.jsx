import Link from "next/link";
import Thumbnail from "./Thumbnail";
import { formatDurationDisplay } from "../../lib/media-utils";

export default function MediaCard({ video, variant = "default", playlistContext = null }) {
  const href = playlistContext 
    ? `/media/${video.slug}?list=${encodeURIComponent(playlistContext)}` 
    : `/media/${video.slug}`;
  const duration = video.duration ? formatDurationDisplay(video.duration) : null;
  const date = video.publishedAt ? new Date(video.publishedAt).toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "numeric"
  }) : "";

  if (variant === "compact") {
    return (
      <Link href={href} className="group flex gap-4 cursor-pointer items-start">
        <div className="w-[160px] aspect-video rounded-lg overflow-hidden shrink-0 relative border border-white/5 bg-[#141414]">
          <Thumbnail
            video={video}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="160px"
          />
          {duration && (
            <span className="absolute bottom-1 right-1 bg-black/80 px-1 rounded text-[10px] font-bold text-white z-10">
              {duration}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1 flex-1 min-w-0">
          <h5 className="font-sans font-semibold text-sm sm:text-base text-white group-hover:text-[#e50914] transition-colors line-clamp-2 leading-[1.6]">
            {video.title}
          </h5>
          {video.playlist && (
            <p className="font-['Inter'] text-[12px] text-[#e9bcb6] line-clamp-1 mt-0.5">{video.playlist}</p>
          )}
          <p className="font-['Inter'] text-[12px] text-[#bab8b7]">
            {date}
          </p>
        </div>
      </Link>
    );
  }

  // Default variant (and fallback for others for now)
  return (
    <Link href={href} className="group cursor-pointer block w-full">
      <div className="relative aspect-[16/9] rounded-lg overflow-hidden card-hover-effect border border-white/5 bg-[#141414] mb-4 group/video">
        <Thumbnail
          video={video}
          className="w-full h-full object-cover opacity-80 group-hover/video:opacity-100 transition-opacity"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {/* Play Button Overlay (Visible only on hover of the video thumbnail) */}
        <div className="absolute inset-0 flex items-center justify-center bg-transparent opacity-0 group-hover/video:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center transform scale-75 group-hover/video:scale-100 transition-transform duration-300">
            <span className="material-symbols-outlined text-[#900000] text-[28px] ml-1" style={{ fontVariationSettings: "'FILL' 1" }}>
              play_arrow
            </span>
          </div>
        </div>
        {duration && (
          <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 rounded text-xs font-bold text-white z-10 pointer-events-none">
            {duration}
          </div>
        )}
      </div>
      <h4 className="font-sans font-semibold text-base sm:text-lg text-[#e2e2e2] group-hover:text-[#ffb4aa] transition-colors line-clamp-2 leading-[1.6] mb-1">
        {video.title}
      </h4>
      <p className="type-body-sm text-[#e9bcb6]">
        {date}
      </p>
    </Link>
  );
}
