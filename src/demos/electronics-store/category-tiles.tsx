"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { CategoriesContent, ProductIcon } from "./content";
import { SectionLabel, scrollToId } from "./ui";

const TILE_IMAGES: Record<ProductIcon, string> = {
  phone:
    "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=900&q=80",
  laptop:
    "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=900&q=80",
  audio:
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
  watch:
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80",
};

/** Per-tile duotone overlays so slightly-off subjects still read on-brand. */
const TILE_TINTS: Record<ProductIcon, string> = {
  phone:
    "linear-gradient(180deg, rgba(10,15,30,0.30) 0%, rgba(10,15,30,0.88) 90%), linear-gradient(35deg, rgba(0,212,255,0.18), transparent 60%)",
  laptop:
    "linear-gradient(180deg, rgba(10,15,30,0.30) 0%, rgba(10,15,30,0.88) 90%), linear-gradient(35deg, rgba(124,92,255,0.20), transparent 60%)",
  audio:
    "linear-gradient(180deg, rgba(10,15,30,0.42) 0%, rgba(10,15,30,0.90) 90%), linear-gradient(35deg, rgba(255,78,205,0.22), rgba(0,212,255,0.10) 70%)",
  watch:
    "linear-gradient(180deg, rgba(10,15,30,0.42) 0%, rgba(10,15,30,0.90) 90%), linear-gradient(35deg, rgba(0,212,255,0.16), rgba(124,92,255,0.12) 70%)",
};

export function CategoryTiles({ content }: { content: CategoriesContent }) {
  const reduce = useReducedMotion() ?? false;

  return (
    <section id="categories" className="scroll-mt-20 px-5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionLabel text={content.label} />
        <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
          <h2 className="[font-family:var(--demo-display)] text-3xl font-bold tracking-tight text-[var(--d-ink)] md:text-5xl">
            {content.title}
          </h2>
          <p className="max-w-md text-sm leading-[1.8] text-[var(--d-ink-dim)]">{content.intro}</p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {content.tiles.map((tile, i) => (
            <motion.button
              key={tile.id}
              type="button"
              onClick={() => scrollToId("deals")}
              initial={reduce ? undefined : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-3xl border border-[var(--d-line)] text-left transition-colors hover:border-[var(--d-accent)]/50"
              style={{ aspectRatio: "3 / 4" }}
            >
              <Image
                src={TILE_IMAGES[tile.id]}
                alt={tile.imageAlt}
                fill
                sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 92vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div aria-hidden className="absolute inset-0" style={{ background: TILE_TINTS[tile.id] }} />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.26em] text-[var(--d-accent)]">
                  {tile.series}
                </p>
                <p className="mt-1.5 [font-family:var(--demo-display)] text-2xl font-bold tracking-tight text-[var(--d-ink)]">
                  {tile.name}
                </p>
                <p className="mt-1 text-[0.72rem] text-[var(--d-ink-dim)]">
                  {tile.count} · {tile.fromPrice}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-[var(--d-ink)] opacity-70 transition-opacity group-hover:opacity-100">
                  {content.browse}
                  <ArrowRight
                    className="h-3.5 w-3.5 text-[var(--d-accent)] transition-transform group-hover:translate-x-1"
                    strokeWidth={2.2}
                    aria-hidden
                  />
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
