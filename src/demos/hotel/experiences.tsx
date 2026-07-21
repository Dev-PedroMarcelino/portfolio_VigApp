"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Clock, MoveHorizontal } from "lucide-react";
import type { HotelContent } from "./content";

const EASE_SLOW: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Experiences({ content }: { content: HotelContent["experiences"] }) {
  const reduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEdges = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 8);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    updateEdges();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      el.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, [updateEdges]);

  const scrollByCard = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-exp-card]");
    const amount = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * amount, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <section id="experiences" className="relative bg-[var(--d-bg)] py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <header className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="text-[10px] font-semibold uppercase tracking-[0.36em] text-[var(--d-brass)]">
              {content.eyebrow}
            </span>
            <h2 className="mt-4 [font-family:var(--demo-display)] text-4xl font-medium leading-[1.05] text-[var(--d-linen)] sm:text-6xl">
              {content.title}
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-[var(--d-ink-soft)]">{content.intro}</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label={content.prevAria}
              disabled={atStart}
              onClick={() => scrollByCard(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--d-line)] text-[var(--d-linen)] transition-colors duration-300 hover:border-[var(--d-brass)] hover:text-[var(--d-brass)] disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.6} />
            </button>
            <button
              type="button"
              aria-label={content.nextAria}
              disabled={atEnd}
              onClick={() => scrollByCard(1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--d-line)] text-[var(--d-linen)] transition-colors duration-300 hover:border-[var(--d-brass)] hover:text-[var(--d-brass)] disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ArrowRight className="h-4 w-4" strokeWidth={1.6} />
            </button>
          </div>
        </header>
      </div>

      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-5 pb-4 [scrollbar-width:none] sm:px-6 [&::-webkit-scrollbar]:hidden"
      >
        <div aria-hidden className="w-0 shrink-0 sm:w-[max(0px,calc((100vw_-_72rem)/2_-_1.5rem))]" />
        {content.items.map((exp, i) => (
          <motion.article
            key={exp.id}
            data-exp-card
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.9, delay: (i % 2) * 0.1, ease: EASE_SLOW }}
            className="group relative aspect-[3/4] w-[78vw] shrink-0 snap-center overflow-hidden border border-[var(--d-line-soft)] sm:w-[380px]"
          >
            <Image
              src={exp.image.src}
              alt={exp.image.alt}
              fill
              sizes="(max-width: 640px) 78vw, 380px"
              className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-105"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(180deg,rgba(21,42,37,0.05)_0%,rgba(21,42,37,0.35)_45%,rgba(21,42,37,0.9)_100%)]"
            />
            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-7">
              <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.24em] text-[var(--d-brass-bright)]">
                <Clock aria-hidden className="h-3 w-3" strokeWidth={1.6} />
                {content.durationLabel} {exp.duration} · {exp.time}
              </div>
              <h3 className="[font-family:var(--demo-display)] text-3xl font-medium leading-tight text-[var(--d-linen)]">
                {exp.name}
              </h3>
              <p className="max-w-xs text-xs leading-relaxed text-[var(--d-ink-soft)] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                {exp.description}
              </p>
            </div>
          </motion.article>
        ))}
        <div aria-hidden className="w-1 shrink-0 sm:w-[max(0px,calc((100vw_-_72rem)/2_-_1.5rem))]" />
      </div>

      <div className="mx-auto mt-6 flex max-w-6xl items-center gap-2 px-5 text-[10px] uppercase tracking-[0.24em] text-[var(--d-ink-faint)] sm:px-6">
        <MoveHorizontal aria-hidden className="h-3.5 w-3.5 text-[var(--d-brass)]" strokeWidth={1.6} />
        {content.scrollHint}
      </div>
    </section>
  );
}
