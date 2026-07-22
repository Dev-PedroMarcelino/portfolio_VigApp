"use client";

import { Award, BadgeCheck, Quote, ShieldCheck, Star } from "lucide-react";
import type { BarcellosContent } from "./content";
import { Reveal, SectionLabel } from "./ui";

const SEAL_ICONS = {
  award: Award,
  shield: ShieldCheck,
  badge: BadgeCheck,
} as const;

export function TestimonialsSection({ content }: { content: BarcellosContent["testimonials"] }) {
  return (
    <section id="depoimentos" className="relative scroll-mt-24 py-20 sm:py-24">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--d-line)] to-transparent"
      />

      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <SectionLabel text={content.label} />
          <h2 className="mt-4 max-w-2xl text-[1.8rem] font-semibold leading-tight tracking-tight text-[var(--d-ink)] [font-family:var(--demo-display)] sm:text-[2.3rem]">
            {content.title}
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {content.items.map((t, i) => (
            <Reveal key={t.name} delay={0.08 * i} className="h-full">
              <figure className="relative flex h-full flex-col rounded-3xl border border-[var(--d-line)] bg-[var(--d-surface)] p-7 transition-colors duration-500 hover:border-[var(--d-gold)]/30">
                <Quote aria-hidden className="h-6 w-6 text-[var(--d-gold)]/60" strokeWidth={1.6} />
                <blockquote className="mt-4 flex-1 text-[0.92rem] leading-relaxed text-[var(--d-silver)]">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3.5 border-t border-[var(--d-line)] pt-5">
                  <span
                    aria-hidden
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[var(--d-gold)]/35 bg-[var(--d-gold)]/[0.08] text-[0.8rem] font-semibold text-[var(--d-gold)] [font-family:var(--demo-display)]"
                  >
                    {t.name
                      .split(" ")
                      .map((p) => p[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-[0.88rem] font-semibold text-[var(--d-ink)]">{t.name}</span>
                    <span className="mt-0.5 block truncate text-[0.72rem] text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]">
                      {t.car}
                    </span>
                  </span>
                  <span className="ml-auto flex shrink-0 gap-0.5" aria-label="5/5">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} aria-hidden className="h-3 w-3 fill-[var(--d-gold)] text-[var(--d-gold)]" />
                    ))}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        {/* Seals */}
        <Reveal delay={0.1}>
          <div className="mt-12 rounded-3xl border border-[var(--d-line)] bg-gradient-to-r from-[var(--d-surface)] via-[#15130D] to-[var(--d-surface)] px-6 py-8 sm:px-10">
            <p className="text-center text-[0.64rem] uppercase tracking-[0.3em] text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]">
              {content.sealsLabel}
            </p>
            <ul className="mt-6 grid gap-6 sm:grid-cols-3">
              {content.seals.map((seal) => {
                const Icon = SEAL_ICONS[seal.icon];
                return (
                  <li key={seal.title} className="flex items-center gap-4 sm:flex-col sm:text-center">
                    <span className="grid h-13 w-13 shrink-0 place-items-center rounded-full border border-[var(--d-gold)]/35 bg-[var(--d-gold)]/[0.07] shadow-[0_0_28px_rgba(217,164,65,0.15)]">
                      <Icon className="h-6 w-6 text-[var(--d-gold)]" strokeWidth={1.5} aria-hidden />
                    </span>
                    <span>
                      <span className="block text-[0.92rem] font-semibold text-[var(--d-ink)] [font-family:var(--demo-display)]">
                        {seal.title}
                      </span>
                      <span className="mt-1 block text-[0.74rem] leading-relaxed text-[var(--d-ink-soft)]">
                        {seal.sub}
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
