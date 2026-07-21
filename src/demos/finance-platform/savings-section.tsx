"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { Plus, PiggyBank } from "lucide-react";
import type { NuvexContent, GoalSeed } from "./content";
import { GOALS } from "./content";
import { SectionLabel, fmtWhole } from "./ui";

const R = 52;
const CIRC = 2 * Math.PI * R;

function ProgressRing({
  goal,
  content,
  localeTag,
  currency,
  reduced,
  play,
  delay,
}: {
  goal: GoalSeed;
  content: NuvexContent["savings"];
  localeTag: string;
  currency: string;
  reduced: boolean;
  play: boolean;
  delay: number;
}) {
  const pct = Math.min(1, goal.saved / goal.target);
  const [shown, setShown] = useState(0);
  const meta = content.goals[goal.id];

  useEffect(() => {
    if (!play) return;
    if (reduced) {
      setShown(pct);
      return;
    }
    const controls = animate(0, pct, {
      duration: 1.3,
      delay,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: setShown,
    });
    return () => controls.stop();
  }, [play, pct, reduced, delay]);

  return (
    <div className="flex flex-col items-center rounded-3xl border border-[var(--d-line)] bg-[var(--d-panel)] p-6 text-center transition-colors hover:border-[var(--d-accent)]/30">
      <div className="relative h-[132px] w-[132px]">
        <svg viewBox="0 0 132 132" className="h-full w-full -rotate-90">
          <circle cx="66" cy="66" r={R} fill="none" stroke="var(--d-line)" strokeWidth="8" />
          <circle
            cx="66"
            cy="66"
            r={R}
            fill="none"
            stroke={goal.color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={CIRC}
            strokeDashoffset={CIRC * (1 - shown)}
            style={{ filter: `drop-shadow(0 0 6px ${goal.color}66)` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-semibold text-[var(--d-ink)] [font-family:var(--demo-mono)]">
            {Math.round(shown * 100)}%
          </span>
          <span className="text-[0.58rem] uppercase tracking-[0.16em] text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]">
            {content.completeLabel}
          </span>
        </div>
      </div>
      <h3 className="mt-4 text-sm font-semibold text-[var(--d-ink)] [font-family:var(--demo-display)]">
        {meta.name}
      </h3>
      <p className="mt-1 text-[0.72rem] text-[var(--d-ink-soft)]">{meta.note}</p>
      <p className="mt-3 text-xs text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]">
        <span className="text-[var(--d-ink)]">{fmtWhole(goal.saved, localeTag, currency)}</span>{" "}
        {content.ofLabel} {fmtWhole(goal.target, localeTag, currency)}
      </p>
    </div>
  );
}

export function SavingsSection({
  content,
  localeTag,
  currency,
}: {
  content: NuvexContent["savings"];
  localeTag: string;
  currency: string;
}) {
  const reduced = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const total = GOALS.reduce((sum, g) => sum + g.saved, 0);

  return (
    <section
      id="savings"
      className="relative scroll-mt-16 border-t border-[var(--d-line)] bg-[var(--d-bg-soft)] py-24 sm:py-32"
    >
      <div ref={ref} className="mx-auto max-w-6xl px-5">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <SectionLabel text={content.label} />
            <h2 className="mt-5 text-3xl leading-tight text-[var(--d-ink)] [font-family:var(--demo-display)] sm:text-[2.6rem] sm:leading-[1.1]">
              {content.title}
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-[var(--d-ink-soft)]">{content.intro}</p>
          </div>
          <div className="rounded-2xl border border-[var(--d-line)] bg-[var(--d-panel)] px-5 py-4">
            <p className="flex items-center gap-1.5 text-[0.62rem] uppercase tracking-[0.18em] text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]">
              <PiggyBank className="h-3.5 w-3.5 text-[var(--d-accent)]" strokeWidth={1.8} />
              {content.totalLabel}
            </p>
            <p className="mt-1 text-2xl font-semibold text-[var(--d-ink)] [font-family:var(--demo-mono)]">
              {fmtWhole(total, localeTag, currency)}
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {GOALS.map((g, i) => (
            <ProgressRing
              key={g.id}
              goal={g}
              content={content}
              localeTag={localeTag}
              currency={currency}
              reduced={reduced}
              play={inView}
              delay={i * 0.12}
            />
          ))}
        </div>

        <button
          type="button"
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-[var(--d-line)] py-4 text-sm text-[var(--d-ink-soft)] transition-colors hover:border-[var(--d-accent)]/40 hover:text-[var(--d-ink)]"
        >
          <Plus className="h-4 w-4" strokeWidth={2} />
          {content.addGoal}
        </button>
      </div>
    </section>
  );
}
