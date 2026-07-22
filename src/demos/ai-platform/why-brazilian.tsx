"use client";

import { motion } from "framer-motion";
import { useReducedMotionSafe as useReducedMotion } from "@/components/demos/use-reduced-motion-safe";
import { X, Check } from "lucide-react";
import type { IaraContent } from "./content";
import { SectionLabel } from "./ui";

/**
 * Editorial two-column comparison — generic AI vs IARA — set as three large
 * typographic rows, not cards. The input phrase is the headline of each row.
 */
export function WhyBrazilian({ content }: { content: IaraContent["why"] }) {
  const reduced = useReducedMotion() ?? false;
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section id="por-que" className="relative scroll-mt-24 bg-[var(--d-surface)] py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-2xl">
          <SectionLabel text={content.label} />
          <h2 className="mt-5 text-4xl font-extrabold leading-[1.02] tracking-tight text-[var(--d-ink)] [font-family:var(--demo-display)] sm:text-5xl">
            {content.title}
          </h2>
          <p className="mt-5 text-[0.95rem] leading-relaxed text-[var(--d-ink-soft)]">
            {content.intro}
          </p>
        </div>

        <div className="mt-16 sm:mt-20">
          {content.items.map((item, i) => (
            <motion.article
              key={item.id}
              initial={reduced ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease }}
              className="border-t border-[var(--d-line)] py-12 first:border-t-0 sm:py-14"
            >
              <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
                {/* Left: the input, treated as an oversized quote */}
                <div>
                  <p className="text-[0.64rem] font-medium uppercase tracking-[0.3em] text-[var(--d-ink-faint)] [font-family:var(--demo-mono)]">
                    {String(i + 1).padStart(2, "0")} · {item.kicker}
                  </p>
                  <p className="mt-4 text-[1.6rem] font-bold leading-snug tracking-tight text-[var(--d-ink)] [font-family:var(--demo-display)] sm:text-[2rem]">
                    {item.input}
                  </p>
                  <p className="mt-3 text-[0.66rem] uppercase tracking-[0.24em] text-[var(--d-ink-faint)] [font-family:var(--demo-mono)]">
                    {content.inputLabel}
                  </p>
                </div>

                {/* Right: two readings, side by side */}
                <div className="grid gap-8 sm:grid-cols-2 sm:gap-10">
                  <div className="relative pl-5">
                    <span aria-hidden className="absolute inset-y-1 left-0 w-px bg-[var(--d-line)]" />
                    <p className="flex items-center gap-2 text-[0.66rem] font-medium uppercase tracking-[0.24em] text-[var(--d-ink-faint)] [font-family:var(--demo-mono)]">
                      <X className="h-3.5 w-3.5" strokeWidth={2.4} aria-hidden />
                      {content.genericLabel}
                    </p>
                    <p className="mt-3 text-[0.9rem] leading-relaxed text-[var(--d-ink-faint)]">
                      {item.generic}
                    </p>
                  </div>
                  <div className="relative pl-5">
                    <span
                      aria-hidden
                      className="absolute inset-y-1 left-0 w-[2px] rounded-full bg-gradient-to-b from-[var(--d-teal)] to-[var(--d-cyan)] shadow-[0_0_12px_rgba(45,212,191,0.5)]"
                    />
                    <p className="flex items-center gap-2 text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-[var(--d-teal)] [font-family:var(--demo-mono)]">
                      <Check className="h-3.5 w-3.5" strokeWidth={2.6} aria-hidden />
                      {content.iaraLabel}
                    </p>
                    <p className="mt-3 text-[0.9rem] leading-relaxed text-[var(--d-ink)]">
                      {item.iara}
                    </p>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
