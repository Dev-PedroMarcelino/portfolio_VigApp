"use client";

import { motion, useReducedMotion } from "framer-motion";

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
      initial={reduce ? undefined : { opacity: 0, y: 26 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Eyebrow label + serif title + optional intro, in light or dark ink. */
export function SectionHeading({
  label,
  title,
  intro,
  dark = false,
}: {
  label: string;
  title: string;
  intro?: string;
  dark?: boolean;
}) {
  return (
    <div className="max-w-2xl">
      <p
        className={`flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] ${
          dark ? "text-[var(--d-oak)]" : "text-[var(--d-sage-ink)]"
        }`}
      >
        <span
          aria-hidden
          className={`h-px w-8 ${dark ? "bg-[var(--d-oak)]" : "bg-[var(--d-sage-ink)]"}`}
        />
        {label}
      </p>
      <h2
        className={`mt-5 text-3xl leading-[1.08] sm:text-5xl [font-family:var(--demo-display)] ${
          dark ? "text-[var(--d-bone)]" : "text-[var(--d-ink)]"
        }`}
      >
        {title}
      </h2>
      {intro ? (
        <p
          className={`mt-5 text-[15px] leading-relaxed sm:text-base ${
            dark ? "text-[var(--d-dark-text)]" : "text-[var(--d-soft)]"
          }`}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}
