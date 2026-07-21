"use client";

/* Shared primitives for the Vantage Capital demo. */

/** Faint film grain so the deep navy never reads flat on large screens. */
const NOISE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E";

export function Grain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[60] opacity-[0.04] mix-blend-overlay"
      style={{ backgroundImage: `url("${NOISE}")` }}
    />
  );
}

/** Small-caps editorial label with a leading gold rule. */
export function SectionLabel({ text }: { text: string }) {
  return (
    <p className="flex items-center gap-3 text-[0.66rem] font-semibold uppercase tracking-[0.32em] text-[var(--d-gold)]">
      <span className="h-px w-9 bg-[var(--d-gold)]/70" aria-hidden />
      {text}
    </p>
  );
}

/** Smooth anchor scrolling used by the header and in-page CTAs. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** Locale-aware whole-unit currency formatting. */
export function fmtCurrency(value: number, localeTag: string, currency: string): string {
  return new Intl.NumberFormat(localeTag, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

/** Compact currency for chart axes (e.g. $1.2M, R$ 5 mi). */
export function fmtCompact(value: number, localeTag: string, currency: string): string {
  return new Intl.NumberFormat(localeTag, {
    style: "currency",
    currency,
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}
