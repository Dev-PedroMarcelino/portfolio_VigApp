"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Flame } from "lucide-react";
import type { BurgerItem, EmberStackContent, MenuTabId } from "./content";
import type { NewCartLine } from "./ember-stack";
import { AddButton, Eyebrow, HeatMeter, Sticker, useAddedFlash } from "./ui";

interface MenuSectionProps {
  content: EmberStackContent["menu"];
  format: (value: number) => string;
  onAdd: (line: NewCartLine) => void;
}

export function MenuSection({ content, format, onAdd }: MenuSectionProps) {
  const [tab, setTab] = useState<MenuTabId>("all");
  const reduce = useReducedMotion();

  const visible =
    tab === "all"
      ? content.items
      : content.items.filter((item) => item.category === tab);

  return (
    <section id="menu" className="relative scroll-mt-24 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <h2 className="mt-5 [font-family:var(--demo-display)] text-[clamp(1.9rem,4.5vw,3.1rem)] uppercase leading-[1.02] text-[var(--d-ink)]">
            {content.title}
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[var(--d-ink-soft)]">
            {content.intro}
          </p>
        </div>

        <div
          role="tablist"
          aria-label={content.tabsAria}
          className="mt-10 flex flex-wrap gap-2.5"
        >
          {content.categories.map((cat, i) => {
            const active = tab === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                id={`es-tab-${cat.id}`}
                aria-selected={active}
                aria-controls="es-menu-panel"
                onClick={() => setTab(cat.id)}
                className={`rounded-xl border-2 px-4 py-2.5 [font-family:var(--demo-display)] text-[11px] uppercase leading-none transition-all ${
                  i % 2 === 0 ? "hover:-rotate-1" : "hover:rotate-1"
                } ${
                  active
                    ? "border-[#120A05] bg-[var(--d-mustard)] text-[#1A0E08] shadow-[3px_3px_0_rgba(0,0,0,0.45)]"
                    : "border-[var(--d-line-strong)] text-[var(--d-ink-soft)] hover:border-[var(--d-mustard)] hover:text-[var(--d-ink)]"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        <div
          id="es-menu-panel"
          role="tabpanel"
          aria-labelledby={`es-tab-${tab}`}
          className="mt-10"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={tab}
              initial={reduce ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -14 }}
              transition={{ type: "spring", stiffness: 340, damping: 28 }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {visible.map((item, i) => (
                <BurgerCard
                  key={item.id}
                  item={item}
                  index={i}
                  labels={content}
                  format={format}
                  onAdd={onAdd}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="mt-12 flex items-center gap-3 border-t-2 border-dashed border-[var(--d-line)] pt-6 text-sm text-[var(--d-ink-soft)]">
          <Flame
            className="h-4 w-4 shrink-0 text-[var(--d-flame)]"
            strokeWidth={2.2}
            aria-hidden
          />
          {content.footnote}
        </p>
      </div>
    </section>
  );
}

function BurgerCard({
  item,
  index,
  labels,
  format,
  onAdd,
}: {
  item: BurgerItem;
  index: number;
  labels: EmberStackContent["menu"];
  format: (value: number) => string;
  onAdd: (line: NewCartLine) => void;
}) {
  const [added, flash] = useAddedFlash();
  const categoryLabel =
    labels.categories.find((c) => c.id === item.category)?.label ?? "";

  const handleAdd = () => {
    onAdd({
      key: `burger:${item.id}`,
      name: item.name,
      detail: categoryLabel,
      unitPrice: item.price,
    });
    flash();
  };

  return (
    <motion.article
      whileHover={{ y: -6, rotate: 0 }}
      transition={{ type: "spring", stiffness: 380, damping: 22 }}
      className={`relative flex flex-col gap-4 rounded-3xl border-2 border-[var(--d-line-strong)] bg-[var(--d-card)] p-6 ${
        index % 2 === 0 ? "md:-rotate-[0.6deg]" : "md:rotate-[0.6deg]"
      }`}
    >
      {item.tag && (
        <div className="absolute -top-3.5 right-4 rotate-3">
          <Sticker tone={index % 2 === 0 ? "mustard" : "flame"}>
            {item.tag}
          </Sticker>
        </div>
      )}

      <div className="flex items-start justify-between gap-3">
        <h3 className="[font-family:var(--demo-display)] text-lg uppercase leading-tight text-[var(--d-ink)]">
          {item.name}
        </h3>
        {typeof item.heat === "number" && (
          <HeatMeter level={item.heat} ariaLabel={labels.heatAria} />
        )}
      </div>

      <p className="text-sm leading-relaxed text-[var(--d-ink-soft)]">
        {item.description}
      </p>

      <div className="mt-auto flex items-end justify-between gap-3 pt-2">
        <p className="[font-family:var(--demo-display)] text-2xl leading-none text-[var(--d-mustard)] tabular-nums">
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
    </motion.article>
  );
}
