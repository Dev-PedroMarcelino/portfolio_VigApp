"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Check, ChevronDown, CircleCheckBig } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { unsplash, type VertexContent } from "./content";

interface FormState {
  name: string;
  email: string;
  type: string;
  budget: string;
  details: string;
}

interface FieldErrors {
  name?: string;
  email?: string;
  type?: string;
  budget?: string;
}

const EMPTY: FormState = { name: "", email: "", type: "", budget: "", details: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function fieldClasses(hasError: boolean) {
  return `w-full border bg-[var(--d-bg-2)] px-4 py-3 text-sm text-[var(--d-ink)] placeholder:text-[var(--d-ink-faint)] outline-none transition-colors duration-200 focus:border-[var(--d-accent)] ${
    hasError ? "border-[var(--d-danger)]" : "border-[var(--d-line-strong)]"
  }`;
}

function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="[font-family:var(--demo-body)] text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--d-ink-soft)]"
    >
      {children}
    </label>
  );
}

export function Quote({ content }: { content: VertexContent["quote"] }) {
  const reduce = useReducedMotion();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [reference, setReference] = useState("");

  const update = (key: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key as keyof FieldErrors]) {
      setErrors((e) => ({ ...e, [key]: undefined }));
    }
  };

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};
    if (form.name.trim().length < 2) next.name = content.errors.name;
    if (!EMAIL_RE.test(form.email.trim())) next.email = content.errors.email;
    if (!form.type) next.type = content.errors.type;
    if (!form.budget) next.budget = content.errors.budget;
    return next;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    setStatus("sending");
    const ref = `VB-${(form.type.slice(0, 3).toUpperCase())}-${(2400 + form.name.trim().length * 7).toString().slice(-4)}`;
    window.setTimeout(() => {
      setReference(ref);
      setStatus("done");
    }, 900);
  };

  const reset = () => {
    setForm(EMPTY);
    setErrors({});
    setReference("");
    setStatus("idle");
  };

  return (
    <section
      id="quote"
      className="relative border-t border-[var(--d-line)] bg-[var(--d-bg-2)] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[92rem] px-5 sm:px-8">
        <div className="grid grid-cols-1 overflow-hidden border border-[var(--d-line)] lg:grid-cols-[0.85fr_1.15fr]">
          {/* aside */}
          <div className="relative flex flex-col justify-between gap-10 overflow-hidden bg-[var(--d-panel-2)] p-8 sm:p-10">
            <div className="absolute inset-0 opacity-25" aria-hidden>
              <Image
                src={unsplash("photo-1503387762-592deb58ef4e", 1000)}
                alt=""
                fill
                sizes="40vw"
                className="object-cover grayscale"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(31,36,43,0.6), rgba(21,24,29,0.95))",
                }}
              />
            </div>

            <div className="relative">
              <span className="[font-family:var(--demo-body)] text-[11px] font-medium uppercase tracking-[0.24em] text-[var(--d-accent)]">
                {content.eyebrow}
              </span>
              <h2 className="mt-3 [font-family:var(--demo-display)] text-[clamp(2rem,4vw,3rem)] uppercase leading-[0.95] text-[var(--d-ink)]">
                {content.title}
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--d-ink-soft)]">
                {content.lede}
              </p>
            </div>

            <div className="relative">
              <span className="[font-family:var(--demo-body)] text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--d-ink-faint)]">
                {content.asideTitle}
              </span>
              <ol className="mt-4 space-y-3">
                {content.asidePoints.map((point, i) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-[var(--d-ink)]">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center bg-[var(--d-accent)] [font-family:var(--demo-display)] text-xs text-[var(--d-accent-ink)]">
                      {i + 1}
                    </span>
                    {point}
                  </li>
                ))}
              </ol>
              <div className="mt-6 flex items-center gap-3 border-t border-[var(--d-line)] pt-5">
                <span className="[font-family:var(--demo-body)] text-[11px] uppercase tracking-[0.14em] text-[var(--d-ink-faint)]">
                  {content.responseLabel}
                </span>
                <span className="[font-family:var(--demo-display)] text-lg text-[var(--d-accent)]">
                  {content.responseValue}
                </span>
              </div>
            </div>
          </div>

          {/* form / success */}
          <div className="bg-[var(--d-panel)] p-8 sm:p-10">
            <AnimatePresence mode="wait">
              {status === "done" ? (
                <motion.div
                  key="success"
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="flex h-full min-h-[26rem] flex-col items-start justify-center"
                >
                  <span className="flex items-center gap-2 bg-[var(--d-good)]/15 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--d-good)]">
                    <CircleCheckBig className="h-4 w-4" strokeWidth={2} />
                    {content.successBadge}
                  </span>
                  <h3 className="mt-6 [font-family:var(--demo-display)] text-[clamp(2rem,4vw,3rem)] uppercase leading-[0.95] text-[var(--d-ink)]">
                    {content.successTitle}
                  </h3>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--d-ink-soft)]">
                    {content.successBody}
                  </p>
                  <div className="mt-8 flex items-center gap-4 border border-[var(--d-line-strong)] px-5 py-4">
                    <span className="[font-family:var(--demo-body)] text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--d-ink-faint)]">
                      {content.successMeta}
                    </span>
                    <span className="[font-family:var(--demo-display)] text-xl tracking-[0.05em] text-[var(--d-accent)]">
                      {reference}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={reset}
                    className="mt-8 flex items-center gap-2 border border-[var(--d-line-strong)] px-6 py-3 [font-family:var(--demo-body)] text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--d-ink)] transition-colors duration-200 hover:border-[var(--d-accent)] hover:text-[var(--d-accent)]"
                  >
                    {content.resetLabel}
                    <ArrowRight className="h-4 w-4" strokeWidth={2} />
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduce ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  onSubmit={onSubmit}
                  noValidate
                  className="grid grid-cols-1 gap-5 sm:grid-cols-2"
                >
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="q-name">{content.nameLabel}</Label>
                    <input
                      id="q-name"
                      type="text"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      placeholder={content.namePlaceholder}
                      aria-invalid={Boolean(errors.name)}
                      className={fieldClasses(Boolean(errors.name))}
                    />
                    {errors.name ? (
                      <span className="text-[11px] text-[var(--d-danger)]">{errors.name}</span>
                    ) : null}
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="q-email">{content.emailLabel}</Label>
                    <input
                      id="q-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder={content.emailPlaceholder}
                      aria-invalid={Boolean(errors.email)}
                      className={fieldClasses(Boolean(errors.email))}
                    />
                    {errors.email ? (
                      <span className="text-[11px] text-[var(--d-danger)]">{errors.email}</span>
                    ) : null}
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="q-type">{content.typeLabel}</Label>
                    <div className="relative">
                      <select
                        id="q-type"
                        value={form.type}
                        onChange={(e) => update("type", e.target.value)}
                        aria-invalid={Boolean(errors.type)}
                        className={`${fieldClasses(Boolean(errors.type))} appearance-none pr-10 ${
                          form.type ? "" : "text-[var(--d-ink-faint)]"
                        }`}
                      >
                        <option value="" disabled>
                          {content.typePlaceholder}
                        </option>
                        {content.types.map((opt) => (
                          <option key={opt.value} value={opt.value} className="text-[var(--d-ink)]">
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--d-ink-faint)]"
                        strokeWidth={2}
                        aria-hidden
                      />
                    </div>
                    {errors.type ? (
                      <span className="text-[11px] text-[var(--d-danger)]">{errors.type}</span>
                    ) : null}
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="q-budget">{content.budgetLabel}</Label>
                    <div className="relative">
                      <select
                        id="q-budget"
                        value={form.budget}
                        onChange={(e) => update("budget", e.target.value)}
                        aria-invalid={Boolean(errors.budget)}
                        className={`${fieldClasses(Boolean(errors.budget))} appearance-none pr-10 ${
                          form.budget ? "" : "text-[var(--d-ink-faint)]"
                        }`}
                      >
                        <option value="" disabled>
                          {content.budgetPlaceholder}
                        </option>
                        {content.budgets.map((opt) => (
                          <option key={opt.value} value={opt.value} className="text-[var(--d-ink)]">
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--d-ink-faint)]"
                        strokeWidth={2}
                        aria-hidden
                      />
                    </div>
                    {errors.budget ? (
                      <span className="text-[11px] text-[var(--d-danger)]">{errors.budget}</span>
                    ) : null}
                  </div>

                  <div className="flex flex-col gap-2 sm:col-span-2">
                    <Label htmlFor="q-details">{content.detailsLabel}</Label>
                    <textarea
                      id="q-details"
                      value={form.details}
                      onChange={(e) => update("details", e.target.value)}
                      placeholder={content.detailsPlaceholder}
                      rows={4}
                      className={`${fieldClasses(false)} resize-none`}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="group flex w-full items-center justify-center gap-2 bg-[var(--d-accent)] px-6 py-4 [font-family:var(--demo-body)] text-[12px] font-medium uppercase tracking-[0.16em] text-[var(--d-accent-ink)] transition-colors duration-200 hover:bg-[var(--d-accent-deep)] disabled:opacity-70 sm:w-auto"
                    >
                      {status === "sending" ? (
                        content.submitting
                      ) : (
                        <>
                          <Check className="h-4 w-4" strokeWidth={2.5} />
                          {content.submit}
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
