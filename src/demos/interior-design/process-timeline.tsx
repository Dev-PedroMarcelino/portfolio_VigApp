"use client";

import { Clock } from "lucide-react";
import type { AmbraContent } from "./content";
import { Reveal, SectionHeading } from "./ui";

export function ProcessTimeline({ content }: { content: AmbraContent["process"] }) {
  return (
    <section
      id="process"
      className="scroll-mt-20 bg-[var(--d-dark)] px-5 py-20 text-[var(--d-dark-text)] sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            label={content.label}
            title={content.title}
            intro={content.intro}
            dark
          />
        </Reveal>

        <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-[var(--d-dark-line)] bg-[var(--d-dark-line)] sm:grid-cols-2 lg:grid-cols-4">
          {content.steps.map((step, i) => (
            <Reveal key={step.id} delay={i * 0.08}>
              <li className="group flex h-full flex-col bg-[var(--d-dark)] p-6 transition-colors hover:bg-[var(--d-dark-2)]">
                <span className="text-[2.6rem] leading-none text-[var(--d-accent-soft)] [font-family:var(--demo-display)]">
                  {step.index}
                </span>
                <h3 className="mt-5 text-[1.25rem] leading-tight text-[var(--d-cream)] [font-family:var(--demo-display)]">
                  {step.title}
                </h3>
                <p className="mt-3 flex-1 text-[14px] leading-relaxed text-[var(--d-dark-text)]">
                  {step.body}
                </p>
                <p className="mt-6 flex items-center gap-2 border-t border-[var(--d-dark-line)] pt-4 text-[12px] uppercase tracking-[0.16em] text-[var(--d-accent-soft)]">
                  <Clock className="h-3.5 w-3.5" strokeWidth={1.6} />
                  {step.duration}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>

        <p className="mt-8 text-[12px] uppercase tracking-[0.2em] text-[var(--d-dark-text)]/70">
          {content.durationLabel}
        </p>
      </div>
    </section>
  );
}
