"use client";

import { Star } from "lucide-react";
import type { ProofContent } from "./content";

export function SocialProof({ content }: { content: ProofContent }) {
  return (
    <section className="border-y border-[var(--d-line)] bg-white/[0.015] px-5 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 lg:flex-row lg:justify-between">
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-6">
          <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[var(--d-ink-faint)]">
            {content.kicker}
          </span>
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {content.press.map((name) => (
              <li
                key={name}
                className="[font-family:var(--demo-display)] text-sm font-medium tracking-tight text-[var(--d-ink-dim)]"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-0.5 text-[var(--d-accent)]" aria-hidden>
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="h-4 w-4 fill-current" strokeWidth={0} />
            ))}
          </div>
          <p className="text-sm text-[var(--d-ink-dim)]">
            <span className="font-semibold text-[var(--d-ink)]">{content.ratingValue}</span> {content.ratingLabel}
          </p>
        </div>
      </div>
    </section>
  );
}
