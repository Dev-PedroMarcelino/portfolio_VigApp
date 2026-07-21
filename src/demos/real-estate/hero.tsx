"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown, MapPin, Search } from "lucide-react";
import type { AltureContent, Filters } from "./content";
import type { FormatFn } from "./alture";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const HERO_IMG =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80";

function Select({
  id,
  label,
  value,
  options,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  options: { id: string; label: string }[];
  onChange: (value: string) => void;
}) {
  return (
    <label htmlFor={id} className="group flex flex-col gap-1.5 text-left">
      <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-[var(--d-ink-faint)]">
        {label}
      </span>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full cursor-pointer appearance-none bg-transparent py-1 pr-6 text-sm text-[var(--d-ivory)] outline-none [font-family:var(--demo-body)] focus-visible:text-[var(--d-gold-bright)]"
        >
          {options.map((option) => (
            <option key={option.id} value={option.id} className="bg-[#0B1B2E] text-[#F4EFE6]">
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden
          className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--d-gold)]"
          strokeWidth={1.6}
        />
      </div>
    </label>
  );
}

export function Hero({
  content,
  filterConfig,
  filters,
  onChange,
  format,
  resultCount,
}: {
  content: AltureContent["hero"];
  filterConfig: AltureContent["filters"];
  filters: Filters;
  onChange: (next: Filters) => void;
  format: FormatFn;
  resultCount: number;
}) {
  const reduceMotion = useReducedMotion();
  const pricePct =
    ((filters.maxPrice - filterConfig.priceMin) /
      (filterConfig.priceMax - filterConfig.priceMin)) *
    100;

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden"
    >
      <div className="absolute inset-0">
        <Image
          src={HERO_IMG}
          alt={content.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,27,46,0.78)_0%,rgba(11,27,46,0.32)_38%,rgba(16,39,63,0.72)_74%,#10273F_100%)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_18%,rgba(192,164,107,0.16),transparent_52%)]"
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-10 pt-36">
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: EASE }}
          className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.42em] text-[var(--d-gold)]"
        >
          <span aria-hidden className="h-px w-8 bg-[var(--d-line)]" />
          {content.eyebrow}
        </motion.p>

        <h1 className="mt-7 max-w-3xl [font-family:var(--demo-display)] text-[2.9rem] font-medium leading-[1.02] text-[var(--d-ivory)] sm:text-6xl lg:text-7xl">
          <motion.span
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.3, ease: EASE }}
            className="block"
          >
            {content.title}
          </motion.span>
          <motion.span
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.48, ease: EASE }}
            className="block italic text-[var(--d-gold-bright)]"
          >
            {content.titleItalic}
          </motion.span>
        </h1>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.7, ease: EASE }}
          className="mt-6 max-w-xl text-sm font-light leading-relaxed text-[var(--d-ink-soft)] sm:text-base"
        >
          {content.lede}
        </motion.p>

        <motion.dl
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.85, ease: EASE }}
          className="mt-9 flex flex-wrap gap-x-10 gap-y-4"
        >
          {content.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <dt className="order-2 mt-1 text-[10px] uppercase tracking-[0.24em] text-[var(--d-ink-faint)]">
                {stat.label}
              </dt>
              <dd className="order-1 [font-family:var(--demo-display)] text-2xl font-medium text-[var(--d-gold-bright)]">
                {stat.value}
              </dd>
            </div>
          ))}
        </motion.dl>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 1, ease: EASE }}
          className="mt-10 rounded-sm border border-[var(--d-line)] bg-[rgba(11,27,46,0.55)] p-5 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-6"
        >
          <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.28em] text-[var(--d-gold)]">
            <MapPin className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden />
            {content.search.title}
          </div>
          <div className="mt-5 grid gap-5 md:grid-cols-[1fr_1fr_1.4fr_auto] md:items-end md:gap-6">
            <Select
              id="hero-city"
              label={content.search.cityLabel}
              value={filters.city}
              options={filterConfig.cities}
              onChange={(city) => onChange({ ...filters, city })}
            />
            <div className="hidden h-9 w-px self-end bg-[var(--d-line-soft)] md:block" aria-hidden />
            <Select
              id="hero-type"
              label={content.search.typeLabel}
              value={filters.type}
              options={filterConfig.types}
              onChange={(type) => onChange({ ...filters, type })}
            />
            <div className="flex flex-col gap-2 text-left">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-[var(--d-ink-faint)]">
                  {content.search.priceLabel}
                </span>
                <span className="[font-family:var(--demo-display)] text-sm text-[var(--d-gold-bright)]">
                  {format(filters.maxPrice)}
                </span>
              </div>
              <input
                type="range"
                aria-label={content.search.priceLabel}
                min={filterConfig.priceMin}
                max={filterConfig.priceMax}
                step={filterConfig.priceStep}
                value={filters.maxPrice}
                onChange={(event) =>
                  onChange({ ...filters, maxPrice: Number(event.target.value) })
                }
                className="alture-range h-1 w-full cursor-pointer appearance-none rounded-full outline-none"
                style={{
                  background: `linear-gradient(90deg, var(--d-gold) 0%, var(--d-gold) ${pricePct}%, rgba(244,239,230,0.16) ${pricePct}%, rgba(244,239,230,0.16) 100%)`,
                }}
              />
            </div>
            <a
              href="#listings"
              className="flex items-center justify-center gap-2 bg-[var(--d-gold)] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0B1B2E] transition-colors duration-300 hover:bg-[var(--d-gold-bright)]"
            >
              <Search className="h-4 w-4" strokeWidth={1.8} aria-hidden />
              {content.search.searchCta}
            </a>
          </div>
          <p className="mt-4 text-[11px] tracking-[0.08em] text-[var(--d-ink-faint)]">
            <span className="tabular-nums text-[var(--d-gold-bright)]">{resultCount}</span>{" "}
            {content.search.resultsHint}
          </p>
        </motion.div>
      </div>

      <style>{`
        .alture-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          height: 18px;
          width: 18px;
          border-radius: 9999px;
          background: #F4EFE6;
          border: 2px solid #C0A46B;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0,0,0,0.35);
        }
        .alture-range::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 9999px;
          background: #F4EFE6;
          border: 2px solid #C0A46B;
          cursor: pointer;
        }
        .alture-range:focus-visible::-webkit-slider-thumb {
          outline: 2px solid #D8C08A;
          outline-offset: 2px;
        }
      `}</style>
    </section>
  );
}
