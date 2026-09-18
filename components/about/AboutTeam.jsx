"use client";
import Image from "next/image";

export default function AboutTeam() {
  return (
    <section className="relative w-full py-32 border-b border-white/5 z-10 bg-[#050202] overflow-hidden">
      {/* Subtle radial glow in the center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-[#c1121f] rounded-full blur-[150px] opacity-[0.03] pointer-events-none z-0"></div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-20 text-center relative z-10">
       

        <h2 className="font-evelins font-normal text-3xl sm:text-4xl md:text-5xl uppercase text-white mb-20 tracking-wide" data-aos="zoom-in">
          Meet Our <span className="text-[#c1121f]">Team</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {[
            { name: "Shreyas Desai", role: "Founder & Artistic Director", desc: "The mastermind behind the madness. Aditya orchestrates the collision of eras, engineering psychological landscapes.", img: "/images/team/shreyas-desai.jpeg" },
            { name: "Shruti Samant", role: "Creative Director", desc: "She doesn't design scenes; she builds environments where the screen disappears and raw emotion takes over.", img: "/images/team/shruti-samant.jpg" },
            { name: "Kalvati Panchal", role: "Production Manager", desc: "The pulse regulator. Ensures the chaos is perfectly contained, weaponized, and delivered without latency.", img: "/images/team/kalavati-panchal.jpeg" },
            { name: "Akshata Awlegoankar", role: "Education Lead", desc: "Cultivating the next generation of artistic insurgents. Rewiring the minds and muscles of future architects.", img: "/images/team/akshata-awlegoankar.jpeg" }
          ].map((member, idx) => (
            <div
              key={idx}
              className="relative p-8 bg-gradient-to-br from-[#0a0505] to-[#050202] text-left group overflow-hidden border border-white/5 hover:border-[#c1121f]/40 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(193,18,31,0.15)] transition-all duration-500"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              {/* Index number */}
              <div className="absolute top-4 right-6 font-evelins text-5xl text-white/5 group-hover:text-[#c1121f]/20 transition-colors duration-500 z-0 select-none">
                0{idx + 1}
              </div>

              <div className="relative w-full h-48 md:h-64 mb-8 overflow-hidden border border-white/5 z-10 shadow-2xl">
                <Image
                  src={member.img}
                  alt={member.name}
                  fill
                  className="object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 mix-blend-luminosity group-hover:mix-blend-normal"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-50 group-hover:opacity-0 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-[#c1121f]/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              <div className="relative z-10 pl-6 border-l-2 border-[#c1121f]/30 group-hover:border-[#c1121f] transition-colors duration-500">
                <h3 className="font-evelins text-2xl md:text-3xl uppercase text-white tracking-tight mb-2 group-hover:text-[#c1121f] transition-colors duration-500">{member.name}</h3>
                <p className="text-[#c1121f] text-xs font-bold tracking-[0.25em] uppercase mb-4 opacity-70 group-hover:opacity-100 transition-opacity duration-500">{member.role}</p>
                <p className="text-sm text-[#a19e99] leading-relaxed group-hover:text-white/90 transition-colors duration-500">
                  {member.desc}
                </p>
              </div>

              {/* Cool corner accent */}
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-[#c1121f] opacity-0 group-hover:opacity-100 transform translate-x-4 translate-y-4 group-hover:translate-x-[-1.5rem] group-hover:translate-y-[-1.5rem] transition-all duration-700 ease-out pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
