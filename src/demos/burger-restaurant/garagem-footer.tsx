"use client";

import { AtSign, MessageCircle, Zap } from "lucide-react";
import type { GaragemContent } from "./content";
import { INSTAGRAM_HANDLE, WHATSAPP_DISPLAY, WHATSAPP_URL } from "./content";
import { FOCUS_RING } from "./ui";

export function GaragemFooter({ content }: { content: GaragemContent["footer"] }) {
  return (
    <footer className="relative overflow-hidden border-t-2 border-[var(--d-line)] pb-24 pt-14">
      {/* Hazard tape */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-1.5 opacity-90"
        style={{
          background: "repeating-linear-gradient(-45deg, var(--d-yellow) 0 12px, var(--d-bg) 12px 24px)",
        }}
      />

      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div>
            <p className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center bg-[var(--d-red)] shadow-[2px_2px_0_var(--d-yellow)]">
                <Zap className="h-4.5 w-4.5 text-[var(--d-bg)]" strokeWidth={2.6} fill="var(--d-bg)" aria-hidden />
              </span>
              <span className="text-3xl uppercase leading-none text-[var(--d-ink)] [font-family:var(--demo-display)]">
                Garagem Burger
              </span>
            </p>
            <p className="mt-3 text-[0.85rem] text-[var(--d-ink-soft)]">{content.tagline}</p>
          </div>

          <div className="flex flex-col gap-2 text-[0.8rem] text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 transition-colors hover:text-[var(--d-yellow)] ${FOCUS_RING}`}
            >
              <MessageCircle className="h-4 w-4 text-[var(--d-red)]" strokeWidth={2.2} aria-hidden />
              {WHATSAPP_DISPLAY}
            </a>
            <p className="inline-flex items-center gap-2">
              <AtSign className="h-4 w-4 text-[var(--d-red)]" strokeWidth={2.2} aria-hidden />
              {INSTAGRAM_HANDLE}
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-[var(--d-line)] pt-6 text-[0.7rem] uppercase tracking-[0.18em] text-[var(--d-ink-soft)]/80 [font-family:var(--demo-mono)] sm:flex-row sm:items-center sm:justify-between">
          <p>{content.location}</p>
          <p>{content.fictional}</p>
        </div>
      </div>
    </footer>
  );
}
