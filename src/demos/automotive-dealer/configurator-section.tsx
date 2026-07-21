"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, RotateCcw } from "lucide-react";
import type { ConfiguratorContent } from "./content";
import { CarSilhouette } from "./car-silhouette";
import { CarbonTexture, SectionLabel, formatCurrency } from "./ui";

export function ConfiguratorSection({ content }: { content: ConfiguratorContent }) {
  const reduced = useReducedMotion() ?? false;
  const [trimId, setTrimId] = useState(content.trims[0].id);
  const [colorId, setColorId] = useState(content.colors[0].id);
  const [wheelId, setWheelId] = useState(content.wheels[0].id);
  const [reserved, setReserved] = useState(false);

  const trim = content.trims.find((t) => t.id === trimId) ?? content.trims[0];
  const color = content.colors.find((c) => c.id === colorId) ?? content.colors[0];
  const wheel = content.wheels.find((w) => w.id === wheelId) ?? content.wheels[0];

  const total = useMemo(
    () => content.basePrice + trim.priceDelta + color.priceDelta + wheel.priceDelta,
    [content.basePrice, trim.priceDelta, color.priceDelta, wheel.priceDelta],
  );

  const fmt = (n: number) => formatCurrency(n, content.priceLocale, content.currency);
  const delta = (n: number) => (n === 0 ? content.includedLabel : `+ ${fmt(n)}`);

  return (
    <section id="configurator" className="relative overflow-hidden bg-[var(--d-carbon)] py-20 sm:py-28">
      <CarbonTexture opacity={0.5} />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-4">
          <SectionLabel text={content.label} />
          <h2 className="[font-family:var(--demo-display)] max-w-2xl text-3xl uppercase leading-tight tracking-tight text-[var(--d-ink)] sm:text-5xl">
            {content.title}
          </h2>
          <p className="max-w-lg text-sm leading-relaxed text-[var(--d-ink-soft)]">{content.intro}</p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_1fr]">
          {/* preview + total */}
          <div className="flex flex-col gap-5">
            <div
              className="relative overflow-hidden border border-[var(--d-line)] bg-gradient-to-b from-[var(--d-surface)] to-black p-6"
              style={{ boxShadow: `inset 0 0 120px ${color.hex}22` }}
            >
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-40 opacity-40 blur-3xl transition-colors duration-500"
                style={{ background: `radial-gradient(60% 80% at 50% 0%, ${color.hex}, transparent)` }}
                aria-hidden
              />
              <div className="relative flex items-center justify-between">
                <div>
                  <p className="[font-family:var(--demo-display)] text-lg uppercase text-[var(--d-ink)]">
                    {content.baseName}
                  </p>
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[var(--d-metal)]">
                    {trim.name} · {color.name}
                  </p>
                </div>
                <div className="text-right">
                  <p className="[font-family:var(--demo-display)] text-base text-[var(--d-accent-soft)]">
                    {trim.power}
                  </p>
                  <p className="text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-[var(--d-metal)]">
                    {content.powerNote}
                  </p>
                </div>
              </div>
              <div className="relative mt-4">
                <CarSilhouette color={color.hex} finish={color.finish} />
              </div>
            </div>

            <div className="flex items-end justify-between border border-[var(--d-line)] bg-[var(--d-surface)] p-5">
              <div>
                <p className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-[var(--d-metal)]">
                  {content.totalLabel}
                </p>
                <p className="text-[0.62rem] text-[var(--d-metal)]">{content.fromNote}</p>
              </div>
              <motion.p
                key={total}
                initial={reduced ? false : { opacity: 0.4, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="[font-family:var(--demo-display)] text-3xl text-[var(--d-ink)] tabular-nums sm:text-4xl"
              >
                {fmt(total)}
              </motion.p>
            </div>
          </div>

          {/* controls */}
          <div className="flex flex-col gap-7">
            {/* trims */}
            <fieldset>
              <legend className="mb-3 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[var(--d-metal)]">
                {content.trimLabel}
              </legend>
              <div className="flex flex-col gap-2">
                {content.trims.map((t) => {
                  const on = t.id === trimId;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setTrimId(t.id)}
                      className={`flex items-center justify-between gap-3 border px-4 py-3 text-left transition-colors ${
                        on
                          ? "border-[var(--d-accent)] bg-[var(--d-surface-2)]"
                          : "border-[var(--d-line)] bg-transparent hover:border-[var(--d-metal)]"
                      }`}
                    >
                      <span className="flex flex-col">
                        <span className="text-sm font-semibold text-[var(--d-ink)]">{t.name}</span>
                        <span className="text-[0.7rem] text-[var(--d-metal)]">{t.note}</span>
                      </span>
                      <span className="shrink-0 text-right text-[0.72rem] font-semibold tabular-nums text-[var(--d-ink-soft)]">
                        {delta(t.priceDelta)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {/* colors */}
            <fieldset>
              <legend className="mb-3 flex items-center justify-between text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[var(--d-metal)]">
                <span>{content.colorLabel}</span>
                <span className="text-[var(--d-ink-soft)] normal-case tracking-normal">
                  {color.name} · {color.finish}
                </span>
              </legend>
              <div className="flex flex-wrap gap-2.5">
                {content.colors.map((c) => {
                  const on = c.id === colorId;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      aria-pressed={on}
                      aria-label={`${c.name} — ${c.finish}`}
                      title={`${c.name} · ${delta(c.priceDelta)}`}
                      onClick={() => setColorId(c.id)}
                      className={`relative h-11 w-11 rounded-full border-2 transition-transform hover:scale-105 ${
                        on ? "border-[var(--d-accent)]" : "border-white/15"
                      }`}
                      style={{ backgroundColor: c.hex }}
                    >
                      {on && (
                        <span className="absolute inset-0 flex items-center justify-center">
                          <Check
                            className="h-4 w-4 drop-shadow"
                            strokeWidth={3}
                            color={c.hex === "#E9EAEC" ? "#0C0C0F" : "#ffffff"}
                          />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {/* wheels */}
            <fieldset>
              <legend className="mb-3 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[var(--d-metal)]">
                {content.wheelLabel}
              </legend>
              <div className="flex flex-col gap-2">
                {content.wheels.map((w) => {
                  const on = w.id === wheelId;
                  return (
                    <button
                      key={w.id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setWheelId(w.id)}
                      className={`flex items-center justify-between gap-3 border px-4 py-3 text-left transition-colors ${
                        on
                          ? "border-[var(--d-accent)] bg-[var(--d-surface-2)]"
                          : "border-[var(--d-line)] bg-transparent hover:border-[var(--d-metal)]"
                      }`}
                    >
                      <span className="flex flex-col">
                        <span className="text-sm font-semibold text-[var(--d-ink)]">{w.name}</span>
                        <span className="text-[0.7rem] text-[var(--d-metal)]">{w.note}</span>
                      </span>
                      <span className="shrink-0 text-right text-[0.72rem] font-semibold tabular-nums text-[var(--d-ink-soft)]">
                        {delta(w.priceDelta)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <button
              type="button"
              onClick={() => setReserved(true)}
              className="mt-1 skew-x-[-8deg] bg-[var(--d-accent)] px-6 py-4 text-center text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[var(--d-accent-soft)]"
            >
              <span className="inline-block skew-x-[8deg]">
                {content.reserveCta} · {fmt(total)}
              </span>
            </button>
            <p className="text-center text-[0.66rem] text-[var(--d-metal)]">{content.reserveNote}</p>
          </div>
        </div>
      </div>

      {/* success overlay */}
      <AnimatePresence>
        {reserved && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9000] flex items-center justify-center bg-black/80 p-5 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={reduced ? false : { scale: 0.94, y: 12 }}
              animate={{ scale: 1, y: 0 }}
              exit={reduced ? undefined : { scale: 0.94, opacity: 0 }}
              className="relative w-full max-w-md overflow-hidden border border-[var(--d-line)] bg-[var(--d-surface)] p-8"
            >
              <CarbonTexture opacity={0.4} />
              <div className="relative">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--d-accent)]">
                  <Check className="h-6 w-6 text-white" strokeWidth={2.5} />
                </span>
                <h3 className="[font-family:var(--demo-display)] mt-5 text-2xl uppercase text-[var(--d-ink)]">
                  {content.successTitle}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--d-ink-soft)]">{content.successBody}</p>

                <dl className="mt-6 space-y-2 border-y border-[var(--d-line)] py-4 text-sm">
                  <Row label={content.trimLabel} value={`${trim.name} · ${trim.power}`} />
                  <Row label={content.colorLabel} value={`${color.name} · ${color.finish}`} />
                  <Row label={content.wheelLabel} value={wheel.name} />
                  <div className="flex items-center justify-between pt-1">
                    <dt className="text-[var(--d-metal)]">{content.totalLabel}</dt>
                    <dd className="[font-family:var(--demo-display)] text-lg text-[var(--d-ink)] tabular-nums">
                      {fmt(total)}
                    </dd>
                  </div>
                </dl>

                <button
                  type="button"
                  onClick={() => setReserved(false)}
                  className="mt-6 flex w-full items-center justify-center gap-2 border border-[var(--d-line)] px-5 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[var(--d-ink)] transition-colors hover:border-[var(--d-metal)]"
                >
                  <RotateCcw className="h-3.5 w-3.5" strokeWidth={2} />
                  {content.reset}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-[var(--d-metal)]">{label}</dt>
      <dd className="text-right font-medium text-[var(--d-ink)]">{value}</dd>
    </div>
  );
}
