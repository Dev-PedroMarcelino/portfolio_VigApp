"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Moon } from "lucide-react";
import type { ScheduleContent } from "./content";
import { SectionHeading } from "./ui";

export function ClassSchedule({ content }: { content: ScheduleContent }) {
  const [active, setActive] = useState(content.days[0].id);
  const reduce = useReducedMotion() ?? false;
  const sessions = content.sessions[active] ?? [];

  return (
    <section id="schedule" className="relative border-t border-[var(--d-line)] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading label={content.label} title={content.title} intro={content.intro} />

        {/* Day tabs */}
        <div
          role="tablist"
          aria-label={content.title}
          className="mt-12 grid grid-cols-4 gap-2 sm:flex sm:flex-wrap"
        >
          {content.days.map((day) => {
            const selected = day.id === active;
            return (
              <button
                key={day.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(day.id)}
                className="relative px-4 py-3 text-[0.78rem] font-bold uppercase tracking-[0.12em] transition-colors sm:min-w-[5.2rem]"
                style={{
                  backgroundColor: selected ? "#D7FF3E" : "#141418",
                  color: selected ? "#0B0B0D" : "#9A9AA2",
                  clipPath: "polygon(10% 0,100% 0,90% 100%,0 100%)",
                }}
              >
                <span className="sm:hidden">{day.short}</span>
                <span className="hidden sm:inline">{day.long}</span>
              </button>
            );
          })}
        </div>

        {/* Table */}
        <div className="mt-8 overflow-hidden border border-[var(--d-line)] bg-[var(--d-panel)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={reduce ? undefined : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.24 }}
            >
              {sessions.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[34rem] text-left">
                    <thead>
                      <tr className="border-b border-[var(--d-line)] text-[0.64rem] font-bold uppercase tracking-[0.18em] text-[var(--d-ink-faint)]">
                        <th scope="col" className="px-5 py-4">{content.colTime}</th>
                        <th scope="col" className="px-5 py-4">{content.colClass}</th>
                        <th scope="col" className="px-5 py-4">{content.colCoach}</th>
                        <th scope="col" className="px-5 py-4 text-right">{content.colSpots}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sessions.map((s, i) => {
                        const full = s.spots === 0;
                        return (
                          <tr
                            key={`${s.time}-${i}`}
                            className="group border-b border-[var(--d-line)] last:border-b-0 transition-colors hover:bg-white/[0.03]"
                          >
                            <td className="px-5 py-4 [font-family:var(--demo-display)] text-xl text-[var(--d-ink)]">
                              {s.time}
                            </td>
                            <td className="px-5 py-4">
                              <div className="text-[0.92rem] font-semibold text-[var(--d-ink)]">
                                {s.className}
                              </div>
                              <div className="mt-1 inline-block bg-[var(--d-accent)]/12 px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.14em] text-[var(--d-accent)]">
                                {s.tag}
                              </div>
                            </td>
                            <td className="px-5 py-4 text-[0.86rem] text-[var(--d-ink-dim)]">
                              {s.coach}
                            </td>
                            <td className="px-5 py-4 text-right">
                              {full ? (
                                <span className="inline-block bg-[#FF6B4A]/15 px-2.5 py-1 text-[0.64rem] font-bold uppercase tracking-[0.12em] text-[#FF8A6E]">
                                  {content.full}
                                </span>
                              ) : (
                                <span className="text-[0.78rem] font-semibold text-[var(--d-ink)]">
                                  <span className="[font-family:var(--demo-display)] text-lg text-[var(--d-accent)]">
                                    {s.spots}
                                  </span>{" "}
                                  <span className="text-[var(--d-ink-faint)]">{content.spotsLeft}</span>
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4 px-6 py-16 text-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--d-line-bright)] text-[var(--d-accent)]">
                    <Moon className="h-5 w-5" strokeWidth={2} aria-hidden />
                  </span>
                  <h3 className="[font-family:var(--demo-display)] text-3xl uppercase text-[var(--d-ink)]">
                    {content.restTitle}
                  </h3>
                  <p className="max-w-md text-[0.9rem] leading-relaxed text-[var(--d-ink-dim)]">
                    {content.restBody}
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
