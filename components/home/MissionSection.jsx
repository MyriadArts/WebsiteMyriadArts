"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import VaarsaAtmosphericBackground from "../shared/VaarsaAtmosphericBackground";

export default function MissionSection() {
  const sectionRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const opacityBg = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.18, 0.1]);

  // Smooth spring physics for spotlight
  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (rect) {
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      onMouseMove={handleMouseMove}
      className="relative w-full bg-[#050505] min-h-screen md:h-screen overflow-hidden flex items-center justify-center py-16 md:py-12 px-6 md:px-12 lg:px-24 cursor-none md:cursor-default"
    >
      <VaarsaAtmosphericBackground />

      {/* Black gradient overlays for smooth merge above and below section */}
      <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#050505] via-[#050505]/80 to-transparent pointer-events-none z-20" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#050505] via-[#050505]/90 to-transparent pointer-events-none z-20" />

      {/* Mouse Spotlight / Reveal Effect - Changed to Red */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none opacity-0 md:opacity-100"
        style={{
          background: useTransform(
            [springX, springY],
            ([x, y]) => `radial-gradient(500px circle at ${x}px ${y}px, rgba(220, 38, 38, 0.08), transparent 80%)`
          )
        }}
      />



      {/* Main Content Container */}
      <div className="max-w-[95rem] mx-auto w-full relative z-30 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 lg:gap-12">

        {/* Left Side: Image and Overlapping Heading */}
        <div className="relative flex flex-col items-start w-full md:w-auto group">

          {/* Heading - Shifted to Top & Further Right */}
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative md:absolute md:top-[0rem] md:right-[-5rem] lg:right-[-8rem] z-30 mb-4 md:mb-0 text-center md:text-left w-full md:w-auto"
          >
            <h2 className="type-heading-xl text-red-600 uppercase drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
              <span className="text-white">Our </span>
              Story
            </h2>
          </motion.div>

          {/* Foreground Image - Static position */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-[240px] sm:w-[280px] md:w-[380px] lg:w-[420px] aspect-square flex-shrink-0 mx-auto md:mx-0 mt-2 md:mt-6"
          >
            <div className="w-full h-full relative overflow-hidden bg-[#111] shadow-[0_50px_100px_rgba(0,0,0,0.9)]">
              <div className="w-full h-full">
                <Image
                   src="/images/home/gallery-classical-performance.jpg"
                  alt="Myriad Arts"
                  fill
                  className="object-cover grayscale brightness-90 transition-all duration-700 group-hover:grayscale-0 group-hover:brightness-100"
                />
              </div>
              <div className="absolute inset-0 border border-white/5 pointer-events-none" />
            </div>
          </motion.div>

        </div>

        {/* Right Side Column: Single Paragraph Text Box (Shifted Down & Reduced Spacing) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2, delayChildren: 0.5 }
            }
          }}
          className="w-full md:w-[440px] lg:w-[540px] flex flex-col gap-8 pt-4 md:pt-16 lg:pt-24 md:ml-4 lg:ml-8"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, x: 30 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
            }}
            className="w-full flex flex-col gap-4"
          >
            <div data-aos="fade-right" data-aos-duration="800" className="w-16 h-[2px] bg-red-600 animate-pulse" />
            <p data-aos="fade-up" data-aos-delay="100" className="type-body-md text-white text-justify md:text-left transition-colors duration-500 hover:text-white/80">
              Myriad Arts, founded in 2007 by college friends, has grown into an ensemble dedicated to preserving India’s folk and classical traditions. Balancing professional careers with a passion for the arts, the group has performed across India and abroad, earning recognition for its work. Guided by a creative vision, it sees art as both lifelong passion and a bridge across generations, ensuring Indian culture thrives globally.
            </p>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
