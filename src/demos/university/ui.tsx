"use client";

/**
 * Shared building blocks for the Northgate demo: anchor scrolling, an engraved
 * section eyebrow, an image URL helper, and a pure-SVG collegiate crest built
 * from a shield, an open book, stars and a motto banner.
 */

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export const unsplash = (id: string, w = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

/** Engraved uppercase eyebrow with flanking rules, used above section titles. */
export function Eyebrow({
  text,
  tone = "crimson",
  align = "left",
}: {
  text: string;
  tone?: "crimson" | "parchment" | "gold" | "navy";
  align?: "left" | "center";
}) {
  const map: Record<string, string> = {
    crimson: "text-[var(--d-crimson)]",
    parchment: "text-[var(--d-parchment)]",
    gold: "text-[var(--d-gold)]",
    navy: "text-[var(--d-navy)]",
  };
  const rule =
    tone === "parchment" ? "bg-[var(--d-parchment)]/50" : "bg-current opacity-40";
  return (
    <span
      className={`inline-flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.34em] [font-family:var(--demo-body)] ${map[tone]} ${
        align === "center" ? "justify-center" : ""
      }`}
    >
      <span className={`h-px w-7 ${rule}`} aria-hidden />
      {text}
    </span>
  );
}

/** Thin engraved double rule used as a decorative divider. */
export function DoubleRule({ color = "var(--d-gold)" }: { color?: string }) {
  return (
    <span aria-hidden className="flex flex-col gap-[3px]">
      <span className="h-px w-full" style={{ backgroundColor: color, opacity: 0.55 }} />
      <span className="h-[2px] w-full" style={{ backgroundColor: color }} />
    </span>
  );
}

/**
 * The Northgate crest — a quartered shield with an open book, a rising sun of
 * knowledge and three stars, drawn as crisp SVG so it stays sharp at any size
 * and renders identically regardless of the host theme.
 */
export function Crest({
  className,
  stroke = "currentColor",
  fill = "none",
  accent,
}: {
  className?: string;
  stroke?: string;
  fill?: string;
  accent?: string;
}) {
  const a = accent ?? stroke;
  return (
    <svg
      viewBox="0 0 120 140"
      className={className}
      role="img"
      aria-hidden
      fill="none"
    >
      {/* shield body */}
      <path
        d="M60 6 L110 20 V64 C110 100 88 122 60 134 C32 122 10 100 10 64 V20 Z"
        fill={fill}
        stroke={stroke}
        strokeWidth={3}
        strokeLinejoin="round"
      />
      {/* quartering cross */}
      <path d="M60 12 V128" stroke={stroke} strokeWidth={1.4} opacity={0.35} />
      <path d="M14 42 H106" stroke={stroke} strokeWidth={1.4} opacity={0.35} />
      {/* rising sun rays (upper) */}
      <g stroke={a} strokeWidth={1.6} strokeLinecap="round">
        <path d="M60 20 V30" />
        <path d="M46 24 L50 32" />
        <path d="M74 24 L70 32" />
        <path d="M36 32 L43 37" />
        <path d="M84 32 L77 37" />
      </g>
      {/* three stars (lower field) */}
      <g fill={a}>
        <path d="M60 96 l2.6 5.3 5.8 .8 -4.2 4.1 1 5.8 -5.2 -2.7 -5.2 2.7 1 -5.8 -4.2 -4.1 5.8 -.8 Z" />
        <path
          d="M38 74 l1.8 3.7 4 .6 -2.9 2.8 .7 4 -3.6 -1.9 -3.6 1.9 .7 -4 -2.9 -2.8 4 -.6 Z"
          opacity={0.85}
        />
        <path
          d="M82 74 l1.8 3.7 4 .6 -2.9 2.8 .7 4 -3.6 -1.9 -3.6 1.9 .7 -4 -2.9 -2.8 4 -.6 Z"
          opacity={0.85}
        />
      </g>
      {/* open book across the fess */}
      <g stroke={stroke} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round">
        <path d="M60 46 C52 42 44 42 38 45 V60 C44 57 52 57 60 61 Z" fill={fill} />
        <path d="M60 46 C68 42 76 42 82 45 V60 C76 57 68 57 60 61 Z" fill={fill} />
        <path d="M60 47 V60" strokeWidth={1.4} />
      </g>
    </svg>
  );
}
