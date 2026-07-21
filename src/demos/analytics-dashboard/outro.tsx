"use client";

import { ArrowRight, Check, Zap } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { OutroContent } from "./content";

export function Outro({ content }: { content: OutroContent }) {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden rounded-2xl border border-[var(--d-line)] bg-[var(--d-surface)] p-6 sm:p-10">
      {/* animated glow grid backdrop */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(var(--d-line) 1px, transparent 1px), linear-gradient(90deg, var(--d-line) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(circle at 70% 40%, black, transparent 72%)",
          WebkitMaskImage:
            "radial-gradient(circle at 70% 40%, black, transparent 72%)",
        }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute -right-16 top-0 h-72 w-72 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,0.28), transparent 68%)",
        }}
        animate={reduce ? undefined : { scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />

      <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--d-line)] bg-[var(--d-panel)] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--d-accent)] [font-family:var(--demo-mono)]">
            <Zap className="h-3 w-3" strokeWidth={2.4} aria-hidden />
            {content.eyebrow}
          </span>
          <h2 className="mt-4 max-w-lg text-2xl font-semibold tracking-tight text-[var(--d-ink)] [font-family:var(--demo-display)] sm:text-3xl">
            {content.title}
          </h2>
          <p className="mt-3 max-w-md text-[14px] leading-relaxed text-[var(--d-ink-soft)]">
            {content.body}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="#overview"
              className="flex items-center gap-2 rounded-full bg-[var(--d-accent)] px-5 py-2.5 text-[13px] font-semibold text-[var(--d-accent-ink)] transition-transform hover:scale-[1.03]"
            >
              {content.primaryCta}
              <ArrowRight className="h-4 w-4" strokeWidth={2.2} aria-hidden />
            </a>
            <a
              href="#live"
              className="rounded-full border border-[var(--d-line-strong)] px-5 py-2.5 text-[13px] font-semibold text-[var(--d-ink)] transition-colors hover:bg-[var(--d-panel)]"
            >
              {content.secondaryCta}
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-[var(--d-line)] bg-[var(--d-bg)] p-5">
            <p className="text-4xl font-semibold tracking-tight text-[var(--d-accent)] [font-family:var(--demo-display)]">
              {content.statValue}
            </p>
            <p className="mt-1 text-[12px] uppercase tracking-[0.16em] text-[var(--d-ink-faint)] [font-family:var(--demo-mono)]">
              {content.statLabel}
            </p>
          </div>
          <ul className="flex flex-col gap-2.5">
            {content.points.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-[13px] text-[var(--d-ink-soft)]">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[rgba(52,211,153,0.15)] text-[var(--d-emerald)]">
                  <Check className="h-2.5 w-2.5" strokeWidth={3} aria-hidden />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
