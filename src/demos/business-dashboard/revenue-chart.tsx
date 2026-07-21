"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import type { Content, CurrencyConfig, PeriodId } from "./content";
import { CHART_DATA, formatMoney } from "./content";
import { cx } from "./ui";

const W = 720;
const H = 240;
const PAD_TOP = 16;
const PAD_BOTTOM = 24;
const PLOT = H - PAD_TOP - PAD_BOTTOM;

function x(i: number, n: number) {
  return (i / (n - 1)) * W;
}
function y(v: number) {
  return PAD_TOP + PLOT * (1 - v / 100);
}

function linePath(points: number[]) {
  return points.map((v, i) => `${i === 0 ? "M" : "L"}${x(i, points.length).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
}
function areaPath(points: number[]) {
  const top = points
    .map((v, i) => `${i === 0 ? "M" : "L"}${x(i, points.length).toFixed(1)},${y(v).toFixed(1)}`)
    .join(" ");
  return `${top} L${W},${H - PAD_BOTTOM} L0,${H - PAD_BOTTOM} Z`;
}

export function RevenueChart({
  copy,
  period,
  currency,
}: {
  copy: Content["revenue"];
  period: PeriodId;
  currency: CurrencyConfig;
}) {
  const reduce = useReducedMotion() ?? false;
  const [hover, setHover] = useState<number | null>(null);
  const series = CHART_DATA[period];

  const { total, deltaPct, deltaUp, weekTotals } = useMemo(() => {
    const sum = series.revenue.reduce((a, b) => a + b, 0);
    const pct = ((series.total - series.prior) / series.prior) * 100;
    return {
      total: formatMoney(series.total, currency, { compact: true }),
      deltaPct: `${pct >= 0 ? "+" : ""}${pct.toFixed(1)}%`,
      deltaUp: pct >= 0,
      weekTotals: series.revenue.map((v) => (v / sum) * series.total),
    };
  }, [series, currency]);

  const n = series.revenue.length;
  const hi = hover;

  return (
    <section id={copy.id} className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[1.05fr_1fr]">
        <div className="rounded-2xl border border-[var(--d-line)] bg-[var(--d-surface)] p-5 sm:p-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="[font-family:var(--demo-mono)] text-[0.72rem] uppercase tracking-[0.22em] text-[var(--d-accent)]">
                {copy.eyebrow}
              </span>
              <h2 className="mt-1 [font-family:var(--demo-display)] text-2xl font-semibold tracking-tight text-[var(--d-ink)]">
                {copy.title}
              </h2>
            </div>
            <div className="text-right">
              <div className="text-[0.7rem] uppercase tracking-[0.14em] text-[var(--d-ink-faint)]">
                {copy.totalLabel}
              </div>
              <div className="[font-family:var(--demo-mono)] text-2xl font-medium text-[var(--d-ink)]">
                {total}
              </div>
              <div
                className={cx(
                  "mt-0.5 inline-flex items-center gap-1 text-[0.74rem] font-medium",
                  deltaUp ? "text-[var(--d-emerald)]" : "text-[var(--d-accent)]",
                )}
              >
                {deltaUp ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                {deltaPct}
                <span className="text-[var(--d-ink-faint)]">{copy.vsLabel}</span>
              </div>
            </div>
          </div>

          <div className="mt-5 flex items-center gap-4 text-[0.74rem] text-[var(--d-ink-soft)]">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--d-accent)]" />
              {copy.seriesRevenue}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-0.5 w-4 rounded-full bg-[var(--d-violet)]" />
              {copy.seriesTarget}
            </span>
          </div>

          <div className="relative mt-3">
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="w-full"
              role="img"
              aria-label={`${copy.title} — ${copy.seriesRevenue}`}
              onMouseLeave={() => setHover(null)}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const rel = (e.clientX - rect.left) / rect.width;
                setHover(Math.max(0, Math.min(n - 1, Math.round(rel * (n - 1)))));
              }}
            >
              <defs>
                <linearGradient id="pb-rev-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FB7185" stopOpacity="0.42" />
                  <stop offset="100%" stopColor="#FB7185" stopOpacity="0" />
                </linearGradient>
              </defs>

              {[0.25, 0.5, 0.75].map((g) => (
                <line
                  key={g}
                  x1={0}
                  x2={W}
                  y1={PAD_TOP + PLOT * g}
                  y2={PAD_TOP + PLOT * g}
                  stroke="var(--d-line)"
                  strokeWidth="1"
                  strokeDasharray="2 6"
                />
              ))}

              <motion.path
                initial={false}
                animate={{ d: areaPath(series.revenue) }}
                transition={{ duration: reduce ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
                fill="url(#pb-rev-fill)"
              />
              <motion.path
                initial={false}
                animate={{ d: linePath(series.target) }}
                transition={{ duration: reduce ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
                fill="none"
                stroke="var(--d-violet)"
                strokeWidth="2"
                strokeDasharray="5 5"
                strokeLinecap="round"
              />
              <motion.path
                initial={false}
                animate={{ d: linePath(series.revenue) }}
                transition={{ duration: reduce ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
                fill="none"
                stroke="var(--d-accent)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {hi !== null && (
                <g>
                  <line
                    x1={x(hi, n)}
                    x2={x(hi, n)}
                    y1={PAD_TOP}
                    y2={H - PAD_BOTTOM}
                    stroke="var(--d-line-strong)"
                    strokeWidth="1"
                  />
                  <circle cx={x(hi, n)} cy={y(series.revenue[hi])} r="4.5" fill="var(--d-accent)" stroke="var(--d-bg)" strokeWidth="2" />
                </g>
              )}
            </svg>

            {hi !== null && (
              <div
                className="pointer-events-none absolute -top-1 hidden -translate-x-1/2 rounded-lg border border-[var(--d-line-strong)] bg-[var(--d-bg)] px-2.5 py-1.5 text-center shadow-lg sm:block"
                style={{ left: `${(hi / (n - 1)) * 100}%` }}
              >
                <div className="[font-family:var(--demo-mono)] text-[0.66rem] text-[var(--d-ink-faint)]">
                  W{hi + 1}
                </div>
                <div className="[font-family:var(--demo-mono)] text-[0.8rem] font-medium text-[var(--d-ink)]">
                  {formatMoney(weekTotals[hi], currency, { compact: true })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 gap-4">
          {copy.kpis.map((k) => {
            const v = k.values[period];
            return (
              <div
                key={k.id}
                className="flex flex-col justify-between rounded-2xl border border-[var(--d-line)] bg-[var(--d-surface)] p-5"
              >
                <div className="text-[0.72rem] uppercase tracking-[0.12em] text-[var(--d-ink-faint)]">
                  {k.label}
                </div>
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={v.value}
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 [font-family:var(--demo-mono)] text-[1.6rem] font-medium leading-none text-[var(--d-ink)]"
                  >
                    {v.value}
                  </motion.div>
                </AnimatePresence>
                <div
                  className={cx(
                    "mt-2 inline-flex items-center gap-1 text-[0.74rem] font-medium",
                    v.trend === "up" ? "text-[var(--d-emerald)]" : "text-[var(--d-accent)]",
                  )}
                >
                  {v.trend === "up" ? (
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  ) : (
                    <ArrowDownRight className="h-3.5 w-3.5" />
                  )}
                  {v.delta}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
