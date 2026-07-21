"use client";

import type { SeriesTone } from "./content";

/** Brand mark: a stylized pulse bar inside a rounded plate. */
export function PulseboardMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-[0.55rem] bg-[var(--d-accent)] text-[var(--d-accent-ink)] ${className}`}
      aria-hidden
    >
      <svg viewBox="0 0 24 24" className="h-[62%] w-[62%]" fill="none">
        <path
          d="M2 13h4l2.5-8 4 16 3-11 2 4h4.5"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export const TONE_HEX: Record<SeriesTone, string> = {
  accent: "#FB7185",
  violet: "#A78BFA",
  cyan: "#22D3EE",
  emerald: "#34D399",
};

/** Small class helper without pulling a dependency. */
export function cx(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}
