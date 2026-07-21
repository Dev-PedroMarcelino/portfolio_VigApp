"use client";

import { motion, useReducedMotion } from "framer-motion";
import { HeartHandshake, LifeBuoy, PenLine, Quote, Wind } from "lucide-react";
import type { TravelContent } from "./content";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const ICONS = {
  designer: PenLine,
  local: HeartHandshake,
  pace: Wind,
  care: LifeBuoy,
} as const;

export function TailorMade({ content }: { content: TravelContent["tailor"] }) {
  const reduce = useReducedMotion();

  return (
    <section id="tailor" className="relative bg-[var(--d-surface)] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <header className="lg:sticky lg:top-24">
            <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--d-peach)]">
              {content.eyebrow}
            </span>
            <h2 className="mt-4 [font-family:var(--demo-display)] text-[clamp(2rem,4.4vw,3.4rem)] font-light leading-[1.0] tracking-tight text-[var(--d-ink)]">
              {content.title}
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-[var(--d-ink-soft)] sm:text-base">
              {content.intro}
            </p>

            <figure className="mt-9 rounded-[22px] border border-[var(--d-line)] bg-[var(--d-deep)] p-6">
              <Quote className="h-6 w-6 text-[var(--d-peach)]" strokeWidth={1.5} aria-hidden />
              <blockquote className="mt-3 [font-family:var(--demo-display)] text-xl font-normal italic leading-relaxed text-[var(--d-ink)]">
                {content.quote}
              </blockquote>
              <figcaption className="mt-4 text-sm text-[var(--d-ink-soft)]">
                <span className="font-semibold text-[var(--d-peach)]">{content.quoteAuthor}</span>
                <span className="text-[var(--d-ink-faint)]"> — {content.quoteRole}</span>
              </figcaption>
            </figure>
          </header>

          <ul className="grid gap-5 sm:grid-cols-2">
            {content.pillars.map((p, i) => {
              const Icon = ICONS[p.id as keyof typeof ICONS] ?? PenLine;
              return (
                <motion.li
                  key={p.id}
                  initial={{ opacity: 0, y: reduce ? 0 : 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: reduce ? 0 : i * 0.08, ease: EASE }}
                  className="flex flex-col rounded-[20px] border border-[var(--d-line-soft)] bg-[var(--d-raised)] p-6"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--d-line)] text-[var(--d-peach)]">
                    <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
                  </span>
                  <h3 className="mt-5 [font-family:var(--demo-display)] text-xl font-normal text-[var(--d-ink)]">
                    {p.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[var(--d-ink-soft)]">{p.body}</p>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
