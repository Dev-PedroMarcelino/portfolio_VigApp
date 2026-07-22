"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpDown, Check, Plus, SlidersHorizontal, X } from "lucide-react";
import type {
  CartLine,
  CatalogContent,
  CatalogFilter,
  CatalogItem,
  SortId,
} from "./content";
import { Kicker, Chip, TiltCard, money, shot } from "./ui";

/* ------------------------------------------------------------------ */
/* Card                                                                */
/* ------------------------------------------------------------------ */

function CatalogCard({
  item,
  content,
  categoryLabel,
  locale,
  currency,
  index,
  onAdd,
}: {
  item: CatalogItem;
  content: CatalogContent;
  categoryLabel: string;
  locale: string;
  currency: string;
  index: number;
  onAdd: (line: CartLine) => void;
}) {
  const [added, setAdded] = useState(false);
  const [open, setOpen] = useState(false);
  const oneSize = item.sizes.length === 1;

  const addSize = (size: string) => {
    if (item.soldOut) return;
    onAdd({
      key: `${item.id}-${size}`,
      name: item.name,
      size: size === "U" || size === "OS" ? content.oneSize : size,
      price: item.price,
      image: item.image,
    });
    setAdded(true);
    setOpen(false);
    window.setTimeout(() => setAdded(false), 1600);
  };

  const quickAdd = () => {
    if (item.soldOut) return;
    if (oneSize) {
      addSize(item.sizes[0]);
      return;
    }
    setOpen((v) => !v);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: "easeOut" }}
    >
      <TiltCard className="group relative overflow-hidden rounded-[1.75rem] border border-[var(--d-line)] bg-[var(--d-panel)]">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={shot(item.image, 800)}
            alt={item.alt}
            fill
            sizes="(min-width: 768px) 380px, 92vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(160deg, rgba(255,61,129,0.18) 0%, transparent 40%, rgba(176,38,255,0.28) 100%)",
              mixBlendMode: "soft-light",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(18,8,31,0.7) 0%, transparent 50%)" }}
          />
          {item.soldOut && (
            <div aria-hidden className="absolute inset-0 bg-[#12081F]/45" />
          )}

          <div className="absolute left-4 top-4 flex flex-wrap gap-2" style={{ transform: "translateZ(40px)" }}>
            {item.soldOut ? (
              <Chip tone="outline">{content.soldOut}</Chip>
            ) : (
              <>
                {item.isNew && <Chip tone="volt">{content.newBadge}</Chip>}
                {item.lowStock && <Chip tone="pink">{content.lastUnits}</Chip>}
              </>
            )}
          </div>

          <p
            className="absolute bottom-4 left-4 [font-family:var(--demo-display)] text-2xl leading-none text-[var(--d-ink)]"
            style={{ transform: "translateZ(50px)" }}
          >
            {money(locale, currency, item.price)}
          </p>

          {/* quick view — second layer of info revealed on hover / quick-add */}
          {!item.soldOut && !oneSize && (
            <div
              className={`absolute inset-x-3 bottom-3 z-10 rounded-2xl border border-[var(--d-line)] bg-[#12081F]/90 p-3 backdrop-blur-md transition-all duration-300 ${
                open
                  ? "translate-y-0 opacity-100"
                  : "pointer-events-none translate-y-2 opacity-0 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100"
              }`}
            >
              <p className="text-[0.56rem] font-bold uppercase tracking-[0.22em] text-[var(--d-accent)] [font-family:var(--demo-body)]">
                {added ? content.added : content.chooseSize}
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {item.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => addSize(s)}
                    className="min-w-9 rounded-lg border border-[var(--d-line)] px-2 py-1.5 text-[0.7rem] font-bold tabular-nums text-[var(--d-ink)] transition-colors hover:border-[var(--d-accent)] hover:bg-[var(--d-accent)] hover:text-[#12081F] [font-family:var(--demo-body)]"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-3 p-4">
          <div className="min-w-0">
            <h3 className="truncate [font-family:var(--demo-display)] text-lg leading-tight text-[var(--d-ink)]">
              {item.name}
            </h3>
            <p className="mt-0.5 truncate text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[var(--d-ink-soft)] [font-family:var(--demo-body)]">
              {categoryLabel} · {item.colorway}
            </p>
          </div>

          <button
            type="button"
            onClick={quickAdd}
            disabled={item.soldOut}
            aria-expanded={oneSize ? undefined : open}
            aria-label={item.soldOut ? content.soldOut : `${content.quickAdd} — ${item.name}`}
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-all [font-family:var(--demo-body)] ${
              item.soldOut
                ? "cursor-not-allowed bg-white/[0.04] text-[var(--d-mute)]"
                : added
                ? "bg-[var(--d-volt)] text-[#12081F]"
                : "bg-[var(--d-accent)] text-[#12081F] hover:scale-110"
            }`}
          >
            <motion.span
              key={added ? "ok" : "add"}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              {added ? (
                <Check className="h-4 w-4" strokeWidth={2.6} aria-hidden />
              ) : (
                <Plus className="h-4 w-4" strokeWidth={2.6} aria-hidden />
              )}
            </motion.span>
          </button>
        </div>
      </TiltCard>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Section — category + size filters, sorting, result count            */
/* ------------------------------------------------------------------ */

export function CatalogGrid({
  content,
  locale,
  currency,
  onAdd,
}: {
  content: CatalogContent;
  locale: string;
  currency: string;
  onAdd: (line: CartLine) => void;
}) {
  const [category, setCategory] = useState<CatalogFilter>("all");
  const [size, setSize] = useState<string | null>(null);
  const [sort, setSort] = useState<SortId>("featured");

  const categoryLabels = useMemo(() => {
    const map = new Map<string, string>();
    for (const c of content.categories) map.set(c.id, c.label);
    return map;
  }, [content.categories]);

  const filtered = useMemo(() => {
    let list = content.items.filter(
      (it) =>
        (category === "all" || it.category === category) &&
        (!size || it.sizes.includes(size)),
    );
    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "new":
        list = [...list].sort(
          (a, b) => Number(b.isNew ?? false) - Number(a.isNew ?? false),
        );
        break;
      default:
        break;
    }
    return list;
  }, [content.items, category, size, sort]);

  const hasFilters = category !== "all" || size !== null || sort !== "featured";

  const clear = () => {
    setCategory("all");
    setSize(null);
    setSort("featured");
  };

  return (
    <section id="catalogo" className="scroll-mt-20 px-5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <Kicker text={content.label} />
          <h2 className="mt-4 [font-family:var(--demo-display)] text-5xl tracking-tight text-[var(--d-ink)] md:text-6xl">
            {content.title}
          </h2>
          <p className="mt-4 text-[0.95rem] leading-relaxed text-[var(--d-ink-soft)]">{content.intro}</p>
        </div>

        {/* toolbar */}
        <div className="mt-10 rounded-[1.75rem] border border-[var(--d-line)] bg-[var(--d-panel)] p-4 md:p-5">
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
            {/* categories */}
            <div>
              <p className="flex items-center gap-1.5 text-[0.56rem] font-bold uppercase tracking-[0.24em] text-[var(--d-mute)] [font-family:var(--demo-body)]">
                <SlidersHorizontal className="h-3 w-3" strokeWidth={2} aria-hidden />
                {content.filterLabel}
              </p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {content.categories.map((cat) => {
                  const selected = category === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setCategory(cat.id)}
                      className={`rounded-full border px-4 py-2 text-[0.66rem] font-bold uppercase tracking-[0.16em] transition-colors [font-family:var(--demo-body)] ${
                        selected
                          ? "border-[var(--d-accent)] bg-[var(--d-accent)] text-[#12081F]"
                          : "border-[var(--d-line)] text-[var(--d-ink-soft)] hover:border-[var(--d-accent)] hover:text-[var(--d-ink)]"
                      }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* sort */}
            <div>
              <p className="flex items-center gap-1.5 text-[0.56rem] font-bold uppercase tracking-[0.24em] text-[var(--d-mute)] [font-family:var(--demo-body)]">
                <ArrowUpDown className="h-3 w-3" strokeWidth={2} aria-hidden />
                {content.sortLabel}
              </p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {content.sortOptions.map((opt) => {
                  const selected = sort === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setSort(opt.id)}
                      className={`rounded-full border px-3.5 py-2 text-[0.62rem] font-bold uppercase tracking-[0.14em] transition-colors [font-family:var(--demo-body)] ${
                        selected
                          ? "border-[var(--d-accent-2)] bg-[var(--d-accent-2)] text-white"
                          : "border-[var(--d-line)] text-[var(--d-ink-soft)] hover:border-[var(--d-accent-2)] hover:text-[var(--d-ink)]"
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* sizes */}
          <div className="mt-4 border-t border-[var(--d-line)] pt-4">
            <p className="text-[0.56rem] font-bold uppercase tracking-[0.24em] text-[var(--d-mute)] [font-family:var(--demo-body)]">
              {content.sizeLabel}
            </p>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {content.sizeOptions.map((s) => {
                const selected = size === s;
                return (
                  <button
                    key={s}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setSize(selected ? null : s)}
                    className={`min-w-10 rounded-xl border px-2.5 py-2 text-[0.72rem] font-bold tabular-nums transition-colors [font-family:var(--demo-body)] ${
                      selected
                        ? "border-[var(--d-accent)] bg-[var(--d-accent)] text-[#12081F]"
                        : "border-[var(--d-line)] text-[var(--d-ink)] hover:border-[var(--d-accent)]"
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* result count + clear */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p aria-live="polite" className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[var(--d-ink-soft)] [font-family:var(--demo-body)]">
            <span className="text-[var(--d-accent)]">{filtered.length}</span>{" "}
            {filtered.length === 1 ? content.resultsSingular : content.resultsPlural}
          </p>
          {hasFilters && (
            <button
              type="button"
              onClick={clear}
              className="flex items-center gap-1.5 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[var(--d-mute)] transition-colors hover:text-[var(--d-accent)] [font-family:var(--demo-body)]"
            >
              <X className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden />
              {content.clearFilters}
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="mt-10 rounded-[1.75rem] border border-dashed border-[var(--d-line)] px-6 py-16 text-center">
            <p className="[font-family:var(--demo-display)] text-3xl tracking-tight text-[var(--d-ink)]">
              {content.emptyTitle}
            </p>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-[var(--d-ink-soft)]">
              {content.emptyBody}
            </p>
            <button
              type="button"
              onClick={clear}
              className="mt-6 rounded-full bg-[var(--d-accent)] px-6 py-3 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#12081F] transition-transform hover:scale-[1.04] [font-family:var(--demo-body)]"
            >
              {content.clearFilters}
            </button>
          </div>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item, i) => (
              <CatalogCard
                key={item.id}
                item={item}
                content={content}
                categoryLabel={categoryLabels.get(item.category) ?? item.category}
                locale={locale}
                currency={currency}
                index={i}
                onAdd={onAdd}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
