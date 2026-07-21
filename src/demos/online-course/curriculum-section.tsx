"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus, PlayCircle, Radio } from "lucide-react";
import type { CurriculumContent, Module } from "./content";
import { SectionLabel } from "./ui";

/** Parse "22 min" / "90 min" into an integer count of minutes. */
function minutes(duration: string): number {
  const match = duration.match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
}

function moduleTotal(mod: Module): string {
  const total = mod.lessons.reduce((sum, l) => sum + minutes(l.duration), 0);
  const hours = Math.floor(total / 60);
  const mins = total % 60;
  if (hours === 0) return `${mins} min`;
  return mins === 0 ? `${hours}h` : `${hours}h ${mins}m`;
}

export function CurriculumSection({ content }: { content: CurriculumContent }) {
  const reduce = useReducedMotion();
  const [openId, setOpenId] = useState<string>(content.modules[0]?.id ?? "");

  return (
    <section id="curriculum" className="relative bg-[var(--d-sand)] py-20 lg:py-28" style={{ backgroundColor: "#EFE6D6" }}>
      <div className="mx-auto max-w-5xl px-5">
        <div className="max-w-2xl">
          <SectionLabel text={content.label} />
          <h2 className="mt-5 [font-family:var(--demo-display)] text-4xl font-light leading-[1.05] tracking-[-0.01em] text-[var(--d-ink)] sm:text-5xl">
            {content.heading} <span className="italic text-[var(--d-accent)]">{content.headingItalic}</span>
          </h2>
          <p className="mt-5 text-[1rem] leading-relaxed text-[var(--d-ink-soft)]">{content.intro}</p>
        </div>

        <div className="mt-12 flex flex-col gap-3">
          {content.modules.map((mod) => {
            const open = openId === mod.id;
            return (
              <div
                key={mod.id}
                className={`overflow-hidden rounded-[1.4rem] border transition-colors ${
                  open
                    ? "border-[var(--d-ink)] bg-[var(--d-ink)]"
                    : "border-[var(--d-line)] bg-[var(--d-cream-soft)]"
                }`}
                style={{ backgroundColor: open ? "#1C1917" : "#FBF7F0" }}
              >
                <h3>
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setOpenId(open ? "" : mod.id)}
                    className="flex w-full items-center gap-4 px-5 py-6 text-left sm:px-8"
                  >
                    <span
                      className={`[font-family:var(--demo-display)] text-2xl font-light italic transition-colors ${
                        open ? "text-[var(--d-accent)]" : "text-[var(--d-sand-strong)]"
                      }`}
                    >
                      {mod.order}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span
                        className={`block truncate text-[1.15rem] font-medium [font-family:var(--demo-display)] ${
                          open ? "text-[var(--d-cream)]" : "text-[var(--d-ink)]"
                        }`}
                      >
                        {mod.title}
                      </span>
                      <span
                        className={`mt-1 block text-[0.72rem] font-semibold uppercase tracking-[0.14em] ${
                          open ? "text-[var(--d-cream-dim)]" : "text-[var(--d-ink-soft)]"
                        }`}
                      >
                        {mod.lessons.length} {content.lessonsWord} · {moduleTotal(mod)} {content.totalWord}
                      </span>
                    </span>
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all ${
                        open
                          ? "rotate-45 border-[var(--d-accent)] text-[var(--d-accent)]"
                          : "border-[var(--d-line)] text-[var(--d-ink)]"
                      }`}
                    >
                      <Plus className="h-4 w-4" strokeWidth={2} />
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: reduce ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-7 sm:px-8">
                        <p className="max-w-2xl border-l-2 border-[var(--d-accent)] pl-4 text-[0.92rem] leading-relaxed text-[var(--d-cream-dim)]">
                          {mod.summary}
                        </p>
                        <ul className="mt-6 divide-y divide-[var(--d-charcoal-line)]">
                          {mod.lessons.map((lesson) => {
                            const isLive = minutes(lesson.duration) >= 60;
                            return (
                              <li key={lesson.title} className="flex items-center gap-3 py-3">
                                <span className={isLive ? "text-[var(--d-accent)]" : "text-[var(--d-cream-dim)]"}>
                                  {isLive ? (
                                    <Radio className="h-4 w-4" strokeWidth={1.8} />
                                  ) : (
                                    <PlayCircle className="h-4 w-4" strokeWidth={1.8} />
                                  )}
                                </span>
                                <span className="flex-1 text-[0.95rem] text-[var(--d-cream)]">{lesson.title}</span>
                                <span className="text-[0.78rem] font-medium tabular-nums text-[var(--d-cream-dim)]">
                                  {lesson.duration}
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
