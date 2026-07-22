"use client";

/* Shared primitives for the IARA demo — deep-water surfaces, caustic light,
   wave dividers and the mono section label. All vector/CSS, no WebGL. */

/** Faint fractal grain so the deep-water gradients never band. */
const NOISE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E";

export function Grain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[1] opacity-[0.05] mix-blend-overlay"
      style={{ backgroundImage: `url("${NOISE}")` }}
    />
  );
}

/**
 * Caustic light — two ultra-slow drifting radial glows, like sunlight refracted
 * through water. Pure CSS; the keyframes live in <IaraStyles/> and are disabled
 * under prefers-reduced-motion.
 */
export function Caustics() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div
        className="iara-caustic absolute -top-[20%] left-[10%] h-[70vmax] w-[70vmax] rounded-full opacity-[0.16]"
        style={{
          background:
            "radial-gradient(circle at 40% 40%, rgba(45,212,191,0.5), rgba(34,211,238,0.18) 45%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="iara-caustic-b absolute -bottom-[30%] right-[-10%] h-[60vmax] w-[60vmax] rounded-full opacity-[0.1]"
        style={{
          background:
            "radial-gradient(circle at 60% 60%, rgba(34,211,238,0.45), rgba(45,212,191,0.15) 50%, transparent 72%)",
          filter: "blur(70px)",
        }}
      />
    </div>
  );
}

/**
 * Wave divider between sections. `flip` mirrors it vertically; `from`/`to`
 * default to the two surface tones of the palette.
 */
export function WaveDivider({
  flip = false,
  fill = "var(--d-surface)",
  className = "",
}: {
  flip?: boolean;
  fill?: string;
  className?: string;
}) {
  return (
    <div aria-hidden className={`relative -my-px w-full overflow-hidden leading-[0] ${className}`}>
      <svg
        viewBox="0 0 1440 72"
        preserveAspectRatio="none"
        className={`block h-10 w-full sm:h-[72px] ${flip ? "rotate-180" : ""}`}
      >
        <path
          d="M0,40 C180,72 340,8 540,26 C740,44 860,70 1080,52 C1260,38 1360,18 1440,30 L1440,72 L0,72 Z"
          fill={fill}
        />
        <path
          d="M0,52 C220,80 420,24 640,40 C860,56 1020,76 1240,58 C1330,51 1400,42 1440,46 L1440,72 L0,72 Z"
          fill={fill}
          opacity="0.5"
        />
      </svg>
    </div>
  );
}

/** Mono eyebrow with a tilde-wave tick — used above every section title. */
export function SectionLabel({ text, id }: { text: string; id?: string }) {
  return (
    <p
      id={id}
      className="flex items-center gap-3 text-[0.66rem] font-medium uppercase tracking-[0.34em] text-[var(--d-teal)] [font-family:var(--demo-mono)]"
    >
      <svg width="26" height="8" viewBox="0 0 26 8" aria-hidden className="shrink-0">
        <path
          d="M1 4 C4 1, 7 1, 10 4 S16 7, 19 4 S24 2, 25 3"
          fill="none"
          stroke="var(--d-teal)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
      {text}
    </p>
  );
}

/** Smooth anchor scrolling for header links and in-page CTAs. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** BRL formatter — prices are in reais in every locale. */
export function fmtBRL(value: number, localeTag: string, digits = 0): string {
  return new Intl.NumberFormat(localeTag, {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

/** Plain number, locale-aware ("1.234" pt / "1,234" en). */
export function fmtNum(value: number, localeTag: string): string {
  return new Intl.NumberFormat(localeTag, { maximumFractionDigits: 2 }).format(value);
}

/**
 * Demo-scoped keyframes and controls that Tailwind utilities can't express:
 * caustic drift, accordion slide, blinking cursor and the volume slider.
 * Everything is guarded for prefers-reduced-motion.
 */
export function IaraStyles() {
  return (
    <style>{`
      @keyframes iara-drift {
        0% { transform: translate3d(0,0,0) scale(1); }
        50% { transform: translate3d(6%, 4%, 0) scale(1.08); }
        100% { transform: translate3d(-4%, -3%, 0) scale(0.98); }
      }
      @keyframes iara-drift-b {
        0% { transform: translate3d(0,0,0) scale(1); }
        50% { transform: translate3d(-5%, -6%, 0) scale(1.06); }
        100% { transform: translate3d(3%, 5%, 0) scale(1); }
      }
      .iara-caustic { animation: iara-drift 26s ease-in-out infinite alternate; }
      .iara-caustic-b { animation: iara-drift-b 32s ease-in-out infinite alternate; }

      @keyframes iara-cursor { 0%, 55% { opacity: 1; } 56%, 100% { opacity: 0; } }
      .iara-cursor { animation: iara-cursor 0.9s steps(1) infinite; }

      @keyframes iara-acc-down {
        from { height: 0; opacity: 0; }
        to { height: var(--radix-accordion-content-height); opacity: 1; }
      }
      @keyframes iara-acc-up {
        from { height: var(--radix-accordion-content-height); opacity: 1; }
        to { height: 0; opacity: 0; }
      }
      .iara-acc-content[data-state="open"] { animation: iara-acc-down 320ms cubic-bezier(0.22,1,0.36,1); }
      .iara-acc-content[data-state="closed"] { animation: iara-acc-up 240ms cubic-bezier(0.22,1,0.36,1); }
      .iara-acc-content { overflow: hidden; }

      .iara-range {
        -webkit-appearance: none;
        appearance: none;
        width: 100%;
        height: 6px;
        border-radius: 999px;
        background: linear-gradient(to right, var(--d-teal) 0%, var(--d-teal) var(--fill, 30%), var(--d-line) var(--fill, 30%), var(--d-line) 100%);
        outline: none;
      }
      .iara-range::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 22px;
        height: 22px;
        border-radius: 999px;
        background: var(--d-ink);
        border: 3px solid var(--d-teal);
        box-shadow: 0 0 0 6px rgba(45,212,191,0.15), 0 4px 14px rgba(0,0,0,0.5);
        cursor: pointer;
        transition: transform 120ms ease;
      }
      .iara-range::-webkit-slider-thumb:hover { transform: scale(1.1); }
      .iara-range::-moz-range-thumb {
        width: 22px;
        height: 22px;
        border-radius: 999px;
        background: var(--d-ink);
        border: 3px solid var(--d-teal);
        box-shadow: 0 0 0 6px rgba(45,212,191,0.15), 0 4px 14px rgba(0,0,0,0.5);
        cursor: pointer;
      }
      .iara-range:focus-visible {
        box-shadow: 0 0 0 3px rgba(34,211,238,0.4);
      }

      #iara-root :focus-visible {
        outline: 2px solid var(--d-cyan);
        outline-offset: 2px;
        border-radius: 4px;
      }

      @media (prefers-reduced-motion: reduce) {
        .iara-caustic, .iara-caustic-b, .iara-cursor { animation: none; }
        .iara-acc-content[data-state="open"], .iara-acc-content[data-state="closed"] { animation: none; }
      }
    `}</style>
  );
}
