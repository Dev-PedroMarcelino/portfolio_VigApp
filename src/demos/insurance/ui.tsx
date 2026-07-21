"use client";

import { useMemo } from "react";
import { Star } from "lucide-react";

const SHIELD_PATH =
  "M12 1.8 20.6 5.3v6.3c0 5.4-3.7 9.5-8.6 10.7-4.9-1.2-8.6-5.3-8.6-10.7V5.3L12 1.8Z";

/** Filled shield mark with a white check — the Shieldline logo glyph. */
export function ShieldMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d={SHIELD_PATH} fill="currentColor" />
      <path
        d="m8.4 11.7 2.5 2.5 4.7-4.8"
        stroke="#FFFFFF"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Stroke-only shield used as a geometric background motif. */
export function ShieldOutline({
  className,
  strokeWidth = 0.6,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d={SHIELD_PATH} stroke="currentColor" strokeWidth={strokeWidth} />
    </svg>
  );
}

/** Concentric shield outlines — decorative backdrop for hero and dark bands. */
export function ShieldRings({ className }: { className?: string }) {
  return (
    <div className={`pointer-events-none ${className ?? ""}`} aria-hidden="true">
      <ShieldOutline className="absolute inset-0 h-full w-full" strokeWidth={0.35} />
      <ShieldOutline className="absolute inset-[12%] h-[76%] w-[76%]" strokeWidth={0.45} />
      <ShieldOutline className="absolute inset-[24%] h-[52%] w-[52%]" strokeWidth={0.55} />
    </div>
  );
}

/** Small-caps section label with a leading shield tick. */
export function SectionLabel({
  text,
  tone = "dark",
}: {
  text: string;
  tone?: "dark" | "light";
}) {
  const color = tone === "dark" ? "text-[var(--d-accent)]" : "text-[var(--d-cloud)]";
  return (
    <p
      className={`flex items-center gap-2.5 text-[0.68rem] font-bold uppercase tracking-[0.28em] ${color}`}
    >
      <ShieldOutline className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
      {text}
    </p>
  );
}

/** Five-star rating row. */
export function Stars({
  rating,
  srLabel,
  className,
}: {
  rating: number;
  srLabel: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-0.5 ${className ?? ""}`}
      role="img"
      aria-label={srLabel}
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          aria-hidden
          strokeWidth={0}
          className={`h-3.5 w-3.5 ${
            i < rating ? "fill-[var(--d-gold)]" : "fill-[var(--d-line)]"
          }`}
        />
      ))}
    </span>
  );
}

/** Currency formatter bound to the active locale of the demo content. */
export function useMoney(locale: string, currency: string) {
  return useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
      }),
    [locale, currency],
  );
}

/** Smooth anchor scrolling that plays nicely with the sticky header. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}
