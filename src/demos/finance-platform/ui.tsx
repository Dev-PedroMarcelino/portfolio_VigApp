"use client";

/* Shared primitives for the Nuvex finance-platform demo. */

/** Fine scan-line texture; layered over the obsidian surface for CRT-grade depth. */
export function ScanLines() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[70] opacity-[0.06] mix-blend-soft-light"
      style={{
        backgroundImage:
          "repeating-linear-gradient(to bottom, rgba(255,255,255,0.9) 0px, rgba(255,255,255,0.9) 1px, transparent 1px, transparent 3px)",
      }}
    />
  );
}

/** Faint fractal grain so large emerald gradients never band. */
const NOISE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E";

export function Grain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[1] opacity-[0.05] mix-blend-overlay"
      style={{ backgroundImage: `url("${NOISE}")` }}
    />
  );
}

/** Mono eyebrow with a leading emerald tick, used above every section title. */
export function SectionLabel({ text }: { text: string }) {
  return (
    <p className="flex items-center gap-3 text-[0.66rem] font-medium uppercase tracking-[0.34em] text-[var(--d-accent)] [font-family:var(--demo-mono)]">
      <span className="inline-flex items-center gap-1" aria-hidden>
        <span className="h-1 w-1 rounded-full bg-[var(--d-accent)] shadow-[0_0_8px_var(--d-accent)]" />
        <span className="h-px w-7 bg-gradient-to-r from-[var(--d-accent)] to-transparent" />
      </span>
      {text}
    </p>
  );
}

/** Smooth anchor scrolling used by the header and in-page CTAs. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** Locale-aware whole-unit currency (no cents) for large headline figures. */
export function fmtWhole(value: number, localeTag: string, currency: string): string {
  return new Intl.NumberFormat(localeTag, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

/** Locale-aware currency with cents for ledger rows and amounts. */
export function fmtMoney(value: number, localeTag: string, currency: string): string {
  return new Intl.NumberFormat(localeTag, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}
