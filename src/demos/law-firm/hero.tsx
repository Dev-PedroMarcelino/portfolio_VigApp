"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import type { LawContent } from "./content";
import { EngravedRule } from "./castellan-reis";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const HERO_IMG =
  "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1600&q=80";

export function Hero({
  content,
  consultCta,
}: {
  content: LawContent["hero"];
  consultCta: string;
}) {
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduce ? undefined : { opacity: 0, y: 26 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease: EASE, delay },
  });

  return (
    <section className="relative isolate flex min-h-screen items-center overflow-hidden bg-[var(--d-navy-deep)] pt-24">
      {/* Duotone photographic backdrop, art-directed to read intentional even if subject is off */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <Image
          src={HERO_IMG}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-[0.32] [filter:grayscale(0.55)_contrast(1.05)]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_78%_18%,rgba(140,111,63,0.28),transparent_58%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--d-navy-deep)_18%,rgba(14,24,36,0.72)_54%,rgba(14,24,36,0.32)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,transparent,var(--d-navy))]" />
      </div>

      {/* Faint engraved establishment monogram */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 select-none [font-family:var(--demo-display)] text-[19vw] font-bold leading-none text-[var(--d-bronze)] opacity-[0.06] lg:block"
      >
        {content.established}
      </span>

      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="max-w-3xl">
          <motion.div {...rise(0)} className="flex items-center gap-4">
            <EngravedRule />
            <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-[var(--d-bronze-bright)]">
              {content.eyebrow}
            </span>
          </motion.div>

          <motion.h1
            {...rise(0.08)}
            className="[font-family:var(--demo-display)] mt-8 text-[clamp(2.6rem,7vw,5.2rem)] font-normal leading-[0.98] tracking-[-0.01em] text-[var(--d-ink)]"
          >
            {content.titleLead}{" "}
            <span className="[font-family:var(--demo-display-italic)] text-[var(--d-bronze-bright)]">
              {content.titleAccent}
            </span>{" "}
            {content.titleTrail}
          </motion.h1>

          <motion.p
            {...rise(0.16)}
            className="[font-family:var(--demo-display-italic)] mt-8 max-w-xl text-lg font-normal leading-relaxed text-[var(--d-ink-soft)]"
          >
            {content.statement}
          </motion.p>

          <motion.p {...rise(0.22)} className="mt-5 max-w-lg text-sm leading-relaxed text-[var(--d-ink-soft)]">
            {content.lede}
          </motion.p>

          <motion.div {...rise(0.3)} className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#consult"
              className="group inline-flex items-center gap-2.5 bg-[var(--d-bronze)] px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.26em] text-[var(--d-navy-deep)] transition-colors duration-300 hover:bg-[var(--d-bronze-bright)]"
            >
              {content.primaryCta}
              <ArrowUpRight
                aria-hidden
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.6}
              />
            </a>
            <a
              href="#practice"
              className="inline-flex items-center gap-2.5 border border-[var(--d-line)] px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.26em] text-[var(--d-ink)] transition-colors duration-300 hover:border-[var(--d-bronze-bright)] hover:text-[var(--d-bronze-bright)]"
            >
              {content.secondaryCta}
            </a>
          </motion.div>

          <motion.dl
            {...rise(0.4)}
            className="mt-16 grid max-w-xl grid-cols-3 divide-x divide-[var(--d-line-soft)] border-t border-[var(--d-line-soft)] pt-7"
          >
            {content.hallmarks.map((item) => (
              <div key={item.label} className="px-4 first:pl-0">
                <dt className="[font-family:var(--demo-display)] text-3xl font-normal text-[var(--d-bronze-bright)] sm:text-4xl">
                  {item.value}
                </dt>
                <dd className="mt-2 text-[9px] uppercase tracking-[0.24em] text-[var(--d-ink-faint)]">
                  {item.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>

      <div className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex">
        <span className="text-[9px] uppercase tracking-[0.4em] text-[var(--d-ink-faint)]">
          {content.scrollCue}
        </span>
        <motion.span
          aria-hidden
          animate={reduce ? undefined : { y: [0, 7, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4 text-[var(--d-bronze)]" strokeWidth={1.4} />
        </motion.span>
      </div>

      <span className="sr-only">{content.establishedLabel}</span>
      {/* consultCta reserved for aria parity with header */}
      <span className="sr-only">{consultCta}</span>
    </section>
  );
}
