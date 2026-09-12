"use client";

import { useState } from "react";
import Image from "next/image";

export default function Thumbnail({ video, className, sizes, priority = false }) {
  const [src, setSrc] = useState(video.thumbnail?.default || video.thumbnail?.high || "/logos/myriad-arts-logo.jpg");

  return (
    <Image
      className={className}
      alt={video.title || "Video thumbnail"}
      src={src}
      fill
      sizes={sizes}
      priority={priority}
      unoptimized={true}
      onError={() => {
        // Fallback chain: high -> default -> logo (Skipping medium as it can be a grey placeholder)
        if (src === video.thumbnail?.default && video.thumbnail?.high) {
          setSrc(video.thumbnail.high);
        } else if (src !== "/logos/myriad-arts-logo.jpg") {
          setSrc("/logos/myriad-arts-logo.jpg");
        }
      }}
    />
  );
}
