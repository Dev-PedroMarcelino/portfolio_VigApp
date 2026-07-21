"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import type { TestimonialsContent } from "./content";
import { SectionHeading } from "./ui";

export function TestimonialsSection({ content }: { content: TestimonialsContent }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const reduce = useReducedMotion() ?? false;
  const total = content.items.length;
  const item = content.items[index];

  const go = (next: number, dir: number) => {
    setDirection(dir);
    setIndex(((next % total) + total) % total);
  };

  return (
    <section
      id="stories"
      className="relative scroll-mt-20 overflow-hidden bg-[var(--d-teal-dark)] px-5 py-20 md:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/2 h-[30rem] w-[30rem] -translate-y-1/2 rounded-full opacity-60"
        style={{ background: "radial-gradient(circle, rgba(191,227,220,0.14) 0%, rgba(191,227,220,0) 70%)" }}
      />
      <div className="relative mx-auto max-w-4xl">
        <SectionHeading
          label={content.label}
          title={content.title}
          accent={content.accent}
          tone="light"
          align="center"
        />

        <div className="mt-12 flex flex-col items-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--d-glow)]/15 text-[var(--d-glow)]">
            <Quote className="h-5 w-5" strokeWidth={1.8} aria-hidden />
          </span>

          <div className="relative mt-8 min-h-[13rem] w-full sm:min-h-[10rem]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.blockquote
                key={index}
                initial={reduce ? undefined : { opacity: 0, x: 36 * direction }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? undefined : { opacity: 0, x: -36 * direction }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="text-center"
              >
                <p className="mx-auto max-w-2xl [font-family:var(--demo-display)] text-2xl italic leading-[1.5] tracking-tight text-[var(--d-foam)] md:text-[1.7rem]">
                  {item.quote}
                </p>
                <footer className="mt-6">
                  <p className="text-sm font-bold text-[var(--d-glow)]">{item.name}</p>
                  <p className="mt-0.5 text-[0.74rem] text-[var(--d-foam-dim)]">{item.meta}</p>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex items-center gap-5">
            <button
              type="button"
              aria-label={content.prevLabel}
              onClick={() => go(index - 1, -1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--d-foam)]/25 text-[var(--d-foam)] transition-colors hover:bg-[var(--d-foam)]/10"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={2} aria-hidden />
            </button>
            <div className="flex items-center gap-2">
              {content.items.map((entry, dot) => (
                <button
                  key={entry.name}
                  type="button"
                  aria-label={`${content.goTo} ${dot + 1}`}
                  aria-pressed={dot === index}
                  onClick={() => go(dot, dot > index ? 1 : -1)}
                  className={`h-2 rounded-full transition-all ${
                    dot === index ? "w-7 bg-[var(--d-glow)]" : "w-2 bg-[var(--d-foam)]/30 hover:bg-[var(--d-foam)]/50"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              aria-label={content.nextLabel}
              onClick={() => go(index + 1, 1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--d-foam)]/25 text-[var(--d-foam)] transition-colors hover:bg-[var(--d-foam)]/10"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={2} aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
