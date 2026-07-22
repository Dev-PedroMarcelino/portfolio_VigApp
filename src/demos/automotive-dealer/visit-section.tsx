"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotionSafe as useReducedMotion } from "@/components/demos/use-reduced-motion-safe";
import { CalendarCheck, Clock, ExternalLink, MapPin } from "lucide-react";
import type { BarcellosContent } from "./content";
import { VISIT_TIMES } from "./content";
import { EASE, FOCUS, Reveal, SectionLabel } from "./ui";

const MAP_EMBED =
  "https://www.openstreetmap.org/export/embed.html?bbox=-46.6930%2C-23.5830%2C-46.6630%2C-23.5670&layer=mapnik&marker=-23.5750%2C-46.6780";
const MAP_LINK = "https://www.openstreetmap.org/?mlat=-23.5750&mlon=-46.6780#map=15/-23.5750/-46.6780";

export function VisitSection({ content }: { content: BarcellosContent["visit"] }) {
  const reduced = useReducedMotion() ?? false;
  const [day, setDay] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [booked, setBooked] = useState(false);

  const pickDay = (d: string) => {
    setDay(d);
    setBooked(false);
  };
  const pickTime = (t: string) => {
    setTime(t);
    setBooked(false);
  };

  const successBody =
    day && time ? content.successBody.replace("{day}", day).replace("{time}", time) : "";

  return (
    <section id="visita" className="relative scroll-mt-24 py-20 sm:py-24">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--d-line)] to-transparent"
      />

      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <SectionLabel text={content.label} />
          <h2 className="mt-4 max-w-xl text-[1.8rem] font-semibold leading-tight tracking-tight text-[var(--d-ink)] [font-family:var(--demo-display)] sm:text-[2.3rem]">
            {content.title}
          </h2>
          <p className="mt-3 max-w-2xl text-[0.92rem] leading-relaxed text-[var(--d-ink-soft)]">{content.subtitle}</p>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Scheduler */}
          <Reveal className="rounded-3xl border border-[var(--d-line)] bg-[var(--d-surface)] p-6 sm:p-8">
            <fieldset>
              <legend className="mb-3 text-[0.64rem] uppercase tracking-[0.22em] text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]">
                {content.dayLabel}
              </legend>
              <div className="flex flex-wrap gap-2" role="group" aria-label={content.dayLabel}>
                {content.days.map((d) => {
                  const active = day === d;
                  return (
                    <button
                      key={d}
                      type="button"
                      onClick={() => pickDay(d)}
                      aria-pressed={active}
                      className={`rounded-full border px-4 py-2.5 text-[0.8rem] font-medium transition-colors ${FOCUS} ${
                        active
                          ? "border-[var(--d-gold)] bg-[var(--d-gold)] text-[#141008]"
                          : "border-[var(--d-line)] bg-[var(--d-panel)] text-[var(--d-silver)] hover:border-[var(--d-gold)]/40"
                      }`}
                    >
                      {d}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <fieldset className="mt-7">
              <legend className="mb-3 flex items-center gap-1.5 text-[0.64rem] uppercase tracking-[0.22em] text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]">
                <Clock className="h-3 w-3" strokeWidth={1.8} aria-hidden />
                {content.timeLabel}
              </legend>
              <div className="flex flex-wrap gap-2" role="group" aria-label={content.timeLabel}>
                {VISIT_TIMES.map((t) => {
                  const active = time === t;
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => pickTime(t)}
                      aria-pressed={active}
                      className={`rounded-full border px-4 py-2.5 text-[0.8rem] font-medium transition-colors [font-family:var(--demo-mono)] ${FOCUS} ${
                        active
                          ? "border-[var(--d-gold)] bg-[var(--d-gold)] text-[#141008]"
                          : "border-[var(--d-line)] bg-[var(--d-panel)] text-[var(--d-silver)] hover:border-[var(--d-gold)]/40"
                      }`}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="mt-8">
              <AnimatePresence mode="wait" initial={false}>
                {booked && day && time ? (
                  <motion.div
                    key="ok"
                    role="status"
                    initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="flex items-start gap-3 rounded-2xl border border-[var(--d-gold)]/35 bg-[var(--d-gold)]/[0.08] p-5"
                  >
                    <CalendarCheck className="mt-0.5 h-5 w-5 shrink-0 text-[var(--d-gold)]" strokeWidth={1.8} aria-hidden />
                    <div>
                      <p className="text-[0.95rem] font-semibold text-[var(--d-gold-soft)]">{content.successTitle}</p>
                      <p className="mt-1 text-[0.84rem] leading-relaxed text-[var(--d-silver)]">{successBody}</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="cta"
                    initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.4, ease: EASE }}
                  >
                    <button
                      type="button"
                      disabled={!day || !time}
                      onClick={() => setBooked(true)}
                      className={`flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[0.9rem] font-semibold transition-[transform,opacity] ${FOCUS} ${
                        day && time
                          ? "bg-[var(--d-gold)] text-[#141008] shadow-[0_0_28px_rgba(217,164,65,0.3)] hover:scale-[1.02]"
                          : "cursor-not-allowed bg-[var(--d-panel)] text-[var(--d-ink-soft)]/60"
                      }`}
                    >
                      <CalendarCheck className="h-4 w-4" strokeWidth={2} aria-hidden />
                      {content.submit}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>

          {/* Address + map */}
          <Reveal delay={0.1} className="flex flex-col gap-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-[var(--d-line)] bg-[var(--d-surface)] p-5">
                <p className="flex items-center gap-2 text-[0.64rem] uppercase tracking-[0.22em] text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]">
                  <MapPin className="h-3.5 w-3.5 text-[var(--d-gold)]" strokeWidth={1.8} aria-hidden />
                  {content.addressLabel}
                </p>
                <p className="mt-2.5 text-[0.88rem] leading-relaxed text-[var(--d-ink)]">{content.address}</p>
              </div>
              <div className="rounded-2xl border border-[var(--d-line)] bg-[var(--d-surface)] p-5">
                <p className="flex items-center gap-2 text-[0.64rem] uppercase tracking-[0.22em] text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]">
                  <Clock className="h-3.5 w-3.5 text-[var(--d-gold)]" strokeWidth={1.8} aria-hidden />
                  {content.hoursLabel}
                </p>
                <p className="mt-2.5 text-[0.88rem] leading-relaxed text-[var(--d-ink)]">{content.hours}</p>
              </div>
            </div>

            <div className="relative flex-1 overflow-hidden rounded-3xl border border-[var(--d-line)] bg-[var(--d-surface)]">
              <iframe
                title={content.mapTitle}
                src={MAP_EMBED}
                loading="lazy"
                className="h-full min-h-[260px] w-full border-0 opacity-90 [filter:grayscale(0.2)_contrast(1.02)]"
              />
              <a
                href={MAP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className={`absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-[#0A0B0E]/85 px-3.5 py-2 text-[0.72rem] font-medium text-[var(--d-silver)] backdrop-blur-md transition-colors hover:text-[var(--d-gold)] ${FOCUS}`}
              >
                {content.mapCta}
                <ExternalLink className="h-3 w-3" strokeWidth={1.8} aria-hidden />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
