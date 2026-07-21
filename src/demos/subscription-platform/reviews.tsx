"use client";

import { Quote, Star } from "lucide-react";
import type { ReviewsContent } from "./content";

const TILTS = ["-rotate-1", "rotate-1", "rotate-1", "-rotate-1"];

export function Reviews({ content }: { content: ReviewsContent }) {
  return (
    <section
      id="reviews"
      className="relative scroll-mt-24 overflow-hidden bg-[var(--d-accent)] px-5 py-20 text-[var(--d-bg)] md:py-28"
    >
      <div
        aria-hidden
        className="absolute -left-24 top-1/3 h-80 w-80 rounded-full bg-[var(--d-accent-deep)]/60"
      />
      <div className="relative mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="flex items-center gap-3 text-[0.68rem] font-extrabold uppercase tracking-[0.3em] text-[var(--d-peach)]">
            <span className="h-px w-8 bg-[var(--d-peach)]" aria-hidden />
            {content.label}
          </p>
          <h2 className="mt-5 [font-family:var(--demo-display)] text-4xl tracking-tight md:text-5xl">
            {content.title}
          </h2>
          <p className="mt-4 leading-[1.85] text-[#FFD9C4]">{content.intro}</p>
        </div>

        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {content.items.map((review, i) => (
            <li key={review.name} className={TILTS[i % TILTS.length]}>
              <figure className="flex h-full flex-col rounded-[1.75rem] bg-[var(--d-bg)] p-7 text-[var(--d-ink)] shadow-[0_24px_60px_-36px_rgba(44,31,19,0.7)] md:p-8">
                <div className="flex items-center justify-between">
                  <div
                    className="flex items-center gap-1"
                    role="img"
                    aria-label={`${review.rating} ${content.ratingSuffix}`}
                  >
                    {[0, 1, 2, 3, 4].map((s) => (
                      <Star
                        key={s}
                        aria-hidden
                        className={`h-4 w-4 ${
                          s < review.rating
                            ? "fill-[var(--d-accent)] text-[var(--d-accent)]"
                            : "text-[var(--d-kraft-deep)]"
                        }`}
                        strokeWidth={2}
                      />
                    ))}
                  </div>
                  <Quote className="h-6 w-6 text-[var(--d-kraft-deep)]" strokeWidth={1.6} aria-hidden />
                </div>
                <blockquote className="mt-5 flex-1 [font-family:var(--demo-display)] text-xl italic leading-snug tracking-tight md:text-[1.35rem]">
                  {review.quote}
                </blockquote>
                <figcaption className="mt-6 flex items-end justify-between gap-4 border-t border-[var(--d-line)] pt-5">
                  <div>
                    <p className="text-sm font-extrabold">{review.name}</p>
                    <p className="text-xs text-[var(--d-ink-soft)]">{review.place}</p>
                  </div>
                  <span className="rounded-full bg-[var(--d-peach)] px-3 py-1.5 text-[0.6rem] font-extrabold uppercase tracking-[0.1em] text-[var(--d-accent-deep)]">
                    {review.tag}
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
