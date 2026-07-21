"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, CircleCheck, RotateCcw } from "lucide-react";
import type { OnboardingOption, VantageContent } from "./content";
import { SectionLabel } from "./ui";

const SIDE_IMG =
  "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80";

const TOTAL_STEPS = 4;

interface Selections {
  goal: string | null;
  horizon: string | null;
  risk: string | null;
  commitment: string | null;
}

const EMPTY: Selections = { goal: null, horizon: null, risk: null, commitment: null };

/** Deterministic reference code derived from the chosen options. */
function referenceCode(sel: Selections, options: VantageContent["onboarding"]): string {
  const gi = options.goal.options.findIndex((o) => o.id === sel.goal);
  const hi = options.horizon.options.findIndex((o) => o.id === sel.horizon);
  const ri = options.horizon.riskOptions.findIndex((o) => o.id === sel.risk);
  const ci = options.commitment.options.findIndex((o) => o.id === sel.commitment);
  return `VC-${2600 + gi * 97 + hi * 31 + ri * 13 + ci * 7}`;
}

function OptionCards({
  options,
  selected,
  onSelect,
  groupLabel,
}: {
  options: OnboardingOption[];
  selected: string | null;
  onSelect: (id: string) => void;
  groupLabel: string;
}) {
  return (
    <div role="group" aria-label={groupLabel} className="grid gap-3">
      {options.map((opt) => {
        const isSelected = selected === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onSelect(opt.id)}
            className={`flex items-center gap-4 rounded-xl border px-5 py-4 text-left transition-colors ${
              isSelected
                ? "border-[var(--d-gold)] bg-[var(--d-gold)]/[0.08]"
                : "border-[var(--d-line)] hover:border-[var(--d-gold)]/40"
            }`}
          >
            <span
              aria-hidden
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${
                isSelected ? "border-[var(--d-gold)] bg-[var(--d-gold)]" : "border-[var(--d-ink-soft)]/50"
              }`}
            >
              {isSelected && <Check className="h-3 w-3 text-[#0B1221]" strokeWidth={3} />}
            </span>
            <span className="min-w-0">
              <span className={`block text-sm font-semibold ${isSelected ? "text-[var(--d-gold)]" : "text-[var(--d-ink)]"}`}>
                {opt.label}
              </span>
              <span className="mt-0.5 block text-xs leading-relaxed text-[var(--d-ink-soft)]">{opt.detail}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function OnboardingSection({ content }: { content: VantageContent["onboarding"] }) {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const [sel, setSel] = useState<Selections>(EMPTY);
  const [confirmed, setConfirmed] = useState(false);

  const stepComplete = [
    sel.goal !== null,
    sel.horizon !== null && sel.risk !== null,
    sel.commitment !== null,
    true,
  ][step];

  const labelFor = (options: OnboardingOption[], id: string | null) =>
    options.find((o) => o.id === id)?.label ?? "—";

  const restart = () => {
    setSel(EMPTY);
    setStep(0);
    setConfirmed(false);
  };

  const stepTitles = [content.goal.title, content.horizon.title, content.commitment.title, content.review.title];
  const stepSubs = [content.goal.sub, content.horizon.sub, content.commitment.sub, content.review.sub];

  return (
    <section id="onboarding" className="scroll-mt-20 border-t border-[var(--d-line)] bg-[var(--d-bg-soft)] py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        {/* Intro column */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionLabel text={content.label} />
          <h2 className="mt-5 [font-family:var(--demo-display)] text-3xl leading-tight text-[var(--d-ink)] sm:text-[2.6rem] sm:leading-[1.12]">
            {content.title}
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-[var(--d-ink-soft)]">{content.intro}</p>

          <div className="relative mt-10 hidden aspect-[4/3] max-w-sm overflow-hidden rounded-2xl border border-[var(--d-line)] lg:block">
            <Image
              src={SIDE_IMG}
              alt=""
              fill
              sizes="(max-width: 1024px) 0px, 30vw"
              className="object-cover opacity-50 saturate-[0.3]"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(160deg, rgba(11,18,33,0.2) 0%, rgba(11,18,33,0.85) 100%)",
              }}
            />
            <p className="absolute inset-x-6 bottom-6 [font-family:var(--demo-display)] text-lg italic leading-snug text-[var(--d-ink)]">
              {content.sideNote}
            </p>
          </div>
          <p className="mt-6 max-w-sm text-xs italic leading-relaxed text-[var(--d-ink-soft)] lg:hidden">
            {content.sideNote}
          </p>
        </div>

        {/* Stepper card */}
        <div className="rounded-2xl border border-[var(--d-line)] bg-[var(--d-panel)] p-7 sm:p-10">
          <AnimatePresence mode="wait" initial={false}>
            {confirmed ? (
              <motion.div
                key="success"
                initial={reduced ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduced ? undefined : { opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex min-h-[420px] flex-col items-center justify-center text-center"
              >
                <span className="flex h-20 w-20 items-center justify-center rounded-full border border-[var(--d-gold)]/50 bg-[var(--d-gold)]/10">
                  <CircleCheck className="h-9 w-9 text-[var(--d-gold)]" strokeWidth={1.6} />
                </span>
                <h3 className="mt-8 [font-family:var(--demo-display)] text-3xl text-[var(--d-ink)]">
                  {content.success.title}
                </h3>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--d-ink-soft)]">
                  {content.success.body}
                </p>
                <p className="mt-8 rounded-full border border-[var(--d-gold)]/40 px-6 py-2.5 font-mono text-sm tracking-[0.14em] text-[var(--d-gold)]">
                  {content.success.referenceLabel} · {referenceCode(sel, content)}
                </p>
                <button
                  type="button"
                  onClick={restart}
                  className="mt-10 flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[var(--d-ink-soft)] transition-colors hover:text-[var(--d-gold)]"
                >
                  <RotateCcw className="h-3.5 w-3.5" strokeWidth={2} />
                  {content.nav.restart}
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="stepper"
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduced ? undefined : { opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Progress */}
                <div className="flex items-center justify-between gap-6">
                  <p className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-[var(--d-ink-soft)]">
                    {content.progress.step} {step + 1} {content.progress.of} {TOTAL_STEPS}
                  </p>
                  <div className="flex flex-1 gap-1.5" aria-hidden>
                    {Array.from({ length: TOTAL_STEPS }, (_, i) => (
                      <span
                        key={i}
                        className={`h-0.5 flex-1 rounded-full transition-colors duration-300 ${
                          i <= step ? "bg-[var(--d-gold)]" : "bg-[var(--d-line)]"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={step}
                    initial={reduced ? false : { opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={reduced ? undefined : { opacity: 0, x: -24 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="mt-8 min-h-[340px]"
                  >
                    <h3 className="[font-family:var(--demo-display)] text-2xl text-[var(--d-ink)]">
                      {stepTitles[step]}
                    </h3>
                    <p className="mt-2 text-sm text-[var(--d-ink-soft)]">{stepSubs[step]}</p>

                    <div className="mt-7">
                      {step === 0 && (
                        <OptionCards
                          options={content.goal.options}
                          selected={sel.goal}
                          onSelect={(id) => setSel((s) => ({ ...s, goal: id }))}
                          groupLabel={content.goal.title}
                        />
                      )}

                      {step === 1 && (
                        <div className="space-y-7">
                          <OptionCards
                            options={content.horizon.options}
                            selected={sel.horizon}
                            onSelect={(id) => setSel((s) => ({ ...s, horizon: id }))}
                            groupLabel={content.horizon.title}
                          />
                          <div>
                            <p className="mb-3 text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-[var(--d-ink-soft)]">
                              {content.horizon.riskTitle}
                            </p>
                            <OptionCards
                              options={content.horizon.riskOptions}
                              selected={sel.risk}
                              onSelect={(id) => setSel((s) => ({ ...s, risk: id }))}
                              groupLabel={content.horizon.riskTitle}
                            />
                          </div>
                        </div>
                      )}

                      {step === 2 && (
                        <OptionCards
                          options={content.commitment.options}
                          selected={sel.commitment}
                          onSelect={(id) => setSel((s) => ({ ...s, commitment: id }))}
                          groupLabel={content.commitment.title}
                        />
                      )}

                      {step === 3 && (
                        <div>
                          <dl className="divide-y divide-[var(--d-line)] rounded-xl border border-[var(--d-line)] bg-[#0A101D]">
                            {(
                              [
                                [content.review.fields.goal, labelFor(content.goal.options, sel.goal)],
                                [content.review.fields.horizon, labelFor(content.horizon.options, sel.horizon)],
                                [content.review.fields.risk, labelFor(content.horizon.riskOptions, sel.risk)],
                                [content.review.fields.commitment, labelFor(content.commitment.options, sel.commitment)],
                              ] as const
                            ).map(([label, value]) => (
                              <div key={label} className="flex items-baseline justify-between gap-6 px-5 py-4">
                                <dt className="text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-[var(--d-ink-soft)]">
                                  {label}
                                </dt>
                                <dd className="[font-family:var(--demo-display)] text-base text-[var(--d-gold)]">
                                  {value}
                                </dd>
                              </div>
                            ))}
                          </dl>
                          <p className="mt-5 text-xs italic leading-relaxed text-[var(--d-ink-soft)]">
                            {content.review.note}
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="mt-8 flex items-center justify-between border-t border-[var(--d-line)] pt-6">
                  <button
                    type="button"
                    onClick={() => setStep((s) => Math.max(0, s - 1))}
                    disabled={step === 0}
                    className="flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[var(--d-ink-soft)] transition-colors enabled:hover:text-[var(--d-ink)] disabled:opacity-30"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
                    {content.nav.back}
                  </button>

                  {step < TOTAL_STEPS - 1 ? (
                    <button
                      type="button"
                      onClick={() => setStep((s) => Math.min(TOTAL_STEPS - 1, s + 1))}
                      disabled={!stepComplete}
                      className="flex items-center gap-2.5 rounded-full bg-[var(--d-gold)] px-6 py-3 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#0B1221] transition-all enabled:hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      {content.nav.next}
                      <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.2} />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setConfirmed(true)}
                      className="flex items-center gap-2.5 rounded-full bg-[var(--d-gold)] px-6 py-3 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#0B1221] transition-transform hover:scale-[1.03]"
                    >
                      {content.nav.confirm}
                      <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
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
