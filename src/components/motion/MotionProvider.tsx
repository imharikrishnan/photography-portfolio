"use client";

import React from "react";
import { MotionConfig } from "motion/react";

interface MotionProviderProps {
  children: React.ReactNode;
}

/**
 * Global Motion Configuration Provider
 * - Enforces OS-level `prefers-reduced-motion` across all motion components.
 * - Ensures Next.js root layout can remain a Server Component.
 */
export default function MotionProvider({ children }: MotionProviderProps) {
  return (
    <MotionConfig reducedMotion="user">
      {children}
    </MotionConfig>
  );
}
