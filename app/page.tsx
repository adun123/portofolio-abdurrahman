"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { useSmoothScroll } from "./components/useSmoothScroll";
import ParticleField from "./components/ParticleField";
import Nav from "./components/Nav";
import CursorDot from "./components/CursorDot";
import PageLoader from "./components/PageLoader";
import SceneHero from "./components/SceneHero";
import SceneIntro from "./components/SceneIntro";
import SceneWork from "./components/SceneWork";
import SceneAbout from "./components/SceneAbout";
import SceneExperience from "./components/SceneExperience";
import SceneSkills from "./components/SceneSkills";
import SceneContact from "./components/SceneContact";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Page() {
  const progressRef = useRef<HTMLDivElement>(null);

  // Lenis smooth scroll + ScrollTrigger sync
  useSmoothScroll();

  // scroll progress bar
  useGSAP(() => {
    if (!progressRef.current) return;
    gsap.fromTo(
      progressRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          start: 0,
          end: "max",
          scrub: 0.3,
        },
      }
    );
  });

  return (
    <>
      <PageLoader />
      <CursorDot />

      {/* fixed background layers */}
      <div className="ambient-bg" aria-hidden="true" />
      <ParticleField />
      <div className="vignette" aria-hidden="true" />
      <div className="bg-grain pointer-events-none fixed inset-0 z-[1] opacity-50" aria-hidden="true" />

      {/* progress bar */}
      <div
        ref={progressRef}
        className="scroll-progress"
        style={{ transform: "scaleX(0)" }}
      />

      <Nav />

      <main className="content">
        <SceneHero />
        <SceneIntro />
        <SceneWork />
        <SceneAbout />
        <SceneExperience />
        <SceneSkills />
        <SceneContact />

        <footer className="content border-t border-line">
          <div className="mx-auto flex max-w-[88rem] flex-col gap-4 px-6 py-10 text-xs text-fg-faint md:flex-row md:items-center md:justify-between md:px-10">
            <span>© {new Date().getFullYear()} Abdurrahman. All rights reserved.</span>
            <span>Designed and built in Jakarta.</span>
            <a href="#top" className="transition-colors hover:text-fg">
              Back to top ↑
            </a>
          </div>
        </footer>
      </main>
    </>
  );
}
