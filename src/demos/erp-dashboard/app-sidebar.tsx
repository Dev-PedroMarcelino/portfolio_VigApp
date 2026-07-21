"use client";

import {
  BarChart3,
  Boxes,
  LayoutDashboard,
  ScrollText,
  type LucideIcon,
} from "lucide-react";
import type { NavContent, ViewId } from "./content";

const VIEW_ICON: Record<ViewId, LucideIcon> = {
  overview: LayoutDashboard,
  inventory: Boxes,
  orders: ScrollText,
  finance: BarChart3,
};

export function AppSidebar({
  content,
  active,
  onSelect,
}: {
  content: NavContent;
  active: ViewId;
  onSelect: (id: ViewId) => void;
}) {
  return (
    <nav
      aria-label={content.workspaceLabel}
      className="flex gap-1.5 overflow-x-auto px-2 py-2 md:w-60 md:shrink-0 md:flex-col md:gap-1 md:overflow-visible md:border-r md:border-[var(--d-line)] md:px-3 md:py-5"
    >
      <p className="hidden px-3 pb-2 text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-[var(--d-ink-faint)] md:block">
        {content.workspaceLabel}
      </p>
      {content.views.map((view) => {
        const Icon = VIEW_ICON[view.id];
        const isActive = view.id === active;
        return (
          <button
            key={view.id}
            type="button"
            onClick={() => onSelect(view.id)}
            aria-current={isActive ? "page" : undefined}
            className={`group relative flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors md:w-full ${
              isActive
                ? "bg-[var(--d-panel-strong)] text-[var(--d-ink)]"
                : "text-[var(--d-ink-soft)] hover:bg-[var(--d-panel)] hover:text-[var(--d-ink)]"
            }`}
          >
            {isActive ? (
              <span
                className="absolute inset-y-2 left-0 w-0.5 rounded-full bg-[var(--d-accent)] md:inset-y-2.5"
                aria-hidden
              />
            ) : null}
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-colors ${
                isActive
                  ? "border-[rgba(20,184,166,0.4)] bg-[rgba(20,184,166,0.14)] text-[var(--d-accent)]"
                  : "border-[var(--d-line)] bg-[var(--d-surface)] text-[var(--d-ink-soft)] group-hover:text-[var(--d-ink)]"
              }`}
            >
              <Icon className="h-4 w-4" strokeWidth={1.8} />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="font-medium">{view.label}</span>
              <span className="hidden text-[0.62rem] text-[var(--d-ink-faint)] md:block">
                {view.hint}
              </span>
            </span>
          </button>
        );
      })}
    </nav>
  );
}
