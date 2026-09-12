"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  splitRevealVariants,
} from "../../lib/animations";

export default function MusicService({ detailScrollRef }) {
  return (
    <div
      id="music"
      className="scroll-mt-24 pb-8 w-full text-left"
    >

      {/* Sounds of India - Featured Artists & Live Music Overview (Exact Reference Match) */}
      <section className="px-margin-mobile md:px-margin-desktop py-12 max-w-max-width mx-auto">
        <div className="w-full">

          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6">
            <div>
              <h2 className="type-heading-xl text-white">
                Sounds of <span className="text-[#c1121f] italic">India</span>
              </h2>
            </div>
            <div className="flex items-center gap-2 type-meta text-white/70">
              <span className="text-[#c1121f]">✦</span> LIVE BANDS &amp; MASTER SINGERS
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Left Column: ARTIST & PERFORMANCE SHOWCASE */}
            <div className="lg:col-span-6 flex flex-col gap-3">
              <span className="type-meta text-white/70 block mb-2">
                ARTIST &amp; PERFORMANCE SHOWCASE
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* Artist 1 */}
                <div className="bg-[#181818] border border-white/5 p-5 rounded-none flex flex-col justify-between hover:-translate-y-1.5 hover:border-white/20 hover:shadow-xl transition-all duration-300 group cursor-pointer">
                  <div>
                    <div className="aspect-video w-full overflow-hidden relative mb-4 bg-gradient-to-b from-[#252525] to-[#121212] border border-white/10 group-hover:border-[#c1121f]/40 transition-colors flex items-center justify-center">
                      <span className="material-symbols-outlined text-5xl text-white/30 group-hover:text-[#c1121f] transition-colors">person</span>
                    </div>
                    <h3 className="type-heading-md text-white group-hover:text-white transition-colors">Avinash Vishvajit</h3>
                    <p className="type-body-sm text-white/60 mt-1">Genre: Filmy + Classical</p>
                  </div>
                </div>

                {/* Artist 2 */}
                <div className="bg-[#181818] border border-white/5 p-5 rounded-none flex flex-col justify-between hover:-translate-y-1.5 hover:border-white/20 hover:shadow-xl transition-all duration-300 group cursor-pointer">
                  <div>
                    <div className="aspect-video w-full overflow-hidden relative mb-4 bg-gradient-to-b from-[#252525] to-[#121212] border border-white/10 group-hover:border-[#c1121f]/40 transition-colors flex items-center justify-center">
                      <span className="material-symbols-outlined text-5xl text-white/30 group-hover:text-[#c1121f] transition-colors">person</span>
                    </div>
                    <h3 className="type-heading-md text-white group-hover:text-white transition-colors">Nilesh Mohrir</h3>
                    <p className="type-body-sm text-white/60 mt-1">Genre: Bollywood</p>
                  </div>
                </div>

                {/* Artist 3 */}
                <div className="bg-[#181818] border border-white/5 p-5 rounded-none flex flex-col justify-between hover:-translate-y-1.5 hover:border-white/20 hover:shadow-xl transition-all duration-300 group cursor-pointer">
                  <div>
                    <div className="aspect-video w-full overflow-hidden relative mb-4 bg-gradient-to-b from-[#252525] to-[#121212] border border-white/10 group-hover:border-[#c1121f]/40 transition-colors flex items-center justify-center">
                      <span className="material-symbols-outlined text-5xl text-white/30 group-hover:text-[#c1121f] transition-colors">person</span>
                    </div>
                    <h3 className="type-heading-md text-white group-hover:text-white transition-colors">Samir Saptiskar</h3>
                    <p className="type-body-sm text-white/60 mt-1">Genre: Filmy songs – Marathi</p>
                  </div>
                </div>

                {/* Artist 4 */}
                <div className="bg-[#181818] border border-white/5 p-5 rounded-none flex flex-col justify-between hover:-translate-y-1.5 hover:border-white/20 hover:shadow-xl transition-all duration-300 group cursor-pointer">
                  <div>
                    <div className="aspect-video w-full overflow-hidden relative mb-4 bg-gradient-to-b from-[#252525] to-[#121212] border border-white/10 group-hover:border-[#c1121f]/40 transition-colors flex items-center justify-center">
                      <span className="material-symbols-outlined text-5xl text-white/30 group-hover:text-[#c1121f] transition-colors">person</span>
                    </div>
                    <h3 className="type-heading-md text-white group-hover:text-white transition-colors">Rohit Raut</h3>
                    <p className="type-body-sm text-white/60 mt-1">Genre: Bollywood</p>
                  </div>
                </div>

                {/* Artist 5 */}
                <div className="bg-[#181818] border border-white/5 p-5 rounded-none flex flex-col justify-between hover:-translate-y-1.5 hover:border-white/20 hover:shadow-xl transition-all duration-300 group cursor-pointer">
                  <div>
                    <div className="aspect-video w-full overflow-hidden relative mb-4 bg-gradient-to-b from-[#252525] to-[#121212] border border-white/10 group-hover:border-[#c1121f]/40 transition-colors flex items-center justify-center">
                      <span className="material-symbols-outlined text-5xl text-white/30 group-hover:text-[#c1121f] transition-colors">person</span>
                    </div>
                    <h3 className="type-heading-md text-white group-hover:text-white transition-colors">Omkar Prabhughate</h3>
                    <p className="type-body-sm text-white/60 mt-1">Genre: Semi classical + Natyageet - Bhavgeet</p>
                  </div>
                </div>

                {/* Artist 6 */}
                <div className="bg-[#181818] border border-white/5 p-5 rounded-none flex flex-col justify-between hover:-translate-y-1.5 hover:border-white/20 hover:shadow-xl transition-all duration-300 group cursor-pointer">
                  <div>
                    <div className="aspect-video w-full overflow-hidden relative mb-4 bg-gradient-to-b from-[#252525] to-[#121212] border border-white/10 group-hover:border-[#c1121f]/40 transition-colors flex items-center justify-center">
                      <span className="material-symbols-outlined text-5xl text-white/30 group-hover:text-[#c1121f] transition-colors">person</span>
                    </div>
                    <h3 className="type-heading-md text-white group-hover:text-white transition-colors">Mona Bhat</h3>
                    <p className="type-body-sm text-white/60 mt-1">Genre: Bollywood And Freestyle</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column: LIVE MUSIC EXPERIENCE */}
            <div className="lg:col-span-6 flex flex-col gap-3">
              <span className="type-meta text-white/70 block mb-2">
                LIVE MUSIC EXPERIENCE
              </span>

              {/* Sitar & Tabla Live Performance Photo */}
              <div className="w-full aspect-[16/10] overflow-hidden relative border border-white/5 hover:border-white/20 transition-colors group cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop"
                  alt="Sitar and Tabla Classical Live Performance"
                  className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
              </div>

              {/* Text Content Card */}
              <div className="bg-[#181818] p-6 md:p-8 border border-white/5 flex flex-col gap-4">
                <h3 className="type-heading-lg text-white">
                  Bring Your Event to Life with <span className="italic">Live Music</span>
                </h3>
                <p className="type-body-md text-white/80">
                  Musical bands don’t just play music — they create atmosphere, energy, and unforgettable moments. Whether it’s a corporate event, wedding, festival, or private party, a live band adds a dynamic, personal touch that recorded playlists simply can’t match.
                </p>
                <p className="type-body-md text-white/80">
                  With versatile genres and professional performance, bands engage your audience and elevate the entire experience. We manage multiple bands and singers to give this lifetime experience to our clients.
                </p>
                <div className="pt-2">
                  <p className="type-heading-md text-[#c1121f] italic">
                    Make your event stand out. — let the music speak for you.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>
    </div>
  );
}

