"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Clock } from "lucide-react";
import type { HotelContent } from "./content";

const EASE_SLOW: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function RetreatSection({ content }: { content: HotelContent["retreat"] }) {
  const reduceMotion = useReducedMotion();

  return (
    <section id="retreat" className="relative overflow-hidden bg-[var(--d-pine)] py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(199,164,92,0.12),transparent_55%)]"
      />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
        <header className="mb-16 max-w-2xl">
          <span className="text-[10px] font-semibold uppercase tracking-[0.36em] text-[var(--d-brass)]">
            {content.eyebrow}
          </span>
          <h2 className="mt-4 [font-family:var(--demo-display)] text-4xl font-medium italic leading-[1.05] text-[var(--d-linen)] sm:text-6xl">
            {content.title}
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-[var(--d-ink-soft)]">{content.intro}</p>
        </header>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {content.items.map((item, i) => (
            <motion.article
              key={item.id}
              initial={reduceMotion ? false : { opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, delay: i * 0.1, ease: EASE_SLOW }}
              className="group flex flex-col overflow-hidden border border-[var(--d-line-soft)] bg-[var(--d-surface)]"
            >
              <div className="relative h-72 overflow-hidden sm:h-80">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[linear-gradient(180deg,rgba(21,42,37,0.1)_0%,rgba(21,42,37,0.72)_100%)]"
                />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[var(--d-brass-bright)]">
                    {item.kind}
                  </span>
                  <h3 className="mt-1.5 [font-family:var(--demo-display)] text-4xl font-medium text-[var(--d-linen)]">
                    {item.name}
                  </h3>
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-5 p-7 sm:p-8">
                <p className="text-sm leading-relaxed text-[var(--d-ink-soft)]">{item.description}</p>
                <p className="text-sm leading-relaxed text-[var(--d-ink-faint)]">{item.detail}</p>
                <div className="mt-auto flex items-center gap-2 border-t border-[var(--d-line-soft)] pt-5">
                  <Clock aria-hidden className="h-3.5 w-3.5 text-[var(--d-brass)]" strokeWidth={1.6} />
                  <span className="text-[10px] uppercase tracking-[0.22em] text-[var(--d-ink-faint)]">
                    {content.hoursLabel}
                  </span>
                  <span className="text-xs text-[var(--d-linen)]">{item.hours}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
