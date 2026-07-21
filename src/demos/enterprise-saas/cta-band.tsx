"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import type { CtaContent } from "./content";

const BG_IMG =
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function CtaBand({ content }: { content: CtaContent }) {
  const reduce = useReducedMotion();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setError(true);
      return;
    }
    setError(false);
    setSubmitted(true);
  };

  const reset = () => {
    setSubmitted(false);
    setEmail("");
    setError(false);
  };

  return (
    <section id="cta" className="relative scroll-mt-20 overflow-hidden py-28">
      {/* Duotone photographic backdrop */}
      <div className="absolute inset-0" aria-hidden>
        <Image
          src={BG_IMG}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-[rgba(59,130,246,0.2)] mix-blend-color" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A101F] via-[rgba(10,16,31,0.82)] to-[#0A101F]" />
      </div>

      <div className="relative mx-auto max-w-3xl px-5 text-center">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
          className="rounded-3xl border border-[var(--d-line)] bg-[rgba(15,23,42,0.66)] px-6 py-12 shadow-[0_50px_140px_-40px_rgba(2,6,23,1),0_0_80px_-30px_rgba(96,165,250,0.5)] backdrop-blur-2xl sm:px-14"
        >
          <h2 className="[font-family:var(--demo-display)] text-3xl font-semibold tracking-tight text-[var(--d-ink)] sm:text-4xl">
            {content.title}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[0.92rem] leading-relaxed text-[var(--d-ink-soft)]">
            {content.sub}
          </p>

          <div className="mt-8 min-h-32">
            <AnimatePresence mode="wait" initial={false}>
              {submitted ? (
                <motion.div
                  key="success"
                  initial={reduce ? false : { opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduce ? undefined : { opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center gap-3"
                >
                  <CheckCircle2 className="h-10 w-10 text-[#34D399]" strokeWidth={1.6} aria-hidden />
                  <p className="text-lg font-semibold text-[var(--d-ink)]">{content.successTitle}</p>
                  <p className="rounded-full border border-[var(--d-line)] bg-[var(--d-panel)] px-4 py-1.5 font-mono text-[0.76rem] text-[#93C5FD]">
                    {email.trim()}
                  </p>
                  <p className="max-w-sm text-[0.82rem] text-[var(--d-ink-soft)]">{content.successBody}</p>
                  <button
                    type="button"
                    onClick={reset}
                    className="mt-1 text-[0.76rem] font-medium text-[var(--d-accent)] underline-offset-4 transition-colors hover:underline"
                  >
                    {content.another}
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={submit}
                  noValidate
                  className="mx-auto flex max-w-md flex-col gap-3"
                >
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <div className="flex-1">
                      <label htmlFor="of-cta-email" className="sr-only">
                        {content.emailLabel}
                      </label>
                      <input
                        id="of-cta-email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (error) setError(false);
                        }}
                        placeholder={content.emailPlaceholder}
                        aria-invalid={error}
                        aria-describedby={error ? "of-cta-error" : undefined}
                        className={`w-full rounded-full border bg-[rgba(10,16,31,0.7)] px-5 py-3 text-sm text-[var(--d-ink)] placeholder:text-[var(--d-ink-faint)] outline-none transition-colors focus:border-[var(--d-accent)]/70 ${
                          error ? "border-[#FB7185]/70" : "border-[var(--d-line-strong)]"
                        }`}
                      />
                    </div>
                    <button
                      type="submit"
                      className="group flex items-center justify-center gap-2 rounded-full bg-[var(--d-accent)] px-6 py-3 text-sm font-semibold text-[var(--d-accent-ink)] shadow-[0_0_36px_-8px_rgba(96,165,250,0.9)] transition-transform hover:scale-[1.03]"
                    >
                      {content.button}
                      <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                        strokeWidth={2.2}
                        aria-hidden
                      />
                    </button>
                  </div>
                  <div aria-live="polite" className="min-h-4">
                    {error && (
                      <p id="of-cta-error" className="text-[0.74rem] font-medium text-[#FDA4AF]">
                        {content.errorInvalid}
                      </p>
                    )}
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          <p className="mt-6 text-[0.68rem] tracking-wide text-[var(--d-ink-faint)]">{content.finePrint}</p>
        </motion.div>
      </div>
    </section>
  );
}
