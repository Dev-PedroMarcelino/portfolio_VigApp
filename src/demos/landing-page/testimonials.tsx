"use client";

import Image from "next/image";
import { Quote } from "lucide-react";
import type { Testimonial, TestimonialsContent } from "./content";
import { Reveal, SectionHeading } from "./ui";

function Card({ item }: { item: Testimonial }) {
  return (
    <figure className="flex h-full flex-col justify-between gap-6 rounded-3xl border border-[var(--d-line)] bg-[var(--d-panel)] p-6 transition-colors hover:border-[var(--d-line-bright)]">
      <div>
        <Quote className="h-6 w-6 text-[var(--d-accent)]" strokeWidth={1.6} aria-hidden />
        <blockquote className="mt-4 text-[0.95rem] leading-relaxed text-[var(--d-ink)]">
          {item.quote}
        </blockquote>
      </div>
      <figcaption className="flex items-center justify-between gap-4 border-t border-[var(--d-line)] pt-5">
        <div>
          <p className="text-sm font-semibold text-[var(--d-ink)]">{item.name}</p>
          <p className="text-xs text-[var(--d-ink-faint)]">
            {item.role} · {item.location}
          </p>
        </div>
        <div className="text-right">
          <p className="[font-family:var(--demo-display)] text-lg font-medium text-[var(--d-accent)]">
            {item.metricValue}
          </p>
          <p className="text-[0.66rem] uppercase tracking-[0.1em] text-[var(--d-ink-faint)]">
            {item.metricLabel}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}

export function Testimonials({ content }: { content: TestimonialsContent }) {
  return (
    <section id="reviews" className="relative scroll-mt-24 border-t border-[var(--d-line)] px-5 py-24 md:py-32">
      <div className="flex justify-center">
        <SectionHeading label={content.label} title={content.title} intro={content.intro} />
      </div>

      <div className="mx-auto mt-14 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {content.items.slice(0, 2).map((item, i) => (
          <Reveal key={item.id} delay={i * 0.05}>
            <Card item={item} />
          </Reveal>
        ))}

        {/* Decorative lifestyle tile with mint duotone treatment */}
        <Reveal delay={0.1} className="sm:col-span-2 lg:col-span-1">
          <div className="relative h-full min-h-[220px] overflow-hidden rounded-3xl border border-[var(--d-line)]">
            <Image
              src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=900&q=80"
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, 33vw"
              className="object-cover"
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(180deg, rgba(14,14,18,0.35) 0%, rgba(14,14,18,0.92) 100%)" }}
              aria-hidden
            />
            <div
              className="absolute inset-0 mix-blend-color"
              style={{ backgroundColor: "rgba(126,231,199,0.22)" }}
              aria-hidden
            />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <p className="[font-family:var(--demo-display)] text-2xl font-medium text-white">
                {content.items[3]?.metricValue}
              </p>
              <p className="mt-1 text-sm text-white/70">{content.items[3]?.metricLabel}</p>
            </div>
          </div>
        </Reveal>

        {content.items.slice(2).map((item, i) => (
          <Reveal key={item.id} delay={i * 0.05}>
            <Card item={item} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
