/**
 * Cinematic Motion Design Tokens & Configuration
 * Portfolio: "The Curated Monolith — Personal Edition"
 * Harikrishnan Nandanan Photography
 */

import type { Transition, Variants } from "motion/react";

/**
 * Fine-art editorial cubic-bezier easing curves.
 * EASINGS.editorial: Restrained, museum-grade deceleration curve.
 */
export const EASINGS = {
  /** Decelerated fine-art curve with slow settle */
  editorial: [0.16, 1, 0.3, 1] as const,
  /** Smooth standard exit curve */
  smoothOut: [0.22, 1, 0.36, 1] as const,
  /** Symmetrical curve for subtle ambient loops */
  cinematic: [0.25, 0.1, 0.25, 1] as const,
  /** Snappy curve for tactile button feedback */
  snappy: [0.2, 0.8, 0.2, 1] as const,
} as const;

/**
 * Standard duration tokens (in seconds) for motion orchestration.
 */
export const DURATIONS = {
  instant: 0.15,
  fast: 0.25,
  normal: 0.45,
  slow: 0.75,
  editorial: 1.0,
  curtain: 1.2,
  heroSettle: 2.2,
} as const;

/**
 * Natural, non-oscillating spring configurations.
 */
export const SPRINGS = {
  /** Snappy and tactile for interactive buttons and pills */
  snappy: {
    type: "spring",
    stiffness: 350,
    damping: 30,
    mass: 0.8,
  } as const,
  /** Gentle and organic for modals and drawers */
  gentle: {
    type: "spring",
    stiffness: 220,
    damping: 26,
    mass: 1,
  } as const,
  /** Stately and weighted for fine-art exhibition plates */
  editorial: {
    type: "spring",
    stiffness: 180,
    damping: 28,
    mass: 1.2,
  } as const,
} as const;

/**
 * Stagger intervals (in seconds) for sequential child reveals.
 */
export const STAGGER = {
  dense: 0.04,
  normal: 0.08,
  spacious: 0.12,
} as const;

/**
 * Editorial transitions presets
 */
export const TRANSITIONS = {
  editorial: {
    duration: DURATIONS.editorial,
    ease: EASINGS.editorial,
  } satisfies Transition,
  slow: {
    duration: DURATIONS.slow,
    ease: EASINGS.editorial,
  } satisfies Transition,
  normal: {
    duration: DURATIONS.normal,
    ease: EASINGS.smoothOut,
  } satisfies Transition,
  fast: {
    duration: DURATIONS.fast,
    ease: EASINGS.snappy,
  } satisfies Transition,
} as const;

/**
 * Reusable animation variant presets
 */
export const VARIANTS = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: TRANSITIONS.normal,
    },
  } satisfies Variants,

  fadeUp: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: TRANSITIONS.editorial,
    },
  } satisfies Variants,

  fadeDown: {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: TRANSITIONS.editorial,
    },
  } satisfies Variants,

  scaleIn: {
    hidden: { opacity: 0, scale: 0.96 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: SPRINGS.gentle,
    },
  } satisfies Variants,

  staggerContainer: (staggerInterval = STAGGER.normal) =>
    ({
      hidden: {},
      visible: {
        transition: {
          staggerChildren: staggerInterval,
          delayChildren: 0.05,
        },
      },
    }) satisfies Variants,
} as const;
