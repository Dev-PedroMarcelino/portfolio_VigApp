"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, CheckCheck, ArrowRight, Phone, Video } from "lucide-react";
import type { HeroContent } from "./content";
import { ChatDoodle, scrollToId } from "./ui";

export function ZapHero({ content }: { content: HeroContent }) {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden px-5 pb-16 pt-14 sm:pt-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-8 h-72 w-72 rounded-full bg-[var(--d-accent)]/20 blur-[110px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-[#128C7E]/25 blur-[120px]"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--d-line)] bg-[var(--d-panel)] px-3.5 py-1.5 text-[0.72rem] font-semibold text-[var(--d-ink-soft)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--d-accent)]" aria-hidden />
            {content.badge}
          </span>

          <h1 className="mt-6 [font-family:var(--demo-display)] text-[2.6rem] font-extrabold leading-[1.02] tracking-tight text-[var(--d-ink)] sm:text-6xl">
            {content.titleTop}
            <br />
            <span className="text-[var(--d-accent)]">{content.titleAccent}</span> {content.titleBottom}
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--d-ink-soft)] sm:text-lg">
            {content.lead}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => scrollToId("chat")}
              className="group inline-flex items-center gap-2 rounded-full bg-[var(--d-accent)] px-6 py-3.5 text-sm font-bold text-[#052014] transition-transform hover:scale-[1.03]"
            >
              {content.ctaPrimary}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.4} aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => scrollToId("pricing")}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--d-line)] px-6 py-3.5 text-sm font-semibold text-[var(--d-ink)] transition-colors hover:bg-[var(--d-panel)]"
            >
              {content.ctaSecondary}
            </button>
          </div>

          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4">
            {content.stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-[var(--d-line)] bg-[var(--d-panel)] px-3 py-4">
                <dt className="[font-family:var(--demo-display)] text-2xl font-extrabold text-[var(--d-ink)]">{s.value}</dt>
                <dd className="mt-1 text-[0.72rem] leading-tight text-[var(--d-ink-soft)]">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Phone mockup */}
        <div className="relative mx-auto w-full max-w-[320px]">
          <div
            aria-hidden
            className="absolute inset-0 -rotate-3 rounded-[2.8rem] bg-[var(--d-accent)]/10 blur-md"
          />
          <div className="relative overflow-hidden rounded-[2.6rem] border-[6px] border-[#05100C] bg-[var(--d-chat)] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]">
            {/* Chat header */}
            <div className="flex items-center gap-3 bg-[#1F2C34] px-4 py-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--d-accent)] text-sm font-bold text-[#052014]">
                SL
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-white">{content.phoneName}</p>
                <p className="text-[0.68rem] text-[var(--d-accent)]">{content.phoneStatus}</p>
              </div>
              <Video className="h-4 w-4 text-white/70" strokeWidth={1.8} aria-hidden />
              <Phone className="h-4 w-4 text-white/70" strokeWidth={1.8} aria-hidden />
            </div>

            {/* Chat body */}
            <div className="relative space-y-2 px-3 py-4">
              <ChatDoodle />
              <div className="relative flex justify-center">
                <span className="rounded-md bg-[#1F2C34] px-2.5 py-1 text-[0.6rem] font-medium text-white/60">
                  {content.todayLabel}
                </span>
              </div>
              {content.bubbles.map((b, i) => (
                <motion.div
                  key={i}
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: reduce ? 0 : i * 0.12 }}
                  className={`relative flex ${b.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-3 py-2 text-[0.78rem] leading-snug ${
                      b.from === "user"
                        ? "rounded-br-md bg-[var(--d-bubble-out)] text-[#0B141A]"
                        : "rounded-bl-md bg-[var(--d-bubble-in)] text-white"
                    }`}
                  >
                    {b.text}
                    <span className="ml-1.5 inline-flex translate-y-0.5 items-center">
                      {b.from === "user" ? (
                        <CheckCheck className="h-3 w-3 text-[#34B7F1]" strokeWidth={2.4} aria-hidden />
                      ) : (
                        <Check className="h-3 w-3 text-white/40" strokeWidth={2.4} aria-hidden />
                      )}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
