"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import VaarsaAtmosphericBackground from "../shared/VaarsaAtmosphericBackground";

const rotatingWords = ["ARTS", "PERFORMANCES", "WORKSHOPS", "EVENTS", "MUSIC"];

const SocialIcon = ({ href, svg }) => (
  <MagneticSurface className="inline-flex" strength={10}>
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/80 bg-white/[0.02] shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-md transition-colors duration-500 hover:text-white hover:border-white/25 hover:shadow-[0_0_24px_rgba(193,18,31,0.18)]"
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.95 }}
    >
      {svg}
    </motion.a>
  </MagneticSurface>
);

const MagneticSurface = ({ children, className = "", strength = 14, ...props }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 18, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 180, damping: 18, mass: 0.3 });

  const handleMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const centerX = bounds.left + bounds.width / 2;
    const centerY = bounds.top + bounds.height / 2;
    x.set(((event.clientX - centerX) / bounds.width) * strength);
    y.set(((event.clientY - centerY) / bounds.height) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);

  // Rotate words
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Pause/play background video based on visibility
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          el.play().catch(() => { });
        } else {
          try { el.pause(); } catch (e) { }
        }
      });
    }, { threshold: 0.5 });
    const target = containerRef.current || el;
    obs.observe(target);
    return () => obs.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const titleX = useTransform(pointerX, [0, 1], ["-1.5vw", "1.5vw"]);
  const titleY = useTransform(pointerY, [0, 1], ["0.5vh", "-0.5vh"]);
  const glowX = useTransform(pointerX, [0, 1], ["-8%", "8%"]);
  const glowY = useTransform(pointerY, [0, 1], ["-6%", "6%"]);

  const handlePointerMove = (event) => {
    const bounds = containerRef.current?.getBoundingClientRect();
    if (!bounds) return;
    pointerX.set(Math.min(Math.max((event.clientX - bounds.left) / bounds.width, 0), 1));
    pointerY.set(Math.min(Math.max((event.clientY - bounds.top) / bounds.height, 0), 1));
  };

  const handlePointerLeave = () => {
    pointerX.set(0.5);
    pointerY.set(0.5);
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="sticky top-0 w-full h-screen overflow-hidden bg-[#050505] snap-start z-0"
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
    >
      <VaarsaAtmosphericBackground />
      {/* 1. Cinematic Stage Entry — Video Background */}
      <motion.div
        className="absolute inset-0 z-0 origin-center bg-black"
        style={{ scale: videoScale, opacity: videoOpacity }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1.02 }}
        transition={{ duration: 3.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover scale-[1.05]"
        >
          <source src="https://media.myriadarts.in/home/hero-background.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Glow effects */}
      <motion.div
        className="absolute inset-0 z-[1] pointer-events-none mix-blend-screen opacity-60"
        style={{ x: glowX, y: glowY }}
        aria-hidden="true"
      >
        <motion.div
          className="absolute -left-[10%] top-[10%] h-[38vh] w-[38vw] rounded-full blur-[90px]"
          style={{ background: "radial-gradient(circle, rgba(193,18,31,0.12) 0%, rgba(193,18,31,0.02) 45%, transparent 72%)" }}
          animate={{ opacity: [0.15, 0.25, 0.18], scale: [1, 1.04, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: [0.45, 0, 0.55, 1] }}
        />
        <motion.div
          className="absolute right-[2%] top-[14%] h-[34vh] w-[30vw] rounded-full blur-[100px]"
          style={{ background: "radial-gradient(circle, rgba(240,165,0,0.08) 0%, rgba(240,165,0,0.015) 45%, transparent 74%)" }}
          animate={{ opacity: [0.1, 0.18, 0.12], x: [0, -12, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: [0.45, 0, 0.55, 1] }}
        />
        <motion.div
          className="absolute left-[30%] bottom-[14%] h-[30vh] w-[34vw] rounded-full blur-[110px]"
          style={{ background: "radial-gradient(circle, rgba(18,173,173,0.08) 0%, rgba(18,173,173,0.015) 46%, transparent 75%)" }}
          animate={{ opacity: [0.08, 0.15, 0.1], y: [0, -8, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: [0.45, 0, 0.55, 1] }}
        />
      </motion.div>

      {/* 2. Vignette Gradients */}
      <div className="absolute inset-x-0 top-0 h-[24vh] bg-gradient-to-b from-[#050505] via-[#050505]/88 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.015),transparent_35%),linear-gradient(180deg,rgba(5,5,5,0.05),rgba(5,5,5,0.22))] z-10 pointer-events-none" />
      <div className="absolute -bottom-[2vh] left-0 w-full h-[40vh] bg-gradient-to-t from-[#050505] via-[#050505]/88 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-[14vh] bg-gradient-to-t from-[#050505] via-[#050505]/90 to-transparent z-[11] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-36 pointer-events-none z-30" style={{ background: "linear-gradient(180deg, rgba(5,5,5,0) 0%, rgba(5,5,5,0.22) 55%, rgba(5,5,5,0.9) 100%)" }} />

      {/* 3. Main Content */}
      <motion.div
        className="relative z-20 h-full w-full flex flex-col md:flex-row items-start md:items-end justify-end md:justify-between px-[6vw] pb-16 md:pb-[20vh]"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        {/* Left: Typography */}
        <motion.div
          className="flex flex-col items-start w-full md:w-[66%] max-w-[76rem]"
          initial={{ opacity: 0, y: 92, filter: "blur(22px)", scale: 0.94 }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
          transition={{ duration: 2.6, ease: [0.16, 1, 0.3, 1], delay: 1.15 }}
          style={{ x: titleX, y: titleY }}
        >
          <h1 className="type-display-xl flex flex-col md:flex-row md:flex-nowrap md:items-end gap-x-5 text-white drop-shadow-[0_18px_55px_rgba(0,0,0,0.6)] mb-4 md:mb-6 overflow-visible">
            <span className="block flex-none translate-y-[0.02em] whitespace-nowrap">
              MYRIAD
            </span>
            <div className="flex items-end flex-none translate-y-[0.02em]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={rotatingWords[index]}
                  initial={{ opacity: 0, y: 42, rotateX: 72, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -34, rotateX: -72, filter: "blur(8px)" }}
                  transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
                  className={`block drop-shadow-[0_10px_28px_rgba(0,0,0,0.45)] whitespace-nowrap px-[0.02em] ${rotatingWords[index] === "ARTS" ? "text-white" : "text-[#c1121f]"
                    }`}
                >
                  {rotatingWords[index]}
                </motion.span>
              </AnimatePresence>
            </div>
          </h1>

          <motion.div
            className="flex items-center gap-3 md:gap-4 max-w-full"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.35, delay: 2.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="h-[3px] w-6 md:w-12 bg-[#c1121f] flex-shrink-0" />
            <p className="type-meta text-white/78 whitespace-normal md:whitespace-nowrap">
              We curate stages where tradition meets brilliance
            </p>
          </motion.div>
        </motion.div>

        <div className="hidden md:block w-[38.2%]" />
      </motion.div>

      {/* Floating Socials */}
      <motion.div
        className="absolute right-4 md:right-[2vw] bottom-4 md:top-1/2 md:-translate-y-1/2 z-30 flex flex-row md:flex-col gap-3 md:gap-5"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.45, delay: 1.95, ease: [0.16, 1, 0.3, 1] }}
      >
        <SocialIcon
          href="https://www.instagram.com/myriad_arts/"
          svg={
            <svg width="21" height="21" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.1992 16.2002C13.2601 16.2002 14.2775 15.7788 15.0276 15.0286C15.7778 14.2785 16.1992 13.2611 16.1992 12.2002C16.1992 11.1393 15.7778 10.1219 15.0276 9.37177C14.2775 8.62162 13.2601 8.2002 12.1992 8.2002C11.1384 8.2002 10.1209 8.62162 9.37079 9.37177C8.62065 10.1219 8.19922 11.1393 8.19922 12.2002C8.19922 13.2611 8.62065 14.2785 9.37079 15.0286C10.1209 15.7788 11.1384 16.2002 12.1992 16.2002Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3.19922 16.2002V8.2002C3.19922 6.87411 3.726 5.60234 4.66368 4.66466C5.60137 3.72698 6.87314 3.2002 8.19922 3.2002H16.1992C17.5253 3.2002 18.7971 3.72698 19.7348 4.66466C20.6724 5.60234 21.1992 6.87411 21.1992 8.2002V16.2002C21.1992 17.5263 20.6724 18.798 19.7348 19.7357C18.7971 20.6734 17.5253 21.2002 16.1992 21.2002H8.19922C6.87314 21.2002 5.60137 20.6734 4.66368 19.7357C3.726 18.798 3.19922 17.5263 3.19922 16.2002Z" stroke="currentColor" strokeWidth="1.5" />
              <path d="M17.6992 6.71022L17.7092 6.69922" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          }
        />
        <SocialIcon
          href="https://www.facebook.com/myriadarts"
          svg={
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 13.5H16.5L17.5 9.5H14V7.5C14 6.47 14 5.5 16 5.5H17.5V2.14C17.174 2.1 16.006 2 14.693 2C11.952 2 10 3.671 10 6.75V9.5H7V13.5H10V22H14V13.5Z" fill="currentColor" />
            </svg>
          }
        />
        <SocialIcon
          href="https://www.youtube.com/@Calakar"
          svg={
            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_752_11)">
                <path d="M19.7809 5.35513C19.6676 4.92968 19.4447 4.54139 19.1344 4.22904C18.8241 3.9167 18.4373 3.69122 18.0126 3.57513C16.4534 3.1543 10.1992 3.1543 10.1992 3.1543C10.1992 3.1543 3.94505 3.1543 2.38505 3.57513C1.96051 3.69135 1.57387 3.91688 1.26372 4.22922C0.953578 4.54156 0.730775 4.92978 0.617552 5.35513C0.199219 6.92513 0.199219 10.2001 0.199219 10.2001C0.199219 10.2001 0.199219 13.4751 0.617552 15.0451C0.730848 15.4706 0.953776 15.8589 1.26408 16.1712C1.57437 16.4836 1.96119 16.709 2.38589 16.8251C3.94505 17.246 10.1992 17.246 10.1992 17.246C10.1992 17.246 16.4534 17.246 18.0134 16.8251C18.4381 16.709 18.8249 16.4836 19.1352 16.1712C19.4455 15.8589 19.6684 15.4706 19.7817 15.0451C20.1992 13.4751 20.1992 10.2001 20.1992 10.2001C20.1992 10.2001 20.1992 6.92513 19.7809 5.35513ZM8.15339 13.1735V7.2268L13.3809 10.2001L8.15339 13.1735Z" fill="currentColor" />
              </g>
              <defs>
                <clipPath id="clip0_752_11">
                  <rect width="20" height="20" fill="white" transform="translate(0.199219 0.200195)" />
                </clipPath>
              </defs>
            </svg>
          }
        />
      </motion.div>
    </section>
  );
}
