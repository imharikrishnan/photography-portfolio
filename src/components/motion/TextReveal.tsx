"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { EASINGS, DURATIONS, STAGGER } from "@/lib/motion";

export interface TextRevealProps {
  /** Text content or rich elements */
  children?: React.ReactNode;
  /** Explicit lines array for line-by-line staggered reveals */
  lines?: string[];
  /** Semantic typography tag */
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  /** Custom typography styles */
  className?: string;
  /** Optional HTML element id */
  id?: string;
  /** Initial delay before reveal in seconds */
  delay?: number;
  /** Stagger interval between lines in seconds */
  stagger?: number;
  /** Animation duration per line in seconds */
  duration?: number;
  /** Whether to force an entrance animation on mount even if already in the viewport (default: false to prevent hydration flash) */
  animateOnMount?: boolean;
  /** IntersectionObserver threshold */
  threshold?: number;
  /** IntersectionObserver rootMargin */
  rootMargin?: string;
}

/**
 * Reusable Editorial Headline Entrance Primitive
 * - Renders whole lines or phrases to preserve screen reader comprehension.
 * - Never splits text into characters or breaks text selection.
 * - Fully accessible and visible without JavaScript (SSR progressive enhancement).
 * - Prevents hydration flash: above-the-fold headlines stay visible on initial render.
 * - Respects OS `prefers-reduced-motion`.
 */
export default function TextReveal({
  children,
  lines,
  as = "h2",
  className = "",
  id,
  delay = 0,
  stagger = STAGGER.spacious,
  duration = DURATIONS.editorial,
  animateOnMount = false,
  threshold = 0.2,
  rootMargin = "0px 0px -30px 0px",
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [state, setState] = useState<"ssr" | "in-view" | "hidden">("ssr");
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const element = containerRef.current;
    if (!element || shouldReduceMotion) {
      setState("in-view");
      return;
    }

    // Check if element is already inside the viewport on initial hydration
    const rect = element.getBoundingClientRect();
    const inViewNow = rect.top < window.innerHeight && rect.bottom > 0;

    if (inViewNow && !animateOnMount) {
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
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, shouldReduceMotion, animateOnMount]);

  const Tag = as as React.ElementType;
  const isVisible = state === "ssr" || state === "in-view";

  // Structured multi-line editorial headline reveal
  if (lines && lines.length > 0) {
    return (
      <Tag id={id} ref={containerRef as React.Ref<any>} className={className}>
        {lines.map((line, index) => (
          <span key={index} className="block overflow-hidden">
            <motion.span
              className="block"
              initial={false}
              animate={
                isVisible
                  ? { y: "0%", opacity: 1 }
                  : { y: "100%", opacity: 0 }
              }
              transition={{
                duration,
                delay: delay + index * stagger,
                ease: EASINGS.editorial,
              }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </Tag>
    );
  }

  // Single block or custom children reveal
  return (
    <Tag id={id} ref={containerRef as React.Ref<any>} className={`${className} overflow-hidden`}>
      <motion.span
        className="block"
        initial={false}
        animate={
          isVisible
            ? { y: 0, opacity: 1 }
            : { y: 24, opacity: 0 }
        }
        transition={{
          duration,
          delay,
          ease: EASINGS.editorial,
        }}
      >
        {children}
      </motion.span>
    </Tag>
  );
}
