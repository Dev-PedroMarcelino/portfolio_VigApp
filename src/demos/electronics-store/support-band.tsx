"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeftRight, LifeBuoy, ShieldCheck, Truck } from "lucide-react";
import type { SupportContent, SupportItem } from "./content";
import { SectionLabel, scrollToId } from "./ui";

const BAND_IMG =
  "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=1600&q=80";

const ICONS: Record<SupportItem["icon"], typeof ShieldCheck> = {
  shield: ShieldCheck,
  truck: Truck,
  trade: ArrowLeftRight,
  help: LifeBuoy,
};

export function SupportBand({ content }: { content: SupportContent }) {
  const reduce = useReducedMotion() ?? false;

  return (
    <section id="support" className="relative scroll-mt-20 overflow-hidden px-5 py-20 md:py-28">
      <Image
        src={BAND_IMG}
        alt={content.imageAlt}
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,15,30,0.96) 0%, rgba(10,15,30,0.88) 45%, rgba(10,15,30,0.96) 100%), linear-gradient(60deg, rgba(0,212,255,0.08), transparent 55%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <SectionLabel text={content.label} />
          <h2 className="mt-5 [font-family:var(--demo-display)] text-3xl font-bold tracking-tight text-[var(--d-ink)] md:text-5xl">
            {content.title}
          </h2>
          <p className="mt-4 leading-[1.8] text-[var(--d-ink-dim)]">{content.intro}</p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {content.items.map((item, i) => {
            const Icon = ICONS[item.icon];
            return (
              <motion.div
                key={item.icon}
                initial={reduce ? undefined : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="rounded-3xl border border-[var(--d-line)] bg-[var(--d-bg)]/70 p-6 backdrop-blur-sm"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--d-accent)]/12 text-[var(--d-accent)]">
                  <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden />
                </span>
                <h3 className="mt-4 [font-family:var(--demo-display)] text-lg font-bold tracking-tight text-[var(--d-ink)]">
                  {item.title}
                </h3>
                <p className="mt-2 text-[0.78rem] leading-relaxed text-[var(--d-ink-dim)]">
                  {item.body}
                </p>
              </motion.div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => scrollToId("footer")}
          className="mt-10 rounded-full border border-[var(--d-accent)]/50 px-7 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[var(--d-accent)] transition-colors hover:bg-[var(--d-accent)]/10"
        >
          {content.cta}
        </button>
      </div>
    </section>
  );
}
