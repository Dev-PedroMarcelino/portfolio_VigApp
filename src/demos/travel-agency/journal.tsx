"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { TravelContent } from "./content";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Journal({ content }: { content: TravelContent["journal"] }) {
  const reduce = useReducedMotion();

  return (
    <section id="journal" className="relative bg-[var(--d-bg)] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <header className="max-w-2xl">
          <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--d-peach)]">
            {content.eyebrow}
          </span>
          <h2 className="mt-4 [font-family:var(--demo-display)] text-[clamp(2rem,4.4vw,3.2rem)] font-light leading-[1.02] tracking-tight text-[var(--d-ink)]">
            {content.title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[var(--d-ink-soft)] sm:text-base">
            {content.intro}
          </p>
        </header>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {content.entries.map((entry, i) => (
            <motion.article
              key={entry.id}
              initial={{ opacity: 0, y: reduce ? 0 : 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: reduce ? 0 : i * 0.08, ease: EASE }}
              className="group flex flex-col overflow-hidden rounded-[22px] border border-[var(--d-line-soft)] bg-[var(--d-surface)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={entry.image.src}
                  alt={entry.image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,34,42,0.04),rgba(4,34,42,0.55))]" />
                <span className="absolute left-4 top-4 rounded-full bg-[rgba(4,34,42,0.72)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--d-peach-bright)] backdrop-blur-sm">
                  {entry.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="[font-family:var(--demo-display)] text-xl font-normal leading-tight text-[var(--d-ink)]">
                  {entry.title}
                </h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-[var(--d-ink-soft)]">
                  {entry.excerpt}
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-[var(--d-line-soft)] pt-4">
                  <span className="text-[11px] text-[var(--d-ink-faint)]">
                    {entry.author} · {entry.readTime}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--d-peach)]">
                    {content.readLabel}
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.8} aria-hidden />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
