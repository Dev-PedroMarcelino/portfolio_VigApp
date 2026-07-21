"use client";

import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type {
  AnalyticsContent,
  RangeData,
  RangeId,
  SeriesId,
} from "./content";
import { SERIES_COLORS, cx, formatNumber } from "./ui";

const W = 1000;
const H = 340;
const PAD_X = 10;
const PAD_TOP = 22;
const PAD_BOTTOM = 26;

const SERIES_ORDER: SeriesId[] = ["revenue", "sessions", "conversions"];

function scaleX(i: number, n: number) {
  return n <= 1 ? PAD_X : PAD_X + (i * (W - PAD_X * 2)) / (n - 1);
}

function normalize(values: number[]) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  return values.map((v) => (v - min) / span);
}

function scaleY(norm: number) {
  return PAD_TOP + (H - PAD_TOP - PAD_BOTTOM) * (1 - norm);
}

function pathFrom(values: number[]) {
  const norm = normalize(values);
  return norm
    .map((nv, i) => `${i === 0 ? "M" : "L"}${scaleX(i, values.length).toFixed(1)},${scaleY(nv).toFixed(1)}`)
    .join(" ");
}

export function LineChart({
  content,
  data,
  range,
}: {
  content: AnalyticsContent;
  data: RangeData;
  range: RangeId;
}) {
  const reduce = useReducedMotion();
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [hidden, setHidden] = useState<Set<SeriesId>>(() => new Set());
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  const n = data.points;

  const primary = data.series.revenue;
  const peakIdx = useMemo(
    () => primary.reduce((best, v, i) => (v > primary[best] ? i : best), 0),
    [primary],
  );
  const avg = useMemo(
    () => primary.reduce((a, b) => a + b, 0) / primary.length,
    [primary],
  );
  const avgY = useMemo(() => {
    const min = Math.min(...primary);
    const max = Math.max(...primary);
    const span = max - min || 1;
    return scaleY((avg - min) / span);
  }, [primary, avg]);

  function toggle(id: SeriesId) {
    setHidden((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else if (next.size < SERIES_ORDER.length - 1) next.add(id);
      return next;
    });
  }

  function handleMove(clientX: number) {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const rel = (clientX - rect.left) / rect.width;
    const idx = Math.round(rel * (n - 1));
    setHoverIdx(Math.max(0, Math.min(n - 1, idx)));
  }

  const visible = SERIES_ORDER.filter((s) => !hidden.has(s));

  return (
    <section
      id="overview"
      aria-label={content.chart.title}
      className="scroll-mt-32 overflow-hidden rounded-2xl border border-[var(--d-line)] bg-[var(--d-surface)]"
    >
      <div className="flex flex-col gap-4 border-b border-[var(--d-line)] p-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-base font-semibold tracking-tight text-[var(--d-ink)] [font-family:var(--demo-display)]">
            {content.chart.title}
          </h2>
          <p className="mt-1 max-w-md text-[13px] text-[var(--d-ink-soft)]">
            {content.chart.subtitle}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {content.chart.series.map((s) => {
            const on = !hidden.has(s.id);
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => toggle(s.id)}
                aria-pressed={on}
                className={cx(
                  "flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors [font-family:var(--demo-mono)]",
                  on
                    ? "border-[var(--d-line-strong)] text-[var(--d-ink)]"
                    : "border-[var(--d-line)] text-[var(--d-ink-faint)]",
                )}
              >
                <span
                  className="h-2 w-2 rounded-full transition-opacity"
                  style={{
                    backgroundColor: SERIES_COLORS[s.id],
                    opacity: on ? 1 : 0.3,
                  }}
                />
                {s.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative p-4">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          className="h-[280px] w-full touch-none sm:h-[320px]"
          preserveAspectRatio="none"
          onMouseMove={(e) => handleMove(e.clientX)}
          onMouseLeave={() => setHoverIdx(null)}
          role="img"
          aria-label={content.chart.axisNote}
        >
          <defs>
            {SERIES_ORDER.map((s) => (
              <linearGradient key={s} id={`grad-${s}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={SERIES_COLORS[s]} stopOpacity="0.24" />
                <stop offset="100%" stopColor={SERIES_COLORS[s]} stopOpacity="0" />
              </linearGradient>
            ))}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* glowing horizontal grid */}
          {[0, 0.25, 0.5, 0.75, 1].map((g) => {
            const y = PAD_TOP + (H - PAD_TOP - PAD_BOTTOM) * g;
            return (
              <line
                key={g}
                x1={PAD_X}
                x2={W - PAD_X}
                y1={y}
                y2={y}
                stroke="var(--d-accent)"
                strokeOpacity={g === 1 ? 0.14 : 0.06}
                strokeWidth={1}
              />
            );
          })}

          {/* average marker on primary series */}
          {visible.includes("revenue") && (
            <line
              x1={PAD_X}
              x2={W - PAD_X}
              y1={avgY}
              y2={avgY}
              stroke={SERIES_COLORS.revenue}
              strokeOpacity={0.4}
              strokeWidth={1}
              strokeDasharray="4 5"
            />
          )}

          {/* areas + lines, redrawn on every range switch */}
          <AnimatePresence>
            {visible.map((s) => {
              const d = pathFrom(data.series[s]);
              const area = `${d} L${scaleX(n - 1, n).toFixed(1)},${H - PAD_BOTTOM} L${scaleX(0, n).toFixed(1)},${H - PAD_BOTTOM} Z`;
              return (
                <g key={`${s}-${range}`}>
                  <motion.path
                    d={area}
                    fill={`url(#grad-${s})`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                  <motion.path
                    d={d}
                    fill="none"
                    stroke={SERIES_COLORS[s]}
                    strokeWidth={s === "revenue" ? 2.4 : 1.8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter={s === "revenue" ? "url(#glow)" : undefined}
                    initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: reduce ? 0 : 1, ease: "easeInOut" }}
                  />
                </g>
              );
            })}
          </AnimatePresence>

          {/* peak marker */}
          {visible.includes("revenue") && (
            <circle
              cx={scaleX(peakIdx, n)}
              cy={scaleY(normalize(primary)[peakIdx])}
              r={4}
              fill={SERIES_COLORS.revenue}
              stroke="var(--d-bg)"
              strokeWidth={2}
            />
          )}

          {/* hover crosshair */}
          {hoverIdx !== null && (
            <g>
              <line
                x1={scaleX(hoverIdx, n)}
                x2={scaleX(hoverIdx, n)}
                y1={PAD_TOP}
                y2={H - PAD_BOTTOM}
                stroke="var(--d-ink-soft)"
                strokeOpacity={0.4}
                strokeWidth={1}
              />
              {visible.map((s) => (
                <circle
                  key={s}
                  cx={scaleX(hoverIdx, n)}
                  cy={scaleY(normalize(data.series[s])[hoverIdx])}
                  r={3.5}
                  fill={SERIES_COLORS[s]}
                  stroke="var(--d-bg)"
                  strokeWidth={2}
                />
              ))}
            </g>
          )}
        </svg>

        {/* hover tooltip (HTML overlay, positioned by index fraction) */}
        <AnimatePresence>
          {hoverIdx !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.12 }}
              className="pointer-events-none absolute top-6 z-10 w-44 -translate-x-1/2 rounded-xl border border-[var(--d-line-strong)] bg-[rgba(10,14,26,0.95)] p-3 shadow-xl shadow-black/40 backdrop-blur"
              style={{
                left: `calc(${(n <= 1 ? 0 : hoverIdx / (n - 1)) * 100}% )`,
              }}
            >
              <p className="mb-2 text-[10px] uppercase tracking-[0.14em] text-[var(--d-ink-faint)] [font-family:var(--demo-mono)]">
                {content.header.ranges.find((r) => r.id === range)?.label} ·{" "}
                {hoverIdx + 1}
              </p>
              <div className="flex flex-col gap-1.5">
                {visible.map((s) => (
                  <div key={s} className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-1.5 text-[11px] text-[var(--d-ink-soft)]">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: SERIES_COLORS[s] }}
                      />
                      {content.chart.series.find((c) => c.id === s)?.label}
                    </span>
                    <span className="text-[11px] font-semibold text-[var(--d-ink)] [font-family:var(--demo-mono)]">
                      {formatNumber(data.series[s][hoverIdx], content.currency.tag)}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[var(--d-line)] px-5 py-3">
        <div className="flex items-center gap-4 text-[11px] text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: SERIES_COLORS.revenue }} />
            {content.chart.peakLabel}: {formatNumber(primary[peakIdx], content.currency.tag)}
          </span>
          <span className="hidden items-center gap-1.5 sm:flex">
            {content.chart.avgLabel}: {formatNumber(Math.round(avg), content.currency.tag)}
          </span>
        </div>
        <p className="text-[11px] text-[var(--d-ink-faint)]">{content.chart.legendHint}</p>
      </div>
    </section>
  );
}
