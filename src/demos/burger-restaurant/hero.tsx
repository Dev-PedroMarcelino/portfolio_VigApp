"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Flame } from "lucide-react";
import type { EmberStackContent } from "./content";
import { Sticker } from "./ui";

const HERO_IMG =
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1600&q=80";

const LINE_STYLES = [
  "text-[var(--d-ink)]",
  "text-transparent [-webkit-text-stroke:3px_var(--d-flame)]",
  "text-[var(--d-mustard)]",
];

const spring = { type: "spring", stiffness: 320, damping: 24 } as const;

export function Hero({ content }: { content: EmberStackContent["hero"] }) {
  const reduce = useReducedMotion();

  return (
    <section id="top" className="relative overflow-hidden scroll-mt-24">
      <div
        aria-hidden
        className="absolute -left-32 top-10 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(255,107,44,0.14),transparent_65%)]"
      />
      <div
        aria-hidden
        className="absolute -right-40 bottom-24 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(255,196,46,0.08),transparent_65%)]"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 pb-24 pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pb-32 lg:pt-20">
        <div>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20, rotate: -6 }}
            animate={{ opacity: 1, y: 0, rotate: -2 }}
            transition={spring}
            className="inline-block"
          >
            <Sticker tone="cream">{content.stickerTop}</Sticker>
          </motion.div>

          <h1 className="mt-7 [font-family:var(--demo-display)] text-[clamp(3.4rem,9vw,7rem)] uppercase leading-[0.92]">
            {content.titleLines.map((line, i) => (
              <motion.span
                key={line}
                initial={reduce ? false : { opacity: 0, y: 44, rotate: -3 }}
                animate={{ opacity: 1, y: 0, rotate: i === 1 ? 1.5 : -1 }}
                transition={{ ...spring, delay: reduce ? 0 : 0.08 * i }}
                className={`block ${LINE_STYLES[i % LINE_STYLES.length]}`}
              >
                {line}
              </motion.span>
            ))}
          </h1>

          <p className="mt-7 max-w-md text-[15px] leading-relaxed text-[var(--d-ink-soft)]">
            {content.lede}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <motion.a
              href="#menu"
              whileHover={{ scale: 1.05, rotate: -1 }}
              whileTap={{ scale: 0.94 }}
              transition={spring}
              className="inline-flex items-center gap-2 rounded-xl border-2 border-[#120A05] bg-[var(--d-flame)] px-6 py-3.5 [font-family:var(--demo-display)] text-sm uppercase leading-none text-[#1A0E08] shadow-[4px_4px_0_rgba(0,0,0,0.5)]"
            >
              {content.primaryCta}
              <ArrowDown className="h-4 w-4" strokeWidth={2.6} aria-hidden />
            </motion.a>
            <motion.a
              href="#combo"
              whileHover={{ scale: 1.05, rotate: 1 }}
              whileTap={{ scale: 0.94 }}
              transition={spring}
              className="inline-flex items-center rounded-xl border-2 border-[var(--d-line-strong)] px-6 py-3.5 [font-family:var(--demo-display)] text-sm uppercase leading-none text-[var(--d-ink)] transition-colors hover:border-[var(--d-mustard)] hover:text-[var(--d-mustard)]"
            >
              {content.secondaryCta}
            </motion.a>
          </div>

          <ul className="mt-10 flex flex-wrap gap-3">
            {content.chips.map((chip, i) => (
              <motion.li
                key={chip}
                initial={reduce ? false : { opacity: 0, y: 16, rotate: 0 }}
                animate={{ opacity: 1, y: 0, rotate: i % 2 === 0 ? -2 : 2 }}
                transition={{ ...spring, delay: reduce ? 0 : 0.3 + i * 0.09 }}
              >
                <Sticker tone={i === 1 ? "flame" : "mustard"}>{chip}</Sticker>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-[460px]">
          <motion.div
            animate={reduce ? undefined : { y: [0, -14, 0] }}
            transition={
              reduce
                ? undefined
                : { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }
          >
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.86, rotate: 8 }}
              animate={{ opacity: 1, scale: 1, rotate: 2 }}
              transition={spring}
              className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] border-4 border-[#120A05] shadow-[10px_12px_0_rgba(0,0,0,0.5)]"
            >
              <Image
                src={HERO_IMG}
                alt={content.burgerAlt}
                fill
                priority
                sizes="(min-width: 1024px) 460px, 88vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(200deg,rgba(255,107,44,0.18),transparent_45%,rgba(18,10,5,0.55))]"
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.5, rotate: -30 }}
            animate={{ opacity: 1, scale: 1, rotate: -12 }}
            transition={{ ...spring, delay: reduce ? 0 : 0.25 }}
            className="absolute -left-5 top-8 flex h-24 w-24 items-center justify-center rounded-full border-2 border-[#120A05] bg-[var(--d-mustard)] p-3 text-center shadow-[4px_4px_0_rgba(0,0,0,0.45)] sm:-left-8 sm:h-28 sm:w-28"
          >
            <span className="[font-family:var(--demo-display)] text-xs uppercase leading-tight text-[#1A0E08]">
              {content.priceSticker}
            </span>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24, rotate: 6 }}
            animate={{ opacity: 1, y: 0, rotate: 3 }}
            transition={{ ...spring, delay: reduce ? 0 : 0.35 }}
            className="absolute -bottom-6 -right-2 rounded-2xl border-2 border-[#120A05] bg-[var(--d-card)] px-5 py-4 shadow-[5px_5px_0_rgba(0,0,0,0.5)] sm:-right-6"
          >
            <p className="[font-family:var(--demo-display)] text-2xl uppercase leading-none text-[var(--d-flame)]">
              {content.stat.value}
            </p>
            <p className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--d-ink-soft)]">
              {content.stat.label}
            </p>
          </motion.div>
        </div>
      </div>

      <Marquee items={content.marquee} paused={Boolean(reduce)} />
    </section>
  );
}

function Marquee({ items, paused }: { items: string[]; paused: boolean }) {
  return (
    <div className="relative -mx-2 -rotate-1 border-y-4 border-[#120A05] bg-[var(--d-flame)] py-3 shadow-[0_6px_0_rgba(0,0,0,0.4)]">
      <style>{`@keyframes es-marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
      <div className="overflow-hidden">
        <div
          className="flex w-max"
          style={paused ? undefined : { animation: "es-marquee 26s linear infinite" }}
        >
          {[0, 1].map((dup) => (
            <div
              key={dup}
              aria-hidden={dup === 1}
              className="flex shrink-0 items-center"
            >
              {items.map((item) => (
                <span
                  key={`${dup}-${item}`}
                  className="flex items-center gap-6 pr-6 [font-family:var(--demo-display)] text-sm uppercase tracking-[0.1em] text-[#1A0E08]"
                >
                  {item}
                  <Flame className="h-4 w-4" strokeWidth={2.4} aria-hidden />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
