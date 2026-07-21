"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { PERFORMANCE_ROWS, type VantageContent } from "./content";
import { SectionLabel } from "./ui";

type Mode = "net" | "gross";

export function PerformanceSection({ content }: { content: VantageContent["performance"] }) {
  const reduced = useReducedMotion();
  const [mode, setMode] = useState<Mode>("net");

  /** Volatility (last column) is unaffected by fees. */
  const cellValue = (rowFee: number, value: number, colIndex: number) =>
    mode === "gross" && colIndex < 5 ? value + rowFee : value;

  return (
    <section id="performance" className="scroll-mt-20 border-t border-[var(--d-line)] bg-[var(--d-bg-soft)] py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <SectionLabel text={content.label} />
            <h2 className="mt-5 [font-family:var(--demo-display)] text-3xl leading-tight text-[var(--d-ink)] sm:text-[2.6rem] sm:leading-[1.12]">
              {content.title}
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-[var(--d-ink-soft)]">{content.intro}</p>
          </div>

          <div
            role="group"
            aria-label={`${content.netLabel} / ${content.grossLabel}`}
            className="flex w-max shrink-0 rounded-full border border-[var(--d-line)] p-1"
          >
            {(
              [
                ["net", content.netLabel],
                ["gross", content.grossLabel],
              ] as const
            ).map(([m, label]) => (
              <button
                key={m}
                type="button"
                aria-pressed={mode === m}
                onClick={() => setMode(m)}
                className={`rounded-full px-5 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.16em] transition-colors ${
                  mode === m ? "bg-[var(--d-gold)] text-[#0B1221]" : "text-[var(--d-ink-soft)] hover:text-[var(--d-ink)]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 overflow-x-auto rounded-2xl border border-[var(--d-line)] bg-[var(--d-panel)]">
          <table className="w-full min-w-[720px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-[var(--d-line)]">
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[var(--d-ink-soft)]"
                >
                  {content.strategyCol}
                </th>
                {content.columns.map((col) => (
                  <th
                    key={col}
                    scope="col"
                    className="px-4 py-4 text-right text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-[var(--d-ink-soft)]"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PERFORMANCE_ROWS.map((row) => (
                <tr
                  key={row.id}
                  className={`border-b border-[var(--d-line)] last:border-b-0 ${
                    row.benchmark ? "bg-[#0A101D]" : "transition-colors hover:bg-[var(--d-gold)]/[0.04]"
                  }`}
                >
                  <th scope="row" className="px-6 py-4 text-left font-normal">
                    <span
                      className={
                        row.benchmark
                          ? "text-sm italic text-[var(--d-ink-soft)]"
                          : "[font-family:var(--demo-display)] text-base text-[var(--d-ink)]"
                      }
                    >
                      {content.rows[row.id]}
                    </span>
                    {!row.benchmark && (
                      <span className="mt-0.5 block text-[0.62rem] text-[var(--d-ink-soft)]/80">
                        {content.feeLabel} {row.feePct.toFixed(2)}%
                      </span>
                    )}
                  </th>
                  {row.values.map((v, colIndex) => {
                    const shown = cellValue(row.feePct, v, colIndex);
                    const isVol = colIndex === 5;
                    return (
                      <td key={colIndex} className="px-4 py-4 text-right">
                        <motion.span
                          key={`${mode}-${colIndex}`}
                          initial={reduced ? false : { opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: reduced ? 0 : colIndex * 0.03 }}
                          className={`inline-block font-mono text-[0.82rem] tabular-nums ${
                            isVol
                              ? "text-[var(--d-ink-soft)]"
                              : row.benchmark
                                ? "text-[var(--d-ink-soft)]"
                                : "text-[var(--d-ink)]"
                          }`}
                        >
                          {isVol ? "" : "+"}
                          {shown.toFixed(1)}%
                        </motion.span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-5 text-[0.68rem] italic leading-relaxed text-[var(--d-ink-soft)]/80">{content.footnote}</p>
      </div>
    </section>
  );
}
