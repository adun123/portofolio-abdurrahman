"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Hero overlay. The name itself is rendered by the Three.js ParticleField
 * (particles spelling "ABDURRAHMAN"). This layer adds the role line + scroll
 * hint, which fade out as the particles disperse.
 */
export default function SceneHero() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.to(".hero-fade", {
        opacity: 0,
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "60% top",
          scrub: 1,
        },
      });

      // intro entrance
      gsap.from(".hero-in", {
        opacity: 0,
        y: 24,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.3,
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="top" className="scene">
      <div className="content pointer-events-none flex min-h-screen min-h-[100svh] w-full flex-col items-center justify-end pb-[8vh] md:pb-[14vh]">
        {/* role line sits below the particle name */}
        <div className="hero-fade hero-in flex flex-col items-center gap-4 text-center">
          <p className="tab">AI-Powered Full Stack Engineer</p>
          <p className="max-w-[40ch] text-fg-muted">
            Building intelligent systems and digital experiences — OCR
            pipelines, LLM workflows, and enterprise web products.
          </p>
        </div>

        {/* scroll hint */}
        <div className="hero-fade hero-in mt-12 flex flex-col items-center gap-2 text-fg-faint">
          <span className="text-xs uppercase tracking-[0.2em]">Scroll</span>
          <span className="h-10 w-px animate-pulse bg-fg-faint" />
        </div>
      </div>
    </section>
  );
}
