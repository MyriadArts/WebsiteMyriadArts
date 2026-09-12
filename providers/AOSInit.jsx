"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AOSInit() {
  useEffect(() => {
    AOS.init({
      duration: 900,
      once: false,          // re-animate on each scroll past
      offset: 80,           // trigger 80px before element
      easing: "ease-out-cubic",
      delay: 0,
      mirror: true,         // animate out when scrolling back up
    });

    // Refresh AOS on route changes / dynamic content
    const timer = setTimeout(() => AOS.refresh(), 1000);
    return () => clearTimeout(timer);
  }, []);

  return null;
}
