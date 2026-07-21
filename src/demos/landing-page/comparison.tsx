"use client";

import { Check, Minus } from "lucide-react";
import type { ComparisonContent } from "./content";
import { Reveal, SectionHeading } from "./ui";

export function Comparison({ content }: { content: ComparisonContent }) {
  return (
    <section id="compare" className="relative scroll-mt-24 px-5 py-24 md:py-32">
      <div className="flex justify-center">
        <SectionHeading label={content.label} title={content.title} intro={content.intro} />
      </div>

      <Reveal className="mx-auto mt-14 max-w-4xl">
        <div className="overflow-hidden rounded-3xl border border-[var(--d-line)]">
          {/* Header */}
          <div className="grid grid-cols-[1.4fr_1fr_1fr] bg-[var(--d-panel)]">
            <div className="p-4 sm:p-5" />
            <div className="flex items-center justify-center gap-2 border-l border-[var(--d-line)] bg-[var(--d-accent)]/10 p-4 text-center sm:p-5">
              <span
                className="grid h-6 w-6 place-items-center rounded-full border-[3px] border-[var(--d-accent)]"
                aria-hidden
              >
                <span className="h-1 w-1 rounded-full bg-[var(--d-accent)]" />
              </span>
              <span className="[font-family:var(--demo-display)] text-sm font-semibold text-[var(--d-ink)] sm:text-base">
                {content.haloName}
              </span>
            </div>
            <div className="border-l border-[var(--d-line)] p-4 text-center text-sm text-[var(--d-ink-dim)] sm:p-5">
              {content.watchName}
            </div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-[var(--d-line)]">
            {content.rows.map((row) => (
              <div key={row.attribute} className="grid grid-cols-[1.4fr_1fr_1fr] items-center bg-[var(--d-bg)]">
                <div className="p-4 text-sm text-[var(--d-ink-dim)] sm:p-5">{row.attribute}</div>
                <div className="flex items-center justify-center gap-2 border-l border-[var(--d-line)] bg-[var(--d-accent)]/[0.06] p-4 text-center sm:p-5">
                  <span
                    className={`grid h-5 w-5 shrink-0 place-items-center rounded-full ${
                      row.haloWins ? "bg-[var(--d-accent)] text-[#08130F]" : "bg-[var(--d-line-bright)] text-[var(--d-ink-faint)]"
                    }`}
                    aria-hidden
                  >
                    {row.haloWins ? <Check className="h-3 w-3" strokeWidth={3} /> : <Minus className="h-3 w-3" strokeWidth={3} />}
                  </span>
                  <span className="text-sm font-medium text-[var(--d-ink)]">{row.halo}</span>
                </div>
                <div className="border-l border-[var(--d-line)] p-4 text-center text-sm text-[var(--d-ink-faint)] sm:p-5">
                  {row.watch}
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-sm italic leading-relaxed text-[var(--d-ink-faint)]">
          {content.footnote}
        </p>
      </Reveal>
    </section>
  );
}
