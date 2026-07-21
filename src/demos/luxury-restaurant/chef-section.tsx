"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { LumiereContent } from "./content";

const EASE_SLOW: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function ChefSection({
  content,
  detailAlt,
}: {
  content: LumiereContent["chef"];
  detailAlt: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <section id="chef" className="relative overflow-hidden bg-[var(--d-bg-soft)] py-28 sm:py-36">
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 lg:grid-cols-2 lg:gap-24">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, ease: EASE_SLOW }}
          className="relative"
        >
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1100&q=80"
              alt={content.imageAlt}
              fill
              sizes="(min-width: 1024px) 520px, 100vw"
              className="object-cover [filter:sepia(0.3)_contrast(1.05)_brightness(0.78)]"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(200deg,rgba(201,162,39,0.12)_0%,rgba(14,12,8,0.05)_45%,rgba(14,12,8,0.6)_100%)]"
            />
          </div>
          <div
            aria-hidden
            className="absolute -bottom-5 -right-5 -z-0 hidden h-full w-full border border-[var(--d-line)] sm:block"
          />
          <div className="absolute -bottom-10 -right-3 hidden w-44 overflow-hidden border border-[var(--d-line)] shadow-2xl shadow-black/50 sm:block lg:w-52">
            <div className="relative aspect-square">
              <Image
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80"
                alt={detailAlt}
                fill
                sizes="208px"
                className="object-cover [filter:sepia(0.35)_contrast(1.05)_brightness(0.85)]"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, delay: 0.15, ease: EASE_SLOW }}
        >
          <p className="text-[10px] font-medium uppercase tracking-[0.5em] text-[var(--d-gold)]">
            {content.eyebrow}
          </p>
          <blockquote className="[font-family:var(--demo-display)] mt-6 text-3xl font-normal italic leading-snug text-[var(--d-ink)] sm:text-4xl">
            <span aria-hidden className="mr-1 text-[var(--d-gold)]">
              &ldquo;
            </span>
            {content.quote}
            <span aria-hidden className="ml-1 text-[var(--d-gold)]">
              &rdquo;
            </span>
          </blockquote>

          <div className="mt-8 space-y-5">
            {content.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 32)}
                className="text-sm font-light leading-relaxed text-[var(--d-ink-soft)]"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-9 flex items-center gap-4">
            <span aria-hidden className="h-px w-12 bg-[var(--d-gold)]" />
            <div>
              <p className="[font-family:var(--demo-display)] text-2xl italic text-[var(--d-gold-bright)]">
                {content.name}
              </p>
              <p className="mt-0.5 text-[10px] uppercase tracking-[0.3em] text-[var(--d-ink-faint)]">
                {content.role}
              </p>
            </div>
          </div>

          <dl className="mt-12 grid grid-cols-3 divide-x divide-[var(--d-line-soft)] border-y border-[var(--d-line-soft)]">
            {content.credentials.map((credential) => (
              <div
                key={credential.label}
                className="flex flex-col px-4 py-6 text-center first:pl-0 last:pr-0"
              >
                <dt className="order-2 mt-2 text-[9px] uppercase leading-relaxed tracking-[0.25em] text-[var(--d-ink-faint)]">
                  {credential.label}
                </dt>
                <dd className="[font-family:var(--demo-display)] order-1 text-4xl text-[var(--d-ink)]">
                  {credential.value}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
}

export function Interlude({ content }: { content: LumiereContent["interlude"] }) {
  const reduceMotion = useReducedMotion();

  return (
    <section aria-label={content.attribution} className="relative overflow-hidden">
      <div className="relative flex min-h-[60vh] items-center justify-center px-6 py-32">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=80"
            alt={content.imageAlt}
            fill
            sizes="100vw"
            className="object-cover [filter:sepia(0.2)_brightness(0.6)]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(180deg,#0E0C08_0%,rgba(14,12,8,0.5)_35%,rgba(14,12,8,0.5)_65%,#0E0C08_100%)]"
          />
        </div>
        <motion.figure
          initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.4, ease: EASE_SLOW }}
          className="relative z-10 max-w-3xl text-center"
        >
          <blockquote className="[font-family:var(--demo-display)] text-3xl font-normal italic leading-snug text-[var(--d-ink)] sm:text-5xl">
            {content.quote}
          </blockquote>
          <figcaption className="mt-8 flex items-center justify-center gap-4 text-[10px] uppercase tracking-[0.4em] text-[var(--d-gold)]">
            <span aria-hidden className="h-px w-8 bg-[var(--d-line)]" />
            {content.attribution}
            <span aria-hidden className="h-px w-8 bg-[var(--d-line)]" />
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
