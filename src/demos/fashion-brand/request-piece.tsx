"use client";

import { useEffect, useMemo, useReducer, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, ChevronDown, X } from "lucide-react";
import type { NoirContent, Piece } from "./content";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface FormState {
  piece: string;
  size: string;
  fit: string;
  name: string;
  email: string;
  city: string;
  notes: string;
}

type FormAction = { field: keyof FormState; value: string };

const EMPTY: FormState = {
  piece: "",
  size: "",
  fit: "atelier",
  name: "",
  email: "",
  city: "",
  notes: "",
};

function formReducer(state: FormState, action: FormAction): FormState {
  return { ...state, [action.field]: action.value };
}

function reference(form: FormState): string {
  const seed = `${form.piece}${form.size}${form.name}`;
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) % 100000;
  }
  return `NOIR-${String(hash).padStart(5, "0")}`;
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function Field({
  id,
  label,
  children,
  invalid,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
  invalid: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className={`text-[10px] uppercase tracking-[0.28em] ${invalid ? "text-[#d98a8a]" : "text-[var(--d-ink-soft)]"}`}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

const inputBase =
  "w-full border bg-[rgba(255,255,255,0.02)] px-4 py-3 text-sm text-[var(--d-ink)] outline-none transition-colors duration-200 placeholder:text-[var(--d-ink-faint)] focus:border-[var(--d-gold)]";

function SelectField({
  id,
  value,
  invalid,
  onChange,
  children,
}: {
  id: string;
  value: string;
  invalid: boolean;
  onChange: (value: string) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${inputBase} appearance-none pr-10 ${invalid ? "border-[#d98a8a]" : "border-[var(--d-line-soft)]"}`}
      >
        {children}
      </select>
      <ChevronDown
        aria-hidden
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--d-ink-faint)]"
        strokeWidth={1.5}
      />
    </div>
  );
}

function Modal({
  content,
  pieces,
  initialPiece,
  onClose,
}: {
  content: NoirContent["request"];
  pieces: Piece[];
  initialPiece: string;
  onClose: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const [form, dispatch] = useReducer(formReducer, {
    ...EMPTY,
    piece: initialPiece,
  });
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  const totalSteps = content.steps.length;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const stepValid = useMemo(() => {
    if (step === 0) return form.piece !== "" && form.size !== "";
    if (step === 1) return form.name.trim() !== "" && isEmail(form.email) && form.city.trim() !== "";
    return true;
  }, [step, form]);

  const pieceName = pieces.find((p) => p.id === form.piece)?.name ?? "";
  const sizeLabel = content.sizes.find((s) => s.value === form.size)?.label ?? "";
  const fitLabel = content.fits.find((f) => f.value === form.fit)?.label ?? "";

  const advance = () => {
    if (!stepValid) {
      setShowErrors(true);
      return;
    }
    setShowErrors(false);
    if (step < totalSteps - 1) {
      setStep((s) => s + 1);
    } else {
      setSubmitted(true);
    }
  };

  const back = () => {
    setShowErrors(false);
    setStep((s) => Math.max(0, s - 1));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[9000] flex items-end justify-center bg-[rgba(6,6,6,0.85)] backdrop-blur-sm sm:items-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={content.modalAria}
    >
      <motion.div
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.5, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden border border-[var(--d-line-soft)] bg-[var(--d-bg-soft)] shadow-2xl shadow-black/60"
      >
        <div className="flex items-center justify-between border-b border-[var(--d-line-soft)] px-6 py-5">
          <div>
            <p className="text-[9px] uppercase tracking-[0.4em] text-[var(--d-gold)]">
              NOIR Atelier
            </p>
            <p className="mt-1 [font-family:var(--demo-display)] text-xl italic text-[var(--d-ink)]">
              {content.triggerTitle}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={content.closeAria}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--d-line-soft)] text-[var(--d-ink-soft)] transition-colors hover:border-[var(--d-gold)] hover:text-[var(--d-gold-bright)]"
          >
            <X aria-hidden className="h-4 w-4" strokeWidth={1.6} />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="flex flex-col items-center py-8 text-center"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full border border-[var(--d-gold)] text-[var(--d-gold-bright)]">
                  <Check aria-hidden className="h-7 w-7" strokeWidth={1.4} />
                </span>
                <h3 className="mt-6 [font-family:var(--demo-display)] text-2xl italic text-[var(--d-ink)]">
                  {content.successTitle}
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-[var(--d-ink-soft)]">
                  {content.successBody}
                </p>
                <div className="mt-6 flex items-center gap-3 border border-[var(--d-line)] px-5 py-3">
                  <span className="text-[9px] uppercase tracking-[0.3em] text-[var(--d-ink-faint)]">
                    {content.reference}
                  </span>
                  <span className="[font-family:var(--demo-display)] text-lg italic tracking-wide text-[var(--d-gold-bright)]">
                    {reference(form)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-8 bg-[var(--d-gold)] px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#0A0A0A] transition-colors hover:bg-[var(--d-gold-bright)]"
                >
                  {content.done}
                </button>
              </motion.div>
            ) : (
              <motion.div
                key={`step-${step}`}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <div className="mb-6 flex items-center gap-3">
                  {content.steps.map((s, i) => (
                    <div key={s.key} className="flex flex-1 flex-col gap-2">
                      <span
                        className={`h-px w-full transition-colors duration-300 ${i <= step ? "bg-[var(--d-gold)]" : "bg-[var(--d-line-soft)]"}`}
                      />
                      <span
                        className={`text-[9px] uppercase tracking-[0.24em] ${i === step ? "text-[var(--d-gold-bright)]" : "text-[var(--d-ink-faint)]"}`}
                      >
                        {s.title}
                      </span>
                    </div>
                  ))}
                </div>

                <p className="mb-5 text-[10px] uppercase tracking-[0.3em] text-[var(--d-ink-faint)]">
                  {content.stepLabel(step + 1, totalSteps)} — {content.steps[step].caption}
                </p>

                {step === 0 && (
                  <div className="flex flex-col gap-5">
                    <Field id="req-piece" label={content.pieceLabel} invalid={showErrors && form.piece === ""}>
                      <SelectField
                        id="req-piece"
                        value={form.piece}
                        invalid={showErrors && form.piece === ""}
                        onChange={(value) => dispatch({ field: "piece", value })}
                      >
                        <option value="" disabled>
                          {content.piecePlaceholder}
                        </option>
                        {pieces.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name}
                          </option>
                        ))}
                      </SelectField>
                    </Field>

                    <Field id="req-size" label={content.sizeLabel} invalid={showErrors && form.size === ""}>
                      <SelectField
                        id="req-size"
                        value={form.size}
                        invalid={showErrors && form.size === ""}
                        onChange={(value) => dispatch({ field: "size", value })}
                      >
                        <option value="" disabled>
                          {content.piecePlaceholder}
                        </option>
                        {content.sizes.map((s) => (
                          <option key={s.value} value={s.value}>
                            {s.label}
                          </option>
                        ))}
                      </SelectField>
                    </Field>

                    <fieldset className="flex flex-col gap-2">
                      <legend className="mb-1 text-[10px] uppercase tracking-[0.28em] text-[var(--d-ink-soft)]">
                        {content.fitLabel}
                      </legend>
                      <div className="grid grid-cols-3 gap-2">
                        {content.fits.map((fit) => (
                          <button
                            key={fit.value}
                            type="button"
                            aria-pressed={form.fit === fit.value}
                            onClick={() => dispatch({ field: "fit", value: fit.value })}
                            className={`border px-2 py-3 text-[10px] uppercase tracking-[0.14em] transition-colors duration-200 ${
                              form.fit === fit.value
                                ? "border-[var(--d-gold)] bg-[var(--d-gold)] text-[#0A0A0A]"
                                : "border-[var(--d-line-soft)] text-[var(--d-ink-soft)] hover:border-[var(--d-line)]"
                            }`}
                          >
                            {fit.label}
                          </button>
                        ))}
                      </div>
                    </fieldset>
                  </div>
                )}

                {step === 1 && (
                  <div className="flex flex-col gap-5">
                    <Field id="req-name" label={content.nameLabel} invalid={showErrors && form.name.trim() === ""}>
                      <input
                        id="req-name"
                        type="text"
                        value={form.name}
                        placeholder={content.namePlaceholder}
                        onChange={(e) => dispatch({ field: "name", value: e.target.value })}
                        className={`${inputBase} ${showErrors && form.name.trim() === "" ? "border-[#d98a8a]" : "border-[var(--d-line-soft)]"}`}
                      />
                    </Field>
                    <Field id="req-email" label={content.emailLabel} invalid={showErrors && !isEmail(form.email)}>
                      <input
                        id="req-email"
                        type="email"
                        value={form.email}
                        placeholder={content.emailPlaceholder}
                        onChange={(e) => dispatch({ field: "email", value: e.target.value })}
                        className={`${inputBase} ${showErrors && !isEmail(form.email) ? "border-[#d98a8a]" : "border-[var(--d-line-soft)]"}`}
                      />
                    </Field>
                    <Field id="req-city" label={content.cityLabel} invalid={showErrors && form.city.trim() === ""}>
                      <input
                        id="req-city"
                        type="text"
                        value={form.city}
                        placeholder={content.cityPlaceholder}
                        onChange={(e) => dispatch({ field: "city", value: e.target.value })}
                        className={`${inputBase} ${showErrors && form.city.trim() === "" ? "border-[#d98a8a]" : "border-[var(--d-line-soft)]"}`}
                      />
                    </Field>
                    <Field id="req-notes" label={content.notesLabel} invalid={false}>
                      <textarea
                        id="req-notes"
                        rows={3}
                        value={form.notes}
                        placeholder={content.notesPlaceholder}
                        onChange={(e) => dispatch({ field: "notes", value: e.target.value })}
                        className={`${inputBase} resize-none border-[var(--d-line-soft)]`}
                      />
                    </Field>
                  </div>
                )}

                {step === 2 && (
                  <div className="flex flex-col">
                    <p className="[font-family:var(--demo-display)] text-lg italic text-[var(--d-ink)]">
                      {content.summaryTitle}
                    </p>
                    <dl className="mt-4 divide-y divide-[var(--d-line-soft)] border-y border-[var(--d-line-soft)]">
                      {[
                        { label: content.summaryPiece, value: pieceName },
                        { label: content.summarySize, value: sizeLabel },
                        { label: content.summaryFit, value: fitLabel },
                        { label: content.summaryContact, value: `${form.name} · ${form.email} · ${form.city}` },
                      ].map((row) => (
                        <div key={row.label} className="flex items-start justify-between gap-6 py-3">
                          <dt className="text-[10px] uppercase tracking-[0.24em] text-[var(--d-ink-faint)]">
                            {row.label}
                          </dt>
                          <dd className="max-w-[65%] text-right text-sm text-[var(--d-ink)]">
                            {row.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                    {form.notes.trim() !== "" && (
                      <p className="mt-4 text-sm italic leading-relaxed text-[var(--d-ink-soft)]">
                        &ldquo;{form.notes}&rdquo;
                      </p>
                    )}
                  </div>
                )}

                {showErrors && !stepValid && (
                  <p className="mt-4 text-[11px] text-[#d98a8a]">{content.requiredHint}</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {!submitted && (
          <div className="flex items-center justify-between gap-4 border-t border-[var(--d-line-soft)] px-6 py-5">
            <button
              type="button"
              onClick={back}
              disabled={step === 0}
              className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.24em] text-[var(--d-ink-soft)] transition-colors hover:text-[var(--d-ink)] disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ArrowLeft aria-hidden className="h-4 w-4" strokeWidth={1.6} />
              {content.back}
            </button>
            <button
              type="button"
              onClick={advance}
              className="group inline-flex items-center gap-2 bg-[var(--d-gold)] px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.26em] text-[#0A0A0A] transition-colors hover:bg-[var(--d-gold-bright)]"
            >
              {step === totalSteps - 1 ? content.submit : content.next}
              <ArrowRight
                aria-hidden
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={1.6}
              />
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export function RequestSection({
  content,
  onRequest,
}: {
  content: NoirContent["request"];
  onRequest: () => void;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <section
      id="request"
      className="relative overflow-hidden border-t border-[var(--d-line-soft)] bg-[var(--d-bg)] px-6 py-24 sm:py-32"
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 mx-auto h-px max-w-6xl bg-[var(--d-line)]"
      />
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: EASE }}
        className="mx-auto flex max-w-3xl flex-col items-center text-center"
      >
        <p className="text-[10px] font-medium uppercase tracking-[0.42em] text-[var(--d-gold)]">
          {content.triggerEyebrow}
        </p>
        <h2 className="mt-6 [font-family:var(--demo-display)] text-4xl leading-[1.02] text-[var(--d-ink)] sm:text-6xl">
          {content.triggerTitle}
        </h2>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-[var(--d-ink-soft)]">
          {content.triggerBody}
        </p>
        <button
          type="button"
          onClick={onRequest}
          className="group mt-10 inline-flex items-center gap-3 bg-[var(--d-gold)] px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#0A0A0A] transition-colors duration-300 hover:bg-[var(--d-gold-bright)]"
        >
          {content.openCta}
          <ArrowRight
            aria-hidden
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            strokeWidth={1.6}
          />
        </button>
      </motion.div>
    </section>
  );
}

export function RequestModal({
  open,
  content,
  pieces,
  initialPiece,
  onClose,
}: {
  open: boolean;
  content: NoirContent["request"];
  pieces: Piece[];
  initialPiece: string;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <Modal
          key={initialPiece || "modal"}
          content={content}
          pieces={pieces}
          initialPiece={initialPiece}
          onClose={onClose}
        />
      )}
    </AnimatePresence>
  );
}
