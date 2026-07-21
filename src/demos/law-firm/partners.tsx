"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Award, Scale, MapPin } from "lucide-react";
import type { LawContent } from "./content";
import { EngravedRule } from "./castellan-reis";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Partners({ content }: { content: LawContent["partners"] }) {
  const reduce = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const active = content.partners[activeIndex];

  return (
    <section id="partners" className="relative bg-[var(--d-navy)] py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <header className="max-w-2xl">
          <EngravedRule />
          <p className="mt-5 text-[10px] font-medium uppercase tracking-[0.4em] text-[var(--d-bronze-bright)]">
            {content.eyebrow}
          </p>
          <h2 className="[font-family:var(--demo-display)] mt-5 text-4xl font-normal leading-tight text-[var(--d-ink)] sm:text-5xl">
            {content.title}
          </h2>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-[var(--d-ink-soft)]">
            {content.intro}
          </p>
        </header>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.35fr] lg:gap-12">
          {/* Selector list */}
          <div role="tablist" aria-label={content.title} className="flex flex-col">
            {content.partners.map((partner, index) => {
              const selected = index === activeIndex;
              return (
                <button
                  key={partner.id}
                  role="tab"
                  aria-selected={selected}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`group flex items-center gap-5 border-b border-[var(--d-line-soft)] py-5 text-left transition-colors duration-300 ${
                    selected ? "" : "hover:bg-white/[0.02]"
                  }`}
                >
                  <span
                    className={`[font-family:var(--demo-display)] flex h-14 w-14 shrink-0 items-center justify-center border text-lg font-bold tracking-[0.04em] transition-colors duration-300 ${
                      selected
                        ? "border-[var(--d-bronze)] bg-[var(--d-bronze)] text-[var(--d-navy-deep)]"
                        : "border-[var(--d-line)] text-[var(--d-bronze-bright)] group-hover:border-[var(--d-bronze)]"
                    }`}
                  >
                    {partner.initials}
                  </span>
                  <span className="flex-1">
                    <span
                      className={`[font-family:var(--demo-display)] block text-lg font-normal transition-colors duration-300 ${
                        selected ? "text-[var(--d-bronze-bright)]" : "text-[var(--d-ink)] group-hover:text-[var(--d-bronze-bright)]"
                      }`}
                    >
                      {partner.name}
                    </span>
                    <span className="mt-1 block text-[10px] uppercase tracking-[0.22em] text-[var(--d-ink-faint)]">
                      {partner.role}
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className={`h-8 w-px transition-colors duration-300 ${
                      selected ? "bg-[var(--d-bronze)]" : "bg-transparent"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Detail panel */}
          <AnimatePresence mode="wait">
            <motion.article
              key={active.id}
              initial={reduce ? undefined : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="relative border border-[var(--d-line-soft)] bg-[var(--d-navy-soft)] p-8 sm:p-10"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute right-6 top-4 select-none [font-family:var(--demo-display)] text-[7rem] font-bold leading-none text-[var(--d-bronze)] opacity-[0.08]"
              >
                {active.initials}
              </span>

              <div className="relative flex items-center gap-5">
                <span className="[font-family:var(--demo-display)] flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-[var(--d-bronze)] text-2xl font-bold tracking-[0.04em] text-[var(--d-bronze-bright)]">
                  {active.initials}
                </span>
                <div>
                  <h3 className="[font-family:var(--demo-display)] text-2xl font-normal text-[var(--d-ink)]">
                    {active.name}
                  </h3>
                  <p className="mt-1.5 text-[10px] uppercase tracking-[0.26em] text-[var(--d-bronze-bright)]">
                    {active.role}
                  </p>
                </div>
              </div>

              <dl className="relative mt-9 space-y-6 border-t border-[var(--d-line-soft)] pt-8">
                <div className="flex gap-4">
                  <Scale aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-[var(--d-bronze)]" strokeWidth={1.4} />
                  <div>
                    <dt className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[var(--d-ink-faint)]">
                      {content.focusLabel}
                    </dt>
                    <dd className="mt-1.5 text-sm leading-relaxed text-[var(--d-ink)]">{active.focus}</dd>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Award aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-[var(--d-bronze)]" strokeWidth={1.4} />
                  <div>
                    <dt className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[var(--d-ink-faint)]">
                      {content.credentialsLabel}
                    </dt>
                    <dd className="mt-2">
                      <ul className="space-y-2">
                        {active.credentials.map((credential) => (
                          <li
                            key={credential}
                            className="flex items-start gap-2.5 text-sm leading-snug text-[var(--d-ink-soft)]"
                          >
                            <span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rotate-45 bg-[var(--d-bronze)]" />
                            {credential}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                </div>

                <div className="flex gap-4">
                  <MapPin aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-[var(--d-bronze)]" strokeWidth={1.4} />
                  <div>
                    <dt className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[var(--d-ink-faint)]">
                      {content.barLabel}
                    </dt>
                    <dd className="mt-1.5 text-sm text-[var(--d-ink)]">{active.bar}</dd>
                  </div>
                </div>
              </dl>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
