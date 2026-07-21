import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Inter, Playfair_Display } from "next/font/google";
import { DemoShell } from "@/components/demos/demo-shell";
import { VantageCapital } from "@/demos/investment-platform/vantage-capital";

const display = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--demo-display",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--demo-body",
});

export const metadata: Metadata = {
  title: "Vantage Capital — concept by VigApp",
  description:
    "Old-money wealth management concept with an interactive allocation donut, a compound growth simulator and a white-glove onboarding flow.",
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <DemoShell demoName="Vantage Capital">
      <div className={`${display.variable} ${body.variable}`}>
        <VantageCapital locale={locale} />
      </div>
    </DemoShell>
  );
}
