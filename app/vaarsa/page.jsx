"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Medal, Trophy } from "lucide-react";
import Footer from "../../components/shared/Footer";

// Animated Counter Hook Component
function AnimatedCounter({ end, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      const easeOut = 1 - Math.pow(1 - percentage, 3);
      setCount(Math.floor(easeOut * end));

      if (progress < duration) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export default function VaarsaPage() {
  // Pagination & view all state for Previous Editions
  const [showAllEditions, setShowAllEditions] = useState(false);
  const [editionsPage, setEditionsPage] = useState(1);
  const [selectedEditionModal, setSelectedEditionModal] = useState(null);
  const editionsPerPage = 6; // 2 rows of 3 cards
  const editionsSectionRef = useRef(null);

  // States for 3D Domains Carousel
  const [activeDomainIndex, setActiveDomainIndex] = useState(2); // Start with center item (Lok Kala)
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile viewport for responsive 3D transforms
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Autoplay intervals with clear/reset mechanism
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveDomainIndex((prev) => (prev + 1) % 5);
    }, 3000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const domains = [
    {
      id: 1,
      sanskrit: "Lok Nritya",
      english: "Folk Dance",
      icon: "sports_martial_arts",
      desc: "Showcase authentic traditional group and solo folk dance expressions celebrating regional heritage and rhythmic prowess. A stage designed for vibrant cultural choreography.",
      image: "/images/vaarsa/vaarsa-domain-folk-dance.jpg"
    },
    {
      id: 2,
      sanskrit: "Lok Sangeet",
      english: "Folk Sangeet",
      icon: "library_music",
      desc: "Reviving soulful indigenous melodies, vocal traditions, and timeless folk musical narratives passed down through generations.",
      image: "/images/vaarsa/vaarsa-domain-folk-sangeet.jpg"
    },
    {
      id: 3,
      sanskrit: "Lok Kala",
      english: "Abstract Painting",
      icon: "palette",
      desc: "Interpreting folklore, rural motifs, and cultural mythology through vibrant abstract compositions and traditional visual art.",
      image: "/images/vaarsa/vaarsa-domain-lok-kala.jpg"
    },
    {
      id: 4,
      sanskrit: "Vadya Vrinda",
      english: "Folk Band",
      icon: "piano",
      desc: "Electrifying ensemble performances combining traditional acoustic folk instruments with dynamic, high-impact arrangements.",
      image: "/images/vaarsa/vaarsa-domain-folk-band.jpg"
    },
    {
      id: 5,
      sanskrit: "Lok Natya",
      english: "Skit Competition",
      icon: "theater_comedy",
      desc: "Theatrical storytelling and folk drama portraying cultural history, social tales, and indigenous folklore to captivate audiences.",
      image: "/images/vaarsa/vaarsa-domain-lok-natya.jpg"
    }
  ];

  const handlePrevDomain = () => {
    setActiveDomainIndex((prev) => (prev - 1 + 5) % 5);
  };

  const handleNextDomain = () => {
    setActiveDomainIndex((prev) => (prev + 1) % 5);
  };


  const handlePageChange = (newPage) => {
    setEditionsPage(newPage);
    setTimeout(() => {
      if (editionsSectionRef.current) {
        const elementPosition = editionsSectionRef.current.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - 110;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    }, 60);
  };


  const allEditions = [
    {
      id: 1,
      year: "2025",
      location: "Mumbai",
      theme: "Tradition Reimagined",
      desc: "A deep dive into the evolution of classical rhythms in a modern context.",
      image: "/images/vaarsa/vaarsa-performance-cover.jpg"
    },
    {
      id: 2,
      year: "2024",
      location: "Delhi",
      theme: "Cultural Crossroads",
      desc: "Exploring the dialogue between diverse artistic lineages across the subcontinent.",
      image: "/images/vaarsa/vaarsa-workshop-theatre.jpg"
    },
    {
      id: 3,
      year: "2023",
      location: "Bengaluru",
      theme: "Unity in Diversity",
      desc: "Celebrating the foundational stories that unite the world of classical performance.",
      image: "/images/vaarsa/vaarsa-service-fusion.jpg"
    },
    {
      id: 4,
      year: "2022",
      location: "Kolkata",
      theme: "Folk Resonance",
      desc: "Unleashing the kinetic power of eastern folk dances and percussion.",
      image: "/images/vaarsa/vaarsa-workshop-lazim.jpg"
    },
    {
      id: 5,
      year: "2021",
      location: "Pune",
      theme: "Somatic Heritage",
      desc: "Reviving classical theater and indigenous folk storytelling traditions.",
      image: "/images/vaarsa/vaarsa-category-events-cover.jpg"
    },
    {
      id: 6,
      year: "2020",
      location: "Varanasi",
      theme: "Eternal Rhythms",
      desc: "Sacred music and classical dance along the banks of heritage.",
      image: "/images/vaarsa/vaarsa-gallery-ensemble-wide.jpg"
    },
    {
      id: 7,
      year: "2019",
      location: "Jaipur",
      theme: "Desert Folklore",
      desc: "The vibrant colors, ballads, and folk instruments of Rajasthan.",
      image: "/images/vaarsa/vaarsa-category-workshop-cover.jpg"
    },
    {
      id: 8,
      year: "2018",
      location: "Chennai",
      theme: "Southern Cadency",
      desc: "Mastering ancient Carnatic cadences and traditional temple dance forms.",
      image: "/images/vaarsa/vaarsa-media-performances-thumbnail.jpg"
    }
  ];

  // Calculate paginated slice (On mobile view, display all editions directly)
  const displayedEditions = (isMobile || showAllEditions)
    ? (isMobile ? allEditions : allEditions.slice((editionsPage - 1) * editionsPerPage, editionsPage * editionsPerPage))
    : allEditions.slice(0, 3);

  const totalPages = Math.ceil(allEditions.length / editionsPerPage);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <main className="bg-[#050505] text-white font-sans selection:bg-[#c1121f] selection:text-white relative isolate overflow-hidden min-h-screen">
      {/* ATMOSPHERIC CONTINUOUS BACKGROUND EFFECTS THROUGHOUT PAGE */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[10%] w-[50vw] h-[50vw] rounded-full bg-[#c1121f]/15 blur-[160px] animate-pulse" />
        <div className="absolute top-[38%] right-[-8%] w-[45vw] h-[45vw] rounded-full bg-[#820a13]/12 blur-[180px] animate-pulse" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-[-10%] left-[15%] w-[45vw] h-[45vw] rounded-full bg-[#c1121f]/12 blur-[170px] animate-pulse" style={{ animationDelay: "4s" }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.04] via-transparent to-transparent opacity-80" />
      </div>

      {/* 1. HERO SECTION (Clean & Compact) */}
      <section className="relative min-h-[650px] lg:min-h-[750px] flex items-center justify-center overflow-hidden py-12">
        {/* Cinematic Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-65 scale-105"
            src="/videos/vaarsa/vaarsa-hero-bg.mp4"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-[#050505]/45 to-[#050505]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,5,5,0.85)_100%)]" />

        {/* Dynamic Sweeping Stage Spotlights */}
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          <motion.div
            className="absolute -top-20 -left-20 w-[400px] h-[120vh] bg-gradient-to-b from-[#c1121f]/20 via-white/5 to-transparent origin-top-left blur-2xl mix-blend-screen"
            animate={{ rotate: [-5, 15, -5] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -top-20 -right-20 w-[400px] h-[120vh] bg-gradient-to-b from-[#c1121f]/20 via-white/5 to-transparent origin-top-right blur-2xl mix-blend-screen"
            animate={{ rotate: [5, -15, 5] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="relative z-20 text-center px-6 md:px-12 max-w-6xl mx-auto pt-6">
          {/* Theatrical Logo Heading with Hover Circular Glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 35 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex justify-center items-center mb-6 group cursor-pointer w-fit mx-auto"
          >
            {/* Circular Glow behind Logo on Hover */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65%] h-[65%] bg-gradient-to-r from-[#c1121f] via-[#ff4d55] to-[#c1121f] rounded-full blur-3xl opacity-0 group-hover:opacity-85 transition-all duration-500 scale-125 pointer-events-none" />

            {/* Logo Image */}
            <img
              src="/logos/vaarsa-logo.png"
              alt="Vaarsa Logo"
              className="relative z-10 w-auto max-h-[120px] sm:max-h-[160px] md:max-h-[200px] lg:max-h-[250px] object-contain drop-shadow-[0_10px_40px_rgba(0,0,0,0.95)] group-hover:drop-shadow-[0_0_50px_rgba(193,18,31,0.9)] group-hover:scale-105 transition-all duration-500 ease-out mx-auto"
            />
          </motion.div>

          {/* Decorative Stage Divider Line */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#c1121f] to-transparent mx-auto mb-5"
          />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm md:text-base leading-relaxed max-w-lg mx-auto mb-8 text-[#f5dbd8] font-normal drop-shadow-[0_2px_15px_rgba(0,0,0,0.95)]"
          >
            An opportunity for artists to showcase their talent and revive folk and folklore. Putting folk art on the global map and celebrating the strength of our culture.
          </motion.p>

          {/* Buttons Container: Register Now Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap justify-center items-center mt-2"
          >
            <a
              href="https://forms.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#c1121f] text-white rounded font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_25px_rgba(193,18,31,0.4)] cursor-pointer"
            >
              <span>Register Now</span>
              <span className="material-symbols-outlined text-sm transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">arrow_outward</span>
            </a>
          </motion.div>
        </div>
      </section>



      {/* 2. ABOUT VAARSA & MERGED IMPACT SECTION */}
      <section id="about-vaarsa" className="min-h-screen flex flex-col justify-center py-16 md:py-24 px-6 md:px-12 lg:px-20 max-w-6xl mx-auto relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* Left Column: Vision & Reference Narrative */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-5"
          >

            <h2 className="type-heading-xl text-white mb-6 mt-16 text-left w-full block whitespace-nowrap">
              <span className="text-white">About</span> <span className="text-[#c1121f]">Vaarsa</span>
            </h2>

            <div className="space-y-3.5 text-[#e9bcb6]/90 text-xs md:text-sm leading-relaxed font-normal">
              <p>
                This first‑of‑its‑kind initiative focuses solely on folk forms, inviting students, professionals, and local artists to share their culture with a global audience through YouTube and media outreach. By showcasing that folk is vibrant, relevant, and “cool” for GenNext, it aims to retell stories of origin and people, ensuring these traditions resonate worldwide.
              </p>
            </div>

            {/* Merged Compact Impact Bar (Visible at a glance with About Us) */}
            <div className="grid grid-cols-3 gap-3 pt-5 border-t border-white/10 mt-5">
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                <h4 className="font-evelins text-2xl md:text-3xl text-[#c1121f]">
                  <AnimatedCounter end={200} suffix="+" />
                </h4>
                <p className="type-meta text-white/80 mt-1">Artists Featured</p>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                <h4 className="font-evelins text-2xl md:text-3xl text-[#c1121f]">
                  <AnimatedCounter end={5000} suffix="+" />
                </h4>
                <p className="type-meta text-white/80 mt-1">Attendees</p>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                <h4 className="font-evelins text-2xl md:text-3xl text-[#c1121f]">
                  <AnimatedCounter end={10} suffix="+" />
                </h4>
                <p className="type-meta text-white/80 mt-1">Cities</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Editorial Portrait (Sleek & Scaled Down) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative group"
          >
            <div className="w-full max-w-sm mx-auto overflow-hidden bg-[#1f1f1f] rounded-xl border border-white/10 relative shadow-2xl">
              <img
                className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
                src="/images/vaarsa/vaarsa-about.jpg"
                alt="A high-fidelity portrait of an Indian classical artist in detailed traditional costume."
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>



      {/* 3. THE DOMAINS SECTION (3D Perspective Carousel) */}
      <section className="relative py-12 md:py-16 bg-[#050505] overflow-hidden z-20">
        {/* Subtle crimson light burst in background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#c1121f]/15 blur-[140px] pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-12"
          >
            <h2 className="text-center w-full block type-heading-xl text-white mt-1.5">
              <span className="text-white">The</span> <span className="text-[#c1121f]">Domains</span>
            </h2>
          </motion.div>

          {/* 3D Carousel Wrapper */}
          <div
            className="w-full relative h-[300px] md:h-[370px] flex items-center justify-center overflow-visible"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              perspective: "1200px",
              transformStyle: "preserve-3d"
            }}
          >
            {domains.map((domain, idx) => {
              // Calculate offset relative to activeDomainIndex with wrap-around
              let offset = idx - activeDomainIndex;
              if (offset > 2) offset -= 5;
              if (offset < -2) offset += 5;

              const isCenter = offset === 0;

              return (
                <motion.div
                  key={domain.id}
                  style={{
                    position: "absolute",
                    width: isMobile ? "145px" : "220px",
                    height: isMobile ? "215px" : "320px",
                    left: isMobile ? "calc(50% - 72.5px)" : "calc(50% - 110px)",
                    top: isMobile ? "calc(50% - 107.5px)" : "calc(50% - 160px)",
                    transformStyle: "preserve-3d",
                  }}
                  animate={{
                    x: isMobile
                      ? (offset === 0 ? 0 : offset === -1 ? -85 : offset === 1 ? 85 : offset === -2 ? -145 : 145)
                      : (offset === 0 ? 0 : offset === -1 ? -175 : offset === 1 ? 175 : offset === -2 ? -310 : 310),
                    z: isMobile
                      ? (offset === 0 ? 40 : offset === -1 ? 0 : offset === 1 ? 0 : offset === -2 ? -40 : -40)
                      : (offset === 0 ? 100 : offset === -1 ? 15 : offset === 1 ? 15 : offset === -2 ? -60 : -60),
                    rotateY: isMobile
                      ? (offset === 0 ? 0 : offset === -1 ? 18 : offset === 1 ? -18 : offset === -2 ? 30 : -30)
                      : (offset === 0 ? 0 : offset === -1 ? 24 : offset === 1 ? -24 : offset === -2 ? 35 : -35),
                    scale: isMobile
                      ? (offset === 0 ? 1.05 : offset === -1 ? 0.85 : offset === 1 ? 0.85 : offset === -2 ? 0.7 : 0.7)
                      : (offset === 0 ? 1.08 : offset === -1 ? 0.88 : offset === 1 ? 0.88 : offset === -2 ? 0.72 : 0.72),
                    opacity: isMobile
                      ? (offset === 0 ? 1 : offset === -1 ? 0.8 : offset === 1 ? 0.8 : offset === -2 ? 0.45 : 0.45)
                      : (offset === 0 ? 1 : offset === -1 ? 0.85 : offset === 1 ? 0.85 : offset === -2 ? 0.55 : 0.55),
                    zIndex: offset === 0 ? 10 : Math.abs(offset) === 1 ? 8 : 6
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 26
                  }}
                  className="rounded-2xl overflow-hidden border border-white/10 hover:border-[#c1121f] cursor-pointer shadow-2xl relative select-none group"
                  onClick={() => setActiveDomainIndex(idx)}
                >
                  {/* Card Background Image */}
                  <img
                    className="w-full h-full object-cover transition-transform duration-700 pointer-events-none"
                    src={domain.image}
                    alt={domain.sanskrit}
                  />

                  {/* Base Gradient Overlay (readable titles, fades on hover when active to show full transparent black backdrop) */}
                  <div
                    className={`absolute inset-0 transition-opacity duration-700 ${isCenter
                      ? "bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-100 group-hover:opacity-0"
                      : "bg-black/60 group-hover:bg-black/45"
                      }`}
                  />

                  {/* Accent Line Indicator on Top of Card */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#c1121f] to-transparent transition-opacity duration-500 ${isCenter ? "opacity-100" : "opacity-0"}`} />


                  {/* Default State: Sanskrit & English Titles (Visible on Center when NOT hovered) */}
                  {isCenter && (
                    <div className="absolute inset-0 flex flex-col justify-end p-4 text-center transition-all duration-500 opacity-100 group-hover:opacity-0 group-hover:translate-y-4 select-none">
                      {/* Domain Sanskrit Name */}
                      <h3 className="text-center type-heading-lg text-white uppercase mb-1.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                        {domain.sanskrit}
                      </h3>

                      {/* Divider Line */}
                      <div className="w-10 h-[2px] bg-[#c1121f] mx-auto mb-2 shadow-[0_0_8px_#c1121f]" />

                      {/* English Subtitle */}
                      <span className="text-[#c1121f] text-[9px] md:text-[11px] font-bold uppercase tracking-[0.2em] mb-1.5 block drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                        {domain.english}
                      </span>
                    </div>
                  )}

                  {/* Hover State: Info/Description overlay with blackish transparent backdrop */}
                  {isCenter && (
                    <div className="absolute inset-0 bg-black/90 p-4 md:p-5 flex flex-col justify-center text-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 backdrop-blur-sm select-none">
                      {/* Sanskrit Name */}
                      <h3 className="text-center type-heading-md text-white uppercase mb-1">
                        {domain.sanskrit}
                      </h3>

                      {/* English Subtitle */}
                      <span className="text-[#c1121f] text-[9px] font-bold uppercase tracking-[0.15em] mb-2">
                        {domain.english}
                      </span>

                      {/* Divider Line */}
                      <div className="w-8 h-[1.5px] bg-[#c1121f] mx-auto mb-2 shadow-[0_0_6px_#c1121f]" />

                      {/* Domain description - Fully shown without truncation on hover */}
                      <p className="text-[10px] md:text-[11px] text-[#e9bcb6] leading-relaxed max-w-[190px] mx-auto font-normal">
                        {domain.desc}
                      </p>
                    </div>
                  )}

                  {/* Faint overlay click helper on side cards */}
                  {!isCenter && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="px-3.5 py-1.5 rounded-full bg-black/75 border border-white/10 text-[9px] md:text-[10px] uppercase tracking-widest text-white/90">
                        View Category
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}

            {/* Left/Right Overlaid Arrow Buttons (Matching the design) */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevDomain();
              }}
              className="absolute left-2 md:left-12 z-30 w-11 h-11 rounded-full bg-black/40 hover:bg-[#c1121f] border border-white/10 hover:border-[#c1121f] flex items-center justify-center text-white/70 hover:text-white hover:scale-110 active:scale-95 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.6)] backdrop-blur-sm cursor-pointer group"
              aria-label="Previous Domain"
            >
              <span className="material-symbols-outlined text-xl transition-transform duration-300 group-hover:-translate-x-0.5">chevron_left</span>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNextDomain();
              }}
              className="absolute right-2 md:right-12 z-30 w-11 h-11 rounded-full bg-black/40 hover:bg-[#c1121f] border border-white/10 hover:border-[#c1121f] flex items-center justify-center text-white/70 hover:text-white hover:scale-110 active:scale-95 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.6)] backdrop-blur-sm cursor-pointer group"
              aria-label="Next Domain"
            >
              <span className="material-symbols-outlined text-xl transition-transform duration-300 group-hover:translate-x-0.5">chevron_right</span>
            </button>

            {/* Pagination Dot Indicators */}
            <div className="absolute bottom-[-35px] left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5">
              {domains.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveDomainIndex(idx);
                  }}
                  className={`h-2.5 rounded-full transition-all duration-500 cursor-pointer ${activeDomainIndex === idx
                    ? "w-8 bg-[#c1121f] shadow-[0_0_10px_rgba(193,18,31,0.8)]"
                    : "w-2.5 bg-white/20 hover:bg-white/40"
                    }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

{/* 4. EVENT TIMELINE / SCHEDULE */}
<section className="relative w-full py-16 md:py-24 z-20 bg-[#050505] overflow-hidden">
  <div className="max-w-[1000px] mx-auto px-6 lg:px-20 relative z-10">

    {/* Section Heading */}
   <div className="text-center mb-16">
  <h2 className="text-center w-full block font-evelins text-3xl sm:text-4xl md:text-5xl uppercase tracking-wide text-white mt-2 leading-[0.95]">
    <span className="text-white">Event </span>
    <span className="text-[#c1121f]">Schedule</span>
  </h2>
</div>

    {/* Timeline */}
    <div className="space-y-12 relative before:absolute before:inset-0 before:ml-12 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[2px] before:bg-gradient-to-b before:from-transparent before:via-[#c1121f]/50 before:to-transparent">

      {[
        {
          time: "09:00 AM",
          title: "Registration & Welcome",
          desc: "Guest registration, attendee check-in, and welcome refreshments."
        },
        {
          time: "10:00 AM",
          title: "Opening Ceremony",
          desc: "The event officially begins with an opening address and introduction to the day's programme."
        },
        {
          time: "11:00 AM",
          title: "Opening Performance",
          desc: "A curated live performance setting the tone for the event."
        },
        {
          time: "12:30 PM",
          title: "Artist Showcase",
          desc: "Featured artists and performers present their work across traditional and contemporary forms."
        },
        {
          time: "02:00 PM",
          title: "Lunch & Interaction",
          desc: "A break for lunch, informal conversations, and interaction with artists and attendees."
        },
        {
          time: "03:30 PM",
          title: "Main Performance",
          desc: "The central performance of the event featuring invited artists and performers."
        },
        {
          time: "05:00 PM",
          title: "Artist Interaction",
          desc: "An open conversation and interaction session with the participating artists."
        },
        {
          time: "06:00 PM",
          title: "Closing Ceremony",
          desc: "Closing remarks, acknowledgements, and the conclusion of the event."
        }
      ].map((item, idx) => (
        <div
          key={idx}
          className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
          data-aos="fade-up"
        >

          {/* Time */}
          <div className="flex items-center justify-center px-4 h-12 min-w-[110px] bg-[#c1121f] text-white font-evelins text-base md:text-lg shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_20px_rgba(193,18,31,0.5)] z-10 relative rounded">
            {item.time}
          </div>

          {/* Event Card */}
          <div className="w-[calc(100%-7.5rem)] md:w-[calc(50%-3rem)] bg-[#030303] border border-white/20 p-6 group-hover:border-[#c1121f] group-hover:-translate-y-2 transition-all duration-500 rounded-xl">

            <h3 className="text-center type-heading-md text-white uppercase mb-2">
              {item.title.split(" ").length > 1 ? (
                <>
                  <span className="text-white">
                    {item.title.split(" ").slice(0, -1).join(" ")}{" "}
                  </span>
                  <span className="text-[#c1121f]">
                    {item.title.split(" ").slice(-1)[0]}
                  </span>
                </>
              ) : (
                <span className="text-white">{item.title}</span>
              )}
            </h3>

            <p className="text-xs md:text-sm text-[#a19e99] leading-relaxed text-center">
              {item.desc}
            </p>

          </div>
        </div>
      ))}

    </div>
  </div>
</section>



     {/* PRIZE POOL */}
<section className="py-20 px-6 md:px-12 lg:px-20 max-w-6xl mx-auto">
  <div className="text-center mb-12">
    <h2 className="type-heading-xl text-white">
      Prize <span className="text-[#c1121f]">Pool</span>
    </h2>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {[
      {
        place: "1st",
        title: "Mahā Vijētā",
        prize: "₹50,000",
        icon: Trophy,
        accent: "#c1121f",
      },
      {
        place: "2nd",
        title: "Utkarsh Puraskār",
        prize: "₹30,000",
        icon: Medal,
        accent: "#d6b36a",
      },
      {
        place: "3rd",
        title: "Pratibhā Puraskār",
        prize: "₹20,000",
        icon: Medal,
        accent: "#b87962",
      },
    ].map((item) => (
      <div
        key={item.place}
        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0b] p-7 text-center transition-all duration-300 hover:-translate-y-1 hover:border-white/25"
      >
        <div
          className="absolute inset-x-0 top-0 h-px opacity-70 transition-opacity group-hover:opacity-100"
          style={{ backgroundColor: item.accent }}
        />

        <div
          className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border bg-white/[0.03]"
          style={{ borderColor: `${item.accent}66`, color: item.accent }}
        >
          <item.icon size={32} strokeWidth={1.5} aria-hidden="true" />
        </div>

        <p
          className="mb-2 text-sm uppercase tracking-widest"
          style={{ color: item.accent }}
        >
          {item.place} Prize
        </p>

        <h3 className="font-evelins text-2xl text-white mb-4">
          {item.title}
        </h3>

        <div className="text-3xl font-evelins" style={{ color: item.accent }}>
          {item.prize}
        </div>
      </div>
    ))}
  </div>
</section>

      {/* 7. GET INVOLVED SECTION (Refined Compact Cards) */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-20 max-w-6xl mx-auto relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >

          <h2 className="text-center w-full block type-heading-xl text-white mt-1.5">
              <span className="text-white">Get</span> <span className="text-[#c1121f]">Involved</span>
            </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Participate as Artist Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -6 }}
            className="group relative bg-gradient-to-br from-[#181818] via-[#111111] to-[#0a0a0a] p-6 md:p-8 rounded-xl border border-white/15 hover:border-[#c1121f] transition-all duration-500 flex flex-col justify-between shadow-xl overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:via-[#c1121f] transition-all" />

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-[10px] uppercase tracking-wider mb-4">
                <span className="material-symbols-outlined text-xs text-[#c1121f]">palette</span> Artist Application
              </div>
              <h3 className="text-center type-heading-lg text-white mb-3">
                Participate as Artist
              </h3>
              <p className="text-[#e9bcb6] text-xs md:text-sm leading-relaxed mb-6">
                We welcome participants from all walks of life—students, professionals, and local artists—to showcase their culture to a global audience.
              </p>
              <ul className="space-y-2.5 mb-6">
                <li className="flex items-center gap-2.5 text-white text-[11px] md:text-xs tracking-wide">
                  <span className="w-4 h-4 rounded-full bg-[#c1121f]/20 flex items-center justify-center text-[#c1121f]">
                    <span className="material-symbols-outlined text-[10px]">check_circle</span>
                  </span>
                  Global YouTube & Media Showcase
                </li>
                <li className="flex items-center gap-2.5 text-white text-[11px] md:text-xs tracking-wide">
                  <span className="w-4 h-4 rounded-full bg-[#c1121f]/20 flex items-center justify-center text-[#c1121f]">
                    <span className="material-symbols-outlined text-[10px]">check_circle</span>
                  </span>
                  Professional High-Fidelity Documentation
                </li>
              </ul>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#c1121f] text-white rounded font-bold uppercase tracking-widest text-[11px] hover:bg-white hover:text-black transition-all duration-300 self-start"
            >
              Apply Now
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </motion.div>

          {/* Become a Sponsor Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -6 }}
            className="group relative bg-gradient-to-br from-[#1f0b0d] via-[#140608] to-[#0a0a0a] p-6 md:p-8 rounded-xl border border-[#c1121f]/30 hover:border-[#c1121f] transition-all duration-500 flex flex-col justify-between shadow-xl overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#c1121f] to-transparent" />

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c1121f]/20 text-[#ffb4aa] text-[10px] uppercase tracking-wider mb-4">
                <span className="material-symbols-outlined text-xs text-[#c1121f]">verified</span> Strategic Partnership
              </div>
              <h3 className="text-center type-heading-lg text-white mb-3">
                Become a Sponsor
              </h3>
              <p className="text-[#e9bcb6] text-xs md:text-sm leading-relaxed mb-6">
                Support indigenous art revival and gain unparalleled brand visibility among an engaged cultural community and international audience.
              </p>
              <ul className="space-y-2.5 mb-6">
                <li className="flex items-center gap-2.5 text-white text-[11px] md:text-xs tracking-wide">
                  <span className="w-4 h-4 rounded-full bg-[#c1121f]/20 flex items-center justify-center text-[#c1121f]">
                    <span className="material-symbols-outlined text-[10px]">star</span>
                  </span>
                  Title Branding & Media Recognition
                </li>
                <li className="flex items-center gap-2.5 text-white text-[11px] md:text-xs tracking-wide">
                  <span className="w-4 h-4 rounded-full bg-[#c1121f]/20 flex items-center justify-center text-[#c1121f]">
                    <span className="material-symbols-outlined text-[10px]">star</span>
                  </span>
                  VIP Hospitality & Event Access
                </li>
              </ul>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-[#c1121f] text-white rounded font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all duration-300 self-start"
            >
              Partner With Us
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </motion.div>
        </div>
      </section>



      {/* 6. PREVIOUS EDITIONS (Heritage Archive) — PLACED AT THE END BEFORE FOOTER! */}
      <section id="previous-editions" className="py-16 md:py-24 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto relative z-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
          <div>
            <h2 className="text-center w-full block type-heading-xl text-white mt-1.5">
              <span className="text-white">Previous</span> <span className="text-[#c1121f]">Editions</span>
            </h2>
          </div>
          <button
            onClick={() => {
              if (!showAllEditions) {
                setShowAllEditions(true);
                setEditionsPage(1);
              } else {
                setShowAllEditions(false);
                setEditionsPage(1);
                setTimeout(() => {
                  if (editionsSectionRef.current) {
                    const elementPosition = editionsSectionRef.current.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - 110;
                    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                  }
                }, 60);
              }
            }}
            className="hidden md:inline-flex group items-center gap-2 px-5 py-2.5 bg-[#c1121f] text-white rounded font-bold uppercase tracking-widest text-[10px] hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(193,18,31,0.4)] cursor-pointer shrink-0"
          >
            <span>{showAllEditions ? "Show Less" : "View All"}</span>
            <span className="material-symbols-outlined text-xs transition-transform group-hover:translate-x-1">
              {showAllEditions ? "expand_less" : "arrow_forward"}
            </span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          <AnimatePresence>
            {displayedEditions.map((edition, idx) => (
              <motion.div
                key={edition.id}
                initial={{ opacity: 0, scale: 0.96, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -15 }}
                transition={{ duration: 0.3, ease: "easeOut", delay: (idx % 3) * 0.05 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                onClick={() => setSelectedEditionModal(edition)}
                className="group relative overflow-hidden bg-[#141414] rounded-xl border border-white/10 hover:border-[#c1121f] transition-colors duration-500 shadow-xl cursor-pointer"
              >
                <div className="aspect-[16/10] sm:aspect-[4/3] overflow-hidden relative">
                  <img
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    src={edition.image}
                    alt={`Vaarsa ${edition.year}`}
                  />
                  {/* Black Overlay on Card */}
                  <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-300" />
                </div>

                {/* Only Name Displayed on Card (Centered Vertically & Horizontally) */}
                <div className="absolute inset-0 p-2.5 sm:p-4 flex flex-col justify-center items-center text-center z-10">
                  <h3 className="text-center type-heading-md text-white group-hover:text-[#c1121f] transition-colors drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                    Vaarsa {edition.year}
                  </h3>
                  <span className="text-[8px] sm:text-[9px] md:text-[10px] text-[#c1121f] font-sans font-bold uppercase tracking-widest mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Click to View →
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-1 bg-gradient-to-r from-[#c1121f] to-[#ff4d55] transition-all duration-500" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Pagination controls only if more than 2 rows (>6 items) and NOT on mobile */}
        {!isMobile && showAllEditions && allEditions.length > 6 && totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="hidden md:flex mt-12 flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10 text-xs"
          >
            <span className="text-white/60">
              Showing Page {editionsPage} of {totalPages} ({allEditions.length} total editions)
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (editionsPage > 1) handlePageChange(editionsPage - 1);
                }}
                disabled={editionsPage === 1}
                className="px-4 py-2 rounded bg-white/5 border border-white/10 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/10 transition-colors cursor-pointer"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => handlePageChange(p)}
                  className={`w-8 h-8 rounded flex items-center justify-center font-bold transition-colors cursor-pointer ${editionsPage === p
                    ? "bg-[#c1121f] text-white"
                    : "bg-white/5 border border-white/10 text-white/80 hover:bg-white/10"
                    }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => {
                  if (editionsPage < totalPages) handlePageChange(editionsPage + 1);
                }}
                disabled={editionsPage === totalPages}
                className="px-4 py-2 rounded bg-white/5 border border-white/10 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/10 transition-colors cursor-pointer"
              >
                Next
              </button>
            </div>
          </motion.div>
        )}
      </section>

      {/* PREVIOUS EDITION DETAIL MODAL */}
      <AnimatePresence>
        {selectedEditionModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEditionModal(null)}
            className="fixed inset-0 z-[10000] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#141414] border border-white/20 rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col md:flex-row overflow-hidden shadow-2xl relative my-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedEditionModal(null)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/80 border border-white/30 text-white flex items-center justify-center hover:bg-[#c1121f] hover:border-[#c1121f] transition-all cursor-pointer shadow-lg"
                aria-label="Close Modal"
              >
                <span className="material-symbols-outlined text-base sm:text-lg">close</span>
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12 w-full overflow-y-auto max-h-[90vh]">
                {/* Image Section */}
                <div className="md:col-span-5 aspect-[16/9] sm:aspect-[4/3] md:aspect-auto md:h-full w-full overflow-hidden relative shrink-0">
                  <img
                    src={selectedEditionModal.image}
                    alt={`Vaarsa ${selectedEditionModal.year}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent md:hidden" />
                </div>

                {/* Details Section */}
                <div className="md:col-span-7 p-5 sm:p-6 md:p-8 flex flex-col justify-center space-y-3.5 md:space-y-4 text-left">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c1121f]/20 border border-[#c1121f]/40 text-[#c1121f] text-[10px] sm:text-xs font-bold uppercase tracking-widest w-fit">
                    <span className="material-symbols-outlined text-xs">location_on</span>
                    {selectedEditionModal.location}
                  </div>
                  <h3 className="text-center font-evelins text-2xl sm:text-3xl md:text-4xl text-white font-normal leading-tight">
                    Vaarsa {selectedEditionModal.year}
                  </h3>
                  <div className="w-12 h-0.5 bg-[#c1121f]" />
                  <div>
                    <span className="text-[10px] sm:text-xs uppercase font-bold tracking-widest text-[#c1121f] block mb-0.5 font-sans">Theme</span>
                    <p className="text-xs sm:text-sm font-semibold text-white font-sans">{selectedEditionModal.theme}</p>
                  </div>
                  <div>
                    <span className="text-[10px] sm:text-xs uppercase font-bold tracking-widest text-white/50 block mb-0.5 font-sans">About Edition</span>
                    <p className="text-xs sm:text-sm text-[#e9bcb6] leading-relaxed font-sans">
                      {selectedEditionModal.desc}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>



      {/* SHARED COMMON FOOTER */}
      <Footer />
    </main>
  );
}






