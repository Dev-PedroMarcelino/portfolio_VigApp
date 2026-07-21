"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { VantageContent } from "./content";
import { SectionLabel } from "./ui";

const PORTRAIT_IMG =
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1000&q=80";

export function AdvisorsSection({ content }: { content: VantageContent["advisors"] }) {
  const reduced = useReducedMotion();

  const reveal = (delay: number) => ({
    initial: reduced ? false : { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" } as const,
    transition: {
      duration: 0.8,
      delay,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  });

  return (
    <section id="advisors" className="scroll-mt-20 border-t border-[var(--d-line)] py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-2xl">
          <SectionLabel text={content.label} />
          <h2 className="mt-5 [font-family:var(--demo-display)] text-3xl leading-tight text-[var(--d-ink)] sm:text-[2.6rem] sm:leading-[1.12]">
            {content.title}
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-[var(--d-ink-soft)]">{content.intro}</p>
        </div>

        {/* Featured partner */}
        <motion.article
          {...reveal(0)}
          className="mt-14 grid overflow-hidden rounded-2xl border border-[var(--d-line)] bg-[var(--d-panel)] md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]"
        >
          <div className="relative min-h-[320px] md:min-h-[420px]">
            <Image
              src={PORTRAIT_IMG}
              alt={content.featured.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover object-top saturate-[0.55]"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(120deg, rgba(11,18,33,0.35) 0%, rgba(11,18,33,0) 45%, rgba(19,30,51,0.85) 100%)",
              }}
            />
            <div aria-hidden className="absolute inset-4 border border-[var(--d-gold)]/30" />
          </div>

          <div className="flex flex-col justify-center p-8 sm:p-12">
            <p className="[font-family:var(--demo-display)] text-xl italic leading-snug text-[var(--d-gold)] sm:text-2xl">
              &ldquo;{content.featured.quote}&rdquo;
            </p>
            <h3 className="mt-8 [font-family:var(--demo-display)] text-2xl text-[var(--d-ink)]">
              {content.featured.name}
            </h3>
            <p className="mt-1.5 text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-[var(--d-ink-soft)]">
              {content.featured.role}
            </p>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-[var(--d-ink-soft)]">{content.featured.bio}</p>
            <p className="mt-6 w-max border-t border-[var(--d-gold)]/40 pt-3 font-mono text-[0.66rem] uppercase tracking-[0.18em] text-[var(--d-gold)]">
              {content.featured.credentials}
            </p>
          </div>
        </motion.article>

        {/* Partner grid */}
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {content.team.map((member, i) => (
            <motion.article
              key={member.name}
              {...reveal(0.1 + i * 0.12)}
              className="flex flex-col rounded-2xl border border-[var(--d-line)] bg-[var(--d-panel)]/60 p-8 transition-colors hover:border-[var(--d-gold)]/40"
            >
              <span
                aria-hidden
                className="flex h-16 w-16 items-center justify-center rounded-full border border-[var(--d-gold)]/50 bg-[#0A101D] [font-family:var(--demo-display)] text-xl italic text-[var(--d-gold)]"
              >
                {member.initials}
              </span>
              <h3 className="mt-6 [font-family:var(--demo-display)] text-xl text-[var(--d-ink)]">{member.name}</h3>
              <p className="mt-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[var(--d-ink-soft)]">
                {member.role}
              </p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-[var(--d-ink-soft)]">{member.bio}</p>
              <p className="mt-6 w-max border-t border-[var(--d-gold)]/40 pt-3 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[var(--d-gold)]">
                {member.credentials}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
