"use client";

import dynamic from "next/dynamic";
import { Wifi } from "lucide-react";
import type { NuvexContent } from "./content";
import { BALANCE } from "./content";
import { fmtWhole } from "./ui";

// The WebGL scene is lazy, client-only. page.tsx stays a server component and
// never imports it; the fallback keeps layout stable while three.js loads.
const Scene = dynamic(() => import("./scene"), {
  ssr: false,
  loading: () => <div aria-hidden />,
});

/**
 * Real-time Three.js hero card. The canvas is purely decorative (aria-hidden),
 * so every piece of copy — network, number, holder, validity, balance — lives
 * in the DOM legend below for i18n and screen readers.
 */
export function Card3D({
  content,
  localeTag,
  currency,
}: {
  content: NuvexContent["hero"]["card"];
  localeTag: string;
  currency: string;
}) {
  return (
    <div className="relative w-full max-w-[460px]">
      {/* Emerald bloom behind the floating card */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[38%] h-[80%] w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 45%, rgba(16,185,129,0.4), rgba(34,211,238,0.12) 55%, transparent 80%)",
        }}
      />

      {/* Live 3D canvas */}
      <div className="relative aspect-[1.42/1] w-full">
        <Scene />
      </div>

      {/* DOM legend — all card text, kept out of WebGL */}
      <div className="relative -mt-2 rounded-2xl border border-[var(--d-line)] bg-[var(--d-panel)]/70 p-5 backdrop-blur-md">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[0.6rem] uppercase tracking-[0.3em] text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]">
              {content.label}
            </p>
            <p className="mt-1 text-base font-semibold tracking-tight text-[var(--d-ink)] [font-family:var(--demo-display)]">
              {content.network}
            </p>
          </div>
          <Wifi className="h-5 w-5 rotate-90 text-[var(--d-ink-soft)]" strokeWidth={1.6} aria-hidden />
        </div>

        <p className="mt-4 text-lg tracking-[0.18em] text-[var(--d-ink)] [font-family:var(--demo-mono)]">
          {content.number}
        </p>

        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="text-[0.56rem] uppercase tracking-[0.24em] text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]">
              {content.holderLabel}
            </p>
            <p className="mt-0.5 text-sm tracking-wide text-[var(--d-ink)] [font-family:var(--demo-mono)]">
              {content.holder}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[0.56rem] uppercase tracking-[0.24em] text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]">
              {content.validLabel}
            </p>
            <p className="mt-0.5 text-sm tracking-wide text-[var(--d-ink)] [font-family:var(--demo-mono)]">
              {content.valid}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[0.56rem] uppercase tracking-[0.24em] text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]">
              {content.balanceLabel}
            </p>
            <p className="mt-0.5 text-sm font-semibold text-[var(--d-accent-soft)] [font-family:var(--demo-mono)]">
              {fmtWhole(BALANCE, localeTag, currency)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
