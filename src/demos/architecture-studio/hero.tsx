"use client";

import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import type { AtelierContent } from "./content";

export function Hero({ content }: { content: AtelierContent["hero"] }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const shift1 = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);
  const shift2 = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const shift3 = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-screen flex-col justify-between overflow-hidden pt-28 sm:pt-32"
    >
      {/* hairline grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(var(--d-line) 1px, transparent 1px), linear-gradient(90deg, var(--d-line) 1px, transparent 1px)",
          backgroundSize: "clamp(120px, 20vw, 260px) clamp(120px, 20vw, 260px)",
          maskImage:
            "radial-gradient(120% 90% at 50% 20%, #000 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(120% 90% at 50% 20%, #000 30%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto flex w-full max-w-[92rem] items-start justify-between gap-6 px-5 sm:px-8">
        <div className="[font-family:var(--demo-display)] text-[10px] uppercase tracking-[0.4em] text-[var(--d-ink-soft)]">
          <p>{content.established}</p>
        </div>
        <div className="text-right [font-family:var(--demo-display)] text-[10px] uppercase tracking-[0.4em] text-[var(--d-ink-soft)]">
          <p className="text-[var(--d-ink-faint)]">{content.locationLabel}</p>
          <p className="mt-1 text-[var(--d-ink)]">{content.location}</p>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-[92rem] flex-1 px-5 py-12 sm:px-8">
        <motion.h1
          style={{ opacity: reduce ? 1 : fade }}
          className="[font-family:var(--demo-display)] font-medium leading-[0.86] tracking-[-0.03em] text-[var(--d-ink)]"
        >
          <motion.span
            style={{ x: reduce ? 0 : shift1 }}
            className="block text-[clamp(3.4rem,15vw,15rem)]"
          >
            {content.line1}
          </motion.span>
          <motion.span
            style={{ x: reduce ? 0 : shift2 }}
            className="block pl-[6vw] text-[clamp(3.4rem,15vw,15rem)] italic [font-family:var(--demo-body)] font-normal text-[var(--d-ink-soft)]"
          >
            {content.line2}
          </motion.span>
          <motion.span
            style={{ x: reduce ? 0 : shift3 }}
            className="block text-[clamp(3.4rem,15vw,15rem)]"
          >
            {content.line3}
          </motion.span>
        </motion.h1>
      </div>

      <div className="relative mx-auto grid w-full max-w-[92rem] grid-cols-1 items-end gap-8 border-t border-[var(--d-line)] px-5 py-8 sm:grid-cols-[1fr_auto] sm:px-8">
        <p className="max-w-xl text-[clamp(1rem,1.4vw,1.35rem)] leading-relaxed text-[var(--d-ink-soft)] [font-family:var(--demo-body)]">
          {content.lede}
        </p>
        <div className="flex items-center gap-3 [font-family:var(--demo-display)] text-[10px] uppercase tracking-[0.35em] text-[var(--d-ink-soft)]">
          <motion.span
            aria-hidden
            animate={reduce ? undefined : { y: [0, 6, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--d-line-strong)]"
          >
            <ArrowDown className="h-4 w-4" strokeWidth={1.25} />
          </motion.span>
          <span>{content.scrollCue}</span>
        </div>
      </div>
    </section>
  );
}
