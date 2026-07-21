"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Clock3 } from "lucide-react";
import { type EclatContent, formatDuration, unsplash } from "./content";

const EASE_SLOW: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function SignatureRitual({
  content,
  common,
}: {
  content: EclatContent["ritual"];
  common: EclatContent["common"];
}) {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const active = content.steps[activeIndex];

  return (
    <section
      id="ritual"
      className="relative overflow-hidden bg-[var(--d-plum)] py-24 text-[var(--d-on-plum)] sm:py-32"
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.14] bg-[radial-gradient(circle_at_20%_20%,rgba(176,107,126,0.9)_0%,transparent_45%),radial-gradient(circle_at_82%_78%,rgba(176,141,87,0.7)_0%,transparent_44%)]"
      />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-[10px] font-medium uppercase tracking-[0.5em] text-[var(--d-gold-bright)]">
            {content.eyebrow}
          </p>
          <h2 className="mt-5 [font-family:var(--demo-display)] text-4xl font-medium leading-[1.05] sm:text-6xl">
            {content.title}{" "}
            <span className="italic text-[var(--d-accent-bright)]">{content.titleItalic}</span>
          </h2>
          <p className="mt-6 text-sm font-light leading-relaxed text-[var(--d-on-plum-soft)]">
            {content.intro}
          </p>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="relative order-2 min-h-[26rem] overflow-hidden rounded-[2px] lg:order-1">
            <Image
              src={unsplash("photo-1540555700478-4be289fbecef", 1200)}
              alt={content.imageAlt}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 mix-blend-multiply bg-[linear-gradient(150deg,rgba(42,23,31,0.5)_0%,rgba(138,75,94,0.36)_100%)]"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(180deg,transparent_46%,rgba(42,23,31,0.72)_100%)]"
            />
            <div className="absolute inset-x-7 bottom-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.numeral}
                  initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, ease: EASE_SLOW }}
                >
                  <span className="text-[9px] uppercase tracking-[0.4em] text-[var(--d-gold-bright)]">
                    {content.stepLabel} {active.numeral}
                  </span>
                  <h3 className="mt-2 [font-family:var(--demo-display)] text-3xl italic leading-tight">
                    {active.name}
                  </h3>
                  <p className="mt-2 max-w-sm text-sm font-light leading-relaxed text-[var(--d-on-plum-soft)]">
                    {active.description}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-[var(--d-on-plum-soft)]">
                    <Clock3 aria-hidden className="h-3 w-3" strokeWidth={1.6} />
                    {formatDuration(active.durationMin, common.minShort)}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <ol className="order-1 lg:order-2">
            {content.steps.map((step, index) => {
              const selected = index === activeIndex;
              return (
                <li key={step.numeral} className="border-b border-[rgba(243,228,222,0.14)] last:border-b-0">
                  <button
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setActiveIndex(index)}
                    className="group flex w-full items-center gap-5 py-5 text-left transition-colors duration-300"
                  >
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border text-sm transition-colors duration-300 [font-family:var(--demo-display)] ${
                        selected
                          ? "border-[var(--d-gold-bright)] bg-[var(--d-gold-bright)] text-[var(--d-plum)]"
                          : "border-[rgba(243,228,222,0.28)] text-[var(--d-on-plum-soft)] group-hover:border-[var(--d-gold-bright)] group-hover:text-[var(--d-gold-bright)]"
                      }`}
                    >
                      {step.numeral}
                    </span>
                    <span className="flex-1">
                      <span
                        className={`[font-family:var(--demo-display)] block text-xl transition-colors duration-300 ${
                          selected ? "text-[var(--d-on-plum)]" : "text-[var(--d-on-plum-soft)]"
                        }`}
                      >
                        {step.name}
                      </span>
                    </span>
                    <span className="shrink-0 text-[10px] uppercase tracking-[0.2em] text-[var(--d-on-plum-soft)]">
                      {formatDuration(step.durationMin, common.minShort)}
                    </span>
                  </button>
                </li>
              );
            })}

            <li className="mt-8 flex flex-col gap-5 border-t border-[rgba(243,228,222,0.14)] pt-8 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="text-[9px] uppercase tracking-[0.4em] text-[var(--d-gold-bright)]">
                  {content.totalLabel}
                </span>
                <p className="mt-1 [font-family:var(--demo-display)] text-3xl">
                  {formatDuration(content.totalDurationMin, common.minShort)}
                </p>
              </div>
              <a
                href="#booking"
                className="inline-block border border-[var(--d-gold-bright)] bg-[var(--d-gold-bright)] px-7 py-3.5 text-center text-[10px] font-semibold uppercase tracking-[0.26em] text-[var(--d-plum)] transition-colors duration-300 hover:bg-transparent hover:text-[var(--d-gold-bright)]"
              >
                {content.ctaLabel}
              </a>
            </li>
          </ol>
        </div>

        <p className="mt-12 max-w-xl text-xs font-light italic leading-relaxed text-[var(--d-on-plum-soft)]">
          {content.closingNote}
        </p>
      </div>
    </section>
  );
}
