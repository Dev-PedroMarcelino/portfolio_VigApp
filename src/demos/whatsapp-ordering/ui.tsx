"use client";

import type { Currency } from "./content";

/**
 * Subtle doodle grain used behind the WhatsApp-style chat surface, echoing the
 * faint pattern of a real chat wallpaper without shipping an external asset.
 */
const DOODLE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='1.4' stroke-linecap='round' opacity='0.5'%3E%3Cpath d='M20 26h16M20 34h10'/%3E%3Ccircle cx='86' cy='30' r='9'/%3E%3Cpath d='M74 78l8 8 14-16'/%3E%3Cpath d='M26 92c0-6 5-10 11-10s11 4 11 10-5 10-11 10h-11z'/%3E%3C/g%3E%3C/svg%3E";

export function ChatDoodle() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-[0.03]"
      style={{ backgroundImage: `url("${DOODLE}")`, backgroundSize: "180px" }}
    />
  );
}

/** Small-caps eyebrow with a leading chat-green tick rule. */
export function Eyebrow({ text }: { text: string }) {
  return (
    <p className="flex items-center gap-2.5 text-[0.68rem] font-bold uppercase tracking-[0.28em] text-[var(--d-accent)]">
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--d-accent)]" aria-hidden />
      {text}
    </p>
  );
}

/** Format a numeric price using the locale's currency descriptor. */
export function formatMoney(value: number, c: Currency): string {
  const digits = value.toFixed(2).replace(".", c.decimal);
  return c.position === "before"
    ? `${c.symbol}${c.space ? " " : ""}${digits}`
    : `${digits}${c.space ? " " : ""}${c.symbol}`;
}

/** Smooth anchor scrolling that clears the sticky header. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** Deterministic delivery-time label, derived from index (no Math.random). */
export function etaLabel(base: number, index: number): number {
  return base + ((index * 7) % 9);
}
