"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Quote } from "lucide-react";
import type { LawContent } from "./content";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const IMG =
  "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1400&q=80";

export function LegacyQuote({ content }: { content: LawContent["legacy"] }) {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-[var(--d-navy-deep)] py-24 sm:py-32">
      <div aria-hidden className="absolute inset-0 -z-10">
        <Image
          src={IMG}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-[0.20] [filter:grayscale(0.6)_contrast(1.02)]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--d-navy-deep),rgba(14,24,36,0.86),var(--d-navy-deep))]" />
        <div className="absolute inset-0 bg-[radial-gradient(90%_90%_at_50%_0%,rgba(140,111,63,0.16),transparent_60%)]" />
      </div>

      <motion.figure
        initial={reduce ? undefined : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.9, ease: EASE }}
        className="mx-auto max-w-3xl px-6 text-center"
      >
        <Quote aria-hidden className="mx-auto h-9 w-9 text-[var(--d-bronze)]" strokeWidth={1.2} />
        <blockquote className="[font-family:var(--demo-display-italic)] mt-8 text-[clamp(1.6rem,3.6vw,2.7rem)] font-normal leading-[1.28] text-[var(--d-ink)]">
          {content.quote}
        </blockquote>
        <figcaption className="mt-9 flex flex-col items-center gap-1.5">
          <span aria-hidden className="h-px w-10 bg-[var(--d-bronze)]" />
          <span className="[font-family:var(--demo-display)] mt-3 text-lg font-bold tracking-[0.04em] text-[var(--d-bronze-bright)]">
            {content.attribution}
          </span>
          <span className="text-[10px] uppercase tracking-[0.32em] text-[var(--d-ink-faint)]">
            {content.role}
          </span>
        </figcaption>
      </motion.figure>
    </section>
  );
}
