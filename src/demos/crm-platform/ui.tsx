"use client";

import type { StageId, TagId } from "./content";

/** Smooth anchor scrolling; "top" scrolls to the very top of the demo. */
export function scrollToId(id: string) {
  if (id === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** Relaty logomark: a rounded node linked to a rising spark, pure SVG. */
export function RelatyMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden fill="none">
      <rect x="2" y="2" width="28" height="28" rx="9" fill="var(--d-accent)" />
      <path
        d="M10 22V13.5a3.5 3.5 0 0 1 3.5-3.5H16a3 3 0 0 1 0 6h-2.5"
        stroke="#FFFFFF"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M15 16.2 21 22.5" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="22.5" cy="9.5" r="2.3" fill="#C7D2FE" />
    </svg>
  );
}

/** Eyebrow + display title + intro, shared across sections. */
export function SectionHeading({
  label,
  title,
  intro,
  align = "left",
}: {
  label: string;
  title: string;
  intro?: string;
  align?: "center" | "left";
}) {
  const alignCls = align === "center" ? "items-center text-center" : "items-start text-left";
  return (
    <div className={`flex flex-col gap-4 ${alignCls}`}>
      <p className="inline-flex items-center gap-2 rounded-full border border-[var(--d-line)] bg-[var(--d-accent-soft)] px-3.5 py-1.5 text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-[var(--d-accent-deep)]">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--d-accent)]" aria-hidden />
        {label}
      </p>
      <h2 className="max-w-2xl [font-family:var(--demo-display)] text-3xl font-semibold tracking-tight text-[var(--d-ink)] sm:text-4xl lg:text-[2.55rem] lg:leading-[1.1]">
        {title}
      </h2>
      {intro ? (
        <p className={`max-w-xl text-[0.95rem] leading-relaxed text-[var(--d-ink-soft)] ${align === "center" ? "mx-auto" : ""}`}>
          {intro}
        </p>
      ) : null}
    </div>
  );
}

/** Initials avatar; tone derived from an index so SSR and CSR agree. */
const AVATAR_TONES = [
  "bg-[#EEF0FF] text-[#4F46E5]",
  "bg-[#E7F5FF] text-[#0284C7]",
  "bg-[#FCE7F3] text-[#DB2777]",
  "bg-[#FEF3C7] text-[#B45309]",
  "bg-[#DCFCE7] text-[#059669]",
  "bg-[#EDE9FE] text-[#7C3AED]",
];

export function Avatar({
  initials,
  index,
  size = "h-8 w-8 text-[0.65rem]",
}: {
  initials: string;
  index: number;
  size?: string;
}) {
  return (
    <span
      aria-hidden
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-semibold tracking-wide [font-family:var(--demo-display)] ${size} ${AVATAR_TONES[index % AVATAR_TONES.length]}`}
    >
      {initials}
    </span>
  );
}

/* Candy accents per pipeline stage. */
export const STAGE_DOT: Record<StageId, string> = {
  lead: "bg-[#0EA5E9]",
  qualified: "bg-[#8B5CF6]",
  proposal: "bg-[#F59E0B]",
  negotiation: "bg-[#EC4899]",
  won: "bg-[#10B981]",
};

export const STAGE_ACCENT: Record<StageId, string> = {
  lead: "#0EA5E9",
  qualified: "#8B5CF6",
  proposal: "#F59E0B",
  negotiation: "#EC4899",
  won: "#10B981",
};

export const STAGE_SOFT: Record<StageId, string> = {
  lead: "bg-[#E7F5FF]",
  qualified: "bg-[#F3EEFE]",
  proposal: "bg-[#FEF6E7]",
  negotiation: "bg-[#FCE9F3]",
  won: "bg-[#E6F8F1]",
};

/* Tag chips for the contacts table. */
export const TAG_CHIP: Record<TagId, string> = {
  customer: "bg-[#E6F8F1] text-[#047857] border-[#10B981]/30",
  prospect: "bg-[#EEF0FF] text-[#4338CA] border-[#4F46E5]/25",
  vip: "bg-[#FEF3C7] text-[#B45309] border-[#F59E0B]/35",
  trial: "bg-[#E7F5FF] text-[#0369A1] border-[#0EA5E9]/30",
  churned: "bg-[#F1F2F7] text-[#71748C] border-[#D2D5E4]",
};
