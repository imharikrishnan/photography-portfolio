"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { EASINGS, DURATIONS } from "@/lib/motion";

export interface ImageVeilProps {
  children: React.ReactNode;
  /** Optional HTML element id */
  id?: string;
  /** Custom class for the relative container */
  className?: string;
  /** Background color for the veil shutter (defaults to canvas Obsidian '#08080a') */
  veilColor?: string;
  /** Whether to show a fine bronze hairline accent line at the trailing edge */
  accentBorder?: boolean;
  /** Duration in seconds for the curtain reveal (default: 0.9s) */
  duration?: number;
  /** Delay in seconds before curtain pulls up (default: 0.1s) */
  delay?: number;
  /** IntersectionObserver threshold (default: 0.2) */
  threshold?: number;
}

/**
 * Lightweight Fine-Art Curtain / Shutter Reveal Overlay
 * - Operates as an independent absolute overlay; does NOT alter Next.js Image loading,
 *   LQIP blur placeholders, or intrinsic aspect ratios.
 * - Completely unmounts from the DOM upon animation completion, eliminating mobile GPU overhead.
 * - Without JavaScript or under `prefers-reduced-motion`, the veil is never rendered.
 */
export default function ImageVeil({
  children,
  id,
  className = "",
  veilColor = "bg-[#08080a]",
  accentBorder = true,
  duration = DURATIONS.slow + 0.15,
  delay = 0.1,
  threshold = 0.2,
}: ImageVeilProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setIsHydrated(true);

    if (shouldReduceMotion) {
      setHasTriggered(true);
      setIsCompleted(true);
      return;
    }

    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasTriggered(true);
          observer.unobserve(entry.target);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, shouldReduceMotion]);

  return (
    <div id={id} ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {children}

      {/* Lightweight overlay veil: only rendered when hydrated, motion allowed, and reveal incomplete */}
      {isHydrated && !shouldReduceMotion && !isCompleted && (
        <motion.div
          className={`absolute inset-0 z-20 pointer-events-none origin-top ${veilColor}`}
          initial={{ scaleY: 1 }}
          animate={hasTriggered ? { scaleY: 0 } : { scaleY: 1 }}
          transition={{
            duration,
            delay,
            ease: EASINGS.editorial,
          }}
          onAnimationComplete={() => setIsCompleted(true)}
        >
          {accentBorder && (
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#d4a373]/60 shadow-[0_0_8px_rgba(212,163,115,0.4)]" />
          )}
        </motion.div>
      )}
    </div>
  );
}
