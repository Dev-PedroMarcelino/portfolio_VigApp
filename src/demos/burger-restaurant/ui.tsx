"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, Flame, Plus } from "lucide-react";

const GRAIN_URI =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23g)'/%3E%3C/svg%3E";

/** Film grain covering the demo root. Sits under sticky chrome, blends over content. */
export function Grain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[60]"
      style={{
        backgroundImage: `url("${GRAIN_URI}")`,
        opacity: 0.07,
        mixBlendMode: "overlay",
      }}
    />
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2.5 [font-family:var(--demo-display)] text-xs uppercase tracking-[0.18em] text-[var(--d-mustard)]">
      <span aria-hidden className="h-[3px] w-8 -skew-x-12 bg-[var(--d-flame)]" />
      {children}
    </p>
  );
}

type StickerTone = "mustard" | "flame" | "cream";

const STICKER_TONES: Record<StickerTone, string> = {
  mustard: "bg-[var(--d-mustard)] text-[#1A0E08]",
  flame: "bg-[var(--d-flame)] text-[#1A0E08]",
  cream: "bg-[var(--d-ink)] text-[#1A0E08]",
};

/** Chunky die-cut sticker chip. */
export function Sticker({
  children,
  tone = "mustard",
  className = "",
}: {
  children: React.ReactNode;
  tone?: StickerTone;
  className?: string;
}) {
  return (
    <span
      className={`inline-block rounded-lg border-2 border-[#120A05] px-3 py-1.5 [font-family:var(--demo-display)] text-[10px] uppercase leading-none tracking-[0.08em] shadow-[3px_3px_0_rgba(0,0,0,0.45)] ${STICKER_TONES[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

/** Three-flame heat meter. */
export function HeatMeter({ level, ariaLabel }: { level: number; ariaLabel: string }) {
  return (
    <span
      role="img"
      aria-label={`${ariaLabel}: ${level}/3`}
      className="inline-flex items-center gap-0.5"
    >
      {[0, 1, 2].map((i) => (
        <Flame
          key={i}
          aria-hidden
          className={`h-3.5 w-3.5 ${
            i < level
              ? "fill-[var(--d-flame)] text-[var(--d-flame)]"
              : "text-[rgba(255,220,190,0.25)]"
          }`}
          strokeWidth={2}
        />
      ))}
    </span>
  );
}

/** Flashes an "added" confirmation for a beat after a cart action. */
export function useAddedFlash(): [boolean, () => void] {
  const [added, setAdded] = useState(false);
  useEffect(() => {
    if (!added) return;
    const timer = setTimeout(() => setAdded(false), 1400);
    return () => clearTimeout(timer);
  }, [added]);
  return [added, () => setAdded(true)];
}

/** Springy add-to-order button used across menu, combo and sides. */
export function AddButton({
  added,
  addLabel,
  addedLabel,
  itemName,
  onClick,
  compact = false,
  className = "",
}: {
  added: boolean;
  addLabel: string;
  addedLabel: string;
  itemName: string;
  onClick: () => void;
  compact?: boolean;
  className?: string;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={`${addLabel} ${itemName}`}
      whileTap={{ scale: 0.88 }}
      transition={{ type: "spring", stiffness: 500, damping: 18 }}
      className={`inline-flex items-center gap-1.5 rounded-xl border-2 border-[#120A05] [font-family:var(--demo-display)] uppercase leading-none shadow-[3px_3px_0_rgba(0,0,0,0.45)] transition-colors ${
        compact ? "px-3 py-2 text-[10px]" : "px-4 py-2.5 text-xs"
      } ${
        added
          ? "bg-[var(--d-mustard)] text-[#1A0E08]"
          : "bg-[var(--d-flame)] text-[#1A0E08] hover:bg-[var(--d-mustard)]"
      } ${className}`}
    >
      {added ? (
        <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
      ) : (
        <Plus className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
      )}
      {added ? addedLabel : addLabel}
    </motion.button>
  );
}
