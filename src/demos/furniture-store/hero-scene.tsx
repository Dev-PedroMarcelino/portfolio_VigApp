"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Check, Plus, X } from "lucide-react";
import type { CurrencyInfo, HotspotId, NordformContent, UnitId } from "./content";
import { HOTSPOT_POSITIONS, IMAGES, fill, formatDims, formatPrice } from "./content";
import type { AddLine } from "./nordform";

export function HeroScene({
  content,
  currency,
  unit,
  onAdd,
}: {
  content: NordformContent["hero"];
  currency: CurrencyInfo;
  unit: UnitId;
  onAdd: AddLine;
}) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<HotspotId | null>(null);
  const [addedKey, setAddedKey] = useState<string | null>(null);

  useEffect(() => {
    if (!addedKey) return;
    const t = setTimeout(() => setAddedKey(null), 1600);
    return () => clearTimeout(t);
  }, [addedKey]);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <section className="mx-auto max-w-6xl px-5 pb-20 pt-12 sm:px-8 sm:pt-16">
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--d-sage-ink)]">
            {content.kicker}
          </p>
          <h1 className="mt-5 text-5xl leading-[1.02] text-[var(--d-ink)] sm:text-7xl [font-family:var(--demo-display)]">
            {content.titleTop}{" "}
            <em className="italic text-[var(--d-walnut)]">{content.titleItalic}</em>
          </h1>
        </motion.div>

        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-6"
        >
          <p className="text-[15px] leading-relaxed text-[var(--d-soft)]">{content.sub}</p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#bestsellers"
              className="flex items-center gap-2 rounded-full bg-[var(--d-ink)] px-6 py-3 text-sm font-semibold text-[var(--d-bone)] transition-colors hover:bg-[#443E37]"
            >
              {content.ctaShop}
              <ArrowDown className="h-4 w-4" strokeWidth={1.8} />
            </a>
            <a
              href="#collection"
              className="rounded-full border border-[var(--d-ink)] px-6 py-3 text-sm font-semibold text-[var(--d-ink)] transition-colors hover:bg-[var(--d-bone)]"
            >
              {content.ctaCollection}
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={reduce ? undefined : { opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="relative mt-12"
      >
        <div className="relative overflow-hidden rounded-[28px] border border-[var(--d-line)]">
          <div className="relative aspect-[4/3] w-full md:aspect-[16/9]">
            <Image
              src={IMAGES.hero}
              alt={content.sceneAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1100px"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-[rgba(46,42,38,0.28)] via-transparent to-[rgba(237,231,222,0.08)]"
            />

            {content.hotspots.map((spot) => {
              const pos = HOTSPOT_POSITIONS[spot.id];
              const isActive = active === spot.id;
              const dotOnRight = pos.x > 50;
              return (
                <div key={spot.id}>
                  <button
                    type="button"
                    aria-label={fill(content.hotspotAria, { name: spot.name })}
                    aria-expanded={isActive}
                    onClick={() => setActive(isActive ? null : spot.id)}
                    style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                    className={`absolute z-10 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border shadow-lg transition-colors ${
                      isActive
                        ? "border-[var(--d-ink)] bg-[var(--d-ink)] text-[var(--d-bone)]"
                        : "border-[var(--d-bone)] bg-[rgba(247,243,235,0.92)] text-[var(--d-ink)] hover:bg-[var(--d-bone)]"
                    }`}
                  >
                    {!reduce && !isActive && (
                      <motion.span
                        aria-hidden
                        className="absolute inset-0 rounded-full border border-[var(--d-bone)]"
                        animate={{ scale: [1, 1.7], opacity: [0.7, 0] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                      />
                    )}
                    <motion.span
                      animate={{ rotate: isActive ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center justify-center"
                    >
                      <Plus className="h-4 w-4" strokeWidth={2} />
                    </motion.span>
                  </button>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                        className={`absolute top-1/2 z-20 w-64 max-w-[calc(100%-24px)] -translate-y-1/2 rounded-2xl border border-[var(--d-line)] bg-[var(--d-bone)] p-4 shadow-xl sm:w-72 ${
                          dotOnRight ? "left-3 sm:left-6" : "right-3 sm:right-6"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--d-sage-ink)]">
                              {spot.category}
                            </p>
                            <p className="mt-1 text-xl text-[var(--d-ink)] [font-family:var(--demo-display)]">
                              {spot.name}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setActive(null)}
                            aria-label={content.close}
                            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--d-line)] text-[var(--d-soft)] hover:text-[var(--d-ink)]"
                          >
                            <X className="h-3.5 w-3.5" strokeWidth={1.8} />
                          </button>
                        </div>
                        <p className="mt-2 text-xs leading-relaxed text-[var(--d-soft)]">
                          {spot.blurb}
                        </p>
                        <p className="mt-2 font-mono text-[11px] tracking-wide text-[var(--d-soft)]">
                          {formatDims(spot.dims, unit)}
                        </p>
                        <div className="mt-3 flex items-center justify-between gap-3">
                          <span className="text-base font-bold text-[var(--d-ink)]">
                            {formatPrice(spot.price, currency)}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              onAdd({
                                key: `hotspot-${spot.id}`,
                                name: spot.name,
                                variantLabel: spot.category,
                                price: spot.price,
                              });
                              setAddedKey(spot.id);
                            }}
                            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                              addedKey === spot.id
                                ? "bg-[var(--d-sage-ink)] text-[var(--d-bone)]"
                                : "bg-[var(--d-ink)] text-[var(--d-bone)] hover:bg-[#443E37]"
                            }`}
                          >
                            {addedKey === spot.id ? (
                              <>
                                <Check className="h-3.5 w-3.5" strokeWidth={2} />
                                {content.added}
                              </>
                            ) : (
                              <>
                                <Plus className="h-3.5 w-3.5" strokeWidth={2} />
                                {content.addToCart}
                              </>
                            )}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        <p className="mt-3 flex items-center gap-2 text-xs text-[var(--d-soft)]">
          <span aria-hidden className="inline-block h-2 w-2 rounded-full border border-[var(--d-ink)] bg-[var(--d-bone)]" />
          {content.hint}
        </p>
      </motion.div>

      <dl className="mt-10 grid grid-cols-1 gap-6 border-t border-[var(--d-line)] pt-8 sm:grid-cols-3">
        {content.facts.map((fact) => (
          <div
            key={fact.label}
            className="flex items-baseline gap-3 sm:flex-col sm:items-start sm:gap-1"
          >
            <dt className="order-2 text-xs text-[var(--d-soft)]">{fact.label}</dt>
            <dd className="order-1 text-2xl text-[var(--d-ink)] [font-family:var(--demo-display)]">
              {fact.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
