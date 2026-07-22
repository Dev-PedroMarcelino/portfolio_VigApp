"use client";

import { motion } from "framer-motion";
import { useReducedMotionSafe as useReducedMotion } from "@/components/demos/use-reduced-motion-safe";
import type { IaraContent } from "./content";
import { Playground } from "./playground";

/**
 * Hero-manifesto: the claim on top, the proof (live playground) immediately
 * below it — no scroll of faith required.
 */
export function Hero({
  hero,
  playground,
}: {
  hero: IaraContent["hero"];
  playground: IaraContent["playground"];
}) {
  const reduced = useReducedMotion() ?? false;
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section id="topo" className="relative overflow-hidden pb-20 pt-32 sm:pt-40">
      {/* Sunlight shaft from the surface */}
      <div
        aria-hidden
        className="absolute -top-32 left-1/2 z-0 h-[560px] w-[900px] -translate-x-1/2 opacity-60 blur-[100px]"
        style={{
          background:
            "radial-gradient(55% 60% at 50% 0%, rgba(45,212,191,0.28), rgba(34,211,238,0.1) 55%, transparent 80%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="text-[0.66rem] font-medium uppercase tracking-[0.36em] text-[var(--d-teal)] [font-family:var(--demo-mono)]"
          >
            {hero.eyebrow}
          </motion.p>

          <motion.h1
            initial={reduced ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease, delay: 0.06 }}
            className="mt-6 text-[2.9rem] font-extrabold leading-[0.98] tracking-tight text-[var(--d-ink)] [font-family:var(--demo-display)] sm:text-[4.4rem] lg:text-[5.2rem]"
          >
            {hero.titleA}{" "}
            <span className="relative inline-block bg-gradient-to-r from-[var(--d-teal)] via-[#5EEAD4] to-[var(--d-cyan)] bg-clip-text text-transparent">
              {hero.titleB}
              <svg
                viewBox="0 0 220 14"
                aria-hidden
                className="absolute -bottom-2 left-0 w-full sm:-bottom-3"
                preserveAspectRatio="none"
              >
                <path
                  d="M4 9 C34 2, 62 2, 92 8 S150 13, 178 7 S210 3, 216 6"
                  fill="none"
                  stroke="var(--d-teal)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  opacity="0.85"
                />
              </svg>
            </span>
          </motion.h1>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.14 }}
            className="mt-7 text-lg font-semibold text-[var(--d-ink)] [font-family:var(--demo-display)] sm:text-xl"
          >
            {hero.manifesto}
          </motion.p>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.2 }}
            className="mx-auto mt-4 max-w-2xl text-[0.95rem] leading-relaxed text-[var(--d-ink-soft)]"
          >
            {hero.sub}
          </motion.p>
        </div>

        {/* The proof: playground right inside the hero */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.3 }}
          className="mx-auto mt-14 max-w-4xl"
        >
          <Playground content={playground} />
          <p className="mt-4 text-center text-[0.7rem] text-[var(--d-ink-faint)] [font-family:var(--demo-mono)]">
            {hero.proofNote}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
