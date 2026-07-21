import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { DM_Serif_Display, Manrope } from "next/font/google";
import { DemoShell } from "@/components/demos/demo-shell";
import { Nordform } from "@/demos/furniture-store/nordform";

const display = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--demo-display",
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--demo-body",
});

export const metadata: Metadata = {
  title: "Nordform — concept by VigApp",
  description:
    "Scandinavian furniture store concept with a shoppable room scene, material variants, unit-aware dimensions and showroom booking.",
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <DemoShell demoName="Nordform">
      <div className={`${display.variable} ${body.variable}`}>
        <Nordform locale={locale} />
      </div>
    </DemoShell>
  );
}
