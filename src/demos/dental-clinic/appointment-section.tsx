"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CalendarCheck, CheckCircle2, Clock3, Sun, Sunset } from "lucide-react";
import type { AppointmentContent } from "./content";
import { FloatingBlob, Section, SectionLabel } from "./ui";

/**
 * Deterministic availability: no randomness so SSR and CSR always agree.
 * Saturday afternoons past the first slot are closed (the clinic shuts early).
 */
function isBooked(dayIndex: number, slotIndex: number) {
  if (dayIndex === 5 && slotIndex >= 4) return true;
  return (dayIndex * 7 + slotIndex * 3 + 5) % 4 === 0;
}

export function AppointmentSection({ content }: { content: AppointmentContent }) {
  const [typeId, setTypeId] = useState(content.types[0].id);
  const [dayIndex, setDayIndex] = useState<number | null>(null);
  const [slotIndex, setSlotIndex] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const reduce = useReducedMotion();

  const allSlots = [...content.morningSlots, ...content.afternoonSlots];
  const morningCount = content.morningSlots.length;
  const activeType = content.types.find((t) => t.id === typeId) ?? content.types[0];
  const ready = dayIndex !== null && slotIndex !== null;
  const bookingCode =
    dayIndex !== null && slotIndex !== null ? `LD-${2431 + dayIndex * 61 + slotIndex * 7}` : "";

  const pickDay = (index: number) => {
    setDayIndex(index);
    setSlotIndex(null);
  };

  const reset = () => {
    setConfirmed(false);
    setDayIndex(null);
    setSlotIndex(null);
  };

  const slotButton = (label: string, globalIndex: number) => {
    const booked = dayIndex === null || isBooked(dayIndex, globalIndex);
    const selected = slotIndex === globalIndex;
    return (
      <button
        key={globalIndex}
        type="button"
        disabled={booked}
        aria-pressed={selected}
        onClick={() => setSlotIndex(globalIndex)}
        className={`rounded-2xl border px-3 py-2.5 text-sm font-semibold transition-all ${
          selected
            ? "border-[var(--d-accent)] bg-[var(--d-accent)] text-white shadow-[0_12px_26px_-12px_rgba(46,124,192,0.9)]"
            : booked
              ? "cursor-not-allowed border-transparent bg-[var(--d-bg)]/60 text-[var(--d-ink-soft)]/40 line-through"
              : "border-[var(--d-line)] bg-white text-[var(--d-ink)] hover:border-[var(--d-accent)]/50 hover:text-[var(--d-accent-deep)]"
        }`}
      >
        {label}
      </button>
    );
  };

  return (
    <Section id="appointment" className="overflow-hidden bg-[var(--d-bg)]">
      <FloatingBlob
        className="-right-40 -top-20 h-[24rem] w-[24rem] rounded-[52%_48%_58%_42%/48%_58%_42%_52%] opacity-60 blur-2xl"
        style={{ background: "radial-gradient(circle at 40% 40%, #FFFFFF 0%, #BBDCF2 60%, transparent 100%)" }}
        duration={12}
      />

      <div className="relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionLabel text={content.label} />
          <h2 className="mt-5 [font-family:var(--demo-display)] text-3xl font-bold tracking-tight text-[var(--d-ink)] sm:text-5xl">
            {content.title}
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-[var(--d-ink-soft)]">{content.intro}</p>

          <fieldset className="mt-10">
            <legend className="text-xs font-bold uppercase tracking-widest text-[var(--d-accent-deep)]">
              {content.typeLegend}
            </legend>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {content.types.map((type) => {
                const selected = type.id === typeId;
                return (
                  <button
                    key={type.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setTypeId(type.id)}
                    className={`flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-all ${
                      selected
                        ? "border-[var(--d-accent)] bg-[var(--d-accent)] text-white shadow-[0_12px_26px_-12px_rgba(46,124,192,0.9)]"
                        : "border-[var(--d-line)] bg-white text-[var(--d-ink-soft)] hover:border-[var(--d-accent)]/40 hover:text-[var(--d-accent-deep)]"
                    }`}
                  >
                    {type.label}
                    <span
                      className={`rounded-full px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider ${
                        selected ? "bg-white/20 text-white" : "bg-[var(--d-bg)] text-[var(--d-accent-deep)]"
                      }`}
                    >
                      {type.duration}
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>
        </div>

        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/70 bg-white/80 p-6 shadow-[0_40px_80px_-40px_rgba(19,74,120,0.55)] backdrop-blur-xl sm:p-8">
          <AnimatePresence mode="wait">
            {!confirmed ? (
              <motion.div
                key="picker"
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -16 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-xs font-bold uppercase tracking-widest text-[var(--d-accent-deep)]">
                  {content.dayLegend}
                </p>
                <div className="mt-4 grid grid-cols-3 gap-2.5 sm:grid-cols-6">
                  {content.days.map((day, index) => {
                    const selected = dayIndex === index;
                    return (
                      <button
                        key={day.full}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => pickDay(index)}
                        className={`flex flex-col items-center rounded-2xl border py-3 transition-all ${
                          selected
                            ? "border-[var(--d-accent)] bg-[var(--d-accent)] text-white shadow-[0_12px_26px_-12px_rgba(46,124,192,0.9)]"
                            : "border-[var(--d-line)] bg-white text-[var(--d-ink)] hover:border-[var(--d-accent)]/50"
                        }`}
                      >
                        <span
                          className={`text-[0.6rem] font-bold uppercase tracking-widest ${
                            selected ? "text-white/80" : "text-[var(--d-ink-soft)]"
                          }`}
                        >
                          {day.weekday}
                        </span>
                        <span className="[font-family:var(--demo-display)] text-xl font-bold">{day.day}</span>
                        <span
                          className={`text-[0.6rem] uppercase tracking-widest ${
                            selected ? "text-white/80" : "text-[var(--d-ink-soft)]"
                          }`}
                        >
                          {day.month}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <AnimatePresence>
                  {dayIndex !== null && (
                    <motion.div
                      key={`slots-${dayIndex}`}
                      initial={reduce ? false : { opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={reduce ? undefined : { opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="mt-7 flex items-center justify-between">
                        <p className="text-xs font-bold uppercase tracking-widest text-[var(--d-accent-deep)]">
                          {content.slotLegend}
                        </p>
                        <p className="text-[0.65rem] text-[var(--d-ink-soft)]">
                          <span className="mr-1 inline-block h-2 w-2 rounded-full bg-[var(--d-line)]" aria-hidden />
                          {content.bookedNote}
                        </p>
                      </div>

                      <p className="mt-4 flex items-center gap-1.5 text-[0.65rem] font-semibold uppercase tracking-widest text-[var(--d-ink-soft)]">
                        <Sun className="h-3.5 w-3.5 text-[var(--d-aqua)]" strokeWidth={2.2} />
                        {content.morning}
                      </p>
                      <div className="mt-2 grid grid-cols-3 gap-2.5">
                        {content.morningSlots.map((slot, i) => slotButton(slot, i))}
                      </div>

                      <p className="mt-4 flex items-center gap-1.5 text-[0.65rem] font-semibold uppercase tracking-widest text-[var(--d-ink-soft)]">
                        <Sunset className="h-3.5 w-3.5 text-[var(--d-aqua)]" strokeWidth={2.2} />
                        {content.afternoon}
                      </p>
                      <div className="mt-2 grid grid-cols-4 gap-2.5">
                        {content.afternoonSlots.map((slot, i) => slotButton(slot, morningCount + i))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-8 border-t border-dashed border-[var(--d-line)] pt-6">
                  {ready ? (
                    <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-[var(--d-ink)]">
                      <span className="font-semibold">{activeType.label}</span>
                      <span aria-hidden className="text-[var(--d-ink-soft)]">·</span>
                      <span>{content.days[dayIndex as number].full}</span>
                      <span aria-hidden className="text-[var(--d-ink-soft)]">·</span>
                      <span className="inline-flex items-center gap-1 font-semibold text-[var(--d-accent-deep)]">
                        <Clock3 className="h-3.5 w-3.5" strokeWidth={2.2} />
                        {allSlots[slotIndex as number]}
                      </span>
                    </p>
                  ) : (
                    <p className="text-sm text-[var(--d-ink-soft)]">{content.disabledHint}</p>
                  )}

                  <button
                    type="button"
                    disabled={!ready}
                    onClick={() => setConfirmed(true)}
                    className={`mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-semibold transition-all sm:w-auto ${
                      ready
                        ? "bg-[var(--d-accent)] text-white shadow-[0_18px_40px_-16px_rgba(46,124,192,0.9)] hover:scale-[1.02]"
                        : "cursor-not-allowed bg-[var(--d-line)]/70 text-[var(--d-ink-soft)]/60"
                    }`}
                  >
                    <CalendarCheck className="h-4 w-4" strokeWidth={2.2} />
                    {content.confirmCta}
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="confirmed"
                initial={reduce ? false : { opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center py-6 text-center"
              >
                <span className="grid h-20 w-20 place-items-center rounded-[48%_52%_55%_45%/52%_48%_52%_48%] bg-gradient-to-br from-[var(--d-accent)] to-[var(--d-aqua)] text-white shadow-[0_20px_45px_-18px_rgba(46,124,192,0.9)]">
                  <CheckCircle2 className="h-9 w-9" strokeWidth={2} />
                </span>
                <h3 className="mt-6 [font-family:var(--demo-display)] text-2xl font-bold text-[var(--d-ink)]">
                  {content.success.title}
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-[var(--d-ink-soft)]">
                  {content.success.body}
                </p>

                <dl className="mt-7 w-full max-w-sm space-y-3 rounded-3xl border border-[var(--d-line)] bg-white p-6 text-left">
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-xs font-semibold uppercase tracking-widest text-[var(--d-ink-soft)]">
                      {content.summary.type}
                    </dt>
                    <dd className="text-sm font-semibold text-[var(--d-ink)]">{activeType.label}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-xs font-semibold uppercase tracking-widest text-[var(--d-ink-soft)]">
                      {content.summary.date}
                    </dt>
                    <dd className="text-sm font-semibold text-[var(--d-ink)]">
                      {dayIndex !== null ? content.days[dayIndex].full : ""}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-xs font-semibold uppercase tracking-widest text-[var(--d-ink-soft)]">
                      {content.summary.time}
                    </dt>
                    <dd className="text-sm font-semibold text-[var(--d-ink)]">
                      {slotIndex !== null ? allSlots[slotIndex] : ""}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-4 border-t border-dashed border-[var(--d-line)] pt-3">
                    <dt className="text-xs font-semibold uppercase tracking-widest text-[var(--d-ink-soft)]">
                      {content.summary.codeLabel}
                    </dt>
                    <dd className="font-mono text-sm font-bold tracking-widest text-[var(--d-accent-deep)]">
                      {bookingCode}
                    </dd>
                  </div>
                </dl>

                <button
                  type="button"
                  onClick={reset}
                  className="mt-7 rounded-full border border-[var(--d-accent)]/30 bg-white px-7 py-3 text-sm font-semibold text-[var(--d-accent-deep)] transition-colors hover:bg-[var(--d-bg)]"
                >
                  {content.success.another}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
