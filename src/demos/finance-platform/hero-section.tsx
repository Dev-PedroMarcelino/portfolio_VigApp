"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight, Wifi, MousePointer2 } from "lucide-react";
import type { NuvexContent } from "./content";
import { BALANCE } from "./content";
import { fmtWhole, scrollToId } from "./ui";

/* ------------------------------------------------------------------ */
/* Holographic tilt card                                               */
/* ------------------------------------------------------------------ */

function TiltCard({
  content,
  localeTag,
  currency,
}: {
  content: NuvexContent["hero"]["card"];
  localeTag: string;
  currency: string;
}) {
  const reduced = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  // Pointer position within the card, normalized to -0.5..0.5.
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const springCfg = { stiffness: 150, damping: 18, mass: 0.4 };
  const rotX = useSpring(useTransform(py, [-0.5, 0.5], [12, -12]), springCfg);
  const rotY = useSpring(useTransform(px, [-0.5, 0.5], [-16, 16]), springCfg);

  // Glare + holographic sheen follow the cursor.
  const glareX = useTransform(px, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(py, [-0.5, 0.5], ["0%", "100%"]);
  const sheen = useTransform(px, [-0.5, 0.5], [20, 340]);

  const holoBg = useTransform(
    sheen,
    (h) =>
      `conic-gradient(from ${h}deg at 70% 30%, rgba(16,185,129,0.0), rgba(16,185,129,0.35), rgba(34,211,238,0.28), rgba(167,139,250,0.22), rgba(16,185,129,0.0))`,
  );
  const glareBg = useTransform(
    [glareX, glareY],
    ([x, y]: string[]) =>
      `radial-gradient(140px circle at ${x} ${y}, rgba(255,255,255,0.35), transparent 65%)`,
  );

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    px.set(0);
    py.set(0);
    setActive(false);
  };

  return (
    <div className="relative [perspective:1400px]">
      {/* Emerald bloom behind the card */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[115%] w-[115%] -translate-x-1/2 -translate-y-1/2 rounded-[36px] opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 40%, rgba(16,185,129,0.42), rgba(34,211,238,0.12) 55%, transparent 80%)",
        }}
      />

      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={handleLeave}
        style={{ rotateX: reduced ? 0 : rotX, rotateY: reduced ? 0 : rotY, transformStyle: "preserve-3d" }}
        className="relative aspect-[1.586/1] w-full max-w-[420px] cursor-crosshair select-none rounded-[24px] border border-white/10 p-6 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.85)]"
      >
        {/* Base obsidian + holographic gradient */}
        <div
          className="absolute inset-0 rounded-[24px]"
          style={{
            background:
              "linear-gradient(135deg, #0A0E16 0%, #0E1B22 40%, #071316 100%)",
          }}
        />
        <motion.div
          aria-hidden
          className="absolute inset-0 rounded-[24px] opacity-70"
          style={{
            background: holoBg,
            mixBlendMode: "screen",
          }}
        />
        {/* Scan texture on the card */}
        <div
          aria-hidden
          className="absolute inset-0 rounded-[24px] opacity-[0.12]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(115deg, rgba(255,255,255,0.6) 0, rgba(255,255,255,0.6) 1px, transparent 1px, transparent 6px)",
          }}
        />
        {/* Cursor glare */}
        <motion.div
          aria-hidden
          className="absolute inset-0 rounded-[24px] transition-opacity duration-300"
          style={{
            opacity: active ? 0.9 : 0,
            background: glareBg,
            mixBlendMode: "overlay",
          }}
        />

        {/* Card content */}
        <div className="relative flex h-full flex-col justify-between [transform:translateZ(40px)]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[0.62rem] uppercase tracking-[0.3em] text-white/50 [font-family:var(--demo-mono)]">
                {content.label}
              </p>
              <p className="mt-1 text-base font-semibold tracking-tight text-white [font-family:var(--demo-display)]">
                {content.network}
              </p>
            </div>
            <Wifi className="h-5 w-5 rotate-90 text-white/60" strokeWidth={1.6} />
          </div>

          {/* Chip */}
          <div className="flex items-center gap-3">
            <div className="h-8 w-11 rounded-md bg-gradient-to-br from-[#D9C57A] to-[#8C7A38] shadow-inner">
              <div className="mx-auto mt-1 h-6 w-8 rounded-[3px] border border-black/20" style={{ backgroundImage: "linear-gradient(90deg, transparent 45%, rgba(0,0,0,0.25) 45%, rgba(0,0,0,0.25) 55%, transparent 55%)" }} />
            </div>
            <p className="text-lg tracking-[0.18em] text-white/90 [font-family:var(--demo-mono)]">
              {content.number}
            </p>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <p className="text-[0.56rem] uppercase tracking-[0.24em] text-white/45 [font-family:var(--demo-mono)]">
                {content.holderLabel}
              </p>
              <p className="mt-0.5 text-sm tracking-wide text-white/90 [font-family:var(--demo-mono)]">
                {content.holder}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[0.56rem] uppercase tracking-[0.24em] text-white/45 [font-family:var(--demo-mono)]">
                {content.validLabel}
              </p>
              <p className="mt-0.5 text-sm tracking-wide text-white/90 [font-family:var(--demo-mono)]">
                {content.valid}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Available balance chip floating on the card */}
      <div className="pointer-events-none absolute -bottom-6 -right-3 rounded-2xl border border-[var(--d-line)] bg-[#0A0E16]/90 px-4 py-3 shadow-xl backdrop-blur-md [transform:translateZ(60px)]">
        <p className="text-[0.56rem] uppercase tracking-[0.24em] text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]">
          {content.balanceLabel}
        </p>
        <p className="mt-0.5 text-lg font-semibold text-[var(--d-ink)] [font-family:var(--demo-mono)]">
          {fmtWhole(BALANCE, localeTag, currency)}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                 */
/* ------------------------------------------------------------------ */

export function HeroSection({
  content,
  localeTag,
  currency,
}: {
  content: NuvexContent["hero"];
  localeTag: string;
  currency: string;
}) {
  const reduced = useReducedMotion() ?? false;
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-24 sm:pt-40">
      {/* Ambient grid + glow */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(26,36,54,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(26,36,54,0.6) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(120% 80% at 50% 0%, black 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(120% 80% at 50% 0%, black 30%, transparent 80%)",
        }}
      />
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 z-0 h-[520px] w-[820px] -translate-x-1/2 rounded-full opacity-60 blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(16,185,129,0.28), transparent 70%)" }}
      />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-16 px-5 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <motion.span
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--d-line)] bg-[var(--d-panel)]/60 px-3 py-1.5 text-[0.7rem] tracking-wide text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--d-accent)] opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--d-accent)]" />
            </span>
            {content.badge}
          </motion.span>

          <motion.h1
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.05 }}
            className="mt-6 text-[2.7rem] font-semibold leading-[1.03] tracking-tight text-[var(--d-ink)] [font-family:var(--demo-display)] sm:text-[3.7rem]"
          >
            {content.titleLead}{" "}
            <span className="bg-gradient-to-r from-[var(--d-accent-soft)] via-[#6EE7B7] to-[#22D3EE] bg-clip-text text-transparent">
              {content.titleAccent}
            </span>
          </motion.h1>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.12 }}
            className="mt-6 max-w-lg text-[0.98rem] leading-relaxed text-[var(--d-ink-soft)]"
          >
            {content.subtitle}
          </motion.p>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.18 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <button
              type="button"
              onClick={() => scrollToId("cta")}
              className="group flex items-center gap-2 rounded-full bg-[var(--d-accent)] px-6 py-3 text-sm font-medium text-[#05070C] shadow-[0_0_28px_rgba(16,185,129,0.4)] transition-transform hover:scale-[1.03]"
            >
              {content.ctaPrimary}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.2} />
            </button>
            <button
              type="button"
              onClick={() => scrollToId("account")}
              className="rounded-full border border-[var(--d-line)] px-6 py-3 text-sm font-medium text-[var(--d-ink)] transition-colors hover:border-[var(--d-accent)]/50 hover:bg-[var(--d-panel)]"
            >
              {content.ctaSecondary}
            </button>
          </motion.div>

          <motion.dl
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease, delay: 0.28 }}
            className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-[var(--d-line)] pt-7"
          >
            {content.stats.map((s) => (
              <div key={s.label}>
                <dt className="text-2xl font-semibold text-[var(--d-ink)] [font-family:var(--demo-mono)]">
                  {s.value}
                </dt>
                <dd className="mt-1 text-[0.72rem] leading-snug text-[var(--d-ink-soft)]">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          initial={reduced ? false : { opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.15 }}
          className="flex flex-col items-center gap-6"
        >
          <TiltCard content={content.card} localeTag={localeTag} currency={currency} />
          <p className="flex items-center gap-2 pt-4 text-[0.68rem] text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]">
            <MousePointer2 className="h-3.5 w-3.5 text-[var(--d-accent)]" strokeWidth={1.8} />
            {content.card.hint}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
