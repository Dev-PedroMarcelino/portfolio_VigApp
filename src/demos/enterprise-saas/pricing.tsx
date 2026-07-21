"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import type { PricingContent } from "./content";
import { Glow, SectionHeading, scrollToId } from "./ui";

type Period = "monthly" | "annual";

export function Pricing({ content }: { content: PricingContent }) {
  const reduce = useReducedMotion();
  const [period, setPeriod] = useState<Period>("annual");

  return (
    <section id="pricing" className="relative scroll-mt-20 py-24">
      <Glow className="left-1/2 top-10 h-80 w-[40rem] -translate-x-1/2" />
      <div className="relative mx-auto max-w-6xl px-5">
        <SectionHeading label={content.label} title={content.title} intro={content.intro} />

        {/* Billing period toggle */}
        <div className="mt-10 flex items-center justify-center gap-3">
          <div className="flex items-center gap-1 rounded-full border border-[var(--d-line)] bg-[var(--d-panel)] p-1 backdrop-blur">
            {(["monthly", "annual"] as const).map((p) => (
              <button
                key={p}
                type="button"
                aria-pressed={period === p}
                onClick={() => setPeriod(p)}
                className={`relative rounded-full px-5 py-2 text-[0.8rem] font-medium transition-colors ${
                  period === p ? "text-[var(--d-accent-ink)]" : "text-[var(--d-ink-soft)] hover:text-[var(--d-ink)]"
                }`}
              >
                {period === p && (
                  <motion.span
                    layoutId="pricing-period-pill"
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                    className="absolute inset-0 rounded-full bg-[var(--d-accent)]"
                    aria-hidden
                  />
                )}
                <span className="relative z-10">{p === "monthly" ? content.monthly : content.annual}</span>
              </button>
            ))}
          </div>
          <span className="rounded-full border border-[#34D399]/40 bg-[rgba(52,211,153,0.1)] px-3 py-1 text-[0.66rem] font-semibold text-[#6EE7B7]">
            {content.saveBadge}
          </span>
        </div>

        {/* Tiers */}
        <div className="mt-12 grid items-stretch gap-5 lg:grid-cols-3">
          {content.tiers.map((tier, i) => {
            const price = tier.customLabel ?? (period === "annual" ? tier.priceAnnual : tier.priceMonthly);
            const isCustom = Boolean(tier.customLabel);
            return (
              <motion.article
                key={tier.id}
                initial={reduce ? false : { opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.09 }}
                className={`relative flex flex-col rounded-3xl border p-7 backdrop-blur ${
                  tier.popular
                    ? "border-[var(--d-accent)]/60 bg-[rgba(96,165,250,0.07)] shadow-[0_0_70px_-24px_rgba(96,165,250,0.8)]"
                    : "border-[var(--d-line)] bg-[var(--d-panel)]"
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-3.5 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-[var(--d-accent)] px-4 py-1.5 text-[0.64rem] font-bold uppercase tracking-[0.14em] text-[var(--d-accent-ink)]">
                    <Sparkles className="h-3 w-3" strokeWidth={2.2} aria-hidden />
                    {content.popularBadge}
                  </span>
                )}

                <h3 className="[font-family:var(--demo-display)] text-lg font-semibold text-[var(--d-ink)]">
                  {tier.name}
                </h3>
                <p className="mt-1.5 min-h-10 text-[0.8rem] leading-relaxed text-[var(--d-ink-soft)]">
                  {tier.blurb}
                </p>

                <div className="mt-6 flex items-baseline gap-2">
                  <span className="relative inline-flex h-12 items-baseline overflow-hidden">
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.span
                        key={isCustom ? "custom" : period}
                        initial={reduce ? false : { y: 26, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={reduce ? undefined : { y: -26, opacity: 0 }}
                        transition={{ duration: 0.28, ease: "easeOut" }}
                        className="[font-family:var(--demo-display)] text-[2.6rem] font-semibold leading-none tracking-tight text-[var(--d-ink)]"
                      >
                        {price}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                  {!isCustom && (
                    <span className="text-[0.72rem] leading-tight text-[var(--d-ink-faint)]">
                      {content.perSeat}
                      <br />
                      {period === "annual" ? content.billedAnnually : content.billedMonthly}
                    </span>
                  )}
                </div>

                <ul className="mt-7 flex-1 space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-[0.84rem] text-[var(--d-ink)]">
                      <Check
                        className={`mt-0.5 h-4 w-4 shrink-0 ${tier.popular ? "text-[var(--d-accent)]" : "text-[#34D399]"}`}
                        strokeWidth={2.4}
                        aria-hidden
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => scrollToId("cta")}
                  className={`mt-8 rounded-full py-3 text-sm font-semibold transition-transform hover:scale-[1.03] ${
                    tier.popular
                      ? "bg-[var(--d-accent)] text-[var(--d-accent-ink)] shadow-[0_0_30px_-8px_rgba(96,165,250,0.9)]"
                      : "border border-[var(--d-line-strong)] text-[var(--d-ink)] hover:bg-[var(--d-panel)]"
                  }`}
                >
                  {tier.cta}
                </button>
              </motion.article>
            );
          })}
        </div>

        <p className="mt-8 text-center text-[0.7rem] text-[var(--d-ink-faint)]">{content.footnote}</p>
      </div>
    </section>
  );
}
