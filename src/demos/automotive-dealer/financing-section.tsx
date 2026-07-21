"use client";

import { useId, useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { FinancingContent } from "./content";
import { SectionLabel, Speedlines, formatCurrency, scrollToId } from "./ui";

export function FinancingSection({ content }: { content: FinancingContent }) {
  const uid = useId();
  const [price, setPrice] = useState(content.priceDefault);
  const [down, setDown] = useState(content.downDefault);
  const [term, setTerm] = useState(content.termDefault);

  const cappedDown = Math.min(down, price);

  const result = useMemo(() => {
    const financed = Math.max(price - cappedDown, 0);
    const monthlyRate = content.apr / 100 / 12;
    const n = term;
    const monthly =
      monthlyRate === 0
        ? financed / n
        : (financed * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n));
    const totalPaid = monthly * n + cappedDown;
    const interest = monthly * n - financed;
    return { financed, monthly, totalPaid, interest };
  }, [price, cappedDown, term, content.apr]);

  const fmt = (n: number) => formatCurrency(n, content.priceLocale, content.currency);
  const downPct = price > 0 ? Math.round((cappedDown / price) * 100) : 0;

  return (
    <section id="financing" className="relative overflow-hidden bg-[var(--d-bg)] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-4">
          <SectionLabel text={content.label} />
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <h2 className="[font-family:var(--demo-display)] max-w-xl text-3xl uppercase leading-tight tracking-tight text-[var(--d-ink)] sm:text-5xl">
              {content.title}
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-[var(--d-ink-soft)]">{content.intro}</p>
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          {/* controls */}
          <div className="flex flex-col gap-8 border border-[var(--d-line)] bg-[var(--d-surface)] p-6 sm:p-8">
            <Slider
              id={`${uid}-price`}
              label={content.priceLabel}
              value={price}
              min={content.priceMin}
              max={content.priceMax}
              step={content.priceStep}
              onChange={setPrice}
              display={fmt(price)}
            />
            <Slider
              id={`${uid}-down`}
              label={content.downLabel}
              value={cappedDown}
              min={0}
              max={Math.min(content.downMax, price)}
              step={content.downStep}
              onChange={setDown}
              display={`${fmt(cappedDown)} · ${downPct}% ${content.downPctLabel}`}
            />

            <fieldset>
              <legend className="mb-3 flex items-center justify-between text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[var(--d-metal)]">
                <span>{content.termLabel}</span>
                <span className="text-[var(--d-ink-soft)]">
                  {term} {content.termUnit}
                </span>
              </legend>
              <div className="grid grid-cols-5 gap-2">
                {content.terms.map((t) => {
                  const on = t === term;
                  return (
                    <button
                      key={t}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setTerm(t)}
                      className={`border py-2.5 text-xs font-semibold tabular-nums transition-colors ${
                        on
                          ? "border-[var(--d-accent)] bg-[var(--d-surface-2)] text-[var(--d-ink)]"
                          : "border-[var(--d-line)] text-[var(--d-ink-soft)] hover:border-[var(--d-metal)]"
                      }`}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="flex items-center justify-between border-t border-[var(--d-line)] pt-5 text-sm">
              <span className="text-[var(--d-metal)]">{content.aprLabel}</span>
              <span className="[font-family:var(--demo-display)] text-lg text-[var(--d-ink)] tabular-nums">
                {content.apr.toLocaleString(content.priceLocale, { minimumFractionDigits: 1 })}%
              </span>
            </div>
          </div>

          {/* result */}
          <div className="relative flex flex-col justify-between overflow-hidden border border-[var(--d-line)] bg-[var(--d-carbon)] p-6 sm:p-8">
            <Speedlines className="right-0 top-0 h-full w-2/3 opacity-40" />
            <div className="relative">
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[var(--d-metal)]">
                {content.installmentLabel}
              </p>
              <motion.p
                key={Math.round(result.monthly)}
                initial={{ opacity: 0.5, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-2 flex items-baseline gap-1"
              >
                <span className="[font-family:var(--demo-display)] text-5xl text-[var(--d-ink)] tabular-nums sm:text-6xl">
                  {fmt(Math.round(result.monthly))}
                </span>
                <span className="text-sm font-semibold text-[var(--d-accent-soft)]">
                  {content.monthlyUnit}
                </span>
              </motion.p>
            </div>

            <dl className="relative mt-8 space-y-3 border-t border-[var(--d-line)] pt-6 text-sm">
              <ResultRow label={content.financedLabel} value={fmt(Math.round(result.financed))} />
              <ResultRow label={content.interestLabel} value={fmt(Math.round(result.interest))} />
              <ResultRow label={content.totalLabel} value={fmt(Math.round(result.totalPaid))} strong />
            </dl>

            <div className="relative mt-8">
              <button
                type="button"
                onClick={() => scrollToId("testdrive")}
                className="w-full skew-x-[-8deg] bg-[var(--d-accent)] px-6 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[var(--d-accent-soft)]"
              >
                <span className="inline-block skew-x-[8deg]">{content.ctaDrive}</span>
              </button>
              <p className="mt-4 text-[0.66rem] leading-relaxed text-[var(--d-metal)]">{content.disclaimer}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Slider({
  id,
  label,
  value,
  min,
  max,
  step,
  onChange,
  display,
}: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  display: string;
}) {
  const pct = max > min ? ((value - min) / (max - min)) * 100 : 0;
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <label
          htmlFor={id}
          className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[var(--d-metal)]"
        >
          {label}
        </label>
        <span className="[font-family:var(--demo-display)] text-sm text-[var(--d-ink)] tabular-nums">
          {display}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="apex-range"
        style={{
          background: `linear-gradient(to right, var(--d-accent) ${pct}%, rgba(255,255,255,0.08) ${pct}%)`,
        }}
      />
      <style>{`
        .apex-range {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 4px;
          border-radius: 2px;
          outline: none;
          cursor: pointer;
        }
        .apex-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #ffffff;
          border: 3px solid var(--d-accent);
          box-shadow: 0 2px 8px rgba(0,0,0,0.5);
        }
        .apex-range::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #ffffff;
          border: 3px solid var(--d-accent);
        }
      `}</style>
    </div>
  );
}

function ResultRow({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-[var(--d-metal)]">{label}</dt>
      <dd
        className={`text-right tabular-nums ${
          strong
            ? "[font-family:var(--demo-display)] text-lg text-[var(--d-ink)]"
            : "font-medium text-[var(--d-ink)]"
        }`}
      >
        {value}
      </dd>
    </div>
  );
}
