"use client";

import { Quote } from "lucide-react";
import type { AmbraContent } from "./content";
import { Reveal, SectionHeading } from "./ui";

export function Testimonials({ content }: { content: AmbraContent["testimonials"] }) {
  return (
    <section
      id="voices"
      className="scroll-mt-20 border-t border-[var(--d-line)] px-5 py-20 sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading label={content.label} title={content.title} />
        </Reveal>

        <ul className="mt-14 grid gap-6 lg:grid-cols-3">
          {content.items.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.1}>
              <li className="flex h-full flex-col rounded-2xl border border-[var(--d-line)] bg-[var(--d-cream)] p-7">
                <Quote
                  className="h-7 w-7 text-[var(--d-accent)]"
                  strokeWidth={1.4}
                  aria-hidden
                />
                <blockquote className="mt-5 flex-1 text-[16px] leading-relaxed text-[var(--d-ink)] [font-family:var(--demo-display)]">
                  {item.quote}
                </blockquote>
                <figcaption className="mt-7 border-t border-[var(--d-line)] pt-5">
                  <p className="text-[14px] font-medium text-[var(--d-ink)]">{item.name}</p>
                  <p className="mt-0.5 text-[12px] text-[var(--d-soft)]">{item.role}</p>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-[var(--d-accent)]">
                    {item.project}
                  </p>
                </figcaption>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
