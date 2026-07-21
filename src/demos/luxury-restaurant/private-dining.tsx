"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { LumiereContent } from "./content";

const EASE_SLOW: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function PrivateDining({
  content,
  format,
}: {
  content: LumiereContent["privateDining"];
  format: (value: number) => string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <section id="private" className="relative bg-[var(--d-bg-soft)] py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: EASE_SLOW }}
          className="max-w-2xl"
        >
          <p className="text-[10px] font-medium uppercase tracking-[0.5em] text-[var(--d-gold)]">
            {content.eyebrow}
          </p>
          <h2 className="[font-family:var(--demo-display)] mt-5 text-4xl font-medium leading-tight text-[var(--d-ink)] sm:text-5xl">
            {content.title}
          </h2>
          <p className="mt-6 text-sm font-light leading-relaxed text-[var(--d-ink-soft)]">
            {content.intro}
          </p>
        </motion.div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, ease: EASE_SLOW }}
            className="relative min-h-[320px] overflow-hidden lg:min-h-0"
          >
            <Image
              src="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=1200&q=80"
              alt={content.imageAlt}
              fill
              sizes="(min-width: 1024px) 460px, 100vw"
              className="object-cover [filter:sepia(0.25)_contrast(1.03)_brightness(0.75)]"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,12,8,0.2)_0%,rgba(14,12,8,0.62)_100%)]"
            />
            <div aria-hidden className="absolute inset-4 border border-[var(--d-line)]" />
          </motion.div>

          <div className="flex flex-col gap-8">
            {content.rooms.map((room, index) => (
              <motion.article
                key={room.id}
                initial={reduceMotion ? false : { opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 1, delay: (index % 2) * 0.12, ease: EASE_SLOW }}
                className="border border-[var(--d-line-soft)] bg-[var(--d-bg)] p-8 transition-colors duration-500 hover:border-[var(--d-line)] sm:p-10"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="[font-family:var(--demo-display)] text-3xl font-medium text-[var(--d-ink)]">
                    {room.name}
                  </h3>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--d-gold)]">
                    {content.seatsLabel} — {room.seats}
                  </p>
                </div>
                <p className="mt-4 max-w-xl text-sm font-light leading-relaxed text-[var(--d-ink-soft)]">
                  {room.description}
                </p>
                <ul className="mt-6 space-y-2.5 border-t border-[var(--d-line-soft)] pt-5">
                  {room.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3 text-xs font-light tracking-wide text-[var(--d-ink-soft)]"
                    >
                      <span aria-hidden className="h-px w-5 shrink-0 bg-[var(--d-gold)]" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--d-line-soft)] pt-5">
                  <p>
                    <span className="[font-family:var(--demo-display)] text-2xl text-[var(--d-gold-bright)]">
                      {format(room.minimum)}
                    </span>
                    <span className="ml-3 text-[9px] uppercase tracking-[0.3em] text-[var(--d-ink-faint)]">
                      {content.minimumLabel}
                    </span>
                  </p>
                  <a
                    href="#reserve"
                    className="group inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.3em] text-[var(--d-ink)] transition-colors duration-300 hover:text-[var(--d-gold)]"
                  >
                    {content.cta}
                    <ArrowRight
                      aria-hidden
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                      strokeWidth={1.5}
                    />
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
