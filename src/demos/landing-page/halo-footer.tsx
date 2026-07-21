"use client";

import { AtSign, Camera, Globe, MessageCircle, Share2 } from "lucide-react";
import type { FooterContent } from "./content";

const GLYPHS = {
  at: AtSign,
  camera: Camera,
  share: Share2,
  message: MessageCircle,
  globe: Globe,
} as const;

export function HaloFooter({ content }: { content: FooterContent }) {
  return (
    <footer className="border-t border-[var(--d-line)] bg-[var(--d-bg)] px-5 pb-16 pt-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2 [font-family:var(--demo-display)] text-xl font-semibold tracking-tight text-[var(--d-ink)]">
              <span className="grid h-6 w-6 place-items-center rounded-full border-[3px] border-[var(--d-accent)]" aria-hidden>
                <span className="h-1 w-1 rounded-full bg-[var(--d-accent)]" />
              </span>
              HALO
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--d-ink-dim)]">{content.tagline}</p>
            <div className="mt-6">
              <p className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-[var(--d-ink-faint)]">
                {content.socialLabel}
              </p>
              <div className="mt-3 flex gap-2.5">
                {content.socials.map((s) => {
                  const Icon = GLYPHS[s.glyph];
                  return (
                    <button
                      key={s.label}
                      type="button"
                      aria-label={s.label}
                      className="grid h-9 w-9 place-items-center rounded-full border border-[var(--d-line)] text-[var(--d-ink-dim)] transition-colors hover:border-[var(--d-accent)] hover:text-[var(--d-accent)]"
                    >
                      <Icon className="h-4 w-4" strokeWidth={1.8} />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {content.columns.map((col) => (
            <div key={col.title}>
              <p className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-[var(--d-ink-faint)]">
                {col.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <button
                      type="button"
                      className="text-sm text-[var(--d-ink-dim)] transition-colors hover:text-[var(--d-ink)]"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-[var(--d-line)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[var(--d-ink-faint)]">{content.legal}</p>
          <p className="text-xs text-[var(--d-ink-faint)]">{content.region}</p>
        </div>
      </div>
    </footer>
  );
}
