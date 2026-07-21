import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Playfair_Display, Inter } from "next/font/google";
import { DemoShell } from "@/components/demos/demo-shell";
import { AltureRoot } from "@/demos/real-estate/alture";

const display = Playfair_Display({ subsets: ["latin"], variable: "--demo-display" });
const body = Inter({ subsets: ["latin"], variable: "--demo-body" });

export const metadata: Metadata = {
  title: "Alture — concept by VigApp",
  description:
    "A private residential advisory concept: editorial listings, working filters, an interactive property spotlight and a mortgage estimator, designed by VigApp.",
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <DemoShell demoName="Alture">
      <div className={`${display.variable} ${body.variable}`}>
        <AltureRoot locale={locale} />
      </div>
    </DemoShell>
  );
}
