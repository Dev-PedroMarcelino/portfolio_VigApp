"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BadgeCheck, Star } from "lucide-react";
import type { ReviewsContent } from "./content";
import { SectionLabel, initialsOf } from "./ui";

const AVATAR_GRADIENTS = [
  "linear-gradient(135deg, #00D4FF, #7C5CFF)",
  "linear-gradient(135deg, #7C5CFF, #FF4ECD)",
  "linear-gradient(135deg, #FF4ECD, #FFB454)",
  "linear-gradient(135deg, #34F5C5, #00D4FF)",
  "linear-gradient(135deg, #FFB454, #34F5C5)",
];

export function ReviewsStrip({ content }: { content: ReviewsContent }) {
  const reduce = useReducedMotion() ?? false;

  return (
    <section
      id="reviews"
      className="scroll-mt-20 border-y border-[var(--d-line)] bg-[var(--d-bg-soft)] py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel text={content.label} />
            <h2 className="mt-5 [font-family:var(--demo-display)] text-3xl font-bold tracking-tight text-[var(--d-ink)] md:text-5xl">
              {content.title}
            </h2>
          </div>
          <p className="flex items-center gap-2 font-mono text-[0.72rem] text-[var(--d-ink-dim)]">
            <Star
              className="h-4 w-4 fill-[var(--d-warn)] text-[var(--d-warn)]"
              strokeWidth={1.5}
              aria-hidden
            />
            {content.statLine}
          </p>
        </div>
      </div>

      <div className="mt-12 overflow-x-auto pb-4 [scrollbar-width:thin] [scrollbar-color:var(--d-line)_transparent]">
        <div className="mx-auto flex w-max snap-x gap-4 px-5 md:px-[max(1.25rem,calc((100vw-72rem)/2))]">
          {content.items.map((review, i) => (
            <motion.figure
              key={review.name}
              initial={reduce ? undefined : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="flex w-[19rem] shrink-0 snap-start flex-col rounded-3xl border border-[var(--d-line)] bg-[var(--d-panel)] p-6 sm:w-[21rem]"
            >
              <div
                className="flex items-center gap-1"
                role="img"
                aria-label={`${review.rating} ${content.ratingLabel}`}
              >
                {[0, 1, 2, 3, 4].map((s) => (
                  <Star
                    key={s}
                    aria-hidden
                    strokeWidth={1.5}
                    className={`h-3.5 w-3.5 ${
                      s < review.rating
                        ? "fill-[var(--d-warn)] text-[var(--d-warn)]"
                        : "text-[var(--d-line)]"
                    }`}
                  />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-[0.86rem] leading-[1.75] text-[var(--d-ink)]">
                {review.quote}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-[var(--d-line)] pt-5">
                <span
                  aria-hidden
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[0.72rem] font-bold text-[#04101C]"
                  style={{ background: AVATAR_GRADIENTS[i % AVATAR_GRADIENTS.length] }}
                >
                  {initialsOf(review.name)}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-[var(--d-ink)]">
                    {review.name}
                  </p>
                  <p className="truncate text-[0.68rem] text-[var(--d-ink-dim)]">
                    {review.location} · Voltix {review.product}
                  </p>
                </div>
                <span
                  className="ml-auto flex items-center gap-1 text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-[var(--d-good)]"
                  title={content.verified}
                >
                  <BadgeCheck className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
                  <span className="hidden xl:inline">{content.verified}</span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
