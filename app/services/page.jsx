"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import HeroServices from '../../components/services/HeroServices';
import Footer from '../../components/shared/Footer';
import VaarsaAtmosphericBackground from '../../components/shared/VaarsaAtmosphericBackground';
import PerformanceService from '../../components/services/PerformanceService';
import WorkshopService from '../../components/services/WorkshopService';
import EventsService from '../../components/services/EventsService';
import MusicService from '../../components/services/MusicService';
import AOS from "aos";
import "aos/dist/aos.css";

// Framer Motion Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const splitRevealVariants = {
  hidden: {
    clipPath: "inset(0% 50% 0% 50%)",
    opacity: 0,
    scale: 1.1
  },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const textVariants = {
  hidden: {
    opacity: 0,
    y: 80,
    filter: "blur(10px)"
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 100,
    scale: 0.9,
    rotateX: 10
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const floatingVariants = {
  visible: {
    y: [0, -20, 0],
    transition: {
      duration: 4,
      ease: "easeInOut",
      repeat: Infinity
    }
  }
};

const sections = [
  {
    id: "performances",
    title: "Performances",
    icon: "theater_comedy",
    description: "Experience the profound depth of Indian classical dance and drama in its purest form.",
    image: "/images/services/services-performance-cover.jpg"
  },
  {
    id: "workshops",
    title: "Workshops & Classes",
    icon: "school",
    description: "Intensive conservatory training modules designed to master the ancient performing arts within a modern framework.",
    image: "/images/services/services-workshop-cover.jpg"
  },
  {
    id: "events",
    title: "Events & Production",
    icon: "settings_input_component",
    description: "Full-scale cultural production management for global stages, festivals, and elite institutional events.",
    image: "/images/services/services-events-cover.jpg"
  },
  {
    id: "music",
    title: "Music",
    icon: "music_note",
    description: "Aural journeys exploring the rhythmic complexities of classical Indian compositions and cinematic soundscapes.",
    image: "/images/services/services-music-performance.jpg"
  }
];

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState(null);
  const [animationPhase, setAnimationPhase] = useState("grid"); // "grid", "pushing", "expanding", "detail", "collapsing"
  const [activeSection, setActiveSection] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const containerRef = useRef(null);
  const detailScrollRef = useRef(null);
  const scrollDebounceRef = useRef(null);
  const scrollResistanceRef = useRef(0);
  const cardRefs = useRef([]);
  const pushTimeoutRef = useRef(null);
  const detailTimeoutRef = useRef(null);

  const clearTimeouts = () => {
    if (pushTimeoutRef.current) clearTimeout(pushTimeoutRef.current);
    if (detailTimeoutRef.current) clearTimeout(detailTimeoutRef.current);
  };

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, offset: 140 });
    setTimeout(() => {
      AOS.refresh();
    }, 100);
    return () => clearTimeouts();
  }, []);

  // Screen size check for responsive widths
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Check URL hash on load
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    const validIds = ["performances", "workshops", "events", "music"];
    if (hash && validIds.includes(hash)) {
      setSelectedService(hash);
      setAnimationPhase("detail");
      setActiveSection(hash);
    } else {
      setSelectedService(null);
      setAnimationPhase("grid");
      setActiveSection(null);
    }
  }, []);

  const handleScrollEdge = (direction) => {
    // Auto scroll to next section on scroll edge disabled as requested
    return;
  };

  const handleWheel = (e) => {
    // Auto scroll disabled; allow standard native scrolling
    scrollResistanceRef.current = 0;
  };

  const handleScroll = (e) => {
    scrollResistanceRef.current = 0;
  };

  const handleSelectService = (id) => {
    clearTimeouts();

    const isInitialClick = selectedService === null;
    setSelectedService(id);
    setActiveSection(id);
    window.history.pushState(null, null, `#${id}`);

    if (isInitialClick) {
      setAnimationPhase("pushing");
      // Phase 1 (Push): translate entire row left Over 380ms.
      pushTimeoutRef.current = setTimeout(() => {
        // Phase 2 (Expand): At 340ms, start expand and backdrop crossfade
        setAnimationPhase("expanding");

        detailTimeoutRef.current = setTimeout(() => {
          // Phase 3 (Detail): At 580ms total (240ms after expand starts), text rises from below
          setAnimationPhase("detail");
        }, 240);
      }, 340);
    } else {
      // Direct transitions between sibling slivers
      setAnimationPhase("expanding");
      detailTimeoutRef.current = setTimeout(() => {
        setAnimationPhase("detail");
      }, 240);
    }
  };

  const handleBackToOverview = () => {
    clearTimeouts();
    setAnimationPhase("collapsing");

    // Find scrollable container and reset scroll position on collapse
    const scrollContainers = document.querySelectorAll(".overflow-y-auto");
    scrollContainers.forEach(container => {
      container.scrollTop = 0;
    });

    setTimeout(() => {
      setSelectedService(null);
      setAnimationPhase("grid");
      setActiveSection(null);
      window.history.pushState(null, null, "/services");

      // Show the cards section directly without scrolling to the top
      requestAnimationFrame(() => {
        const el = document.getElementById("services-overview");
        if (el) {
          el.scrollIntoView({ behavior: "instant", block: "start" });
        }
      });
    }, 400); // 400ms collapse duration
  };

  return (
    <>
      <HeroServices />
      <div id="services-overview" className={`scroll-mt-28 ${selectedService !== null ? 'fixed inset-0 overflow-hidden h-screen select-text justify-center' : 'relative min-h-0 overflow-x-hidden pt-16 md:pt-28 pb-12 md:pb-20 select-text justify-start'} bg-[#000000] flex flex-col items-center w-full ${selectedService !== null ? "z-[10000]" : "z-[45]"}`}>
        <VaarsaAtmosphericBackground fixed={true} />
        {/* ── BACKGROUND TAKE-OVER LAYER ── */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <AnimatePresence>
            {activeSection && (animationPhase === "expanding" || animationPhase === "detail") && (
              <motion.div
                key={activeSection}
                className="absolute inset-0 w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.24, ease: "easeOut" }}
              >
                <img
                  src={sections.find(s => s.id === activeSection)?.image}
                  alt="Backdrop"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    filter: "brightness(0.4) saturate(0.5)",
                    transform: "translate3d(0,0,0)"
                  }}
                />
                <div className="absolute inset-0 bg-black/70" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── HEADER NAVIGATION CONTROLS (OVERVIEW BUTTON) ── */}
        <AnimatePresence>
          {selectedService !== null && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute top-6 left-6 z-[10010] flex items-center pointer-events-none"
            >
              {/* Back to Grid Overview Button */}
              <button
                onClick={handleBackToOverview}
                className="pointer-events-auto flex items-center gap-2 text-white hover:text-[#c1121f] transition-colors uppercase outline-none font-sans text-xs font-bold tracking-widest bg-black/70 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/15 hover:border-[#c1121f]/60 cursor-pointer shadow-xl"
              >
                <span>← OVERVIEW</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── SECTION HEADING (WHAT WE OFFER) ── */}
        <AnimatePresence>
          {selectedService === null && (
            <motion.div
              data-aos="fade-down"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-4xl text-center px-6 pt-0 pb-0 mb-0 md:mb-0 md:pb-0 z-20"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-evelins text-white font-normal tracking-wide drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
              <span className="text-white">What We</span> <span className="text-[#c1121f]">Offer</span>
            </h2>
              <div className="flex items-center justify-center gap-3 mt-2 mb-0 w-full max-w-xs mx-auto">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#c1121f]/70 to-transparent" />
                <span className="text-[#c1121f] text-xs font-serif">✦</span>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#c1121f]/70 to-transparent" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── VERTICAL STRIPS GALLERY ROW ── */}
        <motion.div
          ref={containerRef}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1
              }
            }
          }}
          style={{
            transform: "translateX(0px)",
            transition: "transform 0.38s cubic-bezier(0.32, 0, 0.15, 1)"
          }}
          className={`flex flex-col md:flex-row gap-2 md:gap-4 ${selectedService !== null ? 'h-screen py-12 md:py-0' : 'h-auto py-0 md:py-0 mt-2 md:mt-3'} w-full px-4 md:px-8 justify-center items-center relative z-10`}
        >
          {sections.map((sec, index) => {
            const isSelected = selectedService === sec.id;
            const isAnySelected = selectedService !== null;
            const isPushing = animationPhase === "pushing";
            const isExpanding = animationPhase === "expanding";
            const isCollapsing = animationPhase === "collapsing";
            const isDetail = animationPhase === "detail";

            // Calculate dimensions and layout properties
            let widthVal = isMobile ? "100%" : "calc(20vw - 12px)";
            let heightVal = isMobile ? "calc(22vh - 8px)" : "65vh";
            let opacityVal = 1;
            let borderRadiusVal = 16;
            let zIndexVal = 10;

            if (isAnySelected && !isCollapsing) {
              if (isSelected) {
                if (isPushing) {
                  widthVal = isMobile ? "100%" : "calc(20vw - 12px)";
                  heightVal = isMobile ? "calc(22vh - 8px)" : "65vh";
                  opacityVal = 1;
                  zIndexVal = 30;
                } else if (isExpanding || isDetail) {
                  // Sibling slivers take 46px each (total 3 * 46px = 138px)
                  // Gaps: on mobile 8px gap (total 3 * 8 = 24px), on desktop 16px gap (total 3 * 16 = 48px)
                  const totalSliverWidth = 138;
                  const totalGaps = isMobile ? 24 : 48;
                  if (isMobile) {
                    widthVal = "100%";
                    heightVal = `calc(100vh - ${totalSliverWidth + totalGaps + 96}px)`;
                  } else {
                    widthVal = `calc(100% - ${totalSliverWidth + totalGaps}px)`;
                    heightVal = "100vh";
                  }
                  opacityVal = 1;
                  borderRadiusVal = 0;
                  zIndexVal = 20; // Sibling strips sit on top on the sides
                }
              } else {
                // Compressed sibling strips (slivers)
                widthVal = isMobile ? "100%" : "46px";
                heightVal = isMobile ? "46px" : "100vh";
                opacityVal = 0.35;
                borderRadiusVal = 0;
                zIndexVal = 40; // High zIndex to remain visible as slivers on sides
              }
            }

            return (
              <motion.div
                key={sec.id}
                data-aos="fade-up"
                data-aos-delay={index * 150}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 15 } }
                }}
                ref={isSelected && isDetail ? detailScrollRef : undefined}
                onScroll={isSelected && isDetail ? handleScroll : undefined}
                onWheel={isSelected && isDetail ? handleWheel : undefined}
                onClick={() => {
                  // Compressed cards remain clickable to navigate directly
                  if (isSelected && (isExpanding || isDetail)) return;
                  handleSelectService(sec.id);
                }}
                data-lenis-prevent={isSelected && isDetail ? "true" : undefined}
                animate={{
                  width: widthVal,
                  height: heightVal,
                  opacity: opacityVal,
                  borderRadius: borderRadiusVal,
                }}
                whileHover={
                  isMobile ? {} : (isAnySelected
                    ? (!isSelected ? {
                      opacity: 0.7,
                      boxShadow: "0 0 30px rgba(193, 18, 31, 0.5), inset 0 0 20px rgba(193, 18, 31, 0.2)",
                      borderColor: "rgba(193, 18, 31, 0.8)"
                    } : {})
                    : {
                      scale: 1.02,
                      boxShadow: "0 20px 40px rgba(193, 18, 31, 0.25), inset 0 0 20px rgba(193, 18, 31, 0.3)",
                      borderColor: "rgba(193, 18, 31, 0.6)"
                    })
                }
                transition={{
                  duration: isPushing ? 0.38 : (isExpanding ? 0.24 : 0.4),
                  ease: isPushing ? [0.32, 0, 0.15, 1] : "easeOut"
                }}
                style={{
                  width: widthVal,
                  height: heightVal,
                  zIndex: zIndexVal,
                  pointerEvents: "auto", // Always auto so mouse wheel and clicks work inside the container
                  cursor: (isSelected && (isExpanding || isDetail)) ? "default" : "pointer"
                }}
                className={`relative flex-shrink-0 flex flex-col group shadow-lg border border-white/10 transition-all duration-300 ${(isSelected && isDetail) ? "justify-start overflow-y-auto p-0" : "justify-end overflow-hidden p-6"
                  }`}
              >
                {/* Card Local Background Image (fades to 0 when background spreads) */}
                <motion.div
                  className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
                  style={{ borderRadius: borderRadiusVal }}
                  animate={{ opacity: isSelected ? 0 : 1 }}
                  transition={{ duration: 0.24, ease: "easeInOut" }}
                >
                  <motion.img
                    src={sec.image}
                    alt={sec.title}
                    className="transition-transform duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.12]"
                    style={{
                      position: "absolute",
                      left: "0",
                      top: "0",
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      pointerEvents: "none"
                    }}
                  />
                  {/* Black Overlay & Bottom Gradient for dark aesthetic and text contrast */}
                  <div className="absolute inset-0 bg-black/55 group-hover:bg-black/40 transition-colors duration-500 z-[1]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent z-[2]" />
                </motion.div>

                {/* Initial title label (bottom-left) */}
                <motion.div
                  className="absolute left-4 md:left-6 bottom-4 md:bottom-6 z-10 pointer-events-none text-left pr-2 md:pr-4"
                  animate={{
                    opacity: (isAnySelected && (!isSelected || isExpanding || isDetail)) ? 0 : 1
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex flex-col gap-2">
                    <h3 className="font-evelins text-xl sm:text-2xl md:text-3xl text-white font-normal leading-tight tracking-wide block drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                      {sec.title.split(' ').length > 1 ? (
                        <>
                          <span className="text-white">{sec.title.split(' ').slice(0, -1).join(' ')} </span>
                          <span className="text-[#c1121f]">{sec.title.split(' ').slice(-1)[0]}</span>
                        </>
                      ) : (
                        <span className="text-white">{sec.title}</span>
                      )}
                    </h3>
                    <div className="flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                      <span
                        style={{
                          fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif",
                          fontSize: "11px",
                          letterSpacing: "0.2em"
                        }}
                        className="text-white uppercase font-semibold"
                      >
                        View Details
                      </span>
                      <span className="material-symbols-outlined text-xs text-white">arrow_forward</span>
                    </div>
                  </div>
                </motion.div>

                {/* Vertical text label for compressed sibling strips */}
                {isAnySelected && !isSelected && (
                  <motion.div
                    className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    whileHover={isMobile ? {} : { scale: 1.1 }}
                  >
                    <motion.span
                      style={isMobile ? {
                        fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif",
                        fontSize: "14px",
                        letterSpacing: "0.2em",
                      } : {
                        fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif",
                        fontSize: "11px",
                        letterSpacing: "0.15em",
                        writingMode: "vertical-rl",
                        textOrientation: "mixed"
                      }}
                      className={`text-white uppercase font-bold transition-colors duration-300 ${!isMobile && "transform -rotate-180"}`}
                      whileHover={isMobile ? {} : {
                        color: "rgba(193, 18, 31, 1)",
                        textShadow: "0 0 15px rgba(193, 18, 31, 0.6)"
                      }}
                    >
                      {sec.title}
                    </motion.span>
                  </motion.div>
                )}

                {/* Scrollable Editorial Content & Details */}
                {isSelected && isDetail && (
                  <div
                    className={`w-full flex flex-col items-center relative z-20 select-text transition-opacity duration-500 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
                  >
                    {/* Opened Card Header Section (Top Aligned) */}
                    <div className="w-full pt-20 md:pt-24 px-4 sm:px-8 md:px-20 pb-4 relative select-none max-w-max-width mx-auto">
                      <motion.div
                        initial={{ y: 25, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, ease: [0.32, 0, 0.15, 1] }}
                        className="text-center w-full max-w-5xl mx-auto flex flex-col items-center"
                      >
                        <h2 className="font-evelins text-3xl sm:text-4xl md:text-5xl tracking-wide text-white mb-4 leading-tight font-normal">
                          {sec.title.split(' ').length > 1 ? (
                            <>
                              <span className="text-white">{sec.title.split(' ').slice(0, -1).join(' ')} </span>
                              <span className="text-[#c1121f] drop-shadow-[0_0_30px_rgba(193,18,31,0.4)]">{sec.title.split(' ').slice(-1)[0]}</span>
                            </>
                          ) : (
                            <span className="text-white">{sec.title}</span>
                          )}
                        </h2>
                        <p className="font-sans text-sm md:text-base text-white/80 leading-relaxed w-full max-w-5xl text-center mx-auto ">
                          {sec.description}
                        </p>
                      </motion.div>
                    </div>

                    {/* RESTORED UNALTERED SECTION LAYOUTS */}
                    {sec.id === "performances" && (
                      <PerformanceService detailScrollRef={detailScrollRef} />
                    )}
                    {sec.id === "workshops" && (
                      <WorkshopService detailScrollRef={detailScrollRef} />
                    )}
                    {sec.id === "events" && (
                      <EventsService detailScrollRef={detailScrollRef} />
                    )}
                    {sec.id === "music" && (
                      <MusicService detailScrollRef={detailScrollRef} />
                    )}

                    {/* Bottom Navigation Buttons Bar */}
                    <div className="w-full max-w-max-width mx-auto px-4 sm:px-6 md:px-margin-desktop pb-8 pt-6 flex items-center justify-between border-t border-white/10 select-none">
                      <button
                        disabled={index === 0}
                        onClick={() => {
                          if (index > 0) handleSelectService(sections[index - 1].id);
                        }}
                        className="flex items-center gap-1 md:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-3 rounded-md md:rounded-lg text-white font-sans text-[10px] sm:text-xs font-bold uppercase tracking-wider md:tracking-widest bg-black/60 border border-white/15 hover:enabled:border-[#c1121f] hover:enabled:text-[#c1121f] transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                      >
                        <span>← PREVIOUS<span className="hidden sm:inline"> OFFERING</span></span>
                      </button>
                      <button
                        disabled={index === sections.length - 1}
                        onClick={() => {
                          if (index < sections.length - 1) handleSelectService(sections[index + 1].id);
                        }}
                        className="flex items-center gap-1 md:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-3 rounded-md md:rounded-lg text-white font-sans text-[10px] sm:text-xs font-bold uppercase tracking-wider md:tracking-widest bg-[#c1121f] hover:bg-[#e01423] transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shadow-lg"
                      >
                        <span>NEXT<span className="hidden sm:inline"> OFFERING</span> →</span>
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Footer is visible only in grid view */}
        {selectedService === null && (
          <div className="w-full relative z-10 bg-[#000000] pt-12 md:pt-20">
            {/*  Standardized Final CTA Section  */}
            <section data-aos="fade-up" className="bg-surface-container-low p-8 sm:p-12 md:p-20 rounded-lg text-center relative overflow-hidden border border-rule-white max-w-max-width mx-auto mt-10 md:mt-24 mb-12 md:mb-20 px-4 sm:px-8 md:px-margin-desktop">
              <div className="relative z-10">
                <h2 data-aos="fade-down" className="font-evelins font-normal text-3xl sm:text-4xl md:text-5xl text-white mb-4 md:mb-6 tracking-wide">
              <span className="text-white">Ready to</span> <span className="text-[#c1121f]">Collaborate?</span>
            </h2>
                <p data-aos="fade-up" data-aos-delay="150" className="font-sans text-xs sm:text-sm md:text-base text-on-surface-variant max-w-xl mx-auto mb-6 md:mb-10 leading-relaxed">
                  Join a community shaping the future of Indian arts.
                </p>
                <Link
                  data-aos="zoom-in"
                  data-aos-delay="250"
                  href="/contact"
                  className="inline-block bg-background-matte text-on-surface border-b-2 border-primary-container px-8 py-3 md:px-12 md:py-4 font-sans text-xs md:text-sm font-bold uppercase tracking-widest hover:bg-surface-container transition-all duration-300"
                >
                  ENQUIRE NOW
                </Link>
              </div>
              {/*  Decorative Backdrop Image Overlay  */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <img alt="Theatrical background" className="w-full h-full object-cover grayscale" src="/images/services/services-journey-backdrop.png" />
              </div>
            </section>
            <Footer />
          </div>
        )}
      </div>
    </>
  );
}

