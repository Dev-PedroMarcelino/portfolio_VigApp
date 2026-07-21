"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { AnalyticsContent, RangeData, StageId } from "./content";
import { cx, formatNumber } from "./ui";

const STAGE_COLORS: Record<StageId, string> = {
  sessions: "#22D3EE",
  product: "#38BDF8",
  cart: "#A78BFA",
  checkout: "#C084FC",
  purchase: "#34D399",
};

export function Funnel({
  content,
  data,
}: {
  content: AnalyticsContent;
  data: RangeData;
}) {
  const [active, setActive] = useState<StageId | null>(null);
  const stages = content.funnel.stages;
  const top = data.funnel[stages[0].id];
  const bottom = data.funnel[stages[stages.length - 1].id];
  const endToEnd = (bottom / top) * 100;

  return (
    <section
      id="funnel"
      aria-label={content.funnel.title}
      className="flex scroll-mt-32 flex-col rounded-2xl border border-[var(--d-line)] bg-[var(--d-surface)] p-5"
    >
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-base font-semibold tracking-tight text-[var(--d-ink)] [font-family:var(--demo-display)]">
            {content.funnel.title}
          </h2>
          <p className="mt-1 text-[13px] text-[var(--d-ink-soft)]">
            {content.funnel.subtitle}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--d-ink-faint)] [font-family:var(--demo-mono)]">
            {content.funnel.endToEndLabel}
          </p>
          <p className="text-[15px] font-semibold text-[var(--d-emerald)] [font-family:var(--demo-mono)]">
            {endToEnd.toFixed(1)}%
          </p>
        </div>
      </div>

      <ol className="mt-5 flex flex-col gap-2">
        {stages.map((stage, i) => {
          const value = data.funnel[stage.id];
          const widthPct = (value / top) * 100;
          const prev = i === 0 ? value : data.funnel[stages[i - 1].id];
          const ofPrev = (value / prev) * 100;
          const ofTop = (value / top) * 100;
          const drop = i === 0 ? 0 : 100 - ofPrev;
          const color = STAGE_COLORS[stage.id];
          const isActive = active === stage.id;

          return (
            <li
              key={stage.id}
              className="relative"
              onMouseEnter={() => setActive(stage.id)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(stage.id)}
              onBlur={() => setActive(null)}
            >
              <button
                type="button"
                className="flex w-full flex-col items-center outline-none"
                aria-label={stage.label}
              >
                <div className="mb-1 flex w-full items-center justify-between">
                  <span className="flex items-center gap-2 text-[12px] font-medium text-[var(--d-ink)]">
                    <span
                      className="flex h-5 w-5 items-center justify-center rounded-md text-[10px] font-semibold text-[var(--d-accent-ink)] [font-family:var(--demo-mono)]"
                      style={{ backgroundColor: color }}
                    >
                      {i + 1}
                    </span>
                    {stage.label}
                  </span>
                  <span className="flex items-baseline gap-2 [font-family:var(--demo-mono)]">
                    <span className="text-[13px] font-semibold text-[var(--d-ink)]">
                      {formatNumber(value, content.currency.tag)}
                    </span>
                    <span className="text-[11px] text-[var(--d-ink-faint)]">
                      {ofTop.toFixed(0)}%
                    </span>
                  </span>
                </div>
                <div className="flex h-11 w-full items-center justify-center">
                  <motion.div
                    className="relative flex h-full items-center justify-center overflow-hidden rounded-lg"
                    style={{
                      background: `linear-gradient(135deg, ${color}, ${color}AA)`,
                      boxShadow: isActive ? `0 0 22px ${color}66` : "none",
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.max(widthPct, 8)}%` }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.05 }}
                  >
                    <span
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(255,255,255,0.22), rgba(255,255,255,0))",
                      }}
                    />
                  </motion.div>
                </div>
              </button>

              <AnimatePresence>
                {isActive && i > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.14 }}
                    className="pointer-events-none absolute right-0 top-0 z-10 w-44 rounded-xl border border-[var(--d-line-strong)] bg-[var(--d-bg)] p-3 shadow-xl shadow-black/40"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-[0.14em] text-[var(--d-ink-faint)] [font-family:var(--demo-mono)]">
                        {content.funnel.dropLabel}
                      </span>
                      <span
                        className={cx(
                          "text-[13px] font-semibold [font-family:var(--demo-mono)]",
                        )}
                        style={{ color: drop > 40 ? "#FB7185" : "#FBBF24" }}
                      >
                        -{drop.toFixed(1)}%
                      </span>
                    </div>
                    <div className="mt-2 flex items-center justify-between border-t border-[var(--d-line)] pt-2 text-[11px]">
                      <span className="text-[var(--d-ink-faint)]">
                        {content.funnel.ofPreviousLabel}
                      </span>
                      <span className="font-medium text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]">
                        {ofPrev.toFixed(1)}%
                      </span>
                    </div>
                    <div className="mt-1 flex items-center justify-between text-[11px]">
                      <span className="text-[var(--d-ink-faint)]">
                        {content.funnel.ofTopLabel}
                      </span>
                      <span className="font-medium text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]">
                        {ofTop.toFixed(1)}%
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
