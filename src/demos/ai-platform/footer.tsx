"use client";

import { AtSign, Globe, MessageCircle, Share2 } from "lucide-react";
import type { FooterContent } from "./content";
import { CortexaMark, scrollToId } from "./ui";

const SOCIAL_ICON = {
  at: AtSign,
  share: Share2,
  globe: Globe,
  message: MessageCircle,
} as const;

export function Footer({ content }: { content: FooterContent }) {
  return (
    <footer className="relative border-t border-[var(--d-line)] bg-[rgba(5,5,10,0.9)] pb-16 pt-16">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <button
              type="button"
              onClick={() => scrollToId("top")}
              className="flex items-center gap-2.5 text-[var(--d-ink)]"
            >
              <CortexaMark />
              <span className="[font-family:var(--demo-display)] text-xl font-semibold tracking-tight">
                Cortexa
              </span>
            </button>
            <p className="mt-4 max-w-xs text-[0.86rem] leading-relaxed text-[var(--d-ink-soft)]">
              {content.tagline}
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--d-line)] bg-[var(--d-panel)] px-3 py-1.5 text-[0.72rem] text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]">
              <span className="h-2 w-2 rounded-full bg-[#34D399] shadow-[0_0_10px_#34D399]" aria-hidden />
              {content.status}
            </div>
            <div className="mt-6 flex items-center gap-2">
              {content.socials.map((s) => {
                const Icon = SOCIAL_ICON[s.icon];
                return (
                  <button
                    key={s.label}
                    type="button"
                    aria-label={s.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--d-line)] text-[var(--d-ink-soft)] transition-colors hover:border-[var(--d-accent)]/50 hover:text-[var(--d-accent-bright)]"
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.8} aria-hidden />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {content.columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[var(--d-ink-faint)] [font-family:var(--demo-mono)]">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <button
                        type="button"
                        className="text-[0.84rem] text-[var(--d-ink-soft)] transition-colors hover:text-[var(--d-ink)]"
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

        <div className="mt-12 border-t border-[var(--d-line)] pt-6">
          <p className="text-[0.74rem] text-[var(--d-ink-faint)]">{content.legal}</p>
        </div>
      </div>
    </footer>
  );
}
