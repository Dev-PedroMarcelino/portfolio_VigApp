"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, CircleCheck, Minus, Plus, ShieldCheck } from "lucide-react";
import type { HaloContent, PricingContent } from "./content";
import { HaloRing } from "./halo-ring";
import { formatPrice, SectionHeading } from "./ui";

const MAX_QTY = 4;
const BUNDLE_RATE = 0.1;

export function Pricing({
  content,
  intlLocale,
  currency,
}: {
  content: PricingContent;
  intlLocale: HaloContent["intlLocale"];
  currency: HaloContent["currency"];
}) {
  const reduce = useReducedMotion() ?? false;
  const [finishId, setFinishId] = useState(content.finishes[0].id);
  const [qty, setQty] = useState(1);
  const [reserved, setReserved] = useState(false);

  const finish = content.finishes.find((f) => f.id === finishId) ?? content.finishes[0];
  const unit = content.basePrice + finish.delta;
  const subtotal = unit * qty;
  const bundleActive = qty >= 2;
  const bundleSaving = bundleActive ? Math.round(subtotal * BUNDLE_RATE) : 0;
  const total = subtotal - bundleSaving;
  const money = (n: number) => formatPrice(n, intlLocale, currency);

  return (
    <section id="pricing" className="relative scroll-mt-24 px-5 py-24 md:py-32">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 opacity-60"
        aria-hidden
        style={{ background: "radial-gradient(50% 60% at 50% 0%, rgba(126,231,199,0.12), transparent 70%)" }}
      />
      <div className="flex justify-center">
        <SectionHeading label={content.label} title={content.title} intro={content.intro} />
      </div>

      <div className="mx-auto mt-14 grid max-w-5xl gap-6 lg:grid-cols-[1fr_1fr] lg:gap-8">
        {/* Configurator */}
        <div className="rounded-[2rem] border border-[var(--d-line)] bg-[var(--d-panel)] p-7 sm:p-9">
          <div className="relative mx-auto flex h-44 w-44 items-center justify-center">
            <div
              className="pointer-events-none absolute inset-0 rounded-full opacity-50 blur-2xl transition-colors"
              style={{ backgroundColor: `${finish.face}55` }}
              aria-hidden
            />
            <HaloRing band={finish.band} face={finish.face} spin={false} className="relative h-auto w-44" />
          </div>

          {/* Finish selector */}
          <fieldset className="mt-8">
            <legend className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[var(--d-ink-faint)]">
              {content.finishLabel}
            </legend>
            <div className="mt-4 flex flex-wrap gap-3">
              {content.finishes.map((f) => {
                const selected = f.id === finishId;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFinishId(f.id)}
                    aria-pressed={selected}
                    aria-label={f.name}
                    className="group relative flex flex-col items-center gap-2"
                  >
                    <span
                      className="grid h-11 w-11 place-items-center rounded-full border-2 transition-all"
                      style={{
                        borderColor: selected ? "var(--d-accent)" : "var(--d-line-bright)",
                        transform: selected ? "scale(1.06)" : "scale(1)",
                      }}
                    >
                      <span className="h-7 w-7 rounded-full" style={{ backgroundColor: f.band }} />
                    </span>
                    <span
                      className={`text-[0.7rem] ${selected ? "text-[var(--d-ink)]" : "text-[var(--d-ink-faint)]"}`}
                    >
                      {f.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          {/* Quantity stepper */}
          <div className="mt-8 flex items-center justify-between">
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[var(--d-ink-faint)]">
              {content.quantityLabel}
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                disabled={qty <= 1}
                aria-label={content.decrease}
                className="grid h-9 w-9 place-items-center rounded-full border border-[var(--d-line-bright)] text-[var(--d-ink)] transition-colors hover:border-[var(--d-accent)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Minus className="h-4 w-4" strokeWidth={2.2} />
              </button>
              <span className="w-6 text-center [font-family:var(--demo-display)] text-lg font-medium tabular-nums text-[var(--d-ink)]">
                {qty}
              </span>
              <button
                type="button"
                onClick={() => setQty((q) => Math.min(MAX_QTY, q + 1))}
                disabled={qty >= MAX_QTY}
                aria-label={content.increase}
                className="grid h-9 w-9 place-items-center rounded-full border border-[var(--d-line-bright)] text-[var(--d-ink)] transition-colors hover:border-[var(--d-accent)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Plus className="h-4 w-4" strokeWidth={2.2} />
              </button>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="flex flex-col rounded-[2rem] border border-[var(--d-line)] bg-[var(--d-bg-raise)] p-7 sm:p-9">
          <div>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[var(--d-ink-faint)]">
              {content.includesTitle}
            </p>
            <ul className="mt-4 space-y-2.5">
              {content.includes.map((inc) => (
                <li key={inc} className="flex items-start gap-2.5 text-sm text-[var(--d-ink-dim)]">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--d-accent)]" strokeWidth={2.4} aria-hidden />
                  {inc}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 rounded-2xl border border-[var(--d-line)] bg-[var(--d-panel)] p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-[var(--d-ink)]">{content.membershipName}</span>
              <span className="text-[var(--d-ink)]">
                {money(content.membershipPrice)}
                <span className="text-[var(--d-ink-faint)]">{content.perMonth}</span>
              </span>
            </div>
            <p className="mt-1.5 text-xs text-[var(--d-ink-faint)]">{content.membershipNote}</p>
          </div>

          <dl className="mt-6 space-y-2.5 border-t border-[var(--d-line)] pt-5 text-sm">
            <div className="flex justify-between text-[var(--d-ink-dim)]">
              <dt>
                {content.subtotalLabel} · {qty} × {money(unit)}
              </dt>
              <dd className="tabular-nums text-[var(--d-ink)]">{money(subtotal)}</dd>
            </div>
            <div
              className={`flex justify-between transition-opacity ${bundleActive ? "opacity-100" : "opacity-45"}`}
            >
              <dt className="text-[var(--d-accent)]">{content.bundleLabel}</dt>
              <dd className="tabular-nums text-[var(--d-accent)]">
                {bundleActive ? `-${money(bundleSaving)}` : money(0)}
              </dd>
            </div>
            {!bundleActive ? (
              <p className="text-xs text-[var(--d-ink-faint)]">{content.bundleNote}</p>
            ) : null}
            <div className="flex items-baseline justify-between border-t border-[var(--d-line)] pt-3">
              <dt className="[font-family:var(--demo-display)] text-base font-medium text-[var(--d-ink)]">
                {content.totalLabel}
              </dt>
              <dd className="[font-family:var(--demo-display)] text-2xl font-medium tabular-nums text-[var(--d-ink)]">
                {money(total)}
              </dd>
            </div>
          </dl>

          <AnimatePresence mode="wait" initial={false}>
            {reserved ? (
              <motion.div
                key="done"
                initial={reduce ? undefined : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0 }}
                className="mt-6 rounded-2xl border border-[var(--d-accent)]/40 bg-[var(--d-accent)]/10 p-5 text-center"
              >
                <CircleCheck className="mx-auto h-8 w-8 text-[var(--d-accent)]" strokeWidth={1.8} aria-hidden />
                <p className="mt-3 [font-family:var(--demo-display)] text-lg font-medium text-[var(--d-ink)]">
                  {content.reservedTitle}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--d-ink-dim)]">{content.reservedBody}</p>
                <button
                  type="button"
                  onClick={() => setReserved(false)}
                  className="mt-4 text-sm font-medium text-[var(--d-accent)] underline-offset-4 hover:underline"
                >
                  {content.reservedReset}
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="cta"
                initial={reduce ? undefined : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduce ? undefined : { opacity: 0 }}
                className="mt-6"
              >
                <button
                  type="button"
                  onClick={() => setReserved(true)}
                  className="w-full rounded-full bg-[var(--d-accent)] px-6 py-3.5 text-sm font-semibold text-[#08130F] shadow-[0_0_40px_-10px_rgba(126,231,199,0.7)] transition-transform hover:scale-[1.02]"
                >
                  {content.cta} · {money(total)}
                </button>
                <p className="mt-3 flex items-center justify-center gap-2 text-center text-xs text-[var(--d-ink-faint)]">
                  <ShieldCheck className="h-3.5 w-3.5 text-[var(--d-accent)]" strokeWidth={1.8} aria-hidden />
                  {content.guarantee}
                </p>
                <p className="mt-1.5 text-center text-xs text-[var(--d-ink-faint)]">{content.sizingNote}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
