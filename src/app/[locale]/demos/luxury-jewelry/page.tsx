import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { DemoShell } from "@/components/demos/demo-shell";
import { AureliaRoot } from "@/demos/luxury-jewelry/aurelia";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--demo-display",
});
const body = Jost({ subsets: ["latin"], variable: "--demo-body" });

export const metadata: Metadata = {
  title: "Aurelia — concept by VigApp",
  description:
    "Aurelia is a Place Vendôme high-jewelry maison concept: a cursor-lit hero, live ring configurator and private boutique appointments, designed by VigApp.",
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <DemoShell demoName="Aurelia">
      <div className={`${display.variable} ${body.variable}`}>
        <AureliaRoot locale={locale} />
      </div>
    </DemoShell>
  );
}
