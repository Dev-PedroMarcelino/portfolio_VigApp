"use client";

/* Shared primitives for the Garagem Burger demo — gig-poster aesthetics:
 * halftone grain, masking-tape strips, rubber stamps and mono price tags. */

/** Fractal grain so the near-black asphalt never looks flat. */
const NOISE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E";

export function PosterGrain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] opacity-[0.07] mix-blend-overlay"
      style={{ backgroundImage: `url("${NOISE}")` }}
    />
  );
}

/** Halftone dot field — the print texture of a cheap gig poster. */
export function Halftone({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute ${className ?? "inset-0"}`}
      style={{
        backgroundImage: "radial-gradient(rgba(245,239,230,0.16) 1px, transparent 1.6px)",
        backgroundSize: "14px 14px",
        maskImage: "radial-gradient(90% 90% at 50% 40%, black 20%, transparent 75%)",
        WebkitMaskImage: "radial-gradient(90% 90% at 50% 40%, black 20%, transparent 75%)",
      }}
    />
  );
}

/** A strip of masking tape holding a polaroid/card to the wall. */
export function Tape({
  className,
  rotate = -4,
}: {
  className?: string;
  rotate?: number;
}) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute z-20 block h-7 w-24 ${className ?? ""}`}
      style={{
        transform: `rotate(${rotate}deg)`,
        background:
          "linear-gradient(105deg, rgba(242,183,5,0.85), rgba(242,183,5,0.68) 45%, rgba(242,183,5,0.82))",
        boxShadow: "0 1px 4px rgba(0,0,0,0.35)",
        clipPath:
          "polygon(2% 12%, 98% 0%, 100% 82%, 96% 100%, 3% 92%, 0% 30%)",
        opacity: 0.9,
      }}
    />
  );
}

/** Rubber-stamp label — rotated, bordered, uppercase. */
export function Stamp({
  children,
  color = "var(--d-red)",
  rotate = -3,
  className,
}: {
  children: React.ReactNode;
  color?: string;
  rotate?: number;
  className?: string;
}) {
  return (
    <span
      className={`inline-block border-2 px-2 py-0.5 text-[0.62rem] font-bold uppercase tracking-[0.22em] [font-family:var(--demo-mono)] ${className ?? ""}`}
      style={{ color, borderColor: color, transform: `rotate(${rotate}deg)` }}
    >
      {children}
    </span>
  );
}

/** Section eyebrow: bolt tick + mono uppercase label, gig-flyer style. */
export function SectionLabel({ text }: { text: string }) {
  return (
    <p className="flex items-center gap-3 text-[0.68rem] font-bold uppercase tracking-[0.34em] text-[var(--d-yellow)] [font-family:var(--demo-mono)]">
      <span aria-hidden className="inline-flex items-center gap-1.5">
        <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden>
          <path d="M7.2 0 1 8h3.4L4 14l7-8.6H7.6L7.2 0Z" fill="var(--d-red)" />
        </svg>
        <span className="h-px w-8 bg-gradient-to-r from-[var(--d-red)] to-transparent" />
      </span>
      {text}
    </p>
  );
}

/** Smooth anchor scrolling used by the header, hero and CTAs. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** Prices are ALWAYS in reais, in every locale: "R$ 34" / "R$ 9". */
export function fmtBRL(value: number): string {
  return `R$ ${new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 }).format(value)}`;
}

/** Shared focus ring for interactive elements on the asphalt surface. */
export const FOCUS_RING =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-yellow)]";
