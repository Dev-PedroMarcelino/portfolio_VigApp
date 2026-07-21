"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import type { HeroContent } from "./content";
import { GridLines, scrollToId } from "./ui";

const HERO_IMG =
  "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1400&q=80";

export function VoltixHero({
  content,
  onPreorder,
}: {
  content: HeroContent;
  onPreorder: () => void;
}) {
  const reduce = useReducedMotion() ?? false;

  return (
    <section className="relative overflow-hidden px-5 pb-20 pt-14 md:pb-28 md:pt-20">
      <GridLines />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[34rem] w-[54rem] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(0,212,255,0.22), rgba(124,92,255,0.10) 55%, transparent)",
        }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <motion.p
            initial={reduce ? undefined : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--d-accent)]/35 bg-[var(--d-accent)]/10 px-4 py-1.5 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-[var(--d-accent)]"
          >
            <Sparkles className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
            {content.kicker}
          </motion.p>

          <motion.h1
            initial={reduce ? undefined : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="mt-6 [font-family:var(--demo-display)] text-4xl font-bold leading-[1.05] tracking-tight text-[var(--d-ink)] sm:text-5xl md:text-6xl"
          >
            {content.titleTop}
            <span
              className="mt-1 block bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(92deg, #00D4FF 5%, #7C5CFF 55%, #FF4ECD 100%)",
              }}
            >
              {content.titleAccent}
            </span>
          </motion.h1>

          <motion.p
            initial={reduce ? undefined : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="mt-6 max-w-lg leading-[1.8] text-[var(--d-ink-dim)]"
          >
            {content.sub}
          </motion.p>

          <motion.div
            initial={reduce ? undefined : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.24 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <button
              type="button"
              onClick={onPreorder}
              className="group flex items-center gap-2.5 rounded-full bg-[var(--d-accent)] px-7 py-4 text-[0.74rem] font-bold uppercase tracking-[0.18em] text-[#04101C] shadow-[0_0_36px_rgba(0,212,255,0.4)] transition-transform hover:scale-[1.03]"
            >
              {content.ctaPrimary}
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                strokeWidth={2.4}
                aria-hidden
              />
            </button>
            <button
              type="button"
              onClick={() => scrollToId("compare")}
              className="rounded-full border border-[var(--d-line)] px-7 py-4 text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-[var(--d-ink)] transition-colors hover:border-[var(--d-accent)]/60 hover:text-[var(--d-accent)]"
            >
              {content.ctaSecondary}
            </button>
            <span className="font-mono text-sm text-[var(--d-ink-dim)]">{content.fromPrice}</span>
          </motion.div>

          <motion.div
            initial={reduce ? undefined : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.32 }}
            className="mt-10 max-w-lg rounded-2xl border border-[var(--d-line)] bg-[var(--d-panel)]/70 p-5 backdrop-blur-sm"
          >
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-[var(--d-accent)]">
              {content.statsTitle}
            </p>
            <dl className="mt-4 space-y-3.5">
              {content.stats.map((stat, i) => (
                <div key={stat.label}>
                  <div className="flex items-baseline justify-between text-[0.78rem]">
                    <dt className="text-[var(--d-ink-dim)]">{stat.label}</dt>
                    <dd className="font-mono font-semibold text-[var(--d-ink)]">{stat.value}</dd>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[var(--d-bg)]">
                    <motion.div
                      initial={reduce ? { width: `${stat.pct}%` } : { width: 0 }}
                      animate={{ width: `${stat.pct}%` }}
                      transition={{ duration: 1, delay: 0.5 + i * 0.14, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full rounded-full"
                      style={{
                        background: "linear-gradient(90deg, #00D4FF, #7C5CFF)",
                        boxShadow: "0 0 12px rgba(0,212,255,0.6)",
                      }}
                    />
                  </div>
                </div>
              ))}
            </dl>
          </motion.div>

          <p className="mt-6 text-[0.72rem] text-[var(--d-ink-dim)]">{content.footnote}</p>
        </div>

        <motion.div
          initial={reduce ? undefined : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div
            aria-hidden
            className="absolute -inset-8 rounded-[3rem] opacity-70 blur-2xl"
            style={{
              background:
                "radial-gradient(closest-side, rgba(0,212,255,0.28), rgba(124,92,255,0.14) 60%, transparent)",
            }}
          />
          <div
            className="relative overflow-hidden rounded-[2rem] border border-[var(--d-accent)]/25 shadow-[0_40px_120px_-30px_rgba(0,212,255,0.35)]"
            style={{ aspectRatio: "4 / 3.2" }}
          >
            <Image
              src={HERO_IMG}
              alt={content.imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 520px, 92vw"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(160deg, rgba(10,15,30,0.15) 0%, rgba(10,15,30,0.55) 78%, rgba(10,15,30,0.85) 100%), linear-gradient(20deg, rgba(0,212,255,0.14), transparent 45%)",
              }}
            />
            <span className="absolute left-5 top-5 rounded-full bg-[var(--d-accent)] px-3.5 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-[#04101C] shadow-[0_0_18px_rgba(0,212,255,0.6)]">
              {content.chipNew}
            </span>
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
              <p className="[font-family:var(--demo-display)] text-lg font-bold tracking-tight text-[var(--d-ink)]">
                Nova X1 Ultra
              </p>
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-[var(--d-accent)]">
                VX-2026
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
