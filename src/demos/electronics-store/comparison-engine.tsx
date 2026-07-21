"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Zap } from "lucide-react";
import type { CompareContent } from "./content";
import { GridLines, SectionLabel } from "./ui";

const SLOT_COLORS = ["#00D4FF", "#7C5CFF"] as const;

export function ComparisonEngine({ content }: { content: CompareContent }) {
  const reduce = useReducedMotion() ?? false;
  const [selected, setSelected] = useState<[string, string]>([
    content.devices[0].id,
    content.devices[2].id,
  ]);

  const pick = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev : [prev[1], id]));
  };

  const slots = selected.map(
    (id) => content.devices.find((d) => d.id === id) ?? content.devices[0],
  );
  const slotIndexes = slots.map((device) =>
    content.devices.findIndex((d) => d.id === device.id),
  );

  return (
    <section
      id="compare"
      className="relative scroll-mt-20 overflow-hidden bg-[var(--d-bg-soft)] px-5 py-20 md:py-28"
    >
      <GridLines />
      <div className="relative mx-auto max-w-6xl">
        <SectionLabel text={content.label} />
        <h2 className="mt-5 [font-family:var(--demo-display)] text-3xl font-bold tracking-tight text-[var(--d-ink)] md:text-5xl">
          {content.title}
        </h2>
        <p className="mt-4 max-w-xl leading-[1.8] text-[var(--d-ink-dim)]">{content.intro}</p>
        <p className="mt-6 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-[var(--d-accent)]">
          {content.hint}
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-3" role="group" aria-label={content.hint}>
          {content.devices.map((device) => {
            const slot = selected.indexOf(device.id);
            const isSelected = slot >= 0;
            return (
              <button
                key={device.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => pick(device.id)}
                className={`relative rounded-2xl border p-5 text-left transition-all ${
                  isSelected
                    ? "border-transparent bg-[var(--d-panel)]"
                    : "border-[var(--d-line)] bg-transparent opacity-70 hover:opacity-100"
                }`}
                style={
                  isSelected
                    ? {
                        boxShadow: `0 0 0 1.5px ${SLOT_COLORS[slot]}, 0 0 30px -8px ${SLOT_COLORS[slot]}`,
                      }
                    : undefined
                }
              >
                <div className="flex items-center justify-between">
                  <span
                    className="rounded-full px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.2em]"
                    style={{
                      color: isSelected ? SLOT_COLORS[slot] : "var(--d-ink-dim)",
                      backgroundColor: isSelected
                        ? `${SLOT_COLORS[slot]}1f`
                        : "rgba(143,163,200,0.12)",
                    }}
                  >
                    {device.tier}
                  </span>
                  {isSelected && (
                    <span
                      className="flex h-5 w-5 items-center justify-center rounded-full text-[#04101C]"
                      style={{ backgroundColor: SLOT_COLORS[slot] }}
                      aria-hidden
                    >
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                  )}
                </div>
                <p className="mt-3 [font-family:var(--demo-display)] text-xl font-bold tracking-tight text-[var(--d-ink)]">
                  Voltix {device.name}
                </p>
                <p className="mt-1 text-[0.74rem] text-[var(--d-ink-dim)]">{device.highlight}</p>
                <p className="mt-3 font-mono text-sm font-semibold text-[var(--d-ink)]">
                  {device.price}
                </p>
                {isSelected && (
                  <span className="sr-only">{content.selectedTag}</span>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-8 rounded-3xl border border-[var(--d-line)] bg-[var(--d-panel)]/60 p-6 backdrop-blur-sm md:p-9">
          <div className="grid grid-cols-2 gap-4 border-b border-[var(--d-line)] pb-5">
            {slots.map((device, s) => (
              <div key={device.id} className={s === 0 ? "text-left" : "text-right"}>
                <span
                  className={`inline-flex items-center gap-2 ${s === 1 ? "flex-row-reverse" : ""}`}
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{
                      backgroundColor: SLOT_COLORS[s],
                      boxShadow: `0 0 10px ${SLOT_COLORS[s]}`,
                    }}
                    aria-hidden
                  />
                  <span className="[font-family:var(--demo-display)] text-base font-bold tracking-tight text-[var(--d-ink)] md:text-lg">
                    {device.name}
                  </span>
                </span>
                <p className="mt-1 font-mono text-[0.68rem] text-[var(--d-ink-dim)]">
                  {device.price}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-7">
            {content.specs.map((spec) => {
              const max = Math.max(...spec.values.map((v) => v.raw));
              const a = spec.values[slotIndexes[0]];
              const b = spec.values[slotIndexes[1]];
              const winner: number = a.raw === b.raw ? -1 : a.raw > b.raw ? 0 : 1;
              return (
                <div key={spec.id}>
                  <p className="text-center font-mono text-[0.62rem] uppercase tracking-[0.26em] text-[var(--d-ink-dim)]">
                    {spec.label}
                  </p>
                  <div className="mt-2.5 grid grid-cols-2 items-center gap-3 md:gap-6">
                    {[a, b].map((value, s) => {
                      const pct = Math.round((value.raw / max) * 100);
                      const leads = winner === s;
                      return (
                        <div key={s}>
                          <div
                            className={`flex items-center gap-2 text-[0.78rem] ${
                              s === 0 ? "justify-start" : "flex-row-reverse justify-start"
                            }`}
                          >
                            <span
                              className="font-mono font-semibold"
                              style={{ color: leads ? SLOT_COLORS[s] : "var(--d-ink)" }}
                            >
                              {value.display}
                            </span>
                            {leads && (
                              <span
                                className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.56rem] font-bold uppercase tracking-[0.16em] text-[#04101C]"
                                style={{ backgroundColor: SLOT_COLORS[s] }}
                              >
                                <Zap className="h-2.5 w-2.5" strokeWidth={2.6} aria-hidden />
                                {content.leads}
                              </span>
                            )}
                          </div>
                          <div
                            className={`mt-1.5 flex h-2.5 overflow-hidden rounded-full bg-[var(--d-bg)] ${
                              s === 1 ? "justify-end" : ""
                            }`}
                          >
                            <motion.div
                              initial={false}
                              animate={{ width: `${pct}%` }}
                              transition={
                                reduce
                                  ? { duration: 0 }
                                  : { type: "spring", stiffness: 120, damping: 20 }
                              }
                              className="h-full rounded-full"
                              style={{
                                background:
                                  s === 0
                                    ? "linear-gradient(90deg, rgba(0,212,255,0.35), #00D4FF)"
                                    : "linear-gradient(270deg, rgba(124,92,255,0.35), #7C5CFF)",
                                boxShadow: leads ? `0 0 14px ${SLOT_COLORS[s]}66` : undefined,
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mt-8 border-t border-[var(--d-line)] pt-5 text-center text-[0.68rem] text-[var(--d-ink-dim)]">
            {content.footnote}
          </p>
        </div>
      </div>
    </section>
  );
}
