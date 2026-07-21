"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Bug, Gauge, Sparkles } from "lucide-react";
import type { ChangeFilter, ChangelogContent, ChangeType } from "./content";
import { SectionHeading } from "./ui";

const TYPE_STYLES: Record<ChangeType, { chip: string; icon: typeof Sparkles }> = {
  feature: {
    chip: "border-[var(--d-accent)]/40 bg-[var(--d-accent)]/10 text-[var(--d-accent-soft)]",
    icon: Sparkles,
  },
  fix: {
    chip: "border-[var(--d-rose)]/40 bg-[var(--d-rose)]/10 text-[var(--d-rose)]",
    icon: Bug,
  },
  improvement: {
    chip: "border-[var(--d-cyan)]/40 bg-[var(--d-cyan)]/10 text-[var(--d-cyan)]",
    icon: Gauge,
  },
};

export function ChangelogSection({ content }: { content: ChangelogContent }) {
  const [filter, setFilter] = useState<ChangeFilter>("all");
  const reduce = useReducedMotion() ?? false;

  const entries =
    filter === "all" ? content.entries : content.entries.filter((e) => e.type === filter);

  return (
    <section id="changelog" className="scroll-mt-20 px-5 py-24 md:py-32">
      <div className="mx-auto max-w-3xl">
        <SectionHeading label={content.label} title={content.title} intro={content.intro} />

        <div
          role="group"
          aria-label={content.filterAria}
          className="mt-10 flex flex-wrap justify-center gap-2"
        >
          {content.filters.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${
                filter === f.id
                  ? "border-[var(--d-accent)] bg-[var(--d-accent)]/15 text-[var(--d-accent-soft)] shadow-[0_0_16px_-4px_rgba(139,92,246,0.7)]"
                  : "border-[var(--d-line-bright)] text-[var(--d-ink-dim)] hover:border-[var(--d-ink-faint)] hover:text-[var(--d-ink)]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="relative mt-12">
          <span
            className="absolute bottom-2 left-[7px] top-2 hidden w-px bg-[var(--d-line)] sm:block"
            aria-hidden
          />
          <AnimatePresence mode="popLayout" initial={false}>
            {entries.map((entry) => {
              const style = TYPE_STYLES[entry.type];
              const Icon = style.icon;
              return (
                <motion.article
                  key={entry.version}
                  layout={!reduce}
                  initial={reduce ? undefined : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="relative pb-10 sm:pl-10"
                >
                  <span
                    className="absolute left-0 top-1.5 hidden h-[15px] w-[15px] rounded-full border-2 border-[var(--d-accent)] bg-[#0B0B12] sm:block"
                    aria-hidden
                  />
                  <div className="rounded-2xl border border-[var(--d-line)] bg-[var(--d-panel)]/70 p-6 transition-colors hover:border-[var(--d-line-bright)]">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                      <span className="rounded-md bg-[var(--d-bg-raise)] px-2 py-1 [font-family:var(--d-mono)] text-[0.68rem] text-[var(--d-ink)]">
                        {entry.version}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-wider ${style.chip}`}
                      >
                        <Icon className="h-3 w-3" strokeWidth={2} aria-hidden />
                        {content.typeLabels[entry.type]}
                      </span>
                      <time className="ml-auto text-[0.7rem] text-[var(--d-ink-faint)]">
                        {entry.date}
                      </time>
                    </div>
                    <h3 className="mt-3.5 [font-family:var(--demo-display)] text-lg font-medium tracking-tight text-[var(--d-ink)]">
                      {entry.title}
                    </h3>
                    <p className="mt-2 text-[0.85rem] leading-relaxed text-[var(--d-ink-dim)]">
                      {entry.body}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
          {entries.length === 0 ? (
            <p className="py-10 text-center text-sm text-[var(--d-ink-faint)]">{content.empty}</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
