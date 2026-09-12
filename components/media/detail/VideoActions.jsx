"use client";

import { useState } from "react";

export default function VideoActions({ video }) {
  const [showToast, setShowToast] = useState("");

  const displayToast = (msg) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(""), 3000);
  };

  const handleShare = async () => {
    const shareData = {
      title: video?.title,
      text: video?.shortDescription,
      url: window.location.href,
    };

    try {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        displayToast("Link copied to clipboard");
      }
    } catch (err) {
      // Ignore abort errors
    }
  };

  if (!video) return null;

  return (
    <div className="flex shrink-0 relative">
      <button suppressHydrationWarning
        onClick={handleShare}
        className="flex items-center justify-center gap-1 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-[#272727] hover:bg-[#3f3f3f] text-white transition-colors"
      >
        <span className="material-symbols-outlined text-white text-[16px] md:text-[20px]">reply</span>
        <span className="type-button hidden sm:block text-white">Share</span>
      </button>

      {/* Toast Notification */}
      {showToast && (
        <div className="absolute top-full right-0 mt-2 px-4 py-2 bg-white text-black type-meta rounded shadow-lg whitespace-nowrap z-50">
          {showToast}
        </div>
      )}
    </div>
  );
}


