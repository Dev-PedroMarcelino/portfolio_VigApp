"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Sparkles, Users } from "lucide-react";
import type { PricingContent } from "./content";
import { SectionHeading, scrollToId } from "./ui";

export function Pricing({ content }: { content: PricingContent }) {
  const reduce = useReducedMotion();
  const [seats, setSeats] = useState(content.defaultSeats);

  const format = useMemo(() => {
    const fmt = new Intl.NumberFormat(content.localeTag, {
      style: "currency",
      currency: content.currency,
      maximumFractionDigits: 0,
    });
    return (n: number) => fmt.format(n);
  }, [content.localeTag, content.currency]);

  const percent = ((seats - content.minSeats) / (content.maxSeats - content.minSeats)) * 100;

  return (
    <section id="pricing" className="relative scroll-mt-20 bg-[var(--d-bg-alt)] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading label={content.label} title={content.title} intro={content.intro} align="center" />

        {/* Seat slider */}
        <div className="mx-auto mt-10 max-w-xl rounded-3xl border border-[var(--d-line)] bg-[var(--d-surface)] p-6 shadow-[0_24px_60px_-48px_rgba(30,27,75,0.6)]">
          <div className="flex items-center justify-between">
            <label htmlFor="relaty-seats" className="flex items-center gap-2 text-[0.82rem] font-semibold text-[var(--d-ink)]">
              <Users className="h-4 w-4 text-[var(--d-accent)]" strokeWidth={2} aria-hidden />
              {content.seatsLabel}
            </label>
            <span className="flex items-baseline gap-1.5 rounded-full bg-[var(--d-accent-soft)] px-3 py-1">
              <span className="[font-family:var(--demo-display)] text-lg font-semibold tabular-nums text-[var(--d-accent-deep)]">
                {seats}
              </span>
              <span className="text-[0.7rem] font-medium text-[var(--d-accent-deep)]">{content.seatsWord}</span>
            </span>
          </div>
          <input
            id="relaty-seats"
            type="range"
            min={content.minSeats}
            max={content.maxSeats}
            value={seats}
            onChange={(e) => setSeats(Number(e.target.value))}
            aria-valuetext={`${seats} ${content.seatsWord}`}
            className="mt-5 h-2 w-full cursor-pointer appearance-none rounded-full outline-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-[var(--d-accent)] [&::-webkit-slider-thumb]:shadow-[0_2px_8px_rgba(79,70,229,0.5)] [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-[var(--d-accent)]"
            style={{
              background: `linear-gradient(90deg, var(--d-accent) ${percent}%, var(--d-line-strong) ${percent}%)`,
            }}
          />
          <div className="mt-2 flex justify-between [font-family:var(--demo-mono)] text-[0.64rem] text-[var(--d-ink-faint)]">
            <span>{content.minSeats}</span>
            <span>{content.maxSeats}</span>
          </div>
        </div>

        {/* Tiers */}
        <div className="mt-12 grid items-stretch gap-5 lg:grid-cols-3">
          {content.tiers.map((tier, i) => {
            const isCustom = Boolean(tier.customLabel);
            const total = tier.perSeat * seats;
            return (
              <motion.article
                key={tier.id}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.45, delay: i * 0.09 }}
                className={`relative flex flex-col rounded-3xl border p-7 ${
                  tier.popular
                    ? "border-[var(--d-accent)] bg-[var(--d-surface)] shadow-[0_36px_70px_-40px_rgba(79,70,229,0.85)]"
                    : "border-[var(--d-line)] bg-[var(--d-surface)]"
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-3.5 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-[var(--d-accent)] px-4 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-[var(--d-accent-ink)]">
                    <Sparkles className="h-3 w-3" strokeWidth={2.2} aria-hidden />
                    {tier.name}
                  </span>
                )}

                <h3 className="[font-family:var(--demo-display)] text-lg font-semibold text-[var(--d-ink)]">
                  {tier.name}
                </h3>
                <p className="mt-1.5 min-h-10 text-[0.8rem] leading-relaxed text-[var(--d-ink-soft)]">{tier.blurb}</p>

                <div className="mt-6">
                  {isCustom ? (
                    <span className="[font-family:var(--demo-display)] text-[2.4rem] font-semibold leading-none tracking-tight text-[var(--d-ink)]">
                      {tier.customLabel}
                    </span>
                  ) : (
                    <>
                      <div className="flex items-baseline gap-1.5">
                        <span className="[font-family:var(--demo-display)] text-[2.6rem] font-semibold leading-none tracking-tight text-[var(--d-ink)]">
                          {format(tier.perSeat)}
                        </span>
                        <span className="text-[0.72rem] leading-tight text-[var(--d-ink-faint)]">
                          {content.perSeatCaption}
                        </span>
                      </div>
                      <p className="mt-3 rounded-xl bg-[var(--d-bg)] px-3 py-2 text-[0.76rem] text-[var(--d-ink-soft)]">
                        <span className="[font-family:var(--demo-mono)] font-semibold tabular-nums text-[var(--d-ink)]">
                          {format(total)}
                        </span>{" "}
                        {content.totalCaption}
                        <span className="text-[var(--d-ink-faint)]">
                          {" · "}
                          {seats} {content.seatsWord}
                        </span>
                      </p>
                    </>
                  )}
                </div>

                <ul className="mt-7 flex-1 space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-[0.84rem] text-[var(--d-ink)]">
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[var(--d-accent-soft)]">
                        <Check className="h-2.5 w-2.5 text-[var(--d-accent)]" strokeWidth={3} aria-hidden />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => scrollToId("cta")}
                  className={`mt-8 rounded-full py-3 text-sm font-semibold transition-transform hover:scale-[1.03] ${
                    tier.popular
                      ? "bg-[var(--d-accent)] text-[var(--d-accent-ink)] shadow-[0_16px_34px_-14px_rgba(79,70,229,0.95)]"
                      : "border border-[var(--d-line-strong)] text-[var(--d-ink)] hover:bg-[var(--d-bg)]"
                  }`}
                >
                  {tier.cta}
                </button>
              </motion.article>
            );
          })}
        </div>

        <p className="mt-8 text-center text-[0.72rem] text-[var(--d-ink-faint)]">{content.footnote}</p>
      </div>
    </section>
  );
}
