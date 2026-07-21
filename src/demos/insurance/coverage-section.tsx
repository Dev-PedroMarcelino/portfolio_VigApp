"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Briefcase, Car, Check, HeartPulse, Home, Minus } from "lucide-react";
import type { CoverageContent, ProductId, TierId } from "./content";
import { SectionLabel, scrollToId, useMoney } from "./ui";

const PRODUCT_ICONS: Record<ProductId, typeof Car> = {
  auto: Car,
  home: Home,
  life: HeartPulse,
  business: Briefcase,
};

export function CoverageSection({
  content,
  money,
}: {
  content: CoverageContent;
  money: { locale: string; currency: string };
}) {
  const [tier, setTier] = useState<TierId>("plus");
  const reduce = useReducedMotion() ?? false;
  const format = useMoney(money.locale, money.currency);

  return (
    <section id="coverage" className="scroll-mt-20 bg-[var(--d-paper)] px-5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-xl">
            <SectionLabel text={content.label} />
            <h2 className="mt-5 [font-family:var(--demo-display)] text-4xl font-extrabold tracking-tight text-[var(--d-ink)] md:text-5xl">
              {content.title}
            </h2>
            <p className="mt-4 leading-[1.85] text-[var(--d-ink-soft)]">{content.intro}</p>
          </div>

          <fieldset>
            <legend className="text-[0.64rem] font-bold uppercase tracking-[0.24em] text-[var(--d-ink-soft)]">
              {content.tierLegend}
            </legend>
            <div className="mt-2.5 flex rounded-full border border-[var(--d-line)] bg-[var(--d-bg)] p-1">
              {content.tiers.map((t) => {
                const selected = t.id === tier;
                return (
                  <button
                    key={t.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setTier(t.id)}
                    className={`relative rounded-full px-5 py-2.5 text-[0.76rem] font-bold transition-colors ${
                      selected ? "text-white" : "text-[var(--d-ink-soft)] hover:text-[var(--d-ink)]"
                    }`}
                  >
                    {selected && (
                      <motion.span
                        layoutId="tier-pill"
                        transition={
                          reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }
                        }
                        className="absolute inset-0 rounded-full bg-[var(--d-accent)]"
                        aria-hidden
                      />
                    )}
                    <span className="relative">{t.label}</span>
                  </button>
                );
              })}
            </div>
            <p className="mt-2 text-center text-[0.68rem] font-semibold text-[var(--d-accent)]">
              {content.tiers.find((t) => t.id === tier)?.note}
            </p>
          </fieldset>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {content.cards.map((card) => {
            const Icon = PRODUCT_ICONS[card.id];
            return (
              <article
                key={card.id}
                className="flex flex-col rounded-[1.5rem] border border-[var(--d-line)] bg-white p-6 shadow-[0_24px_50px_-38px_rgba(16,23,54,0.5)] transition-shadow hover:shadow-[0_30px_60px_-34px_rgba(29,78,216,0.45)]"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--d-accent-soft)] text-[var(--d-accent)]">
                    <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden />
                  </span>
                  <div>
                    <h3 className="[font-family:var(--demo-display)] text-[0.98rem] font-extrabold tracking-tight text-[var(--d-ink)]">
                      {card.name}
                    </h3>
                    <p className="text-[0.68rem] leading-snug text-[var(--d-ink-soft)]">{card.tagline}</p>
                  </div>
                </div>

                <motion.div
                  key={tier}
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="mt-5 flex grow flex-col"
                >
                  <p className="flex items-baseline gap-1 border-b border-[var(--d-line)] pb-4">
                    <span className="[font-family:var(--demo-display)] text-3xl font-extrabold tracking-tight text-[var(--d-ink)]">
                      {format.format(card.monthly[tier])}
                    </span>
                    <span className="text-xs font-semibold text-[var(--d-ink-soft)]">
                      {content.perMonthShort}
                    </span>
                  </p>

                  <ul className="mt-1 grow">
                    {card.features.map((f) => {
                      const v = f.values[tier];
                      const off = v === false;
                      return (
                        <li
                          key={f.label}
                          className="flex items-center justify-between gap-3 border-b border-[var(--d-line)]/60 py-2.5 last:border-0"
                        >
                          <span
                            className={`text-[0.78rem] leading-snug ${
                              off ? "text-[var(--d-ink-soft)]/55 line-through" : "text-[var(--d-ink)]"
                            }`}
                          >
                            {f.label}
                          </span>
                          {typeof v === "string" ? (
                            <span className="shrink-0 rounded-full bg-[var(--d-mist)] px-2 py-0.5 text-[0.64rem] font-bold text-[var(--d-accent)]">
                              {v}
                            </span>
                          ) : v ? (
                            <span className="shrink-0 text-[var(--d-accent)]">
                              <Check className="h-4 w-4" strokeWidth={2.6} aria-hidden />
                              <span className="sr-only">{content.includedLabel}</span>
                            </span>
                          ) : (
                            <span className="shrink-0 text-[var(--d-ink-soft)]/40">
                              <Minus className="h-4 w-4" strokeWidth={2.2} aria-hidden />
                              <span className="sr-only">{content.notIncludedLabel}</span>
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </motion.div>

                <a
                  href="#quote"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId("quote");
                  }}
                  className="mt-5 rounded-full border-2 border-[var(--d-accent)] py-2.5 text-center text-[0.7rem] font-bold uppercase tracking-[0.14em] text-[var(--d-accent)] transition-colors hover:bg-[var(--d-accent)] hover:text-white"
                >
                  {content.startCta}
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
