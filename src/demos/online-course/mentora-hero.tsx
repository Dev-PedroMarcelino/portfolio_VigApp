"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CalendarDays, Star, Users } from "lucide-react";
import type { HeroContent } from "./content";
import { scrollToId, unsplash } from "./ui";

export function MentoraHero({ content }: { content: HeroContent }) {
  const reduce = useReducedMotion();

  const rise = (delay: number) =>
    reduce
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.4, delay } }
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section
      className="relative overflow-hidden bg-[var(--d-charcoal)] text-[var(--d-cream)]"
      style={{ backgroundColor: "#1C1917" }}
    >
      {/* Amber glow field */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full opacity-40 blur-[120px]"
        style={{ background: "radial-gradient(circle, #F59E0B 0%, transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(245,158,11,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.06) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <div className="relative mx-auto grid max-w-6xl gap-14 px-5 pb-20 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pb-28 lg:pt-24">
        <div>
          <motion.div {...rise(0)}>
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--d-charcoal-line)] bg-[var(--d-charcoal-soft)] px-4 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--d-amber-soft)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--d-accent)]" aria-hidden />
              {content.kicker}
            </span>
          </motion.div>

          <motion.h1
            {...rise(0.08)}
            className="mt-7 [font-family:var(--demo-display)] text-[2.7rem] font-light leading-[1.02] tracking-[-0.02em] sm:text-6xl lg:text-[4.2rem]"
          >
            {content.titleTop}{" "}
            <span className="italic text-[var(--d-accent)]">{content.titleItalic}</span>
            <br />
            {content.titleBottom}
          </motion.h1>

          <motion.p
            {...rise(0.16)}
            className="mt-7 max-w-xl text-[1.02rem] leading-relaxed text-[var(--d-cream-dim)]"
          >
            {content.lede}
          </motion.p>

          <motion.div {...rise(0.24)} className="mt-9 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => scrollToId("enroll")}
              className="group inline-flex items-center gap-2 rounded-full bg-[var(--d-accent)] px-7 py-3.5 text-sm font-semibold text-[var(--d-charcoal)] transition-transform hover:scale-[1.03]"
            >
              {content.ctaPrimary}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.2} />
            </button>
            <button
              type="button"
              onClick={() => scrollToId("curriculum")}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--d-charcoal-line)] px-7 py-3.5 text-sm font-semibold text-[var(--d-cream)] transition-colors hover:bg-[var(--d-charcoal-soft)]"
            >
              {content.ctaSecondary}
            </button>
          </motion.div>

          <motion.dl {...rise(0.32)} className="mt-11 grid grid-cols-3 gap-6 border-t border-[var(--d-charcoal-line)] pt-7">
            <StatBlock icon={<CalendarDays className="h-4 w-4" strokeWidth={1.8} />} label={content.startLabel} value={content.startValue} />
            <StatBlock icon={<Users className="h-4 w-4" strokeWidth={1.8} />} label={content.seatsLabel} value={content.seatsValue} accent />
            <StatBlock icon={<Star className="h-4 w-4" strokeWidth={1.8} />} label={content.weeksLabel} value={content.weeksValue} />
          </motion.dl>
        </div>

        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.8rem] border border-[var(--d-charcoal-line)]">
            <Image
              src={unsplash("photo-1522202176988-66273c2fd55f", 1200)}
              alt={content.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 46vw"
              className="object-cover"
              priority
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{ background: "linear-gradient(180deg, rgba(28,25,23,0.15) 0%, rgba(28,25,23,0.05) 45%, rgba(28,25,23,0.72) 100%)" }}
            />
          </div>

          {/* Floating rating chip */}
          <div className="absolute -left-4 bottom-8 flex items-center gap-3 rounded-2xl border border-[var(--d-charcoal-line)] bg-[var(--d-charcoal-soft)]/95 px-4 py-3 shadow-2xl backdrop-blur-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--d-accent)] text-[var(--d-charcoal)]">
              <Star className="h-4 w-4 fill-current" strokeWidth={0} />
            </div>
            <div>
              <p className="text-[1.05rem] font-semibold leading-none text-[var(--d-cream)]">{content.ratingValue}</p>
              <p className="mt-1 text-[0.66rem] uppercase tracking-[0.18em] text-[var(--d-cream-dim)]">{content.ratingLabel}</p>
            </div>
          </div>

          <div className="absolute -right-3 top-6 rounded-2xl border border-[var(--d-charcoal-line)] bg-[var(--d-charcoal-soft)]/95 px-4 py-3 text-right shadow-2xl backdrop-blur-sm">
            <p className="[font-family:var(--demo-display)] text-xl font-medium leading-none text-[var(--d-accent)]">{content.gradsValue}</p>
            <p className="mt-1 text-[0.66rem] uppercase tracking-[0.18em] text-[var(--d-cream-dim)]">{content.gradsLabel}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function StatBlock({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div>
      <dt className="flex items-center gap-1.5 text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-[var(--d-cream-dim)]">
        <span className={accent ? "text-[var(--d-accent)]" : "text-[var(--d-cream-dim)]"}>{icon}</span>
        {label}
      </dt>
      <dd className={`mt-2 text-sm font-semibold leading-snug ${accent ? "text-[var(--d-accent)]" : "text-[var(--d-cream)]"}`}>
        {value}
      </dd>
    </div>
  );
}
