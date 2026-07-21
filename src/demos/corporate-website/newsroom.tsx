"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import type { NewsCategoryId, NewsroomContent } from "./content";
import { SectionHeading } from "./ui";

const CATEGORY_LABEL: Record<Exclude<NewsCategoryId, "all">, string> = {
  corporate: "Corporate",
  energy: "Energy",
  finance: "Finance",
  sustainability: "Sustainability",
};

export function Newsroom({ content }: { content: NewsroomContent }) {
  const [filter, setFilter] = useState<NewsCategoryId>("all");

  const items = useMemo(
    () => (filter === "all" ? content.items : content.items.filter((n) => n.category === filter)),
    [filter, content.items],
  );

  // Localised category chip labels come from the filter list in the dict.
  const chipLabel = (id: Exclude<NewsCategoryId, "all">) =>
    content.filters.find((f) => f.id === id)?.label ?? CATEGORY_LABEL[id];

  return (
    <section id="newsroom" className="relative scroll-mt-20 border-t border-[var(--d-line)] py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading label={content.eyebrow} title={content.title} intro={content.intro} />

        <div role="tablist" aria-label={content.eyebrow} className="mt-9 flex flex-wrap gap-2">
          {content.filters.map((f) => {
            const selected = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setFilter(f.id)}
                className={`rounded-sm border px-4 py-2 text-[0.8rem] font-medium transition-colors ${
                  selected
                    ? "border-[var(--d-steel-bright)] bg-[var(--d-steel)]/15 text-[var(--d-ink)]"
                    : "border-[var(--d-line)] text-[var(--d-ink-faint)] hover:border-[var(--d-line-strong)] hover:text-[var(--d-ink-soft)]"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        <div className="mt-8 divide-y divide-[var(--d-line)] border-y border-[var(--d-line)]">
          <AnimatePresence mode="popLayout" initial={false}>
            {items.map((item) => (
              <motion.article
                key={item.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="group grid gap-4 py-6 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-8"
              >
                <div className="flex items-center gap-4 sm:w-40 sm:flex-col sm:items-start sm:gap-1.5">
                  <time className="text-[0.8rem] font-medium text-[var(--d-ink-soft)] tabular-nums">
                    {item.date}
                  </time>
                  <span className="inline-flex w-fit items-center rounded-sm bg-[var(--d-panel)] px-2 py-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-[var(--d-steel-bright)]">
                    {chipLabel(item.category)}
                  </span>
                </div>

                <div className="min-w-0">
                  <h3 className="[font-family:var(--demo-display)] text-[1.15rem] font-semibold leading-snug text-[var(--d-ink)] transition-colors group-hover:text-[var(--d-steel-bright)]">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-[0.88rem] leading-relaxed text-[var(--d-ink-soft)]">{item.excerpt}</p>
                  <p className="mt-2 flex items-center gap-3 text-[0.72rem] text-[var(--d-ink-faint)]">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3 w-3" strokeWidth={1.8} aria-hidden />
                      {item.location}
                    </span>
                    <span aria-hidden>·</span>
                    <span>{item.readTime}</span>
                  </p>
                </div>

                <span className="hidden shrink-0 items-center gap-1.5 text-[0.78rem] font-medium text-[var(--d-ink-soft)] transition-colors group-hover:text-[var(--d-ink)] sm:inline-flex">
                  {content.readMore}
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.8}
                    aria-hidden
                  />
                </span>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {items.length === 0 && (
          <p className="py-12 text-center text-[0.9rem] text-[var(--d-ink-faint)]">{content.empty}</p>
        )}
      </div>
    </section>
  );
}
