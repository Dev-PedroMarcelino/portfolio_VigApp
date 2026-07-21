"use client";

import { ArrowRight, Calendar } from "lucide-react";
import type { CtaContent } from "./content";
import { Glow, GridPattern, scrollToId } from "./ui";

export function Cta({ content }: { content: CtaContent }) {
  return (
    <section id="cta" className="relative scroll-mt-20 overflow-hidden py-24">
      <GridPattern />
      <Glow className="left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2" />
      <div className="relative mx-auto max-w-3xl px-5 text-center">
        <p className="inline-flex items-center gap-2 rounded-full border border-[var(--d-line)] bg-[var(--d-panel)] px-3.5 py-1.5 text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-[var(--d-accent-bright)] [font-family:var(--demo-mono)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--d-accent)] shadow-[0_0_10px_var(--d-accent)]" aria-hidden />
          {content.label}
        </p>
        <h2 className="mt-6 [font-family:var(--demo-display)] text-3xl font-semibold tracking-tight text-[var(--d-ink)] sm:text-5xl">
          {content.title}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-[0.98rem] leading-relaxed text-[var(--d-ink-soft)]">
          {content.body}
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => scrollToId("playground")}
            className="group inline-flex items-center gap-2 rounded-full bg-[var(--d-accent)] px-6 py-3.5 text-[0.9rem] font-semibold text-[var(--d-accent-ink)] shadow-[0_0_40px_-8px_var(--d-accent)] transition-transform hover:scale-[1.03]"
          >
            {content.ctaPrimary}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.2} aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => scrollToId("pricing")}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--d-line-strong)] px-6 py-3.5 text-[0.9rem] font-medium text-[var(--d-ink)] transition-colors hover:bg-[var(--d-panel)]"
          >
            <Calendar className="h-4 w-4" strokeWidth={2} aria-hidden />
            {content.ctaSecondary}
          </button>
        </div>
        <p className="mt-5 text-[0.76rem] text-[var(--d-ink-faint)] [font-family:var(--demo-mono)]">{content.note}</p>
      </div>
    </section>
  );
}
