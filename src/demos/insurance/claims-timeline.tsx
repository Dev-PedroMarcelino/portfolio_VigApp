"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, ChevronDown, Clock } from "lucide-react";
import type { ClaimsContent } from "./content";
import { SectionLabel } from "./ui";

const DESK_IMG =
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80";

export function ClaimsTimeline({ content }: { content: ClaimsContent }) {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion() ?? false;

  return (
    <section id="claims" className="scroll-mt-20 bg-[var(--d-bg)] px-5 py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionLabel text={content.label} />
          <h2 className="mt-5 [font-family:var(--demo-display)] text-4xl font-extrabold tracking-tight text-[var(--d-ink)] md:text-[2.6rem] md:leading-[1.12]">
            {content.title}
          </h2>
          <p className="mt-4 max-w-md leading-[1.85] text-[var(--d-ink-soft)]">{content.intro}</p>

          <div className="relative mt-9 overflow-hidden rounded-[1.75rem]">
            <div className="relative h-64 sm:h-72">
              <Image
                src={DESK_IMG}
                alt={content.imageAlt}
                fill
                sizes="(min-width: 1024px) 480px, 92vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(160deg, rgba(29,78,216,0.55) 0%, rgba(13,20,64,0.35) 45%, rgba(13,20,64,0.75) 100%)",
                  mixBlendMode: "multiply",
                }}
                aria-hidden
              />
            </div>
            <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-lg backdrop-blur">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--d-accent-soft)] text-[var(--d-accent)]">
                <Clock className="h-4 w-4" strokeWidth={2} aria-hidden />
              </span>
              <div>
                <p className="[font-family:var(--demo-display)] text-lg font-extrabold leading-none tracking-tight text-[var(--d-ink)]">
                  {content.sla.value}
                </p>
                <p className="mt-0.5 text-[0.66rem] font-semibold text-[var(--d-ink-soft)]">
                  {content.sla.label}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[var(--d-ink-soft)]">
            {content.hint}
          </p>
          <ol className="mt-4">
            {content.steps.map((step, i) => {
              const expanded = open === i;
              const last = i === content.steps.length - 1;
              return (
                <li key={step.title} className="relative pl-14">
                  {!last && (
                    <span
                      className="absolute left-[1.19rem] top-12 h-[calc(100%-2.5rem)] w-px bg-[var(--d-line)]"
                      aria-hidden
                    />
                  )}
                  <span
                    className={`absolute left-0 top-2.5 flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-extrabold transition-colors ${
                      expanded
                        ? "border-[var(--d-accent)] bg-[var(--d-accent)] text-white"
                        : "border-[var(--d-line)] bg-white text-[var(--d-accent)]"
                    }`}
                    aria-hidden
                  >
                    {i + 1}
                  </span>

                  <div
                    className={`mb-3 overflow-hidden rounded-[1.25rem] border transition-colors ${
                      expanded
                        ? "border-[var(--d-accent)]/35 bg-white shadow-[0_24px_50px_-36px_rgba(29,78,216,0.55)]"
                        : "border-[var(--d-line)] bg-white/70"
                    }`}
                  >
                    <button
                      type="button"
                      aria-expanded={expanded}
                      onClick={() => setOpen(expanded ? null : i)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    >
                      <span>
                        <span className="block [font-family:var(--demo-display)] text-[1.02rem] font-extrabold tracking-tight text-[var(--d-ink)]">
                          {step.title}
                        </span>
                        <span className="mt-0.5 block text-[0.76rem] text-[var(--d-ink-soft)]">
                          {step.summary}
                        </span>
                      </span>
                      <span className="flex shrink-0 items-center gap-2.5">
                        <span className="hidden rounded-full bg-[var(--d-mist)] px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.1em] text-[var(--d-accent)] sm:inline">
                          {step.duration}
                        </span>
                        <ChevronDown
                          className={`h-4 w-4 text-[var(--d-ink-soft)] transition-transform ${
                            expanded ? "rotate-180" : ""
                          }`}
                          strokeWidth={2.2}
                          aria-hidden
                        />
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {expanded && (
                        <motion.div
                          initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                          animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                          exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-[var(--d-line)]/70 px-5 pb-5 pt-4">
                            <p className="mb-1 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-[var(--d-accent)] sm:hidden">
                              {step.duration}
                            </p>
                            <p className="text-sm leading-[1.8] text-[var(--d-ink-soft)]">{step.detail}</p>
                            <ul className="mt-4 space-y-2">
                              {step.points.map((point) => (
                                <li key={point} className="flex items-start gap-2.5 text-[0.8rem] text-[var(--d-ink)]">
                                  <span className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[var(--d-accent-soft)] text-[var(--d-accent)]">
                                    <Check className="h-2.5 w-2.5" strokeWidth={3.2} aria-hidden />
                                  </span>
                                  {point}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
