"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SplashScreen from "../components/shared/SplashScreen";
import GlobalBackground from "../components/shared/GlobalBackground";
import HeroSection from "../components/home/HeroSection";
import MissionSection from "../components/home/MissionSection";
import CategorySection from "../components/home/CategorySection";
import MediaShowcase from "../components/home/MediaShowcase";
import EventDescriptionSection from "../components/home/EventDescriptionSection";
import PartnersSection from "../components/home/PartnersSection";
import Footer from "../components/shared/Footer";

export default function HomePage() {
  // null = not yet determined (avoids SSR/hydration mismatch).
  // true = show splash.  false = skip splash.
  const [showSplash, setShowSplash] = useState(null);

  // Run ONCE on mount - read sessionStorage synchronously on the client only.
  // The empty dependency array [] ensures this runs exactly once on mount.
  useEffect(() => {
    const alreadySeen = sessionStorage.getItem("myriad-splash-v3");
    setShowSplash(alreadySeen ? false : true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSplashComplete = () => {
    sessionStorage.setItem("myriad-splash-v3", "true");
    setShowSplash(false);
  };

  // While the session check hasn't run yet (null), render nothing.
  // This prevents any flash of incorrect state before client hydration.
  if (showSplash === null) return null;

  return (
    <>
      <AnimatePresence>
        {showSplash && (
          <SplashScreen onComplete={handleSplashComplete} />
        )}
      </AnimatePresence>

      <motion.main
        className="bg-transparent text-white selection:bg-[#c1121f] selection:text-white relative isolate"
        initial={{ opacity: 0 }}
        animate={{ opacity: showSplash ? 0 : 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <GlobalBackground />
        <div className="relative w-full z-0">
          <HeroSection />
          <MissionSection />
        </div>
        <CategorySection />
        <MediaShowcase />
        <EventDescriptionSection />
        <PartnersSection />
        <Footer />
      </motion.main>
    </>
  );
}
