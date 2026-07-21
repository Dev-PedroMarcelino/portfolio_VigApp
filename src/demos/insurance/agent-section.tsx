"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Clock, Globe, Mail, MapPin, Phone, Send } from "lucide-react";
import type { AgentContent, ProductId } from "./content";
import { SectionLabel } from "./ui";

const MEETING_IMG =
  "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&w=1200&q=80";

export function AgentSection({ content }: { content: AgentContent }) {
  const reduce = useReducedMotion() ?? false;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [product, setProduct] = useState<ProductId>("auto");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const valid = name.trim().length > 1 && email.includes("@") && message.trim().length > 3;
  const topic = content.form.productOptions.find((o) => o.id === product);

  const reset = () => {
    setSent(false);
    setName("");
    setEmail("");
    setProduct("auto");
    setMessage("");
  };

  const inputClass =
    "w-full rounded-xl border-2 border-[var(--d-line)] bg-white px-4 py-3 text-sm text-[var(--d-ink)] outline-none transition-colors placeholder:text-[var(--d-ink-soft)]/50 focus:border-[var(--d-accent)]";

  return (
    <section id="agent" className="scroll-mt-20 bg-[var(--d-paper)] px-5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <SectionLabel text={content.label} />
          <h2 className="mt-5 [font-family:var(--demo-display)] text-4xl font-extrabold tracking-tight text-[var(--d-ink)] md:text-5xl">
            {content.title}
          </h2>
          <p className="mt-4 leading-[1.85] text-[var(--d-ink-soft)]">{content.intro}</p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.05fr]">
          <div>
            <div className="relative h-72 overflow-hidden rounded-[1.75rem] sm:h-80">
              <Image
                src={MEETING_IMG}
                alt={content.imageAlt}
                fill
                sizes="(min-width: 1024px) 520px, 92vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(29,78,216,0.18) 0%, rgba(13,20,64,0.16) 55%, rgba(13,20,64,0.72) 100%)",
                  mixBlendMode: "multiply",
                }}
                aria-hidden
              />
              <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-white/95 px-5 py-4 shadow-lg backdrop-blur">
                <p className="[font-family:var(--demo-display)] text-lg font-extrabold tracking-tight text-[var(--d-ink)]">
                  {content.agent.name}
                </p>
                <p className="text-[0.72rem] font-semibold text-[var(--d-accent)]">{content.agent.role}</p>
              </div>
            </div>

            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                { icon: Phone, label: content.phoneLabel, value: content.agent.phone },
                { icon: Mail, label: content.form.emailLabel, value: content.agent.email },
                { icon: Globe, label: content.languagesLabel, value: content.agent.languages },
                { icon: Clock, label: content.hoursLabel, value: content.agent.hours },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--d-accent-soft)] text-[var(--d-accent)]">
                    <Icon className="h-4 w-4" strokeWidth={1.9} aria-hidden />
                  </span>
                  <div>
                    <dt className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[var(--d-ink-soft)]">
                      {label}
                    </dt>
                    <dd className="mt-0.5 break-words text-[0.8rem] font-semibold text-[var(--d-ink)]">
                      {value}
                    </dd>
                  </div>
                </div>
              ))}
              <div className="flex items-start gap-3 sm:col-span-2">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--d-accent-soft)] text-[var(--d-accent)]">
                  <MapPin className="h-4 w-4" strokeWidth={1.9} aria-hidden />
                </span>
                <div>
                  <dt className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[var(--d-ink-soft)]">
                    {content.officeLabel}
                  </dt>
                  <dd className="mt-0.5 text-[0.8rem] font-semibold text-[var(--d-ink)]">
                    {content.agent.office}
                  </dd>
                </div>
              </div>
            </dl>
          </div>

          <div className="rounded-[1.75rem] border border-[var(--d-line)] bg-[var(--d-bg)] p-7 md:p-8">
            <AnimatePresence mode="wait">
              {!sent ? (
                <motion.form
                  key="form"
                  initial={reduce ? undefined : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduce ? undefined : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (valid) setSent(true);
                  }}
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="sl-name"
                        className="mb-1.5 block text-[0.66rem] font-bold uppercase tracking-[0.18em] text-[var(--d-ink-soft)]"
                      >
                        {content.form.nameLabel}
                      </label>
                      <input
                        id="sl-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={content.form.namePlaceholder}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="sl-email"
                        className="mb-1.5 block text-[0.66rem] font-bold uppercase tracking-[0.18em] text-[var(--d-ink-soft)]"
                      >
                        {content.form.emailLabel}
                      </label>
                      <input
                        id="sl-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={content.form.emailPlaceholder}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <fieldset className="mt-5">
                    <legend className="mb-1.5 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-[var(--d-ink-soft)]">
                      {content.form.productLabel}
                    </legend>
                    <div className="flex flex-wrap gap-2">
                      {content.form.productOptions.map((o) => {
                        const selected = o.id === product;
                        return (
                          <button
                            key={o.id}
                            type="button"
                            aria-pressed={selected}
                            onClick={() => setProduct(o.id)}
                            className={`rounded-full border-2 px-3.5 py-2 text-[0.74rem] font-semibold transition-all ${
                              selected
                                ? "border-[var(--d-accent)] bg-[var(--d-accent)] text-white"
                                : "border-[var(--d-line)] bg-white text-[var(--d-ink-soft)] hover:border-[var(--d-accent)]/50"
                            }`}
                          >
                            {o.label}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>

                  <div className="mt-5">
                    <label
                      htmlFor="sl-message"
                      className="mb-1.5 block text-[0.66rem] font-bold uppercase tracking-[0.18em] text-[var(--d-ink-soft)]"
                    >
                      {content.form.messageLabel}
                    </label>
                    <textarea
                      id="sl-message"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={content.form.messagePlaceholder}
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={!valid}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[var(--d-accent)] py-4 text-[0.74rem] font-bold uppercase tracking-[0.16em] text-white transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-35"
                  >
                    <Send className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden />
                    {content.form.submit}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={reduce ? undefined : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="flex min-h-[26rem] flex-col"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--d-accent)] text-white">
                    <Check className="h-6 w-6" strokeWidth={2.4} aria-hidden />
                  </span>
                  <h3 className="mt-6 [font-family:var(--demo-display)] text-3xl font-extrabold tracking-tight text-[var(--d-ink)]">
                    {content.form.successTitle}
                  </h3>
                  <p className="mt-4 max-w-md leading-[1.85] text-[var(--d-ink-soft)]">
                    {content.form.successBody}
                  </p>
                  <div className="mt-7 rounded-2xl border border-[var(--d-line)] bg-white p-5">
                    <div className="flex items-baseline justify-between gap-3 text-sm">
                      <span className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-[var(--d-ink-soft)]">
                        {content.form.successTopic}
                      </span>
                      <span className="font-bold text-[var(--d-ink)]">{topic?.label}</span>
                    </div>
                    <div className="mt-3 flex items-baseline justify-between gap-3 border-t border-[var(--d-line)] pt-3 text-sm">
                      <span className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-[var(--d-ink-soft)]">
                        {content.form.nameLabel}
                      </span>
                      <span className="font-bold text-[var(--d-ink)]">{name}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={reset}
                    className="mt-auto pt-7 text-left text-[0.7rem] font-bold uppercase tracking-[0.16em] text-[var(--d-accent)] underline-offset-4 hover:underline"
                  >
                    {content.form.another}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
