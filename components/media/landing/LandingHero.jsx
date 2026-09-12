"use client";

import React, { useEffect, useRef } from "react";
import { Montserrat } from "next/font/google";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

export default function LandingHero() {
  const containerRef = useRef(null);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
      const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
      const floatingCard = document.querySelector(".animate-float-card");
      if (floatingCard) {
        floatingCard.style.transform = `translate(${moveX}px, ${moveY}px) rotate(3deg)`;
      }
    };
    
    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <header 
      ref={containerRef}
      className={`relative w-full h-[921px] flex items-center justify-start overflow-hidden ${montserrat.className}`}
    >
      {/* Background Asset */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-[-1]" 
        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBexk8HCfEQX22RmQQgrChaF1_0LoU_tvTJ2QbWyVEI-nkkvHmp5eRzv9nCTgy7I3zLrylXwowtsrZWAISshQnpvp2MCcWwiTY6t0CNjATkc2R2BhsfTZU7tp5Fi1T77W0cSLvUMhF5zmvII9eiJEUJtFl8bBgYQLOn7550rI3qMTehk3Thofr_ajUaP1GLK19D21DpEK0oKPwCcCxXTq8Cl8v3_glp8-oBa9J5aDWuoSV44RVOHZRs5_5HEw5uNVxboR1kF7waoDIV')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/0 from-0% to-[#050505] to-90%" />
      
      <div className="relative z-10 px-[6vw] w-full pt-20">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-[72px] leading-[1.1] tracking-[-0.02em] font-extrabold text-[#fff7f6] mb-6"
        >
          Explore Calakar&apos;s <br />
          <span className="text-[#e50914]" style={{ textShadow: "0 0 20px rgba(229, 9, 20, 0.3)" }}>
            Digital Universe
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-sans text-lg md:text-[18px] leading-[28px] text-[#e9bcb6] mb-10 max-w-2xl"
        >
          Immerse yourself in a curated collection of cinematic performances, exclusive documentaries, and boundary-pushing artistic expressions designed for the digital age.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-6 items-start sm:items-center"
        >
          <Link href="/media/library">
            <button className="bg-[#e50914] text-white px-8 py-4 font-bold rounded-lg hover:scale-105 transition-transform">
              Start Exploring
            </button>
          </Link>
          <div className="flex items-center gap-3 text-[#e2e2e2] cursor-pointer group">
            <span className="material-symbols-outlined text-[#e50914] group-hover:scale-125 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>
              play_circle
            </span>
            <span className="font-sans text-[14px] font-semibold uppercase tracking-[0.05em] group-hover:text-[#e50914] transition-colors">
              Watch Trailer
            </span>
          </div>
        </motion.div>
      </div>

      {/* Floating Snippet Effect */}
      <div className="absolute right-[5%] top-[25%] hidden lg:block animate-float-card transition-transform duration-75 ease-out" style={{ transform: "rotate(3deg)" }}>
        <motion.div 
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="w-80 h-[450px] rounded-xl overflow-hidden p-2 shadow-2xl rotate-3"
          style={{ background: "rgba(31, 31, 31, 0.6)", backdropFilter: "blur(20px)", border: "1px solid rgba(47, 47, 47, 1)" }}
        >
          <div 
            className="w-full h-full rounded-lg bg-cover bg-center" 
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDPZiOndWY1_X3JS3nSm0Pb0i_0kZk1mdhc6O5dAcPEpMAWt_kQORAnt1EGMwueNUYIiIDeAl_10-a3_UW9zbyH0fPpsA6a1G1pQEUgfnarKjokVjZ35gjS_8-CZvumcqaCxSKrTp_nhKa2ltV0_uLSMsj5hZKwbyaf7jqat_mdDYcQeXjmUazLVfpVAI-tuN1K4Q0koI6h-eM7nFAHUnNytgKNVJnIJ1mZAzvfekWmKqdjDrJPX9FS6L0Ga-S9CY4di0ZUOOWeA2rT')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 to-transparent flex flex-col justify-end p-6 pointer-events-none">
            <span className="text-[#e50914] font-sans text-[14px] font-semibold tracking-[0.05em]">NOW SHOWING</span>
            <h3 className="text-center text-[24px] font-semibold text-[#e2e2e2]">The Crimson Pulse</h3>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
