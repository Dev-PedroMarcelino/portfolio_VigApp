"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Quote } from "lucide-react";
import type { QuotesContent } from "./content";
import { Avatar, Glow, SectionHeading } from "./ui";

const FEATURED_IMG =
  "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80";

export function QuoteWall({ content }: { content: QuotesContent }) {
  const reduce = useReducedMotion();

  return (
    <section id="customers" className="relative scroll-mt-20 py-24">
      <Glow className="-right-40 bottom-10 h-96 w-96" />
      <div className="relative mx-auto max-w-6xl px-5">
        <SectionHeading label={content.label} title={content.title} intro={content.intro} />

        {/* Featured customer story */}
        <motion.figure
          initial={reduce ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
          className="mt-12 grid overflow-hidden rounded-3xl border border-[var(--d-line)] bg-[var(--d-panel)] backdrop-blur lg:grid-cols-[2fr_3fr]"
        >
          <div className="relative min-h-64 lg:min-h-full">
            <Image
              src={FEATURED_IMG}
              alt={content.featured.imageAlt}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-tr from-[rgba(10,16,31,0.85)] via-[rgba(15,23,42,0.45)] to-[rgba(59,130,246,0.25)] mix-blend-multiply"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-[rgba(59,130,246,0.16)] mix-blend-color"
            />
            <div className="absolute bottom-5 left-5 rounded-2xl border border-white/15 bg-[rgba(10,16,31,0.72)] px-5 py-4 backdrop-blur-md">
              <p className="[font-family:var(--demo-display)] text-3xl font-semibold tracking-tight text-[#93C5FD]">
                {content.featured.metric}
              </p>
              <p className="mt-0.5 max-w-44 text-[0.68rem] leading-snug text-[var(--d-ink-soft)]">
                {content.featured.metricLabel}
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center p-8 sm:p-10">
            <Quote className="h-7 w-7 text-[var(--d-accent)] opacity-70" strokeWidth={1.6} aria-hidden />
            <blockquote className="mt-4 [font-family:var(--demo-display)] text-xl font-medium leading-relaxed tracking-tight text-[var(--d-ink)] sm:text-2xl">
              {content.featured.quote}
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <Avatar
                initials={content.featured.name
                  .split(" ")
                  .map((w) => w[0])
                  .join("")}
                index={0}
                size="h-10 w-10 text-[0.7rem]"
              />
              <div>
                <p className="text-sm font-semibold text-[var(--d-ink)]">{content.featured.name}</p>
                <p className="text-[0.74rem] text-[var(--d-ink-soft)]">
                  {content.featured.role} · {content.featured.company}
                </p>
              </div>
            </figcaption>
          </div>
        </motion.figure>

        {/* Quote wall */}
        <div className="mt-6 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {content.quotes.map((q, i) => (
            <motion.figure
              key={q.name}
              initial={reduce ? false : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.07 }}
              className="mb-5 break-inside-avoid rounded-2xl border border-[var(--d-line)] bg-[var(--d-panel)] p-6 backdrop-blur transition-colors hover:border-[var(--d-accent)]/35"
            >
              <blockquote className="text-[0.88rem] leading-relaxed text-[var(--d-ink)]">{q.quote}</blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-[var(--d-line)] pt-4">
                <Avatar
                  initials={q.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")}
                  index={i + 1}
                  size="h-8 w-8 text-[0.6rem]"
                />
                <div>
                  <p className="text-[0.8rem] font-semibold text-[var(--d-ink)]">{q.name}</p>
                  <p className="text-[0.68rem] text-[var(--d-ink-soft)]">
                    {q.role} · {q.company}
                  </p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
