"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { DrinkCategoryId, MenuContent } from "./content";
import { SectionLabel } from "./ui";

const MENU_IMG =
  "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=1000&q=80";

export function MenuSection({ content }: { content: MenuContent }) {
  const [activeId, setActiveId] = useState<DrinkCategoryId>("espresso");
  const reduce = useReducedMotion() ?? false;
  const active = content.categories.find((c) => c.id === activeId) ?? content.categories[0];

  return (
    <section
      id="menu"
      className="scroll-mt-20 bg-[var(--d-dark)] px-5 py-20 text-[var(--d-sand)] md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel text={content.label} tone="light" />
            <h2 className="mt-5 [font-family:var(--demo-display)] text-4xl tracking-tight md:text-5xl">
              {content.title}
            </h2>
            <p className="mt-4 max-w-xl leading-[1.85] text-[var(--d-sand-dim)]">{content.intro}</p>
          </div>

          <div
            role="tablist"
            aria-label={content.label}
            className="flex w-max flex-wrap gap-1 rounded-full border border-[var(--d-dark-line)] p-1"
          >
            {content.categories.map((cat) => {
              const selected = cat.id === activeId;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveId(cat.id)}
                  className={`rounded-full px-5 py-2.5 text-[0.72rem] font-bold uppercase tracking-[0.16em] transition-colors ${
                    selected
                      ? "bg-[var(--d-sand)] text-[var(--d-dark)]"
                      : "text-[var(--d-sand-dim)] hover:text-[var(--d-sand)]"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-14 grid gap-12 md:grid-cols-[0.8fr_1.2fr]">
          <div className="hidden md:block">
            <div className="relative aspect-[3/4] max-w-[340px] overflow-hidden rounded-b-[2rem] rounded-t-[999px]">
              <Image
                src={MENU_IMG}
                alt={content.imageAlt}
                fill
                sizes="(min-width: 768px) 340px, 0px"
                className="object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(35,23,16,0.75) 0%, rgba(111,78,55,0.22) 55%, rgba(35,23,16,0.15) 100%)",
                }}
                aria-hidden
              />
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={active.id}
                initial={reduce ? undefined : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduce ? undefined : { opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 max-w-[340px] [font-family:var(--demo-display)] text-lg italic leading-relaxed text-[var(--d-sand-dim)]"
              >
                {active.note}
              </motion.p>
            </AnimatePresence>
          </div>

          <div>
            <AnimatePresence mode="wait">
              <motion.ul
                key={active.id}
                initial={reduce ? undefined : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                {active.drinks.map((drink) => (
                  <li key={drink.name} className="border-b border-[var(--d-dark-line)] py-6 first:pt-0">
                    <div className="flex items-baseline gap-3">
                      <h3 className="[font-family:var(--demo-display)] text-xl tracking-tight md:text-2xl">
                        {drink.name}
                      </h3>
                      {drink.tag && (
                        <span className="whitespace-nowrap rounded-full border border-[var(--d-terra)]/60 px-2.5 py-0.5 text-[0.58rem] font-bold uppercase tracking-[0.18em] text-[#D9906A]">
                          {drink.tag}
                        </span>
                      )}
                      <span
                        className="mx-1 flex-1 -translate-y-1 border-b border-dotted border-[var(--d-dark-line)]"
                        aria-hidden
                      />
                      <span className="[font-family:var(--demo-display)] text-lg italic text-[var(--d-sand)]">
                        {drink.price}
                      </span>
                    </div>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-[var(--d-sand-dim)]">
                      {drink.description}
                    </p>
                  </li>
                ))}
              </motion.ul>
            </AnimatePresence>
            <p className="mt-8 text-xs italic leading-relaxed text-[var(--d-sand-dim)]/80">
              {content.footnote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
