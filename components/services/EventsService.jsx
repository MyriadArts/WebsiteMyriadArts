"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  containerVariants,
  textVariants,
  splitRevealVariants,
  cardVariants,
} from "../../lib/animations";

export default function EventsService({ detailScrollRef }) {
  return (
    <div 
      id="events" 
      className="scroll-mt-24 pb-8 w-full text-left"
    >
      {/*  Sub-Hero Image Section - Pinterest Split-Reveal  */}
      <section className="max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop pt-4 md:pt-8 pb-12 overflow-hidden">
        <motion.div 
          variants={splitRevealVariants}
          className="relative w-full h-[500px] mb-20 group bg-black/60 flex flex-col justify-end p-12 md:p-20 overflow-hidden rounded-2xl border border-rule-white"
        >
          <motion.div 
            initial={{ scale: 1.15 }} 
            whileInView={{ scale: 1 }} 
            viewport={{ root: detailScrollRef, once: true, amount: 0.1 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }} 
            className="absolute inset-0 z-0 opacity-60 group-hover:opacity-80 transition-all duration-700"
          >
             <img alt="Production Stage" className="w-full h-full object-cover" src="/images/services/services-events-cover.jpg" />
          </motion.div>
          <div className="relative z-10 max-w-3xl">
            <motion.h2 variants={textVariants} className="font-evelins text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-8">Every Stage Tells A Story. We Build Stages.</motion.h2>
          </div>
        </motion.div>
      </section>

      {/*  Detailed Service Sections  */}
      <section className="pb-24 px-margin-mobile md:px-margin-desktop">
        <div className="max-w-max-width mx-auto">
          <div className="flex flex-col gap-32">
            {/*  Event Planning Editorial  */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
              <div className="md:col-span-5 md:sticky md:top-40">
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ root: detailScrollRef, once: true, amount: 0.15 }}
                  variants={textVariants}
                >
                  <h3 className="font-evelins text-4xl md:text-5xl leading-none text-primary opacity-20 mb-4 select-none">01</h3>
                  <h4 className="text-2xl md:text-3xl font-evelins text-white mb-6 tracking-wide">Event Planning</h4>
                  <p className="font-sans text-xs md:text-sm text-on-surface-variant max-w-sm mb-6 md:mb-12 leading-relaxed">Architecture for experiences. We map the emotional journey of your audience from the first invitation to the final curtain call.</p>
                </motion.div>
              </div>
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ root: detailScrollRef, once: true, amount: 0.15 }}
                variants={containerVariants} 
                className="md:col-span-7 flex flex-col"
              >
                <motion.div variants={textVariants} className="group border-b border-rule-white py-8 flex flex-col md:flex-row md:items-end justify-between hover:border-primary transition-colors">
                  <span className="font-evelins text-xl md:text-2xl group-hover:text-primary transition-colors tracking-wide">Concept Development</span>
                  <span className="font-sans text-[11px] font-semibold text-on-surface-variant mt-2 md:mt-0 tracking-widest uppercase">Structural Phase</span>
                </motion.div>
                <motion.div variants={textVariants} className="group border-b border-rule-white py-8 flex flex-col md:flex-row md:items-end justify-between hover:border-primary transition-colors">
                  <span className="font-evelins text-xl md:text-2xl group-hover:text-primary transition-colors tracking-wide">Venue Selection &amp; Management</span>
                  <span className="font-sans text-[11px] font-semibold text-on-surface-variant mt-2 md:mt-0 tracking-widest uppercase">Environment</span>
                </motion.div>
                <motion.div variants={textVariants} className="group border-b border-rule-white py-8 flex flex-col md:flex-row md:items-end justify-between hover:border-primary transition-colors">
                  <span className="font-evelins text-xl md:text-2xl group-hover:text-primary transition-colors tracking-wide">Artist &amp; Talent Coordination</span>
                  <span className="font-sans text-[11px] font-semibold text-on-surface-variant mt-2 md:mt-0 tracking-widest uppercase">Creative Curation</span>
                </motion.div>
                <motion.div variants={textVariants} className="group border-b border-rule-white py-8 flex flex-col md:flex-row md:items-end justify-between hover:border-primary transition-colors">
                  <span className="font-evelins text-xl md:text-2xl group-hover:text-primary transition-colors tracking-wide">Timeline &amp; Budget Planning</span>
                  <span className="font-sans text-[11px] font-semibold text-on-surface-variant mt-2 md:mt-0 tracking-widest uppercase">Precision Logistics</span>
                </motion.div>
              </motion.div>
            </div>

            {/*  Production Services Editorial  */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ root: detailScrollRef, once: true, amount: 0.15 }}
                variants={containerVariants} 
                className="md:col-span-7 order-2 md:order-1 flex flex-col"
              >
                <motion.div variants={textVariants} className="group border-b border-rule-white py-8 flex flex-col md:flex-row md:items-end justify-between hover:border-primary transition-colors">
                  <span className="font-evelins text-xl md:text-2xl group-hover:text-primary transition-colors tracking-wide">Stage Design &amp; Setup</span>
                  <span className="font-sans text-[11px] font-semibold text-on-surface-variant mt-2 md:mt-0 tracking-widest uppercase">Scenography</span>
                </motion.div>
                <motion.div variants={textVariants} className="group border-b border-rule-white py-8 flex flex-col md:flex-row md:items-end justify-between hover:border-primary transition-colors">
                  <span className="font-evelins text-xl md:text-2xl group-hover:text-primary transition-colors tracking-wide">Lighting &amp; Sound Engineering</span>
                  <span className="font-sans text-[11px] font-semibold text-on-surface-variant mt-2 md:mt-0 tracking-widest uppercase">Atmospheric Tech</span>
                </motion.div>
                <motion.div variants={textVariants} className="group border-b border-rule-white py-8 flex flex-col md:flex-row md:items-end justify-between hover:border-primary transition-colors">
                  <span className="font-evelins text-xl md:text-2xl group-hover:text-primary transition-colors tracking-wide">Video &amp; Photography Production</span>
                  <span className="font-sans text-[11px] font-semibold text-on-surface-variant mt-2 md:mt-0 tracking-widest uppercase">Legacy Capture</span>
                </motion.div>
                <motion.div variants={textVariants} className="group border-b border-rule-white py-8 flex flex-col md:flex-row md:items-end justify-between hover:border-primary transition-colors">
                  <span className="font-evelins text-xl md:text-2xl group-hover:text-primary transition-colors tracking-wide">Emcee Service</span>
                  <span className="font-sans text-[11px] font-semibold text-on-surface-variant mt-2 md:mt-0 tracking-widest uppercase">Professional Hosting</span>
                </motion.div>
                <motion.div variants={textVariants} className="group border-b border-rule-white py-8 flex flex-col md:flex-row md:items-end justify-between hover:border-primary transition-colors">
                  <span className="font-evelins text-xl md:text-2xl group-hover:text-primary transition-colors tracking-wide">Post-Production &amp; Content Delivery</span>
                  <span className="font-sans text-[11px] font-semibold text-on-surface-variant mt-2 md:mt-0 tracking-widest uppercase">Final Polish</span>
                </motion.div>
              </motion.div>
              <div className="md:col-span-5 order-1 md:order-2 md:sticky md:top-40">
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ root: detailScrollRef, once: true, amount: 0.15 }}
                  variants={textVariants}
                >
                  <h3 className="font-evelins text-4xl md:text-5xl leading-none text-primary opacity-20 mb-4 select-none">02</h3>
                  <h4 className="text-2xl md:text-3xl font-evelins text-white mb-6 tracking-wide">Production Services</h4>
                  <p className="font-sans text-xs md:text-sm text-on-surface-variant max-w-sm mb-12 leading-relaxed">Precision technical execution. We transform raw venues into immersive sensory environments engineered for flawless execution.</p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop pb-16 md:pb-24 text-center">
        <div className="border-t border-rule-white pt-12 md:pt-16">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-primary mb-4">Bring Your Vision To Life</p>
          <h2 className="font-evelins text-3xl md:text-5xl text-white mb-7">Let&apos;s Create Something Extraordinary</h2>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-md bg-[#c1121f] px-6 py-3 font-sans text-xs font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#e01423]"
          >
            Collaborate With Us
          </Link>
        </div>
      </section>
    </div>
  );
}
