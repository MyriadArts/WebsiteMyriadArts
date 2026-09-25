"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import VaarsaAtmosphericBackground from "../shared/VaarsaAtmosphericBackground";

export default function HeroServices() {
  return (
    <section className="sticky top-0 w-full h-screen max-h-screen py-0 flex flex-col items-center justify-center z-0 overflow-hidden bg-[#050505]">
      <VaarsaAtmosphericBackground />

      {/* Dynamic Sweeping Red Stage Lights (Vaarsa Page Style) */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {/* Left Corner Stage Light */}
        <motion.div
          className="absolute -top-20 -left-20 w-[300px] md:w-[400px] h-[120vh] bg-gradient-to-b from-[#c1121f]/25 via-[#c1121f]/5 to-transparent origin-top-left blur-2xl mix-blend-screen"
          animate={{ rotate: [-5, 15, -5] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Right Corner Stage Light */}
        <motion.div
          className="absolute -top-20 -right-20 w-[300px] md:w-[400px] h-[120vh] bg-gradient-to-b from-[#c1121f]/25 via-[#c1121f]/5 to-transparent origin-top-right blur-2xl mix-blend-screen"
          animate={{ rotate: [5, -15, 5] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Soft Crimson Center Backlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[600px] h-[220px] sm:h-[300px] bg-[#c1121f]/15 rounded-full blur-[90px] sm:blur-[130px] pointer-events-none z-10" />

      {/* Smooth Gradient Overlay Fade & Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-[#050505]/45 to-[#050505] z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,5,5,0.85)_100%)] z-0 pointer-events-none" />

      {/* Ambient Crimson Horizon Glow */}
      <div className="absolute bottom-0 inset-x-0 h-36 bg-gradient-to-t from-[#c1121f]/25 via-transparent to-transparent blur-3xl pointer-events-none z-10" />

      {/* Floating Images (Lanterns) - Exact Matching Set from About Hero */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {[
          // 3 UP
          { src: "/images/about/about-gallery-01.jpg", pos: "left-[2%] md:left-[4%] top-[5%] md:top-[7%]", delay: 0.1, rotate: "-rotate-3 md:-rotate-6" },
          { src: "/images/about/about-gallery-02.jpg", pos: "left-[40%] md:left-[42%] top-[1%] md:top-[2%]", delay: 0.3, rotate: "" },
          { src: "/images/about/about-gallery-03.jpg", pos: "right-[2%] md:right-[4%] top-[5%] md:top-[7%]", delay: 0.5, rotate: "rotate-3 md:rotate-6" },
          // 4 DOWN
          { src: "/images/about/about-gallery-04.jpg", pos: "left-[2%] md:left-[3%] bottom-[5%] md:bottom-[7%]", delay: 0.7, rotate: "-rotate-6 md:-rotate-12" },
          { src: "/images/about/about-gallery-05.jpg", pos: "left-[21%] md:left-[23%] bottom-[1%] md:bottom-[2%]", delay: 0.9, rotate: "rotate-3" },
          { src: "/images/about/about-gallery-06.jpg", pos: "right-[21%] md:right-[23%] bottom-[1%] md:bottom-[2%]", delay: 1.1, rotate: "-rotate-3" },
          { src: "/images/about/about-abstract-dancers.jpg", pos: "right-[2%] md:right-[3%] bottom-[5%] md:bottom-[7%]", delay: 1.3, rotate: "rotate-6 md:rotate-12" },
        ].map((lantern, idx) => (
          <motion.div
            key={idx}
            className={`absolute w-20 h-28 sm:w-28 sm:h-38 md:w-36 md:h-50 lg:w-44 lg:h-60 xl:w-48 xl:h-66 ${lantern.pos} ${lantern.rotate || ""}`}
            initial={{ y: "100vh", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 1.8,
              ease: [0.16, 1, 0.3, 1],
              delay: lantern.delay,
            }}
          >
            <motion.div
              className="w-full h-full relative overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.08)] border border-white/15 rounded-lg opacity-70 hover:opacity-100 transition-opacity duration-500"
              animate={{ y: ["-4px", "4px", "-4px"] }}
              transition={{
                duration: 4 + (idx % 3) * 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: lantern.delay,
              }}
            >
              <Image
                src={lantern.src}
                alt="Lantern Image"
                fill
                sizes="(max-width: 640px) 140px, (max-width: 768px) 180px, (max-width: 1024px) 240px, 300px"
                priority
                className="object-cover transition-all duration-700 pointer-events-auto"
              />
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Centerpiece Text */}
      <div className="relative z-30 text-center px-4 sm:px-6 md:px-12 max-w-5xl mx-auto flex flex-col items-center pointer-events-none">
        {/* Theatrical Title Heading */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 35 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex justify-center items-center mb-6 group cursor-pointer w-fit mx-auto pointer-events-auto"
        >
          {/* Heading Title with Solid Crimson Accent */}
          <h1 className="type-display-xl text-white drop-shadow-[0_10px_40px_rgba(0,0,0,0.95)] group-hover:scale-105 transition-all duration-500 ease-out">
            Our&nbsp;<span className="text-[#c1121f] font-normal">Services</span>
          </h1>
        </motion.div>

        {/* Decorative Stage Divider Line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#c1121f] to-transparent mx-auto mb-6"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10 text-[#f5dbd8] font-light drop-shadow-[0_2px_15px_rgba(0,0,0,0.95)]"
        >
          Creating bespoke stage productions, training modules, cultural productions, and cinematic compositions—bringing Indian classical and contemporary art to the global stage.
        </motion.p>
      </div>
    </section>
  );
}
