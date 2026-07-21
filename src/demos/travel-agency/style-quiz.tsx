"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, RotateCcw, Sparkles } from "lucide-react";
import type { TravelContent, Journey } from "./content";
import type { CurrencyFormatter } from "./atlas-root";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function StyleQuiz({
  content,
  journeys,
  format,
  onOpen,
}: {
  content: TravelContent["quiz"];
  journeys: Journey[];
  format: CurrencyFormatter;
  onOpen: (id: string) => void;
}) {
  const reduce = useReducedMotion();
  const total = content.questions.length;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>(
    () => Array(total).fill(null) as null[],
  );

  const done = step >= total;

  const result = useMemo(() => {
    if (!done) return null;
    const tally = new Map<string, number>();
    answers.forEach((id) => {
      if (id) tally.set(id, (tally.get(id) ?? 0) + 1);
    });
    let winnerId = journeys[0].id;
    let best = -1;
    // iterate over question order for a stable, deterministic tie-break
    content.questions.forEach((qn) =>
      qn.options.forEach((o) => {
        const score = tally.get(o.journeyId) ?? 0;
        if (score > best) {
          best = score;
          winnerId = o.journeyId;
        }
      }),
    );
    const journey = journeys.find((j) => j.id === winnerId) ?? journeys[0];
    const fit = Math.round((best / total) * 100);
    return { journey, fit };
  }, [done, answers, journeys, content.questions, total]);

  const choose = (journeyId: string) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[step] = journeyId;
      return next;
    });
    setStep((s) => s + 1);
  };

  const back = () => setStep((s) => Math.max(0, s - 1));

  const restart = () => {
    setAnswers(Array(total).fill(null) as null[]);
    setStep(0);
  };

  const progress = Math.min(step, total) / total;

  return (
    <section id="quiz" className="relative overflow-hidden bg-[var(--d-bg)] py-20 sm:py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(80% 60% at 12% 0%, rgba(253,186,116,0.14), transparent 60%)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-4xl px-5 sm:px-6">
        <header className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--d-peach)]">
            <Sparkles className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden />
            {content.eyebrow}
          </span>
          <h2 className="mt-4 [font-family:var(--demo-display)] text-[clamp(2rem,4.4vw,3.2rem)] font-light leading-[1.02] tracking-tight text-[var(--d-ink)]">
            {content.title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[var(--d-ink-soft)] sm:text-base">
            {content.intro}
          </p>
        </header>

        <div className="mt-10 overflow-hidden rounded-[26px] border border-[var(--d-line-soft)] bg-[var(--d-surface)]">
          {/* progress */}
          <div className="h-1 w-full bg-[var(--d-deep)]">
            <motion.div
              className="h-full bg-[var(--d-peach)]"
              initial={false}
              animate={{ width: `${(done ? 1 : progress) * 100}%` }}
              transition={{ duration: reduce ? 0 : 0.4, ease: "easeOut" }}
            />
          </div>

          <div className="p-6 sm:p-9">
            <AnimatePresence mode="wait">
              {!done ? (
                <motion.div
                  key={`q-${step}`}
                  initial={{ opacity: 0, x: reduce ? 0 : 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: reduce ? 0 : -24 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[var(--d-ink-faint)]">
                      {content.stepLabel} {step + 1} {content.ofLabel} {total}
                    </span>
                    {step > 0 ? (
                      <button
                        type="button"
                        onClick={back}
                        className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--d-ink-soft)] transition-colors hover:text-[var(--d-peach)]"
                      >
                        <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden />
                        {content.backLabel}
                      </button>
                    ) : null}
                  </div>

                  <h3 className="mt-5 [font-family:var(--demo-display)] text-2xl font-normal leading-snug text-[var(--d-ink)] sm:text-3xl">
                    {content.questions[step].prompt}
                  </h3>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {content.questions[step].options.map((o) => {
                      const picked = answers[step] === o.journeyId;
                      return (
                        <button
                          key={o.id}
                          type="button"
                          aria-pressed={picked}
                          onClick={() => choose(o.journeyId)}
                          className={`group flex items-center justify-between gap-3 rounded-2xl border px-5 py-4 text-left text-sm transition-colors duration-300 ${
                            picked
                              ? "border-[var(--d-peach)] bg-[rgba(253,186,116,0.12)] text-[var(--d-ink)]"
                              : "border-[var(--d-line-soft)] bg-[var(--d-deep)] text-[var(--d-ink-soft)] hover:border-[var(--d-peach)] hover:text-[var(--d-ink)]"
                          }`}
                        >
                          {o.label}
                          <ArrowRight
                            className="h-4 w-4 shrink-0 text-[var(--d-peach)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                            strokeWidth={1.8}
                            aria-hidden
                          />
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              ) : result ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: reduce ? 0 : 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="grid gap-6 sm:grid-cols-[0.85fr_1.15fr] sm:items-center"
                >
                  <div className="relative overflow-hidden rounded-[20px] border border-[var(--d-line-soft)]">
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={result.journey.image.src}
                        alt={result.journey.image.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, 40vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,34,42,0.1),rgba(4,34,42,0.7))]" />
                    </div>
                    <span className="absolute right-3 top-3 rounded-full bg-[var(--d-peach)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#04222A]">
                      {result.fit}% {content.matchLabel}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--d-peach)]">
                      {content.resultKicker}
                    </span>
                    <p className="mt-2 text-sm text-[var(--d-ink-soft)]">{content.resultLead}</p>
                    <h3 className="mt-1 [font-family:var(--demo-display)] text-3xl font-normal leading-tight text-[var(--d-ink)] sm:text-4xl">
                      {result.journey.name}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--d-ink-soft)]">
                      {result.journey.summary}
                    </p>
                    <p className="mt-4 [font-family:var(--demo-display)] text-2xl font-light text-[var(--d-peach)]">
                      {format(result.journey.priceFrom)}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => onOpen(result.journey.id)}
                        className="inline-flex items-center gap-2 rounded-full bg-[var(--d-peach)] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#04222A] transition-transform duration-300 hover:scale-[1.03]"
                      >
                        {content.viewCta}
                        <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
                      </button>
                      <button
                        type="button"
                        onClick={restart}
                        className="inline-flex items-center gap-2 rounded-full border border-[var(--d-line)] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--d-ink)] transition-colors duration-300 hover:border-[var(--d-peach)] hover:text-[var(--d-peach)]"
                      >
                        <RotateCcw className="h-4 w-4" strokeWidth={1.8} aria-hidden />
                        {content.restartLabel}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
