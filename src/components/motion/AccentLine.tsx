"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { EASINGS, DURATIONS } from "@/lib/motion";

export interface AccentLineProps {
  /** Orientation of the line expansion */
  orientation?: "vertical" | "horizontal";
  /** Optional HTML element id */
  id?: string;
  /** Extra container classes */
  className?: string;
  /** Color class for the line (defaults to warm bronze 'bg-[#d4a373]') */
  color?: string;
  /** Delay before drawing begins in seconds */
  delay?: number;
  /** Duration of draw animation in seconds */
  duration?: number;
}

/**
 * Editorial Bronze Accent Line Primitive
 * - Draws downward (vertical) or rightward (horizontal) when scrolled into view.
 * - Single-trigger IntersectionObserver with complete teardown.
 * - Respects prefers-reduced-motion: renders fully drawn without spatial transition.
 * - Progressive enhancement: fully visible in SSR without JavaScript.
 */
export default function AccentLine({
  orientation = "vertical",
  id,
  className = "",
  color = "bg-[#d4a373]",
  delay = 0.1,
  duration = DURATIONS.slow,
}: AccentLineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"ssr" | "in-view" | "hidden">("ssr");
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const element = containerRef.current;
    if (!element || shouldReduceMotion) {
      setState("in-view");
      return;
    }

    const rect = element.getBoundingClientRect();
    const inViewNow = rect.top < window.innerHeight && rect.bottom > 0;

    if (inViewNow) {
      setState("in-view");
      return;
    }

    setState("hidden");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("in-view");
          observer.unobserve(entry.target);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [shouldReduceMotion]);

  const isVisible = state === "ssr" || state === "in-view";

  if (orientation === "vertical") {
    return (
      <div id={id} ref={containerRef} className={`overflow-hidden ${className}`}>
        <motion.div
          className={`w-full h-full origin-top ${color}`}
          initial={false}
          animate={isVisible ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{
            duration,
            delay,
            ease: EASINGS.editorial,
          }}
        />
      </div>
    );
  }

  return (
    <div id={id} ref={containerRef} className={`overflow-hidden ${className}`}>
      <motion.div
        className={`w-full h-full origin-left ${color}`}
        initial={false}
        animate={isVisible ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{
          duration,
          delay,
          ease: EASINGS.editorial,
        }}
      />
    </div>
  );
}
