"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

/* ------------------------------------------------------------------ */
/* Motifs                                                              */
/* ------------------------------------------------------------------ */

/** Fine carbon-weave texture laid over dark panels. */
const CARBON =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3Crect width='16' height='16' fill='%23000'/%3E%3Cpath d='M0 0h8v8H0zM8 8h8v8H8z' fill='%23ffffff' fill-opacity='0.05'/%3E%3C/svg%3E";

export function CarbonTexture({ opacity = 0.4 }: { opacity?: number }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{ backgroundImage: `url("${CARBON}")`, backgroundSize: "6px 6px", opacity }}
    />
  );
}

/** Diagonal speedline motif — sharp red hairlines shearing across a panel. */
export function Speedlines({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={`pointer-events-none absolute ${className}`}
      viewBox="0 0 200 100"
      preserveAspectRatio="none"
      fill="none"
    >
      {[0, 14, 24, 30, 46, 60].map((x, i) => (
        <line
          key={x}
          x1={x}
          y1={100}
          x2={x + 40}
          y2={0}
          stroke="var(--d-accent)"
          strokeWidth={i % 2 === 0 ? 0.8 : 0.35}
          opacity={0.5 - i * 0.06}
        />
      ))}
    </svg>
  );
}

/** Small-caps technical section label with a leading red tick. */
export function SectionLabel({ text }: { text: string }) {
  return (
    <p className="flex items-center gap-3 text-[0.66rem] font-semibold uppercase tracking-[0.34em] text-[var(--d-accent-soft)] [font-family:var(--demo-body)]">
      <span className="inline-block h-2.5 w-[3px] skew-x-[-18deg] bg-[var(--d-accent)]" aria-hidden />
      {text}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* Behaviour helpers                                                   */
/* ------------------------------------------------------------------ */

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** Format a number as localized currency with no decimals. */
export function formatCurrency(value: number, locale: string, currency: string) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

/** Count a stat up from zero once it scrolls into view. Respects reduced motion. */
export function useCountUp(
  target: number,
  decimals: number,
  active: boolean,
  reduced: boolean,
  durationMs = 1400,
) {
  const [value, setValue] = useState(reduced ? target : 0);
  const frame = useRef<number>(0);

  useEffect(() => {
    if (!active) return;
    if (reduced) {
      setValue(target);
      return;
    }
    let start: number | null = null;
    const tick = (t: number) => {
      if (start === null) start = t;
      const p = Math.min((t - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Number((target * eased).toFixed(decimals)));
      if (p < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [active, reduced, target, decimals, durationMs]);

  return value;
}

/** Convenience wrapper: returns [ref, inView] with a one-shot margin trigger. */
export function useReveal<T extends Element>() {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px -15% 0px" });
  return [ref, inView] as const;
}
