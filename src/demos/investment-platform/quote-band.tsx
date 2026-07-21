"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { VantageContent } from "./content";

const QUOTE_IMG =
  "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1800&q=80";

export function QuoteBand({ content }: { content: VantageContent["quote"] }) {
  const reduced = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden border-t border-[var(--d-line)] py-28 sm:py-36">
      <div className="absolute inset-0 -z-10">
        <Image
          src={QUOTE_IMG}
          alt={content.imageAlt}
          fill
          sizes="100vw"
          className="object-cover opacity-25 saturate-[0.25]"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #0B1221 0%, rgba(11,18,33,0.72) 35%, rgba(11,18,33,0.72) 65%, #0B1221 100%)",
          }}
        />
      </div>

      <motion.figure
        initial={reduced ? false : { opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-4xl px-5 text-center"
      >
        <span
          aria-hidden
          className="mx-auto block [font-family:var(--demo-display)] text-7xl leading-none text-[var(--d-gold)]/60"
        >
          &ldquo;
        </span>
        <blockquote className="mt-2 [font-family:var(--demo-display)] text-2xl italic leading-snug text-[var(--d-ink)] sm:text-[2.1rem]">
          {content.text}
        </blockquote>
        <figcaption className="mt-8">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--d-gold)]">
            {content.attribution}
          </p>
          <p className="mt-1 text-[0.66rem] uppercase tracking-[0.2em] text-[var(--d-ink-soft)]">{content.role}</p>
        </figcaption>
      </motion.figure>
    </section>
  );
}
