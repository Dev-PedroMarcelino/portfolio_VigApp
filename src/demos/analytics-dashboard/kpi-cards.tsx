"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import type {
  AnalyticsContent,
  KpiDatum,
  KpiId,
  RangeData,
} from "./content";
import {
  Sparkline,
  cx,
  formatKpi,
  formatSignedPct,
  useCountUp,
} from "./ui";

const KPI_COLORS: Record<KpiId, string> = {
  revenue: "#22D3EE",
  visitors: "#A78BFA",
  conversion: "#34D399",
  aov: "#FBBF24",
};

function KpiCard({
  meta,
  datum,
  content,
}: {
  meta: { id: KpiId; label: string; caption: string };
  datum: KpiDatum;
  content: AnalyticsContent;
}) {
  const reduce = useReducedMotion();
  const [hover, setHover] = useState(false);
  const animated = useCountUp(datum.value, reduce);
  const color = KPI_COLORS[meta.id];
  const up = datum.trend === "up";

  return (
    <motion.article
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      tabIndex={0}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--d-line)] bg-[var(--d-surface)] p-5 outline-none transition-colors hover:border-[var(--d-line-strong)] focus-visible:border-[var(--d-accent)]"
      style={{ minHeight: 172 }}
    >
      <div
        className="pointer-events-none absolute -right-8 -top-10 h-28 w-28 rounded-full opacity-[0.14] blur-2xl transition-opacity group-hover:opacity-30"
        style={{ backgroundColor: color }}
        aria-hidden
      />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-[13px] font-medium text-[var(--d-ink-soft)]">
            {meta.label}
          </p>
          <p className="mt-0.5 text-[10px] uppercase tracking-[0.14em] text-[var(--d-ink-faint)] [font-family:var(--demo-mono)]">
            {meta.caption}
          </p>
        </div>
        <span
          className={cx(
            "flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[11px] font-semibold [font-family:var(--demo-mono)]",
          )}
          style={{
            color: up ? "#34D399" : "#FB7185",
            backgroundColor: up
              ? "rgba(52,211,153,0.12)"
              : "rgba(251,113,133,0.12)",
          }}
        >
          {up ? (
            <ArrowUpRight className="h-3 w-3" strokeWidth={2.4} aria-hidden />
          ) : (
            <ArrowDownRight className="h-3 w-3" strokeWidth={2.4} aria-hidden />
          )}
          {formatSignedPct(datum.deltaPct, content.currency.tag)}
        </span>
      </div>

      <p className="relative mt-4 text-[26px] font-semibold tracking-tight text-[var(--d-ink)] [font-family:var(--demo-display)]">
        {formatKpi(animated, datum.format, content.currency)}
      </p>

      <div className="relative mt-3 flex items-end justify-between gap-3">
        <Sparkline
          values={datum.spark}
          color={color}
          gradientId={`spark-${meta.id}`}
        />
        <span className="text-[10px] text-[var(--d-ink-faint)] [font-family:var(--demo-mono)]">
          {content.kpis.vsLabel}
        </span>
      </div>

      <AnimatePresence>
        {hover && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.16 }}
            className="pointer-events-none absolute right-4 top-14 z-10 w-40 rounded-xl border border-[var(--d-line-strong)] bg-[var(--d-bg)] p-3 shadow-xl shadow-black/40"
          >
            <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--d-ink-faint)] [font-family:var(--demo-mono)]">
              {content.kpis.tooltipPrefix}
            </p>
            <p
              className="mt-1 text-[15px] font-semibold [font-family:var(--demo-mono)]"
              style={{ color: up ? "#34D399" : "#FB7185" }}
            >
              {formatSignedPct(datum.deltaPct, content.currency.tag)}
            </p>
            <div className="mt-2 flex items-center justify-between border-t border-[var(--d-line)] pt-2">
              <span className="text-[10px] text-[var(--d-ink-faint)]">
                {content.kpis.absoluteLabel}
              </span>
              <span className="text-[11px] font-medium text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]">
                {formatKpi(datum.prev, datum.format, content.currency)}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

export function KpiCards({
  content,
  data,
}: {
  content: AnalyticsContent;
  data: RangeData;
}) {
  return (
    <section
      id="metrics"
      aria-label={content.header.title}
      className="grid scroll-mt-32 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      {content.kpis.items.map((meta) => (
        <KpiCard
          key={meta.id}
          meta={meta}
          datum={data.kpis[meta.id]}
          content={content}
        />
      ))}
    </section>
  );
}
