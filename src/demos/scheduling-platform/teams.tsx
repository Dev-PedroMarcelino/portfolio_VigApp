"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, RotateCw, UsersRound } from "lucide-react";
import type { TeamsContent } from "./content";
import { SectionLabel, initialsOf } from "./ui";

const AVATAR_TONES = ["#0D9488", "#F59E0B", "#0F766E", "#14B8A6"];

export function TeamsSection({ content }: { content: TeamsContent }) {
  const reduce = useReducedMotion() ?? false;
  const [mode, setMode] = useState<"robin" | "collective">("robin");
  const [nextIdx, setNextIdx] = useState(0);

  const activeMode = content.modes.find((m) => m.id === mode) ?? content.modes[0];

  return (
    <section
      id="teams"
      className="scroll-mt-20 bg-[var(--d-dark)] px-5 py-20 text-[#E6FFFA] md:py-28"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_1.05fr]">
        <div>
          <SectionLabel text={content.label} tone="light" />
          <h2 className="mt-5 [font-family:var(--demo-display)] text-3xl font-extrabold tracking-tight md:text-5xl">
            {content.title}
          </h2>
          <p className="mt-4 max-w-md leading-[1.8] text-[var(--d-mint-dim)]">{content.intro}</p>

          <div
            className="mt-8 inline-flex rounded-full border border-[var(--d-dark-line)] bg-[var(--d-dark-soft)] p-1"
            role="group"
          >
            {content.modes.map((m) => {
              const selected = m.id === mode;
              return (
                <button
                  key={m.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setMode(m.id)}
                  className={`rounded-full px-5 py-2 text-[0.78rem] font-bold transition-colors ${
                    selected
                      ? "bg-[var(--d-accent)] text-white"
                      : "text-[var(--d-mint-dim)] hover:text-white"
                  }`}
                >
                  {m.label}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.p
              key={activeMode.id}
              initial={reduce ? undefined : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="mt-4 max-w-md text-sm leading-relaxed text-[var(--d-mint-dim)]"
            >
              {activeMode.blurb}
            </motion.p>
          </AnimatePresence>

          <ul className="mt-8 space-y-3.5">
            {content.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-sm">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--d-accent)]/25 text-[#5EEAD4]">
                  <Check className="h-3 w-3" strokeWidth={2.8} aria-hidden />
                </span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* CSS-built team routing card */}
        <div className="rounded-[1.75rem] border border-[var(--d-dark-line)] bg-[var(--d-dark-soft)] p-6 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.6)] md:p-7">
          <div className="flex items-center justify-between gap-3 border-b border-[var(--d-dark-line)] pb-4">
            <p className="flex items-center gap-2 text-sm font-bold">
              <UsersRound className="h-4 w-4 text-[#5EEAD4]" strokeWidth={2.2} aria-hidden />
              {content.cardTitle}
            </p>
            <span className="rounded-full bg-[var(--d-accent)]/20 px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-[#5EEAD4]">
              {activeMode.label}
            </span>
          </div>

          <ul className="mt-5 space-y-3">
            {content.members.map((member, idx) => {
              const highlighted = mode === "collective" || idx === nextIdx;
              const filledBars = 3 + ((idx * 2 + 1) % 5);
              return (
                <li
                  key={member.name}
                  className={`flex items-center gap-3 rounded-2xl border p-3 transition-colors ${
                    highlighted
                      ? "border-[var(--d-accent)]/60 bg-[var(--d-accent)]/10"
                      : "border-transparent"
                  }`}
                >
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: AVATAR_TONES[idx % AVATAR_TONES.length] }}
                    aria-hidden
                  >
                    {initialsOf(member.name)}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-bold">{member.name}</span>
                    <span className="block truncate text-[0.68rem] text-[var(--d-mint-dim)]">
                      {member.role}
                    </span>
                  </span>
                  <span className="hidden items-center gap-0.5 sm:flex" aria-hidden>
                    {Array.from({ length: 8 }, (_, bar) => (
                      <span
                        key={bar}
                        className={`h-4 w-1.5 rounded-full ${
                          bar < filledBars ? "bg-[var(--d-accent)]" : "bg-[var(--d-dark-line)]"
                        }`}
                      />
                    ))}
                  </span>
                  <AnimatePresence mode="wait">
                    {mode === "robin" && idx === nextIdx && (
                      <motion.span
                        key={`next-${idx}`}
                        initial={reduce ? undefined : { scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={reduce ? undefined : { scale: 0.6, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 18 }}
                        className="shrink-0 rounded-full bg-[var(--d-pop)] px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-[0.1em] text-[#3B2903]"
                      >
                        {content.nextUp}
                      </motion.span>
                    )}
                    {mode === "collective" && (
                      <motion.span
                        key={`joins-${idx}`}
                        initial={reduce ? undefined : { scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={reduce ? undefined : { scale: 0.6, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 18 }}
                        className="flex shrink-0 items-center gap-1 rounded-full bg-[var(--d-accent)]/25 px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-[0.1em] text-[#5EEAD4]"
                      >
                        <Check className="h-2.5 w-2.5" strokeWidth={3} aria-hidden />
                        {content.joins}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>

          {mode === "robin" && (
            <button
              type="button"
              onClick={() => setNextIdx((v) => (v + 1) % content.members.length)}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-full border border-[var(--d-dark-line)] py-3 text-sm font-bold text-[#5EEAD4] transition-colors hover:bg-[var(--d-accent)]/15"
            >
              <RotateCw className="h-4 w-4" strokeWidth={2.2} aria-hidden />
              {content.simulate}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
