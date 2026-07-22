"use client";

import { motion } from "framer-motion";
import { useReducedMotionSafe as useReducedMotion } from "@/components/demos/use-reduced-motion-safe";
import { ArrowUpRight, BadgeCheck, MessageCircle, ShieldCheck, Truck } from "lucide-react";
import { SketchfabEmbed } from "@/components/demos/sketchfab-embed";
import type { BarcellosContent } from "./content";
import { SKETCHFAB_911, waLink } from "./content";
import { EASE, FOCUS, scrollToId } from "./ui";

const BULLET_ICONS = [ShieldCheck, BadgeCheck, Truck];

export function HeroSection({
  content,
  whatsappMsg,
}: {
  content: BarcellosContent["hero"];
  whatsappMsg: string;
}) {
  const reduced = useReducedMotion() ?? false;

  return (
    <section id="top" className="relative overflow-hidden pb-20 pt-32 sm:pt-40">
      {/* Champagne key light falling from the showroom ceiling */}
      <div
        aria-hidden
        className="absolute -top-44 left-1/2 z-0 h-[560px] w-[900px] -translate-x-1/2 rounded-full opacity-50 blur-[130px]"
        style={{ background: "radial-gradient(circle, rgba(217,164,65,0.22), transparent 68%)" }}
      />
      {/* Polished floor line-work */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(38,43,54,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(38,43,54,0.55) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(110% 75% at 50% 0%, black 25%, transparent 78%)",
          WebkitMaskImage: "radial-gradient(110% 75% at 50% 0%, black 25%, transparent 78%)",
        }}
      />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-[0.94fr_1.06fr] lg:gap-10">
        {/* Copy */}
        <div>
          <motion.span
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--d-line)] bg-[var(--d-surface)]/70 px-3.5 py-1.5 text-[0.68rem] uppercase tracking-[0.2em] text-[var(--d-silver)] [font-family:var(--demo-mono)]"
          >
            <span className="h-1.5 w-1.5 rotate-45 bg-[var(--d-gold)] shadow-[0_0_10px_var(--d-gold)]" aria-hidden />
            {content.badge}
          </motion.span>

          <motion.h1
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: EASE, delay: 0.06 }}
            className="mt-6 text-[2.45rem] font-semibold leading-[1.05] tracking-tight text-[var(--d-ink)] [font-family:var(--demo-display)] sm:text-[3.4rem]"
          >
            {content.titleLead}{" "}
            <span className="bg-gradient-to-r from-[var(--d-gold-soft)] via-[var(--d-gold)] to-[#9C7226] bg-clip-text text-transparent">
              {content.titleAccent}
            </span>
          </motion.h1>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: EASE, delay: 0.12 }}
            className="mt-6 max-w-lg text-[0.98rem] leading-relaxed text-[var(--d-ink-soft)]"
          >
            {content.subtitle}
          </motion.p>

          <motion.ul
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.18 }}
            className="mt-6 flex flex-wrap gap-x-6 gap-y-2.5"
          >
            {content.bullets.map((b, i) => {
              const Icon = BULLET_ICONS[i] ?? ShieldCheck;
              return (
                <li key={b} className="flex items-center gap-2 text-[0.82rem] text-[var(--d-silver)]">
                  <Icon className="h-4 w-4 text-[var(--d-gold)]" strokeWidth={1.8} aria-hidden />
                  {b}
                </li>
              );
            })}
          </motion.ul>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.24 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <button
              type="button"
              onClick={() => scrollToId("estoque")}
              className={`group flex items-center gap-2 rounded-full bg-[var(--d-gold)] px-6 py-3 text-sm font-semibold text-[#141008] shadow-[0_0_30px_rgba(217,164,65,0.35)] transition-transform hover:scale-[1.03] ${FOCUS}`}
            >
              {content.ctaPrimary}
              <ArrowUpRight
                className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={2.2}
              />
            </button>
            <a
              href={waLink(whatsappMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 rounded-full border border-[var(--d-line)] px-6 py-3 text-sm font-medium text-[var(--d-ink)] transition-colors hover:border-[var(--d-gold)]/50 hover:bg-[var(--d-surface)] ${FOCUS}`}
            >
              <MessageCircle className="h-4 w-4 text-[var(--d-gold)]" strokeWidth={1.8} />
              {content.ctaSecondary}
            </a>
          </motion.div>

          <motion.dl
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.34 }}
            className="mt-11 grid max-w-md grid-cols-3 gap-6 border-t border-[var(--d-line)] pt-7"
          >
            {content.stats.map((s) => (
              <div key={s.label}>
                <dt className="text-[1.45rem] font-semibold text-[var(--d-ink)] [font-family:var(--demo-mono)] sm:text-[1.6rem]">
                  {s.value}
                </dt>
                <dd className="mt-1 text-[0.72rem] leading-snug text-[var(--d-ink-soft)]">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Showroom stage with the real 3D model */}
        <motion.div
          initial={reduced ? false : { opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.16 }}
          className="relative"
        >
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="text-[0.64rem] font-medium uppercase tracking-[0.3em] text-[var(--d-gold)] [font-family:var(--demo-mono)]">
                {content.stage.eyebrow}
              </p>
              <p className="mt-1.5 text-[0.9rem] text-[var(--d-silver)]">{content.stage.title}</p>
            </div>
            <span className="shrink-0 rounded-full border border-[var(--d-gold)]/35 bg-[var(--d-gold)]/10 px-3.5 py-1.5 text-[0.8rem] font-semibold text-[var(--d-gold)] [font-family:var(--demo-mono)]">
              {content.stage.priceTag}
            </span>
          </div>

          <div className="relative">
            {/* Corner ticks framing the stage */}
            <span aria-hidden className="absolute -left-2 -top-2 z-20 h-5 w-5 border-l border-t border-[var(--d-gold)]/60" />
            <span aria-hidden className="absolute -right-2 -top-2 z-20 h-5 w-5 border-r border-t border-[var(--d-gold)]/60" />
            <span aria-hidden className="absolute -bottom-2 -left-2 z-20 h-5 w-5 border-b border-l border-[var(--d-gold)]/60" />
            <span aria-hidden className="absolute -bottom-2 -right-2 z-20 h-5 w-5 border-b border-r border-[var(--d-gold)]/60" />

            <SketchfabEmbed
              uid={SKETCHFAB_911.uid}
              title={content.stage.title}
              thumb={SKETCHFAB_911.thumb}
              credit={SKETCHFAB_911.credit}
              loadLabel={content.stage.loadLabel}
              hint={content.stage.hint}
              accent="#D9A441"
              autospin
              className="aspect-[4/3] rounded-2xl border border-[var(--d-line)] bg-[var(--d-surface)] shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
            />

            {/* Showroom plinth: champagne baseline + elliptical floor glow */}
            <div
              aria-hidden
              className="absolute -bottom-7 left-1/2 h-14 w-[86%] -translate-x-1/2 rounded-[100%] opacity-60 blur-2xl"
              style={{ background: "radial-gradient(ellipse, rgba(217,164,65,0.3), transparent 70%)" }}
            />
            <div
              aria-hidden
              className="absolute -bottom-0.5 left-1/2 h-px w-[72%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[var(--d-gold)]/70 to-transparent"
            />
          </div>

          <div className="mt-7 flex justify-center">
            <button
              type="button"
              onClick={() => scrollToId("destaque")}
              className={`group flex items-center gap-2 text-[0.78rem] uppercase tracking-[0.18em] text-[var(--d-ink-soft)] transition-colors hover:text-[var(--d-gold)] [font-family:var(--demo-mono)] ${FOCUS}`}
            >
              {content.stage.fichaCta}
              <ArrowUpRight className="h-3.5 w-3.5 rotate-[135deg] transition-transform group-hover:translate-y-0.5" strokeWidth={2} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
