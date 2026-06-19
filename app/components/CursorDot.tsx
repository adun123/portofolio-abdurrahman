"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * A subtle cursor follower dot that trails the mouse and scales up
 * when hovering over interactive elements (links, buttons).
 * Hidden on touch devices.
 */
export default function CursorDot() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    // hide on touch devices
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) {
      dot.style.display = "none";
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      dot.style.display = "none";
      return;
    }

    const xTo = gsap.quickTo(dot, "x", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(dot, "y", { duration: 0.5, ease: "power3" });

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const grow = () => gsap.to(dot, { scale: 3.5, opacity: 0.5, duration: 0.3 });
    const shrink = () => gsap.to(dot, { scale: 1, opacity: 0.7, duration: 0.3 });

    window.addEventListener("mousemove", onMove);

    // Watch interactive elements
    const interactives = document.querySelectorAll("a, button, [role='button']");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", grow);
      el.addEventListener("mouseleave", shrink);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", grow);
        el.removeEventListener("mouseleave", shrink);
      });
    };
  }, []);

  return (
    <div
      ref={dotRef}
      className="pointer-events-none fixed top-0 left-0 z-[200] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent mix-blend-screen opacity-70"
      style={{ willChange: "transform" }}
      aria-hidden="true"
    />
  );
}
