"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Plus, Ruler } from "lucide-react";
import type { CurrencyInfo, NordformContent, ProductContent, ProductId, UnitId } from "./content";
import { PRODUCT_IMAGES, formatDims, formatPrice } from "./content";
import type { AddLine } from "./nordform";
import { Reveal, SectionHeading } from "./ui";

export function Bestsellers({
  content,
  currency,
  unit,
  onAdd,
}: {
  content: NordformContent["bestsellers"];
  currency: CurrencyInfo;
  unit: UnitId;
  onAdd: AddLine;
}) {
  const [selected, setSelected] = useState<Record<ProductId, number>>({
    fjord: 0,
    bruna: 0,
    skala: 0,
    halden: 0,
  });
  const [addedId, setAddedId] = useState<ProductId | null>(null);

  useEffect(() => {
    if (!addedId) return;
    const t = setTimeout(() => setAddedId(null), 1600);
    return () => clearTimeout(t);
  }, [addedId]);

  return (
    <section id="bestsellers" className="scroll-mt-20 bg-[var(--d-bone)] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading label={content.label} title={content.title} intro={content.intro} />
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {content.products.map((product, index) => (
            <Reveal key={product.id} delay={index * 0.06}>
              <ProductCard
                product={product}
                currency={currency}
                unit={unit}
                variantIndex={selected[product.id]}
                onVariantChange={(i) =>
                  setSelected((prev) => ({ ...prev, [product.id]: i }))
                }
                added={addedId === product.id}
                addLabel={content.addToCart}
                addedLabel={content.added}
                dimsLabel={content.dimsLabel}
                onAdd={(variantLabel, price) => {
                  onAdd({
                    key: `${product.id}-${product.variants[selected[product.id]].id}`,
                    name: product.name,
                    variantLabel,
                    price,
                  });
                  setAddedId(product.id);
                }}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({
  product,
  currency,
  unit,
  variantIndex,
  onVariantChange,
  added,
  addLabel,
  addedLabel,
  dimsLabel,
  onAdd,
}: {
  product: ProductContent;
  currency: CurrencyInfo;
  unit: UnitId;
  variantIndex: number;
  onVariantChange: (index: number) => void;
  added: boolean;
  addLabel: string;
  addedLabel: string;
  dimsLabel: string;
  onAdd: (variantLabel: string, price: number) => void;
}) {
  const variant = product.variants[variantIndex];

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-[var(--d-line)] bg-[var(--d-card)]">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={PRODUCT_IMAGES[product.id]}
          alt={product.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        {product.badge ? (
          <span className="absolute left-4 top-4 rounded-full bg-[rgba(46,42,38,0.85)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--d-bone)]">
            {product.badge}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="relative flex items-baseline justify-between gap-3">
          <h3 className="text-2xl text-[var(--d-ink)] [font-family:var(--demo-display)]">
            {product.name}
          </h3>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={variant.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="text-lg font-bold text-[var(--d-ink)]"
            >
              {formatPrice(variant.price, currency)}
            </motion.span>
          </AnimatePresence>
        </div>
        <p className="mt-0.5 text-xs font-medium uppercase tracking-[0.14em] text-[var(--d-sage-ink)]">
          {product.category}
        </p>
        <p className="mt-3 text-[13px] leading-relaxed text-[var(--d-soft)]">
          {product.description}
        </p>

        <p className="mt-4 flex items-center gap-2 font-mono text-[11px] tracking-wide text-[var(--d-soft)]">
          <Ruler aria-hidden className="h-3.5 w-3.5" strokeWidth={1.6} />
          <span className="sr-only">{dimsLabel}: </span>
          {formatDims(product.dims, unit)}
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--d-line)] pt-5">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--d-soft)]">
              {product.variantKind} — {variant.label}
            </p>
            <div className="mt-2 flex items-center gap-2">
              {product.variants.map((v, i) => (
                <button
                  key={v.id}
                  type="button"
                  aria-label={v.label}
                  aria-pressed={i === variantIndex}
                  onClick={() => onVariantChange(i)}
                  style={{ backgroundColor: v.swatch }}
                  className={`h-7 w-7 rounded-full border transition-all ${
                    i === variantIndex
                      ? "border-[var(--d-ink)] ring-2 ring-[var(--d-ink)] ring-offset-2 ring-offset-[var(--d-card)]"
                      : "border-[rgba(46,42,38,0.25)] hover:scale-110"
                  }`}
                />
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => onAdd(variant.label, variant.price)}
            className={`flex items-center gap-1.5 rounded-full px-5 py-2.5 text-xs font-semibold transition-colors ${
              added
                ? "bg-[var(--d-sage-ink)] text-[var(--d-bone)]"
                : "bg-[var(--d-ink)] text-[var(--d-bone)] hover:bg-[#443E37]"
            }`}
          >
            {added ? (
              <>
                <Check className="h-3.5 w-3.5" strokeWidth={2} />
                {addedLabel}
              </>
            ) : (
              <>
                <Plus className="h-3.5 w-3.5" strokeWidth={2} />
                {addLabel}
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
