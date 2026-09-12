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
  const [showSplash, setShowSplash] = useState(true);
  
  console.log("[PAGE] Render — showSplash =", showSplash);

  useEffect(() => {
    const sessionFlag = sessionStorage.getItem("myriad-splash-v3");
    console.log("[PAGE] mounted");
    console.log("[PAGE] session flag =", sessionFlag);
    console.log("[PAGE] showSplash =", showSplash);

    if (sessionFlag) {
      console.log("[PAGE] setting showSplash false because session flag exists on mount");
      setShowSplash(false);
    }
  }, [showSplash]);

  const handleSplashComplete = () => {
    console.log("[PAGE] setting session flag to 'true'");
    sessionStorage.setItem("myriad-splash-v3", "true");
    console.log("[PAGE] setting showSplash false because handleSplashComplete fired");
    setShowSplash(false);
  };

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