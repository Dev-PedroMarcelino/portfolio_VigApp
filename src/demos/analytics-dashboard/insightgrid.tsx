"use client";

import { useState, type CSSProperties } from "react";
import { pickContent } from "@/demos/content";
import { DATASETS, analyticsDict, type RangeId } from "./content";
import { Header } from "./header";
import { KpiCards } from "./kpi-cards";
import { LineChart } from "./line-chart";
import { ChannelBars } from "./channel-bars";
import { Funnel } from "./funnel";
import { RealtimeFeed } from "./realtime-feed";
import { Outro } from "./outro";
import { Footer } from "./footer";

/**
 * Insightgrid — realtime analytics dashboard concept.
 * Midnight surface, cyan accent, violet/emerald series. The palette lives here
 * as CSS variables so the demo renders identically in any host theme.
 */
const PALETTE = {
  "--d-bg": "#0A0E1A",
  "--d-bg-blur": "rgba(10,14,26,0.82)",
  "--d-surface": "#0F1524",
  "--d-panel": "rgba(148,166,191,0.06)",
  "--d-line": "rgba(148,166,191,0.12)",
  "--d-line-strong": "rgba(148,166,191,0.26)",
  "--d-ink": "#EAF0FA",
  "--d-ink-soft": "#93A2BC",
  "--d-ink-faint": "#5C6B85",
  "--d-accent": "#22D3EE",
  "--d-accent-ink": "#04121A",
  "--d-violet": "#A78BFA",
  "--d-emerald": "#34D399",
} as CSSProperties;

/** Fixed synced timestamp so SSR and CSR agree. */
const SYNCED_AT = "14:32 UTC";

export function Insightgrid({ locale }: { locale: string }) {
  const content = pickContent(analyticsDict, locale);
  const [range, setRange] = useState<RangeId>("30d");
  const data = DATASETS[range];

  return (
    <div
      id="top"
      style={{ ...PALETTE, backgroundColor: "#0A0E1A", color: "#EAF0FA" }}
      className="relative min-h-screen [font-family:var(--demo-body)] text-[var(--d-ink)] antialiased selection:bg-[rgba(34,211,238,0.28)]"
    >
      <Header
        nav={content.nav}
        header={content.header}
        range={range}
        onRange={setRange}
        syncedAt={SYNCED_AT}
      />

      <main className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-6 pb-24 sm:px-6 lg:px-8">
        <KpiCards content={content} data={data} />
        <LineChart content={content} data={data} range={range} />
        <div className="grid gap-5 lg:grid-cols-2">
          <ChannelBars content={content} data={data} />
          <Funnel content={content} data={data} />
        </div>
        <RealtimeFeed content={content} />
        <Outro content={content.outro} />
      </main>

      <Footer footer={content.footer} nav={content.nav} />
    </div>
  );
}
