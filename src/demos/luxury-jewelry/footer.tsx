"use client";

import { AtSign, Globe, Send } from "lucide-react";
import type { AureliaContent } from "./content";

const SOCIAL_ICONS = [Globe, AtSign, Send];

export function BrandFooter({ content }: { content: AureliaContent["footer"] }) {
  return (
    <footer className="relative overflow-hidden border-t border-[var(--d-line)] bg-[var(--d-bg)] pt-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-12 pb-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="[font-family:var(--demo-display)] text-3xl font-light tracking-[0.14em] text-[var(--d-ink)]">
              Aurelia
            </p>
            <p className="mt-6 max-w-xs text-sm font-light leading-relaxed text-[var(--d-ink-soft)]">
              {content.blurb}
            </p>
          </div>

          <nav aria-label={content.maisonLabel}>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--d-gold)]">
              {content.maisonLabel}
            </p>
            <ul className="mt-5 space-y-3">
              {content.maisonLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#top"
                    className="text-sm font-light text-[var(--d-ink-soft)] transition-colors duration-300 hover:text-[var(--d-ink)]"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={content.clientLabel}>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--d-gold)]">
              {content.clientLabel}
            </p>
            <ul className="mt-5 space-y-3">
              {content.clientLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#appointment"
                    className="text-sm font-light text-[var(--d-ink-soft)] transition-colors duration-300 hover:text-[var(--d-ink)]"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--d-gold)]">
              {content.contactLabel}
            </p>
            <a
              href={`tel:${content.phone.replace(/\s+/g, "")}`}
              className="mt-5 block text-sm font-light text-[var(--d-ink-soft)] transition-colors duration-300 hover:text-[var(--d-ink)]"
            >
              {content.phone}
            </a>
            <a
              href={`mailto:${content.email}`}
              className="mt-2 block text-sm font-light text-[var(--d-ink-soft)] transition-colors duration-300 hover:text-[var(--d-ink)]"
            >
              {content.email}
            </a>

            <p className="mt-7 text-[10px] uppercase tracking-[0.3em] text-[var(--d-gold)]">
              {content.followLabel}
            </p>
            <div className="mt-4 flex items-center gap-3">
              {content.socials.map((label, index) => {
                const Icon = SOCIAL_ICONS[index % SOCIAL_ICONS.length];
                return (
                  <a
                    key={label}
                    href="#top"
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--d-line-soft)] text-[var(--d-ink-soft)] transition-colors duration-300 hover:border-[var(--d-gold)] hover:text-[var(--d-gold-bright)]"
                  >
                    <Icon aria-hidden className="h-4 w-4" strokeWidth={1.4} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-[var(--d-line-soft)] py-8 sm:flex-row">
          <p className="text-[11px] font-light tracking-wide text-[var(--d-ink-faint)]">
            {content.fineprint}
          </p>
          <p className="text-[9px] uppercase tracking-[0.4em] text-[var(--d-ink-faint)]">
            Place Vendôme · Paris
          </p>
        </div>
      </div>
    </footer>
  );
}
