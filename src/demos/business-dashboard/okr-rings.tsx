"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Content, ObjectiveData, PeriodId } from "./content";
import { TONE_HEX, cx } from "./ui";

const R = 46;
const CIRC = 2 * Math.PI * R;

function Ring({
  value,
  hex,
  active,
  reduce,
  inView,
}: {
  value: number;
  hex: string;
  active: boolean;
  reduce: boolean;
  inView: boolean;
}) {
  const target = inView ? CIRC * (1 - value / 100) : CIRC;
  return (
    <svg viewBox="0 0 110 110" className="h-28 w-28 -rotate-90">
      <circle cx="55" cy="55" r={R} fill="none" stroke="var(--d-line)" strokeWidth="8" />
      <motion.circle
        cx="55"
        cy="55"
        r={R}
        fill="none"
        stroke={hex}
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={CIRC}
        initial={false}
        animate={{ strokeDashoffset: reduce ? CIRC * (1 - value / 100) : target }}
        transition={{ duration: reduce ? 0 : 1.1, ease: [0.16, 1, 0.3, 1] }}
        style={{ filter: active ? `drop-shadow(0 0 8px ${hex}66)` : "none" }}
      />
    </svg>
  );
}

export function OkrRings({
  copy,
  data,
  period,
  onSelect,
  selectedId,
}: {
  copy: Content["okr"];
  data: ObjectiveData[];
  period: PeriodId;
  onSelect: (id: string) => void;
  selectedId: string | null;
}) {
  const reduce = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });

  const byId = new Map(data.map((d) => [d.id, d]));

  return (
    <section id={copy.id} ref={ref} className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-2">
        <span className="[font-family:var(--demo-mono)] text-[0.72rem] uppercase tracking-[0.22em] text-[var(--d-accent)]">
          {copy.eyebrow}
        </span>
        <h2 className="[font-family:var(--demo-display)] text-2xl font-semibold tracking-tight text-[var(--d-ink)] sm:text-[1.7rem]">
          {copy.title}
        </h2>
        <p className="max-w-2xl text-sm leading-relaxed text-[var(--d-ink-soft)]">{copy.subtitle}</p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {copy.objectives.map((obj) => {
          const d = byId.get(obj.id) as ObjectiveData;
          const hex = TONE_HEX[d.tone];
          const value = d.values[period];
          const active = selectedId === obj.id;
          return (
            <button
              key={obj.id}
              onClick={() => onSelect(obj.id)}
              aria-label={`${obj.label} — ${copy.ringHint}`}
              className={cx(
                "group relative flex flex-col items-center overflow-hidden rounded-2xl border p-5 text-center transition-colors",
                active
                  ? "border-[var(--d-line-strong)] bg-[var(--d-surface-2)]"
                  : "border-[var(--d-line)] bg-[var(--d-surface)] hover:border-[var(--d-line-strong)]",
              )}
            >
              <span
                className="pointer-events-none absolute -top-16 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full opacity-40 blur-2xl transition-opacity group-hover:opacity-70"
                style={{ background: hex }}
                aria-hidden
              />
              <div className="relative">
                <Ring value={value} hex={hex} active={active} reduce={reduce} inView={inView} />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="[font-family:var(--demo-mono)] text-2xl font-medium text-[var(--d-ink)]">
                    {value}
                    <span className="text-sm text-[var(--d-ink-faint)]">%</span>
                  </span>
                </div>
              </div>
              <h3 className="mt-4 text-[0.95rem] font-semibold text-[var(--d-ink)]">{obj.label}</h3>
              <p className="mt-1 text-[0.78rem] leading-snug text-[var(--d-ink-faint)]">{obj.caption}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-[0.72rem] font-medium text-[var(--d-ink-soft)] transition-colors group-hover:text-[var(--d-accent)]">
                {copy.ringHint}
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.8} />
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
