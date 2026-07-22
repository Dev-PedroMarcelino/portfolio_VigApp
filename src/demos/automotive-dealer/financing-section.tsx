"use client";

import { useEffect, useMemo, useState } from "react";
import * as Slider from "@radix-ui/react-slider";
import { animate, motion, useMotionValue, useMotionValueEvent } from "framer-motion";
import { useReducedMotionSafe as useReducedMotion } from "@/components/demos/use-reduced-motion-safe";
import { ChevronDown, Info, MessageCircle, Percent } from "lucide-react";
import type { BarcellosContent } from "./content";
import { DOWN_MAX, DOWN_MIN, FEATURED, MONTHLY_RATE, TERM_OPTIONS, VEHICLES, waLink } from "./content";
import { FOCUS, Reveal, SectionLabel, fmtBRL, fmtBRLCents } from "./ui";

/** French amortization (Tabela Price): pmt = PV·i / (1 − (1+i)^−n). */
function priceInstallment(pv: number, i: number, n: number): number {
  if (pv <= 0) return 0;
  return (pv * i) / (1 - Math.pow(1 + i, -n));
}

/** Number that rolls to its new value; snaps instantly under reduced motion. */
function AnimatedMoney({ value, reduced }: { value: number; reduced: boolean }) {
  const mv = useMotionValue(value);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    if (reduced) {
      mv.set(value);
      setShown(value);
      return;
    }
    const controls = animate(mv, value, { duration: 0.55, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [value, reduced, mv]);

  useMotionValueEvent(mv, "change", (v) => setShown(v));

  return <>{fmtBRLCents(shown)}</>;
}

export function FinancingSection({ content }: { content: BarcellosContent["financing"] }) {
  const reduced = useReducedMotion() ?? false;

  const [vehicleId, setVehicleId] = useState<string>(FEATURED.id);
  const [customValue, setCustomValue] = useState<string>("250000");
  const [downPct, setDownPct] = useState(30);
  const [term, setTerm] = useState<number>(48);

  const price = useMemo(() => {
    if (vehicleId === "custom") {
      const parsed = Number(customValue.replace(/\D/g, ""));
      return Number.isFinite(parsed) ? parsed : 0;
    }
    if (vehicleId === FEATURED.id) return FEATURED.price;
    return VEHICLES.find((v) => v.id === vehicleId)?.price ?? 0;
  }, [vehicleId, customValue]);

  const down = (price * downPct) / 100;
  const financed = price - down;
  const installment = priceInstallment(financed, MONTHLY_RATE, term);
  const contractTotal = installment * term;
  /** Effective annual rate from the monthly rate — shown as an approximation. */
  const cetYear = (Math.pow(1 + MONTHLY_RATE, 12) - 1) * 100;

  const carLabel =
    vehicleId === "custom"
      ? fmtBRL(price)
      : vehicleId === FEATURED.id
        ? `${FEATURED.name} ${FEATURED.year}`
        : (() => {
            const v = VEHICLES.find((x) => x.id === vehicleId);
            return v ? `${v.brandLabel} ${v.name} ${v.year}` : "";
          })();

  const whatsMsg = content.whatsappMsg
    .replace("{car}", carLabel)
    .replace("{down}", fmtBRL(down))
    .replace("{n}", String(term))
    .replace("{pmt}", fmtBRLCents(installment));

  return (
    <section id="financiamento" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-24">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--d-line)] to-transparent"
      />
      {/* Champagne ambience behind the result panel */}
      <div
        aria-hidden
        className="absolute right-[-12rem] top-1/3 h-[420px] w-[560px] rounded-full opacity-35 blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(217,164,65,0.28), transparent 70%)" }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-5">
        <Reveal>
          <SectionLabel text={content.label} />
          <h2 className="mt-4 max-w-xl text-[1.8rem] font-semibold leading-tight tracking-tight text-[var(--d-ink)] [font-family:var(--demo-display)] sm:text-[2.3rem]">
            {content.title}
          </h2>
          <p className="mt-3 max-w-2xl text-[0.92rem] leading-relaxed text-[var(--d-ink-soft)]">{content.subtitle}</p>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Controls */}
          <Reveal className="rounded-3xl border border-[var(--d-line)] bg-[var(--d-surface)] p-6 sm:p-8">
            {/* Vehicle */}
            <label className="block">
              <span className="mb-2.5 block text-[0.64rem] uppercase tracking-[0.22em] text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]">
                {content.vehicleLabel}
              </span>
              <span className="relative block">
                <select
                  value={vehicleId}
                  onChange={(e) => setVehicleId(e.target.value)}
                  className={`h-12 w-full cursor-pointer appearance-none rounded-xl border border-[var(--d-line)] bg-[var(--d-panel)] pl-4 pr-10 text-[0.88rem] text-[var(--d-ink)] transition-colors hover:border-[var(--d-gold)]/40 ${FOCUS}`}
                >
                  <option value={FEATURED.id}>
                    {FEATURED.name} {FEATURED.year} — {fmtBRL(FEATURED.price)}
                  </option>
                  {VEHICLES.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.brandLabel} {v.name} {v.year} — {fmtBRL(v.price)}
                    </option>
                  ))}
                  <option value="custom">{content.customOption}</option>
                </select>
                <ChevronDown
                  aria-hidden
                  className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--d-ink-soft)]"
                  strokeWidth={1.8}
                />
              </span>
            </label>

            {vehicleId === "custom" && (
              <label className="mt-4 block">
                <span className="mb-2.5 block text-[0.64rem] uppercase tracking-[0.22em] text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]">
                  {content.customLabel}
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={customValue}
                  onChange={(e) => setCustomValue(e.target.value.replace(/[^\d]/g, ""))}
                  className={`h-12 w-full rounded-xl border border-[var(--d-line)] bg-[var(--d-panel)] px-4 text-[0.95rem] text-[var(--d-ink)] [font-family:var(--demo-mono)] placeholder:text-[var(--d-ink-soft)]/60 ${FOCUS}`}
                  placeholder="250000"
                />
              </label>
            )}

            {/* Down payment slider */}
            <div className="mt-8">
              <div className="mb-3 flex items-baseline justify-between gap-3">
                <span className="text-[0.64rem] uppercase tracking-[0.22em] text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]">
                  {content.downLabel}{" "}
                  <span className="ml-1 normal-case tracking-normal text-[var(--d-ink-soft)]/70">
                    · {content.downHint}
                  </span>
                </span>
                <span className="text-[0.95rem] font-semibold text-[var(--d-gold)] [font-family:var(--demo-mono)]">
                  {downPct}% · {fmtBRL(down)}
                </span>
              </div>
              <Slider.Root
                value={[downPct]}
                onValueChange={([v]) => setDownPct(v)}
                min={DOWN_MIN}
                max={DOWN_MAX}
                step={5}
                className="relative flex h-6 w-full touch-none select-none items-center"
              >
                <Slider.Track className="relative h-[5px] grow rounded-full bg-[var(--d-line)]">
                  <Slider.Range className="absolute h-full rounded-full bg-gradient-to-r from-[var(--d-gold-deep)] to-[var(--d-gold)]" />
                </Slider.Track>
                <Slider.Thumb
                  aria-label={content.downLabel}
                  className={`block h-5 w-5 cursor-grab rounded-full border-2 border-[var(--d-gold)] bg-[#0A0B0E] shadow-[0_0_16px_rgba(217,164,65,0.5)] transition-transform hover:scale-110 active:cursor-grabbing ${FOCUS}`}
                />
              </Slider.Root>
              <div className="mt-2 flex justify-between text-[0.66rem] text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]">
                <span>{DOWN_MIN}%</span>
                <span>{DOWN_MAX}%</span>
              </div>
            </div>

            {/* Term chips */}
            <fieldset className="mt-8">
              <legend className="mb-3 text-[0.64rem] uppercase tracking-[0.22em] text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]">
                {content.termLabel}
              </legend>
              <div className="grid grid-cols-4 gap-2" role="group" aria-label={content.termLabel}>
                {TERM_OPTIONS.map((t) => {
                  const active = term === t;
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTerm(t)}
                      aria-pressed={active}
                      className={`rounded-xl border px-2 py-3 text-center transition-colors ${FOCUS} ${
                        active
                          ? "border-[var(--d-gold)] bg-[var(--d-gold)]/10 text-[var(--d-gold)]"
                          : "border-[var(--d-line)] bg-[var(--d-panel)] text-[var(--d-silver)] hover:border-[var(--d-gold)]/40"
                      }`}
                    >
                      <span className="block text-[1.05rem] font-semibold leading-none [font-family:var(--demo-mono)]">
                        {t}
                      </span>
                      <span className="mt-1 block text-[0.62rem] uppercase tracking-[0.14em]">{content.termUnit}</span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <p className="mt-7 flex items-center gap-2 rounded-xl border border-[var(--d-line)] bg-[var(--d-panel)] px-4 py-3 text-[0.78rem] text-[var(--d-silver)]">
              <Percent className="h-4 w-4 shrink-0 text-[var(--d-gold)]" strokeWidth={1.8} aria-hidden />
              {content.rateLabel}{" "}
              <strong className="font-semibold text-[var(--d-ink)] [font-family:var(--demo-mono)]">
                {content.rateValue}
              </strong>
            </p>
          </Reveal>

          {/* Result */}
          <Reveal delay={0.1} className="flex">
            <div className="relative flex w-full flex-col overflow-hidden rounded-3xl border border-[var(--d-gold)]/25 bg-gradient-to-b from-[var(--d-surface)] to-[#15130D] p-6 sm:p-8">
              <div
                aria-hidden
                className="absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-40 blur-3xl"
                style={{ background: "radial-gradient(circle, rgba(217,164,65,0.4), transparent 70%)" }}
              />

              <p className="text-[0.64rem] uppercase tracking-[0.22em] text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]">
                {content.installmentLabel}
              </p>
              <p
                aria-live="polite"
                className="mt-3 text-[2.3rem] font-semibold leading-none tracking-tight text-[var(--d-gold)] [font-family:var(--demo-mono)] sm:text-[2.9rem]"
              >
                <AnimatedMoney value={installment} reduced={reduced} />
                <span className="ml-1.5 text-[0.9rem] font-normal text-[var(--d-ink-soft)]">{content.perMonth}</span>
              </p>

              <dl className="mt-8 space-y-3.5 border-t border-[var(--d-line)] pt-6 text-[0.85rem]">
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-[var(--d-ink-soft)]">{content.downLabel}</dt>
                  <dd className="font-medium text-[var(--d-ink)] [font-family:var(--demo-mono)]">{fmtBRL(down)}</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-[var(--d-ink-soft)]">{content.financedLabel}</dt>
                  <dd className="font-medium text-[var(--d-ink)] [font-family:var(--demo-mono)]">{fmtBRL(financed)}</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-[var(--d-ink-soft)]">{content.totalLabel}</dt>
                  <dd className="font-medium text-[var(--d-ink)] [font-family:var(--demo-mono)]">
                    {fmtBRL(contractTotal)}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-[var(--d-ink-soft)]">{content.cetLabel}</dt>
                  <dd className="font-medium text-[var(--d-ink)] [font-family:var(--demo-mono)]">
                    ≈ {cetYear.toFixed(1).replace(".", ",")}% a.a.
                  </dd>
                </div>
              </dl>

              <motion.a
                href={waLink(whatsMsg)}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={reduced ? undefined : { scale: 1.02 }}
                whileTap={reduced ? undefined : { scale: 0.98 }}
                className={`mt-8 flex items-center justify-center gap-2 rounded-full bg-[var(--d-gold)] px-6 py-3.5 text-[0.9rem] font-semibold text-[#141008] shadow-[0_0_30px_rgba(217,164,65,0.3)] ${FOCUS}`}
              >
                <MessageCircle className="h-4 w-4" strokeWidth={2} />
                {content.cta}
              </motion.a>

              <p className="mt-5 flex items-start gap-2 text-[0.7rem] leading-relaxed text-[var(--d-ink-soft)]">
                <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--d-gold)]/70" strokeWidth={1.8} aria-hidden />
                {content.disclaimer}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
