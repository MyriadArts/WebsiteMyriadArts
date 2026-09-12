"use client";

import React from "react";
import { Play, TrendingUp, Users, Calendar } from "lucide-react";
import { motion } from "framer-motion";

export default function YouTubeShowcase() {
  return (
    <section className="py-24 bg-transparent text-[#e2e2e2]">
      <div className="px-[6vw] w-full">
        
        {/* Banner containing both the channel info and the showcase content */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.2 }
            }
          }}
          className="relative w-full rounded-3xl overflow-hidden p-8 md:p-14 lg:p-20 border border-white/5 shadow-2xl group"
          style={{ 
            background: "linear-gradient(145deg, rgba(25, 25, 25, 0.6) 0%, rgba(10, 10, 10, 0.8) 100%)", 
            backdropFilter: "blur(40px)" 
          }}
        >
          {/* Subtle animated background gradient orb */}
          <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none z-0">
            <div className="absolute -top-[30%] -right-[10%] w-[70%] h-[70%] bg-gradient-to-b from-[#e50914]/10 to-transparent rounded-full blur-[120px] mix-blend-screen opacity-50 group-hover:opacity-80 transition-opacity duration-1000"></div>
          </div>
          
          <div className="relative z-10 w-full h-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center w-full h-full">
              
              {/* Left Column (Title & Artistic Accents) */}
              <div className="lg:col-span-5 flex flex-col relative h-full justify-center">
                
                {/* Main Title Container */}
                <div className="relative pl-6 md:pl-8 py-2">
                  {/* Glowing Accent Line */}
                  <motion.div 
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                    className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#e50914] via-[#ff4b4b] to-transparent origin-top rounded-full shadow-[0_0_10px_rgba(229,9,20,0.5)]"
                  />
                  
                  <motion.h3 
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
                    className="font-evelins text-[40px] md:text-[56px] lg:text-[72px] leading-[1.05] text-white tracking-wide"
                  >
                    <span className="block text-white/90">The Central</span>
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#e50914] to-[#ff7a7a] drop-shadow-sm pb-2">Hub of Our</span>
                    <span className="block text-white/90">Narrative</span>
                  </motion.h3>
                </div>
              </div>

              {/* Right Column (Description) */}
              <div className="lg:col-span-7 flex flex-col h-full justify-center">
                <motion.div
                  variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] } } }}
                  className="relative"
                >
                  <p className="font-sans text-[16px] md:text-[18px] lg:text-[22px] leading-[1.8] text-[#cccccc] font-light tracking-wide">
                    Our digital presence is where the Calakar heart beats the loudest. From world-premiere performance films to granular technical breakdowns, our platforms serve as the definitive archive of our artistic journey. Join a global community of enthusiasts who value high-fidelity storytelling, technical excellence, and the relentless pursuit of perfection in the performing arts.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}
