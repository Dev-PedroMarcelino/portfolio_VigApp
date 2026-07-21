"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { AmbraContent, MaterialSwatch } from "./content";
import { Reveal, SectionHeading } from "./ui";

export function MaterialsPalette({ content }: { content: AmbraContent["materials"] }) {
  const [active, setActive] = useState<string>(content.swatches[0]?.id ?? "");
  const reduce = useReducedMotion();

  const current: MaterialSwatch =
    content.swatches.find((s) => s.id === active) ?? content.swatches[0];

  return (
    <section
      id="materials"
      className="scroll-mt-20 border-t border-[var(--d-line)] px-5 py-20 sm:px-8 sm:py-28"
    >
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <SectionHeading label={content.label} title={content.title} intro={content.intro} />
            <p className="mt-6 text-[12px] uppercase tracking-[0.2em] text-[var(--d-accent)]">
              {content.hint}
            </p>

            {/* Detail panel */}
            <div className="mt-8 overflow-hidden rounded-2xl border border-[var(--d-line)] bg-[var(--d-cream)]">
              <div className="h-28 w-full" style={{ backgroundColor: current.hex }} />
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-[1.5rem] leading-none text-[var(--d-ink)] [font-family:var(--demo-display)]">
                    {current.name}
                  </h3>
                  <span className="rounded-full border border-[var(--d-line)] px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-[var(--d-soft)]">
                    {current.family}
                  </span>
                </div>
                <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-[var(--d-soft)]">
                  {content.usageLabel}
                </p>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={current.id}
                    initial={reduce ? undefined : { opacity: 0, y: 8 }}
                    animate={reduce ? undefined : { opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.35 }}
                    className="mt-2 text-[15px] leading-relaxed text-[var(--d-ink)]"
                  >
                    {current.usage}
                  </motion.p>
                </AnimatePresence>
                <p className="mt-4 text-[12px] uppercase tracking-[0.24em] text-[var(--d-soft)]">
                  {current.hex}
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {content.swatches.map((swatch) => {
              const isActive = swatch.id === active;
              return (
                <li key={swatch.id}>
                  <button
                    type="button"
                    aria-pressed={isActive}
                    onMouseEnter={() => setActive(swatch.id)}
                    onFocus={() => setActive(swatch.id)}
                    onClick={() => setActive(swatch.id)}
                    className={`group relative block w-full overflow-hidden rounded-xl border text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--d-accent)] ${
                      isActive
                        ? "border-[var(--d-ink)] shadow-[0_20px_40px_-24px_rgba(43,38,33,0.55)]"
                        : "border-[var(--d-line)]"
                    }`}
                  >
                    <div
                      className="aspect-square w-full transition-transform duration-500 group-hover:scale-[1.04]"
                      style={{ backgroundColor: swatch.hex }}
                    />
                    <div className="flex items-center justify-between gap-2 bg-[var(--d-cream)] px-3 py-3">
                      <span className="text-[13px] font-medium text-[var(--d-ink)]">
                        {swatch.name}
                      </span>
                      <span
                        aria-hidden
                        className={`h-1.5 w-1.5 shrink-0 rounded-full transition-colors ${
                          isActive ? "bg-[var(--d-accent)]" : "bg-[var(--d-line)]"
                        }`}
                      />
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
