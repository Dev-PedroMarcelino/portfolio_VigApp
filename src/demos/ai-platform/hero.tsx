"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";
import type { HeroContent } from "./content";
import { Glow, GridPattern, scrollToId } from "./ui";
import { NeuralOrb } from "./neural-orb";

export function Hero({ content }: { content: HeroContent }) {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden pb-20 pt-16 sm:pt-24">
      <GridPattern />
      <Glow className="left-1/2 top-[-10%] h-[46rem] w-[46rem] -translate-x-1/2" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="flex flex-col items-start">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--d-line)] bg-[var(--d-panel)] px-3.5 py-1.5 text-[0.68rem] font-medium tracking-wide text-[var(--d-accent-bright)] [font-family:var(--demo-mono)]"
          >
            <Sparkles className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
            {content.badge}
          </motion.p>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-6 [font-family:var(--demo-display)] text-4xl font-semibold leading-[1.05] tracking-tight text-[var(--d-ink)] sm:text-5xl lg:text-[3.6rem]"
          >
            {content.titlePre}{" "}
            <span className="bg-gradient-to-r from-[var(--d-accent-bright)] via-[var(--d-accent)] to-[#6D28D9] bg-clip-text text-transparent">
              {content.titleAccent}
            </span>{" "}
            {content.titlePost}
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-6 max-w-xl text-[1rem] leading-relaxed text-[var(--d-ink-soft)]"
          >
            {content.promise}
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <button
              type="button"
              onClick={() => scrollToId("playground")}
              className="group inline-flex items-center gap-2 rounded-full bg-[var(--d-accent)] px-6 py-3 text-[0.9rem] font-semibold text-[var(--d-accent-ink)] shadow-[0_0_34px_-6px_var(--d-accent)] transition-transform hover:scale-[1.03]"
            >
              {content.ctaPrimary}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.2} aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => scrollToId("models")}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--d-line-strong)] px-6 py-3 text-[0.9rem] font-medium text-[var(--d-ink)] transition-colors hover:bg-[var(--d-panel)]"
            >
              <BookOpen className="h-4 w-4" strokeWidth={2} aria-hidden />
              {content.ctaSecondary}
            </button>
          </motion.div>

          <motion.dl
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="mt-12 grid w-full max-w-lg grid-cols-3 gap-4 border-t border-[var(--d-line)] pt-7"
          >
            {content.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="[font-family:var(--demo-display)] text-2xl font-semibold text-[var(--d-ink)] sm:text-3xl">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-[0.72rem] leading-tight text-[var(--d-ink-faint)]">{stat.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Orb + terminal readout */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="relative aspect-square">
            <NeuralOrb className="absolute inset-0" />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-full"
              style={{
                boxShadow: "inset 0 0 120px -40px rgba(167,139,250,0.5)",
              }}
            />
          </div>

          <div className="relative -mt-6 rounded-2xl border border-[var(--d-line)] bg-[rgba(11,10,20,0.72)] p-4 shadow-[0_40px_120px_-50px_rgba(0,0,0,0.9)] backdrop-blur-xl">
            <div className="mb-3 flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#F87171]" aria-hidden />
              <span className="h-2.5 w-2.5 rounded-full bg-[#FBBF24]" aria-hidden />
              <span className="h-2.5 w-2.5 rounded-full bg-[#34D399]" aria-hidden />
            </div>
            <div className="space-y-1.5 [font-family:var(--demo-mono)] text-[0.72rem] leading-relaxed">
              {content.terminalLines.map((line, i) => (
                <motion.p
                  key={line}
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.35 }}
                  className={
                    i === 0
                      ? "text-[var(--d-accent-bright)]"
                      : i === content.terminalLines.length - 1
                        ? "text-[#6EE7B7]"
                        : "text-[var(--d-ink-soft)]"
                  }
                >
                  {line}
                </motion.p>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
