"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Backpack, BookOpen, Palette, Sun, TreePine, Utensils } from "lucide-react";
import type { DayContent } from "./content";
import { Eyebrow, Star, Wave } from "./ui";

const ICONS = [Backpack, BookOpen, TreePine, Utensils, Palette, Sun];
const TONES = [
  { bg: "bg-[var(--d-sun-soft)]", ink: "text-[var(--d-sun-deep)]", dot: "bg-[var(--d-sun)]" },
  { bg: "bg-[var(--d-accent-soft)]", ink: "text-[var(--d-accent)]", dot: "bg-[var(--d-accent)]" },
  { bg: "bg-[var(--d-mint-soft)]", ink: "text-[var(--d-mint-deep)]", dot: "bg-[var(--d-mint)]" },
  { bg: "bg-[var(--d-coral-soft)]", ink: "text-[var(--d-coral-deep)]", dot: "bg-[var(--d-coral)]" },
  { bg: "bg-[var(--d-accent-soft)]", ink: "text-[var(--d-accent)]", dot: "bg-[var(--d-accent)]" },
  { bg: "bg-[var(--d-sun-soft)]", ink: "text-[var(--d-sun-deep)]", dot: "bg-[var(--d-sun)]" },
];

export function DayTimeline({ content }: { content: DayContent }) {
  const reduce = useReducedMotion();

  return (
    <section id="day" className="relative overflow-hidden bg-[var(--d-bg)] py-16 sm:py-24">
      <Star className="right-10 top-16 h-6 w-6 opacity-70" color="var(--d-sun)" />
      <Star className="left-8 top-40 h-4 w-4 opacity-60" color="var(--d-coral)" />

      <div className="relative z-10 mx-auto max-w-5xl px-5">
        <div className="max-w-2xl">
          <Eyebrow text={content.eyebrow} tone="sun" />
          <h2 className="mt-4 [font-family:var(--demo-display)] text-3xl font-extrabold leading-tight tracking-tight text-[var(--d-ink)] sm:text-4xl">
            {content.title}
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-[var(--d-ink-soft)]">{content.intro}</p>
        </div>

        <ol className="relative mt-10 space-y-4 sm:space-y-0">
          {/* vertical rail */}
          <span
            aria-hidden
            className="absolute left-[27px] top-2 bottom-2 w-1 rounded-full bg-[var(--d-line)] sm:left-1/2 sm:-translate-x-1/2"
          />
          {content.steps.map((step, i) => {
            const Icon = ICONS[i % ICONS.length];
            const tone = TONES[i % TONES.length];
            const left = i % 2 === 0;
            return (
              <motion.li
                key={step.title}
                initial={reduce ? undefined : { opacity: 0, y: 24 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className={`relative flex items-start gap-4 sm:w-1/2 sm:py-5 ${
                  left ? "sm:pr-12 sm:text-right" : "sm:ml-auto sm:flex-row-reverse sm:pl-12 sm:text-left"
                }`}
              >
                {/* node */}
                <span
                  className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${tone.bg} ${tone.ink} shadow-[0_10px_24px_-14px_rgba(22,35,61,0.5)] ring-4 ring-[var(--d-bg)]`}
                >
                  <Icon className="h-6 w-6" strokeWidth={2.2} />
                </span>
                <div className={`flex-1 rounded-[1.5rem] border border-[var(--d-line)] bg-white p-5 shadow-[0_16px_36px_-28px_rgba(22,35,61,0.5)]`}>
                  <p className={`[font-family:var(--demo-display)] text-lg font-extrabold ${tone.ink}`}>{step.clock}</p>
                  <h3 className="mt-0.5 [font-family:var(--demo-display)] text-lg font-extrabold text-[var(--d-ink)]">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--d-ink-soft)]">{step.detail}</p>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>

      <div className="mt-14">
        <Wave fill="var(--d-surface)" />
      </div>
    </section>
  );
}
