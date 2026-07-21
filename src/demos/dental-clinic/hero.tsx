"use client";

import Image from "next/image";
import { ArrowRight, CalendarClock, Star } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { HeroContent } from "./content";
import { FloatingBlob, Gloss, scrollToId } from "./ui";

const HERO_IMG =
  "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1400&q=80";

export function Hero({ content }: { content: HeroContent }) {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-10 sm:px-10 sm:pb-28 sm:pt-16 lg:px-16">
      {/* Ambient blobs behind everything */}
      <FloatingBlob
        className="-left-32 top-10 h-[26rem] w-[26rem] rounded-[58%_42%_55%_45%/55%_48%_52%_45%] opacity-70 blur-2xl"
        style={{ background: "radial-gradient(circle at 35% 30%, #FFFFFF 0%, #BBDCF2 60%, transparent 100%)" }}
        duration={11}
      />
      <FloatingBlob
        className="-right-40 top-1/3 h-[30rem] w-[30rem] rounded-[45%_55%_48%_52%/52%_45%_55%_48%] opacity-60 blur-2xl"
        style={{ background: "radial-gradient(circle at 60% 40%, #D0F0F7 0%, #9FD1F2 55%, transparent 100%)" }}
        duration={13}
        delay={1.2}
      />
      <FloatingBlob
        className="bottom-0 left-1/3 h-64 w-64 rounded-[52%_48%_58%_42%/48%_58%_42%_52%] opacity-50 blur-xl"
        style={{ background: "radial-gradient(circle at 50% 50%, #FFFFFF 0%, #CBE7F9 65%, transparent 100%)" }}
        duration={9}
        delay={0.6}
        drift={12}
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="inline-flex items-center gap-2 rounded-full border border-[var(--d-line)] bg-white/70 px-4 py-1.5 text-xs font-semibold text-[var(--d-accent-deep)] backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--d-aqua)] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--d-accent)]" />
              </span>
              {content.kicker}
            </p>

            <h1 className="mt-6 [font-family:var(--demo-display)] text-[2.6rem] font-bold leading-[1.05] tracking-tight text-[var(--d-ink)] sm:text-6xl lg:text-[4.2rem]">
              {content.titleTop}{" "}
              <span className="relative inline-block bg-gradient-to-r from-[var(--d-accent)] to-[var(--d-aqua)] bg-clip-text text-transparent">
                {content.titleAccent}
                <svg
                  aria-hidden
                  viewBox="0 0 220 22"
                  className="absolute -bottom-2 left-0 w-full"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M4 16 Q 110 2 216 14"
                    fill="none"
                    stroke="#5FC2D9"
                    strokeWidth="5"
                    strokeLinecap="round"
                    opacity="0.55"
                  />
                </svg>
              </span>{" "}
              {content.titleBottom}
            </h1>

            <p className="mt-6 max-w-lg text-base leading-relaxed text-[var(--d-ink-soft)] sm:text-lg">
              {content.sub}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => scrollToId("appointment")}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--d-accent)] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_18px_40px_-16px_rgba(46,124,192,0.9)] transition-transform hover:scale-[1.03]"
              >
                {content.ctaPrimary}
                <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
              </button>
              <button
                type="button"
                onClick={() => scrollToId("treatments")}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--d-accent)]/30 bg-white/70 px-7 py-3.5 text-sm font-semibold text-[var(--d-accent-deep)] backdrop-blur transition-colors hover:bg-white"
              >
                {content.ctaSecondary}
              </button>
            </div>

            <dl className="mt-12 grid max-w-md grid-cols-3 gap-6">
              {content.stats.map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <dt className="order-2 mt-1 text-xs leading-snug text-[var(--d-ink-soft)]">{stat.label}</dt>
                  <dd className="order-1 [font-family:var(--demo-display)] text-2xl font-bold text-[var(--d-ink)] sm:text-3xl">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>

        {/* Blob-masked photograph with glossy sheen and floating chips */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div
            className="relative aspect-[4/5] overflow-hidden shadow-[0_40px_80px_-40px_rgba(19,74,120,0.55)]"
            style={{ borderRadius: "58% 42% 52% 48% / 50% 55% 45% 50%" }}
          >
            <Image
              src={HERO_IMG}
              alt={content.imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 42vw, 92vw"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(160deg, rgba(46,124,192,0.28) 0%, rgba(233,244,252,0) 45%, rgba(95,194,217,0.22) 100%)",
              }}
            />
            <Gloss />
          </div>

          <FloatingBlob
            className="-right-6 top-8 sm:-right-10"
            drift={10}
            duration={7}
          >
            <div className="flex items-center gap-3 rounded-2xl border border-white/60 bg-white/85 px-4 py-3 shadow-[0_20px_40px_-20px_rgba(19,74,120,0.5)] backdrop-blur-xl">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--d-bg)] text-[var(--d-accent)]">
                <Star className="h-4 w-4 fill-current" strokeWidth={0} />
              </span>
              <div>
                <p className="[font-family:var(--demo-display)] text-lg font-bold leading-none text-[var(--d-ink)]">
                  {content.ratingValue}
                </p>
                <p className="mt-1 max-w-[9.5rem] text-[0.65rem] leading-tight text-[var(--d-ink-soft)]">
                  {content.ratingLabel}
                </p>
              </div>
            </div>
          </FloatingBlob>

          <FloatingBlob
            className="-left-4 bottom-10 sm:-left-10"
            drift={12}
            duration={8}
            delay={0.8}
          >
            <div className="flex items-center gap-3 rounded-2xl border border-white/60 bg-white/85 px-4 py-3 shadow-[0_20px_40px_-20px_rgba(19,74,120,0.5)] backdrop-blur-xl">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--d-bg)] text-[var(--d-accent)]">
                <CalendarClock className="h-4 w-4" strokeWidth={2} />
              </span>
              <div>
                <p className="text-[0.65rem] uppercase tracking-wider text-[var(--d-ink-soft)]">
                  {content.openLabel}
                </p>
                <p className="[font-family:var(--demo-display)] text-sm font-bold text-[var(--d-ink)]">
                  {content.openValue}
                </p>
              </div>
            </div>
          </FloatingBlob>
        </motion.div>
      </div>
    </section>
  );
}
