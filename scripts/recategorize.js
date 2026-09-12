// scripts/recategorize.js
// ──────────────────────────────────────────────────────────────────────────────
// Post-migration enrichment pass.
//
// Problem: yt-dlp channel fetch only returns flat buckets ("CALAKAR - Videos",
// "CALAKAR - Shorts") — not individual playlist membership. This means the
// category inference fell back to title-based rules, causing ~83% of videos
// to land in "performances" (the default fallback).
//
// This script re-classifies every video using a much richer set of title-,
// description-, and tag-based patterns derived from inspecting the actual
// channel content.
//
// Usage:
//   node scripts/recategorize.js
//   (reads data/media.json, writes data/media.json in place)
// ──────────────────────────────────────────────────────────────────────────────

import { readFileSync, writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const MEDIA_JSON = path.join(ROOT, "data", "media.json");

// ── Classification rules ──────────────────────────────────────────────────────
// Order matters — first match wins.
// Each rule: [test function, category slug]

const RULES = [
  // ── Folk & Heritage ──────────────────────────────────────────────────────────
  // Vaarsa is the ONLY folk-heritage series. Tightly scoped to avoid
  // over-classifying general arts content that mentions "folk".
  [
    (v) =>
      /\bvaarsa\b/i.test(v.title) ||
      /reliving.*folk art of india/i.test(v.title) ||
      /folk art of india/i.test(v.title),
    "folk-heritage",
  ],

  // ── Podcasts ──────────────────────────────────────────────────────────────────
  // Long-form audio-first content. IMPORTANT: Shorts that *mention* podcasts
  // ("Full Podcast on YouTube") are promo clips, not podcasts — exclude them.
  [
    (v) => {
      const isShort = v.durationSeconds > 0 && v.durationSeconds < 90;
      const isPromo =
        /full podcast on youtube|watch full.*channel|full episode on channel/i.test(v.title);
      if (isShort || isPromo) return false;

      return (
        /\bpodcast\b/i.test(v.title) ||
        // Marathi podcast indicators (these are full episodes)
        /थेट मनातून|thet manatun/i.test(v.title) ||
        // Potbhar Gappa is a long conversation/food show
        /potbhar gappa/i.test(v.title) ||
        // Named episode formats
        /ep\.\s*\d+\s*\|/i.test(v.title) ||
        v.tags.some((t) => /\bpodcast\b/i.test(t))
      );
    },
    "podcasts",
  ],

  // ── Conversations ─────────────────────────────────────────────────────────────
  // Video-first interviews, talks, and discussion formats.
  // Includes Marathi titles from Can We Talk, Unfiltered with Shreyas.
  [
    (v) => {
      const t = v.title;
      const isShort = v.durationSeconds > 0 && v.durationSeconds < 90;
      if (isShort) return false;
      return (
        /^in conversation with/i.test(t) ||
        /\bcan we talk\b/i.test(t) ||
        /unfiltered with shreyas/i.test(t) ||
        /संवाद with/i.test(t) ||
        /in conversation/i.test(t) ||
        // Named guest interview patterns
        /with (milind|ansha|anisha|nimish|kshitij|megha|sangram)/i.test(t) ||
        // Long-form talks (>20 min) that aren't dance/folk/podcast
        (v.durationSeconds > 1200 &&
          !/\bdance\b|perform|nachle|vaarsa|folk|\bpodcast\b/i.test(t))
      );
    },
    "conversations",
  ],

  // ── Behind The Scenes ────────────────────────────────────────────────────────
  [
    (v) =>
      /thet manatun/i.test(v.title) ||
      /no filter/i.test(v.title) ||
      /behind.*scene|\bbts\b/i.test(v.title) ||
      /home tour/i.test(v.title) ||
      /\bunfiltered\b/i.test(v.title) ||
      /थेट मनातून/i.test(v.title) ||
      /exclusive.*tour/i.test(v.title),
    "behind-the-scenes",
  ],


  // ── Behind The Scenes ────────────────────────────────────────────────────────
  [
    (v) =>
      /thet manatun/i.test(v.title) ||
      /no filter/i.test(v.title) ||
      /behind.*scene|bts\b/i.test(v.title) ||
      /home tour/i.test(v.title) ||
      /unfiltered/i.test(v.title) ||
      /थेट मनातून/i.test(v.title),
    "behind-the-scenes",
  ],

  // ── Performances ─────────────────────────────────────────────────────────────
  // Dance performances, competitions, showcases
  [
    (v) =>
      /aaja nachle/i.test(v.title) ||
      /aaja nachle/i.test(v.playlist || "") ||
      /chance pe dance/i.test(v.title) ||
      /dance antakshari/i.test(v.title) ||
      /dance performance/i.test(v.title) ||
      /dance cover/i.test(v.title) ||
      /\bdance\b/i.test(v.title) ||
      /bollywood.*perform/i.test(v.title) ||
      /classical.*dance|dance.*classical/i.test(v.title) ||
      /kathak|bharatanatyam|kathakali/i.test(v.title) ||
      v.tags.some((t) => /\bdance\b/i.test(t)),
    "performances",
  ],

  // ── Special Projects ──────────────────────────────────────────────────────────
  // Collaborations, live events, showreels, one-offs
  [
    (v) =>
      /showreel/i.test(v.title) ||
      /live\s*\|/i.test(v.title) ||
      /utsav/i.test(v.title) ||
      /\bcollaboration\b/i.test(v.title),
    "special-projects",
  ],
];

// Default fallback — applied when no rule matches
const DEFAULT_CATEGORY = "performances";

// ── Classifier ────────────────────────────────────────────────────────────────

// Playlists that provide authoritative category signals.
// Videos whose playlist matches these are NOT reclassified — their
// category was set correctly at migration time by inferCategory().
const AUTHORITATIVE_PLAYLISTS = [
  "Vaarsa - Reliving The Folk Art of India",
  "Aaja Nachle - Bollywood & Freestyle",
  "Chance Pe Dance",
  "Dance Antakshari",
  "Can We Talk",
  "Unfiltered with Shreyas",
  "Potbhar Gappa",
  "Podcast",
  "Mini Podcast",
  "Thet Manatun (No filter)",
];

function isPlaylistConfirmed(video) {
  return AUTHORITATIVE_PLAYLISTS.some(
    (name) => video.playlist && video.playlist.includes(name.slice(0, 10))
  );
}

function classify(video) {
  // If category was set authoritatively by a named playlist, preserve it
  if (isPlaylistConfirmed(video)) return video.category;

  // Otherwise apply title/description/tag rules
  for (const [test, category] of RULES) {
    try {
      if (test(video)) return category;
    } catch {
      continue;
    }
  }
  return DEFAULT_CATEGORY;
}

// ── Main ──────────────────────────────────────────────────────────────────────

function main() {
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("  Myriad Arts — Category Re-enrichment Pass");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  const data = JSON.parse(readFileSync(MEDIA_JSON, "utf-8"));
  const before = {};
  const after = {};

  for (const video of data.videos) {
    // Count before
    before[video.category] = (before[video.category] || 0) + 1;

    // Reclassify
    video.category = classify(video);

    // Count after
    after[video.category] = (after[video.category] || 0) + 1;
  }

  // Update breakdown in meta
  data.meta.breakdown = after;
  data.generatedAt = new Date().toISOString();

  writeFileSync(MEDIA_JSON, JSON.stringify(data, null, 2), "utf-8");

  console.log("── Before ──────────────────────────────────");
  for (const [cat, count] of Object.entries(before).sort((a,b) => b[1]-a[1])) {
    console.log(`   ${cat.padEnd(22)} ${count}`);
  }
  console.log("\n── After ───────────────────────────────────");
  for (const [cat, count] of Object.entries(after).sort((a,b) => b[1]-a[1])) {
    console.log(`   ${cat.padEnd(22)} ${count}`);
  }
  console.log("\n✅  Recategorization complete\n");
  console.log("Review any remaining 'performances' entries that look wrong");
  console.log("and manually set their category in data/media.json.\n");
}

main();
