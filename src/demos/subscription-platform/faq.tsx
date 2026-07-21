"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { FaqContent } from "./content";
import { SectionLabel } from "./ui";

export function Faq({ content }: { content: FaqContent }) {
  const reduce = useReducedMotion() ?? false;
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-24 px-5 py-20 md:py-28">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <div className="flex justify-center">
            <SectionLabel text={content.label} />
          </div>
          <h2 className="mt-5 [font-family:var(--demo-display)] text-4xl tracking-tight md:text-5xl">
            {content.title}
          </h2>
        </div>

        <div className="mt-12 overflow-hidden rounded-[1.75rem] border border-[var(--d-line)] bg-[var(--d-card)] shadow-[0_24px_60px_-44px_rgba(55,39,26,0.6)]">
          {content.items.map((item, i) => {
            const open = openIdx === i;
            return (
              <div key={item.q} className={i > 0 ? "border-t border-[var(--d-line)]" : ""}>
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={`faq-panel-${i}`}
                  id={`faq-trigger-${i}`}
                  onClick={() => setOpenIdx(open ? null : i)}
                  className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left transition-colors hover:bg-[var(--d-peach)]/30 md:px-8"
                >
                  <span className="text-base font-extrabold leading-snug md:text-lg">{item.q}</span>
                  <motion.span
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={reduce ? { duration: 0 } : { duration: 0.25 }}
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                      open
                        ? "bg-[var(--d-accent)] text-[var(--d-bg)]"
                        : "bg-[var(--d-peach)] text-[var(--d-accent)]"
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" strokeWidth={2.4} aria-hidden />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      key="panel"
                      id={`faq-panel-${i}`}
                      role="region"
                      aria-labelledby={`faq-trigger-${i}`}
                      initial={reduce ? undefined : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduce ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-sm leading-[1.85] text-[var(--d-ink-soft)] md:px-8 md:text-base">
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
