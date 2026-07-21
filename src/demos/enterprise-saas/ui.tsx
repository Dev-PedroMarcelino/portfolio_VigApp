"use client";

import type { CardTone } from "./content";

/** Smooth anchor scrolling; "top" scrolls to the very top of the demo. */
export function scrollToId(id: string) {
  if (id === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** Orbitflow logomark: a ring with an orbiting satellite dot, pure SVG. */
export function OrbitMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden fill="none">
      <circle cx="16" cy="16" r="6" fill="var(--d-accent)" />
      <ellipse
        cx="16"
        cy="16"
        rx="13"
        ry="7"
        stroke="var(--d-accent)"
        strokeOpacity="0.55"
        strokeWidth="1.5"
        transform="rotate(-24 16 16)"
      />
      <circle cx="27" cy="10" r="2.4" fill="#E6EDF7" />
    </svg>
  );
}

/** Eyebrow + display title + intro, shared across sections. */
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
  const alignCls = align === "center" ? "items-center text-center" : "items-start text-left";
  return (
    <div className={`flex flex-col gap-4 ${alignCls}`}>
      <p className="inline-flex items-center gap-2 rounded-full border border-[var(--d-line)] bg-[var(--d-panel)] px-3.5 py-1.5 text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-[var(--d-accent)]">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--d-accent)]" aria-hidden />
        {label}
      </p>
      <h2 className="max-w-2xl [font-family:var(--demo-display)] text-3xl font-semibold tracking-tight text-[var(--d-ink)] sm:text-4xl lg:text-[2.6rem] lg:leading-[1.12]">
        {title}
      </h2>
      {intro ? (
        <p className="max-w-xl text-[0.95rem] leading-relaxed text-[var(--d-ink-soft)]">{intro}</p>
      ) : null}
    </div>
  );
}

/** Blue nebula glow used behind hero and section focal points. */
export function Glow({ className }: { className: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
      style={{
        background:
          "radial-gradient(closest-side, rgba(96,165,250,0.28), rgba(96,165,250,0.08) 55%, transparent 75%)",
      }}
    />
  );
}

/** Faint blueprint grid laid behind glass panels. */
export function GridPattern({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(rgba(148,163,184,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.07) 1px, transparent 1px)",
        backgroundSize: "44px 44px",
        maskImage: "radial-gradient(ellipse 90% 70% at 50% 30%, black 30%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 90% 70% at 50% 30%, black 30%, transparent 100%)",
      }}
    />
  );
}

/* Tone maps shared by the kanban mocks and avatar chips. */
export const TONE_DOT: Record<CardTone, string> = {
  blue: "bg-[#60A5FA]",
  violet: "bg-[#A78BFA]",
  amber: "bg-[#FBBF24]",
  rose: "bg-[#FB7185]",
  emerald: "bg-[#34D399]",
};

export const TONE_CHIP: Record<CardTone, string> = {
  blue: "bg-[rgba(96,165,250,0.16)] text-[#93C5FD]",
  violet: "bg-[rgba(167,139,250,0.16)] text-[#C4B5FD]",
  amber: "bg-[rgba(251,191,36,0.14)] text-[#FCD34D]",
  rose: "bg-[rgba(251,113,133,0.14)] text-[#FDA4AF]",
  emerald: "bg-[rgba(52,211,153,0.14)] text-[#6EE7B7]",
};

const AVATAR_TONES = [
  "bg-[rgba(96,165,250,0.22)] text-[#93C5FD]",
  "bg-[rgba(167,139,250,0.22)] text-[#C4B5FD]",
  "bg-[rgba(52,211,153,0.2)] text-[#6EE7B7]",
  "bg-[rgba(251,191,36,0.2)] text-[#FCD34D]",
  "bg-[rgba(251,113,133,0.2)] text-[#FDA4AF]",
  "bg-[rgba(34,211,238,0.2)] text-[#67E8F9]",
];

/** Initials avatar; tone derived from an index so SSR and CSR agree. */
export function Avatar({
  initials,
  index,
  size = "h-6 w-6 text-[0.55rem]",
}: {
  initials: string;
  index: number;
  size?: string;
}) {
  return (
    <span
      aria-hidden
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-semibold tracking-wide ${size} ${AVATAR_TONES[index % AVATAR_TONES.length]}`}
    >
      {initials}
    </span>
  );
}

/** Two-letter monogram tile for integration logos (lucide has no brand icons). */
export function Monogram({ name, index }: { name: string; index: number }) {
  const letters = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <span
      aria-hidden
      className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--d-line)] text-sm font-bold [font-family:var(--demo-display)] ${AVATAR_TONES[index % AVATAR_TONES.length]}`}
    >
      {letters}
    </span>
  );
}
