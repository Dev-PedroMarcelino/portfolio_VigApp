"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import type { LawContent, Stat } from "./content";
import { EngravedRule } from "./castellan-reis";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const DURATION_MS = 1800;

/** Ease-out cubic for a dignified, decelerating count. */
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function useCountUp(target: number, active: boolean, reduce: boolean | null): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (reduce) {
      setValue(target);
      return;
    }
    let raf = 0;
    let start: number | null = null;
    const tick = (now: number) => {
      if (start === null) start = now;
      const progress = Math.min((now - start) / DURATION_MS, 1);
      setValue(target * easeOutCubic(progress));
      if (progress < 1) raf = requestAnimationFrame(tick);
      else setValue(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, reduce]);

  return value;
}

function StatValue({
  stat,
  active,
  reduce,
  formatCurrencyCompact,
  formatInteger,
}: {
  stat: Stat;
  active: boolean;
  reduce: boolean | null;
  formatCurrencyCompact: (value: number) => string;
  formatInteger: (value: number) => string;
}) {
  const current = useCountUp(stat.value, active, reduce);

  let display: string;
  if (stat.kind === "currency") {
    display = formatCurrencyCompact(current);
  } else if (stat.kind === "percent") {
    display = `${Math.round(current)}%`;
  } else {
    display = `${formatInteger(Math.round(current))}${stat.suffix ?? ""}`;
  }

  return (
    <span className="[font-family:var(--demo-display)] block text-[clamp(2.6rem,6vw,4rem)] font-normal leading-none text-[var(--d-bronze-bright)]">
      {display}
    </span>
  );
}

export function Results({
  content,
  formatCurrencyCompact,
  formatInteger,
}: {
  content: LawContent["results"];
  formatCurrencyCompact: (value: number) => string;
  formatInteger: (value: number) => string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section id="results" className="relative isolate overflow-hidden bg-[var(--d-navy-deep)] py-24 sm:py-32">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_50%_-10%,rgba(140,111,63,0.14),transparent_60%)]"
      />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <header className="mx-auto max-w-2xl text-center">
          <span className="mx-auto flex w-max">
            <EngravedRule />
          </span>
          <p className="mt-5 text-[10px] font-medium uppercase tracking-[0.4em] text-[var(--d-bronze-bright)]">
            {content.eyebrow}
          </p>
          <h2 className="[font-family:var(--demo-display)] mt-5 text-4xl font-normal leading-tight text-[var(--d-ink)] sm:text-5xl">
            {content.title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-[var(--d-ink-soft)]">
            {content.intro}
          </p>
        </header>

        <div ref={ref} className="mt-16 grid gap-px overflow-hidden border border-[var(--d-line-soft)] bg-[var(--d-line-soft)] sm:grid-cols-2 lg:grid-cols-4">
          {content.stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={reduce ? undefined : { opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.7, ease: EASE, delay: index * 0.12 }}
              className="bg-[var(--d-navy)] px-7 py-12 text-center"
            >
              <StatValue
                stat={stat}
                active={inView}
                reduce={reduce}
                formatCurrencyCompact={formatCurrencyCompact}
                formatInteger={formatInteger}
              />
              <p className="[font-family:var(--demo-display)] mt-5 text-base font-normal text-[var(--d-ink)]">
                {stat.label}
              </p>
              <p className="mt-2 text-[10px] uppercase tracking-[0.24em] text-[var(--d-ink-faint)]">
                {stat.caption}
              </p>
            </motion.div>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-[11px] italic leading-relaxed text-[var(--d-ink-faint)]">
          {content.footnote}
        </p>
      </div>
    </section>
  );
}
