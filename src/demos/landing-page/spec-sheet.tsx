"use client";

import type { SpecsContent } from "./content";
import { HaloRing } from "./halo-ring";
import { Reveal, SectionHeading } from "./ui";

export function SpecSheet({ content }: { content: SpecsContent }) {
  return (
    <section id="specs" className="relative scroll-mt-24 border-t border-[var(--d-line)] px-5 py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
        <div className="lg:sticky lg:top-28">
          <SectionHeading label={content.label} title={content.title} intro={content.intro} align="left" />
          <div className="relative mt-10 hidden lg:block">
            <div
              className="pointer-events-none absolute inset-0 rounded-full opacity-40 blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(126,231,199,0.3), transparent 60%)" }}
              aria-hidden
            />
            <HaloRing className="relative mx-auto h-auto w-64" spin />
          </div>
        </div>

        <dl className="grid gap-px overflow-hidden rounded-3xl border border-[var(--d-line)] bg-[var(--d-line)] sm:grid-cols-2">
          {content.items.map((item, i) => (
            <Reveal key={item.label} delay={(i % 2) * 0.06}>
              <div className="flex h-full flex-col bg-[var(--d-panel)] p-6 transition-colors hover:bg-[var(--d-bg-raise)]">
                <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[var(--d-ink-faint)]">
                  {item.label}
                </dt>
                <dd className="mt-3 [font-family:var(--demo-display)] text-xl font-medium text-[var(--d-ink)]">
                  {item.value}
                </dd>
                <dd className="mt-1.5 text-sm leading-relaxed text-[var(--d-ink-dim)]">{item.note}</dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
