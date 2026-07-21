"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { NoirContent, RunwayEvent } from "./content";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const TARGET = new Date("2026-12-31T20:00:00Z").getTime();

interface Remaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function compute(now: number): Remaining {
  const diff = Math.max(0, TARGET - now);
  const s = Math.floor(diff / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

function statusTone(status: RunwayEvent["status"]): string {
  if (status === "confirmed") return "text-[var(--d-gold-bright)] border-[var(--d-gold)]";
  if (status === "waitlist") return "text-[var(--d-ink)] border-[var(--d-line)]";
  return "text-[var(--d-ink-soft)] border-[var(--d-line-soft)]";
}

export function Runway({
  content,
  intlLocale,
  onRequest,
}: {
  content: NoirContent["runway"];
  intlLocale: string;
  onRequest: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const [remaining, setRemaining] = useState<Remaining | null>(null);

  useEffect(() => {
    setRemaining(compute(Date.now()));
    const id = window.setInterval(() => setRemaining(compute(Date.now())), 1000);
    return () => window.clearInterval(id);
  }, []);

  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(intlLocale, {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    [intlLocale],
  );

  const units: { key: keyof Remaining; label: string }[] = [
    { key: "days", label: content.countdownUnits.days },
    { key: "hours", label: content.countdownUnits.hours },
    { key: "minutes", label: content.countdownUnits.minutes },
    { key: "seconds", label: content.countdownUnits.seconds },
  ];

  return (
    <section
      id="runway"
      className="relative border-t border-[var(--d-line-soft)] bg-[var(--d-bg-soft)] px-6 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="text-[10px] font-medium uppercase tracking-[0.42em] text-[var(--d-gold)]">
              {content.eyebrow}
            </p>
            <h2 className="mt-4 [font-family:var(--demo-display)] text-4xl leading-[1.02] text-[var(--d-ink)] sm:text-5xl">
              {content.title}
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-[var(--d-ink-soft)]">
            {content.intro}
          </p>
        </header>

        {/* Countdown */}
        <div className="mt-14 flex flex-col items-start gap-6 border-y border-[var(--d-line-soft)] py-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="[font-family:var(--demo-display)] text-2xl italic text-[var(--d-ink)]">
            {content.countdownTitle}
          </p>
          <div className="flex items-end gap-5 sm:gap-8" aria-live="off">
            {units.map((unit) => (
              <div key={unit.key} className="flex flex-col items-center">
                <span className="[font-family:var(--demo-display)] text-4xl italic tabular-nums text-[var(--d-gold-bright)] sm:text-6xl">
                  {remaining ? String(remaining[unit.key]).padStart(2, "0") : "--"}
                </span>
                <span className="mt-2 text-[9px] uppercase tracking-[0.3em] text-[var(--d-ink-faint)]">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Calendar */}
        <ul className="mt-4">
          {content.events.map((event, i) => (
            <motion.li
              key={event.id}
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: EASE }}
            >
              <div className="group grid grid-cols-1 items-center gap-4 border-b border-[var(--d-line-soft)] py-8 sm:grid-cols-[1fr_1.4fr_auto] sm:gap-8">
                <div className="flex items-baseline gap-4">
                  <span className="[font-family:var(--demo-display)] text-2xl italic text-[var(--d-ink-faint)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="[font-family:var(--demo-display)] text-3xl text-[var(--d-ink)] transition-colors duration-300 group-hover:text-[var(--d-gold-bright)] sm:text-4xl">
                    {event.city}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-[var(--d-ink)]">{event.label}</p>
                  <p className="mt-1 text-xs text-[var(--d-ink-faint)]">
                    {event.venue}
                  </p>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-[var(--d-ink-soft)]">
                    {content.dateLabel} {dateFormatter.format(new Date(`${event.date}T${event.time}:00`))} · {content.timeLabel} {event.time}
                  </p>
                </div>
                <div className="flex items-center gap-4 justify-self-start sm:justify-self-end">
                  <span
                    className={`border px-3 py-1.5 text-[9px] uppercase tracking-[0.24em] ${statusTone(event.status)}`}
                  >
                    {content.statusLabels[event.status]}
                  </span>
                  <button
                    type="button"
                    onClick={onRequest}
                    aria-label={`${content.requestSeat} — ${event.city}`}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--d-line)] text-[var(--d-ink)] transition-colors duration-300 hover:border-[var(--d-gold)] hover:bg-[var(--d-gold)] hover:text-[#0A0A0A]"
                  >
                    <ArrowUpRight aria-hidden className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
