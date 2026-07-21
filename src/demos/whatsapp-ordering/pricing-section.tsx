"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { PricingContent } from "./content";
import { Eyebrow, scrollToId } from "./ui";

export function PricingSection({ content }: { content: PricingContent }) {
  return (
    <section id="pricing" className="scroll-mt-20 border-t border-[var(--d-line)] px-5 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <Eyebrow text={content.eyebrow} />
          </div>
          <h2 className="mt-3 [font-family:var(--demo-display)] text-3xl font-extrabold tracking-tight text-[var(--d-ink)] sm:text-4xl">
            {content.title}
          </h2>
          <p className="mt-3 text-[var(--d-ink-soft)]">{content.subtitle}</p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {content.plans.map((plan, i) => {
            const featured = plan.featured;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className={`relative flex flex-col rounded-3xl border p-6 ${
                  featured
                    ? "border-[var(--d-accent)] bg-[var(--d-panel-2)] shadow-[0_30px_70px_-40px_rgba(37,211,102,0.6)]"
                    : "border-[var(--d-line)] bg-[var(--d-panel)]"
                }`}
              >
                {plan.badge && (
                  <span className="absolute -top-3 left-6 rounded-full bg-[var(--d-accent)] px-3 py-1 text-[0.62rem] font-bold uppercase tracking-wider text-[#052014]">
                    {plan.badge}
                  </span>
                )}
                <h3 className="[font-family:var(--demo-display)] text-xl font-extrabold text-[var(--d-ink)]">
                  {plan.name}
                </h3>
                <p className="mt-1 text-[0.84rem] text-[var(--d-ink-soft)]">{plan.tagline}</p>
                <div className="mt-5 flex items-end gap-1">
                  <span className="[font-family:var(--demo-display)] text-4xl font-extrabold text-[var(--d-ink)]">
                    {plan.price}
                  </span>
                  <span className="pb-1.5 text-sm text-[var(--d-ink-soft)]">{plan.period}</span>
                </div>

                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[0.86rem] text-[var(--d-ink)]">
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[var(--d-accent)]/15 text-[var(--d-accent)]">
                        <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => scrollToId("cta")}
                  className={`mt-7 rounded-full px-5 py-3 text-sm font-bold transition-transform hover:scale-[1.03] ${
                    featured
                      ? "bg-[var(--d-accent)] text-[#052014]"
                      : "border border-[var(--d-line)] text-[var(--d-ink)] hover:border-[var(--d-accent)]"
                  }`}
                >
                  {plan.cta}
                </button>
              </motion.div>
            );
          })}
        </div>

        <p className="mt-8 text-center text-xs text-[var(--d-ink-soft)]">{content.footnote}</p>
      </div>
    </section>
  );
}
