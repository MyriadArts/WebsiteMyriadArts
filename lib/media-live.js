// lib/media-live.js
// ──────────────────────────────────────────────────────────────────────────────
// Live YouTube Data API v3 Synchronization & Cache Layer for Vercel Serverless
//
// Ensures real-time video library freshness without manual git commits or cron on disk.
// 1. Integrates YouTube Data API v3 for the channel uploads playlist.
// 2. Uses in-memory caching with a short TTL (60s) for blazing-fast responses.
// 3. Filters out YouTube Shorts (<= 180s or #shorts tags) to keep only full-length videos.
// 4. Normalizes new videos into the Myriad Arts schema and prepends them chronologically.
// 5. Updates viewCount / likeCount for existing videos.
// 6. Gracefully falls back to data/media.json if network/API limits occur.
// ──────────────────────────────────────────────────────────────────────────────

import { createHash } from "crypto";

const API_BASE_URL = process.env.YOUTUBE_API_BASE_URL || "https://www.googleapis.com/youtube/v3";
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours (daily)

let liveMergedCache = null;
let lastFetchTimestamp = 0;
let isFetching = false;

// ── Taxonomy & Playlist Rules ─────────────────────────────────────────────────

const CATEGORIES = {
  PERFORMANCES: "performances",
  FOLK_HERITAGE: "folk-heritage",
  PODCASTS: "podcasts",
  CONVERSATIONS: "conversations",
  BEHIND_THE_SCENES: "behind-the-scenes",
  SPECIAL_PROJECTS: "special-projects",
};

const TITLE_CATEGORY_RULES = [
  // 1. Folk & Heritage
  [
    (v) =>
      /\bvaarsa\b/i.test(v.title) ||
      /reliving.*folk art of india/i.test(v.title) ||
      /folk art of india/i.test(v.title) ||
      /वारसा|लोककला/i.test(v.title),
    CATEGORIES.FOLK_HERITAGE,
  ],
  // 2. Behind The Scenes
  [
    (v) =>
      /home tour/i.test(v.title) ||
      /interior/i.test(v.title) ||
      /behind.*scene|\bbts\b/i.test(v.title) ||
      /thet manatun|थेट मनातून/i.test(v.title) ||
      /no filter/i.test(v.title) ||
      /exclusive.*tour/i.test(v.title) ||
      (v.tags && v.tags.some((t) => /interior|home tour|behind the scenes|bts/i.test(t))),
    CATEGORIES.BEHIND_THE_SCENES,
  ],
  // 3. Podcasts
  [
    (v) =>
      /\bpodcast\b/i.test(v.title) ||
      /पॉडकास्ट/i.test(v.title) ||
      /round table/i.test(v.title) ||
      /ep\.\s*\d+\s*\|/i.test(v.title) ||
      (v.tags && v.tags.some((t) => /^(podcast|marathi podcast|#podcast|#marathipodcast)$/i.test(t.trim()))),
    CATEGORIES.PODCASTS,
  ],
  // 4. Conversations
  [
    (v) => {
      const t = v.title;
      return (
        /unfiltered with shreyas/i.test(t) ||
        /\bcan we talk\b/i.test(t) ||
        /potbhar gappa/i.test(t) ||
        /^in conversation with/i.test(t) ||
        /संवाद with/i.test(t) ||
        /in conversation/i.test(t) ||
        /interview|गप्पा|खुलासा|चर्चा|casting/i.test(t) ||
        (v.tags && v.tags.some((t) => /interview|celebrity interview|talk show/i.test(t))) ||
        (v.durationSeconds > 1200 && !/\bdance\b|perform|nachle|vaarsa|folk/i.test(t))
      );
    },
    CATEGORIES.CONVERSATIONS,
  ],
  // 5. Special Projects
  [
    (v) =>
      /yoga|meditation|wellness/i.test(v.title) ||
      /showreel|utsav|दहीहंडी|collaboration|special/i.test(v.title) ||
      (v.tags && v.tags.some((t) => /yoga|meditation|wellness|retreat|collaboration/i.test(t))),
    CATEGORIES.SPECIAL_PROJECTS,
  ],
  // 6. Performances (Default)
  [
    (v) =>
      /aaja nachle/i.test(v.title) ||
      /chance pe dance/i.test(v.title) ||
      /dance antakshari/i.test(v.title) ||
      /dance performance|dance cover|\bdance\b/i.test(v.title) ||
      /डान्स|नृत्य|लावणी|कथ्थक|भरतनाट्यम/i.test(v.title) ||
      (v.tags && v.tags.some((t) => /dance|performance|choreography/i.test(t))),
    CATEGORIES.PERFORMANCES,
  ],
];

// ── Normalization Helpers ─────────────────────────────────────────────────────

function parseISO8601Duration(duration) {
  if (!duration) return 0;
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  const h = parseInt(match[1] || "0", 10);
  const m = parseInt(match[2] || "0", 10);
  const s = parseInt(match[3] || "0", 10);
  return h * 3600 + m * 60 + s;
}

function formatDurationDisplay(seconds) {
  if (!seconds) return "0:00";
  const totalSeconds = Math.floor(seconds);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  const ss = String(s).padStart(2, "0");
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${ss}`;
  return `${m}:${ss}`;
}

function generateStableId(youtubeId) {
  return createHash("sha256")
    .update(`youtube:${youtubeId}`)
    .digest("hex")
    .slice(0, 32)
    .replace(/^(.{8})(.{4})(.{4})(.{4})(.{12})$/, "$1-$2-$3-$4-$5");
}

function generateSlug(title, youtubeId) {
  const suffix = (youtubeId || "").slice(-6);
  let base = (title || "")
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60)
    .replace(/-+$/, "");
  if (!base) base = "video";
  return `${base}-${suffix}`;
}

function cleanTitle(raw) {
  return raw
    .replace(/\s*\|\s*/g, " — ")
    .replace(/\s*#\w+/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function extractShortDescription(description, maxChars = 160) {
  if (!description) return "";
  const first = description.split(/\n{2,}/)[0] || description;
  const cleaned = first
    .replace(/https?:\/\/\S+/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
  if (cleaned.length <= maxChars) return cleaned;
  return cleaned.slice(0, maxChars - 1).trim() + "…";
}

function isShort(video) {
  if (!video) return false;
  const title = video.snippet?.title || video.title || "";
  const description = video.snippet?.description || video.description || "";
  const tags = video.snippet?.tags || video.tags || [];

  let durationSeconds = 0;
  if (typeof video.durationSeconds === "number" && video.durationSeconds > 0) {
    durationSeconds = video.durationSeconds;
  } else if (video.contentDetails?.duration) {
    durationSeconds = parseISO8601Duration(video.contentDetails.duration);
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

  // 4. Promo teaser clip (<= 120s)
  const isPromoClip =
    /full podcast on youtube|watch full.*channel|full episode on channel|पूर्ण पॉडकास्ट|full video on channel/i.test(
      title
    ) ||
    /full podcast on youtube|watch full episode/i.test(description.slice(0, 200));

  if (isPromoClip && durationSeconds > 0 && durationSeconds <= 120) return true;

  // 5. Standard Short duration ceiling (<= 180 seconds / 3 minutes)
  if (durationSeconds > 0 && durationSeconds <= 180) return true;

  return false;
}

function inferCategory(title, durationSeconds, tags) {
  const tempObj = { title, durationSeconds, tags: tags || [] };
  for (const [test, category] of TITLE_CATEGORY_RULES) {
    try {
      if (test(tempObj)) return category;
    } catch {
      continue;
    }
  }
  return CATEGORIES.PERFORMANCES;
}

// ── YouTube API Fetcher ───────────────────────────────────────────────────────

async function fetchJsonWithCache(url, revalidate = 86400) {
  const res = await fetch(url, {
    next: { revalidate, tags: ["youtube-media"] },
  });
  if (!res.ok) {
    throw new Error(`YouTube API returned HTTP ${res.status}: ${res.statusText}`);
  }
  return await res.json();
}

/**
 * Synchronizes new YouTube uploads on top of baseData in real-time.
 * Returns the merged data object { videos, meta, totalVideos }.
 */
export async function syncLiveVideos(baseData) {
  if (!baseData || !Array.isArray(baseData.videos)) {
    return baseData;
  }

  const apiKey = process.env.YOUTUBE_API_KEY;
  let uploadsPlaylistId = process.env.YOUTUBE_UPLOADS_PLAYLIST_ID;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;

  if (!uploadsPlaylistId && channelId && channelId.startsWith("UC")) {
    uploadsPlaylistId = "UU" + channelId.slice(2);
  }

  if (!apiKey || !uploadsPlaylistId) {
    return baseData;
  }

  try {
    // 1. Fetch latest 50 uploads from channel
    const playlistUrl = `${API_BASE_URL}/playlistItems?part=snippet,contentDetails&playlistId=${uploadsPlaylistId}&maxResults=50&key=${apiKey}`;
    const playlistData = await fetchJsonWithCache(playlistUrl, 86400);

    const playlistItems = playlistData.items || [];
    if (playlistItems.length === 0) return baseData;

    const existingMap = new Map();
    const existingSlugs = new Set();
    baseData.videos.forEach((v) => {
      existingMap.set(v.youtubeId, v);
      if (v.slug) existingSlugs.add(v.slug);
    });

    // Detect candidate new videos and existing videos to refresh
    const candidateNewIds = [];
    const existingIdsToRefresh = [];

    for (const item of playlistItems) {
      const vid = item.contentDetails?.videoId || item.snippet?.resourceId?.videoId;
      if (!vid) continue;
      if (existingMap.has(vid)) {
        existingIdsToRefresh.push(vid);
      } else {
        candidateNewIds.push(vid);
      }
    }

    // 2. Fetch full video details for candidates and recent existing
    const allIdsToFetch = [...candidateNewIds, ...existingIdsToRefresh.slice(0, 15)];
    if (allIdsToFetch.length === 0) return baseData;

    const videosUrl = `${API_BASE_URL}/videos?part=snippet,contentDetails,statistics&id=${allIdsToFetch.join(",")}&key=${apiKey}`;
    const videosData = await fetchJsonWithCache(videosUrl, 86400);

    const detailsMap = new Map();
    (videosData.items || []).forEach((item) => detailsMap.set(item.id, item));

    // 3. Process candidate new videos (filter out Shorts)
    const newlyCreatedRecords = [];

    for (const vid of candidateNewIds) {
      const item = detailsMap.get(vid);
      if (!item || !item.snippet) continue;

      // Strict filter: Shorts under 180s are excluded
      if (isShort(item)) continue;

      const rawTitle = item.snippet.title || "Untitled";
      const title = cleanTitle(rawTitle);
      const description = item.snippet.description || "";
      const durationSeconds = parseISO8601Duration(item.contentDetails?.duration);
      const tags = Array.isArray(item.snippet.tags) ? item.snippet.tags.slice(0, 12) : [];
      const publishedAt = item.snippet.publishedAt || new Date().toISOString();
      const category = inferCategory(title, durationSeconds, tags);

      let slug = generateSlug(rawTitle, vid);
      if (existingSlugs.has(slug)) {
        slug = `${slug}-${vid.slice(-4)}`;
      }
      existingSlugs.add(slug);

      const viewCount = item.statistics?.viewCount ? parseInt(item.statistics.viewCount, 10) : null;
      const likeCount = item.statistics?.likeCount ? parseInt(item.statistics.likeCount, 10) : null;

      const newRecord = {
        id: generateStableId(vid),
        slug,
        youtubeId: vid,
        title,
        shortDescription: extractShortDescription(description),
        description,
        thumbnail: {
          default: `https://i.ytimg.com/vi/${vid}/hqdefault.jpg`,
          medium: `https://i.ytimg.com/vi/${vid}/mqdefault.jpg`,
          high: `https://i.ytimg.com/vi/${vid}/maxresdefault.jpg`,
        },
        embedUrl: `https://www.youtube.com/embed/${vid}`,
        watchUrl: `https://www.youtube.com/watch?v=${vid}`,
        category,
        playlist: null,
        playlistId: null,
        featured: false,
        featuredOrder: null,
        homepageSpotlight: false,
        artist: null,
        artistRole: null,
        duration: item.contentDetails?.duration || "PT0S",
        durationDisplay: formatDurationDisplay(durationSeconds),
        durationSeconds,
        publishedAt,
        tags,
        relatedIds: [],
        status: "published",
        migratedAt: new Date().toISOString(),
        viewCount,
        likeCount,
      };

      newlyCreatedRecords.push(newRecord);
    }

    // 4. Update live view counts for existing videos
    const updatedBaseVideos = baseData.videos.map((v) => {
      const item = detailsMap.get(v.youtubeId);
      if (!item) return v;
      let freshViews = v.viewCount;
      let freshLikes = v.likeCount;
      if (item.statistics?.viewCount) {
        freshViews = parseInt(item.statistics.viewCount, 10);
      }
      if (item.statistics?.likeCount) {
        freshLikes = parseInt(item.statistics.likeCount, 10);
      }
      return {
        ...v,
        viewCount: freshViews,
        likeCount: freshLikes,
      };
    });

    const finalVideos = [...newlyCreatedRecords, ...updatedBaseVideos];

    const finalBreakdown = {};
    for (const catKey of Object.values(CATEGORIES)) {
      finalBreakdown[catKey] = 0;
    }
    for (const v of finalVideos) {
      finalBreakdown[v.category] = (finalBreakdown[v.category] || 0) + 1;
    }

    return {
      version: baseData.version || 1,
      generatedAt: new Date().toISOString(),
      totalVideos: finalVideos.length,
      meta: {
        ...baseData.meta,
        breakdown: finalBreakdown,
      },
      _editorial: baseData._editorial || {},
      videos: finalVideos,
      _liveSynced: true,
      _newVideosAdded: newlyCreatedRecords.length,
    };
  } catch (err) {
    console.warn("[media-live] Live YouTube sync warning:", err.message);
    return baseData;
  }
}

/**
 * Returns the cached live merged media data or triggers a background refresh.
 */
export async function getLiveMergedMedia(baseData) {
  const now = Date.now();
  if (liveMergedCache && now - lastFetchTimestamp < CACHE_TTL_MS) {
    return liveMergedCache;
  }

  // If already fetching, return current cache or baseData
  if (isFetching && liveMergedCache) {
    return liveMergedCache;
  }

  isFetching = true;
  try {
    const merged = await syncLiveVideos(baseData);
    liveMergedCache = merged;
    lastFetchTimestamp = now;
    return merged;
  } catch (e) {
    console.error("[media-live] Error getting live media:", e);
    return baseData;
  } finally {
    isFetching = false;
  }
}

/**
 * Force clear and refresh the live media cache.
 */
export async function refreshLiveMediaCache(baseData) {
  lastFetchTimestamp = 0;
  liveMergedCache = null;
  return await getLiveMergedMedia(baseData);
}
