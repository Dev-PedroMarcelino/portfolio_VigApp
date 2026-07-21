"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AlertOctagon, AlertTriangle, Info, ShieldCheck, X } from "lucide-react";
import type { AlertItem, AlertsContent } from "./content";
import { ALERT_ACCENT } from "./ui";

const LEVEL_ICON = {
  critical: AlertOctagon,
  warning: AlertTriangle,
  info: Info,
} as const;

export function AlertsDrawer({
  content,
  open,
  items,
  onClose,
  onDismiss,
  onDismissAll,
}: {
  content: AlertsContent;
  open: boolean;
  items: AlertItem[];
  onClose: () => void;
  onDismiss: (id: string) => void;
  onDismissAll: () => void;
}) {
  const reduce = useReducedMotion();

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden
          />
          <motion.aside
            className="fixed inset-y-0 right-0 z-[61] flex w-full max-w-sm flex-col border-l border-[var(--d-line)] bg-[var(--d-bg)] shadow-2xl"
            style={{ backgroundColor: "#0B1120" }}
            role="dialog"
            aria-label={content.title}
            initial={reduce ? { opacity: 0 } : { x: "100%" }}
            animate={reduce ? { opacity: 1 } : { x: 0 }}
            exit={reduce ? { opacity: 0 } : { x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-start justify-between gap-3 border-b border-[var(--d-line)] px-5 py-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="[font-family:var(--demo-display)] text-lg font-semibold text-[var(--d-ink)]">
                    {content.title}
                  </h2>
                  {items.length > 0 ? (
                    <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[rgba(244,63,94,0.16)] px-1.5 text-[0.66rem] font-semibold text-[#FDA4AF]">
                      {items.length}
                    </span>
                  ) : null}
                </div>
                <p className="mt-0.5 text-[0.72rem] text-[var(--d-ink-faint)]">{content.subtitle}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[var(--d-line)] text-[var(--d-ink-soft)] transition-colors hover:border-[var(--d-line-strong)] hover:text-[var(--d-ink)]"
              >
                <X className="h-4 w-4" strokeWidth={1.8} />
              </button>
            </div>

            {items.length > 0 ? (
              <div className="flex items-center justify-between px-5 py-2.5">
                <span className="[font-family:var(--demo-mono)] text-[0.68rem] tabular-nums text-[var(--d-ink-faint)]">
                  {items.length} {content.countLabel}
                </span>
                <button
                  type="button"
                  onClick={onDismissAll}
                  className="text-[0.72rem] font-medium text-[var(--d-accent)] transition-opacity hover:opacity-80"
                >
                  {content.dismissAll}
                </button>
              </div>
            ) : null}

            <div className="flex-1 overflow-y-auto px-3 pb-6">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[rgba(20,184,166,0.12)] text-[var(--d-accent)]">
                    <ShieldCheck className="h-7 w-7" strokeWidth={1.5} />
                  </span>
                  <p className="[font-family:var(--demo-display)] text-base font-semibold text-[var(--d-ink)]">
                    {content.emptyTitle}
                  </p>
                  <p className="max-w-[16rem] text-sm text-[var(--d-ink-soft)]">{content.emptyBody}</p>
                </div>
              ) : (
                <ul className="flex flex-col gap-2 pt-1">
                  <AnimatePresence initial={false}>
                    {items.map((alert) => (
                      <AlertCard
                        key={alert.id}
                        alert={alert}
                        levelLabel={content.levelLabels[alert.level]}
                        dismissLabel={content.dismissLabel}
                        onDismiss={() => onDismiss(alert.id)}
                        reduce={reduce ?? false}
                      />
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}

function AlertCard({
  alert,
  levelLabel,
  dismissLabel,
  onDismiss,
  reduce,
}: {
  alert: AlertItem;
  levelLabel: string;
  dismissLabel: string;
  onDismiss: () => void;
  reduce: boolean;
}) {
  const Icon = LEVEL_ICON[alert.level];
  const accent = ALERT_ACCENT[alert.level];
  return (
    <motion.li
      layout={!reduce}
      initial={reduce ? { opacity: 0 } : { opacity: 0, x: 20 }}
      animate={reduce ? { opacity: 1 } : { opacity: 1, x: 0 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, x: 40, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="overflow-hidden rounded-xl border border-[var(--d-line)] bg-[var(--d-surface)] p-3.5"
      style={{ borderLeft: `2px solid ${accent}` }}
    >
      <div className="flex items-start gap-3">
        <span
          className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
          style={{ backgroundColor: `${accent}22`, color: accent }}
        >
          <Icon className="h-4 w-4" strokeWidth={1.8} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span
              className="text-[0.6rem] font-semibold uppercase tracking-[0.14em]"
              style={{ color: accent }}
            >
              {levelLabel}
            </span>
            <span className="[font-family:var(--demo-mono)] text-[0.62rem] text-[var(--d-ink-faint)]">
              {alert.time}
            </span>
          </div>
          <p className="mt-1 text-sm font-medium leading-snug text-[var(--d-ink)]">{alert.title}</p>
          <p className="mt-1 text-[0.78rem] leading-snug text-[var(--d-ink-soft)]">{alert.body}</p>
          <button
            type="button"
            onClick={onDismiss}
            className="mt-2.5 inline-flex items-center gap-1 rounded-md border border-[var(--d-line)] px-2 py-1 text-[0.68rem] font-medium text-[var(--d-ink-soft)] transition-colors hover:border-[var(--d-line-strong)] hover:text-[var(--d-ink)]"
          >
            <X className="h-3 w-3" strokeWidth={2} />
            {dismissLabel}
          </button>
        </div>
      </div>
    </motion.li>
  );
}
