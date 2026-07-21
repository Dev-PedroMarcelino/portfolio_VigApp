"use client";

/** Kraft-paper grain laid over the whole demo. */
const NOISE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E";

export function Grain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[60] opacity-[0.06] mix-blend-multiply"
      style={{ backgroundImage: `url("${NOISE}")` }}
    />
  );
}

/** Small-caps editorial section label with a leading rule. */
export function SectionLabel({
  text,
  tone = "accent",
}: {
  text: string;
  tone?: "accent" | "cream" | "olive";
}) {
  const color =
    tone === "cream"
      ? "text-[var(--d-sand-dim)]"
      : tone === "olive"
        ? "text-[var(--d-olive)]"
        : "text-[var(--d-accent)]";
  const rule =
    tone === "cream"
      ? "bg-[var(--d-sand-dim)]"
      : tone === "olive"
        ? "bg-[var(--d-olive)]"
        : "bg-[var(--d-accent)]";
  return (
    <p
      className={`flex items-center gap-3 text-[0.68rem] font-extrabold uppercase tracking-[0.3em] ${color}`}
    >
      <span className={`h-px w-8 ${rule}`} aria-hidden />
      {text}
    </p>
  );
}

/** Deterministic 12-point starburst seal used for badges and success states. */
const STAR_POINTS = Array.from({ length: 24 }, (_, i) => {
  const r = i % 2 === 0 ? 58 : 45;
  const a = (Math.PI * i) / 12;
  return `${(60 + r * Math.cos(a)).toFixed(2)},${(60 + r * Math.sin(a)).toFixed(2)}`;
}).join(" ");

export function Starburst({
  fill,
  className,
  children,
}: {
  fill: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={`relative ${className ?? ""}`}>
      <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden>
        <polygon points={STAR_POINTS} fill={fill} />
      </svg>
      {children && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          {children}
        </div>
      )}
    </div>
  );
}

/** Smooth anchor scrolling that plays nicely with the sticky header. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}
