"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, ChevronDown, CalendarClock } from "lucide-react";
import type { AdmissionsContent, AdmissionStep } from "./content";
import { Eyebrow } from "./ui";

export function Admissions({ content }: { content: AdmissionsContent }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="admissions" className="scroll-mt-20 bg-[var(--d-bg)] py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-6">
        <div className="max-w-2xl">
          <Eyebrow text={content.eyebrow} tone="crimson" />
          <h2 className="mt-4 [font-family:var(--demo-display)] text-3xl font-normal leading-tight text-[var(--d-ink)] sm:text-5xl">
            {content.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--d-ink-soft)]">
            {content.intro}
          </p>
        </div>

        <ol className="mt-12 space-y-3">
          {content.steps.map((step, i) => (
            <TimelineStep
              key={step.phase}
              step={step}
              index={i}
              isLast={i === content.steps.length - 1}
              open={openIndex === i}
              onToggle={() => setOpenIndex((cur) => (cur === i ? null : i))}
              content={content}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}

function TimelineStep({
  step,
  index,
  isLast,
  open,
  onToggle,
  content,
}: {
  step: AdmissionStep;
  index: number;
  isLast: boolean;
  open: boolean;
  onToggle: () => void;
  content: AdmissionsContent;
}) {
  const reduce = useReducedMotion() ?? false;
  const panelId = `admission-panel-${index}`;

  return (
    <li className="relative flex gap-5">
      {/* rail */}
      <div className="flex flex-col items-center">
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border text-sm font-bold transition-colors [font-family:var(--demo-display)] ${
            open
              ? "border-[var(--d-crimson)] bg-[var(--d-crimson)] text-[var(--d-parchment)]"
              : "border-[var(--d-line)] bg-[var(--d-surface)] text-[var(--d-crimson)]"
          }`}
        >
          {step.phase}
        </span>
        {!isLast && <span className="mt-1 w-px flex-1 bg-[var(--d-line)]" aria-hidden />}
      </div>

      {/* card */}
      <div className="flex-1 pb-3">
        <div
          className={`overflow-hidden rounded-2xl border bg-[var(--d-surface)] transition-colors ${
            open ? "border-[var(--d-crimson)]/40" : "border-[var(--d-line)]"
          }`}
        >
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={open}
            aria-controls={panelId}
            className="flex w-full items-center gap-4 px-5 py-4 text-left"
          >
            <div className="flex-1">
              <span className="inline-flex items-center gap-1.5 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-[var(--d-crimson)]">
                <CalendarClock className="h-3.5 w-3.5" strokeWidth={2} />
                {content.deadlineLabel}: {step.date}
              </span>
              <h3 className="mt-1.5 [font-family:var(--demo-display)] text-lg font-normal text-[var(--d-ink)]">
                {step.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-[var(--d-ink-soft)]">
                {step.summary}
              </p>
            </div>
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--d-line)] text-[var(--d-crimson)] transition-transform ${
                open ? "rotate-180" : ""
              }`}
              aria-hidden
            >
              <ChevronDown className="h-4 w-4" strokeWidth={2.2} />
            </span>
          </button>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                id={panelId}
                initial={reduce ? { height: "auto" } : { height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <ul className="space-y-2.5 border-t border-[var(--d-line)] px-5 py-4">
                  {step.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-2.5 text-sm text-[var(--d-ink-soft)]">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--d-crimson-soft)] text-[var(--d-crimson)]">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="px-5 pb-3">
            <span className="text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-[var(--d-ink-soft)]">
              {open ? content.collapseLabel : content.expandLabel}
            </span>
          </div>
        </div>
      </div>
    </li>
  );
}
