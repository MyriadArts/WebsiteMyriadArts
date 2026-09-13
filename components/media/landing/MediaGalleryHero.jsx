"use client";

import { useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "../../ui/SectionHeading";
import { motion, useScroll, useTransform } from "framer-motion";
import VaarsaAtmosphericBackground from "../../shared/VaarsaAtmosphericBackground";

export default function MediaGalleryHero({ videos = [] }) {
  const containerRef = useRef(null);

  // Get a subset of video thumbnails deterministically to avoid hydration mismatches
  const { col1, col2, col3 } = useMemo(() => {
    const thumbnails = (videos || [])
      .map(v => v.thumbnail?.high || v.thumbnail?.medium || v.thumbnail?.default)
      .filter(Boolean)
      .slice(0, 9); // Limit to 9 distinct thumbnails to avoid overwhelming the grid

    // Distribute into 3 columns
    const baseCol1 = [];
    const baseCol2 = [];
    const baseCol3 = [];

    thumbnails.forEach((src, i) => {
      if (i % 3 === 0) baseCol1.push(src);
      else if (i % 3 === 1) baseCol2.push(src);
      else baseCol3.push(src);
    });

    // Duplicate heavily to ensure the columns are extremely long to allow for continuous scrolling
    return {
      col1: [...baseCol1, ...baseCol1, ...baseCol1, ...baseCol1],
      col2: [...baseCol2.slice().reverse(), ...baseCol2, ...baseCol2.slice().reverse(), ...baseCol2],
      col3: [...baseCol3, ...baseCol3.slice().reverse(), ...baseCol3, ...baseCol3.slice().reverse()]
    };
  }, [videos]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
    layoutEffect: false,
  });

  const yUp = useTransform(scrollYProgress, [0, 1], ["0%", "-24%"]);
  const yDown = useTransform(scrollYProgress, [0, 1], ["-24%", "0%"]);

  return (
    <section 
      id="media-gallery" 
      ref={containerRef} 
      className="relative w-full min-h-[250vh] bg-[#050505] snap-start"
    >
      <VaarsaAtmosphericBackground />
      
      {/* 1. 3D Tilted Grid Wrapper (Sticky Background) */}
      <div className="sticky top-0 left-0 w-full h-screen flex justify-center items-center overflow-hidden" style={{ perspective: "1500px" }}>
        
        <motion.div 
          className="w-[150vw] md:w-[120vw] h-[250vh] flex gap-4 md:gap-8 justify-center items-start origin-center"
          style={{ 
            rotateZ: -10, rotateX: 15, rotateY: 5, scale: 1.3, willChange: "transform", backfaceVisibility: "hidden"
          }}
        >
          <motion.div className="w-1/3 flex flex-col gap-4 md:gap-8" style={{ y: yUp, willChange: "transform" }}>
            {col1.map((src, i) => (
              <div key={`col1-${i}`} className="relative w-full aspect-[3/4] md:aspect-video rounded-xl overflow-hidden shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
                <Image src={src} fill alt="Gallery image" loading="lazy" className="object-cover opacity-60 hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </motion.div>

          <motion.div className="w-1/3 flex flex-col gap-4 md:gap-8" style={{ y: yDown, willChange: "transform" }}>
            {col2.map((src, i) => (
              <div key={`col2-${i}`} className="relative w-full aspect-[3/4] md:aspect-video rounded-xl overflow-hidden shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
                <Image src={src} fill alt="Gallery image" loading="lazy" className="object-cover opacity-60 hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </motion.div>

          <motion.div className="w-1/3 flex flex-col gap-4 md:gap-8" style={{ y: yUp, willChange: "transform" }}>
            {col3.map((src, i) => (
              <div key={`col3-${i}`} className="relative w-full aspect-[3/4] md:aspect-video rounded-xl overflow-hidden shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
                <Image src={src} fill alt="Gallery image" loading="lazy" className="object-cover opacity-60 hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="absolute top-0 left-0 w-full h-[15vh] bg-gradient-to-b from-[#050505] via-[#050505]/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-[15vh] bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-black/60 z-10 pointer-events-none" />
      </div>

      {/* 2. Scrolling Foreground Content */}
      <div className="relative w-full z-20 pointer-events-none px-4 -mt-[100vh] pt-[20vh] pb-[20vh] flex flex-col items-center">
        
        {/* Hero Title Section */}
        <div className="flex flex-col items-center justify-center text-center mb-[20vh] max-w-5xl mx-auto px-4 sm:px-6 md:px-12 pointer-events-none">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex justify-center items-center mb-6 group w-fit mx-auto pointer-events-auto"
          >
            {/* Circular Glow behind Logo on Hover */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65%] h-[65%] bg-gradient-to-r from-[#c1121f] via-[#ff4d55] to-[#c1121f] rounded-full blur-3xl opacity-0 group-hover:opacity-85 transition-all duration-500 scale-125 pointer-events-none" />

            {/* Logo Image */}
            <img
              src="/logos/calakar-logo.jpeg"
              alt="Calakar Logo"
              className="relative z-10 w-[120px] h-[120px] sm:w-[160px] sm:h-[160px] md:w-[200px] md:h-[200px] lg:w-[250px] lg:h-[250px] object-cover rounded-full drop-shadow-[0_10px_40px_rgba(0,0,0,0.95)] group-hover:drop-shadow-[0_0_50px_rgba(193,18,31,0.9)] group-hover:scale-105 transition-all duration-500 ease-out mx-auto"
            />
          </motion.div>

          {/* Decorative Stage Divider Line */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#c1121f] to-transparent mx-auto mb-5"
          />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm md:text-base leading-relaxed max-w-lg mx-auto mb-8 text-[#f5dbd8] font-normal drop-shadow-[0_2px_15px_rgba(0,0,0,0.95)] pointer-events-auto"
          >
            Immerse yourself in our ever-growing universe across social media. From exclusive behind-the-scenes moments to full-length cinematic performances on our YouTube channel, experience art that transcends the physical stage.
          </motion.p>
          
          <motion.div 
            className="pointer-events-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href="/media/library"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#c1121f] text-white rounded font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_25px_rgba(193,18,31,0.4)] cursor-pointer"
            >
              <span>Explore Media Library</span>
              <span className="material-symbols-outlined text-sm transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">arrow_outward</span>
            </Link>
          </motion.div>
        </div>

        {/* Journey Overlay Card Section */}
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 pointer-events-auto relative">
          <div className="relative bg-black/75 backdrop-blur-md p-8 sm:p-10 md:p-12 rounded-2xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
            
            {/* Staircase Grid Layout:
                - Row 1, Col 1: "OUR" above image, right-aligned so 'R' ends at end of image width
                - Row 2, Col 1: Image
                - Row 2, Col 2: "JOURNEY" + Description text
            */}
            <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] gap-x-10 md:gap-x-14 items-start">

              {/* Row 1, Col 1: OUR */}
              <div className="w-full max-w-[280px] lg:max-w-[320px] mx-auto md:mx-0 flex justify-end mb-4">
                <motion.h2
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="font-evelins text-4xl sm:text-5xl md:text-6xl uppercase tracking-wide cursor-default leading-none text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)] text-right"
                >
                  OUR
                </motion.h2>
              </div>

              {/* Row 1, Col 2: Spacer */}
              <div className="hidden md:block" />

              {/* Row 2, Col 1: Left Side Image */}
              <div className="relative flex flex-col items-start w-full md:w-auto group flex-shrink-0 mb-8 md:mb-0">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full max-w-[280px] lg:max-w-[320px] aspect-[4/5] flex-shrink-0 mx-auto md:mx-0"
                >
                  <div className="w-full h-full relative overflow-hidden bg-[#111] shadow-[0_25px_50px_rgba(0,0,0,0.9)] rounded-xl border border-white/10">
                    <div className="w-full h-full group-hover:scale-105 transition-transform duration-700">
                      <Image
                        src="/images/media/media-podcast-journey.jpg"
                        alt="Our Journey"
                        fill
                        sizes="(max-width: 768px) 280px, 320px"
                        className="object-cover object-right contrast-110 group-hover:contrast-125 transition-all duration-700"
                      />
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Row 2, Col 2: JOURNEY + Description */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.2, delayChildren: 0.1 }
                  }
                }}
                className="w-full flex-1 flex flex-col justify-start"
              >
                <motion.h2
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
                  }}
                  className="font-evelins text-4xl sm:text-5xl md:text-6xl uppercase tracking-wide cursor-default leading-none mb-6 text-[#c1121f] drop-shadow-[0_0_30px_rgba(193,18,31,0.4)] font-normal text-left"
                >
                  JOURNEY
                </motion.h2>

                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
                  }}
                  className="w-full flex flex-col gap-4"
                >
                  <div className="w-14 h-[2px] bg-[#c1121f]" />
                  <p className="text-base md:text-lg leading-relaxed text-[#f5dbd8] font-light text-justify md:text-left transition-colors duration-500 max-w-xl">
                    Established in 2007, Myriad Arts is a one stop shop entertainment for all your entertainment related requirements. Be performing arts, visual arts, conceptualizing and directing stage and onscreen content, celebrity management and much more, be it corporate, entertainment or social sectors in India.
                  </p>
                </motion.div>
              </motion.div>

            </div>
          </div>
        </div>
    </div>

      {/* Seamless blend to next section */}
      <div className="absolute bottom-0 left-0 w-full h-[50vh] bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent z-10 pointer-events-none" />
    </section>
  );
}









