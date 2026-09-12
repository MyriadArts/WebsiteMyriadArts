"use client";

import { motion } from "framer-motion";

export default function SectionHeading({ title, subtitle, variant = "default", className = "" }) {
  const variants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60, damping: 14 } },
  };

  const sizeMap = {
    default: "type-heading-xl",
    small: "type-label-caps",
    display: "type-heading-xl",
    hero: "type-display-lg drop-shadow-[0_18px_55px_rgba(0,0,0,0.6)]",
  };

  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={variants} className={`w-full ${className}`}>
      <h2 className={`${sizeMap[variant] || sizeMap.default} text-white ${variant === "hero" ? "text-center" : ""}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 ${variant === "small" ? "type-body-sm" : "type-body-md"}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
