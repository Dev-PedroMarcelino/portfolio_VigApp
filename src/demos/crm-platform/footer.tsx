"use client";

import { AtSign, Globe, MessageCircle, Share2 } from "lucide-react";
import type { FooterContent, SocialId } from "./content";
import { RelatyMark, scrollToId } from "./ui";

const SOCIAL_ICONS: Record<SocialId, typeof Globe> = {
  site: Globe,
  at: AtSign,
  chat: MessageCircle,
  share: Share2,
};

export function Footer({ content }: { content: FooterContent }) {
  return (
    <footer className="border-t border-[var(--d-line)] bg-[var(--d-surface)] px-5 pb-28 pt-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          <div className="max-w-xs">
            <button
              type="button"
              onClick={() => scrollToId("top")}
              className="flex items-center gap-2.5 text-[var(--d-ink)]"
            >
              <RelatyMark className="h-6 w-6" />
              <span className="[font-family:var(--demo-display)] text-lg font-semibold tracking-tight">Relaty</span>
            </button>
            <p className="mt-4 text-[0.82rem] leading-relaxed text-[var(--d-ink-soft)]">{content.blurb}</p>
            <div className="mt-5 flex items-center gap-2">
              {content.socials.map((social) => {
                const Icon = SOCIAL_ICONS[social.id];
                return (
                  <button
                    key={social.id}
                    type="button"
                    onClick={() => scrollToId("top")}
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--d-line)] text-[var(--d-ink-soft)] transition-colors hover:border-[var(--d-accent)]/50 hover:text-[var(--d-accent)]"
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.8} aria-hidden />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3">
            {content.columns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h3 className="text-[0.64rem] font-bold uppercase tracking-[0.2em] text-[var(--d-ink-faint)]">
                  {column.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToId(link.href.slice(1));
                        }}
                        className="text-[0.8rem] text-[var(--d-ink-soft)] transition-colors hover:text-[var(--d-ink)]"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-[var(--d-line)] pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.7rem] text-[var(--d-ink-faint)]">{content.copyright}</p>
          <p className="flex items-center gap-2 text-[0.7rem] font-medium text-[var(--d-ink-soft)]">
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#10B981] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#10B981]" />
            </span>
            {content.statusLabel}
          </p>
        </div>
      </div>
    </footer>
  );
}
