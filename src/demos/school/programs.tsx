"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Clock, Coins, Users } from "lucide-react";
import type { AgeGroupId, ProgramsContent } from "./content";
import { Eyebrow, scrollToId, unsplash } from "./ui";

const IMG: Record<AgeGroupId, string> = {
  early: "photo-1577412647305-991150c7d163",
  elementary: "photo-1580582932707-520aed937b7b",
  middle: "photo-1546410531-bb4caa6b424d",
};

export function Programs({ content }: { content: ProgramsContent }) {
  const [active, setActive] = useState<AgeGroupId>("early");
  const program = content.programs.find((p) => p.id === active) ?? content.programs[0];

  const facts = [
    { icon: Users, label: content.ratioLabel, value: program.ratio },
    { icon: Clock, label: content.hoursLabel, value: program.hours },
    { icon: Coins, label: content.tuitionLabel, value: program.tuition, note: program.tuitionNote },
  ];

  return (
    <section id="programs" className="relative bg-[var(--d-surface)] py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-2xl">
          <Eyebrow text={content.eyebrow} tone="accent" />
          <h2 className="mt-4 [font-family:var(--demo-display)] text-3xl font-extrabold leading-tight tracking-tight text-[var(--d-ink)] sm:text-4xl">
            {content.title}
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-[var(--d-ink-soft)]">{content.intro}</p>
        </div>

        {/* tabs */}
        <div
          role="tablist"
          aria-label={content.title}
          className="mt-8 flex flex-wrap gap-2 rounded-full border border-[var(--d-line)] bg-[var(--d-bg)] p-1.5 sm:inline-flex"
        >
          {content.programs.map((p) => {
            const on = p.id === active;
            return (
              <button
                key={p.id}
                type="button"
                role="tab"
                aria-selected={on}
                aria-controls={`panel-${p.id}`}
                id={`tab-${p.id}`}
                onClick={() => setActive(p.id)}
                className={`relative rounded-full px-5 py-2.5 text-sm font-extrabold transition-colors ${
                  on ? "text-white" : "text-[var(--d-ink-soft)] hover:text-[var(--d-accent)]"
                }`}
              >
                {on && (
                  <motion.span
                    layoutId="program-pill"
                    className="absolute inset-0 rounded-full bg-[var(--d-accent)]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10 flex flex-col items-start leading-tight sm:items-center">
                  {p.tab}
                  <span className={`text-[0.68rem] font-bold ${on ? "text-white/80" : "text-[var(--d-ink-soft)]/70"}`}>
                    {p.ages}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            id={`panel-${active}`}
            role="tabpanel"
            aria-labelledby={`tab-${active}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]"
          >
            {/* image */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border-4 border-white shadow-[0_24px_50px_-24px_rgba(22,35,61,0.45)] lg:aspect-auto">
              <Image
                src={unsplash(IMG[active], 1000)}
                alt={program.imageAlt}
                fill
                sizes="(max-width: 1024px) 90vw, 500px"
                className="object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(160deg, rgba(37,99,235,0.14), rgba(22,35,61,0.32))" }}
                aria-hidden
              />
              <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3.5 py-1.5 text-xs font-extrabold text-[var(--d-accent-deep)]">
                {program.ages}
              </span>
            </div>

            {/* details */}
            <div className="rounded-[2rem] border border-[var(--d-line)] bg-[var(--d-bg)] p-6 sm:p-8">
              <h3 className="[font-family:var(--demo-display)] text-2xl font-extrabold tracking-tight text-[var(--d-ink)] sm:text-3xl">
                {program.title}
              </h3>
              <p className="mt-2.5 leading-relaxed text-[var(--d-ink-soft)]">{program.blurb}</p>

              <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.14em] text-[var(--d-ink-soft)]">
                {content.highlightsLabel}
              </p>
              <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                {program.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2.5 text-sm font-semibold text-[var(--d-ink)]">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--d-mint-soft)] text-[var(--d-mint-deep)]">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    {h}
                  </li>
                ))}
              </ul>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {facts.map((f) => (
                  <div key={f.label} className="rounded-2xl bg-white p-3.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[var(--d-accent-soft)] text-[var(--d-accent)]">
                      <f.icon className="h-[18px] w-[18px]" strokeWidth={2.2} />
                    </span>
                    <p className="mt-2 text-[0.68rem] font-extrabold uppercase tracking-wide text-[var(--d-ink-soft)]">
                      {f.label}
                    </p>
                    <p className="mt-0.5 text-sm font-extrabold leading-tight text-[var(--d-ink)]">{f.value}</p>
                    {f.note && <p className="mt-1 text-[0.7rem] font-semibold text-[var(--d-ink-soft)]">{f.note}</p>}
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => scrollToId("enroll")}
                className="group mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--d-ink)] px-5 py-3 text-sm font-extrabold text-white transition-transform hover:scale-[1.03]"
              >
                {content.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.4} />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
