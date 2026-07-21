"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { FinanceContent } from "./content";
import { PanelHead } from "./overview-panel";

export function FinancePanel({ content }: { content: FinanceContent }) {
  const reduce = useReducedMotion();
  const max = Math.max(...content.series.map((s) => Math.max(s.revenue, s.expenses)));
  const chartH = 220;
  const scale = (v: number) => (v / max) * chartH;

  return (
    <div className="flex flex-col gap-6">
      <PanelHead title={content.title} subtitle={content.subtitle} />

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        {content.summary.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-[var(--d-line)] bg-[var(--d-surface)] p-4"
          >
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.12em] text-[var(--d-ink-soft)]">
              {s.label}
            </p>
            <div className="mt-2 flex items-baseline gap-2">
              <p className="[font-family:var(--demo-display)] text-2xl font-semibold tracking-tight text-[var(--d-ink)]">
                {s.value}
              </p>
              <span
                className={`inline-flex items-center gap-0.5 text-[0.72rem] font-semibold ${
                  s.positive ? "text-[#5EEAD4]" : "text-[#FCD34D]"
                }`}
              >
                <ArrowUpRight className="h-3 w-3" strokeWidth={2.2} />
                {s.delta}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        {/* Chart */}
        <section className="rounded-2xl border border-[var(--d-line)] bg-[var(--d-surface)] p-5 lg:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="[font-family:var(--demo-display)] text-base font-semibold text-[var(--d-ink)]">
              {content.netLabel}
            </h3>
            <div className="flex items-center gap-4">
              <Legend color="var(--d-accent)" label={content.legendRevenue} />
              <Legend color="var(--d-amber)" label={content.legendExpenses} />
            </div>
          </div>

          <div className="mt-5 flex gap-3">
            {/* Y ticks */}
            <div
              className="flex flex-col justify-between py-0 text-right [font-family:var(--demo-mono)] text-[0.6rem] tabular-nums text-[var(--d-ink-faint)]"
              style={{ height: chartH }}
              aria-hidden
            >
              {content.ticks.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>

            {/* Plot */}
            <div className="relative flex-1">
              <div className="pointer-events-none absolute inset-0 flex flex-col justify-between" aria-hidden>
                {content.ticks.map((t, i) => (
                  <span
                    key={t}
                    className="w-full border-t border-[var(--d-line)]"
                    style={{ opacity: i === content.ticks.length - 1 ? 0.9 : 0.5 }}
                  />
                ))}
              </div>
              <div
                className="relative flex items-end justify-between gap-1.5 sm:gap-3"
                style={{ height: chartH }}
                role="img"
                aria-label={`${content.legendRevenue} / ${content.legendExpenses}`}
              >
                {content.series.map((pt, i) => (
                  <div key={pt.month} className="flex h-full flex-1 items-end justify-center gap-1">
                    <Bar
                      height={scale(pt.revenue)}
                      color="linear-gradient(180deg, #2DD4BF 0%, #14B8A6 100%)"
                      delay={reduce ? 0 : i * 0.05}
                      reduce={reduce ?? false}
                    />
                    <Bar
                      height={scale(pt.expenses)}
                      color="linear-gradient(180deg, #FBBF24 0%, #F59E0B 100%)"
                      delay={reduce ? 0 : i * 0.05 + 0.04}
                      reduce={reduce ?? false}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-2 flex justify-between gap-1.5 sm:gap-3">
                {content.series.map((pt) => (
                  <span
                    key={pt.month}
                    className="flex-1 text-center [font-family:var(--demo-mono)] text-[0.6rem] text-[var(--d-ink-faint)]"
                  >
                    {pt.month}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Cost breakdown */}
        <section className="rounded-2xl border border-[var(--d-line)] bg-[var(--d-surface)] p-5">
          <h3 className="[font-family:var(--demo-display)] text-base font-semibold text-[var(--d-ink)]">
            {content.breakdownTitle}
          </h3>
          <div className="mt-4 flex flex-col gap-4">
            {content.breakdown.map((b, i) => (
              <div key={b.label}>
                <div className="flex items-baseline justify-between">
                  <p className="text-sm text-[var(--d-ink-soft)]">{b.label}</p>
                  <p className="[font-family:var(--demo-mono)] text-[0.78rem] tabular-nums text-[var(--d-ink)]">
                    {b.value}
                  </p>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-[var(--d-panel-strong)]">
                  <motion.div
                    className="h-full rounded-full bg-[var(--d-accent)]"
                    initial={reduce ? false : { width: 0 }}
                    animate={{ width: `${b.pct}%` }}
                    transition={{ duration: 0.7, delay: reduce ? 0 : 0.15 + i * 0.08, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function Bar({
  height,
  color,
  delay,
  reduce,
}: {
  height: number;
  color: string;
  delay: number;
  reduce: boolean;
}) {
  return (
    <motion.div
      className="w-full max-w-[16px] rounded-t-[3px]"
      style={{ background: color }}
      initial={reduce ? false : { height: 0 }}
      animate={{ height }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    />
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[0.72rem] text-[var(--d-ink-soft)]">
      <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: color }} aria-hidden />
      {label}
    </span>
  );
}
