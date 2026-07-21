"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Asterisk } from "lucide-react";
import type { HeroContent } from "./content";
import { scrollToId, Starburst } from "./ui";

const IMG_CRATE =
  "https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=1200&q=80";
const IMG_SNACKS =
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80";
const IMG_BOWL =
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80";

export function CratefulHero({ content }: { content: HeroContent }) {
  const reduce = useReducedMotion() ?? false;

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 pb-20 pt-10 md:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        <div className="relative z-10">
          <p className="inline-flex items-center gap-2 rounded-full border border-[var(--d-line)] bg-[var(--d-card)] px-4 py-1.5 text-[0.66rem] font-extrabold uppercase tracking-[0.24em] text-[var(--d-accent)]">
            <Asterisk className="h-3.5 w-3.5" strokeWidth={2.4} aria-hidden />
            {content.kicker}
          </p>
          <h1 className="mt-6 [font-family:var(--demo-display)] text-5xl leading-[1.02] tracking-tight sm:text-6xl xl:text-7xl">
            {content.titleTop}
            <br />
            <span className="italic text-[var(--d-accent)]">{content.titleItalic}</span>
            <br />
            {content.titleBottom}
          </h1>
          <p className="mt-6 max-w-lg leading-[1.85] text-[var(--d-ink-soft)]">{content.sub}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => scrollToId("builder")}
              className="rounded-full bg-[var(--d-accent)] px-7 py-4 text-[0.74rem] font-extrabold uppercase tracking-[0.18em] text-[var(--d-bg)] shadow-lg shadow-[#E2593B]/30 transition-transform hover:scale-[1.03]"
            >
              {content.ctaPrimary}
            </button>
            <button
              type="button"
              onClick={() => scrollToId("month")}
              className="flex items-center gap-2 rounded-full border-2 border-[var(--d-ink)] px-6 py-3.5 text-[0.74rem] font-extrabold uppercase tracking-[0.18em] text-[var(--d-ink)] transition-colors hover:bg-[var(--d-ink)] hover:text-[var(--d-bg)]"
            >
              {content.ctaSecondary}
              <ArrowDown className="h-3.5 w-3.5" strokeWidth={2.4} aria-hidden />
            </button>
          </div>

          <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-[var(--d-line)] pt-7">
            {content.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse">
                <dt className="mt-1 text-[0.64rem] font-bold uppercase tracking-[0.14em] text-[var(--d-ink-soft)]">
                  {stat.label}
                </dt>
                <dd className="[font-family:var(--demo-display)] text-3xl tracking-tight text-[var(--d-ink)]">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Tilted crate collage */}
        <div className="relative mx-auto aspect-[4/5] w-full max-w-[460px]">
          <div
            aria-hidden
            className="absolute -inset-4 rotate-3 rounded-[3rem] bg-[var(--d-peach)] sm:-inset-6"
          />
          <div
            aria-hidden
            className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-[var(--d-olive)]/20"
          />

          <motion.div
            animate={reduce ? undefined : { y: [0, -8, 0] }}
            transition={reduce ? undefined : { duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-0 top-3 aspect-[4/5] w-[70%] -rotate-[5deg] overflow-hidden rounded-[1.75rem] border-8 border-[var(--d-card)] shadow-2xl shadow-[#37271A]/25"
          >
            <Image
              src={IMG_CRATE}
              alt={content.alts.crate}
              fill
              sizes="(min-width: 1024px) 320px, 64vw"
              className="object-cover"
              priority
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(160deg, rgba(226,89,59,0.16) 0%, rgba(55,39,26,0) 45%, rgba(55,39,26,0.32) 100%)",
              }}
            />
          </motion.div>

          <div className="absolute right-0 top-0 aspect-square w-[36%] rotate-[8deg] overflow-hidden rounded-full border-8 border-[var(--d-card)] shadow-xl shadow-[#37271A]/20">
            <Image
              src={IMG_BOWL}
              alt={content.alts.bowl}
              fill
              sizes="(min-width: 1024px) 170px, 34vw"
              className="object-cover"
            />
            <div aria-hidden className="absolute inset-0 bg-[#E2593B]/10 mix-blend-multiply" />
          </div>

          <motion.div
            animate={reduce ? undefined : { y: [0, 10, 0] }}
            transition={
              reduce ? undefined : { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }
            }
            className="absolute bottom-0 right-2 aspect-square w-[52%] rotate-[6deg] overflow-hidden rounded-[1.5rem] border-8 border-[var(--d-card)] shadow-2xl shadow-[#37271A]/25"
          >
            <Image
              src={IMG_SNACKS}
              alt={content.alts.snacks}
              fill
              sizes="(min-width: 1024px) 240px, 48vw"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(20deg, rgba(107,114,67,0.3) 0%, rgba(55,39,26,0) 55%)",
              }}
            />
          </motion.div>

          {/* Kraft ticket stamp */}
          <div className="absolute left-[52%] top-[44%] z-10 rotate-[4deg] rounded-xl border-2 border-dashed border-[var(--d-kraft-deep)] bg-[var(--d-kraft)] px-5 py-2.5 text-center shadow-lg shadow-[#37271A]/15">
            <p className="text-[0.56rem] font-extrabold uppercase tracking-[0.3em] text-[var(--d-ink-soft)]">
              {content.stampTop}
            </p>
            <p className="[font-family:var(--demo-display)] text-xl italic leading-tight text-[var(--d-ink)]">
              {content.stampNo}
            </p>
          </div>

          {/* Starburst badge */}
          <motion.div
            animate={reduce ? undefined : { rotate: [-10, -4, -10] }}
            transition={reduce ? undefined : { duration: 9, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-4 bottom-9 z-10 h-28 w-28 sm:-left-8 sm:h-32 sm:w-32"
          >
            <Starburst fill="#E2593B" className="h-full w-full drop-shadow-lg">
              <p className="px-5 text-[0.56rem] font-extrabold uppercase leading-snug tracking-[0.12em] text-[var(--d-bg)]">
                {content.badgeTop}
                <span className="block [font-family:var(--demo-display)] text-sm normal-case italic tracking-normal">
                  {content.badgeBottom}
                </span>
              </p>
            </Starburst>
          </motion.div>
        </div>
      </div>

      <MarqueeStrip items={content.marquee} reduce={reduce} />
    </section>
  );
}

function MarqueeStrip({ items, reduce }: { items: string[]; reduce: boolean }) {
  return (
    <div className="overflow-hidden bg-[var(--d-accent)] py-3.5">
      <motion.div
        className="flex w-max items-center gap-8 whitespace-nowrap"
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={reduce ? undefined : { duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1} className="flex items-center gap-8">
            {items.map((word) => (
              <li
                key={word}
                className="flex items-center gap-8 text-[0.7rem] font-extrabold uppercase tracking-[0.28em] text-[var(--d-bg)]"
              >
                <Asterisk className="h-4 w-4 text-[var(--d-peach)]" strokeWidth={2.4} aria-hidden />
                {word}
              </li>
            ))}
          </ul>
        ))}
      </motion.div>
    </div>
  );
}
