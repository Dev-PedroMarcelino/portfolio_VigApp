"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  BellRing,
  CalendarDays,
  Check,
  CreditCard,
  Mail,
  MessageSquare,
  RefreshCw,
} from "lucide-react";
import type { FeaturesContent } from "./content";
import { SectionLabel } from "./ui";

export function FeaturesTrio({ content }: { content: FeaturesContent }) {
  const reduce = useReducedMotion() ?? false;

  return (
    <section id="features" className="scroll-mt-20 bg-[var(--d-card)] px-5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <SectionLabel text={content.label} />
          <h2 className="mt-5 [font-family:var(--demo-display)] text-3xl font-extrabold tracking-tight md:text-5xl">
            {content.title}
          </h2>
          <p className="mt-4 leading-[1.8] text-[var(--d-ink-soft)]">{content.intro}</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {content.items.map((item, idx) => (
            <motion.article
              key={item.id}
              initial={reduce ? undefined : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: reduce ? 0 : idx * 0.1, ease: "easeOut" }}
              className="flex flex-col rounded-[1.75rem] border border-[var(--d-line)] bg-[var(--d-bg)] p-6"
            >
              <div className="h-44 overflow-hidden rounded-2xl border border-[var(--d-line)] bg-[var(--d-card)] p-4">
                {item.id === "calendars" && <CalendarsVignette content={content} />}
                {item.id === "reminders" && <RemindersVignette content={content} />}
                {item.id === "payments" && <PaymentsVignette content={content} />}
              </div>
              <span className="mt-6 flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--d-accent)] text-white">
                {item.id === "calendars" && (
                  <CalendarDays className="h-5 w-5" strokeWidth={2} aria-hidden />
                )}
                {item.id === "reminders" && (
                  <BellRing className="h-5 w-5" strokeWidth={2} aria-hidden />
                )}
                {item.id === "payments" && (
                  <CreditCard className="h-5 w-5" strokeWidth={2} aria-hidden />
                )}
              </span>
              <h3 className="mt-4 [font-family:var(--demo-display)] text-xl font-bold tracking-tight">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--d-ink-soft)]">{item.body}</p>
              <ul className="mt-4 space-y-2.5">
                {item.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2.5 text-[0.82rem] text-[var(--d-ink)]">
                    <span className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[var(--d-mint)] text-[var(--d-accent-deep)]">
                      <Check className="h-2.5 w-2.5" strokeWidth={3} aria-hidden />
                    </span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* CSS-built product vignettes                                         */
/* ------------------------------------------------------------------ */

function CalendarsVignette({ content }: { content: FeaturesContent }) {
  const v = content.vignettes.calendars;
  // Deterministic mini week: event chip placements derived from indexes.
  const placements = [
    { col: 1, row: 0 },
    { col: 2, row: 2 },
    { col: 4, row: 1 },
  ];
  return (
    <div className="relative h-full">
      <span className="absolute right-0 top-0 z-10 flex items-center gap-1 rounded-full bg-[var(--d-mint)] px-2 py-0.5 text-[0.58rem] font-bold text-[var(--d-accent-deep)]">
        <RefreshCw className="h-2.5 w-2.5" strokeWidth={2.6} aria-hidden />
        {v.badge}
      </span>
      <div className="grid h-full grid-cols-5 gap-1.5 pt-6" aria-hidden>
        {Array.from({ length: 5 }, (_, col) => (
          <div key={col} className="flex flex-col gap-1.5">
            {Array.from({ length: 4 }, (_, row) => {
              const eventIdx = placements.findIndex((p) => p.col === col && p.row === row);
              if (eventIdx >= 0) {
                return (
                  <span
                    key={row}
                    className={`flex-1 overflow-hidden rounded-md px-1 py-0.5 text-[0.5rem] font-bold leading-tight text-white ${
                      eventIdx === 1 ? "bg-[var(--d-pop)]" : "bg-[var(--d-accent)]"
                    }`}
                  >
                    {v.events[eventIdx]}
                  </span>
                );
              }
              return <span key={row} className="flex-1 rounded-md bg-[#EDF7F4]" />;
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function RemindersVignette({ content }: { content: FeaturesContent }) {
  const items = content.vignettes.reminders;
  return (
    <div className="flex h-full flex-col justify-center gap-2">
      {items.map((item, i) => (
        <div
          key={item.time}
          className="flex items-center gap-2 rounded-xl border border-[var(--d-line)] bg-[var(--d-bg)] px-2.5 py-1.5 shadow-sm"
          style={{ marginLeft: `${i * 10}px`, marginRight: `${(2 - i) * 6}px` }}
        >
          <span
            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-white ${
              item.channel === "SMS" ? "bg-[var(--d-pop)]" : "bg-[var(--d-accent)]"
            }`}
          >
            {item.channel === "SMS" ? (
              <MessageSquare className="h-3 w-3" strokeWidth={2.4} aria-hidden />
            ) : (
              <Mail className="h-3 w-3" strokeWidth={2.4} aria-hidden />
            )}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[0.62rem] font-bold text-[var(--d-ink)]">
              {item.text}
            </span>
            <span className="block text-[0.54rem] font-semibold uppercase tracking-[0.1em] text-[var(--d-ink-soft)]">
              {item.channel} · {item.time}
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}

function PaymentsVignette({ content }: { content: FeaturesContent }) {
  const v = content.vignettes.payments;
  return (
    <div className="flex h-full flex-col justify-center">
      <div className="rounded-xl border border-[var(--d-line)] bg-[var(--d-bg)] p-3.5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-[0.68rem] font-bold text-[var(--d-ink)]">{v.invoice}</p>
            <p className="text-[0.58rem] text-[var(--d-ink-soft)]">{v.item}</p>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-[var(--d-mint)] px-2 py-0.5 text-[0.58rem] font-bold text-[var(--d-accent-deep)]">
            <Check className="h-2.5 w-2.5" strokeWidth={3} aria-hidden />
            {v.paid}
          </span>
        </div>
        <p className="mt-3 [font-family:var(--demo-display)] text-2xl font-extrabold tracking-tight text-[var(--d-ink)]">
          {v.amount}
        </p>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[var(--d-mint)]" aria-hidden>
          <div className="h-full w-full rounded-full bg-[var(--d-accent)]" />
        </div>
      </div>
      <p className="mt-2.5 flex items-center gap-1.5 text-[0.6rem] font-semibold text-[var(--d-ink-soft)]">
        <Check className="h-3 w-3 text-[var(--d-accent)]" strokeWidth={2.6} aria-hidden />
        {v.note}
      </p>
    </div>
  );
}
