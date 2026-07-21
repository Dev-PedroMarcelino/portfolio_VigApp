"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import type { UseCasesContent, UseCaseId } from "./content";
import { Glow, SectionHeading } from "./ui";

export function UseCases({ content }: { content: UseCasesContent }) {
  const [active, setActive] = useState<UseCaseId>("support");
  const tab = content.tabs.find((t) => t.id === active) ?? content.tabs[0];

  return (
    <section id="usecases" className="relative scroll-mt-20 py-24">
      <Glow className="right-[-8%] top-32 h-[30rem] w-[30rem]" />
      <div className="relative mx-auto max-w-6xl px-5">
        <SectionHeading label={content.label} title={content.title} intro={content.intro} align="left" />

        <div
          role="tablist"
          aria-label={content.label}
          className="mt-9 flex w-full gap-1 overflow-x-auto rounded-2xl border border-[var(--d-line)] bg-[var(--d-panel)] p-1"
        >
          {content.tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={active === t.id}
              onClick={() => setActive(t.id)}
              className={`relative flex-1 whitespace-nowrap rounded-xl px-4 py-2.5 text-[0.82rem] font-medium transition-colors ${
                active === t.id ? "text-[var(--d-accent-ink)]" : "text-[var(--d-ink-soft)] hover:text-[var(--d-ink)]"
              }`}
            >
              {active === t.id && (
                <motion.span
                  layoutId="usecase-pill"
                  transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  className="absolute inset-0 rounded-xl bg-[var(--d-accent)] shadow-[0_0_24px_-8px_var(--d-accent)]"
                  aria-hidden
                />
              )}
              <span className="relative z-10">{t.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-8 grid items-stretch gap-6 lg:grid-cols-[1fr_1fr]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`copy-${tab.id}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col justify-between rounded-2xl border border-[var(--d-line)] bg-[rgba(11,10,20,0.55)] p-7 backdrop-blur-sm"
            >
              <div>
                <h3 className="[font-family:var(--demo-display)] text-2xl font-semibold tracking-tight text-[var(--d-ink)] sm:text-[1.7rem]">
                  {tab.title}
                </h3>
                <p className="mt-3 text-[0.92rem] leading-relaxed text-[var(--d-ink-soft)]">{tab.body}</p>
                <ul className="mt-6 space-y-3">
                  {tab.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3 text-[0.88rem] text-[var(--d-ink)]">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[rgba(167,139,250,0.16)]">
                        <Check className="h-3 w-3 text-[var(--d-accent)]" strokeWidth={2.6} aria-hidden />
                      </span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8 flex items-baseline gap-3 border-t border-[var(--d-line)] pt-6">
                <span className="[font-family:var(--demo-display)] text-4xl font-semibold text-[var(--d-accent-bright)]">
                  {tab.metricValue}
                </span>
                <span className="text-[0.8rem] leading-tight text-[var(--d-ink-soft)]">{tab.metricLabel}</span>
              </div>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`img-${tab.id}`}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35 }}
              className="relative min-h-72 overflow-hidden rounded-2xl border border-[var(--d-line)]"
            >
              <Image
                src={tab.image}
                alt={tab.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(160deg, rgba(124,58,237,0.42) 0%, rgba(5,5,10,0.35) 45%, rgba(5,5,10,0.9) 100%)",
                  mixBlendMode: "multiply",
                }}
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{ boxShadow: "inset 0 0 100px -20px rgba(167,139,250,0.4)" }}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
