"use client";
import Image from "next/image";

export default function AboutGuides() {
  return (
    <section className="relative w-full py-32 border-b border-white/5 z-10 overflow-hidden bg-transparent">
      <div className="absolute inset-0 z-0 opacity-10 grayscale mix-blend-luminosity">
        <Image src="/images/about/about-gallery-06.jpg" alt="Background" fill className="object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] z-0"></div>
      <div className="absolute inset-0 bg-[#c1121f]/5 mix-blend-color-dodge pointer-events-none z-0"></div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-20 relative z-10">
        <div className="flex flex-col md:flex-row items-start justify-between gap-12 mb-20">
          <div className="max-w-2xl">
            <div className="bg-white text-black px-4 py-1 text-[10px] font-bold tracking-[0.3em] uppercase mb-8 inline-block" data-aos="fade-right">
              THE FOUNDATION
            </div>
            <h2 className="font-evelins font-normal text-3xl sm:text-4xl md:text-5xl uppercase text-white tracking-wide" data-aos="zoom-in">
              What <span className="text-[#c1121f]">Guides</span> Us
            </h2>
          </div>

          <p className="text-[#a19e99] text-lg max-w-xl font-light leading-relaxed border-l border-[#c1121f]/50 pl-6" data-aos="fade-left">
            Our principles are not just words—they are the operational code that dictates every decision, every frame, and every stage we build.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Quality", desc: "We demand absolute quality in all aspects of our work. We accept nothing less than delivering memorable, captivating, and high-impact experiences that exceed expectations.", icon: "star" },
            { title: "Innovation", desc: "Tradition is a launchpad, not a cage. We weaponize modern technology to dissect, amplify, and broadcast ancient rituals into the hyper-digital frontier.", icon: "flare" },
            { title: "Community", desc: "We do not have an audience. We have a collective. A hive-mind of artists and witnesses bleeding into one shared, heavy-hitting frequency.", icon: "hub" }
          ].map((guide, idx) => (
            <div
              key={idx}
              className={`relative overflow-hidden border border-white/10 p-10 bg-gradient-to-b from-[#0a0202] to-[#030303] hover:border-[#c1121f]/50 hover:shadow-[0_20px_50px_rgba(193,18,31,0.15)] hover:-translate-y-3 transition-all duration-500 text-left group ${idx === 1 ? "md:mt-12" : idx === 2 ? "md:mt-24" : ""
                }`}
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >

              {/* Red Glow Effect inside card on hover */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#c1121f] rounded-full blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"></div>

              <div className="relative z-10">
                <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center mb-10 group-hover:bg-[#c1121f] group-hover:border-[#c1121f] transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(193,18,31,0.5)]">
                  <span className="material-symbols-outlined text-white/70 group-hover:text-white transition-colors duration-500">{guide.icon}</span>
                </div>
                <h3 className="font-evelins text-3xl text-white mb-6 uppercase tracking-widest relative inline-block">
                  {guide.title}
                  <div className="absolute -bottom-2 left-0 w-0 h-px bg-[#c1121f] group-hover:w-full transition-all duration-500"></div>
                </h3>
                <p className="text-sm text-[#a19e99] leading-relaxed group-hover:text-white/90 transition-colors duration-500">
                  {guide.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
