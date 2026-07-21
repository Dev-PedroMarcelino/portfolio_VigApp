"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Clock3, Scissors, Sparkles, UserRound } from "lucide-react";
import { type EclatContent, formatDuration } from "./content";

const EASE_SLOW: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Fixed epoch so SSR and CSR render the same calendar: Tuesday, 4 Aug 2026. */
const FIRST_DAY_UTC = Date.UTC(2026, 7, 4);
const DAY_MS = 86_400_000;
const DATE_COUNT = 12;
const TIME_SLOTS = ["09:30", "11:00", "13:00", "14:30", "16:00", "18:30"];

interface DayOption {
  index: number;
  date: Date;
  closed: boolean;
}

function buildDays(): DayOption[] {
  return Array.from({ length: DATE_COUNT }, (_, index) => {
    const date = new Date(FIRST_DAY_UTC + index * DAY_MS);
    const weekday = date.getUTCDay();
    // Closed Sundays and Mondays.
    return { index, date, closed: weekday === 0 || weekday === 1 };
  });
}

/** Deterministic availability derived from indexes — never Math.random. */
function slotAvailable(dayIndex: number, slotIndex: number, stylistOffset: number): boolean {
  return (dayIndex * 3 + slotIndex * 5 + stylistOffset * 2) % 7 !== 0;
}

function reference(serviceIndex: number, stylistOffset: number, dayIndex: number, slotIndex: number): string {
  const seed = 1000 + ((serviceIndex * 53 + stylistOffset * 71 + dayIndex * 89 + slotIndex * 13) % 9000);
  return `EC-${seed}`;
}

type Step = 0 | 1 | 2 | 3;

export function Booking({
  content,
  common,
  format,
  intlLocale,
}: {
  content: EclatContent["booking"];
  common: EclatContent["common"];
  format: (value: number) => string;
  intlLocale: string;
}) {
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState<Step>(0);
  const [serviceIndex, setServiceIndex] = useState<number | null>(null);
  const [stylistIndex, setStylistIndex] = useState<number | null>(null);
  const [dayIndex, setDayIndex] = useState<number | null>(null);
  const [slotIndex, setSlotIndex] = useState<number | null>(null);

  const days = useMemo(buildDays, []);
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
    { label: content.steps.service, icon: Sparkles },
    { label: content.steps.stylist, icon: UserRound },
    { label: content.steps.time, icon: Clock3 },
  ];

  // stylistIndex === content.stylists.length represents "First available".
  const anyStylistIndex = content.stylists.length;
  const stylistOffset = stylistIndex === null ? 0 : stylistIndex + 1;

  const canContinue =
    (step === 0 && serviceIndex !== null) ||
    (step === 1 && stylistIndex !== null) ||
    (step === 2 && slotIndex !== null && dayIndex !== null);

  const goBack = () => setStep((current) => (current > 0 ? ((current - 1) as Step) : current));
  const goNext = () => {
    if (!canContinue) return;
    setStep((current) => (current < 3 ? ((current + 1) as Step) : current));
  };

  const reset = () => {
    setServiceIndex(null);
    setStylistIndex(null);
    setDayIndex(null);
    setSlotIndex(null);
    setStep(0);
  };

  const chosenService = serviceIndex !== null ? content.services[serviceIndex] : null;
  const chosenDay = dayIndex !== null ? days[dayIndex] : null;
  const stylistName =
    stylistIndex === null
      ? ""
      : stylistIndex === anyStylistIndex
        ? content.anyStylistName
        : content.stylists[stylistIndex].name;

  const panelMotion = {
    initial: reduceMotion ? undefined : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    exit: reduceMotion ? undefined : { opacity: 0, y: -12 },
    transition: { duration: 0.5, ease: EASE_SLOW },
  };

  return (
    <section id="booking" className="relative bg-[var(--d-bg-blush)] py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.5em] text-[var(--d-accent)]">
            {content.eyebrow}
          </p>
          <h2 className="mt-5 [font-family:var(--demo-display)] text-4xl font-medium leading-tight text-[var(--d-plum)] sm:text-5xl">
            {content.title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-sm font-light leading-relaxed text-[var(--d-ink-soft)]">
            {content.intro}
          </p>
        </div>

        <ol className="mt-12 flex items-center justify-center" aria-label={content.eyebrow}>
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
                      step >= index ? "bg-[var(--d-accent)]" : "bg-[var(--d-line-soft)]"
                    }`}
                  />
                )}
                <span
                  aria-current={isCurrent ? "step" : undefined}
                  className={`flex items-center gap-2.5 text-[10px] uppercase tracking-[0.24em] ${
                    reached ? "text-[var(--d-accent)]" : "text-[var(--d-ink-faint)]"
                  }`}
                >
                  <Icon aria-hidden className="h-3.5 w-3.5" strokeWidth={1.6} />
                  <span className="hidden sm:inline">{meta.label}</span>
                </span>
              </li>
            );
          })}
        </ol>

        <div className="mt-10 border border-[var(--d-line-soft)] bg-[var(--d-bg-soft)] px-6 py-10 sm:px-10">
          <AnimatePresence mode="wait" initial={false}>
            {step === 0 && (
              <motion.div key="service" {...panelMotion}>
                <h3 className="[font-family:var(--demo-display)] text-center text-2xl italic text-[var(--d-plum)]">
                  {content.serviceTitle}
                </h3>
                <ul className="mt-8 flex flex-col gap-3">
                  {content.services.map((service, index) => {
                    const selected = serviceIndex === index;
                    return (
                      <li key={service.id}>
                        <button
                          type="button"
                          aria-pressed={selected}
                          onClick={() => setServiceIndex(index)}
                          className={`flex w-full items-center justify-between gap-5 border px-5 py-4 text-left transition-colors duration-300 ${
                            selected
                              ? "border-[var(--d-accent)] bg-[var(--d-bg-blush)]"
                              : "border-[var(--d-line-soft)] hover:border-[var(--d-line)]"
                          }`}
                        >
                          <span>
                            <span className="[font-family:var(--demo-display)] block text-xl text-[var(--d-plum)]">
                              {service.name}
                            </span>
                            <span className="mt-0.5 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-[var(--d-ink-faint)]">
                              <Clock3 aria-hidden className="h-3 w-3" strokeWidth={1.6} />
                              {formatDuration(service.durationMin, common.minShort)}
                            </span>
                          </span>
                          <span className="[font-family:var(--demo-display)] shrink-0 text-xl text-[var(--d-accent)]">
                            {format(service.price)}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="stylist" {...panelMotion}>
                <h3 className="[font-family:var(--demo-display)] text-center text-2xl italic text-[var(--d-plum)]">
                  {content.stylistTitle}
                </h3>
                <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {content.stylists.map((stylist, index) => {
                    const selected = stylistIndex === index;
                    return (
                      <li key={stylist.id}>
                        <button
                          type="button"
                          aria-pressed={selected}
                          onClick={() => setStylistIndex(index)}
                          className={`flex h-full w-full flex-col gap-1 border px-5 py-5 text-left transition-colors duration-300 ${
                            selected
                              ? "border-[var(--d-accent)] bg-[var(--d-bg-blush)]"
                              : "border-[var(--d-line-soft)] hover:border-[var(--d-line)]"
                          }`}
                        >
                          <span className="inline-flex items-center gap-2">
                            <Scissors
                              aria-hidden
                              className="h-3.5 w-3.5 text-[var(--d-accent)]"
                              strokeWidth={1.6}
                            />
                            <span className="[font-family:var(--demo-display)] text-xl text-[var(--d-plum)]">
                              {stylist.name}
                            </span>
                          </span>
                          <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--d-ink-faint)]">
                            {stylist.role}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                  <li className="sm:col-span-2">
                    <button
                      type="button"
                      aria-pressed={stylistIndex === anyStylistIndex}
                      onClick={() => setStylistIndex(anyStylistIndex)}
                      className={`flex w-full flex-col gap-1 border px-5 py-5 text-left transition-colors duration-300 ${
                        stylistIndex === anyStylistIndex
                          ? "border-[var(--d-accent)] bg-[var(--d-bg-blush)]"
                          : "border-dashed border-[var(--d-line)] hover:border-solid"
                      }`}
                    >
                      <span className="[font-family:var(--demo-display)] text-xl italic text-[var(--d-accent)]">
                        {content.anyStylistName}
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--d-ink-faint)]">
                        {content.anyStylistRole}
                      </span>
                    </button>
                  </li>
                </ul>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="time" {...panelMotion}>
                <h3 className="[font-family:var(--demo-display)] text-center text-2xl italic text-[var(--d-plum)]">
                  {content.dateTitle}
                </h3>
                <div className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-4">
                  {days.map((day) => (
                    <button
                      key={day.index}
                      type="button"
                      disabled={day.closed}
                      aria-pressed={dayIndex === day.index}
                      onClick={() => {
                        setDayIndex(day.index);
                        setSlotIndex(null);
                      }}
                      className={`flex flex-col items-center gap-1 border px-2 py-4 transition-colors duration-300 ${
                        day.closed
                          ? "cursor-not-allowed border-transparent text-[var(--d-ink-faint)] opacity-40"
                          : dayIndex === day.index
                            ? "border-[var(--d-accent)] bg-[var(--d-accent)] text-[var(--d-on-plum)]"
                            : "border-[var(--d-line-soft)] text-[var(--d-ink)] hover:border-[var(--d-accent)] hover:text-[var(--d-accent)]"
                      }`}
                    >
                      <span className="text-[9px] uppercase tracking-[0.22em]">
                        {dayFormatter.format(day.date)}
                      </span>
                      <span className="[font-family:var(--demo-display)] text-lg leading-none">
                        {dateFormatter.format(day.date)}
                      </span>
                      {day.closed && (
                        <span className="text-[8px] uppercase tracking-[0.18em]">
                          {content.closedLabel}
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                <h3 className="mt-10 [font-family:var(--demo-display)] text-center text-2xl italic text-[var(--d-plum)]">
                  {content.timeTitle}
                </h3>
                <p className="mt-2 text-center text-[10px] uppercase tracking-[0.26em] text-[var(--d-ink-faint)]">
                  {content.seatingNote}
                </p>
                <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-6">
                  {TIME_SLOTS.map((slot, index) => {
                    const available =
                      dayIndex === null || slotAvailable(dayIndex, index, stylistOffset);
                    const disabled = dayIndex === null || !available;
                    return (
                      <button
                        key={slot}
                        type="button"
                        disabled={disabled}
                        aria-pressed={slotIndex === index}
                        aria-label={available ? slot : `${slot} — ${content.unavailableLabel}`}
                        onClick={() => setSlotIndex(index)}
                        className={`[font-family:var(--demo-display)] border px-2 py-3.5 text-lg transition-colors duration-300 ${
                          disabled
                            ? "cursor-not-allowed border-transparent text-[var(--d-ink-faint)] line-through opacity-40"
                            : slotIndex === index
                              ? "border-[var(--d-accent)] bg-[var(--d-accent)] text-[var(--d-on-plum)]"
                              : "border-[var(--d-line-soft)] text-[var(--d-ink)] hover:border-[var(--d-accent)] hover:text-[var(--d-accent)]"
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>

                {slotIndex !== null && chosenDay && chosenService && (
                  <div className="mt-9 border-t border-[var(--d-line-soft)] pt-6 text-center">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--d-accent)]">
                      {content.summaryTitle}
                    </p>
                    <p className="mt-3 [font-family:var(--demo-display)] text-xl italic text-[var(--d-plum)]">
                      {chosenService.name} · {stylistName}
                    </p>
                    <p className="mt-1 text-sm text-[var(--d-ink-soft)]">
                      {longDateFormatter.format(chosenDay.date)} · {TIME_SLOTS[slotIndex]}
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            {step === 3 &&
              serviceIndex !== null &&
              chosenService &&
              chosenDay &&
              slotIndex !== null && (
                <motion.div key="confirmed" {...panelMotion} className="text-center">
                  <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[var(--d-accent)]">
                    <Check aria-hidden className="h-6 w-6 text-[var(--d-accent)]" strokeWidth={1.6} />
                  </span>
                  <h3 className="mt-6 [font-family:var(--demo-display)] text-3xl italic text-[var(--d-plum)]">
                    {content.confirmedTitle}
                  </h3>
                  <p className="mx-auto mt-4 max-w-md text-sm font-light leading-relaxed text-[var(--d-ink-soft)]">
                    {content.confirmedBody}
                  </p>

                  <dl className="mx-auto mt-9 max-w-md divide-y divide-[var(--d-line-soft)] border-y border-[var(--d-line-soft)] text-left">
                    <div className="flex items-center justify-between gap-6 py-3.5">
                      <dt className="text-[10px] uppercase tracking-[0.28em] text-[var(--d-ink-faint)]">
                        {content.summaryService}
                      </dt>
                      <dd className="[font-family:var(--demo-display)] text-lg text-[var(--d-plum)]">
                        {chosenService.name}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between gap-6 py-3.5">
                      <dt className="text-[10px] uppercase tracking-[0.28em] text-[var(--d-ink-faint)]">
                        {content.summaryStylist}
                      </dt>
                      <dd className="[font-family:var(--demo-display)] text-lg text-[var(--d-plum)]">
                        {stylistName}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between gap-6 py-3.5">
                      <dt className="text-[10px] uppercase tracking-[0.28em] text-[var(--d-ink-faint)]">
                        {content.summaryDate}
                      </dt>
                      <dd className="[font-family:var(--demo-display)] text-lg text-[var(--d-plum)]">
                        {longDateFormatter.format(chosenDay.date)}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between gap-6 py-3.5">
                      <dt className="text-[10px] uppercase tracking-[0.28em] text-[var(--d-ink-faint)]">
                        {content.summaryTime}
                      </dt>
                      <dd className="[font-family:var(--demo-display)] text-lg text-[var(--d-plum)]">
                        {TIME_SLOTS[slotIndex]}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between gap-6 py-3.5">
                      <dt className="text-[10px] uppercase tracking-[0.28em] text-[var(--d-ink-faint)]">
                        {content.summaryTotal}
                      </dt>
                      <dd className="[font-family:var(--demo-display)] text-lg text-[var(--d-accent)]">
                        {format(chosenService.price)}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between gap-6 py-3.5">
                      <dt className="text-[10px] uppercase tracking-[0.28em] text-[var(--d-ink-faint)]">
                        {content.confirmationLabel}
                      </dt>
                      <dd className="text-sm font-medium tracking-[0.2em] text-[var(--d-accent-deep)]">
                        {reference(serviceIndex, stylistOffset, chosenDay.index, slotIndex)}
                      </dd>
                    </div>
                  </dl>

                  <button
                    type="button"
                    onClick={reset}
                    className="mt-9 border border-[var(--d-line)] px-8 py-3 text-[10px] font-medium uppercase tracking-[0.28em] text-[var(--d-ink)] transition-colors duration-300 hover:border-[var(--d-accent)] hover:text-[var(--d-accent)]"
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
                className={`inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.28em] transition-colors duration-300 ${
                  step === 0
                    ? "cursor-not-allowed text-[var(--d-ink-faint)] opacity-40"
                    : "text-[var(--d-ink)] hover:text-[var(--d-accent)]"
                }`}
              >
                <ArrowLeft aria-hidden className="h-3.5 w-3.5" strokeWidth={1.6} />
                {content.backLabel}
              </button>
              <button
                type="button"
                onClick={goNext}
                disabled={!canContinue}
                className={`inline-flex items-center gap-2 border px-7 py-3 text-[10px] font-semibold uppercase tracking-[0.28em] transition-colors duration-300 ${
                  canContinue
                    ? "border-[var(--d-accent)] bg-[var(--d-accent)] text-[var(--d-on-plum)] hover:bg-transparent hover:text-[var(--d-accent)]"
                    : "cursor-not-allowed border-[var(--d-line-soft)] text-[var(--d-ink-faint)] opacity-50"
                }`}
              >
                {step === 2 ? content.confirmLabel : content.continueLabel}
                <ArrowRight aria-hidden className="h-3.5 w-3.5" strokeWidth={1.6} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
