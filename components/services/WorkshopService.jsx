"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  containerVariants,
  textVariants,
  cardVariants,
} from "../../lib/animations";

export default function WorkshopService({ detailScrollRef }) {
  return (
    <motion.div
      id="workshops"
      initial="hidden"
      whileInView="visible"
      viewport={{ root: detailScrollRef, once: true, amount: 0.15 }}
      variants={containerVariants}
      className="scroll-mt-24 pb-8 w-full text-center"
    >
      <div className="max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop pt-4 md:pt-8">
        {/*  1. WORKSHOP BENEFITS SECTION (AT VERY TOP)  */}
        <motion.section variants={containerVariants} className="mb-12 pt-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            <motion.div variants={cardVariants} whileHover="hover" className="text-center cursor-pointer">
              <motion.div variants={{ hover: { y: -8 } }} transition={{ duration: 0.5 }} className="font-evelins text-4xl md:text-5xl text-primary-container mb-3">01</motion.div>
              <p className="font-sans text-xs font-bold tracking-[0.2em] text-on-surface uppercase">EXPERT INSTRUCTORS</p>
              <motion.div variants={{ hover: { width: 64 } }} transition={{ duration: 0.3 }} className="w-8 h-px bg-primary-container mx-auto mt-4"></motion.div>
            </motion.div>
            <motion.div variants={cardVariants} whileHover="hover" className="text-center cursor-pointer">
              <motion.div variants={{ hover: { y: -8 } }} transition={{ duration: 0.5 }} className="font-evelins text-4xl md:text-5xl text-primary-container mb-3">02</motion.div>
              <p className="font-sans text-xs font-bold tracking-[0.2em] text-on-surface uppercase">HANDS-ON LEARNING</p>
              <motion.div variants={{ hover: { width: 64 } }} transition={{ duration: 0.3 }} className="w-8 h-px bg-primary-container mx-auto mt-4"></motion.div>
            </motion.div>
            <motion.div variants={cardVariants} whileHover="hover" className="text-center cursor-pointer">
              <motion.div variants={{ hover: { y: -8 } }} transition={{ duration: 0.5 }} className="font-evelins text-4xl md:text-5xl text-primary-container mb-3">03</motion.div>
              <p className="font-sans text-xs font-bold tracking-[0.2em] text-on-surface uppercase">CERTIFICATE PROVIDED</p>
              <motion.div variants={{ hover: { width: 64 } }} transition={{ duration: 0.3 }} className="w-8 h-px bg-primary-container mx-auto mt-4"></motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/*  2. REDUCED SIZE EDITORIAL HEADER SECTION (BELOW BENEFITS, ABOVE CARDS)  */}
        <motion.section variants={containerVariants} className="mb-10 w-full flex justify-center">
          <motion.div variants={textVariants} className="flex flex-col items-center justify-center text-center">
            <h2 className="font-evelins text-2xl md:text-3xl lg:text-4xl text-on-surface leading-tight text-center mx-auto w-full">Educational Workshops</h2>
          </motion.div>
        </motion.section>

        {/*  Enhanced 3x1 Workshop Grid  */}
        <motion.section variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-gutter mb-12 text-left">
          {/*  Card 1: Lazim  */}
          <motion.div variants={cardVariants} className="bg-black/60 backdrop-blur-md p-6 md:p-10 rounded-lg border border-rule-white group transition-all duration-300 hover:border-[#c1121f]/50 hover:-translate-y-1">
            <div className="aspect-video w-full mb-8 overflow-hidden rounded-sm bg-background-matte">
              <img alt="Lazim" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="/images/services/workshop-lazim.jpg" />
            </div>
            
            <h3 className="font-evelins text-lg md:text-xl text-on-surface mb-4 tracking-wide">Lazim</h3>
            <p className="font-sans text-xs md:text-sm text-on-surface-variant mb-8 line-clamp-2">
              An introductory immersion into the foundational movements, rhythms, and philosophical underpinnings of classical theater.
            </p>
          </motion.div>
          
          {/*  Card 2: Folks  */}
          <motion.div variants={cardVariants} className="bg-black/60 backdrop-blur-md p-6 md:p-10 rounded-lg border border-rule-white group transition-all duration-300 hover:border-[#c1121f]/50 hover:-translate-y-1">
            <div className="aspect-video w-full mb-8 overflow-hidden rounded-sm bg-background-matte">
              <img alt="Folks" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="/images/services/services-folk-dance-workshop.jpg" />
            </div>
            
            <h3 className="font-evelins text-lg md:text-xl text-on-surface mb-4 tracking-wide">Folks</h3>
            <p className="font-sans text-xs md:text-sm text-on-surface-variant mb-8 line-clamp-2">
              Intensive sessions led by legendary practitioners focusing on nuanced abhinaya and complex rhythmic structures.
            </p>
          </motion.div>
          
          {/*  Card 3: Theatre  */}
          <motion.div variants={cardVariants} className="bg-black/60 backdrop-blur-md p-6 md:p-10 rounded-lg border border-rule-white group transition-all duration-300 hover:border-[#c1121f]/50 hover:-translate-y-1">
            <div className="aspect-video w-full mb-8 overflow-hidden rounded-sm bg-background-matte">
              <img alt="Theatre" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="/images/services/workshop-theatre.jpg" />
            </div>
            
            <h3 className="font-evelins text-lg md:text-xl text-on-surface mb-4 tracking-wide">Theatre</h3>
            <p className="font-sans text-xs md:text-sm text-on-surface-variant mb-8 line-clamp-2">
              Harnessing the principles of theatrical focus and ensemble coordination to enhance modern professional leadership styles.
            </p>
          </motion.div>
        </motion.section>

        <section className="pb-8 text-center">
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
    </motion.div>
  );
}
