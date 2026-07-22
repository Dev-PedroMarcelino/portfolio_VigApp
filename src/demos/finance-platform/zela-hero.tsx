"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useReducedMotionSafe as useReducedMotion } from "@/components/demos/use-reduced-motion-safe";
import {
  ArrowDownLeft,
  ArrowRight,
  Banknote,
  Bell,
  CarFront,
  Check,
  CreditCard,
  Eye,
  EyeOff,
  PiggyBank,
  QrCode,
  ScanBarcode,
  Sparkles,
  UtensilsCrossed,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { HeroTxIcon, ZelaContent } from "./content";
import { APP_BALANCE, HERO_TXS } from "./content";
import { Blob, EASE, fmtBRL, scrollToId } from "./ui";

const TX_ICONS: Record<HeroTxIcon, LucideIcon> = {
  pix: ArrowDownLeft,
  food: UtensilsCrossed,
  ride: CarFront,
  salary: Banknote,
};

/** Hand-built app mock: greeting, balance card, Pix shortcuts and ledger. */
function AppMock({ app, reduced }: { app: ZelaContent["hero"]["app"]; reduced: boolean }) {
  const [show, setShow] = useState(true);

  const actions: { icon: LucideIcon; label: string }[] = [
    { icon: QrCode, label: app.actions.pix },
    { icon: ScanBarcode, label: app.actions.pay },
    { icon: PiggyBank, label: app.actions.boxes },
    { icon: CreditCard, label: app.actions.card },
  ];

  return (
    <div className="w-full max-w-[350px] rounded-[2.2rem] border border-[var(--d-line)] bg-[var(--d-surface)] p-5 shadow-[0_48px_90px_-42px_rgba(28,43,36,0.4)]">
      {/* Greeting row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--d-green)] text-sm font-semibold text-[#FFFDF7] [font-family:var(--demo-display)]">
            {app.profileInitial}
          </span>
          <p className="text-sm font-medium text-[var(--d-ink)]">{app.greeting}</p>
        </div>
        <span className="relative grid h-9 w-9 place-items-center rounded-full border border-[var(--d-line)] text-[var(--d-ink-soft)]">
          <Bell className="h-4 w-4" strokeWidth={1.8} />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[var(--d-amber)]" aria-hidden />
        </span>
      </div>

      {/* Balance card */}
      <div className="mt-4 rounded-3xl bg-[var(--d-green)] p-4 text-[#FFFDF7]">
        <div className="flex items-center justify-between">
          <p className="text-[0.62rem] uppercase tracking-[0.18em] text-[#FFFDF7]/70 [font-family:var(--demo-mono)]">
            {app.balanceLabel}
          </p>
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            aria-label={show ? app.hideBalance : app.showBalance}
            aria-pressed={!show}
            className="grid h-7 w-7 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
          >
            {show ? (
              <Eye className="h-3.5 w-3.5" strokeWidth={1.8} />
            ) : (
              <EyeOff className="h-3.5 w-3.5" strokeWidth={1.8} />
            )}
          </button>
        </div>
        <p className="mt-1.5 text-[1.65rem] font-medium leading-none [font-family:var(--demo-mono)]">
          {show ? fmtBRL(APP_BALANCE) : app.hiddenValue}
        </p>
        <p className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-white/12 px-2.5 py-1 text-[0.62rem] font-medium text-[#D9EFC2]">
          <Sparkles className="h-3 w-3" strokeWidth={2} aria-hidden />
          {app.yieldChip}
        </p>
      </div>

      {/* Quick actions */}
      <div className="mt-4 grid grid-cols-4 gap-2">
        {actions.map(({ icon: Icon, label }) => (
          <motion.button
            key={label}
            type="button"
            whileHover={reduced ? undefined : { y: -3 }}
            whileTap={{ scale: 0.94 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="flex flex-col items-center gap-1.5 rounded-2xl border border-[var(--d-line)] bg-[var(--d-bg)] py-3 text-[var(--d-ink)]"
          >
            <Icon className="h-4.5 w-4.5 text-[var(--d-green)]" strokeWidth={1.8} />
            <span className="text-[0.64rem] font-medium">{label}</span>
          </motion.button>
        ))}
      </div>

      {/* Ledger */}
      <p className="mt-5 text-[0.62rem] uppercase tracking-[0.18em] text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]">
        {app.statementTitle}
      </p>
      <ul className="mt-2 space-y-1">
        {HERO_TXS.map((tx) => {
          const Icon = TX_ICONS[tx.icon];
          const label = app.txs[tx.id];
          const credit = tx.amount > 0;
          return (
            <li key={tx.id} className="flex items-center gap-3 rounded-2xl px-2 py-2 transition-colors hover:bg-[var(--d-bg)]">
              <span
                className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${
                  credit ? "bg-[var(--d-green)]/10 text-[var(--d-green)]" : "bg-[var(--d-amber)]/14 text-[var(--d-amber-deep)]"
                }`}
              >
                <Icon className="h-4 w-4" strokeWidth={1.8} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[0.78rem] font-medium text-[var(--d-ink)]">
                  {label.title}
                </span>
                <span className="block text-[0.66rem] text-[var(--d-ink-soft)]">{label.meta}</span>
              </span>
              <span
                className={`text-[0.76rem] font-medium [font-family:var(--demo-mono)] ${
                  credit ? "text-[var(--d-green)]" : "text-[var(--d-ink)]"
                }`}
              >
                {credit ? "+" : ""}
                {fmtBRL(tx.amount)}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function ZelaHero({ content }: { content: ZelaContent["hero"] }) {
  const reduced = useReducedMotion() ?? false;

  /* Gentle tilt/parallax that follows the cursor over the mock. */
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 140, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-8, 8]), { stiffness: 140, damping: 18 });
  const frameRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    if (reduced || !frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  const fadeUp = (delay: number) => ({
    initial: reduced ? { opacity: 0 } : { opacity: 0, y: 22 },
    animate: reduced ? { opacity: 1 } : { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: EASE },
  });

  return (
    <section id="conta" className="relative scroll-mt-16 overflow-hidden pb-16 pt-28 sm:pt-32 lg:pb-24">
      <Blob color="rgba(124,179,66,0.18)" className="-left-32 top-16 h-[26rem] w-[26rem]" />
      <Blob color="rgba(232,161,61,0.16)" className="-right-24 top-64 h-[22rem] w-[22rem]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <motion.p
            {...fadeUp(0)}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--d-line)] bg-[var(--d-surface)] px-3.5 py-1.5 text-[0.72rem] font-medium text-[var(--d-green)]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--d-lime)]" aria-hidden />
            {content.badge}
          </motion.p>

          <motion.h1
            {...fadeUp(0.08)}
            className="mt-6 text-[2.6rem] leading-[1.06] tracking-tight text-[var(--d-ink)] [font-family:var(--demo-display)] sm:text-[3.4rem] lg:text-[3.8rem]"
          >
            {content.titleLead}{" "}
            <em className="font-medium italic text-[var(--d-green)]">{content.titleAccent}</em>{" "}
            {content.titleEnd}
          </motion.h1>

          <motion.p
            {...fadeUp(0.16)}
            className="mt-6 max-w-xl text-[0.98rem] leading-relaxed text-[var(--d-ink-soft)]"
          >
            {content.subtitle}
          </motion.p>

          <motion.div {...fadeUp(0.24)} className="mt-8 flex flex-wrap items-center gap-3">
            <motion.button
              type="button"
              onClick={() => scrollToId("cta")}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="group flex items-center gap-2 rounded-full bg-[var(--d-green)] px-6 py-3.5 text-sm font-medium text-[#FFFDF7] shadow-[0_16px_34px_-16px_rgba(22,107,74,0.65)]"
            >
              {content.ctaPrimary}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
            </motion.button>
            <motion.button
              type="button"
              onClick={() => scrollToId("cartao")}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="rounded-full border border-[var(--d-ink)]/15 bg-[var(--d-surface)] px-6 py-3.5 text-sm font-medium text-[var(--d-ink)] transition-colors hover:border-[var(--d-green)]/40"
            >
              {content.ctaSecondary}
            </motion.button>
          </motion.div>

          <motion.ul {...fadeUp(0.32)} className="mt-9 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-x-7">
            {content.trust.map((item) => (
              <li key={item} className="flex items-center gap-2 text-[0.82rem] text-[var(--d-ink-soft)]">
                <span className="grid h-4.5 w-4.5 place-items-center rounded-full bg-[var(--d-lime)]/25" aria-hidden>
                  <Check className="h-3 w-3 text-[var(--d-green)]" strokeWidth={2.6} />
                </span>
                {item}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* App mock with tilt + floating chips */}
        <motion.div
          {...fadeUp(0.2)}
          className="relative mx-auto w-full max-w-[380px] lg:justify-self-end"
          style={{ perspective: 1100 }}
        >
          <div ref={frameRef} onMouseMove={onMove} onMouseLeave={onLeave}>
            <motion.div
              style={reduced ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="relative flex justify-center"
            >
              <AppMock app={content.app} reduced={reduced} />

              <motion.span
                animate={reduced ? undefined : { y: [0, -7, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-3 top-24 flex items-center gap-1.5 rounded-full border border-[var(--d-line)] bg-[var(--d-surface)] px-3 py-1.5 text-[0.68rem] font-medium text-[var(--d-ink)] shadow-lg shadow-black/5 sm:-left-8"
                style={{ z: 46 }}
              >
                <Zap className="h-3 w-3 text-[var(--d-amber-deep)]" strokeWidth={2.2} aria-hidden />
                {content.app.floatPix}
              </motion.span>

              <motion.span
                animate={reduced ? undefined : { y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                className="absolute -right-2 bottom-28 flex items-center gap-1.5 rounded-full border border-[var(--d-line)] bg-[var(--d-surface)] px-3 py-1.5 text-[0.68rem] font-medium text-[var(--d-ink)] shadow-lg shadow-black/5 sm:-right-7"
                style={{ z: 60 }}
              >
                <Sparkles className="h-3 w-3 text-[var(--d-green)]" strokeWidth={2.2} aria-hidden />
                {content.app.floatYield}
              </motion.span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
