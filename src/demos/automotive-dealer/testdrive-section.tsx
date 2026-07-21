"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, ShieldCheck } from "lucide-react";
import type { TestDriveContent } from "./content";
import { CarbonTexture, SectionLabel } from "./ui";

const INTERIOR_IMG = "photo-1511919884226-fd3cad34687c";

export function TestDriveSection({ content }: { content: TestDriveContent }) {
  const reduced = useReducedMotion() ?? false;
  const uid = useId();
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [model, setModel] = useState(content.models[1] ?? content.models[0]);
  const [location, setLocation] = useState(content.locations[0]);
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState(content.slots[1] ?? content.slots[0]);

  const valid = name.trim().length > 1 && /.+@.+\..+/.test(email) && date !== "";

  const reset = () => {
    setSubmitted(false);
    setName("");
    setEmail("");
    setPhone("");
    setDate("");
  };

  return (
    <section id="testdrive" className="relative overflow-hidden bg-[var(--d-carbon)] py-20 sm:py-28">
      <CarbonTexture opacity={0.45} />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          {/* left: pitch + image */}
          <div className="flex flex-col gap-6">
            <SectionLabel text={content.label} />
            <h2 className="[font-family:var(--demo-display)] text-3xl uppercase leading-tight tracking-tight text-[var(--d-ink)] sm:text-5xl">
              {content.title}
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-[var(--d-ink-soft)]">{content.intro}</p>

            <div className="relative mt-2 aspect-[16/10] overflow-hidden border border-[var(--d-line)] bg-black">
              <Image
                src={`https://images.unsplash.com/${INTERIOR_IMG}?auto=format&fit=crop&w=1200&q=80`}
                alt={content.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
                style={{ filter: "saturate(0.95) contrast(1.1)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            </div>

            <ul className="flex flex-col gap-2.5">
              {content.assurances.map((a) => (
                <li key={a} className="flex items-center gap-2.5 text-sm text-[var(--d-ink-soft)]">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-[var(--d-accent-soft)]" strokeWidth={2} />
                  {a}
                </li>
              ))}
            </ul>
          </div>

          {/* right: form / success */}
          <div className="relative border border-[var(--d-line)] bg-[var(--d-surface)]">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={reduced ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0 }}
                  className="flex min-h-full flex-col items-start justify-center gap-4 p-8"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--d-accent)]">
                    <Check className="h-6 w-6 text-white" strokeWidth={2.5} />
                  </span>
                  <h3 className="[font-family:var(--demo-display)] text-2xl uppercase text-[var(--d-ink)]">
                    {content.successTitle}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--d-ink-soft)]">{content.successBody}</p>
                  <dl className="w-full space-y-2 border-y border-[var(--d-line)] py-4 text-sm">
                    <SummaryRow label={content.modelLabel} value={model} />
                    <SummaryRow label={content.locationLabel} value={location} />
                    <SummaryRow label={content.dateLabel} value={`${date} · ${slot}`} />
                    <SummaryRow label={content.refPrefix} value="APX-TD-4471" />
                  </dl>
                  <button
                    type="button"
                    onClick={reset}
                    className="mt-1 skew-x-[-8deg] border border-[var(--d-line)] px-6 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[var(--d-ink)] transition-colors hover:border-[var(--d-metal)]"
                  >
                    <span className="inline-block skew-x-[8deg]">{content.another}</span>
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={reduced ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduced ? undefined : { opacity: 0 }}
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (valid) setSubmitted(true);
                  }}
                  className="flex flex-col gap-5 p-6 sm:p-8"
                >
                  <Field id={`${uid}-name`} label={content.nameLabel}>
                    <input
                      id={`${uid}-name`}
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={content.namePlaceholder}
                      className="apex-input"
                    />
                  </Field>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field id={`${uid}-email`} label={content.emailLabel}>
                      <input
                        id={`${uid}-email`}
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={content.emailPlaceholder}
                        className="apex-input"
                      />
                    </Field>
                    <Field id={`${uid}-phone`} label={content.phoneLabel}>
                      <input
                        id={`${uid}-phone`}
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={content.phonePlaceholder}
                        className="apex-input"
                      />
                    </Field>
                  </div>

                  <Field id={`${uid}-model`} label={content.modelLabel}>
                    <select
                      id={`${uid}-model`}
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      className="apex-input"
                    >
                      {content.models.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field id={`${uid}-location`} label={content.locationLabel}>
                    <select
                      id={`${uid}-location`}
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="apex-input"
                    >
                      {content.locations.map((l) => (
                        <option key={l} value={l}>
                          {l}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field id={`${uid}-date`} label={content.dateLabel}>
                      <input
                        id={`${uid}-date`}
                        type="date"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="apex-input [color-scheme:dark]"
                      />
                    </Field>
                    <fieldset>
                      <legend className="mb-2 block text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[var(--d-metal)]">
                        {content.slotLabel}
                      </legend>
                      <div className="flex flex-wrap gap-2">
                        {content.slots.map((s) => {
                          const on = s === slot;
                          return (
                            <button
                              key={s}
                              type="button"
                              aria-pressed={on}
                              onClick={() => setSlot(s)}
                              className={`flex-1 border px-3 py-2.5 text-xs font-semibold tabular-nums transition-colors ${
                                on
                                  ? "border-[var(--d-accent)] bg-[var(--d-surface-2)] text-[var(--d-ink)]"
                                  : "border-[var(--d-line)] text-[var(--d-ink-soft)] hover:border-[var(--d-metal)]"
                              }`}
                            >
                              {s}
                            </button>
                          );
                        })}
                      </div>
                    </fieldset>
                  </div>

                  <button
                    type="submit"
                    disabled={!valid}
                    className="mt-1 skew-x-[-8deg] bg-[var(--d-accent)] px-6 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[var(--d-accent-soft)] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <span className="inline-block skew-x-[8deg]">{content.submit}</span>
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style>{`
        .apex-input {
          width: 100%;
          background-color: var(--d-carbon);
          border: 1px solid var(--d-line);
          color: var(--d-ink);
          padding: 0.7rem 0.85rem;
          font-size: 0.875rem;
          outline: none;
          transition: border-color 0.2s;
        }
        .apex-input::placeholder { color: var(--d-metal); }
        .apex-input:focus { border-color: var(--d-accent); }
      `}</style>
    </section>
  );
}

function Field({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[var(--d-metal)]"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-[var(--d-metal)]">{label}</dt>
      <dd className="text-right font-medium text-[var(--d-ink)]">{value}</dd>
    </div>
  );
}
