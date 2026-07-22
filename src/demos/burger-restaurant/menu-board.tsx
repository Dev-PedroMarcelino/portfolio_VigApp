"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotionSafe as useReducedMotion } from "@/components/demos/use-reduced-motion-safe";
import { Flame, Leaf, Search, Sparkles, Star, X } from "lucide-react";
import type { GaragemContent, MenuCat, MenuSeed, MenuTag } from "./content";
import { COMBOS, MENU } from "./content";
import { FOCUS_RING, SectionLabel, Stamp, Tape, fmtBRL } from "./ui";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Strip accents so "geracao" finds "Geração". */
function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

const TAG_STYLE: Record<MenuTag, { color: string; Icon: typeof Flame }> = {
  spicy: { color: "#FF6B5B", Icon: Flame },
  veggie: { color: "#6BD98A", Icon: Leaf },
  top: { color: "var(--d-yellow)", Icon: Star },
  new: { color: "#FF6B5B", Icon: Sparkles },
};

function TagChip({ tag, label }: { tag: MenuTag; label: string }) {
  const { color, Icon } = TAG_STYLE[tag];
  return (
    <span
      className="inline-flex items-center gap-1 border px-1.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.14em] [font-family:var(--demo-mono)]"
      style={{ color, borderColor: `color-mix(in srgb, ${tag === "top" ? "#F2B705" : tag === "veggie" ? "#6BD98A" : "#FF6B5B"} 55%, transparent)` }}
    >
      <Icon className="h-3 w-3" strokeWidth={2.4} aria-hidden />
      {label}
    </span>
  );
}

/** One board line: name ..... price, with a dotted leader and a saucy description. */
function BoardRow({
  item,
  desc,
  tagLabels,
  catLabel,
  reduced,
  index,
}: {
  item: MenuSeed;
  desc: string;
  tagLabels: Record<MenuTag, string>;
  catLabel?: string;
  reduced: boolean;
  index: number;
}) {
  return (
    <motion.li
      layout={!reduced}
      initial={reduced ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduced ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -10, transition: { duration: 0.18 } }}
      transition={{ duration: 0.4, ease: EASE, delay: reduced ? 0 : Math.min(index * 0.045, 0.35) }}
      className="group py-4 first:pt-0 last:pb-0"
    >
      <div className="flex items-baseline gap-3">
        <h3 className="shrink-0 text-lg uppercase leading-tight tracking-wide text-[var(--d-ink)] transition-colors duration-200 [font-family:var(--demo-display)] group-hover:text-[var(--d-yellow)] sm:text-xl">
          {item.name}
        </h3>
        <span
          aria-hidden
          className="min-w-6 flex-1 translate-y-[-3px] border-b-2 border-dotted border-[var(--d-line)] transition-colors duration-200 group-hover:border-[var(--d-red)]"
        />
        <span className="shrink-0 text-base font-medium text-[var(--d-yellow)] [font-family:var(--demo-mono)] sm:text-lg">
          {fmtBRL(item.price)}
        </span>
      </div>

      <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1.5 pr-0 sm:pr-24">
        <p className="max-w-xl text-[0.84rem] leading-relaxed text-[var(--d-ink-soft)]">{desc}</p>
        <span className="inline-flex flex-wrap items-center gap-1.5">
          {catLabel && (
            <span className="inline-flex items-center border border-[var(--d-line)] px-1.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.14em] text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]">
              {catLabel}
            </span>
          )}
          {item.tags?.map((t) => <TagChip key={t} tag={t} label={tagLabels[t]} />)}
        </span>
      </div>
    </motion.li>
  );
}

export function MenuBoard({ content }: { content: GaragemContent["menu"] }) {
  const reduced = useReducedMotion() ?? false;
  const [cat, setCat] = useState<MenuCat>("burgers");
  const [query, setQuery] = useState("");

  const counts = useMemo(() => {
    const c = { burgers: 0, sides: 0, shakes: 0, drinks: 0 } as Record<MenuCat, number>;
    for (const item of MENU) c[item.cat] += 1;
    return c;
  }, []);

  const searching = query.trim().length > 0;

  const visible = useMemo(() => {
    if (!searching) return MENU.filter((m) => m.cat === cat);
    const q = normalize(query);
    return MENU.filter(
      (m) => normalize(m.name).includes(q) || normalize(content.descriptions[m.id] ?? "").includes(q),
    );
  }, [cat, query, searching, content.descriptions]);

  const catLabelOf = (id: MenuCat) => content.cats.find((c) => c.id === id)?.label ?? id;

  return (
    <section id="cardapio" className="relative scroll-mt-20 py-20 sm:py-24">
      <div className="mx-auto max-w-4xl px-5">
        <SectionLabel text={content.label} />
        <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-5xl uppercase leading-[0.95] text-[var(--d-ink)] [font-family:var(--demo-display)] sm:text-6xl">
            {content.title}
          </h2>
          <Stamp rotate={2.5} color="var(--d-yellow)" className="mb-2">
            Est. 2016
          </Stamp>
        </div>
        <p className="mt-4 max-w-2xl text-[0.95rem] leading-relaxed text-[var(--d-ink-soft)]">{content.intro}</p>

        {/* Controls: ticket-stub category tabs + search */}
        <div className="mt-9 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2" role="group" aria-label={content.label}>
            {content.cats.map((c) => {
              const active = !searching && cat === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    setCat(c.id);
                    setQuery("");
                  }}
                  className={`relative flex items-center gap-2 border-2 px-3.5 py-2 text-[0.72rem] font-bold uppercase tracking-[0.12em] transition-all duration-200 ${FOCUS_RING} ${
                    active
                      ? "-rotate-1 border-[var(--d-red)] bg-[var(--d-red)] text-[var(--d-bg)] shadow-[3px_3px_0_var(--d-yellow)]"
                      : "border-[var(--d-line)] bg-transparent text-[var(--d-ink-soft)] hover:border-[var(--d-red)] hover:text-[var(--d-ink)]"
                  }`}
                >
                  {c.label}
                  <span
                    className={`px-1 text-[0.62rem] [font-family:var(--demo-mono)] ${
                      active ? "bg-[var(--d-bg)] text-[var(--d-yellow)]" : "bg-[var(--d-panel)] text-[var(--d-ink-soft)]"
                    }`}
                  >
                    {counts[c.id]}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative md:w-64">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--d-ink-soft)]"
              strokeWidth={2.2}
              aria-hidden
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={content.searchPlaceholder}
              aria-label={content.searchAria}
              className={`w-full border-2 border-[var(--d-line)] bg-[var(--d-panel)] py-2.5 pl-10 pr-9 text-sm text-[var(--d-ink)] placeholder:text-[var(--d-ink-soft)]/70 transition-colors focus:border-[var(--d-yellow)] focus:outline-none [font-family:var(--demo-body)] [&::-webkit-search-cancel-button]:hidden`}
            />
            {searching && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label={content.clearSearch}
                className={`absolute right-2 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center text-[var(--d-ink-soft)] transition-colors hover:text-[var(--d-red)] ${FOCUS_RING}`}
              >
                <X className="h-4 w-4" strokeWidth={2.4} />
              </button>
            )}
          </div>
        </div>

        {/* The board */}
        <div className="relative mt-8 border-2 border-[var(--d-line)] bg-[var(--d-panel)]/60 p-6 sm:p-9">
          <Tape className="-top-3.5 left-8" rotate={-5} />
          <Tape className="-top-3.5 right-10 hidden sm:block" rotate={4} />

          {searching && (
            <p className="mb-4 text-[0.72rem] uppercase tracking-[0.2em] text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]" aria-live="polite">
              {visible.length} {content.resultsFor} &ldquo;{query.trim()}&rdquo;
            </p>
          )}

          <AnimatePresence mode="popLayout" initial={false}>
            {visible.length > 0 ? (
              <motion.ul
                key={searching ? "search" : cat}
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: reduced ? 0 : 0.15 } }}
                className="divide-y divide-[var(--d-line)]/60"
              >
                {visible.map((item, i) => (
                  <BoardRow
                    key={item.id}
                    item={item}
                    index={i}
                    desc={content.descriptions[item.id] ?? ""}
                    tagLabels={content.tagLabels}
                    catLabel={searching ? catLabelOf(item.cat) : undefined}
                    reduced={reduced}
                  />
                ))}
              </motion.ul>
            ) : (
              <motion.p
                key="empty"
                initial={reduced ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="py-10 text-center text-sm leading-relaxed text-[var(--d-ink-soft)]"
              >
                {content.empty}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Combos */}
        <h3 className="mt-14 flex items-center gap-3 text-3xl uppercase text-[var(--d-ink)] [font-family:var(--demo-display)]">
          {content.combosLabel}
          <span aria-hidden className="h-1 flex-1 bg-[repeating-linear-gradient(-45deg,var(--d-line)_0_8px,transparent_8px_16px)]" />
        </h3>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {COMBOS.map((combo, i) => (
            <motion.article
              key={combo.id}
              initial={reduced ? false : { opacity: 0, y: 24, rotate: i === 0 ? -1.2 : 1.2 }}
              whileInView={{ opacity: 1, y: 0, rotate: i === 0 ? -0.6 : 0.6 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: EASE, delay: reduced ? 0 : i * 0.1 }}
              whileHover={reduced ? undefined : { rotate: 0, y: -4 }}
              className={`relative border-2 border-dashed p-6 ${
                i === 0
                  ? "border-[var(--d-red)] bg-[color:rgba(244,63,46,0.08)]"
                  : "border-[var(--d-yellow)] bg-[color:rgba(242,183,5,0.06)]"
              }`}
            >
              <Tape className="-top-3 left-1/2 -ml-12" rotate={i === 0 ? -3 : 3} />
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Stamp rotate={-2} color={i === 0 ? "var(--d-red)" : "var(--d-yellow)"}>
                    {content.comboTag}
                  </Stamp>
                  <h4 className="mt-3 text-2xl uppercase leading-none text-[var(--d-ink)] [font-family:var(--demo-display)]">
                    {combo.name}
                  </h4>
                </div>
                <p className="text-2xl font-medium text-[var(--d-yellow)] [font-family:var(--demo-mono)]">
                  {fmtBRL(combo.price)}
                </p>
              </div>
              <p className="mt-3 text-[0.86rem] leading-relaxed text-[var(--d-ink-soft)]">
                {content.comboDescs[combo.id]}
              </p>
            </motion.article>
          ))}
        </div>

        <p className="mt-8 text-center text-[0.7rem] uppercase tracking-[0.18em] text-[var(--d-ink-soft)]/80 [font-family:var(--demo-mono)]">
          {content.priceNote}
        </p>
      </div>
    </section>
  );
}
