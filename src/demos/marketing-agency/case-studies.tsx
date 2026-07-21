"use client";

import { useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudiesContent } from "./content";
import { LoudTag, scrollToId } from "./ui";

export function CaseStudies({ content }: { content: CaseStudiesContent }) {
  const reduce = useReducedMotion() ?? false;
  const [active, setActive] = useState<number | null>(null);

  // Raw pointer position, smoothed by a spring so the preview trails the cursor.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springCfg = { stiffness: 320, damping: 28, mass: 0.4 };
  const x = useSpring(mx, springCfg);
  const y = useSpring(my, springCfg);

  const handleMove = (e: React.MouseEvent) => {
    mx.set(e.clientX);
    my.set(e.clientY);
  };

  const activeRow = active !== null ? content.rows[active] : null;

  return (
    <section
      id="work"
      className="border-b-2 border-[var(--d-ink)] bg-[var(--d-bg)] scroll-mt-16"
      onMouseMove={handleMove}
    >
      <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <LoudTag>{content.label}</LoudTag>
            <h2 className="mt-5 [font-family:var(--demo-display)] text-5xl leading-[0.9] tracking-tight text-[var(--d-ink)] md:text-8xl">
              {content.heading}
            </h2>
          </div>
          <p className="[font-family:var(--demo-body)] max-w-xs text-xs font-bold uppercase tracking-[0.14em] text-[var(--d-ink)]/55">
            {content.hint}
          </p>
        </div>

        <ul className="mt-10 border-t-2 border-[var(--d-ink)]">
          {content.rows.map((row, i) => {
            const isActive = active === i;
            return (
              <li key={row.id} className="border-b-2 border-[var(--d-ink)]">
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive((cur) => (cur === i ? null : cur))}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive((cur) => (cur === i ? null : cur))}
                  onClick={() => scrollToId("contact")}
                  className="group/row relative flex w-full items-center gap-4 overflow-hidden px-1 py-6 text-left transition-colors duration-200 hover:bg-[var(--d-ink)] focus-visible:bg-[var(--d-ink)] focus-visible:outline-none md:gap-8 md:py-8"
                >
                  <span
                    className={`[font-family:var(--demo-body)] w-10 shrink-0 text-sm font-bold tabular-nums transition-colors md:w-14 md:text-base ${
                      isActive ? "text-[var(--d-accent)]" : "text-[var(--d-ink)]/50 group-hover/row:text-[var(--d-accent)]"
                    }`}
                  >
                    {row.index}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span
                      className={`[font-family:var(--demo-display)] block truncate text-2xl uppercase leading-none tracking-tight transition-colors md:text-5xl ${
                        isActive
                          ? "text-[var(--d-accent-ink)] [text-decoration:line-through] [text-decoration-color:var(--d-accent)] [text-decoration-thickness:4px]"
                          : "text-[var(--d-ink)] group-hover/row:text-[var(--d-accent-ink)]"
                      }`}
                    >
                      {row.client}
                    </span>
                    <span className="[font-family:var(--demo-body)] mt-2 block truncate text-xs font-bold uppercase tracking-[0.12em] text-[var(--d-ink)]/55 transition-colors group-hover/row:text-[var(--d-accent-ink)]/70">
                      {row.title} — {row.category}
                    </span>
                  </span>

                  <span className="hidden shrink-0 flex-col items-end gap-1 text-right md:flex">
                    <span className="[font-family:var(--demo-body)] text-sm font-bold text-[var(--d-accent)]">
                      {row.metric}
                    </span>
                    <span className="[font-family:var(--demo-body)] text-xs font-bold uppercase tracking-[0.14em] text-[var(--d-ink)]/45 transition-colors group-hover/row:text-[var(--d-accent-ink)]/60">
                      {row.year}
                    </span>
                  </span>

                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center border-2 transition-all md:h-11 md:w-11 ${
                      isActive
                        ? "border-[var(--d-accent)] bg-[var(--d-accent)] text-[var(--d-accent-ink)]"
                        : "border-[var(--d-ink)] text-[var(--d-ink)] group-hover/row:border-[var(--d-accent-ink)] group-hover/row:text-[var(--d-accent-ink)]"
                    }`}
                    aria-hidden
                  >
                    <ArrowUpRight className="h-5 w-5 transition-transform group-hover/row:rotate-45" strokeWidth={2.5} />
                  </span>
                </button>

                {/* Mobile thumbnail (no hover on touch) keeps the row informative. */}
                <div className="relative block h-40 w-full overflow-hidden border-t-2 border-[var(--d-ink)] md:hidden">
                  <Image
                    src={row.image}
                    alt={row.alt}
                    fill
                    sizes="100vw"
                    className="object-cover"
                    style={{ filter: "grayscale(1) contrast(1.1)" }}
                  />
                  <span className="absolute inset-0 bg-[var(--d-accent)] mix-blend-multiply opacity-40" aria-hidden />
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Floating preview trailing the cursor — desktop only, pointer-events off. */}
      <AnimatePresence>
        {activeRow && !reduce ? (
          <motion.div
            key={activeRow.id}
            className="pointer-events-none fixed left-0 top-0 z-40 hidden md:block"
            style={{ x, y }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <div className="-translate-x-1/2 -translate-y-1/2">
              <div className="relative h-56 w-72 -rotate-3 overflow-hidden border-2 border-[var(--d-ink)] bg-[var(--d-ink)] shadow-[10px_10px_0_0_var(--d-ink)]">
                <Image
                  src={activeRow.image}
                  alt=""
                  fill
                  sizes="288px"
                  className="object-cover"
                  style={{ filter: "grayscale(1) contrast(1.15)" }}
                />
                <span className="absolute inset-0 bg-[var(--d-accent)] mix-blend-multiply opacity-45" aria-hidden />
                <span className="absolute bottom-0 left-0 flex items-center gap-2 bg-[var(--d-accent)] px-3 py-1.5 [font-family:var(--demo-body)] text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[var(--d-accent-ink)]">
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />
                  {content.viewLabel}
                </span>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
