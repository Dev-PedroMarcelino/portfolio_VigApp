"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Clock, MapPin } from "lucide-react";
import type { NordformContent } from "./content";
import { IMAGES, fill } from "./content";
import { Reveal, SectionHeading } from "./ui";

export function ShowroomSection({ content }: { content: NordformContent["showroom"] }) {
  const reduce = useReducedMotion();
  const [name, setName] = useState("");
  const [day, setDay] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [booked, setBooked] = useState(false);

  const canSubmit = name.trim().length > 1 && day !== null && time !== null;

  const reset = () => {
    setName("");
    setDay(null);
    setTime(null);
    setBooked(false);
  };

  return (
    <section id="showroom" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading label={content.label} title={content.title} intro={content.intro} />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <div className="flex h-full flex-col overflow-hidden rounded-[24px] border border-[var(--d-line)]">
              <div className="relative min-h-[260px] flex-1">
                <Image
                  src={IMAGES.showroom}
                  alt={content.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-[rgba(33,29,25,0.55)] via-transparent to-transparent"
                />
                <address className="absolute bottom-0 left-0 flex items-start gap-2 p-5 not-italic text-[var(--d-bone)] sm:p-6">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.7} />
                  <span className="text-sm leading-relaxed">
                    <span className="block font-semibold">{content.address[0]}</span>
                    {content.address.slice(1).map((line) => (
                      <span key={line} className="block text-[13px] opacity-90">
                        {line}
                      </span>
                    ))}
                  </span>
                </address>
              </div>
              <div className="border-t border-[var(--d-line)] bg-[var(--d-bone)] p-5 sm:p-6">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--d-sage-ink)]">
                  <Clock className="h-3.5 w-3.5" strokeWidth={1.8} />
                  {content.hoursTitle}
                </p>
                <dl className="mt-3 grid gap-1.5 sm:grid-cols-3 sm:gap-4">
                  {content.hours.map((row) => (
                    <div key={row.days} className="flex justify-between sm:block">
                      <dt className="text-xs text-[var(--d-soft)]">{row.days}</dt>
                      <dd className="text-sm font-semibold text-[var(--d-ink)]">{row.time}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex h-full flex-col rounded-[24px] border border-[var(--d-line)] bg-[var(--d-card)] p-6 sm:p-8">
              <AnimatePresence mode="wait" initial={false}>
                {booked && day && time ? (
                  <motion.div
                    key="success"
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-1 flex-col items-center justify-center gap-4 text-center"
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--d-sage)]">
                      <Check className="h-6 w-6 text-[var(--d-bone)]" strokeWidth={2} />
                    </span>
                    <p className="text-2xl text-[var(--d-ink)] [font-family:var(--demo-display)]">
                      {fill(content.successTitle, { name: name.trim() })}
                    </p>
                    <p className="max-w-sm text-sm leading-relaxed text-[var(--d-soft)]">
                      {fill(content.successBody, { day, time })}
                    </p>
                    <button
                      type="button"
                      onClick={reset}
                      className="mt-2 rounded-full border border-[var(--d-ink)] px-6 py-3 text-sm font-semibold text-[var(--d-ink)] transition-colors hover:bg-[var(--d-bone)]"
                    >
                      {content.another}
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (canSubmit) setBooked(true);
                    }}
                    className="flex flex-1 flex-col"
                  >
                    <h3 className="text-2xl text-[var(--d-ink)] [font-family:var(--demo-display)]">
                      {content.formTitle}
                    </h3>
                    <p className="mt-1.5 text-[13px] text-[var(--d-soft)]">{content.formSub}</p>

                    <label
                      htmlFor="showroom-name"
                      className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--d-soft)]"
                    >
                      {content.nameLabel}
                    </label>
                    <input
                      id="showroom-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={content.namePlaceholder}
                      className="mt-2 rounded-xl border border-[var(--d-line)] bg-[var(--d-bone)] px-4 py-3 text-sm text-[var(--d-ink)] outline-none transition-colors placeholder:text-[rgba(110,101,88,0.55)] focus:border-[var(--d-ink)]"
                    />

                    <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--d-soft)]">
                      {content.dayLabel}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {content.days.map((d) => (
                        <button
                          key={d}
                          type="button"
                          aria-pressed={day === d}
                          onClick={() => setDay(d)}
                          className={`rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
                            day === d
                              ? "border-[var(--d-ink)] bg-[var(--d-ink)] text-[var(--d-bone)]"
                              : "border-[var(--d-line)] bg-[var(--d-bone)] text-[var(--d-soft)] hover:border-[var(--d-ink)] hover:text-[var(--d-ink)]"
                          }`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>

                    <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--d-soft)]">
                      {content.timeLabel}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {content.times.map((t) => (
                        <button
                          key={t}
                          type="button"
                          aria-pressed={time === t}
                          onClick={() => setTime(t)}
                          className={`rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
                            time === t
                              ? "border-[var(--d-ink)] bg-[var(--d-ink)] text-[var(--d-bone)]"
                              : "border-[var(--d-line)] bg-[var(--d-bone)] text-[var(--d-soft)] hover:border-[var(--d-ink)] hover:text-[var(--d-ink)]"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>

                    <button
                      type="submit"
                      disabled={!canSubmit}
                      className="mt-8 w-full rounded-full bg-[var(--d-ink)] py-3.5 text-sm font-semibold text-[var(--d-bone)] transition-all enabled:hover:bg-[#443E37] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {content.submit}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
