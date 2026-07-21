"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Clock3 } from "lucide-react";
import { type EclatContent, formatDuration, unsplash } from "./content";

const EASE_SLOW: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Services({
  content,
  format,
  common,
}: {
  content: EclatContent["services"];
  format: (value: number) => string;
  common: EclatContent["common"];
}) {
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState(content.categories[0].id);
  const active =
    content.categories.find((category) => category.id === activeId) ?? content.categories[0];

  return (
    <section id="services" className="relative bg-[var(--d-bg)] py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-[10px] font-medium uppercase tracking-[0.5em] text-[var(--d-accent)]">
            {content.eyebrow}
          </p>
          <h2 className="mt-5 [font-family:var(--demo-display)] text-4xl font-medium leading-tight text-[var(--d-plum)] sm:text-5xl">
            {content.title}
          </h2>
          <p className="mt-6 text-sm font-light leading-relaxed text-[var(--d-ink-soft)]">
            {content.intro}
          </p>
        </div>

        <div
          role="tablist"
          aria-label={content.tabsAria}
          className="mt-12 flex flex-wrap gap-2 border-b border-[var(--d-line-soft)] pb-1"
        >
          {content.categories.map((category) => {
            const selected = category.id === activeId;
            return (
              <button
                key={category.id}
                type="button"
                role="tab"
                id={`services-tab-${category.id}`}
                aria-selected={selected}
                aria-controls={`services-panel-${category.id}`}
                onClick={() => setActiveId(category.id)}
                className={`relative px-5 py-3 text-[11px] font-medium uppercase tracking-[0.24em] transition-colors duration-300 ${
                  selected
                    ? "text-[var(--d-accent)]"
                    : "text-[var(--d-ink-faint)] hover:text-[var(--d-ink)]"
                }`}
              >
                {category.label}
                {selected && (
                  <motion.span
                    layoutId="services-underline"
                    className="absolute inset-x-3 -bottom-[5px] h-[2px] bg-[var(--d-accent)]"
                  />
                )}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.id}
            role="tabpanel"
            id={`services-panel-${active.id}`}
            aria-labelledby={`services-tab-${active.id}`}
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: EASE_SLOW }}
            className="mt-12 grid gap-10 lg:grid-cols-[1fr_0.82fr]"
          >
            <div>
              <p className="[font-family:var(--demo-display)] text-lg italic text-[var(--d-accent-deep)]">
                {active.blurb}
              </p>
              <ul className="mt-8 divide-y divide-[var(--d-line-soft)]">
                {active.items.map((item) => (
                  <li
                    key={item.id}
                    className="group flex flex-col gap-2 py-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
                  >
                    <div className="sm:max-w-md">
                      <div className="flex items-baseline gap-3">
                        <h3 className="[font-family:var(--demo-display)] text-2xl text-[var(--d-plum)]">
                          {item.name}
                        </h3>
                        <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-[var(--d-ink-faint)]">
                          <Clock3 aria-hidden className="h-3 w-3" strokeWidth={1.6} />
                          {formatDuration(item.durationMin, common.minShort)}
                        </span>
                      </div>
                      <p className="mt-2 text-sm font-light leading-relaxed text-[var(--d-ink-soft)]">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-baseline gap-4 sm:flex-col sm:items-end sm:gap-2">
                      <span className="[font-family:var(--demo-display)] text-2xl text-[var(--d-accent)]">
                        {format(item.price)}
                      </span>
                      <a
                        href="#booking"
                        className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--d-ink-faint)] underline decoration-[var(--d-line)] underline-offset-4 transition-colors duration-300 hover:text-[var(--d-accent)] hover:decoration-[var(--d-accent)]"
                      >
                        {content.bookLabel}
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative hidden overflow-hidden rounded-[2px] lg:block">
              <Image
                src={unsplash("photo-1560066984-138dadb4c035", 1100)}
                alt=""
                fill
                sizes="(min-width: 1024px) 40vw, 0px"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 mix-blend-multiply bg-[linear-gradient(160deg,rgba(138,75,94,0.42)_0%,rgba(42,23,31,0.16)_52%,rgba(176,141,87,0.30)_100%)]"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(180deg,transparent_54%,rgba(42,23,31,0.5)_100%)]"
              />
              <div className="absolute inset-x-6 bottom-6">
                <p className="text-[9px] uppercase tracking-[0.4em] text-[var(--d-on-plum-soft)]">
                  {content.fromLabel} {format(active.items[0].price)}
                </p>
                <p className="mt-1.5 [font-family:var(--demo-display)] text-2xl italic text-[var(--d-on-plum)]">
                  {active.label}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
