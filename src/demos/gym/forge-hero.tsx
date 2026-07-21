"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";
import type { HeroContent } from "./content";
import { scrollToId } from "./ui";

const HERO_IMG =
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80";

/** Outlined-text marquee — one continuous track duplicated for a seamless loop. */
function Marquee({ words, reduce }: { words: string[]; reduce: boolean }) {
  const track = [...words, ...words];
  return (
    <div className="relative flex overflow-hidden border-y border-[var(--d-line)] py-4" aria-hidden>
      <motion.div
        className="flex shrink-0 items-center gap-8 pr-8"
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 22, ease: "linear", repeat: Infinity }}
      >
        {track.map((word, i) => (
          <span key={i} className="flex items-center gap-8">
            <span
              className="[font-family:var(--demo-display)] text-4xl uppercase tracking-tight text-transparent sm:text-5xl"
              style={{ WebkitTextStroke: "1px #6B6B72" }}
            >
              {word}
            </span>
            <span className="h-2 w-2 rotate-45 bg-[var(--d-accent)]" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function ForgeHero({ content }: { content: HeroContent }) {
  const reduce = useReducedMotion() ?? false;

  return (
    <section id="top" className="relative overflow-hidden">
      {/* Background image, duotoned toward the blackout base */}
      <div className="absolute inset-0" aria-hidden>
        <Image
          src={HERO_IMG}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#0B0B0D]/78" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(11,11,13,0.55) 0%, rgba(11,11,13,0.35) 45%, #0B0B0D 100%)",
          }}
        />
        <div
          className="absolute -right-24 top-1/4 h-[38rem] w-[38rem] rounded-full opacity-40 blur-[120px]"
          style={{ background: "radial-gradient(circle, #D7FF3E 0%, transparent 68%)" }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 pb-14 pt-16 sm:pt-24">
        <motion.p
          initial={reduce ? undefined : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 border border-[var(--d-line-bright)] bg-[#0B0B0D]/60 px-3.5 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.24em] text-[var(--d-ink-dim)]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--d-accent)]" />
          {content.badge}
        </motion.p>

        <h1 className="mt-7 [font-family:var(--demo-display)] uppercase leading-[0.82] tracking-[-0.02em]">
          {content.titleLines.map((line, i) => (
            <motion.span
              key={line}
              initial={reduce ? undefined : { opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 * i }}
              className="block text-[3.6rem] sm:text-[6rem] lg:text-[8.5rem]"
              style={{ color: i === 1 ? "#D7FF3E" : "#F4F4F0" }}
            >
              {line}
            </motion.span>
          ))}
        </h1>

        <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <motion.p
            initial={reduce ? undefined : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-md text-[0.98rem] leading-relaxed text-[var(--d-ink-dim)]"
          >
            {content.sub}
          </motion.p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => scrollToId("join")}
              className="group inline-flex items-center gap-2 bg-[var(--d-accent)] px-6 py-3.5 text-[0.8rem] font-bold uppercase tracking-[0.12em] text-[#0B0B0D] transition-transform hover:-translate-y-0.5 [clip-path:polygon(6%_0,100%_0,94%_100%,0_100%)]"
            >
              {content.ctaPrimary}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.4} aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => scrollToId("programs")}
              className="inline-flex items-center gap-2 border border-[var(--d-line-bright)] px-6 py-3.5 text-[0.8rem] font-bold uppercase tracking-[0.12em] text-[var(--d-ink)] transition-colors hover:bg-white/5"
            >
              <Play className="h-3.5 w-3.5 fill-current" strokeWidth={0} aria-hidden />
              {content.ctaSecondary}
            </button>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-3 gap-4 border-t border-[var(--d-line)] pt-8">
          {content.stats.map((stat) => (
            <div key={stat.label}>
              <div className="[font-family:var(--demo-display)] text-3xl text-[var(--d-ink)] sm:text-5xl">
                {stat.value}
              </div>
              <div className="mt-1.5 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-[var(--d-ink-faint)] sm:text-xs">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Marquee words={content.marquee} reduce={reduce} />
    </section>
  );
}
