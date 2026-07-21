"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Compass, Download } from "lucide-react";
import type { AltureContent } from "./content";
import type { FormatFn } from "./alture";

function unsplash(id: string, w: number) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
}

export function Spotlight({
  content,
  format,
}: {
  content: AltureContent["spotlight"];
  format: FormatFn;
}) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const shot = content.gallery[active];

  return (
    <section id="spotlight" className="scroll-mt-24 bg-[var(--d-bg)] py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          {/* Gallery */}
          <div>
            <div
              className="relative aspect-[4/3] overflow-hidden border border-[var(--d-line-soft)]"
              role="group"
              aria-label={content.galleryAria}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={shot.id}
                  initial={reduceMotion ? false : { opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={unsplash(shot.imageId, 1200)}
                    alt={shot.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(180deg,transparent_60%,rgba(11,27,46,0.7)_100%)]"
              />
              <p className="absolute bottom-4 left-4 text-[11px] uppercase tracking-[0.2em] text-[var(--d-ivory)]">
                {shot.caption}
              </p>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {content.gallery.map((item, index) => {
                const selected = index === active;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActive(index)}
                    aria-pressed={selected}
                    aria-label={item.caption}
                    className={`relative aspect-[4/3] overflow-hidden border transition-all duration-300 ${
                      selected
                        ? "border-[var(--d-gold)] opacity-100"
                        : "border-[var(--d-line-soft)] opacity-55 hover:opacity-90"
                    }`}
                  >
                    <Image
                      src={unsplash(item.imageId, 320)}
                      alt=""
                      fill
                      sizes="120px"
                      className="object-cover"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detail */}
          <div className="flex flex-col">
            <p className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.4em] text-[var(--d-gold)]">
              <span aria-hidden className="h-px w-8 bg-[var(--d-line)]" />
              {content.eyebrow}
            </p>
            <h2 className="mt-5 [font-family:var(--demo-display)] text-4xl font-medium text-[var(--d-ivory)] sm:text-5xl">
              {content.title}
            </h2>
            <p className="mt-2 text-sm text-[var(--d-ink-faint)]">{content.address}</p>

            <div className="mt-6 flex items-baseline gap-3 border-y border-[var(--d-line-soft)] py-5">
              <span className="text-[10px] uppercase tracking-[0.24em] text-[var(--d-ink-faint)]">
                {content.priceLabel}
              </span>
              <span className="[font-family:var(--demo-display)] text-3xl font-medium text-[var(--d-gold-bright)]">
                {format(content.price)}
              </span>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-[var(--d-ink-soft)]">
              {content.description}
            </p>

            <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-3">
              {content.specs.map((spec) => (
                <div key={spec.label} className="border-l border-[var(--d-line)] pl-3">
                  <dt className="text-[10px] uppercase tracking-[0.2em] text-[var(--d-ink-faint)]">
                    {spec.label}
                  </dt>
                  <dd className="mt-1 [font-family:var(--demo-display)] text-lg text-[var(--d-ivory)]">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>

            <ul className="mt-8 grid gap-2.5 sm:grid-cols-2">
              {content.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-xs text-[var(--d-ink-soft)]">
                  <Check
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--d-gold)]"
                    strokeWidth={2}
                    aria-hidden
                  />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="flex items-center gap-2 bg-[var(--d-gold)] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0B1B2E] transition-colors duration-300 hover:bg-[var(--d-gold-bright)]"
              >
                <Compass className="h-4 w-4" strokeWidth={1.7} aria-hidden />
                {content.tourCta}
              </a>
              <a
                href="#journey"
                className="flex items-center gap-2 border border-[var(--d-line)] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--d-ink)] transition-colors duration-300 hover:border-[var(--d-gold)] hover:text-[var(--d-gold-bright)]"
              >
                <Download className="h-4 w-4" strokeWidth={1.7} aria-hidden />
                {content.brochureCta}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
