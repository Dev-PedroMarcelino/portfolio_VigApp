"use client";

import type { CSSProperties, ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

/** Pill-shaped section label with a glowing dot, Lumina style. */
export function SectionLabel({ text, tone = "light" }: { text: string; tone?: "light" | "dark" }) {
  const shell =
    tone === "light"
      ? "border-[var(--d-line)] bg-[var(--d-white)] text-[var(--d-accent-deep)]"
      : "border-white/20 bg-white/10 text-white";
  return (
    <p
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.28em] ${shell}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--d-aqua)]" aria-hidden />
      {text}
    </p>
  );
}

/**
 * Soft floating element that drifts slowly. Without children it renders a
 * decorative blob; with children it floats them (e.g. glass chips). Motion is
 * disabled for users who prefer reduced motion.
 */
export function FloatingBlob({
  className = "",
  style,
  drift = 18,
  duration = 9,
  delay = 0,
  children,
}: {
  className?: string;
  style?: CSSProperties;
  drift?: number;
  duration?: number;
  delay?: number;
  children?: ReactNode;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      aria-hidden={children ? undefined : true}
      className={`${children ? "" : "pointer-events-none "}absolute ${className}`}
      style={style}
      animate={reduce ? undefined : { y: [0, -drift, 0], x: [0, drift / 3, 0] }}
      transition={reduce ? undefined : { duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

/** Glossy diagonal highlight laid over cards and photos. */
export function Gloss({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        background:
          "linear-gradient(118deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.12) 26%, rgba(255,255,255,0) 45%)",
      }}
    />
  );
}

/** Section scaffold with anchor id and consistent spacing. */
export function Section({
  id,
  className = "",
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`relative scroll-mt-24 px-6 py-20 sm:px-10 lg:px-16 sm:py-28 ${className}`}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

/** Smooth anchor scrolling that plays nicely with the sticky header. */
export function scrollToId(id: string) {
  const el = document.getElementById(id.replace(/^#/, ""));
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}
