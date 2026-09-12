export const dynamic = "force-dynamic";
export const dynamicParams = true;

import { notFound } from "next/navigation";
import Link from "next/link";
import BackButton from "../../../components/media/detail/BackButton";
import PlaylistQueue from "../../../components/media/detail/PlaylistQueue";
import { getBySlug, getRelatedVideos, getByPlaylist, generateMediaStaticParams, generateVideoMetadata, generateJsonLd } from "../../../lib/media";
import VideoPlayerHero from "../../../components/media/detail/VideoPlayerHero";
import VideoMetadata from "../../../components/media/detail/VideoMetadata";
import VideoActions from "../../../components/media/detail/VideoActions";
import VideoDescription from "../../../components/media/detail/VideoDescription";
import VideoTags from "../../../components/media/detail/VideoTags";
import ArtistCard from "../../../components/media/detail/ArtistCard";
import VideoRecommendations from "../../../components/media/detail/VideoRecommendations";
import Footer from "../../../components/shared/Footer";
import VaarsaAtmosphericBackground from "../../../components/shared/VaarsaAtmosphericBackground";

export function generateStaticParams() {
  return generateMediaStaticParams();
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  return generateVideoMetadata(resolvedParams.slug);
}

export default async function VideoDetailPage({ params, searchParams }) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const video = getBySlug(resolvedParams.slug);

  if (!video) {
    notFound();
  }

  // Fetch playlist videos ONLY if this video was accessed from a playlist context
  const isPlaylistContext = resolvedSearchParams?.list && video.playlist && resolvedSearchParams.list === video.playlist;
  const playlistVideos = isPlaylistContext ? getByPlaylist(video.playlist) : [];

  // Build ViewModel
  const viewModel = {
    hero: video,
    metadata: video,
    actions: video,
    description: video,
    tags: video,
    artist: video,
    recommendations: getRelatedVideos(video, 12),
  };

  const jsonLd = generateJsonLd(video);

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <main className="relative isolate pt-[78px] md:pt-[90px] bg-[#0f0f0f] min-h-screen overflow-x-clip">
        <VaarsaAtmosphericBackground fixed={true} />
        {/* Constrained container for ALL content (YouTube style) */}
        <div className="max-w-[1800px] mx-auto px-4 md:px-[6vw] pt-[16px] pb-[80px]">
          {/* Back Button */}
          <div className="mb-4">
            <BackButton />
          </div>
          
          <div className="flex flex-col lg:flex-row gap-[24px]">
            {/* Left Column: Video + Details (approx 70% width) */}
            <div className="lg:w-[70%] flex flex-col gap-[20px]">
              
              {/* Video Player */}
              <div className="rounded-xl overflow-hidden shadow-2xl bg-black">
                <VideoPlayerHero video={viewModel.hero} />
              </div>

              {/* Title & Metadata */}
              <div className="mt-2">
                <VideoMetadata video={viewModel.metadata} />
              </div>

              {/* Artist Card & Actions Row */}
              <div className="flex flex-row items-center justify-between gap-2 md:gap-6 py-4 border-b border-white/10 pb-6 w-full">
                <ArtistCard video={viewModel.artist} />
                <VideoActions video={viewModel.actions} />
              </div>

              {/* Description & Tags */}
              <div className="mt-2">
                <VideoDescription video={viewModel.description}>
                  <VideoTags video={viewModel.tags} />
                </VideoDescription>
              </div>
            </div>

            {/* Right Column: Recommendations (approx 30% width) */}
            <div className="lg:w-[30%] flex flex-col gap-[24px]">
              {video.playlist && playlistVideos.length > 0 && (
                <PlaylistQueue 
                  playlist={video.playlist} 
                  videos={playlistVideos} 
                  currentVideoId={video.id} 
                />
              )}
              <VideoRecommendations recommendations={viewModel.recommendations} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
