// lib/media.js
// ──────────────────────────────────────────────────────────────────────────────
// Query utilities for media.json — the single source of truth for all
// video content on the Myriad Arts / Calakar media section.
//
// All functions are pure — they read from the imported JSON and return arrays
// or objects. No async, no network, no database.
//
// Import anywhere in the Next.js App Router:
//   import { getFeaturedVideos, getBySlug } from "@/lib/media";
// ──────────────────────────────────────────────────────────────────────────────

import fs from "fs";
import path from "path";

// In-memory cache for media data keyed by file modification time (mtimeMs)
let cachedMediaData = null;
let lastMtimeMs = 0;

function getMediaFilePath() {
  return path.join(process.cwd(), "data", "media.json");
}

/**
 * Loads media data from data/media.json on the filesystem.
 * Caches the parsed data in memory and invalidates automatically
 * when the file's modification time (mtime) changes.
 */
export function loadMediaData() {
  const filePath = getMediaFilePath();

  let stat;
  try {
    stat = fs.statSync(filePath);
  } catch (err) {
    throw new Error(`[lib/media.js] Media data file not found or inaccessible at: ${filePath}. Error: ${err.message}`);
  }

  // If mtime has not changed and cached data exists, return cached in-memory data
  if (cachedMediaData && stat.mtimeMs === lastMtimeMs) {
    return cachedMediaData;
  }

  // Read and parse fresh data from disk
  let rawContent;
  try {
    rawContent = fs.readFileSync(filePath, "utf-8");
  } catch (err) {
    throw new Error(`[lib/media.js] Failed to read media data file at: ${filePath}. Error: ${err.message}`);
  }

  let parsed;
  try {
    parsed = JSON.parse(rawContent);
  } catch (err) {
    throw new Error(`[lib/media.js] Malformed JSON in media data file at: ${filePath}. Error: ${err.message}`);
  }

  // Validate basic schema integrity
  if (!parsed || typeof parsed !== "object" || !Array.isArray(parsed.videos)) {
    throw new Error(`[lib/media.js] Invalid schema in ${filePath}: expected root object with 'videos' array.`);
  }

  cachedMediaData = parsed;
  lastMtimeMs = stat.mtimeMs;

  return cachedMediaData;
}

// ── Base accessors ────────────────────────────────────────────────────────────

/**
 * All published videos, in chronological order (newest first).
 * This is the base filter all other queries build on.
 */
const ACTIVE_AAJA_IDS = [
  "2fad3fe4-900a-3d3b-7919-b5d43ca5af49",
  "d1ccb562-ba0d-49c8-ee63-fe5a8c092d36",
  "2117a612-458e-8d2a-3018-908b1a4dc03f",
  "9e6c21dd-ba3b-288f-2f10-b2520ac21938"
];

function enrichVideo(v) {
  if (v.playlist?.toLowerCase().includes("aaja nachle")) {
    const isWorking = ACTIVE_AAJA_IDS.includes(v.id);
    return {
      ...v,
      youtubeId: isWorking ? v.youtubeId : "viSln5fk77o",
      embedUrl: isWorking ? v.embedUrl : "https://www.youtube.com/embed/viSln5fk77o",
      thumbnail: {
        high: "https://i.ytimg.com/vi/viSln5fk77o/maxresdefault.jpg",
        medium: "https://i.ytimg.com/vi/viSln5fk77o/mqdefault.jpg",
        default: "https://i.ytimg.com/vi/viSln5fk77o/hqdefault.jpg"
      }
    };
  }

  return v;
}

function parseIsoDuration(dur) {
  if (!dur) return 0;
  const match = dur.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  const hours = parseInt(match[1] || "0", 10);
  const mins = parseInt(match[2] || "0", 10);
  const secs = parseInt(match[3] || "0", 10);
  return hours * 3600 + mins * 60 + secs;
}

function isShort(video) {
  if (!video) return false;
  const title = video.title || "";
  const description = video.description || "";
  const tags = video.tags || [];
  let durationSeconds = 0;

  if (typeof video.durationSeconds === "number" && video.durationSeconds > 0) {
    durationSeconds = video.durationSeconds;
  } else if (typeof video.duration === "string") {
    durationSeconds = parseIsoDuration(video.duration);
  }

  // 1. Explicit Shorts keywords/hashtags in title
  if (
    /#shorts?\b/i.test(title) ||
    /#ytshorts\b/i.test(title) ||
    /\bcalakar\s*shorts\b/i.test(title) ||
    /\bshorts\b/i.test(title)
  ) return true;

  // 2. Explicit Shorts hashtags in description
  if (
    /#shorts?\b/i.test(description) ||
    /#ytshorts\b/i.test(description) ||
    /#shortsvideo\b/i.test(description) ||
    /#danceshorts\b/i.test(description)
  ) return true;

  // 3. YouTube Shorts tags in snippet metadata
  if (
    Array.isArray(tags) &&
    tags.some((t) =>
      /^(shorts|youtubeshorts|shortsvideo|ytshorts|dance\s*shorts)$/i.test(t.trim())
    )
  ) return true;

  // 4. Promo snippet / teaser clip pattern
  const isPromoClip =
    /full podcast on youtube|watch full.*channel|full episode on channel|पूर्ण पॉडकास्ट|full video on channel/i.test(
      title
    ) ||
    /full podcast on youtube|watch full episode/i.test(description.slice(0, 200));

  if (isPromoClip) return true;

  // 5. Standard YouTube Short Duration ceiling (<= 180s / 3 minutes)
  if (durationSeconds > 0 && durationSeconds <= 180) {
    return true;
  }

  return false;
}

export function getAllVideos() {
  const data = loadMediaData();
  return data.videos
    .filter((v) => v.status === "published" && !isShort(v))
    .map(enrichVideo);
}

/**
 * Raw metadata (total count, categories, channel info, generation date).
 */
export function getMediaMeta() {
  const data = loadMediaData();
  return data.meta;
}

// ── Homepage queries ──────────────────────────────────────────────────────────

/**
 * The single hero spotlight video for the /media homepage.
 * Falls back to the most recent video if none is explicitly spotlit.
 */
export function getHomepageSpotlight() {
  return (
    getAllVideos().find((v) => v.homepageSpotlight) ?? getAllVideos()[0] ?? null
  );
}

/**
 * Featured collection — editorially curated, ordered by featuredOrder.
 * Used in the "Featured" row on the homepage.
 */
export function getFeaturedVideos() {
  return getAllVideos()
    .filter((v) => v.featured)
    .sort((a, b) => (a.featuredOrder ?? 99) - (b.featuredOrder ?? 99));
}

/**
 * Latest videos for the "Recently Added" grid.
 * @param {number} limit - Number of videos to return (default 8)
 */
export function getLatestVideos(limit = 8) {
  return getAllVideos().slice(0, limit);
}

/**
 * All videos grouped by category — powers the category navigation.
 * Returns: { [categorySlug]: VideoItem[] }
 */
export function getVideosByCategory() {
  const result = {};
  for (const video of getAllVideos()) {
    if (!result[video.category]) result[video.category] = [];
    result[video.category].push(video);
  }
  return result;
}

// ── Taxonomy queries ──────────────────────────────────────────────────────────

/**
 * All videos in a specific category.
 * @param {string} category - Category slug (e.g. "performances", "folk-heritage")
 */
export function getByCategory(category) {
  return getAllVideos().filter((v) => v.category === category);
}

/**
 * All videos in a named playlist.
 * @param {string} playlist - Playlist name (e.g. "Vaarsa - Reliving The Folk Art of India")
 */
export function getByPlaylist(playlist) {
  const videos = getAllVideos().filter(
    (v) => v.playlist?.toLowerCase() === playlist.toLowerCase()
  );

  if (playlist.toLowerCase().includes("aaja nachle")) {
    return [...videos].sort((a, b) => {
      const aIndex = ACTIVE_AAJA_IDS.indexOf(a.id);
        const bIndex = ACTIVE_AAJA_IDS.indexOf(b.id);
        if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
        if (aIndex !== -1) return -1;
        if (bIndex !== -1) return 1;
        return 0;
      });
  }

  if (playlist.toLowerCase().includes("vaarsa")) {
    return videos.map((v, idx) => ({
      ...v,
      youtubeId: idx === 0 ? "viSln5fk77o" : v.youtubeId,
      thumbnail: {
        high: "/images/vaarsa/vaarsa-event-feature.png",
        medium: "/images/vaarsa/vaarsa-event-feature.png",
        default: "/images/vaarsa/vaarsa-event-feature.png"
      }
    }));
  }

  return videos;
}

/**
 * All unique playlists with their video count and first video's thumbnail.
 * Used to render the playlist shelf / grid.
 */
const PLAYLIST_THUMBNAILS = {
  "Aaja Nachle - Bollywood & Freestyle": {
    high: "https://i.ytimg.com/vi/viSln5fk77o/maxresdefault.jpg",
    medium: "https://i.ytimg.com/vi/viSln5fk77o/mqdefault.jpg",
    default: "https://i.ytimg.com/vi/viSln5fk77o/hqdefault.jpg"
  },
  "Vaarsa - Reliving The Folk Art of India": {
    high: "/images/vaarsa/vaarsa-event-feature.png",
    medium: "/images/vaarsa/vaarsa-event-feature.png",
    default: "/images/vaarsa/vaarsa-event-feature.png"
  }
};

export function getAllPlaylists() {
  const map = new Map();
  for (const video of getAllVideos()) {
    if (!video.playlist) continue;
    if (!map.has(video.playlist)) {
      map.set(video.playlist, {
        name: video.playlist,
        playlistId: video.playlistId,
        category: video.category,
        thumbnail: PLAYLIST_THUMBNAILS[video.playlist] || video.thumbnail,
        videoCount: 0,
        latestVideo: video,
      });
    }
    map.get(video.playlist).videoCount++;
  }
  return Array.from(map.values()).sort((a, b) => b.videoCount - a.videoCount);
}

/**
 * Category metadata (label, description) from media.json meta.
 */
export function getCategoryMeta(slug) {
  const data = loadMediaData();
  return data.meta.categories?.[slug] ?? null;
}

/**
 * All category slugs that have at least one video.
 */
export function getActiveCategories() {
  const data = loadMediaData();
  const active = new Set(getAllVideos().map((v) => v.category));
  return Object.entries(data.meta.categories ?? {})
    .filter(([slug]) => active.has(slug))
    .map(([slug, meta]) => ({ slug, ...meta }));
}

// ── Detail page queries ───────────────────────────────────────────────────────

/**
 * Find a video by its slug — used in /media/[slug] page.
 * @param {string} slug
 */
export function getBySlug(slug) {
  return getAllVideos().find((v) => v.slug === slug) ?? null;
}

/**
 * Find a video by its YouTube ID.
 * @param {string} youtubeId
 */
export function getByYouTubeId(youtubeId) {
  return getAllVideos().find((v) => v.youtubeId === youtubeId) ?? null;
}

/**
 * Related videos for a detail page.
 * Priority order:
 *   1. Explicitly curated relatedIds
 *   2. Same playlist
 *   3. Same category
 *   4. Shared tags
 *   5. Latest videos
 *
 * @param {object} video - The current video object
 * @param {number} limit - Number of related videos (default 4)
 */
export function getRelatedVideos(video, limit = 4) {
  const all = getAllVideos();
  const selected = new Map(); // Use Map to preserve order and deduplicate by id

  // Helper to add videos
  const addVideos = (videos) => {
    for (const v of videos) {
      if (selected.size >= limit) break;
      if (v.id !== video.id && !selected.has(v.id)) {
        selected.set(v.id, v);
      }
    }
  };

  // 1. Explicit curated relations
  const explicit = (video.relatedIds ?? [])
    .map((id) => all.find((v) => v.id === id))
    .filter(Boolean);
  addVideos(explicit);

  if (selected.size >= limit) return Array.from(selected.values());

  // 2. Same playlist
  if (video.playlist) {
    const fromPlaylist = all.filter((v) => v.playlist === video.playlist);
    addVideos(fromPlaylist);
  }

  if (selected.size >= limit) return Array.from(selected.values());

  // 3. Same category
  if (video.category) {
    const fromCategory = all.filter((v) => v.category === video.category);
    addVideos(fromCategory);
  }

  if (selected.size >= limit) return Array.from(selected.values());

  // 4. Shared tags (weighted)
  if (video.tags && video.tags.length > 0) {
    const tagSet = new Set(video.tags.map((t) => t.toLowerCase()));
    const withTags = all
      .map((v) => {
        let matchCount = 0;
        if (v.tags) {
          for (const t of v.tags) {
            if (tagSet.has(t.toLowerCase())) matchCount++;
          }
        }
        return { video: v, matchCount };
      })
      .filter((v) => v.matchCount > 0)
      .sort((a, b) => b.matchCount - a.matchCount)
      .map((v) => v.video);
    
    addVideos(withTags);
  }

  if (selected.size >= limit) return Array.from(selected.values());

  // 5. Latest uploads
  addVideos(all);

  return Array.from(selected.values());
}

/**
 * All videos by the same artist.
 * @param {string} artistName
 */
export function getByArtist(artistName) {
  return getAllVideos().filter(
    (v) => v.artist?.toLowerCase() === artistName.toLowerCase()
  );
}

// ── SEO / Static generation ───────────────────────────────────────────────────

/**
 * Generate Next.js static params for all video detail pages.
 * Use in: app/media/[slug]/page.jsx → generateStaticParams()
 */
export function generateMediaStaticParams() {
  return getAllVideos().map((v) => ({ slug: v.slug }));
}

/**
 * Generate SEO metadata for a video detail page.
 * Use in: app/media/[slug]/page.jsx → generateMetadata()
 *
 * @param {string} slug
 */
export function generateVideoMetadata(slug) {
  const video = getBySlug(slug);
  if (!video) return { title: "Video Not Found" };

  return {
    title: `${video.title} — Myriad Arts`,
    description: video.shortDescription,
    alternates: {
      canonical: `https://myriadarts.in/media/${video.slug}`,
    },
    openGraph: {
      title: video.title,
      description: video.shortDescription,
      images: [{ url: video.thumbnail.high, width: 1280, height: 720 }],
      type: "video.other",
      url: `https://myriadarts.in/media/${video.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: video.title,
      description: video.shortDescription,
      images: [video.thumbnail.high],
    },
  };
}

/**
 * Generate structured JSON-LD for VideoObject
 * @param {object} video
 */
export function generateJsonLd(video) {
  if (!video) return null;
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title,
    description: video.description || video.shortDescription,
    thumbnailUrl: [video.thumbnail.high, video.thumbnail.medium, video.thumbnail.default],
    uploadDate: video.publishedAt,
    duration: video.duration,
    embedUrl: video.embedUrl,
    interactionStatistic: {
      "@type": "InteractionCounter",
      interactionType: { "@type": "WatchAction" },
      userInteractionCount: video.viewCount
    }
  };
}

// ── Search / Filter ───────────────────────────────────────────────────────────

/**
 * Simple title + tag search (client-side, no index needed at this scale).
 * @param {string} query
 */
export function searchVideos(query) {
  const q = query.toLowerCase().trim();
  if (!q) return getAllVideos();

  return getAllVideos().filter(
    (v) =>
      v.title.toLowerCase().includes(q) ||
      v.shortDescription.toLowerCase().includes(q) ||
      v.tags.some((t) => t.toLowerCase().includes(q)) ||
      v.artist?.toLowerCase().includes(q)
  );
}

// Re-export formatDurationDisplay for backward compatibility
import { formatDuration } from "./media-utils";
export const formatDurationDisplay = formatDuration;
