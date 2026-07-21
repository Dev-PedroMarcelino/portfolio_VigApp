"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Bike, Clock, Wallet, ShieldCheck, ArrowRight } from "lucide-react";
import type { PratoContent } from "./content";
import { Eyebrow } from "./ui";

const CARD_ICONS = [Clock, Wallet, ShieldCheck];

export function CourierBand({ content }: { content: PratoContent["courier"] }) {
  const reduce = useReducedMotion();

  return (
    <section id="partners" className="relative overflow-hidden bg-[var(--d-lime)] py-16 lg:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 top-8 h-72 w-72 rounded-full bg-[var(--d-ink)] opacity-[0.06] blur-2xl"
      />
      <div className="relative z-[2] mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <h2 className="mt-4 [font-family:var(--demo-display)] text-3xl font-bold tracking-tight text-[var(--d-ink)] sm:text-4xl">
              {content.title}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[var(--d-ink)]/75">
              {content.intro}
            </p>
          </div>
          <a
            href="#top"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[var(--d-ink)] px-6 py-3.5 text-sm font-bold text-white transition-transform hover:scale-105"
          >
            <Bike className="h-4 w-4" strokeWidth={2.2} aria-hidden />
            {content.cta}
            <ArrowRight className="h-4 w-4" strokeWidth={2.4} aria-hidden />
          </a>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {content.cards.map((card, i) => {
            const Icon = CARD_ICONS[i];
            return (
              <motion.article
                key={card.title}
                initial={reduce ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="flex flex-col rounded-3xl border border-[var(--d-ink)]/12 bg-[var(--d-bg)] p-6"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--d-ink)] text-[var(--d-lime)]">
                  <Icon className="h-5 w-5" strokeWidth={2.2} aria-hidden />
                </span>
                <h3 className="mt-4 [font-family:var(--demo-display)] text-lg font-bold text-[var(--d-ink)]">
                  {card.title}
                </h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-[var(--d-ink-soft)]">
                  {card.body}
                </p>
                <div className="mt-5 flex items-baseline gap-2 border-t border-[var(--d-line)] pt-4">
                  <span className="[font-family:var(--demo-display)] text-2xl font-bold text-[var(--d-accent)]">
                    {card.stat}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wide text-[var(--d-ink-soft)]">
                    {card.statLabel}
                  </span>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
