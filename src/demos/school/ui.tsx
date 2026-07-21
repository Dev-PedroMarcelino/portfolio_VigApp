"use client";

/**
 * Shared building blocks for the Brightpath demo: a playful section label,
 * pure-CSS/SVG confetti shapes, a friendly wavy divider, and anchor scrolling.
 */

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** Small rounded pill eyebrow with a leading dot, used above section titles. */
export function Eyebrow({
  text,
  tone = "accent",
}: {
  text: string;
  tone?: "accent" | "sun" | "coral" | "mint" | "light";
}) {
  const map: Record<string, { bg: string; ink: string; dot: string }> = {
    accent: { bg: "bg-[var(--d-accent-soft)]", ink: "text-[var(--d-accent-deep)]", dot: "bg-[var(--d-accent)]" },
    sun: { bg: "bg-[var(--d-sun-soft)]", ink: "text-[var(--d-sun-deep)]", dot: "bg-[var(--d-sun)]" },
    coral: { bg: "bg-[var(--d-coral-soft)]", ink: "text-[var(--d-coral-deep)]", dot: "bg-[var(--d-coral)]" },
    mint: { bg: "bg-[var(--d-mint-soft)]", ink: "text-[var(--d-mint-deep)]", dot: "bg-[var(--d-mint)]" },
    light: { bg: "bg-white/15", ink: "text-white", dot: "bg-[var(--d-sun)]" },
  };
  const c = map[tone];
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full ${c.bg} px-3.5 py-1.5 text-[0.72rem] font-extrabold uppercase tracking-[0.14em] ${c.ink} [font-family:var(--demo-body)]`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} aria-hidden />
      {text}
    </span>
  );
}

/** A single decorative rounded shape — circle, star, blob or squiggle. */
export function Blob({ className, color }: { className?: string; color: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute rounded-full blur-2xl ${className ?? ""}`}
      style={{ backgroundColor: color }}
    />
  );
}

/** A crisp CSS star built from a clip-path, no image needed. */
export function Star({ className, color }: { className?: string; color: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute ${className ?? ""}`}
      style={{
        backgroundColor: color,
        clipPath:
          "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
      }}
    />
  );
}

/** Friendly wavy divider. Flip and recolor to sit between sections. */
export function Wave({
  fill,
  flip = false,
  className,
}: {
  fill: string;
  flip?: boolean;
  className?: string;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      className={`block h-[60px] w-full sm:h-[90px] ${flip ? "rotate-180" : ""} ${className ?? ""}`}
    >
      <path
        fill={fill}
        d="M0,64 C180,120 340,16 540,44 C740,72 880,120 1080,96 C1260,74 1360,32 1440,48 L1440,120 L0,120 Z"
      />
    </svg>
  );
}

export const unsplash = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
