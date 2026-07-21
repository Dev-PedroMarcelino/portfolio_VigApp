"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { AureliaContent } from "./content";

const EASE_SLOW: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Heritage({ content }: { content: AureliaContent["heritage"] }) {
  const reduceMotion = useReducedMotion();

  return (
    <section id="heritage" className="relative overflow-hidden py-28 sm:py-36">
      <div className="mx-auto max-w-5xl px-6">
        <div className="max-w-2xl">
          <p className="text-[10px] font-medium uppercase tracking-[0.42em] text-[var(--d-gold)]">
            {content.eyebrow}
          </p>
          <h2 className="mt-6 [font-family:var(--demo-display)] text-4xl font-light text-[var(--d-ink)] sm:text-5xl lg:text-6xl">
            {content.title}
          </h2>
          <p className="mt-6 text-sm font-light leading-relaxed text-[var(--d-ink-soft)]">
            {content.intro}
          </p>
        </div>

        <ol className="relative mt-16">
          <div
            aria-hidden
            className="absolute left-[7px] top-2 bottom-2 w-px bg-[linear-gradient(180deg,transparent,var(--d-line),transparent)] sm:left-[calc(9rem+7px)]"
          />
          {content.chapters.map((chapter, index) => (
            <motion.li
              key={chapter.year}
              initial={reduceMotion ? false : { opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: index * 0.05, ease: EASE_SLOW }}
              className="relative flex flex-col gap-3 pb-14 pl-10 last:pb-0 sm:flex-row sm:gap-10 sm:pl-0"
            >
              <div className="flex items-center gap-4 sm:w-36 sm:shrink-0 sm:flex-col sm:items-end sm:gap-0 sm:pt-0.5 sm:text-right">
                <span className="[font-family:var(--demo-display)] text-3xl font-light text-[var(--d-gold-bright)]">
                  {chapter.year}
                </span>
              </div>

              <span
                aria-hidden
                className="absolute left-0 top-1.5 flex h-4 w-4 items-center justify-center rounded-full border border-[var(--d-gold)] bg-[var(--d-bg)] sm:left-[calc(9rem+0px)]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--d-gold-bright)]" />
              </span>

              <div className="sm:pl-8">
                <h3 className="[font-family:var(--demo-display)] text-2xl font-light italic text-[var(--d-ink)]">
                  {chapter.title}
                </h3>
                <p className="mt-3 max-w-xl text-sm font-light leading-relaxed text-[var(--d-ink-soft)]">
                  {chapter.body}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
