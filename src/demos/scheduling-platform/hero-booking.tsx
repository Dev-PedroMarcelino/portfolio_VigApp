"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  CalendarCheck2,
  CalendarPlus,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Globe,
  Sparkles,
  Video,
} from "lucide-react";
import type { BookingContent, EventTypeContent, HeroContent } from "./content";
import { initialsOf } from "./ui";

/* ------------------------------------------------------------------ */
/* Deterministic calendar math (fixed reference date: SSR === CSR)     */
/* ------------------------------------------------------------------ */

/** Fixed "today" so the widget renders identically on server and client. */
const TODAY = { y: 2026, m: 6, d: 16 };
const MAX_MONTH_OFFSET = 2;
const BASE_SLOTS = [
  "09:00", "09:30", "10:00", "10:45", "11:15", "13:00",
  "13:45", "14:30", "15:15", "16:00", "16:45", "17:30",
];

interface DayRef {
  y: number;
  m: number;
  d: number;
}

function monthAt(offset: number): { y: number; m: number } {
  const total = TODAY.m + offset;
  return { y: TODAY.y + Math.floor(total / 12), m: total % 12 };
}

function daysInMonth(y: number, m: number) {
  return new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
}

/** 0 = Sunday, matching content.weekdaysLong. */
function weekdayOf(y: number, m: number, d: number) {
  return new Date(Date.UTC(y, m, d)).getUTCDay();
}

function isPast(y: number, m: number, d: number) {
  if (y !== TODAY.y) return y < TODAY.y;
  if (m !== TODAY.m) return m < TODAY.m;
  return d < TODAY.d;
}

function isAvailable(y: number, m: number, d: number) {
  if (isPast(y, m, d)) return false;
  const dow = weekdayOf(y, m, d);
  if (dow === 0 || dow === 6) return false;
  // Pseudo-random "fully booked" days, derived from the date itself.
  return (d * 5 + m * 3) % 17 !== 0;
}

/** Slot list varies per day, deterministically. */
function slotsFor(d: number) {
  return BASE_SLOTS.filter((_, i) => (d + i) % 3 !== 0);
}

function formatDay(content: BookingContent, day: DayRef) {
  return content.dateTemplate
    .replace("{weekday}", content.weekdaysLong[weekdayOf(day.y, day.m, day.d)])
    .replace("{month}", content.months[day.m])
    .replace("{day}", String(day.d));
}

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export function HeroBooking({
  hero,
  booking,
}: {
  hero: HeroContent;
  booking: BookingContent;
}) {
  const reduce = useReducedMotion() ?? false;

  return (
    <section className="relative overflow-hidden px-5 pb-20 pt-12 md:pb-28 md:pt-16">
      {/* Friendly geometry backdrop */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full"
          style={{ background: "radial-gradient(closest-side, rgba(13,148,136,0.14), transparent)" }}
        />
        <div
          className="absolute -left-24 bottom-0 h-[380px] w-[380px] rounded-full"
          style={{ background: "radial-gradient(closest-side, rgba(245,158,11,0.10), transparent)" }}
        />
        <div
          className="absolute right-[8%] top-16 hidden h-56 w-72 opacity-60 lg:block"
          style={{
            backgroundImage: "radial-gradient(rgba(13,148,136,0.22) 1.2px, transparent 1.2px)",
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1fr_minmax(0,460px)]">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-[var(--d-line)] bg-[var(--d-card)] px-4 py-1.5 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-[var(--d-accent-deep)]">
            <Sparkles className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden />
            {hero.kicker}
          </p>
          <h1 className="mt-6 [font-family:var(--demo-display)] text-[2.6rem] font-extrabold leading-[1.05] tracking-tight md:text-6xl">
            {hero.titleTop}
            <br />
            <span className="text-[var(--d-accent)]">{hero.titleAccent}</span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-[1.8] text-[var(--d-ink-soft)] md:text-lg">
            {hero.sub}
          </p>
          <p className="mt-5 flex items-center gap-2 text-sm font-semibold text-[var(--d-accent-deep)]">
            <Check className="h-4 w-4" strokeWidth={2.6} aria-hidden />
            {hero.trustNote}
          </p>
          <dl className="mt-10 grid max-w-md grid-cols-3 gap-6">
            {hero.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="[font-family:var(--demo-display)] text-2xl font-extrabold tracking-tight text-[var(--d-ink)] md:text-3xl">
                  {stat.value}
                </dd>
                <dd className="mt-1 text-[0.72rem] leading-snug text-[var(--d-ink-soft)]">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div id="book" className="relative scroll-mt-24">
          {/* Floating chips around the widget */}
          <motion.div
            animate={reduce ? undefined : { y: [0, -9, 0] }}
            transition={reduce ? undefined : { duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-4 -top-5 z-10 hidden items-center gap-2 rounded-2xl border border-[var(--d-line)] bg-[var(--d-card)] px-3.5 py-2 shadow-[0_14px_30px_-18px_rgba(4,47,46,0.4)] sm:flex"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--d-mint)] text-[var(--d-accent-deep)]">
              <Check className="h-3.5 w-3.5" strokeWidth={2.8} aria-hidden />
            </span>
            <span className="text-xs font-bold text-[var(--d-ink)]">
              {hero.chips.booked} <span className="text-[var(--d-ink-soft)]">09:30</span>
            </span>
          </motion.div>
          <motion.div
            animate={reduce ? undefined : { y: [0, 8, 0] }}
            transition={reduce ? undefined : { duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-5 -right-3 z-10 hidden items-center gap-2 rounded-2xl border border-[var(--d-line)] bg-[var(--d-card)] px-3.5 py-2 shadow-[0_14px_30px_-18px_rgba(4,47,46,0.4)] sm:flex"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--d-accent)] text-white">
              <CalendarCheck2 className="h-3.5 w-3.5" strokeWidth={2.4} aria-hidden />
            </span>
            <span className="text-xs font-bold text-[var(--d-ink)]">{hero.chips.synced}</span>
          </motion.div>

          <BookingWidget content={booking} />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Booking widget: event -> day -> time -> confirm -> booked           */
/* ------------------------------------------------------------------ */

type Step = 0 | 1 | 2 | 3 | 4;

function BookingWidget({ content }: { content: BookingContent }) {
  const reduce = useReducedMotion() ?? false;
  const [step, setStep] = useState<Step>(0);
  const [eventType, setEventType] = useState<EventTypeContent | null>(null);
  const [monthOffset, setMonthOffset] = useState(0);
  const [day, setDay] = useState<DayRef | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

  const { y, m } = monthAt(monthOffset);
  const leading = (weekdayOf(y, m, 1) + 6) % 7; // Monday-first grid
  const totalDays = daysInMonth(y, m);

  const goToStep = (target: Step) => {
    if (target <= 0) {
      setDay(null);
      setSlot(null);
    } else if (target === 1) {
      setSlot(null);
    }
    setStep(target);
  };

  const reset = () => {
    setEventType(null);
    setMonthOffset(0);
    setDay(null);
    setSlot(null);
    setAdded(false);
    setStep(0);
  };

  const refCode =
    day && slot ? `SLT-${pad2(day.m + 1)}${pad2(day.d)}-${slot.replace(":", "")}` : "";

  const fade = {
    initial: reduce ? undefined : { opacity: 0, x: 18 },
    animate: { opacity: 1, x: 0 },
    exit: reduce ? undefined : { opacity: 0, x: -18 },
    transition: { duration: 0.22, ease: "easeOut" as const },
  };

  const stepperPos = Math.min(step, 3);

  return (
    <div className="relative rounded-[1.75rem] border border-[var(--d-line)] bg-[var(--d-card)] p-6 shadow-[0_36px_70px_-34px_rgba(4,47,46,0.42)] md:p-7">
      <p className="absolute -top-3.5 left-6 inline-flex items-center gap-1.5 rounded-full bg-[var(--d-accent)] px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-white">
        <span className="h-1.5 w-1.5 rounded-full bg-white" aria-hidden />
        {content.widgetBadge}
      </p>

      {/* Host row */}
      <div className="flex items-center gap-3 border-b border-[var(--d-line)] pb-5">
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
          style={{ background: "linear-gradient(135deg, #0D9488, #0F766E)" }}
          aria-hidden
        >
          {initialsOf(content.hostName)}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-[var(--d-ink)]">{content.hostName}</p>
          <p className="truncate text-xs text-[var(--d-ink-soft)]">{content.hostRole}</p>
        </div>
      </div>

      {/* Stepper */}
      <ol className="mt-5 flex items-center gap-2">
        {content.stepLabels.map((label, i) => {
          const done = i < stepperPos;
          const active = i === stepperPos && step < 4;
          const clickable = done && step < 4;
          return (
            <li key={label} className="flex flex-1 items-center gap-2">
              <button
                type="button"
                disabled={!clickable}
                aria-current={active ? "step" : undefined}
                onClick={() => goToStep(i as Step)}
                className={`flex w-full items-center justify-center gap-1.5 rounded-full px-2 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.1em] transition-colors ${
                  active
                    ? "bg-[var(--d-accent)] text-white"
                    : done
                      ? "bg-[var(--d-mint)] text-[var(--d-accent-deep)] hover:bg-[var(--d-line)]"
                      : "bg-[#EDF7F4] text-[var(--d-ink-soft)]"
                } ${clickable ? "cursor-pointer" : ""}`}
              >
                {done || step === 4 ? (
                  <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                ) : (
                  <span aria-hidden>{i + 1}</span>
                )}
                {label}
              </button>
            </li>
          );
        })}
      </ol>

      {/* Step content */}
      <div className="mt-5 min-h-[380px]" aria-live="polite">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="events" {...fade}>
              <h2 className="[font-family:var(--demo-display)] text-lg font-bold tracking-tight">
                {content.chooseEventTitle}
              </h2>
              <div className="mt-4 space-y-3">
                {content.eventTypes.map((event) => (
                  <button
                    key={event.id}
                    type="button"
                    onClick={() => {
                      setEventType(event);
                      setStep(1);
                    }}
                    className="group w-full rounded-2xl border-2 border-[var(--d-line)] p-4 text-left transition-all hover:-translate-y-0.5 hover:border-[var(--d-accent)] hover:shadow-[0_16px_30px_-20px_rgba(13,148,136,0.5)]"
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span className="text-sm font-bold text-[var(--d-ink)]">{event.name}</span>
                      <span className="flex shrink-0 items-center gap-1 rounded-full bg-[var(--d-mint)] px-2.5 py-1 text-[0.66rem] font-bold text-[var(--d-accent-deep)]">
                        <Clock className="h-3 w-3" strokeWidth={2.4} aria-hidden />
                        {event.durationLabel}
                      </span>
                    </span>
                    <span className="mt-1.5 block text-xs leading-relaxed text-[var(--d-ink-soft)]">
                      {event.description}
                    </span>
                    <span className="mt-2.5 flex items-center gap-1.5 text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-[var(--d-accent-deep)]">
                      <Video className="h-3 w-3" strokeWidth={2.2} aria-hidden />
                      {event.channel}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="calendar" {...fade}>
              <div className="flex items-center justify-between gap-3">
                <h2 className="[font-family:var(--demo-display)] text-lg font-bold tracking-tight">
                  {content.chooseDayTitle}
                </h2>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    aria-label={content.prevMonth}
                    disabled={monthOffset === 0}
                    onClick={() => setMonthOffset((v) => Math.max(0, v - 1))}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--d-line)] text-[var(--d-ink)] transition-colors hover:bg-[var(--d-mint)] disabled:opacity-35 disabled:hover:bg-transparent"
                  >
                    <ChevronLeft className="h-4 w-4" strokeWidth={2.4} />
                  </button>
                  <span className="min-w-[8.5rem] text-center text-sm font-bold capitalize text-[var(--d-ink)]">
                    {content.months[m]} {y}
                  </span>
                  <button
                    type="button"
                    aria-label={content.nextMonth}
                    disabled={monthOffset === MAX_MONTH_OFFSET}
                    onClick={() => setMonthOffset((v) => Math.min(MAX_MONTH_OFFSET, v + 1))}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--d-line)] text-[var(--d-ink)] transition-colors hover:bg-[var(--d-mint)] disabled:opacity-35 disabled:hover:bg-transparent"
                  >
                    <ChevronRight className="h-4 w-4" strokeWidth={2.4} />
                  </button>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-7 gap-1 text-center">
                {content.weekdaysShort.map((wd) => (
                  <span
                    key={wd}
                    className="pb-1 text-[0.64rem] font-bold uppercase tracking-[0.08em] text-[var(--d-ink-soft)]"
                  >
                    {wd}
                  </span>
                ))}
                {Array.from({ length: leading }, (_, i) => (
                  <span key={`blank-${i}`} aria-hidden />
                ))}
                {Array.from({ length: totalDays }, (_, i) => {
                  const d = i + 1;
                  const available = isAvailable(y, m, d);
                  const selected = !!day && day.d === d && day.m === m && day.y === y;
                  const isToday = y === TODAY.y && m === TODAY.m && d === TODAY.d;
                  return (
                    <button
                      key={d}
                      type="button"
                      disabled={!available}
                      aria-pressed={selected}
                      aria-label={`${d} ${content.months[m]}`}
                      onClick={() => {
                        setDay({ y, m, d });
                        setSlot(null);
                        setStep(2);
                      }}
                      className={`mx-auto flex h-9 w-9 items-center justify-center rounded-xl text-sm font-semibold transition-all ${
                        selected
                          ? "bg-[var(--d-accent)] text-white shadow-[0_10px_20px_-10px_rgba(13,148,136,0.7)]"
                          : available
                            ? "bg-[var(--d-mint)] text-[var(--d-accent-deep)] hover:scale-110 hover:bg-[var(--d-accent)] hover:text-white"
                            : "text-[var(--d-ink-soft)] opacity-35"
                      } ${isToday && !selected ? "ring-2 ring-[var(--d-pop)]" : ""}`}
                    >
                      {d}
                    </button>
                  );
                })}
              </div>

              <p className="mt-4 text-[0.68rem] text-[var(--d-ink-soft)]">{content.unavailableHint}</p>
              <BackButton label={content.back} onClick={() => goToStep(0)} />
            </motion.div>
          )}

          {step === 2 && day && (
            <motion.div key="slots" {...fade}>
              <h2 className="[font-family:var(--demo-display)] text-lg font-bold tracking-tight">
                {content.chooseTimeTitle}
              </h2>
              <p className="mt-1 text-xs font-semibold capitalize text-[var(--d-accent-deep)]">
                {formatDay(content, day)}
                {eventType ? ` · ${eventType.durationLabel}` : ""}
              </p>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {slotsFor(day.d).map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => {
                      setSlot(time);
                      setStep(3);
                    }}
                    className="rounded-xl border-2 border-[var(--d-line)] py-2.5 text-sm font-bold text-[var(--d-accent-deep)] transition-all hover:-translate-y-0.5 hover:border-[var(--d-accent)] hover:bg-[var(--d-mint)]"
                  >
                    {time}
                  </button>
                ))}
              </div>
              <BackButton label={content.back} onClick={() => goToStep(1)} />
            </motion.div>
          )}

          {step === 3 && eventType && day && slot && (
            <motion.div key="review" {...fade}>
              <h2 className="[font-family:var(--demo-display)] text-lg font-bold tracking-tight">
                {content.confirmTitle}
              </h2>
              <dl className="mt-4 space-y-3 rounded-2xl bg-[#EDF7F4] p-5 text-sm">
                <SummaryRow label={content.summaryEvent} value={eventType.name} />
                <SummaryRow label={content.summaryDate} value={formatDay(content, day)} capitalize />
                <SummaryRow label={content.summaryTime} value={`${slot} · ${eventType.durationLabel}`} />
                <SummaryRow label={content.summaryHost} value={content.hostName} />
              </dl>
              <p className="mt-3 flex items-center gap-1.5 text-[0.68rem] text-[var(--d-ink-soft)]">
                <Globe className="h-3 w-3" strokeWidth={2.2} aria-hidden />
                {content.timezone}
              </p>
              <button
                type="button"
                onClick={() => setStep(4)}
                className="mt-5 w-full rounded-full bg-[var(--d-accent)] py-3.5 text-sm font-bold text-white transition-all hover:scale-[1.02] hover:bg-[var(--d-accent-deep)]"
              >
                {content.confirmCta}
              </button>
              <BackButton label={content.back} onClick={() => goToStep(2)} />
            </motion.div>
          )}

          {step === 4 && eventType && day && slot && (
            <motion.div
              key="success"
              initial={reduce ? undefined : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex flex-col items-center pt-2 text-center"
            >
              <motion.span
                initial={reduce ? undefined : { scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 16, delay: reduce ? 0 : 0.1 }}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--d-accent)] text-white shadow-[0_18px_36px_-14px_rgba(13,148,136,0.7)]"
              >
                <Check className="h-7 w-7" strokeWidth={3} aria-hidden />
              </motion.span>
              <h2 className="mt-4 [font-family:var(--demo-display)] text-2xl font-extrabold tracking-tight">
                {content.successTitle}
              </h2>
              <p className="mt-2 max-w-xs text-xs leading-relaxed text-[var(--d-ink-soft)]">
                {content.successBody}
              </p>
              <div className="mt-4 w-full rounded-2xl border border-[var(--d-line)] bg-[#EDF7F4] p-4 text-left text-sm">
                <p className="font-bold text-[var(--d-ink)]">{eventType.name}</p>
                <p className="mt-1 text-xs capitalize text-[var(--d-ink-soft)]">
                  {formatDay(content, day)} · {slot} · {eventType.durationLabel}
                </p>
                <p className="mt-3 border-t border-[var(--d-line)] pt-3 text-[0.66rem] uppercase tracking-[0.14em] text-[var(--d-ink-soft)]">
                  {content.refLabel}
                </p>
                <p className="font-mono text-sm font-bold text-[var(--d-accent-deep)]">{refCode}</p>
              </div>
              <button
                type="button"
                aria-pressed={added}
                onClick={() => setAdded((v) => !v)}
                className={`mt-4 flex w-full items-center justify-center gap-2 rounded-full border-2 py-3 text-sm font-bold transition-colors ${
                  added
                    ? "border-[var(--d-accent)] bg-[var(--d-mint)] text-[var(--d-accent-deep)]"
                    : "border-[var(--d-line)] text-[var(--d-ink)] hover:border-[var(--d-accent)]"
                }`}
              >
                {added ? (
                  <Check className="h-4 w-4" strokeWidth={2.6} aria-hidden />
                ) : (
                  <CalendarPlus className="h-4 w-4" strokeWidth={2.2} aria-hidden />
                )}
                {added ? content.addedToCalendar : content.addToCalendar}
              </button>
              <button
                type="button"
                onClick={reset}
                className="mt-3 text-xs font-bold text-[var(--d-accent-deep)] underline-offset-4 hover:underline"
              >
                {content.bookAnother}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {step < 3 && (
        <p className="mt-4 flex items-center gap-1.5 border-t border-[var(--d-line)] pt-4 text-[0.68rem] text-[var(--d-ink-soft)]">
          <Globe className="h-3 w-3" strokeWidth={2.2} aria-hidden />
          {content.timezone}
        </p>
      )}
    </div>
  );
}

function SummaryRow({
  label,
  value,
  capitalize = false,
}: {
  label: string;
  value: string;
  capitalize?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="shrink-0 text-[0.66rem] font-bold uppercase tracking-[0.14em] text-[var(--d-ink-soft)]">
        {label}
      </dt>
      <dd className={`text-right font-semibold text-[var(--d-ink)] ${capitalize ? "capitalize" : ""}`}>
        {value}
      </dd>
    </div>
  );
}

function BackButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-4 flex items-center gap-1.5 text-xs font-bold text-[var(--d-ink-soft)] transition-colors hover:text-[var(--d-accent-deep)]"
    >
      <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2.4} aria-hidden />
      {label}
    </button>
  );
}
