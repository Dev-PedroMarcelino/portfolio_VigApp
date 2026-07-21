"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CalendarCheck, ChevronDown, Leaf, ShieldCheck } from "lucide-react";
import type { HeroContent, SpecialtyId, SpecialtyItem } from "./content";

const HERO_IMG =
  "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&w=1600&q=80";

export function AuroraHero({
  content,
  specialties,
  onBook,
}: {
  content: HeroContent;
  specialties: SpecialtyItem[];
  onBook: (specialty: SpecialtyId | null, doctorId: string | null) => void;
}) {
  const [specialty, setSpecialty] = useState<SpecialtyId>("cardiology");
  const reduce = useReducedMotion() ?? false;

  const enter = (delay: number) => ({
    initial: reduce ? undefined : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" as const, delay },
  });

  return (
    <section id="top" className="relative overflow-hidden bg-[var(--d-mint)]">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-12rem] h-[34rem] w-[34rem] rounded-full opacity-70"
        style={{ background: "radial-gradient(circle, rgba(29,138,126,0.16) 0%, rgba(29,138,126,0) 70%)" }}
      />
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-14 md:pt-20 lg:grid-cols-[1.05fr_1fr] lg:pb-28">
        <div>
          <motion.span
            {...enter(0)}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--d-accent)]/25 bg-[var(--d-card)] px-4 py-2 text-[0.72rem] font-semibold text-[var(--d-accent-deep)]"
          >
            <Leaf className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
            {content.badge}
          </motion.span>

          <motion.h1
            {...enter(0.08)}
            className="mt-6 text-[2.6rem] font-semibold leading-[1.08] tracking-tight text-[var(--d-ink)] md:text-6xl"
          >
            {content.titleTop}{" "}
            <em className="[font-family:var(--demo-display)] font-medium italic text-[var(--d-accent)]">
              {content.titleItalic}
            </em>
            {content.titleEnd}
          </motion.h1>

          <motion.p
            {...enter(0.16)}
            className="mt-5 max-w-lg leading-[1.85] text-[var(--d-ink-soft)]"
          >
            {content.sub}
          </motion.p>

          <motion.div {...enter(0.24)} className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onBook(null, null)}
              className="flex items-center gap-2 rounded-full bg-[var(--d-accent)] px-7 py-3.5 text-sm font-semibold text-[var(--d-foam)] shadow-[0_16px_32px_-14px_rgba(29,138,126,0.75)] transition-transform hover:scale-[1.03]"
            >
              <CalendarCheck className="h-4 w-4" strokeWidth={2} aria-hidden />
              {content.primaryCta}
            </button>
            <a
              href="#doctors"
              className="flex items-center gap-2 rounded-full border border-[var(--d-ink)]/15 bg-[var(--d-card)] px-7 py-3.5 text-sm font-semibold text-[var(--d-ink)] transition-colors hover:border-[var(--d-accent)]/50"
            >
              {content.secondaryCta}
              <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
            </a>
          </motion.div>

          <motion.dl
            {...enter(0.32)}
            className="mt-10 flex max-w-md items-start justify-between gap-4 border-t border-[var(--d-ink)]/10 pt-7"
          >
            {content.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="[font-family:var(--demo-display)] text-3xl italic tracking-tight text-[var(--d-ink)]">
                  {stat.value}
                </dd>
                <p className="mt-1 max-w-[8rem] text-[0.72rem] leading-snug text-[var(--d-ink-soft)]">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div {...enter(0.18)} className="relative">
          <div className="relative aspect-[4/4.4] overflow-hidden rounded-[2.5rem] shadow-[0_36px_70px_-40px_rgba(12,74,67,0.55)] sm:aspect-[4/3.4] lg:aspect-[4/4.4]">
            <Image
              src={HERO_IMG}
              alt={content.imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 540px, 92vw"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(165deg, rgba(234,246,244,0.16) 0%, rgba(12,74,67,0) 42%, rgba(12,74,67,0.5) 100%)",
              }}
            />
            <div className="absolute left-5 top-5 flex items-center gap-3 rounded-2xl bg-[var(--d-card)]/92 px-4 py-3 shadow-lg shadow-[rgba(12,74,67,0.18)] backdrop-blur">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--d-mint)] text-[var(--d-accent)]">
                <CalendarCheck className="h-4 w-4" strokeWidth={2} aria-hidden />
              </span>
              <span>
                <span className="block text-[0.72rem] font-bold text-[var(--d-ink)]">
                  {content.chipTitle}
                </span>
                <span className="block text-[0.68rem] text-[var(--d-ink-soft)]">
                  {content.chipSub}
                </span>
              </span>
            </div>
          </div>

          <div className="relative z-10 mx-4 -mt-16 rounded-[1.75rem] bg-[var(--d-card)] p-6 shadow-[0_30px_60px_-30px_rgba(12,74,67,0.4)] sm:mx-8">
            <h2 className="text-sm font-bold tracking-tight text-[var(--d-ink)]">
              {content.cardTitle}
            </h2>
            <label
              htmlFor="hero-specialty"
              className="mt-4 block text-[0.66rem] font-bold uppercase tracking-[0.22em] text-[var(--d-accent)]"
            >
              {content.cardSpecialtyLabel}
            </label>
            <div className="relative mt-2">
              <select
                id="hero-specialty"
                value={specialty}
                onChange={(event) => setSpecialty(event.target.value as SpecialtyId)}
                className="w-full appearance-none rounded-xl border border-[var(--d-line)] bg-[var(--d-mist)] px-4 py-3 pr-10 text-sm font-medium text-[var(--d-ink)] outline-none focus:border-[var(--d-accent)]"
              >
                {specialties.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--d-ink-soft)]"
                strokeWidth={2}
                aria-hidden
              />
            </div>
            <button
              type="button"
              onClick={() => onBook(specialty, null)}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--d-accent)] py-3.5 text-sm font-semibold text-[var(--d-foam)] transition-transform hover:scale-[1.02]"
            >
              {content.cardCta}
              <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
            </button>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-[0.7rem] text-[var(--d-ink-soft)]">
              <ShieldCheck className="h-3.5 w-3.5 text-[var(--d-accent)]" strokeWidth={2} aria-hidden />
              {content.cardHint}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
