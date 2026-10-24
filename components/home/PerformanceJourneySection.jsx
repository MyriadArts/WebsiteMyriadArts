"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import VaarsaAtmosphericBackground from "../shared/VaarsaAtmosphericBackground";

// ─── Local Performance Data ───────────────────────────────────────────────────
const PERFORMANCES = [
   {
    id: "duo-dance",
    title: "IIGF Performance",
    description:
      "It was a dream come true to perform in front of the stalwarts like Sudha Chandran and Megha Sampat",
    date: "Mar 2025",
    category: "Stage Performance",
    shortDesc: "It was a dream come true to perform in front of the stalwarts like Sudha Chandran and Megha Sampat",
    videoSrc: "/videos/duodance.mp4",
  },
  {
    id: "lokmat-dance",
    title: "News 18 - Performance",
    description:
      "We performed a captivating dance sequence for News 18, showcasing the rich cultural heritage of India through expressive movements and storytelling. The performance was a blend of traditional and contemporary styles, leaving the audience mesmerized.",
    date: "Aug 2025",
    category: "Folk Dance Performance",
    shortDesc: "Marathi folk dance performance for News 18, blending tradition and contemporary flair.",
    videoSrc: "/videos/newsdance.mp4",
  },
  {
    id: "Lavani-2025",
    title: "Lavani Performance",
    description:
      "Lavani is a traditional Marathi folk dance known for its powerful rhythm and expressive movements. Our Lavani performance was a vibrant display of cultural heritage, featuring colorful costumes, energetic choreography, and the soulful beats of traditional music.",
    date: "Aug 2025",
    category: "Lavani Dance",
    shortDesc: "Lavani dance performance showcasing the vibrant rhythm and expressive movements of Marathi folk culture.",
    videoSrc: "/videos/FilmForth QTTrim 2025_08_28_20_04_28.mp4",
  },
  {
    id: "airforce-performance",
    title: "Indian Air Force Invited Us",
    description:
      "We were honored to be invited by the Indian Air Force to perform at their prestigious event.",
    date: "2025",
    category: "Stage Arts",
    shortDesc: "Vasudev dance performance invited by the Indian Air Force, showcasing our artistic excellence on a grand stage.",
    videoSrc: "/videos/stage.mp4",
  },
  {
    id: "ganpati-utsav",
    title: "Ganpati Utsav",
    description:
      "A devotional and festive performance honouring Ganesh Chaturthi, blending traditional Maharashtrian folk music, dance, and cultural ritual into a joyous celebration. Myriad Arts brings the spirit of Ganpati Utsav to the stage with vibrant energy and deep cultural reverence.",
    date: "2025",
    category: "Festival Performance",
    shortDesc: "Traditional Maharashtrian folk music and dance in devotion to Ganpati Bappa.",
    videoSrc: "/videos/ganpati.mp4",
  },
   {
    id: "marathi-folk-dance",
    title: "Rotary Club - Marathi Folk Dance",
    description:
      "Marathi folk dance performance for the Rotary Club, showcasing the rich cultural heritage of Maharashtra through vibrant costumes, energetic movements, and traditional music. The performance was a celebration of community, tradition, and artistic expression.",
    date: "2025",
    category: "Folk Dance Performance",
    shortDesc: "Marathi folk dance performance for the Rotary Club, showcasing the rich cultural heritage of Maharashtra through vibrant costumes, energetic movements, and traditional music.",
    videoSrc: "/videos/malhardance.mp4",
  },
  {
    id: "group-dance",
    title: "Group Dance Performance",
    description:
      "Group indian dance performance showcasing the rich cultural heritage of India through synchronized movements, vibrant costumes, and traditional music. The performance was a celebration of unity, tradition, and artistic expression.",
    category: "Group Performance",
    shortDesc: "Group indian dance performance showcasing the rich cultural heritage of India through synchronized movements, vibrant costumes, and traditional music.",
    videoSrc: "/videos/groupdance.mp4",
  },
];

// ─── Carousel constants ───────────────────────────────────────────────────────
const CARD_WIDTH = 460;
const CARD_GAP = 20;
const CARD_STEP = CARD_WIDTH + CARD_GAP;
const AUTO_SPEED = 0.55; // px/frame

// ─── Icons ────────────────────────────────────────────────────────────────────
function PlayIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-4 h-4 ml-0.5">
      <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
    </svg>
  );
}

function CalIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3 opacity-50">
      <path fillRule="evenodd" d="M4 1.75a.75.75 0 0 1 1.5 0V3h5V1.75a.75.75 0 0 1 1.5 0V3A2 2 0 0 1 14 5v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2V1.75ZM4.5 6a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7Z" clipRule="evenodd" />
    </svg>
  );
}

// ─── Video Card (optimized streaming, in-viewport playback) ───────────────────
function VideoCard({ perf, onClick, isSectionActive }) {
  const cardRef = useRef(null);
  const videoRef = useRef(null);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Monitor visibility of this specific card in the carousel track
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsNearViewport(entry.isIntersecting);
        });
      },
      {
        root: null,
        // Pre-activate cards 350px before entering screen horizontally
        rootMargin: "150px 350px 150px 350px",
        threshold: 0,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Play/pause based on section active and card in/near viewport
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    if (isSectionActive && isNearViewport) {
      vid.muted = true;
      const playPromise = vid.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsLoaded(true))
          .catch(() => {});
      }
    } else {
      vid.pause();
    }
  }, [isSectionActive, isNearViewport]);

  return (
    <article
      ref={cardRef}
      onClick={() => onClick(perf)}
      className="group relative flex flex-col border border-white/[0.07] rounded-xl overflow-hidden cursor-pointer hover:border-[#c1121f]/40 transition-all duration-500 hover:shadow-[0_8px_36px_rgba(193,18,31,0.2)] flex-shrink-0 bg-[#0d0d0d]"
      style={{ width: `${CARD_WIDTH}px` }}
      role="button"
      aria-label={`Watch ${perf.title}`}
    >
      {/* ── Video area ── */}
      <div className="relative w-full flex-shrink-0 overflow-hidden bg-[#0d0d0d]" style={{ aspectRatio: "16/9" }}>
        {/* Placeholder shimmer while video primes */}
        <div
          className={`absolute inset-0 bg-[#0d0d0d] flex items-center justify-center transition-opacity duration-500 z-0 ${
            isLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent animate-pulse" />
          <div className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center">
            <div className="w-3.5 h-3.5 border-2 border-[#c1121f] border-t-transparent rounded-full animate-spin" />
          </div>
        </div>

        {/* Video Element: loads metadata and streams only when near viewport */}
        <video
          ref={videoRef}
          src={isNearViewport || isLoaded ? perf.videoSrc : undefined}
          muted
          loop
          playsInline
          preload="metadata"
          disablePictureInPicture
          disableRemotePlayback
          onLoadedData={() => setIsLoaded(true)}
          onPlaying={() => setIsLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 z-10 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none z-20" />

        {/* Genre label */}
        <span className="absolute top-3 left-3 z-30 text-white/80 text-[10px] font-bold tracking-[0.22em] uppercase drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
          {perf.category}
        </span>

        {/* Play button */}
        <div className="absolute bottom-3 right-3 z-30">
          <div className="w-8 h-8 rounded-full bg-[#c1121f]/90 backdrop-blur-sm flex items-center justify-center shadow-lg border border-white/10 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
            <PlayIcon />
          </div>
        </div>
      </div>

      {/* ── Info strip with title + short desc ── */}
      <div className="flex flex-col px-4 py-3 bg-[#0d0d0d] gap-0.5">
        <div className="flex items-center justify-between">
          <h3 className="type-heading-md text-white group-hover:text-[#c1121f] transition-colors duration-300 leading-none">
            {perf.title}
          </h3>
          <span className="type-meta text-white/30 text-[10px] tracking-wide whitespace-nowrap flex items-center gap-1.5 ml-4 flex-shrink-0">
            <CalIcon />
            {perf.date}
          </span>
        </div>
        {perf.shortDesc && (
          <p className="text-white/40 text-[11px] leading-snug mt-1 line-clamp-1">{perf.shortDesc}</p>
        )}
      </div>
    </article>
  );
}

// ─── Infinite Auto-Scrolling Carousel (mouse/touch draggable) ─────────────────
// Uses 5× clones so the track is always wider than any viewport,
// eliminating the blank-gap that appears when totalWidth < viewport width.
function InfiniteCarousel({ items, onCardClick, isSectionActive }) {
  const CLONE_SETS = 5;
  const cloned = Array.from({ length: CLONE_SETS }, () => items).flat();
  const totalWidth = items.length * CARD_STEP;
  // Start in the middle set (set index 2 of 0–4)
  const startX = -totalWidth * 2;

  const trackRef = useRef(null);
  const xRef = useRef(startX);
  const rafRef = useRef(null);
  const isDragging = useRef(false);
  const isHovering = useRef(false);
  const dragStartX = useRef(0);
  const dragStartOffset = useRef(0);
  const velocityRef = useRef(0);
  const lastClientX = useRef(0);
  const clickGuard = useRef(false);

  const applyTransform = useCallback((x) => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${x}px)`;
    }
  }, []);

  const tick = useCallback(() => {
    if (!isDragging.current) {
      // Auto-scroll (slows significantly on hover)
      xRef.current -= isHovering.current ? AUTO_SPEED * 0.12 : AUTO_SPEED;

      // Apply drag momentum / friction
      if (Math.abs(velocityRef.current) > 0.05) {
        xRef.current += velocityRef.current;
        velocityRef.current *= 0.93;
      }
    }

    // Seamless loop — keep x inside the safe middle 3 sets [-totalWidth*3, -totalWidth]
    if (xRef.current <= -totalWidth * 3) xRef.current += totalWidth;
    if (xRef.current > -totalWidth) xRef.current -= totalWidth;

    applyTransform(xRef.current);
    rafRef.current = requestAnimationFrame(tick);
  }, [applyTransform, totalWidth]);

  useEffect(() => {
    if (!isSectionActive) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }
    applyTransform(xRef.current);
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [tick, applyTransform, isSectionActive]);

  // ── Pointer/touch handlers ──
  const onDragStart = useCallback((clientX) => {
    isDragging.current = true;
    clickGuard.current = false;
    dragStartX.current = clientX;
    dragStartOffset.current = xRef.current;
    lastClientX.current = clientX;
    velocityRef.current = 0;
    if (trackRef.current) trackRef.current.style.cursor = "grabbing";
  }, []);

  const onDragMove = useCallback((clientX) => {
    if (!isDragging.current) return;
    const delta = clientX - dragStartX.current;
    velocityRef.current = (clientX - lastClientX.current) * 0.5;
    lastClientX.current = clientX;
    xRef.current = dragStartOffset.current + delta;
    // Keep in loop range (matches tick bounds)
    if (xRef.current <= -totalWidth * 3) xRef.current += totalWidth;
    if (xRef.current > -totalWidth) xRef.current -= totalWidth;
    applyTransform(xRef.current);
    if (Math.abs(delta) > 5) clickGuard.current = true;
  }, [applyTransform, totalWidth]);

  const onDragEnd = useCallback(() => {
    isDragging.current = false;
    if (trackRef.current) trackRef.current.style.cursor = "grab";
  }, []);

  const handleCardClick = useCallback((perf) => {
    if (!clickGuard.current) onCardClick(perf);
  }, [onCardClick]);

  return (
    <div
      className="relative w-full overflow-hidden select-none"
      style={{
        maskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
      }}
      onMouseEnter={() => { isHovering.current = true; }}
      onMouseLeave={() => { isHovering.current = false; isDragging.current = false; }}
      onMouseDown={(e) => { onDragStart(e.clientX); e.preventDefault(); }}
      onMouseMove={(e) => onDragMove(e.clientX)}
      onMouseUp={onDragEnd}
      onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
      onTouchMove={(e) => { onDragMove(e.touches[0].clientX); e.preventDefault(); }}
      onTouchEnd={onDragEnd}
    >
      <div
        ref={trackRef}
        className="flex"
        style={{
          gap: `${CARD_GAP}px`,
          cursor: "grab",
          willChange: "transform",
          width: `${cloned.length * CARD_STEP}px`,
          transform: `translateX(${startX}px)`,
        }}
      >
        {cloned.map((perf, i) => (
          <VideoCard
            key={`${perf.id}-${i}`}
            perf={perf}
            onClick={handleCardClick}
            isSectionActive={isSectionActive}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────
function VideoModal({ perf, onClose }) {
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Hard-lock body scroll
  useEffect(() => {
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      window.scrollTo(0, scrollY);
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-label={`Video: ${perf.title}`}
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-lg" />

      <motion.div
        className="relative z-10 w-full max-w-5xl bg-[#0d0d0d] border border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.95)] flex flex-col md:flex-row"
        initial={{ scale: 0.93, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.93, opacity: 0, y: 20 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button — above everything, above navbar */}
        <button
          onClick={onClose}
          aria-label="Close video"
          className="absolute top-3 right-3 z-50 w-9 h-9 rounded-full bg-black/80 border border-white/15 backdrop-blur-md flex items-center justify-center text-white text-sm font-bold hover:bg-[#c1121f] hover:border-[#c1121f] transition-all duration-300 cursor-pointer shadow-2xl"
        >
          ✕
        </button>

        {/* Video player */}
        <div className="relative w-full md:w-[58%] flex-shrink-0 bg-black">
          <div className="relative w-full aspect-video">
            <video
              src={perf.videoSrc}
              controls
              autoPlay
              playsInline
              className="absolute inset-0 w-full h-full object-contain bg-black"
            />
          </div>
        </div>

        {/* Info panel */}
        <div className="flex flex-col flex-1 p-5 sm:p-6 md:p-7 overflow-y-auto max-h-[40vh] md:max-h-none justify-center">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 mb-3">
            <span className="type-meta text-[#c1121f] uppercase tracking-[0.2em] text-[9px]">
              {perf.category}
            </span>
            <span className="w-1 h-1 rounded-full bg-white/20 flex-shrink-0" />
            <span className="type-meta text-white/40 text-[9px] tracking-wide flex items-center gap-1">
              <CalIcon />
              {perf.date}
            </span>
          </div>

          <h2 className="type-heading-lg text-white mb-4 leading-snug">
            {perf.title}
          </h2>

          <div className="w-10 h-[1.5px] bg-[#c1121f]/50 mb-4 flex-shrink-0" />

          <p className="type-body-sm text-white/60 leading-relaxed">
            {perf.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function PerformanceJourneySection() {
  const sectionRef = useRef(null);
  const isSectionInView = useInView(sectionRef, { margin: "300px 0px" });
  const headingRef = useRef(null);
  const isHeadingInView = useInView(headingRef, { once: true, margin: "-80px" });
  const [selectedPerf, setSelectedPerf] = useState(null);

  return (
    <>
      <section
        ref={sectionRef}
        id="performance-journey"
        className="relative w-full bg-[#050505] py-16 md:py-20 overflow-hidden isolate"
      >
        <VaarsaAtmosphericBackground />

        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#050505] to-transparent pointer-events-none z-10" />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none z-10" />

        <div
          className="absolute left-[5%] top-[30%] w-[35vw] h-[35vw] rounded-full blur-[150px] opacity-[0.05] pointer-events-none"
          style={{ background: "radial-gradient(circle, #c1121f 0%, transparent 70%)" }}
        />

        <div className="relative z-20 w-full">

          {/* ── Header (contained) ── */}
          <div className="w-full max-w-[90rem] mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
            <div ref={headingRef} className="mb-10 md:mb-12">

              <motion.h2
                className="type-heading-xl text-white mb-3"
                initial={{ opacity: 0, y: 24 }}
                animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                Our <span className="text-[#c1121f]">Performances</span>
              </motion.h2>

              <motion.p
                className="type-body-md text-white/50 max-w-xl"
                initial={{ opacity: 0, y: 18 }}
                animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                Drag to browse · Click any performance to watch the full video.
              </motion.p>

              <motion.div
                className="mt-5 w-12 h-[1.5px] bg-[#c1121f]"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={isHeadingInView ? { scaleX: 1, opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: "left" }}
              />
            </div>
          </div>

          {/* ── Infinite Carousel (full-bleed) ── */}
          <InfiniteCarousel
            items={PERFORMANCES}
            onCardClick={setSelectedPerf}
            isSectionActive={isSectionInView}
          />

        </div>
      </section>

      <AnimatePresence>
        {selectedPerf && (
          <VideoModal
            perf={selectedPerf}
            onClose={() => setSelectedPerf(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
