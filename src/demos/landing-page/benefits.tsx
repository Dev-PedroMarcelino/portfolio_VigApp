"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { Activity, Check, Moon, Sun } from "lucide-react";
import type { BenefitStep, BenefitsContent } from "./content";
import { SectionHeading } from "./ui";

const STEP_ACCENTS = ["#8FA7FF", "#7EE7C7", "#F5C97B"];
const STEP_ICONS = [Moon, Sun, Activity];

const R = 82;
const CIRC = 2 * Math.PI * R;

/** Circular gauge that eases to its target value whenever the active step changes. */
function ScoreDial({ value, unit, accent }: { value: number; unit: string; accent: string }) {
  const reduce = useReducedMotion() ?? false;
  const mv = useMotionValue(value);
  const [display, setDisplay] = useState(value);
  const offset = useTransform(mv, (v) => CIRC * (1 - v / 100));

  useEffect(() => {
    if (reduce) {
      mv.set(value);
      setDisplay(value);
      return;
    }
    const controls = animate(mv, value, { duration: 1.1, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [value, mv, reduce]);

  useMotionValueEvent(mv, "change", (v) => setDisplay(Math.round(v)));

  return (
    <div className="relative grid h-56 w-56 place-items-center sm:h-64 sm:w-64">
      <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90">
        <circle cx="100" cy="100" r={R} fill="none" stroke="var(--d-line)" strokeWidth="10" />
        <motion.circle
          cx="100"
          cy="100"
          r={R}
          fill="none"
          stroke={accent}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={CIRC}
          style={{ strokeDashoffset: offset, filter: `drop-shadow(0 0 10px ${accent}66)` }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="[font-family:var(--demo-display)] text-6xl font-medium tabular-nums text-[var(--d-ink)]">
          {display}
        </span>
        <span className="mt-1 text-sm text-[var(--d-ink-faint)]">{unit}</span>
      </div>
    </div>
  );
}

function StickyVisual({
  step,
  accent,
  liveLabel,
  index,
}: {
  step: BenefitStep;
  accent: string;
  liveLabel: string;
  index: number;
}) {
  const Icon = STEP_ICONS[index] ?? Activity;
  return (
    <div
      className="relative overflow-hidden rounded-[2rem] border border-[var(--d-line)] bg-[var(--d-panel)] p-8"
      style={{ boxShadow: `0 0 80px -40px ${accent}` }}
    >
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-30 blur-3xl"
        style={{ backgroundColor: accent }}
        aria-hidden
      />
      <div className="relative flex items-center justify-between">
        <span className="inline-flex items-center gap-2 rounded-full border border-[var(--d-line-bright)] px-3 py-1 text-xs text-[var(--d-ink-dim)]">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ backgroundColor: accent }} aria-hidden />
          {liveLabel}
        </span>
        <span
          className="grid h-10 w-10 place-items-center rounded-full"
          style={{ backgroundColor: `${accent}1f`, color: accent }}
          aria-hidden
        >
          <Icon className="h-5 w-5" strokeWidth={1.8} />
        </span>
      </div>

      <div className="relative mt-4 flex flex-col items-center">
        <ScoreDial value={step.score} unit={step.scoreUnit} accent={accent} />
        <span
          className="mt-2 rounded-full px-4 py-1 text-sm font-semibold"
          style={{ backgroundColor: `${accent}1f`, color: accent }}
        >
          {step.tag}
        </span>
      </div>

      <dl className="relative mt-8 grid grid-cols-3 gap-3">
        {step.metrics.map((m) => (
          <div key={m.label} className="rounded-2xl border border-[var(--d-line)] bg-[var(--d-bg-raise)] p-3 text-center">
            <dt className="text-[0.66rem] uppercase tracking-[0.1em] text-[var(--d-ink-faint)]">{m.label}</dt>
            <dd className="mt-1.5 text-sm font-semibold text-[var(--d-ink)]">{m.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function Benefits({ content }: { content: BenefitsContent }) {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reduce = useReducedMotion() ?? false;

  useEffect(() => {
    const els = stepRefs.current
      .slice(0, content.steps.length)
      .filter((el): el is HTMLDivElement => el !== null);
    if (els.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset.step ?? 0));
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [content.steps.length]);

  function jumpTo(index: number) {
    setActive(index);
    stepRefs.current[index]?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "center",
    });
  }

  const activeStep = content.steps[active];
  const activeAccent = STEP_ACCENTS[active] ?? STEP_ACCENTS[0];

  return (
    <section id="science" className="relative scroll-mt-24 px-5 py-24 md:py-32">
      <SectionHeading label={content.label} title={content.title} intro={content.intro} />

      <div className="mx-auto mt-16 grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        {/* Steps */}
        <div>
          {content.steps.map((step, i) => {
            const accent = STEP_ACCENTS[i] ?? STEP_ACCENTS[0];
            return (
              <div
                key={step.id}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                data-step={i}
                className="flex flex-col justify-center py-10 lg:min-h-[80vh] lg:py-0"
              >
                <div
                  className="border-l-2 pl-6 transition-colors duration-300 lg:pl-8"
                  style={{ borderColor: active === i ? accent : "var(--d-line)" }}
                >
                  <p className="flex items-center gap-3">
                    <span className="[font-family:var(--demo-display)] text-xs text-[var(--d-ink-faint)]">
                      0{i + 1}
                    </span>
                    <span
                      className="text-[0.66rem] font-semibold uppercase tracking-[0.26em]"
                      style={{ color: accent }}
                    >
                      {step.kicker}
                    </span>
                  </p>
                  <h3 className="mt-4 [font-family:var(--demo-display)] text-2xl font-medium tracking-tight text-[var(--d-ink)] md:text-[2rem] md:leading-tight">
                    {step.title}
                  </h3>
                  <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-[var(--d-ink-dim)]">
                    {step.body}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {step.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3 text-sm text-[var(--d-ink-dim)]">
                        <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: accent }} strokeWidth={2.4} aria-hidden />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Inline visual on small screens */}
                <div className="mt-8 lg:hidden">
                  <StickyVisual step={step} accent={accent} liveLabel={content.liveLabel} index={i} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Sticky visual on large screens */}
        <div className="hidden lg:block">
          <div className="sticky top-24 flex min-h-[80vh] flex-col justify-center">
            <div className="mb-5 flex gap-2" role="tablist" aria-label={content.label}>
              {content.steps.map((step, i) => (
                <button
                  key={step.id}
                  type="button"
                  role="tab"
                  aria-selected={active === i}
                  aria-label={`${content.stepAria}: ${step.title}`}
                  onClick={() => jumpTo(i)}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: active === i ? "2.5rem" : "1.25rem",
                    backgroundColor: active === i ? (STEP_ACCENTS[i] ?? STEP_ACCENTS[0]) : "var(--d-line-bright)",
                  }}
                />
              ))}
            </div>
            <motion.div
              key={active}
              initial={reduce ? undefined : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <StickyVisual step={activeStep} accent={activeAccent} liveLabel={content.liveLabel} index={active} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
