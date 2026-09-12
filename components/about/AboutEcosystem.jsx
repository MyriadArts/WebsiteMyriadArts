"use client";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AboutEcosystem() {
  const [activeTab, setActiveTab] = useState("Performance");

  const ecosystemData = {
    Performance: {
      image: "/images/about/about-gallery-01.jpg",
      title: "Performance Division",
      desc: "Myriad Arts creates and presents contemporary dance and live performance experiences that bring movement, music, storytelling, and visual design together. From stage productions and live events to immersive performances, we create work that connects artists and audiences in powerful ways.",
      list: [ "Contemporary Dance Performances",
    "Stage & Live Event Productions",
    "Choreography & Performance Direction",
    "Immersive & Experimental Performances"]
    },
    Education: {
      image: "/images/about/about-gallery-03.jpg",
      title: "Education Division",
      desc: "Rewiring the minds and muscles of future architects. We don't just teach; we deconstruct and rebuild the artist from the atomic level.",
      list: ["Somatic Conditioning", "Digital Integration Workshops", "Heritage Deconstruction", "Masterclass Residencies"]
    },
    Production: {
      image: "/images/about/about-gallery-05.jpg",
      title: "Production Division",
      desc: "The heavy machinery. Where conceptual ghosts become physical monoliths through high-end technical integration.",
      list: ["High-Fidelity Audio Engineering", "Volumetric Lighting Design", "Set Architecture & Fabrication", "Live Signal Processing"]
    }
  };

  return (
    <section className="relative w-full py-32 border-b border-white/5 z-10 bg-[#0a0202]">
      <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image src={ecosystemData[activeTab].image} alt="Background" fill className="object-cover" />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0202] via-transparent to-[#0a0202] z-0 pointer-events-none"></div>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20 relative z-10">
        <div className="type-meta bg-white text-black px-4 py-1 mb-16 inline-block" data-aos="fade-right">
          ORGANIZATION STRUCTURE
        </div>

        <h2 className="font-evelins font-normal text-3xl sm:text-4xl md:text-5xl uppercase text-white mb-16 tracking-wide" data-aos="fade-right">
          Our <span className="text-[#c1121f]">Ecosystem</span>
        </h2>

        <div className="w-full">
          {/* Tabs */}
          <div className="flex border-b border-white/20 mb-12" data-aos="fade-up">
            {Object.keys(ecosystemData).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-4 type-label-caps transition-all duration-300 relative ${activeTab === tab ? "text-white bg-[#0a0202]" : "text-[#a19e99] hover:text-white"
                  }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-[#c1121f]"></div>
                )}
                {activeTab === tab && (
                  <div className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-[#030303]"></div>
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div data-aos="fade-up" data-aos-delay="100" className="min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, filter: "blur(10px)", scale: 0.98 }}
                animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                exit={{ opacity: 0, filter: "blur(10px)", scale: 1.02 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-col lg:flex-row gap-12"
              >
                <div className="w-full lg:w-5/12">
                  <div className="relative aspect-[4/3] border border-white/20 p-2 bg-[#0a0202]">
                    <div className="relative w-full h-full bg-[#030303] overflow-hidden group">
                      <Image src={ecosystemData[activeTab].image} alt={activeTab} fill className="object-cover grayscale mix-blend-luminosity contrast-125 group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-[#c1121f]/20 mix-blend-multiply"></div>
                    </div>
                  </div>
                </div>

                <div className="w-full lg:w-7/12 pt-4">
                  <h3 className="font-evelins text-3xl uppercase text-white mb-6 tracking-tight">
                    {ecosystemData[activeTab].title}
                  </h3>
                  <p className="text-base text-[#a19e99] leading-relaxed mb-8 border-b border-white/10 pb-8">
                    {ecosystemData[activeTab].desc}
                  </p>
                  <ul className="space-y-4">
                    {ecosystemData[activeTab].list.map((item, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <span className="text-[#c1121f] text-[10px] mt-1">■</span>
                        <span className="text-sm text-white tracking-wide">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
