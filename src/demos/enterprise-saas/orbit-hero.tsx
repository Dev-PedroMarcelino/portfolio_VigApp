"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Play, TrendingDown } from "lucide-react";
import type { HeroContent, HeroMockContent } from "./content";
import { Avatar, Glow, GridPattern, TONE_DOT, scrollToId } from "./ui";

/* ------------------------------------------------------------------ */
/* Floating collage pieces                                             */
/* ------------------------------------------------------------------ */

function WindowChrome({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-[var(--d-line)] px-4 py-2.5">
      <span className="flex gap-1.5" aria-hidden>
        <span className="h-2.5 w-2.5 rounded-full bg-[#FB7185]/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FBBF24]/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#34D399]/70" />
      </span>
      <span className="ml-2 truncate text-[0.68rem] font-medium text-[var(--d-ink-soft)]">{title}</span>
    </div>
  );
}

function MainWindow({ mock }: { mock: HeroMockContent }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--d-line)] bg-[rgba(15,23,42,0.72)] shadow-[0_40px_120px_-30px_rgba(2,6,23,0.9),0_0_60px_-20px_rgba(96,165,250,0.35)] backdrop-blur-xl">
      <WindowChrome title={mock.windowTitle} />
      <div className="flex">
        <div className="hidden w-36 shrink-0 flex-col gap-1 border-r border-[var(--d-line)] p-3 sm:flex">
          {mock.sidebar.map((item, i) => (
            <span
              key={item}
              className={`rounded-lg px-2.5 py-1.5 text-[0.68rem] font-medium ${
                i === 0
                  ? "bg-[rgba(96,165,250,0.14)] text-[#93C5FD]"
                  : "text-[var(--d-ink-faint)]"
              }`}
            >
              {item}
            </span>
          ))}
        </div>
        <div className="grid flex-1 grid-cols-3 gap-3 p-4">
          {mock.columns.map((col) => (
            <div key={col.label} className="flex flex-col gap-2">
              <span className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-[var(--d-ink-faint)]">
                {col.label}
              </span>
              {col.cards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-lg border border-[var(--d-line)] bg-[rgba(148,163,184,0.06)] p-2.5"
                >
                  <span className={`mb-1.5 block h-1 w-8 rounded-full ${TONE_DOT[card.tone]}`} aria-hidden />
                  <span className="block text-[0.66rem] font-medium leading-snug text-[var(--d-ink)]">
                    {card.title}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChartCard({ chart }: { chart: HeroContent["mock"]["chart"] }) {
  return (
    <div className="w-52 rounded-2xl border border-[var(--d-line)] bg-[rgba(15,23,42,0.82)] p-4 shadow-[0_30px_80px_-24px_rgba(2,6,23,0.9),0_0_40px_-14px_rgba(96,165,250,0.4)] backdrop-blur-xl">
      <p className="text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-[var(--d-ink-faint)]">
        {chart.title}
      </p>
      <p className="mt-1 [font-family:var(--demo-display)] text-2xl font-semibold text-[var(--d-ink)]">
        {chart.value}
      </p>
      <p className="mt-0.5 flex items-center gap-1 text-[0.66rem] font-medium text-[#6EE7B7]">
        <TrendingDown className="h-3 w-3" strokeWidth={2.2} aria-hidden />
        {chart.delta}
      </p>
      <svg viewBox="0 0 180 48" className="mt-3 w-full" aria-hidden>
        <defs>
          <linearGradient id="of-spark" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#60A5FA" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0 14 L26 20 L52 12 L78 26 L104 22 L130 34 L156 30 L180 40"
          fill="none"
          stroke="#60A5FA"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M0 14 L26 20 L52 12 L78 26 L104 22 L130 34 L156 30 L180 40 L180 48 L0 48 Z"
          fill="url(#of-spark)"
        />
      </svg>
    </div>
  );
}

function ActivityCard({ activity }: { activity: HeroContent["mock"]["activity"] }) {
  return (
    <div className="w-64 rounded-2xl border border-[var(--d-line)] bg-[rgba(15,23,42,0.82)] p-4 shadow-[0_30px_80px_-24px_rgba(2,6,23,0.9),0_0_40px_-14px_rgba(96,165,250,0.35)] backdrop-blur-xl">
      <p className="text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-[var(--d-ink-faint)]">
        {activity.title}
      </p>
      <ul className="mt-3 space-y-2.5">
        {activity.items.map((item, i) => (
          <li key={item.text} className="flex items-center gap-2.5">
            <Avatar initials={item.initials} index={i} />
            <span className="flex-1 truncate text-[0.68rem] text-[var(--d-ink-soft)]">{item.text}</span>
            <span className="text-[0.6rem] text-[var(--d-ink-faint)]">{item.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export function OrbitHero({ content }: { content: HeroContent }) {
  const reduce = useReducedMotion();
  const float = (delay: number) =>
    reduce
      ? undefined
      : {
          y: [0, -10, 0],
          transition: { duration: 7, repeat: Infinity, ease: "easeInOut" as const, delay },
        };

  return (
    <section id="top" className="relative overflow-hidden pb-24 pt-16 sm:pt-20">
      <GridPattern />
      <Glow className="-top-40 left-1/2 h-[34rem] w-[54rem] -translate-x-1/2" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-5 text-center">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-[var(--d-line)] bg-[var(--d-panel)] px-4 py-1.5 text-[0.7rem] font-medium text-[var(--d-ink-soft)]"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--d-accent)]" aria-hidden />
          {content.badge}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="mt-6 [font-family:var(--demo-display)] text-4xl font-semibold leading-[1.06] tracking-tight text-[var(--d-ink)] sm:text-6xl lg:text-[4.4rem]"
        >
          {content.titleTop}
          <br />
          <span className="bg-gradient-to-r from-[#60A5FA] via-[#93C5FD] to-[#A78BFA] bg-clip-text text-transparent">
            {content.titleAccent}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.16 }}
          className="mt-6 max-w-xl text-[0.98rem] leading-relaxed text-[var(--d-ink-soft)]"
        >
          {content.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.24 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <button
            type="button"
            onClick={() => scrollToId("cta")}
            className="group flex items-center gap-2 rounded-full bg-[var(--d-accent)] px-6 py-3 text-sm font-semibold text-[var(--d-accent-ink)] shadow-[0_0_40px_-8px_rgba(96,165,250,0.9)] transition-transform hover:scale-[1.04]"
          >
            {content.ctaPrimary}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.2} aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => scrollToId("product")}
            className="flex items-center gap-2 rounded-full border border-[var(--d-line-strong)] px-6 py-3 text-sm font-medium text-[var(--d-ink)] transition-colors hover:bg-[var(--d-panel)]"
          >
            <Play className="h-3.5 w-3.5 text-[var(--d-accent)]" strokeWidth={2.2} aria-hidden />
            {content.ctaSecondary}
          </button>
        </motion.div>

        {/* Floating product collage */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.34 }}
          className="relative mt-16 w-full max-w-3xl"
        >
          <Glow className="left-1/2 top-1/2 h-72 w-[36rem] -translate-x-1/2 -translate-y-1/2" />
          <motion.div animate={float(0)} className="relative z-10">
            <MainWindow mock={content.mock} />
          </motion.div>
          <motion.div
            animate={float(1.4)}
            className="absolute -left-8 -top-10 z-20 hidden md:block lg:-left-24"
          >
            <div className="-rotate-3">
              <ChartCard chart={content.mock.chart} />
            </div>
          </motion.div>
          <motion.div
            animate={float(2.6)}
            className="absolute -bottom-10 -right-6 z-20 hidden md:block lg:-right-20"
          >
            <div className="rotate-2">
              <ActivityCard activity={content.mock.activity} />
            </div>
          </motion.div>
        </motion.div>

        {/* Trust band */}
        <div className="mt-24 w-full">
          <p className="text-[0.66rem] font-semibold uppercase tracking-[0.26em] text-[var(--d-ink-faint)]">
            {content.trustNote}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {content.logos.map((logo) => (
              <span
                key={logo}
                className="[font-family:var(--demo-display)] text-base font-semibold tracking-tight text-[var(--d-ink-faint)] transition-colors hover:text-[var(--d-ink-soft)]"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
