"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Quote } from "lucide-react";
import type { ReviewsContent } from "./content";
import { SectionLabel, Stars } from "./ui";

const HANDSHAKE_IMG =
  "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=900&q=80";

export function ReviewsSection({ content }: { content: ReviewsContent }) {
  const reduce = useReducedMotion() ?? false;

  return (
    <section id="reviews" className="scroll-mt-20 bg-[var(--d-paper)] px-5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <SectionLabel text={content.label} />
          <h2 className="mt-5 [font-family:var(--demo-display)] text-4xl font-extrabold tracking-tight text-[var(--d-ink)] md:text-5xl">
            {content.title}
          </h2>
          <p className="mt-4 leading-[1.85] text-[var(--d-ink-soft)]">{content.intro}</p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <motion.figure
            initial={reduce ? false : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative min-h-[19rem] overflow-hidden rounded-[1.5rem]"
          >
            <Image
              src={HANDSHAKE_IMG}
              alt={content.imageAlt}
              fill
              sizes="(min-width: 1280px) 300px, (min-width: 768px) 45vw, 92vw"
              className="object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(29,78,216,0.25) 0%, rgba(13,20,64,0.4) 55%, rgba(13,20,64,0.9) 100%)",
                mixBlendMode: "multiply",
              }}
              aria-hidden
            />
            <figcaption className="absolute inset-x-0 bottom-0 p-5 text-white">
              <p className="[font-family:var(--demo-display)] text-3xl font-extrabold tracking-tight">
                {content.badge.value}
              </p>
              <p className="mt-1 text-[0.74rem] font-semibold text-white/80">{content.badge.label}</p>
            </figcaption>
          </motion.figure>

          {content.reviews.map((review, i) => (
            <motion.figure
              key={review.name}
              initial={reduce ? false : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: reduce ? 0 : (i + 1) * 0.08 }}
              className="flex flex-col rounded-[1.5rem] border border-[var(--d-line)] bg-white p-6 shadow-[0_24px_50px_-40px_rgba(16,23,54,0.55)]"
            >
              <div className="flex items-center justify-between">
                <Quote className="h-6 w-6 text-[var(--d-accent)]/30" strokeWidth={1.6} aria-hidden />
                <Stars rating={review.rating} srLabel={`${review.rating} ${content.ratingLabel}`} />
              </div>
              <blockquote className="mt-4 grow text-[0.86rem] leading-[1.8] text-[var(--d-ink)]">
                {review.quote}
              </blockquote>
              <figcaption className="mt-5 border-t border-[var(--d-line)] pt-4">
                <p className="text-sm font-bold text-[var(--d-ink)]">{review.name}</p>
                <div className="mt-1 flex items-center justify-between gap-2">
                  <p className="text-[0.7rem] text-[var(--d-ink-soft)]">{review.meta}</p>
                  <span className="rounded-full bg-[var(--d-accent-soft)] px-2.5 py-0.5 text-[0.62rem] font-bold text-[var(--d-accent)]">
                    {review.product}
                  </span>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
