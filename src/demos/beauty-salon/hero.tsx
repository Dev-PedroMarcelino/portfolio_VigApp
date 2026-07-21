"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { type EclatContent, unsplash } from "./content";

const EASE_SLOW: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Hero({ content }: { content: EclatContent["hero"] }) {
  const reduceMotion = useReducedMotion();

  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={unsplash("photo-1522337660859-02fbefca4702", 2000)}
          alt={content.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(246,237,232,0.62)_0%,rgba(246,237,232,0.38)_38%,rgba(246,237,232,0.74)_74%,#F6EDE8_100%)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 mix-blend-multiply bg-[linear-gradient(140deg,rgba(138,75,94,0.32)_0%,rgba(42,23,31,0.08)_46%,rgba(176,141,87,0.22)_100%)]"
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-6 pb-32 pt-40 text-center">
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.2, ease: EASE_SLOW }}
          className="flex items-center gap-4 text-[10px] font-medium uppercase tracking-[0.5em] text-[var(--d-accent-deep)]"
        >
          <span aria-hidden className="h-px w-10 bg-[var(--d-line)]" />
          {content.eyebrow}
          <span aria-hidden className="h-px w-10 bg-[var(--d-line)]" />
        </motion.p>

        <h1 className="mt-9 [font-family:var(--demo-display)] text-5xl font-medium leading-[1.02] text-[var(--d-plum)] sm:text-7xl lg:text-8xl">
          <motion.span
            initial={reduceMotion ? false : { opacity: 0, letterSpacing: "0.3em" }}
            animate={{ opacity: 1, letterSpacing: "0.01em" }}
            transition={{ duration: 2.4, delay: 0.35, ease: EASE_SLOW }}
            className="block"
          >
            {content.title}
          </motion.span>
          <motion.span
            initial={reduceMotion ? false : { opacity: 0, letterSpacing: "0.26em" }}
            animate={{ opacity: 1, letterSpacing: "0.01em" }}
            transition={{ duration: 2.4, delay: 0.7, ease: EASE_SLOW }}
            className="block italic text-[var(--d-accent)]"
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
          className="mt-11 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#booking"
            className="border border-[var(--d-accent)] bg-[var(--d-accent)] px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--d-on-plum)] transition-colors duration-300 hover:bg-transparent hover:text-[var(--d-accent)]"
          >
            {content.primaryCta}
          </a>
          <a
            href="#services"
            className="border border-[var(--d-line)] px-8 py-3.5 text-[11px] font-medium uppercase tracking-[0.28em] text-[var(--d-ink)] transition-colors duration-300 hover:border-[var(--d-accent)] hover:text-[var(--d-accent)]"
          >
            {content.secondaryCta}
          </a>
        </motion.div>
      </div>

      <div className="relative z-10 border-t border-[var(--d-line-soft)]">
        <div className="mx-auto grid max-w-5xl grid-cols-1 divide-y divide-[var(--d-line-soft)] px-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {content.stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-1.5 py-6 text-center sm:py-7"
            >
              <span className="[font-family:var(--demo-display)] text-3xl text-[var(--d-accent)] sm:text-4xl">
                {stat.value}
              </span>
              <span className="text-[9px] uppercase tracking-[0.32em] text-[var(--d-ink-faint)]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
