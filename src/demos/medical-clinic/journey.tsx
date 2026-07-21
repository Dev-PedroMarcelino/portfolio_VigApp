"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Clock } from "lucide-react";
import type { JourneyContent } from "./content";
import { SectionHeading } from "./ui";

const JOURNEY_IMG =
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80";

export function JourneySection({ content }: { content: JourneyContent }) {
  const reduce = useReducedMotion() ?? false;

  return (
    <section id="journey" className="scroll-mt-20 bg-[var(--d-bg)] px-5 py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
        <div className="relative order-last lg:order-first">
          <div className="relative aspect-[4/4.6] overflow-hidden rounded-[2.5rem] shadow-[0_36px_70px_-40px_rgba(12,74,67,0.5)]">
            <Image
              src={JOURNEY_IMG}
              alt={content.imageAlt}
              fill
              sizes="(min-width: 1024px) 480px, 92vw"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(234,246,244,0.05) 0%, rgba(12,74,67,0.05) 55%, rgba(12,74,67,0.45) 100%)",
              }}
            />
            <div className="absolute bottom-5 left-5 flex items-center gap-3 rounded-2xl bg-[var(--d-card)]/94 px-4 py-3 shadow-lg shadow-[rgba(12,74,67,0.2)] backdrop-blur">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--d-mint)] text-[var(--d-accent)]">
                <Clock className="h-[18px] w-[18px]" strokeWidth={2} aria-hidden />
              </span>
              <span>
                <span className="block [font-family:var(--demo-display)] text-xl italic tracking-tight text-[var(--d-ink)]">
                  {content.badgeValue}
                </span>
                <span className="block text-[0.68rem] font-medium text-[var(--d-ink-soft)]">
                  {content.badgeLabel}
                </span>
              </span>
            </div>
          </div>
        </div>

        <div>
          <SectionHeading
            label={content.label}
            title={content.title}
            accent={content.accent}
            intro={content.intro}
          />

          <ol className="mt-10 space-y-0">
            {content.steps.map((step, index) => (
              <motion.li
                key={step.title}
                initial={reduce ? undefined : { opacity: 0, x: 26 }}
                whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
                className="relative flex gap-5 pb-9 last:pb-0"
              >
                {index < content.steps.length - 1 ? (
                  <span
                    aria-hidden
                    className="absolute left-[1.375rem] top-12 h-[calc(100%-3rem)] w-px border-l-2 border-dashed border-[var(--d-accent)]/25"
                  />
                ) : null}
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--d-mint)] [font-family:var(--demo-display)] text-lg italic text-[var(--d-accent-deep)]">
                  {index + 1}
                </span>
                <div className="pt-1">
                  <h3 className="text-[1.05rem] font-bold tracking-tight text-[var(--d-ink)]">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 max-w-md text-sm leading-[1.75] text-[var(--d-ink-soft)]">
                    {step.body}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
