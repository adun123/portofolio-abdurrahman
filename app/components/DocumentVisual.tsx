"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

/**
 * Creative stand-in for the private DCKTRP project (no screenshots allowed).
 * An abstract "document intelligence" visual: a sheet with text lines where a
 * scan bar sweeps down and OCR "fields" get detected/highlighted in sequence.
 */
export default function DocumentVisual() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      // scan bar sweeps down the sheet on a loop
      gsap.fromTo(
        ".doc-scan",
        { top: "-24%" },
        { top: "100%", duration: 2.6, ease: "power1.inOut", repeat: -1 }
      );

      // field lines light up in sequence (detection)
      gsap.to(".doc-line.field", {
        backgroundPosition: "100% 0",
        keyframes: [{ opacity: 0.4 }, { opacity: 1 }, { opacity: 0.7 }],
        duration: 1.6,
        ease: "sine.inOut",
        stagger: { each: 0.35, repeat: -1, yoyo: true },
      });

      // detection chips pop in/out
      gsap.fromTo(
        ".doc-chip",
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "back.out(2)",
          stagger: { each: 0.5, repeat: -1, yoyo: true, repeatDelay: 1 },
        }
      );

      // subtle float of the whole sheet
      gsap.to(".doc-sheet", {
        y: -10,
        rotateZ: 0.6,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    },
    { scope: root }
  );

  // line widths (in %) to fake a real document layout
  const lines = [90, 70, 80, 55, 95, 60, 85, 45];

  return (
    <div ref={root} className="doc-visual">
      <div className="doc-sheet">
        {/* scan bar */}
        <span className="doc-scan" aria-hidden="true" />

        {/* header block */}
        <div className="flex flex-col gap-3 p-[8%]">
          <div className="doc-line" style={{ width: "40%", height: "0.9rem" }} />
          <div className="doc-line" style={{ width: "62%", height: "0.6rem", opacity: 0.5 }} />

          <div className="mt-4 flex flex-col gap-3">
            {lines.map((w, i) => (
              <div
                key={i}
                className={`doc-line ${i % 3 === 1 ? "field" : ""}`}
                style={{
                  width: `${w}%`,
                  backgroundSize: "200% 100%",
                  backgroundPosition: "0 0",
                }}
              />
            ))}
          </div>
        </div>

        {/* detection chips overlaying "fields" */}
        <span
          className="doc-chip"
          style={{ left: "8%", top: "34%", width: "56%", height: "8%" }}
        />
        <span
          className="doc-chip"
          style={{ left: "8%", top: "58%", width: "46%", height: "8%" }}
        />
        <span
          className="doc-chip"
          style={{ left: "8%", top: "82%", width: "40%", height: "8%" }}
        />
      </div>

      {/* caption */}
      <div className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-2 rounded-full border border-line bg-bg/60 px-3 py-1.5 text-xs text-fg-muted backdrop-blur">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
        Confidential · OCR field extraction
      </div>
    </div>
  );
}
