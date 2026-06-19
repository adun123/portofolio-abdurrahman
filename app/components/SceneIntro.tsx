"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const LINE = [
  "I", "build", "intelligent", "systems",
  "and", "digital", "experiences",
  "that", "move", "from", "prototype",
  "to", "reliable", "products.",
];

export default function SceneIntro() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const words = root.current!.querySelectorAll(".word > span");
      gsap.fromTo(
        words,
        { yPercent: 110 },
        {
          yPercent: 0,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: {
            trigger: root.current,
            start: "top 70%",
            end: "center center",
            scrub: 1,
          },
        }
      );
    },
    { scope: root }
  );

  return (
    <section ref={root} className="scene">
      <div className="content mx-auto max-w-[72rem] px-6 md:px-10">
        
        <h2 className="text-balance font-medium tracking-[-0.03em] text-fg text-[clamp(2rem,6vw,5rem)] leading-[1.05]">
          {LINE.map((w, i) => (
            <span key={i} className="word">
              <span>
                {i === 2 || i === 5 ? (
                  <span className="serif text-fg-soft">{w}</span>
                ) : (
                  w
                )}
                {"\u00A0"}
              </span>
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
}
