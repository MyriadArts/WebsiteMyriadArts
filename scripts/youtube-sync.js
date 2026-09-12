// scripts/youtube-sync.js
// ──────────────────────────────────────────────────────────────────────────────
// Production YouTube Data API Synchronization Pipeline for Myriad Arts / Calakar
//
// Automatically called by Linux VPS cron or npm script:
//   npm run media:sync
//   node scripts/youtube-sync.js [--dry-run] [--verbose] [--max-uploads=50]
//
// Workflow:
//   1. Acquires exclusive process lock to prevent concurrent runs.
//   2. Reads existing data/media.json and verifies integrity.
//   3. Queries YouTube Data API v3 (Uploads playlist & batched video details).
//   4. Identifies new vs existing videos using unique youtubeId.
//   5. Normalizes new videos to the exact Myriad Arts media schema.
//   6. Updates view/like statistics on existing videos while strictly preserving
//      all editorial fields (featured, category, artist, status, etc.).
//   7. Validates final dataset structure and integrity.
//   8. Atomically replaces data/media.json (temp file -> validation -> rename).
//   9. Releases process lock and exits cleanly.
// ──────────────────────────────────────────────────────────────────────────────

import fs from "fs";
import path from "path";
import { createHash } from "crypto";
import { fileURLToPath } from "url";
import https from "https";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DATA_DIR = path.join(ROOT, "data");
const MEDIA_JSON = path.join(DATA_DIR, "media.json");
const LOCK_FILE = path.join(DATA_DIR, ".sync.lock");

// ── Environment Configuration ─────────────────────────────────────────────────

function loadEnv() {
  const envFiles = [".env.local", ".env.production", ".env"];
  for (const file of envFiles) {
    const envPath = path.join(ROOT, file);
    if (!fs.existsSync(envPath)) continue;
    try {
      const content = fs.readFileSync(envPath, "utf-8");
      content.split("\n").forEach((line) => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) return;
        const match = trimmed.match(/^([\w.-]+)\s*=\s*(.*)?$/);
        if (match) {
          const key = match[1];
          let val = match[2] || "";
          if (val.startsWith('"') && val.endsWith('"')) {
            val = val.slice(1, -1);
          } else if (val.startsWith("'") && val.endsWith("'")) {
            val = val.slice(1, -1);
          }
          // Do not overwrite existing system/shell environment variables
          if (process.env[key] === undefined) {
            process.env[key] = val;
          }
        }
      });
    } catch (e) {
      // Ignore env read error
    }
  }
}

loadEnv();

// ── Command Line Arguments ────────────────────────────────────────────────────

const ARGS = process.argv.slice(2);
const IS_DRY_RUN = ARGS.includes("--dry-run");
const IS_VERBOSE = ARGS.includes("--verbose");
const maxUploadsArg = ARGS.find((a) => a.startsWith("--max-uploads="));
const MAX_UPLOADS_TO_CHECK = maxUploadsArg
  ? parseInt(maxUploadsArg.split("=")[1], 10) || 50
  : 50;

// ── Constants & Taxonomy ──────────────────────────────────────────────────────

const CATEGORIES = {
  PERFORMANCES: "performances",
  FOLK_HERITAGE: "folk-heritage",
  PODCASTS: "podcasts",
  CONVERSATIONS: "conversations",
  BEHIND_THE_SCENES: "behind-the-scenes",
  SPECIAL_PROJECTS: "special-projects",
};

const CATEGORY_META = {
  [CATEGORIES.PERFORMANCES]: {
    label: "Performances",
    description: "Live dance performances, competitions, and showcases",
  },
  [CATEGORIES.FOLK_HERITAGE]: {
    label: "Folk & Heritage",
    description: "Documenting the living traditions of Indian folk art",
  },
  [CATEGORIES.PODCASTS]: {
    label: "Podcasts",
    description: "Long-form audio-first conversations and episodes",
  },
  [CATEGORIES.CONVERSATIONS]: {
    label: "Conversations",
    description: "Video-first interviews, discussions, and talk formats",
  },
  [CATEGORIES.BEHIND_THE_SCENES]: {
    label: "Behind The Scenes",
    description: "Unfiltered moments, process, and the people behind the art",
  },
  [CATEGORIES.SPECIAL_PROJECTS]: {
    label: "Special Projects",
    description: "Curated projects, collaborations, and one-of-a-kind productions",
  },
};

const PLAYLIST_CATEGORY_MAP = [
  { id: "PLD1zzT-yt8830wjMLjZ61JhAXVLDJzAx2", name: "Vaarsa - Reliving The Folk Art of India", category: CATEGORIES.FOLK_HERITAGE },
  { id: "PLD1zzT-yt8801s0IB9mv5eTYbA9P2G53Y", name: "Aaja Nachle - Bollywood & Freestyle", category: CATEGORIES.PERFORMANCES },
  { id: "PLD1zzT-yt883fm6ZRqiiraXpawNNkrFNM", name: "Chance Pe Dance", category: CATEGORIES.PERFORMANCES },
  { id: "PLD1zzT-yt8825Uyh5jnNFeOLDIXZe1yHi", name: "Dance Antakshari", category: CATEGORIES.PERFORMANCES },
  { id: "PLD1zzT-yt8835ADymmtGK3TobdkcXSh2Q", name: "Can We Talk", category: CATEGORIES.CONVERSATIONS },
  { id: "PLD1zzT-yt881dpEcOuH-CAEs3TKM9W-cP", name: "Unfiltered with Shreyas", category: CATEGORIES.CONVERSATIONS },
  { id: "PLD1zzT-yt8800ESlO00jhMI5KbQHziAxj", name: "Potbhar Gappa", category: CATEGORIES.CONVERSATIONS },
  { id: "PLD1zzT-yt883AvVmJzQju1AdN0rhzzOkJ", name: "Podcast", category: CATEGORIES.PODCASTS },
  { id: "PLD1zzT-yt883iqWLM00rot919jJwECxPh", name: "Mini Podcast", category: CATEGORIES.PODCASTS },
  { id: "PLD1zzT-yt880Ywo2uYBlNngn6p8SjDdY7", name: "Thet Manatun (No filter)", category: CATEGORIES.BEHIND_THE_SCENES },
];

const TITLE_CATEGORY_RULES = [
  // 1. Folk & Heritage (Vaarsa series and folk traditions)
  [
    (v) =>
      /\bvaarsa\b/i.test(v.title) ||
      /reliving.*folk art of india/i.test(v.title) ||
      /folk art of india/i.test(v.title) ||
      /वारसा|लोककला/i.test(v.title),
    CATEGORIES.FOLK_HERITAGE,
  ],
  // 2. Behind The Scenes / Home Tours / Lifestyle Process
  [
    (v) =>
      /home tour/i.test(v.title) ||
      /interior/i.test(v.title) ||
      /behind.*scene|\bbts\b/i.test(v.title) ||
      /thet manatun|थेट मनातून/i.test(v.title) ||
      /no filter/i.test(v.title) ||
      /exclusive.*tour/i.test(v.title) ||
      /मोदक|making|recipe/i.test(v.title) ||
      (v.tags && v.tags.some((t) => /interior|home tour|behind the scenes|bts/i.test(t))),
    CATEGORIES.BEHIND_THE_SCENES,
  ],
  // 3. Podcasts (Full episodes, Mini podcast, audio-first conversations, podcast specials)
  [
    (v) =>
      /\bpodcast\b/i.test(v.title) ||
      /पॉडकास्ट/i.test(v.title) ||
      /round table/i.test(v.title) ||
      /ep\.\s*\d+\s*\|/i.test(v.title) ||
      (v.tags && v.tags.some((t) => /^(podcast|marathi podcast|#podcast|#marathipodcast)$/i.test(t.trim()))),
    CATEGORIES.PODCASTS,
  ],
  // 4. Conversations (Interviews, Talks, Unfiltered, Food & Chat formats)
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
        /with (milind|ansha|anisha|nimish|kshitij|megha|sangram|nupur|sunil|akshaya)/i.test(t) ||
        /interview|गप्पा|खुलासा|चर्चा|casting/i.test(t) ||
        (v.tags && v.tags.some((t) => /interview|celebrity interview|talk show/i.test(t))) ||
        (v.durationSeconds > 1200 && !/\bdance\b|perform|nachle|vaarsa|folk/i.test(t))
      );
    },
    CATEGORIES.CONVERSATIONS,
  ],
  // 5. Special Projects (Yoga, Meditation, Wellness, Festivals, Collaborations)
  [
    (v) =>
      /yoga|meditation|wellness/i.test(v.title) ||
      /showreel|utsav|दहीहंडी|collaboration|special/i.test(v.title) ||
      (v.tags && v.tags.some((t) => /yoga|meditation|wellness|retreat|collaboration/i.test(t))),
    CATEGORIES.SPECIAL_PROJECTS,
  ],
  // 6. Performances (Dance performances, competitions, showcases)
  [
    (v) =>
      /aaja nachle/i.test(v.title) ||
      /chance pe dance/i.test(v.title) ||
      /dance antakshari/i.test(v.title) ||
      /dance performance|dance cover|\bdance\b/i.test(v.title) ||
      /डान्स|नृत्य|लावणी|कथ्थक|भरतनाट्यम/i.test(v.title) ||
      /bollywood.*perform|classical.*dance/i.test(v.title) ||
      (v.tags && v.tags.some((t) => /dance|performance|choreography/i.test(t))),
    CATEGORIES.PERFORMANCES,
  ],
];

// ── Process Locking ───────────────────────────────────────────────────────────

let lockAcquired = false;

function acquireLock() {
  if (IS_DRY_RUN) return true;

  const now = new Date();
  const lockData = JSON.stringify({ pid: process.pid, startedAt: now.toISOString() });

  try {
    fs.writeFileSync(LOCK_FILE, lockData, { flag: "wx" });
    lockAcquired = true;
    return true;
  } catch (err) {
    if (err.code === "EEXIST") {
      // Check for stale lock (older than 15 minutes)
      try {
        const existing = JSON.parse(fs.readFileSync(LOCK_FILE, "utf-8"));
        const lockAgeMs = Date.now() - new Date(existing.startedAt).getTime();
        if (lockAgeMs > 15 * 60 * 1000) {
          console.warn(`⚠️  [YouTube Sync] Removing stale lock file from PID ${existing.pid} (Age: ${Math.round(lockAgeMs / 1000)}s)`);
          fs.unlinkSync(LOCK_FILE);
          fs.writeFileSync(LOCK_FILE, lockData, { flag: "wx" });
          lockAcquired = true;
          return true;
        }
      } catch (readErr) {
        // Corrupted lock file - remove and re-acquire
        try {
          fs.unlinkSync(LOCK_FILE);
          fs.writeFileSync(LOCK_FILE, lockData, { flag: "wx" });
          lockAcquired = true;
          return true;
        } catch (reErr) {
          // Fall through
        }
      }
      console.log(`ℹ️   [YouTube Sync] Another synchronization process is already running. Exiting.`);
      process.exit(0);
    }
    console.error(`❌  [YouTube Sync] Failed to acquire lock file: ${err.message}`);
    process.exit(1);
  }
}

function releaseLock() {
  if (lockAcquired && fs.existsSync(LOCK_FILE)) {
    try {
      fs.unlinkSync(LOCK_FILE);
      lockAcquired = false;
    } catch (err) {
      console.warn(`⚠️  [YouTube Sync] Failed to remove lock file: ${err.message}`);
    }
  }
}

process.on("exit", releaseLock);
process.on("SIGINT", () => { releaseLock(); process.exit(1); });
process.on("SIGTERM", () => { releaseLock(); process.exit(1); });

// ── Shorts Detection ──────────────────────────────────────────────────────────

/**
 * Returns the detected signal reason if a video is a YouTube Short, or null otherwise.
 *
 * Combines multiple deterministic heuristics based on YouTube Data API v3 metadata:
 * 1. Title patterns (#shorts, Calakar Shorts, #ytshorts, etc.)
 * 2. Description hashtags (#shorts, #ytshorts, #shortsvideo, etc.)
 * 3. Snippet tags metadata (shorts, youtubeshorts, shortsvideo, etc.)
 * 4. Short promo/teaser clips (<= 120s) pointing viewers to full episodes/podcasts
 * 5. Native YouTube Short duration ceiling (duration > 0 and <= 60s)
 *
 * @param {Object} video - YouTube API item or video object with snippet/contentDetails
 * @returns {string|null} Detection signal/reason or null
 */
function getYouTubeShortReason(video) {
  if (!video) return null;

  const title = video.snippet?.title || video.title || "";
  const description = video.snippet?.description || video.description || "";
  const tags = video.snippet?.tags || video.tags || [];

  let durationSeconds = 0;
  if (typeof video.durationSeconds === "number") {
    durationSeconds = video.durationSeconds;
  } else if (video.contentDetails?.duration) {
    durationSeconds = parseISO8601Duration(video.contentDetails.duration);
  } else if (typeof video.duration === "string") {
    durationSeconds = parseISO8601Duration(video.duration);
  }

  // 1. Explicit Shorts keywords or hashtags in title
  if (
    /#shorts?\b/i.test(title) ||
    /#ytshorts\b/i.test(title) ||
    /\bcalakar\s*shorts\b/i.test(title) ||
    /\bshorts\b/i.test(title)
  ) {
    return "title keyword / hashtag";
  }

  // 2. Explicit Shorts hashtags in description
  if (
    /#shorts?\b/i.test(description) ||
    /#ytshorts\b/i.test(description) ||
    /#shortsvideo\b/i.test(description) ||
    /#danceshorts\b/i.test(description)
  ) {
    return "description hashtag";
  }

  // 3. YouTube Shorts tags in snippet metadata
  if (
    Array.isArray(tags) &&
    tags.some((t) =>
      /^(shorts|youtubeshorts|shortsvideo|ytshorts|dance\s*shorts)$/i.test(t.trim())
    )
  ) {
    return "snippet tags metadata";
  }

  // 4. Promo snippet / teaser clip pattern with duration <= 120s
  const isPromoClip =
    /full podcast on youtube|watch full.*channel|full episode on channel|पूर्ण पॉडकास्ट|full video on channel/i.test(
      title
    ) ||
    /full podcast on youtube|watch full episode/i.test(description.slice(0, 200));

  if (isPromoClip && durationSeconds > 0 && durationSeconds <= 120) {
    return "promo teaser clip (<= 120s)";
  }

  // 5. Standard YouTube Short Duration ceiling (<= 180 seconds / 3 minutes)
  if (durationSeconds > 0 && durationSeconds <= 180) {
    return "duration <= 180s";
  }

  return null;
}

function isYouTubeShort(video) {
  return getYouTubeShortReason(video) !== null;
}

// ── Normalization Helpers ─────────────────────────────────────────────────────

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

  if (!base) {
    base = "video";
  }

  return `${base}-${suffix}`;
}

function buildThumbnails(youtubeId) {
  const base = `https://i.ytimg.com/vi/${youtubeId}`;
  return {
    default: `${base}/hqdefault.jpg`,
    medium: `${base}/mqdefault.jpg`,
    high: `${base}/maxresdefault.jpg`,
  };
}

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

function inferCategory(playlistId, playlistTitle, title, durationSeconds, tags) {
  // 1. Direct Playlist ID mapping (Highest Priority)
  if (playlistId) {
    const plMatch = PLAYLIST_CATEGORY_MAP.find((p) => p.id === playlistId);
    if (plMatch) return plMatch.category;
  }

  // 2. Playlist Title keyword mapping
  if (playlistTitle) {
    for (const pl of PLAYLIST_CATEGORY_MAP) {
      if (playlistTitle.toLowerCase().includes(pl.name.toLowerCase())) {
        return pl.category;
      }
    }
  }

  // 3. Title/Content heuristic rules
  const tempObj = { title, playlist: playlistTitle, durationSeconds, tags: tags || [] };
  for (const [test, category] of TITLE_CATEGORY_RULES) {
    try {
      if (test(tempObj)) return category;
    } catch {
      continue;
    }
  }

  // 4. Default fallback
  return CATEGORIES.PERFORMANCES;
}

const API_BASE_URL = process.env.YOUTUBE_API_BASE_URL || "https://www.googleapis.com/youtube/v3";

// ── HTTP API Client ───────────────────────────────────────────────────────────

async function fetchJson(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      let errorMsg = `HTTP ${res.status} ${res.statusText}`;
      try {
        const parsedError = await res.json();
        if (parsedError.error?.message) {
          errorMsg = parsedError.error.message;
        }
      } catch {
        // Ignore json parse error for error body
      }
      throw new Error(errorMsg);
    }
    return await res.json();
  } catch (err) {
    const detail = err.cause ? ` (${err.cause.message || err.cause})` : "";
    throw new Error(`${err.message}${detail}`);
  }
}

// ── Main Synchronization Pipeline ─────────────────────────────────────────────

async function runSync() {
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("  Myriad Arts — YouTube Channel Automated Synchronization");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  if (IS_DRY_RUN) {
    console.log("🔍  Running in DRY-RUN mode. No changes will be written to disk.\n");
  }

  // 1. Validate Environment
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    console.error("❌  [YouTube Sync] Missing YOUTUBE_API_KEY environment variable.");
    console.error("    Please add YOUTUBE_API_KEY to .env.local or your VPS environment.");
    process.exit(1);
  }

  acquireLock();

  // 2. Read Existing media.json
  if (!fs.existsSync(MEDIA_JSON)) {
    console.error(`❌  [YouTube Sync] Media data file not found at: ${MEDIA_JSON}`);
    process.exit(1);
  }

  let mediaData;
  try {
    const raw = fs.readFileSync(MEDIA_JSON, "utf-8");
    mediaData = JSON.parse(raw);
  } catch (err) {
    console.error(`❌  [YouTube Sync] Failed to read or parse existing media.json: ${err.message}`);
    process.exit(1);
  }

  if (!mediaData || typeof mediaData !== "object" || !Array.isArray(mediaData.videos)) {
    console.error("❌  [YouTube Sync] Invalid media.json structure: expected root object with 'videos' array.");
    process.exit(1);
  }

  // Index existing videos by youtubeId
  const existingMap = new Map();
  const existingSlugs = new Set();
  const duplicateCheck = new Set();

  for (const v of mediaData.videos) {
    if (!v.youtubeId) {
      console.error(`❌  [YouTube Sync] Corrupted record found in media.json: missing youtubeId (ID: ${v.id})`);
      process.exit(1);
    }
    if (duplicateCheck.has(v.youtubeId)) {
      console.error(`❌  [YouTube Sync] Duplicate record already exists in media.json: ${v.youtubeId} ("${v.title}"). Aborting.`);
      process.exit(1);
    }
    duplicateCheck.add(v.youtubeId);
    existingMap.set(v.youtubeId, v);
    if (v.slug) existingSlugs.add(v.slug);
  }

  console.log(`📦  Current media.json: ${mediaData.videos.length} videos loaded.`);

  // 3. Resolve Uploads Playlist ID & Channel Playlist Memberships
  let uploadsPlaylistId = process.env.YOUTUBE_UPLOADS_PLAYLIST_ID;

  if (!uploadsPlaylistId && process.env.YOUTUBE_CHANNEL_ID) {
    const chId = process.env.YOUTUBE_CHANNEL_ID.trim();
    if (chId.startsWith("UC")) {
      uploadsPlaylistId = "UU" + chId.slice(2);
    }
  }

  if (!uploadsPlaylistId) {
    // Look up channel uploads playlist by handle (@Calakar)
    if (IS_VERBOSE) console.log("📡  Resolving channel uploads playlist ID for @Calakar...");
    try {
      const channelRes = await fetchJson(
        `${API_BASE_URL}/channels?part=contentDetails&forHandle=Calakar&key=${apiKey}`
      );
      if (channelRes.items && channelRes.items.length > 0) {
        uploadsPlaylistId = channelRes.items[0].contentDetails?.relatedPlaylists?.uploads;
      }
    } catch (err) {
      if (IS_VERBOSE) console.warn("    Could not resolve by handle, attempting channel ID discovery...");
    }
  }

  // Fallback if handle lookup didn't succeed
  if (!uploadsPlaylistId) {
    uploadsPlaylistId = "UUD1zzT-yt8830wjMLjZ61JhAXVLDJzAx2".replace("UUD1", "UU");
  }

  if (!uploadsPlaylistId) {
    console.error("❌  [YouTube Sync] Could not determine YouTube uploads playlist ID.");
    console.error("    Set YOUTUBE_UPLOADS_PLAYLIST_ID or YOUTUBE_CHANNEL_ID in your environment.");
    process.exit(1);
  }

  if (IS_VERBOSE) console.log(`📋  Uploads Playlist ID: ${uploadsPlaylistId}`);

  // Fetch channel playlist memberships
  const videoToPlaylistMap = new Map();
  for (const pl of PLAYLIST_CATEGORY_MAP) {
    try {
      let nextPageToken = "";
      do {
        const plUrl = `${API_BASE_URL}/playlistItems?part=contentDetails,snippet&playlistId=${pl.id}&maxResults=50&pageToken=${nextPageToken}&key=${apiKey}`;
        const plRes = await fetchJson(plUrl);
        if (plRes.items) {
          for (const item of plRes.items) {
            const vId = item.contentDetails?.videoId || item.snippet?.resourceId?.videoId;
            if (vId && !videoToPlaylistMap.has(vId)) {
              videoToPlaylistMap.set(vId, { id: pl.id, name: pl.name, category: pl.category });
            }
          }
        }
        nextPageToken = plRes.nextPageToken || "";
      } while (nextPageToken);
    } catch (plErr) {
      if (IS_VERBOSE) console.warn(`    Could not fetch items for playlist ${pl.name}: ${plErr.message}`);
    }
  }

  // 4. Discover Recent Uploads
  console.log(`📡  Querying latest ${MAX_UPLOADS_TO_CHECK} uploads from YouTube...`);
  let playlistItems = [];
  try {
    const playlistUrl = `${API_BASE_URL}/playlistItems?part=snippet,contentDetails&playlistId=${uploadsPlaylistId}&maxResults=${Math.min(MAX_UPLOADS_TO_CHECK, 50)}&key=${apiKey}`;
    const playlistRes = await fetchJson(playlistUrl);
    playlistItems = playlistRes.items || [];
  } catch (err) {
    console.error(`❌  [YouTube Sync] Failed to fetch playlist items: ${err.message}`);
    process.exit(1);
  }

  if (playlistItems.length === 0) {
    console.log("ℹ️   No items returned from uploads playlist.");
    return;
  }

  const recentVideoIds = [];
  const playlistSnippets = new Map();

  for (const item of playlistItems) {
    const vid = item.contentDetails?.videoId || item.snippet?.resourceId?.videoId;
    if (vid) {
      recentVideoIds.push(vid);
      playlistSnippets.set(vid, item.snippet);
    }
  }

  // Detect New Candidate Video IDs vs Existing IDs
  const candidateNewVideoIds = recentVideoIds.filter((id) => !existingMap.has(id));
  const existingRecentIds = recentVideoIds.filter((id) => existingMap.has(id));

  console.log(`🔍  Discovery summary:`);
  console.log(`    - Uploads inspected: ${recentVideoIds.length}`);
  console.log(`    - Candidate new uploads: ${candidateNewVideoIds.length}`);
  console.log(`    - Existing videos to refresh: ${existingRecentIds.length}`);

  if (candidateNewVideoIds.length === 0 && existingRecentIds.length === 0) {
    console.log("\n✅  Everything is up to date. No changes needed.\n");
    return;
  }

  // 5. Fetch Full Video Metadata (Batched)
  const allIdsToFetch = [...candidateNewVideoIds, ...existingRecentIds];
  const videoDetailsMap = new Map();

  const BATCH_SIZE = 50;
  for (let i = 0; i < allIdsToFetch.length; i += BATCH_SIZE) {
    const batch = allIdsToFetch.slice(i, i + BATCH_SIZE);
    const apiUrl = `${API_BASE_URL}/videos?part=snippet,contentDetails,statistics,status&id=${batch.join(",")}&key=${apiKey}`;
    try {
      const res = await fetchJson(apiUrl);
      if (res.items) {
        for (const item of res.items) {
          videoDetailsMap.set(item.id, item);
        }
      }
    } catch (err) {
      console.error(`❌  [YouTube Sync] Failed to fetch video details: ${err.message}`);
      process.exit(1);
    }
  }

  // 6. Transform New Videos into Schema (Excluding Shorts)
  const newlyCreatedRecords = [];
  let skippedShortsCount = 0;

  console.log(`\n🔄  Processing candidate videos & filtering Shorts...`);

  for (const youtubeId of candidateNewVideoIds) {
    const item = videoDetailsMap.get(youtubeId);
    if (!item || !item.snippet) {
      console.warn(`⚠️   Skipping video ${youtubeId}: detail metadata not returned by YouTube API.`);
      continue;
    }

    // Evaluate Shorts exclusion BEFORE candidate becomes a new record
    const shortReason = getYouTubeShortReason(item);
    if (shortReason) {
      skippedShortsCount++;
      console.log(`  ⏭ [SHORT] "${item.snippet.title || "Untitled"}" (${shortReason})`);
      continue;
    }

    const rawTitle = item.snippet.title || "Untitled";
    const title = cleanTitle(rawTitle);
    const description = item.snippet.description || "";
    const durationSeconds = parseISO8601Duration(item.contentDetails?.duration);
    const tags = Array.isArray(item.snippet.tags) ? item.snippet.tags.slice(0, 12) : [];
    const publishedAt = item.snippet.publishedAt || new Date().toISOString();

    // Check playlist membership from curated channel playlists first
    let resolvedPlaylist = null;
    let resolvedPlaylistId = null;

    if (videoToPlaylistMap.has(youtubeId)) {
      const plInfo = videoToPlaylistMap.get(youtubeId);
      resolvedPlaylist = plInfo.name;
      resolvedPlaylistId = plInfo.id;
    } else {
      const playlistMatch = PLAYLIST_CATEGORY_MAP.find((p) =>
        title.toLowerCase().includes(p.name.toLowerCase())
      );
      if (playlistMatch) {
        resolvedPlaylist = playlistMatch.name;
        resolvedPlaylistId = playlistMatch.id;
      }
    }

    const category = inferCategory(
      resolvedPlaylistId,
      resolvedPlaylist,
      title,
      durationSeconds,
      tags
    );

    let slug = generateSlug(rawTitle, youtubeId);
    if (existingSlugs.has(slug)) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }
    existingSlugs.add(slug);

    const viewCount = item.statistics?.viewCount
      ? parseInt(item.statistics.viewCount, 10)
      : null;
    const likeCount = item.statistics?.likeCount
      ? parseInt(item.statistics.likeCount, 10)
      : null;

    const newRecord = {
      // ── Identity ────────────────────────────────────────────────────────────
      id: generateStableId(youtubeId),
      slug,
      youtubeId,

      // ── Editorial Content ───────────────────────────────────────────────────
      title,
      shortDescription: extractShortDescription(description),
      description,

      // ── Media ───────────────────────────────────────────────────────────────
      thumbnail: buildThumbnails(youtubeId),
      embedUrl: `https://www.youtube.com/embed/${youtubeId}`,
      watchUrl: `https://www.youtube.com/watch?v=${youtubeId}`,

      // ── Taxonomy ────────────────────────────────────────────────────────────
      category,
      playlist: resolvedPlaylist,
      playlistId: resolvedPlaylistId,

      // ── Editorial Curation (Protected defaults for new records) ─────────────
      featured: false,
      featuredOrder: null,
      homepageSpotlight: false,

      // ── Artist ──────────────────────────────────────────────────────────────
      artist: null,
      artistRole: null,

      // ── Temporal ────────────────────────────────────────────────────────────
      duration: item.contentDetails?.duration || "PT0S",
      durationDisplay: formatDurationDisplay(durationSeconds),
      durationSeconds,
      publishedAt,

      // ── Discovery ───────────────────────────────────────────────────────────
      tags,
      relatedIds: [],

      // ── System ──────────────────────────────────────────────────────────────
      status: "published",
      migratedAt: new Date().toISOString(),
      viewCount,
      likeCount,
    };

    newlyCreatedRecords.push(newRecord);
    console.log(`  ✨ [NEW]`);
    console.log(`     Title:    "${newRecord.title}"`);
    console.log(`     Category: ${newRecord.category}`);
    console.log(`     Playlist: ${newRecord.playlist || "None"}`);
    console.log(`     Slug:     ${newRecord.slug}`);
  }

  // 7. Update Existing Videos (Dynamic stats only, protect editorial fields)
  let updatedStatsCount = 0;
  for (const youtubeId of existingRecentIds) {
    const item = videoDetailsMap.get(youtubeId);
    const existing = existingMap.get(youtubeId);
    if (!item || !existing) continue;

    let modified = false;

    // Refresh view & like counts if changed
    if (item.statistics?.viewCount) {
      const freshViews = parseInt(item.statistics.viewCount, 10);
      if (existing.viewCount !== freshViews) {
        existing.viewCount = freshViews;
        modified = true;
      }
    }
    if (item.statistics?.likeCount) {
      const freshLikes = parseInt(item.statistics.likeCount, 10);
      if (existing.likeCount !== freshLikes) {
        existing.likeCount = freshLikes;
        modified = true;
      }
    }

    // Refresh tags if newly present
    if (Array.isArray(item.snippet?.tags) && (!existing.tags || existing.tags.length === 0)) {
      existing.tags = item.snippet.tags.slice(0, 12);
      modified = true;
    }

    if (modified) updatedStatsCount++;
  }

  if (IS_VERBOSE) console.log(`📊  Updated live stats for ${updatedStatsCount} existing videos.`);

  // 8. Assemble Full Collection (New videos prepended chronologically)
  const finalVideos = [...newlyCreatedRecords, ...mediaData.videos];

  // Recalculate Category Breakdown
  const finalBreakdown = {};
  for (const catKey of Object.keys(CATEGORY_META)) {
    finalBreakdown[catKey] = 0;
  }
  for (const v of finalVideos) {
    finalBreakdown[v.category] = (finalBreakdown[v.category] || 0) + 1;
  }

  const finalOutput = {
    version: mediaData.version || 1,
    generatedAt: IS_DRY_RUN ? mediaData.generatedAt : new Date().toISOString(),
    totalVideos: finalVideos.length,
    meta: {
      ...mediaData.meta,
      breakdown: finalBreakdown,
    },
    _editorial: mediaData._editorial || {},
    videos: finalVideos,
  };

  // 9. Schema and Data Integrity Validation
  console.log("\n🛡️   Validating final dataset schema and integrity...");

  if (finalOutput.videos.length !== finalOutput.totalVideos) {
    throw new Error(`Integrity error: totalVideos (${finalOutput.totalVideos}) does not match videos.length (${finalOutput.videos.length})`);
  }

  const validateSet = new Set();
  for (const v of finalOutput.videos) {
    if (!v.id || !v.slug || !v.youtubeId || !v.title) {
      throw new Error(`Integrity error: video record missing required identity field (youtubeId: ${v.youtubeId})`);
    }
    if (validateSet.has(v.youtubeId)) {
      throw new Error(`Integrity error: duplicate youtubeId detected: ${v.youtubeId}`);
    }
    validateSet.add(v.youtubeId);

    if (!Object.values(CATEGORIES).includes(v.category)) {
      console.warn(`⚠️  Video "${v.title}" has non-standard category: ${v.category}`);
    }
  }

  console.log(`✅  Validation passed: ${finalVideos.length} unique videos verified.`);

  // 10. Atomic Write (or Dry-Run Print)
  if (IS_DRY_RUN) {
    console.log("\n── DRY RUN COMPLETED SUCCESSFULLY ────────────");
    console.log(`   Uploads inspected:              ${recentVideoIds.length}`);
    console.log(`   Shorts skipped:                 ${skippedShortsCount}`);
    console.log(`   New videos detected:            ${newlyCreatedRecords.length}`);
    console.log(`   Existing videos refreshed:      ${updatedStatsCount}`);
    console.log(`   Total videos after sync:        ${finalVideos.length}`);
    console.log(`   Videos skipped as Shorts:       ${skippedShortsCount}`);
    console.log("   data/media.json was NOT modified.");
    console.log("──────────────────────────────────────────────\n");
    return;
  }

  // Atomic file replacement: temp file -> validate -> rename
  const tempPath = path.join(DATA_DIR, `media.json.tmp.${process.pid}`);
  try {
    const serialized = JSON.stringify(finalOutput, null, 2);
    fs.writeFileSync(tempPath, serialized, "utf-8");

    // Re-read temp file and verify it parses cleanly
    const verifyParsed = JSON.parse(fs.readFileSync(tempPath, "utf-8"));
    if (!verifyParsed.videos || verifyParsed.videos.length !== finalVideos.length) {
      throw new Error("Temporary file verification failed.");
    }

    // Atomic rename (POSIX atomic overwrite)
    fs.renameSync(tempPath, MEDIA_JSON);
    console.log(`\n💾  [YouTube Sync] data/media.json successfully updated!`);
    console.log(`    - Uploads inspected:         ${recentVideoIds.length}`);
    console.log(`    - Shorts skipped:            ${skippedShortsCount}`);
    console.log(`    - Added:                     ${newlyCreatedRecords.length} new videos`);
    console.log(`    - Refreshed:                 ${updatedStatsCount} existing videos`);
    console.log(`    - Total in database:         ${finalVideos.length} videos`);
    console.log(`    - Generated At:              ${finalOutput.generatedAt}\n`);
  } catch (writeErr) {
    if (fs.existsSync(tempPath)) {
      try { fs.unlinkSync(tempPath); } catch {}
    }
    console.error(`❌  [YouTube Sync] Atomic write failed: ${writeErr.message}`);
    process.exit(1);
  }
}

runSync()
  .catch((err) => {
    console.error(`\n❌  [YouTube Sync] Unexpected error: ${err.message}`);
    process.exit(1);
  })
  .finally(() => {
    releaseLock();
  });
