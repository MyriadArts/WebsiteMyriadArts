"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LandingCTA() {
  return (
    <section className="py-20 flex flex-col items-center justify-center text-center px-[6vw] text-[#e2e2e2]">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="font-evelins text-[28px] md:text-[40px] tracking-wider mb-6 max-w-2xl text-white"
      >
        Ready to dive deeper into the vault?
      </motion.h2>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Link 
          href="/media/library" 
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans font-bold uppercase tracking-wider bg-[#e50914] text-white text-[16px] px-8 py-3 rounded-md inline-block hover:bg-[#c10710] transition-colors"
        >
          Explore Media Library
        </Link>
      </motion.div>
      
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-6 font-sans text-[12px] font-bold text-[#e9bcb6] uppercase tracking-[0.15em]"
      >
        Curated. Cinematic. Calakar.
      </motion.p>
    </section>
  );
}
