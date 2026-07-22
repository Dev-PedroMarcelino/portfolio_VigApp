"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotionSafe as useReducedMotion } from "@/components/demos/use-reduced-motion-safe";
import { ArrowUpRight, Check, ChevronDown, MapPin, MessageCircle, Send } from "lucide-react";
import type { PrumoContent } from "./content";
import { ADDRESS_LINES, INSTAGRAM_HANDLE, WHATSAPP_DISPLAY } from "./content";
import { Kicker, Reveal, SectionTitle } from "./ui";

const inputCls =
  "w-full border-b border-[var(--d-line-strong)] bg-transparent py-3.5 [font-family:var(--demo-body)] text-[15px] text-[var(--d-ink)] placeholder:text-[var(--d-ink-faint)] outline-none transition-colors duration-300 focus:border-[var(--d-accent)]";

const labelCls =
  "[font-family:var(--demo-mono)] text-[10px] uppercase tracking-[0.26em] text-[var(--d-ink-soft)]";

/**
 * Lean quote-request form (name, lot city, WhatsApp, project stage) with a
 * fake success state, plus the studio's fictional coordinates in Campinas.
 */
export function Contact({ content }: { content: PrumoContent["contact"] }) {
  const [sent, setSent] = useState(false);
  const reduced = useReducedMotion();

  return (
    <section id="contato" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8">
        <Reveal>
          <Kicker>{content.label}</Kicker>
          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionTitle lead={content.titleLead} italic={content.titleItalic} />
            <p className="max-w-md [font-family:var(--demo-body)] text-sm leading-relaxed text-[var(--d-ink-soft)] lg:pb-2">
              {content.intro}
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-14 border-t border-[var(--d-line-strong)] pt-12 sm:mt-16 lg:grid-cols-12 lg:gap-20">
          {/* Form / success state */}
          <Reveal className="lg:col-span-7">
            <AnimatePresence mode="wait" initial={false}>
              {sent ? (
                <motion.div
                  key="success"
                  initial={reduced ? { opacity: 0 } : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  role="status"
                  className="flex min-h-[22rem] flex-col items-start justify-center border border-[var(--d-line)] px-8 py-12 sm:px-12"
                >
                  <span className="grid h-14 w-14 place-items-center rounded-full border border-[var(--d-accent)] text-[var(--d-accent)]">
                    <Check className="h-6 w-6" strokeWidth={1.5} />
                  </span>
                  <h3 className="mt-7 [font-family:var(--demo-display)] text-3xl text-[var(--d-ink)] sm:text-4xl">
                    {content.form.successTitle}
                  </h3>
                  <p className="mt-4 max-w-md [font-family:var(--demo-body)] text-[15px] leading-[1.8] text-[var(--d-ink-soft)]">
                    {content.form.successBody}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="mt-8 [font-family:var(--demo-body)] text-[11px] uppercase tracking-[0.24em] text-[var(--d-ink)] underline decoration-[var(--d-accent)] underline-offset-8 transition-colors duration-300 hover:text-[var(--d-accent)]"
                  >
                    {content.form.reset}
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  aria-label={content.form.aria}
                  initial={false}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, y: -14 }}
                  transition={{ duration: 0.3, ease: "easeIn" }}
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                  }}
                  className="grid gap-9 sm:grid-cols-2"
                >
                  <div>
                    <label htmlFor="prumo-name" className={labelCls}>
                      {content.form.name}
                    </label>
                    <input
                      id="prumo-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder={content.form.namePlaceholder}
                      className={inputCls}
                    />
                  </div>

                  <div>
                    <label htmlFor="prumo-city" className={labelCls}>
                      {content.form.city}
                    </label>
                    <input
                      id="prumo-city"
                      name="city"
                      type="text"
                      required
                      placeholder={content.form.cityPlaceholder}
                      className={inputCls}
                    />
                  </div>

                  <div>
                    <label htmlFor="prumo-whatsapp" className={labelCls}>
                      {content.form.whatsapp}
                    </label>
                    <input
                      id="prumo-whatsapp"
                      name="whatsapp"
                      type="tel"
                      required
                      autoComplete="tel"
                      placeholder={content.form.whatsappPlaceholder}
                      className={inputCls}
                    />
                  </div>

                  <div>
                    <label htmlFor="prumo-moment" className={labelCls}>
                      {content.form.moment}
                    </label>
                    <div className="relative">
                      <select
                        id="prumo-moment"
                        name="moment"
                        required
                        defaultValue=""
                        className={`${inputCls} appearance-none pr-8 invalid:text-[var(--d-ink-faint)]`}
                      >
                        <option value="" disabled hidden />
                        {content.form.momentOptions.map((opt) => (
                          <option key={opt} value={opt} className="text-[var(--d-ink)]">
                            {opt}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        aria-hidden
                        className="pointer-events-none absolute right-1 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--d-ink-faint)]"
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      className="group inline-flex items-center gap-3 bg-[var(--d-ink)] px-9 py-4 [font-family:var(--demo-body)] text-[12px] font-medium uppercase tracking-[0.22em] text-[var(--d-bg)] transition-colors duration-300 hover:bg-[var(--d-accent)]"
                    >
                      {content.form.submit}
                      <Send className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
                    </button>
                    <p className="mt-4 [font-family:var(--demo-mono)] text-[10px] uppercase tracking-[0.2em] text-[var(--d-ink-faint)]">
                      {content.responseNote}
                    </p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>

          {/* Studio coordinates */}
          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="space-y-0">
              <div className="flex items-start gap-4 border-b border-[var(--d-line)] pb-7">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-[var(--d-accent)]" strokeWidth={1.5} />
                <div>
                  <p className={labelCls}>{content.addressLabel}</p>
                  <p className="mt-2 [font-family:var(--demo-body)] text-[15px] leading-relaxed text-[var(--d-ink)]">
                    {ADDRESS_LINES[0]}
                    <br />
                    {ADDRESS_LINES[1]}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 border-b border-[var(--d-line)] py-7">
                <MessageCircle className="mt-1 h-4 w-4 shrink-0 text-[var(--d-accent)]" strokeWidth={1.5} />
                <div>
                  <p className={labelCls}>{content.whatsappLabel}</p>
                  <p className="mt-2 [font-family:var(--demo-mono)] text-[15px] text-[var(--d-ink)]">
                    {WHATSAPP_DISPLAY}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 py-7">
                <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-[var(--d-accent)]" strokeWidth={1.5} />
                <div>
                  <p className={labelCls}>{content.instagramLabel}</p>
                  <p className="mt-2 [font-family:var(--demo-mono)] text-[15px] text-[var(--d-ink)]">
                    {INSTAGRAM_HANDLE}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
