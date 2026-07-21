"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Search, SearchX, X } from "lucide-react";
import type { IntegrationCategoryId, IntegrationsContent } from "./content";
import { Glow, Monogram, SectionHeading, scrollToId } from "./ui";

type Filter = "all" | IntegrationCategoryId;

export function Integrations({ content }: { content: IntegrationsContent }) {
  const reduce = useReducedMotion();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Filter>("all");

  const categoryLabel = useMemo(() => {
    const map = new Map(content.categories.map((c) => [c.id, c.label]));
    return (id: IntegrationCategoryId) => map.get(id) ?? id;
  }, [content.categories]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return content.items.filter((item) => {
      const matchesCategory = category === "all" || item.category === category;
      const matchesQuery =
        q.length === 0 ||
        item.name.toLowerCase().includes(q) ||
        item.blurb.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [content.items, query, category]);

  return (
    <section id="integrations" className="relative scroll-mt-20 py-24">
      <Glow className="-left-48 top-40 h-96 w-96" />
      <div className="relative mx-auto max-w-6xl px-5">
        <SectionHeading label={content.label} title={content.title} intro={content.intro} />

        {/* Search + category filters */}
        <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center gap-4">
          <div className="relative w-full max-w-md">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--d-ink-faint)]"
              strokeWidth={2}
              aria-hidden
            />
            <label htmlFor="of-integration-search" className="sr-only">
              {content.searchLabel}
            </label>
            <input
              id="of-integration-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={content.searchPlaceholder}
              className="w-full rounded-full border border-[var(--d-line)] bg-[var(--d-panel)] py-3 pl-11 pr-11 text-sm text-[var(--d-ink)] placeholder:text-[var(--d-ink-faint)] outline-none backdrop-blur transition-colors focus:border-[var(--d-accent)]/60 focus:bg-[rgba(96,165,250,0.05)]"
            />
            {query.length > 0 && (
              <button
                type="button"
                aria-label={content.clearLabel}
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-[var(--d-ink-faint)] transition-colors hover:bg-[var(--d-panel-strong)] hover:text-[var(--d-ink)]"
              >
                <X className="h-3.5 w-3.5" strokeWidth={2.2} />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {([{ id: "all" as const, label: content.allLabel }, ...content.categories]).map((cat) => (
              <button
                key={cat.id}
                type="button"
                aria-pressed={category === cat.id}
                onClick={() => setCategory(cat.id)}
                className={`rounded-full border px-3.5 py-1.5 text-[0.72rem] font-medium transition-colors ${
                  category === cat.id
                    ? "border-[var(--d-accent)]/60 bg-[rgba(96,165,250,0.14)] text-[#93C5FD]"
                    : "border-[var(--d-line)] text-[var(--d-ink-soft)] hover:border-[var(--d-line-strong)] hover:text-[var(--d-ink)]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <p aria-live="polite" className="text-[0.7rem] tabular-nums text-[var(--d-ink-faint)]">
            {content.showing} {filtered.length} {content.of} {content.items.length} {content.itemsWord}
          </p>
        </div>

        {/* Grid / empty state */}
        <div className="mt-10">
          <AnimatePresence mode="popLayout" initial={false}>
            {filtered.length > 0 ? (
              <motion.ul
                key="grid"
                layout={!reduce}
                className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  {filtered.map((item) => {
                    const originalIndex = content.items.findIndex((i) => i.name === item.name);
                    return (
                      <motion.li
                        key={item.name}
                        layout={!reduce}
                        initial={reduce ? false : { opacity: 0, scale: 0.94 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={reduce ? undefined : { opacity: 0, scale: 0.94 }}
                        transition={{ duration: 0.22 }}
                        className="group flex items-center gap-4 rounded-2xl border border-[var(--d-line)] bg-[var(--d-panel)] p-4 backdrop-blur transition-colors hover:border-[var(--d-accent)]/40 hover:bg-[rgba(96,165,250,0.06)]"
                      >
                        <Monogram name={item.name} index={originalIndex} />
                        <div className="min-w-0 flex-1">
                          <p className="flex items-center gap-2 text-sm font-semibold text-[var(--d-ink)]">
                            {item.name}
                            <span className="rounded-full bg-[var(--d-panel-strong)] px-2 py-0.5 text-[0.56rem] font-medium uppercase tracking-wide text-[var(--d-ink-faint)]">
                              {categoryLabel(item.category)}
                            </span>
                          </p>
                          <p className="mt-0.5 truncate text-[0.76rem] text-[var(--d-ink-soft)]">{item.blurb}</p>
                        </div>
                        <ArrowUpRight
                          className="h-4 w-4 shrink-0 text-[var(--d-ink-faint)] transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--d-accent)]"
                          strokeWidth={2}
                          aria-hidden
                        />
                      </motion.li>
                    );
                  })}
                </AnimatePresence>
              </motion.ul>
            ) : (
              <motion.div
                key="empty"
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="mx-auto flex max-w-md flex-col items-center gap-3 rounded-2xl border border-dashed border-[var(--d-line-strong)] px-8 py-14 text-center"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--d-panel-strong)]">
                  <SearchX className="h-5 w-5 text-[var(--d-ink-faint)]" strokeWidth={1.8} aria-hidden />
                </span>
                <p className="text-sm font-semibold text-[var(--d-ink)]">{content.emptyTitle}</p>
                <p className="text-[0.82rem] leading-relaxed text-[var(--d-ink-soft)]">{content.emptyBody}</p>
                <button
                  type="button"
                  onClick={() => scrollToId("cta")}
                  className="mt-2 rounded-full border border-[var(--d-accent)]/50 px-5 py-2 text-[0.78rem] font-semibold text-[var(--d-accent)] transition-colors hover:bg-[rgba(96,165,250,0.1)]"
                >
                  {content.requestCta}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
