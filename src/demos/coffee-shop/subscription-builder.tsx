"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Package } from "lucide-react";
import type { SubscriptionContent } from "./content";
import { SectionLabel } from "./ui";

const BEANS_IMG =
  "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1200&q=80";

export function SubscriptionBuilder({ content }: { content: SubscriptionContent }) {
  const [sizeId, setSizeId] = useState(content.sizes[1].id);
  const [freqId, setFreqId] = useState(content.frequencies[1].id);
  const [confirmed, setConfirmed] = useState(false);
  const reduce = useReducedMotion() ?? false;

  const size = content.sizes.find((s) => s.id === sizeId) ?? content.sizes[0];
  const freq = content.frequencies.find((f) => f.id === freqId) ?? content.frequencies[0];

  const format = useMemo(
    () =>
      new Intl.NumberFormat(content.priceLocale, {
        style: "currency",
        currency: content.currency,
        maximumFractionDigits: 0,
      }),
    [content.priceLocale, content.currency],
  );

  const perDelivery = Math.round(size.pricePerDelivery * (1 - freq.discountPct / 100));
  const monthly = Math.round(perDelivery * freq.deliveriesPerMonth);

  return (
    <section
      id="subscription"
      className="scroll-mt-20 bg-[var(--d-dark-soft)] px-5 py-20 text-[var(--d-sand)] md:py-28"
    >
      <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-[1fr_1.05fr]">
        <div>
          <SectionLabel text={content.label} tone="light" />
          <h2 className="mt-5 [font-family:var(--demo-display)] text-4xl tracking-tight md:text-5xl">
            {content.title}
          </h2>
          <p className="mt-4 max-w-md leading-[1.85] text-[var(--d-sand-dim)]">{content.intro}</p>
          <ul className="mt-8 space-y-3.5">
            {content.includes.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-[var(--d-sand)]">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#D9906A]/20 text-[#D9906A]">
                  <Check className="h-3 w-3" strokeWidth={2.6} aria-hidden />
                </span>
                {item}
              </li>
            ))}
          </ul>
          <div className="relative mt-10 h-48 overflow-hidden rounded-[2rem]">
            <Image
              src={BEANS_IMG}
              alt={content.imageAlt}
              fill
              sizes="(min-width: 1024px) 520px, 92vw"
              className="object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(105deg, rgba(47,32,19,0.66) 0%, rgba(47,32,19,0.12) 60%, rgba(111,78,55,0.2) 100%)",
              }}
              aria-hidden
            />
          </div>
        </div>

        <div className="rounded-[2rem] bg-[var(--d-cream)] p-7 text-[var(--d-ink)] shadow-2xl shadow-black/30 md:p-9">
          <AnimatePresence mode="wait">
            {!confirmed ? (
              <motion.div
                key="builder"
                initial={reduce ? undefined : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduce ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <fieldset>
                  <legend className="text-[0.66rem] font-bold uppercase tracking-[0.24em] text-[var(--d-accent)]">
                    {content.sizeLabel}
                  </legend>
                  <div className="mt-3 grid grid-cols-3 gap-2.5">
                    {content.sizes.map((option) => {
                      const selected = option.id === sizeId;
                      return (
                        <button
                          key={option.id}
                          type="button"
                          aria-pressed={selected}
                          onClick={() => setSizeId(option.id)}
                          className={`rounded-2xl border-2 p-4 text-center transition-all ${
                            selected
                              ? "border-[var(--d-accent)] bg-[var(--d-bg)] shadow-sm"
                              : "border-[var(--d-line)] hover:border-[var(--d-accent)]/50"
                          }`}
                        >
                          <span className="block [font-family:var(--demo-display)] text-xl tracking-tight">
                            {option.label}
                          </span>
                          <span className="mt-1 block text-[0.68rem] text-[var(--d-ink-soft)]">
                            {option.cups}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <fieldset className="mt-7">
                  <legend className="text-[0.66rem] font-bold uppercase tracking-[0.24em] text-[var(--d-accent)]">
                    {content.freqLabel}
                  </legend>
                  <div className="mt-3 grid gap-2.5 sm:grid-cols-3">
                    {content.frequencies.map((option) => {
                      const selected = option.id === freqId;
                      return (
                        <button
                          key={option.id}
                          type="button"
                          aria-pressed={selected}
                          onClick={() => setFreqId(option.id)}
                          className={`rounded-2xl border-2 p-4 text-left transition-all sm:text-center ${
                            selected
                              ? "border-[var(--d-accent)] bg-[var(--d-bg)] shadow-sm"
                              : "border-[var(--d-line)] hover:border-[var(--d-accent)]/50"
                          }`}
                        >
                          <span className="block text-sm font-bold">{option.label}</span>
                          <span
                            className={`mt-1 block text-[0.66rem] font-bold uppercase tracking-[0.12em] ${
                              option.discountPct > 0 ? "text-[var(--d-terra)]" : "text-[var(--d-ink-soft)]"
                            }`}
                          >
                            {option.note}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <div className="mt-8 border-t border-[var(--d-line)] pt-6">
                  <div className="flex items-baseline justify-between text-sm text-[var(--d-ink-soft)]">
                    <span>{content.perDelivery}</span>
                    <span className="flex items-baseline gap-2">
                      {freq.discountPct > 0 && (
                        <s className="text-[0.78rem] opacity-60">{format.format(size.pricePerDelivery)}</s>
                      )}
                      <span className="font-bold text-[var(--d-ink)]">{format.format(perDelivery)}</span>
                    </span>
                  </div>
                  <div className="mt-3 flex items-baseline justify-between">
                    <span className="text-sm text-[var(--d-ink-soft)]">{content.perMonth}</span>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={monthly}
                        initial={reduce ? undefined : { opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduce ? undefined : { opacity: 0, y: -10 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="[font-family:var(--demo-display)] text-4xl italic tracking-tight text-[var(--d-ink)]"
                      >
                        {format.format(monthly)}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setConfirmed(true)}
                  className="mt-7 w-full rounded-full bg-[var(--d-accent)] py-4 text-[0.74rem] font-bold uppercase tracking-[0.2em] text-[var(--d-cream)] transition-transform hover:scale-[1.02]"
                >
                  {content.cta}
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={reduce ? undefined : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex min-h-[430px] flex-col"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--d-accent)] text-[var(--d-cream)]">
                  <Package className="h-6 w-6" strokeWidth={1.8} aria-hidden />
                </span>
                <h3 className="mt-6 [font-family:var(--demo-display)] text-3xl italic tracking-tight">
                  {content.successTitle}
                </h3>
                <p className="mt-4 max-w-md leading-[1.8] text-[var(--d-ink-soft)]">
                  {content.successBody}
                </p>
                <div className="mt-8 rounded-2xl border border-[var(--d-line)] bg-[var(--d-bg)] p-5">
                  <p className="text-[0.62rem] font-bold uppercase tracking-[0.24em] text-[var(--d-accent)]">
                    {content.yourPlan}
                  </p>
                  <div className="mt-3 flex items-baseline justify-between text-sm">
                    <span className="font-bold">{size.label}</span>
                    <span className="text-[var(--d-ink-soft)]">{size.cups}</span>
                  </div>
                  <div className="mt-2 flex items-baseline justify-between text-sm">
                    <span className="font-bold">{freq.label}</span>
                    <span className="text-[var(--d-ink-soft)]">{freq.note}</span>
                  </div>
                  <div className="mt-4 flex items-baseline justify-between border-t border-[var(--d-line)] pt-4">
                    <span className="text-sm text-[var(--d-ink-soft)]">{content.perMonth}</span>
                    <span className="[font-family:var(--demo-display)] text-2xl italic">
                      {format.format(monthly)}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setConfirmed(false)}
                  className="mt-auto pt-7 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-[var(--d-accent)] underline-offset-4 hover:underline"
                >
                  {content.reset}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
