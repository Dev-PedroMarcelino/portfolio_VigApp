import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Inter_Tight, Source_Serif_4 } from "next/font/google";
import { DemoShell } from "@/components/demos/demo-shell";
import { Meridian } from "@/demos/corporate-website/meridian";

const display = Inter_Tight({
  subsets: ["latin"],
  variable: "--demo-display",
});

const body = Inter_Tight({
  subsets: ["latin"],
  variable: "--demo-body",
});

const serif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--demo-serif",
});

export const metadata: Metadata = {
  title: "Meridian Group — concept by VigApp",
  description:
    "Global holding-company concept with a world-presence hero, business-unit tabs, animated key figures, leadership bios, newsroom filtering, ESG progress metrics and an investor-relations band.",
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <DemoShell demoName="Meridian Group">
      <div className={`${display.variable} ${body.variable} ${serif.variable}`}>
        <Meridian locale={locale} />
      </div>
    </DemoShell>
  );
}
