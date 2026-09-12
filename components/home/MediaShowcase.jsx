"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import VaarsaAtmosphericBackground from "../shared/VaarsaAtmosphericBackground";

const videos = [
  { id: 1, title: "Podcasts", video: "/videos/home/media-podcast.mp4", link: "/media#podcasts", image: "/images/home/media-podcast-thumbnail.jpg" },
  { id: 2, title: "Performances", video: "/videos/home/media-performances.mp4", link: "/media#performances", image: "/images/home/media-performances-thumbnail.jpg" },
  { id: 3, title: "Vaarsa", video: "/videos/vaarsa/vaarsa-showcase.mp4", link: "/vaarsa", image: "/images/home/home-vaarsa-about.jpg" },
];

export default function MediaShowcase() {
  const router = useRouter();
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const [hoveredVideo, setHoveredVideo] = useState(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    if (isInView) {
      el.play().catch(() => {});
    } else {
      try { el.pause(); } catch (e) {}
    }
  }, [isInView]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="media" 
      className="relative w-full min-h-screen bg-[#0a0a0a] flex flex-col justify-end overflow-hidden pt-8 md:pt-12 pb-16 md:pb-24 isolate"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0 bg-[#050505]">
        <VaarsaAtmosphericBackground />
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          className="w-full h-full object-cover opacity-50"
        >
          <source src="/videos/home/media-showcase-bg.mp4" type="video/mp4" />
        </video>

        {/* Cinematic Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/90 to-transparent w-full md:w-[72%]" />
        <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-[#050505] via-[#050505]/82 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-[14%] bg-gradient-to-b from-[#050505] via-[#050505]/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col justify-end pt-12 md:pt-16 pb-12 md:pb-16">
        
        {/* Header */}
        <motion.div 
          className="w-full px-[6vw] mb-4 md:mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex items-center gap-3 mb-2 opacity-90">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 md:w-8 md:h-8 text-white">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
            </svg>
            <span className="text-white text-base md:text-xl font-bold tracking-tight">
              YouTube
            </span>
          </div>

          <h2 className="type-heading-xl text-[#c1121f] drop-shadow-lg mb-2">
            CALAKAR
          </h2>
          <p className="type-body-md text-white/70 max-w-2xl drop-shadow-md">
            Experience the mesmerizing blend of traditional classical dance and modern contemporary beats in our unforgettable live performances.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-4 md:mt-6">
            <button
              onClick={() => router.push('/media')}
              className="type-button bg-white text-black px-6 md:px-8 py-2.5 md:py-3 rounded flex items-center gap-2 hover:bg-white/90 transition-colors shadow-2xl cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 md:w-5 md:h-5 text-black">
                <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
              </svg>
              Watch Now
            </button>
          </div>
        </motion.div>

        {/* Desktop View: Static 3-Card Display */}
        <div className="hidden md:block w-full relative z-20">
          <h3 className="w-full px-[6vw] text-white/80 type-label-caps mb-4">
            Explore more
          </h3>
          
          <div className="w-full px-[6vw] py-2">
            <div className="grid grid-cols-3 gap-6 w-full">
              {videos.map((video) => (
                <motion.div
                  key={`desk-${video.id}`}
                  onMouseEnter={() => setHoveredVideo(video.id)}
                  onMouseLeave={() => setHoveredVideo(null)}
                  onClick={() => router.push(video.link)}
                  className="relative group rounded-xl overflow-hidden bg-black/40 w-full aspect-video cursor-pointer border border-white/10 hover:border-white/30 transition-all duration-300 shadow-xl"
                  whileHover={{ scale: 1.04, y: -4 }}
                >
                  {/* Video Background (Rendered ON DEMAND on hover only) */}
                  {hoveredVideo === video.id && (
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover opacity-100 transition-opacity duration-300"
                    >
                      <source src={video.video} type="video/mp4" />
                    </video>
                  )}

                  {/* Fallback Thumbnail Image */}
                  <img 
                    src={video.image} 
                    alt={video.title} 
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-10 transition-opacity duration-300"
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  {/* Content Label Container */}
                  <div className="absolute left-0 bottom-0 w-full p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h4 className="type-heading-md text-white mb-1 drop-shadow-md line-clamp-2 leading-[1.35] pb-0.5">{video.title}</h4>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                      <span className="type-meta text-blue-400">Featured</span>
                    </div>
                  </div>

                  {/* Play Icon */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                     <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full border border-white/50 flex items-center justify-center pl-1 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                        <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                      </svg>
                     </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile View: Continuous Slow Moving Carousel Strip */}
        <div className="md:hidden w-full relative z-20 overflow-hidden">
          <h3 className="w-full px-[6vw] text-white/80 type-label-caps mb-2">
            Explore more
          </h3>
          <div className="w-full overflow-hidden py-4">
            <style>{`
              @keyframes calakarMarquee {
                0% { transform: translate3d(0%, 0, 0); }
                100% { transform: translate3d(-50%, 0, 0); }
              }
            `}</style>
            <div 
              className="flex gap-4 w-max items-center"
              style={{
                animation: 'calakarMarquee 35s linear infinite',
                animationPlayState: hoveredVideo ? 'paused' : 'running',
                willChange: 'transform'
              }}
            >
              {[...videos, ...videos].map((video, idx) => (
                <motion.div
                  key={`mob-${video.id}-${idx}`}
                  onMouseEnter={() => setHoveredVideo(video.id)}
                  onMouseLeave={() => setHoveredVideo(null)}
                  onClick={() => router.push(video.link)}
                  className="relative group rounded-lg overflow-hidden bg-black/40 flex-shrink-0 w-[260px] sm:w-[280px] aspect-video cursor-pointer border border-white/10 hover:border-white/30 transition-all duration-300 shadow-xl"
                  whileHover={{ scale: 1.06, y: -4 }}
                >
                  {/* Video Background (Rendered ON DEMAND on hover only) */}
                  {hoveredVideo === video.id && (
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover opacity-100 transition-opacity duration-300"
                    >
                      <source src={video.video} type="video/mp4" />
                    </video>
                  )}

                  {/* Fallback Thumbnail Image */}
                  <img 
                    src={video.image} 
                    alt={video.title} 
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-10 transition-opacity duration-300"
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  {/* Content Label Container */}
                  <div className="absolute left-0 bottom-0 w-full p-3 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h4 className="type-heading-md text-white mb-1 drop-shadow-md line-clamp-2 leading-[1.35] pb-0.5">{video.title}</h4>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">Featured</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



