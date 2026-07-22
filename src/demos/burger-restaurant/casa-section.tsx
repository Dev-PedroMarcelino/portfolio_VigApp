"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useReducedMotionSafe as useReducedMotion } from "@/components/demos/use-reduced-motion-safe";
import type { GaragemContent } from "./content";
import { CASA_PHOTOS } from "./content";
import { Halftone, SectionLabel, Tape } from "./ui";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Polaroid pinned to the wall with masking tape; straightens on hover. */
function Polaroid({
  src,
  alt,
  caption,
  rotate,
  index,
  reduced,
}: {
  src: string;
  alt: string;
  caption: string;
  rotate: number;
  index: number;
  reduced: boolean;
}) {
  return (
    <motion.figure
      initial={reduced ? false : { opacity: 0, y: 34, rotate: rotate * 2 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: EASE, delay: reduced ? 0 : (index % 3) * 0.12 }}
      whileHover={reduced ? undefined : { rotate: 0, y: -6, zIndex: 10 }}
      className="relative bg-[var(--d-paper)] p-2.5 pb-3 shadow-[0_14px_34px_rgba(0,0,0,0.45)]"
    >
      <Tape className={`-top-3.5 ${index % 2 === 0 ? "left-6" : "right-8"}`} rotate={index % 2 === 0 ? -6 : 5} />
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
          className="object-cover"
        />
      </div>
      <figcaption className="px-1 pt-2.5 text-[0.72rem] font-medium tracking-wide text-[#4A3A2C] [font-family:var(--demo-mono)]">
        {caption}
      </figcaption>
    </motion.figure>
  );
}

export function CasaSection({ content }: { content: GaragemContent["casa"] }) {
  const reduced = useReducedMotion() ?? false;

  return (
    <section id="a-casa" className="relative scroll-mt-20 overflow-hidden bg-[var(--d-bg-soft)] py-20 sm:py-24">
      <Halftone className="inset-x-0 top-0 h-72" />

      <div className="relative z-10 mx-auto max-w-6xl px-5">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          {/* Copy */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: EASE }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <SectionLabel text={content.label} />
            <h2 className="mt-4 max-w-md text-4xl uppercase leading-[0.98] text-[var(--d-ink)] [font-family:var(--demo-display)] sm:text-5xl">
              {content.title}
            </h2>
            <p className="mt-6 max-w-md text-[0.95rem] leading-relaxed text-[var(--d-ink-soft)]">{content.body1}</p>
            <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-[var(--d-ink-soft)]">{content.body2}</p>

            <dl className="mt-9 grid max-w-md grid-cols-3 gap-4 border-t-2 border-[var(--d-line)] pt-6">
              {content.stats.map((s) => (
                <div key={s.label}>
                  <dt className="text-3xl uppercase text-[var(--d-yellow)] [font-family:var(--demo-display)]">
                    {s.value}
                  </dt>
                  <dd className="mt-1 text-[0.7rem] leading-snug text-[var(--d-ink-soft)]">{s.label}</dd>
                </div>
              ))}
            </dl>
          </motion.div>

          {/* Polaroid wall */}
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-8">
            {CASA_PHOTOS.map((photo, i) => (
              <div key={photo.id} className={i % 2 === 1 ? "sm:translate-y-8" : ""}>
                <Polaroid
                  src={photo.src}
                  alt={content.alts[photo.id] ?? content.captions[photo.id] ?? photo.id}
                  caption={content.captions[photo.id] ?? ""}
                  rotate={photo.rotate}
                  index={i}
                  reduced={reduced}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
