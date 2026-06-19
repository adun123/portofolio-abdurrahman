"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PROJECTS } from "./data";
import ProjectTile from "./ProjectTile";
import DocumentVisual from "./DocumentVisual";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// fan layout per card index (4 cards) - card 0 is front/center
const FAN_DESKTOP = [
  { rot: 0, xp: 0, yp: -10 },     // card 1: center, on top
  { rot: -10, xp: -48, yp: 6 },   // card 2: left
  { rot: 7, xp: 44, yp: 4 },      // card 3: right
  { rot: -4, xp: 12, yp: 14 },    // card 4: slightly offset behind
];
const FAN_MOBILE = [
  { rot: 0, xp: 0, yp: -6 },
  { rot: -7, xp: -28, yp: 4 },
  { rot: 5, xp: 26, yp: 3 },
  { rot: -3, xp: 8, yp: 10 },
];

export default function SceneWork() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const isMobile = window.innerWidth < 768;
      const FAN = isMobile ? FAN_MOBILE : FAN_DESKTOP;

      const scenes = gsap.utils.toArray<HTMLElement>(".work-project");
      scenes.forEach((scene) => {
        const info = scene.querySelector(".work-info");
        const cards = gsap.utils.toArray<HTMLElement>(".card", scene);
        const doc = scene.querySelector(".doc-visual");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: scene,
            start: "top top",
            end: isMobile ? "+=90%" : "+=130%",
            pin: !isMobile,
            scrub: 1,
          },
        });

        if (cards.length) {
          // z-order: first card on top (highest z)
          cards.forEach((c, i) => gsap.set(c, { zIndex: cards.length - i }));

          // fan out from a centered stack, staggered
          cards.forEach((card, i) => {
            const f = FAN[i] ?? FAN[FAN.length - 1];
            tl.fromTo(
              card,
              {
                opacity: 0,
                scale: 0.9,
                rotation: 0,
                xPercent: 0,
                yPercent: 40,
              },
              {
                opacity: 1,
                scale: 1,
                rotation: f.rot,
                xPercent: f.xp,
                yPercent: f.yp,
                duration: 0.6,
                ease: "power3.out",
              },
              i * 0.12
            );
          });
        } else if (doc) {
          // private project — reveal the document visual
          tl.fromTo(
            doc,
            { opacity: 0, scale: 0.92, y: 40 },
            { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "power3.out" },
            0
          );
        }

        // info slides in
        tl.fromTo(
          info,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          0.3
        );

        if (!isMobile) {
          const exitTargets = cards.length ? [...cards, info] : [doc, info];
          tl.to(
            exitTargets,
            { opacity: 0, y: -30, duration: 0.4, ease: "power2.in" },
            ">0.35"
          );
        }
      });
    },
    { scope: root }
  );

  return (
    <div ref={root} id="work">
      {PROJECTS.map((project) => (
        <section key={project.slug} className="work-project scene">
          <div className="content mx-auto grid w-full max-w-[88rem] items-center gap-10 px-6 md:grid-cols-12 md:gap-14 md:px-10">
            {/* visual */}
            <div className="md:col-span-7">
              {project.private ? (
                <DocumentVisual />
              ) : (
                <div className="card-stack">
                  {project.images.map((src, i) => (
                    <ProjectTile
                      key={src}
                      src={src}
                      index={i}
                      title={project.title}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* info */}
            <div className="work-info md:col-span-5">
              <p className="tab">{project.category}</p>
              <h3 className="mt-4 text-balance font-medium tracking-[-0.03em] text-fg text-[clamp(1.8rem,3.5vw,3rem)] leading-[1.04]">
                {project.title}
              </h3>
              <p className="mt-3 text-sm text-fg-muted">{project.year}</p>
              <p className="mt-6 max-w-[42ch] text-[15px] leading-relaxed text-fg-soft">
                {project.description}
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-line px-3 py-1 text-xs text-fg-muted"
                  >
                    {s}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                {project.url ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group inline-flex items-center gap-2 border-b border-line pb-1.5 text-sm text-fg transition-colors hover:border-accent-soft hover:text-accent-soft"
                  >
                    Visit live site
                    <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      ↗
                    </span>
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 border-b border-line pb-1.5 text-sm text-fg-muted">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-fg-faint" />
                    Private engagement
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
