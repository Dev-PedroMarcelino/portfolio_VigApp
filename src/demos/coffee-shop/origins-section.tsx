"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Mountain, RotateCcw, Sprout } from "lucide-react";
import type { OriginCardContent, OriginsContent } from "./content";
import { SectionLabel } from "./ui";

const GRADIENTS = [
  "linear-gradient(165deg, #C99A5B 0%, #8A5A33 58%, #5C3A22 100%)",
  "linear-gradient(165deg, #C97B54 0%, #9C5232 58%, #6E3A22 100%)",
  "linear-gradient(165deg, #8A6A50 0%, #5C4030 58%, #3A2718 100%)",
];

function OriginCard({
  card,
  index,
  content,
  flipped,
  onToggle,
}: {
  card: OriginCardContent;
  index: number;
  content: OriginsContent;
  flipped: boolean;
  onToggle: () => void;
}) {
  const reduce = useReducedMotion() ?? false;
  const fields = [
    { label: content.fields.producer, value: card.producer },
    { label: content.fields.altitude, value: card.altitude },
    { label: content.fields.process, value: card.process },
    { label: content.fields.varietal, value: card.varietal },
  ];

  return (
    <button
      type="button"
      aria-pressed={flipped}
      onClick={onToggle}
      className="group relative h-[480px] w-full text-left [perspective:1600px] focus-visible:outline-offset-4"
    >
      <motion.div
        className="relative h-full w-full [transform-style:preserve-3d]"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: reduce ? 0 : 0.75, ease: [0.32, 0.72, 0, 1] }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-[1.75rem] p-7 text-[var(--d-cream)] [backface-visibility:hidden]"
          style={{ backgroundImage: GRADIENTS[index % GRADIENTS.length] }}
        >
          <div className="flex items-start justify-between">
            <span className="[font-family:var(--demo-display)] text-lg italic opacity-80">
              {String(index + 1).padStart(2, "0")}
            </span>
            <Sprout className="h-5 w-5 opacity-80" strokeWidth={1.6} aria-hidden />
          </div>
          <div>
            <h3 className="[font-family:var(--demo-display)] text-4xl italic tracking-tight">
              {card.country}
            </h3>
            <p className="mt-2 text-[0.68rem] font-bold uppercase tracking-[0.24em] opacity-85">
              {card.region}
            </p>
          </div>
          <div>
            <div className="flex items-center gap-2 border-t border-white/25 pt-4 text-[0.72rem] opacity-90">
              <Mountain className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden />
              <span>{card.altitude}</span>
              <span aria-hidden>·</span>
              <span>{card.roast}</span>
            </div>
            <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.18em] backdrop-blur-sm transition-colors group-hover:bg-white/25">
              {content.flipHint}
              <ArrowUpRight className="h-3 w-3" strokeWidth={2.2} aria-hidden />
            </span>
          </div>
        </div>

        {/* Back */}
        <div className="absolute inset-0 flex flex-col overflow-hidden rounded-[1.75rem] border border-[var(--d-line)] bg-[var(--d-cream)] p-7 text-[var(--d-ink)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.24em] text-[var(--d-accent)]">
            {content.notesLabel}
          </p>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {card.notes.map((note) => (
              <li
                key={note}
                className="rounded-full border border-[var(--d-accent)]/35 px-3 py-1 text-[0.7rem] font-medium text-[var(--d-accent)]"
              >
                {note}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[0.82rem] leading-[1.75] text-[var(--d-ink-soft)]">{card.story}</p>
          <dl className="mt-auto grid grid-cols-2 gap-x-4 gap-y-3 border-t border-[var(--d-line)] pt-4">
            {fields.map((field) => (
              <div key={field.label}>
                <dt className="text-[0.58rem] font-bold uppercase tracking-[0.2em] text-[var(--d-ink-soft)]/70">
                  {field.label}
                </dt>
                <dd className="mt-0.5 text-[0.72rem] font-medium leading-snug text-[var(--d-ink)]">
                  {field.value}
                </dd>
              </div>
            ))}
          </dl>
          <span className="mt-5 inline-flex w-max items-center gap-1.5 rounded-full bg-[var(--d-accent)]/10 px-3.5 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[var(--d-accent)]">
            <RotateCcw className="h-3 w-3" strokeWidth={2.2} aria-hidden />
            {content.backHint}
          </span>
        </div>
      </motion.div>
    </button>
  );
}

export function OriginsSection({ content }: { content: OriginsContent }) {
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});

  return (
    <section id="origins" className="scroll-mt-20 px-5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionLabel text={content.label} />
        <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 className="[font-family:var(--demo-display)] text-4xl tracking-tight text-[var(--d-ink)] md:text-5xl">
            {content.title}
          </h2>
          <p className="max-w-md leading-[1.85] text-[var(--d-ink-soft)]">{content.intro}</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {content.cards.map((card, i) => (
            <OriginCard
              key={card.id}
              card={card}
              index={i}
              content={content}
              flipped={!!flipped[card.id]}
              onToggle={() => setFlipped((prev) => ({ ...prev, [card.id]: !prev[card.id] }))}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
