"use client";

import React from "react";

export default function VaarsaAtmosphericBackground({ fixed = false }) {
  return (
    <div className={`${fixed ? "fixed" : "absolute"} inset-0 pointer-events-none z-0 overflow-hidden`}>
      <div className="absolute top-[-10%] left-[10%] w-[50vw] h-[50vw] rounded-full bg-[#c1121f]/15 blur-[160px]" />
      <div className="absolute top-[38%] right-[-8%] w-[45vw] h-[45vw] rounded-full bg-[#820a13]/12 blur-[180px]" />
      <div className="absolute bottom-[-10%] left-[15%] w-[45vw] h-[45vw] rounded-full bg-[#c1121f]/12 blur-[170px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.04] via-transparent to-transparent opacity-80" />
    </div>
  );
}
