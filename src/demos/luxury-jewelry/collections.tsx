"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { AureliaContent } from "./content";

const EASE_SLOW: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Collections({
  content,
  format,
}: {
  content: AureliaContent["collections"];
  format: (value: number) => string;
}) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(content.list[0].id);
  const collection = content.list.find((item) => item.id === active) ?? content.list[0];

  return (
    <section id="collections" className="relative overflow-hidden py-28 sm:py-36">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--d-line),transparent)]"
      />
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.42em] text-[var(--d-gold)]">
            {content.eyebrow}
          </p>
          <h2 className="mt-6 [font-family:var(--demo-display)] text-4xl font-light text-[var(--d-ink)] sm:text-5xl lg:text-6xl">
            {content.title}
          </h2>
          <p className="mt-6 max-w-2xl text-sm font-light leading-relaxed text-[var(--d-ink-soft)]">
            {content.intro}
          </p>
        </div>

        <div
          role="tablist"
          aria-label={content.tabsAria}
          className="mt-14 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
        >
          {content.list.map((item) => {
            const selected = item.id === active;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(item.id)}
                className={`relative border px-6 py-3 text-[11px] font-medium uppercase tracking-[0.28em] transition-colors duration-500 ${
                  selected
                    ? "border-[var(--d-gold)] text-[var(--d-gold-bright)]"
                    : "border-[var(--d-line-soft)] text-[var(--d-ink-soft)] hover:border-[var(--d-line)] hover:text-[var(--d-ink)]"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={collection.id}
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.8, ease: EASE_SLOW }}
          >
            <p className="mt-12 text-center [font-family:var(--demo-display)] text-xl font-light italic text-[var(--d-ink-soft)]">
              {collection.tagline}
            </p>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {collection.pieces.map((piece, index) => (
                <motion.article
                  key={piece.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: index * 0.12, ease: EASE_SLOW }}
                  className="group flex flex-col overflow-hidden border border-[var(--d-line-soft)] bg-[var(--d-bg-soft)] transition-colors duration-500 hover:border-[var(--d-line)]"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#050506]">
                    <Image
                      src={`https://images.unsplash.com/${piece.image}?auto=format&fit=crop&w=900&q=80`}
                      alt={piece.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-center opacity-85 transition-all duration-[1100ms] ease-out group-hover:scale-[1.05] group-hover:opacity-100"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,transparent_35%,rgba(5,5,6,0.7)_100%)]"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 bg-[radial-gradient(circle_at_50%_40%,rgba(232,206,122,0.16),transparent_60%)]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="[font-family:var(--demo-display)] text-2xl font-light text-[var(--d-ink)]">
                      {piece.name}
                    </h3>
                    <p className="mt-2 text-xs font-light leading-relaxed text-[var(--d-ink-soft)]">
                      {piece.material}
                    </p>
                    <div className="mt-6 flex items-end justify-between border-t border-[var(--d-line-soft)] pt-5">
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.3em] text-[var(--d-ink-faint)]">
                          {content.fromLabel}
                        </p>
                        <p className="mt-1 text-lg text-[var(--d-gold-bright)]">
                          {format(piece.price)}
                        </p>
                      </div>
                      <a
                        href="#appointment"
                        className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--d-ink-soft)] transition-colors duration-300 hover:text-[var(--d-gold-bright)]"
                      >
                        {content.enquireLabel}
                      </a>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
