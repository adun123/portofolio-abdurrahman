"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function SceneContact() {
  const root = useRef<HTMLDivElement>(null);
  const magnetRef = useRef<HTMLAnchorElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".contact-reveal",
        { opacity: 0, y: 60, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root.current,
            start: "top 70%",
            end: "center center",
            scrub: 1,
          },
        }
      );

      // magnetic email button (desktop only)
      const magnet = magnetRef.current;
      if (magnet && window.innerWidth >= 768) {
        const xTo = gsap.quickTo(magnet, "x", { duration: 0.5, ease: "power3" });
        const yTo = gsap.quickTo(magnet, "y", { duration: 0.5, ease: "power3" });
        const onMove = (e: MouseEvent) => {
          const r = magnet.getBoundingClientRect();
          const mx = e.clientX - (r.left + r.width / 2);
          const my = e.clientY - (r.top + r.height / 2);
          xTo(mx * 0.3);
          yTo(my * 0.4);
        };
        const onLeave = () => {
          xTo(0);
          yTo(0);
        };
        magnet.addEventListener("mousemove", onMove);
        magnet.addEventListener("mouseleave", onLeave);
        return () => {
          magnet.removeEventListener("mousemove", onMove);
          magnet.removeEventListener("mouseleave", onLeave);
        };
      }
    },
    { scope: root }
  );

  return (
    <section ref={root} id="contact" className="scene">
      <div className="content mx-auto max-w-[72rem] px-6 text-center md:px-10">
        
        <h2 className="contact-reveal text-balance font-medium tracking-[-0.04em] text-fg text-[clamp(2.5rem,8vw,6.5rem)] leading-[0.95]">
          Let&apos;s build something{" "}
          <span className="serif text-fg-soft">lasting</span>.
        </h2>
        <p className="contact-reveal mx-auto mt-8 max-w-[46ch] text-lg leading-relaxed text-fg-soft">
          Open to conversations around AI-powered web apps, OCR platforms,
          document intelligence, and LLM integrations.
        </p>

        <div className="contact-reveal mt-12 flex justify-center">
          <a
            ref={magnetRef}
            href="mailto:abdurrahmanaikon@gmail.com"
            className="inline-flex items-center gap-3 rounded-full border border-line-strong px-5 py-3 text-base font-medium text-fg transition-colors hover:border-accent-soft hover:text-accent-soft md:px-8 md:py-4 md:text-2xl break-all"
          >
            <span className="hidden md:inline">abdurrahmanaikon@gmail.com</span>
            <span className="md:hidden">Email me ↗</span>
            <span className="hidden text-fg-muted md:inline">↗</span>
          </a>
        </div>

        <ul className="contact-reveal mt-12 flex flex-wrap justify-center gap-x-10 gap-y-4 text-sm text-fg-muted">
          <li>
            <a
              href="https://www.linkedin.com/in/abdurrahman-8719092b1"
              target="_blank"
              rel="noreferrer noopener"
              className="transition-colors hover:text-fg"
            >
              LinkedIn ↗
            </a>
          </li>
          <li>
            <a
              href="/Abdurrahman-CV.pdf"
              download
              className="transition-colors hover:text-fg"
            >
              Download CV
            </a>
          </li>
          <li>
            <a
              href="tel:+6281398515784"
              className="transition-colors hover:text-fg"
            >
              +62 813 9851 5784
            </a>
          </li>
          <li className="text-fg-faint">Jakarta · Open to remote</li>
        </ul>
      </div>
    </section>
  );
}
