import { formatViews, formatDate } from "../../../lib/media-utils";

export default function VideoMetadata({ video }) {
  if (!video) return null;
  
  const views = formatViews(video.viewCount);
  const date = formatDate(video.publishedAt);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-2">
        {video.category && (
          <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#c1121f]/20 text-[#ffb4aa] border border-[#c1121f]/40">
            {video.category.replace(/-/g, " ")}
          </span>
        )}
        {video.playlist && (
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white/80 border border-white/10">
            {video.playlist}
          </span>
        )}
      </div>
      <h1 className="type-heading-lg mt-1 text-white leading-normal pb-1">
        {video.title}
      </h1>
      <div className="flex items-center gap-3 text-xs md:text-sm text-white/60">
        {video.viewCount ? <span>{views}</span> : null}
        {video.viewCount && date ? <span>•</span> : null}
        {date ? <span>{date}</span> : null}
      </div>
    </div>
  );
}

