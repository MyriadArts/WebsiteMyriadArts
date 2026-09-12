export const dynamic = "force-dynamic";

import MediaHero from "../../../components/media/MediaHero";
import LatestUploads from "../../../components/media/LatestUploads";
import FeaturedCollection from "../../../components/media/FeaturedCollection";
import CuratedCollections from "../../../components/media/CuratedCollections";
import CommunitySection from "../../../components/media/CommunitySection";
import Footer from "../../../components/shared/Footer";
import { getFeaturedVideos, getLatestVideos, getAllPlaylists } from "../../../lib/media";

export default function MediaPage() {
  const featured = getFeaturedVideos();
  const featuredVideos = featured.length > 0 ? featured.slice(0, 5) : getLatestVideos(5);
  const latestVideos = getLatestVideos(12);
  const allPlaylists = getAllPlaylists();

  return (
    <main className="relative z-10 pt-0">
      {/* 1. Hero */}
      <MediaHero videos={featuredVideos} />

      {/* 2. Latest Uploads */}
      <LatestUploads videos={latestVideos} />

      {/* 3. Calakar Essentials / Featured Collection */}
      <FeaturedCollection />

      {/* 4. Curated Series & Playlists */}
      <CuratedCollections allPlaylists={allPlaylists} />

      {/* 6. Footer */}
      <Footer />
    </main>
  );
}
