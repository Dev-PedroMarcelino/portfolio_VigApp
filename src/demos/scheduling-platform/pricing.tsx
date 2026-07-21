"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Users } from "lucide-react";
import type { PricingContent } from "./content";
import { SectionLabel, scrollToId } from "./ui";

export function PricingSection({ content }: { content: PricingContent }) {
  const reduce = useReducedMotion() ?? false;
  const [seats, setSeats] = useState(5);
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  const format = useMemo(
    () =>
      new Intl.NumberFormat(content.priceLocale, {
        style: "currency",
        currency: content.currency,
        maximumFractionDigits: 0,
      }),
    [content.priceLocale, content.currency],
  );

  const seatsText =
    seats === 1 ? content.seatsValueOne : content.seatsValue.replace("{count}", String(seats));

  return (
    <section id="pricing" className="scroll-mt-20 px-5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <SectionLabel text={content.label} />
          </div>
          <h2 className="mt-5 [font-family:var(--demo-display)] text-3xl font-extrabold tracking-tight md:text-5xl">
            {content.title}
          </h2>
          <p className="mt-4 leading-[1.8] text-[var(--d-ink-soft)]">{content.intro}</p>
        </div>

        {/* Controls: seat slider + billing toggle */}
        <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center gap-6 rounded-[1.75rem] border border-[var(--d-line)] bg-[var(--d-card)] p-6 sm:flex-row sm:gap-10 md:p-7">
          <div className="w-full flex-1">
            <div className="flex items-baseline justify-between gap-4">
              <label
                htmlFor="slotly-seats"
                className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[var(--d-accent-deep)]"
              >
                {content.seatsLabel}
              </label>
              <span className="flex items-center gap-1.5 text-sm font-bold text-[var(--d-ink)]">
                <Users className="h-4 w-4 text-[var(--d-accent)]" strokeWidth={2.2} aria-hidden />
                {seatsText}
              </span>
            </div>
            <input
              id="slotly-seats"
              type="range"
              min={1}
              max={50}
              step={1}
              value={seats}
              onChange={(e) => setSeats(Number(e.target.value))}
              className="mt-3 w-full cursor-pointer accent-[#0D9488]"
            />
            <div className="mt-1.5 flex justify-between text-[0.62rem] font-semibold text-[var(--d-ink-soft)]" aria-hidden>
              <span>1</span>
              <span>25</span>
              <span>50</span>
            </div>
          </div>

          <div
            className="flex shrink-0 items-center rounded-full border border-[var(--d-line)] bg-[var(--d-bg)] p-1"
            role="group"
          >
            <button
              type="button"
              aria-pressed={billing === "monthly"}
              onClick={() => setBilling("monthly")}
              className={`rounded-full px-4 py-2 text-[0.76rem] font-bold transition-colors ${
                billing === "monthly"
                  ? "bg-[var(--d-accent)] text-white"
                  : "text-[var(--d-ink-soft)] hover:text-[var(--d-ink)]"
              }`}
            >
              {content.billingMonthly}
            </button>
            <button
              type="button"
              aria-pressed={billing === "annual"}
              onClick={() => setBilling("annual")}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-[0.76rem] font-bold transition-colors ${
                billing === "annual"
                  ? "bg-[var(--d-accent)] text-white"
                  : "text-[var(--d-ink-soft)] hover:text-[var(--d-ink)]"
              }`}
            >
              {content.billingAnnual}
              <span
                className={`rounded-full px-1.5 py-0.5 text-[0.56rem] font-bold uppercase tracking-[0.06em] ${
                  billing === "annual"
                    ? "bg-white/20 text-white"
                    : "bg-[var(--d-pop)]/15 text-[#B45309]"
                }`}
              >
                {content.annualNote}
              </span>
            </button>
          </div>
        </div>

        {/* Plans */}
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {content.plans.map((plan) => {
            const perSeat = billing === "annual" ? plan.annual : plan.monthly;
            const total = perSeat * seats;
            const isFree = plan.monthly === 0;
            return (
              <article
                key={plan.id}
                className={`relative flex flex-col rounded-[1.75rem] border-2 bg-[var(--d-card)] p-7 ${
                  plan.popular
                    ? "border-[var(--d-accent)] shadow-[0_30px_60px_-32px_rgba(13,148,136,0.55)]"
                    : "border-[var(--d-line)]"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[var(--d-accent)] px-4 py-1 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-white">
                    {content.popularBadge}
                  </span>
                )}
                <h3 className="[font-family:var(--demo-display)] text-xl font-extrabold tracking-tight">
                  {plan.name}
                </h3>
                <p className="mt-1 text-sm text-[var(--d-ink-soft)]">{plan.blurb}</p>

                <div className="mt-6 flex items-baseline gap-2">
                  {isFree ? (
                    <span className="[font-family:var(--demo-display)] text-4xl font-extrabold tracking-tight">
                      {plan.freeLabel}
                    </span>
                  ) : (
                    <>
                      <AnimatePresence mode="popLayout">
                        <motion.span
                          key={`${plan.id}-${perSeat}`}
                          initial={reduce ? undefined : { opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={reduce ? undefined : { opacity: 0, y: -10 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="[font-family:var(--demo-display)] text-4xl font-extrabold tracking-tight"
                        >
                          {format.format(perSeat)}
                        </motion.span>
                      </AnimatePresence>
                      <span className="text-xs font-semibold text-[var(--d-ink-soft)]">
                        {content.perSeatSuffix}
                      </span>
                    </>
                  )}
                </div>

                {!isFree && (
                  <div className="mt-4 flex items-baseline justify-between rounded-xl bg-[var(--d-bg)] px-4 py-3">
                    <span className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[var(--d-ink-soft)]">
                      {content.totalLabel}
                    </span>
                    <span className="flex items-baseline gap-1.5">
                      <AnimatePresence mode="popLayout">
                        <motion.span
                          key={`${plan.id}-total-${total}`}
                          initial={reduce ? undefined : { opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={reduce ? undefined : { opacity: 0, y: -8 }}
                          transition={{ duration: 0.18, ease: "easeOut" }}
                          className="[font-family:var(--demo-display)] text-lg font-extrabold text-[var(--d-accent-deep)]"
                        >
                          {format.format(total)}
                        </motion.span>
                      </AnimatePresence>
                      <span className="text-[0.66rem] font-semibold text-[var(--d-ink-soft)]">
                        {content.totalSuffix}
                      </span>
                    </span>
                  </div>
                )}

                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-[var(--d-ink)]">
                      <span className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[var(--d-mint)] text-[var(--d-accent-deep)]">
                        <Check className="h-2.5 w-2.5" strokeWidth={3} aria-hidden />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => scrollToId("book")}
                  className={`mt-7 w-full rounded-full py-3.5 text-sm font-bold transition-all hover:scale-[1.02] ${
                    plan.popular
                      ? "bg-[var(--d-accent)] text-white hover:bg-[var(--d-accent-deep)]"
                      : "border-2 border-[var(--d-line)] text-[var(--d-ink)] hover:border-[var(--d-accent)]"
                  }`}
                >
                  {plan.cta}
                </button>
              </article>
            );
          })}
        </div>

        <p className="mt-8 text-center text-xs text-[var(--d-ink-soft)]">{content.footnote}</p>
      </div>
    </section>
  );
}
