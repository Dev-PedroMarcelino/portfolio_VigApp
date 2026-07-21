"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Search, Bike } from "lucide-react";
import type { PratoContent, FilterId } from "./content";
import { foodImage, Eyebrow } from "./ui";

export function Hero({
  content,
  onCuisine,
}: {
  content: PratoContent["hero"];
  onCuisine: (id: FilterId) => void;
}) {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[var(--d-cream)]" id="top">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[var(--d-accent)] opacity-20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 left-1/4 h-80 w-80 rounded-full bg-[var(--d-lime)] opacity-20 blur-3xl"
      />
      <div className="relative z-[2] mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <div>
          <Eyebrow>{content.badge}</Eyebrow>
          <h1 className="mt-5 [font-family:var(--demo-display)] text-5xl font-bold leading-[0.95] tracking-tight text-[var(--d-ink)] sm:text-6xl lg:text-7xl">
            {content.titleLines.map((line, i) => (
              <span key={line} className="block">
                {i === 1 ? (
                  <span className="text-[var(--d-accent)]">{line}</span>
                ) : (
                  line
                )}
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-[var(--d-ink-soft)]">
            {content.lede}
          </p>

          <form
            className="mt-8 flex w-full max-w-md flex-col gap-2 rounded-2xl border border-[var(--d-line)] bg-[var(--d-card)] p-2 shadow-[0_20px_60px_-30px_rgba(36,18,6,0.5)] sm:flex-row sm:items-center"
            onSubmit={(e) => e.preventDefault()}
          >
            <label className="flex flex-1 items-center gap-2.5 rounded-xl px-3 py-2.5">
              <MapPin className="h-5 w-5 shrink-0 text-[var(--d-accent)]" aria-hidden />
              <span className="sr-only">{content.searchLabel}</span>
              <input
                type="text"
                defaultValue={content.searchValue}
                placeholder={content.searchPlaceholder}
                className="w-full bg-transparent text-sm font-medium text-[var(--d-ink)] outline-none placeholder:text-[var(--d-ink-soft)]"
              />
            </label>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--d-accent)] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--d-accent-deep)]"
            >
              <Search className="h-4 w-4" strokeWidth={2.4} aria-hidden />
              {content.searchButton}
            </button>
          </form>

          <div className="mt-7">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--d-ink-soft)]">
              {content.cuisineTitle}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {content.chips.map((chip) => (
                <button
                  key={chip.id}
                  type="button"
                  onClick={() => onCuisine(chip.id)}
                  className="rounded-full border border-[var(--d-line-strong)] bg-[var(--d-card)] px-4 py-2 text-sm font-semibold text-[var(--d-ink)] transition-all hover:-translate-y-0.5 hover:border-[var(--d-accent)] hover:text-[var(--d-accent)]"
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>

          <dl className="mt-9 flex flex-wrap gap-x-8 gap-y-4">
            {content.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="[font-family:var(--demo-display)] text-2xl font-bold text-[var(--d-ink)]">
                  {stat.value}
                </dt>
                <dd className="text-xs font-medium text-[var(--d-ink-soft)]">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-[var(--d-line)] shadow-[0_40px_90px_-40px_rgba(36,18,6,0.6)]">
            <Image
              src={foodImage("pizza", 1000)}
              alt={content.heroImageAlt}
              fill
              sizes="(max-width: 1024px) 90vw, 460px"
              className="object-cover"
              priority
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,90,31,0.08) 0%, rgba(36,18,6,0.05) 40%, rgba(36,18,6,0.55) 100%)",
              }}
            />
            <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-[var(--d-ink)]/85 px-3 py-1.5 text-[11px] font-bold text-white backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--d-lime)] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--d-lime)]" />
              </span>
              {content.liveBadge}
            </div>
          </div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="absolute -bottom-5 -left-4 flex items-center gap-3 rounded-2xl border border-[var(--d-line)] bg-[var(--d-card)] px-4 py-3 shadow-[0_24px_60px_-30px_rgba(36,18,6,0.7)] sm:-left-8"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--d-lime)] text-[var(--d-ink)]">
              <Bike className="h-5 w-5" strokeWidth={2.2} aria-hidden />
            </span>
            <div>
              <p className="text-sm font-bold text-[var(--d-ink)]">
                {content.liveNote}
              </p>
              <div className="mt-1.5 h-1.5 w-28 overflow-hidden rounded-full bg-[var(--d-cream)]">
                <motion.span
                  className="block h-full rounded-full bg-[var(--d-accent)]"
                  initial={{ width: "20%" }}
                  animate={reduce ? { width: "70%" } : { width: ["25%", "80%", "25%"] }}
                  transition={
                    reduce
                      ? { duration: 0 }
                      : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
                  }
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
