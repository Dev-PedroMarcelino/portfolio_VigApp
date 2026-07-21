"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Calculator } from "lucide-react";
import type { AltureContent } from "./content";
import type { FormatFn } from "./alture";

function RangeInput({
  id,
  min,
  max,
  step,
  value,
  onChange,
  ariaLabel,
}: {
  id: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  ariaLabel: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <input
      id={id}
      type="range"
      aria-label={ariaLabel}
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(event) => onChange(Number(event.target.value))}
      className="alture-range h-1 w-full cursor-pointer appearance-none rounded-full outline-none"
      style={{
        background: `linear-gradient(90deg, var(--d-gold) 0%, var(--d-gold) ${pct}%, rgba(244,239,230,0.16) ${pct}%, rgba(244,239,230,0.16) 100%)`,
      }}
    />
  );
}

export function Journey({
  content,
  format,
  intlLocale,
}: {
  content: AltureContent["journey"];
  format: FormatFn;
  intlLocale: string;
}) {
  const reduceMotion = useReducedMotion();
  const calc = content.calc;
  const [price, setPrice] = useState(calc.defaultPrice);
  const [down, setDown] = useState(calc.defaultDown);
  const [years, setYears] = useState(calc.defaultYears);

  const percentFmt = useMemo(
    () => new Intl.NumberFormat(intlLocale, { style: "percent", maximumFractionDigits: 1 }),
    [intlLocale],
  );

  const { monthly, loan, downValue } = useMemo(() => {
    const downValueRaw = (price * down) / 100;
    const principal = price - downValueRaw;
    const monthlyRate = calc.rate / 12;
    const months = years * 12;
    const payment =
      monthlyRate === 0
        ? principal / months
        : (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
    return { monthly: payment, loan: principal, downValue: downValueRaw };
  }, [price, down, years, calc.rate]);

  return (
    <section
      id="journey"
      className="scroll-mt-24 border-y border-[var(--d-line-soft)] bg-[var(--d-bg-deep)] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.4em] text-[var(--d-gold)]">
            <span aria-hidden className="h-px w-8 bg-[var(--d-line)]" />
            {content.eyebrow}
          </p>
          <h2 className="mt-5 [font-family:var(--demo-display)] text-4xl font-medium text-[var(--d-ivory)] sm:text-5xl">
            {content.title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[var(--d-ink-soft)]">{content.intro}</p>
        </div>

        <div className="mt-14 grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          {/* Steps */}
          <ol className="relative">
            <span
              aria-hidden
              className="absolute bottom-4 left-[15px] top-4 w-px bg-[var(--d-line-soft)]"
            />
            {content.steps.map((step, index) => (
              <motion.li
                key={step.numeral}
                initial={reduceMotion ? false : { opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: Math.min(index * 0.1, 0.4), ease: [0.16, 1, 0.3, 1] }}
                className="relative flex gap-5 pb-9 last:pb-0"
              >
                <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--d-gold)] bg-[var(--d-bg-deep)] [font-family:var(--demo-display)] text-xs text-[var(--d-gold-bright)]">
                  {step.numeral}
                </span>
                <div className="-mt-0.5">
                  <h3 className="[font-family:var(--demo-display)] text-xl font-medium text-[var(--d-ivory)]">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--d-ink-soft)]">
                    {step.body}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>

          {/* Calculator */}
          <div className="border border-[var(--d-line)] bg-[var(--d-bg-soft)] p-7 sm:p-8">
            <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.28em] text-[var(--d-gold)]">
              <Calculator className="h-4 w-4" strokeWidth={1.6} aria-hidden />
              {calc.title}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[var(--d-ink-soft)]">{calc.intro}</p>

            <div className="mt-7 space-y-6">
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="calc-price" className="text-[11px] uppercase tracking-[0.18em] text-[var(--d-ink-faint)]">
                    {calc.priceLabel}
                  </label>
                  <span className="[font-family:var(--demo-display)] text-base text-[var(--d-ivory)]">
                    {format(price)}
                  </span>
                </div>
                <div className="mt-3">
                  <RangeInput
                    id="calc-price"
                    min={calc.minPrice}
                    max={calc.maxPrice}
                    step={calc.priceStep}
                    value={price}
                    onChange={setPrice}
                    ariaLabel={calc.priceLabel}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="calc-down" className="text-[11px] uppercase tracking-[0.18em] text-[var(--d-ink-faint)]">
                    {calc.downLabel}
                  </label>
                  <span className="[font-family:var(--demo-display)] text-base text-[var(--d-ivory)]">
                    {down}% · {format(downValue)}
                  </span>
                </div>
                <div className="mt-3">
                  <RangeInput
                    id="calc-down"
                    min={5}
                    max={60}
                    step={1}
                    value={down}
                    onChange={setDown}
                    ariaLabel={calc.downLabel}
                  />
                </div>
              </div>

              <div>
                <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--d-ink-faint)]">
                  {calc.yearsLabel}
                </span>
                <div className="mt-3 flex gap-2" role="group" aria-label={calc.yearsLabel}>
                  {calc.years.map((option) => {
                    const active = option === years;
                    return (
                      <button
                        key={option}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setYears(option)}
                        className={`flex-1 py-2.5 text-sm tabular-nums transition-colors duration-300 ${
                          active
                            ? "bg-[var(--d-gold)] text-[#0B1B2E]"
                            : "border border-[var(--d-line-soft)] text-[var(--d-ink-soft)] hover:border-[var(--d-gold)]"
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-end justify-between border-t border-[var(--d-line-soft)] pt-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--d-ink-faint)]">
                  {calc.monthlyLabel}
                </p>
                <motion.p
                  key={Math.round(monthly)}
                  initial={reduceMotion ? false : { opacity: 0.4, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="mt-1.5 [font-family:var(--demo-display)] text-4xl font-medium text-[var(--d-gold-bright)]"
                >
                  {format(monthly)}
                </motion.p>
              </div>
              <dl className="space-y-2 text-right">
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.16em] text-[var(--d-ink-faint)]">
                    {calc.loanLabel}
                  </dt>
                  <dd className="text-sm text-[var(--d-ivory)]">{format(loan)}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.16em] text-[var(--d-ink-faint)]">
                    {calc.rateLabel}
                  </dt>
                  <dd className="text-sm text-[var(--d-ivory)]">{percentFmt.format(calc.rate)}</dd>
                </div>
              </dl>
            </div>

            <p className="mt-5 text-[10px] leading-relaxed text-[var(--d-ink-faint)]">
              {calc.disclaimer}
            </p>
          </div>
        </div>
      </div>

      <style>{`
        #journey .alture-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          height: 18px;
          width: 18px;
          border-radius: 9999px;
          background: #F4EFE6;
          border: 2px solid #C0A46B;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0,0,0,0.35);
        }
        #journey .alture-range::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 9999px;
          background: #F4EFE6;
          border: 2px solid #C0A46B;
          cursor: pointer;
        }
      `}</style>
    </section>
  );
}
