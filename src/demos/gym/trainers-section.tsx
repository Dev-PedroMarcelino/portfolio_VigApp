"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { TrainersContent } from "./content";
import { SectionHeading } from "./ui";

export function TrainersSection({ content }: { content: TrainersContent }) {
  const reduce = useReducedMotion() ?? false;

  return (
    <section id="coaches" className="relative border-t border-[var(--d-line)] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading label={content.label} title={content.title} intro={content.intro} />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {content.items.map((coach, i) => (
            <motion.article
              key={coach.id}
              initial={reduce ? undefined : { opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.06 * i }}
              className="group relative overflow-hidden border border-[var(--d-line)] bg-[var(--d-panel)]"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={coach.image}
                  alt={coach.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(11,11,13,0) 30%, rgba(11,11,13,0.55) 70%, var(--d-panel) 100%)",
                  }}
                />
                {/* Signature stat chip */}
                <div className="absolute right-3 top-3 bg-[#0B0B0D]/75 px-3 py-2 text-right">
                  <div className="[font-family:var(--demo-display)] text-2xl leading-none text-[var(--d-accent)]">
                    {coach.stat}
                  </div>
                  <div className="mt-0.5 max-w-[7rem] text-[0.56rem] font-semibold uppercase leading-tight tracking-[0.1em] text-[var(--d-ink-dim)]">
                    {coach.statLabel}
                  </div>
                </div>
              </div>

              <div className="p-5">
                <h3 className="[font-family:var(--demo-display)] text-2xl uppercase leading-none text-[var(--d-ink)]">
                  {coach.name}
                </h3>
                <div className="mt-2 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[var(--d-accent)]">
                  {coach.role}
                </div>
                <div className="mt-1.5 text-[0.78rem] text-[var(--d-ink-faint)]">
                  {coach.specialty}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
