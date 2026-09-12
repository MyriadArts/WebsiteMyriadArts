"use client";

import React from "react";
import { motion } from "framer-motion";
import CuratedCollections from "../CuratedCollections";

const GlassCard = ({ children, className = "", delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.7, delay }}
    className={`rounded-xl p-10 group transition-all duration-700 hover:bg-[#282a2b] ${className}`}
    style={{ background: "rgba(31, 31, 31, 0.6)", backdropFilter: "blur(20px)", border: "1px solid rgba(47, 47, 47, 1)" }}
  >
    {children}
  </motion.div>
);


const useDraggableScroll = () => {
  const ref = React.useRef(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [startY, setStartY] = React.useState(0);
  const [scrollTop, setScrollTop] = React.useState(0);

  const onMouseDown = (e) => {
    if (!ref.current) return;
    setIsDragging(true);
    setStartY(e.pageY - ref.current.offsetTop);
    setScrollTop(ref.current.scrollTop);
  };

  const onMouseLeave = () => {
    setIsDragging(false);
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const onMouseMove = (e) => {
    if (!isDragging || !ref.current) return;
    e.preventDefault();
    const y = e.pageY - ref.current.offsetTop;
    const walk = (y - startY) * 1.5;
    ref.current.scrollTop = scrollTop - walk;
  };

  const onWheel = (e) => {
    e.stopPropagation();
    if (ref.current) {
      ref.current.scrollTop += e.deltaY;
    }
  };

  return {
    ref,
    onMouseDown,
    onMouseLeave,
    onMouseUp,
    onMouseMove,
    onWheel,
    isDragging,
  };
};

export default function DigitalPresenceGrid({ allPlaylists = [] }) {
  const instaScroll = useDraggableScroll();
  const fbScroll = useDraggableScroll();

  return (
    <section className="py-12 px-[6vw] text-[#e2e2e2]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7 }}
        className="mb-8 flex flex-col items-center text-center mx-auto"
      >
        <h2 className="type-display-lg mb-6">
          <span className="text-white">Our Digital</span> <span className="text-red-600">Presence</span>
        </h2>
        <p className="type-body-lg text-[#f5dbd8] max-w-5xl xl:max-w-max">
          Beyond the stage, we curate a multidimensional ecosystem where creativity meets community.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">

        {/* Curated Collections embedded perfectly */}
        <div className="md:col-span-2 w-full my-2">
          <CuratedCollections allPlaylists={allPlaylists} compact={true} noPadding={true} />
        </div>

        <div className="md:col-span-2 w-full my-2">
          <h2 className="type-display-lg mb-6 mt-8 text-center w-full">
            <span className="text-white">Other Digital</span> <span className="text-red-600">Platforms</span>
          </h2>
        </div>
        
        {/* Instagram */}
        <GlassCard className="md:col-span-1 flex flex-col" delay={0.1}>
          <div className="mb-6 flex flex-col items-center text-center">
            <h3 className="text-center type-heading-xl text-white">Instagram</h3>
            <p className="type-body-md text-[#f5dbd8] mt-2 max-w-[90%]">
              Visual storytelling and behind-the-scenes glimpses into our artistic process.
            </p>
          </div>
          <div className="mt-auto w-full h-[450px] rounded-xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] relative bg-transparent block">
            {/* Custom Interactive Dark Mode Instagram Preview */}
                        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none flex items-end justify-center pb-3 z-10 rounded-b-xl">
              <div className="text-white/70 text-xs font-semibold flex flex-col items-center animate-bounce">
                <span>Scroll for more</span>
                <span className="material-symbols-outlined text-[16px]">keyboard_arrow_down</span>
              </div>
            </div>
            <div 
              ref={instaScroll.ref}
              data-lenis-prevent="true"
              onWheel={instaScroll.onWheel}
              onMouseDown={instaScroll.onMouseDown}
              onMouseLeave={instaScroll.onMouseLeave}
              onMouseUp={instaScroll.onMouseUp}
              onMouseMove={instaScroll.onMouseMove}
              className={`w-full h-full bg-black text-white flex flex-col overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/20 hover:[&::-webkit-scrollbar-thumb]:bg-white/40 [&::-webkit-scrollbar-thumb]:rounded-full rounded-xl border border-white/10 ${instaScroll.isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}>
              {/* Header */}
              <div className="p-4 flex items-center justify-between border-b border-white/10 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20">
                    <img src="/logos/myriad-arts-logo.jpg" alt="Myriad Arts" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">myriad_arts</div>
                    <div className="text-xs text-white/50">Myriad Arts</div>
                  </div>
                </div>
                <a href="https://www.instagram.com/myriad_arts" target="_blank" rel="noopener noreferrer" className="bg-[#0095f6] hover:bg-[#1877f2] text-white px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors">
                  Follow
                </a>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 text-center py-3 border-b border-white/10 shrink-0">
                <div><div className="font-semibold text-sm">142</div><div className="text-xs text-white/50">posts</div></div>
                <div><div className="font-semibold text-sm">12.5k</div><div className="text-xs text-white/50">followers</div></div>
                <div><div className="font-semibold text-sm">34</div><div className="text-xs text-white/50">following</div></div>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-3 gap-1 p-1 shrink-0">
                {[
                  "/images/media/insta-01.jpg",
                  "/images/media/insta-02.jpg",
                  "/images/media/insta-03.jpg",
                  "/images/media/insta-04.jpg",
                  "/images/media/insta-05.jpg",
                  "/images/media/insta-06.jpg",
                  "/images/media/insta-07.jpg",
                  "/images/media/insta-08.jpg",
                  "/images/media/insta-09.jpg"
                ].map((imgSrc, i) => (
                  <a href="https://www.instagram.com/myriad_arts" target="_blank" rel="noopener noreferrer" key={i} className="aspect-square relative group overflow-hidden bg-white/5 cursor-pointer">
                    <img src={imgSrc} alt={`Instagram post ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/logos/myriad-arts-logo.jpg'; }} />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-white text-sm filled">favorite</span>
                        <span className="text-white text-xs font-bold">{((i * 47) % 500) + 50}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-white text-sm filled">chat_bubble</span>
                        <span className="text-white text-xs font-bold">{((i * 13) % 50) + 5}</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Facebook */}
        <GlassCard className="md:col-span-1 flex flex-col" delay={0.2}>
          <div className="mb-6 flex flex-col items-center text-center">
            <h3 className="text-center type-heading-xl text-white">Facebook</h3>
            <p className="type-body-md text-[#f5dbd8] mt-2 max-w-[90%]">
              Community updates, event announcements, and long-form highlights.
            </p>
          </div>
          <div className="mt-auto w-full h-[450px] rounded-xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] relative bg-transparent block">
            {/* Custom Interactive Dark Mode Facebook Preview */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#18191A] via-[#18191A]/80 to-transparent pointer-events-none flex items-end justify-center pb-3 z-10 rounded-b-xl">
              <div className="text-[#B0B3B8] text-xs font-semibold flex flex-col items-center animate-bounce">
                <span>Scroll for more</span>
                <span className="material-symbols-outlined text-[16px]">keyboard_arrow_down</span>
              </div>
            </div>
            <div 
              ref={fbScroll.ref}
              data-lenis-prevent="true"
              onWheel={fbScroll.onWheel}
              onMouseDown={fbScroll.onMouseDown}
              onMouseLeave={fbScroll.onMouseLeave}
              onMouseUp={fbScroll.onMouseUp}
              onMouseMove={fbScroll.onMouseMove}
              className={`w-full h-full bg-[#18191A] text-[#E4E6EB] flex flex-col overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/20 hover:[&::-webkit-scrollbar-thumb]:bg-white/40 [&::-webkit-scrollbar-thumb]:rounded-full rounded-xl border border-white/10 relative pb-4 ${fbScroll.isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}>
              {/* Cover & Profile */}
              <div className="relative shrink-0">
                <div className="h-28 w-full bg-[#242526] overflow-hidden">
                  <img src="/images/media/fb-cover.jpg" className="w-full h-full object-cover opacity-75" alt="cover" />
                </div>
                <div className="absolute -bottom-8 left-4 w-16 h-16 rounded-full border-4 border-[#18191A] overflow-hidden bg-black z-10 shadow-lg">
                  <img src="/logos/myriad-arts-logo.jpg" className="w-full h-full object-cover" alt="Myriad Arts" />
                </div>
              </div>
              
              {/* Page Info */}
              <div className="pt-10 px-4 pb-4 border-b border-white/10 shrink-0">
                <h4 className="font-bold text-xl text-white">Myriad Arts</h4>
                <p className="text-sm text-[#B0B3B8] mt-1">Arts & Entertainment • Community</p>
                <a href="https://www.facebook.com/myriadarts" target="_blank" rel="noopener noreferrer" className="mt-4 flex items-center justify-center gap-2 bg-[#2374E1] hover:bg-[#1A5CBA] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors w-full shadow-md">
                  <span className="material-symbols-outlined text-[18px]">thumb_up</span>
                  Like Page
                </a>
              </div>
              
              {/* Post Feed */}
              <div className="p-4 shrink-0 space-y-4">
                <div className="bg-[#242526] rounded-xl p-3 shadow-md border border-white/5">
                  <div className="flex items-center gap-2 mb-3">
                    <img src="/logos/myriad-arts-logo.jpg" className="w-10 h-10 rounded-full border border-white/10" alt="Myriad Arts" />
                    <div>
                      <div className="font-semibold text-sm text-[#E4E6EB] hover:underline cursor-pointer">Myriad Arts</div>
                      <div className="text-xs text-[#B0B3B8] flex items-center gap-1">2 hrs • <span className="material-symbols-outlined text-[12px]">public</span></div>
                    </div>
                  </div>
                  <p className="text-sm mb-3 text-[#E4E6EB] leading-relaxed">Captivating performances and community workshops coming soon. Stay tuned for our latest event updates and behind-the-scenes highlights! ✨🎭</p>
                  <div className="rounded-lg overflow-hidden mb-3 -mx-3 border-y border-white/5">
                    <img src="/images/media/fb-post-01.jpg" className="w-full h-auto max-h-[220px] object-cover" alt="Post 1" />
                  </div>
                  <div className="flex items-center justify-between border-t border-[#3E4042] pt-2 text-[#B0B3B8] mt-2">
                    <button className="flex-1 flex justify-center items-center gap-2 text-sm hover:bg-[#3A3B3C] py-2 rounded-lg transition-colors font-medium">
                      <span className="material-symbols-outlined text-[18px]">thumb_up</span> Like
                    </button>
                    <button className="flex-1 flex justify-center items-center gap-2 text-sm hover:bg-[#3A3B3C] py-2 rounded-lg transition-colors font-medium">
                      <span className="material-symbols-outlined text-[18px]">chat_bubble</span> Comment
                    </button>
                    <button className="flex-1 flex justify-center items-center gap-2 text-sm hover:bg-[#3A3B3C] py-2 rounded-lg transition-colors font-medium">
                      <span className="material-symbols-outlined text-[18px]">share</span> Share
                    </button>
                  </div>
                </div>

                <div className="bg-[#242526] rounded-xl p-3 shadow-md border border-white/5">
                  <div className="flex items-center gap-2 mb-3">
                    <img src="/logos/myriad-arts-logo.jpg" className="w-10 h-10 rounded-full border border-white/10" alt="Myriad Arts" />
                    <div>
                      <div className="font-semibold text-sm text-[#E4E6EB] hover:underline cursor-pointer">Myriad Arts</div>
                      <div className="text-xs text-[#B0B3B8] flex items-center gap-1">1 day • <span className="material-symbols-outlined text-[12px]">public</span></div>
                    </div>
                  </div>
                  <p className="text-sm mb-3 text-[#E4E6EB] leading-relaxed">Connecting artists, folk traditions, and global audiences. Explore our digital media library for exclusive episodes! 🌟🎬</p>
                  <div className="rounded-lg overflow-hidden mb-3 -mx-3 border-y border-white/5">
                    <img src="/images/media/fb-post-02.jpg" className="w-full h-auto max-h-[220px] object-cover" alt="Post 2" />
                  </div>
                  <div className="flex items-center justify-between border-t border-[#3E4042] pt-2 text-[#B0B3B8] mt-2">
                    <button className="flex-1 flex justify-center items-center gap-2 text-sm hover:bg-[#3A3B3C] py-2 rounded-lg transition-colors font-medium">
                      <span className="material-symbols-outlined text-[18px]">thumb_up</span> Like
                    </button>
                    <button className="flex-1 flex justify-center items-center gap-2 text-sm hover:bg-[#3A3B3C] py-2 rounded-lg transition-colors font-medium">
                      <span className="material-symbols-outlined text-[18px]">chat_bubble</span> Comment
                    </button>
                    <button className="flex-1 flex justify-center items-center gap-2 text-sm hover:bg-[#3A3B3C] py-2 rounded-lg transition-colors font-medium">
                      <span className="material-symbols-outlined text-[18px]">share</span> Share
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}











