"use client";

import { motion } from "framer-motion";
import { useReducedMotionSafe as useReducedMotion } from "@/components/demos/use-reduced-motion-safe";
import { Clock, Guitar, MicVocal, Music2, Ticket } from "lucide-react";
import type { GaragemContent } from "./content";
import { SHOWS } from "./content";
import { SectionLabel, Stamp } from "./ui";

const EASE = [0.22, 1, 0.36, 1] as const;

const SHOW_ICONS = { fri: Guitar, sat: MicVocal, sun: Music2 } as const;

export function ShowsSection({ content }: { content: GaragemContent["shows"] }) {
  const reduced = useReducedMotion() ?? false;

  return (
    <section id="shows" className="relative scroll-mt-20 py-20 sm:py-24">
      {/* Stage-light wash */}
      <div
        aria-hidden
        className="absolute left-1/2 top-0 h-64 w-[720px] max-w-full -translate-x-1/2 opacity-25 blur-[110px]"
        style={{ background: "radial-gradient(ellipse, rgba(244,63,46,0.55), transparent 70%)" }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <SectionLabel text={content.label} />
            <h2 className="mt-4 text-4xl uppercase leading-[0.98] text-[var(--d-ink)] [font-family:var(--demo-display)] sm:text-5xl">
              {content.title}
            </h2>
          </div>
          <Stamp rotate={3} className="mb-1.5">
            {content.couvert}
          </Stamp>
        </div>
        <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-[var(--d-ink-soft)]">{content.intro}</p>

        <ul className="mt-10 border-t-2 border-[var(--d-line)]">
          {content.items.map((show, i) => {
            const seed = SHOWS.find((s) => s.id === show.id);
            const Icon = SHOW_ICONS[show.id];
            return (
              <motion.li
                key={show.id}
                initial={reduced ? false : { opacity: 0, x: -28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, ease: EASE, delay: reduced ? 0 : i * 0.1 }}
                className="group relative border-b-2 border-[var(--d-line)] transition-colors duration-300 hover:bg-[color:rgba(244,63,46,0.06)]"
              >
                <div className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:gap-8">
                  {/* Day block */}
                  <div className="flex shrink-0 items-center gap-4 sm:w-36">
                    <span
                      aria-hidden
                      className="grid h-14 w-14 shrink-0 place-items-center border-2 border-[var(--d-red)] bg-[var(--d-panel)] text-[var(--d-red)] transition-transform duration-300 group-hover:-rotate-6"
                    >
                      <Icon className="h-6 w-6" strokeWidth={2} />
                    </span>
                    <div>
                      <p className="text-3xl uppercase leading-none text-[var(--d-yellow)] [font-family:var(--demo-display)]">
                        {show.dayShort}
                      </p>
                      <p className="mt-1 text-[0.7rem] uppercase tracking-[0.2em] text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]">
                        {show.day}
                      </p>
                    </div>
                  </div>

                  {/* Band */}
                  <div className="min-w-0 flex-1">
                    <h3 className="flex flex-wrap items-center gap-3 text-2xl uppercase leading-tight text-[var(--d-ink)] transition-colors duration-200 [font-family:var(--demo-display)] group-hover:text-[var(--d-red)] sm:text-3xl">
                      {seed?.band}
                      <span className="inline-flex -rotate-2 items-center gap-1.5 bg-[var(--d-red)] px-2 py-0.5 text-[0.58rem] font-bold uppercase tracking-[0.22em] text-[var(--d-bg)] [font-family:var(--demo-mono)]">
                        <span aria-hidden className="relative flex h-1.5 w-1.5">
                          <span className={`absolute inline-flex h-full w-full rounded-full bg-[var(--d-bg)] opacity-60 ${reduced ? "" : "animate-ping"}`} />
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--d-bg)]" />
                        </span>
                        {content.liveTag}
                      </span>
                    </h3>
                    <p className="mt-1 text-[0.85rem] text-[var(--d-ink-soft)]">{show.genre}</p>
                  </div>

                  {/* Time + couvert */}
                  <div className="flex shrink-0 items-center gap-5 sm:flex-col sm:items-end sm:gap-2">
                    <p className="flex items-center gap-2 text-lg font-medium text-[var(--d-ink)] [font-family:var(--demo-mono)]">
                      <Clock className="h-4 w-4 text-[var(--d-yellow)]" strokeWidth={2.2} aria-hidden />
                      {show.time}
                    </p>
                    <p className="flex items-center gap-1.5 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]">
                      <Ticket className="h-3.5 w-3.5 text-[var(--d-red)]" strokeWidth={2.2} aria-hidden />
                      {content.couvert}
                    </p>
                  </div>
                </div>

                {/* Live edge marker */}
                <span
                  aria-hidden
                  className="absolute -left-px bottom-0 top-0 w-1 origin-bottom scale-y-0 bg-[var(--d-red)] transition-transform duration-300 group-hover:scale-y-100"
                />
              </motion.li>
            );
          })}
        </ul>

        <p className="mt-6 max-w-2xl text-[0.82rem] leading-relaxed text-[var(--d-ink-soft)]/90">{content.note}</p>
      </div>
    </section>
  );
}
