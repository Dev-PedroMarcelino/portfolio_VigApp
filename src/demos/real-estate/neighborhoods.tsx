"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { AltureContent } from "./content";

function unsplash(id: string, w: number) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
}

export function Neighborhoods({ content }: { content: AltureContent["neighborhoods"] }) {
  const reduceMotion = useReducedMotion();
  return (
    <section
      id="neighborhoods"
      className="scroll-mt-24 border-y border-[var(--d-line-soft)] bg-[var(--d-bg-deep)] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.4em] text-[var(--d-gold)]">
            <span aria-hidden className="h-px w-8 bg-[var(--d-line)]" />
            {content.eyebrow}
          </p>
          <h2 className="mt-5 [font-family:var(--demo-display)] text-4xl font-medium text-[var(--d-ivory)] sm:text-5xl">
            {content.title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[var(--d-ink-soft)]">{content.intro}</p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {content.items.map((place, index) => (
            <motion.a
              key={place.id}
              href="#listings"
              initial={reduceMotion ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: Math.min(index * 0.08, 0.32), ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex min-h-[360px] flex-col justify-end overflow-hidden"
            >
              <Image
                src={unsplash(place.imageId, 800)}
                alt={place.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-110"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,27,46,0.15)_0%,rgba(11,27,46,0.55)_55%,rgba(11,27,46,0.92)_100%)]"
              />
              <div className="relative z-10 p-6">
                <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--d-gold-bright)]">
                  {place.count}
                </p>
                <h3 className="mt-2 [font-family:var(--demo-display)] text-2xl font-medium text-[var(--d-ivory)]">
                  {place.name}
                </h3>
                <p className="mt-2 max-w-[22ch] text-xs leading-relaxed text-[var(--d-ink-soft)]">
                  {place.tagline}
                </p>
                <span className="mt-4 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--d-gold)] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                  {content.exploreLabel}
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
