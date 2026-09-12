"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import VaarsaAtmosphericBackground from "../../shared/VaarsaAtmosphericBackground";

export default function OurJourneySection() {
  return (
    <section id="our-story" className="relative w-full py-16 md:py-24 border-b border-white/5 z-10 bg-[#050505] overflow-hidden">
      <VaarsaAtmosphericBackground />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-20 relative z-10">
        <div className="relative max-w-5xl mx-auto bg-black/75 backdrop-blur-md p-8 sm:p-10 md:p-12 rounded-2xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.85)]">

          {/* Staircase Grid Layout:
              - Row 1, Col 1: "OUR" above image, right-aligned so 'R' ends at end of image width
              - Row 2, Col 1: Polaroid Image
              - Row 2, Col 2: "JOURNEY" + Description text
          */}
          <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] gap-x-10 md:gap-x-14 items-start">

            {/* Row 1, Col 1: OUR */}
            <div className="w-full max-w-[280px] lg:max-w-[320px] mx-auto md:ml-0 flex justify-end mb-4">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true, margin: "-50px" }}
                className="font-evelins text-4xl sm:text-5xl md:text-6xl uppercase tracking-wide cursor-default leading-none text-white drop-shadow-[0_0_30px_rgba(0,0,0,0.8)] text-right"
              >
                OUR
              </motion.h2>
            </div>

            {/* Row 1, Col 2: Spacer */}
            <div className="hidden md:block" />

            {/* Row 2, Col 1: Polaroid Image */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-50px" }}
              className="w-full max-w-[280px] lg:max-w-[320px] mx-auto md:ml-0 relative z-20 flex flex-col items-start mb-8 md:mb-0"
            >
              <div className="bg-[#e6e2da] p-3.5 pb-14 shadow-[0_25px_50px_rgba(0,0,0,0.85)] w-full relative rounded-sm">
                <div className="relative w-full aspect-[4/5] bg-black overflow-hidden group">
                  <Image
                    src="/images/media/media-our-journey.jpg"
                    alt="Myriad Origin"
                    fill
                    sizes="(max-width: 1024px) 280px, 320px"
                    className="object-cover contrast-125 group-hover:scale-105 transition-all duration-700"
                  />
                </div>
                <div className="absolute bottom-3.5 left-3.5">
                  <span className="font-sans text-[17px] font-semibold text-[#1a1a1a] uppercase tracking-tight leading-[1.1] block">
                    MYRIAD<br />ORIGINS
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Row 2, Col 2: Typography & Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.2, delayChildren: 0.1 }
                }
              }}
              className="w-full relative z-30 flex flex-col justify-start"
            >
              <motion.h2
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
                }}
                className="font-evelins text-4xl sm:text-5xl md:text-6xl uppercase tracking-wide cursor-default leading-none mb-6 text-[#c1121f] drop-shadow-[0_0_30px_rgba(193,18,31,0.4)] font-normal text-left"
              >
                JOURNEY
              </motion.h2>

              {/* Body Text Container */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
                }}
                className="flex flex-col items-start relative z-20"
              >
                <div className="space-y-4 text-base md:text-lg text-[#f5dbd8] leading-relaxed max-w-xl font-sans font-medium text-left border-l border-white/15 pl-6">
                  <p>
                    Established in 2009, Myriad Arts is a one stop shop entertainment for all your entertainment related requirements. Be performing arts, visual arts, conceptualizing and directing stage and onscreen content, celebrity management and much more, be it corporate, entertainment or social sectors in India.
                  </p>
                  <p>
                    Although based in Mumbai, we strive to make a mark beyond national borders. We believe in originality and creativity of an event and thus make your event memorable and interesting! Myriad is a CART FULL OF ART!
                  </p>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
