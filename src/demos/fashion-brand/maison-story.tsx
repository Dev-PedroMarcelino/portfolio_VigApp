"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { unsplash, type NoirContent } from "./content";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function MaisonStory({ content }: { content: NoirContent["story"] }) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="maison"
      className="relative overflow-hidden border-t border-[var(--d-line-soft)] bg-[var(--d-paper)] px-6 py-24 text-[#141210] sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: EASE }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={unsplash(content.image, 1200)}
                alt={content.imageAlt}
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover object-center grayscale"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(160deg,transparent_55%,rgba(191,161,69,0.18)_100%)]"
              />
            </div>
            <span className="absolute -left-3 -top-6 [font-family:var(--demo-display)] text-8xl italic text-[var(--d-gold)] opacity-40">
              N
            </span>
          </motion.div>

          <div className="flex flex-col justify-center">
            <p className="text-[10px] font-medium uppercase tracking-[0.42em] text-[var(--d-gold)]">
              {content.eyebrow}
            </p>
            <h2 className="mt-4 max-w-md [font-family:var(--demo-display)] text-4xl leading-[1.04] text-[#141210] sm:text-5xl">
              {content.title}
            </h2>

            <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-[#3a352d]">
              {content.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>

            <figure className="mt-12 border-l-2 border-[var(--d-gold)] pl-6">
              <blockquote className="[font-family:var(--demo-display)] text-3xl italic leading-[1.15] text-[#141210] sm:text-[2.6rem]">
                {content.quote}
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="h-px w-8 bg-[var(--d-gold)]" aria-hidden />
                <span className="text-sm font-medium text-[#141210]">
                  {content.attribution}
                </span>
                <span className="text-xs uppercase tracking-[0.2em] text-[#8a8378]">
                  {content.role}
                </span>
              </figcaption>
            </figure>
          </div>
        </div>

        <dl className="mt-20 grid grid-cols-2 gap-px overflow-hidden border border-[#d8d1c2] bg-[#d8d1c2] lg:grid-cols-4">
          {content.stats.map((stat) => (
            <div key={stat.label} className="bg-[var(--d-paper)] px-6 py-8">
              <dt className="[font-family:var(--demo-display)] text-4xl italic text-[#141210] sm:text-5xl">
                {stat.value}
              </dt>
              <dd className="mt-2 text-[11px] uppercase tracking-[0.24em] text-[#8a8378]">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
