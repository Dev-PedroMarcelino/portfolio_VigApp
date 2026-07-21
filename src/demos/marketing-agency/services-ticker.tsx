"use client";

import { useState } from "react";
import { Asterisk } from "lucide-react";
import type { ServicesContent } from "./content";

/**
 * Two stacked marquee rows running in opposite directions. Both pause together
 * while the pointer is held over the band (real state, not just CSS :hover), so
 * the whole strip freezes and the visitor can read a single service.
 */
export function ServicesTicker({ content }: { content: ServicesContent }) {
  const [paused, setPaused] = useState(false);
  const pauseClass = paused ? "lh-paused" : "";

  const Row = ({ reverse }: { reverse: boolean }) => (
    <div className="flex overflow-hidden">
      <div
        className={`flex shrink-0 items-center ${reverse ? "lh-track-rev" : "lh-track"} ${pauseClass}`}
        aria-hidden={reverse}
      >
        {[0, 1].map((dup) => (
          <ul key={dup} className="flex shrink-0 items-center">
            {content.items.map((item) => (
              <li key={`${dup}-${item}`} className="flex shrink-0 items-center">
                <span className="[font-family:var(--demo-display)] whitespace-nowrap px-6 text-4xl uppercase tracking-tight text-[var(--d-accent-ink)] md:px-9 md:text-6xl">
                  {item}
                </span>
                <Asterisk className="h-6 w-6 shrink-0 text-[var(--d-accent)] md:h-8 md:w-8" strokeWidth={2.5} aria-hidden />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );

  return (
    <section
      id="services"
      className="border-b-2 border-[var(--d-ink)] bg-[var(--d-ink)] py-6 scroll-mt-16 md:py-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="mx-auto mb-4 flex max-w-[1400px] items-center justify-between px-5 md:px-8">
        <span className="[font-family:var(--demo-body)] text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[var(--d-accent-ink)]/70">
          {content.label}
        </span>
        <span className="[font-family:var(--demo-body)] text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[var(--d-accent)]">
          {content.note}
        </span>
      </div>
      <div className="flex flex-col gap-2 md:gap-3">
        <Row reverse={false} />
        <Row reverse />
      </div>
    </section>
  );
}
