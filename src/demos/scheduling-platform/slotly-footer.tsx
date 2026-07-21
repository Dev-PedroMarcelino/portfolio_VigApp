"use client";

import { Activity, CalendarCheck2, FileText, Globe, Mail } from "lucide-react";
import type { FooterContent } from "./content";
import { scrollToId } from "./ui";

const CHANNEL_ICONS = {
  docs: FileText,
  community: Globe,
  status: Activity,
} as const;

export function SlotlyFooter({ content }: { content: FooterContent }) {
  return (
    <footer className="bg-[var(--d-dark)] px-5 pb-24 pt-20 text-[#E6FFFA]">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--d-accent)] text-white">
                <CalendarCheck2 className="h-[18px] w-[18px]" strokeWidth={2.2} aria-hidden />
              </span>
              <span className="[font-family:var(--demo-display)] text-2xl font-bold tracking-tight">
                Slotly<span className="text-[#5EEAD4]">.</span>
              </span>
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[var(--d-mint-dim)]">
              {content.tagline}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <nav aria-label={content.exploreLabel}>
              <h3 className="text-[0.62rem] font-bold uppercase tracking-[0.26em] text-[var(--d-mint-dim)]">
                {content.exploreLabel}
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
                      className="text-sm text-[#E6FFFA] transition-colors hover:text-[#5EEAD4]"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h3 className="text-[0.62rem] font-bold uppercase tracking-[0.26em] text-[var(--d-mint-dim)]">
                {content.contactLabel}
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {content.contactLines.map((line) => (
                  <li key={line} className="text-[var(--d-mint-dim)]">
                    {line}
                  </li>
                ))}
                <li>
                  <a
                    href={`mailto:${content.email}`}
                    className="flex items-center gap-2 text-[#E6FFFA] transition-colors hover:text-[#5EEAD4]"
                  >
                    <Mail className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
                    {content.email}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-[0.62rem] font-bold uppercase tracking-[0.26em] text-[var(--d-mint-dim)]">
                {content.followLabel}
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {content.channels.map((channel) => {
                  const Icon = CHANNEL_ICONS[channel.id];
                  return (
                    <li key={channel.id} className="flex items-center gap-2 text-[var(--d-mint-dim)]">
                      <Icon className="h-3.5 w-3.5 text-[#5EEAD4]" strokeWidth={2} aria-hidden />
                      {channel.label}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-[var(--d-dark-line)] pt-7 text-xs text-[var(--d-mint-dim)] sm:flex-row sm:items-center sm:justify-between">
          <p>{content.legal}</p>
          <p>{content.fictional}</p>
        </div>
      </div>
    </footer>
  );
}
