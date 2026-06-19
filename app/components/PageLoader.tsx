"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Full-screen dark overlay that fades out on mount — cinematic page entry.
 */
export default function PageLoader() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      opacity: 0,
      duration: 1.2,
      ease: "power2.inOut",
      delay: 0.3,
      onComplete: () => {
        if (ref.current) ref.current.style.display = "none";
      },
    });
  }, []);

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-[300] bg-bg"
      aria-hidden="true"
    />
  );
}
