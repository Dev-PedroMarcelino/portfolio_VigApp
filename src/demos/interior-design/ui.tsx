"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Build a fully-qualified Unsplash URL from a listed photo id. */
export function unsplash(id: string, width = 1600): string {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`;
}

/** Scroll-reveal wrapper shared by every section; respects reduced motion. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? undefined : { opacity: 0, y: 28 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Eyebrow label with a hairline rule, in the studio's terracotta accent. */
export function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p
      className={`flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.28em] ${
        dark ? "text-[var(--d-accent-soft)]" : "text-[var(--d-accent)]"
      }`}
    >
      <span
        aria-hidden
        className={`h-px w-8 ${dark ? "bg-[var(--d-accent-soft)]" : "bg-[var(--d-accent)]"}`}
      />
      {children}
    </p>
  );
}

/** Eyebrow + serif headline + optional intro, in light or dark ink. */
export function SectionHeading({
  label,
  title,
  intro,
  dark = false,
  className,
}: {
  label: string;
  title: string;
  intro?: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={`max-w-2xl ${className ?? ""}`}>
      <Eyebrow dark={dark}>{label}</Eyebrow>
      <h2
        className={`mt-5 text-[2rem] leading-[1.06] sm:text-[2.9rem] [font-family:var(--demo-display)] ${
          dark ? "text-[var(--d-cream)]" : "text-[var(--d-ink)]"
        }`}
      >
        {title}
      </h2>
      {intro ? (
        <p
          className={`mt-5 max-w-xl text-[15px] leading-relaxed sm:text-base ${
            dark ? "text-[var(--d-dark-text)]" : "text-[var(--d-soft)]"
          }`}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}
