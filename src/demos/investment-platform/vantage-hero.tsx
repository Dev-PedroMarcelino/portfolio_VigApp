"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowRight } from "lucide-react";
import type { VantageContent } from "./content";
import { scrollToId } from "./ui";

const HERO_IMG =
  "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=2000&q=80";

export function VantageHero({ content }: { content: VantageContent["hero"] }) {
  const reduced = useReducedMotion();

  const fade = (delay: number) => ({
    initial: reduced ? undefined : { opacity: 0, y: 26 },
    animate: reduced ? undefined : { opacity: 1, y: 0 },
    transition: {
      duration: 0.9,
      delay,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  });

  return (
    <section className="relative isolate flex min-h-[94vh] flex-col justify-end overflow-hidden">
      {/* Duotoned trading-floor backdrop, art-directed under heavy navy glass. */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={HERO_IMG}
          alt={content.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40 saturate-[0.35]"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(11,18,33,0.78) 0%, rgba(11,18,33,0.55) 42%, rgba(11,18,33,0.96) 86%, #0B1221 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(58% 48% at 72% 30%, rgba(209,177,102,0.14) 0%, rgba(209,177,102,0) 70%)",
          }}
        />
      </div>

      <div className="mx-auto w-full max-w-6xl px-5 pb-20 pt-36 sm:pb-24">
        <motion.p
          {...fade(0.05)}
          className="mb-8 flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-[var(--d-gold)]"
        >
          <span className="h-px w-10 bg-[var(--d-gold)]/70" aria-hidden />
          {content.kicker}
        </motion.p>

        <h1 className="max-w-4xl [font-family:var(--demo-display)] text-[clamp(3rem,9vw,6.5rem)] leading-[0.98] tracking-tight text-[var(--d-ink)]">
          <motion.span {...fade(0.15)} className="block">
            {content.titleTop}
          </motion.span>
          <motion.span {...fade(0.28)} className="block italic text-[var(--d-gold)]">
            {content.titleItalic}
          </motion.span>
          <motion.span {...fade(0.41)} className="block">
            {content.titleBottom}
          </motion.span>
        </h1>

        <motion.p
          {...fade(0.55)}
          className="mt-8 max-w-xl text-[0.95rem] leading-relaxed text-[var(--d-ink-soft)]"
        >
          {content.thesis}
        </motion.p>

        <motion.div {...fade(0.68)} className="mt-10 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => scrollToId("simulator")}
            className="group flex items-center gap-2.5 rounded-full bg-[var(--d-gold)] px-7 py-3.5 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-[#0B1221] transition-transform hover:scale-[1.03]"
          >
            {content.ctaPrimary}
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
              strokeWidth={2.2}
            />
          </button>
          <button
            type="button"
            onClick={() => scrollToId("allocation")}
            className="group flex items-center gap-2.5 rounded-full border border-[var(--d-ink)]/25 px-7 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[var(--d-ink)] transition-colors hover:border-[var(--d-gold)]/60 hover:text-[var(--d-gold)]"
          >
            {content.ctaSecondary}
            <ArrowDownRight className="h-3.5 w-3.5" strokeWidth={2} />
          </button>
        </motion.div>

        <motion.dl
          {...fade(0.82)}
          className="mt-16 grid max-w-2xl grid-cols-3 divide-x divide-[var(--d-line)] border-t border-[var(--d-line)] pt-7"
        >
          {content.stats.map((stat, i) => (
            <div key={stat.label} className={`flex flex-col-reverse ${i === 0 ? "pr-5" : "px-5"}`}>
              <dt className="mt-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[var(--d-ink-soft)]">
                {stat.label}
              </dt>
              <dd className="[font-family:var(--demo-display)] text-2xl text-[var(--d-gold)] sm:text-3xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
