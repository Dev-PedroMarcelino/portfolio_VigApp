"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotionSafe as useReducedMotion } from "@/components/demos/use-reduced-motion-safe";
import { CircleCheck, HandCoins, Send } from "lucide-react";
import type { BarcellosContent } from "./content";
import { EASE, FOCUS, Reveal, SectionLabel } from "./ui";

type FieldKey = "brand" | "model" | "year" | "km" | "phone";

const EMPTY: Record<FieldKey, string> = { brand: "", model: "", year: "", km: "", phone: "" };

export function TradeinSection({ content }: { content: BarcellosContent["tradein"] }) {
  const reduced = useReducedMotion() ?? false;
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const [sent, setSent] = useState(false);

  const set = (key: FieldKey) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Partial<Record<FieldKey, string>> = {};
    (Object.keys(values) as FieldKey[]).forEach((k) => {
      if (!values[k].trim()) next[k] = content.errors.required;
    });
    const digits = values.phone.replace(/\D/g, "");
    if (values.phone.trim() && digits.length < 10) next.phone = content.errors.phone;
    setErrors(next);
    if (Object.keys(next).length === 0) setSent(true);
  };

  const reset = () => {
    setValues(EMPTY);
    setErrors({});
    setSent(false);
  };

  const inputClass = (key: FieldKey) =>
    `h-12 w-full rounded-xl border bg-[var(--d-panel)] px-4 text-[0.9rem] text-[var(--d-ink)] placeholder:text-[var(--d-ink-soft)]/50 transition-colors ${FOCUS} ${
      errors[key] ? "border-[#E2694E]" : "border-[var(--d-line)] hover:border-[var(--d-gold)]/35"
    }`;

  const field = (key: FieldKey, label: string, ph: string, opts?: { inputMode?: "numeric" | "tel"; span?: boolean }) => (
    <div className={opts?.span ? "sm:col-span-2" : undefined}>
      <label className="block">
        <span className="mb-2 block text-[0.64rem] uppercase tracking-[0.22em] text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]">
          {label}
        </span>
        <input
          type="text"
          inputMode={opts?.inputMode}
          value={values[key]}
          onChange={set(key)}
          placeholder={ph}
          aria-invalid={Boolean(errors[key])}
          className={inputClass(key)}
        />
      </label>
      {errors[key] && (
        <p role="alert" className="mt-1.5 text-[0.72rem] text-[#E2694E]">
          {errors[key]}
        </p>
      )}
    </div>
  );

  return (
    <section id="avaliacao" className="relative scroll-mt-24 py-20 sm:py-24">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--d-line)] to-transparent"
      />

      <div className="mx-auto grid max-w-6xl items-start gap-12 px-5 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <SectionLabel text={content.label} />
          <h2 className="mt-4 text-[1.8rem] font-semibold leading-tight tracking-tight text-[var(--d-ink)] [font-family:var(--demo-display)] sm:text-[2.3rem]">
            {content.title}
          </h2>
          <p className="mt-4 max-w-md text-[0.92rem] leading-relaxed text-[var(--d-ink-soft)]">{content.subtitle}</p>

          <div className="mt-8 flex items-start gap-3 rounded-2xl border border-[var(--d-line)] bg-[var(--d-surface)] p-5">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--d-gold)]/30 bg-[var(--d-gold)]/[0.08]">
              <HandCoins className="h-5 w-5 text-[var(--d-gold)]" strokeWidth={1.7} aria-hidden />
            </span>
            <p className="text-[0.84rem] leading-relaxed text-[var(--d-silver)]">{content.note}</p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative overflow-hidden rounded-3xl border border-[var(--d-line)] bg-[var(--d-surface)] p-6 sm:p-8">
            <AnimatePresence mode="wait" initial={false}>
              {sent ? (
                <motion.div
                  key="success"
                  initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="flex flex-col items-center gap-4 py-10 text-center"
                >
                  <span className="grid h-16 w-16 place-items-center rounded-full border border-[var(--d-gold)]/40 bg-[var(--d-gold)]/10 shadow-[0_0_36px_rgba(217,164,65,0.25)]">
                    <CircleCheck className="h-8 w-8 text-[var(--d-gold)]" strokeWidth={1.6} aria-hidden />
                  </span>
                  <p className="text-[1.25rem] font-semibold text-[var(--d-ink)] [font-family:var(--demo-display)]">
                    {content.successTitle}
                  </p>
                  <p className="max-w-sm text-[0.88rem] leading-relaxed text-[var(--d-ink-soft)]">
                    {content.successBody}
                  </p>
                  <button
                    type="button"
                    onClick={reset}
                    className={`mt-2 rounded-full border border-[var(--d-line)] px-5 py-2.5 text-[0.8rem] font-medium text-[var(--d-silver)] transition-colors hover:border-[var(--d-gold)]/50 hover:text-[var(--d-gold)] ${FOCUS}`}
                  >
                    {content.successAgain}
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  noValidate
                  onSubmit={submit}
                  initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="grid gap-5 sm:grid-cols-2"
                >
                  {field("brand", content.fields.brand, content.fields.brandPh)}
                  {field("model", content.fields.model, content.fields.modelPh)}
                  {field("year", content.fields.year, content.fields.yearPh, { inputMode: "numeric" })}
                  {field("km", content.fields.km, content.fields.kmPh, { inputMode: "numeric" })}
                  {field("phone", content.fields.phone, content.fields.phonePh, { inputMode: "tel", span: true })}

                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      className={`flex w-full items-center justify-center gap-2 rounded-full bg-[var(--d-gold)] px-6 py-3.5 text-[0.9rem] font-semibold text-[#141008] shadow-[0_0_28px_rgba(217,164,65,0.3)] transition-transform hover:scale-[1.02] ${FOCUS}`}
                    >
                      <Send className="h-4 w-4" strokeWidth={2} aria-hidden />
                      {content.submit}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
