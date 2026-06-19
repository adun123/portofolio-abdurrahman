"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SKILLS } from "./data";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Toolkit section — "Horizontal sliding panels"
 * Each skill group is a panel that slides in from the right horizontally
 * as you scroll vertically. Pinned container, panels fly through like a
 * carousel driven by scroll. Each panel shows the group label big + items
 * with animated underlines.
 */
export default function SceneSkills() {
  const root = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const isMobile = window.innerWidth < 768;
      const track = trackRef.current;
      if (!track) return;

      if (isMobile) {
        // Mobile: simple stagger reveal, no horizontal scroll
        gsap.fromTo(
          ".skill-panel",
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: root.current,
              start: "top 70%",
              end: "bottom 80%",
              scrub: 1,
            },
          }
        );
        return;
      }

      // Desktop: horizontal scroll driven by vertical scroll
      const panels = gsap.utils.toArray<HTMLElement>(".skill-panel");
      const totalWidth = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: `+=${totalWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // Each panel's items animate in as they enter viewport
      panels.forEach((panel) => {
        const items = panel.querySelectorAll(".skill-item");
        gsap.fromTo(
          items,
          { opacity: 0, xPercent: 30 },
          {
            opacity: 1,
            xPercent: 0,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: gsap.getById("skillScroll") || undefined,
              start: "left 80%",
              end: "left 30%",
              scrub: 1,
            },
          }
        );
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="skills" className="scene skills-scene">
      <div className="content w-full overflow-hidden">
        {/* Header (stays visible) */}
        <div className="mx-auto mb-8 max-w-[88rem] px-6 md:mb-0 md:absolute md:top-[15%] md:left-0 md:right-0 md:px-10 md:z-10">
          <p className="tab">(Toolkit)</p>
          <h2 className="mt-4 text-[clamp(1.5rem,3vw,2.5rem)] font-medium tracking-tight text-fg">
            Tools I reach for, grouped by where they live.
          </h2>
        </div>

        {/* Horizontal track */}
        <div
          ref={trackRef}
          className="flex items-center gap-6 md:gap-0 md:flex-nowrap flex-wrap md:pt-[30vh]"
        >
          {SKILLS.map((group, gi) => (
            <div
              key={group.label}
              className="skill-panel w-full shrink-0 px-6 md:w-[50vw] md:px-16 lg:w-[40vw]"
            >
              <div className="rounded-2xl border border-line bg-bg-2/50 p-8 backdrop-blur-sm md:p-12">
                {/* Group number + label */}
                <span className="text-xs text-fg-faint">0{gi + 1}</span>
                <h3 className="mt-2 text-2xl font-medium text-fg md:text-3xl">
                  {group.label}
                </h3>

                {/* Items */}
                <ul className="mt-8 flex flex-col gap-4">
                  {group.items.map((item) => (
                    <li key={item} className="skill-item group flex items-center justify-between border-b border-line pb-3">
                      <span className="text-lg text-fg-soft group-hover:text-fg transition-colors">
                        {item}
                      </span>
                      <span className="h-px w-8 bg-line-strong transition-all duration-300 group-hover:w-16 group-hover:bg-accent" />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
