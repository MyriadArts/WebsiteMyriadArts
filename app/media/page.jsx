export const dynamic = "force-dynamic";

import React from "react";
import MediaGalleryHero from "../../components/media/landing/MediaGalleryHero";
import DigitalPresenceGrid from "../../components/media/landing/DigitalPresenceGrid";
import LandingCTA from "../../components/media/landing/LandingCTA";
import Footer from "../../components/shared/Footer";
import VaarsaAtmosphericBackground from "../../components/shared/VaarsaAtmosphericBackground";
import { getAllVideos, getAllPlaylists } from "../../lib/media";

export default function MediaLandingPage() {
  const videos = getAllVideos();
  const allPlaylists = getAllPlaylists();

  return (
    <main className="relative z-10 pt-0 bg-[#050505] overflow-x-clip">
      <VaarsaAtmosphericBackground fixed={true} />
      <MediaGalleryHero videos={videos} />
      <DigitalPresenceGrid allPlaylists={allPlaylists} />
      <LandingCTA />
      <Footer />
    </main>
  );
}

