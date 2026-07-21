"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Clock3, ShieldCheck } from "lucide-react";
import type { TreatmentsContent, TreatmentTabId } from "./content";
import { Gloss, Section, SectionLabel } from "./ui";

export function TreatmentsSection({ content }: { content: TreatmentsContent }) {
  const [activeId, setActiveId] = useState<TreatmentTabId>("essential");
  const reduce = useReducedMotion();
  const active = content.tabs.find((tab) => tab.id === activeId) ?? content.tabs[0];

  return (
    <Section id="treatments" className="bg-[var(--d-mist)]">
      <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
        <div className="max-w-xl">
          <SectionLabel text={content.label} />
          <h2 className="mt-5 [font-family:var(--demo-display)] text-3xl font-bold tracking-tight text-[var(--d-ink)] sm:text-5xl">
            {content.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--d-ink-soft)]">{content.intro}</p>
        </div>

        <div role="tablist" aria-label={content.label} className="flex rounded-full border border-[var(--d-line)] bg-white p-1.5 shadow-[0_16px_36px_-24px_rgba(19,74,120,0.4)]">
          {content.tabs.map((tab) => {
            const selected = tab.id === activeId;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActiveId(tab.id)}
                className={`relative rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                  selected ? "text-white" : "text-[var(--d-ink-soft)] hover:text-[var(--d-accent-deep)]"
                }`}
              >
                {selected && (
                  <motion.span
                    layoutId="treatment-tab-pill"
                    transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-[var(--d-accent)]"
                    aria-hidden
                  />
                )}
                <span className="relative">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          role="tabpanel"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mt-10 text-sm font-medium text-[var(--d-accent-deep)]">{active.tagline}</p>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {active.treatments.map((treatment) => (
              <article
                key={treatment.name}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-[var(--d-line)] bg-white p-6 shadow-[0_24px_50px_-32px_rgba(19,74,120,0.45)] transition-transform duration-300 hover:-translate-y-1.5"
              >
                <Gloss className="opacity-70" />
                {treatment.flag && (
                  <span className="absolute right-4 top-4 rounded-full bg-gradient-to-r from-[var(--d-accent)] to-[var(--d-aqua)] px-3 py-1 text-[0.6rem] font-bold uppercase tracking-widest text-white">
                    {treatment.flag}
                  </span>
                )}
                <h3 className="relative max-w-[11rem] [font-family:var(--demo-display)] text-lg font-bold leading-snug text-[var(--d-ink)]">
                  {treatment.name}
                </h3>
                <p className="relative mt-3 flex-none text-sm leading-relaxed text-[var(--d-ink-soft)]">
                  {treatment.description}
                </p>

                <div className="relative mt-5 border-t border-dashed border-[var(--d-line)] pt-5">
                  <p className="[font-family:var(--demo-display)] text-3xl font-bold tracking-tight text-[var(--d-accent-deep)]">
                    {treatment.price}
                  </p>
                  <p className="mt-1 text-xs text-[var(--d-ink-soft)]">{treatment.priceNote}</p>
                </div>

                <span className="relative mt-4 inline-flex w-max items-center gap-1.5 rounded-full bg-[var(--d-bg)] px-3 py-1.5 text-xs font-semibold text-[var(--d-accent-deep)]">
                  <Clock3 className="h-3.5 w-3.5" strokeWidth={2.2} />
                  {treatment.duration}
                </span>

                <ul className="relative mt-5 flex flex-1 flex-col gap-2.5">
                  {treatment.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-xs leading-relaxed text-[var(--d-ink-soft)]">
                      <span className="mt-0.5 grid h-4 w-4 flex-none place-items-center rounded-full bg-[var(--d-bg)] text-[var(--d-accent)]">
                        <Check className="h-2.5 w-2.5" strokeWidth={3} />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-10 flex flex-col items-start gap-4 rounded-3xl border border-[var(--d-line)] bg-white/70 p-6 backdrop-blur sm:flex-row sm:items-center">
        <span className="inline-flex flex-none items-center gap-2 rounded-full bg-[var(--d-bg)] px-4 py-2 text-xs font-bold uppercase tracking-widest text-[var(--d-accent-deep)]">
          <ShieldCheck className="h-4 w-4" strokeWidth={2.2} />
          {content.badge}
        </span>
        <p className="text-sm leading-relaxed text-[var(--d-ink-soft)]">{content.footnote}</p>
      </div>
    </Section>
  );
}
