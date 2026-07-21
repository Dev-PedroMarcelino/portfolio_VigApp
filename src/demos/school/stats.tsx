"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import type { StatItem, StatsContent } from "./content";
import { Star, Wave } from "./ui";

function useCountUp(target: number, run: boolean, reduce: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!run) return;
    if (reduce) {
      setValue(target);
      return;
    }
    const duration = 1400;
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

function StatCard({ item, run, reduce }: { item: StatItem; run: boolean; reduce: boolean }) {
  const value = useCountUp(item.value, run, reduce);
  return (
    <div className="rounded-[1.75rem] bg-white/12 p-6 text-center backdrop-blur-sm ring-1 ring-white/15">
      <p className="[font-family:var(--demo-display)] text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
        {value}
        <span className="text-[var(--d-sun)]">{item.suffix}</span>
      </p>
      <p className="mt-2 text-sm font-bold text-white/75">{item.label}</p>
    </div>
  );
}

export function Stats({ content }: { content: StatsContent }) {
  const reduce = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative overflow-hidden bg-[var(--d-accent)] py-16 sm:py-20">
      <Wave fill="var(--d-surface)" flip />
      <Star className="right-12 top-20 h-7 w-7 opacity-40" color="var(--d-sun)" />
      <Star className="left-10 bottom-16 h-5 w-5 opacity-40" color="#FFFFFF" />

      <div ref={ref} className="relative z-10 mx-auto max-w-5xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="[font-family:var(--demo-display)] text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
            {content.title}
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-white/80">{content.intro}</p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {content.items.map((item) => (
            <StatCard key={item.label} item={item} run={inView} reduce={reduce} />
          ))}
        </div>
      </div>

      <div className="mt-14">
        <Wave fill="var(--d-bg)" />
      </div>
    </section>
  );
}
