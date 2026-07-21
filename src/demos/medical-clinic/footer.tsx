"use client";

import { AtSign, Globe, HeartPulse, MessageCircle } from "lucide-react";
import type { FooterContent } from "./content";

const SOCIAL_ICONS = {
  site: Globe,
  mail: AtSign,
  chat: MessageCircle,
} as const;

export function AuroraFooter({ content }: { content: FooterContent }) {
  return (
    <footer className="bg-[var(--d-teal-ink)] px-5 pb-24 pt-16 text-[var(--d-foam)]">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr] md:gap-8">
          <div>
            <p className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--d-accent)] text-[var(--d-foam)]">
                <HeartPulse className="h-[18px] w-[18px]" strokeWidth={2} aria-hidden />
              </span>
              <span className="text-lg font-bold tracking-tight">
                Aurora{" "}
                <em className="[font-family:var(--demo-display)] font-medium italic text-[var(--d-glow)]">
                  Health
                </em>
              </span>
            </p>
            <p className="mt-5 max-w-xs text-sm leading-[1.8] text-[var(--d-foam-dim)]">
              {content.blurb}
            </p>
            <p className="mt-6 text-[0.66rem] font-bold uppercase tracking-[0.22em] text-[var(--d-foam-dim)]">
              {content.socialLabel}
            </p>
            <div className="mt-3 flex gap-2.5">
              {content.social.map((item) => {
                const Icon = SOCIAL_ICONS[item.id];
                return (
                  <a
                    key={item.id}
                    href="#top"
                    aria-label={item.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--d-foam)]/20 text-[var(--d-foam)] transition-colors hover:border-[var(--d-glow)] hover:text-[var(--d-glow)]"
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.9} aria-hidden />
                  </a>
                );
              })}
            </div>
          </div>

          {content.columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <p className="text-[0.66rem] font-bold uppercase tracking-[0.22em] text-[var(--d-glow)]">
                {column.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-[var(--d-foam-dim)] transition-colors hover:text-[var(--d-foam)]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 space-y-2 border-t border-[var(--d-foam)]/10 pt-7 text-[0.7rem] leading-relaxed text-[var(--d-foam-dim)]">
          <p>{content.director}</p>
          <p>{content.legalNote}</p>
          <p>{content.rights}</p>
        </div>
      </div>
    </footer>
  );
}
