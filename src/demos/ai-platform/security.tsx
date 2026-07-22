"use client";

import { motion } from "framer-motion";
import { useReducedMotionSafe as useReducedMotion } from "@/components/demos/use-reduced-motion-safe";
import { Database, KeyRound, ShieldCheck, CloudOff } from "lucide-react";
import type { IaraContent } from "./content";
import { SectionLabel } from "./ui";

const LAYER_ICONS = [Database, ShieldCheck, CloudOff, KeyRound];

/** Background tint per layer — the page literally gets deeper as you read. */
const LAYER_BG = [
  "rgba(6,42,48,0.35)",
  "rgba(5,35,41,0.55)",
  "rgba(4,28,33,0.75)",
  "rgba(2,20,24,0.92)",
];

/**
 * Security & LGPD as an ocean-depth diagram: four bands, each darker than the
 * last, with bathymetric depth markers on the left rail.
 */
export function Security({ content }: { content: IaraContent["security"] }) {
  const reduced = useReducedMotion() ?? false;
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section id="seguranca" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-2xl">
          <SectionLabel text={content.label} />
          <h2 className="mt-5 text-4xl font-extrabold leading-[1.02] tracking-tight text-[var(--d-ink)] [font-family:var(--demo-display)] sm:text-5xl">
            {content.title}
          </h2>
          <p className="mt-5 text-[0.95rem] leading-relaxed text-[var(--d-ink-soft)]">
            {content.intro}
          </p>
        </div>

        <div className="relative mt-14 overflow-hidden rounded-2xl border border-[var(--d-line)]">
          {/* Water-surface line */}
          <div className="flex items-center gap-3 bg-[rgba(45,212,191,0.06)] px-5 py-2.5 sm:px-8">
            <svg width="34" height="8" viewBox="0 0 34 8" aria-hidden>
              <path
                d="M1 4 C5 1, 9 1, 13 4 S21 7, 25 4 S31 2, 33 3"
                fill="none"
                stroke="var(--d-teal)"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
            <span className="text-[0.64rem] uppercase tracking-[0.3em] text-[var(--d-teal)] [font-family:var(--demo-mono)]">
              {content.surfaceLabel}
            </span>
          </div>

          {content.layers.map((layer, i) => {
            const Icon = LAYER_ICONS[i % LAYER_ICONS.length];
            return (
              <motion.div
                key={layer.depth}
                initial={reduced ? false : { opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease, delay: reduced ? 0 : i * 0.08 }}
                style={{ backgroundColor: LAYER_BG[i % LAYER_BG.length] }}
                className="grid grid-cols-[4.5rem_1fr] items-start gap-4 border-t border-[var(--d-line)]/70 px-5 py-8 sm:grid-cols-[7rem_1fr] sm:gap-8 sm:px-8 sm:py-10"
              >
                {/* Depth rail */}
                <div className="pt-1 text-right">
                  <span className="text-[0.7rem] tracking-[0.14em] text-[var(--d-ink-faint)] [font-family:var(--demo-mono)]">
                    {layer.depth}
                  </span>
                </div>

                <div className="flex gap-4 sm:gap-5">
                  <span
                    aria-hidden
                    className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--d-line)] bg-[rgba(3,25,29,0.5)]"
                  >
                    <Icon className="h-4.5 w-4.5 text-[var(--d-teal)]" strokeWidth={1.9} />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold tracking-tight text-[var(--d-ink)] [font-family:var(--demo-display)] sm:text-xl">
                      {layer.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-[0.88rem] leading-relaxed text-[var(--d-ink-soft)]">
                      {layer.body}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
