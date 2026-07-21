"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Quote } from "lucide-react";
import type { TestimonialsContent } from "./content";
import { Avatar, SectionHeading } from "./ui";

export function Testimonials({ content }: { content: TestimonialsContent }) {
  const reduce = useReducedMotion();
  const f = content.featured;

  return (
    <section id="testimonials" className="relative scroll-mt-20 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading label={content.label} title={content.title} intro={content.intro} />

        <div className="mt-12 grid gap-5 lg:grid-cols-5">
          {/* Featured with image */}
          <motion.figure
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[var(--d-line)] bg-[var(--d-ink)] p-8 lg:col-span-3"
          >
            <Image
              src="https://images.unsplash.com/photo-1543269664-56d93c1b41a6?auto=format&fit=crop&w=1400&q=80"
              alt={content.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(150deg, rgba(49,46,129,0.94) 0%, rgba(30,27,75,0.86) 45%, rgba(79,70,229,0.72) 100%)",
              }}
            />
            <Quote className="relative h-9 w-9 text-white/40" strokeWidth={1.6} aria-hidden />
            <blockquote className="relative mt-5 [font-family:var(--demo-display)] text-lg font-medium leading-relaxed text-white sm:text-xl">
              {f.quote}
            </blockquote>
            <figcaption className="relative mt-7 flex items-center justify-between gap-4 border-t border-white/15 pt-6">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-[0.72rem] font-semibold text-white [font-family:var(--demo-display)]">
                  {f.initials}
                </span>
                <div>
                  <p className="text-[0.86rem] font-semibold text-white">{f.name}</p>
                  <p className="text-[0.72rem] text-white/70">
                    {f.role} · {f.company}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="[font-family:var(--demo-display)] text-2xl font-semibold text-white">{f.metricValue}</p>
                <p className="text-[0.64rem] uppercase tracking-wider text-white/60">{f.metricLabel}</p>
              </div>
            </figcaption>
          </motion.figure>

          {/* Smaller quotes */}
          <div className="flex flex-col gap-5 lg:col-span-2">
            {content.others.map((t, i) => (
              <motion.figure
                key={t.name}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                className="flex flex-1 flex-col justify-between rounded-3xl border border-[var(--d-line)] bg-[var(--d-surface)] p-6"
              >
                <blockquote className="text-[0.9rem] leading-relaxed text-[var(--d-ink)]">{t.quote}</blockquote>
                <figcaption className="mt-5 flex items-center justify-between gap-3 border-t border-[var(--d-line)] pt-4">
                  <div className="flex items-center gap-2.5">
                    <Avatar initials={t.initials} index={i + 2} />
                    <div>
                      <p className="text-[0.78rem] font-semibold text-[var(--d-ink)]">{t.name}</p>
                      <p className="text-[0.66rem] text-[var(--d-ink-faint)]">
                        {t.role} · {t.company}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="[font-family:var(--demo-display)] text-lg font-semibold text-[var(--d-accent)]">
                      {t.metricValue}
                    </p>
                    <p className="text-[0.58rem] uppercase tracking-wider text-[var(--d-ink-faint)]">{t.metricLabel}</p>
                  </div>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
