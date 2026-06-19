"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function SceneAbout() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top 70%",
          end: "center center",
          scrub: 1,
        },
      });

      tl.fromTo(
        ".about-photo",
        { clipPath: "inset(100% 0 0 0)", scale: 1.15 },
        { clipPath: "inset(0% 0 0 0)", scale: 1, duration: 1, ease: "power2.out" }
      )
        .fromTo(
          ".about-heading",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.6 },
          0.2
        )
        .fromTo(
          ".about-p",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.15 },
          0.4
        );
    },
    { scope: root }
  );

  return (
    <section ref={root} id="about" className="scene">
      <div className="content mx-auto grid w-full max-w-[88rem] items-center gap-12 px-6 md:grid-cols-12 md:gap-14 md:px-10">
        <div className="md:col-span-4">
          <div className="about-photo relative aspect-[4/5] w-full max-w-[20rem] overflow-hidden rounded-lg border border-line bg-bg-2">
            <Image
              src="/photo.jpeg"
              alt="Portrait of Abdurrahman"
              fill
              sizes="(min-width: 768px) 20rem, 80vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="md:col-span-8">
          
          <h2 className="about-heading max-w-[20ch] text-balance font-medium tracking-[-0.035em] text-fg text-[clamp(1.8rem,4.5vw,3.75rem)] leading-[1.05]">
            An engineer for teams moving AI from{" "}
            <span className="serif text-fg-soft">demo</span> to{" "}
            <span className="serif text-fg-soft">workflow</span>.
          </h2>
          <div className="mt-10 grid gap-8 text-[16px] leading-relaxed text-fg-soft md:grid-cols-2 md:gap-12">
            <p className="about-p">
              I&apos;m an Informatics student at Telkom University and a full
              stack engineer working across interfaces, backend services, OCR
              pipelines, and LLM-enabled workflows  from enterprise dashboards
              to document intelligence and FinTech experiments.
            </p>
            <p className="about-p">
              I care about restraint: clear interfaces, observable systems, and
              code that ages well. The best engineering feels quiet  the system
              does the work, and the product gets out of the way.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
