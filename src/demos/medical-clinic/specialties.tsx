"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { SpecialtiesContent, SpecialtyId } from "./content";
import { SectionHeading, SPECIALTY_ICONS } from "./ui";

export function SpecialtiesSection({
  content,
  onBook,
}: {
  content: SpecialtiesContent;
  onBook: (specialty: SpecialtyId | null, doctorId: string | null) => void;
}) {
  const reduce = useReducedMotion() ?? false;

  return (
    <section id="specialties" className="scroll-mt-20 bg-[var(--d-bg)] px-5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label={content.label}
          title={content.title}
          accent={content.accent}
          intro={content.intro}
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {content.items.map((item, index) => {
            const Icon = SPECIALTY_ICONS[item.id];
            return (
              <motion.article
                key={item.id}
                initial={reduce ? undefined : { opacity: 0, y: 24 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: (index % 3) * 0.08 }}
                className="group flex flex-col rounded-[1.75rem] border border-[var(--d-line)] bg-[var(--d-card)] p-7 shadow-[0_18px_40px_-32px_rgba(12,74,67,0.45)] transition-colors hover:border-[var(--d-accent)]/40"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--d-mint)] text-[var(--d-accent)] transition-colors group-hover:bg-[var(--d-accent)] group-hover:text-[var(--d-foam)]">
                  <Icon className="h-5 w-5" strokeWidth={1.9} aria-hidden />
                </span>
                <h3 className="mt-5 text-lg font-bold tracking-tight text-[var(--d-ink)]">
                  {item.name}
                </h3>
                <p className="mt-2 text-sm leading-[1.75] text-[var(--d-ink-soft)]">{item.blurb}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {item.chips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full bg-[var(--d-mist)] px-3 py-1 text-[0.66rem] font-semibold text-[var(--d-accent-deep)]"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => onBook(item.id, null)}
                  className="mt-6 flex items-center gap-1.5 self-start text-[0.78rem] font-bold text-[var(--d-accent)] underline-offset-4 transition-colors hover:text-[var(--d-accent-deep)] hover:underline"
                >
                  {content.bookLabel}
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                    strokeWidth={2.2}
                    aria-hidden
                  />
                </button>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
