import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { setRequestLocale } from "next-intl/server";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import { DemoShell } from "@/components/demos/demo-shell";
import { Pulseboard } from "@/demos/business-dashboard/pulseboard";

const display = Inter({
  subsets: ["latin"],
  variable: "--demo-display",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--demo-mono",
});

export const metadata: Metadata = {
  title: "Pulseboard — concept by VigApp",
  description:
    "Executive business dashboard concept: a working board-meeting surface with a fiscal period toggle that morphs the revenue chart and KPIs, animated OKR rings, an objective drill-down panel, a sortable team table and a live signal feed.",
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <DemoShell demoName="Pulseboard">
      <div
        className={`${display.variable} ${mono.variable}`}
        style={
          {
            "--demo-body": "var(--demo-display)",
          } as CSSProperties
        }
      >
        <Pulseboard locale={locale} />
      </div>
    </DemoShell>
  );
}
