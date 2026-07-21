"use client";

import Image from "next/image";
import { MapPin, Clock, Quote } from "lucide-react";
import type { AboutContent } from "./content";
import { Kicker, shot } from "./ui";

const ABOUT_IMG = "photo-1595341888016-a392ef81b7de";

export function AboutSection({ content }: { content: AboutContent }) {
  return (
    <section id="studio" className="scroll-mt-20 border-t border-[var(--d-line)] px-5 py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-[var(--d-line)]">
            <Image
              src={shot(ABOUT_IMG, 1000)}
              alt={content.imageAlt}
              fill
              sizes="(min-width: 1024px) 480px, 92vw"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(160deg, rgba(255,61,129,0.28) 0%, rgba(18,8,31,0.3) 45%, rgba(176,38,255,0.4) 100%)",
                mixBlendMode: "hard-light",
              }}
            />
          </div>

          {/* pull quote sticker */}
          <div className="absolute -bottom-6 -right-3 max-w-[16rem] rotate-[3deg] rounded-2xl border border-[var(--d-line)] bg-[var(--d-panel)] p-5 shadow-2xl shadow-black/40">
            <Quote className="h-5 w-5 text-[var(--d-accent)]" strokeWidth={2} aria-hidden />
            <p className="mt-2 text-sm leading-snug text-[var(--d-ink)]">{content.quote}</p>
            <p className="mt-2 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-[var(--d-accent)] [font-family:var(--demo-body)]">
              {content.quoteAuthor}
            </p>
          </div>
        </div>

        <div>
          <Kicker text={content.label} />
          <h2 className="mt-4 [font-family:var(--demo-display)] text-5xl leading-[0.95] tracking-tight text-[var(--d-ink)] md:text-6xl">
            {content.title}
          </h2>
          <p className="mt-5 text-lg leading-snug text-[var(--d-ink)]">{content.lead}</p>
          {content.paragraphs.map((p) => (
            <p key={p.slice(0, 24)} className="mt-4 text-[0.92rem] leading-relaxed text-[var(--d-ink-soft)]">
              {p}
            </p>
          ))}

          <div className="mt-8 grid grid-cols-3 gap-3">
            {content.stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-[var(--d-line)] bg-white/[0.02] px-4 py-4">
                <p className="[font-family:var(--demo-display)] text-3xl leading-none text-[var(--d-accent)]">
                  {s.value}
                </p>
                <p className="mt-2 text-[0.58rem] font-bold uppercase leading-tight tracking-[0.14em] text-[var(--d-ink-soft)] [font-family:var(--demo-body)]">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-[var(--d-line)] bg-white/[0.02] p-5">
              <p className="flex items-center gap-2 text-[0.58rem] font-bold uppercase tracking-[0.2em] text-[var(--d-accent)] [font-family:var(--demo-body)]">
                <MapPin className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
                {content.addressLabel}
              </p>
              {content.addressLines.map((line) => (
                <p key={line} className="mt-1.5 text-sm text-[var(--d-ink-soft)]">
                  {line}
                </p>
              ))}
            </div>
            <div className="rounded-2xl border border-[var(--d-line)] bg-white/[0.02] p-5">
              <p className="flex items-center gap-2 text-[0.58rem] font-bold uppercase tracking-[0.2em] text-[var(--d-accent)] [font-family:var(--demo-body)]">
                <Clock className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
                {content.hoursLabel}
              </p>
              {content.hours.map((line) => (
                <p key={line} className="mt-1.5 text-sm text-[var(--d-ink-soft)]">
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
