// app/api/media/sync/route.js
// ──────────────────────────────────────────────────────────────────────────────
// Vercel Serverless Route Handler for Real-Time YouTube Media Synchronization
//
// Automatically called by Vercel Cron or on-demand:
//   GET  /api/media/sync
//   POST /api/media/sync
// ──────────────────────────────────────────────────────────────────────────────

import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { loadMediaData } from "../../../../lib/media";
import { refreshLiveMediaCache } from "../../../../lib/media-live";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const baseData = loadMediaData();
    const result = await refreshLiveMediaCache(baseData);

    // Invalidate Next.js cache so the UI updates immediately
    try {
      revalidateTag("youtube-media");
      revalidatePath("/media");
      revalidatePath("/media/library");
    } catch (revalErr) {
      // Ignore cache revalidation errors if running outside Next.js request context
    }

    return NextResponse.json({
      success: true,
      message: "YouTube media synchronized successfully.",
      timestamp: new Date().toISOString(),
      totalVideos: result.totalVideos || result.videos?.length || 0,
      newVideosAdded: result._newVideosAdded || 0,
    });
  } catch (error) {
    console.error("[api/media/sync] Sync error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to synchronize YouTube media.",
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  return GET(request);
}
