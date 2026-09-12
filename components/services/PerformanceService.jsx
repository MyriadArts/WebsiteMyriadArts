"use client";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  containerVariants,
  textVariants,
  floatingVariants,
  cardVariants,
} from "../../lib/animations";

// Animated Counter Hook Component
function AnimatedCounter({ end, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      const easeOut = 1 - Math.pow(1 - percentage, 3);
      setCount(Math.floor(easeOut * end));

      if (progress < duration) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

const performancesData = [
  {
    id: 1,
    tag: "Recent Performance",
    title: "Geet Govind",
    description: "A mesmerizing presentation of Geet Govind.",
    image: "https://i.ytimg.com/vi/PaWwnCSa8Zc/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/PaWwnCSa8Zc?playsinline=1&controls=1&rel=0"
  },
  {
    id: 2,
    tag: "Recent Performance",
    title: "Marathi Folk",
    description: "An energetic and vibrant Marathi folk performance.",
    image: "https://i.ytimg.com/vi/-LBctAnMXVQ/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/-LBctAnMXVQ?playsinline=1&controls=1&rel=0"
  },
  {
    id: 3,
    tag: "Recent Performance",
    title: "Dance Week",
    description: "A showcase of artistic brilliance during Dance Week.",
    image: "https://i.ytimg.com/vi/U5pnPiTwfgo/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/U5pnPiTwfgo?playsinline=1&controls=1&rel=0"
  }
];

export default function PerformanceService({ detailScrollRef }) {
  const [selectedPerformance, setSelectedPerformance] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.div 
      id="performances"
      initial="hidden"
      whileInView="visible"
      viewport={{ root: detailScrollRef, once: true, amount: 0.15 }}
      variants={containerVariants}
      className="scroll-mt-24 pb-8 w-full text-center"
    >
      {/*  Header with reduced negative space  */}
      <section className="px-margin-mobile md:px-margin-desktop pt-4 md:pt-8 pb-8 max-w-max-width mx-auto">
        <motion.h1 
          variants={textVariants} 
          animate="visible"
          className="font-evelins text-4xl md:text-5xl lg:text-6xl text-on-surface mb-4 pt-1 pb-3 leading-snug tracking-wide max-w-full"
        >
          We Build Stages That Don't Forget You
        </motion.h1>
        <motion.div variants={textVariants} className="w-24 h-[1px] bg-rule-white mx-auto"></motion.div>
      </section>

      {/*  Performance Metrics Strip  */}
      <section className="px-margin-mobile md:px-margin-desktop py-16 md:py-20 max-w-max-width mx-auto border-b border-rule-white">
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16"
        >
          {/*  Metric 1: Total Performances  */}
          <motion.div 
            variants={floatingVariants}
            className="flex flex-col items-center text-center group"
          >
            <motion.div 
              variants={textVariants}
              className="text-4xl md:text-5xl font-bold text-primary-container mb-3 font-sans"
            >
              <AnimatedCounter end={500} suffix="+" />
            </motion.div>
            <motion.p 
              variants={textVariants}
              className="font-sans text-xs md:text-sm font-semibold uppercase text-on-surface tracking-[0.25em]"
            >
              Performances Delivered
            </motion.p>
            <motion.p 
              variants={textVariants}
              className="font-sans text-text-muted mt-2 text-xs md:text-sm leading-relaxed"
            >
              Across global stages and prestigious venues
            </motion.p>
          </motion.div>

          {/*  Metric 2: Folk Dances  */}
          <motion.div 
            variants={floatingVariants}
            className="flex flex-col items-center text-center group"
          >
            <motion.div 
              variants={textVariants}
              className="text-4xl md:text-5xl font-bold text-primary-container mb-3 font-sans"
            >
              <AnimatedCounter end={25} suffix="+" />
            </motion.div>
            <motion.p 
              variants={textVariants}
              className="font-sans text-xs md:text-sm font-semibold uppercase text-on-surface tracking-[0.25em]"
            >
              Folk Dance Styles
            </motion.p>
            <motion.p 
              variants={textVariants}
              className="font-sans text-text-muted mt-2 text-xs md:text-sm leading-relaxed"
            >
              From Bharatanatyam to contemporary fusion
            </motion.p>
          </motion.div>

          {/*  Metric 3: Master Artists  */}
          <motion.div 
            variants={floatingVariants}
            className="flex flex-col items-center text-center group"
          >
            <motion.div 
              variants={textVariants}
              className="text-4xl md:text-5xl font-bold text-primary-container mb-3 font-sans"
            >
              <AnimatedCounter end={50} suffix="+" />
            </motion.div>
            <motion.p 
              variants={textVariants}
              className="font-sans text-xs md:text-sm font-semibold uppercase text-on-surface tracking-[0.25em]"
            >
              Master Artists
            </motion.p>
            <motion.p 
              variants={textVariants}
              className="font-sans text-text-muted mt-2 text-xs md:text-sm leading-relaxed"
            >
              Decades of expertise in classical performance
            </motion.p>
          </motion.div>
        </motion.div>
      </section>

      {/*  Portrait Cards Grid  */}
      <section className="px-margin-mobile md:px-margin-desktop py-16 md:py-20 max-w-max-width mx-auto">
        <motion.span variants={textVariants} className="font-sans text-xs uppercase font-bold text-primary tracking-[0.3em] mb-8 block text-center w-full">Our Performance Disciplines</motion.span>
        <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {/*  Card 1: Classical Dance  */}
          <motion.div variants={cardVariants} animate="visible" className="card-brighten card-border-slide group cursor-pointer pb-6">
            <div className="aspect-[3/4] bg-black/40 overflow-hidden mb-8">
              <img alt="Classical Indian Dancer" className="w-full h-full object-cover" src="/images/services/service-folk-dance.jpg" />
            </div>
            <h3 className="font-evelins text-lg md:text-xl text-on-surface mb-3 tracking-wide">Folk</h3>
            <p className="text-text-muted font-sans text-xs md:text-sm leading-relaxed pb-4">Authentic traditional repertoires reimagined for the modern global stage, focusing on precision, rhythm, and the profound depth of Indian heritage.</p>
          </motion.div>
          {/*  Card 2: Theatre Productions  */}
          <motion.div variants={cardVariants} animate="visible" className="card-brighten card-border-slide group cursor-pointer pb-6">
            <div className="aspect-[3/4] bg-black/40 overflow-hidden mb-8">
              <img alt="Theatrical Production" className="w-full h-full object-cover" src="/images/services/service-theatre.jpg" />
            </div>
            <h3 className="font-evelins text-lg md:text-xl text-on-surface mb-3 tracking-wide">Theatre Production</h3>
            <p className="text-text-muted font-sans text-xs md:text-sm leading-relaxed pb-4">Immersive storytelling that blends centuries-old dramatic traditions with cutting-edge narrative techniques for high-fidelity theater environments.</p>
          </motion.div>
          {/*  Card 3: Fusion Performances  */}
          <motion.div variants={cardVariants} animate="visible" className="card-brighten card-border-slide group cursor-pointer pb-6">
            <div className="aspect-[3/4] bg-black/40 overflow-hidden mb-8">
              <img alt="Fusion Performance" className="w-full h-full object-cover" src="/images/services/service-fusion.jpg" />
            </div>
            <h3 className="font-evelins text-lg md:text-xl text-on-surface mb-3 tracking-wide">Fusion</h3>
            <p className="text-text-muted font-sans text-xs md:text-sm leading-relaxed pb-4">A rhythmic dialogue between classical Indian roots and global contemporary art forms, creating energetic and avant-garde spectacles.</p>
          </motion.div>
        </motion.div>
      </section>

      {/*  Previous Dance Performance Overview  */}
      <section className="px-margin-mobile md:px-margin-desktop py-16 md:py-24 max-w-max-width mx-auto border-b border-rule-white">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ root: detailScrollRef, once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.span variants={textVariants} className="font-sans text-xs md:text-sm uppercase font-bold text-primary tracking-[0.3em] mb-8 block text-center w-full">Recent Performances</motion.span>
          <motion.h2 variants={textVariants} className="font-evelins text-3xl md:text-4xl text-on-surface mb-12 max-w-3xl leading-tight tracking-wide text-center mx-auto w-full">Memorable Moments on Stage</motion.h2>
          
          <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {performancesData.map((perf) => (
              <motion.div 
                key={perf.id}
                variants={cardVariants}
                onClick={() => setSelectedPerformance(perf)}
                className="bg-black/60 rounded-xl overflow-hidden border border-rule-white group hover:border-[#c1121f]/70 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl active:scale-[0.98] select-none"
              >
                <div className="aspect-video bg-black/40 overflow-hidden relative">
                  <img alt={perf.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100" src={perf.image} />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPerformance(perf);
                      }}
                      className="w-14 h-14 rounded-full bg-[#c1121f] hover:bg-[#a10e1a] text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl cursor-pointer pointer-events-auto"
                      aria-label={`Play ${perf.title}`}
                    >
                      <span className="material-symbols-outlined text-3xl">play_arrow</span>
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <motion.h3 variants={textVariants} className="font-evelins text-xl md:text-2xl text-white group-hover:text-white transition-colors tracking-wide">
                    {perf.title}
                  </motion.h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/*  Video & Content Modal (Portaled to document.body)  */}
      {mounted && createPortal(
        <AnimatePresence>
          {selectedPerformance && (
            <div 
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setSelectedPerformance(null);
                }
              }}
              className="fixed inset-0 z-[100000] !bg-[#000000] !bg-opacity-100 flex items-center justify-center p-4 md:p-8 overflow-y-auto"
            >
              <div 
                className="!bg-[#000000] border border-white/20 rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl relative z-10 my-auto animate-in fade-in zoom-in duration-200"
              >
                {/* Close Button */}
                <button 
                  type="button"
                  onClick={() => setSelectedPerformance(null)}
                  className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/80 hover:bg-[#c1121f] text-white flex items-center justify-center transition-colors border border-white/20 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-lg">close</span>
                </button>

                {/* Responsive Video Container */}
                <div className="aspect-video w-full bg-[#000000] relative z-10 pointer-events-auto">
                  <iframe 
                    src={selectedPerformance.videoUrl} 
                    title={selectedPerformance.title}
                    className="w-full h-full border-0 relative z-10"
                    style={{ pointerEvents: "auto", touchAction: "auto" }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                    allowFullScreen
                  />
                </div>

                {/* Content Information */}
                <div className="p-6 md:p-8 text-left !bg-[#000000] relative z-10">
                  <span className="font-sans text-xs text-primary-container tracking-[0.25em] uppercase block mb-2 font-semibold">
                    {selectedPerformance.tag}
                  </span>
                  <h3 className="font-evelins text-2xl md:text-3xl text-on-surface mb-4 tracking-wide">
                    {selectedPerformance.title}
                  </h3>
                  <p className="font-sans text-white/80 text-sm md:text-base leading-relaxed">
                    {selectedPerformance.description}
                  </p>
                </div>
              </div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/*  Testimonials Section  */}
      <section className="px-margin-mobile md:px-margin-desktop py-16 md:py-24 max-w-max-width mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ root: detailScrollRef, once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.span variants={textVariants} className="font-sans text-xs md:text-sm uppercase font-bold text-primary tracking-[0.3em] mb-8 block text-center w-full">What Our Clients Say</motion.span>
          <motion.h2 variants={textVariants} className="font-evelins text-3xl md:text-4xl text-on-surface mb-12 max-w-3xl leading-tight tracking-wide text-center mx-auto w-full">Trusted by Leading Global Institutions</motion.h2>
          
          <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/*  Testimonial 1  */}
            <motion.div 
              variants={floatingVariants}
              className="bg-black/60 p-8 rounded-lg border border-white/10 border-l-4 border-l-primary-container"
            >
              <motion.div variants={textVariants} className="w-24 h-16 rounded-md bg-white/5 mb-6 overflow-hidden border border-white/10 flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-white/30 text-3xl">image</span>
              </motion.div>
              <motion.p variants={textVariants} className="font-sans text-text-muted italic text-sm md:text-base leading-relaxed mb-6 text-center">"Their performances were the highlight of our international gala. The precision, passion, and professionalism were absolutely exceptional."</motion.p>
              <motion.div variants={textVariants} className="text-center">
                <p className="font-evelins text-on-surface text-lg font-semibold">Rajesh Kumar</p>
                <p className="font-sans text-text-muted text-sm">Event Director, Delhi Arts Council</p>
              </motion.div>
            </motion.div>

            {/*  Testimonial 2  */}
            <motion.div 
              variants={floatingVariants}
              className="bg-black/60 p-8 rounded-lg border border-white/10 border-l-4 border-l-primary-container"
            >
              <motion.div variants={textVariants} className="w-24 h-16 rounded-md bg-white/5 mb-6 overflow-hidden border border-white/10 flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-white/30 text-3xl">image</span>
              </motion.div>
              <motion.p variants={textVariants} className="font-sans text-text-muted italic text-sm md:text-base leading-relaxed mb-6 text-center">"Working with them transformed our vision into reality. They understood our brand values and delivered a performance that resonated with our audience."</motion.p>
              <motion.div variants={textVariants} className="text-center">
                <p className="font-evelins text-on-surface text-lg font-semibold">Priya Malhotra</p>
                <p className="font-sans text-text-muted text-sm">CEO, Luxury Events International</p>
              </motion.div>
            </motion.div>

            {/*  Testimonial 3  */}
            <motion.div 
              variants={floatingVariants}
              className="bg-black/60 p-8 rounded-lg border border-white/10 border-l-4 border-l-primary-container"
            >
              <motion.div variants={textVariants} className="w-24 h-16 rounded-md bg-white/5 mb-6 overflow-hidden border border-white/10 flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-white/30 text-3xl">image</span>
              </motion.div>
              <motion.p variants={textVariants} className="font-sans text-text-muted italic text-sm md:text-base leading-relaxed mb-6 text-center">"From concept to execution, they handled everything with grace and expertise. Their artists brought an unmatched energy to our celebration."</motion.p>
              <motion.div variants={textVariants} className="text-center">
                <p className="font-evelins text-on-surface text-lg font-semibold">Arjun Singh</p>
                <p className="font-sans text-text-muted text-sm">Wedding Curator, Elite Celebrations</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </motion.div>
  );
}
