"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutJourney() {
  return (
    <section id="our-story" className="relative w-full py-24 border-b border-white/5 z-10 bg-transparent overflow-hidden">
      {/* Background ambient elements */}
    

      <div className="max-w-[1440px] mx-auto px-6 lg:px-20 relative z-10 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
       
          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-x-10 lg:gap-x-14 items-start justify-center">

            {/* Row 1, Col 1: OUR */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-100px" }}
              className="w-full max-w-[240px] mx-auto lg:ml-0 flex justify-end mb-4"
            >
              <h2 className="font-evelins text-4xl sm:text-5xl md:text-6xl uppercase tracking-wide cursor-default text-white drop-shadow-[0_0_30px_rgba(0,0,0,0.8)] leading-none text-right">
                OUR
              </h2>
            </motion.div>

            {/* Row 1, Col 2: Desktop grid spacer */}
            <div className="hidden lg:block" />

            {/* Row 2, Col 1: Image */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-100px" }}
              className="w-full max-w-[240px] mx-auto lg:ml-0 relative z-20 mb-8 lg:mb-0"
            >
              <div className="bg-[#e6e2da] p-3 pb-12 shadow-[0_30px_60px_rgba(0,0,0,0.8)] w-full relative">
                <div className="relative w-full aspect-[4/5] bg-black overflow-hidden group">
                  <Image
                    src="/images/about/about-our-journey.jpeg"
                    alt="Myriad Origin"
                    fill
                    sizes="(max-width: 1024px) 240px, 300px"
                    className="object-cover contrast-125 group-hover:scale-105 transition-all duration-700"
                  />
                </div>
                <div className="absolute bottom-3 left-3">
                  <span className="font-sans text-[16px] font-semibold text-[#1a1a1a] uppercase tracking-tight leading-[1.1] block">
                    MYRIAD<br />ORIGINS
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Row 2, Col 2: JOURNEY + Description text */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.2, delayChildren: 0.1 }
                }
              }}
              className="w-full relative z-30 flex flex-col justify-start"
            >
              {/* JOURNEY starts at the height where image height starts and width where description starts */}
              <motion.h2
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
                }}
                className="font-evelins text-4xl sm:text-5xl md:text-6xl uppercase tracking-wide cursor-default text-[#c1121f] drop-shadow-[0_0_30px_rgba(193,18,31,0.4)] font-normal leading-none mb-6 text-left"
              >
                JOURNEY
              </motion.h2>

              {/* Body Text Container */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
                }}
                className="flex flex-col items-start relative z-20"
              >
                <div className="space-y-6 text-[13px] md:text-[14px] text-[#a19e99] leading-relaxed max-w-md font-sans font-medium text-left border-l border-white/10 pl-6">
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
