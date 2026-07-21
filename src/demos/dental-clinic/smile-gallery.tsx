"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MoveHorizontal, Quote } from "lucide-react";
import type { GalleryContent } from "./content";
import { Section, SectionLabel } from "./ui";

const SMILE_IMG =
  "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1400&q=80";

/** Art direction per case: crop focus + duotone strength for the before layer. */
const CASE_STYLE: Record<string, { position: string; before: string; after: string }> = {
  whitening: {
    position: "50% 45%",
    before: "saturate(0.5) brightness(0.8) sepia(0.35)",
    after: "saturate(1.12) brightness(1.04)",
  },
  aligners: {
    position: "50% 62%",
    before: "saturate(0.55) brightness(0.85) sepia(0.22) contrast(0.95)",
    after: "saturate(1.08) brightness(1.03)",
  },
  veneers: {
    position: "50% 32%",
    before: "saturate(0.45) brightness(0.78) sepia(0.3) contrast(0.92)",
    after: "saturate(1.1) brightness(1.05)",
  },
};

export function SmileGallery({ content }: { content: GalleryContent }) {
  const [caseIndex, setCaseIndex] = useState(0);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const activeCase = content.cases[caseIndex];
  const style = CASE_STYLE[activeCase.id] ?? CASE_STYLE.whitening;

  const updateFromClientX = (clientX: number) => {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, next)));
  };

  const selectCase = (index: number) => {
    setCaseIndex(index);
    setPos(50);
  };

  const onHandleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 5));
    else if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 5));
    else if (e.key === "Home") setPos(0);
    else if (e.key === "End") setPos(100);
    else return;
    e.preventDefault();
  };

  return (
    <Section id="gallery" className="overflow-hidden bg-[var(--d-bg)]">
      <div className="max-w-xl">
        <SectionLabel text={content.label} />
        <h2 className="mt-5 [font-family:var(--demo-display)] text-3xl font-bold tracking-tight text-[var(--d-ink)] sm:text-5xl">
          {content.title}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-[var(--d-ink-soft)]">{content.intro}</p>
      </div>

      <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label={content.label}>
        {content.cases.map((galleryCase, index) => {
          const selected = index === caseIndex;
          return (
            <button
              key={galleryCase.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => selectCase(index)}
              className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-all ${
                selected
                  ? "border-[var(--d-accent)] bg-[var(--d-accent)] text-white shadow-[0_14px_30px_-14px_rgba(46,124,192,0.9)]"
                  : "border-[var(--d-line)] bg-white text-[var(--d-ink-soft)] hover:border-[var(--d-accent)]/40 hover:text-[var(--d-accent-deep)]"
              }`}
            >
              {galleryCase.label}
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid items-stretch gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Comparison frame */}
        <div
          ref={frameRef}
          className="relative aspect-[4/3] cursor-ew-resize touch-none select-none overflow-hidden rounded-[2.5rem] border border-white/70 shadow-[0_40px_80px_-40px_rgba(19,74,120,0.55)]"
          onPointerDown={(e) => {
            dragging.current = true;
            e.currentTarget.setPointerCapture(e.pointerId);
            updateFromClientX(e.clientX);
          }}
          onPointerMove={(e) => {
            if (dragging.current) updateFromClientX(e.clientX);
          }}
          onPointerUp={() => {
            dragging.current = false;
          }}
          onPointerCancel={() => {
            dragging.current = false;
          }}
        >
          {/* After layer (base) */}
          <Image
            src={SMILE_IMG}
            alt={activeCase.alt}
            fill
            sizes="(min-width: 1024px) 56vw, 92vw"
            className="object-cover"
            style={{ objectPosition: style.position, filter: style.after }}
          />
          <span className="absolute bottom-5 right-5 rounded-full bg-[var(--d-accent)] px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white">
            {content.afterLabel}
          </span>

          {/* Before layer, clipped by the handle position */}
          <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }} aria-hidden>
            <Image
              src={SMILE_IMG}
              alt=""
              fill
              sizes="(min-width: 1024px) 56vw, 92vw"
              className="object-cover"
              style={{ objectPosition: style.position, filter: style.before }}
            />
            <div className="absolute inset-0 bg-[#28516F]/15" />
            <span className="absolute bottom-5 left-5 rounded-full bg-[#28516F]/80 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white backdrop-blur">
              {content.beforeLabel}
            </span>
          </div>

          {/* Divider + handle */}
          <div className="absolute inset-y-0" style={{ left: `${pos}%` }} aria-hidden>
            <div className="absolute inset-y-0 -ml-px w-0.5 bg-white/90 shadow-[0_0_16px_rgba(255,255,255,0.9)]" />
          </div>
          <button
            type="button"
            role="slider"
            aria-label={content.sliderAria}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pos)}
            onKeyDown={onHandleKeyDown}
            className="absolute top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/70 bg-white/90 text-[var(--d-accent-deep)] shadow-[0_16px_30px_-10px_rgba(19,74,120,0.6)] backdrop-blur transition-transform hover:scale-110 focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--d-aqua)]/60"
            style={{ left: `${pos}%` }}
          >
            <MoveHorizontal className="h-5 w-5" strokeWidth={2.2} />
          </button>

          <span className="pointer-events-none absolute left-1/2 top-5 -translate-x-1/2 rounded-full bg-white/80 px-4 py-1.5 text-[0.65rem] font-semibold uppercase tracking-widest text-[var(--d-ink-soft)] backdrop-blur">
            {content.dragHint}
          </span>
        </div>

        {/* Case details */}
        <AnimatePresence mode="wait">
          <motion.aside
            key={activeCase.id}
            initial={reduce ? false : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? undefined : { opacity: 0, x: -16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] border border-[var(--d-line)] bg-white p-8 shadow-[0_24px_50px_-32px_rgba(19,74,120,0.45)]"
          >
            <div>
              <Quote className="h-8 w-8 text-[var(--d-aqua)]" strokeWidth={1.6} aria-hidden />
              <blockquote className="mt-4 [font-family:var(--demo-display)] text-xl font-semibold leading-relaxed text-[var(--d-ink)]">
                {activeCase.quote}
              </blockquote>
              <p className="mt-4 text-sm font-semibold text-[var(--d-accent-deep)]">{activeCase.patient}</p>
            </div>

            <dl className="mt-8 grid grid-cols-1 gap-4 border-t border-dashed border-[var(--d-line)] pt-6 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              <div>
                <dt className="text-[0.65rem] font-semibold uppercase tracking-widest text-[var(--d-ink-soft)]">
                  {content.meta.treatment}
                </dt>
                <dd className="mt-1 text-sm font-semibold text-[var(--d-ink)]">{activeCase.treatment}</dd>
              </div>
              <div>
                <dt className="text-[0.65rem] font-semibold uppercase tracking-widest text-[var(--d-ink-soft)]">
                  {content.meta.sessions}
                </dt>
                <dd className="mt-1 text-sm font-semibold text-[var(--d-ink)]">{activeCase.sessions}</dd>
              </div>
              <div>
                <dt className="text-[0.65rem] font-semibold uppercase tracking-widest text-[var(--d-ink-soft)]">
                  {content.meta.duration}
                </dt>
                <dd className="mt-1 text-sm font-semibold text-[var(--d-ink)]">{activeCase.duration}</dd>
              </div>
            </dl>
          </motion.aside>
        </AnimatePresence>
      </div>
    </Section>
  );
}
