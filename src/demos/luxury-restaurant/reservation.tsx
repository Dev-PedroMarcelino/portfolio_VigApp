"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, CalendarDays, Check, Clock3, Users } from "lucide-react";
import type { LumiereContent } from "./content";

const EASE_SLOW: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Fixed epoch so SSR and CSR render identical calendars: Tuesday, 4 Aug 2026. */
const FIRST_EVENING_UTC = Date.UTC(2026, 7, 4);
const DAY_MS = 86_400_000;
const DATE_COUNT = 12;
const TIME_SLOTS = ["18:45", "19:00", "19:30", "20:15", "21:15", "21:45"];
const MAX_GUESTS = 8;

interface EveningOption {
  index: number;
  date: Date;
  closed: boolean;
}

function buildEvenings(): EveningOption[] {
  return Array.from({ length: DATE_COUNT }, (_, index) => {
    const date = new Date(FIRST_EVENING_UTC + index * DAY_MS);
    const weekday = date.getUTCDay();
    return { index, date, closed: weekday === 0 || weekday === 1 };
  });
}

/** Deterministic availability derived from indexes — never Math.random. */
function slotAvailable(dateIndex: number, slotIndex: number): boolean {
  return (dateIndex * 3 + slotIndex * 5) % 7 !== 0;
}

function confirmationCode(guests: number, dateIndex: number, slotIndex: number): string {
  const seed = 1000 + ((guests * 37 + dateIndex * 89 + slotIndex * 13) % 9000);
  return `ML-${seed}`;
}

type Step = 0 | 1 | 2 | 3;

export function ReservationSection({
  content,
  intlLocale,
}: {
  content: LumiereContent["reservation"];
  intlLocale: string;
}) {
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState<Step>(0);
  const [guests, setGuests] = useState<number | null>(null);
  const [dateIndex, setDateIndex] = useState<number | null>(null);
  const [slotIndex, setSlotIndex] = useState<number | null>(null);

  const evenings = useMemo(buildEvenings, []);
  const dayFormatter = useMemo(
    () => new Intl.DateTimeFormat(intlLocale, { weekday: "short", timeZone: "UTC" }),
    [intlLocale],
  );
  const dateFormatter = useMemo(
    () => new Intl.DateTimeFormat(intlLocale, { day: "numeric", month: "short", timeZone: "UTC" }),
    [intlLocale],
  );
  const longDateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(intlLocale, {
        weekday: "long",
        day: "numeric",
        month: "long",
        timeZone: "UTC",
      }),
    [intlLocale],
  );

  const stepMeta = [
    { label: content.steps.guests, icon: Users },
    { label: content.steps.date, icon: CalendarDays },
    { label: content.steps.time, icon: Clock3 },
  ];

  const canContinue =
    (step === 0 && guests !== null) ||
    (step === 1 && dateIndex !== null) ||
    (step === 2 && slotIndex !== null);

  const goBack = () => setStep((current) => (current > 0 ? ((current - 1) as Step) : current));
  const goNext = () => {
    if (!canContinue) return;
    setStep((current) => (current < 3 ? ((current + 1) as Step) : current));
  };

  const reset = () => {
    setGuests(null);
    setDateIndex(null);
    setSlotIndex(null);
    setStep(0);
  };

  const chosenEvening = dateIndex !== null ? evenings[dateIndex] : null;
  const guestsLine =
    guests !== null
      ? `${guests} ${guests === 1 ? content.guestSingular : content.guestPlural}`
      : "";

  const panelMotion = {
    initial: reduceMotion ? undefined : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    exit: reduceMotion ? undefined : { opacity: 0, y: -12 },
    transition: { duration: 0.55, ease: EASE_SLOW },
  };

  return (
    <section id="reserve" className="relative bg-[var(--d-bg)] py-28 sm:py-36">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.5em] text-[var(--d-gold)]">
            {content.eyebrow}
          </p>
          <h2 className="[font-family:var(--demo-display)] mt-5 text-4xl font-medium leading-tight text-[var(--d-ink)] sm:text-5xl">
            {content.title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-sm font-light leading-relaxed text-[var(--d-ink-soft)]">
            {content.intro}
          </p>
        </div>

        <ol className="mt-14 flex items-center justify-center gap-0" aria-label={content.eyebrow}>
          {stepMeta.map((meta, index) => {
            const Icon = meta.icon;
            const reached = step >= index;
            const isCurrent = step === index;
            return (
              <li key={meta.label} className="flex items-center">
                {index > 0 && (
                  <span
                    aria-hidden
                    className={`mx-3 h-px w-10 sm:w-16 ${
                      step >= index ? "bg-[var(--d-gold)]" : "bg-[var(--d-line-soft)]"
                    }`}
                  />
                )}
                <span
                  aria-current={isCurrent ? "step" : undefined}
                  className={`flex items-center gap-2.5 text-[10px] uppercase tracking-[0.25em] ${
                    reached ? "text-[var(--d-gold)]" : "text-[var(--d-ink-faint)]"
                  }`}
                >
                  <Icon aria-hidden className="h-3.5 w-3.5" strokeWidth={1.5} />
                  <span className="hidden sm:inline">{meta.label}</span>
                </span>
              </li>
            );
          })}
        </ol>

        <div className="mt-10 border border-[var(--d-line-soft)] bg-[var(--d-bg-soft)] px-6 py-10 sm:px-12">
          <AnimatePresence mode="wait" initial={false}>
            {step === 0 && (
              <motion.div key="guests" {...panelMotion}>
                <h3 className="[font-family:var(--demo-display)] text-center text-2xl italic text-[var(--d-ink)]">
                  {content.guestsTitle}
                </h3>
                <div className="mt-8 grid grid-cols-4 gap-3 sm:grid-cols-8">
                  {Array.from({ length: MAX_GUESTS }, (_, i) => i + 1).map((count) => (
                    <button
                      key={count}
                      type="button"
                      aria-pressed={guests === count}
                      onClick={() => setGuests(count)}
                      className={`[font-family:var(--demo-display)] flex aspect-square items-center justify-center border text-2xl transition-colors duration-300 ${
                        guests === count
                          ? "border-[var(--d-gold)] bg-[var(--d-gold)] text-[#0E0C08]"
                          : "border-[var(--d-line-soft)] text-[var(--d-ink)] hover:border-[var(--d-gold)] hover:text-[var(--d-gold-bright)]"
                      }`}
                    >
                      {count}
                    </button>
                  ))}
                </div>
                <p className="mt-6 text-center text-xs font-light leading-relaxed text-[var(--d-ink-faint)]">
                  {content.largerParty}
                </p>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="date" {...panelMotion}>
                <h3 className="[font-family:var(--demo-display)] text-center text-2xl italic text-[var(--d-ink)]">
                  {content.dateTitle}
                </h3>
                <div className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-4">
                  {evenings.map((evening) => (
                    <button
                      key={evening.index}
                      type="button"
                      disabled={evening.closed}
                      aria-pressed={dateIndex === evening.index}
                      onClick={() => {
                        setDateIndex(evening.index);
                        setSlotIndex(null);
                      }}
                      className={`flex flex-col items-center gap-1 border px-2 py-4 transition-colors duration-300 ${
                        evening.closed
                          ? "cursor-not-allowed border-transparent text-[var(--d-ink-faint)] opacity-40"
                          : dateIndex === evening.index
                            ? "border-[var(--d-gold)] bg-[var(--d-gold)] text-[#0E0C08]"
                            : "border-[var(--d-line-soft)] text-[var(--d-ink)] hover:border-[var(--d-gold)] hover:text-[var(--d-gold-bright)]"
                      }`}
                    >
                      <span className="text-[9px] uppercase tracking-[0.25em]">
                        {dayFormatter.format(evening.date)}
                      </span>
                      <span className="[font-family:var(--demo-display)] text-lg leading-none">
                        {dateFormatter.format(evening.date)}
                      </span>
                      {evening.closed && (
                        <span className="text-[8px] uppercase tracking-[0.2em]">
                          {content.closedLabel}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="time" {...panelMotion}>
                <h3 className="[font-family:var(--demo-display)] text-center text-2xl italic text-[var(--d-ink)]">
                  {content.timeTitle}
                </h3>
                <p className="mt-2 text-center text-[10px] uppercase tracking-[0.3em] text-[var(--d-ink-faint)]">
                  {content.seatingNote}
                </p>
                <div className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-6">
                  {TIME_SLOTS.map((slot, index) => {
                    const available = dateIndex === null || slotAvailable(dateIndex, index);
                    return (
                      <button
                        key={slot}
                        type="button"
                        disabled={!available}
                        aria-pressed={slotIndex === index}
                        aria-label={available ? slot : `${slot} — ${content.unavailableLabel}`}
                        onClick={() => setSlotIndex(index)}
                        className={`[font-family:var(--demo-display)] border px-2 py-3.5 text-lg transition-colors duration-300 ${
                          !available
                            ? "cursor-not-allowed border-transparent text-[var(--d-ink-faint)] line-through opacity-40"
                            : slotIndex === index
                              ? "border-[var(--d-gold)] bg-[var(--d-gold)] text-[#0E0C08]"
                              : "border-[var(--d-line-soft)] text-[var(--d-ink)] hover:border-[var(--d-gold)] hover:text-[var(--d-gold-bright)]"
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>

                {slotIndex !== null && chosenEvening && guests !== null && (
                  <div className="mt-10 border-t border-[var(--d-line-soft)] pt-7 text-center">
                    <p className="text-[10px] uppercase tracking-[0.35em] text-[var(--d-gold)]">
                      {content.summaryTitle}
                    </p>
                    <p className="[font-family:var(--demo-display)] mt-3 text-xl italic text-[var(--d-ink)]">
                      {content.summaryGuests} {guestsLine} —{" "}
                      {longDateFormatter.format(chosenEvening.date)} · {TIME_SLOTS[slotIndex]}
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            {step === 3 && guests !== null && chosenEvening && slotIndex !== null && (
              <motion.div key="confirmed" {...panelMotion} className="text-center">
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[var(--d-gold)]">
                  <Check aria-hidden className="h-6 w-6 text-[var(--d-gold)]" strokeWidth={1.5} />
                </span>
                <h3 className="[font-family:var(--demo-display)] mt-6 text-3xl italic text-[var(--d-ink)]">
                  {content.confirmedTitle}
                </h3>
                <p className="mx-auto mt-4 max-w-md text-sm font-light leading-relaxed text-[var(--d-ink-soft)]">
                  {content.confirmedBody}
                </p>

                <dl className="mx-auto mt-9 max-w-md divide-y divide-[var(--d-line-soft)] border-y border-[var(--d-line-soft)] text-left">
                  <div className="flex items-center justify-between gap-6 py-3.5">
                    <dt className="text-[10px] uppercase tracking-[0.3em] text-[var(--d-ink-faint)]">
                      {content.summaryGuests}
                    </dt>
                    <dd className="[font-family:var(--demo-display)] text-lg text-[var(--d-ink)]">
                      {guestsLine}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-6 py-3.5">
                    <dt className="text-[10px] uppercase tracking-[0.3em] text-[var(--d-ink-faint)]">
                      {content.summaryDate}
                    </dt>
                    <dd className="[font-family:var(--demo-display)] text-lg text-[var(--d-ink)]">
                      {longDateFormatter.format(chosenEvening.date)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-6 py-3.5">
                    <dt className="text-[10px] uppercase tracking-[0.3em] text-[var(--d-ink-faint)]">
                      {content.summaryTime}
                    </dt>
                    <dd className="[font-family:var(--demo-display)] text-lg text-[var(--d-ink)]">
                      {TIME_SLOTS[slotIndex]}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-6 py-3.5">
                    <dt className="text-[10px] uppercase tracking-[0.3em] text-[var(--d-ink-faint)]">
                      {content.confirmationLabel}
                    </dt>
                    <dd className="text-sm font-medium tracking-[0.2em] text-[var(--d-gold-bright)]">
                      {confirmationCode(guests, chosenEvening.index, slotIndex)}
                    </dd>
                  </div>
                </dl>

                <p className="mt-7 text-xs font-light italic text-[var(--d-ink-faint)]">
                  {content.dressCode}
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="mt-9 border border-[var(--d-line)] px-8 py-3 text-[10px] font-medium uppercase tracking-[0.3em] text-[var(--d-ink)] transition-colors duration-300 hover:border-[var(--d-gold)] hover:text-[var(--d-gold)]"
                >
                  {content.resetLabel}
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {step < 3 && (
            <div className="mt-10 flex items-center justify-between border-t border-[var(--d-line-soft)] pt-7">
              <button
                type="button"
                onClick={goBack}
                disabled={step === 0}
                className={`inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.3em] transition-colors duration-300 ${
                  step === 0
                    ? "cursor-not-allowed text-[var(--d-ink-faint)] opacity-40"
                    : "text-[var(--d-ink)] hover:text-[var(--d-gold)]"
                }`}
              >
                <ArrowLeft aria-hidden className="h-3.5 w-3.5" strokeWidth={1.5} />
                {content.backLabel}
              </button>
              <button
                type="button"
                onClick={goNext}
                disabled={!canContinue}
                className={`inline-flex items-center gap-2 border px-7 py-3 text-[10px] font-semibold uppercase tracking-[0.3em] transition-colors duration-300 ${
                  canContinue
                    ? "border-[var(--d-gold)] bg-[var(--d-gold)] text-[#0E0C08] hover:bg-transparent hover:text-[var(--d-gold)]"
                    : "cursor-not-allowed border-[var(--d-line-soft)] text-[var(--d-ink-faint)] opacity-50"
                }`}
              >
                {step === 2 ? content.confirmLabel : content.continueLabel}
                <ArrowRight aria-hidden className="h-3.5 w-3.5" strokeWidth={1.5} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
