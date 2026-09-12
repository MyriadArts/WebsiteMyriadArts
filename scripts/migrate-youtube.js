// scripts/migrate-youtube.js
// ──────────────────────────────────────────────────────────────────────────────
// ONE-TIME migration pipeline: Calakar YouTube channel → /data/media.json
//
// Usage:
//   node scripts/migrate-youtube.js
//
// Prerequisites:
//   yt-dlp installed:  pip install yt-dlp  (or  brew install yt-dlp)
//   Node.js 18+
//
// What this does:
//   1. Checks yt-dlp is available
//   2. Fetches ALL channel video metadata (no media files downloaded)
//   3. Normalizes raw yt-dlp output into the editorial schema
//   4. Deduplicates by YouTube ID
//   5. Writes /data/media.json (production source of truth)
//   6. Writes /data/media-raw-backup.ndjson (gitignored, for re-normalizing)
// ──────────────────────────────────────────────────────────────────────────────

import { execSync, spawnSync } from "child_process";
import { createWriteStream, readFileSync, writeFileSync, existsSync, mkdirSync, createReadStream } from "fs";
import { createInterface } from "readline";
import { createHash } from "crypto";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

// ── Config ────────────────────────────────────────────────────────────────────

const CONFIG = {
  channelUrl: "https://www.youtube.com/@Calakar",
  rawDump: path.join(ROOT, "data", "media-raw-backup.ndjson"),
  output: path.join(ROOT, "data", "media.json"),
  fullMetadata: true,

  // Real playlist IDs extracted via yt-dlp (verified 2026-06-24)
  // Fetched individually so each video gets its correct playlist_title.
  playlists: [
    { url: "https://www.youtube.com/playlist?list=PLD1zzT-yt8830wjMLjZ61JhAXVLDJzAx2", name: "Vaarsa - Reliving The Folk Art of India",       category: "folk-heritage"       },
    { url: "https://www.youtube.com/playlist?list=PLD1zzT-yt8801s0IB9mv5eTYbA9P2G53Y", name: "Aaja Nachle - Bollywood & Freestyle",            category: "performances"        },
    { url: "https://www.youtube.com/playlist?list=PLD1zzT-yt883fm6ZRqiiraXpawNNkrFNM", name: "Chance Pe Dance",                                 category: "performances"        },
    { url: "https://www.youtube.com/playlist?list=PLD1zzT-yt8825Uyh5jnNFeOLDIXZe1yHi", name: "Dance Antakshari",                                category: "performances"        },
    { url: "https://www.youtube.com/playlist?list=PLD1zzT-yt8835ADymmtGK3TobdkcXSh2Q", name: "Can We Talk",                                     category: "conversations"       },
    { url: "https://www.youtube.com/playlist?list=PLD1zzT-yt881dpEcOuH-CAEs3TKM9W-cP", name: "Unfiltered with Shreyas",                         category: "conversations"       },
    { url: "https://www.youtube.com/playlist?list=PLD1zzT-yt8800ESlO00jhMI5KbQHziAxj", name: "Potbhar Gappa",                                   category: "conversations"       },
    { url: "https://www.youtube.com/playlist?list=PLD1zzT-yt883AvVmJzQju1AdN0rhzzOkJ", name: "Podcast",                                         category: "podcasts"            },
    { url: "https://www.youtube.com/playlist?list=PLD1zzT-yt883iqWLM00rot919jJwECxPh", name: "Mini Podcast",                                    category: "podcasts"            },
    { url: "https://www.youtube.com/playlist?list=PLD1zzT-yt880Ywo2uYBlNngn6p8SjDdY7", name: "Thet Manatun (No filter)",                        category: "behind-the-scenes"   },
  ],
};


// ── Category taxonomy ─────────────────────────────────────────────────────────

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

// Playlist-name → category (exact substring match, case-insensitive)
const PLAYLIST_CATEGORY_MAP = [
  ["Aaja Nachle",         CATEGORIES.PERFORMANCES],
  ["Dance Antakshari",    CATEGORIES.PERFORMANCES],
  ["Chance Pe Dance",     CATEGORIES.PERFORMANCES],
  ["Vaarsa",              CATEGORIES.FOLK_HERITAGE],
  ["Can We Talk",         CATEGORIES.CONVERSATIONS],
  ["Unfiltered with",     CATEGORIES.CONVERSATIONS],
  ["Potbhar Gappa",       CATEGORIES.CONVERSATIONS],
  ["Mini Podcast",        CATEGORIES.PODCASTS],
  ["Podcast",             CATEGORIES.PODCASTS],
  ["Thet Manatun",        CATEGORIES.BEHIND_THE_SCENES],
];

// Title keywords → category (fallback when no playlist match)
const TITLE_CATEGORY_MAP = [
  [/dance|perform|aaja|nachle|nachle/i,  CATEGORIES.PERFORMANCES],
  [/folk|vaarsa|traditional|heritage/i,  CATEGORIES.FOLK_HERITAGE],
  [/podcast|episode|ep\./i,              CATEGORIES.PODCASTS],
  [/interview|talk|conversation|chat/i,  CATEGORIES.CONVERSATIONS],
  [/behind|bts|no filter|unfiltered/i,   CATEGORIES.BEHIND_THE_SCENES],
];

// ── Normalization helpers ─────────────────────────────────────────────────────

function inferCategory(playlistTitle, title) {
  // 1. Playlist takes highest priority
  if (playlistTitle) {
    for (const [keyword, cat] of PLAYLIST_CATEGORY_MAP) {
      if (playlistTitle.toLowerCase().includes(keyword.toLowerCase())) {
        return cat;
      }
    }
  }
  // 2. Title keyword fallback
  for (const [regex, cat] of TITLE_CATEGORY_MAP) {
    if (regex.test(title)) return cat;
  }
  // 3. Default: performances (most common content type on this channel)
  return CATEGORIES.PERFORMANCES;
}

function generateSlug(title, youtubeId) {
  const base = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")       // strip non-alphanumeric
    .replace(/[\s_]+/g, "-")         // spaces → hyphens
    .replace(/-+/g, "-")             // collapse multiple hyphens
    .replace(/^-|-$/g, "")           // trim leading/trailing
    .slice(0, 60);                   // max 60 chars
  // Append last 6 chars of youtubeId for guaranteed uniqueness
  return `${base}-${youtubeId.slice(-6)}`;
}

function generateStableId(youtubeId) {
  // Deterministic UUID-style ID from YouTube ID — stable across re-migrations
  return createHash("sha256")
    .update(`youtube:${youtubeId}`)
    .digest("hex")
    .slice(0, 32)
    .replace(/^(.{8})(.{4})(.{4})(.{4})(.{12})$/, "$1-$2-$3-$4-$5");
}

function buildThumbnails(youtubeId) {
  const base = `https://i.ytimg.com/vi/${youtubeId}`;
  return {
    // Used in: grid cards, video cards
    default: `${base}/hqdefault.jpg`,
    // Used in: mobile thumbnails, fallback
    medium: `${base}/mqdefault.jpg`,
    // Used in: hero spotlight, featured collection, OG image
    high: `${base}/maxresdefault.jpg`,
  };
}

function formatDuration(seconds) {
  // Returns ISO 8601 duration: "PT4M23S"
  if (!seconds) return "PT0S";
  const totalSeconds = Math.floor(seconds);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  if (h > 0) return `PT${h}H${m}M${s}S`;
  return `PT${m}M${s}S`;
}

function formatDurationDisplay(seconds) {
  // Returns human display: "4:23" or "1:04:23"
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
    .replace(/\s*\|\s*/g, " — ")         // pipe → em dash
    .replace(/\s*#\w+/g, "")              // strip trailing hashtags
    .replace(/\s{2,}/g, " ")             // collapse whitespace
    .trim();
}

function extractShortDescription(description, maxChars = 160) {
  if (!description) return "";
  // Take first paragraph, strip markdown/links, truncate
  const firstPara = description.split(/\n{2,}/)[0] || description;
  const cleaned = firstPara
    .replace(/https?:\/\/\S+/g, "")       // strip URLs
    .replace(/\s{2,}/g, " ")
    .trim();
  if (cleaned.length <= maxChars) return cleaned;
  return cleaned.slice(0, maxChars - 1).trim() + "…";
}

// ── Core normalizer ───────────────────────────────────────────────────────────

function normalizeVideo(raw) {
  const youtubeId = raw.id || raw.webpage_url_basename;
  if (!youtubeId || typeof youtubeId !== "string") return null;

  const title = cleanTitle(raw.title || "Untitled");
  const playlist = raw.playlist_title || raw.playlist || null;
  const description = raw.description || "";
  const durationSeconds = raw.duration || 0;

  // Parse upload date: "20231115" → "2023-11-15T00:00:00.000Z"
  let publishedAt = "";
  if (raw.upload_date && raw.upload_date.length === 8) {
    const d = raw.upload_date;
    publishedAt = new Date(
      `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}T00:00:00.000Z`
    ).toISOString();
  }

  return {
    // ── Identity ──────────────────────────────────────────────────────────────
    id: generateStableId(youtubeId),
    slug: generateSlug(title, youtubeId),
    youtubeId,

    // ── Editorial Content ─────────────────────────────────────────────────────
    title,
    shortDescription: extractShortDescription(description),
    description,

    // ── Media ─────────────────────────────────────────────────────────────────
    thumbnail: buildThumbnails(youtubeId),
    embedUrl: `https://www.youtube.com/embed/${youtubeId}`,
    watchUrl: `https://www.youtube.com/watch?v=${youtubeId}`,

    // ── Taxonomy ──────────────────────────────────────────────────────────────
    category: inferCategory(playlist, title),
    playlist: playlist,
    playlistId: raw.playlist_id || null,

    // ── Editorial Curation (manually set after migration) ─────────────────────
    featured: false,
    featuredOrder: null,
    homepageSpotlight: false,

    // ── Artist (manually enriched after migration) ────────────────────────────
    artist: null,
    artistRole: null,

    // ── Temporal ──────────────────────────────────────────────────────────────
    duration: formatDuration(durationSeconds),
    durationDisplay: formatDurationDisplay(durationSeconds),
    durationSeconds,
    publishedAt,

    // ── Discovery ─────────────────────────────────────────────────────────────
    tags: Array.isArray(raw.tags) ? raw.tags.slice(0, 12) : [],
    relatedIds: [],     // Manually set or auto-generated post-migration

    // ── System ────────────────────────────────────────────────────────────────
    status: "published",
    migratedAt: new Date().toISOString(),
    viewCount: raw.view_count || null,
    likeCount: raw.like_count || null,
  };
}

// ── Pipeline ──────────────────────────────────────────────────────────────────

function checkYtDlp() {
  // Try python -m yt_dlp (works without PATH setup after pip install)
  const result = spawnSync("python", ["-m", "yt_dlp", "--version"], { encoding: "utf-8" });
  if (result.error || result.status !== 0) {
    console.error("❌  yt-dlp not found.");
    console.error("    Install: pip install yt-dlp");
    process.exit(1);
  }
  console.log(`✅  yt-dlp ${result.stdout.trim()} detected`);
}

function fetchChannelMetadata() {
  console.log("\n📡  Fetching video metadata from individual playlists...");
  console.log("    This fetches each named playlist separately for accurate category mapping.");
  console.log("    Estimated time: 3-8 minutes for full descriptions.\n");

  mkdirSync(path.dirname(CONFIG.rawDump), { recursive: true });

  // Clear existing dump
  writeFileSync(CONFIG.rawDump, "", "utf-8");

  const flags = `--dump-json --ignore-errors --sleep-interval 1 --max-sleep-interval 2`;

  // Fetch each named playlist individually — this populates playlist_title correctly
  for (const playlist of CONFIG.playlists) {
    console.log(`  ↳ Fetching: ${playlist.name}`);
    execSync(
      `python -m yt_dlp ${flags} "${playlist.url}" >> "${CONFIG.rawDump}"`,
      { stdio: ["ignore", "pipe", "inherit"], shell: true }
    );
  }

  // Also fetch channel videos tab to catch any videos NOT in any named playlist
  console.log(`  ↳ Fetching: Channel videos (to catch uncategorized content)`);
  execSync(
    `python -m yt_dlp --flat-playlist --dump-json --ignore-errors "${CONFIG.channelUrl}/videos" >> "${CONFIG.rawDump}"`,
    { stdio: ["ignore", "pipe", "inherit"], shell: true }
  );

  console.log(`\n💾  Raw dump saved → ${CONFIG.rawDump}`);
}

async function normalizeFromDump() {
  console.log("\n🔄  Normalizing to editorial schema...");

  const seen = new Set();
  const videos = [];

  const rl = createInterface({
    input: createReadStream(CONFIG.rawDump, { encoding: "utf-8" }),
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    let raw;
    try {
      raw = JSON.parse(trimmed);
    } catch {
      continue; // skip malformed lines
    }

    const normalized = normalizeVideo(raw);
    if (!normalized) continue;

    // Deduplicate by YouTube ID (channel pages can list same video multiple times)
    if (seen.has(normalized.youtubeId)) continue;
    seen.add(normalized.youtubeId);

    videos.push(normalized);
    process.stdout.write(`\r    Processed: ${videos.length} videos`);
  }

  // Sort: newest first
  videos.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  console.log(`\n✅  ${videos.length} unique videos normalized`);
  return videos;
}

function writeOutput(videos) {
  mkdirSync(path.dirname(CONFIG.output), { recursive: true });

  // Category breakdown stats
  const byCategory = {};
  for (const v of videos) {
    byCategory[v.category] = (byCategory[v.category] || 0) + 1;
  }

  const output = {
    // Schema version — increment when schema changes breaking compatibility
    version: 1,
    generatedAt: new Date().toISOString(),
    totalVideos: videos.length,

    meta: {
      channel: "Calakar",
      channelUrl: "https://www.youtube.com/@Calakar",
      categories: CATEGORY_META,
      breakdown: byCategory,
    },

    // Instructions embedded in the JSON for future editors
    _editorial: {
      howToFeature: "Set featured:true and featuredOrder:1-8 on chosen videos",
      howToSpotlight: "Set homepageSpotlight:true on exactly ONE video",
      howToAddArtist: "Set artist:'Name' and artistRole:'Dancer|Host|etc' on relevant videos",
      howToRelate: "Add video IDs to relatedIds[] array for curated related content",
      howToArchive: "Set status:'archived' to hide without deleting",
    },

    videos,
  };

  writeFileSync(CONFIG.output, JSON.stringify(output, null, 2), "utf-8");
  console.log(`\n📄  Production JSON → ${CONFIG.output}`);

  // Print category breakdown
  console.log("\n── Category Breakdown ──────────────────────");
  for (const [cat, count] of Object.entries(byCategory)) {
    const label = CATEGORY_META[cat]?.label || cat;
    console.log(`   ${label.padEnd(20)} ${count} videos`);
  }
  console.log("────────────────────────────────────────────\n");
}

// ── Entry point ───────────────────────────────────────────────────────────────

async function main() {
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("  Myriad Arts — YouTube → JSON Migration");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  checkYtDlp();

  // Allow skipping fetch if raw dump already exists (for re-normalizing)
  const skipFetch = process.argv.includes("--normalize-only");
  if (skipFetch) {
    if (!existsSync(CONFIG.rawDump)) {
      console.error("❌  Raw dump not found. Run without --normalize-only first.");
      process.exit(1);
    }
    console.log("ℹ️   --normalize-only: skipping YouTube fetch, using existing dump");
  } else {
    fetchChannelMetadata();
  }

  const videos = await normalizeFromDump();
  writeOutput(videos);

  console.log("🎉  Migration complete!\n");
  console.log("Next steps:");
  console.log("  1. Open data/media.json in VS Code");
  console.log("  2. Set featured:true + featuredOrder on 6-8 best videos");
  console.log("  3. Set homepageSpotlight:true on ONE hero video");
  console.log("  4. Add artist + artistRole to Vaarsa and Aaja Nachle entries");
  console.log("  5. Commit data/media.json to git\n");
}

main().catch((err) => {
  console.error("\n❌  Migration failed:", err.message);
  process.exit(1);
});
