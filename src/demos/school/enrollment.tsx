"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarHeart, Check, Loader2, Minus, PartyPopper, Plus } from "lucide-react";
import type { AgeGroupId, EnrollContent } from "./content";
import { Eyebrow, Star } from "./ui";

interface FormState {
  parent: string;
  child: string;
  email: string;
  group: AgeGroupId;
  date: string;
  guests: number;
  notes: string;
}

type Errors = Partial<Record<"parent" | "child" | "email", string>>;
type Status = "idle" | "submitting" | "success";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Enrollment({ content }: { content: EnrollContent }) {
  const { rsvp } = content;
  const [form, setForm] = useState<FormState>({
    parent: "",
    child: "",
    email: "",
    group: "early",
    date: rsvp.dateOptions[0].id,
    guests: 2,
    notes: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (key in errors) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (): Errors => {
    const next: Errors = {};
    if (!form.parent.trim()) next.parent = rsvp.parent.required;
    if (!form.child.trim()) next.child = rsvp.child.required;
    if (!form.email.trim()) next.email = rsvp.email.required;
    else if (!EMAIL_RE.test(form.email.trim())) next.email = rsvp.emailInvalid;
    return next;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setStatus("submitting");
    window.setTimeout(() => setStatus("success"), 1100);
  };

  const reset = () => {
    setForm((f) => ({ ...f, parent: "", child: "", email: "", notes: "", guests: 2 }));
    setErrors({});
    setStatus("idle");
  };

  const inputBase =
    "w-full rounded-2xl border-2 bg-white px-4 py-3 text-sm font-semibold text-[var(--d-ink)] outline-none transition-colors placeholder:font-medium placeholder:text-[var(--d-ink-soft)]/60 focus:border-[var(--d-accent)]";

  return (
    <section id="enroll" className="relative bg-[var(--d-bg)] py-16 sm:py-24">
      <Star className="left-8 top-16 h-5 w-5 opacity-70" color="var(--d-mint)" />
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-2xl">
          <Eyebrow text={content.eyebrow} tone="accent" />
          <h2 className="mt-4 [font-family:var(--demo-display)] text-3xl font-extrabold leading-tight tracking-tight text-[var(--d-ink)] sm:text-4xl">
            {content.title}
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-[var(--d-ink-soft)]">{content.intro}</p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          {/* steps */}
          <ol className="space-y-4">
            {content.steps.map((step, i) => (
              <li
                key={step.title}
                className="flex items-start gap-4 rounded-[1.5rem] border border-[var(--d-line)] bg-white p-5 shadow-[0_16px_40px_-32px_rgba(22,35,61,0.5)]"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--d-accent)] text-lg font-extrabold text-white [font-family:var(--demo-display)]">
                  {i + 1}
                </span>
                <div>
                  <h3 className="[font-family:var(--demo-display)] text-lg font-extrabold text-[var(--d-ink)]">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--d-ink-soft)]">{step.detail}</p>
                </div>
              </li>
            ))}
          </ol>

          {/* RSVP form */}
          <div className="relative overflow-hidden rounded-[2rem] border border-[var(--d-line)] bg-[var(--d-surface)] p-6 shadow-[0_28px_60px_-34px_rgba(22,35,61,0.55)] sm:p-8">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="flex flex-col items-center py-8 text-center"
                >
                  <motion.span
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.05 }}
                    className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--d-mint-soft)] text-[var(--d-mint-deep)]"
                  >
                    <PartyPopper className="h-9 w-9" strokeWidth={2.2} />
                  </motion.span>
                  <h3 className="mt-5 [font-family:var(--demo-display)] text-2xl font-extrabold text-[var(--d-ink)]">
                    {rsvp.successTitle}
                  </h3>
                  <p className="mt-2 max-w-sm leading-relaxed text-[var(--d-ink-soft)]">{rsvp.successBody}</p>
                  <div className="mt-5 flex flex-wrap items-center justify-center gap-2 rounded-2xl bg-[var(--d-bg)] px-4 py-3 text-sm font-bold text-[var(--d-ink)]">
                    <CalendarHeart className="h-4 w-4 text-[var(--d-accent)]" strokeWidth={2.2} />
                    {rsvp.dateOptions.find((d) => d.id === form.date)?.label}
                  </div>
                  <button
                    type="button"
                    onClick={reset}
                    className="mt-6 rounded-full border-2 border-[var(--d-line)] px-6 py-3 text-sm font-extrabold text-[var(--d-ink)] transition-colors hover:border-[var(--d-accent)] hover:text-[var(--d-accent)]"
                  >
                    {rsvp.successAgain}
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={onSubmit}
                  noValidate
                  className="flex flex-col gap-4"
                >
                  <div className="flex items-center gap-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--d-sun)] text-[var(--d-ink)]">
                      <CalendarHeart className="h-5 w-5" strokeWidth={2.2} />
                    </span>
                    <div>
                      <h3 className="[font-family:var(--demo-display)] text-xl font-extrabold text-[var(--d-ink)]">
                        {content.formTitle}
                      </h3>
                    </div>
                  </div>
                  <p className="-mt-1 text-sm leading-relaxed text-[var(--d-ink-soft)]">{content.formIntro}</p>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label={rsvp.parent.label} error={errors.parent} htmlFor="rsvp-parent">
                      <input
                        id="rsvp-parent"
                        type="text"
                        value={form.parent}
                        onChange={(e) => set("parent", e.target.value)}
                        placeholder={rsvp.parent.placeholder}
                        aria-invalid={!!errors.parent}
                        className={`${inputBase} ${errors.parent ? "border-[var(--d-coral)]" : "border-[var(--d-line)]"}`}
                      />
                    </Field>
                    <Field label={rsvp.child.label} error={errors.child} htmlFor="rsvp-child">
                      <input
                        id="rsvp-child"
                        type="text"
                        value={form.child}
                        onChange={(e) => set("child", e.target.value)}
                        placeholder={rsvp.child.placeholder}
                        aria-invalid={!!errors.child}
                        className={`${inputBase} ${errors.child ? "border-[var(--d-coral)]" : "border-[var(--d-line)]"}`}
                      />
                    </Field>
                  </div>

                  <Field label={rsvp.email.label} error={errors.email} htmlFor="rsvp-email">
                    <input
                      id="rsvp-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                      placeholder={rsvp.email.placeholder}
                      aria-invalid={!!errors.email}
                      className={`${inputBase} ${errors.email ? "border-[var(--d-coral)]" : "border-[var(--d-line)]"}`}
                    />
                  </Field>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label={rsvp.groupLabel} htmlFor="rsvp-group">
                      <select
                        id="rsvp-group"
                        value={form.group}
                        onChange={(e) => set("group", e.target.value as AgeGroupId)}
                        className={`${inputBase} border-[var(--d-line)] appearance-none`}
                      >
                        {rsvp.groupOptions.map((o) => (
                          <option key={o.id} value={o.id}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label={rsvp.dateLabel} htmlFor="rsvp-date">
                      <select
                        id="rsvp-date"
                        value={form.date}
                        onChange={(e) => set("date", e.target.value)}
                        className={`${inputBase} border-[var(--d-line)] appearance-none`}
                      >
                        {rsvp.dateOptions.map((o) => (
                          <option key={o.id} value={o.id}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  {/* guests stepper */}
                  <div>
                    <p className="mb-1.5 text-sm font-extrabold text-[var(--d-ink)]">{rsvp.guestsLabel}</p>
                    <div className="inline-flex items-center gap-4 rounded-2xl border-2 border-[var(--d-line)] bg-white px-2 py-1.5">
                      <button
                        type="button"
                        aria-label={rsvp.guestsDecrease}
                        onClick={() => set("guests", Math.max(1, form.guests - 1))}
                        disabled={form.guests <= 1}
                        className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--d-bg)] text-[var(--d-ink)] transition-colors hover:bg-[var(--d-accent-soft)] disabled:opacity-40"
                      >
                        <Minus className="h-4 w-4" strokeWidth={2.6} />
                      </button>
                      <span className="w-8 text-center [font-family:var(--demo-display)] text-xl font-extrabold text-[var(--d-ink)]">
                        {form.guests}
                      </span>
                      <button
                        type="button"
                        aria-label={rsvp.guestsIncrease}
                        onClick={() => set("guests", Math.min(6, form.guests + 1))}
                        disabled={form.guests >= 6}
                        className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--d-bg)] text-[var(--d-ink)] transition-colors hover:bg-[var(--d-accent-soft)] disabled:opacity-40"
                      >
                        <Plus className="h-4 w-4" strokeWidth={2.6} />
                      </button>
                    </div>
                  </div>

                  <Field label={rsvp.notesLabel} htmlFor="rsvp-notes">
                    <textarea
                      id="rsvp-notes"
                      value={form.notes}
                      onChange={(e) => set("notes", e.target.value)}
                      placeholder={rsvp.notesPlaceholder}
                      rows={3}
                      className={`${inputBase} border-[var(--d-line)] resize-none`}
                    />
                  </Field>

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--d-accent)] px-6 py-3.5 text-base font-extrabold text-white shadow-[0_16px_32px_-14px_rgba(37,99,235,0.85)] transition-transform hover:scale-[1.02] disabled:cursor-wait disabled:opacity-80"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" strokeWidth={2.4} />
                        {rsvp.submitting}
                      </>
                    ) : (
                      <>
                        <Check className="h-5 w-5" strokeWidth={2.6} />
                        {rsvp.submit}
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="mb-1.5 block text-sm font-extrabold text-[var(--d-ink)]">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs font-bold text-[var(--d-coral-deep)]">{error}</span>}
    </label>
  );
}
