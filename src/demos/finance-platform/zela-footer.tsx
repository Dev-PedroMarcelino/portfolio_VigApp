"use client";

import { Sprout } from "lucide-react";
import type { ZelaContent } from "./content";
import { Wordmark } from "./zela-header";

export function ZelaFooter({ content }: { content: ZelaContent["footer"] }) {
  return (
    <footer className="border-t border-[var(--d-line)] bg-[var(--d-surface)]">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-10 md:grid-cols-[1.2fr_2fr]">
          <div>
            <Wordmark className="text-[1.7rem] text-[var(--d-ink)]" />
            <p className="mt-3 max-w-xs text-[0.85rem] italic leading-relaxed text-[var(--d-ink-soft)] [font-family:var(--demo-display)]">
              {content.tagline}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {content.columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-[0.66rem] font-medium uppercase tracking-[0.22em] text-[var(--d-green)] [font-family:var(--demo-mono)]">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <button
                        type="button"
                        className="text-[0.82rem] text-[var(--d-ink-soft)] transition-colors hover:text-[var(--d-ink)]"
                      >
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-[var(--d-line)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.72rem] leading-relaxed text-[var(--d-ink-soft)]">
            {content.disclaimer}
          </p>
          <p className="flex shrink-0 items-center gap-1.5 text-[0.72rem] text-[var(--d-ink-soft)]">
            <Sprout className="h-3.5 w-3.5 text-[var(--d-green)]" strokeWidth={1.8} aria-hidden />
            {content.made}
          </p>
        </div>
      </div>
    </footer>
  );
}
