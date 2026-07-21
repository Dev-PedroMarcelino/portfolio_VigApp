"use client";

import { AtSign, Camera, MapPin, MessageCircle } from "lucide-react";
import type { AltureContent } from "./content";

const ICONS: Record<string, typeof AtSign> = {
  at: AtSign,
  camera: Camera,
  message: MessageCircle,
};

export function BrandFooter({ content }: { content: AltureContent["footer"] }) {
  return (
    <footer className="border-t border-[var(--d-line-soft)] bg-[var(--d-bg-deep)] pt-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 pb-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <span className="[font-family:var(--demo-display)] text-2xl font-semibold tracking-[0.16em] text-[var(--d-ivory)]">
              ALTURE
            </span>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-[var(--d-ink-soft)]">
              {content.tagline}
            </p>
            <div className="mt-6">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--d-ink-faint)]">
                {content.socialLabel}
              </p>
              <div className="mt-3 flex gap-3">
                {content.socials.map((social) => {
                  const Icon = ICONS[social.icon] ?? AtSign;
                  return (
                    <a
                      key={social.label}
                      href="#top"
                      aria-label={social.label}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--d-line)] text-[var(--d-gold)] transition-colors duration-300 hover:bg-[var(--d-gold)] hover:text-[#0B1B2E]"
                    >
                      <Icon className="h-4 w-4" strokeWidth={1.6} aria-hidden />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {content.columns.map((column) => (
            <div key={column.title}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--d-gold)]">
                {column.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#listings"
                      className="text-sm text-[var(--d-ink-soft)] transition-colors duration-300 hover:text-[var(--d-gold-bright)]"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="grid gap-6 border-t border-[var(--d-line-soft)] py-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--d-ink-faint)]">
              {content.contactTitle}
            </p>
            <p className="mt-2 flex items-start gap-2 text-sm text-[var(--d-ink-soft)]">
              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--d-gold)]" strokeWidth={1.6} aria-hidden />
              {content.address}
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--d-ink-faint)]">
              {content.hours}
            </p>
          </div>
          <p className="text-sm text-[var(--d-ink-soft)]">{content.phone}</p>
          <p className="text-sm text-[var(--d-ink-soft)]">{content.email}</p>
        </div>

        <div className="flex flex-col gap-2 border-t border-[var(--d-line-soft)] py-7 text-[11px] tracking-[0.06em] text-[var(--d-ink-faint)] sm:flex-row sm:items-center sm:justify-between">
          <p>{content.legal}</p>
          <p>{content.credits}</p>
        </div>
      </div>
    </footer>
  );
}
