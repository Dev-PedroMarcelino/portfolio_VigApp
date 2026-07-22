"use client";

import type { PrumoContent } from "./content";
import { Kicker, Reveal, SectionTitle } from "./ui";

/**
 * Four-stage method as a horizontal hairline timeline — no cards, just thin
 * rules, mono numerals and generous air. Vertical rhythm on mobile.
 */
export function Process({ content }: { content: PrumoContent["process"] }) {
  return (
    <section id="processo" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8">
        <Reveal>
          <Kicker>{content.label}</Kicker>
          <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionTitle lead={content.titleLead} italic={content.titleItalic} />
            <p className="max-w-md [font-family:var(--demo-body)] text-sm leading-relaxed text-[var(--d-ink-soft)] lg:pb-2">
              {content.intro}
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-0 border-t border-[var(--d-line-strong)] sm:mt-20 lg:grid-cols-4">
          {content.steps.map((step, i) => (
            <Reveal key={step.num} delay={i * 0.08}>
              <div
                className={`relative flex h-full flex-col border-b border-[var(--d-line)] py-8 lg:border-b-0 lg:py-10 ${
                  i > 0 ? "lg:border-l lg:border-[var(--d-line)] lg:pl-8" : ""
                } ${i < content.steps.length - 1 ? "lg:pr-8" : ""}`}
              >
                {/* Timeline tick on the top rule */}
                <span
                  aria-hidden
                  className="absolute -top-[3px] left-0 hidden h-[5px] w-[5px] rounded-full bg-[var(--d-accent)] lg:block"
                />

                <p className="[font-family:var(--demo-mono)] text-[11px] tracking-[0.3em] text-[var(--d-accent)]">
                  {step.num}
                </p>
                <h3 className="mt-4 [font-family:var(--demo-display)] text-2xl leading-tight text-[var(--d-ink)] sm:text-[1.7rem]">
                  {step.name}
                </h3>

                <p className="mt-3 [font-family:var(--demo-mono)] text-[10px] uppercase tracking-[0.2em] text-[var(--d-ink-faint)]">
                  {content.durationLabel} — <span className="text-[var(--d-ink)]">{step.duration}</span>
                </p>

                <p className="mt-5 [font-family:var(--demo-body)] text-sm leading-[1.8] text-[var(--d-ink-soft)]">
                  {step.body}
                </p>

                <div className="mt-auto pt-7">
                  <p className="[font-family:var(--demo-body)] text-[10px] uppercase tracking-[0.2em] text-[var(--d-ink-faint)]">
                    {content.deliverablesLabel}
                  </p>
                  <ul className="mt-3">
                    {step.deliverables.map((d) => (
                      <li
                        key={d}
                        className="border-t border-[var(--d-line)] py-2.5 [font-family:var(--demo-body)] text-[13px] text-[var(--d-ink)]"
                      >
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-10 border-t border-[var(--d-line)] pt-5 text-center [font-family:var(--demo-mono)] text-[11px] uppercase tracking-[0.22em] text-[var(--d-ink-soft)]">
            {content.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
