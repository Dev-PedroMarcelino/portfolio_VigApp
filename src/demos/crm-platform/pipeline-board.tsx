"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, RotateCcw, ChevronRight } from "lucide-react";
import type { Deal, PipelineContent } from "./content";
import { STAGE_ACCENT, STAGE_DOT, STAGE_SOFT } from "./ui";

function useCurrency(localeTag: string, currency: string) {
  return useMemo(() => {
    const compact = new Intl.NumberFormat(localeTag, {
      style: "currency",
      currency,
      notation: "compact",
      maximumFractionDigits: 1,
    });
    return (n: number) => compact.format(n);
  }, [localeTag, currency]);
}

export function PipelineBoard({ content }: { content: PipelineContent }) {
  const reduce = useReducedMotion();
  const [deals, setDeals] = useState<Deal[]>(content.deals);
  const format = useCurrency(content.localeTag, content.currency);
  const lastStage = content.stages.length - 1;

  const advance = (id: string) =>
    setDeals((prev) =>
      prev.map((d) => (d.id === id ? { ...d, stage: Math.min(d.stage + 1, lastStage) } : d)),
    );

  const reset = () => setDeals(content.deals);

  const isDirty = deals.some((d, i) => d.stage !== content.deals[i].stage);

  return (
    <div className="rounded-[1.6rem] border border-[var(--d-line)] bg-[var(--d-surface)] p-3 shadow-[0_40px_90px_-45px_rgba(30,27,75,0.55)] sm:p-4">
      {/* Window chrome */}
      <div className="flex items-center justify-between gap-3 px-1.5 pb-3">
        <div className="flex items-center gap-2.5">
          <span className="flex gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-[#F87171]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FBBF24]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#34D399]" />
          </span>
          <span className="[font-family:var(--demo-display)] text-[0.82rem] font-semibold text-[var(--d-ink)]">
            {content.windowTitle}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-full bg-[#E6F8F1] px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-wider text-[#047857]">
            <span className="relative flex h-1.5 w-1.5" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#10B981] opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#10B981]" />
            </span>
            {content.liveLabel}
          </span>
          {isDirty && (
            <button
              type="button"
              onClick={reset}
              className="flex items-center gap-1.5 rounded-full border border-[var(--d-line-strong)] bg-[var(--d-bg)] px-2.5 py-1 text-[0.62rem] font-semibold text-[var(--d-ink-soft)] transition-colors hover:text-[var(--d-ink)]"
            >
              <RotateCcw className="h-3 w-3" strokeWidth={2} aria-hidden />
              {content.resetLabel}
            </button>
          )}
        </div>
      </div>

      {/* Columns */}
      <div className="flex gap-2.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {content.stages.map((stage) => {
          const colDeals = deals.filter((d) => d.stage === content.stages.indexOf(stage));
          const total = colDeals.reduce((sum, d) => sum + d.value, 0);
          const isWon = stage.id === "won";
          return (
            <div
              key={stage.id}
              className={`flex min-w-[8.75rem] flex-1 flex-col rounded-2xl border border-[var(--d-line)] ${STAGE_SOFT[stage.id]} p-2.5`}
            >
              <div className="flex items-center justify-between gap-1 px-0.5">
                <span className="flex items-center gap-1.5 text-[0.7rem] font-semibold text-[var(--d-ink)]">
                  <span className={`h-2 w-2 rounded-full ${STAGE_DOT[stage.id]}`} aria-hidden />
                  {stage.label}
                </span>
                <span className="rounded-full bg-[var(--d-surface)]/70 px-1.5 text-[0.62rem] font-semibold text-[var(--d-ink-soft)]">
                  {colDeals.length}
                </span>
              </div>
              <div
                className="mt-1 px-0.5 [font-family:var(--demo-mono)] text-[0.72rem] font-semibold tabular-nums"
                style={{ color: STAGE_ACCENT[stage.id] }}
              >
                {format(total)}
                <span className="ml-1 text-[0.58rem] font-normal text-[var(--d-ink-faint)]">
                  {content.totalCaption}
                </span>
              </div>

              <div className="mt-2 flex flex-col gap-2">
                {colDeals.map((deal) => {
                  const initialsIndex = deal.owner.charCodeAt(0);
                  const card = (
                    <>
                      <div className="flex items-start justify-between gap-1.5">
                        <p className="text-[0.72rem] font-semibold leading-tight text-[var(--d-ink)]">
                          {deal.company}
                        </p>
                        {isWon ? (
                          <Check className="h-3.5 w-3.5 shrink-0 text-[#10B981]" strokeWidth={2.6} aria-hidden />
                        ) : (
                          <ChevronRight
                            className="h-3.5 w-3.5 shrink-0 text-[var(--d-ink-faint)] transition-transform group-hover:translate-x-0.5 group-hover:text-[var(--d-accent)]"
                            strokeWidth={2.2}
                            aria-hidden
                          />
                        )}
                      </div>
                      <p className="mt-0.5 truncate text-[0.62rem] text-[var(--d-ink-faint)]">{deal.contact}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="[font-family:var(--demo-mono)] text-[0.68rem] font-semibold tabular-nums text-[var(--d-ink)]">
                          {format(deal.value)}
                        </span>
                        <span
                          aria-hidden
                          className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[0.5rem] font-bold text-white ${
                            ["bg-[#4F46E5]", "bg-[#0EA5E9]", "bg-[#EC4899]", "bg-[#F59E0B]", "bg-[#10B981]", "bg-[#7C3AED]"][
                              initialsIndex % 6
                            ]
                          }`}
                        >
                          {deal.owner}
                        </span>
                      </div>
                    </>
                  );

                  const cardCls =
                    "group w-full rounded-xl border border-[var(--d-line)] bg-[var(--d-surface)] p-2 text-left shadow-[0_2px_8px_-4px_rgba(30,27,75,0.25)]";

                  return isWon ? (
                    <motion.div key={deal.id} layout={!reduce} className={cardCls}>
                      {card}
                    </motion.div>
                  ) : (
                    <motion.button
                      key={deal.id}
                      layout={!reduce}
                      type="button"
                      onClick={() => advance(deal.id)}
                      aria-label={`${deal.company} — ${content.advanceHint}`}
                      className={`${cardCls} cursor-pointer transition-shadow hover:border-[var(--d-accent)]/40 hover:shadow-[0_8px_20px_-8px_rgba(79,70,229,0.5)]`}
                    >
                      {card}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <p className="px-1.5 pt-3 text-center text-[0.66rem] text-[var(--d-ink-faint)]">{content.advanceHint}</p>
    </div>
  );
}
