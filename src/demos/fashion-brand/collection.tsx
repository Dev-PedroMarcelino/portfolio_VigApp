"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { unsplash, type NoirContent, type Piece } from "./content";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function PieceCard({
  piece,
  index,
  content,
  format,
  onRequest,
}: {
  piece: Piece;
  index: number;
  content: NoirContent["collection"];
  format: (n: number) => string;
  onRequest: (id: string) => void;
}) {
  const reduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const numeral = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: EASE }}
      className="group relative flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-[var(--d-bg-soft)]">
        <Image
          src={unsplash(piece.image, 900)}
          alt={piece.imageAlt}
          fill
          sizes="(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 90vw"
          className="object-cover object-center transition-all duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-0 group-hover:scale-105"
        />
        <Image
          src={unsplash(piece.crop, 900)}
          alt={piece.cropAlt}
          fill
          sizes="(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 90vw"
          className="object-cover object-center opacity-0 grayscale transition-all duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-hover:scale-105"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(10,10,10,0.55)_100%)]"
        />

        <span className="absolute left-4 top-4 [font-family:var(--demo-display)] text-xs italic text-[var(--d-ink)] mix-blend-difference">
          {numeral}
        </span>

        <span className="absolute right-4 top-4 border border-[var(--d-line)] bg-[rgba(10,10,10,0.4)] px-2.5 py-1 text-[8px] uppercase tracking-[0.28em] text-[var(--d-gold-bright)] backdrop-blur-sm">
          {piece.category}
        </span>

        <div
          className={`absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 transition-all duration-500 ${
            hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          <span className="text-[9px] uppercase tracking-[0.3em] text-[var(--d-ink-soft)]">
            {content.materialLabel} · {piece.material}
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="[font-family:var(--demo-display)] text-xl leading-tight text-[var(--d-ink)]">
            {piece.name}
          </h3>
          <p className="mt-1 text-[13px] tabular-nums text-[var(--d-gold-bright)]">
            {format(piece.price)}
          </p>
        </div>
        <button
          type="button"
          onClick={() => onRequest(piece.id)}
          aria-label={`${content.requestLabel} — ${piece.name}`}
          className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--d-line)] text-[var(--d-ink)] transition-colors duration-300 hover:border-[var(--d-gold)] hover:bg-[var(--d-gold)] hover:text-[#0A0A0A]"
        >
          <Plus aria-hidden className="h-4 w-4" strokeWidth={1.4} />
        </button>
      </div>
    </motion.article>
  );
}

export function Collection({
  content,
  format,
  onRequest,
}: {
  content: NoirContent["collection"];
  format: (n: number) => string;
  onRequest: (id: string) => void;
}) {
  return (
    <section
      id="collection"
      className="relative border-t border-[var(--d-line-soft)] bg-[var(--d-bg)] px-6 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col gap-6 border-b border-[var(--d-line-soft)] pb-10 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="text-[10px] font-medium uppercase tracking-[0.42em] text-[var(--d-gold)]">
              {content.eyebrow}
            </p>
            <h2 className="mt-4 [font-family:var(--demo-display)] text-4xl leading-[1.02] text-[var(--d-ink)] sm:text-5xl">
              {content.title}
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-[var(--d-ink-soft)]">
            {content.intro}
          </p>
        </header>

        <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {content.pieces.map((piece, i) => (
            <PieceCard
              key={piece.id}
              piece={piece}
              index={i}
              content={content}
              format={format}
              onRequest={onRequest}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
