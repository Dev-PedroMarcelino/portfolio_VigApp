"use client";

import Image from "next/image";
import type { NordformContent } from "./content";
import { IMAGES } from "./content";
import { Reveal, SectionHeading } from "./ui";

/** Thin dovetail-joint line drawing used as the section motif. */
function DovetailMotif() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 220 40"
      className="h-8 w-44 text-[var(--d-oak)]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
    >
      <path d="M2 38 V14 l18 -12 18 12 v24" />
      <path d="M42 38 V14 l18 -12 18 12 v24" />
      <path d="M82 38 V14 l18 -12 18 12 v24" />
      <path d="M122 38 V14 l18 -12 18 12 v24" />
      <path d="M162 38 V14 l18 -12 18 12 v24" />
      <path d="M2 38 h216" />
    </svg>
  );
}

export function Craftsmanship({ content }: { content: NordformContent["craft"] }) {
  return (
    <section id="craft" className="scroll-mt-20 bg-[var(--d-dark)] py-20 text-[var(--d-bone)] sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <DovetailMotif />
          <div className="mt-8">
            <SectionHeading label={content.label} title={content.title} intro={content.intro} dark />
          </div>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.05fr_1fr]">
          <Reveal>
            <ol className="flex flex-col">
              {content.steps.map((step, index) => (
                <li
                  key={step.title}
                  className="flex gap-6 border-l border-[var(--d-dark-line)] pb-10 pl-6 last:pb-0"
                >
                  <div>
                    <p className="font-mono text-xs tracking-[0.2em] text-[var(--d-oak)]">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-2 text-2xl [font-family:var(--demo-display)]">{step.title}</h3>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-[var(--d-dark-text)]">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <blockquote className="mt-10 rounded-[20px] border border-[var(--d-dark-line)] bg-[var(--d-dark-2)] p-6">
              <p className="text-lg italic leading-relaxed [font-family:var(--demo-display)]">
                &ldquo;{content.quote}&rdquo;
              </p>
              <footer className="mt-4 text-xs text-[var(--d-dark-text)]">
                <span className="font-semibold text-[var(--d-oak)]">{content.quoteName}</span>
                {" — "}
                {content.quoteRole}
              </footer>
            </blockquote>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-6">
            <div className="relative min-h-[300px] flex-1 overflow-hidden rounded-[24px] border border-[var(--d-dark-line)]">
              <Image
                src={IMAGES.craft}
                alt={content.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-[rgba(107,74,50,0.28)] mix-blend-multiply"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-[rgba(33,29,25,0.55)] to-transparent"
              />
            </div>

            <dl className="grid grid-cols-3 gap-4">
              {content.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-[var(--d-dark-line)] bg-[var(--d-dark-2)] p-4"
                >
                  <dd className="text-2xl text-[var(--d-oak)] [font-family:var(--demo-display)]">
                    {stat.value}
                  </dd>
                  <dt className="mt-1 text-[11px] leading-snug text-[var(--d-dark-text)]">
                    {stat.label}
                  </dt>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
