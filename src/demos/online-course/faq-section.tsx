"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import type { FaqContent } from "./content";
import { SectionLabel } from "./ui";

export function FaqSection({ content }: { content: FaqContent }) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<number>(0);

  return (
    <section className="relative bg-[var(--d-cream)] py-20 lg:py-28" style={{ backgroundColor: "#F6F0E6" }}>
      <div className="mx-auto grid max-w-5xl gap-12 px-5 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <SectionLabel text={content.label} />
          <h2 className="mt-5 [font-family:var(--demo-display)] text-4xl font-light leading-[1.05] tracking-[-0.01em] text-[var(--d-ink)] sm:text-5xl">
            {content.heading} <span className="italic text-[var(--d-accent)]">{content.headingItalic}</span>
          </h2>
        </div>

        <div className="flex flex-col divide-y divide-[var(--d-line)] border-y border-[var(--d-line)]">
          {content.items.map((item, i) => {
            const active = open === i;
            return (
              <div key={item.question}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={active}
                    onClick={() => setOpen(active ? -1 : i)}
                    className="flex w-full items-center gap-4 py-6 text-left"
                  >
                    <span className="flex-1 [font-family:var(--demo-display)] text-[1.2rem] font-medium leading-snug text-[var(--d-ink)]">
                      {item.question}
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all ${
                        active
                          ? "rotate-45 border-[var(--d-accent)] bg-[var(--d-accent)] text-[var(--d-charcoal)]"
                          : "border-[var(--d-line)] text-[var(--d-ink)]"
                      }`}
                    >
                      <Plus className="h-4 w-4" strokeWidth={2} />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {active && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: reduce ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-6 text-[0.95rem] leading-relaxed text-[var(--d-ink-soft)]">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
