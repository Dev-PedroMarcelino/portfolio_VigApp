"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";
import type { TestimonialsContent } from "./content";
import { SectionLabel } from "./ui";

export function TestimonialsSection({ content }: { content: TestimonialsContent }) {
  const reduce = useReducedMotion();

  return (
    <section className="relative bg-[var(--d-sand)] py-20 lg:py-28" style={{ backgroundColor: "#EFE6D6" }}>
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-2xl">
          <SectionLabel text={content.label} />
          <h2 className="mt-5 [font-family:var(--demo-display)] text-4xl font-light leading-[1.05] tracking-[-0.01em] text-[var(--d-ink)] sm:text-5xl">
            {content.heading} <span className="italic text-[var(--d-accent)]">{content.headingItalic}</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {content.items.map((item, i) => (
            <motion.figure
              key={item.name}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`flex flex-col rounded-[1.5rem] border p-8 ${
                i === 1
                  ? "border-[var(--d-ink)] bg-[var(--d-ink)] text-[var(--d-cream)] lg:-translate-y-4"
                  : "border-[var(--d-line)] bg-[var(--d-cream-soft)] text-[var(--d-ink)]"
              }`}
              style={{ backgroundColor: i === 1 ? "#1C1917" : "#FBF7F0" }}
            >
              <span
                className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.14em] ${
                  i === 1
                    ? "bg-[var(--d-accent)] text-[var(--d-charcoal)]"
                    : "bg-[var(--d-sand)] text-[var(--d-ink-soft)]"
                }`}
              >
                <Sparkles className="h-3 w-3" strokeWidth={2} />
                {item.outcome}
              </span>

              <blockquote
                className={`mt-6 flex-1 [font-family:var(--demo-display)] text-[1.2rem] font-light leading-snug ${
                  i === 1 ? "text-[var(--d-cream)]" : "text-[var(--d-ink)]"
                }`}
              >
                {item.quote}
              </blockquote>

              <figcaption className="mt-7 border-t pt-5" style={{ borderColor: i === 1 ? "#3A332D" : "#E2D6C4" }}>
                <p className={`text-[0.95rem] font-semibold ${i === 1 ? "text-[var(--d-cream)]" : "text-[var(--d-ink)]"}`}>
                  {item.name}
                </p>
                <p className={`mt-1 text-[0.8rem] ${i === 1 ? "text-[var(--d-cream-dim)]" : "text-[var(--d-ink-soft)]"}`}>
                  {item.role}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
