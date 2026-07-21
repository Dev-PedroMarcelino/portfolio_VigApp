"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Send } from "lucide-react";
import type { ContactContent } from "./content";
import { LoudButton } from "./ui";

type Status = "idle" | "sending" | "done";

export function LoudContact({ content }: { content: ContactContent }) {
  const reduce = useReducedMotion() ?? false;
  const f = content.form;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [project, setProject] = useState(f.projectOptions[0]);
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState(false);

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const valid = name.trim().length > 1 && emailOk && message.trim().length > 4;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) {
      setError(true);
      return;
    }
    setError(false);
    setStatus("sending");
    window.setTimeout(() => setStatus("done"), 900);
  };

  const reset = () => {
    setName("");
    setEmail("");
    setProject(f.projectOptions[0]);
    setBudget("");
    setMessage("");
    setStatus("idle");
    setError(false);
  };

  const fieldBase =
    "w-full border-2 border-[var(--d-ink)] bg-[var(--d-bg)] px-4 py-3 [font-family:var(--demo-body)] text-sm text-[var(--d-ink)] placeholder:text-[var(--d-ink)]/40 focus:outline-none focus:ring-4 focus:ring-[var(--d-accent)]/40";
  const labelBase =
    "mb-2 block [font-family:var(--demo-body)] text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[var(--d-ink)]/70";

  return (
    <section id="contact" className="border-b-2 border-[var(--d-ink)] bg-[var(--d-accent)] scroll-mt-16">
      <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          {/* Yelling headline column */}
          <div>
            <span className="inline-flex items-center gap-2 border-2 border-[var(--d-accent-ink)] bg-[var(--d-accent)] px-3 py-1.5 [font-family:var(--demo-body)] text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[var(--d-accent-ink)]">
              <span className="h-2 w-2 bg-[var(--d-accent-ink)]" aria-hidden />
              {content.label}
            </span>
            <h2 className="mt-6 [font-family:var(--demo-display)] leading-[0.86] tracking-tight text-[var(--d-accent-ink)]">
              {content.headline.map((line) => (
                <span key={line} className="block text-[13vw] sm:text-[9vw] lg:text-[5.5rem]">
                  {line}
                </span>
              ))}
            </h2>
            <p className="mt-6 max-w-md [font-family:var(--demo-body)] text-sm leading-relaxed text-[var(--d-accent-ink)]/85 md:text-base">
              {content.sub}
            </p>

            <dl className="mt-10 flex flex-col gap-px overflow-hidden border-2 border-[var(--d-accent-ink)] bg-[var(--d-accent-ink)]">
              {content.meta.map((m) => (
                <div key={m.label} className="flex items-center justify-between gap-4 bg-[var(--d-accent)] px-4 py-3">
                  <dt className="[font-family:var(--demo-body)] text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[var(--d-accent-ink)]/70">
                    {m.label}
                  </dt>
                  <dd className="[font-family:var(--demo-body)] text-sm font-bold text-[var(--d-accent-ink)]">
                    {m.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Form / success card */}
          <div className="border-2 border-[var(--d-ink)] bg-[var(--d-bg)] p-6 shadow-[10px_10px_0_0_var(--d-ink)] md:p-8">
            <AnimatePresence mode="wait">
              {status === "done" ? (
                <motion.div
                  key="done"
                  initial={reduce ? undefined : { opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduce ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex min-h-[420px] flex-col items-center justify-center text-center"
                >
                  <span className="flex h-16 w-16 items-center justify-center border-2 border-[var(--d-ink)] bg-[var(--d-accent)] text-[var(--d-accent-ink)] shadow-[6px_6px_0_0_var(--d-ink)]">
                    <Check className="h-8 w-8" strokeWidth={3} aria-hidden />
                  </span>
                  <h3 className="mt-8 [font-family:var(--demo-display)] text-4xl leading-none tracking-tight text-[var(--d-ink)] md:text-5xl">
                    {f.successTitle}
                  </h3>
                  <p className="mt-4 max-w-sm [font-family:var(--demo-body)] text-sm leading-relaxed text-[var(--d-ink)]/70">
                    {f.successBody}
                  </p>
                  <div className="mt-8">
                    <LoudButton variant="outline" onClick={reset}>
                      {f.reset}
                    </LoudButton>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={submit}
                  initial={reduce ? undefined : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduce ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col gap-5"
                  noValidate
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="lh-name" className={labelBase}>
                        {f.nameLabel}
                      </label>
                      <input
                        id="lh-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={f.namePlaceholder}
                        className={fieldBase}
                        autoComplete="name"
                      />
                    </div>
                    <div>
                      <label htmlFor="lh-email" className={labelBase}>
                        {f.emailLabel}
                      </label>
                      <input
                        id="lh-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={f.emailPlaceholder}
                        className={fieldBase}
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  <div>
                    <span className={labelBase}>{f.projectLabel}</span>
                    <div className="flex flex-wrap gap-2">
                      {f.projectOptions.map((opt) => {
                        const on = project === opt;
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setProject(opt)}
                            aria-pressed={on}
                            className={`border-2 border-[var(--d-ink)] px-3.5 py-2 [font-family:var(--demo-body)] text-xs font-bold uppercase tracking-[0.1em] transition-all ${
                              on
                                ? "bg-[var(--d-ink)] text-[var(--d-bg)] shadow-[3px_3px_0_0_var(--d-accent)]"
                                : "bg-[var(--d-bg)] text-[var(--d-ink)] hover:-translate-y-0.5"
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="lh-budget" className={labelBase}>
                      {f.budgetLabel}
                    </label>
                    <select
                      id="lh-budget"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className={`${fieldBase} appearance-none`}
                    >
                      <option value="">—</option>
                      {f.budgetOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="lh-message" className={labelBase}>
                      {f.messageLabel}
                    </label>
                    <textarea
                      id="lh-message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={f.messagePlaceholder}
                      rows={4}
                      className={`${fieldBase} resize-none`}
                    />
                  </div>

                  {error ? (
                    <p
                      role="alert"
                      className="border-2 border-[var(--d-ink)] bg-[var(--d-accent)] px-3 py-2 [font-family:var(--demo-body)] text-xs font-bold uppercase tracking-[0.08em] text-[var(--d-accent-ink)]"
                    >
                      {f.invalid}
                    </p>
                  ) : null}

                  <LoudButton type="submit" className="w-full" disabled={status === "sending"}>
                    {status === "sending" ? f.sending : f.submit}
                    <Send className="h-4 w-4 transition-transform group-hover/lb:translate-x-1" strokeWidth={2.5} aria-hidden />
                  </LoudButton>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
