"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { LumiereContent } from "./content";

const EASE_SLOW: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Hero({ content }: { content: LumiereContent["hero"] }) {
  const reduceMotion = useReducedMotion();

  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2000&q=80"
          alt={content.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,12,8,0.72)_0%,rgba(14,12,8,0.45)_42%,rgba(14,12,8,0.82)_78%,#0E0C08_100%)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_38%,rgba(14,12,8,0.65)_100%)]"
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-6 pb-28 pt-40 text-center">
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.2, ease: EASE_SLOW }}
          className="flex items-center gap-4 text-[10px] font-medium uppercase tracking-[0.5em] text-[var(--d-gold)]"
        >
          <span aria-hidden className="h-px w-10 bg-[var(--d-line)]" />
          {content.eyebrow}
          <span aria-hidden className="h-px w-10 bg-[var(--d-line)]" />
        </motion.p>

        <h1 className="mt-10 [font-family:var(--demo-display)] text-5xl font-medium leading-[1.05] text-[var(--d-ink)] sm:text-7xl lg:text-8xl">
          <motion.span
            initial={reduceMotion ? false : { opacity: 0, letterSpacing: "0.34em" }}
            animate={{ opacity: 1, letterSpacing: "0.02em" }}
            transition={{ duration: 2.6, delay: 0.35, ease: EASE_SLOW }}
            className="block"
          >
            {content.title}
          </motion.span>
          <motion.span
            initial={reduceMotion ? false : { opacity: 0, letterSpacing: "0.3em" }}
            animate={{ opacity: 1, letterSpacing: "0.01em" }}
            transition={{ duration: 2.6, delay: 0.7, ease: EASE_SLOW }}
            className="block italic text-[var(--d-gold-bright)]"
          >
            {content.titleItalic}
          </motion.span>
        </h1>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.2, ease: EASE_SLOW }}
          className="mt-8 max-w-2xl text-sm font-light leading-relaxed text-[var(--d-ink-soft)] sm:text-base"
        >
          {content.lede}
        </motion.p>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.5, ease: EASE_SLOW }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#reserve"
            className="border border-[var(--d-gold)] bg-[var(--d-gold)] px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#0E0C08] transition-colors duration-300 hover:bg-transparent hover:text-[var(--d-gold)]"
          >
            {content.primaryCta}
          </a>
          <a
            href="#menu"
            className="border border-[var(--d-line)] px-8 py-3.5 text-[11px] font-medium uppercase tracking-[0.3em] text-[var(--d-ink)] transition-colors duration-300 hover:border-[var(--d-gold)] hover:text-[var(--d-gold)]"
          >
            {content.secondaryCta}
          </a>
        </motion.div>
      </div>

      <div className="relative z-10 border-t border-[var(--d-line-soft)]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-6 sm:flex-row">
          <ul className="flex flex-col items-center gap-2 sm:flex-row sm:gap-10">
            {content.accolades.map((accolade) => (
              <li
                key={accolade}
                className="text-[10px] uppercase tracking-[0.28em] text-[var(--d-ink-faint)]"
              >
                {accolade}
              </li>
            ))}
          </ul>
          <div className="hidden items-center gap-3 lg:flex">
            <span className="text-[10px] uppercase tracking-[0.35em] text-[var(--d-ink-faint)]">
              {content.scrollCue}
            </span>
            <motion.span
              aria-hidden
              animate={reduceMotion ? undefined : { scaleY: [0.2, 1, 0.2] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              className="block h-8 w-px origin-top bg-[var(--d-gold)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
