"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus, ArrowRight } from "lucide-react";
import type { LawContent } from "./content";
import { EngravedRule } from "./castellan-reis";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function PracticeAreas({ content }: { content: LawContent["practice"] }) {
  const reduce = useReducedMotion();
  const [openId, setOpenId] = useState<string | null>(content.areas[0]?.id ?? null);

  return (
    <section id="practice" className="relative bg-[var(--d-cream)] py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.4fr] lg:gap-16">
          <header className="lg:sticky lg:top-28 lg:self-start">
            <EngravedRule tone="paper" />
            <p className="mt-5 text-[10px] font-medium uppercase tracking-[0.4em] text-[var(--d-bronze)]">
              {content.eyebrow}
            </p>
            <h2 className="[font-family:var(--demo-display)] mt-5 text-4xl font-normal leading-tight text-[var(--d-paper-ink)] sm:text-5xl">
              {content.title}
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-[var(--d-paper-soft)]">
              {content.intro}
            </p>
          </header>

          <ol className="border-t border-[var(--d-paper-bronze-line)]">
            {content.areas.map((area) => {
              const open = openId === area.id;
              return (
                <li key={area.id} className="border-b border-[var(--d-paper-bronze-line)]">
                  <h3>
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-label={content.expandAria}
                      onClick={() => setOpenId(open ? null : area.id)}
                      className="group flex w-full items-start gap-5 py-7 text-left"
                    >
                      <span className="[font-family:var(--demo-display)] mt-0.5 w-10 shrink-0 text-2xl font-normal text-[var(--d-bronze)]">
                        {area.numeral}
                      </span>
                      <span className="flex-1">
                        <span
                          className={`[font-family:var(--demo-display)] block text-xl font-normal leading-snug transition-colors duration-300 sm:text-2xl ${
                            open ? "text-[var(--d-bronze)]" : "text-[var(--d-paper-ink)] group-hover:text-[var(--d-bronze)]"
                          }`}
                        >
                          {area.name}
                        </span>
                        {!open && (
                          <span className="mt-1.5 block text-sm leading-relaxed text-[var(--d-paper-soft)]">
                            {area.summary}
                          </span>
                        )}
                      </span>
                      <span
                        className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                          open
                            ? "rotate-45 border-[var(--d-bronze)] bg-[var(--d-bronze)] text-[var(--d-cream)]"
                            : "border-[var(--d-paper-bronze-line)] text-[var(--d-bronze)] group-hover:border-[var(--d-bronze)]"
                        }`}
                      >
                        <Plus aria-hidden className="h-4 w-4" strokeWidth={1.6} />
                      </span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        key="body"
                        initial={reduce ? undefined : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={reduce ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <div className="pb-8 pl-[3.75rem] pr-2">
                          <p className="max-w-xl text-sm leading-relaxed text-[var(--d-paper-soft)]">
                            {area.summary}
                          </p>
                          <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--d-bronze)]">
                            {content.servicesLabel}
                          </p>
                          <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                            {area.services.map((service) => (
                              <li
                                key={service}
                                className="flex items-start gap-3 text-sm leading-snug text-[var(--d-paper-ink)]"
                              >
                                <ArrowRight
                                  aria-hidden
                                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--d-bronze)]"
                                  strokeWidth={1.6}
                                />
                                {service}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
