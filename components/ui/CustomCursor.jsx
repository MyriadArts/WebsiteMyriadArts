"use client";

import { useEffect, useRef } from "react";

/**
 * High-Visibility Bright Spotlight Cursor
 * 
 * Design: A powerful, bright beam of light.
 * Blend Mode: 'screen' ensures it is clearly visible even on the darkest areas.
 */
export default function CustomCursor() {
  const spotlightRef = useRef(null);

  useEffect(() => {
    const spotlight = spotlightRef.current;
    if (!spotlight) return;

    if (window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768) {
      spotlight.style.display = "none";
      return;
    }

    let mouseX = -500, mouseY = -500;
    let curX = -500, curY = -500;
    let isHovering = false;
    let isDown = false;
    let rafId;
    const LERP = 0.1; // gentler, less CPU work

    const lerp = (a, b, t) => a + (b - a) * t;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      spotlight.style.opacity = "1";
    };

    const onOver = (e) => {
      isHovering = !!e.target.closest("a, button, [role='button'], input, textarea, label, [data-cursor='pointer']");
    };

    const onDown = () => { isDown = true; };
    const onUp   = () => { isDown = false; };

    function tick() {
      curX = lerp(curX, mouseX, LERP);
      curY = lerp(curY, mouseY, LERP);

      let size = isDown ? 150 : isHovering ? 300 : 220;
      
      // Increased opacity for "Bright" requirement
      const spotlightColor = isHovering
        ? "rgba(193, 18, 31, 0.5)" // Brighter Red
        : "rgba(255, 255, 255, 0.36)"; // Brighter White

      spotlight.style.transform = `translate(${curX}px, ${curY}px) translate(-50%, -50%)`;
      spotlight.style.width  = `${size}px`;
      spotlight.style.height = `${size}px`;
      spotlight.style.background = `radial-gradient(circle, ${spotlightColor} 0%, rgba(193, 18, 31, 0.08) 30%, rgba(0,0,0,0) 70%)`;

      rafId = requestAnimationFrame(tick);
    }

    window.addEventListener("mousemove", onMove,  { passive: true });
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup",   onUp);
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup",   onUp);
    };
  }, []);

  return (
    <div
      ref={spotlightRef}
      aria-hidden="true"
      className="hidden md:block"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 350,
        height: 350,
        borderRadius: "50%",
        mixBlendMode: "screen", // Makes the spotlight much brighter and visible on black
        pointerEvents: "none",
        zIndex: 9999,
        opacity: 0,
        willChange: "transform, width, height",
        filter: "blur(24px)", // reduced blur to cut repaint area
        transition: "width 0.35s cubic-bezier(0.16,1,0.3,1), height 0.35s cubic-bezier(0.16,1,0.3,1)",
      }}
    />
  );
}
