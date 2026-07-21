"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import type { HotelContent } from "./content";

const EASE_SLOW: [number, number, number, number] = [0.16, 1, 0.3, 1];

function Stars({ count, label }: { count: number; label: string }) {
  return (
    <div className="flex items-center gap-1" role="img" aria-label={`${count} ${label}`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          aria-hidden
          className={`h-3.5 w-3.5 ${i < count ? "text-[var(--d-brass-bright)]" : "text-[var(--d-ink-faint)]"}`}
          strokeWidth={1.4}
          fill={i < count ? "currentColor" : "none"}
        />
      ))}
    </div>
  );
}

export function Reviews({ content }: { content: HotelContent["reviews"] }) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const current = content.items[active];

  return (
    <section id="reviews" className="relative overflow-hidden bg-[var(--d-bg)] py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(199,164,92,0.1),transparent_50%)]"
      />
      <div className="relative mx-auto max-w-5xl px-5 sm:px-6">
        <header className="mb-12 max-w-2xl">
          <span className="text-[10px] font-semibold uppercase tracking-[0.36em] text-[var(--d-brass)]">
            {content.eyebrow}
          </span>
          <h2 className="mt-4 [font-family:var(--demo-display)] text-4xl font-medium leading-[1.05] text-[var(--d-linen)] sm:text-6xl">
            {content.title}
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-[var(--d-ink-soft)]">{content.intro}</p>
        </header>

        <div className="border border-[var(--d-line-soft)] bg-[var(--d-surface)] p-8 sm:p-12">
          <Quote aria-hidden className="h-9 w-9 text-[var(--d-brass)]" strokeWidth={1.2} />
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={current.id}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -16 }}
              transition={{ duration: 0.6, ease: EASE_SLOW }}
              className="mt-6"
            >
              <p className="[font-family:var(--demo-display)] text-2xl font-medium italic leading-[1.4] text-[var(--d-linen)] sm:text-4xl">
                {current.quote}
              </p>
              <footer className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--d-brass-bright)]">
                  {current.name}
                </span>
                <span aria-hidden className="h-4 w-px bg-[var(--d-line)]" />
                <span className="text-xs text-[var(--d-ink-soft)]">{current.origin}</span>
                <span aria-hidden className="h-4 w-px bg-[var(--d-line)]" />
                <span className="text-xs text-[var(--d-ink-faint)]">{current.suite}</span>
                <Stars count={current.rating} label={content.ratingLabel} />
              </footer>
            </motion.blockquote>
          </AnimatePresence>

          <div className="mt-10 flex flex-wrap gap-3 border-t border-[var(--d-line-soft)] pt-6">
            {content.items.map((item, i) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={i === active}
                onClick={() => setActive(i)}
                className={`flex items-center gap-3 border px-4 py-2.5 text-left transition-colors duration-300 ${
                  i === active
                    ? "border-[var(--d-brass)] bg-[rgba(199,164,92,0.1)]"
                    : "border-[var(--d-line-soft)] hover:border-[var(--d-line)]"
                }`}
              >
                <span
                  className={`text-xs font-semibold uppercase tracking-[0.14em] ${
                    i === active ? "text-[var(--d-brass-bright)]" : "text-[var(--d-ink-soft)]"
                  }`}
                >
                  {item.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
