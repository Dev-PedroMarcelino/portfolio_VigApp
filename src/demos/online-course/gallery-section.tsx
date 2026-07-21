"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { GalleryContent, GalleryItem } from "./content";
import { SectionLabel, unsplash } from "./ui";

/** Photos available for this demo, mapped defensively with duotone overlays. */
const PHOTOS = [
  "photo-1524995997946-a1c2e315a42f",
  "photo-1531482615713-2afd69097998",
  "photo-1456513080510-7bf3a84b82f8",
];

/** Amber/charcoal gradient art for the cards that are not photographic. */
const SWATCHES = [
  "linear-gradient(135deg, #2A2420 0%, #4A3A1C 55%, #F59E0B 140%)",
  "linear-gradient(135deg, #1C1917 0%, #3A2E1A 60%, #C97C0C 130%)",
  "linear-gradient(135deg, #241E1A 0%, #52401E 50%, #FBBF4D 145%)",
];

function isPhotoCard(index: number): boolean {
  // Cards 0, 2, 4 are photographic; 1, 3, 5 are generated art.
  return index % 2 === 0;
}

export function GallerySection({ content }: { content: GalleryContent }) {
  const reduce = useReducedMotion();

  return (
    <section id="work" className="relative bg-[var(--d-cream)] py-20 lg:py-28" style={{ backgroundColor: "#F6F0E6" }}>
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-2xl">
          <SectionLabel text={content.label} />
          <h2 className="mt-5 [font-family:var(--demo-display)] text-4xl font-light leading-[1.05] tracking-[-0.01em] text-[var(--d-ink)] sm:text-5xl">
            {content.heading} <span className="italic text-[var(--d-accent)]">{content.headingItalic}</span>
          </h2>
          <p className="mt-5 text-[1rem] leading-relaxed text-[var(--d-ink-soft)]">{content.intro}</p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {content.items.map((item, i) => (
            <GalleryCard
              key={item.title}
              item={item}
              index={i}
              captionCta={content.captionCta}
              reduce={!!reduce}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryCard({
  item,
  index,
  captionCta,
  reduce,
}: {
  item: GalleryItem;
  index: number;
  captionCta: string;
  reduce: boolean;
}) {
  const photo = isPhotoCard(index);
  const photoId = PHOTOS[Math.floor(index / 2) % PHOTOS.length];
  const swatch = SWATCHES[Math.floor(index / 2) % SWATCHES.length];

  return (
    <motion.article
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-[1.4rem] border border-[var(--d-line)] bg-[var(--d-ink)]"
      style={{ backgroundColor: "#1C1917" }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {photo ? (
          <>
            <Image
              src={unsplash(photoId, 800)}
              alt={`${item.title} — ${item.discipline}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div
              aria-hidden
              className="absolute inset-0 mix-blend-multiply"
              style={{ background: "linear-gradient(150deg, rgba(28,25,23,0.35) 0%, rgba(201,124,12,0.35) 100%)" }}
            />
          </>
        ) : (
          <div className="absolute inset-0" aria-hidden style={{ background: swatch }}>
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(246,240,230,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(246,240,230,0.12) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
          </div>
        )}
        <span className="absolute left-4 top-4 rounded-full bg-[var(--d-cream)]/95 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-[var(--d-ink)]">
          {captionCta}
        </span>
        <span className="absolute right-4 top-4 flex h-8 w-8 translate-y-1 items-center justify-center rounded-full bg-[var(--d-accent)] text-[var(--d-charcoal)] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4" strokeWidth={2.2} />
        </span>
      </div>
      <div className="p-5">
        <h3 className="[font-family:var(--demo-display)] text-[1.15rem] font-medium leading-snug text-[var(--d-cream)]">
          {item.title}
        </h3>
        <p className="mt-1.5 text-[0.8rem] text-[var(--d-cream-dim)]">{item.author}</p>
        <p className="mt-3 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-[var(--d-accent)]">
          {item.discipline}
        </p>
      </div>
    </motion.article>
  );
}
