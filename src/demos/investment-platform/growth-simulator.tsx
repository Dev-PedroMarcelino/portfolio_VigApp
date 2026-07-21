"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { animate, motion, useReducedMotion } from "framer-motion";
import { SIM_RATES, type StrategyId, type SliderConfig, type VantageContent } from "./content";
import { SectionLabel, fmtCompact, fmtCurrency } from "./ui";

/* ------------------------------------------------------------------ */
/* Math                                                                */
/* ------------------------------------------------------------------ */

const SAMPLES = 48;

/** Future value with monthly compounding at month t (t may be fractional). */
function futureValue(initial: number, monthly: number, months: number, annualPct: number): number {
  const r = annualPct / 100 / 12;
  const g = Math.pow(1 + r, months);
  return initial * g + monthly * ((g - 1) / r);
}

function niceCeil(v: number): number {
  if (v <= 0) return 1;
  const p = Math.pow(10, Math.floor(Math.log10(v)));
  const m = v / p;
  const nice = m <= 1 ? 1 : m <= 1.5 ? 1.5 : m <= 2 ? 2 : m <= 2.5 ? 2.5 : m <= 4 ? 4 : m <= 5 ? 5 : m <= 8 ? 8 : 10;
  return nice * p;
}

/* Chart geometry */
const W = 640;
const H = 300;
const PAD_TOP = 16;
const PAD_BOTTOM = 34;
const PAD_LEFT = 10;
const PAD_RIGHT = 10;
const BASE = H - PAD_BOTTOM;

function buildPath(values: number[], maxY: number): string {
  const span = W - PAD_LEFT - PAD_RIGHT;
  return values
    .map((v, i) => {
      const x = PAD_LEFT + (span * i) / (values.length - 1);
      const y = BASE - ((BASE - PAD_TOP) * v) / maxY;
      return `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");
}

/* ------------------------------------------------------------------ */
/* Animated currency readout                                           */
/* ------------------------------------------------------------------ */

function AnimatedAmount({
  value,
  localeTag,
  currency,
  reduced,
}: {
  value: number;
  localeTag: string;
  currency: string;
  reduced: boolean;
}) {
  const shown = useRef(value);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (reduced) {
      shown.current = value;
      setDisplay(value);
      return;
    }
    const controls = animate(shown.current, value, {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        shown.current = v;
        setDisplay(v);
      },
    });
    return () => controls.stop();
  }, [value, reduced]);

  return <span className="tabular-nums">{fmtCurrency(display, localeTag, currency)}</span>;
}

/* ------------------------------------------------------------------ */
/* Slider                                                              */
/* ------------------------------------------------------------------ */

function MandateSlider({
  id,
  config,
  value,
  onChange,
  format,
}: {
  id: string;
  config: SliderConfig;
  value: number;
  onChange: (v: number) => void;
  format: (v: number) => string;
}) {
  const pct = ((value - config.min) / (config.max - config.min)) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-[var(--d-ink-soft)]">
          {config.label}
        </label>
        <span className="font-mono text-sm tabular-nums text-[var(--d-gold)]">{format(value)}</span>
      </div>
      <input
        id={id}
        type="range"
        min={config.min}
        max={config.max}
        step={config.step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{
          background: `linear-gradient(to right, #D1B166 ${pct}%, #1E2A42 ${pct}%)`,
        }}
        className="mt-3 h-1 w-full cursor-pointer appearance-none rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[var(--d-gold)]/60 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-[#D1B166] [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#D1B166] [&::-webkit-slider-thumb]:shadow-[0_0_0_5px_rgba(209,177,102,0.18)]"
      />
      <div className="mt-2 flex justify-between text-[0.62rem] text-[var(--d-ink-soft)]/70">
        <span className="tabular-nums">{format(config.min)}</span>
        <span className="tabular-nums">{format(config.max)}</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export function GrowthSimulator({ content }: { content: VantageContent["simulator"] }) {
  const reduced = useReducedMotion() ?? false;
  const { currency, localeTag, controls } = content;

  const [initial, setInitial] = useState(controls.initial.initial);
  const [monthly, setMonthly] = useState(controls.monthly.initial);
  const [years, setYears] = useState(controls.years.initial);
  const [strategy, setStrategy] = useState<StrategyId>("balanced");

  const rate = SIM_RATES[strategy];

  const model = useMemo(() => {
    const months = years * 12;
    const projected: number[] = [];
    const contributed: number[] = [];
    for (let i = 0; i <= SAMPLES; i++) {
      const t = (months * i) / SAMPLES;
      projected.push(futureValue(initial, monthly, t, rate));
      contributed.push(initial + monthly * t);
    }
    const final = projected[SAMPLES];
    const invested = contributed[SAMPLES];
    const maxY = niceCeil(final * 1.06);
    return {
      final,
      invested,
      growth: final - invested,
      maxY,
      projectedPath: buildPath(projected, maxY),
      contributedPath: buildPath(contributed, maxY),
      areaPath: `${buildPath(projected, maxY)} L${W - PAD_RIGHT},${BASE} L${PAD_LEFT},${BASE} Z`,
    };
  }, [initial, monthly, years, rate]);

  const money = (v: number) => fmtCurrency(v, localeTag, currency);
  const pathTransition = { duration: reduced ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };

  const gridLines = [0.25, 0.5, 0.75, 1];
  const xTicks = [0, 1, 2, 3, 4].map((i) => Math.round((years * i) / 4));

  return (
    <section id="simulator" className="scroll-mt-20 border-t border-[var(--d-line)] bg-[var(--d-bg-soft)] py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-2xl">
          <SectionLabel text={content.label} />
          <h2 className="mt-5 [font-family:var(--demo-display)] text-3xl leading-tight text-[var(--d-ink)] sm:text-[2.6rem] sm:leading-[1.12]">
            {content.title}
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-[var(--d-ink-soft)]">{content.intro}</p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[380px_minmax(0,1fr)]">
          {/* Controls */}
          <div className="flex flex-col gap-8 rounded-2xl border border-[var(--d-line)] bg-[var(--d-panel)] p-7">
            <MandateSlider
              id="vc-sim-initial"
              config={controls.initial}
              value={initial}
              onChange={setInitial}
              format={money}
            />
            <MandateSlider
              id="vc-sim-monthly"
              config={controls.monthly}
              value={monthly}
              onChange={setMonthly}
              format={money}
            />
            <MandateSlider
              id="vc-sim-years"
              config={controls.years}
              value={years}
              onChange={setYears}
              format={(v) => `${v} ${content.yearsUnit}`}
            />

            <div>
              <p className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-[var(--d-ink-soft)]">
                {content.strategyLabel}
              </p>
              <div className="mt-3 grid grid-cols-3 gap-2" role="group" aria-label={content.strategyLabel}>
                {(Object.keys(SIM_RATES) as StrategyId[]).map((s) => {
                  const selected = strategy === s;
                  return (
                    <button
                      key={s}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setStrategy(s)}
                      className={`rounded-xl border px-2 py-3 text-center transition-colors ${
                        selected
                          ? "border-[var(--d-gold)] bg-[var(--d-gold)]/10 text-[var(--d-gold)]"
                          : "border-[var(--d-line)] text-[var(--d-ink-soft)] hover:border-[var(--d-gold)]/40 hover:text-[var(--d-ink)]"
                      }`}
                    >
                      <span className="block text-xs font-semibold">{content.strategies[s]}</span>
                      <span className="mt-1 block font-mono text-[0.66rem] tabular-nums opacity-80">
                        {SIM_RATES[s].toLocaleString(localeTag, { minimumFractionDigits: 1 })}% {content.rateSuffix}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Chart + results */}
          <div className="flex flex-col">
            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[var(--d-line)] bg-[var(--d-line)] sm:grid-cols-3">
              <div className="bg-[var(--d-panel)] px-6 py-5">
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[var(--d-ink-soft)]">
                  {content.results.projected}
                </p>
                <p className="mt-1.5 [font-family:var(--demo-display)] text-[1.65rem] leading-tight text-[var(--d-gold)]">
                  <AnimatedAmount value={model.final} localeTag={localeTag} currency={currency} reduced={reduced} />
                </p>
              </div>
              <div className="bg-[var(--d-panel)] px-6 py-5">
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[var(--d-ink-soft)]">
                  {content.results.contributed}
                </p>
                <p className="mt-1.5 [font-family:var(--demo-display)] text-[1.65rem] leading-tight text-[var(--d-ink)]">
                  <AnimatedAmount value={model.invested} localeTag={localeTag} currency={currency} reduced={reduced} />
                </p>
              </div>
              <div className="bg-[var(--d-panel)] px-6 py-5">
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[var(--d-ink-soft)]">
                  {content.results.growth}
                </p>
                <p className="mt-1.5 [font-family:var(--demo-display)] text-[1.65rem] leading-tight text-[var(--d-green)]">
                  +<AnimatedAmount value={model.growth} localeTag={localeTag} currency={currency} reduced={reduced} />
                </p>
              </div>
            </div>

            <div className="mt-6 flex-1 rounded-2xl border border-[var(--d-line)] bg-[#0A101D] p-5">
              <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={content.chart.projectedLegend} className="w-full">
                <defs>
                  <linearGradient id="vc-sim-area" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#D1B166" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="#D1B166" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {gridLines.map((g) => {
                  const y = BASE - (BASE - PAD_TOP) * g;
                  return (
                    <g key={g}>
                      <line x1={PAD_LEFT} x2={W - PAD_RIGHT} y1={y} y2={y} stroke="#1E2A42" strokeWidth="1" strokeDasharray={g === 1 ? "0" : "3 5"} />
                      <text x={PAD_LEFT + 2} y={y - 6} fontSize="10" fill="#9BA6BC" opacity="0.85">
                        {fmtCompact(model.maxY * g, localeTag, currency)}
                      </text>
                    </g>
                  );
                })}

                <line x1={PAD_LEFT} x2={W - PAD_RIGHT} y1={BASE} y2={BASE} stroke="#1E2A42" strokeWidth="1" />

                {xTicks.map((yr, i) => {
                  const x = PAD_LEFT + ((W - PAD_LEFT - PAD_RIGHT) * i) / 4;
                  return (
                    <text
                      key={i}
                      x={x}
                      y={H - 12}
                      fontSize="10"
                      fill="#9BA6BC"
                      textAnchor={i === 0 ? "start" : i === 4 ? "end" : "middle"}
                    >
                      {yr}
                    </text>
                  );
                })}
                <text x={W - PAD_RIGHT} y={H - 26} fontSize="9" fill="#6A7488" textAnchor="end" letterSpacing="2">
                  {content.chart.yearsAxis.toUpperCase()}
                </text>

                <motion.path
                  initial={false}
                  animate={{ d: model.areaPath }}
                  transition={pathTransition}
                  fill="url(#vc-sim-area)"
                />
                <motion.path
                  initial={false}
                  animate={{ d: model.contributedPath }}
                  transition={pathTransition}
                  fill="none"
                  stroke="#9BA6BC"
                  strokeWidth="1.5"
                  strokeDasharray="5 6"
                  opacity="0.7"
                />
                <motion.path
                  initial={false}
                  animate={{ d: model.projectedPath }}
                  transition={pathTransition}
                  fill="none"
                  stroke="#D1B166"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>

              <div className="mt-4 flex flex-wrap items-center gap-6 border-t border-[var(--d-line)] pt-4 text-[0.66rem] text-[var(--d-ink-soft)]">
                <span className="flex items-center gap-2">
                  <span aria-hidden className="h-0.5 w-6 rounded-full bg-[var(--d-gold)]" />
                  {content.chart.projectedLegend}
                </span>
                <span className="flex items-center gap-2">
                  <span
                    aria-hidden
                    className="h-0.5 w-6 rounded-full"
                    style={{
                      backgroundImage: "repeating-linear-gradient(to right, #9BA6BC 0 4px, transparent 4px 8px)",
                    }}
                  />
                  {content.chart.contributedLegend}
                </span>
              </div>
            </div>

            <p className="mt-4 text-[0.68rem] italic leading-relaxed text-[var(--d-ink-soft)]/80">
              {content.disclaimer}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
