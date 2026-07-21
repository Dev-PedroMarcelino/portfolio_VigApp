"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { AnalyticsContent, ChannelId, RangeData } from "./content";
import { cx, formatNumber } from "./ui";

const CHANNEL_COLORS: Record<ChannelId, string> = {
  organic: "#22D3EE",
  paid: "#A78BFA",
  social: "#34D399",
  email: "#FBBF24",
  referral: "#F472B6",
  direct: "#60A5FA",
};

export function ChannelBars({
  content,
  data,
}: {
  content: AnalyticsContent;
  data: RangeData;
}) {
  const [active, setActive] = useState<ChannelId | null>(null);

  const total = useMemo(
    () => (Object.values(data.channels) as number[]).reduce((a, b) => a + b, 0),
    [data.channels],
  );
  const max = useMemo(
    () => Math.max(...(Object.values(data.channels) as number[])),
    [data.channels],
  );

  return (
    <section
      id="channels"
      aria-label={content.channels.title}
      className="flex scroll-mt-32 flex-col rounded-2xl border border-[var(--d-line)] bg-[var(--d-surface)] p-5"
    >
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-base font-semibold tracking-tight text-[var(--d-ink)] [font-family:var(--demo-display)]">
            {content.channels.title}
          </h2>
          <p className="mt-1 text-[13px] text-[var(--d-ink-soft)]">
            {content.channels.subtitle}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--d-ink-faint)] [font-family:var(--demo-mono)]">
            {content.channels.totalLabel}
          </p>
          <p className="text-[15px] font-semibold text-[var(--d-ink)] [font-family:var(--demo-mono)]">
            {formatNumber(total, content.currency.tag)}
          </p>
        </div>
      </div>

      <ul className="mt-5 flex flex-col gap-3.5">
        {content.channels.items.map((item) => {
          const value = data.channels[item.id];
          const pct = (value / total) * 100;
          const barPct = (value / max) * 100;
          const color = CHANNEL_COLORS[item.id];
          const isActive = active === item.id;
          return (
            <li
              key={item.id}
              onMouseEnter={() => setActive(item.id)}
              onMouseLeave={() => setActive(null)}
            >
              <div className="mb-1.5 flex items-baseline justify-between gap-3">
                <span className="flex items-center gap-2 text-[13px] font-medium text-[var(--d-ink)]">
                  <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: color }} />
                  {item.label}
                </span>
                <span className="flex items-baseline gap-2 [font-family:var(--demo-mono)]">
                  <span
                    className={cx(
                      "text-[11px] transition-colors",
                      isActive ? "text-[var(--d-ink)]" : "text-[var(--d-ink-faint)]",
                    )}
                  >
                    {formatNumber(value, content.currency.tag)}
                  </span>
                  <span className="text-[12px] font-semibold text-[var(--d-ink)]">
                    {pct.toFixed(1)}%
                  </span>
                </span>
              </div>
              <div className="relative h-2.5 overflow-hidden rounded-full bg-[var(--d-panel)]">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${color}, ${color}CC)`,
                    boxShadow: isActive ? `0 0 16px ${color}77` : "none",
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${barPct}%` }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
