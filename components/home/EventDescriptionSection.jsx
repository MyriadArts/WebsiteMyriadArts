"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import VaarsaAtmosphericBackground from "../shared/VaarsaAtmosphericBackground";

export default function EventDescriptionSection() {
  const router = useRouter();
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  const isContentInView = useInView(contentRef, { once: true, margin: "-60px" });
  const isImageInView = useInView(imageRef, { once: true, margin: "-60px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgParallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);

  return (
    <motion.section
      ref={sectionRef}
      id="event-description"
      className="relative w-full min-h-screen md:h-screen bg-[#050505] flex flex-col items-center justify-center py-12 md:py-0 overflow-hidden isolate"
      initial={{ opacity: 0, x: -80 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
    >
      <VaarsaAtmosphericBackground />
      {/* ── Grayscale Background Image ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        style={{ y: bgParallaxY }}
      >
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: "url('/images/home/home-vaarsa-event-feature.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "grayscale(100%) brightness(1) contrast(1.1)",
          }}
        />
        {/* Dark overlay to keep readability */}
        <div className="absolute inset-0 bg-[#050505]/70" />
        {/* Red ambient glow */}
        <div
          className="absolute left-[5%] top-[20%] w-[40vw] h-[40vw] rounded-full blur-[130px] opacity-[0.08]"
          style={{ background: "radial-gradient(circle, #c1121f 0%, transparent 70%)" }}
        />
      </motion.div>

      {/* Top/Bottom blends */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#050505] to-transparent pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-10" />

      {/* ── Content Wrapper ── */}
      <div className="relative z-20 w-full max-w-[64rem] mx-auto px-4 sm:px-6 md:px-8 -mt-6 md:-mt-16 lg:-mt-20">

        {/* ── Ticket-Style Main Card ── */}
        <motion.div
          ref={contentRef}
          onClick={() => router.push("/vaarsa")}
          className="relative w-full rounded-xl md:rounded-2xl overflow-hidden border border-white/[0.08] bg-white/[0.04] backdrop-blur-md shadow-[0_24px_60px_rgba(0,0,0,0.65)] cursor-pointer group"
          initial={{ opacity: 0, y: 60, scale: 0.97 }}
          animate={isContentInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        >

          <div className="flex flex-col md:flex-row min-h-[300px] md:min-h-[360px] lg:min-h-[400px]">
            {/* ── Left: Text Panel ── */}
            <div className="flex-1 p-5 sm:p-6 md:p-8 lg:p-9 flex flex-col justify-center">

              <motion.span
                className={`font-sans text-[#c1121f] text-[10px] font-bold tracking-[0.38em] uppercase mb-2 block`}
                initial={{ opacity: 0, x: -20 }}
                animate={isContentInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
              </motion.span>

              <motion.h3
                className="type-heading-xl text-white mb-3 sm:mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={isContentInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                Vaarsa
              </motion.h3>

              <motion.p
                className="type-body-md text-white/60 mb-5"
                initial={{ opacity: 0, y: 16 }}
                animate={isContentInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                Celebrating India's living traditions 100+ folk arts across 28 states,
                brought alive through rhythm, color, and community.
              </motion.p>

              <motion.div
                className="flex items-center gap-4"
                initial={{ opacity: 0, y: 16 }}
                animate={isContentInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <button
                  suppressHydrationWarning
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push("/vaarsa");
                  }}
                  className="type-button bg-[#c1121f] text-white px-6 py-2.5 rounded hover:bg-[#a50f1a] transition-colors shadow-lg cursor-pointer"
                >
                  Explore Event
                </button>
              </motion.div>
            </div>

            {/* ── Right: Image Panel ── */}
            <motion.div
              ref={imageRef}
              className="relative w-full md:w-[38%] min-h-[200px] md:min-h-0 overflow-hidden"
              initial={{ opacity: 0, scale: 1.08 }}
              animate={isImageInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <video
                src="https://pub-de5dfcf82d8f4854a79642f955c48806.r2.dev/home/vaarsa-home.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 via-transparent to-transparent" />

              <motion.div
                className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md border border-white/10 rounded-lg px-3 py-2 shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={isImageInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="type-meta text-[#c1121f] block mb-0.5">
                  Featured
                </span>
                <span className="type-heading-md text-white">
                  Folk Arts of India
                </span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
