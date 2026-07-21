"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Candy, Check, Flame, NutOff, Vegan, WheatOff } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { BuilderContent } from "./content";
import { SectionLabel, Starburst } from "./ui";

const PREF_ICONS: Record<string, LucideIcon> = {
  plant: Vegan,
  gluten: WheatOff,
  nut: NutOff,
  spice: Flame,
  sweet: Candy,
};

export function PlanBuilder({ content }: { content: BuilderContent }) {
  const reduce = useReducedMotion() ?? false;
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [sizeId, setSizeId] = useState(content.sizes[1].id);
  const [prefIds, setPrefIds] = useState<string[]>([]);
  const [freqId, setFreqId] = useState(content.freqs[1].id);
  const [confirmed, setConfirmed] = useState(false);

  const size = content.sizes.find((s) => s.id === sizeId) ?? content.sizes[0];
  const freq = content.freqs.find((f) => f.id === freqId) ?? content.freqs[0];
  const selectedPrefs = content.prefs.filter((p) => prefIds.includes(p.id));

  const format = useMemo(
    () =>
      new Intl.NumberFormat(content.priceLocale, {
        style: "currency",
        currency: content.currency,
        maximumFractionDigits: 0,
      }),
    [content.priceLocale, content.currency],
  );

  const rawBox = size.pricePerBox + selectedPrefs.reduce((sum, p) => sum + p.surcharge, 0);
  const perBox = Math.round(rawBox * (1 - freq.discountPct / 100));
  const monthly = Math.round(perBox * freq.perMonth);

  const togglePref = (id: string) =>
    setPrefIds((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]));

  const goTo = (next: number) => {
    setDir(next > step ? 1 : -1);
    setStep(next);
  };

  const slide = {
    initial: reduce ? undefined : { opacity: 0, x: 28 * dir },
    animate: { opacity: 1, x: 0 },
    exit: reduce ? undefined : { opacity: 0, x: -28 * dir },
  };

  return (
    <section id="builder" className="scroll-mt-24 bg-[var(--d-peach)] px-5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <SectionLabel text={content.label} />
          <h2 className="mt-5 [font-family:var(--demo-display)] text-4xl tracking-tight md:text-5xl">
            {content.title}
          </h2>
          <p className="mt-4 leading-[1.85] text-[var(--d-ink-soft)]">{content.intro}</p>
        </div>

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-[1.25fr_0.75fr]">
          {/* Builder card */}
          <div className="rounded-[2rem] border border-[var(--d-line)] bg-[var(--d-card)] p-6 shadow-[0_28px_70px_-40px_rgba(55,39,26,0.55)] md:p-9">
            <AnimatePresence mode="wait">
              {!confirmed ? (
                <motion.div
                  key="builder"
                  initial={reduce ? undefined : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduce ? undefined : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Step rail */}
                  <div className="flex flex-wrap items-center gap-2">
                    {content.stepNames.map((name, i) => {
                      const done = i < step;
                      const active = i === step;
                      return (
                        <button
                          key={name}
                          type="button"
                          disabled={i > step}
                          aria-current={active ? "step" : undefined}
                          onClick={() => i < step && goTo(i)}
                          className={`flex items-center gap-2 rounded-full px-3.5 py-2 text-[0.64rem] font-extrabold uppercase tracking-[0.16em] transition-colors ${
                            active
                              ? "bg-[var(--d-ink)] text-[var(--d-bg)]"
                              : done
                                ? "bg-[var(--d-olive)]/15 text-[var(--d-olive-deep)] hover:bg-[var(--d-olive)]/25"
                                : "bg-[var(--d-line)]/60 text-[var(--d-ink-soft)]"
                          }`}
                        >
                          {done ? (
                            <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                          ) : (
                            <span aria-hidden>{String(i + 1).padStart(2, "0")}</span>
                          )}
                          {name}
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-8 min-h-[300px]">
                    <AnimatePresence mode="wait" initial={false}>
                      {step === 0 && (
                        <motion.fieldset key="size" {...slide} transition={{ duration: 0.28 }}>
                          <legend className="sr-only">{content.stepNames[0]}</legend>
                          <div className="grid gap-3 sm:grid-cols-3">
                            {content.sizes.map((option) => {
                              const selected = option.id === sizeId;
                              return (
                                <button
                                  key={option.id}
                                  type="button"
                                  aria-pressed={selected}
                                  onClick={() => setSizeId(option.id)}
                                  className={`relative rounded-2xl border-2 p-5 text-left transition-all ${
                                    selected
                                      ? "border-[var(--d-accent)] bg-[var(--d-peach)]/50 shadow-sm"
                                      : "border-[var(--d-line)] hover:border-[var(--d-accent)]/50"
                                  }`}
                                >
                                  {option.tag && (
                                    <span className="absolute -top-2.5 right-4 rounded-full bg-[var(--d-accent)] px-2.5 py-0.5 text-[0.56rem] font-extrabold uppercase tracking-[0.14em] text-[var(--d-bg)]">
                                      {option.tag}
                                    </span>
                                  )}
                                  <span className="block [font-family:var(--demo-display)] text-2xl tracking-tight">
                                    {option.name}
                                  </span>
                                  <span className="mt-1 block text-[0.68rem] font-bold uppercase tracking-[0.12em] text-[var(--d-olive-deep)]">
                                    {option.count}
                                  </span>
                                  <span className="mt-2 block text-xs leading-relaxed text-[var(--d-ink-soft)]">
                                    {option.detail}
                                  </span>
                                  <span className="mt-3 block text-lg font-extrabold text-[var(--d-ink)]">
                                    {format.format(option.pricePerBox)}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </motion.fieldset>
                      )}

                      {step === 1 && (
                        <motion.fieldset key="prefs" {...slide} transition={{ duration: 0.28 }}>
                          <legend className="sr-only">{content.stepNames[1]}</legend>
                          <div className="grid gap-3 sm:grid-cols-2">
                            {content.prefs.map((pref) => {
                              const selected = prefIds.includes(pref.id);
                              const Icon = PREF_ICONS[pref.id] ?? Check;
                              return (
                                <button
                                  key={pref.id}
                                  type="button"
                                  aria-pressed={selected}
                                  onClick={() => togglePref(pref.id)}
                                  className={`flex items-center gap-4 rounded-2xl border-2 p-4 text-left transition-all ${
                                    selected
                                      ? "border-[var(--d-olive)] bg-[var(--d-olive)]/10"
                                      : "border-[var(--d-line)] hover:border-[var(--d-olive)]/50"
                                  }`}
                                >
                                  <span
                                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                                      selected
                                        ? "bg-[var(--d-olive)] text-[var(--d-card)]"
                                        : "bg-[var(--d-peach)] text-[var(--d-accent)]"
                                    }`}
                                  >
                                    <Icon className="h-[18px] w-[18px]" strokeWidth={2} aria-hidden />
                                  </span>
                                  <span className="min-w-0 flex-1">
                                    <span className="flex items-baseline justify-between gap-2 text-sm font-extrabold">
                                      {pref.name}
                                      {pref.surcharge > 0 && (
                                        <span className="text-[0.66rem] font-bold text-[var(--d-accent-deep)]">
                                          +{format.format(pref.surcharge)}
                                        </span>
                                      )}
                                    </span>
                                    <span className="mt-0.5 block text-xs text-[var(--d-ink-soft)]">
                                      {pref.note}
                                    </span>
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                          <p className="mt-4 text-xs leading-relaxed text-[var(--d-ink-soft)]">
                            {content.prefsHint}
                          </p>
                        </motion.fieldset>
                      )}

                      {step === 2 && (
                        <motion.fieldset key="freq" {...slide} transition={{ duration: 0.28 }}>
                          <legend className="sr-only">{content.stepNames[2]}</legend>
                          <div className="grid gap-3 sm:grid-cols-3">
                            {content.freqs.map((option) => {
                              const selected = option.id === freqId;
                              return (
                                <button
                                  key={option.id}
                                  type="button"
                                  aria-pressed={selected}
                                  onClick={() => setFreqId(option.id)}
                                  className={`rounded-2xl border-2 p-5 text-left transition-all ${
                                    selected
                                      ? "border-[var(--d-accent)] bg-[var(--d-peach)]/50 shadow-sm"
                                      : "border-[var(--d-line)] hover:border-[var(--d-accent)]/50"
                                  }`}
                                >
                                  <span className="block text-sm font-extrabold">{option.name}</span>
                                  <span
                                    className={`mt-1.5 block text-[0.64rem] font-extrabold uppercase tracking-[0.1em] ${
                                      option.discountPct > 0
                                        ? "text-[var(--d-accent-deep)]"
                                        : "text-[var(--d-ink-soft)]"
                                    }`}
                                  >
                                    {option.note}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </motion.fieldset>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Controls */}
                  <div className="mt-8 flex items-center justify-between border-t border-[var(--d-line)] pt-6">
                    <button
                      type="button"
                      onClick={() => goTo(step - 1)}
                      disabled={step === 0}
                      className={`flex items-center gap-2 rounded-full border-2 border-[var(--d-line)] px-5 py-3 text-[0.68rem] font-extrabold uppercase tracking-[0.16em] transition-opacity ${
                        step === 0 ? "cursor-not-allowed opacity-30" : "hover:border-[var(--d-ink)]"
                      }`}
                    >
                      <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2.4} aria-hidden />
                      {content.back}
                    </button>
                    {step < 2 ? (
                      <button
                        type="button"
                        onClick={() => goTo(step + 1)}
                        className="flex items-center gap-2 rounded-full bg-[var(--d-ink)] px-6 py-3.5 text-[0.68rem] font-extrabold uppercase tracking-[0.16em] text-[var(--d-bg)] transition-transform hover:scale-[1.03]"
                      >
                        {content.next}
                        <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.4} aria-hidden />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setConfirmed(true)}
                        className="rounded-full bg-[var(--d-accent)] px-7 py-3.5 text-[0.68rem] font-extrabold uppercase tracking-[0.16em] text-[var(--d-bg)] shadow-lg shadow-[#E2593B]/30 transition-transform hover:scale-[1.03]"
                      >
                        {content.confirm}
                      </button>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={reduce ? undefined : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="flex min-h-[430px] flex-col items-start"
                >
                  <Starburst fill="#6B7243" className="h-20 w-20">
                    <Check className="h-7 w-7 text-[var(--d-card)]" strokeWidth={2.6} aria-hidden />
                  </Starburst>
                  <h3 className="mt-6 [font-family:var(--demo-display)] text-3xl italic tracking-tight md:text-4xl">
                    {content.successTitle}
                  </h3>
                  <p className="mt-4 max-w-lg leading-[1.85] text-[var(--d-ink-soft)]">
                    {content.successBody}
                  </p>
                  <div className="mt-8 w-full max-w-md rounded-2xl border border-[var(--d-line)] bg-[var(--d-bg)] p-5">
                    <div className="flex items-baseline justify-between text-sm">
                      <span className="font-extrabold">{size.name}</span>
                      <span className="text-[var(--d-ink-soft)]">{size.count}</span>
                    </div>
                    <div className="mt-2 flex items-baseline justify-between text-sm">
                      <span className="font-extrabold">{freq.name}</span>
                      <span className="text-[var(--d-ink-soft)]">{freq.note}</span>
                    </div>
                    <div className="mt-2 flex items-baseline justify-between gap-4 text-sm">
                      <span className="shrink-0 font-extrabold">{content.prefsLine}</span>
                      <span className="text-right text-[var(--d-ink-soft)]">
                        {selectedPrefs.length > 0
                          ? selectedPrefs.map((p) => p.name).join(" · ")
                          : content.prefsNone}
                      </span>
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
                    onClick={() => {
                      setConfirmed(false);
                      goTo(0);
                    }}
                    className="mt-auto pt-8 text-[0.7rem] font-extrabold uppercase tracking-[0.16em] text-[var(--d-accent)] underline-offset-4 hover:underline"
                  >
                    {content.edit}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Live summary */}
          <aside className="rounded-[2rem] bg-[var(--d-olive-deep)] p-7 text-[var(--d-sand)] shadow-[0_28px_70px_-40px_rgba(71,78,44,0.9)] lg:sticky lg:top-24">
            <p className="text-[0.64rem] font-extrabold uppercase tracking-[0.26em] text-[var(--d-sand-dim)]">
              {content.summaryTitle}
            </p>
            <dl className="mt-5 space-y-3.5 text-sm">
              <div className="flex items-baseline justify-between gap-4">
                <dt className="shrink-0 text-[var(--d-sand-dim)]">{content.sizeLine}</dt>
                <dd className="text-right font-extrabold">{size.name}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="shrink-0 text-[var(--d-sand-dim)]">{content.prefsLine}</dt>
                <dd className="text-right font-extrabold">
                  {selectedPrefs.length > 0
                    ? selectedPrefs.map((p) => p.name).join(" · ")
                    : content.prefsNone}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="shrink-0 text-[var(--d-sand-dim)]">{content.freqLine}</dt>
                <dd className="text-right font-extrabold">{freq.name}</dd>
              </div>
            </dl>
            <div className="mt-6 border-t border-[var(--d-sand)]/20 pt-5">
              <div className="flex items-baseline justify-between text-sm">
                <span className="text-[var(--d-sand-dim)]">{content.perBox}</span>
                <span className="flex items-baseline gap-2">
                  {freq.discountPct > 0 && (
                    <s className="text-[0.76rem] opacity-60">{format.format(rawBox)}</s>
                  )}
                  <span className="font-extrabold">{format.format(perBox)}</span>
                </span>
              </div>
              <div className="mt-3 flex items-baseline justify-between gap-3">
                <span className="text-sm text-[var(--d-sand-dim)]">{content.perMonth}</span>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={monthly}
                    initial={reduce ? undefined : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: -10 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="[font-family:var(--demo-display)] text-4xl italic tracking-tight"
                  >
                    {format.format(monthly)}
                  </motion.span>
                </AnimatePresence>
              </div>
              <p className="mt-4 text-[0.66rem] font-bold uppercase tracking-[0.14em] text-[#C9D1A0]">
                {freq.note}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
