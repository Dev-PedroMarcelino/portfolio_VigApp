"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2, ShieldCheck } from "lucide-react";
import type { EnrollContent } from "./content";
import { SectionLabel, unsplash } from "./ui";

interface PlanOption {
  id: string;
  name: string;
}

type Status = "idle" | "submitting" | "done";

export function EnrollSection({
  content,
  plans,
}: {
  content: EnrollContent;
  plans: PlanOption[];
}) {
  const reduce = useReducedMotion();
  const uid = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [goal, setGoal] = useState<string>(content.goals[0]?.id ?? "");
  const [plan, setPlan] = useState<string>(plans[1]?.id ?? plans[0]?.id ?? "");
  const [values, setValues] = useState({ fullName: "", email: "", role: "", portfolio: "" });

  const set = (key: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setValues((v) => ({ ...v, [key]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== "idle") return;
    setStatus("submitting");
    window.setTimeout(() => setStatus("done"), 1100);
  };

  const reset = () => {
    setValues({ fullName: "", email: "", role: "", portfolio: "" });
    setGoal(content.goals[0]?.id ?? "");
    setPlan(plans[1]?.id ?? plans[0]?.id ?? "");
    setStatus("idle");
  };

  const fields = [content.fields.fullName, content.fields.email, content.fields.role, content.fields.portfolio];

  return (
    <section id="enroll" className="relative bg-[var(--d-cream)] py-20 lg:py-28" style={{ backgroundColor: "#F6F0E6" }}>
      <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <SectionLabel text={content.label} />
          <h2 className="mt-5 [font-family:var(--demo-display)] text-4xl font-light leading-[1.05] tracking-[-0.01em] text-[var(--d-ink)] sm:text-5xl">
            {content.heading} <span className="italic text-[var(--d-accent)]">{content.headingItalic}</span>
          </h2>
          <p className="mt-5 text-[1rem] leading-relaxed text-[var(--d-ink-soft)]">{content.intro}</p>

          <div className="mt-8 hidden overflow-hidden rounded-[1.4rem] border border-[var(--d-line)] lg:block">
            <div className="relative aspect-[16/10]">
              <Image
                src={unsplash("photo-1456513080510-7bf3a84b82f8", 900)}
                alt=""
                fill
                sizes="34vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{ background: "linear-gradient(150deg, rgba(28,25,23,0.1) 0%, rgba(201,124,12,0.28) 100%)" }}
              />
            </div>
          </div>

          <p className="mt-6 flex items-center gap-2 text-[0.85rem] text-[var(--d-ink-soft)]">
            <ShieldCheck className="h-4 w-4 shrink-0 text-[var(--d-accent)]" strokeWidth={1.8} />
            {content.reassurance}
          </p>
        </div>

        <div className="rounded-[1.8rem] border border-[var(--d-line)] bg-[var(--d-cream-soft)] p-6 sm:p-10" style={{ backgroundColor: "#FBF7F0" }}>
          <AnimatePresence mode="wait">
            {status === "done" ? (
              <motion.div
                key="success"
                initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center py-10 text-center"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--d-accent)]/15 text-[var(--d-accent)]">
                  <CheckCircle2 className="h-8 w-8" strokeWidth={1.8} />
                </span>
                <h3 className="mt-6 [font-family:var(--demo-display)] text-3xl font-light text-[var(--d-ink)]">
                  {content.successTitle}
                </h3>
                <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-[var(--d-ink-soft)]">
                  {content.successBody}
                </p>
                <p className="mt-4 text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-[var(--d-accent)]">
                  {content.successMeta}
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="mt-8 rounded-full border border-[var(--d-line)] px-6 py-3 text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-[var(--d-ink)] transition-colors hover:bg-[var(--d-sand)]"
                >
                  {content.resetCta}
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onSubmit={onSubmit}
                className="flex flex-col gap-6"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  {fields.map((field) => (
                    <div key={field.name}>
                      <label
                        htmlFor={`${uid}-${field.name}`}
                        className="mb-2 block text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[var(--d-ink-soft)]"
                      >
                        {field.label}
                      </label>
                      <input
                        id={`${uid}-${field.name}`}
                        name={field.name}
                        type={field.name === "email" ? "email" : "text"}
                        required={field.name === "fullName" || field.name === "email"}
                        value={values[field.name as keyof typeof values]}
                        onChange={set(field.name as keyof typeof values)}
                        placeholder={field.placeholder}
                        className="w-full rounded-xl border border-[var(--d-line)] bg-[var(--d-cream)] px-4 py-3 text-[0.95rem] text-[var(--d-ink)] outline-none transition-colors placeholder:text-[var(--d-ink-soft)]/60 focus:border-[var(--d-accent)]"
                        style={{ backgroundColor: "#F6F0E6" }}
                      />
                    </div>
                  ))}
                </div>

                <fieldset>
                  <legend className="mb-3 block text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[var(--d-ink-soft)]">
                    {content.goalLabel}
                  </legend>
                  <div className="grid gap-2.5 sm:grid-cols-2">
                    {content.goals.map((option) => {
                      const active = goal === option.id;
                      return (
                        <button
                          key={option.id}
                          type="button"
                          aria-pressed={active}
                          onClick={() => setGoal(option.id)}
                          className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-[0.9rem] transition-colors ${
                            active
                              ? "border-[var(--d-accent)] bg-[var(--d-accent)]/10 text-[var(--d-ink)]"
                              : "border-[var(--d-line)] bg-[var(--d-cream)] text-[var(--d-ink-soft)] hover:border-[var(--d-ink-soft)]"
                          }`}
                          style={{ backgroundColor: active ? undefined : "#F6F0E6" }}
                        >
                          <span
                            className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                              active ? "border-[var(--d-accent)]" : "border-[var(--d-ink-soft)]/50"
                            }`}
                          >
                            {active && <span className="h-2 w-2 rounded-full bg-[var(--d-accent)]" />}
                          </span>
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <div>
                  <label
                    htmlFor={`${uid}-plan`}
                    className="mb-2 block text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[var(--d-ink-soft)]"
                  >
                    {content.planLabel}
                  </label>
                  <select
                    id={`${uid}-plan`}
                    value={plan}
                    onChange={(e) => setPlan(e.target.value)}
                    className="w-full rounded-xl border border-[var(--d-line)] bg-[var(--d-cream)] px-4 py-3 text-[0.95rem] text-[var(--d-ink)] outline-none transition-colors focus:border-[var(--d-accent)]"
                    style={{ backgroundColor: "#F6F0E6" }}
                  >
                    {plans.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="group mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--d-ink)] px-7 py-4 text-sm font-semibold text-[var(--d-cream)] transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
                      {content.submitting}
                    </>
                  ) : (
                    <>
                      {content.submit}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.2} />
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
