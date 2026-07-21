"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, MousePointer2 } from "lucide-react";
import type { NuvexContent } from "./content";
import { scrollToId } from "./ui";
import { Card3D } from "./card-3d";

/* ------------------------------------------------------------------ */
/* Hero                                                                 */
/* ------------------------------------------------------------------ */

export function HeroSection({
  content,
  localeTag,
  currency,
}: {
  content: NuvexContent["hero"];
  localeTag: string;
  currency: string;
}) {
  const reduced = useReducedMotion() ?? false;
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-24 sm:pt-40">
      {/* Ambient grid + glow */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(26,36,54,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(26,36,54,0.6) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(120% 80% at 50% 0%, black 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(120% 80% at 50% 0%, black 30%, transparent 80%)",
        }}
      />
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 z-0 h-[520px] w-[820px] -translate-x-1/2 rounded-full opacity-60 blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(16,185,129,0.28), transparent 70%)" }}
      />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-16 px-5 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <motion.span
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--d-line)] bg-[var(--d-panel)]/60 px-3 py-1.5 text-[0.7rem] tracking-wide text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--d-accent)] opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--d-accent)]" />
            </span>
            {content.badge}
          </motion.span>

          <motion.h1
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.05 }}
            className="mt-6 text-[2.7rem] font-semibold leading-[1.03] tracking-tight text-[var(--d-ink)] [font-family:var(--demo-display)] sm:text-[3.7rem]"
          >
            {content.titleLead}{" "}
            <span className="bg-gradient-to-r from-[var(--d-accent-soft)] via-[#6EE7B7] to-[#22D3EE] bg-clip-text text-transparent">
              {content.titleAccent}
            </span>
          </motion.h1>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.12 }}
            className="mt-6 max-w-lg text-[0.98rem] leading-relaxed text-[var(--d-ink-soft)]"
          >
            {content.subtitle}
          </motion.p>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.18 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <button
              type="button"
              onClick={() => scrollToId("cta")}
              className="group flex items-center gap-2 rounded-full bg-[var(--d-accent)] px-6 py-3 text-sm font-medium text-[#05070C] shadow-[0_0_28px_rgba(16,185,129,0.4)] transition-transform hover:scale-[1.03]"
            >
              {content.ctaPrimary}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.2} />
            </button>
            <button
              type="button"
              onClick={() => scrollToId("account")}
              className="rounded-full border border-[var(--d-line)] px-6 py-3 text-sm font-medium text-[var(--d-ink)] transition-colors hover:border-[var(--d-accent)]/50 hover:bg-[var(--d-panel)]"
            >
              {content.ctaSecondary}
            </button>
          </motion.div>

          <motion.dl
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease, delay: 0.28 }}
            className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-[var(--d-line)] pt-7"
          >
            {content.stats.map((s) => (
              <div key={s.label}>
                <dt className="text-2xl font-semibold text-[var(--d-ink)] [font-family:var(--demo-mono)]">
                  {s.value}
                </dt>
                <dd className="mt-1 text-[0.72rem] leading-snug text-[var(--d-ink-soft)]">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          initial={reduced ? false : { opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.15 }}
          className="flex flex-col items-center gap-4"
        >
          <Card3D content={content.card} localeTag={localeTag} currency={currency} />
          <p className="flex items-center gap-2 pt-1 text-[0.68rem] text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]">
            <MousePointer2 className="h-3.5 w-3.5 text-[var(--d-accent)]" strokeWidth={1.8} />
            {content.card.hint}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
