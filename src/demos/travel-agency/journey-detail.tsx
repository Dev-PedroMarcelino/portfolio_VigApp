"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, MessageCircle, Minus, Plus } from "lucide-react";
import type { TravelContent, Journey } from "./content";
import type { CurrencyFormatter } from "./atlas-root";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function JourneyDetail({
  content,
  journeys,
  selected,
  onSelect,
  format,
}: {
  content: TravelContent["detail"];
  journeys: Journey[];
  selected: Journey;
  onSelect: (id: string) => void;
  format: CurrencyFormatter;
}) {
  const reduce = useReducedMotion();
  const [openDay, setOpenDay] = useState(0);

  useEffect(() => {
    setOpenDay(0);
  }, [selected.id]);

  return (
    <section id="itinerary" className="relative bg-[var(--d-deep)] py-20 sm:py-28">
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

        {/* Journey switcher */}
        <div
          role="tablist"
          aria-label={content.switchLabel}
          className="mt-8 flex flex-wrap gap-2"
        >
          {journeys.map((j) => {
            const active = j.id === selected.id;
            return (
              <button
                key={j.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => onSelect(j.id)}
                className={`rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors duration-300 ${
                  active
                    ? "bg-[var(--d-peach)] text-[#04222A]"
                    : "border border-[var(--d-line-soft)] text-[var(--d-ink-soft)] hover:border-[var(--d-peach)] hover:text-[var(--d-peach)]"
                }`}
              >
                {j.name}
              </button>
            );
          })}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          {/* Postcard */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: reduce ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduce ? 0 : -12 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="lg:sticky lg:top-24"
            >
              <div className="relative overflow-hidden rounded-[24px] border border-[var(--d-line-soft)]">
                <div className="relative aspect-[4/5]">
                  <Image
                    src={selected.image.src}
                    alt={selected.image.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 44vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,34,42,0.1),rgba(4,34,42,0.82))]" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <span className="inline-flex items-center rounded-[4px] border border-dashed border-[var(--d-peach)] bg-[rgba(4,34,42,0.65)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--d-peach-bright)]">
                    {selected.stub}
                  </span>
                  <p className="mt-3 [font-family:var(--demo-display)] text-3xl font-normal text-[var(--d-ink)]">
                    {selected.name}
                  </p>
                  <p className="text-sm text-[var(--d-ink-soft)]">
                    {selected.region} · {selected.duration}
                  </p>
                </div>
              </div>

              {/* Highlights */}
              <div className="mt-6 rounded-[20px] border border-[var(--d-line-soft)] bg-[var(--d-surface)] p-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[var(--d-peach)]">
                  {content.includesLabel}
                </p>
                <ul className="mt-4 space-y-3">
                  {selected.highlights.map((h) => (
                    <li key={h} className="flex gap-3 text-sm leading-relaxed text-[var(--d-ink-soft)]">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--d-peach)]" strokeWidth={2} aria-hidden />
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap items-end justify-between gap-4 border-t border-[var(--d-line-soft)] pt-5">
                  <span className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-[0.22em] text-[var(--d-ink-faint)]">
                      {content.priceNote}
                    </span>
                    <span className="[font-family:var(--demo-display)] text-3xl font-light text-[var(--d-peach)]">
                      {format(selected.priceFrom)}
                    </span>
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href="#quiz"
                      className="inline-flex items-center gap-2 rounded-full bg-[var(--d-peach)] px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#04222A] transition-transform duration-300 hover:scale-[1.03]"
                    >
                      {content.reserveCta}
                      <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
                    </a>
                    <a
                      href="#tailor"
                      className="inline-flex items-center gap-2 rounded-full border border-[var(--d-line)] px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--d-ink)] transition-colors duration-300 hover:border-[var(--d-peach)] hover:text-[var(--d-peach)]"
                    >
                      <MessageCircle className="h-4 w-4" strokeWidth={1.7} aria-hidden />
                      {content.talkCta}
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Day-by-day accordion */}
          <div>
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.26em] text-[var(--d-ink-faint)]">
              {content.dayByDay}
            </p>
            <ol className="relative space-y-3 border-l border-dashed border-[var(--d-line)] pl-6">
              {selected.itinerary.map((stop, i) => {
                const open = openDay === i;
                return (
                  <li key={`${selected.id}-${stop.day}`} className="relative">
                    <span
                      className={`absolute -left-[31px] top-4 h-3 w-3 rounded-full border-2 transition-colors ${
                        open
                          ? "border-[var(--d-peach)] bg-[var(--d-peach)]"
                          : "border-[var(--d-peach)] bg-[var(--d-deep)]"
                      }`}
                      aria-hidden
                    />
                    <div className="overflow-hidden rounded-[16px] border border-[var(--d-line-soft)] bg-[var(--d-surface)]">
                      <button
                        type="button"
                        aria-expanded={open}
                        onClick={() => setOpenDay(open ? -1 : i)}
                        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                      >
                        <span className="flex flex-col">
                          <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--d-peach)]">
                            {stop.day}
                          </span>
                          <span className="mt-1 [font-family:var(--demo-display)] text-xl font-normal text-[var(--d-ink)]">
                            {stop.title}
                          </span>
                        </span>
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--d-line)] text-[var(--d-peach)]">
                          {open ? (
                            <Minus className="h-4 w-4" strokeWidth={2} aria-hidden />
                          ) : (
                            <Plus className="h-4 w-4" strokeWidth={2} aria-hidden />
                          )}
                        </span>
                      </button>
                      <AnimatePresence initial={false}>
                        {open ? (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: reduce ? 0 : 0.36, ease: EASE }}
                          >
                            <p className="px-5 pb-5 text-sm leading-relaxed text-[var(--d-ink-soft)]">
                              {stop.body}
                            </p>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
