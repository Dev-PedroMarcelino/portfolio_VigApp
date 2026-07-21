"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { JoinContent } from "./content";
import { SectionEyebrow, scrollToId } from "./ui";

const OFFER_DEADLINE = new Date("2026-12-31T23:59:59Z").getTime();
const JOIN_IMG =
  "https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&w=1600&q=80";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function diff(now: number): TimeLeft {
  const delta = Math.max(0, OFFER_DEADLINE - now);
  const total = Math.floor(delta / 1000);
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export function JoinCta({ content }: { content: JoinContent }) {
  const [time, setTime] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTime(diff(Date.now()));
    const id = window.setInterval(() => setTime(diff(Date.now())), 1000);
    return () => window.clearInterval(id);
  }, []);

  const units = time
    ? [
        { value: time.days, label: content.units.days },
        { value: time.hours, label: content.units.hours },
        { value: time.minutes, label: content.units.minutes },
        { value: time.seconds, label: content.units.seconds },
      ]
    : [];

  return (
    <section id="join" className="relative overflow-hidden border-t border-[var(--d-line)]">
      <div className="absolute inset-0" aria-hidden>
        <Image src={JOIN_IMG} alt="" fill sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-[#0B0B0D]/86" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 80% 20%, rgba(215,255,62,0.18) 0%, transparent 55%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-5xl px-5 py-20 text-center sm:py-28">
        <div className="flex justify-center">
          <SectionEyebrow label={content.label} />
        </div>
        <h2 className="mx-auto mt-5 max-w-3xl [font-family:var(--demo-display)] text-[3rem] uppercase leading-[0.9] tracking-[-0.01em] text-[var(--d-ink)] sm:text-7xl">
          {content.title}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-[0.98rem] leading-relaxed text-[var(--d-ink-dim)]">
          {content.sub}
        </p>

        {/* Countdown */}
        <div className="mt-10">
          <div className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[var(--d-accent)]">
            {content.offer}
          </div>
          <div className="mt-4 flex items-start justify-center gap-3 sm:gap-5">
            {units.length > 0
              ? units.map((unit, i) => (
                  <div key={unit.label} className="flex items-start gap-3 sm:gap-5">
                    <div className="flex flex-col items-center">
                      <div className="min-w-[3.5rem] border border-[var(--d-line-bright)] bg-[#0B0B0D]/70 px-3 py-3 [font-family:var(--demo-display)] text-4xl text-[var(--d-ink)] sm:min-w-[5rem] sm:text-6xl">
                        {pad(unit.value)}
                      </div>
                      <div className="mt-2 text-[0.6rem] font-bold uppercase tracking-[0.16em] text-[var(--d-ink-faint)]">
                        {unit.label}
                      </div>
                    </div>
                    {i < units.length - 1 ? (
                      <span className="[font-family:var(--demo-display)] text-4xl text-[var(--d-accent)] sm:text-6xl" aria-hidden>
                        :
                      </span>
                    ) : null}
                  </div>
                ))
              : null}
          </div>
        </div>

        <div className="mt-11 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => scrollToId("membership")}
            className="group inline-flex items-center gap-2 bg-[var(--d-accent)] px-7 py-4 text-[0.8rem] font-bold uppercase tracking-[0.12em] text-[#0B0B0D] transition-transform hover:-translate-y-0.5 [clip-path:polygon(5%_0,100%_0,95%_100%,0_100%)]"
          >
            {content.ctaPrimary}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.4} aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => scrollToId("schedule")}
            className="inline-flex items-center gap-2 border border-[var(--d-line-bright)] px-7 py-4 text-[0.8rem] font-bold uppercase tracking-[0.12em] text-[var(--d-ink)] transition-colors hover:bg-white/5"
          >
            {content.ctaSecondary}
          </button>
        </div>
      </div>
    </section>
  );
}
