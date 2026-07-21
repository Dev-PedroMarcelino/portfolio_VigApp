"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import type { FaqContent } from "./content";
import { SectionLabel } from "./ui";

export function FaqSection({ content }: { content: FaqContent }) {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion() ?? false;

  return (
    <section id="faq" className="scroll-mt-20 bg-[var(--d-bg)] px-5 py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <SectionLabel text={content.label} />
          <h2 className="mt-5 [font-family:var(--demo-display)] text-4xl font-extrabold tracking-tight text-[var(--d-ink)] md:text-5xl">
            {content.title}
          </h2>
          <p className="mt-4 max-w-sm leading-[1.85] text-[var(--d-ink-soft)]">{content.intro}</p>
        </div>

        <div>
          {content.items.map((item, i) => {
            const expanded = open === i;
            return (
              <div
                key={item.q}
                className={`mb-3 overflow-hidden rounded-[1.25rem] border transition-colors ${
                  expanded
                    ? "border-[var(--d-accent)]/35 bg-white shadow-[0_22px_46px_-36px_rgba(29,78,216,0.5)]"
                    : "border-[var(--d-line)] bg-white/70"
                }`}
              >
                <button
                  type="button"
                  aria-expanded={expanded}
                  onClick={() => setOpen(expanded ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="[font-family:var(--demo-display)] text-[0.98rem] font-extrabold tracking-tight text-[var(--d-ink)]">
                    {item.q}
                  </span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all ${
                      expanded
                        ? "rotate-45 bg-[var(--d-accent)] text-white"
                        : "bg-[var(--d-mist)] text-[var(--d-accent)]"
                    }`}
                    aria-hidden
                  >
                    <Plus className="h-4 w-4" strokeWidth={2.4} />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {expanded && (
                    <motion.div
                      initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                      exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p className="border-t border-[var(--d-line)]/70 px-5 pb-5 pt-4 text-sm leading-[1.85] text-[var(--d-ink-soft)]">
                        {item.a}
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
