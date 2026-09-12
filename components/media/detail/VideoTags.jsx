export default function VideoTags({ video }) {
  if (!video || !video.tags || video.tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-6">
      {video.tags.map((tag, idx) => {
        // Just alternating some classes for visual variety matching the design
        const isHighlight = idx === 0;
        return (
          <span 
            key={idx}
            className={`px-3 py-1 rounded-full font-['Inter'] text-[12px] leading-[16px] font-[500] ${
              isHighlight 
                ? 'bg-[#1a1a1a] text-[#c1121f]' 
                : 'bg-[#1a1a1a] text-[#ffffff] opacity-80'
            }`}
          >
            {tag.startsWith('#') ? tag : `#${tag}`}
          </span>
        );
      })}
    </div>
  );
}
