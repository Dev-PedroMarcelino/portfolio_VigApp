"use client";

import { useEffect, useRef, useState } from "react";
import { ShieldCheck, OctagonAlert } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import type { Counter, VertexContent } from "./content";

function useInView(threshold = 0.35) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function CountUp({
  value,
  suffix,
  active,
  locale,
}: {
  value: number;
  suffix: string;
  active: boolean;
  locale: string;
}) {
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? value : 0);
  const decimals = Number.isInteger(value) ? 0 : 1;

  useEffect(() => {
    if (!active || reduce) {
      setDisplay(value);
      return;
    }
    let raf = 0;
    const duration = 1400;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(value * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, reduce, value]);

  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(display);

  return (
    <span className="[font-family:var(--demo-display)] text-[clamp(2.6rem,5vw,3.8rem)] leading-none text-[var(--d-ink)]">
      {formatted}
      <span className="text-[var(--d-accent)]">{suffix}</span>
    </span>
  );
}

function CounterCell({
  counter,
  active,
  locale,
}: {
  counter: Counter;
  active: boolean;
  locale: string;
}) {
  return (
    <div className="flex flex-col gap-3 bg-[var(--d-panel)] p-6 sm:p-8">
      <CountUp
        value={counter.value}
        suffix={counter.suffix}
        active={active}
        locale={locale}
      />
      <div>
        <div className="[font-family:var(--demo-body)] text-sm font-medium uppercase tracking-[0.12em] text-[var(--d-ink)]">
          {counter.label}
        </div>
        <div className="mt-0.5 text-[11px] uppercase tracking-[0.1em] text-[var(--d-ink-faint)]">
          {counter.sub}
        </div>
      </div>
    </div>
  );
}

export function Capacity({
  content,
  locale,
}: {
  content: VertexContent["stats"];
  locale: string;
}) {
  const { ref, inView } = useInView();

  return (
    <section
      id="capacity"
      className="relative border-t border-[var(--d-line)] bg-[var(--d-bg)] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[92rem] px-5 sm:px-8">
        <div className="grid gap-6 border-b border-[var(--d-line)] pb-10 lg:grid-cols-[auto_1fr] lg:items-end lg:gap-12">
          <div>
            <span className="[font-family:var(--demo-body)] text-[11px] font-medium uppercase tracking-[0.24em] text-[var(--d-accent)]">
              {content.eyebrow}
            </span>
            <h2 className="mt-3 max-w-2xl [font-family:var(--demo-display)] text-[clamp(2rem,4.5vw,3.4rem)] uppercase leading-[0.95] text-[var(--d-ink)]">
              {content.title}
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[var(--d-ink-soft)] lg:pb-2">
            {content.lede}
          </p>
        </div>

        <div
          ref={ref}
          className="mt-10 grid grid-cols-1 gap-px border border-[var(--d-line)] bg-[var(--d-line)] sm:grid-cols-2 lg:grid-cols-4"
        >
          {content.counters.map((counter) => (
            <CounterCell
              key={counter.id}
              counter={counter}
              active={inView}
              locale={locale}
            />
          ))}
        </div>

        {/* safety block */}
        <div className="mt-5 grid grid-cols-1 overflow-hidden border border-[var(--d-line)] lg:grid-cols-[1.4fr_1fr]">
          <div className="relative bg-[var(--d-panel-2)] p-8 sm:p-10">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center bg-[var(--d-accent)] text-[var(--d-accent-ink)]">
                <ShieldCheck className="h-5 w-5" strokeWidth={2} />
              </span>
              <h3 className="[font-family:var(--demo-display)] text-2xl uppercase leading-none text-[var(--d-ink)] sm:text-3xl">
                {content.safetyTitle}
              </h3>
            </div>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-[var(--d-ink-soft)]">
              {content.safetyBody}
            </p>
          </div>
          <div
            className="relative flex flex-col items-start justify-center gap-2 p-8 sm:p-10"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, var(--d-accent-ink) 0 20px, var(--d-accent) 20px 40px)",
            }}
          >
            <div className="absolute inset-0 bg-[rgba(21,24,29,0.7)]" aria-hidden />
            <div className="relative flex items-center gap-2 text-[var(--d-accent)]">
              <OctagonAlert className="h-5 w-5" strokeWidth={2} />
              <span className="[font-family:var(--demo-body)] text-[11px] font-medium uppercase tracking-[0.18em]">
                {content.safetyMetricLabel}
              </span>
            </div>
            <div className="relative [font-family:var(--demo-display)] text-[clamp(3.4rem,8vw,5.5rem)] leading-none text-[var(--d-ink)]">
              {content.safetyMetric}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
