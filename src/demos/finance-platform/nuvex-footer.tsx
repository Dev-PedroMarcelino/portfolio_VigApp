"use client";

import { AtSign, Camera, MessageCircle, Globe } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { NuvexContent } from "./content";
import { scrollToId } from "./ui";

const SOCIAL_ICON: Record<string, LucideIcon> = {
  "at-sign": AtSign,
  camera: Camera,
  "message-circle": MessageCircle,
  globe: Globe,
};

export function NuvexFooter({ content }: { content: NuvexContent["footer"] }) {
  return (
    <footer className="relative border-t border-[var(--d-line)] bg-[#04060A] py-16">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <button
              type="button"
              onClick={() => scrollToId("top")}
              className="flex items-center gap-2.5"
              aria-label="Nuvex"
            >
              <span className="relative flex h-7 w-7 items-center justify-center rounded-[9px] bg-gradient-to-br from-[var(--d-accent-soft)] to-[var(--d-accent-deep)] shadow-[0_0_18px_rgba(16,185,129,0.5)]">
                <span className="h-2.5 w-2.5 rotate-45 rounded-[3px] bg-[#05070C]" />
              </span>
              <span className="text-lg font-semibold tracking-tight text-[var(--d-ink)] [font-family:var(--demo-display)]">
                Nuvex
              </span>
            </button>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--d-ink-soft)]">
              {content.tagline}
            </p>
            <div className="mt-6 flex gap-2">
              {content.social.map((s) => {
                const Icon = SOCIAL_ICON[s.icon] ?? Globe;
                return (
                  <span
                    key={s.label}
                    className="group flex items-center gap-2 rounded-full border border-[var(--d-line)] px-3 py-1.5 text-[0.72rem] text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]"
                    title={`${s.label} ${s.handle}`}
                  >
                    <Icon className="h-3.5 w-3.5 text-[var(--d-accent)]" strokeWidth={1.8} />
                    {s.handle}
                  </span>
                );
              })}
            </div>
          </div>

          {content.columns.map((col) => (
            <div key={col.title}>
              <p className="text-[0.66rem] uppercase tracking-[0.22em] text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]">
                {col.title}
              </p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <button
                      type="button"
                      onClick={() => scrollToId("top")}
                      className="text-sm text-[var(--d-ink-soft)] transition-colors hover:text-[var(--d-ink)]"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-[var(--d-line)] pt-6 text-[0.72rem] text-[var(--d-ink-soft)]/70 [font-family:var(--demo-mono)] sm:flex-row sm:items-center sm:justify-between">
          <p>{content.legal}</p>
          <p>{content.licence}</p>
        </div>
      </div>
    </footer>
  );
}
