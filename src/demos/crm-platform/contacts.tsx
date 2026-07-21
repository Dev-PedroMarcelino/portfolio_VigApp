"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Search, X, SlidersHorizontal, UserX } from "lucide-react";
import type { ContactsContent, TagId } from "./content";
import { Avatar, SectionHeading, TAG_CHIP } from "./ui";

type Filter = TagId | "all";

export function Contacts({ content }: { content: ContactsContent }) {
  const reduce = useReducedMotion();
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<Filter>("all");

  const tagLabel = useMemo(() => {
    const map: Record<string, string> = { all: content.allLabel };
    content.tags.forEach((t) => (map[t.id] = t.label));
    return map;
  }, [content.tags, content.allLabel]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return content.contacts.filter((c) => {
      const matchesTag = tag === "all" || c.tag === tag;
      const matchesQuery =
        q === "" ||
        c.name.toLowerCase().includes(q) ||
        c.company.toLowerCase().includes(q) ||
        c.role.toLowerCase().includes(q) ||
        c.handle.toLowerCase().includes(q);
      return matchesTag && matchesQuery;
    });
  }, [content.contacts, query, tag]);

  const clear = () => {
    setQuery("");
    setTag("all");
  };

  const hasFilters = query !== "" || tag !== "all";

  return (
    <section id="contacts" className="relative scroll-mt-20 bg-[var(--d-bg-alt)] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading label={content.label} title={content.title} intro={content.intro} />

        <div className="mt-10 overflow-hidden rounded-3xl border border-[var(--d-line)] bg-[var(--d-surface)] shadow-[0_30px_70px_-50px_rgba(30,27,75,0.5)]">
          {/* Toolbar */}
          <div className="flex flex-col gap-4 border-b border-[var(--d-line)] p-5">
            <div className="relative">
              <label htmlFor="relaty-contact-search" className="sr-only">
                {content.searchLabel}
              </label>
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--d-ink-faint)]"
                strokeWidth={2}
                aria-hidden
              />
              <input
                id="relaty-contact-search"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={content.searchPlaceholder}
                className="w-full rounded-xl border border-[var(--d-line-strong)] bg-[var(--d-bg)] py-3 pl-11 pr-10 text-[0.88rem] text-[var(--d-ink)] outline-none transition-colors placeholder:text-[var(--d-ink-faint)] focus:border-[var(--d-accent)] focus:bg-[var(--d-surface)] focus:ring-4 focus:ring-[var(--d-accent-soft)]"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label={content.clearLabel}
                  className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-[var(--d-ink-faint)] transition-colors hover:bg-[var(--d-bg)] hover:text-[var(--d-ink)]"
                >
                  <X className="h-3.5 w-3.5" strokeWidth={2.2} />
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1.5 text-[0.68rem] font-semibold uppercase tracking-wider text-[var(--d-ink-faint)]">
                <SlidersHorizontal className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
                {content.filterLabel}
              </span>
              {(["all", ...content.tags.map((t) => t.id)] as Filter[]).map((id) => {
                const active = tag === id;
                return (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setTag(id)}
                    className={`rounded-full border px-3 py-1.5 text-[0.74rem] font-medium transition-colors ${
                      active
                        ? "border-[var(--d-accent)] bg-[var(--d-accent)] text-[var(--d-accent-ink)]"
                        : "border-[var(--d-line-strong)] bg-[var(--d-surface)] text-[var(--d-ink-soft)] hover:border-[var(--d-accent)]/40 hover:text-[var(--d-ink)]"
                    }`}
                  >
                    {tagLabel[id]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[42rem] border-collapse text-left">
              <thead>
                <tr className="border-b border-[var(--d-line)] text-[0.66rem] font-semibold uppercase tracking-wider text-[var(--d-ink-faint)]">
                  <th scope="col" className="px-5 py-3 font-semibold">{content.columns.contact}</th>
                  <th scope="col" className="px-5 py-3 font-semibold">{content.columns.company}</th>
                  <th scope="col" className="px-5 py-3 font-semibold">{content.columns.tag}</th>
                  <th scope="col" className="px-5 py-3 text-center font-semibold">{content.columns.deals}</th>
                  <th scope="col" className="px-5 py-3 text-right font-semibold">{content.columns.value}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c, i) => (
                  <tr
                    key={c.id}
                    className="border-b border-[var(--d-line)] transition-colors last:border-0 hover:bg-[var(--d-accent-soft)]/50"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <Avatar initials={c.initials} index={i} />
                        <div>
                          <p className="text-[0.84rem] font-semibold text-[var(--d-ink)]">{c.name}</p>
                          <p className="[font-family:var(--demo-mono)] text-[0.66rem] text-[var(--d-ink-faint)]">{c.handle}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="text-[0.82rem] font-medium text-[var(--d-ink)]">{c.company}</p>
                      <p className="text-[0.68rem] text-[var(--d-ink-faint)]">{c.role}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-flex rounded-full border px-2.5 py-1 text-[0.66rem] font-semibold ${TAG_CHIP[c.tag]}`}
                      >
                        {tagLabel[c.tag]}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      <span className="[font-family:var(--demo-mono)] text-[0.8rem] font-semibold tabular-nums text-[var(--d-ink)]">
                        {c.openDeals}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right [font-family:var(--demo-mono)] text-[0.82rem] font-semibold tabular-nums text-[var(--d-ink)]">
                      {c.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty state */}
          <AnimatePresence>
            {filtered.length === 0 && (
              <motion.div
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-3 px-5 py-14 text-center"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--d-bg)] text-[var(--d-ink-faint)]">
                  <UserX className="h-6 w-6" strokeWidth={1.8} aria-hidden />
                </span>
                <p className="[font-family:var(--demo-display)] text-base font-semibold text-[var(--d-ink)]">
                  {content.emptyTitle}
                </p>
                <p className="max-w-xs text-[0.82rem] text-[var(--d-ink-soft)]">{content.emptyBody}</p>
                <button
                  type="button"
                  onClick={clear}
                  className="mt-1 rounded-full border border-[var(--d-line-strong)] px-4 py-2 text-[0.78rem] font-semibold text-[var(--d-accent-deep)] transition-colors hover:bg-[var(--d-accent-soft)]"
                >
                  {content.clearLabel}
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer bar */}
          <div className="flex items-center justify-between gap-3 px-5 py-3.5 text-[0.72rem] text-[var(--d-ink-soft)]">
            <span className="[font-family:var(--demo-mono)] tabular-nums">
              {filtered.length} {content.resultsWord}
            </span>
            {hasFilters && (
              <button
                type="button"
                onClick={clear}
                className="font-semibold text-[var(--d-accent-deep)] transition-colors hover:text-[var(--d-accent)]"
              >
                {content.clearLabel}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
