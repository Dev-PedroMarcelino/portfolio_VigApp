"use client";

import { AtSign, Globe } from "lucide-react";
import type { AtelierContent } from "./content";

const SOCIAL_ICONS = [AtSign, Globe];

export function BrandFooter({ content }: { content: AtelierContent["footer"] }) {
  return (
    <footer
      className="relative px-5 pb-16 pt-16 sm:px-8"
      style={{ backgroundColor: "var(--d-ink)", color: "var(--d-bg)" }}
    >
      <div className="mx-auto max-w-[92rem]">
        <div className="border-t border-[var(--d-bg-faint)] pt-12">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
            <div>
              <p className="[font-family:var(--demo-display)] text-[clamp(1.6rem,3vw,2.4rem)] font-medium tracking-[-0.02em]">
                Atelier <span className="italic [font-family:var(--demo-body)] font-normal">Meridian</span>
              </p>
              <p className="mt-4 max-w-xs italic [font-family:var(--demo-body)] text-[1.05rem] text-[var(--d-bg-dim)]">
                {content.tagline}
              </p>
            </div>

            <nav aria-label={content.columnsLabel}>
              <p className="[font-family:var(--demo-display)] text-[10px] uppercase tracking-[0.3em] text-[var(--d-bg-faint)]">
                {content.columnsLabel}
              </p>
              <ul className="mt-4 space-y-2">
                {content.nav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="[font-family:var(--demo-body)] text-[1.05rem] text-[var(--d-bg-dim)] transition-colors hover:text-[var(--d-bg)]"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="[font-family:var(--demo-display)] text-[10px] uppercase tracking-[0.3em] text-[var(--d-bg-faint)]">
                {content.socialLabel}
              </p>
              <ul className="mt-4 space-y-2">
                {content.social.map((item, i) => {
                  const Icon = SOCIAL_ICONS[i % SOCIAL_ICONS.length];
                  return (
                    <li key={item.handle} className="flex items-center gap-2">
                      <Icon
                        aria-hidden
                        className="h-4 w-4 text-[var(--d-bg-faint)]"
                        strokeWidth={1.25}
                      />
                      <span className="[font-family:var(--demo-body)] text-[1.05rem] text-[var(--d-bg-dim)]">
                        <span className="text-[var(--d-bg-faint)]">{item.label}: </span>
                        {item.handle}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="mt-16 flex flex-col gap-2 border-t border-[var(--d-bg-faint)] pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="[font-family:var(--demo-display)] text-[10px] uppercase tracking-[0.28em] text-[var(--d-bg-faint)]">
              {content.rights} · {new Date().getFullYear()}
            </p>
            <p className="[font-family:var(--demo-body)] text-sm italic text-[var(--d-bg-dim)]">
              {content.colophon}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
