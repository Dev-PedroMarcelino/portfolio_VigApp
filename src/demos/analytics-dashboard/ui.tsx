"use client";

import { useEffect, useRef, useState } from "react";
import type { CurrencyConfig, KpiFormat } from "./content";

/* ------------------------------------------------------------------ */
/* Formatting                                                          */
/* ------------------------------------------------------------------ */

export function formatCurrency(value: number, cfg: CurrencyConfig): string {
  return new Intl.NumberFormat(cfg.tag, {
    style: "currency",
    currency: cfg.code,
    maximumFractionDigits: value >= 1000 ? 0 : 2,
    notation: value >= 100000 ? "compact" : "standard",
  }).format(value);
}

export function formatNumber(value: number, tag: string): string {
  return new Intl.NumberFormat(tag, {
    maximumFractionDigits: 0,
    notation: value >= 100000 ? "compact" : "standard",
  }).format(value);
}

export function formatKpi(
  value: number,
  format: KpiFormat,
  cfg: CurrencyConfig,
): string {
  if (format === "currency") return formatCurrency(value, cfg);
  if (format === "percent")
    return `${new Intl.NumberFormat(cfg.tag, { maximumFractionDigits: 2 }).format(value)}%`;
  return formatNumber(value, cfg.tag);
}

export function formatSignedPct(pct: number, tag: string): string {
  const s = new Intl.NumberFormat(tag, {
    maximumFractionDigits: 1,
    signDisplay: "always",
  }).format(pct);
  return `${s}%`;
}

/* ------------------------------------------------------------------ */
/* Count-up hook — animates between values, respects reduced motion    */
/* ------------------------------------------------------------------ */

export function useCountUp(
  target: number,
  reduce: boolean | null,
  duration = 900,
): number {
  const [display, setDisplay] = useState(reduce ? target : 0);
  const fromRef = useRef(reduce ? target : 0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (reduce) {
      fromRef.current = target;
      setDisplay(target);
      return;
    }
    const from = fromRef.current;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = from + (target - from) * eased;
      setDisplay(current);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        fromRef.current = target;
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, reduce, duration]);

  return display;
}

/* ------------------------------------------------------------------ */
/* Sparkline                                                           */
/* ------------------------------------------------------------------ */

function buildPath(values: number[], w: number, h: number, pad: number) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const step = values.length > 1 ? (w - pad * 2) / (values.length - 1) : 0;
  const pts = values.map((v, i) => {
    const x = pad + i * step;
    const y = pad + (h - pad * 2) * (1 - (v - min) / span);
    return [x, y] as const;
  });
  const line = pts
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`)
    .join(" ");
  const area = `${line} L${pts[pts.length - 1][0].toFixed(1)},${h} L${pts[0][0].toFixed(1)},${h} Z`;
  return { line, area, last: pts[pts.length - 1] };
}

export function Sparkline({
  values,
  color,
  gradientId,
  width = 132,
  height = 40,
}: {
  values: number[];
  color: string;
  gradientId: string;
  width?: number;
  height?: number;
}) {
  const { line, area, last } = buildPath(values, width, height, 3);
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      preserveAspectRatio="none"
      className="overflow-visible"
      aria-hidden
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gradientId})`} />
      <path
        d={line}
        fill="none"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={last[0]} cy={last[1]} r={2.4} fill={color} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Small utilities                                                     */
/* ------------------------------------------------------------------ */

export function cx(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}

/** Series colors shared across the demo. */
export const SERIES_COLORS = {
  revenue: "#22D3EE",
  sessions: "#A78BFA",
  conversions: "#34D399",
} as const;
