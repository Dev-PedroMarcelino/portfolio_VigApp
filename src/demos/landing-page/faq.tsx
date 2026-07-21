"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import type { FaqContent } from "./content";
import { SectionHeading } from "./ui";

export function Faq({ content }: { content: FaqContent }) {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion() ?? false;

  return (
    <section className="relative scroll-mt-24 border-t border-[var(--d-line)] px-5 py-24 md:py-32">
      <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading label={content.label} title={content.title} intro={content.intro} align="left" />
        </div>

        <div className="divide-y divide-[var(--d-line)] border-y border-[var(--d-line)]">
          {content.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span
                      className={`text-[0.98rem] font-medium transition-colors ${
                        isOpen ? "text-[var(--d-ink)]" : "text-[var(--d-ink-dim)]"
                      }`}
                    >
                      {item.q}
                    </span>
                    <span
                      className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-[var(--d-line-bright)] text-[var(--d-accent)] transition-transform duration-300"
                      style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                      aria-hidden
                    >
                      <Plus className="h-4 w-4" strokeWidth={2} />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={reduce ? undefined : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduce ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-xl pb-6 text-sm leading-relaxed text-[var(--d-ink-dim)]">{item.a}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
