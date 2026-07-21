"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Eye, Fingerprint, Key, Lock, Server, Shield } from "lucide-react";
import type { SecurityContent, SecurityIconId } from "./content";
import { GridPattern, SectionHeading } from "./ui";

const ICONS: Record<SecurityIconId, typeof Shield> = {
  shield: Shield,
  lock: Lock,
  key: Key,
  fingerprint: Fingerprint,
  server: Server,
  eye: Eye,
};

export function Security({ content }: { content: SecurityContent }) {
  const reduce = useReducedMotion();

  return (
    <section id="security" className="relative scroll-mt-20 overflow-hidden py-24">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 0%, rgba(124,58,237,0.16), transparent 70%)",
        }}
      />
      <GridPattern />
      <div className="relative mx-auto max-w-6xl px-5">
        <SectionHeading label={content.label} title={content.title} intro={content.intro} />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {content.items.map((item, i) => {
            const Icon = ICONS[item.icon];
            return (
              <motion.div
                key={item.title}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
                className="group rounded-2xl border border-[var(--d-line)] bg-[rgba(11,10,20,0.6)] p-6 backdrop-blur-sm transition-colors hover:border-[var(--d-line-strong)]"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--d-line)] bg-[rgba(167,139,250,0.1)] text-[var(--d-accent)] transition-shadow group-hover:shadow-[0_0_24px_-6px_var(--d-accent)]">
                  <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden />
                </span>
                <h3 className="mt-4 [font-family:var(--demo-display)] text-[1.02rem] font-semibold text-[var(--d-ink)]">
                  {item.title}
                </h3>
                <p className="mt-2 text-[0.85rem] leading-relaxed text-[var(--d-ink-soft)]">{item.body}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {content.certs.map((cert) => (
            <span
              key={cert}
              className="rounded-full border border-[var(--d-line)] bg-[var(--d-panel)] px-4 py-2 text-[0.74rem] font-medium tracking-wide text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]"
            >
              {cert}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
