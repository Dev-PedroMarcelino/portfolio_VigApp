"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X, Search, ArrowLeft, Check, ChevronRight, Zap } from "lucide-react";
import type { NuvexContent, RecipientSeed } from "./content";
import { RECIPIENTS } from "./content";
import { fmtMoney } from "./ui";

type Step = "recipient" | "amount" | "confirm" | "success";

export interface TransferResult {
  recipient: RecipientSeed;
  amount: number;
  note: string;
  reference: string;
}

export function TransferModal({
  open,
  onClose,
  onComplete,
  balance,
  content,
  localeTag,
  currency,
}: {
  open: boolean;
  onClose: () => void;
  onComplete: (result: TransferResult) => void;
  balance: number;
  content: NuvexContent["transfer"];
  localeTag: string;
  currency: string;
}) {
  const reduced = useReducedMotion() ?? false;
  const [step, setStep] = useState<Step>("recipient");
  const [query, setQuery] = useState("");
  const [recipient, setRecipient] = useState<RecipientSeed | null>(null);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [sending, setSending] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reset when the modal is re-opened.
  useEffect(() => {
    if (open) {
      setStep("recipient");
      setQuery("");
      setRecipient(null);
      setAmount("");
      setNote("");
      setSending(false);
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const numeric = Number(amount) || 0;
  const overBalance = numeric > balance;
  const canContinueAmount = numeric > 0 && !overBalance;

  const filtered = RECIPIENTS.filter((r) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return r.name.toLowerCase().includes(q) || r.handle.toLowerCase().includes(q);
  });

  const reference = `NVX-${(recipient ? recipient.id.replace(/\D/g, "") : "0")}${Math.round(numeric * 100)
    .toString()
    .padStart(4, "0")
    .slice(-4)}`;

  const confirmSend = () => {
    if (!recipient || sending) return;
    setSending(true);
    timer.current = setTimeout(
      () => {
        onComplete({ recipient, amount: numeric, note, reference });
        setStep("success");
        setSending(false);
      },
      reduced ? 200 : 1200,
    );
  };

  const stepIndex = step === "recipient" ? 0 : step === "amount" ? 1 : 2;
  const steps = [content.stepRecipient, content.stepAmount, content.stepConfirm];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[900] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label={content.close}
            onClick={onClose}
            className="absolute inset-0 bg-[#02040A]/80 backdrop-blur-sm"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={content.title}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.98 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex w-full max-w-[440px] flex-col overflow-hidden rounded-t-3xl border border-[var(--d-line)] bg-[var(--d-panel)] shadow-[0_-20px_60px_rgba(0,0,0,0.6)] sm:rounded-3xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[var(--d-line)] px-5 py-4">
              <div className="flex items-center gap-2">
                {step !== "recipient" && step !== "success" && (
                  <button
                    type="button"
                    onClick={() => setStep(step === "confirm" ? "amount" : "recipient")}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--d-ink-soft)] transition-colors hover:bg-[var(--d-bg-soft)] hover:text-[var(--d-ink)]"
                    aria-label={content.back}
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                )}
                <h3 className="text-base font-semibold text-[var(--d-ink)] [font-family:var(--demo-display)]">
                  {content.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label={content.close}
                className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--d-ink-soft)] transition-colors hover:bg-[var(--d-bg-soft)] hover:text-[var(--d-ink)]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Stepper */}
            {step !== "success" && (
              <div className="flex items-center gap-2 px-5 pt-4">
                {steps.map((label, i) => (
                  <div key={label} className="flex flex-1 items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`flex h-5 w-5 items-center justify-center rounded-full text-[0.6rem] font-semibold [font-family:var(--demo-mono)] ${
                          i <= stepIndex
                            ? "bg-[var(--d-accent)] text-[#05070C]"
                            : "bg-[var(--d-bg-soft)] text-[var(--d-ink-soft)]"
                        }`}
                      >
                        {i < stepIndex ? <Check className="h-3 w-3" strokeWidth={3} /> : i + 1}
                      </span>
                      <span
                        className={`text-[0.66rem] tracking-wide ${
                          i <= stepIndex ? "text-[var(--d-ink)]" : "text-[var(--d-ink-soft)]"
                        }`}
                      >
                        {label}
                      </span>
                    </div>
                    {i < steps.length - 1 && (
                      <span
                        className={`h-px flex-1 ${i < stepIndex ? "bg-[var(--d-accent)]" : "bg-[var(--d-line)]"}`}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="px-5 pb-6 pt-5">
              <AnimatePresence mode="wait">
                {/* STEP 1 - recipient */}
                {step === "recipient" && (
                  <motion.div
                    key="recipient"
                    initial={reduced ? false : { opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={reduced ? { opacity: 0 } : { opacity: 0, x: -16 }}
                    transition={{ duration: 0.24 }}
                  >
                    <div className="relative">
                      <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--d-ink-soft)]" />
                      <label htmlFor="nvx-recipient-search" className="sr-only">
                        {content.searchPlaceholder}
                      </label>
                      <input
                        id="nvx-recipient-search"
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={content.searchPlaceholder}
                        className="w-full rounded-xl border border-[var(--d-line)] bg-[var(--d-bg-soft)] py-3 pl-10 pr-3 text-sm text-[var(--d-ink)] placeholder:text-[var(--d-ink-soft)] outline-none focus:border-[var(--d-accent)]/60"
                      />
                    </div>
                    <p className="mt-5 mb-2 text-[0.66rem] uppercase tracking-[0.2em] text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]">
                      {content.recentLabel}
                    </p>
                    <ul className="flex flex-col gap-1">
                      {filtered.map((r) => (
                        <li key={r.id}>
                          <button
                            type="button"
                            onClick={() => {
                              setRecipient(r);
                              setStep("amount");
                            }}
                            className="flex w-full items-center gap-3 rounded-xl px-2 py-2.5 text-left transition-colors hover:bg-[var(--d-bg-soft)]"
                          >
                            <span
                              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-[#05070C] [font-family:var(--demo-mono)]"
                              style={{ backgroundColor: r.color }}
                            >
                              {r.initials}
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-sm text-[var(--d-ink)]">{r.name}</span>
                              <span className="block truncate text-xs text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]">
                                {r.handle}
                              </span>
                            </span>
                            <ChevronRight className="h-4 w-4 text-[var(--d-ink-soft)]" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {/* STEP 2 - amount */}
                {step === "amount" && recipient && (
                  <motion.div
                    key="amount"
                    initial={reduced ? false : { opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={reduced ? { opacity: 0 } : { opacity: 0, x: -16 }}
                    transition={{ duration: 0.24 }}
                  >
                    <div className="mb-5 flex items-center gap-3 rounded-xl border border-[var(--d-line)] bg-[var(--d-bg-soft)] px-3 py-2.5">
                      <span
                        className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold text-[#05070C] [font-family:var(--demo-mono)]"
                        style={{ backgroundColor: recipient.color }}
                      >
                        {recipient.initials}
                      </span>
                      <div>
                        <p className="text-[0.62rem] uppercase tracking-[0.18em] text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]">
                          {content.toLabel}
                        </p>
                        <p className="text-sm text-[var(--d-ink)]">{recipient.name}</p>
                      </div>
                    </div>

                    <label
                      htmlFor="nvx-amount"
                      className="block text-center text-sm text-[var(--d-ink-soft)]"
                    >
                      {content.amountLabel}
                    </label>
                    <div className="mt-3 flex items-center justify-center gap-1">
                      <input
                        id="nvx-amount"
                        inputMode="decimal"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
                        placeholder="0"
                        className="w-full max-w-[220px] bg-transparent text-center text-5xl font-semibold text-[var(--d-ink)] placeholder:text-[var(--d-ink-soft)]/40 outline-none [font-family:var(--demo-mono)]"
                      />
                    </div>
                    <p className="mt-1 text-center text-xs text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]">
                      {currency}
                    </p>

                    <div className="mt-4 flex flex-wrap justify-center gap-2">
                      {content.quickAmounts.map((q) => (
                        <button
                          key={q}
                          type="button"
                          onClick={() => setAmount(String(q))}
                          className="rounded-full border border-[var(--d-line)] px-3.5 py-1.5 text-xs text-[var(--d-ink-soft)] transition-colors hover:border-[var(--d-accent)]/50 hover:text-[var(--d-ink)] [font-family:var(--demo-mono)]"
                        >
                          {fmtMoney(q, localeTag, currency)}
                        </button>
                      ))}
                    </div>

                    <div className="mt-5">
                      <label
                        htmlFor="nvx-note"
                        className="mb-1.5 block text-[0.66rem] uppercase tracking-[0.2em] text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]"
                      >
                        {content.noteLabel}
                      </label>
                      <input
                        id="nvx-note"
                        type="text"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder={content.notePlaceholder}
                        maxLength={48}
                        className="w-full rounded-xl border border-[var(--d-line)] bg-[var(--d-bg-soft)] px-3 py-2.5 text-sm text-[var(--d-ink)] placeholder:text-[var(--d-ink-soft)] outline-none focus:border-[var(--d-accent)]/60"
                      />
                    </div>

                    {overBalance && (
                      <p className="mt-3 text-center text-xs text-[#F87171]">{content.insufficient}</p>
                    )}

                    <button
                      type="button"
                      disabled={!canContinueAmount}
                      onClick={() => setStep("confirm")}
                      className="mt-5 w-full rounded-xl bg-[var(--d-accent)] py-3 text-sm font-semibold text-[#05070C] transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {content.continue}
                    </button>
                  </motion.div>
                )}

                {/* STEP 3 - confirm */}
                {step === "confirm" && recipient && (
                  <motion.div
                    key="confirm"
                    initial={reduced ? false : { opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={reduced ? { opacity: 0 } : { opacity: 0, x: -16 }}
                    transition={{ duration: 0.24 }}
                  >
                    <div className="flex flex-col items-center">
                      <span
                        className="flex h-14 w-14 items-center justify-center rounded-full text-base font-semibold text-[#05070C] [font-family:var(--demo-mono)]"
                        style={{ backgroundColor: recipient.color }}
                      >
                        {recipient.initials}
                      </span>
                      <p className="mt-3 text-sm text-[var(--d-ink-soft)]">{recipient.name}</p>
                      <p className="mt-1 text-4xl font-semibold text-[var(--d-ink)] [font-family:var(--demo-mono)]">
                        {fmtMoney(numeric, localeTag, currency)}
                      </p>
                    </div>

                    <dl className="mt-6 divide-y divide-[var(--d-line)] rounded-xl border border-[var(--d-line)] bg-[var(--d-bg-soft)] px-4">
                      <div className="flex items-center justify-between py-3">
                        <dt className="text-xs text-[var(--d-ink-soft)]">{content.toLabel}</dt>
                        <dd className="text-xs text-[var(--d-ink)] [font-family:var(--demo-mono)]">{recipient.handle}</dd>
                      </div>
                      <div className="flex items-center justify-between py-3">
                        <dt className="text-xs text-[var(--d-ink-soft)]">{content.feeLabel}</dt>
                        <dd className="text-xs font-medium text-[var(--d-accent)] [font-family:var(--demo-mono)]">{content.feeValue}</dd>
                      </div>
                      <div className="flex items-center justify-between py-3">
                        <dt className="text-xs text-[var(--d-ink-soft)]">{content.arrivalLabel}</dt>
                        <dd className="flex items-center gap-1 text-xs text-[var(--d-ink)] [font-family:var(--demo-mono)]">
                          <Zap className="h-3 w-3 text-[var(--d-accent)]" strokeWidth={2} />
                          {content.arrivalValue}
                        </dd>
                      </div>
                      {note && (
                        <div className="flex items-center justify-between gap-3 py-3">
                          <dt className="text-xs text-[var(--d-ink-soft)]">{content.noteLabel}</dt>
                          <dd className="truncate text-xs text-[var(--d-ink)]">{note}</dd>
                        </div>
                      )}
                    </dl>

                    <SlideToSend label={content.send} sending={sending} sendingLabel={content.sendingLabel} onConfirm={confirmSend} reduced={reduced} />
                  </motion.div>
                )}

                {/* STEP 4 - success */}
                {step === "success" && recipient && (
                  <motion.div
                    key="success"
                    initial={reduced ? false : { opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center py-4 text-center"
                  >
                    <motion.span
                      initial={reduced ? false : { scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 240, damping: 16 }}
                      className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--d-accent)] shadow-[0_0_40px_rgba(16,185,129,0.5)]"
                    >
                      <Check className="h-8 w-8 text-[#05070C]" strokeWidth={3} />
                    </motion.span>
                    <h4 className="mt-5 text-lg font-semibold text-[var(--d-ink)] [font-family:var(--demo-display)]">
                      {content.successTitle}
                    </h4>
                    <p className="mt-2 max-w-xs text-sm text-[var(--d-ink-soft)]">
                      {content.successBody.replace("{name}", recipient.name)}
                    </p>
                    <p className="mt-3 text-3xl font-semibold text-[var(--d-ink)] [font-family:var(--demo-mono)]">
                      {fmtMoney(numeric, localeTag, currency)}
                    </p>
                    <p className="mt-4 rounded-full border border-[var(--d-line)] bg-[var(--d-bg-soft)] px-3 py-1.5 text-[0.7rem] text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]">
                      {content.successRef}: {reference}
                    </p>
                    <button
                      type="button"
                      onClick={onClose}
                      className="mt-6 w-full rounded-xl bg-[var(--d-accent)] py-3 text-sm font-semibold text-[#05070C]"
                    >
                      {content.done}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/* Drag-to-confirm control (keyboard-accessible)                       */
/* ------------------------------------------------------------------ */

function SlideToSend({
  label,
  sending,
  sendingLabel,
  onConfirm,
  reduced,
}: {
  label: string;
  sending: boolean;
  sendingLabel: string;
  onConfirm: () => void;
  reduced: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  const complete = () => {
    if (done || sending) return;
    setDone(true);
    onConfirm();
  };

  return (
    <div
      ref={trackRef}
      className="relative mt-6 h-14 w-full overflow-hidden rounded-full border border-[var(--d-line)] bg-[var(--d-bg-soft)]"
    >
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm font-medium text-[var(--d-ink-soft)]"
        aria-hidden
      >
        {sending ? sendingLabel : label}
      </div>
      <motion.button
        type="button"
        aria-label={label}
        onClick={complete}
        drag={reduced || sending ? false : "x"}
        dragConstraints={trackRef}
        dragElastic={0.04}
        dragMomentum={false}
        onDragEnd={(_, info) => {
          const width = trackRef.current?.offsetWidth ?? 320;
          if (info.point.x !== 0 && info.offset.x > width * 0.55) complete();
        }}
        animate={done ? { x: (trackRef.current?.offsetWidth ?? 320) - 56 } : { x: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
        className="absolute left-1 top-1 flex h-12 w-12 cursor-grab items-center justify-center rounded-full bg-[var(--d-accent)] text-[#05070C] shadow-[0_0_20px_rgba(16,185,129,0.4)] active:cursor-grabbing"
      >
        {sending ? (
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
            className="block h-4 w-4 rounded-full border-2 border-[#05070C] border-t-transparent"
          />
        ) : (
          <ChevronRight className="h-5 w-5" strokeWidth={2.4} />
        )}
      </motion.button>
    </div>
  );
}
