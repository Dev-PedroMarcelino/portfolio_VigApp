"use client";

import { ArrowUpRight } from "lucide-react";
import type { PrumoContent } from "./content";
import { CAU_REGISTER } from "./content";

/** Hairline footer with the fictional-concept disclaimer and asset credits. */
export function PrumoFooter({
  content,
  nav,
}: {
  content: PrumoContent["footer"];
  nav: PrumoContent["header"]["nav"];
}) {
  return (
    <footer className="border-t border-[var(--d-line-strong)]">
      <div className="mx-auto max-w-[88rem] px-5 py-16 sm:px-8">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="[font-family:var(--demo-display)] text-4xl tracking-[0.14em] text-[var(--d-ink)]">
              PRUMO
            </p>
            <p className="mt-3 [font-family:var(--demo-body)] text-[13px] text-[var(--d-ink-soft)]">
              {content.tagline}
            </p>
            <p className="mt-1.5 [font-family:var(--demo-mono)] text-[10px] uppercase tracking-[0.22em] text-[var(--d-ink-faint)]">
              {CAU_REGISTER}
            </p>
          </div>

          <nav aria-label={content.navAria} className="flex flex-wrap gap-x-8 gap-y-3">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="[font-family:var(--demo-body)] text-[11px] uppercase tracking-[0.22em] text-[var(--d-ink-soft)] transition-colors duration-300 hover:text-[var(--d-ink)]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href="#top"
            className="group inline-flex items-center gap-2 self-start [font-family:var(--demo-body)] text-[11px] uppercase tracking-[0.22em] text-[var(--d-ink)] transition-colors duration-300 hover:text-[var(--d-accent)]"
          >
            {content.backToTop}
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={1.5}
            />
          </a>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-[var(--d-line)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="[font-family:var(--demo-body)] text-[12px] text-[var(--d-ink-soft)]">
            {content.fictionalNote}
          </p>
          <p className="[font-family:var(--demo-mono)] text-[10px] tracking-[0.08em] text-[var(--d-ink-faint)]">
            {content.credits}
          </p>
        </div>
      </div>
    </footer>
  );
}
