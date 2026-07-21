"use client";

import { Activity, Download, Radio } from "lucide-react";
import { motion } from "framer-motion";
import type { HeaderContent, NavContent, RangeId } from "./content";
import { cx } from "./ui";

export function Header({
  nav,
  header,
  range,
  onRange,
  syncedAt,
}: {
  nav: NavContent;
  header: HeaderContent;
  range: RangeId;
  onRange: (r: RangeId) => void;
  syncedAt: string;
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--d-line)] bg-[color:var(--d-bg-blur)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href="#overview" className="flex items-center gap-2.5">
          <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--d-accent)] text-[var(--d-accent-ink)]">
            <Activity className="h-[18px] w-[18px]" strokeWidth={2.4} aria-hidden />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-[15px] font-semibold tracking-tight text-[var(--d-ink)] [font-family:var(--demo-display)]">
              Insightgrid
            </span>
            <span className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.22em] text-[var(--d-ink-faint)] [font-family:var(--demo-mono)]">
              {nav.brandTag}
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Sections">
          {nav.links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="rounded-full px-3 py-1.5 text-[13px] font-medium text-[var(--d-ink-soft)] transition-colors hover:bg-[var(--d-panel)] hover:text-[var(--d-ink)]"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <span className="hidden items-center gap-1.5 rounded-full border border-[var(--d-line)] bg-[var(--d-panel)] px-2.5 py-1 text-[11px] text-[var(--d-ink-soft)] sm:flex [font-family:var(--demo-mono)]">
            <span className="relative flex h-1.5 w-1.5">
              <motion.span
                className="absolute inline-flex h-full w-full rounded-full bg-[var(--d-emerald)]"
                animate={{ opacity: [1, 0.3, 1], scale: [1, 1.8, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--d-emerald)]" />
            </span>
            {nav.liveLabel}
          </span>
          <a
            href="#live"
            className="hidden items-center gap-1.5 rounded-full bg-[var(--d-accent)] px-4 py-2 text-[13px] font-semibold text-[var(--d-accent-ink)] transition-transform hover:scale-[1.03] sm:flex"
          >
            <Radio className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden />
            {nav.cta}
          </a>
        </div>
      </div>

      <div className="border-t border-[var(--d-line)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--d-ink-faint)] [font-family:var(--demo-mono)]">
              {header.eyebrow}
            </p>
            <div className="mt-0.5 flex items-baseline gap-3">
              <h1 className="text-lg font-semibold tracking-tight text-[var(--d-ink)] [font-family:var(--demo-display)]">
                {header.title}
              </h1>
              <span className="hidden text-[11px] text-[var(--d-ink-faint)] [font-family:var(--demo-mono)] md:inline">
                {header.updatedPrefix} {syncedAt} · {header.liveNow}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <fieldset
              className="flex items-center gap-1 rounded-full border border-[var(--d-line)] bg-[var(--d-panel)] p-1"
              aria-label={header.rangeLegend}
            >
              {header.ranges.map((r) => {
                const active = r.id === range;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => onRange(r.id)}
                    aria-pressed={active}
                    title={`${r.caption} · ${r.span}`}
                    className={cx(
                      "relative rounded-full px-3.5 py-1.5 text-[12px] font-semibold transition-colors [font-family:var(--demo-mono)]",
                      active
                        ? "text-[var(--d-accent-ink)]"
                        : "text-[var(--d-ink-soft)] hover:text-[var(--d-ink)]",
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="range-pill"
                        className="absolute inset-0 rounded-full bg-[var(--d-accent)]"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{r.label}</span>
                  </button>
                );
              })}
            </fieldset>
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-full border border-[var(--d-line)] px-3 py-2 text-[12px] font-medium text-[var(--d-ink-soft)] transition-colors hover:border-[var(--d-line-strong)] hover:text-[var(--d-ink)]"
            >
              <Download className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
              <span className="hidden sm:inline">{header.exportLabel}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
