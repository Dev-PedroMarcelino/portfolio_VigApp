"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/** Smooth anchor scrolling; "top" returns to the very top of the demo. */
export function scrollToId(id: string) {
  if (id === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** Meridian logomark: an interlocking meridian ring, pure SVG. */
export function MeridianMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden fill="none">
      <circle cx="16" cy="16" r="13" stroke="var(--d-accent)" strokeOpacity="0.5" strokeWidth="1.4" />
      <ellipse cx="16" cy="16" rx="5.4" ry="13" stroke="var(--d-steel)" strokeWidth="1.4" />
      <line x1="3" y1="16" x2="29" y2="16" stroke="var(--d-accent)" strokeOpacity="0.5" strokeWidth="1.4" />
      <circle cx="16" cy="16" r="2.4" fill="var(--d-steel)" />
    </svg>
  );
}

/** Eyebrow + display title + intro, shared across sections. */
export function SectionHeading({
  label,
  title,
  intro,
  align = "left",
  tone = "dark",
}: {
  label: string;
  title: string;
  intro?: string;
  align?: "center" | "left";
  tone?: "dark" | "light";
}) {
  const alignCls = align === "center" ? "items-center text-center" : "items-start text-left";
  const titleColor = tone === "light" ? "text-[#0F172A]" : "text-[var(--d-ink)]";
  const introColor = tone === "light" ? "text-[#475569]" : "text-[var(--d-ink-soft)]";
  return (
    <div className={`flex max-w-2xl flex-col gap-4 ${alignCls}`}>
      <p className="inline-flex items-center gap-2.5 text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-[var(--d-steel-bright)]">
        <span className="h-px w-8 bg-[var(--d-steel-bright)]" aria-hidden />
        {label}
      </p>
      <h2
        className={`[font-family:var(--demo-display)] text-[1.9rem] font-semibold leading-[1.12] tracking-[-0.02em] sm:text-[2.4rem] ${titleColor}`}
      >
        {title}
      </h2>
      {intro ? <p className={`text-[0.98rem] leading-relaxed ${introColor}`}>{intro}</p> : null}
    </div>
  );
}

/**
 * Fires once when the element scrolls into view. Returns a ref and a boolean.
 * Used to trigger counters and progress bars only when visible.
 */
export function useInView<T extends Element>(margin = "-80px"): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: `0px 0px ${margin} 0px`, threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [margin]);

  return [ref, inView];
}

/** Eased count-up from 0 to `value`, honouring reduced-motion. */
export function useCountUp(value: number, active: boolean, duration = 1400): number {
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (reduce) {
      setDisplay(value);
      return;
    }
    let raf = 0;
    let start = 0;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * eased);
      if (progress < 1) raf = requestAnimationFrame(step);
      else setDisplay(value);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, value, duration, reduce]);

  return display;
}

/** Format a number with fixed decimals and locale-neutral grouping. */
export function formatFigure(n: number, decimals: number): string {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}
