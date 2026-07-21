"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote } from "lucide-react";
import type { LeaderContent, LeadershipContent } from "./content";
import { SectionHeading } from "./ui";

function LeaderCard({ leader, index }: { leader: LeaderContent; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <button
      type="button"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      aria-expanded={open}
      className="group relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-sm border border-[var(--d-line)] bg-[var(--d-surface)] text-left transition-colors hover:border-[var(--d-steel-bright)]/50 focus:outline-none focus-visible:border-[var(--d-steel-bright)]"
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `radial-gradient(120% 90% at 50% 0%, rgba(122,154,191,${0.14 + (index % 3) * 0.04}), transparent 60%)`,
        }}
      />
      {/* Monogram plate stands in for a portrait: no real person is depicted. */}
      <div className="absolute inset-x-0 top-0 flex h-1/2 items-center justify-center">
        <span
          aria-hidden
          className="[font-family:var(--demo-display)] text-5xl font-semibold tracking-tight text-[var(--d-ink-faint)]/60 transition-transform duration-500 group-hover:scale-110"
        >
          {leader.initials}
        </span>
      </div>

      <div className="relative z-10 border-t border-[var(--d-line)] bg-[rgba(15,23,42,0.72)] p-4 backdrop-blur-sm">
        <p className="[font-family:var(--demo-display)] text-[1.05rem] font-semibold leading-tight text-[var(--d-ink)]">
          {leader.name}
        </p>
        <p className="mt-0.5 text-[0.78rem] text-[var(--d-steel-bright)]">{leader.role}</p>
        <p className="mt-0.5 text-[0.7rem] text-[var(--d-ink-faint)]">{leader.since}</p>

        <AnimatePresence initial={false}>
          {open && (
            <motion.p
              initial={{ height: 0, opacity: 0, marginTop: 0 }}
              animate={{ height: "auto", opacity: 1, marginTop: 12 }}
              exit={{ height: 0, opacity: 0, marginTop: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="overflow-hidden text-[0.8rem] leading-relaxed text-[var(--d-ink-soft)]"
            >
              {leader.bio}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </button>
  );
}

export function Leadership({ content }: { content: LeadershipContent }) {
  return (
    <section id="leadership" className="relative scroll-mt-20 border-t border-[var(--d-line)] py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-14">
          <div className="lg:sticky lg:top-24">
            <SectionHeading label={content.eyebrow} title={content.title} intro={content.intro} />

            <figure className="mt-10 border-l-2 border-[var(--d-steel-bright)] pl-6">
              <Quote className="h-6 w-6 text-[var(--d-steel-bright)]/60" strokeWidth={1.5} aria-hidden />
              <blockquote className="mt-3 [font-family:var(--demo-serif)] text-[1.35rem] font-normal italic leading-snug text-[var(--d-ink)] sm:text-[1.5rem]">
                {content.quote}
              </blockquote>
              <figcaption className="mt-4 text-[0.82rem] text-[var(--d-ink-soft)]">
                <span className="font-semibold text-[var(--d-ink)]">{content.quoteAuthor}</span>
                {" — "}
                {content.quoteRole}
              </figcaption>
            </figure>

            <p className="mt-8 text-[0.72rem] font-medium uppercase tracking-[0.16em] text-[var(--d-ink-faint)]">
              {content.hoverHint}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {content.leaders.map((leader, i) => (
              <LeaderCard key={leader.id} leader={leader} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
