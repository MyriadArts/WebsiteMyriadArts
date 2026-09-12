"use client";

import { ReactLenis } from "@studio-freight/react-lenis";

export default function SmoothScrollController({ children }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        smoothWheel: true,
        wheelMultiplier: 0.85,
        touchMultiplier: 1,
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
