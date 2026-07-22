"use client";

import Image from "next/image";
import type { PrumoContent } from "./content";
import { CAU_REGISTER, STUDIO_IMAGES } from "./content";
import { Kicker, Reveal, SectionTitle } from "./ui";

/**
 * The office behind the houses: color portrait of the founding architect,
 * short bio, quiet fictional recognition and three study-model vignettes.
 */
export function Studio({ content }: { content: PrumoContent["studio"] }) {
  return (
    <section id="escritorio" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Portrait */}
          <Reveal className="lg:col-span-5">
            <div className="relative">
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src={STUDIO_IMAGES.portrait}
                  alt={content.portraitAlt}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
              {/* Bronze offset frame */}
              <div
                aria-hidden
                className="absolute -bottom-4 -right-4 -z-10 hidden h-full w-full border border-[var(--d-accent)]/50 sm:block"
              />
              <div className="absolute bottom-5 left-5 bg-[var(--d-bg)]/92 px-4 py-3 backdrop-blur-sm">
                <p className="[font-family:var(--demo-display)] text-lg leading-none text-[var(--d-ink)]">
                  {content.name}
                </p>
                <p className="mt-1.5 [font-family:var(--demo-mono)] text-[9px] uppercase tracking-[0.24em] text-[var(--d-ink-soft)]">
                  {content.role} · {CAU_REGISTER}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Bio + recognition */}
          <div className="lg:col-span-7">
            <Reveal>
              <Kicker>{content.label}</Kicker>
              <SectionTitle lead={content.titleLead} italic={content.titleItalic} className="mt-6" />
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-9 max-w-2xl space-y-5">
                {content.bio.map((p) => (
                  <p key={p.slice(0, 24)} className="[font-family:var(--demo-body)] text-[15px] leading-[1.85] text-[var(--d-ink-soft)]">
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <dl className="mt-10 flex max-w-2xl divide-x divide-[var(--d-line)] border-y border-[var(--d-line)] py-5">
                {content.facts.map((fact, i) => (
                  <div key={fact.label} className={i === 0 ? "pr-6 sm:pr-10" : "px-6 sm:px-10"}>
                    <dt className="sr-only">{fact.label}</dt>
                    <dd className="[font-family:var(--demo-mono)] text-2xl text-[var(--d-ink)] sm:text-3xl">
                      {fact.value}
                    </dd>
                    <dd className="mt-1 [font-family:var(--demo-body)] text-[10px] uppercase tracking-[0.16em] text-[var(--d-ink-faint)]">
                      {fact.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.22}>
              <p className="mt-10 [font-family:var(--demo-mono)] text-[10px] uppercase tracking-[0.28em] text-[var(--d-ink-faint)]">
                {content.awardsLabel}
              </p>
              <ul className="mt-3 max-w-2xl">
                {content.awards.map((award) => (
                  <li
                    key={award.title}
                    className="flex items-baseline gap-6 border-t border-[var(--d-line)] py-3.5 last:border-b"
                  >
                    <span className="[font-family:var(--demo-mono)] text-[11px] tracking-[0.16em] text-[var(--d-accent)]">
                      {award.year}
                    </span>
                    <span className="[font-family:var(--demo-body)] text-[13px] text-[var(--d-ink)]">
                      {award.title}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.28}>
              <div className="mt-10 grid grid-cols-3 gap-4">
                {STUDIO_IMAGES.gallery.map((src, i) => (
                  <div key={src} className="relative aspect-square overflow-hidden">
                    <Image
                      src={src}
                      alt={content.galleryAlts[i]}
                      fill
                      sizes="(min-width: 1024px) 18vw, 30vw"
                      className="object-cover transition-transform duration-700 ease-out hover:scale-[1.05]"
                    />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
