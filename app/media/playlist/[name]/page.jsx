export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { getByPlaylist } from "../../../../lib/media";

export default async function PlaylistRedirectPage({ params }) {
  const resolvedParams = await params;
  const playlistName = decodeURIComponent(resolvedParams.name);
  
  // Fetch all videos in this playlist
  const videos = getByPlaylist(playlistName);
  
  if (!videos || videos.length === 0) {
    // If no videos found for this playlist, redirect to media home
    redirect("/media");
  }
  
  // Get the first video to start playing
  const firstVideo = videos[0];
  
  // Redirect to the video detail page.
  // We append ?list=PLAYLIST_NAME so the video page knows to display the playlist queue
  redirect(`/media/${firstVideo.slug}?list=${encodeURIComponent(playlistName)}`);
}
