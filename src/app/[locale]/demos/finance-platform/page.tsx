import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Fraunces, Figtree, IBM_Plex_Mono } from "next/font/google";
import { DemoShell } from "@/components/demos/demo-shell";
import { Zela } from "@/demos/finance-platform/zela";

const display = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
  variable: "--demo-display",
});

const body = Figtree({
  subsets: ["latin"],
  variable: "--demo-body",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--demo-mono",
});

export const metadata: Metadata = {
  title: "Zela — concept by VigApp",
  description:
    "Warm Brazilian digital-account concept: a cream-and-green anti-obsidian fintech with an interactive Pix flow, compounding savings boxes, a real 3D metal card and a fee-transparency table.",
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <DemoShell demoName="Zela">
      <div className={`${display.variable} ${body.variable} ${mono.variable}`}>
        <Zela locale={locale} />
      </div>
    </DemoShell>
  );
}
