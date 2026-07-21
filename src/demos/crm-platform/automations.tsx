"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  UserPlus,
  MailCheck,
  CalendarClock,
  Flame,
  BellRing,
  GitBranch,
  ArrowRight,
} from "lucide-react";
import type { AutomationsContent, RecipeIconId } from "./content";
import { SectionHeading } from "./ui";

const ICONS: Record<RecipeIconId, typeof UserPlus> = {
  userPlus: UserPlus,
  mailCheck: MailCheck,
  calendarClock: CalendarClock,
  flame: Flame,
  bellRing: BellRing,
  gitBranch: GitBranch,
};

export function Automations({ content }: { content: AutomationsContent }) {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(content.recipes.map((r) => [r.id, r.defaultOn])),
  );

  const activeCount = useMemo(() => Object.values(enabled).filter(Boolean).length, [enabled]);

  const toggle = (id: string) => setEnabled((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <section id="automations" className="relative scroll-mt-20 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading label={content.label} title={content.title} intro={content.intro} />
          <div className="flex shrink-0 items-center gap-2.5 rounded-2xl border border-[var(--d-line)] bg-[var(--d-surface)] px-4 py-3">
            <span className="[font-family:var(--demo-display)] text-3xl font-semibold tabular-nums text-[var(--d-accent)]">
              {activeCount}
            </span>
            <span className="text-[0.72rem] font-medium leading-tight text-[var(--d-ink-soft)]">
              {content.activeLabel}
            </span>
          </div>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {content.recipes.map((recipe, i) => {
            const Icon = ICONS[recipe.icon];
            const on = enabled[recipe.id];
            return (
              <motion.article
                key={recipe.id}
                initial={reduce ? false : { opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
                className={`flex flex-col rounded-3xl border p-6 transition-colors ${
                  on
                    ? "border-[var(--d-accent)]/40 bg-[var(--d-surface)] shadow-[0_24px_50px_-40px_rgba(79,70,229,0.9)]"
                    : "border-[var(--d-line)] bg-[var(--d-surface)]"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl transition-colors ${
                      on ? "bg-[var(--d-accent)] text-[var(--d-accent-ink)]" : "bg-[var(--d-bg)] text-[var(--d-ink-faint)]"
                    }`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.9} aria-hidden />
                  </span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={on}
                    aria-label={on ? content.disableLabel : content.enableLabel}
                    onClick={() => toggle(recipe.id)}
                    className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                      on ? "bg-[var(--d-accent)]" : "bg-[var(--d-line-strong)]"
                    }`}
                  >
                    <motion.span
                      layout={!reduce}
                      transition={{ type: "spring", stiffness: 550, damping: 34 }}
                      className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm ${on ? "right-0.5" : "left-0.5"}`}
                    />
                  </button>
                </div>

                <div className="mt-5 space-y-2.5 text-[0.82rem]">
                  <p className="flex flex-wrap items-baseline gap-1.5">
                    <span className="rounded-md bg-[#E7F5FF] px-1.5 py-0.5 text-[0.62rem] font-bold uppercase tracking-wider text-[#0369A1]">
                      {content.triggerWord}
                    </span>
                    <span className="text-[var(--d-ink)]">{recipe.trigger}</span>
                  </p>
                  <p className="flex items-center gap-1.5 pl-1 text-[var(--d-ink-faint)]">
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
                  </p>
                  <p className="flex flex-wrap items-baseline gap-1.5">
                    <span className="rounded-md bg-[var(--d-accent-soft)] px-1.5 py-0.5 text-[0.62rem] font-bold uppercase tracking-wider text-[var(--d-accent-deep)]">
                      {content.actionWord}
                    </span>
                    <span className="text-[var(--d-ink)]">{recipe.action}</span>
                  </p>
                </div>

                <p className="mt-4 text-[0.78rem] leading-relaxed text-[var(--d-ink-soft)]">{recipe.blurb}</p>

                <p className="mt-5 border-t border-[var(--d-line)] pt-4 [font-family:var(--demo-mono)] text-[0.68rem] text-[var(--d-ink-faint)]">
                  <span className="font-semibold text-[var(--d-ink-soft)]">{recipe.runs}</span> {content.runsWord}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
