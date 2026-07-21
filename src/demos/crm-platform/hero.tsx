"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import type { HeroContent } from "./content";
import { PipelineBoard } from "./pipeline-board";
import { scrollToId } from "./ui";

export function Hero({ content }: { content: HeroContent }) {
  const reduce = useReducedMotion();

  return (
    <section id="top" className="relative overflow-hidden">
      {/* Soft ambient wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 82% -10%, rgba(79,70,229,0.14), transparent 55%), radial-gradient(90% 70% at 6% 0%, rgba(14,165,233,0.1), transparent 50%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(30,27,75,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(30,27,75,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 20%, transparent 90%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 20%, transparent 90%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-14 sm:pt-20">
        <div className="flex flex-col items-center text-center">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--d-line)] bg-[var(--d-surface)] px-3.5 py-1.5 text-[0.72rem] font-medium text-[var(--d-ink-soft)] shadow-[0_4px_14px_-8px_rgba(30,27,75,0.4)]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--d-accent)]" aria-hidden />
            {content.badge}
          </motion.p>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.06 }}
            className="mt-6 max-w-3xl [font-family:var(--demo-display)] text-[2.6rem] font-semibold leading-[1.04] tracking-tight text-[var(--d-ink)] sm:text-6xl"
          >
            {content.titleTop}{" "}
            <span className="relative whitespace-nowrap text-[var(--d-accent)]">
              {content.titleAccent}
              <svg
                className="absolute -bottom-2 left-0 h-3 w-full text-[var(--d-accent)]/35"
                viewBox="0 0 200 12"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden
              >
                <path d="M2 8C40 3 160 3 198 8" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
              </svg>
            </span>
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="mt-6 max-w-xl text-[0.98rem] leading-relaxed text-[var(--d-ink-soft)]"
          >
            {content.sub}
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row"
          >
            <button
              type="button"
              onClick={() => scrollToId("cta")}
              className="group inline-flex items-center gap-2 rounded-full bg-[var(--d-accent)] px-6 py-3 text-sm font-semibold text-[var(--d-accent-ink)] shadow-[0_16px_36px_-14px_rgba(79,70,229,0.95)] transition-transform hover:scale-[1.03]"
            >
              {content.ctaPrimary}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => scrollToId("features")}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--d-line-strong)] bg-[var(--d-surface)] px-6 py-3 text-sm font-semibold text-[var(--d-ink)] transition-colors hover:bg-[var(--d-bg)]"
            >
              <Play className="h-3.5 w-3.5 text-[var(--d-accent)]" strokeWidth={2.4} aria-hidden />
              {content.ctaSecondary}
            </button>
          </motion.div>
        </div>

        {/* Embedded interactive board */}
        <motion.div
          id="pipeline"
          initial={reduce ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.24 }}
          className="mt-14 scroll-mt-24"
        >
          <p className="mb-3 flex items-center justify-center gap-2 text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-[var(--d-ink-faint)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--d-accent)]" aria-hidden />
            {content.boardEyebrow}
          </p>
          <PipelineBoard content={content.pipeline} />
        </motion.div>

        {/* Stat strip */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {content.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={reduce ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="flex items-center gap-3 rounded-2xl border border-[var(--d-line)] bg-[var(--d-surface)] px-5 py-4"
            >
              <span className="[font-family:var(--demo-display)] text-3xl font-semibold tracking-tight text-[var(--d-accent)]">
                {stat.value}
              </span>
              <span className="text-[0.8rem] leading-snug text-[var(--d-ink-soft)]">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
