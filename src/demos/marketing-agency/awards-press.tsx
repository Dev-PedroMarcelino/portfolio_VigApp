"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Trophy, Quote } from "lucide-react";
import type { AwardsContent } from "./content";
import { LoudTag } from "./ui";

export function AwardsPress({ content }: { content: AwardsContent }) {
  const reduce = useReducedMotion() ?? false;

  return (
    <section id="awards" className="border-b-2 border-[var(--d-ink)] bg-[var(--d-bg)] scroll-mt-16">
      <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <LoudTag>{content.label}</LoudTag>
          <h2 className="[font-family:var(--demo-display)] text-4xl leading-[0.9] tracking-tight text-[var(--d-ink)] md:text-7xl">
            {content.heading}
          </h2>
        </div>

        <ul className="mt-10 overflow-hidden border-2 border-[var(--d-ink)]">
          {content.awards.map((award, i) => (
            <motion.li
              key={award.name}
              initial={reduce ? undefined : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.4, delay: reduce ? 0 : i * 0.05 }}
              className={`group flex items-center gap-4 px-4 py-5 transition-colors hover:bg-[var(--d-accent)] md:gap-6 md:px-6 ${
                i > 0 ? "border-t-2 border-[var(--d-ink)]" : ""
              }`}
            >
              <Trophy
                className="h-5 w-5 shrink-0 text-[var(--d-ink)] transition-colors group-hover:text-[var(--d-accent-ink)] md:h-6 md:w-6"
                strokeWidth={2}
                aria-hidden
              />
              <span className="[font-family:var(--demo-display)] flex-1 text-xl uppercase leading-none tracking-tight text-[var(--d-ink)] transition-colors group-hover:text-[var(--d-accent-ink)] md:text-3xl">
                {award.name}
              </span>
              <span className="[font-family:var(--demo-body)] hidden text-xs font-bold uppercase tracking-[0.14em] text-[var(--d-ink)]/60 transition-colors group-hover:text-[var(--d-accent-ink)]/80 sm:block md:text-sm">
                {award.org}
              </span>
              <span className="[font-family:var(--demo-body)] w-10 text-right text-sm font-bold text-[var(--d-accent)] transition-colors group-hover:text-[var(--d-accent-ink)] md:w-14 md:text-lg">
                {award.count}
              </span>
              <span className="[font-family:var(--demo-body)] w-10 text-right text-xs font-bold tabular-nums text-[var(--d-ink)]/45 transition-colors group-hover:text-[var(--d-accent-ink)]/70 md:w-14 md:text-sm">
                {award.year}
              </span>
            </motion.li>
          ))}
        </ul>

        <p className="mt-14 [font-family:var(--demo-body)] text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[var(--d-ink)]/55">
          {content.pressLabel}
        </p>
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {content.press.map((item, i) => (
            <motion.figure
              key={item.source}
              initial={reduce ? undefined : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.45, delay: reduce ? 0 : i * 0.08 }}
              className="flex flex-col justify-between gap-6 border-2 border-[var(--d-ink)] bg-[var(--d-bg)] p-6 shadow-[6px_6px_0_0_var(--d-ink)]"
            >
              <Quote className="h-7 w-7 text-[var(--d-accent)]" strokeWidth={2.5} aria-hidden />
              <blockquote className="[font-family:var(--demo-display)] text-lg leading-tight tracking-tight text-[var(--d-ink)] md:text-xl">
                {item.quote}
              </blockquote>
              <figcaption className="[font-family:var(--demo-body)] text-xs font-bold uppercase tracking-[0.16em] text-[var(--d-ink)]/55">
                {item.source}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
