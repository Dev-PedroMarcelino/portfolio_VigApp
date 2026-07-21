"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { EclatContent } from "./content";

const EASE_SLOW: [number, number, number, number] = [0.16, 1, 0.3, 1];

function initials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("");
}

export function TeamPicker({ content }: { content: EclatContent["team"] }) {
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState(content.stylists[0].id);
  const active =
    content.stylists.find((stylist) => stylist.id === activeId) ?? content.stylists[0];

  return (
    <section id="team" className="relative bg-[var(--d-bg-blush)] py-24 sm:py-32">
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

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
          <ul role="list" aria-label={content.pickAria} className="flex flex-col gap-3">
            {content.stylists.map((stylist) => {
              const selected = stylist.id === activeId;
              return (
                <li key={stylist.id}>
                  <button
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setActiveId(stylist.id)}
                    className={`group flex w-full items-center gap-5 border px-5 py-5 text-left transition-colors duration-300 ${
                      selected
                        ? "border-[var(--d-accent)] bg-[var(--d-bg-soft)]"
                        : "border-[var(--d-line-soft)] bg-transparent hover:border-[var(--d-line)]"
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full border text-lg transition-colors duration-300 [font-family:var(--demo-display)] italic ${
                        selected
                          ? "border-[var(--d-accent)] bg-[var(--d-accent)] text-[var(--d-on-plum)]"
                          : "border-[var(--d-line)] text-[var(--d-accent)] group-hover:bg-[var(--d-bg-soft)]"
                      }`}
                    >
                      {initials(stylist.name)}
                    </span>
                    <span className="flex-1">
                      <span className="[font-family:var(--demo-display)] block text-2xl text-[var(--d-plum)]">
                        {stylist.name}
                      </span>
                      <span className="mt-0.5 block text-[10px] uppercase tracking-[0.22em] text-[var(--d-ink-faint)]">
                        {stylist.role}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <AnimatePresence mode="wait" initial={false}>
            <motion.article
              key={active.id}
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: EASE_SLOW }}
              className="relative flex flex-col justify-between overflow-hidden bg-[var(--d-plum)] p-9 text-[var(--d-on-plum)] sm:p-11"
            >
              <div
                aria-hidden
                className="absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-30 bg-[radial-gradient(circle,rgba(176,107,126,0.9)_0%,transparent_70%)]"
              />
              <div className="relative">
                <span
                  aria-hidden
                  className="[font-family:var(--demo-display)] text-6xl italic text-[var(--d-accent-bright)]"
                >
                  {initials(active.name)}
                </span>
                <h3 className="mt-4 [font-family:var(--demo-display)] text-3xl italic">
                  {active.name}
                </h3>
                <p className="mt-1 text-[10px] uppercase tracking-[0.28em] text-[var(--d-gold-bright)]">
                  {active.role}
                </p>
                <p className="mt-6 text-sm font-light leading-relaxed text-[var(--d-on-plum-soft)]">
                  {active.bio}
                </p>
              </div>

              <div className="relative mt-8">
                <p className="text-[9px] uppercase tracking-[0.32em] text-[var(--d-on-plum-soft)]">
                  {content.specialtiesLabel}
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {active.specialties.map((specialty) => (
                    <li
                      key={specialty}
                      className="border border-[rgba(243,228,222,0.24)] px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-[var(--d-on-plum)]"
                    >
                      {specialty}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[rgba(243,228,222,0.16)] pt-6">
                  <span className="text-[10px] uppercase tracking-[0.24em] text-[var(--d-on-plum-soft)]">
                    {content.sinceLabel} {active.since}
                  </span>
                  <a
                    href="#booking"
                    className="inline-flex items-center gap-2 border border-[var(--d-gold-bright)] px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--d-gold-bright)] transition-colors duration-300 hover:bg-[var(--d-gold-bright)] hover:text-[var(--d-plum)]"
                  >
                    {content.bookWithLabel} {active.name.split(" ")[0]}
                    <ArrowUpRight aria-hidden className="h-3.5 w-3.5" strokeWidth={1.6} />
                  </a>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
