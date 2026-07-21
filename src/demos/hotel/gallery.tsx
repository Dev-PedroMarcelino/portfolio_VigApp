"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { HotelContent } from "./content";

const EASE_SLOW: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Gallery({ content }: { content: HotelContent["gallery"] }) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);
  const count = content.shots.length;

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (dir: number) => setActive((a) => (a === null ? a : (a + dir + count) % count)),
    [count],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, close, step]);

  return (
    <section id="gallery" className="relative bg-[var(--d-pine)] py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <header className="mb-12 max-w-2xl">
          <span className="text-[10px] font-semibold uppercase tracking-[0.36em] text-[var(--d-brass)]">
            {content.eyebrow}
          </span>
          <h2 className="mt-4 [font-family:var(--demo-display)] text-4xl font-medium leading-[1.05] text-[var(--d-linen)] sm:text-6xl">
            {content.title}
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-[var(--d-ink-soft)]">{content.intro}</p>
        </header>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {content.shots.map((shot, i) => {
            const wide = i === 0 || i === 5;
            return (
              <motion.button
                key={shot.src + i}
                type="button"
                onClick={() => setActive(i)}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.8, delay: (i % 3) * 0.08, ease: EASE_SLOW }}
                className={`group relative aspect-[4/3] overflow-hidden border border-[var(--d-line-soft)] ${
                  wide ? "col-span-2 lg:col-span-2" : ""
                }`}
              >
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(21,42,37,0.75)_100%)] opacity-70 transition-opacity duration-500 group-hover:opacity-90"
                />
                <span className="absolute bottom-4 left-4 right-4 text-left [font-family:var(--demo-display)] text-lg font-medium italic text-[var(--d-linen)]">
                  {shot.caption}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {active !== null ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[9000] flex items-center justify-center bg-[rgba(10,20,17,0.94)] p-4 backdrop-blur-md sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={content.shots[active].caption}
            onClick={close}
          >
            <button
              type="button"
              aria-label={content.closeAria}
              onClick={close}
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--d-line)] text-[var(--d-linen)] transition-colors hover:border-[var(--d-brass)] hover:text-[var(--d-brass)]"
            >
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>

            <button
              type="button"
              aria-label={content.prevAria}
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--d-line)] text-[var(--d-linen)] transition-colors hover:border-[var(--d-brass)] hover:text-[var(--d-brass)] sm:left-8"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
            </button>

            <motion.figure
              key={active}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: EASE_SLOW }}
              className="relative flex max-h-full w-full max-w-4xl flex-col items-center gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[3/2] w-full overflow-hidden">
                <Image
                  src={content.shots[active].src}
                  alt={content.shots[active].alt}
                  fill
                  sizes="90vw"
                  className="object-contain"
                />
              </div>
              <figcaption className="[font-family:var(--demo-display)] text-xl font-medium italic text-[var(--d-brass-bright)]">
                {content.shots[active].caption}
              </figcaption>
            </motion.figure>

            <button
              type="button"
              aria-label={content.nextAria}
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--d-line)] text-[var(--d-linen)] transition-colors hover:border-[var(--d-brass)] hover:text-[var(--d-brass)] sm:right-8"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
