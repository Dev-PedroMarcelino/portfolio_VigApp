"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import type { HeroContent } from "./content";
import { Crest, DoubleRule, scrollToId, unsplash } from "./ui";

export function Hero({ content }: { content: HeroContent }) {
  const reduce = useReducedMotion() ?? false;

  return (
    <section className="relative overflow-hidden bg-[var(--d-crimson-deep)] text-[var(--d-parchment)]">
      {/* photographic backdrop, art-directed with a deep crimson duotone */}
      <div className="absolute inset-0">
        <Image
          src={unsplash("photo-1541339907198-e08756dedf3f", 2000)}
          alt={content.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[var(--d-crimson-deep)]/78 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--d-crimson-deep)]/70 via-[var(--d-crimson-deep)]/55 to-[var(--d-crimson-deep)]" />
      </div>

      {/* engraved corner frame */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-4 rounded-[2px] border border-[var(--d-parchment)]/20 sm:inset-6"
      />

      <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-6xl flex-col items-center justify-center px-6 py-24 text-center">
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <Crest
            className="h-24 w-24 sm:h-28 sm:w-28"
            stroke="var(--d-parchment)"
            accent="var(--d-gold)"
          />
        </motion.div>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-[var(--d-parchment)]/70"
        >
          {content.established}
        </motion.p>

        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18 }}
          className="mt-5 max-w-3xl [font-family:var(--demo-display)] text-4xl font-normal leading-[1.08] tracking-[-0.01em] sm:text-6xl"
        >
          {content.titleLead}{" "}
          <span className="italic text-[var(--d-gold)]">{content.titleEmphasis}</span>{" "}
          {content.titleTail}
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.28 }}
          className="mt-6 max-w-xl text-base leading-relaxed text-[var(--d-parchment)]/80 sm:text-lg"
        >
          {content.subhead}
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.36 }}
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
        >
          <button
            type="button"
            onClick={() => scrollToId("programs")}
            className="group inline-flex items-center gap-2 rounded-full bg-[var(--d-parchment)] px-7 py-3.5 text-[0.82rem] font-semibold uppercase tracking-[0.14em] text-[var(--d-crimson-deep)] transition-transform hover:-translate-y-0.5"
          >
            {content.ctaPrimary}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={() => scrollToId("research")}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--d-parchment)]/35 px-7 py-3.5 text-[0.82rem] font-semibold uppercase tracking-[0.14em] text-[var(--d-parchment)] transition-colors hover:bg-[var(--d-parchment)]/10"
          >
            {content.ctaSecondary}
          </button>
        </motion.div>

        {/* motto plate */}
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-14 w-full max-w-xs"
        >
          <DoubleRule color="var(--d-gold)" />
          <p className="mt-3 [font-family:var(--demo-display)] text-lg italic text-[var(--d-parchment)]">
            {content.motto}
          </p>
          <p className="mt-1 text-[0.68rem] uppercase tracking-[0.28em] text-[var(--d-parchment)]/55">
            {content.mottoTranslation}
          </p>
        </motion.div>
      </div>

      {/* ribbon */}
      <div className="relative z-10 border-t border-[var(--d-parchment)]/15 bg-[var(--d-crimson-deep)]/60 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-3 px-6 py-3.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--d-gold)]" aria-hidden />
          <p className="text-center text-[0.72rem] font-medium uppercase tracking-[0.18em] text-[var(--d-parchment)]/80">
            {content.ribbon}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => scrollToId("programs")}
        aria-label={content.scrollHint}
        className="absolute bottom-24 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-1 text-[var(--d-parchment)]/60 transition-colors hover:text-[var(--d-parchment)] lg:flex"
      >
        <span className="text-[0.62rem] uppercase tracking-[0.24em]">{content.scrollHint}</span>
        <motion.span
          animate={reduce ? undefined : { y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-4 w-4" strokeWidth={2} />
        </motion.span>
      </button>
    </section>
  );
}
