"use client";

import { motion } from "framer-motion";
import { Leaf, Scale, Users } from "lucide-react";
import type { EsgContent, EsgMetricContent } from "./content";
import { formatFigure, SectionHeading, useCountUp, useInView } from "./ui";

const PILLAR_ICONS = [Leaf, Users, Scale];

function MetricRow({ metric, active, index }: { metric: EsgMetricContent; active: boolean; index: number }) {
  const animated = useCountUp(metric.current, active, 1200 + index * 120);
  const currentPct = (metric.current / metric.target) * 100;

  return (
    <div className="py-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div className="min-w-0">
          <p className="text-[0.94rem] font-medium text-[var(--d-ink)]">{metric.label}</p>
          <p className="mt-0.5 text-[0.76rem] text-[var(--d-ink-faint)]">{metric.detail}</p>
        </div>
        <p className="[font-family:var(--demo-display)] text-xl font-semibold text-[var(--d-ink)] tabular-nums">
          {formatFigure(animated, metric.unit === "%" && metric.target < 5 ? 1 : 0)}
          {metric.unit}
        </p>
      </div>

      <div className="relative mt-3 h-2 overflow-hidden rounded-full bg-[var(--d-panel-strong)]">
        {/* Target marker sits at the full width; current fills toward it. */}
        <motion.span
          initial={active ? { width: 0 } : false}
          animate={active ? { width: `${Math.min(currentPct, 100)}%` } : undefined}
          transition={{ duration: 1.1, delay: 0.1 + index * 0.1, ease: "easeOut" }}
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[var(--d-steel)] to-[var(--d-steel-bright)]"
        />
      </div>

      <div className="mt-2 flex items-center justify-between text-[0.7rem] text-[var(--d-ink-faint)]">
        <span>
          {/* progress label */}
          {`${formatFigure(metric.current, metric.target < 5 ? 1 : 0)}${metric.unit}`}
        </span>
        <span className="font-medium text-[var(--d-steel-bright)]">
          {`${formatFigure(metric.target, metric.target < 5 ? 1 : 0)}${metric.unit} · ${metric.targetYear}`}
        </span>
      </div>
    </div>
  );
}

export function Esg({ content }: { content: EsgContent }) {
  const [ref, inView] = useInView<HTMLDivElement>();

  return (
    <section id="esg" className="relative scroll-mt-20 border-t border-[var(--d-line)] py-20 lg:py-28">
      <div ref={ref} className="mx-auto max-w-6xl px-5">
        <SectionHeading label={content.eyebrow} title={content.title} intro={content.intro} />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          <div className="grid gap-4">
            {content.pillars.map((pillar, i) => {
              const Icon = PILLAR_ICONS[i % PILLAR_ICONS.length];
              return (
                <div
                  key={pillar.title}
                  className="flex gap-4 rounded-sm border border-[var(--d-line)] bg-[var(--d-surface)] p-5"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-[var(--d-steel-bright)]/40 bg-[var(--d-panel)]">
                    <Icon className="h-5 w-5 text-[var(--d-steel-bright)]" strokeWidth={1.7} aria-hidden />
                  </span>
                  <div>
                    <h3 className="[font-family:var(--demo-display)] text-[1.1rem] font-semibold text-[var(--d-ink)]">
                      {pillar.title}
                    </h3>
                    <p className="mt-1.5 text-[0.88rem] leading-relaxed text-[var(--d-ink-soft)]">{pillar.body}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="rounded-sm border border-[var(--d-line)] bg-[var(--d-surface)] p-6 sm:p-7">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[var(--d-steel-bright)]">
              {content.metricsLabel}
            </p>
            <div className="mt-2 divide-y divide-[var(--d-line)]">
              {content.metrics.map((metric, i) => (
                <MetricRow key={metric.id} metric={metric} active={inView} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
