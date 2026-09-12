// lib/media-utils.js

export function formatViews(viewCount) {
  if (!viewCount) return "0 views";
  const num = parseInt(viewCount, 10);
  if (isNaN(num)) return "0 views";
  
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M views";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K views";
  }
  return num.toLocaleString() + " views";
}

export function formatDuration(iso8601) {
  if (!iso8601) return "";
  const match = iso8601.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return "";
  const h = parseInt(match[1] || "0");
  const m = parseInt(match[2] || "0");
  const s = parseInt(match[3] || "0");
  const ss = String(s).padStart(2, "0");
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${ss}`;
  return `${m}:${ss}`;
}

export function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function buildEmbedUrl(youtubeId) {
  if (!youtubeId) return "";
  return `https://www.youtube.com/embed/${youtubeId}`;
}

export function truncateDescription(text, maxLength = 120) {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  // Try to truncate at word boundary
  const sub = text.substring(0, maxLength);
  const lastSpace = sub.lastIndexOf(" ");
  if (lastSpace > 0) {
    return sub.substring(0, lastSpace) + "...";
  }
  return sub + "...";
}

export const formatDurationDisplay = formatDuration;
