"use client";

import { BadgeCheck } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { VertexContent } from "./content";

export function Certifications({
  content,
}: {
  content: VertexContent["certs"];
}) {
  const reduce = useReducedMotion();
  const loop = [...content.items, ...content.items];

  return (
    <section
      id="certifications"
      className="relative overflow-hidden border-t border-[var(--d-line)] bg-[var(--d-accent)] py-14 text-[var(--d-accent-ink)]"
    >
      {/* hazard edge top and bottom */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-2"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, var(--d-accent-ink) 0 14px, transparent 14px 28px)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-2"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, var(--d-accent-ink) 0 14px, transparent 14px 28px)",
        }}
      />

      <div className="mx-auto max-w-[92rem] px-5 sm:px-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="[font-family:var(--demo-body)] text-[11px] font-medium uppercase tracking-[0.24em] text-[var(--d-accent-ink)]/70">
              {content.eyebrow}
            </span>
            <h2 className="mt-1 [font-family:var(--demo-display)] text-[clamp(1.6rem,3.5vw,2.6rem)] uppercase leading-none">
              {content.title}
            </h2>
          </div>
          <BadgeCheck className="hidden h-9 w-9 sm:block" strokeWidth={1.75} />
        </div>
      </div>

      <div
        className="relative mt-9"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
        }}
      >
        <motion.div
          className="flex w-max gap-4"
          animate={reduce ? undefined : { x: ["0%", "-50%"] }}
          transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
        >
          {loop.map((cert, i) => (
            <div
              key={`${cert.code}-${i}`}
              className="flex items-center gap-3 border border-[var(--d-accent-ink)]/25 bg-[var(--d-accent-ink)]/[0.06] px-5 py-3"
            >
              <span className="[font-family:var(--demo-display)] text-lg uppercase leading-none">
                {cert.code}
              </span>
              <span className="h-6 w-px bg-[var(--d-accent-ink)]/25" aria-hidden />
              <span className="[font-family:var(--demo-body)] whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--d-accent-ink)]/80">
                {cert.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
