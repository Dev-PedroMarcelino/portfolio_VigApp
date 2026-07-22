"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * SSR-safe `useReducedMotion`. The server always renders the "motion" markup,
 * so a client that resolves the media query synchronously on first render
 * hydrates against different props and React logs a mismatch. This variant
 * reports `false` until after mount — matching the server — and only then
 * reflects the user's real preference, so reduced-motion visitors get a single
 * quiet settle instead of a hydration error.
 */
export function useReducedMotionSafe(): boolean {
  const prefersReduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return mounted ? !!prefersReduced : false;
}
