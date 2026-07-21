"use client";

import { useMemo, useState, type FormEvent } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, ChevronDown, Lock, ScrollText, Clock3 } from "lucide-react";
import type { LawContent, PracticeArea } from "./content";
import { EngravedRule } from "./castellan-reis";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const IMG =
  "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80";

interface FormState {
  name: string;
  email: string;
  phone: string;
  area: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  area?: string;
  message?: string;
}

const EMPTY: FormState = { name: "", email: "", phone: "", area: "", message: "" };

/** Deterministic reference code — never Math.random (hydration safe). */
function referenceCode(state: FormState): string {
  const basis = `${state.name}${state.email}${state.area}`;
  let hash = 0;
  for (let i = 0; i < basis.length; i += 1) {
    hash = (hash * 31 + basis.charCodeAt(i)) % 100000;
  }
  return `CR-${String(2600 + (hash % 7400)).padStart(4, "0")}`;
}

const ASIDE_ICONS = [Lock, ScrollText, Clock3];

export function Consultation({
  content,
  areas,
}: {
  content: LawContent["consultation"];
  areas: PracticeArea[];
}) {
  const reduce = useReducedMotion();
  const [state, setState] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<FormState | null>(null);

  const options = useMemo(
    () => [...areas.map((a) => a.name), ...content.areaOptions],
    [areas, content.areaOptions],
  );

  const update = <K extends keyof FormState>(key: K, value: string) => {
    setState((prev) => ({ ...prev, [key]: value }));
    if (errors[key as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    if (!state.name.trim()) next.name = content.errors.name;
    if (!state.email.trim()) next.email = content.errors.email;
    else if (!EMAIL_RE.test(state.email.trim())) next.email = content.errors.emailFormat;
    if (!state.area) next.area = content.errors.area;
    if (state.message.trim().length < 8) next.message = content.errors.message;
    return next;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    setSubmitting(true);
    // Simulated dispatch; success state renders after a brief, deterministic delay.
    window.setTimeout(() => {
      setSubmitted(state);
      setSubmitting(false);
    }, 700);
  };

  const reset = () => {
    setSubmitted(null);
    setState(EMPTY);
    setErrors({});
  };

  const fieldBase =
    "w-full border bg-[var(--d-navy-deep)] px-4 py-3.5 text-sm text-[var(--d-ink)] transition-colors duration-300 placeholder:text-[var(--d-ink-faint)] focus:outline-none";
  const fieldOk = "border-[var(--d-line-soft)] focus:border-[var(--d-bronze)]";
  const fieldErr = "border-[#B4553E] focus:border-[#B4553E]";

  return (
    <section id="consult" className="relative bg-[var(--d-navy)] py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Aside */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <EngravedRule />
            <p className="mt-5 text-[10px] font-medium uppercase tracking-[0.4em] text-[var(--d-bronze-bright)]">
              {content.eyebrow}
            </p>
            <h2 className="[font-family:var(--demo-display)] mt-5 text-4xl font-normal leading-tight text-[var(--d-ink)] sm:text-5xl">
              {content.title}
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-[var(--d-ink-soft)]">
              {content.intro}
            </p>

            <div className="relative mt-9 hidden overflow-hidden border border-[var(--d-line-soft)] sm:block">
              <div className="relative aspect-[16/7]">
                <Image
                  src={IMG}
                  alt={content.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 90vw, 40vw"
                  className="object-cover object-center opacity-80 [filter:grayscale(0.4)_contrast(1.03)]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,32,46,0.25),rgba(20,32,46,0.75))]" />
              </div>
            </div>

            <ul className="mt-9 space-y-5">
              {content.asidePoints.map((point, index) => {
                const Icon = ASIDE_ICONS[index] ?? Lock;
                return (
                  <li key={point.title} className="flex gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--d-line)] text-[var(--d-bronze-bright)]">
                      <Icon aria-hidden className="h-4 w-4" strokeWidth={1.4} />
                    </span>
                    <div>
                      <p className="[font-family:var(--demo-display)] text-base font-normal text-[var(--d-ink)]">
                        {point.title}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-[var(--d-ink-soft)]">{point.body}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Form / success */}
          <div className="border border-[var(--d-line-soft)] bg-[var(--d-navy-soft)] p-7 sm:p-10">
            <AnimatePresence mode="wait" initial={false}>
              {submitted ? (
                <motion.div
                  key="success"
                  initial={reduce ? undefined : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -12 }}
                  transition={{ duration: 0.55, ease: EASE }}
                  className="flex min-h-[30rem] flex-col items-center justify-center text-center"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full border border-[var(--d-bronze)]">
                    <Check aria-hidden className="h-7 w-7 text-[var(--d-bronze-bright)]" strokeWidth={1.4} />
                  </span>
                  <h3 className="[font-family:var(--demo-display)] mt-7 text-3xl font-normal text-[var(--d-ink)]">
                    {content.success.title}
                  </h3>
                  <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-[var(--d-ink-soft)]">
                    {content.success.body}
                  </p>

                  <dl className="mx-auto mt-8 flex items-center gap-4 border-y border-[var(--d-line-soft)] px-6 py-4">
                    <dt className="text-[10px] uppercase tracking-[0.3em] text-[var(--d-ink-faint)]">
                      {content.success.referenceLabel}
                    </dt>
                    <dd className="[font-family:var(--demo-display)] text-xl tracking-[0.14em] text-[var(--d-bronze-bright)]">
                      {referenceCode(submitted)}
                    </dd>
                  </dl>

                  <p className="mt-6 text-xs italic leading-relaxed text-[var(--d-ink-faint)]">
                    {content.success.note}
                  </p>
                  <button
                    type="button"
                    onClick={reset}
                    className="mt-8 border border-[var(--d-line)] px-8 py-3.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--d-ink)] transition-colors duration-300 hover:border-[var(--d-bronze)] hover:text-[var(--d-bronze-bright)]"
                  >
                    {content.success.resetLabel}
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  noValidate
                  onSubmit={handleSubmit}
                  initial={reduce ? undefined : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduce ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="space-y-6"
                >
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="cr-name" className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.26em] text-[var(--d-ink-soft)]">
                        {content.labels.name}
                      </label>
                      <input
                        id="cr-name"
                        type="text"
                        value={state.name}
                        onChange={(e) => update("name", e.target.value)}
                        placeholder={content.placeholders.name}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? "cr-name-err" : undefined}
                        className={`${fieldBase} ${errors.name ? fieldErr : fieldOk}`}
                      />
                      {errors.name && (
                        <p id="cr-name-err" className="mt-2 text-xs text-[#D98A72]">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="cr-email" className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.26em] text-[var(--d-ink-soft)]">
                        {content.labels.email}
                      </label>
                      <input
                        id="cr-email"
                        type="email"
                        value={state.email}
                        onChange={(e) => update("email", e.target.value)}
                        placeholder={content.placeholders.email}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? "cr-email-err" : undefined}
                        className={`${fieldBase} ${errors.email ? fieldErr : fieldOk}`}
                      />
                      {errors.email && (
                        <p id="cr-email-err" className="mt-2 text-xs text-[#D98A72]">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="cr-phone" className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.26em] text-[var(--d-ink-soft)]">
                        {content.labels.phone}
                        <span className="text-[9px] font-normal normal-case tracking-[0.1em] text-[var(--d-ink-faint)]">
                          {content.optionalTag}
                        </span>
                      </label>
                      <input
                        id="cr-phone"
                        type="tel"
                        value={state.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        placeholder={content.placeholders.phone}
                        className={`${fieldBase} ${fieldOk}`}
                      />
                    </div>

                    <div>
                      <label htmlFor="cr-area" className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.26em] text-[var(--d-ink-soft)]">
                        {content.labels.area}
                      </label>
                      <div className="relative">
                        <select
                          id="cr-area"
                          value={state.area}
                          onChange={(e) => update("area", e.target.value)}
                          aria-invalid={Boolean(errors.area)}
                          aria-describedby={errors.area ? "cr-area-err" : undefined}
                          className={`${fieldBase} appearance-none pr-10 ${
                            errors.area ? fieldErr : fieldOk
                          } ${state.area ? "text-[var(--d-ink)]" : "text-[var(--d-ink-faint)]"}`}
                        >
                          <option value="" disabled>
                            {content.placeholders.area}
                          </option>
                          {options.map((option) => (
                            <option key={option} value={option} className="text-[var(--d-navy-deep)]">
                              {option}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          aria-hidden
                          className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--d-bronze-bright)]"
                          strokeWidth={1.5}
                        />
                      </div>
                      {errors.area && (
                        <p id="cr-area-err" className="mt-2 text-xs text-[#D98A72]">
                          {errors.area}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="cr-message" className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.26em] text-[var(--d-ink-soft)]">
                      {content.labels.message}
                    </label>
                    <textarea
                      id="cr-message"
                      rows={4}
                      value={state.message}
                      onChange={(e) => update("message", e.target.value)}
                      placeholder={content.placeholders.message}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? "cr-message-err" : undefined}
                      className={`${fieldBase} resize-none ${errors.message ? fieldErr : fieldOk}`}
                    />
                    {errors.message && (
                      <p id="cr-message-err" className="mt-2 text-xs text-[#D98A72]">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <p className="text-[11px] leading-relaxed text-[var(--d-ink-faint)]">{content.privacy}</p>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="group inline-flex w-full items-center justify-center gap-2.5 bg-[var(--d-bronze)] px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--d-navy-deep)] transition-colors duration-300 hover:bg-[var(--d-bronze-bright)] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                  >
                    {submitting ? content.submittingLabel : content.submitLabel}
                    {submitting && (
                      <span
                        aria-hidden
                        className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[var(--d-navy-deep)] border-t-transparent"
                      />
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
