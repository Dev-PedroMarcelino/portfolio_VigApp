"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { PerfContent, PerfMetric } from "./content";
import { CarbonTexture, SectionLabel, useCountUp, useReveal } from "./ui";

const PERF_IMG = "photo-1542362567-b07e54358753";

function MetricBar({ metric, inView, reduced }: { metric: PerfMetric; inView: boolean; reduced: boolean }) {
  const value = useCountUp(metric.value, metric.decimals, inView, reduced);
  const display = metric.decimals === 0 ? Math.round(value).toLocaleString("en-US") : value.toFixed(metric.decimals);
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-sm font-medium text-[var(--d-ink)]">{metric.label}</span>
        <span className="[font-family:var(--demo-display)] text-lg text-[var(--d-ink)] tabular-nums">
          {display}
          <span className="ml-1 text-xs text-[var(--d-accent-soft)]">{metric.suffix}</span>
        </span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden bg-white/5">
        <motion.div
          className="h-full bg-[var(--d-accent)]"
          initial={{ width: 0 }}
          animate={inView ? { width: `${metric.fill}%` } : { width: 0 }}
          transition={reduced ? { duration: 0 } : { duration: 1.1, ease: "easeOut" }}
        />
      </div>
      <p className="mt-1.5 text-[0.62rem] uppercase tracking-[0.14em] text-[var(--d-metal)]">{metric.note}</p>
    </div>
  );
}

/** Power (rising) and torque (plateau) curves plotted across the rev range. */
function PowerCurve({ content, inView, reduced }: { content: PerfContent; inView: boolean; reduced: boolean }) {
  const powerPath = "M8,150 C60,140 120,118 180,92 C240,66 300,42 360,30 C400,24 440,26 468,40";
  const torquePath = "M8,110 C50,86 90,70 140,66 C210,60 300,64 380,74 C420,80 450,92 468,108";
  const grid = [0, 1, 2, 3, 4];

  return (
    <svg viewBox="0 0 480 180" className="h-auto w-full" role="img" aria-label={content.curveTitle}>
      {grid.map((g) => (
        <line
          key={g}
          x1={8 + g * 115}
          y1={10}
          x2={8 + g * 115}
          y2={160}
          stroke="var(--d-line)"
          strokeWidth={1}
        />
      ))}
      <line x1={8} y1={160} x2={472} y2={160} stroke="var(--d-metal)" strokeOpacity={0.5} strokeWidth={1} />

      <motion.path
        d={torquePath}
        fill="none"
        stroke="var(--d-metal-light)"
        strokeWidth={2}
        strokeDasharray="4 4"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={reduced ? { duration: 0 } : { duration: 1.4, ease: "easeInOut" }}
      />
      <motion.path
        d={powerPath}
        fill="none"
        stroke="var(--d-accent)"
        strokeWidth={2.5}
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={reduced ? { duration: 0 } : { duration: 1.4, ease: "easeInOut", delay: 0.15 }}
      />

      <text x={8} y={176} className="fill-[var(--d-metal)]" style={{ fontSize: 8 }}>
        2k
      </text>
      <text x={432} y={176} className="fill-[var(--d-metal)]" style={{ fontSize: 8 }}>
        8k
      </text>
    </svg>
  );
}

export function PerformanceSection({ content }: { content: PerfContent }) {
  const reduced = useReducedMotion() ?? false;
  const [ref, inView] = useReveal<HTMLDivElement>();

  return (
    <section id="performance" className="relative overflow-hidden bg-[var(--d-bg)] py-20 sm:py-28">
      <div ref={ref} className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-4">
          <SectionLabel text={content.label} />
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <h2 className="[font-family:var(--demo-display)] max-w-xl text-3xl uppercase leading-tight tracking-tight text-[var(--d-ink)] sm:text-5xl">
              {content.title}
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-[var(--d-ink-soft)]">{content.intro}</p>
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {/* metrics */}
          <div className="flex flex-col gap-6 border border-[var(--d-line)] bg-[var(--d-surface)] p-6 lg:col-span-1">
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[var(--d-metal)]">
              {content.metricsTitle}
            </p>
            {content.metrics.map((m) => (
              <MetricBar key={m.id} metric={m} inView={inView} reduced={reduced} />
            ))}
          </div>

          {/* image + ladder */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="relative aspect-[4/3] overflow-hidden border border-[var(--d-line)] bg-black">
                <Image
                  src={`https://images.unsplash.com/${PERF_IMG}?auto=format&fit=crop&w=1000&q=80`}
                  alt={content.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, 40vw"
                  className="object-cover"
                  style={{ filter: "saturate(0.9) contrast(1.15)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[var(--d-accent)]/25 via-transparent to-transparent mix-blend-screen" />
              </div>

              <div className="flex flex-col justify-between border border-[var(--d-line)] bg-[var(--d-surface)] p-5">
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[var(--d-metal)]">
                  {content.ladderTitle}
                </p>
                <dl className="mt-3 flex flex-1 flex-col justify-center divide-y divide-[var(--d-line)]">
                  {content.ladder.map((row) => (
                    <div key={row.label} className="flex items-baseline justify-between gap-3 py-2.5">
                      <dt className="text-xs text-[var(--d-ink-soft)]">{row.label}</dt>
                      <dd className="[font-family:var(--demo-display)] text-lg text-[var(--d-ink)] tabular-nums">
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            {/* power curve */}
            <div className="relative overflow-hidden border border-[var(--d-line)] bg-[var(--d-carbon)] p-6">
              <CarbonTexture opacity={0.4} />
              <div className="relative">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="[font-family:var(--demo-display)] text-sm uppercase tracking-wide text-[var(--d-ink)]">
                    {content.curveTitle}
                  </p>
                  <div className="flex items-center gap-4 text-[0.62rem] font-semibold uppercase tracking-[0.14em]">
                    <span className="flex items-center gap-1.5 text-[var(--d-accent-soft)]">
                      <span className="inline-block h-[2px] w-4 bg-[var(--d-accent)]" aria-hidden />
                      {content.powerCurveLabel}
                    </span>
                    <span className="flex items-center gap-1.5 text-[var(--d-metal-light)]">
                      <span className="inline-block h-[2px] w-4 bg-[var(--d-metal-light)]" aria-hidden />
                      {content.torqueCurveLabel}
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  <PowerCurve content={content} inView={inView} reduced={reduced} />
                </div>
                <p className="mt-1 text-center text-[0.6rem] uppercase tracking-[0.2em] text-[var(--d-metal)]">
                  {content.rpmLabel}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-[var(--d-ink-soft)]">{content.curveNote}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
