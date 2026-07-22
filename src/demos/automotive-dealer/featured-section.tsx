"use client";

import Image from "next/image";
import { BadgeCheck, CalendarCheck, MessageCircle, Rotate3d } from "lucide-react";
import type { BarcellosContent } from "./content";
import { FEATURED, SKETCHFAB_911, waLink } from "./content";
import { FOCUS, Reveal, SectionLabel, fmtBRL, scrollToId } from "./ui";

export function FeaturedSection({ content }: { content: BarcellosContent["featured"] }) {
  return (
    <section id="destaque" className="relative scroll-mt-24 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <SectionLabel text={content.label} />
        </Reveal>

        <div className="mt-8 overflow-hidden rounded-3xl border border-[var(--d-line)] bg-[var(--d-surface)] shadow-[0_40px_100px_rgba(0,0,0,0.45)]">
          <div className="grid lg:grid-cols-[1.02fr_0.98fr]">
            {/* Poster of the same car that spins on the hero stage */}
            <Reveal className="relative min-h-[280px] lg:min-h-[460px]">
              <Image
                src={SKETCHFAB_911.thumb}
                alt={`${content.title} — ${content.label}`}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-[#0A0B0E]/85 via-transparent to-[#0A0B0E]/25 lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[var(--d-surface)]"
              />
              <button
                type="button"
                onClick={() => scrollToId("top")}
                className={`absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-white/15 bg-black/55 px-4 py-2 text-[0.72rem] font-medium uppercase tracking-[0.16em] text-white/85 backdrop-blur-md transition-colors hover:border-[var(--d-gold)]/60 hover:text-[var(--d-gold)] ${FOCUS}`}
              >
                <Rotate3d className="h-4 w-4 text-[var(--d-gold)]" strokeWidth={1.8} />
                {content.back3d}
              </button>
            </Reveal>

            {/* Spec sheet */}
            <div className="relative p-7 sm:p-10">
              <Reveal>
                <h2 className="text-[1.7rem] font-semibold leading-tight tracking-tight text-[var(--d-ink)] [font-family:var(--demo-display)] sm:text-[2.1rem]">
                  {content.title}
                  <span className="ml-3 align-middle text-[0.95rem] text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]">
                    {FEATURED.year}
                  </span>
                </h2>
                <p className="mt-3 max-w-md text-[0.92rem] leading-relaxed text-[var(--d-ink-soft)]">
                  {content.subtitle}
                </p>
              </Reveal>

              <Reveal delay={0.08}>
                <dl className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--d-line)] bg-[var(--d-line)] sm:grid-cols-3">
                  {content.specs.map((s) => (
                    <div key={s.label} className="bg-[var(--d-panel)] px-4 py-3.5">
                      <dt className="text-[0.62rem] uppercase tracking-[0.18em] text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]">
                        {s.label}
                      </dt>
                      <dd className="mt-1 text-[0.95rem] font-semibold text-[var(--d-ink)] [font-family:var(--demo-mono)]">
                        {s.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>

              <Reveal delay={0.14}>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {content.badges.map((b) => (
                    <li
                      key={b}
                      className="flex items-center gap-1.5 rounded-full border border-[var(--d-gold)]/30 bg-[var(--d-gold)]/[0.07] px-3 py-1.5 text-[0.72rem] font-medium text-[var(--d-gold-soft)]"
                    >
                      <BadgeCheck className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden />
                      {b}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="mt-8 flex flex-wrap items-end justify-between gap-6 border-t border-[var(--d-line)] pt-7">
                  <div>
                    <p className="text-[0.66rem] uppercase tracking-[0.2em] text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]">
                      {content.priceLabel}
                    </p>
                    <p className="mt-1 text-[2rem] font-semibold leading-none text-[var(--d-gold)] [font-family:var(--demo-mono)]">
                      {fmtBRL(FEATURED.price)}
                    </p>
                    <p className="mt-2 text-[0.75rem] text-[var(--d-ink-soft)]">{content.priceNote}</p>
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={waLink(content.whatsappMsg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 rounded-full bg-[var(--d-gold)] px-5 py-2.5 text-[0.85rem] font-semibold text-[#141008] shadow-[0_0_26px_rgba(217,164,65,0.3)] transition-transform hover:scale-[1.03] ${FOCUS}`}
                  >
                    <MessageCircle className="h-4 w-4" strokeWidth={2} />
                    {content.ctaInterest}
                  </a>
                  <button
                    type="button"
                    onClick={() => scrollToId("visita")}
                    className={`flex items-center gap-2 rounded-full border border-[var(--d-line)] px-5 py-2.5 text-[0.85rem] font-medium text-[var(--d-ink)] transition-colors hover:border-[var(--d-gold)]/50 hover:bg-[var(--d-panel)] ${FOCUS}`}
                  >
                    <CalendarCheck className="h-4 w-4 text-[var(--d-gold)]" strokeWidth={1.8} />
                    {content.ctaTestDrive}
                  </button>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
