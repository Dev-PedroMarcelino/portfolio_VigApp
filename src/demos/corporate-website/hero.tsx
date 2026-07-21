"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, FileText } from "lucide-react";
import type { HeroContent, HeroHub } from "./content";
import { scrollToId } from "./ui";

/* ------------------------------------------------------------------ */
/* World-dots map                                                      */
/* ------------------------------------------------------------------ */

const VIEW_W = 1000;
const VIEW_H = 460;
const STEP_X = 22;
const STEP_Y = 22;

/**
 * A precision dot lattice masked into a soft ellipse, evoking a global
 * map without pretending to be geographically exact. Hubs and arcs are
 * layered on top. Positions are index-derived, never random, so SSR and
 * CSR agree.
 */
function isInField(x: number, y: number): boolean {
  const nx = (x - VIEW_W / 2) / (VIEW_W / 2);
  const ny = (y - VIEW_H / 2) / (VIEW_H / 2);
  return nx * nx + (ny * 1.15) * (ny * 1.15) <= 1;
}

function WorldDots({ hubs }: { hubs: HeroHub[] }) {
  const reduce = useReducedMotion();
  const dots: { x: number; y: number; key: string }[] = [];
  for (let y = STEP_Y / 2; y < VIEW_H; y += STEP_Y) {
    for (let x = STEP_X / 2; x < VIEW_W; x += STEP_X) {
      if (isInField(x, y)) {
        dots.push({ x, y, key: `${x}-${y}` });
      }
    }
  }

  const arcs: { d: string; key: string; delay: number }[] = [];
  for (let i = 0; i < hubs.length; i += 1) {
    const a = hubs[i];
    const b = hubs[(i + 1) % hubs.length];
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2 - Math.abs(a.x - b.x) * 0.22 - 20;
    arcs.push({ d: `M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`, key: `${a.id}-${b.id}`, delay: i * 0.35 });
  }

  return (
    <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="h-auto w-full" role="img" aria-hidden preserveAspectRatio="xMidYMid meet">
      <g fill="var(--d-ink-faint)" opacity="0.32">
        {dots.map((d, i) => (
          <circle key={d.key} cx={d.x} cy={d.y} r={i % 7 === 0 ? 1.9 : 1.3} />
        ))}
      </g>

      {!reduce &&
        arcs.map((arc) => (
          <motion.path
            key={arc.key}
            d={arc.d}
            fill="none"
            stroke="var(--d-steel-bright)"
            strokeWidth="1.1"
            strokeOpacity="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1, 1], opacity: [0, 0.6, 0] }}
            transition={{ duration: 4.2, delay: arc.delay, repeat: Infinity, repeatDelay: 2.4, ease: "easeInOut" }}
          />
        ))}

      {hubs.map((hub, i) => (
        <g key={hub.id}>
          {!reduce && (
            <motion.circle
              cx={hub.x}
              cy={hub.y}
              r="4"
              fill="none"
              stroke="var(--d-steel-bright)"
              initial={{ r: 4, opacity: 0.7 }}
              animate={{ r: [4, 15], opacity: [0.7, 0] }}
              transition={{ duration: 2.8, delay: i * 0.28, repeat: Infinity, ease: "easeOut" }}
            />
          )}
          <circle cx={hub.x} cy={hub.y} r="3.4" fill="var(--d-steel-bright)" />
          <circle cx={hub.x} cy={hub.y} r="6.5" fill="var(--d-steel-bright)" opacity="0.16" />
        </g>
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Hero section                                                        */
/* ------------------------------------------------------------------ */

export function MeridianHero({ content }: { content: HeroContent }) {
  return (
    <section id="top" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 82% 8%, rgba(122,154,191,0.16), transparent 55%), radial-gradient(90% 80% at 0% 100%, rgba(148,163,184,0.08), transparent 60%)",
        }}
      />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 pb-16 pt-16 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-8 lg:pb-24 lg:pt-24">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 border-l-2 border-[var(--d-steel-bright)] pl-3 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-[var(--d-ink-soft)]"
          >
            {content.eyebrow}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-6 [font-family:var(--demo-display)] text-[2.6rem] font-semibold leading-[1.05] tracking-[-0.03em] text-[var(--d-ink)] sm:text-[3.4rem] lg:text-[3.7rem]"
          >
            {content.titleTop}{" "}
            <span className="italic [font-family:var(--demo-serif)] font-normal text-[var(--d-steel-bright)]">
              {content.titleSerif}
            </span>{" "}
            {content.titleBottom}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-6 max-w-xl text-[1.02rem] leading-relaxed text-[var(--d-ink-soft)]"
          >
            {content.lede}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <button
              type="button"
              onClick={() => scrollToId("units")}
              className="group inline-flex items-center gap-2 rounded-sm bg-[var(--d-steel)] px-6 py-3 text-[0.9rem] font-semibold text-[var(--d-accent-ink)] transition-colors hover:bg-[var(--d-steel-bright)]"
            >
              {content.ctaPrimary}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => scrollToId("investor")}
              className="inline-flex items-center gap-2 rounded-sm border border-[var(--d-line-strong)] px-6 py-3 text-[0.9rem] font-medium text-[var(--d-ink)] transition-colors hover:border-[var(--d-steel-bright)] hover:bg-[var(--d-panel)]"
            >
              <FileText className="h-4 w-4" strokeWidth={1.8} aria-hidden />
              {content.ctaSecondary}
            </button>
          </motion.div>

          <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-[var(--d-line)] bg-[var(--d-line)] sm:grid-cols-4">
            {content.quickStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.06 }}
                className="bg-[var(--d-bg)] px-4 py-4"
              >
                <p className="[font-family:var(--demo-display)] text-xl font-semibold text-[var(--d-ink)] tabular-nums sm:text-2xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-[0.66rem] font-medium uppercase tracking-[0.16em] text-[var(--d-ink-faint)]">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative"
        >
          <div className="rounded-sm border border-[var(--d-line)] bg-[var(--d-surface)] p-5 shadow-[0_50px_120px_-50px_rgba(2,6,23,0.9)]">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[var(--d-ink-soft)]">
                {content.mapLabel}
              </p>
              <span className="inline-flex items-center gap-1.5 text-[0.66rem] font-medium text-[var(--d-steel-bright)]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--d-steel-bright)]" aria-hidden />
                {content.presenceLabel}
              </span>
            </div>
            <WorldDots hubs={content.hubs} />
            <p className="mt-4 border-t border-[var(--d-line)] pt-4 text-[0.76rem] leading-relaxed text-[var(--d-ink-faint)]">
              {content.mapCaption}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
