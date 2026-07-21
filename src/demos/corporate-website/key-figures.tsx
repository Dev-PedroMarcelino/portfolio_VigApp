"use client";

import type { FigureContent, FiguresContent } from "./content";
import { formatFigure, SectionHeading, useCountUp, useInView } from "./ui";

function FigureCell({ figure, active, index }: { figure: FigureContent; active: boolean; index: number }) {
  const animated = useCountUp(figure.value, active, 1300 + index * 120);
  return (
    <div className="group relative bg-[var(--d-bg)] px-6 py-8">
      <span
        aria-hidden
        className="absolute left-6 top-8 text-[0.62rem] font-semibold tabular-nums text-[var(--d-ink-faint)]"
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <p className="mt-5 [font-family:var(--demo-display)] text-[2.4rem] font-semibold leading-none tracking-[-0.02em] text-[var(--d-ink)] tabular-nums sm:text-[3rem]">
        {figure.prefix}
        {formatFigure(animated, figure.decimals)}
        {figure.suffix}
      </p>
      <p className="mt-4 text-[0.92rem] font-medium text-[var(--d-ink)]">{figure.label}</p>
      <p className="mt-1 text-[0.78rem] text-[var(--d-ink-faint)]">{figure.note}</p>
      <span
        aria-hidden
        className="mt-5 block h-px w-10 bg-[var(--d-steel)] transition-all duration-500 group-hover:w-16"
      />
    </div>
  );
}

export function KeyFigures({ content }: { content: FiguresContent }) {
  const [ref, inView] = useInView<HTMLDivElement>();

  return (
    <section id="figures" className="relative scroll-mt-20 border-t border-[var(--d-line)] py-20 lg:py-28">
      <div ref={ref} className="mx-auto max-w-6xl px-5">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading label={content.eyebrow} title={content.title} intro={content.intro} />
          <p className="shrink-0 text-[0.72rem] font-medium uppercase tracking-[0.16em] text-[var(--d-ink-faint)]">
            {content.asOf}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-[var(--d-line)] bg-[var(--d-line)] sm:grid-cols-2 lg:grid-cols-4">
          {content.figures.map((figure, i) => (
            <FigureCell key={figure.id} figure={figure} active={inView} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
