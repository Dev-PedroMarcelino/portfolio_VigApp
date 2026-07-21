"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { HeroContent, HeroStat } from "./content";
import { CarbonTexture, Speedlines, scrollToId, useCountUp } from "./ui";

const HERO_IMG =
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2000&q=80";

function HeroStatBlock({ stat, reduced }: { stat: HeroStat; reduced: boolean }) {
  const value = useCountUp(stat.value, stat.decimals, true, reduced);
  const display = stat.value % 1 === 0 && stat.decimals === 0
    ? Math.round(value).toLocaleString("en-US")
    : value.toFixed(stat.decimals);
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-baseline gap-1">
        <span className="[font-family:var(--demo-display)] text-3xl leading-none text-[var(--d-ink)] tabular-nums sm:text-4xl">
          {display}
        </span>
        <span className="text-sm font-semibold text-[var(--d-accent-soft)]">{stat.suffix}</span>
      </div>
      <span className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[var(--d-ink-soft)]">
        {stat.label}
      </span>
    </div>
  );
}

export function ApexHero({ content }: { content: HeroContent }) {
  const reduced = useReducedMotion() ?? false;

  return (
    <section className="relative overflow-hidden bg-[var(--d-carbon)]" id="top">
      {/* backdrop photograph, heavily art-directed */}
      <div className="absolute inset-0">
        <Image
          src={HERO_IMG}
          alt={content.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--d-carbon)] via-[var(--d-carbon)]/70 to-[var(--d-carbon)]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--d-carbon)] via-transparent to-transparent" />
        <CarbonTexture opacity={0.25} />
      </div>

      <Speedlines className="right-0 top-0 h-full w-1/2 opacity-70" />

      <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-end px-5 pb-16 pt-28 sm:px-8">
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-5 flex items-center gap-3 text-[0.66rem] font-semibold uppercase tracking-[0.34em] text-[var(--d-accent-soft)]"
        >
          <span className="inline-block h-2.5 w-[3px] skew-x-[-18deg] bg-[var(--d-accent)]" aria-hidden />
          {content.kicker}
        </motion.p>

        <motion.h1
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="[font-family:var(--demo-display)] text-[13vw] uppercase leading-[0.92] tracking-[-0.02em] text-[var(--d-ink)] sm:text-7xl lg:text-8xl"
        >
          {content.model}
        </motion.h1>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12 }}
          className="mt-4 max-w-md text-sm leading-relaxed text-[var(--d-ink-soft)] sm:text-base"
        >
          <span className="[font-family:var(--demo-display)] mb-2 block text-lg text-[var(--d-ink)]">
            {content.line1} {content.line2}
          </span>
          {content.sub}
        </motion.p>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <button
            type="button"
            onClick={() => scrollToId("configurator")}
            className="skew-x-[-8deg] bg-[var(--d-accent)] px-7 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white transition-all hover:bg-[var(--d-accent-soft)]"
          >
            <span className="inline-block skew-x-[8deg]">{content.ctaBuild}</span>
          </button>
          <button
            type="button"
            onClick={() => scrollToId("testdrive")}
            className="skew-x-[-8deg] border border-[var(--d-line)] bg-white/5 px-7 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--d-ink)] backdrop-blur-sm transition-colors hover:border-[var(--d-metal-light)]"
          >
            <span className="inline-block skew-x-[8deg]">{content.ctaDrive}</span>
          </button>
        </motion.div>

        {/* counting stats bar */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-12 grid max-w-2xl grid-cols-3 gap-4 border-t border-[var(--d-line)] pt-6"
        >
          {content.stats.map((stat) => (
            <HeroStatBlock key={stat.label} stat={stat} reduced={reduced} />
          ))}
        </motion.div>
      </div>

      {/* scrolling technical marquee */}
      <div className="relative z-10 overflow-hidden border-y border-[var(--d-line)] bg-black/40 py-3">
        <motion.div
          className="flex whitespace-nowrap"
          animate={reduced ? undefined : { x: ["0%", "-50%"] }}
          transition={{ duration: 26, ease: "linear", repeat: Infinity }}
        >
          {[0, 1].map((n) => (
            <span
              key={n}
              className="px-4 text-[0.64rem] font-semibold uppercase tracking-[0.3em] text-[var(--d-metal-light)]"
            >
              {content.marquee.repeat(3)}
            </span>
          ))}
        </motion.div>
      </div>

      <button
        type="button"
        onClick={() => scrollToId("lineup")}
        className="absolute bottom-24 right-6 z-10 hidden items-center gap-2 text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-[var(--d-ink-soft)] transition-colors hover:text-[var(--d-ink)] lg:flex"
      >
        {content.scrollHint}
        <ChevronDown className="h-3.5 w-3.5 animate-bounce" strokeWidth={2} />
      </button>
    </section>
  );
}
