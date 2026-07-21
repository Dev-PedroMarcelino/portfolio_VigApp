"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Coffee,
  RotateCcw,
  Scale,
  Thermometer,
  Timer,
} from "lucide-react";
import type { BrewContent, BrewMethodId } from "./content";
import { SectionLabel } from "./ui";

const BREW_IMG =
  "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80";

export function BrewGuide({ content }: { content: BrewContent }) {
  const [methodId, setMethodId] = useState<BrewMethodId>("v60");
  const [stepIndex, setStepIndex] = useState(0);
  const reduce = useReducedMotion() ?? false;

  const method = content.methods.find((m) => m.id === methodId) ?? content.methods[0];
  const total = method.steps.length;
  const isDone = stepIndex >= total;
  const step = isDone ? null : method.steps[stepIndex];

  const selectMethod = (id: BrewMethodId) => {
    setMethodId(id);
    setStepIndex(0);
  };

  const params = [
    { icon: Scale, label: content.params.ratio, value: method.ratio },
    { icon: Thermometer, label: content.params.temp, value: method.temp },
    { icon: Timer, label: content.params.time, value: method.time },
    { icon: Coffee, label: content.params.grind, value: method.grind },
  ];

  return (
    <section id="brew" className="scroll-mt-20 bg-[var(--d-tan)] px-5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between gap-8">
          <div>
            <SectionLabel text={content.label} />
            <h2 className="mt-5 [font-family:var(--demo-display)] text-4xl tracking-tight text-[var(--d-ink)] md:text-5xl">
              {content.title}
            </h2>
            <p className="mt-4 max-w-xl leading-[1.85] text-[var(--d-ink-soft)]">{content.intro}</p>
          </div>
          <div className="relative hidden h-44 w-44 shrink-0 overflow-hidden rounded-full border-4 border-[var(--d-cream)] shadow-lg md:block">
            <Image
              src={BREW_IMG}
              alt={content.imageAlt}
              fill
              sizes="(min-width: 768px) 176px, 0px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[var(--d-accent)]/15" aria-hidden />
          </div>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div role="tablist" aria-label={content.label} className="flex flex-col gap-3">
              {content.methods.map((m) => {
                const selected = m.id === methodId;
                return (
                  <button
                    key={m.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => selectMethod(m.id)}
                    className={`flex items-center justify-between rounded-2xl border p-5 text-left transition-all ${
                      selected
                        ? "border-[var(--d-dark)] bg-[var(--d-dark)] text-[var(--d-sand)] shadow-lg"
                        : "border-[var(--d-line)] bg-[var(--d-cream)]/60 text-[var(--d-ink)] hover:border-[var(--d-accent)]/50"
                    }`}
                  >
                    <span>
                      <span className="block [font-family:var(--demo-display)] text-xl tracking-tight">
                        {m.label}
                      </span>
                      <span
                        className={`mt-0.5 block text-[0.72rem] ${
                          selected ? "text-[var(--d-sand-dim)]" : "text-[var(--d-ink-soft)]"
                        }`}
                      >
                        {m.tagline}
                      </span>
                    </span>
                    <ChevronRight
                      className={`h-4 w-4 transition-transform ${selected ? "translate-x-0.5" : "opacity-40"}`}
                      strokeWidth={2}
                      aria-hidden
                    />
                  </button>
                );
              })}
            </div>

            <dl className="mt-6 grid grid-cols-2 gap-3">
              {params.map((param) => (
                <div
                  key={param.label}
                  className="rounded-2xl border border-[var(--d-line)] bg-[var(--d-cream)]/60 p-4"
                >
                  <dt className="flex items-center gap-1.5 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-[var(--d-ink-soft)]">
                    <param.icon className="h-3.5 w-3.5 text-[var(--d-accent)]" strokeWidth={1.8} aria-hidden />
                    {param.label}
                  </dt>
                  <dd className="mt-1.5 text-sm font-medium text-[var(--d-ink)]">{param.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative flex min-h-[420px] flex-col overflow-hidden rounded-[2rem] bg-[var(--d-dark)] p-8 text-[var(--d-sand)] md:p-10">
            <div className="flex items-center justify-between text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[var(--d-sand-dim)]">
              <span aria-live="polite">
                {isDone
                  ? method.label
                  : content.stepCount
                      .replace("{n}", String(stepIndex + 1))
                      .replace("{total}", String(total))}
              </span>
              {step && (
                <span className="flex items-center gap-1.5 rounded-full border border-[var(--d-dark-line)] px-3 py-1.5 normal-case tracking-normal">
                  <Timer className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden />
                  {step.clock}
                </span>
              )}
            </div>

            <div className="flex flex-1 flex-col justify-center py-8">
              <AnimatePresence mode="wait">
                {step ? (
                  <motion.div
                    key={`${method.id}-${stepIndex}`}
                    initial={reduce ? undefined : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: -12 }}
                    transition={{ duration: 0.32, ease: "easeOut" }}
                  >
                    <span className="[font-family:var(--demo-display)] text-6xl italic text-[#D9906A]">
                      {String(stepIndex + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-4 [font-family:var(--demo-display)] text-3xl tracking-tight">
                      {step.title}
                    </h3>
                    <p className="mt-4 max-w-md leading-[1.85] text-[var(--d-sand-dim)]">
                      {step.detail}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key={`${method.id}-done`}
                    initial={reduce ? undefined : { opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={reduce ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.32, ease: "easeOut" }}
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#D9906A]/20 text-[#D9906A]">
                      <Check className="h-6 w-6" strokeWidth={2.2} aria-hidden />
                    </span>
                    <h3 className="mt-5 [font-family:var(--demo-display)] text-3xl italic tracking-tight">
                      {content.doneTitle}
                    </h3>
                    <p className="mt-4 max-w-md leading-[1.85] text-[var(--d-sand-dim)]">
                      {content.doneBody}
                    </p>
                    <button
                      type="button"
                      onClick={() => setStepIndex(0)}
                      className="mt-6 inline-flex items-center gap-2 rounded-full border border-[var(--d-dark-line)] px-5 py-2.5 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-[var(--d-sand)] transition-colors hover:bg-[var(--d-dark-line)]/40"
                    >
                      <RotateCcw className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
                      {content.restart}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between border-t border-[var(--d-dark-line)] pt-6">
              <div className="flex items-center gap-2">
                {method.steps.map((s, i) => (
                  <button
                    key={s.title}
                    type="button"
                    aria-label={content.jumpTo.replace("{n}", String(i + 1))}
                    aria-current={i === stepIndex}
                    onClick={() => setStepIndex(i)}
                    className={`h-2.5 rounded-full transition-all ${
                      i === stepIndex
                        ? "w-7 bg-[#D9906A]"
                        : i < stepIndex
                          ? "w-2.5 bg-[var(--d-sand)]/70"
                          : "w-2.5 bg-[var(--d-dark-line)]"
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label={content.back}
                  disabled={stepIndex === 0}
                  onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--d-dark-line)] text-[var(--d-sand)] transition-colors hover:bg-[var(--d-dark-line)]/40 disabled:opacity-30 disabled:hover:bg-transparent"
                >
                  <ChevronLeft className="h-4 w-4" strokeWidth={2.2} aria-hidden />
                </button>
                <button
                  type="button"
                  aria-label={content.next}
                  disabled={isDone}
                  onClick={() => setStepIndex((i) => Math.min(total, i + 1))}
                  className="flex h-11 items-center gap-2 rounded-full bg-[var(--d-sand)] px-5 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-[var(--d-dark)] transition-transform hover:scale-[1.04] disabled:opacity-30 disabled:hover:scale-100"
                >
                  {content.next}
                  <ChevronRight className="h-4 w-4" strokeWidth={2.2} aria-hidden />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
