"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Transition } from "framer-motion";
import { ArrowDownRight, Coffee } from "lucide-react";
import type { HeroContent } from "./content";
import { scrollToId } from "./ui";

const HERO_IMG =
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80";

const STEAM_PATHS = [
  "M30 116 C22 92 40 76 32 54 C26 38 36 24 30 6",
  "M52 118 C46 96 62 80 54 58 C48 40 60 26 52 4",
  "M74 116 C68 94 84 78 76 56 C70 38 80 24 74 8",
];

function Steam({ reduce }: { reduce: boolean }) {
  return (
    <svg
      viewBox="0 0 104 122"
      className="absolute -top-24 left-1/2 z-10 h-28 w-24 -translate-x-1/2"
      aria-hidden
    >
      {STEAM_PATHS.map((d, i) =>
        reduce ? (
          <path key={d} d={d} fill="none" stroke="var(--d-accent)" strokeWidth="2.5" strokeLinecap="round" opacity={0.22} />
        ) : (
          <motion.path
            key={d}
            d={d}
            fill="none"
            stroke="var(--d-accent)"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: [0, 0.45, 0], y: [10, -16] }}
            transition={{
              duration: 5.5 + i * 1.3,
              delay: i * 1.1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ),
      )}
    </svg>
  );
}

function RotatingBadge({ text, reduce }: { text: string; reduce: boolean }) {
  return (
    <div className="absolute -bottom-7 -left-7 hidden h-32 w-32 items-center justify-center rounded-full bg-[var(--d-accent)] text-[var(--d-cream)] shadow-xl shadow-[rgba(43,29,18,0.3)] sm:flex">
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ repeat: Infinity, duration: 28, ease: "linear" }}
        aria-hidden
      >
        <defs>
          <path id="terra-badge-circle" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
        </defs>
        <text fill="currentColor" fontSize="8.2" letterSpacing="2.4" style={{ fontFamily: "var(--demo-body)" }}>
          <textPath href="#terra-badge-circle">{text}</textPath>
        </text>
      </motion.svg>
      <Coffee className="h-6 w-6" strokeWidth={1.6} aria-hidden />
    </div>
  );
}

export function TerraHero({ content }: { content: HeroContent }) {
  const reduce = useReducedMotion() ?? false;

  const lineAnim = (i: number) => ({
    initial: reduce ? undefined : { opacity: 0, y: 26 },
    animate: reduce ? undefined : { opacity: 1, y: 0 },
    transition: { duration: 1.5, delay: 0.25 + i * 0.4, ease: [0.16, 1, 0.3, 1] } as Transition,
  });

  return (
    <section className="relative overflow-hidden px-5 pb-24 pt-12 md:pt-20">
      <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.3em] text-[var(--d-accent)]">
            {content.kicker}
          </p>
          <h1 className="mt-6 [font-family:var(--demo-display)] text-[2.9rem] leading-[1.04] tracking-tight text-[var(--d-ink)] sm:text-6xl md:text-7xl">
            <motion.span className="block" {...lineAnim(0)}>
              {content.taglineTop}
            </motion.span>
            <motion.span className="block italic text-[var(--d-terra)]" {...lineAnim(1)}>
              {content.taglineItalic}
            </motion.span>
            <motion.span className="block" {...lineAnim(2)}>
              {content.taglineBottom}
            </motion.span>
          </h1>
          <p className="mt-7 max-w-md text-base leading-[1.85] text-[var(--d-ink-soft)]">
            {content.sub}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#menu"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("menu");
              }}
              className="rounded-full bg-[var(--d-accent)] px-7 py-3.5 text-[0.74rem] font-bold uppercase tracking-[0.18em] text-[var(--d-cream)] transition-transform hover:scale-[1.04]"
            >
              {content.ctaMenu}
            </a>
            <a
              href="#subscription"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("subscription");
              }}
              className="group flex items-center gap-2 text-[0.74rem] font-bold uppercase tracking-[0.18em] text-[var(--d-ink)]"
            >
              <span className="border-b border-[var(--d-accent)] pb-0.5">{content.ctaSub}</span>
              <ArrowDownRight
                className="h-4 w-4 text-[var(--d-accent)] transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                strokeWidth={2}
                aria-hidden
              />
            </a>
          </div>

          <dl className="mt-14 grid max-w-lg grid-cols-3 divide-x divide-[var(--d-line)]">
            {content.facts.map((fact, i) => (
              <div key={fact.value} className={i === 0 ? "pr-5" : "px-5"}>
                <dt className="sr-only">{fact.label}</dt>
                <dd className="[font-family:var(--demo-display)] text-2xl italic text-[var(--d-ink)]">
                  {fact.value}
                </dd>
                <dd className="mt-1.5 text-[0.72rem] leading-relaxed text-[var(--d-ink-soft)]">
                  {fact.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto mt-16 w-full max-w-[420px] sm:mt-8">
          <Steam reduce={reduce} />
          <div className="relative aspect-[4/5] overflow-hidden rounded-b-[2.25rem] rounded-t-[999px] border-8 border-[var(--d-cream)] shadow-2xl shadow-[rgba(43,29,18,0.28)]">
            <Image
              src={HERO_IMG}
              alt={content.imageAlt}
              fill
              priority
              sizes="(min-width: 768px) 420px, 84vw"
              className="object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(43,29,18,0.42) 0%, rgba(43,29,18,0.06) 38%, rgba(239,230,218,0.12) 100%)",
              }}
              aria-hidden
            />
          </div>
          <RotatingBadge text={content.badge} reduce={reduce} />
        </div>
      </div>
    </section>
  );
}
