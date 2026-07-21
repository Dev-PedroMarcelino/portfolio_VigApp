"use client";

import { Bell, Command, Search } from "lucide-react";
import type { NavContent } from "./content";
import { Avatar, CoreledgerMark } from "./ui";

export function AppHeader({
  content,
  alertCount,
  onOpenAlerts,
}: {
  content: NavContent;
  alertCount: number;
  onOpenAlerts: () => void;
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--d-line)] bg-[rgba(11,17,32,0.82)] backdrop-blur-xl">
      <div className="flex h-16 items-center gap-3 px-4 sm:gap-4 sm:px-6">
        <a href="#top" className="flex shrink-0 items-center gap-2.5">
          <CoreledgerMark className="h-8 w-8" />
          <span className="[font-family:var(--demo-display)] text-lg font-semibold tracking-tight text-[var(--d-ink)]">
            Coreledger
          </span>
        </a>

        <span className="ml-1 hidden items-center gap-1.5 rounded-full border border-[var(--d-line)] bg-[var(--d-panel)] px-2.5 py-1 text-[0.62rem] font-medium uppercase tracking-[0.18em] text-[var(--d-accent)] lg:inline-flex">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--d-accent)]" aria-hidden />
          {content.envLabel}
        </span>

        <div className="ml-auto flex items-center gap-2 sm:ml-4 sm:flex-1 sm:justify-center">
          <label className="group flex w-full max-w-md items-center gap-2.5 rounded-xl border border-[var(--d-line)] bg-[var(--d-surface)] px-3 py-2 text-sm transition-colors focus-within:border-[var(--d-line-strong)]">
            <Search className="h-4 w-4 shrink-0 text-[var(--d-ink-faint)]" strokeWidth={1.8} />
            <span className="sr-only">{content.searchPlaceholder}</span>
            <input
              type="text"
              placeholder={content.searchPlaceholder}
              className="w-full min-w-0 bg-transparent text-[var(--d-ink)] placeholder:text-[var(--d-ink-faint)] focus:outline-none"
            />
            <kbd className="hidden shrink-0 items-center gap-0.5 rounded-md border border-[var(--d-line)] px-1.5 py-0.5 text-[0.6rem] font-medium text-[var(--d-ink-faint)] [font-family:var(--demo-mono)] sm:inline-flex">
              <Command className="h-2.5 w-2.5" strokeWidth={2} />K
            </kbd>
          </label>
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-2 sm:ml-0">
          <button
            type="button"
            onClick={onOpenAlerts}
            aria-label={content.alertsLabel}
            className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--d-line)] bg-[var(--d-surface)] text-[var(--d-ink-soft)] transition-colors hover:border-[var(--d-line-strong)] hover:text-[var(--d-ink)]"
          >
            <Bell className="h-4 w-4" strokeWidth={1.8} />
            {alertCount > 0 ? (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--d-rose)] px-1 text-[0.58rem] font-semibold text-white">
                {alertCount}
              </span>
            ) : null}
          </button>

          <div className="flex items-center gap-2.5 rounded-lg border border-[var(--d-line)] bg-[var(--d-surface)] py-1 pl-1 pr-3">
            <Avatar initials="PR" index={0} size="h-7 w-7 text-[0.6rem]" />
            <div className="hidden leading-tight sm:block">
              <p className="text-[0.72rem] font-medium text-[var(--d-ink)]">{content.userName}</p>
              <p className="text-[0.62rem] text-[var(--d-ink-faint)]">{content.userRole}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
