"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Ticket, X, Check, Sparkles } from "lucide-react";
import type { RaffleContent } from "./content";
import { Kicker, Chip, shot } from "./ui";

const PRIZE_IMG = "photo-1542291026-7eec264c27ff";

type FormState = { name: string; email: string; city: string };

export function RaffleSection({ content }: { content: RaffleContent }) {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [size, setSize] = useState(content.sizeOptions[2]);
  const [form, setForm] = useState<FormState>({ name: "", email: "", city: "" });
  const reduce = useReducedMotion() ?? false;

  const valid = form.name.trim().length > 1 && /.+@.+\..+/.test(form.email) && form.city.trim().length > 1;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => {
    setOpen(false);
    window.setTimeout(() => {
      setDone(false);
      setForm({ name: "", email: "", city: "" });
    }, 300);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    setDone(true);
  };

  return (
    <section id="raffle" className="relative scroll-mt-20 overflow-hidden px-5 py-20 md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-[130px]"
        style={{ background: "radial-gradient(circle, var(--d-accent-2) 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] border border-[var(--d-line)] bg-[var(--d-panel)]">
        <div className="grid items-stretch gap-0 md:grid-cols-[1fr_1fr]">
          <div className="relative min-h-[16rem] overflow-hidden">
            <Image
              src={shot(PRIZE_IMG, 1000)}
              alt={content.prizeName}
              fill
              sizes="(min-width: 768px) 440px, 92vw"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(120deg, rgba(255,61,129,0.4) 0%, rgba(18,8,31,0.2) 50%, rgba(176,38,255,0.5) 100%)",
                mixBlendMode: "hard-light",
              }}
            />
            <div className="absolute left-5 top-5 rotate-[-6deg]">
              <Chip tone="pink">{content.prizeColor}</Chip>
            </div>
          </div>

          <div className="p-7 md:p-10">
            <Kicker text={content.label} live />
            <h2 className="mt-4 [font-family:var(--demo-display)] text-4xl leading-[0.95] tracking-tight text-[var(--d-ink)] md:text-5xl">
              {content.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[var(--d-ink-soft)]">{content.intro}</p>

            <div className="mt-7 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-[var(--d-line)] bg-white/[0.02] px-4 py-3.5">
                <p className="text-[0.56rem] font-bold uppercase tracking-[0.2em] text-[var(--d-mute)] [font-family:var(--demo-body)]">
                  {content.entriesLabel}
                </p>
                <p className="mt-1 [font-family:var(--demo-display)] text-2xl text-[var(--d-ink)]">
                  {content.entries}
                </p>
              </div>
              <div className="rounded-2xl border border-[var(--d-line)] bg-white/[0.02] px-4 py-3.5">
                <p className="text-[0.56rem] font-bold uppercase tracking-[0.2em] text-[var(--d-mute)] [font-family:var(--demo-body)]">
                  {content.closesLabel}
                </p>
                <p className="mt-1 text-sm font-bold text-[var(--d-accent)] [font-family:var(--demo-body)]">
                  {content.closesValue}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-[var(--d-accent)] py-4 text-[0.74rem] font-bold uppercase tracking-[0.2em] text-[#12081F] transition-transform hover:scale-[1.02] [font-family:var(--demo-body)]"
            >
              <Ticket className="h-4 w-4" strokeWidth={2} aria-hidden />
              {content.openCta}
            </button>
          </div>
        </div>
      </div>

      {/* modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[9000] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              aria-label={content.close}
              onClick={close}
              className="absolute inset-0 bg-[#080312]/80 backdrop-blur-sm"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={content.modalTitle}
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 w-full max-w-md overflow-hidden rounded-[2rem] border border-[var(--d-line)] bg-[var(--d-bg-2)] p-6 md:p-8"
            >
              <button
                type="button"
                onClick={close}
                aria-label={content.close}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-[var(--d-line)] text-[var(--d-ink-soft)] transition-colors hover:text-[var(--d-ink)]"
              >
                <X className="h-4 w-4" strokeWidth={2} />
              </button>

              <AnimatePresence mode="wait">
                {!done ? (
                  <motion.form
                    key="form"
                    onSubmit={submit}
                    initial={reduce ? undefined : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reduce ? undefined : { opacity: 0 }}
                  >
                    <Chip tone="violet">{content.prizeName}</Chip>
                    <h3 className="mt-4 [font-family:var(--demo-display)] text-3xl tracking-tight text-[var(--d-ink)]">
                      {content.modalTitle}
                    </h3>
                    <p className="mt-2 text-[0.82rem] leading-relaxed text-[var(--d-ink-soft)]">
                      {content.modalIntro}
                    </p>

                    <div className="mt-6 space-y-4">
                      {content.fields.map((field) => (
                        <div key={field.id}>
                          <label
                            htmlFor={`raffle-${field.id}`}
                            className="block text-[0.6rem] font-bold uppercase tracking-[0.2em] text-[var(--d-ink-soft)] [font-family:var(--demo-body)]"
                          >
                            {field.label}
                          </label>
                          <input
                            id={`raffle-${field.id}`}
                            type={field.id === "email" ? "email" : "text"}
                            required
                            value={form[field.id]}
                            onChange={(e) => setForm((f) => ({ ...f, [field.id]: e.target.value }))}
                            placeholder={field.placeholder}
                            className="mt-1.5 w-full rounded-xl border border-[var(--d-line)] bg-white/[0.03] px-4 py-3 text-sm text-[var(--d-ink)] outline-none transition-colors placeholder:text-[var(--d-mute)] focus:border-[var(--d-accent)] [font-family:var(--demo-body)]"
                          />
                        </div>
                      ))}

                      <div>
                        <label
                          htmlFor="raffle-size"
                          className="block text-[0.6rem] font-bold uppercase tracking-[0.2em] text-[var(--d-ink-soft)] [font-family:var(--demo-body)]"
                        >
                          {content.sizeLabel}
                        </label>
                        <div className="mt-1.5 grid grid-cols-3 gap-2">
                          {content.sizeOptions.map((opt) => {
                            const selected = size === opt;
                            return (
                              <button
                                key={opt}
                                type="button"
                                aria-pressed={selected}
                                onClick={() => setSize(opt)}
                                className={`rounded-lg border py-2 text-[0.72rem] font-bold tabular-nums transition-all [font-family:var(--demo-body)] ${
                                  selected
                                    ? "border-[var(--d-accent)] bg-[var(--d-accent)] text-[#12081F]"
                                    : "border-[var(--d-line)] text-[var(--d-ink)] hover:border-[var(--d-accent)]"
                                }`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={!valid}
                      className={`mt-6 w-full rounded-full py-3.5 text-[0.72rem] font-bold uppercase tracking-[0.2em] transition-all [font-family:var(--demo-body)] ${
                        valid
                          ? "bg-[var(--d-accent)] text-[#12081F] hover:scale-[1.02]"
                          : "cursor-not-allowed bg-white/[0.06] text-[var(--d-mute)]"
                      }`}
                    >
                      {content.submit}
                    </button>
                    <p className="mt-3 text-center text-[0.62rem] leading-relaxed text-[var(--d-mute)]">
                      {content.terms}
                    </p>
                  </motion.form>
                ) : (
                  <motion.div
                    key="done"
                    initial={reduce ? undefined : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0 }}
                    className="py-2 text-center"
                  >
                    <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--d-accent)] text-[#12081F]">
                      <Check className="h-7 w-7" strokeWidth={2.4} aria-hidden />
                    </span>
                    <h3 className="mt-5 [font-family:var(--demo-display)] text-3xl tracking-tight text-[var(--d-ink)]">
                      {content.successTitle}
                    </h3>
                    <p className="mx-auto mt-3 max-w-xs text-[0.85rem] leading-relaxed text-[var(--d-ink-soft)]">
                      {content.successBody}
                    </p>
                    <div className="mt-6 rounded-2xl border border-dashed border-[var(--d-accent)]/50 bg-[var(--d-accent)]/[0.06] px-5 py-4">
                      <p className="flex items-center justify-center gap-1.5 text-[0.58rem] font-bold uppercase tracking-[0.22em] text-[var(--d-accent)] [font-family:var(--demo-body)]">
                        <Sparkles className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
                        {content.entryCodeLabel}
                      </p>
                      <p className="mt-2 [font-family:var(--demo-display)] text-2xl tracking-[0.1em] text-[var(--d-ink)]">
                        {content.entryCode}
                      </p>
                      <p className="mt-1 text-[0.66rem] text-[var(--d-mute)] [font-family:var(--demo-body)]">
                        {size}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={close}
                      className="mt-6 w-full rounded-full border border-[var(--d-line)] py-3.5 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-[var(--d-ink)] transition-colors hover:border-[var(--d-accent)] hover:text-[var(--d-accent)] [font-family:var(--demo-body)]"
                    >
                      {content.successClose}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
