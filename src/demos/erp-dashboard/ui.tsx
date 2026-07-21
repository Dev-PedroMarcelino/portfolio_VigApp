"use client";

import type { AlertLevel, OrderStatus, StockStatus } from "./content";

/** Coreledger logomark: a stacked-ledger glyph with a teal signal bar, pure SVG. */
export function CoreledgerMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden fill="none">
      <rect x="4" y="6" width="24" height="20" rx="4" fill="#0F1A2E" stroke="var(--d-line-strong)" strokeWidth="1.2" />
      <rect x="8" y="19" width="3.4" height="4" rx="1" fill="var(--d-ink-soft)" />
      <rect x="13.3" y="15" width="3.4" height="8" rx="1" fill="var(--d-ink-soft)" />
      <rect x="18.6" y="11" width="3.4" height="12" rx="1" fill="var(--d-accent)" />
      <circle cx="24" cy="10" r="2.2" fill="var(--d-accent)" />
    </svg>
  );
}

/** Mini sparkline built from a 0-100 magnitude array. Deterministic geometry. */
export function Sparkline({
  points,
  stroke,
  className = "h-8 w-full",
}: {
  points: number[];
  stroke: string;
  className?: string;
}) {
  const w = 100;
  const h = 32;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const span = max - min || 1;
  const step = w / (points.length - 1);
  const coords = points.map((p, i) => {
    const x = i * step;
    const y = h - ((p - min) / span) * (h - 4) - 2;
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  });
  const line = `M${coords.join(" L")}`;
  const area = `${line} L${w},${h} L0,${h} Z`;
  const id = `spark-${stroke.replace(/[^a-z0-9]/gi, "")}`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className={className} aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.28" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${id})`} />
      <path d={line} fill="none" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const STOCK_TONE: Record<StockStatus, { dot: string; chip: string; bar: string }> = {
  healthy: {
    dot: "bg-[var(--d-emerald)]",
    chip: "bg-[rgba(52,211,153,0.14)] text-[#6EE7B7] border-[rgba(52,211,153,0.28)]",
    bar: "var(--d-emerald)",
  },
  low: {
    dot: "bg-[var(--d-amber)]",
    chip: "bg-[rgba(245,158,11,0.14)] text-[#FCD34D] border-[rgba(245,158,11,0.3)]",
    bar: "var(--d-amber)",
  },
  critical: {
    dot: "bg-[var(--d-rose)]",
    chip: "bg-[rgba(244,63,94,0.15)] text-[#FDA4AF] border-[rgba(244,63,94,0.32)]",
    bar: "var(--d-rose)",
  },
};

export function stockBarColor(status: StockStatus): string {
  return STOCK_TONE[status].bar;
}

export function StockBadge({ status, label }: { status: StockStatus; label: string }) {
  const t = STOCK_TONE[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.68rem] font-medium ${t.chip}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${t.dot}`} aria-hidden />
      {label}
    </span>
  );
}

const ORDER_TONE: Record<OrderStatus, string> = {
  paid: "bg-[rgba(52,211,153,0.14)] text-[#6EE7B7] border-[rgba(52,211,153,0.28)]",
  processing: "bg-[rgba(56,189,248,0.14)] text-[#7DD3FC] border-[rgba(56,189,248,0.28)]",
  shipped: "bg-[rgba(20,184,166,0.16)] text-[#5EEAD4] border-[rgba(20,184,166,0.3)]",
  pending: "bg-[rgba(245,158,11,0.14)] text-[#FCD34D] border-[rgba(245,158,11,0.3)]",
  cancelled: "bg-[rgba(148,163,184,0.12)] text-[#94A6BF] border-[rgba(148,163,184,0.24)]",
};

const ORDER_DOT: Record<OrderStatus, string> = {
  paid: "bg-[var(--d-emerald)]",
  processing: "bg-[var(--d-blue)]",
  shipped: "bg-[var(--d-accent)]",
  pending: "bg-[var(--d-amber)]",
  cancelled: "bg-[var(--d-ink-faint)]",
};

export function OrderBadge({ status, label }: { status: OrderStatus; label: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.68rem] font-medium ${ORDER_TONE[status]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${ORDER_DOT[status]}`} aria-hidden />
      {label}
    </span>
  );
}

export const ALERT_ACCENT: Record<AlertLevel, string> = {
  critical: "var(--d-rose)",
  warning: "var(--d-amber)",
  info: "var(--d-blue)",
};

/** Deterministic teal-family tone for initials avatars, keyed by index. */
const AVATAR_TONES = [
  "bg-[rgba(20,184,166,0.2)] text-[#5EEAD4]",
  "bg-[rgba(56,189,248,0.2)] text-[#7DD3FC]",
  "bg-[rgba(52,211,153,0.2)] text-[#6EE7B7]",
  "bg-[rgba(245,158,11,0.2)] text-[#FCD34D]",
  "bg-[rgba(167,139,250,0.2)] text-[#C4B5FD]",
];

export function Avatar({
  initials,
  index,
  size = "h-8 w-8 text-[0.62rem]",
}: {
  initials: string;
  index: number;
  size?: string;
}) {
  return (
    <span
      aria-hidden
      className={`inline-flex shrink-0 items-center justify-center rounded-lg font-semibold tracking-wide ${size} ${AVATAR_TONES[index % AVATAR_TONES.length]}`}
    >
      {initials}
    </span>
  );
}
