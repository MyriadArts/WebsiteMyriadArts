"use client";

import { useState } from "react";

export default function VideoDescription({ video, children }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!video) return null;
  const displayDescription = video.description || video.shortDescription || "No description provided for this video.";

  return (
    <div className="group bg-[#272727] cursor-pointer transition-colors p-[16px] rounded-xl flex flex-col items-start" onClick={() => !isExpanded && setIsExpanded(true)}>
      <div className="flex gap-2 type-body-sm text-[#f5dbd8] mb-2">
        <span suppressHydrationWarning>{video.publishedAt ? new Date(video.publishedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : "May 24, 2024"}</span>
      </div>
      
      <div className={`relative w-full overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[2000px]' : 'max-h-[140px]'}`}>
        <p className={`text-[#f5dbd8] type-body-lg whitespace-pre-wrap ${!isExpanded ? 'line-clamp-5' : ''}`}>
          {displayDescription}
        </p>
        
        {!isExpanded && (
          <div className="absolute bottom-0 left-0 w-full h-[40px] pointer-events-none"></div>
        )}
      </div>

      <button suppressHydrationWarning
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-white type-button mt-4 hover:text-[#c1121f] transition-colors"
      >
        {isExpanded ? "Show Less" : "Read More"}
      </button>

      {children && (
        <div className="mt-8 w-full">
          {children}
        </div>
      )}
    </div>
  );
}
