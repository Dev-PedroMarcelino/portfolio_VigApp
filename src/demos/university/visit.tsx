"use client";

import { useEffect, useState } from "react";
import { ArrowRight, MapPin } from "lucide-react";
import { APPLICATION_DEADLINE, type VisitContent } from "./content";
import { Crest, DoubleRule, Eyebrow, scrollToId } from "./ui";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function computeLeft(): TimeLeft {
  const diff = new Date(APPLICATION_DEADLINE).getTime() - Date.now();
  const clamped = Math.max(diff, 0);
  return {
    days: Math.floor(clamped / 86_400_000),
    hours: Math.floor((clamped / 3_600_000) % 24),
    minutes: Math.floor((clamped / 60_000) % 60),
    seconds: Math.floor((clamped / 1000) % 60),
  };
}

const pad = (n: number) => n.toString().padStart(2, "0");

export function Visit({ content }: { content: VisitContent }) {
  const [left, setLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setLeft(computeLeft());
    const id = window.setInterval(() => setLeft(computeLeft()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const units: { key: keyof TimeLeft; label: string }[] = [
    { key: "days", label: content.units.days },
    { key: "hours", label: content.units.hours },
    { key: "minutes", label: content.units.minutes },
    { key: "seconds", label: content.units.seconds },
  ];

  return (
    <section
      id="visit"
      className="scroll-mt-20 bg-[var(--d-crimson-deep)] py-20 text-[var(--d-parchment)] sm:py-28"
    >
      <div className="mx-auto max-w-4xl px-6 text-center">
        <div className="flex justify-center">
          <Crest className="h-16 w-16" stroke="var(--d-parchment)" accent="var(--d-gold)" />
        </div>
        <div className="mt-6 flex justify-center">
          <Eyebrow text={content.eyebrow} tone="parchment" align="center" />
        </div>
        <h2 className="mt-4 [font-family:var(--demo-display)] text-3xl font-normal leading-tight sm:text-5xl">
          {content.title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[var(--d-parchment)]/80">
          {content.body}
        </p>

        {/* countdown */}
        <div className="mt-10">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[var(--d-parchment)]/60">
            {content.countdownLabel}
          </p>
          <div className="mt-4 flex items-stretch justify-center gap-2 sm:gap-3">
            {units.map((unit, i) => (
              <div key={unit.key} className="flex items-stretch gap-2 sm:gap-3">
                <div className="flex min-w-[4.2rem] flex-col items-center rounded-xl border border-[var(--d-parchment)]/20 bg-[var(--d-crimson)]/30 px-3 py-3 sm:min-w-[5rem]">
                  <span
                    className="[font-family:var(--demo-display)] text-3xl font-bold tabular-nums text-[var(--d-parchment)] sm:text-4xl"
                    aria-hidden={left === null}
                  >
                    {left ? pad(left[unit.key]) : "--"}
                  </span>
                  <span className="mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-[var(--d-parchment)]/60">
                    {unit.label}
                  </span>
                </div>
                {i < units.length - 1 && (
                  <span
                    className="hidden self-center [font-family:var(--demo-display)] text-2xl text-[var(--d-gold)] sm:inline"
                    aria-hidden
                  >
                    :
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-xs">
          <DoubleRule color="var(--d-gold)" />
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => scrollToId("admissions")}
            className="group inline-flex items-center gap-2 rounded-full bg-[var(--d-parchment)] px-7 py-3.5 text-[0.82rem] font-semibold uppercase tracking-[0.14em] text-[var(--d-crimson-deep)] transition-transform hover:-translate-y-0.5"
          >
            {content.applyCta}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={() => scrollToId("life")}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--d-parchment)]/35 px-7 py-3.5 text-[0.82rem] font-semibold uppercase tracking-[0.14em] text-[var(--d-parchment)] transition-colors hover:bg-[var(--d-parchment)]/10"
          >
            {content.visitCta}
          </button>
        </div>

        <p className="mt-8 inline-flex items-center gap-2 text-xs text-[var(--d-parchment)]/60">
          <MapPin className="h-3.5 w-3.5" strokeWidth={2} />
          {content.note}
        </p>
      </div>
    </section>
  );
}
