"use client";

import { useMemo, useState } from "react";
import { Minus, Plus } from "lucide-react";
import type { CalculatorContent } from "./content";
import { SectionHeading } from "./ui";

const WEIGHT_MIN = 20;
const WEIGHT_MAX = 400;
const WEIGHT_STEP = 2.5;
const REP_MIN = 1;
const REP_MAX = 12;

function Stepper({
  label,
  value,
  suffix,
  onDec,
  onInc,
  onChange,
  min,
  max,
}: {
  label: string;
  value: number;
  suffix?: string;
  onDec: () => void;
  onInc: () => void;
  onChange: (v: number) => void;
  min: number;
  max: number;
}) {
  const id = `forge-${label.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <div>
      <label htmlFor={id} className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[var(--d-ink-faint)]">
        {label}
      </label>
      <div className="mt-2 flex items-stretch border border-[var(--d-line-bright)] bg-[#0B0B0D]">
        <button
          type="button"
          onClick={onDec}
          aria-label={`${label} -`}
          className="flex w-12 items-center justify-center border-r border-[var(--d-line-bright)] text-[var(--d-ink)] transition-colors hover:bg-[var(--d-accent)] hover:text-[#0B0B0D]"
        >
          <Minus className="h-4 w-4" strokeWidth={2.4} aria-hidden />
        </button>
        <div className="flex flex-1 items-baseline justify-center gap-1.5">
          <input
            id={id}
            type="number"
            inputMode="numeric"
            value={value}
            min={min}
            max={max}
            onChange={(e) => {
              const n = Number(e.target.value);
              if (Number.isFinite(n)) onChange(Math.min(max, Math.max(min, n)));
            }}
            className="w-20 bg-transparent py-4 text-center [font-family:var(--demo-display)] text-4xl text-[var(--d-ink)] outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          {suffix ? (
            <span className="text-[0.8rem] font-semibold text-[var(--d-ink-faint)]">{suffix}</span>
          ) : null}
        </div>
        <button
          type="button"
          onClick={onInc}
          aria-label={`${label} +`}
          className="flex w-12 items-center justify-center border-l border-[var(--d-line-bright)] text-[var(--d-ink)] transition-colors hover:bg-[var(--d-accent)] hover:text-[#0B0B0D]"
        >
          <Plus className="h-4 w-4" strokeWidth={2.4} aria-hidden />
        </button>
      </div>
    </div>
  );
}

export function RmCalculator({ content, locale }: { content: CalculatorContent; locale: string }) {
  const [weight, setWeight] = useState(100);
  const [reps, setReps] = useState(5);

  // Epley formula: 1RM = w * (1 + reps/30); a 1-rep set is already the max.
  const oneRm = useMemo(() => {
    if (reps <= 1) return weight;
    return Math.round(weight * (1 + reps / 30));
  }, [weight, reps]);

  const fmt = (n: number) => new Intl.NumberFormat(locale).format(n);

  return (
    <section id="lab" className="relative border-t border-[var(--d-line)] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading label={content.label} title={content.title} intro={content.intro} align="center" />

        <div className="mx-auto mt-14 grid max-w-5xl gap-5 lg:grid-cols-[1fr_1.1fr]">
          {/* Inputs + estimate */}
          <div className="border border-[var(--d-line)] bg-[var(--d-panel)] p-7">
            <div className="grid gap-5 sm:grid-cols-2">
              <Stepper
                label={content.weightLabel}
                value={weight}
                suffix={content.unit}
                min={WEIGHT_MIN}
                max={WEIGHT_MAX}
                onDec={() => setWeight((w) => Math.max(WEIGHT_MIN, w - WEIGHT_STEP))}
                onInc={() => setWeight((w) => Math.min(WEIGHT_MAX, w + WEIGHT_STEP))}
                onChange={setWeight}
              />
              <Stepper
                label={content.repsLabel}
                value={reps}
                suffix={content.repHint}
                min={REP_MIN}
                max={REP_MAX}
                onDec={() => setReps((r) => Math.max(REP_MIN, r - 1))}
                onInc={() => setReps((r) => Math.min(REP_MAX, r + 1))}
                onChange={(v) => setReps(Math.round(v))}
              />
            </div>

            <div className="mt-7 flex flex-col items-center border-t border-[var(--d-line)] pt-7 text-center">
              <span className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[var(--d-ink-faint)]">
                {content.estimateLabel}
              </span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="[font-family:var(--demo-display)] text-7xl leading-none text-[var(--d-accent)] sm:text-8xl">
                  {fmt(oneRm)}
                </span>
                <span className="[font-family:var(--demo-display)] text-3xl text-[var(--d-ink)]">
                  {content.estimateUnit}
                </span>
              </div>
              <p className="mt-4 text-[0.72rem] leading-relaxed text-[var(--d-ink-faint)]">
                {content.formulaNote}
              </p>
            </div>
          </div>

          {/* Training zones */}
          <div className="border border-[var(--d-line)] bg-[#0E0E11] p-7">
            <h3 className="[font-family:var(--demo-display)] text-2xl uppercase text-[var(--d-ink)]">
              {content.zonesTitle}
            </h3>
            <ul className="mt-5 flex flex-col gap-3">
              {content.zones.map((zone) => {
                const load = Math.round((oneRm * zone.pct) / 100);
                return (
                  <li key={zone.pct} className="flex items-center gap-4">
                    <span className="w-10 shrink-0 [font-family:var(--demo-display)] text-lg text-[var(--d-accent)]">
                      {zone.pct}%
                    </span>
                    <div className="flex-1">
                      <div className="flex items-baseline justify-between">
                        <span className="text-[0.82rem] font-semibold text-[var(--d-ink)]">
                          {zone.label}
                        </span>
                        <span className="[font-family:var(--demo-display)] text-lg text-[var(--d-ink)]">
                          {fmt(load)}
                          <span className="ml-1 text-[0.7rem] font-semibold text-[var(--d-ink-faint)]">
                            {content.unit}
                          </span>
                        </span>
                      </div>
                      <div className="mt-1.5 h-1.5 w-full overflow-hidden bg-[#1E1E22]">
                        <div
                          className="h-full bg-[var(--d-accent)] transition-[width] duration-500"
                          style={{ width: `${zone.pct}%` }}
                        />
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
