import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import { DemoShell } from "@/components/demos/demo-shell";
import { Nuvex } from "@/demos/finance-platform/nuvex";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--demo-display",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--demo-mono",
});

export const metadata: Metadata = {
  title: "Nuvex — concept by VigApp",
  description:
    "Dark-futurist neobank concept with a 3D-tilting metal card, a live balance dashboard, an instant transfer flow and animated savings goal rings.",
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <DemoShell demoName="Nuvex">
      <div className={`${display.variable} ${mono.variable}`}>
        <Nuvex locale={locale} />
      </div>
    </DemoShell>
  );
}
