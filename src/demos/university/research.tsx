"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { ResearchContent, ResearchItem } from "./content";
import { Eyebrow, unsplash } from "./ui";

export function Research({ content }: { content: ResearchContent }) {
  const reduce = useReducedMotion() ?? false;

  return (
    <section id="research" className="scroll-mt-20 bg-[var(--d-navy)] py-20 text-[var(--d-parchment)] sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <Eyebrow text={content.eyebrow} tone="gold" />
          <h2 className="mt-4 [font-family:var(--demo-display)] text-3xl font-normal leading-tight sm:text-5xl">
            {content.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--d-parchment)]/70">
            {content.intro}
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {content.items.map((item, i) => (
            <ResearchCard key={item.title} item={item} index={i} reduce={reduce} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ResearchCard({
  item,
  index,
  reduce,
}: {
  item: ResearchItem;
  index: number;
  reduce: boolean;
}) {
  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--d-parchment)]/12 bg-[var(--d-navy-deep)]"
    >
      <div className="relative h-52 overflow-hidden">
        <Image
          src={unsplash(item.id, 900)}
          alt={item.alt}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover grayscale-[35%] transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--d-navy-deep)] via-[var(--d-navy)]/40 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-[var(--d-crimson)] px-3 py-1 text-[0.64rem] font-semibold uppercase tracking-[0.14em] text-[var(--d-parchment)]">
          {item.area}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-baseline gap-2">
          <span className="[font-family:var(--demo-display)] text-3xl font-bold text-[var(--d-gold)]">
            {item.stat}
          </span>
          <span className="text-[0.68rem] uppercase tracking-[0.14em] text-[var(--d-parchment)]/60">
            {item.statLabel}
          </span>
        </div>
        <h3 className="mt-3 [font-family:var(--demo-display)] text-lg font-normal leading-snug text-[var(--d-parchment)]">
          {item.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--d-parchment)]/70">
          {item.blurb}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-[var(--d-gold)] transition-transform group-hover:translate-x-1">
          <ArrowUpRight className="h-4 w-4" strokeWidth={2.2} />
        </span>
      </div>
    </motion.article>
  );
}
