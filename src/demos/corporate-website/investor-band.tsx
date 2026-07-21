"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Download, TrendingUp } from "lucide-react";
import type { InvestorContent } from "./content";

/* Deterministic sparkline path derived from a fixed seed sequence. */
function sparkPath(): string {
  const seed = [38, 34, 40, 45, 42, 50, 55, 52, 60, 58, 66, 72];
  const w = 200;
  const h = 60;
  const max = Math.max(...seed);
  const min = Math.min(...seed);
  const stepX = w / (seed.length - 1);
  return seed
    .map((v, i) => {
      const x = i * stepX;
      const y = h - ((v - min) / (max - min)) * (h - 8) - 4;
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
}

export function InvestorBand({ content }: { content: InvestorContent }) {
  const reduce = useReducedMotion();
  const path = sparkPath();

  return (
    <section id="investor" className="scroll-mt-20 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div
          className="relative overflow-hidden rounded-sm border border-[var(--d-line-strong)] p-7 sm:p-10"
          style={{
            background:
              "linear-gradient(135deg, #131E31 0%, #1E293B 55%, #223349 100%)",
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.5]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(148,163,184,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.06) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
              maskImage: "radial-gradient(ellipse 80% 100% at 100% 0%, black, transparent 70%)",
              WebkitMaskImage: "radial-gradient(ellipse 80% 100% at 100% 0%, black, transparent 70%)",
            }}
          />

          <div className="relative grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
            <div>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--d-steel-bright)]">
                {content.eyebrow}
              </p>
              <h2 className="mt-4 [font-family:var(--demo-display)] text-[1.9rem] font-semibold leading-tight tracking-[-0.02em] text-[var(--d-ink)] sm:text-[2.4rem]">
                {content.title}
              </h2>
              <p className="mt-5 max-w-lg text-[0.98rem] leading-relaxed text-[var(--d-ink-soft)]">{content.body}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  className="group inline-flex items-center gap-2 rounded-sm bg-[var(--d-steel-bright)] px-6 py-3 text-[0.9rem] font-semibold text-[var(--d-accent-ink)] transition-colors hover:bg-[var(--d-ink)]"
                >
                  <Download className="h-4 w-4" strokeWidth={2} aria-hidden />
                  {content.primaryCta}
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-sm border border-[var(--d-line-strong)] px-6 py-3 text-[0.9rem] font-medium text-[var(--d-ink)] transition-colors hover:border-[var(--d-steel-bright)] hover:bg-[var(--d-panel)]"
                >
                  {content.secondaryCta}
                  <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} aria-hidden />
                </button>
              </div>

              <dl className="mt-9 grid grid-cols-3 gap-px overflow-hidden rounded-sm border border-[var(--d-line)] bg-[var(--d-line)]">
                {content.nextEvent.map((ev) => (
                  <div key={ev.label} className="bg-[var(--d-surface)] px-4 py-3.5">
                    <dt className="text-[0.66rem] font-medium uppercase tracking-[0.12em] text-[var(--d-ink-faint)]">
                      {ev.label}
                    </dt>
                    <dd className="mt-1 text-[0.94rem] font-semibold text-[var(--d-ink)] tabular-nums">{ev.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="flex flex-col gap-4">
              <div className="rounded-sm border border-[var(--d-line)] bg-[rgba(15,23,42,0.5)] p-5 backdrop-blur">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[var(--d-ink-faint)]">
                      {content.ticker}
                    </p>
                    <p className="mt-2 [font-family:var(--demo-display)] text-3xl font-semibold text-[var(--d-ink)] tabular-nums">
                      {content.price}
                    </p>
                    <p className="mt-1 inline-flex items-center gap-1.5 text-[0.82rem] font-medium text-[#6EE7A6]">
                      <TrendingUp className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden />
                      {content.change}
                      <span className="text-[var(--d-ink-faint)]">· {content.changeLabel}</span>
                    </p>
                  </div>
                  <svg viewBox="0 0 200 60" className="h-14 w-32" fill="none" aria-hidden>
                    <motion.path
                      d={path}
                      stroke="var(--d-steel-bright)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={reduce ? false : { pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.4, ease: "easeInOut" }}
                    />
                  </svg>
                </div>
                <p className="mt-3 border-t border-[var(--d-line)] pt-3 text-[0.68rem] text-[var(--d-ink-faint)]">
                  {content.updated}
                </p>
              </div>

              <div className="rounded-sm border border-[var(--d-line)] bg-[rgba(15,23,42,0.5)] p-5 backdrop-blur">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[var(--d-ink-faint)]">
                  {content.reportsLabel}
                </p>
                <ul className="mt-3 divide-y divide-[var(--d-line)]">
                  {content.reports.map((report) => (
                    <li key={report.title}>
                      <button
                        type="button"
                        className="group flex w-full items-center justify-between gap-3 py-3 text-left"
                      >
                        <span>
                          <span className="block text-[0.88rem] font-medium text-[var(--d-ink)] transition-colors group-hover:text-[var(--d-steel-bright)]">
                            {report.title}
                          </span>
                          <span className="text-[0.7rem] text-[var(--d-ink-faint)]">{report.meta}</span>
                        </span>
                        <Download
                          className="h-4 w-4 shrink-0 text-[var(--d-ink-faint)] transition-colors group-hover:text-[var(--d-steel-bright)]"
                          strokeWidth={1.8}
                          aria-hidden
                        />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
