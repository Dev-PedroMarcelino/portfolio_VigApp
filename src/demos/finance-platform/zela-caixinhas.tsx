"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";
import { useReducedMotionSafe as useReducedMotion } from "@/components/demos/use-reduced-motion-safe";
import * as Slider from "@radix-ui/react-slider";
import { Gift, House, Sparkles, TreePalm, Umbrella } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { BoxIcon, BoxSeed, ZelaContent } from "./content";
import {
  BOXES,
  SIM_DEFAULT,
  SIM_MAX,
  SIM_MIN,
  SIM_STEP,
  SIM_YEARS,
  simulate,
} from "./content";
import { AnimatedMoney, Blob, EASE, fmtBRLWhole, SectionLabel } from "./ui";

const BOX_ICONS: Record<BoxIcon, LucideIcon> = {
  umbrella: Umbrella,
  house: House,
  "tree-palm": TreePalm,
  gift: Gift,
};

const R = 30;
const CIRC = 2 * Math.PI * R;

function BoxCard({
  box,
  content,
  reduced,
  play,
  delay,
}: {
  box: BoxSeed;
  content: ZelaContent["boxes"];
  reduced: boolean;
  play: boolean;
  delay: number;
}) {
  const pct = Math.min(1, box.saved / box.target);
  const [shown, setShown] = useState(0);
  const meta = content.goals[box.id];
  const Icon = BOX_ICONS[box.icon];

  useEffect(() => {
    if (!play) return;
    if (reduced) {
      setShown(pct);
      return;
    }
    const controls = animate(0, pct, {
      duration: 1.2,
      delay,
      ease: EASE,
      onUpdate: setShown,
    });
    return () => controls.stop();
  }, [play, pct, reduced, delay]);

  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 22 }}
      whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      whileHover={reduced ? undefined : { y: -5 }}
      className="rounded-[1.8rem] border border-[var(--d-line)] bg-[var(--d-surface)] p-6 shadow-[0_24px_50px_-36px_rgba(28,43,36,0.35)]"
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className="grid h-11 w-11 place-items-center rounded-2xl rounded-tl-sm"
          style={{ backgroundColor: `${box.color}1C`, color: box.color }}
        >
          <Icon className="h-5 w-5" strokeWidth={1.7} />
        </span>

        {/* Progress ring */}
        <div className="relative h-[72px] w-[72px]" aria-hidden>
          <svg viewBox="0 0 72 72" className="h-full w-full -rotate-90">
            <circle cx="36" cy="36" r={R} fill="none" stroke="#EDE5D3" strokeWidth="6" />
            <circle
              cx="36"
              cy="36"
              r={R}
              fill="none"
              stroke={box.color}
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={CIRC}
              strokeDashoffset={CIRC * (1 - shown)}
            />
          </svg>
          <span className="absolute inset-0 grid place-items-center text-[0.78rem] font-semibold text-[var(--d-ink)] [font-family:var(--demo-mono)]">
            {Math.round(shown * 100)}%
          </span>
        </div>
      </div>

      <h3 className="mt-4 text-[1.02rem] font-semibold leading-snug text-[var(--d-ink)] [font-family:var(--demo-display)]">
        {meta.name}
      </h3>
      <p className="mt-1 text-[0.78rem] italic text-[var(--d-ink-soft)] [font-family:var(--demo-display)]">
        {meta.note}
      </p>

      <p className="mt-4 text-[0.8rem] text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]">
        <span className="font-medium text-[var(--d-ink)]">{fmtBRLWhole(box.saved)}</span>{" "}
        {content.ofLabel} {fmtBRLWhole(box.target)}
      </p>

      <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[var(--d-lime)]/18 px-2.5 py-1 text-[0.64rem] font-semibold text-[var(--d-lime-deep)]">
        <Sparkles className="h-3 w-3" strokeWidth={2.2} aria-hidden />
        {content.yieldChip}
      </p>
    </motion.div>
  );
}

/** Slider + compound-interest projection (real math, illustrative rate). */
function Simulator({ content, reduced }: { content: ZelaContent["boxes"]["sim"]; reduced: boolean }) {
  const [monthly, setMonthly] = useState(SIM_DEFAULT);
  const [yearIdx, setYearIdx] = useState(2); // 3 years by default

  const months = SIM_YEARS[yearIdx] * 12;
  const { total, deposited, earned } = simulate(monthly, months);

  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 28 }}
      whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: EASE }}
      className="relative mt-12 overflow-hidden rounded-[2.2rem] bg-[var(--d-green)] p-7 text-[#FFFDF7] sm:p-10"
    >
      <Blob color="rgba(124,179,66,0.3)" className="-right-24 -top-24 h-72 w-72" />
      <Blob color="rgba(232,161,61,0.18)" className="-bottom-28 -left-16 h-64 w-64" />

      <div className="relative grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div>
          <h3 className="text-2xl leading-snug [font-family:var(--demo-display)] sm:text-[1.7rem]">
            {content.title}
          </h3>
          <p className="mt-2 text-[0.88rem] text-[#FFFDF7]/70">{content.subtitle}</p>

          <div className="mt-8">
            <div className="flex items-baseline justify-between gap-4">
              <p className="text-[0.7rem] uppercase tracking-[0.2em] text-[#FFFDF7]/60 [font-family:var(--demo-mono)]">
                {content.monthlyLabel}
              </p>
              <p className="text-xl font-medium [font-family:var(--demo-mono)]">
                {fmtBRLWhole(monthly)}
              </p>
            </div>
            <Slider.Root
              className="relative mt-3 flex h-6 w-full touch-none select-none items-center"
              min={SIM_MIN}
              max={SIM_MAX}
              step={SIM_STEP}
              value={[monthly]}
              onValueChange={([v]) => setMonthly(v)}
            >
              <Slider.Track className="relative h-2 grow rounded-full bg-white/20">
                <Slider.Range className="absolute h-full rounded-full bg-[var(--d-lime)]" />
              </Slider.Track>
              <Slider.Thumb
                aria-label={content.sliderAria}
                className="block h-6 w-6 cursor-grab rounded-full border-[3px] border-[var(--d-lime)] bg-[#FFFDF7] shadow-lg outline-none transition-transform hover:scale-110 focus-visible:ring-4 focus-visible:ring-white/30 active:cursor-grabbing"
              />
            </Slider.Root>
          </div>

          <div className="mt-7">
            <p className="text-[0.7rem] uppercase tracking-[0.2em] text-[#FFFDF7]/60 [font-family:var(--demo-mono)]">
              {content.periodLabel}
            </p>
            <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label={content.periodLabel}>
              {content.yearTabs.map((label, i) => (
                <motion.button
                  key={label}
                  type="button"
                  onClick={() => setYearIdx(i)}
                  aria-pressed={i === yearIdx}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2, ease: EASE }}
                  className={`rounded-full px-3.5 py-1.5 text-[0.76rem] font-medium transition-colors ${
                    i === yearIdx
                      ? "bg-[#FFFDF7] text-[var(--d-green)]"
                      : "bg-white/10 text-[#FFFDF7]/80 hover:bg-white/18"
                  }`}
                >
                  {label}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-[1.8rem] bg-white/8 p-6 backdrop-blur-sm sm:p-8">
          <p className="text-[0.7rem] uppercase tracking-[0.2em] text-[#FFFDF7]/60 [font-family:var(--demo-mono)]">
            {content.resultLabel}
          </p>
          <AnimatedMoney
            value={total}
            reduced={reduced}
            className="mt-2 block text-[2.5rem] font-medium leading-none [font-family:var(--demo-mono)] sm:text-[2.9rem]"
          />
          <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/15 pt-5">
            <div>
              <p className="text-[0.64rem] uppercase tracking-[0.16em] text-[#FFFDF7]/60 [font-family:var(--demo-mono)]">
                {content.depositLabel}
              </p>
              <AnimatedMoney
                value={deposited}
                reduced={reduced}
                className="mt-1 block text-lg font-medium [font-family:var(--demo-mono)]"
              />
            </div>
            <div>
              <p className="text-[0.64rem] uppercase tracking-[0.16em] text-[#FFFDF7]/60 [font-family:var(--demo-mono)]">
                {content.yieldLabel}
              </p>
              <AnimatedMoney
                value={earned}
                reduced={reduced}
                className="mt-1 block text-lg font-medium text-[var(--d-lime)] [font-family:var(--demo-mono)]"
              />
            </div>
          </div>
          <p className="mt-5 text-[0.68rem] leading-relaxed text-[#FFFDF7]/50">{content.note}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function ZelaBoxes({ content }: { content: ZelaContent["boxes"] }) {
  const reduced = useReducedMotion() ?? false;
  const gridRef = useRef<HTMLDivElement>(null);
  const inView = useInView(gridRef, { once: true, amount: 0.25 });

  return (
    <section id="caixinhas" className="relative scroll-mt-16 overflow-hidden py-20 sm:py-28">
      <Blob color="rgba(232,161,61,0.12)" className="-left-32 top-40 h-[24rem] w-[24rem]" />

      <div className="relative mx-auto max-w-6xl px-5">
        <div className="max-w-2xl">
          <SectionLabel text={content.label} />
          <h2 className="mt-5 text-3xl leading-tight tracking-tight text-[var(--d-ink)] [font-family:var(--demo-display)] sm:text-[2.7rem] sm:leading-[1.08]">
            {content.titleLead}{" "}
            <em className="font-medium italic text-[var(--d-green)]">{content.titleAccent}</em>{" "}
            {content.titleEnd}
          </h2>
          <p className="mt-5 text-[0.95rem] leading-relaxed text-[var(--d-ink-soft)]">
            {content.intro}
          </p>
        </div>

        <div ref={gridRef} className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {BOXES.map((box, i) => (
            <BoxCard
              key={box.id}
              box={box}
              content={content}
              reduced={reduced}
              play={inView}
              delay={i * 0.1}
            />
          ))}
        </div>

        <Simulator content={content.sim} reduced={reduced} />
      </div>
    </section>
  );
}
