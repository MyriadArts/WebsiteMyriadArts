"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      // Hero section is approximately 100vh, trigger sticky after passing it
      const heroHeight = window.innerHeight;
      setIsSticky(window.scrollY > heroHeight * 0.9);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navItems = [
    { name: "Home", link: "/" },
    { name: "About Us", link: "/about" },
    { name: "Services", link: "/services" },
    { name: "Media", link: "/media" },
    { name: "Vaarsa", link: "/vaarsa" },
    { name: "Contact", link: "/contact" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        className={`fixed top-0 left-0 w-full z-[9999] px-[6vw] py-6 md:py-8 flex justify-between items-center transition-all duration-500 font-sans`}
      >
        {/* Always-Present Background Layer */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Default Minimal Background (seamless integration) */}
          <motion.div
            className="absolute inset-0"
            animate={isSticky ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {/* Longer, smoother fade into the page to avoid harsh lines */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-[#050505]/30 to-transparent h-[150%]" />
          </motion.div>

          {/* Sticky Background Layer (Premium Cinematic) */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={isSticky ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {/* Dark Cinematic Gradient Base */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/95 to-[#050505]/80" />

            {/* Blur & Glassmorphism Layer */}
            <div className="absolute inset-0 backdrop-blur-xl" />

            {/* Subtle Top Lighting Reflection */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />

            {/* Bottom Soft Fade */}
            <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-[#050505]/90 to-transparent" />

            {/* Subtle Glow Aura */}
            <div className="absolute inset-x-0 -bottom-12 h-24 bg-gradient-to-t from-[#050505]/40 via-transparent to-transparent blur-2xl" />

            {/* Border Accent */}
            <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

            {/* Shadow Drop */}
            <div className="absolute inset-0 shadow-[0_8px_32px_rgba(0,0,0,0.6)]" />
          </motion.div>
        </div>

        {/* Left: Logo */}
        <motion.div
          className="flex-shrink-0 relative z-10"
          animate={isSticky ? { y: -2 } : { y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link href="/">
            <motion.img
                  src="/logos/myriad-arts-logo.jpg"
              alt="Myriad Arts"
              className="h-10 md:h-12 w-10 md:w-12 rounded-full aspect-square object-cover border border-white/20 shadow-lg transition-transform duration-500 hover:scale-110"
              whileHover={{ filter: "drop-shadow(0 0 12px rgba(193,18,31,0.4))" }}
            />
          </Link>
        </motion.div>

        {/* Right: Navigation Links (Desktop) */}
        <nav
          className="hidden md:flex items-center gap-2 lg:gap-4 relative z-10"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {navItems.map((item, idx) => {
            const isActive = pathname === item.link || (item.link !== "/" && pathname?.startsWith(item.link));

            return (
              <Link
                key={item.name}
                href={item.link}
                className="relative px-4 py-2 rounded-full group"
                onMouseEnter={() => setHoveredIndex(idx)}
              >
                <AnimatePresence>
                  {hoveredIndex === idx && !isActive && (
                    <motion.span
                      className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-md"
                      layoutId="navHoverBackground"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.25 }}
                    />
                  )}
                </AnimatePresence>
                <motion.span
                  className={`relative z-10 type-label-caps transition-colors duration-300 ${
                    isActive
                      ? 'text-[#c1121f] font-bold drop-shadow-[0_0_12px_rgba(193,18,31,0.6)]'
                      : hoveredIndex === idx
                      ? 'text-white drop-shadow-lg'
                      : 'text-white/80'
                  }`}
                  animate={hoveredIndex === idx ? { x: 2 } : { x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.name}
                </motion.span>

                {/* Active Indicator or Hover Underline Glow */}
                {(isActive || hoveredIndex === idx) && (
                  <motion.div
                    className={`absolute bottom-0 left-4 right-4 h-[2px] bg-gradient-to-r from-transparent via-[#c1121f] to-transparent ${
                      isActive ? "opacity-100 shadow-[0_0_10px_#c1121f]" : ""
                    }`}
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{ transformOrigin: "center" }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Nav Toggle Button */}
        <div className="md:hidden flex items-center relative z-10">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex items-center gap-2 text-white type-button bg-black/40 border border-white/20 px-3 py-1.5 rounded-full backdrop-blur-md focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            <span>{isMobileMenuOpen ? "CLOSE" : "MENU"}</span>
            <span className="material-symbols-outlined text-sm">
              {isMobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </motion.header>

      {/* Mobile Navigation Full-Screen Overlay Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[99998] bg-[#050505] text-white flex flex-col justify-center items-center px-8 py-12 md:hidden"
          >
            {/* Top Header Bar inside Drawer: Logo & Cross Button */}
            <div className="absolute top-6 left-0 right-0 px-[6vw] flex justify-between items-center z-20">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                <img
                      src="/logos/myriad-arts-logo.jpg"
                  alt="Myriad Arts"
                  className="h-10 w-10 rounded-full aspect-square object-cover border border-white/20 shadow-lg"
                />
              </Link>

              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white border border-white/20 hover:border-[#c1121f] hover:bg-[#c1121f] transition-all duration-300 backdrop-blur-md cursor-pointer group shadow-xl active:scale-95"
                aria-label="Close Navigation"
              >
                <span className="material-symbols-outlined text-xl group-hover:rotate-90 transition-transform duration-300">
                  close
                </span>
              </button>
            </div>

            {/* Background Decorative Ambient Glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#c1121f]/20 rounded-full blur-[100px] pointer-events-none" />

            <nav className="flex flex-col items-center gap-6 relative z-10 w-full max-w-sm">
              {navItems.map((item, index) => {
                const isActive = pathname === item.link || (item.link !== "/" && pathname?.startsWith(item.link));

                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * index + 0.1, duration: 0.3 }}
                    className="w-full text-center"
                  >
                    <Link
                      href={item.link}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`inline-block text-xl uppercase tracking-[0.25em] font-medium transition-all duration-300 ${
                        isActive
                          ? "text-[#c1121f] font-bold scale-105"
                          : "text-white/80 hover:text-white"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}