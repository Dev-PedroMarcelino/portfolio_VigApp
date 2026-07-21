"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

/** Money formatter shared across pricing surfaces. */
export function formatPrice(value: number, intlLocale: string, currency: string): string {
  return new Intl.NumberFormat(intlLocale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

/** Eyebrow + headline + intro block used to open most sections. */
export function SectionHeading({
  label,
  title,
  intro,
  align = "center",
}: {
  label: string;
  title: string;
  intro?: string;
  align?: "center" | "left";
}) {
  const reduce = useReducedMotion() ?? false;
  const alignClass = align === "center" ? "mx-auto text-center items-center" : "items-start text-left";

  return (
    <motion.div
      initial={reduce ? undefined : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`flex max-w-2xl flex-col ${alignClass}`}
    >
      <span className="inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[var(--d-accent)]">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--d-accent)]" aria-hidden />
        {label}
      </span>
      <h2 className="mt-5 [font-family:var(--demo-display)] text-3xl font-medium leading-[1.05] tracking-tight text-[var(--d-ink)] sm:text-4xl md:text-[2.9rem]">
        {title}
      </h2>
      {intro ? (
        <p className="mt-5 text-[0.98rem] leading-relaxed text-[var(--d-ink-dim)]">{intro}</p>
      ) : null}
    </motion.div>
  );
}

/** Small reveal wrapper for staggered content. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion() ?? false;
  return (
    <motion.div
      initial={reduce ? undefined : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
