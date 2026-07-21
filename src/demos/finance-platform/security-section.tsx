"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  Fingerprint,
  ScanFace,
  Lock,
  ShieldCheck,
  BellRing,
  KeyRound,
  ShieldHalf,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { NuvexContent } from "./content";
import { SectionLabel } from "./ui";

const ICONS: Record<string, LucideIcon> = {
  fingerprint: Fingerprint,
  "scan-face": ScanFace,
  lock: Lock,
  "shield-check": ShieldCheck,
  "bell-ring": BellRing,
  "key-round": KeyRound,
};

export function SecuritySection({
  content,
  altText,
}: {
  content: NuvexContent["security"];
  altText: string;
}) {
  const reduced = useReducedMotion() ?? false;

  return (
    <section
      id="security"
      className="relative scroll-mt-16 border-t border-[var(--d-line)] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          {/* Visual */}
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-[var(--d-line)]">
              <Image
                src="https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=1200&q=80"
                alt={altText}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              {/* Emerald duotone + obsidian wash so an off-subject crop still reads intentional */}
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(5,7,12,0.35) 0%, rgba(5,7,12,0.5) 45%, rgba(5,7,12,0.95) 100%), radial-gradient(80% 60% at 50% 30%, rgba(16,185,129,0.32), transparent 70%)",
                  mixBlendMode: "normal",
                }}
              />
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.12]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(to bottom, rgba(255,255,255,0.8) 0, rgba(255,255,255,0.8) 1px, transparent 1px, transparent 4px)",
                }}
              />
              {/* Live status chip */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-2xl border border-[var(--d-line)] bg-[#05070C]/80 px-4 py-3 backdrop-blur-md">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--d-accent)] opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--d-accent)]" />
                </span>
                <div>
                  <p className="text-[0.58rem] uppercase tracking-[0.2em] text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]">
                    {content.statusLabel}
                  </p>
                  <p className="text-sm font-medium text-[var(--d-ink)]">{content.statusValue}</p>
                </div>
                <ShieldHalf className="ml-auto h-5 w-5 text-[var(--d-accent)]" strokeWidth={1.6} />
              </div>
            </div>
          </div>

          {/* Copy + features */}
          <div>
            <SectionLabel text={content.label} />
            <h2 className="mt-5 text-3xl leading-tight text-[var(--d-ink)] [font-family:var(--demo-display)] sm:text-[2.6rem] sm:leading-[1.1]">
              {content.title}
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-[var(--d-ink-soft)]">
              {content.intro}
            </p>

            <div className="mt-9 grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {content.features.map((f, i) => {
                const Icon = ICONS[f.icon] ?? ShieldCheck;
                return (
                  <motion.div
                    key={f.title}
                    initial={reduced ? false : { opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.5, delay: (i % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--d-line)] bg-[var(--d-panel)] text-[var(--d-accent)]">
                      <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
                    </span>
                    <h3 className="mt-3 text-sm font-semibold text-[var(--d-ink)] [font-family:var(--demo-display)]">
                      {f.title}
                    </h3>
                    <p className="mt-1.5 text-[0.82rem] leading-relaxed text-[var(--d-ink-soft)]">
                      {f.body}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
