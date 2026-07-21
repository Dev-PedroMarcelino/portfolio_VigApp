"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import type { LawContent } from "./content";
import { EngravedRule } from "./castellan-reis";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Insights({ content }: { content: LawContent["insights"] }) {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<string>(content.allKey);

  const categories = useMemo(() => {
    const seen = new Map<string, string>();
    for (const article of content.articles) {
      if (!seen.has(article.categoryKey)) seen.set(article.categoryKey, article.category);
    }
    return [{ key: content.allKey, label: content.allLabel }, ...Array.from(seen, ([key, label]) => ({ key, label }))];
  }, [content.articles, content.allKey, content.allLabel]);

  const visible = useMemo(
    () =>
      filter === content.allKey
        ? content.articles
        : content.articles.filter((a) => a.categoryKey === filter),
    [filter, content.articles, content.allKey],
  );

  return (
    <section id="insights" className="relative bg-[var(--d-cream)] py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <header className="flex flex-col gap-8 border-b border-[var(--d-paper-bronze-line)] pb-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <EngravedRule tone="paper" />
            <p className="mt-5 text-[10px] font-medium uppercase tracking-[0.4em] text-[var(--d-bronze)]">
              {content.eyebrow}
            </p>
            <h2 className="[font-family:var(--demo-display)] mt-5 text-4xl font-normal leading-tight text-[var(--d-paper-ink)] sm:text-5xl">
              {content.title}
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-[var(--d-paper-soft)]">{content.intro}</p>
          </div>

          <div role="tablist" aria-label={content.filterAria} className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const selected = filter === category.key;
              return (
                <button
                  key={category.key}
                  role="tab"
                  aria-selected={selected}
                  type="button"
                  onClick={() => setFilter(category.key)}
                  className={`border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] transition-colors duration-300 ${
                    selected
                      ? "border-[var(--d-bronze)] bg-[var(--d-bronze)] text-[var(--d-cream)]"
                      : "border-[var(--d-paper-bronze-line)] text-[var(--d-paper-soft)] hover:border-[var(--d-bronze)] hover:text-[var(--d-bronze)]"
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        </header>

        {visible.length === 0 ? (
          <p className="py-16 text-center text-sm italic text-[var(--d-paper-soft)]">{content.emptyLabel}</p>
        ) : (
          <ul className="mt-4">
            <AnimatePresence initial={false} mode="popLayout">
              {visible.map((article, index) => (
                <motion.li
                  key={article.id}
                  layout={!reduce}
                  initial={reduce ? undefined : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.45, ease: EASE, delay: index * 0.04 }}
                  className="border-b border-[var(--d-paper-bronze-line)]"
                >
                  <a
                    href="#insights"
                    className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 py-8 sm:gap-8"
                  >
                    <span className="[font-family:var(--demo-display)] hidden w-14 text-sm text-[var(--d-paper-faint)] sm:block">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="flex flex-wrap items-center gap-3">
                        <span className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[var(--d-bronze)]">
                          {article.category}
                        </span>
                        <span aria-hidden className="h-1 w-1 rotate-45 bg-[var(--d-paper-faint)]" />
                        <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--d-paper-faint)]">
                          {article.date}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-[var(--d-paper-faint)]">
                          <Clock aria-hidden className="h-3 w-3" strokeWidth={1.5} />
                          {article.readTime}
                        </span>
                      </span>
                      <span className="[font-family:var(--demo-display)] mt-2.5 block text-xl font-normal leading-snug text-[var(--d-paper-ink)] transition-colors duration-300 group-hover:text-[var(--d-bronze)] sm:text-2xl">
                        {article.title}
                      </span>
                      <span className="mt-2 block max-w-2xl text-sm leading-relaxed text-[var(--d-paper-soft)]">
                        {article.excerpt}
                      </span>
                    </span>
                    <span className="flex items-center gap-2 self-start pt-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--d-bronze)]">
                      <span className="hidden sm:inline">{content.readLabel}</span>
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--d-paper-bronze-line)] transition-all duration-300 group-hover:border-[var(--d-bronze)] group-hover:bg-[var(--d-bronze)] group-hover:text-[var(--d-cream)]">
                        <ArrowUpRight aria-hidden className="h-4 w-4" strokeWidth={1.6} />
                      </span>
                    </span>
                  </a>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
      </div>
    </section>
  );
}
