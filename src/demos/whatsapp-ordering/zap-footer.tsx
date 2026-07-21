"use client";

import { MessageCircle, Share2, Globe, Mail } from "lucide-react";
import type { FooterContent } from "./content";
import { scrollToId } from "./ui";

const SOCIAL_ICON = { channel: Share2, site: Globe, mail: Mail } as const;

export function ZapFooter({ content }: { content: FooterContent }) {
  return (
    <footer className="border-t border-[var(--d-line)] bg-[var(--d-footer)] px-5 pb-14 pt-16 text-[var(--d-ink)]">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[var(--d-accent)] text-[#052014]">
                <MessageCircle className="h-5 w-5" strokeWidth={2.4} aria-hidden />
              </span>
              <span className="[font-family:var(--demo-display)] text-xl font-extrabold tracking-tight">
                Zap<span className="text-[var(--d-accent)]">Pedido</span>
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[var(--d-ink-soft)]">{content.tagline}</p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <nav aria-label={content.navLabel}>
              <h3 className="text-[0.62rem] font-bold uppercase tracking-[0.24em] text-[var(--d-ink-soft)]">
                {content.navLabel}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {content.nav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToId(item.href.slice(1));
                      }}
                      className="text-sm text-[var(--d-ink)] transition-colors hover:text-[var(--d-accent)]"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h3 className="text-[0.62rem] font-bold uppercase tracking-[0.24em] text-[var(--d-ink-soft)]">
                {content.contactLabel}
              </h3>
              <p className="mt-4 text-sm text-[var(--d-ink-soft)]">{content.hours}</p>
            </div>

            <div>
              <h3 className="text-[0.62rem] font-bold uppercase tracking-[0.24em] text-[var(--d-ink-soft)]">
                {content.socialLabel}
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {content.social.map((s) => {
                  const Icon = SOCIAL_ICON[s.id];
                  return (
                    <li key={s.id}>
                      <a
                        href={s.href}
                        className="flex items-center gap-2 text-[var(--d-ink)] transition-colors hover:text-[var(--d-accent)]"
                      >
                        <Icon className="h-3.5 w-3.5" strokeWidth={1.9} aria-hidden />
                        {s.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-[var(--d-line)] pt-7 text-xs text-[var(--d-ink-soft)] sm:flex-row sm:items-center sm:justify-between">
          <p>{content.fine}</p>
          <p>{content.credit}</p>
        </div>
      </div>
    </footer>
  );
}
