"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, ChevronLeft, MapPin } from "lucide-react";
import type { AureliaContent } from "./content";

const EASE_SLOW: [number, number, number, number] = [0.16, 1, 0.3, 1];

type Step = 0 | 1 | 2;

function buildReference(boutique: number, day: number, time: number): string {
  const seed = (boutique + 1) * 137 + (day + 1) * 29 + (time + 1) * 7;
  const code = (seed * 977).toString(36).toUpperCase().slice(0, 4).padStart(4, "0");
  return `AUR-${code}`;
}

export function Appointment({ content }: { content: AureliaContent["appointment"] }) {
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState<Step>(0);
  const [boutique, setBoutique] = useState(0);
  const [day, setDay] = useState<number | null>(null);
  const [time, setTime] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const canContinue =
    (step === 0) || (step === 1 && day !== null) || (step === 2 && time !== null);
  const canConfirm = day !== null && time !== null && name.trim() !== "" && email.trim() !== "";

  const stepLabels = [
    content.stepLabels.boutique,
    content.stepLabels.day,
    content.stepLabels.time,
  ];

  function reset() {
    setConfirmed(false);
    setStep(0);
    setDay(null);
    setTime(null);
    setName("");
    setEmail("");
    setBoutique(0);
  }

  const selectedBoutique = content.boutiques[boutique];
  const reference =
    day !== null && time !== null ? buildReference(boutique, day, time) : "AUR-0000";

  return (
    <section
      id="appointment"
      className="relative overflow-hidden py-28 sm:py-36"
    >
      <div
        aria-hidden
        className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.12),transparent_70%)]"
      />
      <div className="relative z-10 mx-auto max-w-3xl px-6">
        <div className="flex flex-col items-center text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.42em] text-[var(--d-gold)]">
            {content.eyebrow}
          </p>
          <h2 className="mt-6 [font-family:var(--demo-display)] text-4xl font-light text-[var(--d-ink)] sm:text-5xl lg:text-6xl">
            {content.title}
          </h2>
          <p className="mt-6 max-w-xl text-sm font-light leading-relaxed text-[var(--d-ink-soft)]">
            {content.intro}
          </p>
        </div>

        <div className="mt-14 border border-[var(--d-line-soft)] bg-[var(--d-bg-soft)] p-6 sm:p-10">
          <AnimatePresence mode="wait">
            {confirmed ? (
              <motion.div
                key="confirmed"
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: EASE_SLOW }}
                className="flex flex-col items-center py-6 text-center"
              >
                <motion.span
                  initial={reduceMotion ? false : { scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1, ease: EASE_SLOW }}
                  className="flex h-16 w-16 items-center justify-center rounded-full border border-[var(--d-gold)] text-[var(--d-gold-bright)]"
                >
                  <Check aria-hidden className="h-7 w-7" strokeWidth={1.4} />
                </motion.span>
                <h3 className="mt-8 [font-family:var(--demo-display)] text-3xl font-light italic text-[var(--d-ink)]">
                  {content.confirmedTitle}
                </h3>
                <p className="mt-4 max-w-md text-sm font-light leading-relaxed text-[var(--d-ink-soft)]">
                  {content.confirmedBody}
                </p>

                <dl className="mt-9 grid w-full max-w-md grid-cols-3 gap-px overflow-hidden border border-[var(--d-line-soft)] bg-[var(--d-line-soft)] text-left">
                  <div className="bg-[var(--d-bg-soft)] p-4">
                    <dt className="text-[9px] uppercase tracking-[0.24em] text-[var(--d-ink-faint)]">
                      {content.summaryBoutique}
                    </dt>
                    <dd className="mt-1.5 text-sm text-[var(--d-ink)]">{selectedBoutique.city}</dd>
                  </div>
                  <div className="bg-[var(--d-bg-soft)] p-4">
                    <dt className="text-[9px] uppercase tracking-[0.24em] text-[var(--d-ink-faint)]">
                      {content.summaryDay}
                    </dt>
                    <dd className="mt-1.5 text-sm text-[var(--d-ink)]">
                      {day !== null ? content.days[day] : ""}
                    </dd>
                  </div>
                  <div className="bg-[var(--d-bg-soft)] p-4">
                    <dt className="text-[9px] uppercase tracking-[0.24em] text-[var(--d-ink-faint)]">
                      {content.summaryTime}
                    </dt>
                    <dd className="mt-1.5 text-sm text-[var(--d-ink)]">
                      {time !== null ? content.times[time] : ""}
                    </dd>
                  </div>
                </dl>

                <p className="mt-6 text-[10px] uppercase tracking-[0.3em] text-[var(--d-ink-faint)]">
                  {content.referenceLabel}
                </p>
                <p className="mt-1 text-lg tracking-[0.2em] text-[var(--d-gold-bright)]">
                  {reference}
                </p>

                <button
                  type="button"
                  onClick={reset}
                  className="mt-9 border border-[var(--d-line)] px-7 py-3 text-[10px] font-semibold uppercase tracking-[0.26em] text-[var(--d-ink)] transition-colors duration-500 hover:border-[var(--d-gold)] hover:text-[var(--d-gold)]"
                >
                  {content.resetLabel}
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* stepper header */}
                <ol className="flex items-center justify-center gap-3 sm:gap-5">
                  {stepLabels.map((label, index) => {
                    const done = index < step;
                    const current = index === step;
                    return (
                      <li key={label} className="flex items-center gap-3 sm:gap-5">
                        <span className="flex items-center gap-2">
                          <span
                            className={`flex h-6 w-6 items-center justify-center rounded-full border text-[10px] transition-colors duration-500 ${
                              current
                                ? "border-[var(--d-gold)] text-[var(--d-gold-bright)]"
                                : done
                                  ? "border-[var(--d-gold)] bg-[var(--d-gold)] text-[#101014]"
                                  : "border-[var(--d-line-soft)] text-[var(--d-ink-faint)]"
                            }`}
                          >
                            {done ? <Check aria-hidden className="h-3 w-3" strokeWidth={2.4} /> : index + 1}
                          </span>
                          <span
                            className={`hidden text-[10px] uppercase tracking-[0.24em] sm:inline ${
                              current ? "text-[var(--d-ink)]" : "text-[var(--d-ink-faint)]"
                            }`}
                          >
                            {label}
                          </span>
                        </span>
                        {index < stepLabels.length - 1 ? (
                          <span aria-hidden className="h-px w-6 bg-[var(--d-line-soft)] sm:w-10" />
                        ) : null}
                      </li>
                    );
                  })}
                </ol>

                <div className="mt-10 min-h-[220px]">
                  <AnimatePresence mode="wait">
                    {step === 0 ? (
                      <motion.fieldset
                        key="step-boutique"
                        initial={reduceMotion ? false : { opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
                        transition={{ duration: 0.5, ease: EASE_SLOW }}
                      >
                        <legend className="mb-5 text-center [font-family:var(--demo-display)] text-2xl font-light italic text-[var(--d-ink)]">
                          {content.boutiqueTitle}
                        </legend>
                        <div className="grid grid-cols-1 gap-3">
                          {content.boutiques.map((item, index) => {
                            const selected = index === boutique;
                            return (
                              <button
                                key={item.id}
                                type="button"
                                aria-pressed={selected}
                                onClick={() => setBoutique(index)}
                                className={`flex items-center gap-4 border px-5 py-4 text-left transition-colors duration-500 ${
                                  selected
                                    ? "border-[var(--d-gold)] bg-[var(--d-bg-raised)]"
                                    : "border-[var(--d-line-soft)] hover:border-[var(--d-line)]"
                                }`}
                              >
                                <MapPin
                                  aria-hidden
                                  className={`h-4 w-4 shrink-0 ${selected ? "text-[var(--d-gold-bright)]" : "text-[var(--d-ink-faint)]"}`}
                                  strokeWidth={1.5}
                                />
                                <span>
                                  <span className="block text-sm font-medium text-[var(--d-ink)]">
                                    {item.city}
                                  </span>
                                  <span className="mt-0.5 block text-xs font-light text-[var(--d-ink-soft)]">
                                    {item.address}
                                  </span>
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </motion.fieldset>
                    ) : null}

                    {step === 1 ? (
                      <motion.fieldset
                        key="step-day"
                        initial={reduceMotion ? false : { opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
                        transition={{ duration: 0.5, ease: EASE_SLOW }}
                      >
                        <legend className="mb-5 text-center [font-family:var(--demo-display)] text-2xl font-light italic text-[var(--d-ink)]">
                          {content.dayTitle}
                        </legend>
                        <div className="grid grid-cols-3 gap-3">
                          {content.days.map((label, index) => {
                            const selected = index === day;
                            return (
                              <button
                                key={label}
                                type="button"
                                aria-pressed={selected}
                                onClick={() => setDay(index)}
                                className={`border py-4 text-center text-sm font-light transition-colors duration-500 ${
                                  selected
                                    ? "border-[var(--d-gold)] bg-[var(--d-bg-raised)] text-[var(--d-gold-bright)]"
                                    : "border-[var(--d-line-soft)] text-[var(--d-ink-soft)] hover:border-[var(--d-line)] hover:text-[var(--d-ink)]"
                                }`}
                              >
                                {label}
                              </button>
                            );
                          })}
                        </div>
                      </motion.fieldset>
                    ) : null}

                    {step === 2 ? (
                      <motion.div
                        key="step-time"
                        initial={reduceMotion ? false : { opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
                        transition={{ duration: 0.5, ease: EASE_SLOW }}
                      >
                        <fieldset>
                          <legend className="mb-5 text-center [font-family:var(--demo-display)] text-2xl font-light italic text-[var(--d-ink)]">
                            {content.timeTitle}
                          </legend>
                          <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
                            {content.times.map((label, index) => {
                              const selected = index === time;
                              return (
                                <button
                                  key={label}
                                  type="button"
                                  aria-pressed={selected}
                                  onClick={() => setTime(index)}
                                  className={`border py-3 text-center text-sm font-light transition-colors duration-500 ${
                                    selected
                                      ? "border-[var(--d-gold)] bg-[var(--d-bg-raised)] text-[var(--d-gold-bright)]"
                                      : "border-[var(--d-line-soft)] text-[var(--d-ink-soft)] hover:border-[var(--d-line)] hover:text-[var(--d-ink)]"
                                  }`}
                                >
                                  {label}
                                </button>
                              );
                            })}
                          </div>
                        </fieldset>

                        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <label className="flex flex-col gap-2">
                            <span className="text-[10px] uppercase tracking-[0.24em] text-[var(--d-ink-faint)]">
                              {content.nameLabel}
                            </span>
                            <input
                              type="text"
                              value={name}
                              onChange={(event) => setName(event.target.value)}
                              placeholder={content.namePlaceholder}
                              className="border border-[var(--d-line-soft)] bg-[var(--d-bg)] px-4 py-3 text-sm text-[var(--d-ink)] outline-none transition-colors duration-300 placeholder:text-[var(--d-ink-faint)] focus:border-[var(--d-gold)]"
                            />
                          </label>
                          <label className="flex flex-col gap-2">
                            <span className="text-[10px] uppercase tracking-[0.24em] text-[var(--d-ink-faint)]">
                              {content.emailLabel}
                            </span>
                            <input
                              type="email"
                              value={email}
                              onChange={(event) => setEmail(event.target.value)}
                              placeholder={content.emailPlaceholder}
                              className="border border-[var(--d-line-soft)] bg-[var(--d-bg)] px-4 py-3 text-sm text-[var(--d-ink)] outline-none transition-colors duration-300 placeholder:text-[var(--d-ink-faint)] focus:border-[var(--d-gold)]"
                            />
                          </label>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>

                {/* controls */}
                <div className="mt-8 flex items-center justify-between gap-4 border-t border-[var(--d-line-soft)] pt-6">
                  <button
                    type="button"
                    onClick={() => setStep((current) => (current > 0 ? ((current - 1) as Step) : current))}
                    disabled={step === 0}
                    className={`flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.26em] transition-colors duration-300 ${
                      step === 0
                        ? "cursor-not-allowed text-[var(--d-ink-faint)] opacity-40"
                        : "text-[var(--d-ink-soft)] hover:text-[var(--d-gold-bright)]"
                    }`}
                  >
                    <ChevronLeft aria-hidden className="h-3.5 w-3.5" strokeWidth={2} />
                    {content.backLabel}
                  </button>

                  <p className="hidden text-[11px] font-light text-[var(--d-ink-faint)] sm:block">
                    {content.privateNote}
                  </p>

                  {step < 2 ? (
                    <button
                      type="button"
                      onClick={() => canContinue && setStep((current) => (current + 1) as Step)}
                      disabled={!canContinue}
                      className={`border px-7 py-3 text-[10px] font-semibold uppercase tracking-[0.26em] transition-colors duration-500 ${
                        canContinue
                          ? "border-[var(--d-gold)] bg-[var(--d-gold)] text-[#101014] hover:bg-transparent hover:text-[var(--d-gold)]"
                          : "cursor-not-allowed border-[var(--d-line-soft)] text-[var(--d-ink-faint)] opacity-50"
                      }`}
                    >
                      {content.continueLabel}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => canConfirm && setConfirmed(true)}
                      disabled={!canConfirm}
                      className={`border px-7 py-3 text-[10px] font-semibold uppercase tracking-[0.26em] transition-colors duration-500 ${
                        canConfirm
                          ? "border-[var(--d-gold)] bg-[var(--d-gold)] text-[#101014] hover:bg-transparent hover:text-[var(--d-gold)]"
                          : "cursor-not-allowed border-[var(--d-line-soft)] text-[var(--d-ink-faint)] opacity-50"
                      }`}
                    >
                      {content.confirmLabel}
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
