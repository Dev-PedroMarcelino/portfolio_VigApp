"use client";

import { AtSign, Camera, MessageCircle, Apple, Smartphone, Utensils } from "lucide-react";
import type { PratoContent } from "./content";

const SOCIAL_ICONS: Record<string, typeof AtSign> = {
  at: AtSign,
  camera: Camera,
  message: MessageCircle,
};

export function Footer({ content }: { content: PratoContent["footer"] }) {
  return (
    <footer className="bg-[var(--d-ink)] text-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <a href="#top" className="inline-flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--d-accent)] text-white">
                <Utensils className="h-4.5 w-4.5" strokeWidth={2.4} aria-hidden />
              </span>
              <span className="[font-family:var(--demo-display)] text-2xl font-bold tracking-tight">
                Prato
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              {content.tagline}
            </p>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-bold">{content.appTitle}</p>
              <p className="mt-1 text-xs text-white/55">{content.appNote}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-xs font-bold text-[var(--d-ink)]">
                  <Apple className="h-4 w-4" aria-hidden />
                  {content.appIos}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-xs font-bold text-[var(--d-ink)]">
                  <Smartphone className="h-4 w-4" aria-hidden />
                  {content.appAndroid}
                </span>
              </div>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {content.columns.map((column) => (
              <div key={column.title}>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--d-lime)]">
                  {column.title}
                </p>
                <ul className="mt-3 space-y-2">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#top"
                        className="text-sm text-white/65 transition-colors hover:text-white"
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

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-white/45">{content.legal}</p>
          <div className="flex items-center gap-3">
            <nav aria-label={content.socialAria} className="flex items-center gap-2">
              {content.social.map((item) => {
                const Icon = SOCIAL_ICONS[item.icon] ?? AtSign;
                return (
                  <a
                    key={item.label}
                    href="#top"
                    aria-label={item.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-[var(--d-lime)] hover:text-[var(--d-lime)]"
                  >
                    <Icon className="h-4 w-4" aria-hidden />
                  </a>
                );
              })}
            </nav>
            <span className="text-xs font-semibold text-white/45">{content.madeWith}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
