"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Check, ChevronDown, Sparkles } from "lucide-react";
import type { HeroContent } from "./content";
import { Stars, scrollToId } from "./ui";
import { WaitlistForm } from "./waitlist-form";

const NEBULA_IMG =
  "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1600&q=80";

export function NebulaHero({ content, numberLocale }: { content: HeroContent; numberLocale: string }) {
  const reduce = useReducedMotion() ?? false;

  const rise = (delay: number) => ({
    initial: reduce ? undefined : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section id="top" className="relative overflow-hidden scroll-mt-20">
      {/* Aurora backdrop: nebula photo screened into the void, then gradient blooms. */}
      <div className="absolute inset-0" aria-hidden>
        <Image
          src={NEBULA_IMG}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30 mix-blend-screen"
          style={{
            maskImage: "radial-gradient(90% 80% at 50% 0%, black 30%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(90% 80% at 50% 0%, black 30%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(55% 45% at 50% -5%, rgba(139,92,246,0.36) 0%, transparent 70%), radial-gradient(40% 35% at 18% 22%, rgba(99,102,241,0.22) 0%, transparent 70%), radial-gradient(35% 30% at 84% 30%, rgba(34,211,238,0.14) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(139,92,246,0.28) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.28) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(70% 60% at 50% 20%, black 0%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(70% 60% at 50% 20%, black 0%, transparent 100%)",
          }}
        />
        <Stars count={64} />
        <div
          className="absolute inset-x-0 bottom-0 h-40"
          style={{ background: "linear-gradient(to bottom, transparent, #0B0B12)" }}
        />
      </div>

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-5 pb-28 pt-24 text-center md:pb-36 md:pt-32">
        <motion.p
          {...rise(0)}
          className="inline-flex items-center gap-2 rounded-full border border-[var(--d-accent)]/40 bg-[var(--d-accent)]/10 px-4 py-1.5 text-[0.7rem] font-medium tracking-wide text-[var(--d-accent-soft)]"
        >
          <Sparkles className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden />
          {content.badge}
        </motion.p>

        <motion.h1
          {...rise(0.08)}
          className="mt-7 [font-family:var(--demo-display)] text-[2.9rem] font-medium leading-[1.02] tracking-tight text-[var(--d-ink)] sm:text-6xl md:text-7xl"
        >
          {content.titleTop}{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(100deg, #C4B5FD 0%, #8B5CF6 45%, #22D3EE 100%)",
            }}
          >
            {content.titleAccent}
          </span>
        </motion.h1>

        <motion.p
          {...rise(0.16)}
          className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--d-ink-dim)] md:text-lg"
        >
          {content.sub}
        </motion.p>

        <motion.div {...rise(0.24)} className="mt-9 flex w-full justify-center">
          <WaitlistForm copy={content.form} numberLocale={numberLocale} idPrefix="hero" />
        </motion.div>

        <motion.ul
          {...rise(0.32)}
          className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
        >
          {content.assurances.map((item) => (
            <li key={item} className="flex items-center gap-1.5 text-xs text-[var(--d-ink-faint)]">
              <Check className="h-3.5 w-3.5 text-[var(--d-green)]" strokeWidth={2.4} aria-hidden />
              {item}
            </li>
          ))}
        </motion.ul>

        <motion.div {...rise(0.4)} className="mt-12">
          <span className="rounded-lg border border-[var(--d-line-bright)] bg-[var(--d-bg-raise)]/80 px-4 py-2.5 [font-family:var(--d-mono)] text-xs text-[var(--d-ink-dim)]">
            <span className="text-[var(--d-accent-soft)]">$</span> npm i -g @nebula/cli
          </span>
        </motion.div>

        <motion.button
          {...rise(0.48)}
          type="button"
          onClick={() => scrollToId("product")}
          className="mt-16 inline-flex flex-col items-center gap-1 text-[0.68rem] uppercase tracking-[0.26em] text-[var(--d-ink-faint)] transition-colors hover:text-[var(--d-ink-dim)]"
        >
          {content.scrollCue}
          <ChevronDown
            className={`h-4 w-4 ${reduce ? "" : "animate-bounce"}`}
            strokeWidth={1.8}
            aria-hidden
          />
        </motion.button>
      </div>
    </section>
  );
}
