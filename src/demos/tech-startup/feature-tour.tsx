"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  CircleCheck,
  GitBranch,
  History,
  LoaderCircle,
  RotateCcw,
  TriangleAlert,
} from "lucide-react";
import type {
  PreviewMockCopy,
  TimelineMockCopy,
  TourContent,
  TracesMockCopy,
} from "./content";
import { SectionHeading, WindowFrame } from "./ui";

/* ------------------------------------------------------------------ */
/* Mock screens (pure CSS, no images)                                  */
/* ------------------------------------------------------------------ */

function PreviewMock({ copy }: { copy: PreviewMockCopy }) {
  const reduce = useReducedMotion() ?? false;
  return (
    <WindowFrame title={copy.windowTitle}>
      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--d-ink-faint)]">
          {copy.heading}
        </p>
        <ul className="mt-4 space-y-3">
          {copy.rows.map((row) => (
            <li
              key={row.branch}
              className="rounded-xl border border-[var(--d-line)] bg-[var(--d-bg-raise)]/70 p-3.5"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="flex min-w-0 items-center gap-2 [font-family:var(--d-mono)] text-xs text-[var(--d-ink)]">
                  <GitBranch className="h-3.5 w-3.5 shrink-0 text-[var(--d-accent-soft)]" strokeWidth={1.8} aria-hidden />
                  <span className="truncate">{row.branch}</span>
                </span>
                {row.building ? (
                  <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-[var(--d-amber)]/40 bg-[var(--d-amber)]/10 px-2.5 py-1 text-[0.62rem] font-semibold text-[var(--d-amber)]">
                    <LoaderCircle
                      className={`h-3 w-3 ${reduce ? "" : "animate-spin"}`}
                      strokeWidth={2}
                      aria-hidden
                    />
                    {copy.building}
                  </span>
                ) : (
                  <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-[var(--d-green)]/40 bg-[var(--d-green)]/10 px-2.5 py-1 text-[0.62rem] font-semibold text-[var(--d-green)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--d-green)]" aria-hidden />
                    {copy.ready}
                  </span>
                )}
              </div>
              <div className="mt-2.5 flex items-center justify-between text-[0.68rem] text-[var(--d-ink-faint)]">
                <span>
                  {row.author} · {row.time}
                </span>
                {!row.building ? (
                  <span className="flex items-center gap-1 font-medium text-[var(--d-accent-soft)]">
                    {copy.open}
                    <ArrowUpRight className="h-3 w-3" strokeWidth={2} aria-hidden />
                  </span>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </WindowFrame>
  );
}

function TimelineMock({ copy }: { copy: TimelineMockCopy }) {
  const [rolledBack, setRolledBack] = useState(false);
  const toneStyles = {
    bad: "bg-[var(--d-rose)]",
    ok: "bg-[var(--d-green)]",
    live: "bg-[var(--d-accent)]",
  } as const;

  return (
    <WindowFrame title={copy.windowTitle}>
      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--d-ink-faint)]">
          {copy.heading}
        </p>

        {rolledBack ? (
          <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-[var(--d-green)]/40 bg-[var(--d-green)]/10 p-3.5 text-xs font-medium text-[var(--d-green)]">
            <CircleCheck className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
            {copy.restored}
          </div>
        ) : (
          <div className="mt-4 rounded-xl border border-[var(--d-rose)]/40 bg-[var(--d-rose)]/10 p-3.5">
            <p className="flex items-center gap-2.5 text-xs font-medium text-[var(--d-rose)]">
              <TriangleAlert className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
              {copy.alert}
            </p>
            <button
              type="button"
              onClick={() => setRolledBack(true)}
              className="mt-3 inline-flex items-center gap-2 rounded-lg bg-[var(--d-rose)] px-3.5 py-2 text-[0.7rem] font-semibold text-[#1B0A10] transition-transform hover:scale-[1.02]"
            >
              <RotateCcw className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden />
              {copy.action}
            </button>
          </div>
        )}

        <ul className="mt-4 space-y-2.5">
          {copy.rows.map((row) => (
            <li
              key={row.version}
              className="flex items-center gap-3 rounded-xl border border-[var(--d-line)] bg-[var(--d-bg-raise)]/70 px-3.5 py-3"
            >
              <span
                className={`h-2 w-2 shrink-0 rounded-full ${
                  rolledBack && row.tone === "bad" ? "bg-[var(--d-ink-faint)]" : toneStyles[row.tone]
                }`}
                aria-hidden
              />
              <span className="[font-family:var(--d-mono)] text-xs text-[var(--d-ink)]">
                {row.version}
              </span>
              <span className="truncate text-[0.68rem] text-[var(--d-ink-faint)]">{row.label}</span>
              <History className="ml-auto h-3.5 w-3.5 shrink-0 text-[var(--d-ink-faint)]" strokeWidth={1.6} aria-hidden />
            </li>
          ))}
        </ul>
      </div>
    </WindowFrame>
  );
}

const BAR_HEIGHTS = [42, 38, 45, 40, 44, 41, 39, 78, 92, 64, 46, 43];
const SPIKES = new Set([7, 8, 9]);

function TracesMock({ copy }: { copy: TracesMockCopy }) {
  const [traced, setTraced] = useState(false);

  return (
    <WindowFrame title={copy.windowTitle}>
      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--d-ink-faint)]">
          {copy.heading}
        </p>
        <p className="mt-3 text-[0.68rem] text-[var(--d-ink-faint)]">{copy.metricLabel}</p>

        <div className="mt-3 flex h-28 items-end gap-1.5 rounded-xl border border-[var(--d-line)] bg-[var(--d-bg-raise)]/70 p-3">
          {BAR_HEIGHTS.map((h, i) => (
            <span
              key={i}
              className={`flex-1 rounded-sm transition-colors ${
                SPIKES.has(i)
                  ? traced
                    ? "bg-[var(--d-accent)]"
                    : "bg-[var(--d-rose)]"
                  : "bg-[var(--d-indigo)]/45"
              }`}
              style={{ height: `${h}%` }}
              aria-hidden
            />
          ))}
        </div>

        <div className="mt-4 rounded-xl border border-[var(--d-amber)]/40 bg-[var(--d-amber)]/10 p-3.5">
          <p className="flex items-center gap-2.5 text-xs font-medium text-[var(--d-amber)]">
            <TriangleAlert className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
            {copy.alertText}
          </p>
          {traced ? (
            <p className="mt-3 rounded-lg bg-[#0B0B12] px-3 py-2 [font-family:var(--d-mono)] text-[0.68rem] text-[var(--d-accent-soft)]">
              {copy.tracedLabel}
            </p>
          ) : (
            <button
              type="button"
              onClick={() => setTraced(true)}
              className="mt-3 inline-flex items-center gap-2 rounded-lg bg-[var(--d-amber)] px-3.5 py-2 text-[0.7rem] font-semibold text-[#1C1403] transition-transform hover:scale-[1.02]"
            >
              {copy.action}
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden />
            </button>
          )}
        </div>
      </div>
    </WindowFrame>
  );
}

/* ------------------------------------------------------------------ */
/* Sticky-scroll tour                                                  */
/* ------------------------------------------------------------------ */

export function FeatureTour({ content }: { content: TourContent }) {
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

  function renderMock(index: number) {
    if (index === 0) return <PreviewMock copy={content.previewMock} />;
    if (index === 1) return <TimelineMock copy={content.timelineMock} />;
    return <TracesMock copy={content.tracesMock} />;
  }

  return (
    <section id="product" className="relative scroll-mt-20 px-5 py-24 md:py-32">
      <SectionHeading label={content.label} title={content.title} intro={content.intro} />

      <div className="mx-auto mt-16 grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.08fr] lg:gap-16">
        {/* Scrolling steps */}
        <div>
          {content.steps.map((step, i) => (
            <div
              key={step.id}
              ref={(el) => {
                stepRefs.current[i] = el;
              }}
              data-step={i}
              className="flex flex-col justify-center py-10 lg:min-h-[78vh] lg:py-0"
            >
              <div
                className={`border-l-2 pl-6 transition-colors duration-300 lg:pl-8 ${
                  active === i ? "border-[var(--d-accent)]" : "border-[var(--d-line)]"
                }`}
              >
                <p className="flex items-center gap-3">
                  <span className="[font-family:var(--d-mono)] text-xs text-[var(--d-ink-faint)]">
                    0{i + 1}
                  </span>
                  <span className="text-[0.66rem] font-semibold uppercase tracking-[0.26em] text-[var(--d-accent-soft)]">
                    {step.kicker}
                  </span>
                </p>
                <h3 className="mt-4 [font-family:var(--demo-display)] text-2xl font-medium tracking-tight text-[var(--d-ink)] md:text-[2rem] md:leading-tight">
                  {step.title}
                </h3>
                <p className="mt-4 max-w-md text-[0.92rem] leading-relaxed text-[var(--d-ink-dim)]">
                  {step.body}
                </p>
                <ul className="mt-6 space-y-2.5">
                  {step.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2.5 text-sm text-[var(--d-ink-dim)]">
                      <CircleCheck
                        className="mt-0.5 h-4 w-4 shrink-0 text-[var(--d-accent)]"
                        strokeWidth={2}
                        aria-hidden
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Inline mock on small screens */}
              <div className="mt-8 lg:hidden">{renderMock(i)}</div>
            </div>
          ))}
        </div>

        {/* Sticky mock panel on large screens */}
        <div className="hidden lg:block">
          <div className="sticky top-24 flex min-h-[78vh] flex-col justify-center">
            <div
              className="absolute inset-0 -z-10"
              style={{
                background:
                  "radial-gradient(60% 50% at 50% 50%, rgba(139,92,246,0.14) 0%, transparent 70%)",
              }}
              aria-hidden
            />
            <div className="mb-5 flex gap-2" role="tablist" aria-label={content.label}>
              {content.steps.map((step, i) => (
                <button
                  key={step.id}
                  type="button"
                  role="tab"
                  aria-selected={active === i}
                  aria-label={`${content.stepAria}: ${step.title}`}
                  onClick={() => jumpTo(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    active === i
                      ? "w-10 bg-[var(--d-accent)]"
                      : "w-5 bg-[var(--d-line-bright)] hover:bg-[var(--d-ink-faint)]"
                  }`}
                />
              ))}
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                initial={reduce ? undefined : { opacity: 0, y: 18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, y: -12, scale: 0.99 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                {renderMock(active)}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
