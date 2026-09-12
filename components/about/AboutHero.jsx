"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutHero() {
  return (
    <section className="sticky top-0 w-full h-screen pt-32 pb-20 flex flex-col items-center justify-center border-b border-white/5 z-0 overflow-hidden bg-transparent">
      {/* Animated Gradient Background - GPU Accelerated */}
      <motion.div
        className="absolute inset-x-0 top-0 w-full h-[200vh] z-0 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, #050505 0%, #120204 50%, #3a060c 100%)",
        }}
        animate={{ y: ["0%", "-50%", "0%"] }}
        transition={{ duration: 15, ease: "easeInOut", repeat: Infinity }}
      />

      {/* Floating Images (Lanterns) */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        {[
          { src: "/images/dance-illustrations/classical-dancer.png", size: "w-40 h-56", left: "8%", top: "15%", delay: 0.1 },
          { src: "/images/dance-illustrations/contemporary-dancer.png", size: "w-40 h-56", left: "78%", top: "18%", delay: 0.3 },
          { src: "/images/dance-illustrations/folk-dancer.png", size: "w-40 h-56", left: "5%", top: "55%", delay: 0.5 },
          { src: "/images/dance-illustrations/ink-art-dancer.png", size: "w-40 h-56", left: "82%", top: "58%", delay: 0.7 },
          { src: "/images/dance-illustrations/dancer-hand-mudra.png", size: "w-40 h-56", left: "42%", top: "-5%", delay: 0.9 },
          { src: "/images/dance-illustrations/stage-performance-dancer.png", size: "w-40 h-56", left: "30%", top: "85%", delay: 1.1 },
          { src: "/images/dance-illustrations/stage-performance-dancer.png", size: "w-40 h-56", left: "62%", top: "80%", delay: 1.3 },
        ].map((lantern, idx) => (
          <motion.div
            key={idx}
            className={`absolute ${lantern.size}`}
            style={{ left: lantern.left, top: lantern.top }}
            initial={{ y: "100vh", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 1.8,
              ease: [0.16, 1, 0.3, 1],
              delay: lantern.delay,
            }}
          >
            <motion.div
              className="w-full h-full relative overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.05)] border border-white/10"
              animate={{ y: ["-4px", "4px", "-4px"] }}
              transition={{
                duration: 4 + (idx % 3) * 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: lantern.delay,
              }}
            >
              <Image
                src={lantern.src}
                alt="Lantern Image"
                fill
                className="object-cover transition-all duration-700 pointer-events-auto"
              />
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Centerpiece Text */}
      <div className="relative z-20 text-center px-6 md:px-12 max-w-5xl mx-auto pt-6 flex flex-col items-center pointer-events-none">
        
        {/* Sub-heading / Tag */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs md:text-sm font-semibold tracking-[0.4em] text-[#c1121f] uppercase block mb-4"
        >
          The Myriad Arts Story
        </motion.span>

        {/* Theatrical Title Heading */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 35 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex justify-center items-center mb-6 group cursor-pointer w-fit mx-auto pointer-events-auto"
        >
          {/* Heading Title with Solid Crimson Accent */}
          <h1 className="font-evelins text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] font-light leading-[0.95] tracking-wide text-white drop-shadow-[0_10px_40px_rgba(0,0,0,0.95)] group-hover:scale-105 transition-all duration-500 ease-out">
            About <span className="text-[#c1121f] font-normal">Us</span>
          </h1>
        </motion.div>

        {/* Decorative Stage Divider Line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#c1121f] to-transparent mx-auto mb-6"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10 text-[#f5dbd8] font-light drop-shadow-[0_2px_15px_rgba(0,0,0,0.95)]"
        >
          Under one creative banner, we bring visions to life through captivating ink art, timeless photography, electrifying performances, and seamless event management. Our passion is crafting extraordinary experiences.
        </motion.p>
      </div>
    </section>
  );
}
