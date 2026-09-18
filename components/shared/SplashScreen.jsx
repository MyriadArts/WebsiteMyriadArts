"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

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

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsVideoReady(true);
          })
          .catch(() => {
            // If primary URL fails, fallback to local video
            if (typeof window !== "undefined" && !video.src.includes("/videos/splash/splash-intro-faststart.mp4")) {
              video.src = "/videos/splash/splash-intro-faststart.mp4";
              video.load();
              video.play().then(() => setIsVideoReady(true)).catch(() => {});
            }
          });
      }
    }

    // Safety fallback: dismiss smoothly after 4.5s max
    fallbackTimerRef.current = setTimeout(() => {
      complete();
    }, 4500);

    return () => {
      if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleVideoPlaying = () => {
    setIsVideoReady(true);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video && video.duration > 0 && video.currentTime >= video.duration - 0.2) {
      complete();
    }
  };

  const handleVideoError = () => {
    const video = videoRef.current;
    if (video && !video.src.includes("/videos/splash/splash-intro-faststart.mp4")) {
      video.src = "/videos/splash/splash-intro-faststart.mp4";
      video.load();
      video.play().then(() => setIsVideoReady(true)).catch(() => complete());
    } else {
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
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Radial Vignette Backdrop */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      {/* High-Performance Direct Video Element */}
      <video
        ref={videoRef}
        src="https://media.myriadarts.in/splash/splash-intro.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        onPlay={handleVideoPlaying}
        onPlaying={handleVideoPlaying}
        onCanPlay={handleVideoPlaying}
        onLoadedData={handleVideoPlaying}
        onTimeUpdate={handleTimeUpdate}
        onEnded={complete}
        onError={handleVideoError}
        className={`w-full max-w-4xl rounded-2xl shadow-2xl object-cover pointer-events-none relative z-20 transition-all duration-500 ease-out ${
          isVideoReady ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      />

      {/* Skip indicator */}
      <div className="absolute bottom-6 right-6 text-white/40 text-[10px] uppercase tracking-widest font-sans pointer-events-none z-30">
        Click anywhere to skip
      </div>
    </motion.div>
  );
}
