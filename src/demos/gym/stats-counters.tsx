"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import type { StatsContent, StatCounter } from "./content";
import { SectionEyebrow } from "./ui";

function useInView<T extends Element>(): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);
  return [ref, seen];
}

function Counter({ counter, run, locale }: { counter: StatCounter; run: boolean; locale: string }) {
  const reduce = useReducedMotion() ?? false;
  const [value, setValue] = useState(reduce ? counter.value : 0);

  useEffect(() => {
    if (!run || reduce) {
      setValue(counter.value);
      return;
    }
    const duration = 1400;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(counter.value * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [run, reduce, counter.value]);

  const formatted = new Intl.NumberFormat(locale).format(value);

  return (
    <div className="relative">
      <div className="flex items-baseline">
        <span className="[font-family:var(--demo-display)] text-5xl text-[var(--d-ink)] sm:text-[4.2rem]">
          {formatted}
        </span>
        <span className="[font-family:var(--demo-display)] text-3xl text-[var(--d-accent)] sm:text-4xl">
          {counter.suffix}
        </span>
      </div>
      <div className="mt-2 max-w-[13rem] text-[0.72rem] font-semibold uppercase leading-snug tracking-[0.12em] text-[var(--d-ink-faint)]">
        {counter.label}
      </div>
    </div>
  );
}

export function StatsCounters({ content, locale }: { content: StatsContent; locale: string }) {
  const [ref, seen] = useInView<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden border-t border-[var(--d-line)] bg-[#0E0E11] py-20 sm:py-28">
      <div
        className="pointer-events-none absolute -left-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full opacity-25 blur-[120px]"
        style={{ background: "radial-gradient(circle, #D7FF3E 0%, transparent 70%)" }}
        aria-hidden
      />
      <div ref={ref} className="relative mx-auto max-w-6xl px-5">
        <div className="max-w-2xl">
          <SectionEyebrow label={content.label} />
          <h2 className="mt-4 [font-family:var(--demo-display)] text-[2.6rem] uppercase leading-[0.92] tracking-[-0.01em] text-[var(--d-ink)] sm:text-6xl">
            {content.title}
          </h2>
          <p className="mt-5 max-w-xl text-[0.98rem] leading-relaxed text-[var(--d-ink-dim)]">
            {content.intro}
          </p>
        </div>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {content.counters.map((counter) => (
            <Counter key={counter.label} counter={counter} run={seen} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}
