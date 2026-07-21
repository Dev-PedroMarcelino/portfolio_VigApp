"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowDownLeft,
  ArrowLeftRight,
  ShoppingBag,
  UtensilsCrossed,
  Repeat,
  TrainFront,
  ArrowUpRight,
  Plus,
  TrendingUp,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { NuvexContent, TxCategory, TxSeed } from "./content";
import { BALANCE, MONTH_IN, MONTH_OUT, TRANSACTIONS, BALANCE_TREND } from "./content";
import { SectionLabel, fmtWhole, fmtMoney } from "./ui";
import { TransferModal, type TransferResult } from "./transfer-modal";

const CATEGORY_ICON: Record<TxCategory, LucideIcon> = {
  income: ArrowDownLeft,
  transfer: ArrowLeftRight,
  shopping: ShoppingBag,
  dining: UtensilsCrossed,
  subscription: Repeat,
  transport: TrainFront,
};

type FilterId = TxCategory | "all";

/* Balance sparkline built from the shared trend series. */
function Sparkline() {
  const w = 240;
  const h = 56;
  const max = Math.max(...BALANCE_TREND);
  const min = Math.min(...BALANCE_TREND);
  const span = max - min || 1;
  const step = w / (BALANCE_TREND.length - 1);
  const pts = BALANCE_TREND.map((v, i) => {
    const x = i * step;
    const y = h - 4 - ((v - min) / span) * (h - 10);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  const line = `M${pts.join(" L")}`;
  const area = `${line} L${w},${h} L0,${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-14 w-full" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id="nvx-spark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#nvx-spark)" />
      <path d={line} fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function DashboardSection({
  content,
  transfer,
  localeTag,
  currency,
}: {
  content: NuvexContent["dashboard"];
  transfer: NuvexContent["transfer"];
  localeTag: string;
  currency: string;
}) {
  const reduced = useReducedMotion() ?? false;
  const [balance, setBalance] = useState(BALANCE);
  const [ledger, setLedger] = useState<TxSeed[]>(TRANSACTIONS);
  const [filter, setFilter] = useState<FilterId>("all");
  const [modalOpen, setModalOpen] = useState(false);

  const visible = useMemo(
    () => (filter === "all" ? ledger : ledger.filter((t) => t.category === filter)),
    [ledger, filter],
  );

  const handleComplete = (r: TransferResult) => {
    setBalance((b) => Math.round((b - r.amount) * 100) / 100);
    setLedger((prev) => [
      {
        id: `tx-${r.reference}`,
        category: "transfer",
        merchant: r.recipient.name,
        when: "today",
        time: "now",
        amount: -r.amount,
      },
      ...prev,
    ]);
  };

  return (
    <section
      id="account"
      className="relative scroll-mt-16 border-t border-[var(--d-line)] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-2xl">
          <SectionLabel text={content.label} />
          <h2 className="mt-5 text-3xl leading-tight text-[var(--d-ink)] [font-family:var(--demo-display)] sm:text-[2.6rem] sm:leading-[1.1]">
            {content.title}
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-[var(--d-ink-soft)]">{content.intro}</p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.15fr]">
          {/* Balance card */}
          <div className="flex flex-col gap-6">
            <div className="relative overflow-hidden rounded-3xl border border-[var(--d-line)] bg-gradient-to-br from-[var(--d-panel)] to-[var(--d-bg-soft)] p-7">
              <div
                aria-hidden
                className="absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-40 blur-3xl"
                style={{ background: "radial-gradient(circle, rgba(16,185,129,0.5), transparent 70%)" }}
              />
              <div className="relative">
                <p className="text-[0.66rem] uppercase tracking-[0.24em] text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]">
                  {content.balanceLabel}
                </p>
                <p className="mt-2 text-4xl font-semibold tracking-tight text-[var(--d-ink)] [font-family:var(--demo-mono)]">
                  {fmtWhole(balance, localeTag, currency)}
                </p>

                <div className="mt-5">
                  <div className="flex items-center justify-between text-[0.62rem] text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]">
                    <span className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3 text-[var(--d-accent)]" strokeWidth={2} />
                      {content.trendLabel}
                    </span>
                  </div>
                  <Sparkline />
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-[var(--d-line)] bg-[var(--d-bg-soft)]/60 px-4 py-3">
                    <p className="text-[0.6rem] uppercase tracking-[0.18em] text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]">
                      {content.inLabel}
                    </p>
                    <p className="mt-1 text-base font-semibold text-[var(--d-accent-soft)] [font-family:var(--demo-mono)]">
                      +{fmtWhole(MONTH_IN, localeTag, currency)}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-[var(--d-line)] bg-[var(--d-bg-soft)]/60 px-4 py-3">
                    <p className="text-[0.6rem] uppercase tracking-[0.18em] text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]">
                      {content.outLabel}
                    </p>
                    <p className="mt-1 text-base font-semibold text-[var(--d-ink)] [font-family:var(--demo-mono)]">
                      -{fmtWhole(MONTH_OUT, localeTag, currency)}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setModalOpen(true)}
                    className="group flex flex-1 items-center justify-center gap-2 rounded-xl bg-[var(--d-accent)] py-3 text-sm font-semibold text-[#05070C] shadow-[0_0_22px_rgba(16,185,129,0.32)] transition-transform hover:scale-[1.02]"
                  >
                    <ArrowUpRight className="h-4 w-4" strokeWidth={2.2} />
                    {content.transferCta}
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalOpen(true)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[var(--d-line)] py-3 text-sm font-medium text-[var(--d-ink)] transition-colors hover:border-[var(--d-accent)]/50 hover:bg-[var(--d-panel)]"
                  >
                    <ArrowDownLeft className="h-4 w-4" strokeWidth={2} />
                    {content.requestCta}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Transactions */}
          <div id="transfers" className="flex scroll-mt-24 flex-col rounded-3xl border border-[var(--d-line)] bg-[var(--d-panel)] p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[var(--d-ink)] [font-family:var(--demo-display)]">
                {content.txTitle}
              </h3>
            </div>

            {/* Filter tabs */}
            <div
              className="mt-4 flex flex-wrap gap-1.5"
              role="tablist"
              aria-label={content.txTitle}
            >
              {content.filters.map((f) => {
                const selected = filter === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setFilter(f.id)}
                    className={`rounded-full px-3 py-1.5 text-[0.72rem] font-medium transition-colors [font-family:var(--demo-mono)] ${
                      selected
                        ? "bg-[var(--d-accent)] text-[#05070C]"
                        : "border border-[var(--d-line)] text-[var(--d-ink-soft)] hover:text-[var(--d-ink)]"
                    }`}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>

            {/* Ledger */}
            <ul className="mt-4 flex flex-col">
              <AnimatePresence initial={false} mode="popLayout">
                {visible.map((t) => {
                  const Icon = CATEGORY_ICON[t.category];
                  const credit = t.amount > 0;
                  const whenLabel =
                    t.time === "now" ? content.whenLabels.today : content.whenLabels[t.when];
                  return (
                    <motion.li
                      key={t.id}
                      layout={!reduced}
                      initial={reduced ? false : { opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
                      transition={{ duration: 0.22 }}
                      className="flex items-center gap-3 border-b border-[var(--d-line)]/60 py-3 last:border-0"
                    >
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                          credit
                            ? "bg-[var(--d-accent)]/12 text-[var(--d-accent-soft)]"
                            : "bg-[var(--d-bg-soft)] text-[var(--d-ink-soft)]"
                        }`}
                      >
                        <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm text-[var(--d-ink)]">{t.merchant}</p>
                        <p className="truncate text-[0.7rem] text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]">
                          {content.categoryLabels[t.category]} · {whenLabel}
                          {t.time !== "now" ? ` · ${t.time}` : ""}
                        </p>
                      </div>
                      <span
                        className={`shrink-0 text-sm font-semibold [font-family:var(--demo-mono)] ${
                          credit ? "text-[var(--d-accent-soft)]" : "text-[var(--d-ink)]"
                        }`}
                      >
                        {credit ? "+" : "-"}
                        {fmtMoney(Math.abs(t.amount), localeTag, currency)}
                      </span>
                    </motion.li>
                  );
                })}
              </AnimatePresence>
              {visible.length === 0 && (
                <li className="flex flex-col items-center gap-2 py-10 text-center">
                  <Plus className="h-5 w-5 text-[var(--d-ink-soft)]" />
                  <span className="text-xs text-[var(--d-ink-soft)]">{content.emptyState}</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      <TransferModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onComplete={handleComplete}
        balance={balance}
        content={transfer}
        localeTag={localeTag}
        currency={currency}
      />
    </section>
  );
}
