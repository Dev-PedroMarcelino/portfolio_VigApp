"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { AlarmClock } from "lucide-react";
import type { CountdownContent } from "./content";
import { SectionLabel } from "./ui";

/** Fixed deadline so SSR and CSR agree; applications close for Cohort 07. */
const DEADLINE = new Date("2026-09-08T23:59:00Z");

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  closed: boolean;
}

function computeLeft(now: number): TimeLeft {
  const diff = DEADLINE.getTime() - now;
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, closed: true };
  const seconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
    closed: false,
  };
}

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

export function CountdownSection({ content }: { content: CountdownContent }) {
  const reduce = useReducedMotion();
  const [left, setLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const tick = () => setLeft(computeLeft(Date.now()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const units = left
    ? [
        { label: content.days, value: pad(left.days) },
        { label: content.hours, value: pad(left.hours) },
        { label: content.minutes, value: pad(left.minutes) },
        { label: content.seconds, value: pad(left.seconds) },
      ]
    : [
        { label: content.days, value: "--" },
        { label: content.hours, value: "--" },
        { label: content.minutes, value: "--" },
        { label: content.seconds, value: "--" },
      ];

  return (
    <section className="relative overflow-hidden bg-[var(--d-charcoal-2)] py-16 text-[var(--d-cream)] lg:py-20" style={{ backgroundColor: "#161311" }}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #F59E0B, transparent)" }}
      />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="max-w-xl">
          <div className="flex items-center gap-2">
            <AlarmClock className="h-4 w-4 text-[var(--d-accent)]" strokeWidth={1.8} />
            <SectionLabel text={content.label} />
          </div>
          <h2 className="mt-5 [font-family:var(--demo-display)] text-3xl font-light leading-[1.08] tracking-[-0.01em] sm:text-4xl">
            {content.heading} <span className="italic text-[var(--d-accent)]">{content.headingItalic}</span>
          </h2>
          <p className="mt-4 text-[0.95rem] leading-relaxed text-[var(--d-cream-dim)]">
            {left?.closed ? content.closedNote : content.intro}
          </p>
        </div>

        {!left?.closed && (
          <div className="flex gap-3 sm:gap-4">
            {units.map((unit) => (
              <div
                key={unit.label}
                className="flex w-[4.6rem] flex-col items-center rounded-2xl border border-[var(--d-charcoal-line)] bg-[var(--d-charcoal-soft)] px-2 py-4 sm:w-[5.4rem]"
              >
                <motion.span
                  key={unit.value + unit.label}
                  initial={reduce ? false : { opacity: 0.4, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="[font-family:var(--demo-display)] text-3xl font-light tabular-nums text-[var(--d-accent)] sm:text-4xl"
                >
                  {unit.value}
                </motion.span>
                <span className="mt-2 text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-[var(--d-cream-dim)]">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
