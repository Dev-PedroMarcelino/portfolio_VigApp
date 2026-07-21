"use client";

import { useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";

/** Builds a defensive Unsplash URL at the requested render width. */
export function shot(id: string, w = 1600) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
}

/** Currency formatter honoring the active locale + currency from content. */
export function money(locale: string, currency: string, value: number) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

/** Smooth anchor scrolling that clears the sticky header. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** Kinetic mono kicker with a hot rule and a pulsing dot. */
export function Kicker({ text, live = false }: { text: string; live?: boolean }) {
  return (
    <p className="flex items-center gap-3 text-[0.66rem] font-bold uppercase tracking-[0.34em] text-[var(--d-accent)] [font-family:var(--demo-body)]">
      <span className="relative flex h-2 w-2">
        {live && (
          <span className="absolute inset-0 animate-ping rounded-full bg-[var(--d-accent)] opacity-70" />
        )}
        <span className="relative h-2 w-2 rounded-full bg-[var(--d-accent)]" />
      </span>
      {text}
    </p>
  );
}

/** Sticker-style mono chip used for tags and specs. */
export function Chip({
  children,
  tone = "outline",
}: {
  children: ReactNode;
  tone?: "outline" | "pink" | "violet" | "volt";
}) {
  const tones: Record<string, string> = {
    outline: "border-[var(--d-line)] text-[var(--d-ink-soft)]",
    pink: "border-transparent bg-[var(--d-accent)] text-[#12081F]",
    violet: "border-transparent bg-[var(--d-accent-2)] text-white",
    volt: "border-transparent bg-[var(--d-volt)] text-[#12081F]",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.16em] [font-family:var(--demo-body)] ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

/** Grain + scanline overlay laid across the whole demo. */
const NOISE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E";

export function Grain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[70] opacity-[0.06] mix-blend-screen"
      style={{ backgroundImage: `url("${NOISE}")` }}
    />
  );
}

/**
 * 3D mouse-tilt wrapper for product cards. Pointer position maps to rotation;
 * children can use translateZ via [transform:translateZ(..)] for depth.
 */
export function TiltCard({
  children,
  className,
  strength = 12,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, active: false });
  const reduce = useReducedMotion() ?? false;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ rx: -py * strength, ry: px * strength, active: true });
  };
  const reset = () => setTilt({ rx: 0, ry: 0, active: false });

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(${
          tilt.active ? 1.02 : 1
        })`,
        transformStyle: "preserve-3d",
        transition: "transform 0.25s cubic-bezier(0.22,1,0.36,1)",
      }}
      className={className}
    >
      {children}
    </div>
  );
}
