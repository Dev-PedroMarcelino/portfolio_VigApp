"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotionSafe as useReducedMotion } from "@/components/demos/use-reduced-motion-safe";
import * as Slider from "@radix-ui/react-slider";
import { Coins, Lock, Repeat, TrendingDown, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Model3D, ModelCredit } from "@/components/demos/model-3d";
import type { CryptoBulletIcon, ZelaContent } from "./content";
import {
  BTC_CHANGE_PCT,
  BTC_PRICE_BRL,
  BTC_SPARK,
  CRYPTO_COINS,
  CRYPTO_DEFAULT,
  CRYPTO_MAX,
  CRYPTO_MIN,
  CRYPTO_MODEL,
  CRYPTO_PRESETS,
  CRYPTO_STEP,
  btcForBRL,
} from "./content";
import { Blob, EASE, SectionLabel, fmtBRL, fmtBRLWhole } from "./ui";

const BULLET_ICONS: Record<CryptoBulletIcon, LucideIcon> = {
  coins: Coins,
  lock: Lock,
  repeat: Repeat,
};

/** BTC amounts are shown to 6 decimals, pt-BR style, like the rest of Zela. */
const BTC_FMT = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 6,
  maximumFractionDigits: 6,
});

const PCT_FMT = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
  signDisplay: "always",
});

/** Session line built from the fixed series — decorative, never a live quote. */
function Sparkline({ points, className }: { points: number[]; className?: string }) {
  const step = 100 / (points.length - 1);
  const line = points.map((v, i) => `${i * step},${34 - v * 30}`).join(" ");

  return (
    <svg
      aria-hidden
      viewBox="0 0 100 36"
      preserveAspectRatio="none"
      className={className}
    >
      <defs>
        <linearGradient id="zela-spark-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--d-amber)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--d-amber)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,36 ${line} 100,36`} fill="url(#zela-spark-fill)" />
      <polyline
        points={line}
        fill="none"
        stroke="var(--d-amber)"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/**
 * "Cripto" — the crypto tab of the account, presented as an app screen rather
 * than a full-bleed dark section, so the demo keeps its single dark passage
 * (the metal card). The real Bitcoin model sits on our own three.js stage at
 * the top of the screen, spinning slowly over the quote.
 */
export function ZelaCrypto({ content }: { content: ZelaContent["crypto"] }) {
  const reduced = useReducedMotion() ?? false;
  const [amount, setAmount] = useState(CRYPTO_DEFAULT);
  const screen = content.screen;
  const up = BTC_CHANGE_PCT >= 0;
  const Trend = up ? TrendingUp : TrendingDown;

  const reveal = (delay = 0) => ({
    initial: reduced ? { opacity: 0 } : { opacity: 0, y: 26 },
    whileInView: reduced ? { opacity: 1 } : { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 0.7, delay, ease: EASE },
  });

  return (
    <section id="cripto" className="relative scroll-mt-16 overflow-hidden py-20 sm:py-28">
      <Blob color="rgba(232,161,61,0.14)" className="-right-32 top-24 h-[26rem] w-[26rem]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-[0.95fr_1.05fr]">
        {/* Sales copy */}
        <div>
          <motion.div {...reveal(0)}>
            <SectionLabel text={content.label} />
            <h2 className="mt-5 text-3xl leading-tight tracking-tight text-[var(--d-ink)] [font-family:var(--demo-display)] sm:text-[2.7rem] sm:leading-[1.08]">
              {content.titleLead}{" "}
              <em className="font-medium italic text-[var(--d-green)]">{content.titleAccent}</em>{" "}
              {content.titleEnd}
            </h2>
            <p className="mt-5 max-w-lg text-[0.95rem] leading-relaxed text-[var(--d-ink-soft)]">
              {content.intro}
            </p>
          </motion.div>

          <ul className="mt-9 space-y-4">
            {content.bullets.map((b, i) => {
              const Icon = BULLET_ICONS[b.icon];
              return (
                <motion.li
                  key={b.title}
                  {...reveal(0.08 + i * 0.08)}
                  className="flex gap-4 rounded-[1.6rem] border border-[var(--d-line)] bg-[var(--d-surface)] p-5"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl rounded-tl-sm bg-[var(--d-amber)]/16 text-[var(--d-amber-deep)]">
                    <Icon className="h-5 w-5" strokeWidth={1.7} aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-[0.95rem] font-semibold text-[var(--d-ink)] [font-family:var(--demo-display)]">
                      {b.title}
                    </h3>
                    <p className="mt-1 text-[0.82rem] leading-relaxed text-[var(--d-ink-soft)]">
                      {b.body}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </div>

        {/* The crypto screen */}
        <motion.div {...reveal(0.12)} className="relative mx-auto w-full max-w-[27rem]">
          <div className="overflow-hidden rounded-[2.4rem] border border-[var(--d-line)] bg-[var(--d-forest)] text-[#F3EEDF] shadow-[0_50px_110px_-60px_rgba(14,59,41,0.9)]">
            {/* Screen header */}
            <div className="flex items-center justify-between gap-4 px-6 pt-6">
              <span className="rounded-full bg-[var(--d-lime)]/18 px-3 py-1 text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-[var(--d-lime)] [font-family:var(--demo-mono)]">
                {screen.tag}
              </span>
              <span className="text-right">
                <span className="block text-[0.6rem] uppercase tracking-[0.18em] text-[#F3EEDF]/50 [font-family:var(--demo-mono)]">
                  {screen.walletLabel}
                </span>
                <span className="block text-[0.9rem] font-medium [font-family:var(--demo-mono)]">
                  {screen.walletValue}
                </span>
              </span>
            </div>

            {/* The coin, on our own stage — transparent, so it floats on the screen */}
            <Model3D
              file={CRYPTO_MODEL.file}
              title={screen.modelTitle}
              accent="#E8A13D"
              autospin
              embedFallback={false}
              className="mt-2 h-44 w-full sm:h-52"
            />

            {/* Quote */}
            <div className="px-6">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-[0.6rem] uppercase tracking-[0.18em] text-[#F3EEDF]/50 [font-family:var(--demo-mono)]">
                    {screen.priceLabel}
                  </p>
                  <p className="mt-1 text-[1.7rem] font-medium leading-none [font-family:var(--demo-mono)]">
                    {fmtBRLWhole(BTC_PRICE_BRL)}
                  </p>
                </div>
                <span
                  className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.72rem] font-semibold [font-family:var(--demo-mono)] ${
                    up ? "bg-[var(--d-lime)]/18 text-[var(--d-lime)]" : "bg-[#C05B41]/20 text-[#E9A48F]"
                  }`}
                >
                  <Trend className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden />
                  {PCT_FMT.format(BTC_CHANGE_PCT)}% · {screen.changeLabel}
                </span>
              </div>

              <Sparkline points={BTC_SPARK} className="mt-4 h-14 w-full" />
              <p className="mt-1 text-[0.6rem] uppercase tracking-[0.16em] text-[#F3EEDF]/40 [font-family:var(--demo-mono)]">
                {screen.sessionLabel}
              </p>
            </div>

            {/* Buy panel */}
            <div className="mt-5 border-t border-white/10 px-6 pt-5">
              <div className="flex items-baseline justify-between gap-4">
                <p className="text-[0.72rem] text-[#F3EEDF]/70">{screen.amountLabel}</p>
                <p className="text-lg font-medium [font-family:var(--demo-mono)]">
                  {fmtBRLWhole(amount)}
                </p>
              </div>

              <Slider.Root
                className="relative mt-3 flex h-6 w-full touch-none select-none items-center"
                min={CRYPTO_MIN}
                max={CRYPTO_MAX}
                step={CRYPTO_STEP}
                value={[amount]}
                onValueChange={([v]) => setAmount(v)}
              >
                <Slider.Track className="relative h-2 grow rounded-full bg-white/15">
                  <Slider.Range className="absolute h-full rounded-full bg-[var(--d-amber)]" />
                </Slider.Track>
                <Slider.Thumb
                  aria-label={screen.sliderAria}
                  className="block h-6 w-6 cursor-grab rounded-full border-[3px] border-[var(--d-amber)] bg-[#FFFDF7] shadow-lg outline-none transition-transform hover:scale-110 focus-visible:ring-4 focus-visible:ring-white/30 active:cursor-grabbing"
                />
              </Slider.Root>

              <div className="mt-4 flex flex-wrap gap-2">
                {CRYPTO_PRESETS.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setAmount(preset)}
                    aria-pressed={amount === preset}
                    className={`rounded-full px-3.5 py-1.5 text-[0.72rem] font-medium transition-colors ${
                      amount === preset
                        ? "bg-[#FFFDF7] text-[var(--d-forest)]"
                        : "bg-white/10 text-[#F3EEDF]/80 hover:bg-white/20"
                    }`}
                  >
                    {fmtBRLWhole(preset)}
                  </button>
                ))}
              </div>

              <dl className="mt-5 space-y-2 rounded-[1.4rem] bg-white/8 p-4">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-[0.68rem] uppercase tracking-[0.16em] text-[#F3EEDF]/55 [font-family:var(--demo-mono)]">
                    {screen.receiveLabel}
                  </dt>
                  <dd className="text-[0.95rem] font-medium text-[var(--d-amber)] [font-family:var(--demo-mono)]">
                    {BTC_FMT.format(btcForBRL(amount))} BTC
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-[0.68rem] uppercase tracking-[0.16em] text-[#F3EEDF]/55 [font-family:var(--demo-mono)]">
                    {screen.feeLabel}
                  </dt>
                  <dd className="text-[0.82rem] [font-family:var(--demo-mono)]">{screen.feeValue}</dd>
                </div>
              </dl>

              <button
                type="button"
                className="mt-4 w-full rounded-full bg-[var(--d-lime)] py-3.5 text-[0.85rem] font-semibold text-[#122A0C] transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30"
              >
                {screen.cta}
              </button>
            </div>

            {/* Other coins */}
            <div className="mt-6 border-t border-white/10 px-6 py-5">
              <p className="text-[0.6rem] uppercase tracking-[0.18em] text-[#F3EEDF]/45 [font-family:var(--demo-mono)]">
                {screen.listLabel}
              </p>
              <ul className="mt-3 space-y-2.5">
                {/* BTC is the quote above; this list is what else is on offer. */}
                {CRYPTO_COINS.filter((coin) => coin.id !== "btc").map((coin) => (
                  <li key={coin.id} className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-3">
                      <span
                        aria-hidden
                        className="grid h-8 w-8 place-items-center rounded-full text-[0.6rem] font-bold [font-family:var(--demo-mono)]"
                        style={{ backgroundColor: `${coin.color}2E`, color: coin.color }}
                      >
                        {coin.symbol}
                      </span>
                      <span className="text-[0.85rem]">{screen.coins[coin.id]}</span>
                    </span>
                    <span className="text-right">
                      <span className="block text-[0.82rem] [font-family:var(--demo-mono)]">
                        {fmtBRL(coin.priceBRL)}
                      </span>
                      <span
                        className={`block text-[0.68rem] [font-family:var(--demo-mono)] ${
                          coin.changePct >= 0 ? "text-[var(--d-lime)]" : "text-[#E9A48F]"
                        }`}
                      >
                        {PCT_FMT.format(coin.changePct)}%
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-5 text-[0.68rem] leading-relaxed text-[var(--d-ink-soft)]">
            {screen.note}
          </p>
          <ModelCredit
            credit={CRYPTO_MODEL.credit}
            className="mt-2 text-[0.62rem] uppercase tracking-[0.14em] text-[var(--d-ink-soft)]/55 [font-family:var(--demo-mono)]"
          />
        </motion.div>
      </div>
    </section>
  );
}
