// scripts/add-video.js
// ──────────────────────────────────────────────────────────────────────────────
// Future maintenance: add a single YouTube video to media.json
//
// Usage:
//   node scripts/add-video.js <youtube-url>
//
// Example:
//   node scripts/add-video.js https://www.youtube.com/watch?v=dQw4w9WgXcQ
//
// What this does:
//   1. Fetches full metadata for the single video via yt-dlp
//   2. Normalizes it to the editorial schema
//   3. Checks for duplicates
//   4. Prepends to data/media.json (newest first)
//   5. Prints fields you should manually review
// ──────────────────────────────────────────────────────────────────────────────

import { execSync } from "child_process";
import { readFileSync, writeFileSync } from "fs";
import { createHash } from "crypto";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const MEDIA_JSON = path.join(ROOT, "data", "media.json");

// ── Re-use the same helpers from migrate-youtube.js ──────────────────────────
// (In a production codebase, extract these to scripts/lib/normalizer.js)

function generateStableId(youtubeId) {
  return createHash("sha256")
    .update(`youtube:${youtubeId}`)
    .digest("hex")
    .slice(0, 32)
    .replace(/^(.{8})(.{4})(.{4})(.{4})(.{12})$/, "$1-$2-$3-$4-$5");
}

function generateSlug(title, youtubeId) {
  const base = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
  return `${base}-${youtubeId.slice(-6)}`;
}

function buildThumbnails(youtubeId) {
  const base = `https://i.ytimg.com/vi/${youtubeId}`;
  return {
    default: `${base}/hqdefault.jpg`,
    medium: `${base}/mqdefault.jpg`,
    high: `${base}/maxresdefault.jpg`,
  };
}

function formatDuration(s) {
  if (!s) return "PT0S";
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
  return h > 0 ? `PT${h}H${m}M${sec}S` : `PT${m}M${sec}S`;
}

function formatDurationDisplay(s) {
  if (!s) return "0:00";
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
  const ss = String(sec).padStart(2, "0");
  return h > 0 ? `${h}:${String(m).padStart(2, "0")}:${ss}` : `${m}:${ss}`;
}

function cleanTitle(raw) {
  return raw.replace(/\s*\|\s*/g, " — ").replace(/\s*#\w+/g, "").replace(/\s{2,}/g, " ").trim();
}

function extractShortDescription(description, maxChars = 160) {
  if (!description) return "";
  const first = description.split(/\n{2,}/)[0] || description;
  const cleaned = first.replace(/https?:\/\/\S+/g, "").replace(/\s{2,}/g, " ").trim();
  return cleaned.length <= maxChars ? cleaned : cleaned.slice(0, 159) + "…";
}

// Category inference (keep in sync with migrate-youtube.js)
const PLAYLIST_CATEGORY_MAP = [
  ["Aaja Nachle", "performances"], ["Dance Antakshari", "performances"],
  ["Chance Pe Dance", "performances"], ["Vaarsa", "folk-heritage"],
  ["Can We Talk", "conversations"], ["Unfiltered with", "conversations"],
  ["Potbhar Gappa", "conversations"], ["Mini Podcast", "podcasts"],
  ["Podcast", "podcasts"], ["Thet Manatun", "behind-the-scenes"],
];
const TITLE_CATEGORY_MAP = [
  [/dance|perform|aaja|nachle/i, "performances"],
  [/folk|vaarsa|traditional|heritage/i, "folk-heritage"],
  [/podcast|episode|ep\./i, "podcasts"],
  [/interview|talk|conversation|chat/i, "conversations"],
  [/behind|bts|no filter|unfiltered/i, "behind-the-scenes"],
];

function inferCategory(playlist, title) {
  if (playlist) {
    for (const [kw, cat] of PLAYLIST_CATEGORY_MAP) {
      if (playlist.toLowerCase().includes(kw.toLowerCase())) return cat;
    }
  }
  for (const [re, cat] of TITLE_CATEGORY_MAP) {
    if (re.test(title)) return cat;
  }
  return "performances";
}

// ── Main ──────────────────────────────────────────────────────────────────────

function main() {
  const videoUrl = process.argv[2];
  if (!videoUrl || !videoUrl.startsWith("http")) {
    console.error("Usage: node scripts/add-video.js <youtube-url>");
    process.exit(1);
  }

  // 1. Fetch metadata
  console.log(`\n📡  Fetching metadata for: ${videoUrl}`);
  let raw;
  try {
    const stdout = execSync(`python -m yt_dlp --dump-json "${videoUrl}"`, { encoding: "utf-8" });
    raw = JSON.parse(stdout.trim());
  } catch (err) {
    console.error("❌  Failed to fetch video metadata:", err.message);
    process.exit(1);
  }

  const youtubeId = raw.id;
  const title = cleanTitle(raw.title || "Untitled");
  const playlist = raw.playlist_title || raw.playlist || null;
  const description = raw.description || "";
  const durationSeconds = raw.duration || 0;

  let publishedAt = "";
  if (raw.upload_date?.length === 8) {
    const d = raw.upload_date;
    publishedAt = new Date(`${d.slice(0,4)}-${d.slice(4,6)}-${d.slice(6,8)}T00:00:00.000Z`).toISOString();
  }

  const newVideo = {
    id: generateStableId(youtubeId),
    slug: generateSlug(title, youtubeId),
    youtubeId,
    title,
    shortDescription: extractShortDescription(description),
    description,
    thumbnail: buildThumbnails(youtubeId),
    embedUrl: `https://www.youtube.com/embed/${youtubeId}`,
    watchUrl: `https://www.youtube.com/watch?v=${youtubeId}`,
    category: inferCategory(playlist, title),
    playlist,
    playlistId: raw.playlist_id || null,
    featured: false,
    featuredOrder: null,
    homepageSpotlight: false,
    artist: null,
    artistRole: null,
    duration: formatDuration(durationSeconds),
    durationDisplay: formatDurationDisplay(durationSeconds),
    durationSeconds,
    publishedAt,
    tags: Array.isArray(raw.tags) ? raw.tags.slice(0, 12) : [],
    relatedIds: [],
    status: "published",
    migratedAt: new Date().toISOString(),
    viewCount: raw.view_count || null,
    likeCount: raw.like_count || null,
  };

  // 2. Load existing media.json
  let mediaData;
  try {
    mediaData = JSON.parse(readFileSync(MEDIA_JSON, "utf-8"));
  } catch {
    console.error(`❌  Could not read ${MEDIA_JSON}. Run migrate-youtube.js first.`);
    process.exit(1);
  }

  // 3. Check for duplicates
  const exists = mediaData.videos.find((v) => v.youtubeId === youtubeId);
  if (exists) {
    console.warn(`⚠️   Video already exists in media.json: "${exists.title}"`);
    console.warn(`    Slug: ${exists.slug}`);
    process.exit(0);
  }

  // 4. Prepend (newest first)
  mediaData.videos.unshift(newVideo);
  mediaData.totalVideos = mediaData.videos.length;
  mediaData.generatedAt = new Date().toISOString();

  // 5. Write back
  writeFileSync(MEDIA_JSON, JSON.stringify(mediaData, null, 2), "utf-8");

  // 6. Print summary + manual review instructions
  console.log(`\n✅  Added: "${newVideo.title}"`);
  console.log(`\n── Review these fields manually in data/media.json ──`);
  console.log(`   slug:      ${newVideo.slug}`);
  console.log(`   category:  ${newVideo.category}  (auto-inferred — verify)`);
  console.log(`   playlist:  ${newVideo.playlist || "none"}`);
  console.log(`   featured:  false  → set true if this is a featured video`);
  console.log(`   artist:    null   → add performer name if applicable`);
  console.log(`   relatedIds: []    → add related video IDs if desired`);
  console.log(`\n   Search for youtubeId: "${youtubeId}" in data/media.json\n`);
}

main();
