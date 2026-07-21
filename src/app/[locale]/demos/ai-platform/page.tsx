import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { setRequestLocale } from "next-intl/server";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { DemoShell } from "@/components/demos/demo-shell";
import { Cortexa } from "@/demos/ai-platform/cortexa";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--demo-display",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--demo-mono",
});

export const metadata: Metadata = {
  title: "Cortexa — concept by VigApp",
  description:
    "AI reasoning-platform concept with a canvas neural orb, live streaming playground, use-case gallery, model tiers, security band and a token pricing calculator.",
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <DemoShell demoName="Cortexa">
      <div
        className={`${display.variable} ${mono.variable}`}
        style={{ "--demo-body": "var(--demo-display)" } as CSSProperties}
      >
        <Cortexa locale={locale} />
      </div>
    </DemoShell>
  );
}
