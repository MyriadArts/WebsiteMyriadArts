"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRouter } from "next/navigation";
import VaarsaAtmosphericBackground from "../shared/VaarsaAtmosphericBackground";

const categories = [
  {
    title: "Performances",
    subtitle: "Classical & Contemporary Masterclasses",
    details: "Intensive movement sessions shaped to balance expression, precision, and stage presence.",
    image: "/images/home/category-performance-cover.jpg",
    video: "https://media.myriadarts.in/home/category-performances.mp4",
    link: "/services#performances"
  },
  {
    title: "Workshops & Classes",
    subtitle: "Learn hands-on from industry masters",
    details: "Hands-on sessions built around technique, creative direction, and practical performance feedback.",
    image: "/images/home/category-workshop-cover.jpg",
    video: "https://media.myriadarts.in/home/category-workshops.mp4",
    link: "/services#workshops"
  },
  {
    title: "Events & Production",
    subtitle: "Live performances and breathtaking showcases",
    details: "Curated live moments designed to feel immersive, polished, and emotionally resonant.",
    image: "/images/home/category-events-cover.jpg",
    video: "https://media.myriadarts.in/vaarsa/vaarsa-showcase.mp4",
    link: "/services#events"
  },
  {
    title: "Music",
    subtitle: "The rhythm and soul behind the stage",
    details: "Sound-led storytelling that supports atmosphere, pacing, and the cinematic flow of the experience.",
    image: "/images/home/category-music-performance.jpg",
    video: "https://media.myriadarts.in/home/music-highlight.mp4",
    link: "/services#music"
  }
];

export default function CategorySection() {
  const router = useRouter();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [scrollFinished, setScrollFinished] = useState(false);

  const sectionRef = useRef(null);
  const videosRef = useRef([]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    mass: 1.5,
    stiffness: 50,
    damping: 20,
    restDelta: 0.001
  });

  // Hover unlocks at 45% scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      setScrollFinished(v >= 0.45);
      if (v < 0.45 && hoveredIndex !== null) {
        setHoveredIndex(null);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, hoveredIndex]);

  // High performance: Only play the video that is actively hovered!
  useEffect(() => {
    categories.forEach((_, idx) => {
      const v = videosRef.current[idx];
      if (!v) return;
      if (hoveredIndex === idx) {
        const playPromise = v.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
      } else {
        v.pause();
      }
    });
  }, [hoveredIndex]);

  /* =========================================================================
     CONTINUOUS HOME PAGE TIMELINE
  ========================================================================= */

  const containerScale = useTransform(smoothProgress, [0, 0.35], [1.05, 0.96]);
  const containerGapRaw = useTransform(smoothProgress, [0.05, 0.45], [0, 20]);
  const gapCSSVar = useTransform(containerGapRaw, g => `${g}px`);
  const cardRadius = useTransform(smoothProgress, [0.05, 0.45], [0, 16]);
  const overlayOpacity = useTransform(smoothProgress, [0.05, 0.45], [0.3, 0.75]);

  const headingOpacity = 1;
  const headingY = 0;

  const getPanelTransforms = () => {
    const z = 0;
    const y = 0;
    const rotateY = 0;
    const shadowOpacity = useTransform(smoothProgress, [0.15, 0.45], [0.1, 0.4]);
    const shadowString = useTransform(shadowOpacity, o => `0 20px 40px rgba(0,0,0,${o})`);
    return { z, y, rotateY, shadowString };
  };

  return (
    <section id="categories" className="relative w-full bg-[#050505] pb-12">
      <div ref={sectionRef} className="relative h-[180vh] md:h-[220vh] w-full">
        <div className="sticky top-0 min-h-screen md:h-screen w-full overflow-hidden flex flex-col items-center justify-center isolate bg-[#050505] py-8 md:py-0" style={{ perspective: 2400 }}>
          <VaarsaAtmosphericBackground />

          {/* Top black gradient overlay for smooth merge with Our Story */}
          <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#050505] via-[#050505]/90 to-transparent pointer-events-none z-20" />

          <motion.div
            className="relative z-[30] w-full max-w-7xl flex flex-col items-center justify-center px-4 md:px-12 origin-center"
            style={{ scale: containerScale }}
            onClick={() => scrollFinished && setHoveredIndex(null)}
          >

            <motion.div
              className="w-full flex flex-col items-center justify-center mb-4 md:mb-8 pointer-events-none"
              style={{ opacity: headingOpacity, y: headingY }}
            >
              <motion.div
                animate={{
                  opacity: scrollFinished && hoveredIndex !== null ? 0.2 : 1
                }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center text-center"
              >
                <h2 className="type-heading-xl text-white drop-shadow-2xl">
                  <span className="text-white">What We</span> <span className="text-[#c1121f]">Offer</span>
                </h2>
              </motion.div>
            </motion.div>

            <motion.div
              className="w-full h-[65vh] sm:h-[70vh] md:h-[60vh] flex flex-col md:flex-row"
              style={{
                gap: gapCSSVar,
                "--gap": gapCSSVar,
                containerType: "inline-size"
              }}
              onMouseLeave={() => scrollFinished && setHoveredIndex(null)}
            >
              {categories.map((category, idx) => {
                const trans = getPanelTransforms(idx);
                const isHovered = hoveredIndex === idx;
                const isAnyHovered = hoveredIndex !== null;

                return (
                  <motion.article
                    key={category.title}
                    onMouseEnter={() => {
                      if (typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches && scrollFinished) {
                        setHoveredIndex(idx);
                      }
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (scrollFinished) {
                        if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
                          setHoveredIndex(idx);
                        } else {
                          setHoveredIndex((prev) => (prev === idx ? null : idx));
                        }
                      }
                    }}
                    className={`relative h-full w-full min-w-0 overflow-hidden ${scrollFinished ? "cursor-pointer pointer-events-auto" : "cursor-default pointer-events-none"
                      }`}
                    style={{
                      borderRadius: cardRadius,
                      z: trans.z,
                      y: trans.y,
                      rotateY: trans.rotateY,
                      boxShadow: trans.shadowString,
                      transformStyle: "preserve-3d",
                      willChange: "flex, transform",
                    }}
                    animate={{
                      flex: isHovered ? 3 : 1,
                      scale: isHovered ? 1.02 : 1
                    }}
                    transition={{
                      flex: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                      scale: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
                    }}
                  >
                    {/* Desktop Cover Slice (Vertical Columns) */}
                    <div
                      className="hidden md:block absolute top-0 bottom-0 pointer-events-none bg-[#050505]"
                      style={{
                        width: "100cqw",
                        left: `calc( -1 * ( ((100cqw - var(--gap) * 3) / 4) * ${idx} + var(--gap) * ${idx} ) )`
                      }}
                    >
                      <img
                        src="/images/home/gallery-split-background.jpg"
                        alt="Master Background"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Mobile Cover Slice (Horizontal Rows) */}
                    <div
                      className="block md:hidden absolute inset-0 pointer-events-none bg-[#050505] overflow-hidden"
                    >
                      <img
                        src="/images/home/gallery-split-background.jpg"
                        alt="Master Background"
                        className="absolute left-0 w-full object-cover"
                        style={{
                          height: "400%",
                          top: `-${idx * 100}%`
                        }}
                      />
                    </div>

                    {/* GPU-Friendly Non-Hovered Dimming Layer (replaces expensive blur filter) */}
                    <div
                      className="absolute inset-0 bg-black pointer-events-none z-[3] transition-opacity duration-500"
                      style={{
                        opacity: isAnyHovered && !isHovered ? 0.75 : 0
                      }}
                    />

                    {/* Video on hover (only plays when card is active) */}
                    {category.video && (
                      <video
                        ref={(el) => { videosRef.current[idx] = el; }}
                        src={category.video}
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out z-[2] ${
                          isHovered ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    )}

                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 z-[4]"
                      style={{ opacity: overlayOpacity }}
                      animate={{
                        opacity: isHovered ? 0.95 : 0.75
                      }}
                      transition={{ duration: 0.5 }}
                    />

                    <div className="absolute inset-0 flex flex-col justify-end z-[10] pointer-events-none">

                      {/* Identity Reveal - Shows ONLY when cards are flipped/revealed completely */}
                      <motion.div
                        className="absolute inset-0 p-3 sm:p-4 md:p-6 flex flex-col justify-center md:justify-end items-center md:items-start transition-opacity duration-500"
                        style={{
                          opacity: scrollFinished && !isAnyHovered ? 1 : 0
                        }}
                      >
                        <h3 className="type-heading-md text-white drop-shadow-[0_8px_20px_rgba(0,0,0,0.95)] px-2 text-center md:text-left whitespace-normal break-words">
                          {category.title}
                        </h3>
                      </motion.div>

                      {/* Hover State Collapsed Title */}
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: isAnyHovered && !isHovered ? 1 : 0
                        }}
                        transition={{ duration: 0.4 }}
                      >
                        <h3 className="type-heading-md text-white text-center md:-rotate-90 origin-center drop-shadow-[0_8px_20px_rgba(0,0,0,0.95)] whitespace-nowrap select-none">
                          {category.title}
                        </h3>
                      </motion.div>

                      {/* Expanded Hover Content */}
                      <motion.div
                        className={`absolute inset-0 p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col justify-end ${isHovered ? 'pointer-events-auto' : 'pointer-events-none'}`}
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: isHovered ? 1 : 0
                        }}
                        transition={{ duration: 0.4, delay: isHovered ? 0.05 : 0 }}
                      >
                        {/* Close 'X' Button */}
                        {isHovered && (
                          <button
                            type="button"
                            aria-label="Close"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setHoveredIndex(null);
                            }}
                            className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 w-8 h-8 rounded-full bg-black/70 border border-white/20 backdrop-blur-md flex items-center justify-center text-white text-xs font-bold hover:bg-[#c1121f] hover:border-[#c1121f] transition-all duration-300 shadow-xl cursor-pointer z-[30] pointer-events-auto"
                          >
                            ✕
                          </button>
                        )}

                        <h3 className="type-heading-xl text-white drop-shadow-2xl mb-2 sm:mb-4">
                          {category.title}
                        </h3>
                        <p className="type-body-md text-gray-200 max-w-sm mb-2 sm:mb-3">
                          {category.subtitle}
                        </p>
                        <p className="type-body-sm text-gray-300 max-w-sm mb-4 sm:mb-6 hidden sm:block">
                          {category.details}
                        </p>
                        <button
                          type="button"
                          suppressHydrationWarning
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (isHovered) {
                              router.push(category.link);
                            } else if (scrollFinished) {
                              setHoveredIndex(idx);
                            }
                          }}
                          className={`self-start px-5 sm:px-6 py-2 bg-[#c1121f] hover:bg-white text-white hover:text-black transition-colors type-button shadow-lg rounded ${isHovered ? 'pointer-events-auto cursor-pointer' : 'pointer-events-none cursor-default'
                            }`}
                        >
                          Explore {category.title} →
                        </button>
                      </motion.div>

                    </div>
                  </motion.article>
                );
              })}
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
