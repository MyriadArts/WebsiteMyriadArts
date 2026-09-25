"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";

function RouteScrollRestoration() {
  const pathname = usePathname();
  const lenis = useLenis();

  // Disable default browser scroll restoration on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      
      // On initial page load / reload, start at top unless on media library
      if (!window.location.pathname.startsWith("/media")) {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }
    }
  }, []);

  // When changing routes, force scroll to top hero section (except /media pages)
  useEffect(() => {
    if (!pathname?.startsWith("/media")) {
      // Instant native scroll
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      // Instant Lenis smooth scroll reset
      if (lenis) {
        lenis.scrollTo(0, { immediate: true, force: true });
      }

      // Short delay fallback for dynamic content mounts
      const timer = setTimeout(() => {
        window.scrollTo(0, 0);
        if (lenis) {
          lenis.scrollTo(0, { immediate: true, force: true });
        }
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [pathname, lenis]);

  return null;
}

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
      <RouteScrollRestoration />
      {children}
    </ReactLenis>
  );
}
