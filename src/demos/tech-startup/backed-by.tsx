"use client";

import { Quote } from "lucide-react";
import type { BackedByContent } from "./content";
import { SectionHeading } from "./ui";

/**
 * Text-only wordmarks: each investor gets a distinct type treatment so the
 * strip reads like a real logo wall without a single image.
 */
const WORDMARK_STYLES = [
  "[font-family:var(--demo-display)] text-lg font-semibold tracking-tight",
  "text-sm font-bold uppercase tracking-[0.3em]",
  "[font-family:var(--d-mono)] text-sm tracking-tight",
  "[font-family:var(--demo-display)] text-lg font-light italic tracking-wide",
  "text-sm font-extrabold uppercase tracking-widest",
  "[font-family:var(--demo-display)] text-lg font-medium tracking-[0.14em] uppercase",
];

export function BackedBy({ content }: { content: BackedByContent }) {
  return (
    <section id="investors" className="scroll-mt-20 border-y border-[var(--d-line)] bg-[var(--d-bg-raise)]/60 px-5 py-24 md:py-28">
      <div className="mx-auto max-w-5xl">
        <SectionHeading label={content.label} title={content.title} />

        <ul className="mt-14 grid grid-cols-2 items-center gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
          {content.investors.map((name, i) => (
            <li
              key={name}
              className={`text-center text-[var(--d-ink-faint)] transition-colors hover:text-[var(--d-ink-dim)] ${
                WORDMARK_STYLES[i % WORDMARK_STYLES.length]
              }`}
            >
              {name}
            </li>
          ))}
        </ul>

        <figure className="mx-auto mt-16 max-w-2xl text-center">
          <Quote
            className="mx-auto h-6 w-6 rotate-180 text-[var(--d-accent)]"
            strokeWidth={1.6}
            aria-hidden
          />
          <blockquote className="mt-5 [font-family:var(--demo-display)] text-xl font-light leading-relaxed tracking-tight text-[var(--d-ink)] md:text-2xl">
            {content.quote.text}
          </blockquote>
          <figcaption className="mt-6 text-sm">
            <span className="font-semibold text-[var(--d-ink)]">{content.quote.name}</span>
            <span className="mx-2 text-[var(--d-ink-faint)]" aria-hidden>
              ·
            </span>
            <span className="text-[var(--d-ink-dim)]">{content.quote.role}</span>
          </figcaption>
          <p className="mt-8 inline-block rounded-full border border-[var(--d-line-bright)] px-4 py-1.5 [font-family:var(--d-mono)] text-xs text-[var(--d-ink-faint)]">
            {content.note}
          </p>
        </figure>
      </div>
    </section>
  );
}
