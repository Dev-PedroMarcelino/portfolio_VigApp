"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Activity,
  BadgeCheck,
  Fingerprint,
  Globe,
  KeyRound,
  Lock,
  ShieldCheck,
} from "lucide-react";
import type { SecurityContent, SecurityIconId } from "./content";
import { GridPattern, SectionHeading } from "./ui";

const ICONS: Record<SecurityIconId, typeof ShieldCheck> = {
  shield: ShieldCheck,
  key: KeyRound,
  lock: Lock,
  fingerprint: Fingerprint,
  globe: Globe,
  activity: Activity,
};

export function SecurityBand({ content }: { content: SecurityContent }) {
  const reduce = useReducedMotion();

  return (
    <section id="security" className="relative scroll-mt-20 overflow-hidden bg-[#0B1222] py-24">
      <GridPattern />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(96,165,250,0.5)] to-transparent"
      />
      <div className="relative mx-auto max-w-6xl px-5">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading label={content.label} title={content.title} intro={content.intro} align="left" />
          <div className="shrink-0 rounded-2xl border border-[var(--d-line)] bg-[var(--d-panel)] px-8 py-6 text-center backdrop-blur lg:text-right">
            <p className="[font-family:var(--demo-display)] text-4xl font-semibold tracking-tight text-[var(--d-ink)]">
              <span className="bg-gradient-to-r from-[#60A5FA] to-[#34D399] bg-clip-text text-transparent">
                {content.uptimeValue}
              </span>
            </p>
            <p className="mt-1 max-w-44 text-[0.72rem] leading-snug text-[var(--d-ink-soft)]">
              {content.uptimeLabel}
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {content.items.map((item, i) => {
            const Icon = ICONS[item.icon];
            return (
              <motion.article
                key={item.title}
                initial={reduce ? false : { opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
                className="group rounded-2xl border border-[var(--d-line)] bg-[var(--d-panel)] p-6 backdrop-blur transition-colors hover:border-[var(--d-accent)]/40 hover:bg-[rgba(96,165,250,0.05)]"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--d-line)] bg-[rgba(96,165,250,0.1)] shadow-[0_0_24px_-8px_rgba(96,165,250,0.7)]">
                  <Icon className="h-5 w-5 text-[var(--d-accent)]" strokeWidth={1.8} aria-hidden />
                </span>
                <h3 className="mt-4 text-[0.95rem] font-semibold text-[var(--d-ink)]">{item.title}</h3>
                <p className="mt-2 text-[0.82rem] leading-relaxed text-[var(--d-ink-soft)]">{item.body}</p>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          {content.badges.map((badge) => (
            <span
              key={badge}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--d-line-strong)] bg-[rgba(15,23,42,0.6)] px-4 py-2 text-[0.72rem] font-semibold tracking-wide text-[var(--d-ink)]"
            >
              <BadgeCheck className="h-3.5 w-3.5 text-[#34D399]" strokeWidth={2} aria-hidden />
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
