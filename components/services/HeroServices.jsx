"use client";

import React from "react";
import { motion } from "framer-motion";

export default function HeroServices() {
  const scrollToServices = (e) => {
    e.preventDefault();
    const element = document.getElementById("services-overview");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: window.innerHeight * 0.75, behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full min-h-screen lg:min-h-screen flex items-center justify-center overflow-hidden bg-[#050505] text-white select-text py-20 px-6 md:px-12 pt-28">
      {/* 1. VAARSA CINEMATIC BACKGROUND IMAGE LAYER */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center grayscale opacity-40 pointer-events-none"
        style={{
          backgroundImage: "url('/images/services/service-theatre.jpg')"
        }}
        aria-label="Cinematic Indian classical stage background"
      />

      {/* Dark Linear Vignette Overlay (Center Radial Gradient Removed) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/85 via-[#050505]/50 to-[#050505] z-10 pointer-events-none" />

      {/* Dynamic Sweeping Stage Spotlights matching Vaarsa page */}
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

      {/* 2. CENTERED VAARSA-STYLE HERO CONTENT */}
      <div className="relative z-20 text-center px-6 md:px-12 max-w-5xl mx-auto pt-6 flex flex-col items-center">

        {/* Sub-heading / Tag */}
        <motion.span
          data-aos="fade-down"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs md:text-sm font-semibold tracking-[0.4em] text-[#c1121f] uppercase block mb-4"
        >
        </motion.span>

        {/* Theatrical Title Heading */}
        <motion.div
          data-aos="zoom-in"
          initial={{ opacity: 0, scale: 0.9, y: 35 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex justify-center items-center mb-6 group cursor-pointer w-fit mx-auto"
        >
          {/* Heading Title with Solid Crimson Accent */}
          <h1 className="font-evelins text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] font-light leading-[0.95] tracking-wide text-white drop-shadow-[0_10px_40px_rgba(0,0,0,0.95)] group-hover:scale-105 transition-all duration-500 ease-out">
            Artistry &amp; <span className="text-[#c1121f] font-normal">Heritage</span>
          </h1>
        </motion.div>

        {/* Decorative Stage Divider Line */}
        <motion.div
          data-aos="zoom-in"
          data-aos-delay="150"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#c1121f] to-transparent mx-auto mb-6"
        />

        {/* Subtitle */}
        <motion.p
          data-aos="fade-up"
          data-aos-delay="250"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-6 text-[#f5dbd8] font-light drop-shadow-[0_2px_15px_rgba(0,0,0,0.95)]"
        >
          Creating bespoke stage productions, training modules, cultural productions, and cinematic compositions—bringing Indian classical and contemporary art to the global stage.
        </motion.p>

      </div>

      {/* Smooth Bottom Gradient Fade Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent via-[#000000]/60 to-[#000000] z-20 pointer-events-none" />
    </section>
  );
}