"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Minus, Moon, Plus } from "lucide-react";
import type { HotelContent, Suite } from "./content";
import type { CurrencyFormatter } from "./solace-root";

const EASE_SLOW: [number, number, number, number] = [0.16, 1, 0.3, 1];
const MAX_GUESTS = 6;
const DAY_MS = 86_400_000;

/** Fixed reference dates so SSR and CSR agree: 12 & 14 Sep 2026. */
const DEFAULT_IN = "2026-09-12";
const DEFAULT_OUT = "2026-09-14";

function nightsBetween(checkIn: string, checkOut: string): number | null {
  if (!checkIn || !checkOut) return null;
  const start = Date.parse(`${checkIn}T00:00:00Z`);
  const end = Date.parse(`${checkOut}T00:00:00Z`);
  if (Number.isNaN(start) || Number.isNaN(end)) return null;
  const diff = Math.round((end - start) / DAY_MS);
  return diff;
}

export function Hero({
  content,
  widget,
  suites,
  format,
  intlLocale,
}: {
  content: HotelContent["hero"];
  widget: HotelContent["widget"];
  suites: Suite[];
  format: CurrencyFormatter;
  intlLocale: string;
}) {
  const reduceMotion = useReducedMotion();
  const [checkIn, setCheckIn] = useState(DEFAULT_IN);
  const [checkOut, setCheckOut] = useState(DEFAULT_OUT);
  const [guests, setGuests] = useState(2);
  const [suiteId, setSuiteId] = useState(suites[0].id);
  const [reserved, setReserved] = useState(false);

  const suite = useMemo(
    () => suites.find((s) => s.id === suiteId) ?? suites[0],
    [suites, suiteId],
  );
  const nights = useMemo(() => nightsBetween(checkIn, checkOut), [checkIn, checkOut]);
  const valid = nights !== null && nights > 0;
  const total = valid ? suite.rate * (nights as number) : null;

  const dateFmt = useMemo(
    () =>
      new Intl.DateTimeFormat(intlLocale, {
        day: "numeric",
        month: "short",
        timeZone: "UTC",
      }),
    [intlLocale],
  );

  const stayRange =
    valid && checkIn && checkOut
      ? `${dateFmt.format(new Date(`${checkIn}T00:00:00Z`))} – ${dateFmt.format(
          new Date(`${checkOut}T00:00:00Z`),
        )}`
      : "";

  const nightsWord = nights === 1 ? widget.nightSingular : widget.nightPlural;
  const guestsWord = guests === 1 ? widget.guestSingular : widget.guestPlural;

  const inputClass =
    "w-full bg-transparent text-sm text-[var(--d-linen)] outline-none [color-scheme:dark] [font-family:var(--demo-body)]";

  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=2000&q=80"
          alt={content.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(21,42,37,0.68)_0%,rgba(21,42,37,0.4)_38%,rgba(21,42,37,0.82)_74%,#152A25_100%)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_28%,transparent_36%,rgba(21,42,37,0.6)_100%)]"
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-5 pb-40 pt-32 sm:px-6 sm:pb-44 sm:pt-40">
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.2, ease: EASE_SLOW }}
          className="flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.42em] text-[var(--d-brass)]"
        >
          <span aria-hidden className="h-px w-10 bg-[var(--d-line)]" />
          {content.eyebrow}
        </motion.p>

        <h1 className="mt-8 max-w-3xl [font-family:var(--demo-display)] text-[3.25rem] font-medium leading-[0.98] text-[var(--d-linen)] sm:text-7xl lg:text-8xl">
          <motion.span
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.6, delay: 0.35, ease: EASE_SLOW }}
            className="block"
          >
            {content.title}
          </motion.span>
          <motion.span
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.6, delay: 0.6, ease: EASE_SLOW }}
            className="block italic text-[var(--d-brass-bright)]"
          >
            {content.titleItalic}
          </motion.span>
        </h1>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.95, ease: EASE_SLOW }}
          className="mt-8 max-w-xl text-sm leading-relaxed text-[var(--d-ink-soft)] sm:text-base"
        >
          {content.lede}
        </motion.p>

        <motion.ul
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.15, ease: EASE_SLOW }}
          className="mt-10 flex flex-wrap gap-x-10 gap-y-4"
        >
          {content.stats.map((stat) => (
            <li key={stat.label} className="flex items-baseline gap-2">
              <span className="[font-family:var(--demo-display)] text-3xl font-medium text-[var(--d-brass-bright)]">
                {stat.value}
              </span>
              <span className="text-[10px] uppercase tracking-[0.24em] text-[var(--d-ink-faint)]">
                {stat.label}
              </span>
            </li>
          ))}
        </motion.ul>
      </div>

      {/* Booking widget */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 1.3, ease: EASE_SLOW }}
        className="relative z-10 mx-auto -mb-16 w-full max-w-5xl px-5 sm:px-6"
      >
        <div className="border border-[var(--d-line)] bg-[rgba(28,55,48,0.92)] p-5 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)] backdrop-blur-xl sm:p-6">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[var(--d-brass)]">
              {widget.title}
            </span>
            <span aria-hidden className="h-px flex-1 bg-[var(--d-line-soft)]" />
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_1fr_auto_1.2fr]">
            <label className="block border border-[var(--d-line-soft)] bg-[rgba(34,66,60,0.4)] px-4 py-3">
              <span className="mb-1 block text-[9px] font-semibold uppercase tracking-[0.28em] text-[var(--d-ink-faint)]">
                {widget.checkInLabel}
              </span>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => {
                  setCheckIn(e.target.value);
                  setReserved(false);
                }}
                className={inputClass}
              />
            </label>

            <label className="block border border-[var(--d-line-soft)] bg-[rgba(34,66,60,0.4)] px-4 py-3">
              <span className="mb-1 block text-[9px] font-semibold uppercase tracking-[0.28em] text-[var(--d-ink-faint)]">
                {widget.checkOutLabel}
              </span>
              <input
                type="date"
                value={checkOut}
                min={checkIn}
                onChange={(e) => {
                  setCheckOut(e.target.value);
                  setReserved(false);
                }}
                className={inputClass}
              />
            </label>

            <div className="border border-[var(--d-line-soft)] bg-[rgba(34,66,60,0.4)] px-4 py-3">
              <span className="mb-1 block text-[9px] font-semibold uppercase tracking-[0.28em] text-[var(--d-ink-faint)]">
                {widget.guestsLabel}
              </span>
              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  aria-label={widget.decreaseAria}
                  disabled={guests <= 1}
                  onClick={() => {
                    setGuests((g) => Math.max(1, g - 1));
                    setReserved(false);
                  }}
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--d-line)] text-[var(--d-linen)] transition-colors hover:border-[var(--d-brass)] hover:text-[var(--d-brass)] disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <Minus className="h-3.5 w-3.5" strokeWidth={1.8} />
                </button>
                <span className="min-w-[2.5rem] text-center text-sm tabular-nums text-[var(--d-linen)]">
                  {guests}
                  <span className="ml-1 text-[9px] uppercase tracking-[0.2em] text-[var(--d-ink-faint)]">
                    {guestsWord}
                  </span>
                </span>
                <button
                  type="button"
                  aria-label={widget.increaseAria}
                  disabled={guests >= MAX_GUESTS}
                  onClick={() => {
                    setGuests((g) => Math.min(MAX_GUESTS, g + 1));
                    setReserved(false);
                  }}
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--d-line)] text-[var(--d-linen)] transition-colors hover:border-[var(--d-brass)] hover:text-[var(--d-brass)] disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <Plus className="h-3.5 w-3.5" strokeWidth={1.8} />
                </button>
              </div>
            </div>

            <label className="block border border-[var(--d-line-soft)] bg-[rgba(34,66,60,0.4)] px-4 py-3">
              <span className="mb-1 block text-[9px] font-semibold uppercase tracking-[0.28em] text-[var(--d-ink-faint)]">
                {widget.suiteLabel}
              </span>
              <select
                value={suiteId}
                onChange={(e) => {
                  setSuiteId(e.target.value);
                  setReserved(false);
                }}
                className="w-full cursor-pointer bg-transparent text-sm text-[var(--d-linen)] outline-none [color-scheme:dark] [font-family:var(--demo-body)]"
              >
                {suites.map((s) => (
                  <option key={s.id} value={s.id} className="bg-[#1C3730] text-[var(--d-linen)]">
                    {s.name} — {format(s.rate)}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-4 flex flex-col gap-4 border-t border-[var(--d-line-soft)] pt-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-h-[2.5rem]">
              <AnimatePresence mode="wait" initial={false}>
                {!valid ? (
                  <motion.p
                    key="hint"
                    initial={reduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-xs text-[var(--d-ink-faint)]"
                  >
                    {nights !== null && nights <= 0 ? widget.invalidHint : widget.emptyHint}
                  </motion.p>
                ) : (
                  <motion.div
                    key="estimate"
                    initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-wrap items-baseline gap-x-3 gap-y-1"
                  >
                    <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.24em] text-[var(--d-ink-faint)]">
                      <Moon aria-hidden className="h-3 w-3 text-[var(--d-brass)]" strokeWidth={1.6} />
                      {stayRange} · {nights} {nightsWord}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.24em] text-[var(--d-ink-faint)]">
                      {widget.estimateLabel}
                    </span>
                    <span className="[font-family:var(--demo-display)] text-3xl font-medium text-[var(--d-brass-bright)]">
                      {format(total as number)}
                    </span>
                    <span className="text-[10px] text-[var(--d-ink-faint)]">{widget.taxNote}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              type="button"
              disabled={!valid}
              onClick={() => setReserved(true)}
              className="group flex shrink-0 items-center justify-center gap-2 bg-[var(--d-brass)] px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#152A25] transition-colors duration-300 hover:bg-[var(--d-brass-bright)] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <AnimatePresence mode="wait" initial={false}>
                {reserved ? (
                  <motion.span
                    key="done"
                    initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-2"
                  >
                    <Check className="h-4 w-4" strokeWidth={2} />
                    {widget.submitCta}
                  </motion.span>
                ) : (
                  <motion.span key="idle" initial={false} exit={{ opacity: 0 }}>
                    {widget.submitCta}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
