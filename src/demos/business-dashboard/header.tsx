"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";
import type { Content, PeriodId } from "./content";
import { PERIODS } from "./content";
import { PulseboardMark, cx } from "./ui";

export function Header({
  nav,
  periods,
  period,
  onPeriod,
}: {
  nav: Content["nav"];
  periods: Content["periods"];
  period: PeriodId;
  onPeriod: (p: PeriodId) => void;
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--d-line)] bg-[color:rgba(12,10,16,0.82)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <a href="#overview" className="flex shrink-0 items-center gap-2.5">
          <PulseboardMark className="h-8 w-8" />
          <span className="[font-family:var(--demo-display)] text-lg font-semibold tracking-tight text-[var(--d-ink)]">
            Pulseboard
          </span>
        </a>

        <nav className="ml-4 hidden items-center gap-1 lg:flex" aria-label="Primary">
          {nav.links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="rounded-full px-3 py-1.5 text-sm text-[var(--d-ink-soft)] transition-colors hover:bg-[var(--d-panel-strong)] hover:text-[var(--d-ink)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <span className="hidden items-center gap-1.5 text-[0.72rem] text-[var(--d-ink-soft)] sm:inline-flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--d-emerald)] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--d-emerald)]" />
            </span>
            {nav.liveLabel}
          </span>

          <div className="hidden items-center gap-2.5 border-l border-[var(--d-line)] pl-3 md:flex">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--d-violet)] text-[0.7rem] font-semibold text-[#160E22]">
              DW
            </div>
            <div className="leading-tight">
              <div className="text-[0.78rem] font-medium text-[var(--d-ink)]">{nav.userName}</div>
              <div className="text-[0.66rem] text-[var(--d-ink-faint)]">{nav.userRole}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Board top bar — fiscal context + period toggle + export */}
      <div className="border-t border-[var(--d-line)] bg-[color:rgba(20,17,28,0.55)]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-2.5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.18em] text-[var(--d-ink-faint)]">
            <span>{nav.periodPrefix}</span>
            <span className="[font-family:var(--demo-mono)] text-[var(--d-ink-soft)]">
              {nav.fiscalLabel}
            </span>
          </div>

          <div
            role="tablist"
            aria-label={nav.periodPrefix}
            className="relative flex items-center gap-0.5 rounded-full border border-[var(--d-line)] bg-[var(--d-bg)] p-0.5"
          >
            {PERIODS.map((p) => {
              const active = p === period;
              return (
                <button
                  key={p}
                  role="tab"
                  aria-selected={active}
                  onClick={() => onPeriod(p)}
                  className={cx(
                    "relative z-10 rounded-full px-3.5 py-1.5 text-[0.78rem] font-medium transition-colors sm:px-4",
                    active ? "text-[var(--d-accent-ink)]" : "text-[var(--d-ink-soft)] hover:text-[var(--d-ink)]",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="period-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 -z-10 rounded-full bg-[var(--d-accent)]"
                    />
                  )}
                  {periods[p].short}
                </button>
              );
            })}
          </div>

          <span className="hidden text-[0.72rem] text-[var(--d-ink-soft)] sm:inline">
            {periods[period].window}
          </span>

          <button className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-[var(--d-line-strong)] px-3.5 py-1.5 text-[0.76rem] font-medium text-[var(--d-ink)] transition-colors hover:bg-[var(--d-panel-strong)]">
            <Download className="h-3.5 w-3.5" strokeWidth={1.8} />
            <span className="hidden sm:inline">{nav.exportLabel}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
