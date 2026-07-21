"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Quote } from "lucide-react";
import type { LifeCard, StudentLifeContent } from "./content";
import { Eyebrow, unsplash } from "./ui";

const spanClass: Record<LifeCard["span"], string> = {
  tall: "sm:row-span-2 min-h-[20rem] sm:min-h-full",
  wide: "sm:col-span-1 min-h-[16rem]",
  regular: "min-h-[16rem]",
};

export function StudentLife({ content }: { content: StudentLifeContent }) {
  const reduce = useReducedMotion() ?? false;

  return (
    <section id="life" className="scroll-mt-20 bg-[var(--d-parchment)] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <Eyebrow text={content.eyebrow} tone="crimson" />
          <h2 className="mt-4 [font-family:var(--demo-display)] text-3xl font-normal leading-tight text-[var(--d-ink)] sm:text-5xl">
            {content.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--d-ink-soft)]">
            {content.intro}
          </p>
        </div>

        <div className="mt-12 grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {content.cards.map((card, i) => (
            <LifeTile key={card.title} card={card} index={i} reduce={reduce} />
          ))}

          {/* testimonial plate fills the mosaic */}
          <motion.figure
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-col justify-between rounded-2xl bg-[var(--d-crimson)] p-7 text-[var(--d-parchment)]"
          >
            <Quote className="h-8 w-8 text-[var(--d-gold)]" strokeWidth={1.6} />
            <blockquote className="mt-4 [font-family:var(--demo-display)] text-lg italic leading-relaxed text-[var(--d-parchment)]">
              {content.quote}
            </blockquote>
            <figcaption className="mt-5 border-t border-[var(--d-parchment)]/20 pt-4">
              <p className="text-sm font-semibold text-[var(--d-parchment)]">{content.quoteName}</p>
              <p className="mt-0.5 text-xs text-[var(--d-parchment)]/70">{content.quoteRole}</p>
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}

function LifeTile({
  card,
  index,
  reduce,
}: {
  card: LifeCard;
  index: number;
  reduce: boolean;
}) {
  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`group relative overflow-hidden rounded-2xl ${spanClass[card.span]}`}
    >
      <Image
        src={unsplash(card.id, 900)}
        alt={card.alt}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--d-crimson-deep)]/90 via-[var(--d-crimson-deep)]/25 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-end p-6 text-[var(--d-parchment)]">
        <span className="w-fit rounded-full bg-[var(--d-parchment)]/15 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-[var(--d-parchment)] backdrop-blur-sm">
          {card.tag}
        </span>
        <h3 className="mt-3 [font-family:var(--demo-display)] text-xl font-normal leading-snug">
          {card.title}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-[var(--d-parchment)]/80">
          {card.blurb}
        </p>
      </div>
    </motion.article>
  );
}
