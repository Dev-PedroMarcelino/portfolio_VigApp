"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Columns3, Table2, Zap, Check } from "lucide-react";
import type { FeatureIconId, FeaturesContent } from "./content";
import { SectionHeading } from "./ui";

const ICONS: Record<FeatureIconId, typeof Columns3> = {
  columns: Columns3,
  table: Table2,
  zap: Zap,
};

export function Features({ content }: { content: FeaturesContent }) {
  const reduce = useReducedMotion();

  return (
    <section id="features" className="relative scroll-mt-20 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading label={content.label} title={content.title} intro={content.intro} />

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {content.items.map((item, i) => {
            const Icon = ICONS[item.icon];
            return (
              <motion.article
                key={item.title}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-[var(--d-line)] bg-[var(--d-surface)] p-7 transition-shadow hover:shadow-[0_30px_60px_-40px_rgba(30,27,75,0.5)]"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[var(--d-accent-soft)] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                />
                <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--d-accent-soft)] text-[var(--d-accent)]">
                  <Icon className="h-6 w-6" strokeWidth={1.9} aria-hidden />
                </span>
                <h3 className="relative mt-5 [font-family:var(--demo-display)] text-lg font-semibold tracking-tight text-[var(--d-ink)]">
                  {item.title}
                </h3>
                <p className="relative mt-2.5 text-[0.88rem] leading-relaxed text-[var(--d-ink-soft)]">{item.body}</p>
                <ul className="relative mt-6 space-y-2.5 border-t border-[var(--d-line)] pt-5">
                  {item.points.map((point) => (
                    <li key={point} className="flex items-center gap-2.5 text-[0.82rem] text-[var(--d-ink)]">
                      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#E6F8F1]">
                        <Check className="h-2.5 w-2.5 text-[#059669]" strokeWidth={3} aria-hidden />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
