"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import type { NuvexContent } from "./content";
import { PLAN_ACCENTS } from "./content";
import { SectionLabel, scrollToId } from "./ui";

export function PricingSection({ content }: { content: NuvexContent["pricing"] }) {
  const [yearly, setYearly] = useState(false);

  return (
    <section
      id="pricing"
      className="relative scroll-mt-16 border-t border-[var(--d-line)] bg-[var(--d-bg-soft)] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <SectionLabel text={content.label} />
          </div>
          <h2 className="mt-5 text-3xl leading-tight text-[var(--d-ink)] [font-family:var(--demo-display)] sm:text-[2.6rem] sm:leading-[1.1]">
            {content.title}
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-[var(--d-ink-soft)]">{content.intro}</p>
        </div>

        {/* Billing toggle */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <div
            className="relative flex items-center rounded-full border border-[var(--d-line)] bg-[var(--d-panel)] p-1"
            role="tablist"
            aria-label={content.monthly}
          >
            <button
              type="button"
              role="tab"
              aria-selected={!yearly}
              onClick={() => setYearly(false)}
              className="relative z-10 rounded-full px-4 py-1.5 text-xs font-medium transition-colors [font-family:var(--demo-mono)]"
              style={{ color: !yearly ? "#05070C" : "var(--d-ink-soft)" }}
            >
              {content.monthly}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={yearly}
              onClick={() => setYearly(true)}
              className="relative z-10 rounded-full px-4 py-1.5 text-xs font-medium transition-colors [font-family:var(--demo-mono)]"
              style={{ color: yearly ? "#05070C" : "var(--d-ink-soft)" }}
            >
              {content.yearly}
            </button>
            <motion.span
              aria-hidden
              className="absolute top-1 bottom-1 rounded-full bg-[var(--d-accent)]"
              initial={false}
              animate={{ left: yearly ? "50%" : "4px", right: yearly ? "4px" : "50%" }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
            />
          </div>
          <span className="rounded-full border border-[var(--d-accent)]/40 bg-[var(--d-accent)]/10 px-2.5 py-1 text-[0.66rem] font-medium text-[var(--d-accent-soft)] [font-family:var(--demo-mono)]">
            {content.yearlyBadge}
          </span>
        </div>

        {/* Plans */}
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {content.plans.map((plan) => {
            const accent = PLAN_ACCENTS[plan.id];
            const price = yearly ? content.plansYearly[plan.id].price : plan.price;
            const note = yearly ? content.plansYearly[plan.id].yearlyNote : plan.yearlyNote;
            const cadence = yearly ? content.yearly : plan.cadence;
            return (
              <div
                key={plan.id}
                className={`relative flex flex-col rounded-3xl border p-7 ${
                  plan.featured
                    ? "border-[var(--d-accent)]/50 bg-[var(--d-panel)]"
                    : "border-[var(--d-line)] bg-[var(--d-panel)]/60"
                }`}
              >
                {plan.featured && (
                  <>
                    <div
                      aria-hidden
                      className="absolute -inset-px -z-10 rounded-3xl opacity-60 blur-lg"
                      style={{ background: "radial-gradient(60% 50% at 50% 0%, rgba(16,185,129,0.4), transparent 70%)" }}
                    />
                    <span className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-[var(--d-accent)] px-3 py-1 text-[0.62rem] font-semibold text-[#05070C] [font-family:var(--demo-mono)]">
                      <Sparkles className="h-3 w-3" strokeWidth={2.2} />
                      {plan.tag}
                    </span>
                  </>
                )}

                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-[var(--d-ink)] [font-family:var(--demo-display)]">
                    {plan.name}
                  </h3>
                  <span
                    className="h-8 w-8 rounded-lg"
                    aria-hidden
                    style={{ background: `linear-gradient(135deg, ${accent}, ${accent}44)` }}
                  />
                </div>
                {!plan.featured && (
                  <p className="mt-1 text-xs text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]">{plan.tag}</p>
                )}

                <div className="mt-5 flex items-end gap-1">
                  <span className="text-4xl font-semibold text-[var(--d-ink)] [font-family:var(--demo-mono)]">
                    {price}
                  </span>
                  <span className="pb-1 text-sm text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]">
                    {cadence}
                  </span>
                </div>
                <p className="mt-1 text-[0.72rem] text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]">{note}</p>

                <p className="mt-4 text-[0.82rem] leading-relaxed text-[var(--d-ink-soft)]">{plan.description}</p>

                <ul className="mt-6 flex flex-1 flex-col gap-3">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-[0.82rem] text-[var(--d-ink)]">
                      <span
                        className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                        style={{ backgroundColor: `${accent}22`, color: accent }}
                      >
                        <Check className="h-2.5 w-2.5" strokeWidth={3} />
                      </span>
                      {feat}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => scrollToId("cta")}
                  className={`mt-7 w-full rounded-xl py-3 text-sm font-semibold transition-transform hover:scale-[1.02] ${
                    plan.featured
                      ? "bg-[var(--d-accent)] text-[#05070C] shadow-[0_0_22px_rgba(16,185,129,0.32)]"
                      : "border border-[var(--d-line)] text-[var(--d-ink)] hover:border-[var(--d-accent)]/50"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
