"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import type { StatItem, StatsContent } from "./content";
import { Crest, Eyebrow } from "./ui";

function useCountUp(target: number, run: boolean, reduce: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!run) return;
    if (reduce) {
      setValue(target);
      return;
    }
    const duration = 1600;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * target));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, run, reduce]);
  return value;
}

function format(value: number) {
  return value.toLocaleString("en-US");
}

function StatBlock({ item, run, reduce }: { item: StatItem; run: boolean; reduce: boolean }) {
  const value = useCountUp(item.value, run, reduce);
  return (
    <div className="relative px-4 py-2 text-center">
      <p className="[font-family:var(--demo-display)] text-4xl font-bold leading-none tracking-tight text-[var(--d-parchment)] sm:text-5xl">
        {item.prefix}
        {format(value)}
        <span className="text-[var(--d-gold)]">{item.suffix}</span>
      </p>
      <p className="mt-3 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[var(--d-parchment)]/65">
        {item.label}
      </p>
    </div>
  );
}

export function Stats({ content }: { content: StatsContent }) {
  const reduce = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative overflow-hidden bg-[var(--d-crimson)] py-20 sm:py-24">
      <Crest
        className="pointer-events-none absolute -right-10 top-1/2 h-72 w-72 -translate-y-1/2 opacity-[0.06]"
        stroke="var(--d-parchment)"
        accent="var(--d-parchment)"
      />
      <div ref={ref} className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow text={content.eyebrow} tone="parchment" align="center" />
          <h2 className="mt-4 [font-family:var(--demo-display)] text-3xl font-normal leading-tight text-[var(--d-parchment)] sm:text-4xl">
            {content.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--d-parchment)]/75">
            {content.intro}
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-y-10 divide-[var(--d-parchment)]/15 sm:grid-cols-4 sm:divide-x">
          {content.items.map((item) => (
            <StatBlock key={item.label} item={item} run={inView} reduce={reduce} />
          ))}
        </div>
      </div>
    </section>
  );
}
