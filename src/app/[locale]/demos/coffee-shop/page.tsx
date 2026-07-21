import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Karla, Lora } from "next/font/google";
import { DemoShell } from "@/components/demos/demo-shell";
import { TerraCafe } from "@/demos/coffee-shop/terra-cafe";

const display = Lora({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--demo-display",
});

const body = Karla({
  subsets: ["latin"],
  variable: "--demo-body",
});

export const metadata: Metadata = {
  title: "Terra Café — concept by VigApp",
  description:
    "Slow-living specialty coffee house concept with brew guides, bean origin stories and a live subscription builder.",
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <DemoShell demoName="Terra Café">
      <div className={`${display.variable} ${body.variable}`}>
        <TerraCafe locale={locale} />
      </div>
    </DemoShell>
  );
}
