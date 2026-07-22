"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotionSafe as useReducedMotion } from "@/components/demos/use-reduced-motion-safe";
import {
  ArrowDownUp,
  CalendarDays,
  ChevronDown,
  Fuel,
  Gauge,
  MessageCircle,
  SearchX,
  Settings2,
} from "lucide-react";
import type { BarcellosContent, BrandId, VehicleSeed } from "./content";
import { BRAND_FILTERS, VEHICLES, waLink } from "./content";
import { EASE, FOCUS, Reveal, SectionLabel, fmtBRL, fmtKm } from "./ui";

type PriceRange = "any" | "under400" | "400to700" | "over700";
type SortMode = "featured" | "priceAsc" | "priceDesc" | "kmAsc";

function inRange(price: number, range: PriceRange): boolean {
  if (range === "under400") return price <= 400000;
  if (range === "400to700") return price > 400000 && price <= 700000;
  if (range === "over700") return price > 700000;
  return true;
}

export function StockSection({ content }: { content: BarcellosContent["stock"] }) {
  const reduced = useReducedMotion() ?? false;
  const [brand, setBrand] = useState<BrandId | "all">("all");
  const [range, setRange] = useState<PriceRange>("any");
  const [sort, setSort] = useState<SortMode>("featured");

  const filtered = useMemo(() => {
    const list = VEHICLES.filter(
      (v) => (brand === "all" || v.brand === brand) && inRange(v.price, range),
    );
    if (sort === "priceAsc") list.sort((a, b) => a.price - b.price);
    if (sort === "priceDesc") list.sort((a, b) => b.price - a.price);
    if (sort === "kmAsc") list.sort((a, b) => a.km - b.km);
    return list;
  }, [brand, range, sort]);

  const count =
    filtered.length === 1
      ? content.resultOne
      : content.resultMany.replace("{n}", String(filtered.length));

  const resetFilters = () => {
    setBrand("all");
    setRange("any");
    setSort("featured");
  };

  const selectClass = `h-11 w-full cursor-pointer appearance-none rounded-xl border border-[var(--d-line)] bg-[var(--d-surface)] pl-4 pr-10 text-[0.85rem] text-[var(--d-ink)] transition-colors hover:border-[var(--d-gold)]/40 ${FOCUS}`;

  return (
    <section id="estoque" className="relative scroll-mt-24 py-20 sm:py-24">
      {/* Soft top divider glow */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--d-line)] to-transparent"
      />

      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <SectionLabel text={content.label} />
          <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
            <h2 className="max-w-xl text-[1.8rem] font-semibold leading-tight tracking-tight text-[var(--d-ink)] [font-family:var(--demo-display)] sm:text-[2.3rem]">
              {content.title}
            </h2>
            <p aria-live="polite" className="text-[0.78rem] text-[var(--d-gold)] [font-family:var(--demo-mono)]">
              {count}
            </p>
          </div>
          <p className="mt-3 max-w-2xl text-[0.92rem] leading-relaxed text-[var(--d-ink-soft)]">
            {content.subtitle}
          </p>
        </Reveal>

        {/* Filters */}
        <Reveal delay={0.08}>
          <div className="mt-9 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            {/* Brand chips */}
            <fieldset className="min-w-0">
              <legend className="mb-2.5 text-[0.64rem] uppercase tracking-[0.22em] text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]">
                {content.brandLabel}
              </legend>
              <div className="flex flex-wrap gap-2" role="group" aria-label={content.brandLabel}>
                {[{ id: "all" as const, label: content.allBrands }, ...BRAND_FILTERS].map((b) => {
                  const active = brand === b.id;
                  return (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setBrand(b.id)}
                      aria-pressed={active}
                      className={`rounded-full border px-3.5 py-2 text-[0.78rem] font-medium transition-colors ${FOCUS} ${
                        active
                          ? "border-[var(--d-gold)] bg-[var(--d-gold)] text-[#141008] shadow-[0_0_18px_rgba(217,164,65,0.3)]"
                          : "border-[var(--d-line)] bg-[var(--d-surface)] text-[var(--d-silver)] hover:border-[var(--d-gold)]/40 hover:text-[var(--d-ink)]"
                      }`}
                    >
                      {b.label}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {/* Price + sort selects */}
            <div className="grid shrink-0 grid-cols-2 gap-3 sm:w-[26rem]">
              <label className="block">
                <span className="mb-2.5 block text-[0.64rem] uppercase tracking-[0.22em] text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]">
                  {content.priceLabel}
                </span>
                <span className="relative block">
                  <select
                    value={range}
                    onChange={(e) => setRange(e.target.value as PriceRange)}
                    className={selectClass}
                  >
                    <option value="any">{content.priceAny}</option>
                    <option value="under400">{content.priceUnder400}</option>
                    <option value="400to700">{content.price400to700}</option>
                    <option value="over700">{content.priceOver700}</option>
                  </select>
                  <ChevronDown
                    aria-hidden
                    className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--d-ink-soft)]"
                    strokeWidth={1.8}
                  />
                </span>
              </label>

              <label className="block">
                <span className="mb-2.5 flex items-center gap-1.5 text-[0.64rem] uppercase tracking-[0.22em] text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]">
                  <ArrowDownUp className="h-3 w-3" strokeWidth={1.8} aria-hidden />
                  {content.sortLabel}
                </span>
                <span className="relative block">
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as SortMode)}
                    className={selectClass}
                  >
                    <option value="featured">{content.sortFeatured}</option>
                    <option value="priceAsc">{content.sortPriceAsc}</option>
                    <option value="priceDesc">{content.sortPriceDesc}</option>
                    <option value="kmAsc">{content.sortKmAsc}</option>
                  </select>
                  <ChevronDown
                    aria-hidden
                    className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--d-ink-soft)]"
                    strokeWidth={1.8}
                  />
                </span>
              </label>
            </div>
          </div>
        </Reveal>

        {/* Grid / empty state */}
        <div className="mt-9">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-[var(--d-line)] bg-[var(--d-surface)]/50 px-6 py-20 text-center">
              <span className="grid h-14 w-14 place-items-center rounded-full border border-[var(--d-gold)]/30 bg-[var(--d-gold)]/[0.07]">
                <SearchX className="h-6 w-6 text-[var(--d-gold)]" strokeWidth={1.6} aria-hidden />
              </span>
              <p className="text-[1.05rem] font-semibold text-[var(--d-ink)] [font-family:var(--demo-display)]">
                {content.emptyTitle}
              </p>
              <p className="max-w-sm text-[0.85rem] leading-relaxed text-[var(--d-ink-soft)]">{content.emptyBody}</p>
              <button
                type="button"
                onClick={resetFilters}
                className={`mt-1 rounded-full border border-[var(--d-gold)]/50 px-5 py-2.5 text-[0.82rem] font-medium text-[var(--d-gold)] transition-colors hover:bg-[var(--d-gold)]/10 ${FOCUS}`}
              >
                {content.emptyReset}
              </button>
            </div>
          ) : reduced ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((v) => (
                <VehicleCard key={v.id} v={v} content={content} />
              ))}
            </div>
          ) : (
            <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout" initial={false}>
                {filtered.map((v) => (
                  <motion.div
                    key={v.id}
                    layout
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.38, ease: EASE }}
                  >
                    <VehicleCard v={v} content={content} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

function VehicleCard({ v, content }: { v: VehicleSeed; content: BarcellosContent["stock"] }) {
  const carLabel = `${v.brandLabel} ${v.name} ${v.year}`;
  const msg = content.whatsappMsg.replace("{car}", carLabel).replace("{price}", fmtBRL(v.price));

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--d-line)] bg-[var(--d-surface)] transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-1 hover:border-[var(--d-gold)]/35 hover:shadow-[0_24px_60px_rgba(0,0,0,0.5)]">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={v.photo}
          alt={carLabel}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#0A0B0E]/70 via-transparent to-transparent" />
        {v.badge && (
          <span className="absolute left-3 top-3 rounded-full border border-[var(--d-gold)]/40 bg-[#0A0B0E]/80 px-3 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-[var(--d-gold)] backdrop-blur-md">
            {content.badges[v.badge]}
          </span>
        )}
        <span className="absolute bottom-3 right-3 rounded-full bg-[#0A0B0E]/75 px-2.5 py-1 text-[0.68rem] text-[var(--d-silver)] backdrop-blur-md [font-family:var(--demo-mono)]">
          {v.year}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[0.66rem] uppercase tracking-[0.22em] text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]">
          {v.brandLabel}
        </p>
        <h3 className="mt-1 text-[1.05rem] font-semibold leading-snug text-[var(--d-ink)] [font-family:var(--demo-display)]">
          {v.name}
        </h3>

        <ul className="mt-3.5 grid grid-cols-2 gap-x-3 gap-y-2 text-[0.74rem] text-[var(--d-silver)] [font-family:var(--demo-mono)]">
          <li className="flex items-center gap-1.5">
            <Gauge className="h-3.5 w-3.5 text-[var(--d-ink-soft)]" strokeWidth={1.8} aria-hidden />
            {fmtKm(v.km)}
          </li>
          <li className="flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5 text-[var(--d-ink-soft)]" strokeWidth={1.8} aria-hidden />
            {v.year}
          </li>
          <li className="flex items-center gap-1.5">
            <Settings2 className="h-3.5 w-3.5 text-[var(--d-ink-soft)]" strokeWidth={1.8} aria-hidden />
            {content.trans[v.trans]}
          </li>
          <li className="flex items-center gap-1.5">
            <Fuel className="h-3.5 w-3.5 text-[var(--d-ink-soft)]" strokeWidth={1.8} aria-hidden />
            {content.fuel[v.fuel]}
          </li>
        </ul>

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-[var(--d-line)] pt-4">
          <p className="text-[1.15rem] font-semibold leading-none text-[var(--d-gold)] [font-family:var(--demo-mono)]">
            {fmtBRL(v.price)}
          </p>
          <a
            href={waLink(msg)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${content.cardCta} — ${carLabel}`}
            className={`mb-[-2px] flex items-center gap-1.5 rounded-full border border-[var(--d-line)] px-3.5 py-2 text-[0.74rem] font-medium text-[var(--d-silver)] transition-colors hover:border-[var(--d-gold)]/60 hover:text-[var(--d-gold)] ${FOCUS}`}
          >
            <MessageCircle className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden />
            {content.cardCta}
          </a>
        </div>
      </div>
    </article>
  );
}
