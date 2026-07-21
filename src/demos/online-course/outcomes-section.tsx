"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FileText, MousePointerClick, Layers, Presentation } from "lucide-react";
import type { OutcomesContent } from "./content";
import { SectionLabel } from "./ui";

const ICONS = [FileText, MousePointerClick, Layers, Presentation];

export function OutcomesSection({ content }: { content: OutcomesContent }) {
  const reduce = useReducedMotion();

  return (
    <section id="outcomes" className="relative bg-[var(--d-cream)] py-20 lg:py-28" style={{ backgroundColor: "#F6F0E6" }}>
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-2xl">
          <SectionLabel text={content.label} />
          <h2 className="mt-5 [font-family:var(--demo-display)] text-4xl font-light leading-[1.05] tracking-[-0.01em] text-[var(--d-ink)] sm:text-5xl">
            {content.heading} <span className="italic text-[var(--d-accent)]">{content.headingItalic}</span>
          </h2>
          <p className="mt-5 text-[1rem] leading-relaxed text-[var(--d-ink-soft)]">{content.intro}</p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {content.items.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <motion.article
                key={item.index}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden rounded-[1.5rem] border border-[var(--d-line)] bg-[var(--d-cream-soft)] p-8 transition-colors hover:border-[var(--d-accent)]"
                style={{ backgroundColor: "#FBF7F0" }}
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--d-ink)] text-[var(--d-accent)]">
                    <Icon className="h-5 w-5" strokeWidth={1.7} />
                  </span>
                  <span className="[font-family:var(--demo-display)] text-4xl font-light italic text-[var(--d-sand-strong)]">
                    {item.index}
                  </span>
                </div>
                <h3 className="mt-7 [font-family:var(--demo-display)] text-[1.4rem] font-medium leading-snug text-[var(--d-ink)]">
                  {item.title}
                </h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-[var(--d-ink-soft)]">{item.detail}</p>
                <div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-[var(--d-accent)] opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-10"
                />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
