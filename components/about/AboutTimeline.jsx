"use client";
import Image from "next/image";

export default function AboutTimeline() {
  return (
    <section className="relative w-full py-32 border-b border-white/5 z-10 bg-[#050101] overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-15 mix-blend-luminosity grayscale">
        <Image src="/images/about/about-journey-backdrop.png" alt="Background" fill className="object-cover object-bottom" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#050101] via-[#c1121f]/10 to-[#050101] mix-blend-multiply z-0 pointer-events-none"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-full bg-[#c1121f] blur-[20px] opacity-20 pointer-events-none hidden md:block z-0"></div>
      <div className="max-w-[1000px] mx-auto px-6 lg:px-20 relative z-10">
        <div className="bg-black text-white border border-[#c1121f] px-4 py-1 text-[10px] font-bold tracking-[0.3em] uppercase mb-16 inline-block" data-aos="fade-down">
          HISTORY
        </div>

        <h2 className="font-evelins font-normal text-3xl sm:text-4xl md:text-5xl uppercase text-white mb-20 tracking-wide" data-aos="zoom-in">
          Our <span className="text-[#c1121f]">Journey</span> Through Time
        </h2>

        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-12 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[2px] before:bg-gradient-to-b before:from-transparent before:via-[#c1121f]/50 before:to-transparent">
          {[
            { year: "2011", title: "Foundation & First Performance", desc: "The genesis spark in a derelict warehouse. The collision of raw movement and heavy sound." },
            { year: "2014", title: "Expansion to Education Programs", desc: "Infecting the next generation with the virus of radical expression and somatic coding." },
            { year: "2017", title: "Launch of Varna Festival", desc: "Our first global shockwave. Three days of unbroken kinetic energy and massive visual scale." },
            { year: "2020", title: "Digital Transformation", desc: "The world locked down. We broke into the grid, broadcasting pure, unadulterated signal globally." },
            { year: "2023", title: "International Collaborations", desc: "Crossing borders, merging tribes. Building a global syndicate of heavy-hitting art." },
            { year: "2026", title: "New Creative Hub Opening", desc: "The monolith is complete. Our permanent temple of modern heritage and digital integration." },
          ].map((item, idx) => (
            <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active" data-aos="fade-up">
              <div className="flex items-center justify-center w-24 h-12 bg-[#c1121f] text-white font-evelins text-2xl shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_20px_rgba(193,18,31,0.5)] z-10 relative">
                {item.year}
              </div>
              <div className="w-[calc(100%-6rem)] md:w-[calc(50%-3rem)] bg-[#030303] border border-white/20 p-6 group-hover:border-[#c1121f] group-hover:-translate-y-2 group-hover:shadow-[0_15px_40px_rgba(193,18,31,0.15)] transition-all duration-500">
                <h3 className="font-evelins text-xl uppercase text-white mb-2">{item.title}</h3>
                <p className="text-sm text-[#a19e99] leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
