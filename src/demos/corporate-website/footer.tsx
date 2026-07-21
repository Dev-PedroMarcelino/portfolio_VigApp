"use client";

import { AtSign, Globe, MessageCircle } from "lucide-react";
import type { FooterContent } from "./content";
import { MeridianMark, scrollToId } from "./ui";

const SOCIAL_ICONS: Record<string, typeof Globe> = {
  site: Globe,
  press: AtSign,
  contact: MessageCircle,
};

export function MeridianFooter({ content }: { content: FooterContent }) {
  const year = 2026;

  return (
    <footer className="border-t border-[var(--d-line)] bg-[var(--d-surface)]">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <button
              type="button"
              onClick={() => scrollToId("top")}
              className="flex items-center gap-3 text-[var(--d-ink)]"
              aria-label="Meridian Group"
            >
              <MeridianMark className="h-8 w-8" />
              <span className="[font-family:var(--demo-display)] text-[1.2rem] font-semibold tracking-[-0.01em]">
                Meridian Group
              </span>
            </button>
            <p className="mt-5 max-w-sm text-[0.88rem] leading-relaxed text-[var(--d-ink-soft)]">{content.blurb}</p>
            <p className="mt-6 text-[0.78rem] leading-relaxed text-[var(--d-ink-faint)]">{content.address}</p>

            <div className="mt-6">
              <p className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-[var(--d-ink-faint)]">
                {content.socialLabel}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {content.socials.map((social) => {
                  const Icon = SOCIAL_ICONS[social.id] ?? Globe;
                  return (
                    <button
                      key={social.id}
                      type="button"
                      className="inline-flex items-center gap-2 rounded-sm border border-[var(--d-line)] px-3 py-2 text-[0.76rem] font-medium text-[var(--d-ink-soft)] transition-colors hover:border-[var(--d-steel-bright)] hover:text-[var(--d-ink)]"
                    >
                      <Icon className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden />
                      {social.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {content.columns.map((column) => (
              <div key={column.title}>
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[var(--d-ink-faint)]">
                  {column.title}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link}>
                      <button
                        type="button"
                        className="text-left text-[0.85rem] text-[var(--d-ink-soft)] transition-colors hover:text-[var(--d-ink)]"
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

        <div className="mt-14 flex flex-col gap-4 border-t border-[var(--d-line)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.74rem] text-[var(--d-ink-faint)]">
            {"©"} {year} {content.legal}
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {content.legalLinks.map((link) => (
              <button
                key={link}
                type="button"
                className="text-[0.74rem] text-[var(--d-ink-faint)] transition-colors hover:text-[var(--d-ink-soft)]"
              >
                {link}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
