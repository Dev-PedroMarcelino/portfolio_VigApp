"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { FinalCtaContent } from "./content";
import { HaloRing } from "./halo-ring";

const DEADLINE = new Date("2027-02-28T23:59:59Z").getTime();

function diff(now: number) {
  const total = Math.max(0, DEADLINE - now);
  return {
    days: Math.floor(total / 86_400_000),
    hours: Math.floor((total / 3_600_000) % 24),
    minutes: Math.floor((total / 60_000) % 60),
    seconds: Math.floor((total / 1000) % 60),
  };
}

export function FinalCta({ content }: { content: FinalCtaContent }) {
  const reduce = useReducedMotion() ?? false;
  const [time, setTime] = useState(() => diff(Date.UTC(2026, 6, 21)));

  useEffect(() => {
    setTime(diff(Date.now()));
    if (reduce) return;
    const id = window.setInterval(() => setTime(diff(Date.now())), 1000);
    return () => window.clearInterval(id);
  }, [reduce]);

  const cells: { value: number; label: string }[] = [
    { value: time.days, label: content.units.days },
    { value: time.hours, label: content.units.hours },
    { value: time.minutes, label: content.units.minutes },
    { value: time.seconds, label: content.units.seconds },
  ];

  return (
    <section className="relative overflow-hidden px-5 py-24 md:py-32">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
        style={{ background: "radial-gradient(60% 70% at 50% 50%, rgba(126,231,199,0.14), transparent 65%)" }}
      />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 w-[36rem] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-20" aria-hidden>
        <HaloRing className="h-auto w-full" glow={false} />
      </div>

      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <h2 className="[font-family:var(--demo-display)] text-3xl font-medium leading-[1.05] tracking-tight text-[var(--d-ink)] sm:text-5xl md:text-[3.4rem]">
          {content.title}
        </h2>
        <p className="mt-5 max-w-lg text-[0.98rem] leading-relaxed text-[var(--d-ink-dim)]">{content.sub}</p>

        <div className="mt-10 w-full">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[var(--d-ink-faint)]">
            {content.deadlineLabel}
          </p>
          <div className="mx-auto mt-4 grid max-w-md grid-cols-4 gap-2.5">
            {cells.map((cell) => (
              <div
                key={cell.label}
                className="rounded-2xl border border-[var(--d-line)] bg-[var(--d-panel)] py-4"
              >
                <div className="[font-family:var(--demo-display)] text-2xl font-medium tabular-nums text-[var(--d-ink)] sm:text-3xl">
                  {String(cell.value).padStart(2, "0")}
                </div>
                <div className="mt-1 text-[0.62rem] uppercase tracking-[0.12em] text-[var(--d-ink-faint)]">
                  {cell.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <a
          href="#pricing"
          className="group mt-10 inline-flex items-center gap-2 rounded-full bg-[var(--d-accent)] px-8 py-4 text-sm font-semibold text-[#08130F] shadow-[0_0_50px_-10px_rgba(126,231,199,0.7)] transition-transform hover:scale-[1.03]"
        >
          {content.cta}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.2} aria-hidden />
        </a>
        <p className="mt-3 text-xs text-[var(--d-ink-faint)]">{content.ctaNote}</p>
      </div>
    </section>
  );
}
