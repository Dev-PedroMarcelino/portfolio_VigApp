"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, ShieldCheck } from "lucide-react";
import type { PricingContent } from "./content";
import { SectionLabel, scrollToId } from "./ui";

type Mode = "solo" | "team";

export function PricingSection({ content }: { content: PricingContent }) {
  const reduce = useReducedMotion();
  const [mode, setMode] = useState<Mode>("solo");

  const caption = mode === "solo" ? content.soloCaption : content.teamCaption;

  return (
    <section
      id="pricing"
      className="relative overflow-hidden bg-[var(--d-charcoal)] py-20 text-[var(--d-cream)] lg:py-28"
      style={{ backgroundColor: "#1C1917" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute right-1/4 top-0 h-[26rem] w-[26rem] rounded-full opacity-25 blur-[130px]"
        style={{ background: "radial-gradient(circle, #F59E0B 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <SectionLabel text={content.label} />
          </div>
          <h2 className="mt-5 [font-family:var(--demo-display)] text-4xl font-light leading-[1.05] tracking-[-0.01em] sm:text-5xl">
            {content.heading} <span className="italic text-[var(--d-accent)]">{content.headingItalic}</span>
          </h2>
          <p className="mt-5 text-[1rem] leading-relaxed text-[var(--d-cream-dim)]">{content.intro}</p>
        </div>

        {/* Solo / Team toggle */}
        <div className="mt-10 flex flex-col items-center gap-3">
          <div
            role="tablist"
            aria-label={content.label}
            className="inline-flex rounded-full border border-[var(--d-charcoal-line)] bg-[var(--d-charcoal-soft)] p-1"
          >
            {(["solo", "team"] as const).map((m) => {
              const active = mode === m;
              return (
                <button
                  key={m}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setMode(m)}
                  className={`relative rounded-full px-6 py-2.5 text-[0.78rem] font-semibold uppercase tracking-[0.14em] transition-colors ${
                    active ? "text-[var(--d-charcoal)]" : "text-[var(--d-cream-dim)] hover:text-[var(--d-cream)]"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="pricing-pill"
                      transition={{ duration: reduce ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0 -z-10 rounded-full bg-[var(--d-accent)]"
                    />
                  )}
                  {m === "solo" ? content.soloLabel : content.teamLabel}
                </button>
              );
            })}
          </div>
          <p className="text-[0.8rem] text-[var(--d-cream-dim)]">{caption}</p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {content.tiers.map((tier) => {
            const price = mode === "solo" ? tier.solo : tier.team;
            const note = mode === "solo" ? tier.soloNote : tier.teamNote;
            return (
              <article
                key={tier.id}
                className={`relative flex flex-col rounded-[1.6rem] border p-8 ${
                  tier.featured
                    ? "border-[var(--d-accent)] bg-[var(--d-charcoal-soft)]"
                    : "border-[var(--d-charcoal-line)] bg-[var(--d-charcoal-soft)]/60"
                }`}
                style={{ backgroundColor: tier.featured ? "#26211C" : "#221D19" }}
              >
                {tier.featured && (
                  <span className="absolute -top-3 left-8 rounded-full bg-[var(--d-accent)] px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-[var(--d-charcoal)]">
                    {content.popularBadge}
                  </span>
                )}
                <h3 className="[font-family:var(--demo-display)] text-2xl font-medium text-[var(--d-cream)]">{tier.name}</h3>
                <p className="mt-2 text-[0.9rem] text-[var(--d-cream-dim)]">{tier.tagline}</p>

                <div className="mt-6 flex items-baseline gap-2">
                  <motion.span
                    key={price}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="[font-family:var(--demo-display)] text-4xl font-light text-[var(--d-cream)]"
                  >
                    {price}
                  </motion.span>
                  <span className="text-[0.75rem] font-medium uppercase tracking-[0.12em] text-[var(--d-cream-dim)]">
                    {note}
                  </span>
                </div>

                <ul className="mt-7 flex-1 space-y-3">
                  {tier.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-3 text-[0.9rem] text-[var(--d-cream)]">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--d-accent)]/15 text-[var(--d-accent)]">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      {feat}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => scrollToId("enroll")}
                  className={`mt-8 rounded-full px-6 py-3 text-[0.8rem] font-semibold uppercase tracking-[0.14em] transition-transform hover:scale-[1.03] ${
                    tier.featured
                      ? "bg-[var(--d-accent)] text-[var(--d-charcoal)]"
                      : "border border-[var(--d-charcoal-line)] text-[var(--d-cream)] hover:bg-[var(--d-charcoal-line)]/40"
                  }`}
                >
                  {tier.cta}
                </button>
              </article>
            );
          })}
        </div>

        <p className="mx-auto mt-10 flex max-w-xl items-center justify-center gap-2 text-center text-[0.85rem] text-[var(--d-cream-dim)]">
          <ShieldCheck className="h-4 w-4 shrink-0 text-[var(--d-accent)]" strokeWidth={1.8} />
          {content.guarantee}
        </p>
      </div>
    </section>
  );
}
