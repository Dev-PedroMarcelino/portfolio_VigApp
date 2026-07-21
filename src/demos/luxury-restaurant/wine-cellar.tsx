"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Wine } from "lucide-react";
import type { LumiereContent } from "./content";

const EASE_SLOW: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function WineCellar({
  content,
  format,
}: {
  content: LumiereContent["cellar"];
  format: (value: number) => string;
}) {
  const reduceMotion = useReducedMotion();
  const [openId, setOpenId] = useState<string | null>(content.wines[0]?.id ?? null);

  return (
    <section id="cellar" className="relative bg-[var(--d-bg)] py-28 sm:py-36">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: EASE_SLOW }}
          className="text-center"
        >
          <p className="text-[10px] font-medium uppercase tracking-[0.5em] text-[var(--d-gold)]">
            {content.eyebrow}
          </p>
          <h2 className="[font-family:var(--demo-display)] mt-5 text-4xl font-medium leading-tight text-[var(--d-ink)] sm:text-5xl">
            {content.title}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-sm font-light leading-relaxed text-[var(--d-ink-soft)]">
            {content.intro}
          </p>
          <p className="mt-5 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.3em] text-[var(--d-ink-faint)]">
            <Wine aria-hidden className="h-3.5 w-3.5 text-[var(--d-gold)]" strokeWidth={1.5} />
            {content.cellarLine}
          </p>
        </motion.div>

        <p className="mb-2 mt-14 text-[10px] uppercase tracking-[0.3em] text-[var(--d-ink-faint)]">
          {content.toggleHint}
        </p>
        <ul className="border-t border-[var(--d-line-soft)]">
          {content.wines.map((entry, index) => {
            const open = openId === entry.id;
            const panelId = `wine-panel-${entry.id}`;
            return (
              <motion.li
                key={entry.id}
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.8, delay: (index % 5) * 0.06, ease: EASE_SLOW }}
                className="border-b border-[var(--d-line-soft)]"
              >
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : entry.id)}
                  aria-expanded={open}
                  aria-controls={panelId}
                  className="group flex w-full items-center gap-5 py-6 text-left sm:gap-8"
                >
                  <span className="w-24 shrink-0 text-[10px] uppercase leading-relaxed tracking-[0.25em] text-[var(--d-gold)] sm:w-28">
                    {entry.courses}
                  </span>
                  <span className="flex-1">
                    <span className="[font-family:var(--demo-display)] block text-xl font-medium leading-snug text-[var(--d-ink)] transition-colors duration-300 group-hover:text-[var(--d-gold-bright)] sm:text-2xl">
                      {entry.wine}
                    </span>
                    <span className="mt-1 block text-xs font-light tracking-wide text-[var(--d-ink-faint)]">
                      {entry.region} · {entry.vintage}
                    </span>
                  </span>
                  <ChevronDown
                    aria-hidden
                    className={`h-4 w-4 shrink-0 text-[var(--d-ink-faint)] transition-transform duration-500 group-hover:text-[var(--d-gold)] ${
                      open ? "rotate-180" : ""
                    }`}
                    strokeWidth={1.5}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      id={panelId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.55, ease: EASE_SLOW }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col gap-4 pb-8 sm:flex-row sm:items-end sm:justify-between sm:gap-10 sm:pl-[7rem]">
                        <p className="[font-family:var(--demo-display)] max-w-xl text-base italic leading-relaxed text-[var(--d-ink-soft)]">
                          {entry.notes}
                        </p>
                        <p className="shrink-0 text-right">
                          <span className="[font-family:var(--demo-display)] text-2xl text-[var(--d-gold-bright)]">
                            {format(entry.glassPrice)}
                          </span>
                          <span className="mt-1 block text-[9px] uppercase tracking-[0.3em] text-[var(--d-ink-faint)]">
                            {content.glassLabel}
                          </span>
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
