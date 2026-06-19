"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { NAV } from "./data";

export default function Nav() {
  const [expanded, setExpanded] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const islandRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Expand after scrolling past hero (desktop only)
  useEffect(() => {
    const onScroll = () => {
      if (!isMobile) {
        setExpanded(window.scrollY > window.innerHeight * 0.6);
      } else {
        setExpanded(window.scrollY > 50);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobile]);

  // Track active section
  useEffect(() => {
    const ids = NAV.map((n) => n.href.replace("#", ""));
    const onScroll = () => {
      const sy = window.scrollY + window.innerHeight / 3;
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.offsetTop <= sy) {
          setActive(i);
          return;
        }
      }
      setActive(0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Animate morph (desktop)
  useEffect(() => {
    if (!islandRef.current || isMobile) return;
    gsap.to(islandRef.current, {
      width: expanded ? "auto" : "3rem",
      paddingLeft: expanded ? "1.25rem" : "0.75rem",
      paddingRight: expanded ? "1.25rem" : "0.75rem",
      duration: 0.5,
      ease: "back.out(1.4)",
    });
  }, [expanded, isMobile]);

  // Mobile menu animation
  useEffect(() => {
    if (!mobileMenuRef.current) return;
    if (mobileOpen) {
      gsap.to(mobileMenuRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.4,
        ease: "power3.out",
      });
    } else {
      gsap.to(mobileMenuRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [mobileOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex flex-col items-center pt-3 md:pt-4 pointer-events-none">
      <div
        ref={islandRef}
        className="island pointer-events-auto"
        onMouseEnter={() => {
          if (islandRef.current && !isMobile) {
            gsap.to(islandRef.current, { scale: 1.04, duration: 0.25, ease: "power2.out" });
          }
        }}
        onMouseLeave={() => {
          if (islandRef.current && !isMobile) {
            gsap.to(islandRef.current, { scale: 1, duration: 0.3, ease: "power2.out" });
          }
        }}
      >
        {/* Left: dot + name */}
        <a
          href="#top"
          className="flex items-center gap-2 text-sm font-medium text-fg whitespace-nowrap"
        >
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-50" />
            <span className="inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className={`transition-all duration-300 ${expanded ? "opacity-100 max-w-[10rem]" : "opacity-0 max-w-0 overflow-hidden"}`}>
            Abdurrahman
          </span>
        </a>

        {/* Desktop nav links */}
        {!isMobile && (
          <nav
            aria-label="Primary"
            className={`hidden md:flex items-center gap-5 transition-all duration-300 overflow-hidden ${
              expanded ? "ml-5 max-w-[40rem] opacity-100" : "ml-0 max-w-0 opacity-0"
            }`}
          >
            {NAV.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                className={`relative whitespace-nowrap text-[13px] transition-colors duration-300 ${
                  active === i ? "text-fg" : "text-fg-muted hover:text-fg"
                }`}
              >
                {item.label}
                {active === i && (
                  <span className="absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent" />
                )}
              </a>
            ))}
          </nav>
        )}

        {/* Mobile: hamburger button */}
        {isMobile && expanded && (
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="ml-3 flex items-center gap-1.5 text-xs text-fg-muted"
            aria-expanded={mobileOpen}
            aria-label="Toggle menu"
          >
            <span className="flex flex-col gap-[3px]">
              <span className={`block h-[1.5px] w-3.5 bg-fg-muted transition-transform duration-300 ${mobileOpen ? "translate-y-[5px] rotate-45" : ""}`} />
              <span className={`block h-[1.5px] w-3.5 bg-fg-muted transition-opacity duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`block h-[1.5px] w-3.5 bg-fg-muted transition-transform duration-300 ${mobileOpen ? "-translate-y-[5px] -rotate-45" : ""}`} />
            </span>
          </button>
        )}

        {/* Section indicator dots (collapsed state) */}
        <div className={`flex items-center gap-1 transition-all duration-300 ${
          expanded ? "ml-0 max-w-0 opacity-0 overflow-hidden" : "ml-2 max-w-[4rem] opacity-100"
        }`}>
          {NAV.map((_, i) => (
            <span
              key={i}
              className={`inline-block h-1 rounded-full transition-all duration-300 ${
                active === i ? "w-3 bg-accent" : "w-1 bg-fg-faint"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {isMobile && (
        <div
          ref={mobileMenuRef}
          className="pointer-events-auto mt-2 overflow-hidden rounded-2xl border border-line-strong bg-bg/95 opacity-0 backdrop-blur-xl"
          style={{ height: 0 }}
        >
          <nav className="flex flex-col gap-1 px-5 py-4">
            {NAV.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-3 text-base transition-colors ${
                  active === i ? "bg-bg-2 text-fg" : "text-fg-soft"
                }`}
              >
                <span className={`inline-block h-1.5 w-1.5 rounded-full ${active === i ? "bg-accent" : "bg-fg-faint"}`} />
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
