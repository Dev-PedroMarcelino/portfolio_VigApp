"use client";

import Image from "next/image";
import { BadgeCheck, Check } from "lucide-react";
import type { CtaContent } from "./content";
import { Stars } from "./ui";
import { WaitlistForm } from "./waitlist-form";

const SPACE_IMG =
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80";

export function WaitlistCta({ content, numberLocale }: { content: CtaContent; numberLocale: string }) {
  return (
    <section id="waitlist" className="scroll-mt-20 px-5 py-24 md:py-32">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-[var(--d-accent)]/30 shadow-[0_40px_120px_-40px_rgba(139,92,246,0.5)]">
        <div className="absolute inset-0" aria-hidden>
          <Image
            src={SPACE_IMG}
            alt=""
            fill
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="object-cover opacity-25 mix-blend-screen"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(120deg, rgba(11,11,18,0.92) 0%, rgba(30,17,64,0.82) 55%, rgba(11,11,18,0.9) 100%), radial-gradient(60% 80% at 80% 10%, rgba(139,92,246,0.35) 0%, transparent 70%)",
            }}
          />
          <Stars count={40} />
        </div>

        <div className="relative z-10 grid gap-12 p-8 md:p-14 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-[var(--d-accent)]/40 bg-[var(--d-accent)]/10 px-3.5 py-1.5 text-[0.64rem] font-semibold uppercase tracking-[0.28em] text-[var(--d-accent-soft)]">
              <BadgeCheck className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden />
              {content.kicker}
            </p>
            <h2 className="mt-5 [font-family:var(--demo-display)] text-3xl font-medium tracking-tight text-[var(--d-ink)] md:text-[2.6rem] md:leading-[1.08]">
              {content.title}
            </h2>
            <p className="mt-4 max-w-lg text-[0.95rem] leading-relaxed text-[var(--d-ink-dim)]">
              {content.sub}
            </p>
            <ul className="mt-7 space-y-3">
              {content.perks.map((perk) => (
                <li key={perk} className="flex items-start gap-2.5 text-sm text-[var(--d-ink)]">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--d-accent)]/20 text-[var(--d-accent-soft)]">
                    <Check className="h-3 w-3" strokeWidth={2.6} aria-hidden />
                  </span>
                  {perk}
                </li>
              ))}
            </ul>
            <p className="mt-7 inline-block rounded-xl border border-[var(--d-green)]/30 bg-[var(--d-green)]/[0.08] px-4 py-2.5 text-sm font-medium text-[var(--d-green)]">
              {content.priceNote}
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--d-line-bright)] bg-[#0D0D16]/90 p-6 backdrop-blur md:p-7">
            <WaitlistForm copy={content.form} numberLocale={numberLocale} idPrefix="cta" />
          </div>
        </div>
      </div>
    </section>
  );
}
