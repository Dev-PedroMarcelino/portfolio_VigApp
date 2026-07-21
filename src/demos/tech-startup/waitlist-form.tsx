"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CircleCheck } from "lucide-react";
import type { WaitlistCopy } from "./content";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Deterministic queue position derived from the email — no Math.random. */
function queuePosition(email: string) {
  let sum = 0;
  for (let i = 0; i < email.length; i += 1) sum += email.charCodeAt(i) * (i + 3);
  return 4210 + (sum % 680);
}

export function WaitlistForm({
  copy,
  numberLocale,
  idPrefix,
}: {
  copy: WaitlistCopy;
  numberLocale: string;
  idPrefix: string;
}) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [joined, setJoined] = useState<string | null>(null);
  const reduce = useReducedMotion() ?? false;

  const format = useMemo(() => new Intl.NumberFormat(numberLocale), [numberLocale]);
  const inputId = `${idPrefix}-email`;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const value = email.trim();
    if (!EMAIL_RE.test(value)) {
      setError(true);
      return;
    }
    setError(false);
    setJoined(value);
  }

  return (
    <div className="w-full max-w-md">
      <AnimatePresence mode="wait" initial={false}>
        {joined === null ? (
          <motion.form
            key="form"
            noValidate
            onSubmit={submit}
            initial={reduce ? undefined : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <label
              htmlFor={inputId}
              className="mb-2 block text-left text-[0.64rem] font-semibold uppercase tracking-[0.24em] text-[var(--d-ink-faint)]"
            >
              {copy.emailLabel}
            </label>
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                id={inputId}
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError(false);
                }}
                placeholder={copy.placeholder}
                aria-invalid={error}
                className={`h-12 flex-1 rounded-xl border bg-[var(--d-bg-raise)]/90 px-4 text-sm text-[var(--d-ink)] placeholder:text-[var(--d-ink-faint)] focus:outline-none focus:ring-2 focus:ring-[var(--d-accent)]/70 ${
                  error ? "border-[var(--d-rose)]" : "border-[var(--d-line-bright)]"
                }`}
              />
              <button
                type="submit"
                className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-[var(--d-accent)] px-5 text-sm font-semibold text-white shadow-[0_8px_30px_-8px_rgba(139,92,246,0.8)] transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[var(--d-accent-soft)]"
              >
                {copy.button}
                <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
              </button>
            </div>
            <div aria-live="polite">
              {error ? (
                <p className="mt-2 text-left text-xs text-[var(--d-rose)]">{copy.invalid}</p>
              ) : null}
            </div>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            role="status"
            initial={reduce ? undefined : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border border-[var(--d-green)]/30 bg-[var(--d-green)]/[0.07] p-5 text-left"
          >
            <div className="flex items-start gap-3">
              <CircleCheck
                className="mt-0.5 h-5 w-5 shrink-0 text-[var(--d-green)]"
                strokeWidth={2}
                aria-hidden
              />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[var(--d-ink)]">{copy.successTitle}</p>
                <p className="mt-1 text-xs leading-relaxed text-[var(--d-ink-dim)]">
                  {copy.successBody}
                </p>
                <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 [font-family:var(--d-mono)] text-xs">
                  <span className="truncate text-[var(--d-ink)]">{joined}</span>
                  <span className="text-[var(--d-ink-faint)]">
                    {copy.positionLabel} #{format.format(queuePosition(joined))}
                  </span>
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setJoined(null);
                    setEmail("");
                  }}
                  className="mt-3 text-xs font-medium text-[var(--d-accent-soft)] underline-offset-4 hover:underline"
                >
                  {copy.reset}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
