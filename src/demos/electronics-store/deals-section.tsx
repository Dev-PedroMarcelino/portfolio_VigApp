"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Headphones, Laptop, Plus, Smartphone, Timer, Watch } from "lucide-react";
import type { DealsContent, ProductIcon } from "./content";
import { DEAL_DEADLINE_ISO } from "./content";
import { SectionLabel } from "./ui";

const DEADLINE = new Date(DEAL_DEADLINE_ISO).getTime();

const ICONS: Record<ProductIcon, typeof Laptop> = {
  laptop: Laptop,
  phone: Smartphone,
  audio: Headphones,
  watch: Watch,
};

interface Remaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function splitRemaining(ms: number): Remaining {
  const total = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

export function DealsSection({
  content,
  priceLocale,
  currency,
  cartQty,
  onAdd,
}: {
  content: DealsContent;
  priceLocale: string;
  currency: string;
  cartQty: (id: string) => number;
  onAdd: (id: string) => void;
}) {
  const reduce = useReducedMotion() ?? false;
  const [remaining, setRemaining] = useState<Remaining | null>(null);
  const [justAdded, setJustAdded] = useState<string | null>(null);

  const format = useMemo(
    () =>
      new Intl.NumberFormat(priceLocale, {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
      }),
    [priceLocale, currency],
  );

  useEffect(() => {
    const tick = () => setRemaining(splitRemaining(DEADLINE - Date.now()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (!justAdded) return;
    const id = window.setTimeout(() => setJustAdded(null), 1600);
    return () => window.clearTimeout(id);
  }, [justAdded]);

  const over =
    remaining !== null &&
    remaining.days === 0 &&
    remaining.hours === 0 &&
    remaining.minutes === 0 &&
    remaining.seconds === 0;

  const segments: { value: string; label: string }[] = [
    { value: remaining ? String(remaining.days).padStart(2, "0") : "--", label: content.units.days },
    { value: remaining ? String(remaining.hours).padStart(2, "0") : "--", label: content.units.hours },
    { value: remaining ? String(remaining.minutes).padStart(2, "0") : "--", label: content.units.minutes },
    { value: remaining ? String(remaining.seconds).padStart(2, "0") : "--", label: content.units.seconds },
  ];

  return (
    <section id="deals" className="scroll-mt-20 px-5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <SectionLabel text={content.label} />
            <h2 className="mt-5 [font-family:var(--demo-display)] text-3xl font-bold tracking-tight text-[var(--d-ink)] md:text-5xl">
              {content.title}
            </h2>
            <p className="mt-4 max-w-lg leading-[1.8] text-[var(--d-ink-dim)]">{content.intro}</p>
          </div>

          <div
            className="rounded-2xl border border-[var(--d-warn)]/30 bg-[var(--d-warn)]/5 p-5"
            role="timer"
            aria-live="off"
          >
            <p className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.26em] text-[var(--d-warn)]">
              <Timer className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden />
              {over ? content.ended : content.endsIn}
            </p>
            <div className="mt-3 flex items-start gap-2.5">
              {segments.map((seg, i) => (
                <div key={seg.label} className="flex items-start gap-2.5">
                  {i > 0 && (
                    <span className="pt-1.5 font-mono text-lg text-[var(--d-ink-dim)]" aria-hidden>
                      :
                    </span>
                  )}
                  <div className="text-center">
                    <span className="block min-w-[3.2rem] rounded-lg border border-[var(--d-line)] bg-[var(--d-bg-soft)] px-2 py-2 font-mono text-2xl font-bold tabular-nums text-[var(--d-ink)]">
                      {seg.value}
                    </span>
                    <span className="mt-1.5 block text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-[var(--d-ink-dim)]">
                      {seg.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {content.products.map((product, i) => {
            const Icon = ICONS[product.icon];
            const qty = cartQty(product.id);
            const added = justAdded === product.id;
            return (
              <motion.article
                key={product.id}
                initial={reduce ? undefined : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group flex flex-col rounded-3xl border border-[var(--d-line)] bg-[var(--d-panel)]/60 p-6 transition-colors hover:border-[var(--d-accent)]/40"
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--d-accent)]/25 to-[var(--d-violet)]/25 text-[var(--d-accent)] shadow-[inset_0_0_20px_rgba(0,212,255,0.12)]">
                    <Icon className="h-6 w-6" strokeWidth={1.7} aria-hidden />
                  </span>
                  <span className="rounded-full bg-[var(--d-warn)]/15 px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.14em] text-[var(--d-warn)]">
                    {product.dealTag}
                  </span>
                </div>

                <h3 className="mt-5 [font-family:var(--demo-display)] text-xl font-bold tracking-tight text-[var(--d-ink)]">
                  Voltix {product.name}
                </h3>
                <p className="mt-2 flex-1 text-[0.78rem] leading-relaxed text-[var(--d-ink-dim)]">
                  {product.blurb}
                </p>

                <p className="mt-5 flex items-baseline gap-2.5">
                  <span className="[font-family:var(--demo-display)] text-2xl font-bold tracking-tight text-[var(--d-ink)]">
                    {format.format(product.price)}
                  </span>
                  <s className="text-sm text-[var(--d-ink-dim)]">
                    {format.format(product.wasPrice)}
                  </s>
                </p>

                <div className="mt-4">
                  <div className="h-1.5 overflow-hidden rounded-full bg-[var(--d-bg)]">
                    <motion.div
                      initial={reduce ? { width: `${product.claimedPct}%` } : { width: 0 }}
                      whileInView={{ width: `${product.claimedPct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full rounded-full"
                      style={{
                        background: "linear-gradient(90deg, #FFB454, #FF4ECD)",
                        boxShadow: "0 0 10px rgba(255,180,84,0.5)",
                      }}
                    />
                  </div>
                  <p className="mt-1.5 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[var(--d-ink-dim)]">
                    {product.claimedLabel}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onAdd(product.id);
                    setJustAdded(product.id);
                  }}
                  aria-label={`${content.addToCart}: Voltix ${product.name}`}
                  className={`mt-5 flex items-center justify-center gap-2 rounded-full py-3.5 text-[0.68rem] font-bold uppercase tracking-[0.18em] transition-all ${
                    added
                      ? "bg-[var(--d-good)] text-[#04101C]"
                      : "border border-[var(--d-accent)]/50 text-[var(--d-accent)] hover:bg-[var(--d-accent)] hover:text-[#04101C]"
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="h-3.5 w-3.5" strokeWidth={2.8} aria-hidden />
                      {content.added}
                      {qty > 0 && <span className="font-mono">({qty})</span>}
                    </>
                  ) : (
                    <>
                      <Plus className="h-3.5 w-3.5" strokeWidth={2.8} aria-hidden />
                      {content.addToCart}
                    </>
                  )}
                </button>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
