"use client";

/** Soft photographic grain laid over the whole demo, latte-paper style. */
const NOISE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E";

export function Grain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[60] opacity-[0.05] mix-blend-multiply"
      style={{ backgroundImage: `url("${NOISE}")` }}
    />
  );
}

/** Small-caps editorial section label with a leading rule. */
export function SectionLabel({
  text,
  tone = "dark",
}: {
  text: string;
  tone?: "dark" | "light";
}) {
  const color = tone === "dark" ? "text-[var(--d-accent)]" : "text-[var(--d-sand-dim)]";
  const rule = tone === "dark" ? "bg-[var(--d-accent)]" : "bg-[var(--d-sand-dim)]";
  return (
    <p className={`flex items-center gap-3 text-[0.68rem] font-bold uppercase tracking-[0.3em] ${color}`}>
      <span className={`h-px w-8 ${rule}`} aria-hidden />
      {text}
    </p>
  );
}

/** Smooth anchor scrolling that plays nicely with the sticky header. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}
