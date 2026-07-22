"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotionSafe as useReducedMotion } from "@/components/demos/use-reduced-motion-safe";
import {
  CircleCheck,
  ChevronLeft,
  ChevronRight,
  Delete,
  MoonStar,
  Receipt,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { PixBulletIcon, PixContactSeed, ZelaContent } from "./content";
import { PIX_CONTACTS } from "./content";
import { Blob, EASE, fmtBRL, SectionLabel } from "./ui";

const BULLET_ICONS: Record<PixBulletIcon, LucideIcon> = {
  users: Users,
  receipt: Receipt,
  "moon-star": MoonStar,
};

const MAX_CENTS = 99_999_99; // R$ 99.999,99 is plenty for a demo Pix

/* Deterministic confetti pieces (no Math.random — stable across renders). */
const CONFETTI = Array.from({ length: 16 }, (_, i) => {
  const t = Math.abs(Math.sin((i + 1) * 12.9898) * 43758.5453) % 1;
  const u = Math.abs(Math.sin((i + 1) * 78.233) * 12543.2971) % 1;
  return {
    left: 6 + t * 88, // %
    drift: (u - 0.5) * 46, // px
    rotate: (t - 0.5) * 300,
    delay: u * 0.25,
    color: ["#7CB342", "#E8A13D", "#166B4A", "#C05B41"][i % 4],
  };
});

function Confetti() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-40 overflow-hidden">
      {CONFETTI.map((p, i) => (
        <motion.span
          key={i}
          initial={{ y: -14, x: 0, opacity: 0, rotate: 0 }}
          animate={{ y: 150, x: p.drift, opacity: [0, 1, 1, 0], rotate: p.rotate }}
          transition={{ duration: 1.5, delay: 0.15 + p.delay, ease: "easeOut" }}
          className="absolute top-0 h-2 w-1.5 rounded-[2px]"
          style={{ left: `${p.left}%`, backgroundColor: p.color }}
        />
      ))}
    </div>
  );
}

function StepDots({ step, labels }: { step: number; labels: [string, string, string] }) {
  return (
    <ol className="flex items-center justify-center gap-2" aria-label={labels.join(" · ")}>
      {labels.map((label, i) => (
        <li key={label} className="flex items-center gap-2">
          <span
            aria-current={i === step ? "step" : undefined}
            className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.62rem] font-medium uppercase tracking-[0.14em] [font-family:var(--demo-mono)] transition-colors ${
              i === step
                ? "bg-[var(--d-green)] text-[#FFFDF7]"
                : i < step
                  ? "text-[var(--d-green)]"
                  : "text-[var(--d-ink-soft)]/60"
            }`}
          >
            {i + 1} · {label}
          </span>
          {i < 2 && <span className="h-px w-3 bg-[var(--d-line)]" aria-hidden />}
        </li>
      ))}
    </ol>
  );
}

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "back"] as const;

export function ZelaPix({ content }: { content: ZelaContent["pix"] }) {
  const reduced = useReducedMotion() ?? false;
  const flow = content.flow;

  const [step, setStep] = useState(0);
  const [contact, setContact] = useState<PixContactSeed>(PIX_CONTACTS[0]);
  const [cents, setCents] = useState(0);

  const press = (key: (typeof KEYS)[number]) => {
    if (key === "back") {
      setCents((c) => Math.floor(c / 10));
    } else if (key !== "") {
      setCents((c) => Math.min(MAX_CENTS, c * 10 + Number(key)));
    }
  };

  const reset = () => {
    setCents(0);
    setStep(0);
  };

  const slide = {
    initial: reduced ? { opacity: 0 } : { opacity: 0, x: 26 },
    animate: reduced ? { opacity: 1 } : { opacity: 1, x: 0 },
    exit: reduced ? { opacity: 0 } : { opacity: 0, x: -26 },
    transition: { duration: 0.3, ease: EASE },
  };

  return (
    <section
      id="pix"
      className="relative scroll-mt-16 overflow-hidden border-y border-[var(--d-line)] bg-[var(--d-surface)] py-20 sm:py-28"
    >
      <Blob color="rgba(22,107,74,0.08)" className="-right-40 bottom-0 h-[30rem] w-[30rem]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-2">
        <div>
          <SectionLabel text={content.label} />
          <h2 className="mt-5 text-3xl leading-tight tracking-tight text-[var(--d-ink)] [font-family:var(--demo-display)] sm:text-[2.7rem] sm:leading-[1.08]">
            {content.titleLead}{" "}
            <em className="font-medium italic text-[var(--d-green)]">{content.titleAccent}</em>
          </h2>
          <p className="mt-5 max-w-lg text-[0.95rem] leading-relaxed text-[var(--d-ink-soft)]">
            {content.intro}
          </p>

          <ul className="mt-9 space-y-5">
            {content.bullets.map((b, i) => {
              const Icon = BULLET_ICONS[b.icon];
              return (
                <motion.li
                  key={b.title}
                  initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
                  whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.55, delay: i * 0.1, ease: EASE }}
                  className="flex gap-4"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl rounded-tl-sm bg-[var(--d-green)]/10 text-[var(--d-green)]">
                    <Icon className="h-5 w-5" strokeWidth={1.7} />
                  </span>
                  <span>
                    <span className="block text-[0.95rem] font-semibold text-[var(--d-ink)] [font-family:var(--demo-display)]">
                      {b.title}
                    </span>
                    <span className="mt-1 block text-[0.85rem] leading-relaxed text-[var(--d-ink-soft)]">
                      {b.body}
                    </span>
                  </span>
                </motion.li>
              );
            })}
          </ul>
        </div>

        {/* Interactive Pix flow */}
        <div className="relative mx-auto w-full max-w-[360px]">
          <div className="rounded-[2.2rem] border border-[var(--d-line)] bg-[var(--d-bg)] p-5 shadow-[0_48px_90px_-46px_rgba(28,43,36,0.4)]">
            <StepDots step={step} labels={flow.steps} />

            <div className="relative mt-5 min-h-[368px]">
              <AnimatePresence mode="wait" initial={false}>
                {step === 0 && (
                  <motion.div key="contact" {...slide}>
                    <p className="text-center text-lg font-medium text-[var(--d-ink)] [font-family:var(--demo-display)]">
                      {flow.toWhom}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {PIX_CONTACTS.map((c) => (
                        <li key={c.id}>
                          <motion.button
                            type="button"
                            onClick={() => {
                              setContact(c);
                              setStep(1);
                            }}
                            whileHover={reduced ? undefined : { x: 4 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ duration: 0.2, ease: EASE }}
                            className="group flex w-full items-center gap-3 rounded-2xl border border-[var(--d-line)] bg-[var(--d-surface)] px-3.5 py-3 text-left transition-colors hover:border-[var(--d-green)]/40"
                          >
                            <span
                              className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-[0.72rem] font-bold text-[#FFFDF7]"
                              style={{ backgroundColor: c.color }}
                            >
                              {c.initials}
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-[0.85rem] font-medium text-[var(--d-ink)]">
                                {c.name}
                              </span>
                              <span className="block text-[0.68rem] text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]">
                                {flow.contacts[c.id].keyHint}
                              </span>
                            </span>
                            <ChevronRight
                              className="h-4 w-4 shrink-0 text-[var(--d-ink-soft)]/50 transition-transform group-hover:translate-x-0.5 group-hover:text-[var(--d-green)]"
                              strokeWidth={2}
                            />
                          </motion.button>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {step === 1 && (
                  <motion.div key="amount" {...slide}>
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setStep(0)}
                        className="flex items-center gap-1 rounded-full px-2 py-1 text-[0.72rem] font-medium text-[var(--d-ink-soft)] transition-colors hover:text-[var(--d-ink)]"
                      >
                        <ChevronLeft className="h-3.5 w-3.5" strokeWidth={2} />
                        {flow.back}
                      </button>
                      <p className="text-[0.7rem] text-[var(--d-ink-soft)]">
                        {flow.sendingTo}{" "}
                        <span className="font-medium text-[var(--d-ink)]">{contact.name}</span>
                      </p>
                    </div>

                    <p className="mt-4 text-center text-[0.7rem] uppercase tracking-[0.18em] text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]">
                      {flow.howMuch}
                    </p>
                    <motion.p
                      key={cents}
                      initial={reduced ? undefined : { scale: 0.96 }}
                      animate={reduced ? undefined : { scale: 1 }}
                      transition={{ duration: 0.18, ease: EASE }}
                      aria-live="polite"
                      className={`mt-1 text-center text-[2.1rem] font-medium [font-family:var(--demo-mono)] ${
                        cents === 0 ? "text-[var(--d-ink-soft)]/50" : "text-[var(--d-ink)]"
                      }`}
                    >
                      {fmtBRL(cents / 100)}
                    </motion.p>

                    <div className="mt-4 grid grid-cols-3 gap-1.5">
                      {KEYS.map((key, i) =>
                        key === "" ? (
                          <span key={`sp-${i}`} aria-hidden />
                        ) : (
                          <motion.button
                            key={key}
                            type="button"
                            onClick={() => press(key)}
                            whileTap={{ scale: 0.9 }}
                            transition={{ duration: 0.15, ease: EASE }}
                            aria-label={key === "back" ? flow.eraseLabel : `${flow.digitLabel} ${key}`}
                            className="grid h-12 place-items-center rounded-xl bg-[var(--d-surface)] text-lg font-medium text-[var(--d-ink)] [font-family:var(--demo-mono)] transition-colors hover:bg-[var(--d-green)]/8"
                          >
                            {key === "back" ? (
                              <Delete className="h-4.5 w-4.5 text-[var(--d-ink-soft)]" strokeWidth={1.8} />
                            ) : (
                              key
                            )}
                          </motion.button>
                        ),
                      )}
                    </div>

                    <motion.button
                      type="button"
                      onClick={() => setStep(2)}
                      disabled={cents === 0}
                      whileTap={cents === 0 ? undefined : { scale: 0.97 }}
                      className="mt-4 w-full rounded-full bg-[var(--d-green)] py-3.5 text-sm font-medium text-[#FFFDF7] shadow-[0_14px_28px_-14px_rgba(22,107,74,0.7)] transition-opacity disabled:opacity-35"
                    >
                      {flow.confirm}
                    </motion.button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="receipt" {...slide} className="relative">
                    {!reduced && <Confetti />}

                    <motion.span
                      initial={reduced ? { opacity: 0 } : { scale: 0.4, opacity: 0 }}
                      animate={reduced ? { opacity: 1 } : { scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 240, damping: 15, delay: 0.05 }}
                      className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[var(--d-green)]/12 text-[var(--d-green)]"
                    >
                      <CircleCheck className="h-9 w-9" strokeWidth={1.6} />
                    </motion.span>

                    <p className="mt-3 text-center text-xl font-medium text-[var(--d-ink)] [font-family:var(--demo-display)]">
                      {flow.receiptTitle}
                    </p>
                    <p className="mt-1 text-center text-[0.8rem] text-[var(--d-ink-soft)]">
                      {flow.receiptSub}
                    </p>

                    <dl className="mt-5 space-y-2.5 rounded-2xl border border-dashed border-[var(--d-line)] bg-[var(--d-surface)] p-4 text-[0.8rem]">
                      {[
                        [flow.toLabel, contact.name],
                        [flow.amountLabel, fmtBRL(cents / 100)],
                        [flow.whenLabel, flow.whenValue],
                        [flow.feeLabel, flow.feeValue],
                      ].map(([k, v]) => (
                        <div key={k} className="flex items-center justify-between gap-3">
                          <dt className="text-[var(--d-ink-soft)]">{k}</dt>
                          <dd className="font-medium text-[var(--d-ink)] [font-family:var(--demo-mono)]">{v}</dd>
                        </div>
                      ))}
                      <div className="flex items-center justify-between gap-3 border-t border-[var(--d-line)] pt-2.5">
                        <dt className="text-[var(--d-ink-soft)]">{flow.idLabel}</dt>
                        <dd className="text-[0.68rem] text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]">
                          E2026Z-{String(1000 + cents % 9000)}
                        </dd>
                      </div>
                    </dl>

                    <motion.button
                      type="button"
                      onClick={reset}
                      whileTap={{ scale: 0.97 }}
                      className="mt-4 w-full rounded-full border border-[var(--d-green)]/40 py-3 text-sm font-medium text-[var(--d-green)] transition-colors hover:bg-[var(--d-green)]/8"
                    >
                      {flow.again}
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
