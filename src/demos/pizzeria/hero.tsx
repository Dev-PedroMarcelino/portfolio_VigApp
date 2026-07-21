"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Flame } from "lucide-react";
import type { PizzeriaContent } from "./content";
import { Eyebrow, FlourOverlay } from "./ui";

export function Hero({ content }: { content: PizzeriaContent["hero"] }) {
  const reduce = useReducedMotion();
  const ringLoop = `${content.ringText}${content.ringText}`;

  return (
    <section id="top" className="relative overflow-hidden scroll-mt-24">
      <FlourOverlay opacity={0.06} />
      <div
        aria-hidden
        className="absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(193,39,45,0.10),transparent_65%)]"
      />
      <div className="relative mx-auto grid max-w-6xl gap-14 px-6 pb-20 pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10 lg:pb-28 lg:pt-20">
        <div className="max-w-xl">
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <h1 className="mt-6 [font-family:var(--demo-display)] text-[clamp(2.7rem,6vw,4.5rem)] font-semibold leading-[1.02] tracking-tight">
            {content.titleTop}
            <br />
            <em className="italic text-[var(--d-red)]">{content.titleItalic}</em>
          </h1>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-[var(--d-ink-soft)]">
            {content.lede}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#menu"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--d-red)] px-6 py-3.5 text-sm font-semibold text-[#F5EBDC] shadow-[0_14px_34px_rgba(193,39,45,0.32)] transition-transform hover:scale-[1.03]"
            >
              {content.primaryCta}
              <ArrowDown className="h-4 w-4" strokeWidth={2} aria-hidden />
            </a>
            <a
              href="#storia"
              className="inline-flex items-center rounded-full border border-[rgba(42,26,16,0.28)] px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-[rgba(42,26,16,0.06)]"
            >
              {content.secondaryCta}
            </a>
          </div>
          <ul className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-medium uppercase tracking-[0.16em] text-[var(--d-ink-soft)]">
            {content.facts.map((fact, i) => (
              <li key={fact} className="flex items-center gap-3">
                {i > 0 && (
                  <span
                    aria-hidden
                    className="h-1 w-1 rounded-full bg-[var(--d-basil)]"
                  />
                )}
                {fact}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-[440px] lg:max-w-[500px]">
          {/* Rotating type ring */}
          <motion.div
            aria-hidden
            className="absolute inset-0"
            animate={reduce ? undefined : { rotate: -360 }}
            transition={
              reduce
                ? undefined
                : { duration: 150, ease: "linear", repeat: Infinity }
            }
          >
            <svg viewBox="0 0 100 100" className="h-full w-full">
              <defs>
                <path
                  id="fn-hero-ring"
                  d="M50,50 m-47.5,0 a47.5,47.5 0 1,1 95,0 a47.5,47.5 0 1,1 -95,0"
                />
              </defs>
              <text
                className="fill-[var(--d-red)] uppercase"
                style={{ fontSize: "4.4px", letterSpacing: "2px", fontWeight: 600 }}
              >
                <textPath href="#fn-hero-ring">{ringLoop}</textPath>
              </text>
            </svg>
          </motion.div>

          {/* Slow-turning pizza inside a circular mask */}
          <div className="absolute inset-[11%] rounded-full border border-[rgba(42,26,16,0.16)] p-2.5">
            <div className="relative h-full w-full overflow-hidden rounded-full shadow-[0_36px_80px_rgba(42,26,16,0.30)]">
              <motion.div
                className="absolute inset-0"
                animate={reduce ? undefined : { rotate: 360 }}
                transition={
                  reduce
                    ? undefined
                    : { duration: 75, ease: "linear", repeat: Infinity }
                }
              >
                <Image
                  src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1100&q=80"
                  alt={content.pizzaAlt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 420px, 80vw"
                  className="scale-[1.12] object-cover"
                />
              </motion.div>
              <div
                aria-hidden
                className="absolute inset-0 rounded-full shadow-[inset_0_0_60px_rgba(32,18,9,0.35)]"
              />
            </div>
          </div>

          {/* Hand-stamped seal */}
          <div className="absolute -bottom-3 left-1 flex h-24 w-24 -rotate-12 flex-col items-center justify-center gap-0.5 rounded-full border-2 border-[var(--d-red)] bg-[var(--d-bg)] text-[var(--d-red)] shadow-[0_10px_24px_rgba(42,26,16,0.18)] sm:h-28 sm:w-28">
            <Flame className="h-4 w-4" strokeWidth={2} aria-hidden />
            <span className="text-[9px] font-bold uppercase tracking-[0.22em]">
              {content.stampTop}
            </span>
            <span className="[font-family:var(--demo-display)] text-sm font-semibold italic">
              {content.stampBottom}
            </span>
          </div>

          {/* Basil-toned accents */}
          <div
            aria-hidden
            className="absolute -right-1 top-10 h-3 w-3 rounded-full bg-[var(--d-basil)]"
          />
          <div
            aria-hidden
            className="absolute right-8 top-3 h-2 w-2 rounded-full bg-[var(--d-red)]"
          />
        </div>
      </div>
    </section>
  );
}
