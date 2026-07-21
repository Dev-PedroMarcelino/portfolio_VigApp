"use client";

import { Activity } from "lucide-react";
import type { FooterContent, NavContent } from "./content";

export function Footer({
  footer,
  nav,
}: {
  footer: FooterContent;
  nav: NavContent;
}) {
  return (
    <footer className="border-t border-[var(--d-line)] bg-[var(--d-bg)] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.4fr_2fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--d-accent)] text-[var(--d-accent-ink)]">
              <Activity className="h-[18px] w-[18px]" strokeWidth={2.4} aria-hidden />
            </span>
            <span className="text-[15px] font-semibold tracking-tight text-[var(--d-ink)] [font-family:var(--demo-display)]">
              Insightgrid
            </span>
          </div>
          <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-[var(--d-ink-soft)]">
            {footer.blurb}
          </p>
          <div className="mt-5 flex items-center gap-2">
            {footer.socials.map((s) => (
              <button
                key={s.label}
                type="button"
                aria-label={s.label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--d-line)] text-[13px] font-semibold text-[var(--d-ink-soft)] transition-colors hover:border-[var(--d-line-strong)] hover:text-[var(--d-ink)] [font-family:var(--demo-mono)]"
              >
                {s.glyph}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {footer.columns.map((col) => (
            <div key={col.title}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--d-ink-faint)] [font-family:var(--demo-mono)]">
                {col.title}
              </p>
              <ul className="mt-3 flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#overview"
                      className="text-[13px] text-[var(--d-ink-soft)] transition-colors hover:text-[var(--d-ink)]"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col items-start justify-between gap-2 border-t border-[var(--d-line)] pt-6 sm:flex-row sm:items-center">
        <p className="text-[12px] text-[var(--d-ink-faint)] [font-family:var(--demo-mono)]">
          {footer.legal}
        </p>
        <div className="flex items-center gap-4">
          {nav.links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="text-[12px] text-[var(--d-ink-soft)] transition-colors hover:text-[var(--d-ink)]"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
