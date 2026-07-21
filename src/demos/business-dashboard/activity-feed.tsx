"use client";

import { AlertTriangle, Target, TrendingUp, Users, type LucideIcon } from "lucide-react";
import type { Content } from "./content";

const KIND: Record<string, { icon: LucideIcon; color: string }> = {
  deal: { icon: TrendingUp, color: "var(--d-emerald)" },
  goal: { icon: Target, color: "var(--d-violet)" },
  risk: { icon: AlertTriangle, color: "var(--d-accent)" },
  team: { icon: Users, color: "var(--d-cyan)" },
};

export function ActivityFeed({ copy }: { copy: Content["activity"] }) {
  return (
    <section id={copy.id} className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="flex flex-col gap-2">
          <span className="[font-family:var(--demo-mono)] text-[0.72rem] uppercase tracking-[0.22em] text-[var(--d-accent)]">
            {copy.eyebrow}
          </span>
          <h2 className="[font-family:var(--demo-display)] text-2xl font-semibold tracking-tight text-[var(--d-ink)] sm:text-[1.7rem]">
            {copy.title}
          </h2>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--d-line)] px-3 py-1.5 text-[0.72rem] text-[var(--d-ink-soft)]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--d-accent)] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--d-accent)]" />
          </span>
          {copy.filterAll}
        </span>
      </div>

      <ol className="mt-6 rounded-2xl border border-[var(--d-line)] bg-[var(--d-surface)]">
        {copy.items.map((item, idx) => {
          const meta = KIND[item.kind] ?? KIND.deal;
          const Icon = meta.icon;
          return (
            <li
              key={item.id}
              className="flex items-center gap-4 border-b border-[var(--d-line)] px-5 py-4 last:border-b-0"
            >
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                style={{ background: `${meta.color}1f`, color: meta.color }}
              >
                <Icon className="h-4 w-4" strokeWidth={1.8} />
              </span>
              <p className="min-w-0 flex-1 text-[0.86rem] leading-snug text-[var(--d-ink-soft)]">
                <span className="font-medium text-[var(--d-ink)]">{item.actor}</span> {item.action}{" "}
                <span className="font-medium text-[var(--d-ink)]">{item.target}</span>
              </p>
              <span className="shrink-0 [font-family:var(--demo-mono)] text-[0.72rem] text-[var(--d-ink-faint)]">
                {item.time}
              </span>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
