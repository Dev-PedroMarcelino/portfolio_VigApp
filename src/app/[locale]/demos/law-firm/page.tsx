import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Libre_Caslon_Text, Inter } from "next/font/google";
import { DemoShell } from "@/components/demos/demo-shell";
import { CastellanReisRoot } from "@/demos/law-firm/castellan-reis";

const display = Libre_Caslon_Text({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--demo-display",
});
const displayItalic = Libre_Caslon_Text({
  subsets: ["latin"],
  weight: ["400"],
  style: "italic",
  variable: "--demo-display-italic",
});
const body = Inter({ subsets: ["latin"], variable: "--demo-body" });

export const metadata: Metadata = {
  title: "Castellan & Reis — concept by VigApp",
  description:
    "A century-old corporate law firm concept: numbered practice areas, partner profiles, animated case results and a confidential consultation request, designed by VigApp.",
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <DemoShell demoName="Castellan & Reis">
      <div className={`${display.variable} ${displayItalic.variable} ${body.variable}`}>
        <CastellanReisRoot locale={locale} />
      </div>
    </DemoShell>
  );
}
