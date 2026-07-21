"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Flame } from "lucide-react";

/** Tiling flour-dust grain, generated in pure SVG so it ships with zero assets. */
const FLOUR_TEXTURE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='f'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23f)'/%3E%3C/svg%3E")`;

export function FlourOverlay({
  className = "",
  opacity = 0.05,
  blend = "multiply",
}: {
  className?: string;
  opacity?: number;
  blend?: "multiply" | "screen";
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{ backgroundImage: FLOUR_TEXTURE, opacity, mixBlendMode: blend }}
    />
  );
}

export function Eyebrow({
  children,
  tone = "red",
}: {
  children: React.ReactNode;
  tone?: "red" | "cream" | "basil";
}) {
  const color =
    tone === "cream"
      ? "text-[#EFE0C6]"
      : tone === "basil"
        ? "text-[var(--d-basil)]"
        : "text-[var(--d-red)]";
  return (
    <p
      className={`flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] ${color}`}
    >
      <span className="h-px w-8 bg-current" aria-hidden />
      {children}
    </p>
  );
}

export function WoodFireBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[rgba(193,39,45,0.09)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--d-red)]">
      <Flame className="h-3 w-3" strokeWidth={2.2} aria-hidden />
      {label}
    </span>
  );
}

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 26 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
