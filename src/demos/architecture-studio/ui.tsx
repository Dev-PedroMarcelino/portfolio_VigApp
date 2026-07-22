"use client";

import { motion } from "framer-motion";
import { useReducedMotionSafe as useReducedMotion } from "@/components/demos/use-reduced-motion-safe";

/**
 * Quiet entrance shared by every section: a short rise-and-fade that fires
 * once when the block scrolls into view. Under reduced motion it renders
 * statically — no transform, no opacity dance.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Kicker label: bronze tick + mono uppercase tracking. */
export function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-3 [font-family:var(--demo-mono)] text-[11px] uppercase tracking-[0.3em] text-[var(--d-ink-soft)]">
      <span aria-hidden className="h-px w-8 bg-[var(--d-accent)]" />
      {children}
    </p>
  );
}

/**
 * Editorial section heading — big Instrument Serif with a single italic
 * inflection, matching the gallery-minimal identity of the studio.
 */
export function SectionTitle({
  lead,
  italic,
  className = "",
}: {
  lead: string;
  italic: string;
  className?: string;
}) {
  return (
    <h2
      className={`[font-family:var(--demo-display)] text-4xl leading-[1.05] tracking-[-0.01em] text-[var(--d-ink)] sm:text-5xl lg:text-6xl ${className}`}
    >
      {lead} <em className="italic text-[var(--d-accent)]">{italic}</em>
    </h2>
  );
}

/** Full-width hairline used to open most sections. */
export function Hairline({ className = "" }: { className?: string }) {
  return <div aria-hidden className={`h-px w-full bg-[var(--d-line)] ${className}`} />;
}
