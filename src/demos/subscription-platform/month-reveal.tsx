"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Eye, EyeOff, Sparkles } from "lucide-react";
import type { MonthBoxContent, MonthItem } from "./content";
import { SectionLabel } from "./ui";

/** Back-face color variants, cycled deterministically by card index. */
const BACKS = [
  { bg: "#E2593B", fg: "#FFF4E6", dim: "#FFD9C4" },
  { bg: "#F3E6CE", fg: "#37271A", dim: "#8A745A" },
  { bg: "#6B7243", fg: "#FFF4E6", dim: "#D6DCB4" },
];

const TILTS = [-2, 1.5, -1, 2, -1.5, 1];

export function MonthReveal({ content }: { content: MonthBoxContent }) {
  const reduce = useReducedMotion() ?? false;
  const [flipped, setFlipped] = useState<boolean[]>(() => content.items.map(() => false));

  const allFlipped = flipped.every(Boolean);

  const toggleOne = (i: number) =>
    setFlipped((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  const toggleAll = () => setFlipped(content.items.map(() => !allFlipped));

  return (
    <section
      id="month"
      className="relative scroll-mt-24 overflow-hidden bg-[var(--d-olive-deep)] px-5 py-20 text-[var(--d-sand)] md:py-28"
    >
      <div
        aria-hidden
        className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[var(--d-olive)]/40"
      />
      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <SectionLabel text={content.label} tone="cream" />
            <div className="mt-5 flex flex-wrap items-center gap-4">
              <h2 className="[font-family:var(--demo-display)] text-4xl tracking-tight md:text-5xl">
                {content.title}
              </h2>
              <span className="rotate-[-3deg] rounded-lg border-2 border-dashed border-[var(--d-kraft-deep)] bg-[var(--d-kraft)] px-3.5 py-1.5 [font-family:var(--demo-display)] text-base italic text-[var(--d-ink)]">
                {content.theme}
              </span>
            </div>
            <p className="mt-4 leading-[1.85] text-[var(--d-sand-dim)]">{content.intro}</p>
          </div>
          <div className="shrink-0">
            <button
              type="button"
              onClick={toggleAll}
              aria-pressed={allFlipped}
              className="flex items-center gap-2.5 rounded-full border-2 border-[var(--d-sand)]/40 px-6 py-3.5 text-[0.7rem] font-extrabold uppercase tracking-[0.16em] text-[var(--d-sand)] transition-colors hover:border-[var(--d-sand)] hover:bg-[var(--d-sand)]/10"
            >
              {allFlipped ? (
                <EyeOff className="h-4 w-4" strokeWidth={2.2} aria-hidden />
              ) : (
                <Eye className="h-4 w-4" strokeWidth={2.2} aria-hidden />
              )}
              {allFlipped ? content.hideAll : content.revealAll}
            </button>
            <p className="mt-3 text-center text-[0.66rem] font-bold uppercase tracking-[0.14em] text-[var(--d-sand-dim)] md:text-right">
              {content.secretNote}
            </p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          {content.items.map((item, i) => (
            <FlipCard
              key={item.name}
              item={item}
              index={i}
              flipped={flipped[i]}
              onToggle={() => toggleOne(i)}
              hint={content.flipHint}
              reduce={reduce}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FlipCard({
  item,
  index,
  flipped,
  onToggle,
  hint,
  reduce,
}: {
  item: MonthItem;
  index: number;
  flipped: boolean;
  onToggle: () => void;
  hint: string;
  reduce: boolean;
}) {
  const back = BACKS[index % BACKS.length];
  const tilt = TILTS[index % TILTS.length];

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={flipped}
      className="group relative aspect-[3/4] w-full [perspective:1400px] focus-visible:outline-offset-4"
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      <motion.div
        className="relative h-full w-full [transform-style:preserve-3d]"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 220, damping: 26 }}
      >
        {/* Front: kraft parcel */}
        <div className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-2xl border-2 border-[var(--d-kraft-deep)] bg-[var(--d-kraft)] p-4 text-[var(--d-ink)] shadow-xl shadow-black/25 [backface-visibility:hidden] sm:p-6">
          <svg
            aria-hidden
            viewBox="0 0 100 100"
            className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 text-[var(--d-kraft-deep)] opacity-50"
          >
            <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 4" />
            <circle cx="50" cy="50" r="32" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="50" cy="50" r="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
          </svg>
          <div className="relative flex items-start justify-between">
            <span className="rounded-full bg-[var(--d-card)]/80 px-3 py-1 text-[0.6rem] font-extrabold uppercase tracking-[0.18em] text-[var(--d-olive-deep)]">
              {item.category}
            </span>
          </div>
          <span
            aria-hidden
            className="relative block [font-family:var(--demo-display)] text-6xl italic leading-none text-[var(--d-ink)]/80 sm:text-7xl"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="relative flex items-center gap-2 text-[0.62rem] font-extrabold uppercase tracking-[0.16em] text-[var(--d-ink-soft)] transition-colors group-hover:text-[var(--d-accent-deep)]">
            <Sparkles className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden />
            {hint}
          </span>
        </div>

        {/* Back: the snack, revealed */}
        <div
          className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-2xl p-4 text-left shadow-xl shadow-black/25 [backface-visibility:hidden] [transform:rotateY(180deg)] sm:p-6"
          style={{ backgroundColor: back.bg, color: back.fg }}
        >
          <span
            className="text-[0.6rem] font-extrabold uppercase tracking-[0.18em]"
            style={{ color: back.dim }}
          >
            {item.category}
          </span>
          <span className="block">
            <span className="block [font-family:var(--demo-display)] text-lg italic leading-snug tracking-tight sm:text-2xl">
              {item.name}
            </span>
            <span
              className="mt-2 block text-[0.64rem] font-extrabold uppercase tracking-[0.12em]"
              style={{ color: back.dim }}
            >
              {item.maker}
            </span>
          </span>
          <span className="block text-xs leading-relaxed sm:text-sm">{item.note}</span>
        </div>
      </motion.div>
    </button>
  );
}
