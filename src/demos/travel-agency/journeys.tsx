"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Clock, Footprints } from "lucide-react";
import type { TravelContent } from "./content";
import type { CurrencyFormatter, ContinentId } from "./atlas-root";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Journeys({
  content,
  format,
  continent,
  onContinent,
  onOpen,
}: {
  content: TravelContent["journeys"];
  format: CurrencyFormatter;
  continent: ContinentId;
  onContinent: (id: ContinentId) => void;
  onOpen: (id: string) => void;
}) {
  const reduce = useReducedMotion();

  const counts: Record<string, number> = { all: content.items.length };
  content.items.forEach((j) => {
    counts[j.continent] = (counts[j.continent] ?? 0) + 1;
  });

  const visible =
    continent === "all"
      ? content.items
      : content.items.filter((j) => j.continent === continent);

  return (
    <section id="journeys" className="relative bg-[var(--d-bg)] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <header className="max-w-2xl">
          <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--d-peach)]">
            {content.eyebrow}
          </span>
          <h2 className="mt-4 [font-family:var(--demo-display)] text-[clamp(2rem,4.4vw,3.2rem)] font-light leading-[1.02] tracking-tight text-[var(--d-ink)]">
            {content.title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[var(--d-ink-soft)] sm:text-base">
            {content.intro}
          </p>
        </header>

        {/* Filter */}
        <div
          role="group"
          aria-label={content.filterAria}
          className="mt-9 flex flex-wrap gap-2.5"
        >
          {content.filters.map((f) => {
            const active = continent === f.id;
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={active}
                onClick={() => onContinent(f.id)}
                className={`flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors duration-300 ${
                  active
                    ? "border-[var(--d-peach)] bg-[var(--d-peach)] text-[#04222A]"
                    : "border-[var(--d-line)] text-[var(--d-ink-soft)] hover:border-[var(--d-peach)] hover:text-[var(--d-peach)]"
                }`}
              >
                {f.label}
                <span
                  className={`text-[10px] ${active ? "text-[#04222A]/70" : "text-[var(--d-ink-faint)]"}`}
                >
                  {counts[f.id] ?? 0}
                </span>
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <motion.ul layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((j, i) => (
              <motion.li
                key={j.id}
                layout
                initial={{ opacity: 0, y: reduce ? 0 : 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
                transition={{ duration: 0.5, delay: reduce ? 0 : i * 0.05, ease: EASE }}
                className="group flex flex-col overflow-hidden rounded-[22px] border border-[var(--d-line-soft)] bg-[var(--d-surface)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={j.image.src}
                    alt={j.image.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,34,42,0.05),rgba(4,34,42,0.62))]" />
                  {/* ticket-stub chip */}
                  <span className="absolute left-4 top-4 inline-flex items-center rounded-[4px] border border-dashed border-[var(--d-peach)] bg-[rgba(4,34,42,0.7)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--d-peach-bright)] backdrop-blur-sm">
                    {j.stub}
                  </span>
                  <span className="absolute bottom-4 left-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--d-ink-soft)]">
                    {j.continentLabel}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--d-peach)]">
                    {j.region}
                  </p>
                  <h3 className="mt-1.5 [font-family:var(--demo-display)] text-2xl font-normal leading-tight text-[var(--d-ink)]">
                    {j.name}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[var(--d-ink-soft)]">
                    {j.summary}
                  </p>

                  <div className="mt-4 flex items-center gap-4 text-[11px] text-[var(--d-ink-faint)]">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden />
                      {j.duration}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Footprints className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden />
                      {j.pace}
                    </span>
                  </div>

                  <div className="mt-5 flex items-end justify-between border-t border-[var(--d-line-soft)] pt-4">
                    <span className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-[0.22em] text-[var(--d-ink-faint)]">
                        {content.fromLabel}
                      </span>
                      <span className="[font-family:var(--demo-display)] text-2xl font-light text-[var(--d-peach)]">
                        {format(j.priceFrom)}
                      </span>
                      <span className="text-[10px] text-[var(--d-ink-faint)]">{content.perPerson}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => onOpen(j.id)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-[var(--d-line)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--d-ink)] transition-colors duration-300 hover:border-[var(--d-peach)] hover:text-[var(--d-peach)]"
                    >
                      {content.viewCta}
                      <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden />
                    </button>
                  </div>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  );
}
