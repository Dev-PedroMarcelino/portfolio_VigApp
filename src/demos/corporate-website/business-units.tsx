"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import type { UnitId, UnitsContent } from "./content";
import { SectionHeading } from "./ui";

export function BusinessUnits({ content }: { content: UnitsContent }) {
  const [active, setActive] = useState<UnitId>(content.units[0].id);
  const unit = content.units.find((u) => u.id === active) ?? content.units[0];

  return (
    <section id="units" className="relative scroll-mt-20 border-t border-[var(--d-line)] py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading label={content.eyebrow} title={content.title} intro={content.intro} />

        <div
          role="tablist"
          aria-label={content.tabHint}
          className="mt-10 flex flex-wrap gap-2 border-b border-[var(--d-line)]"
        >
          {content.units.map((u) => {
            const selected = active === u.id;
            return (
              <button
                key={u.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(u.id)}
                className={`relative -mb-px px-5 py-3 text-[0.9rem] font-medium transition-colors ${
                  selected ? "text-[var(--d-ink)]" : "text-[var(--d-ink-faint)] hover:text-[var(--d-ink-soft)]"
                }`}
              >
                {u.label}
                {selected && (
                  <motion.span
                    layoutId="unit-underline"
                    transition={{ type: "spring", stiffness: 480, damping: 40 }}
                    className="absolute inset-x-0 -bottom-px h-0.5 bg-[var(--d-steel-bright)]"
                    aria-hidden
                  />
                )}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={unit.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-12"
          >
            <div className="flex flex-col justify-center">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--d-steel-bright)]">
                {unit.established}
              </p>
              <h3 className="mt-4 [font-family:var(--demo-display)] text-2xl font-semibold leading-tight tracking-[-0.02em] text-[var(--d-ink)] sm:text-3xl">
                {unit.headline}
              </h3>
              <p className="mt-5 text-[0.98rem] leading-relaxed text-[var(--d-ink-soft)]">{unit.body}</p>

              <div className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-[var(--d-line)] bg-[var(--d-line)]">
                <div className="bg-[var(--d-surface)] px-5 py-4">
                  <p className="[font-family:var(--demo-display)] text-2xl font-semibold text-[var(--d-ink)] tabular-nums">
                    {unit.revenue}
                  </p>
                  <p className="mt-1 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-[var(--d-ink-faint)]">
                    {unit.revenueLabel}
                  </p>
                </div>
                <div className="bg-[var(--d-surface)] px-5 py-4">
                  <p className="[font-family:var(--demo-display)] text-2xl font-semibold text-[var(--d-ink)] tabular-nums">
                    {unit.footprint}
                  </p>
                  <p className="mt-1 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-[var(--d-ink-faint)]">
                    {unit.footprintLabel}
                  </p>
                </div>
              </div>

              <ul className="mt-7 space-y-3">
                {unit.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-[0.9rem] text-[var(--d-ink)]">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[var(--d-steel-bright)]/40 bg-[var(--d-panel)]">
                      <Check className="h-3 w-3 text-[var(--d-steel-bright)]" strokeWidth={2.6} aria-hidden />
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative min-h-64 overflow-hidden rounded-sm border border-[var(--d-line)]">
              <Image
                src={unit.image}
                alt={unit.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(15,23,42,0.25) 0%, rgba(15,23,42,0.55) 55%, rgba(15,23,42,0.92) 100%)",
                  mixBlendMode: "multiply",
                }}
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{ background: "linear-gradient(120deg, rgba(122,154,191,0.28), transparent 60%)" }}
              />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                <span className="[font-family:var(--demo-display)] text-lg font-semibold text-white">
                  Meridian {unit.label}
                </span>
                <span className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-white/70">
                  {unit.footprint}
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
