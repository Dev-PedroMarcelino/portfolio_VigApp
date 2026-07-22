"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";
import { cn } from "@/lib/utils";

/* Shared primitives for the Zela finance-platform demo. */

/** Signature easing used across the demo's micro-interactions. */
export const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Every figure in Zela is Brazilian reais, formatted with pt-BR in all
 * interface languages — the product is Brazilian; only the UI translates.
 */
const BRL = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const BRL_WHOLE = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export function fmtBRL(value: number): string {
  return BRL.format(value);
}

export function fmtBRLWhole(value: number): string {
  return BRL_WHOLE.format(Math.round(value));
}

/** Smooth anchor scrolling used by the header and in-page CTAs. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/**
 * Warm eyebrow above section titles: a little amber seed and mono small
 * caps. `tone="cream"` flips the ink for the dark forest sections.
 */
export function SectionLabel({ text, tone = "green" }: { text: string; tone?: "green" | "cream" }) {
  return (
    <p
      className={cn(
        "flex items-center gap-2.5 text-[0.66rem] font-medium uppercase tracking-[0.3em] [font-family:var(--demo-mono)]",
        tone === "green" ? "text-[var(--d-green)]" : "text-[var(--d-lime)]",
      )}
    >
      <span
        aria-hidden
        className={cn(
          "h-2 w-2 rounded-full rounded-tl-none",
          tone === "green" ? "bg-[var(--d-amber)]" : "bg-[var(--d-lime)]",
        )}
      />
      {text}
    </p>
  );
}

/** Soft organic blob used as background warmth. Purely decorative. */
export function Blob({ className, color }: { className?: string; color: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute blur-3xl", className)}
      style={{
        background: color,
        borderRadius: "58% 42% 55% 45% / 48% 56% 44% 52%",
      }}
    />
  );
}

/**
 * Currency figure that eases from its previous value to the next one.
 * Falls back to a hard swap when the visitor prefers reduced motion.
 */
export function AnimatedMoney({
  value,
  reduced,
  whole = true,
  className,
}: {
  value: number;
  reduced: boolean;
  whole?: boolean;
  className?: string;
}) {
  const [shown, setShown] = useState(value);
  const prev = useRef(value);

  useEffect(() => {
    if (reduced) {
      prev.current = value;
      setShown(value);
      return;
    }
    const controls = animate(prev.current, value, {
      duration: 0.7,
      ease: EASE,
      onUpdate: setShown,
    });
    prev.current = value;
    return () => controls.stop();
  }, [value, reduced]);

  return (
    <span className={className}>{whole ? fmtBRLWhole(shown) : fmtBRL(shown)}</span>
  );
}
