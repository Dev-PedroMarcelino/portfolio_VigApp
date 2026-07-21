import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { setRequestLocale } from "next-intl/server";
import { Inter, JetBrains_Mono } from "next/font/google";
import { DemoShell } from "@/components/demos/demo-shell";
import { Insightgrid } from "@/demos/analytics-dashboard/insightgrid";

const inter = Inter({ subsets: ["latin"], variable: "--demo-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--demo-mono" });

export const metadata: Metadata = {
  title: "Insightgrid — concept by VigApp",
  description:
    "Realtime analytics dashboard concept: a live workspace with a date-range picker that morphs every dataset, count-up KPI cards, a self-drawing multi-series chart, channel bars, a conversion funnel and a ticking event feed.",
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <DemoShell demoName="Insightgrid">
      <div
        className={`${inter.variable} ${mono.variable}`}
        style={
          {
            "--demo-display": "var(--demo-sans)",
            "--demo-body": "var(--demo-sans)",
          } as CSSProperties
        }
      >
        <Insightgrid locale={locale} />
      </div>
    </DemoShell>
  );
}
