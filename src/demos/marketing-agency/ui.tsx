"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

/**
 * Shared brutalist primitives for the LOUD/HAUS demo. Jet-black 2px borders,
 * hard offset shadows (no blur) and a couple of injected keyframes for the
 * marquee and the hero glitch — all scoped with an `lh-` prefix so they never
 * collide with sibling demos.
 */

export function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** One-time keyframe/utility injection for marquee + glitch effects. */
export function LoudStyles() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
@keyframes lh-marquee { from { transform: translate3d(0,0,0); } to { transform: translate3d(-50%,0,0); } }
@keyframes lh-marquee-rev { from { transform: translate3d(-50%,0,0); } to { transform: translate3d(0,0,0); } }
.lh-track { animation: lh-marquee 32s linear infinite; }
.lh-track-rev { animation: lh-marquee-rev 26s linear infinite; }
.lh-paused { animation-play-state: paused !important; }
@keyframes lh-glitch-a { 0%,100% { clip-path: inset(0 0 0 0); transform: translate(0,0); } 20% { clip-path: inset(0 0 62% 0); transform: translate(-3px,-1px); } 40% { clip-path: inset(48% 0 8% 0); transform: translate(3px,1px); } 60% { clip-path: inset(15% 0 55% 0); transform: translate(-2px,1px); } 80% { clip-path: inset(70% 0 4% 0); transform: translate(2px,-1px); } }
@keyframes lh-glitch-b { 0%,100% { clip-path: inset(0 0 0 0); transform: translate(0,0); } 25% { clip-path: inset(58% 0 12% 0); transform: translate(3px,1px); } 50% { clip-path: inset(8% 0 66% 0); transform: translate(-3px,-1px); } 75% { clip-path: inset(40% 0 30% 0); transform: translate(2px,2px); } }
.lh-glitch { position: relative; }
.lh-glitch::before, .lh-glitch::after { content: attr(data-text); position: absolute; inset: 0; pointer-events: none; opacity: 0; }
.lh-glitch:hover::before { opacity: 1; color: #FF4D00; animation: lh-glitch-a 0.5s steps(2) infinite; }
.lh-glitch:hover::after { opacity: 1; color: #12B0C8; animation: lh-glitch-b 0.5s steps(2) infinite; }
@media (prefers-reduced-motion: reduce) {
  .lh-track, .lh-track-rev { animation: none !important; }
  .lh-glitch:hover::before, .lh-glitch:hover::after { animation: none !important; opacity: 0; }
}
`,
      }}
    />
  );
}

/** Boxed section tag: black outline pill with the accent square. */
export function LoudTag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 border-2 border-[var(--d-ink)] bg-[var(--d-bg)] px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[var(--d-ink)]">
      <span className="h-2.5 w-2.5 bg-[var(--d-accent)]" aria-hidden />
      {children}
    </span>
  );
}

type LoudButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "solid" | "outline";
};

/**
 * The signature loud button: hard 6px offset shadow that collapses on hover as
 * the button presses into it, plus a tiny skew for cursor-chaos energy.
 */
export function LoudButton({ variant = "solid", className = "", children, ...rest }: LoudButtonProps) {
  const base =
    "group/lb relative inline-flex items-center justify-center gap-2 border-2 border-[var(--d-ink)] px-6 py-3.5 text-sm font-bold uppercase tracking-[0.12em] transition-all duration-150 will-change-transform " +
    "shadow-[6px_6px_0_0_var(--d-ink)] hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-[9px_9px_0_0_var(--d-ink)] hover:-skew-x-2 " +
    "active:translate-x-[3px] active:translate-y-[3px] active:shadow-[0px_0px_0_0_var(--d-ink)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--d-accent)]/40";
  const skin =
    variant === "solid"
      ? "bg-[var(--d-accent)] text-[var(--d-accent-ink)]"
      : "bg-[var(--d-bg)] text-[var(--d-ink)]";
  return (
    <button className={`${base} ${skin} ${className}`} {...rest}>
      {children}
    </button>
  );
}
