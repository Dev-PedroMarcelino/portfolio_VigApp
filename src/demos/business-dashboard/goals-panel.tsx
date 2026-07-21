"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import type { Content, ObjectiveData, PeriodId } from "./content";
import { TONE_HEX, cx } from "./ui";

function status(value: number, drill: Content["drill"]) {
  if (value >= 85) return { label: drill.onTrack, color: "var(--d-emerald)" };
  if (value >= 70) return { label: drill.atRisk, color: "var(--d-amber)" };
  return { label: drill.behind, color: "var(--d-accent)" };
}

export function GoalsPanel({
  objective,
  objectiveLabel,
  caption,
  drill,
  period,
  onClose,
}: {
  objective: ObjectiveData | null;
  objectiveLabel: string;
  caption: string;
  drill: Content["drill"];
  period: PeriodId;
  onClose: () => void;
}) {
  const reduce = useReducedMotion() ?? false;
  const open = objective !== null;
  const hex = objective ? TONE_HEX[objective.tone] : TONE_HEX.accent;
  const overall = objective ? objective.values[period] : 0;

  return (
    <AnimatePresence>
      {open && objective && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            aria-hidden
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label={objectiveLabel}
            initial={reduce ? { opacity: 0 } : { x: "100%" }}
            animate={reduce ? { opacity: 1 } : { x: 0 }}
            exit={reduce ? { opacity: 0 } : { x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 36 }}
            className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col border-l border-[var(--d-line-strong)] bg-[var(--d-surface)] shadow-2xl"
          >
            <div className="relative overflow-hidden border-b border-[var(--d-line)] p-6">
              <span
                className="pointer-events-none absolute -right-10 -top-16 h-40 w-40 rounded-full opacity-40 blur-3xl"
                style={{ background: hex }}
                aria-hidden
              />
              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <div className="[font-family:var(--demo-mono)] text-[0.68rem] uppercase tracking-[0.2em] text-[var(--d-ink-faint)]">
                    {drill.kicker}
                  </div>
                  <h3 className="mt-2 [font-family:var(--demo-display)] text-xl font-semibold text-[var(--d-ink)]">
                    {objectiveLabel}
                  </h3>
                  <p className="mt-1 text-[0.8rem] text-[var(--d-ink-soft)]">{caption}</p>
                </div>
                <button
                  onClick={onClose}
                  aria-label={drill.closeLabel}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--d-line)] text-[var(--d-ink-soft)] transition-colors hover:bg-[var(--d-panel-strong)] hover:text-[var(--d-ink)]"
                >
                  <X className="h-4 w-4" strokeWidth={1.8} />
                </button>
              </div>

              <div className="relative mt-5 flex items-end justify-between">
                <div>
                  <div className="text-[0.68rem] uppercase tracking-[0.14em] text-[var(--d-ink-faint)]">
                    {drill.progressLabel}
                  </div>
                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="[font-family:var(--demo-mono)] text-3xl font-medium" style={{ color: hex }}>
                      {overall}
                    </span>
                    <span className="text-[var(--d-ink-faint)]">%</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[0.68rem] uppercase tracking-[0.14em] text-[var(--d-ink-faint)]">
                    {drill.ownerLabel}
                  </div>
                  <div className="mt-1 text-[0.85rem] font-medium text-[var(--d-ink)]">
                    {drill.owners[objective.id]}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="text-[0.7rem] uppercase tracking-[0.16em] text-[var(--d-ink-faint)]">
                {drill.keyResultsLabel}
              </div>
              <ul className="mt-4 flex flex-col gap-4">
                {objective.keyResults.map((kr, i) => {
                  const value = kr.values[period];
                  const meta = drill.keyResults[kr.id];
                  const st = status(value, drill);
                  return (
                    <motion.li
                      key={kr.id}
                      initial={reduce ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: reduce ? 0 : 0.06 * i, duration: 0.3 }}
                      className="rounded-xl border border-[var(--d-line)] bg-[var(--d-bg)] p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="text-[0.9rem] font-medium text-[var(--d-ink)]">{meta.label}</div>
                        <span
                          className={cx("shrink-0 rounded-full px-2 py-0.5 text-[0.64rem] font-medium")}
                          style={{ background: `${st.color}22`, color: st.color }}
                        >
                          {st.label}
                        </span>
                      </div>
                      <p className="mt-1 text-[0.76rem] leading-snug text-[var(--d-ink-faint)]">{meta.hint}</p>
                      <div className="mt-3 flex items-center gap-3">
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--d-line)]">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ background: st.color }}
                            initial={{ width: 0 }}
                            animate={{ width: `${value}%` }}
                            transition={{ duration: reduce ? 0 : 0.7, ease: [0.16, 1, 0.3, 1], delay: reduce ? 0 : 0.1 }}
                          />
                        </div>
                        <span className="[font-family:var(--demo-mono)] text-[0.78rem] tabular-nums text-[var(--d-ink)]">
                          {value}%
                        </span>
                      </div>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
