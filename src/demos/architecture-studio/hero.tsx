"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useReducedMotionSafe as useReducedMotion } from "@/components/demos/use-reduced-motion-safe";
import { ArrowDown } from "lucide-react";
import type { PrumoContent } from "./content";
import { VIDEOS } from "./content";

/**
 * Full-bleed video hero. The loop is muted/inline with an Unsplash poster as
 * fallback; under reduced motion the video is skipped entirely and the poster
 * stands in as a still. Copy sells outcome, not aesthetics: land value,
 * budget, delivered keys.
 */
export function Hero({ content }: { content: PrumoContent["hero"] }) {
  const reduced = useReducedMotion();

  const rise = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section id="top" aria-label={content.videoAria} className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-[#16130F]">
      <div className="absolute inset-0" aria-hidden>
        {reduced ? (
          <Image
            src={VIDEOS.hero.poster}
            alt={content.posterAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={VIDEOS.hero.src}
            poster={VIDEOS.hero.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            tabIndex={-1}
          />
        )}
        {/* Editorial scrim: darker at the base where the type sits. */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/30" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[88rem] px-5 pb-14 pt-36 sm:px-8 sm:pb-20">
        <motion.p
          {...rise(0.1)}
          className="[font-family:var(--demo-mono)] text-[11px] uppercase tracking-[0.32em] text-white/70"
        >
          {content.eyebrow}
        </motion.p>

        <motion.h1
          {...rise(0.2)}
          className="mt-6 max-w-4xl [font-family:var(--demo-display)] text-[2.6rem] leading-[1.04] tracking-[-0.01em] text-white sm:text-6xl lg:text-7xl"
        >
          {content.titleLead}{" "}
          <em className="italic text-[#D8BC9C]">{content.titleItalic}</em>{" "}
          {content.titleTail}
        </motion.h1>

        <motion.p
          {...rise(0.32)}
          className="mt-6 max-w-xl [font-family:var(--demo-body)] text-base leading-relaxed text-white/80 sm:text-lg"
        >
          {content.sub}
        </motion.p>

        <motion.div {...rise(0.44)} className="mt-9 flex flex-wrap items-center gap-4">
          <a
            href="#contato"
            className="bg-[var(--d-bg)] px-7 py-3.5 [font-family:var(--demo-body)] text-[12px] font-medium uppercase tracking-[0.2em] text-[var(--d-ink)] transition-transform duration-300 hover:-translate-y-0.5"
          >
            {content.ctaPrimary}
          </a>
          <a
            href="#projetos"
            className="border border-white/50 px-7 py-3.5 [font-family:var(--demo-body)] text-[12px] uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-white/10"
          >
            {content.ctaSecondary}
          </a>
        </motion.div>

        <motion.dl
          {...rise(0.56)}
          className="mt-14 flex max-w-2xl divide-x divide-white/20 border-t border-white/20 pt-6"
        >
          {content.stats.map((stat, i) => (
            <div key={stat.label} className={i === 0 ? "pr-6 sm:pr-10" : "px-6 sm:px-10"}>
              <dt className="sr-only">{stat.label}</dt>
              <dd className="[font-family:var(--demo-mono)] text-2xl text-white sm:text-3xl">
                {stat.value}
              </dd>
              <dd className="mt-1 [font-family:var(--demo-body)] text-[11px] uppercase tracking-[0.14em] text-white/60">
                {stat.label}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>

      <a
        href="#projetos"
        aria-label={content.scrollHint}
        className="absolute bottom-6 right-6 z-10 hidden h-11 w-11 place-items-center rounded-full border border-white/35 text-white/80 transition-colors duration-300 hover:bg-white/10 sm:grid"
      >
        <ArrowDown className={`h-4 w-4 ${reduced ? "" : "animate-bounce"}`} strokeWidth={1.5} />
      </a>
    </section>
  );
}
