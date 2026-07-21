"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Pin } from "lucide-react";
import { ALLOCATION, type SegmentId, type VantageContent } from "./content";
import { SectionLabel } from "./ui";

const R = 86;
const CIRC = 2 * Math.PI * R;
const GAP = 4; // px of breathing room between arcs

export function AllocationSection({ content }: { content: VantageContent["allocation"] }) {
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState<SegmentId | null>(null);
  const [pinned, setPinned] = useState<SegmentId | null>(null);

  const active = hovered ?? pinned;

  /** Precomputed arc geometry: dash length and angular start per segment. */
  const arcs = useMemo(() => {
    let cursor = 0;
    return ALLOCATION.map((seg) => {
      const len = Math.max((seg.pct / 100) * CIRC - GAP, 2);
      const startAngle = (cursor / 100) * 360;
      cursor += seg.pct;
      return { ...seg, len, startAngle };
    });
  }, []);

  const activeSeg = active ? ALLOCATION.find((s) => s.id === active) : undefined;

  return (
    <section id="allocation" className="scroll-mt-20 border-t border-[var(--d-line)] py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        {/* Donut */}
        <div className="relative mx-auto w-full max-w-[420px]">
          <svg viewBox="0 0 240 240" role="img" aria-label={content.centerTitle} className="w-full">
            <circle cx="120" cy="120" r={R + 22} fill="none" stroke="var(--d-line)" strokeWidth="0.75" />
            <circle cx="120" cy="120" r={R - 24} fill="none" stroke="var(--d-line)" strokeWidth="0.75" />
            <g transform="rotate(-90 120 120)">
              {arcs.map((arc) => {
                const isActive = active === arc.id;
                const dimmed = active !== null && !isActive;
                return (
                  <g key={arc.id} transform={`rotate(${arc.startAngle} 120 120)`}>
                    <motion.circle
                      cx="120"
                      cy="120"
                      r={R}
                      fill="none"
                      stroke={arc.color}
                      strokeLinecap="butt"
                      strokeDasharray={`${arc.len} ${CIRC - arc.len}`}
                      animate={{
                        strokeWidth: isActive ? 30 : 21,
                        opacity: dimmed ? 0.22 : 1,
                      }}
                      transition={{ duration: reduced ? 0 : 0.35, ease: "easeOut" }}
                    />
                  </g>
                );
              })}
            </g>
          </svg>

          {/* Center readout */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSeg ? activeSeg.id : "default"}
                initial={reduced ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.22 }}
                className="w-40 text-center"
              >
                {activeSeg ? (
                  <>
                    <p className="[font-family:var(--demo-display)] text-5xl text-[var(--d-ink)]">
                      {activeSeg.pct}
                      <span className="text-2xl text-[var(--d-ink-soft)]">%</span>
                    </p>
                    <p className="mt-2 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[var(--d-gold)]">
                      {content.segments[activeSeg.id].label}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="[font-family:var(--demo-display)] text-xl italic text-[var(--d-ink)]">
                      {content.centerTitle}
                    </p>
                    <p className="mt-2 text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-[var(--d-ink-soft)]">
                      {content.centerCaption}
                    </p>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Copy + interactive legend */}
        <div>
          <SectionLabel text={content.label} />
          <h2 className="mt-5 max-w-lg [font-family:var(--demo-display)] text-3xl leading-tight text-[var(--d-ink)] sm:text-[2.6rem] sm:leading-[1.12]">
            {content.title}
          </h2>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-[var(--d-ink-soft)]">{content.intro}</p>

          <p className="mt-8 text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-[var(--d-ink-soft)]">
            {content.legendHint}
          </p>

          <ul className="mt-3 divide-y divide-[var(--d-line)] border-y border-[var(--d-line)]">
            {ALLOCATION.map((seg) => {
              const isPinned = pinned === seg.id;
              const isActive = active === seg.id;
              return (
                <li key={seg.id}>
                  <button
                    type="button"
                    aria-pressed={isPinned}
                    onMouseEnter={() => setHovered(seg.id)}
                    onMouseLeave={() => setHovered(null)}
                    onFocus={() => setHovered(seg.id)}
                    onBlur={() => setHovered(null)}
                    onClick={() => setPinned((p) => (p === seg.id ? null : seg.id))}
                    className={`group flex w-full items-baseline gap-4 px-2 py-4 text-left transition-colors ${
                      isActive ? "bg-[var(--d-panel)]" : "hover:bg-[var(--d-panel)]/60"
                    }`}
                  >
                    <span
                      aria-hidden
                      className="h-2.5 w-2.5 shrink-0 translate-y-px rounded-[2px]"
                      style={{ backgroundColor: seg.color }}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-baseline justify-between gap-3">
                        <span
                          className={`text-sm font-medium transition-colors ${
                            isActive ? "text-[var(--d-gold)]" : "text-[var(--d-ink)]"
                          }`}
                        >
                          {content.segments[seg.id].label}
                        </span>
                        <span className="flex items-center gap-2 font-mono text-sm tabular-nums text-[var(--d-ink)]">
                          {isPinned && <Pin className="h-3 w-3 text-[var(--d-gold)]" strokeWidth={2} />}
                          {seg.pct}%
                        </span>
                      </span>
                      <span className="mt-1 block text-xs leading-relaxed text-[var(--d-ink-soft)]">
                        {content.segments[seg.id].note}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <p className="mt-5 text-[0.68rem] italic text-[var(--d-ink-soft)]/80">{content.asOf}</p>
        </div>
      </div>
    </section>
  );
}
