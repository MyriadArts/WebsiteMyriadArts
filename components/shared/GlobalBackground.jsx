"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function GlobalBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* ATMOSPHERIC CONTINUOUS VAARSA GRADIENT BACKGROUND THROUGHOUT THE WEBSITE */}
      <div className="absolute top-[-10%] left-[10%] w-[50vw] h-[50vw] rounded-full bg-[#c1121f]/15 blur-[160px] animate-pulse" />
      <div className="absolute top-[38%] right-[-8%] w-[45vw] h-[45vw] rounded-full bg-[#820a13]/12 blur-[180px] animate-pulse" style={{ animationDelay: "2s" }} />
      <div className="absolute bottom-[-10%] left-[15%] w-[45vw] h-[45vw] rounded-full bg-[#c1121f]/12 blur-[170px] animate-pulse" style={{ animationDelay: "4s" }} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.04] via-transparent to-transparent opacity-80" />
      {/* Top Right Mandala */}
      <motion.div 
        className="absolute -top-[20vw] -right-[10vw] w-[50vw] h-[50vw] opacity-[0.03]"
        animate={{ rotate: 360, opacity: [0.02, 0.04, 0.02] }}
        transition={{ 
          rotate: { repeat: Infinity, duration: 150, ease: 'linear' },
          opacity: { repeat: Infinity, duration: 10, ease: 'easeInOut' }
        }}
      >
        <Image src="/images/home/gallery-mandala-art.png" alt="Texture" fill className="object-contain" />
      </motion.div>

      {/* Bottom Left Mandala */}
      <motion.div 
        className="absolute -bottom-[25vw] -left-[10vw] w-[60vw] h-[60vw] opacity-[0.02]"
        animate={{ rotate: -360, opacity: [0.01, 0.03, 0.01] }}
        transition={{ 
          rotate: { repeat: Infinity, duration: 200, ease: 'linear' },
          opacity: { repeat: Infinity, duration: 12, ease: 'easeInOut' }
        }}
      >
        <Image src="/images/home/gallery-mandala-art.png" alt="Texture" fill className="object-contain" />
      </motion.div>
    </div>
  );
}
