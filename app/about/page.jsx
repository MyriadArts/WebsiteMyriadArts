"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "../../components/shared/Footer";
import VaarsaAtmosphericBackground from "../../components/shared/VaarsaAtmosphericBackground";

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("Performance");

  const [showAllArticles, setShowAllArticles] = useState(false);
  const [articlesPage, setArticlesPage] = useState(1);
  const [selectedArticleModal, setSelectedArticleModal] = useState(null);
  const articlesSectionRef = useRef(null);

  const mediaArticles = [
    { id: 1, title: "Article 1", image: "/media-articles/article-feature-01.jpg" },
    { id: 2, title: "Article 2", image: "/media-articles/article-feature-02.jpg" },
    { id: 3, title: "Article 3", image: "/media-articles/article-feature-03.jpg" },
    { id: 4, title: "Article 4", image: "/media-articles/article-feature-04.jpg" },
    { id: 5, title: "Article 5", image: "/media-articles/article-feature-05.jpg" },
    { id: 6, title: "Article 6", image: "/media-articles/article-feature-06.jpg" },
    { id: 7, title: "Article 7", image: "/media-articles/article-feature-07.jpg" }
  ];

  const displayedArticles = showAllArticles
    ? mediaArticles
    : mediaArticles.slice(0, 3);


  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    // Force a refresh to recalculate positions for Lenis
    setTimeout(() => {
      AOS.refresh();
    }, 100);
  }, []);

  const ecosystemData = {
    Performance: {
      image: "/images/about/about-performance-ecosystem.jpg",
      title: "Performance Division",
      desc: "The vanguard of our operation. Live, visceral, unrepeatable. We construct environments where the screen disappears and raw emotion takes over.",
      list: ["Cinematic Stage Productions", "Immersive Underground Sets", "Global Broadcast Events", "Cross-disciplinary Raves"]
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
    <main className="bg-[#050505] text-on-surface font-body-md min-h-screen relative isolate selection:bg-[#c1121f] selection:text-white">
      {/* GLOBAL BACKGROUND EFFECTS */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-[#c1121f]/10 to-transparent mix-blend-screen blur-3xl"></div>
        {/* Aggressive Diagonal Slashes */}
        <div className="absolute top-[-20%] right-[-10%] w-[50vw] h-[150vh] bg-[#c1121f]/5 rotate-[15deg] blur-2xl transform origin-top-right mix-blend-color-dodge"></div>
        <div className="absolute top-[20%] left-[-20%] w-[30vw] h-[100vh] bg-[#ff2a00]/3 -rotate-[25deg] blur-3xl transform origin-center mix-blend-lighten"></div>
        {/* Scanlines Overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSJ0cmFuc3BhcmVudCIvPgo8cGF0aCBkPSJNMCAwdjRoNHYtNEgweiIgZmlsbD0icmdiYSgwLDAsMCwwLjE1KSIvPgo8cGF0aCBkPSJNMCAwdjFoNHYtMUgweiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIvPgo8L3N2Zz4=')] opacity-50"></div>
        {/* Subtle glowing orbs */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#c1121f] rounded-full mix-blend-multiply filter blur-[150px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#973838] rounded-full mix-blend-multiply filter blur-[150px] opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* HERO SECTION - FLOATING LANTERNS DESIGN (Fitted to 1 viewport screen) */}
      <section className="sticky top-0 w-full h-screen max-h-screen py-0 flex flex-col items-center justify-center z-0 overflow-hidden bg-[#050505]">
        <VaarsaAtmosphericBackground />
        {/* Dynamic Sweeping Red Stage Lights (Vaarsa Page Style) */}
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          {/* Left Corner Stage Light */}
          <motion.div
            className="absolute -top-20 -left-20 w-[300px] md:w-[400px] h-[120vh] bg-gradient-to-b from-[#c1121f]/25 via-[#c1121f]/5 to-transparent origin-top-left blur-2xl mix-blend-screen"
            animate={{ rotate: [-5, 15, -5] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Right Corner Stage Light */}
          <motion.div
            className="absolute -top-20 -right-20 w-[300px] md:w-[400px] h-[120vh] bg-gradient-to-b from-[#c1121f]/25 via-[#c1121f]/5 to-transparent origin-top-right blur-2xl mix-blend-screen"
            animate={{ rotate: [5, -15, 5] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Soft Crimson Center Backlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[600px] h-[220px] sm:h-[300px] bg-[#c1121f]/15 rounded-full blur-[90px] sm:blur-[130px] pointer-events-none z-10" />

        {/* Smooth Gradient Overlay Fade & Vignette (Vaarsa Style) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-[#050505]/45 to-[#050505] z-0 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,5,5,0.85)_100%)] z-0 pointer-events-none" />

        {/* Ambient Crimson Horizon Glow (Vaarsa Style) */}
        <div className="absolute bottom-0 inset-x-0 h-36 bg-gradient-to-t from-[#c1121f]/25 via-transparent to-transparent blur-3xl pointer-events-none z-10" />

        {/* Floating Images (Lanterns) - All 7 fully visible within single screen */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {[
            // 3 UP
            { src: "/images/about/about-gallery-01.jpg", pos: "left-[3%] md:left-[6%] top-[8%] md:top-[10%]", delay: 0.1, rotate: "" },
            { src: "/images/about/about-gallery-02.jpg", pos: "left-[43%] md:left-[45%] top-[4%] md:top-[5%]", delay: 0.3, rotate: "" },
            { src: "/images/about/about-gallery-03.jpg", pos: "right-[3%] md:right-[6%] top-[8%] md:top-[10%]", delay: 0.5, rotate: "" },
            // 4 DOWN
            { src: "/images/about/about-gallery-04.jpg", pos: "left-[3%] md:left-[5%] bottom-[8%] md:bottom-[10%]", delay: 0.7, rotate: "-rotate-6 md:-rotate-12" },
            { src: "/images/about/about-gallery-05.jpg", pos: "left-[25%] md:left-[28%] bottom-[4%] md:bottom-[5%]", delay: 0.9, rotate: "" },
            { src: "/images/about/about-gallery-06.jpg", pos: "right-[25%] md:right-[28%] bottom-[4%] md:bottom-[5%]", delay: 1.1, rotate: "" },
            { src: "/images/about/about-abstract-dancers.jpg", pos: "right-[3%] md:right-[5%] bottom-[8%] md:bottom-[10%]", delay: 1.3, rotate: "rotate-6 md:rotate-12" },
          ].map((lantern, idx) => (
            <motion.div
              key={idx}
              className={`absolute w-14 h-20 sm:w-20 sm:h-28 md:w-24 md:h-34 lg:w-28 lg:h-40 ${lantern.pos} ${lantern.rotate || ""}`}
              initial={{ y: "100vh", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 1.8,
                ease: [0.16, 1, 0.3, 1],
                delay: lantern.delay,
              }}
            >
              <motion.div
                className="w-full h-full relative overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.1)] border border-white/20 rounded-md opacity-100"
                animate={{ y: ["-3px", "3px", "-3px"] }}
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
                  sizes="(max-width: 640px) 80px, (max-width: 768px) 110px, 130px"
                  priority
                  className="object-cover transition-all duration-700 pointer-events-auto"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Centerpiece Text with original font sizes */}
        <div className="relative z-30 text-center px-4 sm:px-6 md:px-12 max-w-5xl mx-auto flex flex-col items-center pointer-events-none">
          {/* Theatrical Title Heading */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 35 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex justify-center items-center mb-6 group cursor-pointer w-fit mx-auto pointer-events-auto"
          >
            {/* Heading Title with Solid Crimson Accent */}
            <h1 className="type-display-xl text-white drop-shadow-[0_10px_40px_rgba(0,0,0,0.95)] group-hover:scale-105 transition-all duration-500 ease-out">
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
            Myriad Arts brings together performing and fine arts under one creative banner—offering tailor‑made experiences from concept to execution.
          </motion.p>
        </div>
      </section>

      {/* 2. OUR JOURNEY SECTION */}
      <section id="our-story" className="relative w-full py-16 md:py-24 border-b border-white/5 z-10 bg-[#050505] overflow-hidden">
        <VaarsaAtmosphericBackground />
        {/* Background ambient elements */}
       

        <div className="max-w-[1440px] mx-auto px-6 lg:px-20 relative z-10 pt-8 md:pt-16 pb-8 md:pb-12">
          <div className="max-w-4xl mx-auto">
            {/* Staircase Grid Layout:
                - "OUR" is positioned above the image, right-aligned so 'R' ends at the right boundary of the image.
                - "JOURNEY" starts at the height where the image starts and left-aligned where the description starts.
            */}
            <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-x-10 lg:gap-x-14 items-start justify-center">
              
              {/* Row 1, Col 1: "OUR" above image, right-aligned so 'R' ends at end of width of image */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true, margin: "-100px" }}
                className="w-full max-w-[240px] mx-auto lg:ml-0 flex justify-end mb-4"
              >
                <h2 className="font-evelins text-4xl sm:text-5xl md:text-6xl uppercase tracking-wide cursor-default text-white drop-shadow-[0_10px_40px_rgba(0,0,0,0.95)] leading-none text-right">
                  OUR
                </h2>
              </motion.div>

              {/* Row 1, Col 2: Desktop grid spacer */}
              <div className="hidden lg:block" />

              {/* Row 2, Col 1: Image */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true, margin: "-100px" }}
                className="w-full max-w-[240px] mx-auto lg:ml-0 relative z-20 mb-8 lg:mb-0"
              >
                <div className="shadow-[0_30px_60px_rgba(0,0,0,0.8)] w-full relative rounded-xl overflow-hidden border border-white/10 bg-black group">
                  <div className="relative w-full aspect-[4/5]">
                    <div className="absolute inset-0 transform -scale-x-100 transition-transform duration-700 group-hover:scale-x-[-1.05] group-hover:scale-y-[1.05]">
                      <Image
                        src="/images/about/about-our-journey.jpg"
                        alt="Our Journey"
                        fill
                        sizes="(max-width: 1024px) 240px, 300px"
                        className="object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 bg-[#c1121f]/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>
              </motion.div>

              {/* Row 2, Col 2: "JOURNEY" + Description text */}
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
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  className="flex flex-col items-start relative z-20"
                >
                  <div className="space-y-6 text-base md:text-lg leading-relaxed max-w-2xl text-[#f5dbd8] font-light drop-shadow-[0_2px_15px_rgba(0,0,0,0.95)] text-left border-l border-[#c1121f]/50 pl-4 sm:pl-8">
                    <p>
                      Established in 2007, Myriad Arts is a one stop shop entertainment for all your entertainment related requirements. Be performing arts, visual arts, conceptualizing and directing stage and onscreen content, celebrity management and much more, be it corporate, entertainment or social sectors in India.
                    </p>
                  </div>
                </motion.div>
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      {/* 5. OUR ECOSYSTEM SECTION */}
      <section className="relative w-full py-16 md:py-32 border-b border-white/5 z-10 bg-[#0a0202] overflow-hidden">
        <VaarsaAtmosphericBackground />
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
              <Image src={ecosystemData[activeTab].image} alt="Background" fill sizes="100vw" className="object-cover" />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0202] via-transparent to-[#0a0202] z-0 pointer-events-none"></div>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20 relative z-10">

          <h2 className="type-heading-xl text-center w-full block text-white drop-shadow-[0_10px_40px_rgba(0,0,0,0.95)] mb-8 md:mb-12" data-aos="fade-up">
            Our <span className="text-[#c1121f] font-normal drop-shadow-[0_0_30px_rgba(193,18,31,0.4)]">Ecosystem</span>
          </h2>

          <div className="w-full">
            {/* Tabs */}
            <div className="flex flex-wrap md:flex-nowrap justify-center border-b border-white/20 mb-8 md:mb-12" data-aos="fade-up">
              {Object.keys(ecosystemData).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 sm:px-8 py-3 sm:py-4 text-[11px] sm:text-[12px] font-label-caps tracking-[0.15em] sm:tracking-[0.2em] uppercase transition-all duration-300 relative flex-1 md:flex-none text-center ${activeTab === tab ? "text-white bg-[#0a0202]" : "text-[#a19e99] hover:text-white"
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
            <div data-aos="fade-up" data-aos-delay="100" className="min-h-[300px] md:min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, filter: "blur(10px)", scale: 0.98 }}
                  animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                  exit={{ opacity: 0, filter: "blur(10px)", scale: 1.02 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="flex flex-col lg:flex-row gap-6 lg:gap-12"
                >
                  <div className="w-full lg:w-5/12">
                    <div className="relative aspect-[4/3] border border-white/20 p-2 bg-[#0a0202]">
                      <div className="relative w-full h-full bg-[#030303] overflow-hidden group">
                        <Image src={ecosystemData[activeTab].image} alt={activeTab} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw" className="object-cover grayscale mix-blend-luminosity contrast-125 group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-[#c1121f]/20 mix-blend-multiply"></div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full lg:w-7/12 pt-2 md:pt-4">
                    <h3 className="type-heading-lg text-white mb-4 sm:mb-6">
                      {ecosystemData[activeTab].title}
                    </h3>
                    <p className="text-base md:text-lg leading-relaxed text-[#f5dbd8] font-light drop-shadow-[0_2px_15px_rgba(0,0,0,0.95)] mb-6 sm:mb-8 border-b border-white/10 pb-6 sm:pb-8">
                      {ecosystemData[activeTab].desc}
                    </p>
                    <ul className="space-y-3 sm:space-y-4">
                      {ecosystemData[activeTab].list.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 sm:gap-4">
                          <span className="text-[#c1121f] text-[10px] mt-1">■</span>
                          <span className="text-xs sm:text-sm text-white tracking-wide">{item}</span>
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

      {/* 4. MEET OUR TEAM */}
      <section className="relative w-full py-16 md:py-32 border-b border-white/5 z-10 bg-[#050202] overflow-hidden">
        <VaarsaAtmosphericBackground />
        {/* Subtle radial glow in the center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-[#c1121f] rounded-full blur-[150px] opacity-[0.03] pointer-events-none z-0"></div>

        <div className="max-w-[1440px] mx-auto px-6 lg:px-20 text-center relative z-10">
          <h2 className="type-heading-xl text-white drop-shadow-[0_10px_40px_rgba(0,0,0,0.95)] mb-10 md:mb-16" data-aos="zoom-in">
            Meet Our <span className="text-[#c1121f] font-normal drop-shadow-[0_0_30px_rgba(193,18,31,0.4)]">Team</span>
          </h2>

          <div className="grid grid-cols-2 gap-4 md:gap-8 lg:gap-12 max-w-5xl mx-auto">
            {[
              { 
                name: "Shreyas Desai", 
                role: "Founder", 
                img: "/images/team/shreyas-desai.jpeg",
                instagram: "https://www.instagram.com/shrey.artist/",
                facebook: "https://www.facebook.com/shreyas.desai.9",
                linkedin: "https://www.linkedin.com/in/shreyas-desai-art/"
              },
              { 
                name: "Tejashree Sawant", 
                role: "Project management for Vaarsa - Cofounder Vaarsa", 
                img: "/images/team/tejashree-sawant.jpg",
                facebook: "https://www.facebook.com/tejashree.sawant.77"
              },
              { 
                name: "Uttara Karajgar", 
                role: "Creative Head - Calakar", 
                img: "/images/team/uttara-karajgar.jpg",
                instagram: "https://www.instagram.com/uttaraaravindra/",
                facebook: "https://www.facebook.com/UttaraaRavindra"
              },
              { 
                name: "Shruti Samant", 
                role: "Core Member - Events & Production", 
                img: "/images/team/shruti-samant.jpg",
                instagram: "https://www.instagram.com/shruti.d.samant/",
                linkedin: "https://www.linkedin.com/in/shruti-samant-she-her/"
              },
              { 
                name: "Pranoti Chinmay", 
                role: "Core Member", 
                img: "/images/team/pranoti-chinmay.jpg",
                instagram: "https://www.instagram.com/dancetraveller_pranoti/",
                linkedin: "https://www.linkedin.com/in/pranoti-chinmay-07563216/"
              },
              { 
                name: "Kalavati Panchal", 
                role: "Core member", 
                img: "/images/team/kalavati-panchal.jpeg",
                instagram: "https://www.instagram.com/kala_panchal_06/"
              },
              { 
                name: "Akshata Awlegaonkar", 
                role: "Core Member", 
                img: "/images/team/akshata-awlegoankar.jpeg",
                instagram: "https://www.instagram.com/akshata_awlegaonkar/",
                facebook: "https://www.facebook.com/akshata.awlegaonkar"
              }
            ].map((member, idx) => (
              <div
                key={idx}
                className={`relative p-3 sm:p-5 bg-gradient-to-br from-[#0a0505] to-[#050202] text-left group overflow-hidden border border-white/5 hover:border-[#c1121f]/40 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(193,18,31,0.15)] transition-all duration-500 ${idx === 0 ? "col-span-2 max-w-md mx-auto w-full mb-6 md:mb-12" : ""}`}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                {/* Index number */}
                <div className="absolute top-3 right-4 font-evelins text-3xl sm:text-4xl text-white/5 group-hover:text-[#c1121f]/20 transition-colors duration-500 z-0 select-none">
                  0{idx + 1}
                </div>

                <div className="relative w-full aspect-square mb-4 sm:mb-5 overflow-hidden border border-white/5 z-10 shadow-2xl rounded-sm">
                  {member.img ? (
                    <>
                      <Image
                        src={member.img}
                        alt={member.name}
                        fill
                        className="object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 mix-blend-luminosity group-hover:mix-blend-normal"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-50 group-hover:opacity-0 transition-opacity duration-500"></div>
                      <div className="absolute inset-0 bg-[#c1121f]/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#1c1212] via-[#120a0a] to-[#080404] text-white/30 group-hover:text-[#c1121f]/70 transition-all duration-500">
                      <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center mb-2 group-hover:border-[#c1121f]/40 group-hover:scale-110 transition-all duration-500">
                        <span className="material-symbols-outlined text-2xl sm:text-3xl">person</span>
                      </div>
                      <span className="text-[9px] sm:text-[10px] uppercase tracking-widest font-sans font-medium text-white/40 group-hover:text-white/70 transition-colors">Team Member</span>
                    </div>
                  )}
                </div>

                <div className="relative z-10 pl-3 sm:pl-4 border-l-2 border-[#c1121f]/30 group-hover:border-[#c1121f] transition-colors duration-500 flex flex-col h-[calc(100%-1rem-100%)]">
                  <h3 className="font-evelins text-lg md:text-xl uppercase tracking-wider text-white mb-1 group-hover:text-white transition-colors duration-500">{member.name}</h3>
                  <p className="text-[#c1121f] text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase mb-2 opacity-70 group-hover:opacity-100 transition-opacity duration-500">{member.role}</p>
                  {member.desc && (
                    <p className="text-sm md:text-base text-[#f5dbd8] font-light drop-shadow-[0_2px_15px_rgba(0,0,0,0.95)] leading-relaxed group-hover:text-white transition-colors duration-500 mb-4 sm:mb-6">
                      {member.desc}
                    </p>
                  )}
                  {/* Social Links */}
                  <div className="flex items-center gap-4 mt-auto pt-2">
                    {member.instagram && (
                      <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#c1121f] transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                      </a>
                    )}
                    {member.linkedin && (
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#c1121f] transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                      </a>
                    )}
                    {member.facebook && (
                      <a href={member.facebook} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#c1121f] transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                      </a>
                    )}
                  </div>
                </div>

                {/* Cool corner accent */}
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-[#c1121f] opacity-0 group-hover:opacity-100 transform translate-x-4 translate-y-4 group-hover:translate-x-[-1.5rem] group-hover:translate-y-[-1.5rem] transition-all duration-700 ease-out pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 6. OUR JOURNEY THROUGH TIME (TIMELINE) SECTION */}
      <section className="relative w-full py-16 md:py-32 border-b border-white/5 z-10 bg-[#050101] overflow-hidden">
        <VaarsaAtmosphericBackground />
        <div className="absolute inset-0 z-0 opacity-15 mix-blend-luminosity grayscale">
          <Image src="/images/about/about-journey-backdrop.png" alt="Background" fill className="object-cover object-bottom" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#050101] via-[#c1121f]/10 to-[#050101] mix-blend-multiply z-0 pointer-events-none"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-full bg-[#c1121f] blur-[20px] opacity-20 pointer-events-none hidden md:block z-0"></div>
        <div className="max-w-[1000px] mx-auto px-6 lg:px-20 relative z-10">
          <h2 className="type-heading-xl text-white text-center drop-shadow-[0_10px_40px_rgba(0,0,0,0.95)] mb-10 md:mb-16" data-aos="zoom-in">
            <span className="text-white">Our Journey Through</span> <span className="text-[#c1121f] font-normal drop-shadow-[0_0_30px_rgba(193,18,31,0.4)]">Time</span>
          </h2>

          <div className="space-y-8 md:space-y-12 relative before:absolute before:inset-0 before:ml-12 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[2px] before:bg-gradient-to-b before:from-transparent before:via-[#c1121f]/50 before:to-transparent">
            {[
              { year: "2007", title: "Launched as “Beddhund”", desc: "The foundation of our creative collective." },
              { year: "2008", title: "Ranga Lokanritya Che", desc: "Our first 2-hour stage production presenting the folk art of India." },
              { year: "2010", title: "Kahana Filmi Hai", desc: "Our second 2-hour stage production on evolving Bollywood cinema." },
              { year: "2016", title: "Vaarsa Festival Launched", desc: "Launched our folk festival named “Vaarsa – reliving the folk art of India”." },
              { year: "2017", title: "Calakar Channel Formation", desc: "Formation of our YouTube Channel “Calakar”." },
              { year: "2019", title: "First International Presence", desc: "Our first international presence in Thailand performing Indian folk." },
              { year: "2020", title: "India Dance Week", desc: "Came on board for “India Dance week curated by Sandip Soparrkar” – An event that made records globally." },
              { year: "2024", title: "Malaysia Awards", desc: "Won awards in Malaysia for performing Indian semi-classical dance form." },
              { year: "SAGA", title: "Saga Continues", desc: "Preserving heritage, expanding horizons, and inspiring audiences across the globe." },
            ].map((item, idx) => (
              <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active" data-aos="fade-up">
                <div className={`flex items-center justify-center w-20 md:w-28 h-10 md:h-14 bg-[#c1121f] text-white font-evelins shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_20px_rgba(193,18,31,0.5)] z-10 relative ${item.year === "SAGA" ? "text-base md:text-2xl tracking-[0.08em]" : "text-xl md:text-3xl"}`}>
                  {item.year}
                </div>
                <div className="w-[calc(100%-5.5rem)] md:w-[calc(50%-3rem)] bg-[#030303] border border-white/20 p-4 sm:p-6 group-hover:border-[#c1121f] group-hover:-translate-y-2 group-hover:shadow-[0_15px_40px_rgba(193,18,31,0.15)] transition-all duration-500">
                  <h3 className="type-heading-md text-white mb-2">{item.title}</h3>
                  <p className="text-sm md:text-base text-[#f5dbd8] font-light drop-shadow-[0_2px_15px_rgba(0,0,0,0.95)] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* 8. FOOTER */}
      <section className="relative w-full pt-16 z-10 bg-[#050505]">
        {/* Main Footer */}
        

      {/* 7. ARTICLES SECTION (Copied from Vaarsa Previous Editions) */}
      <section id="media-articles" ref={articlesSectionRef} className="py-16 md:py-24 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto relative z-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
          <div>
            <h2 className="text-center w-full block type-heading-xl text-white mt-1.5" data-aos="zoom-in">
              <span className="text-white">Media</span> <span className="text-[#c1121f]">Articles</span>
            </h2>
          </div>
          <button
            onClick={() => {
              if (!showAllArticles) {
                setShowAllArticles(true);
                setArticlesPage(1);
              } else {
                setShowAllArticles(false);
                setArticlesPage(1);
                setTimeout(() => {
                  if (articlesSectionRef.current) {
                    const elementPosition = articlesSectionRef.current.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - 110;
                    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                  }
                }, 60);
              }
            }}
            className="hidden md:inline-flex group items-center gap-2 px-5 py-2.5 bg-[#c1121f] text-white rounded font-bold uppercase tracking-widest text-[10px] hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(193,18,31,0.4)] cursor-pointer shrink-0"
          >
            <span>{showAllArticles ? "Show Less" : "View All"}</span>
            <span className="material-symbols-outlined text-xs transition-transform group-hover:translate-x-1">
              {showAllArticles ? "expand_less" : "arrow_forward"}
            </span>
          </button>
        </div>

        {/* Mobile View All Button (shows below the heading on mobile) */}
        <button
          onClick={() => setShowAllArticles(!showAllArticles)}
          className="md:hidden w-full group flex items-center justify-center gap-2 px-5 py-3 bg-[#c1121f] text-white rounded font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(193,18,31,0.4)] mb-8 cursor-pointer"
        >
          <span>{showAllArticles ? "Show Less" : "View All"}</span>
          <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">
            {showAllArticles ? "expand_less" : "arrow_forward"}
          </span>
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence>
            {displayedArticles.map((article, idx) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, scale: 0.96, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -15 }}
                transition={{ duration: 0.3, ease: "easeOut", delay: (idx % 3) * 0.05 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                onClick={() => setSelectedArticleModal(article)}
                className="group relative overflow-hidden bg-[#141414] rounded-xl border border-white/10 hover:border-[#c1121f] transition-colors duration-500 shadow-xl cursor-pointer aspect-square"
              >
                <div className="w-full h-full overflow-hidden relative">
                  <Image
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    src={article.image}
                    alt={article.title}
                    fill
                  />
                  {/* Black Overlay on Card */}
                  <div className="absolute inset-0 bg-black/60 group-hover:bg-black/20 transition-colors duration-300" />
                </div>

                <div className="absolute inset-0 p-2.5 sm:p-4 flex flex-col justify-center items-center text-center z-10 pointer-events-none">
                  <span className="text-[10px] sm:text-[12px] text-white font-sans font-bold uppercase tracking-widest mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#c1121f]/90 px-3 py-1 rounded">
                    View Article
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>


      <Footer />
      </section>
    
      {/* ARTICLE MODAL */}
      <AnimatePresence>
        {selectedArticleModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12 bg-black/90 backdrop-blur-md"
            onClick={() => setSelectedArticleModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-[#0a0a0a] border border-[#c1121f]/30 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(193,18,31,0.2)] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center p-4 md:p-6 border-b border-white/10 shrink-0">
                <h3 className="type-heading-md text-white m-0">Media Article</h3>
                <button
                  onClick={() => setSelectedArticleModal(null)}
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/5 hover:bg-[#c1121f] text-white flex items-center justify-center transition-colors duration-300"
                >
                  <span className="material-symbols-outlined text-sm md:text-base">close</span>
                </button>
              </div>

              {/* Modal Content */}
              <div className="relative w-full overflow-y-auto p-4 md:p-8 flex items-center justify-center bg-black/50">
                <div className="relative w-full max-w-2xl aspect-[3/4] md:aspect-auto md:h-[60vh]">
                  <Image
                    src={selectedArticleModal.image}
                    alt={selectedArticleModal.title}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}