"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Plus } from "lucide-react";
import type {
  CategoryId,
  DolceItem,
  PizzaItem,
  PizzeriaContent,
  SizeId,
  SizeOption,
} from "./content";
import type { NewCartLine } from "./forno-nero";
import { Eyebrow, WoodFireBadge } from "./ui";

interface MenuSectionProps {
  content: PizzeriaContent["menu"];
  sizes: SizeOption[];
  format: (value: number) => string;
  onAdd: (line: NewCartLine) => void;
}

export function MenuSection({ content, sizes, format, onAdd }: MenuSectionProps) {
  const [category, setCategory] = useState<CategoryId>("rosse");
  const activeCategory = content.categories.find((c) => c.id === category);

  return (
    <section id="menu" className="relative scroll-mt-24 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <h2 className="mt-5 [font-family:var(--demo-display)] text-4xl font-semibold tracking-tight sm:text-5xl">
            {content.title}
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[var(--d-ink-soft)]">
            {content.intro}
          </p>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <div
            role="tablist"
            aria-label={content.eyebrow}
            className="inline-flex flex-wrap gap-1.5 rounded-full border border-[rgba(42,26,16,0.16)] bg-[var(--d-bg-soft)] p-1.5"
          >
            {content.categories.map((cat) => {
              const active = category === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  id={`fn-tab-${cat.id}`}
                  aria-selected={active}
                  aria-controls="fn-menu-panel"
                  onClick={() => setCategory(cat.id)}
                  className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                    active
                      ? "bg-[var(--d-red)] text-[#F5EBDC] shadow-[0_8px_20px_rgba(193,39,45,0.30)]"
                      : "text-[var(--d-ink-soft)] hover:bg-[rgba(42,26,16,0.06)] hover:text-[var(--d-ink)]"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
          {activeCategory && (
            <p className="[font-family:var(--demo-display)] text-sm italic text-[var(--d-basil)]">
              {activeCategory.note}
            </p>
          )}
        </div>

        <div
          id="fn-menu-panel"
          role="tabpanel"
          aria-labelledby={`fn-tab-${category}`}
          className="mt-8"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {category === "dolci" ? (
                <div className="grid gap-5 sm:grid-cols-2">
                  {content.dolci.map((item) => (
                    <DolceCard
                      key={item.id}
                      item={item}
                      labels={content}
                      format={format}
                      onAdd={onAdd}
                    />
                  ))}
                </div>
              ) : (
                <div className="grid gap-5 md:grid-cols-2">
                  {(category === "rosse" ? content.rosse : content.bianche).map(
                    (item) => (
                      <PizzaCard
                        key={item.id}
                        item={item}
                        sizes={sizes}
                        labels={content}
                        format={format}
                        onAdd={onAdd}
                      />
                    ),
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function useAddedFlash(): [boolean, () => void] {
  const [added, setAdded] = useState(false);
  useEffect(() => {
    if (!added) return;
    const timer = setTimeout(() => setAdded(false), 1400);
    return () => clearTimeout(timer);
  }, [added]);
  return [added, () => setAdded(true)];
}

function AddButton({
  added,
  addLabel,
  addedLabel,
  onClick,
  itemName,
}: {
  added: boolean;
  addLabel: string;
  addedLabel: string;
  onClick: () => void;
  itemName: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${addLabel} ${itemName}`}
      className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${
        added
          ? "bg-[var(--d-basil)] text-[#F5EBDC]"
          : "bg-[var(--d-ink)] text-[#F5EBDC] hover:bg-[var(--d-red)]"
      }`}
    >
      {added ? (
        <Check className="h-4 w-4" strokeWidth={2.4} aria-hidden />
      ) : (
        <Plus className="h-4 w-4" strokeWidth={2.4} aria-hidden />
      )}
      {added ? addedLabel : addLabel}
    </button>
  );
}

function PizzaCard({
  item,
  sizes,
  labels,
  format,
  onAdd,
}: {
  item: PizzaItem;
  sizes: SizeOption[];
  labels: PizzeriaContent["menu"];
  format: (value: number) => string;
  onAdd: (line: NewCartLine) => void;
}) {
  const [sizeId, setSizeId] = useState<SizeId>("s32");
  const [added, flash] = useAddedFlash();
  const size = sizes.find((s) => s.id === sizeId) ?? sizes[0];
  const price = item.prices[sizeId];

  const handleAdd = () => {
    onAdd({
      key: `${item.id}:${size.id}`,
      name: item.name,
      detail: `${size.cm} cm · ${size.label}`,
      unitPrice: price,
    });
    flash();
  };

  return (
    <article className="flex flex-col gap-5 rounded-3xl border border-[rgba(42,26,16,0.13)] bg-[var(--d-bg-soft)] p-6 shadow-[0_2px_0_rgba(42,26,16,0.05)] sm:p-7">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="[font-family:var(--demo-display)] text-2xl font-semibold tracking-tight">
            {item.name}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-[var(--d-ink-soft)]">
            {item.ingredients}
          </p>
        </div>
        {item.woodFired && <WoodFireBadge label={labels.woodFireBadge} />}
      </div>

      <div className="mt-auto flex flex-wrap items-end justify-between gap-4">
        <div
          role="radiogroup"
          aria-label={`${labels.sizeAria} ${item.name}`}
          className="flex gap-1.5"
        >
          {sizes.map((s) => {
            const active = sizeId === s.id;
            return (
              <button
                key={s.id}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setSizeId(s.id)}
                className={`flex min-w-[3.4rem] flex-col items-center rounded-xl border px-2.5 py-2 transition-colors ${
                  active
                    ? "border-[var(--d-red)] bg-[var(--d-red)] text-[#F5EBDC]"
                    : "border-[rgba(42,26,16,0.20)] text-[var(--d-ink-soft)] hover:border-[var(--d-ink)] hover:text-[var(--d-ink)]"
                }`}
              >
                <span className="text-sm font-bold leading-none">{s.cm}</span>
                <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.12em]">
                  {s.label}
                </span>
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-3">
          <p
            className="[font-family:var(--demo-display)] text-xl font-bold tabular-nums"
            aria-live="polite"
          >
            {format(price)}
          </p>
          <AddButton
            added={added}
            addLabel={labels.addLabel}
            addedLabel={labels.addedLabel}
            itemName={item.name}
            onClick={handleAdd}
          />
        </div>
      </div>
    </article>
  );
}

function DolceCard({
  item,
  labels,
  format,
  onAdd,
}: {
  item: DolceItem;
  labels: PizzeriaContent["menu"];
  format: (value: number) => string;
  onAdd: (line: NewCartLine) => void;
}) {
  const [added, flash] = useAddedFlash();

  const handleAdd = () => {
    onAdd({
      key: `${item.id}:unit`,
      name: item.name,
      detail: labels.dolciDetail,
      unitPrice: item.price,
    });
    flash();
  };

  return (
    <article className="flex flex-col gap-5 rounded-3xl border border-[rgba(42,26,16,0.13)] bg-[var(--d-bg-soft)] p-6 shadow-[0_2px_0_rgba(42,26,16,0.05)] sm:p-7">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="[font-family:var(--demo-display)] text-2xl font-semibold tracking-tight">
            {item.name}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-[var(--d-ink-soft)]">
            {item.description}
          </p>
        </div>
        {item.woodFired && <WoodFireBadge label={labels.woodFireBadge} />}
      </div>
      <div className="mt-auto flex items-end justify-between gap-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--d-basil)]">
          {labels.dolciDetail}
        </p>
        <div className="flex items-center gap-3">
          <p className="[font-family:var(--demo-display)] text-xl font-bold tabular-nums">
            {format(item.price)}
          </p>
          <AddButton
            added={added}
            addLabel={labels.addLabel}
            addedLabel={labels.addedLabel}
            itemName={item.name}
            onClick={handleAdd}
          />
        </div>
      </div>
    </article>
  );
}
