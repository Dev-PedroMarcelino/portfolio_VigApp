"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus, X } from "lucide-react";
import type { GalleryContent } from "./content";
import { Eyebrow, unsplash } from "./ui";

/** Varied tile spans for a playful masonry-style grid. */
const SPAN = [
  "sm:col-span-2 sm:row-span-2",
  "sm:col-span-1 sm:row-span-1",
  "sm:col-span-1 sm:row-span-1",
  "sm:col-span-1 sm:row-span-2",
  "sm:col-span-1 sm:row-span-1",
  "sm:col-span-2 sm:row-span-1",
];

export function Gallery({ content }: { content: GalleryContent }) {
  const [open, setOpen] = useState<number | null>(null);
  const count = content.images.length;

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir: number) => setOpen((cur) => (cur === null ? cur : (cur + dir + count) % count)),
    [count],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, step]);

  const current = open === null ? null : content.images[open];

  return (
    <section id="campus" className="relative bg-[var(--d-surface)] py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-2xl">
          <Eyebrow text={content.eyebrow} tone="mint" />
          <h2 className="mt-4 [font-family:var(--demo-display)] text-3xl font-extrabold leading-tight tracking-tight text-[var(--d-ink)] sm:text-4xl">
            {content.title}
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-[var(--d-ink-soft)]">{content.intro}</p>
        </div>

        <div className="mt-9 grid auto-rows-[150px] grid-cols-2 gap-3.5 sm:auto-rows-[168px] sm:grid-cols-4">
          {content.images.map((img, i) => (
            <button
              key={img.id + i}
              type="button"
              onClick={() => setOpen(i)}
              aria-label={img.caption}
              className={`group relative overflow-hidden rounded-[1.5rem] border-4 border-white shadow-[0_16px_36px_-26px_rgba(22,35,61,0.6)] ${SPAN[i % SPAN.length]}`}
            >
              <Image
                src={unsplash(img.id, 900)}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              />
              <div
                className="absolute inset-0 opacity-90 transition-opacity group-hover:opacity-100"
                style={{ background: "linear-gradient(180deg, rgba(22,35,61,0) 40%, rgba(22,35,61,0.72) 100%)" }}
                aria-hidden
              />
              <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[0.62rem] font-extrabold uppercase tracking-wide text-[var(--d-accent-deep)]">
                {img.tag}
              </span>
              <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--d-sun)] text-[var(--d-ink)] opacity-0 transition-opacity group-hover:opacity-100">
                <Plus className="h-4 w-4" strokeWidth={2.6} />
              </span>
              <p className="absolute inset-x-3 bottom-3 text-left text-sm font-extrabold leading-tight text-white">
                {img.caption}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* lightbox */}
      <AnimatePresence>
        {current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9000] flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(15,27,51,0.86)" }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={current.caption}
          >
            <button
              type="button"
              onClick={close}
              aria-label={content.closeLabel}
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/30"
            >
              <X className="h-5 w-5" strokeWidth={2.4} />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              aria-label={content.prevLabel}
              className="absolute left-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/30 sm:left-8"
            >
              <ChevronLeft className="h-6 w-6" strokeWidth={2.4} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              aria-label={content.nextLabel}
              className="absolute right-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/30 sm:right-8"
            >
              <ChevronRight className="h-6 w-6" strokeWidth={2.4} />
            </button>

            <motion.figure
              key={current.id}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl"
            >
              <div className="relative aspect-[3/2] overflow-hidden rounded-[1.75rem] border-4 border-white shadow-2xl">
                <Image
                  src={unsplash(current.id, 1600)}
                  alt={current.alt}
                  fill
                  sizes="(max-width: 768px) 92vw, 768px"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-4 flex items-center justify-center gap-3 text-center">
                <span className="rounded-full bg-[var(--d-sun)] px-3 py-1 text-xs font-extrabold text-[var(--d-ink)]">
                  {current.tag}
                </span>
                <span className="[font-family:var(--demo-display)] text-lg font-extrabold text-white">
                  {current.caption}
                </span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
