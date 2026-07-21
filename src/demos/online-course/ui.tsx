"use client";

/** Warm paper grain laid over the whole demo for an editorial, printed feel. */
const NOISE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E";

export function Grain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[70] opacity-[0.035] mix-blend-overlay"
      style={{ backgroundImage: `url("${NOISE}")` }}
    />
  );
}

/** Small-caps editorial section label with a leading amber rule. */
export function SectionLabel({
  text,
  tone = "dark",
}: {
  text: string;
  tone?: "dark" | "light";
}) {
  const color = tone === "dark" ? "text-[var(--d-accent)]" : "text-[var(--d-amber-soft)]";
  return (
    <p
      className={`flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.32em] ${color}`}
    >
      <span className="h-px w-8 bg-current" aria-hidden />
      {text}
    </p>
  );
}

/** Smooth anchor scrolling that plays nicely with the sticky header. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** Build a defensive Unsplash URL at a chosen width. */
export function unsplash(id: string, w: number) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
}
