"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { StatsContent } from "./content";
import { SectionLabel, ShieldOutline } from "./ui";

export function StatsBand({ content }: { content: StatsContent }) {
  const reduce = useReducedMotion() ?? false;

  return (
    <section className="relative overflow-hidden bg-[var(--d-navy)] px-5 py-20 text-white md:py-24">
      <ShieldOutline
        className="absolute -left-20 -top-32 h-96 w-96 text-white opacity-[0.05]"
        strokeWidth={0.5}
      />
      <ShieldOutline
        className="absolute -bottom-40 -right-16 h-[28rem] w-[28rem] text-[var(--d-gold)] opacity-[0.07]"
        strokeWidth={0.4}
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel text={content.label} tone="light" />
            <h2 className="mt-5 [font-family:var(--demo-display)] text-3xl font-extrabold tracking-tight md:text-4xl">
              {content.title}
            </h2>
          </div>
          <p className="text-[0.68rem] text-[var(--d-cloud)]/70">{content.footnote}</p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-[1.5rem] bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {content.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: reduce ? 0 : i * 0.08 }}
              className="bg-[var(--d-navy-2)] p-7"
            >
              <p className="[font-family:var(--demo-display)] text-[2.6rem] font-extrabold leading-none tracking-tight text-white">
                {stat.value}
              </p>
              <p className="mt-3 text-[0.78rem] font-bold uppercase tracking-[0.14em] text-[var(--d-gold)]">
                {stat.label}
              </p>
              <p className="mt-1.5 text-[0.78rem] leading-relaxed text-[var(--d-cloud)]">{stat.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
