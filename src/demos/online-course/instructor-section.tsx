"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Quote } from "lucide-react";
import type { InstructorContent } from "./content";
import { SectionLabel, unsplash } from "./ui";

export function InstructorSection({ content }: { content: InstructorContent }) {
  const reduce = useReducedMotion();

  return (
    <section
      id="instructor"
      className="relative overflow-hidden bg-[var(--d-charcoal)] py-20 text-[var(--d-cream)] lg:py-28"
      style={{ backgroundColor: "#1C1917" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/3 h-[28rem] w-[28rem] rounded-full opacity-30 blur-[130px]"
        style={{ background: "radial-gradient(circle, #F59E0B 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto grid max-w-6xl gap-14 px-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative order-2 lg:order-1"
        >
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[1.8rem] border border-[var(--d-charcoal-line)]">
            <Image
              src={unsplash("photo-1507003211169-0a1dd7228f2d", 900)}
              alt={content.imageAlt}
              fill
              sizes="(max-width: 1024px) 80vw, 34vw"
              className="object-cover grayscale-[0.15]"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{ background: "linear-gradient(180deg, rgba(28,25,23,0) 40%, rgba(28,25,23,0.6) 100%)" }}
            />
          </div>

          <dl className="mt-6 grid grid-cols-3 gap-3">
            {content.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-[var(--d-charcoal-line)] bg-[var(--d-charcoal-soft)] px-3 py-4 text-center"
              >
                <dt className="[font-family:var(--demo-display)] text-xl font-medium text-[var(--d-accent)]">{stat.value}</dt>
                <dd className="mt-1 text-[0.62rem] font-semibold uppercase leading-tight tracking-[0.12em] text-[var(--d-cream-dim)]">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="order-1 lg:order-2"
        >
          <SectionLabel text={content.label} />
          <h2 className="mt-5 [font-family:var(--demo-display)] text-4xl font-light leading-tight tracking-[-0.01em] sm:text-5xl">
            {content.name}
          </h2>
          <p className="mt-3 text-[0.82rem] font-semibold uppercase tracking-[0.16em] text-[var(--d-accent)]">
            {content.role}
          </p>

          <div className="mt-7 space-y-4 text-[1rem] leading-relaxed text-[var(--d-cream-dim)]">
            {content.bio.map((para) => (
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
          </div>

          <figure className="mt-8 rounded-[1.4rem] border border-[var(--d-charcoal-line)] bg-[var(--d-charcoal-soft)] p-7">
            <Quote className="h-6 w-6 text-[var(--d-accent)]" strokeWidth={1.6} />
            <blockquote className="mt-3 [font-family:var(--demo-display)] text-xl font-light italic leading-snug text-[var(--d-cream)] sm:text-2xl">
              {content.quote}
            </blockquote>
          </figure>
        </motion.div>
      </div>
    </section>
  );
}
