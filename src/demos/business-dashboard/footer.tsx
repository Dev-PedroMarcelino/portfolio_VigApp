"use client";

import { AtSign, Globe, MessageCircle, type LucideIcon } from "lucide-react";
import type { Content } from "./content";
import { PulseboardMark } from "./ui";

const SOCIAL_ICON: Record<string, LucideIcon> = {
  globe: Globe,
  at: AtSign,
  message: MessageCircle,
};

export function Footer({ copy }: { copy: Content["footer"] }) {
  return (
    <footer className="border-t border-[var(--d-line)] px-4 py-12 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <PulseboardMark className="h-8 w-8" />
            <span className="[font-family:var(--demo-display)] text-lg font-semibold tracking-tight text-[var(--d-ink)]">
              Pulseboard
            </span>
          </div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--d-ink-soft)]">{copy.tagline}</p>
          <div className="mt-5 flex flex-col gap-2">
            {copy.social.map((s) => {
              const Icon = SOCIAL_ICON[s.icon] ?? Globe;
              return (
                <a
                  key={s.label}
                  href="#overview"
                  className="inline-flex items-center gap-2 text-sm text-[var(--d-ink-soft)] transition-colors hover:text-[var(--d-accent)]"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.8} />
                  {s.label}
                </a>
              );
            })}
          </div>
        </div>

        {copy.columns.map((col) => (
          <div key={col.title}>
            <h3 className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[var(--d-ink-faint)]">
              {col.title}
            </h3>
            <ul className="mt-3 flex flex-col gap-2">
              {col.links.map((link) => (
                <li key={link}>
                  <a
                    href="#overview"
                    className="text-sm text-[var(--d-ink-soft)] transition-colors hover:text-[var(--d-ink)]"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col items-start justify-between gap-3 border-t border-[var(--d-line)] pt-6 sm:flex-row sm:items-center">
        <p className="[font-family:var(--demo-mono)] text-[0.68rem] text-[var(--d-ink-faint)]">
          © 2026 {copy.rights}
        </p>
        <span className="inline-flex items-center gap-2 text-[0.72rem] text-[var(--d-ink-soft)]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--d-emerald)] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--d-emerald)]" />
          </span>
          {copy.status}
        </span>
      </div>
    </footer>
  );
}
