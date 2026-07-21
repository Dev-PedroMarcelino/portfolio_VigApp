"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { animate, useInView, useReducedMotion } from "framer-motion";
import type { MetricsContent } from "./content";
import { SectionHeading } from "./ui";

const STARS_IMG =
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1600&q=80";

function CountUp({
  value,
  decimals,
  suffix,
  numberLocale,
}: {
  value: number;
  decimals: number;
  suffix: string;
  numberLocale: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion() ?? false;
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setCurrent(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => setCurrent(v),
    });
    return () => controls.stop();
  }, [inView, reduce, value]);

  const format = useMemo(
    () =>
      new Intl.NumberFormat(numberLocale, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }),
    [numberLocale, decimals],
  );

  return (
    <span ref={ref} className="tabular-nums">
      {format.format(current)}
      <span className="text-[var(--d-accent-soft)]">{suffix}</span>
    </span>
  );
}

export function MetricsBand({
  content,
  numberLocale,
}: {
  content: MetricsContent;
  numberLocale: string;
}) {
  return (
    <section id="metrics" className="relative scroll-mt-20 overflow-hidden py-24 md:py-28">
      <div className="absolute inset-0" aria-hidden>
        <Image
          src={STARS_IMG}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-[0.14] mix-blend-screen"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, #0B0B12 0%, rgba(11,11,18,0.55) 50%, #0B0B12 100%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-5">
        <SectionHeading label={content.label} title={content.title} />

        <ul className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[var(--d-line-bright)] bg-[var(--d-line)] sm:grid-cols-2 lg:grid-cols-4">
          {content.items.map((item) => (
            <li
              key={item.label}
              className="flex flex-col gap-2 bg-[var(--d-panel)]/90 px-7 py-9 backdrop-blur"
            >
              <p className="[font-family:var(--demo-display)] text-4xl font-medium tracking-tight text-[var(--d-ink)] md:text-[2.6rem]">
                <CountUp
                  value={item.value}
                  decimals={item.decimals}
                  suffix={item.suffix}
                  numberLocale={numberLocale}
                />
              </p>
              <p className="text-[0.8rem] leading-snug text-[var(--d-ink-dim)]">{item.label}</p>
            </li>
          ))}
        </ul>

        <p className="mt-5 text-center text-xs text-[var(--d-ink-faint)]">{content.footnote}</p>
      </div>
    </section>
  );
}
