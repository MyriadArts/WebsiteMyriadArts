"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen({ onComplete }) {
  const videoRef = useRef(null);
  const fallbackTimerRef = useRef(null);
  const hasCompleted = useRef(false);

  const [isVideoReady, setIsVideoReady] = useState(false);
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

  // 1. Fallback timer (safeguard in case user has extreme latency)
  useEffect(() => {
    document.body.style.overflow = "hidden";

    // If video hasn't loaded after 4.5s, dismiss smoothly to avoid blocking the user
    fallbackTimerRef.current = setTimeout(() => {
      complete();
    }, 4500);

    return () => {
      if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 2. Handle video stream events
  const handleCanPlay = () => {
    setIsVideoReady(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback: dismiss quickly
        setTimeout(() => complete(), 600);
      });
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video && video.duration > 0 && video.currentTime >= video.duration - 0.2) {
      complete();
    }
  };

  return (
    <motion.div
      onClick={complete}
      className={`fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden cursor-pointer ${
        isDismissing ? "pointer-events-none" : ""
      }`}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Radial Vignette Backdrop */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      {/* Layer 1: Ambient Brand Placeholder / Pulsing Glow while connecting */}
      <AnimatePresence>
        {!isVideoReady && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Subtle luxury brand logo glow */}
            <motion.div
              animate={{
                scale: [0.98, 1.02, 0.98],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="flex flex-col items-center gap-4"
            >
              <div className="w-16 h-16 rounded-full border border-red-600/30 flex items-center justify-center bg-black/40 backdrop-blur-md">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Layer 2: Cloudflare R2 Video (Fades in seamlessly once buffered) */}
      <motion.video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        onCanPlayThrough={handleCanPlay}
        onLoadedData={handleCanPlay}
        onTimeUpdate={handleTimeUpdate}
        onEnded={complete}
        className="w-full max-w-4xl rounded-2xl shadow-2xl object-cover pointer-events-none relative z-20"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{
          opacity: isVideoReady ? 1 : 0,
          scale: isVideoReady ? 1 : 0.97,
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <source
          src="https://pub-de5dfcf82d8f4854a79642f955c48806.r2.dev/splash/splash-intro.mp4"
          type="video/mp4"
        />
      </motion.video>

      {/* Skip indicator */}
      <div className="absolute bottom-6 right-6 text-white/40 text-[10px] uppercase tracking-widest font-sans pointer-events-none z-30">
        Click anywhere to skip
      </div>
    </motion.div>
  );
}
