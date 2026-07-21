"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MessageCircle, Plus } from "lucide-react";
import type { FaqContent } from "./content";
import { Section, SectionLabel, scrollToId } from "./ui";

export function FaqSection({ content }: { content: FaqContent }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <Section id="faq" className="bg-[var(--d-mist)]">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <SectionLabel text={content.label} />
          <h2 className="mt-5 [font-family:var(--demo-display)] text-3xl font-bold tracking-tight text-[var(--d-ink)] sm:text-5xl">
            {content.title}
          </h2>

          <div className="relative mt-10 overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--d-accent)] to-[var(--d-aqua)] p-8 text-white shadow-[0_30px_60px_-30px_rgba(46,124,192,0.8)]">
            <span
              aria-hidden
              className="absolute -right-10 -top-14 h-40 w-40 rounded-[58%_42%_55%_45%/55%_48%_52%_45%] bg-white/15"
            />
            <h3 className="[font-family:var(--demo-display)] text-xl font-bold">{content.contactTitle}</h3>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/85">{content.contactBody}</p>
            <button
              type="button"
              onClick={() => scrollToId("appointment")}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[var(--d-accent-deep)] transition-transform hover:scale-[1.03]"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={2.2} />
              {content.contactCta}
            </button>
          </div>
        </div>

        <ul className="flex flex-col gap-3">
          {content.items.map((item, index) => {
            const open = openIndex === index;
            return (
              <li
                key={item.q}
                className={`overflow-hidden rounded-3xl border transition-colors ${
                  open ? "border-[var(--d-accent)]/40 bg-white" : "border-[var(--d-line)] bg-white/70"
                }`}
              >
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setOpenIndex(open ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="[font-family:var(--demo-display)] text-base font-bold text-[var(--d-ink)]">
                    {item.q}
                  </span>
                  <motion.span
                    animate={{ rotate: open ? 45 : 0 }}
                    transition={reduce ? { duration: 0 } : { duration: 0.25 }}
                    className={`grid h-8 w-8 flex-none place-items-center rounded-full ${
                      open ? "bg-[var(--d-accent)] text-white" : "bg-[var(--d-bg)] text-[var(--d-accent-deep)]"
                    }`}
                    aria-hidden
                  >
                    <Plus className="h-4 w-4" strokeWidth={2.4} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      key="answer"
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduce ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-sm leading-relaxed text-[var(--d-ink-soft)]">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
