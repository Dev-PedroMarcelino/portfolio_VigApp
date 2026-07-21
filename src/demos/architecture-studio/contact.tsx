"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import type { AtelierContent } from "./content";

export function Contact({ content }: { content: AtelierContent["contact"] }) {
  const [value, setValue] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim().length < 3) return;
    setSent(true);
  };

  return (
    <section
      id="contact"
      className="relative border-t border-[var(--d-line-strong)] px-5 py-20 sm:px-8 sm:py-28"
      style={{ backgroundColor: "var(--d-ink)", color: "var(--d-bg)" }}
    >
      <div className="mx-auto max-w-[92rem]">
        <p className="[font-family:var(--demo-display)] text-[10px] uppercase tracking-[0.4em] text-[var(--d-bg-dim)]">
          {content.eyebrow}
        </p>

        <div className="mt-6 grid grid-cols-1 gap-x-16 gap-y-14 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <h2 className="text-[clamp(2.4rem,6vw,5rem)] font-medium leading-[0.92] tracking-[-0.02em] [font-family:var(--demo-display)]">
              {content.title}
            </h2>
            <p className="mt-8 max-w-xl text-[clamp(1.05rem,1.4vw,1.3rem)] leading-relaxed text-[var(--d-bg-dim)] [font-family:var(--demo-body)]">
              {content.lede}
            </p>

            <div className="mt-12 max-w-md">
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="ok"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-4 border-b border-[var(--d-bg)] pb-4"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--d-bg)] text-[var(--d-ink)]">
                      <Check className="h-5 w-5" strokeWidth={1.5} />
                    </span>
                    <p className="[font-family:var(--demo-body)] text-[1.05rem] leading-snug text-[var(--d-bg)]">
                      {content.email}
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={submit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-3 border-b border-[var(--d-bg-dim)] pb-3 focus-within:border-[var(--d-bg)]"
                  >
                    <label htmlFor="am-brief" className="sr-only">
                      {content.cta}
                    </label>
                    <input
                      id="am-brief"
                      type="email"
                      required
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      placeholder={content.email}
                      className="min-w-0 flex-1 bg-transparent py-2 text-[1.05rem] text-[var(--d-bg)] outline-none placeholder:text-[var(--d-bg-faint)] [font-family:var(--demo-body)]"
                    />
                    <button
                      type="submit"
                      aria-label={content.cta}
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--d-bg-dim)] text-[var(--d-bg)] transition-colors hover:bg-[var(--d-bg)] hover:text-[var(--d-ink)]"
                    >
                      <ArrowRight className="h-5 w-5" strokeWidth={1.25} />
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
              <p className="mt-3 [font-family:var(--demo-display)] text-[9px] uppercase tracking-[0.3em] text-[var(--d-bg-faint)]">
                {content.cta}
              </p>
            </div>
          </div>

          <dl className="grid grid-cols-1 gap-8 self-start sm:grid-cols-2 lg:grid-cols-1">
            <div>
              <dt className="[font-family:var(--demo-display)] text-[10px] uppercase tracking-[0.3em] text-[var(--d-bg-faint)]">
                {content.emailLabel}
              </dt>
              <dd className="mt-2 [font-family:var(--demo-body)] text-[1.1rem] text-[var(--d-bg)]">
                {content.email}
              </dd>
            </div>
            <div>
              <dt className="[font-family:var(--demo-display)] text-[10px] uppercase tracking-[0.3em] text-[var(--d-bg-faint)]">
                {content.phoneLabel}
              </dt>
              <dd className="mt-2 [font-family:var(--demo-body)] text-[1.1rem] text-[var(--d-bg)]">
                {content.phone}
              </dd>
            </div>
            <div>
              <dt className="[font-family:var(--demo-display)] text-[10px] uppercase tracking-[0.3em] text-[var(--d-bg-faint)]">
                {content.studioLabel}
              </dt>
              <dd className="mt-2 [font-family:var(--demo-body)] text-[1.1rem] leading-snug text-[var(--d-bg)]">
                {content.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </dd>
            </div>
            <div>
              <dt className="[font-family:var(--demo-display)] text-[10px] uppercase tracking-[0.3em] text-[var(--d-bg-faint)]">
                {content.hoursLabel}
              </dt>
              <dd className="mt-2 [font-family:var(--demo-body)] text-[1.1rem] text-[var(--d-bg)]">
                {content.hours}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
