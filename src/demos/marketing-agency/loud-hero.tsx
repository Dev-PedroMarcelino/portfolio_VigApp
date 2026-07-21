"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import type { HeroContent } from "./content";
import { LoudButton, scrollToId } from "./ui";

export function LoudHero({ content }: { content: HeroContent }) {
  const reduce = useReducedMotion() ?? false;

  const rise = (delay: number) => ({
    initial: reduce ? undefined : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section id="top" className="relative overflow-hidden border-b-2 border-[var(--d-ink)] scroll-mt-16">
      {/* Faint brutalist grid + a diagonal accent slab */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(var(--d-ink) 2px, transparent 2px), linear-gradient(90deg, var(--d-ink) 2px, transparent 2px)",
          backgroundSize: "84px 84px",
        }}
      />
      <div
        className="pointer-events-none absolute -right-24 top-0 hidden h-full w-1/3 bg-[var(--d-accent)] md:block"
        aria-hidden
        style={{ clipPath: "polygon(38% 0, 100% 0, 100% 100%, 0 100%)", opacity: 0.14 }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-5 pb-16 pt-14 md:px-8 md:pb-24 md:pt-20">
        <motion.p
          {...rise(0)}
          className="inline-flex items-center gap-2 border-2 border-[var(--d-ink)] bg-[var(--d-bg)] px-3 py-1.5 [font-family:var(--demo-body)] text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[var(--d-ink)]"
        >
          <span className="h-2 w-2 animate-pulse bg-[var(--d-accent)]" aria-hidden />
          {content.eyebrow}
        </motion.p>

        <h1 className="mt-8 [font-family:var(--demo-display)] leading-[0.86] tracking-tight text-[var(--d-ink)]">
          {content.lines.map((line, i) => (
            <motion.span
              key={line}
              {...rise(0.08 + i * 0.07)}
              className="block"
            >
              <span
                data-text={line}
                className={`lh-glitch inline-block cursor-default text-[15vw] sm:text-[13vw] md:text-[10.5vw] lg:text-[9.5rem] ${
                  i === content.accentLine ? "text-[var(--d-accent)]" : "text-[var(--d-ink)]"
                }`}
              >
                {line}
              </span>
            </motion.span>
          ))}
        </h1>

        <div className="mt-10 grid gap-8 md:grid-cols-[1.1fr_1fr] md:items-end">
          <motion.p
            {...rise(0.4)}
            className="max-w-xl [font-family:var(--demo-body)] text-sm leading-relaxed text-[var(--d-ink)]/80 md:text-base"
          >
            {content.sub}
          </motion.p>

          <motion.div {...rise(0.48)} className="flex flex-wrap gap-3 md:justify-end">
            <LoudButton onClick={() => scrollToId("contact")}>
              {content.ctaPrimary}
              <ArrowRight className="h-4 w-4 transition-transform group-hover/lb:translate-x-1" strokeWidth={2.5} />
            </LoudButton>
            <LoudButton variant="outline" onClick={() => scrollToId("work")}>
              {content.ctaSecondary}
            </LoudButton>
          </motion.div>
        </div>

        <motion.dl
          {...rise(0.56)}
          className="mt-14 grid grid-cols-3 gap-px overflow-hidden border-2 border-[var(--d-ink)] bg-[var(--d-ink)]"
        >
          {content.stats.map((stat) => (
            <div key={stat.label} className="bg-[var(--d-bg)] px-4 py-5 text-center md:px-6">
              <dt className="[font-family:var(--demo-display)] text-3xl leading-none text-[var(--d-ink)] md:text-5xl">
                {stat.value}
              </dt>
              <dd className="mt-2 [font-family:var(--demo-body)] text-[0.6rem] font-bold uppercase tracking-[0.18em] text-[var(--d-ink)]/60 md:text-xs">
                {stat.label}
              </dd>
            </div>
          ))}
        </motion.dl>

        <motion.button
          {...rise(0.64)}
          type="button"
          onClick={() => scrollToId("services")}
          className="mt-12 inline-flex items-center gap-2 [font-family:var(--demo-body)] text-[0.68rem] font-bold uppercase tracking-[0.24em] text-[var(--d-ink)]/70 transition-colors hover:text-[var(--d-accent)]"
        >
          <ArrowDown className={`h-4 w-4 ${reduce ? "" : "animate-bounce"}`} strokeWidth={2.5} aria-hidden />
          {content.scrollCue}
        </motion.button>
      </div>
    </section>
  );
}
