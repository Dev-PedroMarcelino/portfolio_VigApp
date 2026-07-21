"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import type { MembershipContent } from "./content";
import { SectionHeading, scrollToId } from "./ui";

type Cycle = "monthly" | "annual";

export function MembershipPlans({ content }: { content: MembershipContent }) {
  const [cycle, setCycle] = useState<Cycle>("monthly");
  const reduce = useReducedMotion() ?? false;

  const fmt = (n: number) =>
    new Intl.NumberFormat(content.numberLocale, { maximumFractionDigits: 0 }).format(n);

  return (
    <section id="membership" className="relative border-t border-[var(--d-line)] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading label={content.label} title={content.title} intro={content.intro} />

          {/* Billing cycle toggle */}
          <div
            role="group"
            aria-label={content.label}
            className="inline-flex shrink-0 items-center gap-1 self-start border border-[var(--d-line-bright)] bg-[var(--d-panel)] p-1"
          >
            {(["monthly", "annual"] as Cycle[]).map((c) => {
              const selected = cycle === c;
              const label = c === "monthly" ? content.monthlyLabel : content.annualLabel;
              return (
                <button
                  key={c}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setCycle(c)}
                  className="relative flex items-center gap-2 px-4 py-2.5 text-[0.74rem] font-bold uppercase tracking-[0.1em] transition-colors"
                  style={{
                    backgroundColor: selected ? "#D7FF3E" : "transparent",
                    color: selected ? "#0B0B0D" : "#9A9AA2",
                  }}
                >
                  {label}
                  {c === "annual" ? (
                    <span
                      className="text-[0.58rem] font-bold uppercase tracking-[0.08em]"
                      style={{ color: selected ? "#0B0B0D" : "#D7FF3E" }}
                    >
                      {content.saveBadge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {content.plans.map((plan, i) => {
            const price = cycle === "monthly" ? plan.monthly : plan.annualPerMonth;
            const featured = plan.featured;
            return (
              <motion.article
                key={plan.id}
                initial={reduce ? undefined : { opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: 0.06 * i }}
                className="relative flex flex-col border p-7"
                style={{
                  backgroundColor: featured ? "#101014" : "var(--d-panel)",
                  borderColor: featured ? "#D7FF3E" : "var(--d-line)",
                }}
              >
                {featured ? (
                  <span className="absolute -top-3 left-7 bg-[var(--d-accent)] px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.16em] text-[#0B0B0D]">
                    {content.featuredBadge}
                  </span>
                ) : null}

                <h3 className="[font-family:var(--demo-display)] text-3xl uppercase leading-none text-[var(--d-ink)]">
                  {plan.name}
                </h3>
                <p className="mt-2 text-[0.8rem] text-[var(--d-ink-dim)]">{plan.tagline}</p>

                <div className="mt-6 flex items-end gap-1">
                  <span className="text-lg font-semibold text-[var(--d-ink-dim)]">
                    {content.currency}
                  </span>
                  <motion.span
                    key={`${plan.id}-${price}`}
                    initial={reduce ? undefined : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.28 }}
                    className="[font-family:var(--demo-display)] text-6xl leading-none text-[var(--d-ink)]"
                  >
                    {fmt(price)}
                  </motion.span>
                  <span className="mb-1.5 text-[0.82rem] font-semibold text-[var(--d-ink-faint)]">
                    {content.perMonth}
                  </span>
                </div>
                <p className="mt-2 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-[var(--d-ink-faint)]">
                  {cycle === "annual" ? content.billedAnnually : content.billedMonthly}
                </p>

                <ul className="mt-6 flex flex-1 flex-col gap-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-[0.86rem] text-[var(--d-ink-dim)]">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--d-accent)]" strokeWidth={2.6} aria-hidden />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => scrollToId("join")}
                  className="mt-7 w-full py-3.5 text-[0.78rem] font-bold uppercase tracking-[0.12em] transition-transform hover:-translate-y-0.5"
                  style={{
                    backgroundColor: featured ? "#D7FF3E" : "transparent",
                    color: featured ? "#0B0B0D" : "#F4F4F0",
                    border: featured ? "none" : "1px solid #3A3A42",
                  }}
                >
                  {content.cta}
                </button>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
