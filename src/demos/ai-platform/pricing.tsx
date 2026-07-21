"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import type { PricingContent, ModelTierId } from "./content";
import { Glow, SectionHeading, scrollToId } from "./ui";

export function Pricing({ content }: { content: PricingContent }) {
  const { calc } = content;
  const [requests, setRequests] = useState(500000);
  const [tierId, setTierId] = useState<ModelTierId>("core");

  const tier = calc.tiers.find((t) => t.id === tierId) ?? calc.tiers[1];
  const totalTokens = requests * calc.avgTokensPerRequest;

  const money = useMemo(
    () =>
      new Intl.NumberFormat(calc.numberLocale, {
        style: "currency",
        currency: calc.currency,
        maximumFractionDigits: 0,
      }),
    [calc.numberLocale, calc.currency],
  );
  const rate = useMemo(
    () =>
      new Intl.NumberFormat(calc.numberLocale, {
        style: "currency",
        currency: calc.currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    [calc.numberLocale, calc.currency],
  );
  const compact = useMemo(
    () => new Intl.NumberFormat(calc.numberLocale, { notation: "compact", maximumFractionDigits: 1 }),
    [calc.numberLocale],
  );
  const plain = useMemo(() => new Intl.NumberFormat(calc.numberLocale), [calc.numberLocale]);

  const cost = (totalTokens / 1_000_000) * tier.ratePerMillion;
  const pct = ((requests - calc.sliderMin) / (calc.sliderMax - calc.sliderMin)) * 100;

  return (
    <section id="pricing" className="relative scroll-mt-20 py-24">
      <Glow className="right-[-10%] top-24 h-[32rem] w-[32rem]" />
      <div className="relative mx-auto max-w-6xl px-5">
        <SectionHeading label={content.label} title={content.title} intro={content.intro} />

        {/* Calculator */}
        <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-3xl border border-[var(--d-line)] bg-[rgba(11,10,20,0.65)] p-6 backdrop-blur-xl sm:p-8">
          <h3 className="[font-family:var(--demo-display)] text-lg font-semibold text-[var(--d-ink)]">
            {calc.title}
          </h3>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-10">
            <div>
              {/* Slider */}
              <div className="flex items-center justify-between">
                <label htmlFor="req-slider" className="text-[0.8rem] font-medium text-[var(--d-ink-soft)]">
                  {calc.sliderLabel}
                </label>
                <span className="[font-family:var(--demo-mono)] text-[0.9rem] font-semibold text-[var(--d-accent-bright)]">
                  {plain.format(requests)}
                </span>
              </div>
              <input
                id="req-slider"
                type="range"
                min={calc.sliderMin}
                max={calc.sliderMax}
                step={calc.sliderStep}
                value={requests}
                onChange={(e) => setRequests(Number(e.target.value))}
                aria-valuetext={`${plain.format(requests)} ${calc.requestsUnit}`}
                className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full outline-none [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-[var(--d-accent)] [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--d-accent)] [&::-webkit-slider-thumb]:shadow-[0_0_16px_-2px_var(--d-accent)]"
                style={{
                  background: `linear-gradient(90deg, var(--d-accent) ${pct}%, rgba(167,139,250,0.16) ${pct}%)`,
                }}
              />
              <div className="mt-1.5 flex justify-between text-[0.66rem] text-[var(--d-ink-faint)] [font-family:var(--demo-mono)]">
                <span>{compact.format(calc.sliderMin)}</span>
                <span>{compact.format(calc.sliderMax)}</span>
              </div>

              {/* Tier selector */}
              <p className="mt-7 text-[0.8rem] font-medium text-[var(--d-ink-soft)]">{calc.tierLabel}</p>
              <div
                role="radiogroup"
                aria-label={calc.tierLabel}
                className="mt-3 grid grid-cols-3 gap-2"
              >
                {calc.tiers.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    role="radio"
                    aria-checked={tierId === t.id}
                    onClick={() => setTierId(t.id)}
                    className={`rounded-xl border px-3 py-2.5 text-center transition-colors ${
                      tierId === t.id
                        ? "border-[var(--d-accent)]/60 bg-[rgba(167,139,250,0.12)] text-[var(--d-ink)]"
                        : "border-[var(--d-line)] text-[var(--d-ink-soft)] hover:border-[var(--d-line-strong)]"
                    }`}
                  >
                    <span className="block text-[0.84rem] font-semibold">{t.name}</span>
                    <span className="[font-family:var(--demo-mono)] text-[0.66rem] text-[var(--d-ink-faint)]">
                      {rate.format(t.ratePerMillion)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Estimate readout */}
            <div className="flex flex-col justify-center rounded-2xl border border-[var(--d-line)] bg-[rgba(5,5,10,0.5)] p-6">
              <div className="flex items-center justify-between text-[0.76rem] text-[var(--d-ink-faint)] [font-family:var(--demo-mono)]">
                <span>{calc.tokensLabel}</span>
                <span className="text-[var(--d-ink-soft)]">{compact.format(totalTokens)}</span>
              </div>
              <p className="mt-4 text-[0.76rem] uppercase tracking-[0.14em] text-[var(--d-ink-faint)] [font-family:var(--demo-mono)]">
                {calc.estLabel}
              </p>
              <div className="mt-1 flex items-baseline gap-1.5">
                <motion.span
                  key={money.format(Math.round(cost))}
                  initial={{ opacity: 0.4, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="[font-family:var(--demo-display)] text-4xl font-semibold text-[var(--d-ink)] sm:text-5xl"
                >
                  {money.format(Math.round(cost))}
                </motion.span>
                <span className="text-[0.82rem] text-[var(--d-ink-faint)]">{calc.perMonth}</span>
              </div>
              <p className="mt-4 text-[0.68rem] leading-relaxed text-[var(--d-ink-faint)]">{calc.avgTokensNote}</p>
            </div>
          </div>
        </div>

        {/* Plans */}
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {content.plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative flex flex-col rounded-2xl border p-7 ${
                plan.featured
                  ? "border-[var(--d-accent)]/50 bg-[rgba(167,139,250,0.07)] shadow-[0_0_50px_-24px_var(--d-accent)]"
                  : "border-[var(--d-line)] bg-[rgba(11,10,20,0.55)]"
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-7 inline-flex items-center gap-1 rounded-full bg-[var(--d-accent)] px-3 py-1 text-[0.62rem] font-bold uppercase tracking-wide text-[var(--d-accent-ink)]">
                  <Sparkles className="h-3 w-3" strokeWidth={2.4} aria-hidden />
                  {content.label}
                </span>
              )}
              <h3 className="[font-family:var(--demo-display)] text-lg font-semibold text-[var(--d-ink)]">
                {plan.name}
              </h3>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="[font-family:var(--demo-display)] text-3xl font-semibold text-[var(--d-ink)]">
                  {plan.price}
                </span>
                <span className="text-[0.76rem] text-[var(--d-ink-faint)]">{plan.period}</span>
              </div>
              <p className="mt-3 text-[0.82rem] leading-relaxed text-[var(--d-ink-soft)]">{plan.desc}</p>
              <ul className="mt-5 flex-1 space-y-2.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[0.83rem] text-[var(--d-ink)]">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--d-accent)]" strokeWidth={2.2} aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => scrollToId("cta")}
                className={`mt-7 w-full rounded-full px-5 py-3 text-[0.84rem] font-semibold transition-transform hover:scale-[1.02] ${
                  plan.featured
                    ? "bg-[var(--d-accent)] text-[var(--d-accent-ink)] shadow-[0_0_28px_-8px_var(--d-accent)]"
                    : "border border-[var(--d-line-strong)] text-[var(--d-ink)] hover:bg-[var(--d-panel)]"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
