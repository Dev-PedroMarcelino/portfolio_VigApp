"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import type { HeroContent } from "./content";
import { HaloRing } from "./halo-ring";

export function HaloHero({ content }: { content: HeroContent }) {
  const reduce = useReducedMotion() ?? false;

  return (
    <section id="top" className="relative overflow-hidden px-5 pb-16 pt-32 sm:pt-36 md:pb-24">
      {/* Ambient glow field */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
        style={{
          background:
            "radial-gradient(60% 55% at 50% 8%, rgba(126,231,199,0.16) 0%, transparent 60%), radial-gradient(40% 40% at 82% 70%, rgba(126,231,199,0.08) 0%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.5]"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(var(--d-line) 1px, transparent 1px), linear-gradient(90deg, var(--d-line) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(70% 60% at 50% 30%, #000 0%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(70% 60% at 50% 30%, #000 0%, transparent 75%)",
        }}
      />

      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
        <div className="flex flex-col items-start">
          <motion.span
            initial={reduce ? undefined : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--d-line-bright)] bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-[var(--d-ink-dim)]"
          >
            <Sparkles className="h-3.5 w-3.5 text-[var(--d-accent)]" strokeWidth={2} aria-hidden />
            {content.badge}
          </motion.span>

          <motion.h1
            initial={reduce ? undefined : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-6 [font-family:var(--demo-display)] text-[2.6rem] font-medium leading-[1.02] tracking-tight text-[var(--d-ink)] sm:text-6xl md:text-[4.2rem]"
          >
            {content.titleTop}
            <br />
            <span className="text-[var(--d-accent)]">{content.titleAccent}</span>
          </motion.h1>

          <motion.p
            initial={reduce ? undefined : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-6 max-w-lg text-base leading-relaxed text-[var(--d-ink-dim)] md:text-[1.05rem]"
          >
            {content.sub}
          </motion.p>

          <motion.div
            initial={reduce ? undefined : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mt-8 flex flex-col items-start gap-3"
          >
            <a
              href="#pricing"
              className="group inline-flex items-center gap-2 rounded-full bg-[var(--d-accent)] px-7 py-3.5 text-sm font-semibold text-[#08130F] shadow-[0_0_40px_-8px_rgba(126,231,199,0.6)] transition-transform hover:scale-[1.03]"
            >
              {content.cta}
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" strokeWidth={2.2} aria-hidden />
            </a>
            <span className="text-xs text-[var(--d-ink-faint)]">{content.ctaNote}</span>
          </motion.div>

          <motion.dl
            initial={reduce ? undefined : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="mt-12 grid w-full max-w-md grid-cols-3 gap-4 border-t border-[var(--d-line)] pt-7"
          >
            {content.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="[font-family:var(--demo-display)] text-2xl font-medium text-[var(--d-ink)] md:text-[1.7rem]">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-[0.72rem] uppercase tracking-[0.12em] text-[var(--d-ink-faint)]">
                  {stat.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Product render */}
        <motion.div
          initial={reduce ? undefined : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md"
        >
          <span className="sr-only">{content.ringAlt}</span>
          <motion.div
            animate={reduce ? undefined : { y: [0, -14, 0] }}
            transition={reduce ? undefined : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <HaloRing className="h-auto w-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)]" />
          </motion.div>
        </motion.div>
      </div>

      <div className="mt-14 flex justify-center">
        <a
          href="#science"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[var(--d-ink-faint)] transition-colors hover:text-[var(--d-ink)]"
        >
          <span className="grid h-8 w-8 place-items-center rounded-full border border-[var(--d-line)]">
            <ArrowDown className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden />
          </span>
          {content.scrollCue}
        </a>
      </div>
    </section>
  );
}
