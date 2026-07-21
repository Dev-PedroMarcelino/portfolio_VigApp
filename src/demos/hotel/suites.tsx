"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import type { HotelContent, Suite } from "./content";
import type { CurrencyFormatter } from "./solace-root";

const EASE_SLOW: [number, number, number, number] = [0.16, 1, 0.3, 1];

function SuiteCard({
  suite,
  content,
  format,
  index,
}: {
  suite: Suite;
  content: HotelContent["suites"];
  format: CurrencyFormatter;
  index: number;
}) {
  const reduceMotion = useReducedMotion();
  const [photo, setPhoto] = useState(0);
  const count = suite.images.length;
  const flipped = index % 2 === 1;

  const go = (dir: number) => setPhoto((p) => (p + dir + count) % count);

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, ease: EASE_SLOW }}
      className="grid grid-cols-1 items-stretch gap-0 border border-[var(--d-line-soft)] bg-[var(--d-surface)] lg:grid-cols-2"
    >
      <div
        className={`group relative min-h-[320px] overflow-hidden lg:min-h-[520px] ${
          flipped ? "lg:order-2" : ""
        }`}
      >
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={photo}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={suite.images[photo].src}
              alt={suite.images[photo].alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(21,42,37,0.15)_0%,rgba(21,42,37,0.05)_50%,rgba(21,42,37,0.6)_100%)]"
        />

        <span className="absolute left-4 top-4 bg-[rgba(21,42,37,0.7)] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.28em] text-[var(--d-brass-bright)] backdrop-blur-sm">
          {suite.tier}
        </span>

        {count > 1 ? (
          <>
            <button
              type="button"
              aria-label={content.prevAria}
              onClick={() => go(-1)}
              className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--d-line)] bg-[rgba(21,42,37,0.55)] text-[var(--d-linen)] opacity-0 backdrop-blur-sm transition-opacity duration-300 hover:border-[var(--d-brass)] hover:text-[var(--d-brass)] group-hover:opacity-100"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={1.6} />
            </button>
            <button
              type="button"
              aria-label={content.nextAria}
              onClick={() => go(1)}
              className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--d-line)] bg-[rgba(21,42,37,0.55)] text-[var(--d-linen)] opacity-0 backdrop-blur-sm transition-opacity duration-300 hover:border-[var(--d-brass)] hover:text-[var(--d-brass)] group-hover:opacity-100"
            >
              <ChevronRight className="h-4 w-4" strokeWidth={1.6} />
            </button>
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2">
              {suite.images.map((img, i) => (
                <button
                  key={img.src}
                  type="button"
                  aria-label={`${content.galleryHint} ${i + 1}`}
                  aria-pressed={i === photo}
                  onClick={() => setPhoto(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === photo ? "w-6 bg-[var(--d-brass-bright)]" : "w-1.5 bg-[rgba(241,235,221,0.5)]"
                  }`}
                />
              ))}
            </div>
          </>
        ) : null}
      </div>

      <div className="flex flex-col justify-between gap-8 p-7 sm:p-10">
        <div>
          <div className="flex items-start justify-between gap-4">
            <h3 className="[font-family:var(--demo-display)] text-4xl font-medium leading-tight text-[var(--d-linen)] sm:text-5xl">
              {suite.name}
            </h3>
            <div className="text-right">
              <div className="text-[9px] uppercase tracking-[0.24em] text-[var(--d-ink-faint)]">
                {content.fromLabel}
              </div>
              <div className="[font-family:var(--demo-display)] text-3xl font-medium text-[var(--d-brass-bright)]">
                {format(suite.rate)}
              </div>
              <div className="text-[9px] uppercase tracking-[0.24em] text-[var(--d-ink-faint)]">
                {content.perNight}
              </div>
            </div>
          </div>

          <p className="mt-5 max-w-md text-sm leading-relaxed text-[var(--d-ink-soft)]">
            {suite.blurb}
          </p>

          <dl className="mt-7 grid grid-cols-3 gap-4 border-y border-[var(--d-line-soft)] py-5">
            {[
              { label: content.sleepsLabel, value: suite.sleeps },
              { label: content.sizeLabel, value: suite.size },
              { label: content.viewLabel, value: suite.view },
            ].map((row) => (
              <div key={row.label}>
                <dt className="text-[9px] uppercase tracking-[0.22em] text-[var(--d-ink-faint)]">
                  {row.label}
                </dt>
                <dd className="mt-1.5 text-xs text-[var(--d-linen)]">{row.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6">
            <span className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[var(--d-brass)]">
              {content.amenitiesLabel}
            </span>
            <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {suite.amenities.map((a) => (
                <li key={a} className="flex items-start gap-2 text-xs text-[var(--d-ink-soft)]">
                  <Check
                    aria-hidden
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--d-brass)]"
                    strokeWidth={1.8}
                  />
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <a
          href="#book"
          className="inline-flex w-full items-center justify-center border border-[var(--d-brass)] px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--d-brass)] transition-colors duration-300 hover:bg-[var(--d-brass)] hover:text-[#152A25] sm:w-auto sm:self-start"
        >
          {content.reserveCta}
        </a>
      </div>
    </motion.article>
  );
}

export function Suites({
  content,
  format,
}: {
  content: HotelContent["suites"];
  format: CurrencyFormatter;
}) {
  return (
    <section id="suites" className="relative bg-[var(--d-bg)] py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <header className="mb-14 max-w-2xl">
          <span className="text-[10px] font-semibold uppercase tracking-[0.36em] text-[var(--d-brass)]">
            {content.eyebrow}
          </span>
          <h2 className="mt-4 [font-family:var(--demo-display)] text-4xl font-medium leading-[1.05] text-[var(--d-linen)] sm:text-6xl">
            {content.title}
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-[var(--d-ink-soft)]">{content.intro}</p>
        </header>

        <div className="flex flex-col gap-8">
          {content.items.map((suite, i) => (
            <SuiteCard key={suite.id} suite={suite} content={content} format={format} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
