"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { LineupContent } from "./content";
import { SectionLabel, formatCurrency, scrollToId } from "./ui";

export function LineupSection({ content }: { content: LineupContent }) {
  const reduced = useReducedMotion() ?? false;
  const [active, setActive] = useState(content.models[1]?.id ?? content.models[0].id);
  const model = content.models.find((m) => m.id === active) ?? content.models[0];

  return (
    <section id="lineup" className="relative overflow-hidden bg-[var(--d-bg)] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-5">
          <SectionLabel text={content.label} />
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <h2 className="[font-family:var(--demo-display)] max-w-xl text-3xl uppercase leading-tight tracking-tight text-[var(--d-ink)] sm:text-5xl">
              {content.title}
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-[var(--d-ink-soft)]">{content.intro}</p>
          </div>
        </div>

        {/* tabs */}
        <div
          role="tablist"
          aria-label={content.label}
          className="mt-10 flex flex-wrap gap-2 border-b border-[var(--d-line)]"
        >
          {content.models.map((m) => {
            const on = m.id === active;
            return (
              <button
                key={m.id}
                role="tab"
                type="button"
                aria-selected={on}
                onClick={() => setActive(m.id)}
                className={`relative -mb-px px-4 py-3 text-left transition-colors ${
                  on ? "text-[var(--d-ink)]" : "text-[var(--d-ink-soft)] hover:text-[var(--d-ink)]"
                }`}
              >
                <span className="[font-family:var(--demo-display)] block text-sm uppercase tracking-wide sm:text-base">
                  {m.name}
                </span>
                <span className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-[var(--d-metal)]">
                  {m.category}
                </span>
                {on && (
                  <motion.span
                    layoutId="lineup-underline"
                    className="absolute inset-x-0 bottom-0 h-[2px] bg-[var(--d-accent)]"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* active model panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={model.id}
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_1fr]"
          >
            {/* image */}
            <div className="relative aspect-[16/10] overflow-hidden border border-[var(--d-line)] bg-black">
              <Image
                src={`https://images.unsplash.com/${model.image}?auto=format&fit=crop&w=1400&q=80`}
                alt={model.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
                style={{ filter: "saturate(1.05) contrast(1.05)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 flex items-end justify-between p-5">
                <div>
                  <p className="[font-family:var(--demo-display)] text-2xl uppercase text-white sm:text-3xl">
                    {model.name}
                  </p>
                  <p className="text-xs italic text-white/70">{model.tagline}</p>
                </div>
              </div>
              <div className="absolute right-4 top-4 skew-x-[-8deg] bg-[var(--d-accent)] px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-white">
                <span className="inline-block skew-x-[8deg]">{model.category}</span>
              </div>
            </div>

            {/* stats + specs */}
            <div className="flex flex-col justify-between gap-6">
              <p className="text-sm leading-relaxed text-[var(--d-ink-soft)]">{model.description}</p>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { k: content.powerLabel, v: model.power },
                  { k: content.accelLabel, v: model.accel },
                  { k: content.topSpeedLabel, v: model.topSpeed },
                ].map((s) => (
                  <div key={s.k} className="border border-[var(--d-line)] bg-[var(--d-surface)] p-4">
                    <p className="[font-family:var(--demo-display)] text-xl text-[var(--d-ink)] tabular-nums">
                      {s.v}
                    </p>
                    <p className="mt-1 text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-[var(--d-metal)]">
                      {s.k}
                    </p>
                  </div>
                ))}
              </div>

              <dl className="grid grid-cols-2 gap-x-6 gap-y-3 border-t border-[var(--d-line)] pt-5">
                {model.specs.map((sp) => (
                  <div key={sp.label} className="flex items-center justify-between gap-2 text-sm">
                    <dt className="text-[var(--d-metal)]">{sp.label}</dt>
                    <dd className="text-right font-medium text-[var(--d-ink)]">{sp.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="flex items-center justify-between gap-4 border-t border-[var(--d-line)] pt-5">
                <div>
                  <p className="text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-[var(--d-metal)]">
                    {content.fromLabel}
                  </p>
                  <p className="[font-family:var(--demo-display)] text-2xl text-[var(--d-ink)] tabular-nums">
                    {formatCurrency(model.priceFrom, content.priceLocale, content.currency)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => scrollToId("configurator")}
                  className="group flex items-center gap-2 skew-x-[-8deg] border border-[var(--d-line)] bg-[var(--d-surface)] px-5 py-3 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-[var(--d-ink)] transition-colors hover:border-[var(--d-accent)]"
                >
                  <span className="inline-block skew-x-[8deg]">{content.buildCta}</span>
                  <ArrowRight className="h-3.5 w-3.5 skew-x-[8deg] transition-transform group-hover:translate-x-1" strokeWidth={2} />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
