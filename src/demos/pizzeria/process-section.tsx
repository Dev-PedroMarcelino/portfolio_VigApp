"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { PizzeriaContent } from "./content";
import { Eyebrow, Reveal } from "./ui";

export function ProcessSection({
  content,
}: {
  content: PizzeriaContent["process"];
}) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const steps = content.steps;
  const step = steps[index];
  const progress = steps.length > 1 ? index / (steps.length - 1) : 1;

  return (
    <section id="impasto" className="relative scroll-mt-24 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="max-w-2xl">
          <Eyebrow tone="basil">{content.eyebrow}</Eyebrow>
          <h2 className="mt-5 [font-family:var(--demo-display)] text-4xl font-semibold tracking-tight sm:text-5xl">
            {content.title}
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[var(--d-ink-soft)]">
            {content.intro}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <div className="relative min-h-[300px] overflow-hidden rounded-[2rem] lg:min-h-[420px]">
            <Image
              src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1200&q=80"
              alt={content.kitchenAlt}
              fill
              sizes="(min-width: 1024px) 480px, 92vw"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(160deg,rgba(193,39,45,0.28),rgba(32,18,9,0.62))] mix-blend-multiply"
            />
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={step.number}
                aria-hidden
                className="absolute bottom-4 right-7 [font-family:var(--demo-display)] text-[7rem] font-semibold italic leading-none text-[#F5EBDC] opacity-90 lg:text-[9rem]"
                initial={reduce ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 0.92, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -18 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                {step.number}
              </motion.span>
            </AnimatePresence>
          </div>

          <div className="flex flex-col">
            <ol className="flex items-center gap-0">
              {steps.map((s, i) => {
                const active = i === index;
                return (
                  <li key={s.number} className="flex flex-1 items-center last:flex-none">
                    <button
                      type="button"
                      aria-label={`${content.stepAria} ${s.number} — ${s.title}`}
                      aria-current={active ? "step" : undefined}
                      onClick={() => setIndex(i)}
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border text-sm font-bold transition-colors ${
                        active
                          ? "border-[var(--d-red)] bg-[var(--d-red)] text-[#F5EBDC]"
                          : i < index
                            ? "border-[var(--d-basil)] bg-[var(--d-basil)] text-[#F5EBDC]"
                            : "border-[rgba(42,26,16,0.25)] text-[var(--d-ink-soft)] hover:border-[var(--d-ink)]"
                      }`}
                    >
                      {s.number}
                    </button>
                    {i < steps.length - 1 && (
                      <span
                        aria-hidden
                        className="mx-1.5 hidden h-px flex-1 bg-[rgba(42,26,16,0.18)] sm:block"
                      />
                    )}
                  </li>
                );
              })}
            </ol>

            <div className="mt-4 h-1 overflow-hidden rounded-full bg-[rgba(42,26,16,0.10)]">
              <motion.div
                className="h-full rounded-full bg-[var(--d-red)]"
                animate={{ width: `${Math.max(progress * 100, 4)}%` }}
                transition={{ duration: reduce ? 0 : 0.4, ease: "easeOut" }}
              />
            </div>

            <div className="relative mt-8 flex-1">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={step.number}
                  initial={reduce ? false : { opacity: 0, x: 26 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduce ? undefined : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <h3 className="[font-family:var(--demo-display)] text-3xl font-semibold italic tracking-tight text-[var(--d-red)]">
                    {step.title}
                  </h3>
                  <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-[var(--d-ink-soft)]">
                    {step.body}
                  </p>
                  <p className="mt-6 inline-flex items-baseline gap-2 rounded-2xl border border-[rgba(42,26,16,0.14)] bg-[var(--d-bg-soft)] px-5 py-3">
                    <span className="[font-family:var(--demo-display)] text-2xl font-bold text-[var(--d-basil)]">
                      {step.stat}
                    </span>
                    <span className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--d-ink-soft)]">
                      {step.statLabel}
                    </span>
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <button
                type="button"
                aria-label={content.prevAria}
                disabled={index === 0}
                onClick={() => setIndex((i) => Math.max(0, i - 1))}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(42,26,16,0.25)] transition-colors hover:bg-[rgba(42,26,16,0.06)] disabled:cursor-not-allowed disabled:opacity-35"
              >
                <ArrowLeft className="h-4 w-4" strokeWidth={2} aria-hidden />
              </button>
              <button
                type="button"
                aria-label={content.nextAria}
                disabled={index === steps.length - 1}
                onClick={() => setIndex((i) => Math.min(steps.length - 1, i + 1))}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--d-ink)] text-[#F5EBDC] transition-colors hover:bg-[var(--d-red)] disabled:cursor-not-allowed disabled:opacity-35"
              >
                <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
              </button>
              <span className="ml-2 text-xs font-semibold tabular-nums tracking-[0.2em] text-[var(--d-ink-soft)]">
                {step.number} / {steps[steps.length - 1].number}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
