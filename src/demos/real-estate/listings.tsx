"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Bath, BedDouble, Heart, Maximize, RotateCcw } from "lucide-react";
import type { AltureContent, Filters, Listing } from "./content";
import type { FormatFn } from "./alture";

function unsplash(id: string, w: number) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
}

function ListingCard({
  item,
  content,
  saved,
  onToggleSaved,
  format,
  formatArea,
  index,
}: {
  item: Listing;
  content: AltureContent["listings"];
  saved: boolean;
  onToggleSaved: (id: string) => void;
  format: FormatFn;
  formatArea: (value: number) => string;
  index: number;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.article
      layout
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
      transition={{ duration: 0.55, delay: Math.min(index * 0.06, 0.3), ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col overflow-hidden border border-[var(--d-line-soft)] bg-[var(--d-bg-deep)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={unsplash(item.imageId, 900)}
          alt={item.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,27,46,0)_45%,rgba(11,27,46,0.72)_100%)]"
        />
        <span className="absolute left-4 top-4 bg-[rgba(11,27,46,0.72)] px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-[var(--d-gold-bright)] backdrop-blur-sm">
          {item.tag}
        </span>
        <button
          type="button"
          onClick={() => onToggleSaved(item.id)}
          aria-pressed={saved}
          aria-label={saved ? content.unsaveAria : content.saveAria}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-[var(--d-line)] bg-[rgba(11,27,46,0.6)] backdrop-blur-sm transition-colors duration-300 hover:border-[var(--d-gold)]"
        >
          <Heart
            className={`h-4 w-4 transition-all duration-300 ${
              saved
                ? "scale-110 fill-[var(--d-gold)] text-[var(--d-gold)]"
                : "text-[var(--d-ivory)]"
            }`}
            strokeWidth={1.6}
            aria-hidden
          />
        </button>
        <p className="absolute bottom-4 left-4 [font-family:var(--demo-display)] text-2xl font-medium text-[var(--d-ivory)]">
          {format(item.price)}
        </p>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--d-gold)]">
          {item.cityLabel} · {item.typeLabel}
        </p>
        <h3 className="mt-2 [font-family:var(--demo-display)] text-xl font-medium text-[var(--d-ivory)]">
          {item.name}
        </h3>
        <p className="mt-1 text-xs text-[var(--d-ink-faint)]">{item.address}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="flex items-center gap-1.5 border border-[var(--d-line-soft)] px-2.5 py-1 text-[11px] text-[var(--d-ink-soft)]">
            <BedDouble className="h-3.5 w-3.5 text-[var(--d-gold)]" strokeWidth={1.5} aria-hidden />
            {item.beds} {content.bedsLabel}
          </span>
          <span className="flex items-center gap-1.5 border border-[var(--d-line-soft)] px-2.5 py-1 text-[11px] text-[var(--d-ink-soft)]">
            <Bath className="h-3.5 w-3.5 text-[var(--d-gold)]" strokeWidth={1.5} aria-hidden />
            {item.baths} {content.bathsLabel}
          </span>
          <span className="flex items-center gap-1.5 border border-[var(--d-line-soft)] px-2.5 py-1 text-[11px] text-[var(--d-ink-soft)]">
            <Maximize className="h-3.5 w-3.5 text-[var(--d-gold)]" strokeWidth={1.5} aria-hidden />
            {formatArea(item.area)} {content.areaLabel}
          </span>
        </div>

        <a
          href="#spotlight"
          className="mt-5 flex items-center justify-between border-t border-[var(--d-line-soft)] pt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--d-ink-soft)] transition-colors duration-300 hover:text-[var(--d-gold-bright)]"
        >
          {content.viewLabel}
          <ArrowUpRight className="h-4 w-4" strokeWidth={1.6} aria-hidden />
        </a>
      </div>
    </motion.article>
  );
}

export function Listings({
  content,
  filterConfig,
  filters,
  onChange,
  items,
  totalCount,
  saved,
  onToggleSaved,
  format,
  formatArea,
}: {
  content: AltureContent["listings"];
  filterConfig: AltureContent["filters"];
  filters: Filters;
  onChange: (next: Filters) => void;
  items: Listing[];
  totalCount: number;
  saved: Set<string>;
  onToggleSaved: (id: string) => void;
  format: FormatFn;
  formatArea: (value: number) => string;
}) {
  const reset = () =>
    onChange({ city: "all", type: "all", maxPrice: filterConfig.priceMax });

  return (
    <section id="listings" className="scroll-mt-24 bg-[var(--d-bg)] py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-6 border-b border-[var(--d-line-soft)] pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.4em] text-[var(--d-gold)]">
              <span aria-hidden className="h-px w-8 bg-[var(--d-line)]" />
              {content.eyebrow}
            </p>
            <h2 className="mt-5 [font-family:var(--demo-display)] text-4xl font-medium text-[var(--d-ivory)] sm:text-5xl">
              {content.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[var(--d-ink-soft)]">
              {content.intro}
            </p>
          </div>
          <p className="shrink-0 [font-family:var(--demo-display)] text-sm text-[var(--d-ink-faint)]">
            <span className="text-2xl text-[var(--d-gold-bright)]">{items.length}</span>
            <span className="mx-1 text-[var(--d-ink-faint)]">/ {totalCount}</span>
            {content.countLabel}
          </p>
        </div>

        {/* Refine bar */}
        <div className="mt-8 flex flex-wrap items-center gap-2">
          {filterConfig.types.map((type) => {
            const active = filters.type === type.id;
            return (
              <button
                key={type.id}
                type="button"
                aria-pressed={active}
                onClick={() => onChange({ ...filters, type: type.id })}
                className={`px-4 py-2 text-[11px] font-medium uppercase tracking-[0.16em] transition-colors duration-300 ${
                  active
                    ? "bg-[var(--d-gold)] text-[#0B1B2E]"
                    : "border border-[var(--d-line-soft)] text-[var(--d-ink-soft)] hover:border-[var(--d-gold)] hover:text-[var(--d-gold-bright)]"
                }`}
              >
                {type.label}
              </button>
            );
          })}
          <div className="ml-auto flex flex-wrap items-center gap-4">
            <label htmlFor="listings-city" className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-[var(--d-ink-faint)]">
              <span className="sr-only sm:not-sr-only">{filterConfig.upToLabel}</span>
              <select
                id="listings-city"
                value={filters.city}
                onChange={(event) => onChange({ ...filters, city: event.target.value })}
                className="cursor-pointer appearance-none border border-[var(--d-line-soft)] bg-transparent px-3 py-2 text-[11px] uppercase tracking-[0.16em] text-[var(--d-ink-soft)] outline-none [font-family:var(--demo-body)] focus-visible:border-[var(--d-gold)]"
              >
                {filterConfig.cities.map((city) => (
                  <option key={city.id} value={city.id} className="bg-[#0B1B2E] text-[#F4EFE6]">
                    {city.label}
                  </option>
                ))}
              </select>
            </label>
            <span className="[font-family:var(--demo-display)] text-sm text-[var(--d-gold-bright)]">
              {format(filters.maxPrice)}
            </span>
          </div>
        </div>

        <div className="mt-10">
          {items.length > 0 ? (
            <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {items.map((item, index) => (
                  <ListingCard
                    key={item.id}
                    item={item}
                    content={content}
                    saved={saved.has(item.id)}
                    onToggleSaved={onToggleSaved}
                    format={format}
                    formatArea={formatArea}
                    index={index}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center border border-dashed border-[var(--d-line)] px-6 py-20 text-center">
              <h3 className="[font-family:var(--demo-display)] text-2xl text-[var(--d-ivory)]">
                {content.emptyTitle}
              </h3>
              <p className="mt-3 max-w-md text-sm text-[var(--d-ink-soft)]">{content.emptyBody}</p>
              <button
                type="button"
                onClick={reset}
                className="mt-6 flex items-center gap-2 border border-[var(--d-gold)] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--d-gold)] transition-colors duration-300 hover:bg-[var(--d-gold)] hover:text-[#0B1B2E]"
              >
                <RotateCcw className="h-4 w-4" strokeWidth={1.6} aria-hidden />
                {content.resetCta}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
