"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import SectionHeading from "../ui/SectionHeading";
import VaarsaAtmosphericBackground from "./VaarsaAtmosphericBackground";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Vaarsa", href: "/vaarsa" },
  { name: "Media", href: "/media" },
  { name: "Contact", href: "/contact" },
];

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/myriadarts",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@MyriadArts",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 20 } },
};

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer id="contact" className={`relative w-full bg-[#050505] border-t border-white/5 overflow-hidden font-sans`}>
      <VaarsaAtmosphericBackground />
      
      {/* Top Divider Accent */}
      <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#c1121f] to-transparent opacity-60" />

      {/* Main Footer Body */}
      <div className="w-full px-6 md:px-16 lg:px-24 pt-24 md:pt-36 pb-16 md:pb-24">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          
          {/* Column 1: Brand */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <Image
                src="/logos/myriad-arts-logo.jpg"
                alt="Myriad Arts Logo"
                width={48}
                height={48}
                className="rounded-full border border-white/10 object-cover"
              />
              <span className="type-heading-md text-white uppercase">
                Myriad Arts
              </span>
            </div>
            <p className="type-body-sm text-white/80 max-w-sm">
              A premier arts and cultural platform celebrating India&apos;s diverse artistic traditions through performances, workshops, and immersive experiences.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-4 mt-2">
              {socialLinks.map((s, i) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:text-white hover:border-[#c1121f] hover:bg-[#c1121f]/10 transition-all duration-300"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Navigation */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <SectionHeading title={"Navigation"} variant="small" className="m-0" />
            <nav className="flex flex-col gap-3">
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`flex items-center gap-2 type-body-sm transition-all duration-200 w-fit ${
                      isActive
                        ? "text-[#c1121f] font-bold tracking-wide translate-x-1"
                        : "text-white/80 hover:text-white hover:translate-x-1"
                    }`}
                  >
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c1121f] shadow-[0_0_8px_#c1121f]" />
                    )}
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </motion.div>

          {/* Column 3: Location & Contact Us */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <SectionHeading title={"Location"} variant="small" className="m-0" />
              <Link
                href="/contact"
                className="bg-[#c1121f] text-white type-button px-3.5 py-1.5 rounded hover:bg-[#a10e18] transition-all duration-300 shadow-md flex items-center gap-1.5 whitespace-nowrap flex-shrink-0 cursor-pointer"
              >
                <span>Contact Us</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 sm:w-3.5 sm:h-3.5">
                  <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>

            {/* Google Maps Card */}
            <div className="relative w-full h-48 rounded-xl overflow-hidden border border-white/10 shadow-lg group">
              <iframe
                title="Myriad Arts Location"
                src="https://maps.google.com/maps?q=Maharashtra,%20India&t=&z=9&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 filter grayscale invert contrast-125 opacity-75 group-hover:opacity-100 transition-opacity duration-500"
                loading="lazy"
                allowFullScreen
              />
              <div className="absolute bottom-2 left-2 right-2 bg-black/80 backdrop-blur-md border border-white/10 rounded-lg p-2.5 flex items-center justify-between text-xs pointer-events-none">
                <span className="text-white font-medium flex items-center gap-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#c1121f" className="w-4 h-4">
                    <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                  </svg>
                  Maharashtra, India
                </span>
                <span className="text-[#c1121f] type-meta">Explore</span>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full px-6 md:px-16 lg:px-24 py-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p suppressHydrationWarning className="type-body-sm text-white/70">
          © {new Date().getFullYear()} Myriad Arts / Calakar. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <a href="#" className="type-body-sm text-white/70 hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="type-body-sm text-white/70 hover:text-white transition-colors">Terms of Use</a>
        </div>
      </div>

    </footer>
  );
}