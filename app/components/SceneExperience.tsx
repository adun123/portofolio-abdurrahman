"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { EXPERIENCE } from "./data";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function SceneExperience() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // line draws down
      gsap.fromTo(
        ".timeline-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 65%",
            end: "bottom 70%",
            scrub: 1,
          },
        }
      );

      // items snap in along the line
      gsap.fromTo(
        ".exp-item",
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: root.current,
            start: "top 60%",
            end: "bottom 75%",
            scrub: 1,
          },
        }
      );
    },
    { scope: root }
  );

  return (
    <section ref={root} id="experience" className="scene">
      <div className="content mx-auto w-full max-w-[72rem] px-6 md:px-10">
        <p className="tab mb-12">Experience</p>
        <div className="relative pl-8 md:pl-12">
          <span className="timeline-line" aria-hidden="true" />
          <ul>
            {EXPERIENCE.map((item) => (
              <li
                key={item.role + item.place}
                className="exp-item relative border-b border-line py-7"
              >
                <span
                  aria-hidden
                  className="absolute -left-8 top-9 h-2 w-2 -translate-x-1/2 rounded-full bg-accent md:-left-12"
                  style={{ boxShadow: "0 0 0 4px rgba(123,156,255,0.12)" }}
                />
                <div className="grid gap-2 md:grid-cols-12 md:gap-8">
                  <p className="text-sm text-fg-muted md:col-span-3">
                    {item.period}
                  </p>
                  <div className="md:col-span-9">
                    <h3 className="text-xl font-medium tracking-tight text-fg md:text-2xl">
                      {item.role}
                    </h3>
                    <p className="mt-1 text-fg-muted">{item.place}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
