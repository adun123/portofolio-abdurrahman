"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
  /** Render as a motion li (for use inside ul lists). Defaults to div. */
  as?: "div" | "li";
  once?: boolean;
};

/**
 * Subtle fade + rise on scroll into view.
 * Intentionally restrained — short distance, slow custom easing.
 */
export function Reveal({
  children,
  delay = 0,
  y = 14,
  duration = 0.8,
  className,
  as = "div",
  once = true,
}: RevealProps) {
  const prefersReduced = useReducedMotion();

  const variants: Variants = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : y },
    visible: { opacity: 1, y: 0 },
  };

  const transition = {
    duration: prefersReduced ? 0 : duration,
    delay: prefersReduced ? 0 : delay,
    ease: [0.22, 0.61, 0.36, 1] as const,
  };

  const viewport = { once, margin: "-80px" } as const;

  if (as === "li") {
    return (
      <motion.li
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={variants}
        transition={transition}
      >
        {children}
      </motion.li>
    );
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={variants}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
