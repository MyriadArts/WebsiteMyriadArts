"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from "framer-motion";
import Footer from '../../components/shared/Footer';
import ContactForm from '../../components/contact/ContactForm';
import VaarsaAtmosphericBackground from '../../components/shared/VaarsaAtmosphericBackground';

export default function ContactPage() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // FIX #10 — Parallax: dancer drifts upward as user scrolls down (stage entrance feel)
  const dancerY    = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  // Subtle scale on scroll — depth illusion
  const dancerScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.03, 1.0, 0.97]);

  return (
    <div className="bg-[#050505] text-on-surface min-h-screen pt-[78px] md:pt-[90px] pb-0 flex flex-col relative isolate">
      <VaarsaAtmosphericBackground fixed={true} />

      {/* ─── CINEMATIC COMPOSITION SECTION ──────────────────────── */}
      <section
        ref={sectionRef}
        className="relative w-full flex-1 overflow-hidden"
        style={{ minHeight: '88vh' }}
      >

        {/* ══════════════════════════════════════════════════════
            LAYER STACK (back → front):
            0  bg base / spotlight / mandalas
            1  stage atmospheric glows / brush (behind dancer)
            2  dancer image
        ══════════════════════════════════════════════════════ */}

        {/* ── LAYER 0: NEW BACKGROUND EFFECTS ── */}
        
        {/* Spotlight Effect (Top Center) */}
        <div
          className="absolute top-[-15%] left-[50%] -translate-x-1/2 w-[120%] h-[100%] z-[0] pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.01) 35%, transparent 65%)',
          }}
        />

        {/* Spinning Mandalas */}
        <motion.img
          src="/images/contact/contact-mandala-art.png"
          alt=""
          animate={{ rotate: -360 }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
          className="absolute left-[2%] bottom-[-10%] w-[35%] opacity-[0.025] z-[0] pointer-events-none mix-blend-screen hidden lg:block"
        />
        <motion.img
          src="/images/contact/contact-mandala-art.png"
          alt=""
          animate={{ rotate: 360 }}
          transition={{ duration: 110, repeat: Infinity, ease: "linear" }}
          className="absolute left-[38%] top-[45%] w-[22%] opacity-[0.02] z-[0] pointer-events-none mix-blend-screen hidden lg:block"
        />


        {/* ── LAYER 1a: Deep-red warm pool at stage floor ── */}
        {/* Dancer radial red glow */}
        <div
          className="absolute left-[-5%] bottom-[0%] w-[60%] h-[55%] z-[1] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 60% at 35% 85%, rgba(193,18,31,0.16) 0%, transparent 65%)',
          }}
        />
        {/* Soft ambient red glow behind quote to bridge sections */}
        <div
          className="absolute left-[30%] top-[30%] w-[40%] h-[50%] z-[1] pointer-events-none"
          style={{
            background: 'radial-gradient(circle 50% at 50% 50%, rgba(193,18,31,0.045) 0%, transparent 70%)',
            mixBlendMode: 'screen'
          }}
        />

        {/* Brush Texture behind dancer */}
        <motion.div
          className="absolute left-[4%] bottom-[5%] w-[55%] h-[80%] z-[1] pointer-events-none opacity-[0.15] hidden lg:block"
          style={{ mixBlendMode: 'screen' }}
        >
          <img src="/images/contact/contact-ink-brush.png" alt="brush texture" className="w-full h-full object-contain" />
        </motion.div>

        {/* ── LAYER 2: DANCER ── */}
        <motion.div
          className="absolute left-0 md:left-[6%] bottom-0 w-full md:w-[65%] h-[85%] md:h-[108%] z-[2] pointer-events-none opacity-80 md:opacity-100 transition-opacity duration-500 hidden lg:block"
          style={{
            y: dancerY,
            scale: dancerScale,
          }}
        >
          {/* Dancer gently floats 4-6px */}
          <motion.img
            animate={{ y: [-4, 4, -4] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            src="/images/contact/contact-dancer.png"
            alt="Dancer in stage lighting"
            className="h-full w-auto object-contain object-bottom mx-auto md:mx-0 mix-blend-screen filter brightness-110 contrast-105"
          />
        </motion.div>

        {/* ── LAYER 3: Smoke overlays on top of dancer ── */}

        <div
          className="absolute inset-x-0 bottom-0 h-[28%] z-[3] pointer-events-none"
          style={{
            background: 'linear-gradient(to top, #050505 0%, rgba(5,5,5,0.5) 65%, transparent 100%)',
          }}
        />

        {/* ── LAYER 4: Film grain texture + bridge gradients ── */}
        <div
          className="absolute inset-0 z-[4] opacity-[0.032] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '180px 180px',
          }}
        />

        {/* Visual Bridge Gradient - invisible seam between left and right */}
        <div className="absolute left-[40%] top-0 bottom-0 w-[30%] z-[4] pointer-events-none hidden lg:block"
          style={{ background: 'linear-gradient(to right, transparent, rgba(5,5,5,0.2), transparent)' }}
        />

        {/* ── LAYER 5: FOREGROUND CONTENT — Quote + Form ── */}
        <div className="relative z-[10] h-full flex items-center">
          <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-margin-desktop">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-0 items-center lg:items-start pt-0 sm:pt-4 lg:pt-8 pb-12 sm:pb-20 relative">

              {/* Left gutter */}
              <div className="hidden lg:block lg:col-span-4" />

              {/* ── QUOTE COLUMN ── */}
              <motion.div
                // Fade in + slight blur removal on scroll
                initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                viewport={{ once: true, margin: "-40px" }}
                className="w-full lg:col-span-4 flex-col items-center lg:items-start text-center lg:text-left justify-center relative mt-0 lg:mt-[10px] lg:-ml-4 lg:-mr-4 z-20 pointer-events-none hidden lg:flex"
              >
                {/* Opening quote mark (Increased size) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, y: 12 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 1.0, delay: 0.35, type: "spring", stiffness: 100, damping: 16 }}
                  viewport={{ once: true }}
                  className="mb-[-12px] lg:ml-[-8px]"
                >
                  <span
                    className="font-display-lg leading-none text-primary-container select-none"
                    style={{
                      fontSize: 'clamp(48px, 6vw, 90px)',
                      display: 'block',
                      lineHeight: 0.75,
                      filter: 'drop-shadow(0 0 16px rgba(193,18,31,0.50))',
                    }}
                  >
                    &ldquo;
                  </span>
                </motion.div>

                {/* Quote body */}
                <motion.h2
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
                  viewport={{ once: true }}
                  className="type-editorial-quote text-on-surface relative z-10"
                >
                  <span className="type-editorial-quote">Natya</span> is the<br />
                  mirror of{' '}
                  <span
                    className="italic font-light text-primary-container"
                    style={{ filter: 'drop-shadow(0 0 12px rgba(193,18,31,0.4))' }}
                  >
                    life.
                  </span>
                </motion.h2>

                {/* Closing mark */}
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="font-display-lg text-primary-container select-none mt-2 leading-none"
                  style={{
                    fontSize: 'clamp(36px, 4.5vw, 70px)',
                    lineHeight: 0.55,
                    filter: 'drop-shadow(0 0 12px rgba(193,18,31,0.38))',
                  }}
                >
                  &rdquo;
                </motion.span>

                {/* Attribution */}
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.9, delay: 0.75, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="flex items-center justify-center lg:justify-start gap-3 mt-2 lg:mt-4 pl-0.5"
                >
                  <span className="type-meta text-primary-container opacity-85">
                    ~ Bharata Muni
                  </span>
                </motion.div>
              </motion.div>

              {/* ── FORM COLUMN ── */}
              <div className="w-full lg:col-span-4 flex justify-center lg:justify-start items-center lg:items-start relative pt-4 lg:pt-8 lg:-ml-20 z-30 max-w-[540px] mx-auto lg:mx-0">

                {/* Extremely subtle glow behind form */}
                <motion.div
                  animate={{ scale: [1, 1.05, 1], opacity: [0.015, 0.035, 0.015] }}
                  transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-[-10%] bg-primary-container blur-[120px] rounded-full pointer-events-none z-[-1]"
                />

                <ContactForm />

              </div>

            </div>
          </div>
        </div>

        {/* ── LAYER 6: Section transition fades ── */}

        {/* Bottom — seamless merge with footer */}
        <div
          className="absolute inset-x-0 bottom-0 h-40 z-[8] pointer-events-none"
          style={{ background: 'linear-gradient(to top, #050505 0%, rgba(5,5,5,0.55) 65%, transparent 100%)' }}
        />

      </section>

      <Footer />
    </div>
  );
}