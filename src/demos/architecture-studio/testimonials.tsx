"use client";

import { Quote } from "lucide-react";
import type { PrumoContent } from "./content";
import { Kicker, Reveal, SectionTitle } from "./ui";

/**
 * Three owners, three delivered houses — serif italic pull-quotes on an
 * asymmetric editorial grid, hairlines instead of cards.
 */
export function Testimonials({ content }: { content: PrumoContent["testimonials"] }) {
  return (
    <section className="bg-[var(--d-bg-soft)] py-24 sm:py-32">
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8">
        <Reveal>
          <Kicker>{content.label}</Kicker>
          <SectionTitle lead={content.titleLead} italic={content.titleItalic} className="mt-6" />
        </Reveal>

        <div className="mt-14 grid gap-y-12 border-t border-[var(--d-line-strong)] pt-12 sm:mt-16 lg:grid-cols-12 lg:gap-x-14">
          {content.items.map((item, i) => (
            <Reveal
              key={item.name}
              delay={i * 0.1}
              className={
                i === 0
                  ? "lg:col-span-6"
                  : i === 1
                    ? "lg:col-span-6 lg:mt-20"
                    : "lg:col-span-7 lg:col-start-4 lg:mt-8"
              }
            >
              <figure className={i === 2 ? "lg:text-center" : ""}>
                <Quote
                  aria-hidden
                  className={`h-5 w-5 text-[var(--d-accent)] ${i === 2 ? "lg:mx-auto" : ""}`}
                  strokeWidth={1.4}
                />
                <blockquote className="mt-5 [font-family:var(--demo-display)] text-2xl italic leading-[1.35] text-[var(--d-ink)] sm:text-[1.7rem]">
                  “{item.quote}”
                </blockquote>
                <figcaption className="mt-6">
                  <span className="[font-family:var(--demo-body)] text-sm font-medium text-[var(--d-ink)]">
                    {item.name}
                  </span>
                  <span className="mx-3 text-[var(--d-line-strong)]" aria-hidden>
                    —
                  </span>
                  <span className="[font-family:var(--demo-mono)] text-[11px] uppercase tracking-[0.2em] text-[var(--d-ink-faint)]">
                    {item.project}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
