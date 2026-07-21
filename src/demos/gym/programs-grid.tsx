"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Clock, Flame } from "lucide-react";
import type { ProgramsContent } from "./content";
import { SectionHeading } from "./ui";

function IntensityBar({ level, caption }: { level: number; caption: string }) {
  return (
    <div className="flex items-center gap-1.5" aria-label={`${caption}: ${level}/5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          className="h-1.5 w-5 skew-x-[-18deg]"
          style={{ backgroundColor: n <= level ? "#D7FF3E" : "#26262B" }}
        />
      ))}
    </div>
  );
}

export function ProgramsGrid({ content }: { content: ProgramsContent }) {
  const reduce = useReducedMotion() ?? false;

  return (
    <section id="programs" className="relative border-t border-[var(--d-line)] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading label={content.label} title={content.title} intro={content.intro} />

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {content.items.map((program, i) => (
            <motion.article
              key={program.id}
              initial={reduce ? undefined : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.06 * (i % 2) }}
              className="group relative overflow-hidden border border-[var(--d-line)] bg-[var(--d-panel)]"
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={program.image}
                  alt={program.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(11,11,13,0.15) 0%, rgba(11,11,13,0.55) 60%, var(--d-panel) 100%)",
                  }}
                />
                <span className="absolute left-4 top-4 [font-family:var(--demo-display)] text-2xl text-[var(--d-accent)]">
                  {program.index}
                </span>
                <div className="absolute right-4 top-4 flex items-center gap-1.5 bg-[#0B0B0D]/70 px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-[var(--d-ink)]">
                  <Clock className="h-3 w-3 text-[var(--d-accent)]" strokeWidth={2.2} aria-hidden />
                  {program.duration}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="[font-family:var(--demo-display)] text-3xl uppercase leading-none text-[var(--d-ink)]">
                    {program.name}
                  </h3>
                  <span className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-[var(--d-accent)]">
                    {program.tagline}
                  </span>
                </div>
                <p className="mt-3 text-[0.9rem] leading-relaxed text-[var(--d-ink-dim)]">
                  {program.description}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-[var(--d-line)] pt-4">
                  <div className="flex items-center gap-2">
                    <Flame className="h-4 w-4 text-[var(--d-accent)]" strokeWidth={2} aria-hidden />
                    <span className="text-[0.66rem] font-bold uppercase tracking-[0.16em] text-[var(--d-ink-faint)]">
                      {content.intensityCaption}
                    </span>
                    <span className="text-[0.72rem] font-bold uppercase tracking-[0.1em] text-[var(--d-ink)]">
                      {program.intensityLabel}
                    </span>
                  </div>
                  <IntensityBar level={program.intensity} caption={content.intensityCaption} />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
