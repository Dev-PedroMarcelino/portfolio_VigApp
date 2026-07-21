"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus, X } from "lucide-react";
import { type EclatContent, type ProductItem, unsplash } from "./content";

const EASE_SLOW: [number, number, number, number] = [0.16, 1, 0.3, 1];

function QuickView({
  product,
  content,
  format,
  onClose,
}: {
  product: ProductItem;
  content: EclatContent["products"];
  format: (value: number) => string;
  onClose: () => void;
}) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[9000] flex items-center justify-center p-4 sm:p-6"
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: EASE_SLOW }}
    >
      <button
        type="button"
        aria-label={content.closeLabel}
        onClick={onClose}
        className="absolute inset-0 bg-[rgba(42,23,31,0.62)] backdrop-blur-sm"
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={product.name}
        initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduceMotion ? undefined : { opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.45, ease: EASE_SLOW }}
        className="relative grid max-h-[90vh] w-full max-w-3xl grid-cols-1 overflow-hidden bg-[var(--d-bg-soft)] sm:grid-cols-2"
      >
        <div className="relative hidden min-h-[22rem] sm:block">
          <Image
            src={unsplash(product.imageId, 900)}
            alt={product.imageAlt}
            fill
            sizes="(min-width: 640px) 24rem, 0px"
            className="object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 mix-blend-multiply bg-[linear-gradient(160deg,rgba(138,75,94,0.28)_0%,transparent_60%,rgba(176,141,87,0.24)_100%)]"
          />
        </div>

        <div className="flex flex-col p-8 sm:p-9">
          <button
            type="button"
            aria-label={content.closeLabel}
            onClick={onClose}
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center border border-[var(--d-line)] text-[var(--d-accent)] transition-colors duration-300 hover:bg-[var(--d-accent)] hover:text-[var(--d-on-plum)]"
          >
            <X aria-hidden className="h-4 w-4" strokeWidth={1.6} />
          </button>

          <p className="text-[9px] uppercase tracking-[0.34em] text-[var(--d-accent)]">
            {product.category}
          </p>
          <h3 className="mt-3 [font-family:var(--demo-display)] text-3xl text-[var(--d-plum)]">
            {product.name}
          </h3>
          <p className="mt-4 text-sm font-light leading-relaxed text-[var(--d-ink-soft)]">
            {product.description}
          </p>

          <div className="mt-6">
            <p className="text-[9px] uppercase tracking-[0.32em] text-[var(--d-ink-faint)]">
              {content.ingredientsLabel}
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {product.ingredients.map((ingredient) => (
                <li
                  key={ingredient}
                  className="border border-[var(--d-line-soft)] px-3 py-1.5 text-[10px] uppercase tracking-[0.14em] text-[var(--d-ink)]"
                >
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-auto flex items-end justify-between gap-6 border-t border-[var(--d-line-soft)] pt-6">
            <div>
              <p className="text-[9px] uppercase tracking-[0.3em] text-[var(--d-ink-faint)]">
                {content.sizeLabel} · {product.size}
              </p>
              <p className="mt-1 [font-family:var(--demo-display)] text-3xl text-[var(--d-accent)]">
                {format(product.price)}
              </p>
            </div>
            <a
              href="#booking"
              onClick={onClose}
              className="border border-[var(--d-accent)] bg-[var(--d-accent)] px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--d-on-plum)] transition-colors duration-300 hover:bg-transparent hover:text-[var(--d-accent)]"
            >
              {content.reserveLabel}
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ProductShelf({
  content,
  format,
}: {
  content: EclatContent["products"];
  format: (value: number) => string;
}) {
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeProduct = content.items.find((item) => item.id === activeId) ?? null;

  return (
    <section id="shelf" className="relative bg-[var(--d-bg)] py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-[10px] font-medium uppercase tracking-[0.5em] text-[var(--d-accent)]">
            {content.eyebrow}
          </p>
          <h2 className="mt-5 [font-family:var(--demo-display)] text-4xl font-medium leading-tight text-[var(--d-plum)] sm:text-5xl">
            {content.title}
          </h2>
          <p className="mt-6 text-sm font-light leading-relaxed text-[var(--d-ink-soft)]">
            {content.intro}
          </p>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {content.items.map((product, index) => (
            <motion.li
              key={product.id}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: EASE_SLOW }}
              className="group flex flex-col"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={unsplash(product.imageId, 900)}
                  alt={product.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 90vw"
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 mix-blend-multiply bg-[linear-gradient(165deg,rgba(138,75,94,0.20)_0%,transparent_58%,rgba(176,141,87,0.22)_100%)]"
                />
                <button
                  type="button"
                  onClick={() => setActiveId(product.id)}
                  className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 border border-[rgba(243,228,222,0.5)] bg-[rgba(42,23,31,0.55)] px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--d-on-plum)] opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:opacity-100 focus-visible:opacity-100"
                >
                  {content.quickViewLabel}
                  <Plus aria-hidden className="h-3.5 w-3.5" strokeWidth={1.8} />
                </button>
              </div>

              <div className="mt-5 flex items-baseline justify-between gap-4">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-[var(--d-ink-faint)]">
                    {product.category} · {product.size}
                  </p>
                  <h3 className="mt-1.5 [font-family:var(--demo-display)] text-2xl text-[var(--d-plum)]">
                    {product.name}
                  </h3>
                </div>
                <span className="[font-family:var(--demo-display)] shrink-0 text-xl text-[var(--d-accent)]">
                  {format(product.price)}
                </span>
              </div>
              <p className="mt-2 text-sm font-light leading-relaxed text-[var(--d-ink-soft)]">
                {product.blurb}
              </p>
              <button
                type="button"
                onClick={() => setActiveId(product.id)}
                className="mt-3 self-start text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--d-ink-faint)] underline decoration-[var(--d-line)] underline-offset-4 transition-colors duration-300 hover:text-[var(--d-accent)] hover:decoration-[var(--d-accent)]"
              >
                {content.quickViewLabel}
              </button>
            </motion.li>
          ))}
        </ul>

        <p className="mt-12 text-xs font-light italic text-[var(--d-ink-faint)]">
          {content.shelfNote}
        </p>
      </div>

      <AnimatePresence>
        {activeProduct && (
          <QuickView
            product={activeProduct}
            content={content}
            format={format}
            onClose={() => setActiveId(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
