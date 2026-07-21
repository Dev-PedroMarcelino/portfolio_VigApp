"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, RotateCcw } from "lucide-react";
import type { ComboOption, EmberStackContent } from "./content";
import type { NewCartLine } from "./ember-stack";
import { AddButton, Eyebrow, Sticker, useAddedFlash } from "./ui";

const COMBO_IMG =
  "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80";

interface ComboBuilderProps {
  content: EmberStackContent["combo"];
  format: (value: number) => string;
  onAdd: (line: NewCartLine) => void;
}

export function ComboBuilder({ content, format, onAdd }: ComboBuilderProps) {
  const reduce = useReducedMotion();
  const [added, flash] = useAddedFlash();
  const [bunId, setBunId] = useState(content.buns[0].id);
  const [pattyId, setPattyId] = useState(content.patties[1].id);
  const [extraIds, setExtraIds] = useState<string[]>([]);

  const bun = content.buns.find((b) => b.id === bunId) ?? content.buns[0];
  const patty =
    content.patties.find((p) => p.id === pattyId) ?? content.patties[0];
  const chosenExtras = content.extras.filter((e) => extraIds.includes(e.id));

  const total =
    content.basePrice +
    bun.price +
    patty.price +
    chosenExtras.reduce((sum, e) => sum + e.price, 0);

  const toggleExtra = (id: string) => {
    setExtraIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const reset = () => {
    setBunId(content.buns[0].id);
    setPattyId(content.patties[1].id);
    setExtraIds([]);
  };

  const handleAdd = () => {
    const detailParts = [bun.name, patty.name, ...chosenExtras.map((e) => e.name)];
    onAdd({
      key: `combo:${bunId}:${pattyId}:${[...extraIds].sort().join("-")}`,
      name: content.comboName,
      detail: detailParts.join(" / "),
      unitPrice: total,
    });
    flash();
  };

  return (
    <section
      id="combo"
      className="relative scroll-mt-24 border-y-4 border-[#120A05] bg-[var(--d-bg-deep)] py-20 lg:py-28"
    >
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

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_380px] lg:gap-12">
          <div className="flex flex-col gap-10">
            <OptionGroup
              legend={content.stepBun}
              options={content.buns}
              selectedId={bunId}
              onSelect={setBunId}
              includedLabel={content.includedLabel}
              format={format}
            />
            <OptionGroup
              legend={content.stepPatty}
              options={content.patties}
              selectedId={pattyId}
              onSelect={setPattyId}
              includedLabel={content.includedLabel}
              format={format}
            />

            <fieldset>
              <legend className="[font-family:var(--demo-display)] text-sm uppercase tracking-[0.08em] text-[var(--d-mustard)]">
                {content.stepExtras}
              </legend>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {content.extras.map((extra) => {
                  const active = extraIds.includes(extra.id);
                  return (
                    <button
                      key={extra.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => toggleExtra(extra.id)}
                      className={`flex items-start gap-3 rounded-2xl border-2 p-4 text-left transition-colors ${
                        active
                          ? "border-[var(--d-mustard)] bg-[var(--d-card)]"
                          : "border-[var(--d-line)] hover:border-[var(--d-line-strong)]"
                      }`}
                    >
                      <span
                        aria-hidden
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
                          active
                            ? "border-[var(--d-mustard)] bg-[var(--d-mustard)] text-[#1A0E08]"
                            : "border-[var(--d-line-strong)]"
                        }`}
                      >
                        {active && <Check className="h-3.5 w-3.5" strokeWidth={3.4} />}
                      </span>
                      <span className="flex-1">
                        <span className="flex items-baseline justify-between gap-2">
                          <span className="text-sm font-semibold text-[var(--d-ink)]">
                            {extra.name}
                          </span>
                          <span className="[font-family:var(--demo-display)] text-xs text-[var(--d-mustard)] tabular-nums">
                            +{format(extra.price)}
                          </span>
                        </span>
                        <span className="mt-1 block text-xs leading-relaxed text-[var(--d-ink-soft)]">
                          {extra.description}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="relative rotate-1 rounded-3xl border-2 border-[#120A05] bg-[var(--d-card)] shadow-[6px_6px_0_rgba(0,0,0,0.5)]">
              <div className="relative aspect-[16/10] overflow-hidden rounded-t-[1.4rem]">
                <Image
                  src={COMBO_IMG}
                  alt={content.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 380px, 92vw"
                  className="object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,107,44,0.12),rgba(18,10,5,0.85))]"
                />
                <div className="absolute bottom-3 left-4 -rotate-2">
                  <Sticker tone="flame">{content.baseLabel}</Sticker>
                </div>
              </div>

              <div className="p-6">
                <p className="text-xs leading-relaxed text-[var(--d-ink-soft)]">
                  {content.baseNote}
                </p>

                <div className="mt-5 border-t-2 border-dashed border-[var(--d-line)] pt-4">
                  <p className="[font-family:var(--demo-display)] text-[10px] uppercase tracking-[0.16em] text-[var(--d-mustard)]">
                    {content.summaryLabel}
                  </p>
                  <ul className="mt-2.5 space-y-1.5 text-sm text-[var(--d-ink)]">
                    <li className="flex justify-between gap-3">
                      <span>{bun.name}</span>
                      <span className="text-[var(--d-ink-soft)] tabular-nums">
                        {bun.price === 0
                          ? content.includedLabel
                          : `+${format(bun.price)}`}
                      </span>
                    </li>
                    <li className="flex justify-between gap-3">
                      <span>{patty.name}</span>
                      <span className="text-[var(--d-ink-soft)] tabular-nums">
                        {patty.price === 0
                          ? content.includedLabel
                          : `+${format(patty.price)}`}
                      </span>
                    </li>
                    {chosenExtras.length === 0 ? (
                      <li className="text-xs italic text-[var(--d-ink-soft)]">
                        {content.extrasEmpty}
                      </li>
                    ) : (
                      chosenExtras.map((extra) => (
                        <li key={extra.id} className="flex justify-between gap-3">
                          <span>{extra.name}</span>
                          <span className="text-[var(--d-ink-soft)] tabular-nums">
                            +{format(extra.price)}
                          </span>
                        </li>
                      ))
                    )}
                  </ul>
                </div>

                <div className="mt-5 flex items-end justify-between gap-3 border-t-2 border-dashed border-[var(--d-line)] pt-4">
                  <p className="[font-family:var(--demo-display)] text-[10px] uppercase tracking-[0.16em] text-[var(--d-ink-soft)]">
                    {content.totalLabel}
                  </p>
                  <div className="h-9 overflow-hidden">
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.p
                        key={total}
                        initial={reduce ? false : { y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={reduce ? undefined : { y: -20, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 480, damping: 30 }}
                        className="[font-family:var(--demo-display)] text-3xl leading-none text-[var(--d-mustard)] tabular-nums"
                        aria-live="polite"
                      >
                        {format(total)}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <AddButton
                    added={added}
                    addLabel={content.addLabel}
                    addedLabel={content.addedLabel}
                    itemName={content.comboName}
                    onClick={handleAdd}
                    className="flex-1 justify-center"
                  />
                  <button
                    type="button"
                    onClick={reset}
                    className="inline-flex items-center gap-1.5 rounded-xl border-2 border-[var(--d-line-strong)] px-3.5 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--d-ink-soft)] transition-colors hover:border-[var(--d-mustard)] hover:text-[var(--d-ink)]"
                  >
                    <RotateCcw className="h-3.5 w-3.5" strokeWidth={2.4} aria-hidden />
                    {content.resetLabel}
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function OptionGroup({
  legend,
  options,
  selectedId,
  onSelect,
  includedLabel,
  format,
}: {
  legend: string;
  options: ComboOption[];
  selectedId: string;
  onSelect: (id: string) => void;
  includedLabel: string;
  format: (value: number) => string;
}) {
  return (
    <fieldset>
      <legend className="[font-family:var(--demo-display)] text-sm uppercase tracking-[0.08em] text-[var(--d-mustard)]">
        {legend}
      </legend>
      <div
        role="radiogroup"
        aria-label={legend}
        className="mt-4 grid gap-3 sm:grid-cols-3"
      >
        {options.map((option) => {
          const active = option.id === selectedId;
          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onSelect(option.id)}
              className={`flex flex-col gap-1.5 rounded-2xl border-2 p-4 text-left transition-all ${
                active
                  ? "-rotate-1 border-[#120A05] bg-[var(--d-mustard)] shadow-[3px_3px_0_rgba(0,0,0,0.45)]"
                  : "border-[var(--d-line)] hover:border-[var(--d-line-strong)]"
              }`}
            >
              <span
                className={`[font-family:var(--demo-display)] text-xs uppercase leading-tight ${
                  active ? "text-[#1A0E08]" : "text-[var(--d-ink)]"
                }`}
              >
                {option.name}
              </span>
              <span
                className={`text-xs leading-relaxed ${
                  active ? "text-[rgba(26,14,8,0.75)]" : "text-[var(--d-ink-soft)]"
                }`}
              >
                {option.description}
              </span>
              <span
                className={`mt-auto pt-1 [font-family:var(--demo-display)] text-xs tabular-nums ${
                  active ? "text-[#1A0E08]" : "text-[var(--d-mustard)]"
                }`}
              >
                {option.price === 0 ? includedLabel : `+${format(option.price)}`}
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
