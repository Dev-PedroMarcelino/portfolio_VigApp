"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { unsplash, type VertexContent } from "./content";

const HAZARD =
  "repeating-linear-gradient(45deg, var(--d-accent-ink) 0 22px, var(--d-accent) 22px 44px)";

export function Hero({
  content,
  quoteHref,
  projectsHref,
}: {
  content: VertexContent["hero"];
  quoteHref: string;
  projectsHref: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative overflow-hidden pt-24 sm:pt-28"
    >
      {/* blueprint grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(var(--d-line) 1px, transparent 1px), linear-gradient(90deg, var(--d-line) 1px, transparent 1px)",
          backgroundSize: "clamp(48px, 6vw, 84px) clamp(48px, 6vw, 84px)",
          maskImage:
            "radial-gradient(130% 100% at 15% 10%, #000 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(130% 100% at 15% 10%, #000 40%, transparent 100%)",
        }}
      />

      {/* diagonal hazard stripe */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-0 hidden h-[140%] w-40 rotate-[18deg] opacity-90 lg:block"
        style={{ backgroundImage: HAZARD }}
      />

      <div className="relative mx-auto max-w-[92rem] px-5 sm:px-8">
        <div className="flex items-center gap-3 border-b border-[var(--d-line)] pb-5">
          <span
            className="h-2.5 w-2.5"
            style={{ backgroundImage: HAZARD }}
            aria-hidden
          />
          <span className="[font-family:var(--demo-body)] text-[11px] font-medium uppercase tracking-[0.24em] text-[var(--d-accent)]">
            {content.badge}
          </span>
          <span className="ml-auto hidden text-[11px] uppercase tracking-[0.2em] text-[var(--d-ink-faint)] sm:inline">
            {content.established}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-10 pb-6 pt-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 lg:pt-14">
          <div className="flex flex-col justify-between">
            <motion.h1
              style={{ opacity: reduce ? 1 : fade }}
              className="[font-family:var(--demo-display)] uppercase leading-[0.84] tracking-[-0.01em] text-[var(--d-ink)]"
            >
              <span className="block text-[clamp(3rem,11vw,10.5rem)]">
                {content.line1}
              </span>
              <span className="block text-[clamp(3rem,11vw,10.5rem)] text-[var(--d-accent)]">
                {content.line2}
              </span>
              <span className="block text-[clamp(3rem,11vw,10.5rem)]">
                {content.line3}
              </span>
            </motion.h1>

            <div className="mt-8 grid gap-6 sm:grid-cols-[1fr_auto] sm:items-end">
              <p className="max-w-md text-[clamp(0.9rem,1vw,1.05rem)] leading-relaxed text-[var(--d-ink-soft)]">
                {content.lede}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={quoteHref}
                  className="group flex items-center gap-2 bg-[var(--d-accent)] px-6 py-3.5 [font-family:var(--demo-body)] text-[12px] font-medium uppercase tracking-[0.16em] text-[var(--d-accent-ink)] transition-colors duration-200 hover:bg-[var(--d-accent-deep)]"
                >
                  {content.ctaPrimary}
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={2}
                  />
                </a>
                <a
                  href={projectsHref}
                  className="border border-[var(--d-line-strong)] px-6 py-3.5 [font-family:var(--demo-body)] text-[12px] font-medium uppercase tracking-[0.16em] text-[var(--d-ink)] transition-colors duration-200 hover:border-[var(--d-accent)] hover:text-[var(--d-accent)]"
                >
                  {content.ctaSecondary}
                </a>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden border border-[var(--d-line-strong)]">
              <motion.div
                style={{ y: reduce ? 0 : imgY }}
                className="absolute inset-0 scale-110"
              >
                <Image
                  src={unsplash("photo-1541888946425-d81bb19240f5", 1200)}
                  alt={content.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                  priority
                />
              </motion.div>
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(200deg, rgba(21,24,29,0.15) 0%, rgba(21,24,29,0.55) 55%, rgba(21,24,29,0.92) 100%)",
                }}
              />
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-3"
                style={{ backgroundImage: HAZARD }}
              />
              <div className="absolute left-4 top-4 flex items-center gap-2 bg-[rgba(21,24,29,0.75)] px-3 py-1.5 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--d-good)]" aria-hidden />
                <span className="[font-family:var(--demo-body)] text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--d-ink-soft)]">
                  LIVE SITE · VB-402
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* stat rail */}
        <div className="grid grid-cols-1 border-t border-[var(--d-line)] sm:grid-cols-3">
          {content.stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex items-baseline gap-4 py-6 ${
                i > 0 ? "sm:border-l sm:border-[var(--d-line)] sm:pl-8" : ""
              }`}
            >
              <span className="[font-family:var(--demo-display)] text-4xl text-[var(--d-ink)] sm:text-5xl">
                {stat.value}
              </span>
              <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--d-ink-faint)]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto flex max-w-[92rem] items-center gap-3 px-5 pb-10 [font-family:var(--demo-body)] text-[10px] uppercase tracking-[0.3em] text-[var(--d-ink-faint)] sm:px-8">
        <motion.span
          aria-hidden
          animate={reduce ? undefined : { y: [0, 5, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-8 w-8 items-center justify-center border border-[var(--d-line-strong)]"
        >
          <ArrowDown className="h-4 w-4" strokeWidth={1.5} />
        </motion.span>
        {content.scrollCue}
      </div>
    </section>
  );
}
