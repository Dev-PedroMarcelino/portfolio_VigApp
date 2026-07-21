"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Briefcase, Car, Check, HeartPulse, Home, RotateCcw } from "lucide-react";
import type { ProductId, QuoteProduct, QuoteWidgetContent } from "./content";
import { scrollToId, useMoney } from "./ui";

const PRODUCT_ICONS: Record<ProductId, typeof Car> = {
  auto: Car,
  home: Home,
  life: HeartPulse,
  business: Briefcase,
};

/** Eased count-up used for the final price reveal. */
function AnimatedAmount({
  value,
  format,
  reduce,
}: {
  value: number;
  format: Intl.NumberFormat;
  reduce: boolean;
}) {
  const [shown, setShown] = useState(reduce ? value : 0);

  useEffect(() => {
    if (reduce) {
      setShown(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const duration = 850;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setShown(Math.round(value * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, reduce]);

  return <span>{format.format(shown)}</span>;
}

export function QuoteWidget({
  content,
  money,
}: {
  content: QuoteWidgetContent;
  money: { locale: string; currency: string };
}) {
  const reduce = useReducedMotion() ?? false;
  const format = useMoney(money.locale, money.currency);

  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [productId, setProductId] = useState<ProductId | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const product: QuoteProduct | undefined = content.products.find((p) => p.id === productId);
  const answered = product ? product.questions.every((q) => answers[q.id]) : false;

  const price = (() => {
    if (!product || !answered) return 0;
    const factors = product.questions.map(
      (q) => q.options.find((o) => o.id === answers[q.id])?.factor ?? 1,
    );
    return Math.round(product.base * factors[0] * factors[1]);
  })();

  const goTo = (next: number) => {
    setDir(next > step ? 1 : -1);
    setStep(next);
  };

  const restart = () => {
    setDir(-1);
    setStep(0);
    setProductId(null);
    setAnswers({});
  };

  const slide = {
    initial: reduce ? { opacity: 0 } : { opacity: 0, x: 30 * dir },
    animate: reduce ? { opacity: 1 } : { opacity: 1, x: 0 },
    exit: reduce ? { opacity: 0 } : { opacity: 0, x: -30 * dir },
  };

  return (
    <div
      id="quote"
      className="scroll-mt-24 rounded-[1.75rem] border border-white/70 bg-white/95 p-6 shadow-[0_36px_80px_-36px_rgba(16,23,54,0.4)] backdrop-blur sm:p-7"
    >
      <div className="flex items-center justify-between gap-4">
        <h2 className="[font-family:var(--demo-display)] text-lg font-extrabold tracking-tight text-[var(--d-ink)]">
          {content.title}
        </h2>
        <ol className="flex items-center gap-1.5" aria-hidden>
          {content.steps.map((label, i) => (
            <li
              key={label}
              className={`flex h-6 items-center gap-1.5 rounded-full px-2.5 text-[0.6rem] font-bold uppercase tracking-[0.12em] transition-colors ${
                i === step
                  ? "bg-[var(--d-accent)] text-white"
                  : i < step
                    ? "bg-[var(--d-accent-soft)] text-[var(--d-accent)]"
                    : "bg-[var(--d-mist)] text-[var(--d-ink-soft)]"
              }`}
            >
              {i < step ? <Check className="h-3 w-3" strokeWidth={3} /> : <span>{i + 1}</span>}
              <span className="hidden sm:inline">{label}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-5 min-h-[21rem]">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.fieldset key="product" {...slide} transition={{ duration: 0.28, ease: "easeOut" }}>
              <legend className="text-[0.66rem] font-bold uppercase tracking-[0.22em] text-[var(--d-accent)]">
                {content.productLegend}
              </legend>
              <div className="mt-3 grid grid-cols-2 gap-2.5">
                {content.products.map((p) => {
                  const Icon = PRODUCT_ICONS[p.id];
                  const selected = p.id === productId;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => {
                        setProductId(p.id);
                        setAnswers({});
                      }}
                      className={`group rounded-2xl border-2 p-4 text-left transition-all ${
                        selected
                          ? "border-[var(--d-accent)] bg-[var(--d-bg)] shadow-sm"
                          : "border-[var(--d-line)] hover:border-[var(--d-accent)]/50"
                      }`}
                    >
                      <span
                        className={`flex h-9 w-9 items-center justify-center rounded-xl transition-colors ${
                          selected
                            ? "bg-[var(--d-accent)] text-white"
                            : "bg-[var(--d-mist)] text-[var(--d-accent)]"
                        }`}
                      >
                        <Icon className="h-[18px] w-[18px]" strokeWidth={1.9} aria-hidden />
                      </span>
                      <span className="mt-2.5 block text-sm font-bold text-[var(--d-ink)]">{p.label}</span>
                      <span className="mt-0.5 block text-[0.68rem] leading-snug text-[var(--d-ink-soft)]">
                        {p.hint}
                      </span>
                    </button>
                  );
                })}
              </div>
              <button
                type="button"
                disabled={!productId}
                onClick={() => goTo(1)}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[var(--d-accent)] py-3.5 text-[0.74rem] font-bold uppercase tracking-[0.16em] text-white transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-35"
              >
                {content.next}
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.4} aria-hidden />
              </button>
            </motion.fieldset>
          )}

          {step === 1 && product && (
            <motion.div key="details" {...slide} transition={{ duration: 0.28, ease: "easeOut" }}>
              <p className="text-[0.66rem] font-bold uppercase tracking-[0.22em] text-[var(--d-accent)]">
                {content.detailsLegend}
              </p>
              {product.questions.map((q) => (
                <fieldset key={q.id} className="mt-4">
                  <legend className="text-sm font-bold text-[var(--d-ink)]">{q.label}</legend>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {q.options.map((o) => {
                      const selected = answers[q.id] === o.id;
                      return (
                        <button
                          key={o.id}
                          type="button"
                          aria-pressed={selected}
                          onClick={() => setAnswers((a) => ({ ...a, [q.id]: o.id }))}
                          className={`rounded-full border-2 px-3.5 py-2 text-[0.76rem] font-semibold transition-all ${
                            selected
                              ? "border-[var(--d-accent)] bg-[var(--d-accent)] text-white"
                              : "border-[var(--d-line)] text-[var(--d-ink-soft)] hover:border-[var(--d-accent)]/50 hover:text-[var(--d-ink)]"
                          }`}
                        >
                          {o.label}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
              ))}
              <div className="mt-6 flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => goTo(0)}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--d-line)] text-[var(--d-ink-soft)] transition-colors hover:border-[var(--d-accent)]/50 hover:text-[var(--d-accent)]"
                  aria-label={content.back}
                >
                  <ArrowLeft className="h-4 w-4" strokeWidth={2.2} aria-hidden />
                </button>
                <button
                  type="button"
                  disabled={!answered}
                  onClick={() => goTo(2)}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[var(--d-accent)] py-3.5 text-[0.74rem] font-bold uppercase tracking-[0.16em] text-white transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-35"
                >
                  {content.seePrice}
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.4} aria-hidden />
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && product && (
            <motion.div
              key="result"
              {...slide}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="flex min-h-[21rem] flex-col"
            >
              <p className="text-[0.66rem] font-bold uppercase tracking-[0.22em] text-[var(--d-accent)]">
                {content.resultKicker}
              </p>
              <div className="mt-4 rounded-2xl bg-[var(--d-navy)] p-6 text-white">
                <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-[var(--d-cloud)]">
                  Shieldline {product.label}
                </p>
                <p className="mt-2 flex items-baseline gap-1.5">
                  <span className="[font-family:var(--demo-display)] text-5xl font-extrabold tracking-tight">
                    <AnimatedAmount value={price} format={format} reduce={reduce} />
                  </span>
                  <span className="text-sm text-[var(--d-cloud)]">{content.perMonth}</span>
                </p>
                <ul className="mt-4 space-y-1.5 border-t border-white/15 pt-4">
                  {product.questions.map((q) => {
                    const opt = q.options.find((o) => o.id === answers[q.id]);
                    return (
                      <li key={q.id} className="flex items-center gap-2 text-[0.78rem] text-[var(--d-cloud)]">
                        <Check className="h-3.5 w-3.5 shrink-0 text-[var(--d-gold)]" strokeWidth={2.6} aria-hidden />
                        {opt?.label}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <p className="mt-3 text-[0.72rem] leading-relaxed text-[var(--d-ink-soft)]">
                {content.resultNote}
              </p>
              <div className="mt-auto flex items-center gap-2.5 pt-4">
                <button
                  type="button"
                  onClick={restart}
                  className="flex h-11 shrink-0 items-center gap-1.5 rounded-full border border-[var(--d-line)] px-4 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-[var(--d-ink-soft)] transition-colors hover:border-[var(--d-accent)]/50 hover:text-[var(--d-accent)]"
                >
                  <RotateCcw className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden />
                  {content.restart}
                </button>
                <a
                  href="#agent"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId("agent");
                  }}
                  className="flex w-full items-center justify-center rounded-full bg-[var(--d-accent)] py-3.5 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-white transition-all hover:brightness-110"
                >
                  {content.resultCta}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="mt-4 border-t border-[var(--d-line)] pt-3 text-[0.64rem] leading-relaxed text-[var(--d-ink-soft)]/80">
        {content.disclaimer}
      </p>
    </div>
  );
}
