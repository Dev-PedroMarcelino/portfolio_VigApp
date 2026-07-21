"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Bell, ArrowDownRight } from "lucide-react";
import type { HeroContent } from "./content";
import { Kicker, Chip, scrollToId, shot } from "./ui";

/** Fixed launch moment — countdown is computed against this constant. */
const DROP_AT = new Date("2026-09-27T20:00:00Z").getTime();

interface TimeLeft {
  d: number;
  h: number;
  m: number;
  s: number;
  done: boolean;
}

function diff(): TimeLeft {
  const delta = DROP_AT - Date.now();
  if (delta <= 0) return { d: 0, h: 0, m: 0, s: 0, done: true };
  const d = Math.floor(delta / 86400000);
  const h = Math.floor((delta % 86400000) / 3600000);
  const m = Math.floor((delta % 3600000) / 60000);
  const s = Math.floor((delta % 60000) / 1000);
  return { d, h, m, s, done: false };
}

const pad = (n: number) => String(n).padStart(2, "0");

function CountUnit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative overflow-hidden rounded-2xl border border-[var(--d-line)] bg-white/[0.03] px-3 py-3 backdrop-blur-sm sm:px-5 sm:py-4">
        <span className="block min-w-[1.6ch] text-center text-3xl tabular-nums text-[var(--d-ink)] [font-family:var(--demo-display)] sm:text-4xl">
          {value}
        </span>
        <span className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-[var(--d-line)]" aria-hidden />
      </div>
      <span className="mt-2 text-[0.58rem] font-bold uppercase tracking-[0.24em] text-[var(--d-mute)] [font-family:var(--demo-body)]">
        {label}
      </span>
    </div>
  );
}

export function DropHero({ content }: { content: HeroContent }) {
  const [time, setTime] = useState<TimeLeft | null>(null);
  const reduce = useReducedMotion() ?? false;

  useEffect(() => {
    setTime(diff());
    const id = window.setInterval(() => setTime(diff()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section id="drop" className="relative scroll-mt-20 overflow-hidden px-5 pb-16 pt-10 md:pb-24 md:pt-16">
      {/* radial glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-10 h-[30rem] w-[30rem] rounded-full opacity-60 blur-[120px]"
        style={{ background: "radial-gradient(circle, var(--d-accent) 0%, transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-0 h-[28rem] w-[28rem] rounded-full opacity-50 blur-[120px]"
        style={{ background: "radial-gradient(circle, var(--d-accent-2) 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Kicker text={content.live} live />
          <div className="mt-3">
            <Chip tone="pink">{content.dropTag}</Chip>
          </div>

          <h1 className="mt-6 [font-family:var(--demo-display)] text-6xl leading-[0.92] tracking-tight text-[var(--d-ink)] sm:text-7xl md:text-[5.6rem]">
            <span className="block">{content.titleTop}</span>
            <span
              className="block bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(100deg, var(--d-accent) 0%, var(--d-accent-2) 100%)" }}
            >
              {content.titleMid}
            </span>
            <span className="block">{content.titleBottom}</span>
          </h1>

          <p className="mt-6 max-w-md text-[0.95rem] leading-relaxed text-[var(--d-ink-soft)]">
            {content.sub}
          </p>

          {/* countdown */}
          <div className="mt-8">
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.28em] text-[var(--d-accent)] [font-family:var(--demo-body)]">
              {time?.done ? content.liveNow : content.countdownLabel}
            </p>
            <div className="mt-3 flex items-center gap-2.5 sm:gap-3">
              <CountUnit value={time ? pad(time.d) : "--"} label={content.units.days} />
              <span className="pb-6 text-2xl text-[var(--d-mute)]">:</span>
              <CountUnit value={time ? pad(time.h) : "--"} label={content.units.hours} />
              <span className="pb-6 text-2xl text-[var(--d-mute)]">:</span>
              <CountUnit value={time ? pad(time.m) : "--"} label={content.units.minutes} />
              <span className="pb-6 text-2xl text-[var(--d-mute)]">:</span>
              <CountUnit value={time ? pad(time.s) : "--"} label={content.units.seconds} />
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => scrollToId("raffle")}
              className="group flex items-center gap-2 rounded-full bg-[var(--d-accent)] px-6 py-3.5 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[#12081F] transition-transform hover:scale-[1.04] [font-family:var(--demo-body)]"
            >
              <Bell className="h-4 w-4" strokeWidth={2} aria-hidden />
              {content.ctaPrimary}
            </button>
            <button
              type="button"
              onClick={() => scrollToId("latest")}
              className="flex items-center gap-2 rounded-full border border-[var(--d-line)] px-6 py-3.5 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[var(--d-ink)] transition-colors hover:border-[var(--d-accent)] hover:text-[var(--d-accent)] [font-family:var(--demo-body)]"
            >
              {content.ctaSecondary}
              <ArrowDownRight className="h-4 w-4" strokeWidth={2} aria-hidden />
            </button>
          </div>
        </div>

        {/* product visual */}
        <motion.div
          initial={reduce ? undefined : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-[var(--d-line)]">
            <Image
              src={shot("photo-1542291026-7eec264c27ff", 1200)}
              alt={content.imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 520px, 92vw"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(150deg, rgba(255,61,129,0.35) 0%, rgba(18,8,31,0.15) 45%, rgba(176,38,255,0.45) 100%)",
                mixBlendMode: "hard-light",
              }}
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(18,8,31,0.85) 0%, transparent 55%)" }}
            />

            <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-3 p-5">
              {content.stats.map((s) => (
                <div key={s.label}>
                  <p className="[font-family:var(--demo-display)] text-2xl leading-none text-[var(--d-ink)]">
                    {s.value}
                  </p>
                  <p className="mt-1 max-w-[7rem] text-[0.58rem] font-bold uppercase leading-tight tracking-[0.14em] text-[var(--d-ink-soft)] [font-family:var(--demo-body)]">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* floating sticker */}
          <div className="absolute -left-3 -top-3 rotate-[-8deg]">
            <Chip tone="volt">{content.dropTag}</Chip>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
