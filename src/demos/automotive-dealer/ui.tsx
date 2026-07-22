"use client";

import { motion } from "framer-motion";
import { useReducedMotionSafe as useReducedMotion } from "@/components/demos/use-reduced-motion-safe";

/* Shared primitives for the Barcellos Veículos demo. */

export const EASE = [0.22, 1, 0.36, 1] as const;

/** Champagne focus ring, applied to every interactive element. */
export const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-gold)]";

/** Faint fractal grain so the graphite gradients never band. */
const NOISE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E";

export function Grain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[1] opacity-[0.05] mix-blend-overlay"
      style={{ backgroundImage: `url("${NOISE}")` }}
    />
  );
}

/** Mono eyebrow with a champagne tick, used above every section title. */
export function SectionLabel({ text }: { text: string }) {
  return (
    <p className="flex items-center gap-3 text-[0.66rem] font-medium uppercase tracking-[0.32em] text-[var(--d-gold)] [font-family:var(--demo-mono)]">
      <span className="inline-flex items-center gap-1" aria-hidden>
        <span className="h-1 w-1 rotate-45 bg-[var(--d-gold)] shadow-[0_0_8px_var(--d-gold)]" />
        <span className="h-px w-7 bg-gradient-to-r from-[var(--d-gold)] to-transparent" />
      </span>
      {text}
    </p>
  );
}

/** Scroll-choreographed reveal used across every section. */
export function Reveal({
  children,
  delay = 0,
  y = 20,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduced = useReducedMotion() ?? false;

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Smooth anchor scrolling used by the header and in-page CTAs. */
export function scrollToId(id: string) {
  const el = document.getElementById(id.replace(/^#/, ""));
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/**
 * Prices are ALWAYS Brazilian reais, regardless of the reading language —
 * the copy translates, the currency doesn't.
 */
export function fmtBRL(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

export function fmtBRLCents(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/** Brazilian-formatted odometer reading: 18.400 km. */
export function fmtKm(value: number): string {
  return `${new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 }).format(value)} km`;
}
