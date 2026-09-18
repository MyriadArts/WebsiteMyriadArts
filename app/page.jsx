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
  // null = hydrating, true = show splash, false = skip splash
  const [showSplash, setShowSplash] = useState(null);

  useEffect(() => {
    // Check sessionStorage (shows once per session in production)
    const alreadySeen = sessionStorage.getItem("myriad_splash_seen");
    setShowSplash(alreadySeen ? false : true);
  }, []);

  const handleSplashComplete = () => {
    sessionStorage.setItem("myriad_splash_seen", "true");
    setShowSplash(false);
  };

  // While checking sessionStorage on mount, render null to avoid hydration flicker
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
