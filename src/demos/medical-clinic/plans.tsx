"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, ShieldCheck } from "lucide-react";
import type { PlansContent } from "./content";
import { SectionHeading } from "./ui";

export function PlansSection({ content }: { content: PlansContent }) {
  const [chosenId, setChosenId] = useState<string | null>(null);
  const reduce = useReducedMotion() ?? false;

  const format = useMemo(
    () =>
      new Intl.NumberFormat(content.priceLocale, {
        style: "currency",
        currency: content.currency,
        maximumFractionDigits: 0,
      }),
    [content.priceLocale, content.currency],
  );

  return (
    <section id="plans" className="scroll-mt-20 bg-[var(--d-mint)] px-5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label={content.label}
          title={content.title}
          accent={content.accent}
          intro={content.intro}
          align="center"
        />

        <div className="mt-14 grid items-stretch gap-5 lg:grid-cols-3">
          {content.plans.map((plan, index) => {
            const chosen = chosenId === plan.id;
            return (
              <motion.article
                key={plan.id}
                initial={reduce ? undefined : { opacity: 0, y: 26 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.08 }}
                className={`relative flex flex-col rounded-[2rem] p-8 ${
                  plan.popular
                    ? "bg-[var(--d-teal-dark)] text-[var(--d-foam)] shadow-[0_36px_70px_-36px_rgba(12,74,67,0.8)]"
                    : "border border-[var(--d-line)] bg-[var(--d-card)] text-[var(--d-ink)] shadow-[0_20px_44px_-34px_rgba(12,74,67,0.45)]"
                }`}
              >
                {plan.popular ? (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[var(--d-peach)] px-4 py-1.5 text-[0.64rem] font-bold uppercase tracking-[0.18em] text-[#4A2B14]">
                    {content.popularTag}
                  </span>
                ) : null}

                <h3 className="text-lg font-bold tracking-tight">{plan.name}</h3>
                <p
                  className={`mt-1 text-[0.82rem] ${
                    plan.popular ? "text-[var(--d-foam-dim)]" : "text-[var(--d-ink-soft)]"
                  }`}
                >
                  {plan.blurb}
                </p>

                <p className="mt-6 flex items-baseline gap-1">
                  <span className="[font-family:var(--demo-display)] text-[2.6rem] italic leading-none tracking-tight">
                    {format.format(plan.price)}
                  </span>
                  <span
                    className={`text-sm font-medium ${
                      plan.popular ? "text-[var(--d-foam-dim)]" : "text-[var(--d-ink-soft)]"
                    }`}
                  >
                    {content.perMonth}
                  </span>
                </p>

                <ul className="mt-7 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-[0.84rem] leading-relaxed">
                      <span
                        className={`mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full ${
                          plan.popular
                            ? "bg-[var(--d-glow)]/20 text-[var(--d-glow)]"
                            : "bg-[var(--d-mint)] text-[var(--d-accent)]"
                        }`}
                      >
                        <Check className="h-2.5 w-2.5" strokeWidth={3} aria-hidden />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  aria-pressed={chosen}
                  onClick={() => setChosenId(chosen ? null : plan.id)}
                  className={`mt-8 flex items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold transition-colors ${
                    chosen
                      ? "bg-[var(--d-glow)] text-[var(--d-teal-ink)]"
                      : plan.popular
                        ? "bg-[var(--d-accent)] text-[var(--d-foam)] hover:bg-[var(--d-accent-deep)]"
                        : "border border-[var(--d-accent)]/40 text-[var(--d-accent-deep)] hover:bg-[var(--d-accent)] hover:text-[var(--d-foam)]"
                  }`}
                >
                  {chosen ? <Check className="h-4 w-4" strokeWidth={2.4} aria-hidden /> : null}
                  {chosen ? content.chosen : content.choose}
                </button>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-12 rounded-[2rem] border border-[var(--d-line)] bg-[var(--d-card)] p-8 md:p-10">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <p className="flex items-center gap-3 text-sm font-bold tracking-tight text-[var(--d-ink)]">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--d-mint)] text-[var(--d-accent)]">
                <ShieldCheck className="h-5 w-5" strokeWidth={1.9} aria-hidden />
              </span>
              {content.insurersTitle}
            </p>
            <p className="max-w-sm text-[0.76rem] leading-relaxed text-[var(--d-ink-soft)]">
              {content.insurersNote}
            </p>
          </div>
          <ul className="mt-7 flex flex-wrap gap-2.5">
            {content.insurers.map((insurer) => (
              <li
                key={insurer}
                className="rounded-full border border-[var(--d-line)] bg-[var(--d-mist)] px-5 py-2.5 text-[0.78rem] font-semibold tracking-wide text-[var(--d-ink-soft)]"
              >
                {insurer}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
