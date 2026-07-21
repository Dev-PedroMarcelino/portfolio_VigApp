"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { ManifestoContent } from "./content";
import { LoudTag } from "./ui";

export function Manifesto({ content }: { content: ManifestoContent }) {
  const reduce = useReducedMotion() ?? false;

  return (
    <section
      id="manifesto"
      className="border-b-2 border-[var(--d-ink)] bg-[var(--d-ink)] scroll-mt-16"
    >
      <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24">
        <div className="max-w-2xl">
          <LoudTag>{content.label}</LoudTag>
          <p className="mt-6 [font-family:var(--demo-body)] text-sm leading-relaxed text-[var(--d-accent-ink)]/70 md:text-base">
            {content.intro}
          </p>
        </div>

        <ul className="mt-12 flex flex-col gap-3 md:mt-16 md:gap-5">
          {content.lines.map((line, i) => (
            <li key={line.keep} className="flex flex-wrap items-baseline gap-x-4 gap-y-1 md:gap-x-8">
              {/* struck-out corporate word */}
              <span className="relative inline-block [font-family:var(--demo-display)] text-4xl uppercase leading-none tracking-tight text-[var(--d-accent-ink)]/35 md:text-7xl">
                {line.kill}
                <motion.span
                  aria-hidden
                  className="absolute left-0 top-1/2 h-[3px] origin-left bg-[var(--d-accent)] md:h-[6px]"
                  style={{ width: "100%" }}
                  initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ duration: 0.5, delay: reduce ? 0 : 0.1 + i * 0.04, ease: "easeInOut" }}
                />
              </span>

              <ArrowRight
                className="h-6 w-6 shrink-0 self-center text-[var(--d-accent-ink)]/40 md:h-9 md:w-9"
                strokeWidth={2.5}
                aria-hidden
              />

              {/* the loud replacement */}
              <motion.span
                className="[font-family:var(--demo-display)] text-4xl uppercase leading-none tracking-tight text-[var(--d-accent)] md:text-7xl"
                initial={reduce ? undefined : { opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.4, delay: reduce ? 0 : 0.25 + i * 0.04, ease: "easeOut" }}
              >
                {line.keep}
              </motion.span>
            </li>
          ))}
        </ul>

        <p className="mt-14 max-w-2xl border-t-2 border-[var(--d-accent-ink)]/25 pt-8 [font-family:var(--demo-display)] text-2xl uppercase leading-tight tracking-tight text-[var(--d-accent-ink)] md:text-4xl">
          {content.signoff}
        </p>
      </div>
    </section>
  );
}
