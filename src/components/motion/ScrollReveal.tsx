"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { EASINGS, DURATIONS } from "@/lib/motion";

export type RevealDirection = "up" | "down" | "left" | "right" | "none";

export interface ScrollRevealProps {
  children: React.ReactNode;
  /** Semantic HTML element to render (defaults to 'div') */
  as?: "div" | "section" | "article" | "aside" | "header" | "footer" | "p" | "span";
  /** Direction from which content slides in */
  direction?: RevealDirection;
  /** Distance in pixels for the translation (default: 20px) */
  distance?: number;
  /** Duration in seconds (default: 0.75s) */
  duration?: number;
  /** Delay in seconds before animation begins (default: 0) */
  delay?: number;
  /** Whether to force an entrance animation on mount even if already in the viewport (default: false to prevent hydration flash) */
  animateOnMount?: boolean;
  /** Viewport intersection ratio before trigger (0.0 to 1.0, default: 0.15) */
  threshold?: number;
  /** Root margin offset string for the IntersectionObserver */
  rootMargin?: string;
  /** Optional HTML element id for anchoring and tests */
  id?: string;
  /** Extra CSS classes */
  className?: string;
}

const getInitialOffset = (direction: RevealDirection, distance: number) => {
  switch (direction) {
    case "up":
      return { y: distance, x: 0 };
    case "down":
      return { y: -distance, x: 0 };
    case "left":
      return { x: distance, y: 0 };
    case "right":
      return { x: -distance, y: 0 };
    case "none":
    default:
      return { x: 0, y: 0 };
  }
};

/**
 * Reusable Scroll-Triggered Reveal Primitive
 * - Triggers once when content enters viewport via IntersectionObserver.
 * - Preserves semantic HTML tags (section, article, etc.).
 * - Progressive enhancement: renders fully visible in SSR; no hidden content without JS.
 * - Prevents hydration flash: above-the-fold content remains visible on mount.
 * - Fully respects OS `prefers-reduced-motion`.
 * - Clean observer teardown on unmount.
 */
export default function ScrollReveal({
  children,
  as = "div",
  direction = "up",
  distance = 20,
  duration = DURATIONS.slow,
  delay = 0,
  animateOnMount = false,
  threshold = 0.15,
  rootMargin = "0px 0px -40px 0px",
  id,
  className = "",
}: ScrollRevealProps) {
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
      // Element is already visible above the fold: keep it visible with zero flash
      setState("in-view");
      return;
    }

    // Element is below the fold or configured to animate on mount: prepare for in-view transition
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

  const MotionTag = motion[as] as React.ElementType;
  const initialOffset = getInitialOffset(direction, distance);
  const isVisible = state === "ssr" || state === "in-view";

  return (
    <MotionTag
      id={id}
      ref={containerRef as React.Ref<any>}
      className={className}
      initial={false}
      animate={
        isVisible
          ? {
              opacity: 1,
              x: 0,
              y: 0,
            }
          : {
              opacity: 0,
              ...initialOffset,
            }
      }
      transition={{
        duration,
        delay,
        ease: EASINGS.editorial,
      }}
    >
      {children}
    </MotionTag>
  );
}
