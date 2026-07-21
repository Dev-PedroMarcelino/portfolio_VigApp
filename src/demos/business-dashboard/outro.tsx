"use client";

import { ArrowRight } from "lucide-react";
import type { Content } from "./content";

export function Outro({ copy }: { copy: Content["outro"] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl border border-[var(--d-line-strong)] bg-[var(--d-surface-2)] p-8 sm:p-12">
        <span
          className="pointer-events-none absolute -left-20 -top-24 h-64 w-64 rounded-full opacity-30 blur-3xl"
          style={{ background: "var(--d-accent)" }}
          aria-hidden
        />
        <span
          className="pointer-events-none absolute -bottom-28 right-0 h-64 w-64 rounded-full opacity-25 blur-3xl"
          style={{ background: "var(--d-violet)" }}
          aria-hidden
        />

        <div className="relative grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <span className="[font-family:var(--demo-mono)] text-[0.72rem] uppercase tracking-[0.22em] text-[var(--d-accent)]">
              {copy.eyebrow}
            </span>
            <h2 className="mt-3 [font-family:var(--demo-display)] text-3xl font-semibold tracking-tight text-[var(--d-ink)] sm:text-4xl">
              {copy.title}
            </h2>
            <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-[var(--d-ink-soft)]">
              {copy.body}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#overview"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--d-accent)] px-6 py-3 text-sm font-medium text-[var(--d-accent-ink)] transition-transform hover:scale-[1.03]"
              >
                {copy.primary}
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </a>
              <a
                href="#objectives"
                className="inline-flex items-center rounded-full border border-[var(--d-line-strong)] px-6 py-3 text-sm font-medium text-[var(--d-ink)] transition-colors hover:bg-[var(--d-panel-strong)]"
              >
                {copy.secondary}
              </a>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 lg:grid-cols-1">
            {copy.stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-[var(--d-line)] bg-[var(--d-bg)] p-5"
              >
                <div className="[font-family:var(--demo-mono)] text-2xl font-medium text-[var(--d-ink)]">
                  {s.value}
                </div>
                <div className="mt-1 text-[0.76rem] leading-snug text-[var(--d-ink-faint)]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
