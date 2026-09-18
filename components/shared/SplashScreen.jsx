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
        playPromise.catch(() => {
          // Retry on user interaction or next frame
        });
      }
    }

    // Safety fallback timer: auto complete after 5s max if video ends or stalls
    fallbackTimerRef.current = setTimeout(() => {
      complete();
    }, 5000);

    return () => {
      if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video && video.duration > 0 && video.currentTime >= video.duration - 0.25) {
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
          background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.9) 100%)",
        }}
      />

      {/* Cloudflare Video with Direct Native Controls & Fallback */}
      <video
        ref={videoRef}
        src="https://media.myriadarts.in/splash/splash-intro.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        onEnded={complete}
        onError={() => {
          const video = videoRef.current;
          if (video && !video.src.includes("/videos/splash/splash-intro-faststart.mp4")) {
            video.src = "/videos/splash/splash-intro-faststart.mp4";
            video.load();
            video.play().catch(() => complete());
          } else {
            complete();
          }
        }}
        className="w-full max-w-4xl rounded-2xl shadow-2xl object-cover pointer-events-none relative z-20 opacity-100"
      >
        <source src="https://media.myriadarts.in/splash/splash-intro.mp4" type="video/mp4" />
        <source src="/videos/splash/splash-intro-faststart.mp4" type="video/mp4" />
      </video>

      {/* Skip indicator */}
      <div className="absolute bottom-6 right-6 text-white/50 text-[10px] uppercase tracking-widest font-sans pointer-events-none z-30">
        Click anywhere to skip
      </div>
    </motion.div>
  );
}
