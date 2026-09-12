"use client";

import { useRef } from "react";
import Image from "next/image";
import SectionHeading from "../ui/SectionHeading";
import { motion, useScroll, useTransform } from "framer-motion";
import VaarsaAtmosphericBackground from "../shared/VaarsaAtmosphericBackground";

// We compile all the high-quality assets we have to form the grid.
const baseImages = [
  "/images/home/gallery-classical-performance.jpg",
  "/images/home/gallery-ink-brush.png",
  "/images/home/gallery-mandala-art.png",
  "/images/home/partners-backdrop.png",
  "/images/home/gallery-stage-performance.jpg",
  "/images/home/gallery-ensemble-wide.jpg",
];

// Duplicate heavily to ensure the columns are extremely long to allow for continuous scrolling
const col1 = [...baseImages, ...baseImages, ...baseImages];
const col2 = [...baseImages.reverse(), ...baseImages, ...baseImages.reverse()];
const col3 = [...baseImages, ...baseImages.reverse(), ...baseImages];

export default function GallerySection() {
  const containerRef = useRef(null);

  // Track scroll progress exclusively through this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
    layoutEffect: false,
  });

  // Calculate extreme parallax for the columns
  // Outer columns move UP
  const yUp = useTransform(scrollYProgress, [0, 1], ["0%", "-24%"]);

  // Center column moves DOWN (starts high, ends low)
  const yDown = useTransform(scrollYProgress, [0, 1], ["-24%", "0%"]);

  return (
    <section
      id="gallery"
      ref={containerRef}
      data-aos="fade-in"
      data-aos-duration="1200"
      className="relative w-full h-[200vh] bg-[#050505] overflow-hidden"
    >
      <VaarsaAtmosphericBackground />

      {/* 1. 3D Tilted Grid Wrapper */}
      <div className="absolute inset-0 w-full h-full flex justify-center items-center overflow-hidden" style={{ perspective: "1500px" }}>

        {/* The Matrix Rotated Grid */}
        <motion.div
          className="w-[150vw] md:w-[120vw] h-[250vh] flex gap-4 md:gap-8 justify-center items-start origin-center"
          style={{
            rotateZ: -10, // Diagonal slant
            rotateX: 15,  // Tilted backward into the screen
            rotateY: 5,   // Slightly angled sideways
            scale: 1.3,   // Scaled up so the rotated edges don't show
            willChange: "transform",
            backfaceVisibility: "hidden"
          }}
        >

          {/* Column 1 (Moves UP) */}
          <motion.div className="w-1/3 flex flex-col gap-4 md:gap-8" style={{ y: yUp, willChange: "transform" }}>
            {col1.map((src, i) => (
              <div key={`col1-${i}`} className="relative w-full aspect-[3/4] md:aspect-video rounded-xl overflow-hidden shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
                <Image src={src} fill alt="Gallery image" loading="lazy" className="object-cover opacity-60 hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </motion.div>

          {/* Column 2 (Moves DOWN) */}
          <motion.div className="w-1/3 flex flex-col gap-4 md:gap-8" style={{ y: yDown, willChange: "transform" }}>
            {col2.map((src, i) => (
              <div key={`col2-${i}`} className="relative w-full aspect-[3/4] md:aspect-video rounded-xl overflow-hidden shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
                <Image src={src} fill alt="Gallery image" loading="lazy" className="object-cover opacity-60 hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </motion.div>

          {/* Column 3 (Moves UP) */}
          <motion.div className="w-1/3 flex flex-col gap-4 md:gap-8" style={{ y: yUp, willChange: "transform" }}>
            {col3.map((src, i) => (
              <div key={`col3-${i}`} className="relative w-full aspect-[3/4] md:aspect-video rounded-xl overflow-hidden shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
                <Image src={src} fill alt="Gallery image" loading="lazy" className="object-cover opacity-60 hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </motion.div>

        </motion.div>

        {/* Cinematic Vignette Overlays */}
        {/* Deep top/bottom fades so the grid emerges seamlessly from the void */}
        <div className="absolute top-0 left-0 w-full h-[40vh] bg-gradient-to-b from-[#050505] via-[#050505]/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-[40vh] bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent z-10 pointer-events-none" />
        {/* Global darkening so the text pops */}
        <div className="absolute inset-0 bg-black/42 z-10 pointer-events-none" />
      </div>

      {/* 2. Floating Foreground Content Overlay */}
      {/* Sticky container stays in the middle of the screen while you scroll through the 200vh section */}
      <div className="sticky top-0 left-0 w-full h-screen flex flex-col items-center justify-center z-20 pointer-events-none px-4 text-center">

        <SectionHeading
          title={<><span className="font-evelins">Through <br /> the <span className="text-[#c1121f]">Lens</span></span></>}
          variant="display"
          className="drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] text-center"
        />

        <motion.p
          className="type-body-md text-white mt-4 md:mt-6 max-w-xs sm:max-w-lg drop-shadow-[0_5px_15px_rgba(0,0,0,1)]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ type: "spring", stiffness: 50, damping: 20, delay: 0.2 }}
        >
          A curated glimpse into the unforgettable performances and artistic expressions that define our legacy. Not just in the feed, but in the field.
        </motion.p>

        <motion.button
          className="mt-6 md:mt-10 px-6 md:px-8 py-3 md:py-4 bg-[#c1121f] text-white rounded type-button pointer-events-auto hover:bg-white hover:text-black transition-colors duration-300 shadow-[0_0_30px_rgba(193,18,31,0.4)] cursor-pointer"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ type: "spring", stiffness: 50, damping: 20, delay: 0.4 }}
        >
          Explore Full Gallery
        </motion.button>

      </div>

    </section>
  );
}