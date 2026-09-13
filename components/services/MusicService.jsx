"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  splitRevealVariants,
} from "../../lib/animations";

const disciplines = [
  {
    number: "01",
    category: "Vocalists",
    title: "Singers & Master Vocalists",
    description:
      "Solo vocalists, thumri, sufi, playback singers, contemporary Indian soul, and jazz vocalists spanning Marathi, Hindi, English, and regional heritage repertoires.",
    tags: ["Semi-Classical", "Bollywood Soul", "Ghazal"],
    image:
      "/images/services/services-music-vocalists.jpg",
  },
  {
    number: "02",
    category: "Instrumentalists",
    title: "Virtuoso Instrumentalists",
    description:
      "Concert flautists, sitar maestros, acoustic guitarists, concert pianists, cello soloists, and nuanced percussionists bringing tactile musical warmth to your room.",
    tags: ["Flute & Sitar", "Grand Piano", "Acoustic Strings"],
    image:
      "/images/services/services-instrumentalists.jpg",
  },
  {
    number: "03",
    category: "Ensembles",
    title: "Live Bands & Celebratory Acts",
    description:
      "Carefully assembled 4-to-8-piece live bands suited for grand receptions, corporate galas, high-tempo celebration sets, and premier festival stages.",
    tags: ["Bollywood Brass", "Fusion Quintet", "Indie Rock"],
    image:
      "/images/services/services-bands.jpg",
  },

];

const occasions = [
  {
    number: "01",
    label: "Corporate & Keynote",
    title: "Corporate Galas & Summits",
    description:
      "Polished acoustic background ambiance, high-impact gala dinner performances, and resonant keynote stage openers crafted to command executive respect without overpowering discourse.",
    tags: ["Leadership Retreats", "Global Summits", "Honors Ceremonies"],
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop",
    span: "large",
  },
  {
    number: "02",
    label: "Celebrations & Vows",
    title: "Weddings & Royal Celebrations",
    description:
      "Sangeet headline bands, intimate cocktail hour jazz, grand celebratory sets, and soul-stirring live acoustic instrumentation for ceremonial vows.",
    tags: ["Sangeet Stages", "Sundowner Cocktails", "Vow Pheras"],
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",
    span: "large",
  },
  {
    number: "03",
    label: "Salons",
    title: "Private Soirées & Baithaks",
    description:
      "Unamplified living room baithaks, bespoke anniversary dinner duos, and exclusive private salon recitals designed for connoisseurs and close company.",
    tags: [],
    image:
      "https://images.unsplash.com/photo-1522158637959-30385a09e0da?q=80&w=800&auto=format&fit=crop",
    span: "small",
  },
 
  {
    number: "05",
    label: "Festivals",
    title: "Festivals & Public Arenas",
    description:
      "Headline festival performers, crowd-stirring ensemble acts, and multi-genre spectacle stages with commanding presence and flawless professionalism.",
    tags: [],
    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=800&auto=format&fit=crop",
    span: "small",
  },
];

const protocolSteps = [
  {
    number: "01",
    tag: "Intake",
    title: "Tell Us About Your Event",
    description:
      "Share your confirmed date, city, venue acoustic profile, guest demographic, and the emotional tone you envision across each hour of your gathering.",
    step: "Step I / IV",
    active: true,
  },
  {
    number: "02",
    tag: "Proposal",
    title: "We Curate",
    description:
      "Our curatorial director presents a bespoke shortlist of handpicked artists, unreleased audio samples, and staging formats tailored strictly to your parameters.",
    step: "Step II / IV",
  },
  {
    number: "03",
    tag: "Logistics",
    title: "We Connect & Coordinate",
    description:
      "We handle artist schedules, rider compliance, technical acoustic coordination, stage briefing, and musical sequencing to eliminate logistical friction.",
    step: "Step III / IV",
  },
  {
    number: "04",
    tag: "Stage",
    title: "Experience The Music",
    description:
      "The artists arrive and deliver the unforgettable live performance while you enjoy your gathering seamlessly as host, enveloped in genuine acoustic artistry.",
    step: "Step IV / IV",
  },
];

export default function MusicService({ detailScrollRef }) {
  return (
    <div id="music" className="scroll-mt-24 w-full text-left ">

      {/* Philosophy / Hero */}
      
        

      {/* What We Can Arrange */}
      <section className="w-full min-w-0 px-4 sm:px-6 md:px-margin-desktop py-12 sm:py-16 max-w-max-width mx-auto border-t border-white/5">
        <div className="flex min-w-0 flex-col md:flex-row md:items-end justify-center gap-4 mb-8 sm:mb-10">
          <div>
           
            <h2 className="type-heading-xl text-white text-balance break-words">
              What We Can <span className="text-[#c1121f] italic">Arrange</span>
            </h2>
          </div>
        
        </div>

        <div className="grid min-w-0 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-stretch gap-4 sm:gap-5">
          {disciplines.map((item) => (
            <div
              key={item.number}
              className="min-w-0 h-full border border-white/5 flex flex-col hover:border-white/20 hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
            >
              <div className="aspect-[4/3] w-full overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500"
                />
              
              </div>
              <div className="min-h-[220px] p-5 flex flex-col gap-2 flex-1">
         
                <h3 className="type-heading-md text-white break-words">{item.title}</h3>
                <p className="type-body-sm text-white flex-1">{item.description}</p>
               
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Music For Every Occasion */}
      <section className="w-full min-w-0 px-4 sm:px-6 md:px-margin-desktop py-12 sm:py-16 max-w-max-width mx-auto border-t border-white/5">
        <div className="mb-8 sm:mb-10 flex justify-center text-center">
          
          <h2 className="type-heading-xl text-white mb-3 text-balance break-words">
            Music for <span className="text-[#c1121f] italic">Every Occasion</span>
          </h2>
        
        </div>

        <div className="grid min-w-0 grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 mb-5 sm:mb-6">
          {occasions
            .filter((o) => o.span === "large")
            .map((item) => (
              <OccasionCard key={item.number} item={item} tall />
            ))}
        </div>

        <div className="grid min-w-0 grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
          {occasions
            .filter((o) => o.span === "small")
            .map((item) => (
              <OccasionCard key={item.number} item={item} />
            ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="w-full min-w-0 px-4 sm:px-6 md:px-margin-desktop py-12 sm:py-16 pb-16 sm:pb-24 max-w-max-width mx-auto border-t border-white/5">
        <div className="mb-8 sm:mb-10 flex justify-center text-center">
          
          <h2 className="type-heading-xl text-white mb-3 text-balance break-words">
            How It <span className="text-[#c1121f] italic">Works</span>
          </h2>
        
        </div>

        <div className="grid min-w-0 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {protocolSteps.map((step) => (
            <div
              key={step.number}
              className="min-w-0 border border-white/5 p-4 sm:p-6 flex flex-col gap-4 hover:border-white/20 transition-colors"
            >
              <div className="flex items-start justify-between">
                <span className="type-heading-lg text-[#c1121f] ">{step.number}</span>
                <span
                  className={`w-2 h-2 rounded-full mt-2 bg-[#c1121f]`}
                  
                />
              </div>
            
              <h3 className="type-heading-md text-white break-words">{step.title}</h3>
              <p className="type-body-sm text-white flex-1">{step.description}</p>
           
            </div>
          ))}
        </div>
      </section>

      <section className="w-full min-w-0 px-4 sm:px-6 md:px-margin-desktop pb-16 sm:pb-24 max-w-max-width mx-auto text-center">
        <div className="border-t border-white/10 pt-12 sm:pt-16">
          <p className="type-label-caps text-[#c1121f] mb-4">Bring Your Vision To Life</p>
          <h2 className="type-heading-lg text-white mb-7 text-balance">Let&apos;s Create Something Extraordinary</h2>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-md bg-[#c1121f] px-6 py-3 type-button text-white transition-colors hover:bg-[#e01423]"
          >
            Collaborate With Us
          </Link>
        </div>
      </section>
    </div>
  );
}

function OccasionCard({ item, tall }) {
  return (
    
    <div className="group w-full h-full">
  <div className="flex items-start gap-4 sm:gap-5 md:gap-6 h-full p-5 sm:p-6 md:p-7 border border-white/10 rounded-xl bg-white/[0.02] hover:border-[#c1121f]/60 transition-all duration-300">

    <div className="shrink-0 flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#c1121f] text-white text-xs sm:text-sm font-mono">
      {item.number}
    </div>

    <div className="min-w-0 flex-1">
      <h3 className="type-heading-md text-white uppercase leading-tight mb-2 sm:mb-3">
        {item.title}
      </h3>

      <p className="type-body-sm text-white/60 leading-relaxed">
        {item.description}
      </p>
    </div>

  </div>
</div>
  );
}