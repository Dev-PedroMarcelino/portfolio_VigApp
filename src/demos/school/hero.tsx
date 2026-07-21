"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Star as StarIcon } from "lucide-react";
import type { HeroContent } from "./content";
import { Blob, Eyebrow, Star, Wave, scrollToId, unsplash } from "./ui";

export function Hero({ content }: { content: HeroContent }) {
  const reduce = useReducedMotion();

  const float = (delay: number) =>
    reduce
      ? {}
      : {
          animate: { y: [0, -14, 0] },
          transition: { duration: 4.5, repeat: Infinity, ease: "easeInOut" as const, delay },
        };

  return (
    <section className="relative overflow-hidden bg-[var(--d-bg)] pt-10 sm:pt-14">
      {/* decorative shapes */}
      <Blob className="left-[-6rem] top-8 h-56 w-56 opacity-60" color="var(--d-mint-soft)" />
      <Blob className="right-[-5rem] top-24 h-64 w-64 opacity-70" color="var(--d-sun-soft)" />
      <Blob className="bottom-24 left-1/3 h-40 w-40 opacity-50" color="var(--d-coral-soft)" />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-5 pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pb-24">
        <div>
          <Eyebrow text={content.eyebrow} tone="coral" />
          <h1 className="mt-5 [font-family:var(--demo-display)] text-[2.7rem] font-extrabold leading-[1.02] tracking-tight text-[var(--d-ink)] sm:text-6xl">
            {content.titleLead}{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-[var(--d-accent)]">{content.titleHighlight}</span>
              <svg
                aria-hidden
                viewBox="0 0 240 24"
                preserveAspectRatio="none"
                className="absolute -bottom-1 left-0 z-0 h-3 w-full"
              >
                <path
                  d="M4,14 C60,4 180,4 236,12"
                  fill="none"
                  stroke="var(--d-sun)"
                  strokeWidth="7"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            {content.titleTail}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--d-ink-soft)]">{content.subhead}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => scrollToId("enroll")}
              className="group inline-flex items-center gap-2 rounded-full bg-[var(--d-accent)] px-6 py-3.5 text-base font-extrabold text-white shadow-[0_14px_30px_-12px_rgba(37,99,235,0.8)] transition-transform hover:scale-[1.04]"
            >
              {content.ctaPrimary}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" strokeWidth={2.4} />
            </button>
            <button
              type="button"
              onClick={() => scrollToId("programs")}
              className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--d-line)] bg-white px-6 py-3.5 text-base font-extrabold text-[var(--d-ink)] transition-colors hover:border-[var(--d-accent)] hover:text-[var(--d-accent)]"
            >
              {content.ctaSecondary}
            </button>
          </div>

          <dl className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
            {content.badges.map((b) => (
              <div key={b.label} className="flex items-center gap-3">
                <dt className="[font-family:var(--demo-display)] text-3xl font-extrabold text-[var(--d-accent)]">
                  {b.value}
                </dt>
                <dd className="max-w-[6.5rem] text-sm font-bold leading-tight text-[var(--d-ink-soft)]">{b.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* image cluster */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <motion.div {...float(0)} className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] border-4 border-white shadow-[0_30px_60px_-24px_rgba(22,35,61,0.5)]">
              <Image
                src={unsplash("photo-1509062522246-3755977927d7", 1000)}
                alt={content.imageAlt}
                fill
                sizes="(max-width: 1024px) 90vw, 460px"
                className="object-cover"
                priority
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(37,99,235,0.05) 0%, rgba(37,99,235,0) 45%, rgba(22,35,61,0.35) 100%)",
                }}
                aria-hidden
              />
            </div>
          </motion.div>

          {/* floating star badge */}
          <motion.div
            {...float(0.8)}
            className="absolute -left-3 top-8 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-[0_16px_30px_-14px_rgba(22,35,61,0.5)] sm:-left-6"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--d-sun)] text-[var(--d-ink)]">
              <StarIcon className="h-5 w-5" strokeWidth={2.4} fill="currentColor" />
            </span>
            <span className="[font-family:var(--demo-display)] text-sm font-extrabold leading-tight text-[var(--d-ink)]">
              {content.badges[2]?.value}
              <span className="block text-[0.68rem] font-bold text-[var(--d-ink-soft)]">{content.badges[2]?.label}</span>
            </span>
          </motion.div>

          <Star className="-right-1 top-2 h-8 w-8 sm:-right-3" color="var(--d-coral)" />
          <Star className="bottom-6 -left-4 h-5 w-5" color="var(--d-mint)" />
        </div>
      </div>

      {/* ribbon */}
      <div className="relative z-10 overflow-hidden bg-[var(--d-accent)]">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-3 px-5 py-3 text-center">
          <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--d-sun)]" aria-hidden />
          <p className="text-sm font-extrabold text-white">{content.ribbon}</p>
          <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--d-sun)]" aria-hidden />
        </div>
      </div>

      <Wave fill="var(--d-surface)" />
    </section>
  );
}
