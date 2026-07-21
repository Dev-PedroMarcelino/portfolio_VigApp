"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, ShieldCheck } from "lucide-react";
import type { HeroContent, QuoteWidgetContent } from "./content";
import { QuoteWidget } from "./quote-widget";
import { ShieldRings, Stars } from "./ui";

export function SlHero({
  content,
  quote,
  money,
}: {
  content: HeroContent;
  quote: QuoteWidgetContent;
  money: { locale: string; currency: string };
}) {
  const reduce = useReducedMotion() ?? false;
  const fadeUp = (delay: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 18 },
    animate: reduce ? { opacity: 1 } : { opacity: 1, y: 0 },
    transition: { duration: 0.55, ease: "easeOut" as const, delay },
  });

  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60rem 32rem at 82% -12%, rgba(29,78,216,0.14), transparent 60%), radial-gradient(44rem 26rem at -8% 30%, rgba(29,78,216,0.09), transparent 60%)",
        }}
        aria-hidden
      />
      <ShieldRings className="absolute -right-24 top-8 h-[34rem] w-[34rem] text-[var(--d-accent)] opacity-[0.16] max-lg:hidden" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:pb-28 lg:pt-20">
        <div>
          <motion.p
            {...fadeUp(0)}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--d-accent)]/25 bg-white/70 px-3.5 py-1.5 text-[0.66rem] font-bold uppercase tracking-[0.2em] text-[var(--d-accent)]"
          >
            <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden />
            {content.kicker}
          </motion.p>

          <motion.h1
            {...fadeUp(0.08)}
            className="mt-6 [font-family:var(--demo-display)] text-[2.6rem] font-extrabold leading-[1.04] tracking-tight text-[var(--d-ink)] sm:text-6xl"
          >
            {content.titleTop}
            <br />
            <span className="text-[var(--d-accent)]">{content.titleAccent}</span>
            <br />
            {content.titleBottom}
          </motion.h1>

          <motion.p
            {...fadeUp(0.16)}
            className="mt-6 max-w-xl text-[0.95rem] leading-[1.85] text-[var(--d-ink-soft)]"
          >
            {content.sub}
          </motion.p>

          <motion.ul {...fadeUp(0.24)} className="mt-7 space-y-3">
            {content.bullets.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-[var(--d-ink)]">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--d-accent-soft)] text-[var(--d-accent)]">
                  <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                </span>
                {item}
              </li>
            ))}
          </motion.ul>

          <motion.div {...fadeUp(0.32)} className="mt-8 flex items-center gap-3">
            <Stars rating={5} srLabel={content.ratingNote} />
            <span className="text-[0.76rem] font-semibold text-[var(--d-ink-soft)]" aria-hidden>
              {content.ratingNote}
            </span>
          </motion.div>
        </div>

        <motion.div {...fadeUp(0.2)} className="relative">
          <div
            className="absolute -inset-3 rounded-[2.2rem] bg-gradient-to-br from-[var(--d-accent)]/18 via-transparent to-[var(--d-accent)]/10"
            aria-hidden
          />
          <QuoteWidget content={quote} money={money} />
        </motion.div>
      </div>
    </section>
  );
}
