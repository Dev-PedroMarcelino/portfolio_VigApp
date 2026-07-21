"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CalendarRange, MapPin, Navigation } from "lucide-react";
import type { TravelContent, FilterOption, Journey } from "./content";
import type { ContinentId } from "./atlas-root";

const HERO_IMG =
  "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=2000&q=80";
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Hero({
  content,
  regions,
  popular,
  onSearch,
}: {
  content: TravelContent["hero"];
  regions: FilterOption[];
  popular: Journey[];
  onSearch: (id: ContinentId) => void;
}) {
  const reduce = useReducedMotion();
  const chips = popular.slice(0, 4);

  const rise = {
    hidden: { opacity: 0, y: reduce ? 0 : 26 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: 0.12 * i, ease: EASE },
    }),
  };

  return (
    <section className="relative isolate overflow-hidden pb-16 pt-28 sm:pt-32 lg:pb-24">
      {/* Backdrop */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={HERO_IMG}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,34,42,0.72),rgba(6,46,56,0.86)_46%,rgba(6,46,56,0.97))]" />
        <div className="absolute inset-0 mix-blend-soft-light bg-[radial-gradient(120%_90%_at_78%_8%,rgba(253,186,116,0.42),transparent_55%)]" />
      </div>

      {/* Dotted route flourish */}
      <svg
        className="pointer-events-none absolute right-[-40px] top-24 hidden h-[420px] w-[520px] opacity-60 lg:block"
        viewBox="0 0 520 420"
        fill="none"
        aria-hidden
      >
        <path
          d="M20 380 C 150 300, 120 160, 260 150 S 420 120, 500 40"
          stroke="var(--d-peach)"
          strokeWidth="1.4"
          strokeDasharray="2 9"
          strokeLinecap="round"
        />
        <circle cx="20" cy="380" r="5" fill="var(--d-peach)" />
        <circle cx="260" cy="150" r="4" fill="var(--d-peach-bright)" />
        <circle cx="500" cy="40" r="5" fill="var(--d-peach)" />
      </svg>

      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div>
          <motion.p
            custom={0}
            variants={rise}
            initial="hidden"
            animate="show"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--d-line)] px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.32em] text-[var(--d-peach-bright)]"
          >
            <Navigation className="h-3 w-3" strokeWidth={1.8} aria-hidden />
            {content.kicker}
          </motion.p>

          <motion.h1
            custom={1}
            variants={rise}
            initial="hidden"
            animate="show"
            className="mt-6 [font-family:var(--demo-display)] text-[clamp(2.9rem,7vw,5.4rem)] font-light leading-[0.95] tracking-tight text-[var(--d-ink)]"
          >
            {content.titleLead}{" "}
            <span className="italic font-normal text-[var(--d-peach)]">{content.titleAccent}</span>
            <span className="block text-[var(--d-ink-soft)]">{content.titleTail}</span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={rise}
            initial="hidden"
            animate="show"
            className="mt-6 max-w-md text-sm leading-relaxed text-[var(--d-ink-soft)] sm:text-base"
          >
            {content.intro}
          </motion.p>

          <motion.dl
            custom={3}
            variants={rise}
            initial="hidden"
            animate="show"
            className="mt-9 flex flex-wrap gap-8"
          >
            {content.stats.map((s) => (
              <div key={s.label}>
                <dt className="[font-family:var(--demo-display)] text-3xl font-light text-[var(--d-peach)]">
                  {s.value}
                </dt>
                <dd className="mt-1 text-[10px] uppercase tracking-[0.28em] text-[var(--d-ink-faint)]">
                  {s.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Search card */}
        <motion.div
          custom={2}
          variants={rise}
          initial="hidden"
          animate="show"
          className="rounded-[26px] border border-[var(--d-line-soft)] bg-[rgba(8,58,71,0.66)] p-6 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)] backdrop-blur-md sm:p-7"
        >
          <p className="[font-family:var(--demo-display)] text-2xl italic text-[var(--d-ink)]">
            {content.searchLabel}
          </p>

          <form
            className="mt-5 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              onSearch((data.get("where") as ContinentId) ?? "all");
            }}
          >
            <label className="block">
              <span className="mb-1.5 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--d-ink-faint)]">
                <MapPin className="h-3 w-3" strokeWidth={1.8} aria-hidden />
                {content.whereLabel}
              </span>
              <select
                name="where"
                aria-label={content.whereAria}
                defaultValue="all"
                className="w-full appearance-none rounded-xl border border-[var(--d-line-soft)] bg-[var(--d-deep)] px-4 py-3 text-sm text-[var(--d-ink)] outline-none transition-colors focus:border-[var(--d-peach)]"
              >
                {regions.map((r) => (
                  <option key={r.id} value={r.id} className="bg-[var(--d-deep)] text-[var(--d-ink)]">
                    {r.label}
                  </option>
                ))}
              </select>
            </label>

            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="mb-1.5 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--d-ink-faint)]">
                  <CalendarRange className="h-3 w-3" strokeWidth={1.8} aria-hidden />
                  {content.whenLabel}
                </span>
                <input
                  type="text"
                  name="when"
                  placeholder={content.whenPlaceholder}
                  className="w-full rounded-xl border border-[var(--d-line-soft)] bg-[var(--d-deep)] px-4 py-3 text-sm text-[var(--d-ink)] placeholder:text-[var(--d-ink-faint)] outline-none transition-colors focus:border-[var(--d-peach)]"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--d-ink-faint)]">
                  {content.styleLabel}
                </span>
                <select
                  name="pace"
                  aria-label={content.styleAria}
                  defaultValue="any"
                  className="w-full appearance-none rounded-xl border border-[var(--d-line-soft)] bg-[var(--d-deep)] px-4 py-3 text-sm text-[var(--d-ink)] outline-none transition-colors focus:border-[var(--d-peach)]"
                >
                  {content.styleOptions.map((o) => (
                    <option key={o.id} value={o.id} className="bg-[var(--d-deep)] text-[var(--d-ink)]">
                      {o.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <button
              type="submit"
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--d-peach)] px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] text-[#04222A] transition-transform duration-300 hover:scale-[1.02]"
            >
              {content.searchCta}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} aria-hidden />
            </button>
          </form>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.24em] text-[var(--d-ink-faint)]">
              {content.popularLabel}
            </span>
            {chips.map((j) => (
              <button
                key={j.id}
                type="button"
                onClick={() => onSearch(j.continent)}
                className="rounded-full border border-[var(--d-line)] px-3 py-1 text-[11px] text-[var(--d-ink-soft)] transition-colors hover:border-[var(--d-peach)] hover:text-[var(--d-peach)]"
              >
                {j.region}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
