"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, Phone } from "lucide-react";
import type { AltureContent } from "./content";

function unsplash(id: string, w: number) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
}

export function Contact({ content }: { content: AltureContent["contact"] }) {
  const reduceMotion = useReducedMotion();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const canSubmit = name.trim().length > 1 && email.includes("@");

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (canSubmit) setSent(true);
  };

  const resetForm = () => {
    setSent(false);
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <section id="contact" className="scroll-mt-24 bg-[var(--d-bg)] py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 overflow-hidden border border-[var(--d-line)] bg-[var(--d-bg-deep)] lg:grid-cols-[1fr_1.1fr]">
          {/* Agent side */}
          <div className="relative flex min-h-[420px] flex-col justify-end p-8 sm:p-10">
            <Image
              src={unsplash(content.agent.imageId, 900)}
              alt={content.agent.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,27,46,0.55)_0%,rgba(11,27,46,0.6)_45%,rgba(11,27,46,0.94)_100%)]"
            />
            <div className="relative z-10">
              <p className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.36em] text-[var(--d-gold)]">
                <span aria-hidden className="h-px w-8 bg-[var(--d-line)]" />
                {content.eyebrow}
              </p>
              <h2 className="mt-5 [font-family:var(--demo-display)] text-3xl font-medium text-[var(--d-ivory)] sm:text-4xl">
                {content.title}
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--d-ink-soft)]">
                {content.body}
              </p>

              <div className="mt-8 border-t border-[var(--d-line-soft)] pt-6">
                <p className="[font-family:var(--demo-display)] text-lg text-[var(--d-gold-bright)]">
                  {content.agent.name}
                </p>
                <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--d-ink-faint)]">
                  {content.agent.role}
                </p>
              </div>

              <dl className="mt-6 space-y-2.5">
                {content.points.map((point) => (
                  <div key={point.label} className="flex items-baseline gap-3">
                    <dt className="w-28 shrink-0 text-[10px] uppercase tracking-[0.16em] text-[var(--d-ink-faint)]">
                      {point.label}
                    </dt>
                    <dd className="text-sm text-[var(--d-ivory)]">{point.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Form side */}
          <div className="p-8 sm:p-10">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex h-full min-h-[380px] flex-col items-center justify-center text-center"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[var(--d-gold)]">
                    <Check className="h-6 w-6 text-[var(--d-gold)]" strokeWidth={1.6} aria-hidden />
                  </span>
                  <h3 className="mt-6 [font-family:var(--demo-display)] text-2xl text-[var(--d-ivory)]">
                    {content.successTitle}
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-[var(--d-ink-soft)]">
                    {content.successBody}
                  </p>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="mt-7 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--d-gold)] underline-offset-4 transition-colors duration-300 hover:text-[var(--d-gold-bright)] hover:underline"
                  >
                    {content.resetCta}
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={reduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  onSubmit={submit}
                  className="flex flex-col gap-5"
                >
                  <div className="flex flex-col gap-2">
                    <label htmlFor="contact-name" className="text-[11px] uppercase tracking-[0.18em] text-[var(--d-ink-faint)]">
                      {content.nameLabel}
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder={content.namePlaceholder}
                      className="border border-[var(--d-line-soft)] bg-transparent px-4 py-3 text-sm text-[var(--d-ivory)] outline-none transition-colors duration-300 placeholder:text-[var(--d-ink-faint)] focus-visible:border-[var(--d-gold)] [font-family:var(--demo-body)]"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="contact-email" className="text-[11px] uppercase tracking-[0.18em] text-[var(--d-ink-faint)]">
                      {content.emailLabel}
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder={content.emailPlaceholder}
                      className="border border-[var(--d-line-soft)] bg-transparent px-4 py-3 text-sm text-[var(--d-ivory)] outline-none transition-colors duration-300 placeholder:text-[var(--d-ink-faint)] focus-visible:border-[var(--d-gold)] [font-family:var(--demo-body)]"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="contact-message" className="text-[11px] uppercase tracking-[0.18em] text-[var(--d-ink-faint)]">
                      {content.messageLabel}
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      placeholder={content.messagePlaceholder}
                      className="resize-none border border-[var(--d-line-soft)] bg-transparent px-4 py-3 text-sm text-[var(--d-ivory)] outline-none transition-colors duration-300 placeholder:text-[var(--d-ink-faint)] focus-visible:border-[var(--d-gold)] [font-family:var(--demo-body)]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={!canSubmit}
                    className="group mt-1 flex items-center justify-center gap-2 bg-[var(--d-gold)] px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0B1B2E] transition-all duration-300 hover:bg-[var(--d-gold-bright)] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {content.submitCta}
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                      strokeWidth={1.8}
                      aria-hidden
                    />
                  </button>
                  <p className="flex items-start gap-2 text-[10px] leading-relaxed text-[var(--d-ink-faint)]">
                    <Phone className="mt-0.5 h-3 w-3 shrink-0 text-[var(--d-gold)]" strokeWidth={1.6} aria-hidden />
                    {content.consent}
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
