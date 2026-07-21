"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import type { CtaContent, TestimonialsContent } from "./content";
import { SectionLabel, initialsOf, scrollToId } from "./ui";

const AVATAR_TONES = ["#0D9488", "#F59E0B", "#0F766E"];

export function TestimonialsCta({
  testimonials,
  cta,
}: {
  testimonials: TestimonialsContent;
  cta: CtaContent;
}) {
  const reduce = useReducedMotion() ?? false;

  return (
    <>
      <section id="stories" className="scroll-mt-20 bg-[var(--d-card)] px-5 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-xl">
            <SectionLabel text={testimonials.label} />
            <h2 className="mt-5 [font-family:var(--demo-display)] text-3xl font-extrabold tracking-tight md:text-5xl">
              {testimonials.title}
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.items.map((item, idx) => (
              <motion.figure
                key={item.name}
                initial={reduce ? undefined : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: reduce ? 0 : idx * 0.1, ease: "easeOut" }}
                className="flex flex-col rounded-[1.75rem] border border-[var(--d-line)] bg-[var(--d-bg)] p-7"
              >
                <span
                  className="flex items-center gap-1"
                  role="img"
                  aria-label={testimonials.ratingLabel}
                >
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-[var(--d-pop)] text-[var(--d-pop)]"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                  ))}
                </span>
                <blockquote className="mt-4 flex-1 text-[0.95rem] leading-[1.75] text-[var(--d-ink)]">
                  {item.quote}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-[var(--d-line)] pt-5">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: AVATAR_TONES[idx % AVATAR_TONES.length] }}
                    aria-hidden
                  >
                    {initialsOf(item.name)}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-bold text-[var(--d-ink)]">
                      {item.name}
                    </span>
                    <span className="block truncate text-xs text-[var(--d-ink-soft)]">
                      {item.role}
                    </span>
                  </span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:py-24">
        <div
          className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] px-6 py-16 text-center text-white md:py-20"
          style={{ background: "linear-gradient(120deg, #0F766E 0%, #0D9488 55%, #14B8A6 100%)" }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              backgroundImage: "radial-gradient(rgba(255,255,255,0.35) 1.2px, transparent 1.2px)",
              backgroundSize: "26px 26px",
            }}
            aria-hidden
          />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl [font-family:var(--demo-display)] text-3xl font-extrabold tracking-tight md:text-5xl">
              {cta.title}
            </h2>
            <p className="mx-auto mt-5 max-w-xl leading-[1.8] text-white/80">{cta.sub}</p>
            <button
              type="button"
              onClick={() => scrollToId("book")}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-[var(--d-accent-deep)] transition-transform hover:scale-[1.04]"
            >
              {cta.button}
              <ArrowRight className="h-4 w-4" strokeWidth={2.4} aria-hidden />
            </button>
            <p className="mt-5 text-xs font-semibold text-white/70">{cta.note}</p>
          </div>
        </div>
      </section>
    </>
  );
}
