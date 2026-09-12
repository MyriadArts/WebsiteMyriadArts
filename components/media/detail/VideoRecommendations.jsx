"use client";

import { useState } from "react";
import MediaCard from "../MediaCard";

export default function VideoRecommendations({ recommendations }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!recommendations || recommendations.length === 0) return null;

  const visibleRecommendations = isExpanded ? recommendations : recommendations.slice(0, 4);

  return (
    <aside className="space-y-6">
      <h3 className="text-center type-heading-md text-white flex items-center justify-between mb-2">
        More Videos 
        <span className="text-[#e50914] type-meta">Next Up</span>
      </h3>
      <div className="space-y-4">
        {visibleRecommendations.map(video => (
          <MediaCard key={video.id} video={video} variant="compact" />
        ))}
      </div>
      {!isExpanded && recommendations.length > 4 ? (
        <button suppressHydrationWarning
          onClick={() => setIsExpanded(true)}
          className="w-full py-3 bg-[#1a1a1a] rounded-lg type-button text-white hover:bg-[#282a2b] transition-colors"
        >
          Show All Recommendations
        </button>
      ) : isExpanded && recommendations.length > 4 ? (
        <button suppressHydrationWarning
          onClick={() => setIsExpanded(false)}
          className="w-full py-3 bg-[#1a1a1a] rounded-lg type-button text-white hover:bg-[#282a2b] transition-colors"
        >
          Hide Recommendations
        </button>
      ) : null}
    </aside>
  );
}
