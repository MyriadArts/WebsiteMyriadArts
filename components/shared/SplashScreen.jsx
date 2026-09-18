"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function SplashScreen({ onComplete }) {
  const videoRef = useRef(null);
  const fallbackTimerRef = useRef(null);
  const hasCompleted = useRef(false);
  const [isDismissing, setIsDismissing] = useState(false);

  const complete = () => {
    if (hasCompleted.current) return;
    hasCompleted.current = true;
    setIsDismissing(true);

    if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current);
    document.body.style.overflow = "";

    if (videoRef.current) {
      try {
        videoRef.current.pause();
      } catch (e) {}
    }

    onComplete?.();
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }

    // Safety fallback only if video is completely blocked/unresponsive for 15s
    fallbackTimerRef.current = setTimeout(() => {
      complete();
    }, 15000);

    return () => {
      if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleVideoPlaying = () => {
    // Clear initial load fallback timer once video is actively playing smoothly
    if (fallbackTimerRef.current) {
      clearTimeout(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }
  };

  const handleVideoError = () => {
    const video = videoRef.current;
    if (video && !video.src.includes("https://media.myriadarts.in/splash/splash-intro.mp4")) {
      video.src = "https://media.myriadarts.in/splash/splash-intro.mp4";
      video.load();
      video.play().catch(() => complete());
    } else {
      complete();
    }
  };

  return (
    <motion.div
      onClick={complete}
      className={`fixed inset-0 z-[100000] bg-black flex items-center justify-center overflow-hidden cursor-pointer ${
        isDismissing ? "pointer-events-none" : ""
      }`}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Radial Vignette Backdrop */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.9) 100%)",
        }}
      />

      {/* Direct Native Faststart Video - Plays until 100% complete (onEnded) */}
      <video
        ref={videoRef}
        src="/videos/splash/splash-intro-faststart.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        onPlay={handleVideoPlaying}
        onPlaying={handleVideoPlaying}
        onEnded={complete}
        onError={handleVideoError}
        className="w-full max-w-4xl rounded-2xl shadow-2xl object-cover pointer-events-none relative z-20 opacity-100"
      >
        <source src="/videos/splash/splash-intro-faststart.mp4" type="video/mp4" />
        <source src="https://media.myriadarts.in/splash/splash-intro.mp4" type="video/mp4" />
      </video>

      {/* Skip indicator */}
      <div className="absolute bottom-6 right-6 text-white/50 text-[10px] uppercase tracking-widest font-sans pointer-events-none z-30">
        Click anywhere to skip
      </div>
    </motion.div>
  );
}
