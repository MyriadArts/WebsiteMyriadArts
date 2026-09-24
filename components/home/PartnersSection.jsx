"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import VaarsaAtmosphericBackground from "../shared/VaarsaAtmosphericBackground";

export default function PartnersSection() {
  const partners = [
    "/images/partners/client-01.png",
    "/images/partners/client-02.png",
    "/images/partners/client-04.png",
    "/images/partners/client-05.png",
    "/images/partners/client-06.png",
    "/images/partners/client-07.png",
    "/images/partners/client-08.png",
    "/images/partners/client-09.png",
    "/images/partners/client-10.png",
    "/images/partners/client-11.png",
    "/images/partners/client-12.png",
    "/images/partners/client-13.png",
    "/images/partners/client-14.png",
    "/images/partners/client-15.png",
    "/images/partners/client-16.png",
    "/images/partners/client-17.png",
    "/images/partners/client-18.png",
    "/images/partners/client-20.png",
    "/images/partners/client-22.png",
    "/images/partners/client-23.png"
  ];

  return (
    <section id="partners" className="relative w-full bg-[#050505] overflow-hidden flex flex-col justify-center pt-16 pb-28 md:pt-24 md:pb-36">
      <VaarsaAtmosphericBackground />
      
      {/* Background Image */}
      <motion.div 
        className="absolute inset-0 z-0 overflow-hidden"
        initial={{ scale: 1 }}
        animate={{ scale: 1.1 }}
        transition={{ 
          duration: 30, 
          repeat: Infinity, 
          repeatType: "reverse", 
          ease: "easeInOut" 
        }}
      >
        <Image 
          src="/images/home/partners-backdrop.png" 
          alt="Dancers Background" 
          fill 
          className="object-cover object-center opacity-100"
          priority
        />
      </motion.div>
      
      {/* Black Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#050505]/80 via-[#050505]/60 to-[#050505]/80" />
      
      {/* Centered Heading with matching font size */}
      <motion.div 
        className="w-full px-6 md:px-12 lg:px-24 mb-8 md:mb-10 relative z-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="drop-shadow-[0_0_25px_rgba(255,255,255,0.45)]">
          <SectionHeading title={"Our Partners"} variant="default" className="text-center" />
        </div>
      </motion.div>

      {/* Horizontal Scrolling Carousel 1 (Leftward) */}
      <div className="w-full relative z-20 overflow-hidden py-3">
        <motion.div 
          className="flex gap-6 md:gap-10 px-4 w-max items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            x: { 
              repeat: Infinity, 
              repeatType: "loop", 
              duration: 35, 
              ease: "linear" 
            } 
          }}
        >
          {[...partners, ...partners].map((imgSrc, i) => (
            <motion.div 
              key={`row1-${i}`}
              className="flex-shrink-0 w-32 sm:w-36 md:w-44 h-20 sm:h-22 md:h-26 bg-white/65 backdrop-blur-xl rounded-xl md:rounded-2xl border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.3)] flex items-center justify-center relative group cursor-pointer hover:bg-white/90 hover:border-white hover:shadow-[0_10px_35px_rgba(255,255,255,0.4)] transition-all duration-300 p-2.5 md:p-3"
              whileHover={{ scale: 1.06, y: -3 }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <Image 
                  src={imgSrc} 
                  alt={`Partner ${i + 1}`} 
                  fill 
                  sizes="(max-width: 768px) 144px, 176px"
                  className="object-contain scale-105 group-hover:scale-110 transition-transform duration-300 drop-shadow-sm" 
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Horizontal Scrolling Carousel 2 (Rightward - Opposite Direction) */}
      <div className="w-full relative z-20 overflow-hidden py-3 mt-3">
        <motion.div 
          className="flex gap-6 md:gap-10 px-4 w-max items-center"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ 
            x: { 
              repeat: Infinity, 
              repeatType: "loop", 
              duration: 35, 
              ease: "linear" 
            } 
          }}
        >
          {[...partners, ...partners].reverse().map((imgSrc, i) => (
            <motion.div 
              key={`row2-${i}`}
              className="flex-shrink-0 w-32 sm:w-36 md:w-44 h-20 sm:h-22 md:h-26 bg-white/65 backdrop-blur-xl rounded-xl md:rounded-2xl border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.3)] flex items-center justify-center relative group cursor-pointer hover:bg-white/90 hover:border-white hover:shadow-[0_10px_35px_rgba(255,255,255,0.4)] transition-all duration-300 p-2.5 md:p-3"
              whileHover={{ scale: 1.06, y: -3 }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <Image 
                  src={imgSrc} 
                  alt={`Partner ${i + 1}`} 
                  fill 
                  sizes="(max-width: 768px) 144px, 176px"
                  className="object-contain scale-105 group-hover:scale-110 transition-transform duration-300 drop-shadow-sm" 
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 w-full h-24 md:h-32 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent z-20 pointer-events-none" />

    </section>
  );
}