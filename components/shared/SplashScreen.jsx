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
    clearTimeout(fallbackTimerRef.current);
    document.body.style.overflow = "";

    if (videoRef.current) {
      try {
        videoRef.current.pause();
      } catch (e) { }
    }

    onComplete?.();
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const video = videoRef.current;

    if (video) {
      const handleTimeUpdate = () => {
        if (video.duration > 0 && video.currentTime >= video.duration - 0.25) {
          complete();
        }
      };

      const handleEnded = () => {
        complete();
      };

      video.addEventListener("timeupdate", handleTimeUpdate);
      video.addEventListener("ended", handleEnded);

      video.play().catch(() => {
        // If autoplay is blocked by browser, dismiss after short delay
        setTimeout(() => complete(), 800);
      });
    }

    // 4.5s Safety Fallback Timer so splash screen never hangs
    fallbackTimerRef.current = setTimeout(() => {
      complete();
    }, 4500);

    return () => {
      clearTimeout(fallbackTimerRef.current);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      onClick={complete}
      className={`fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden cursor-pointer ${isDismissing ? "pointer-events-none" : ""
        }`}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.72) 100%)",
        }}
      />
      <motion.video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        onEnded={complete}
        className="w-[100%] max-w-4xl rounded-2xl shadow-2xl object-cover pointer-events-none"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <source src="https://pub-de5dfcf82d8f4854a79642f955c48806.r2.dev/splash/splash-intro.mp4" type="video/mp4" />
      </motion.video>

      {/* Skip indicator */}
      <div className="absolute bottom-6 right-6 text-white/40 text-[10px] uppercase tracking-widest font-sans pointer-events-none">
        Click anywhere to skip
      </div>
    </motion.div>
  );
}
