"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import type { AmbraContent, CurrencyInfo } from "./content";
import { unsplash } from "./ui";

export function HeroSection({
  content,
  currency,
}: {
  content: AmbraContent["hero"];
  currency: CurrencyInfo;
}) {
  const reduce = useReducedMotion();

  const fromPrice = new Intl.NumberFormat(currency.locale, {
    style: "currency",
    currency: currency.code,
    maximumFractionDigits: 0,
  }).format(content.fromPrice);

  return (
    <section className="relative overflow-hidden px-5 pb-16 pt-10 sm:px-8 sm:pb-24 sm:pt-16">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-20 h-[520px] w-[520px] rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(180,86,15,0.16) 0%, rgba(180,86,15,0) 70%)",
        }}
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <div className="order-2 lg:order-1">
          <motion.p
            initial={reduce ? undefined : { opacity: 0, y: 16 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.28em] text-[var(--d-accent)]"
          >
            <span aria-hidden className="h-px w-8 bg-[var(--d-accent)]" />
            {content.eyebrow}
          </motion.p>

          <motion.h1
            initial={reduce ? undefined : { opacity: 0, y: 20 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-[2.6rem] leading-[1.02] tracking-[-0.01em] text-[var(--d-ink)] [font-family:var(--demo-display)] sm:text-[4rem]"
          >
            {content.titleLead}{" "}
            <span className="italic text-[var(--d-accent)]">{content.titleItalic}</span>{" "}
            {content.titleTail}
          </motion.h1>

          <motion.p
            initial={reduce ? undefined : { opacity: 0, y: 20 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-lg text-[15px] leading-relaxed text-[var(--d-soft)] sm:text-[17px]"
          >
            {content.intro}
          </motion.p>

          <motion.div
            initial={reduce ? undefined : { opacity: 0, y: 20 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#voices"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--d-accent)] px-6 py-3.5 text-[14px] font-medium text-[var(--d-cream)] transition-transform hover:scale-[1.03]"
            >
              {content.ctaPrimary}
              <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
            </a>
            <a
              href="#portfolio"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--d-line)] px-6 py-3.5 text-[14px] font-medium text-[var(--d-ink)] transition-colors hover:border-[var(--d-ink)]"
            >
              {content.ctaSecondary}
            </a>
          </motion.div>

          <motion.dl
            initial={reduce ? undefined : { opacity: 0 }}
            animate={reduce ? undefined : { opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.36 }}
            className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-[var(--d-line)] pt-8"
          >
            {content.stats.map((s) => (
              <div key={s.label}>
                <dt className="text-[1.9rem] leading-none text-[var(--d-ink)] [font-family:var(--demo-display)]">
                  {s.value}
                </dt>
                <dd className="mt-2 text-[12px] leading-snug text-[var(--d-soft)]">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Arch-masked room image */}
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 30 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="order-1 lg:order-2"
        >
          <div className="relative mx-auto max-w-md pb-8 lg:mx-0 lg:ml-auto">
            <div className="relative aspect-[3/4] overflow-hidden rounded-t-[999px] rounded-b-[2rem] border border-[var(--d-line)] shadow-[0_40px_80px_-40px_rgba(43,38,33,0.45)]">
              <Image
                src={unsplash("photo-1618221195710-dd6b41faaea6", 1200)}
                alt={content.imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 440px"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(43,38,33,0) 45%, rgba(43,38,33,0.28) 100%)",
                }}
              />
            </div>

            <div className="absolute -bottom-2 left-1/2 w-[82%] -translate-x-1/2 rounded-2xl border border-[var(--d-line)] bg-[var(--d-cream)] px-5 py-4 shadow-[0_24px_50px_-30px_rgba(43,38,33,0.55)]">
              <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--d-soft)]">
                {content.fromLabel}
              </p>
              <p className="mt-1 text-[1.4rem] leading-none text-[var(--d-ink)] [font-family:var(--demo-display)]">
                {fromPrice}
              </p>
            </div>

            <div
              aria-hidden
              className="absolute -left-5 top-10 hidden h-20 w-14 rounded-t-full border border-[var(--d-line)] bg-[var(--d-cream)] lg:block"
            />
          </div>
        </motion.div>
      </div>

      <div className="mt-14 flex items-center gap-3 text-[11px] uppercase tracking-[0.24em] text-[var(--d-soft)]">
        <ArrowDown className="h-3.5 w-3.5" strokeWidth={1.6} />
        {content.scroll}
      </div>
    </section>
  );
}
