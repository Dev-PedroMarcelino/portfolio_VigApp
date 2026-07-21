import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Archivo, Cormorant_Garamond } from "next/font/google";
import { DemoShell } from "@/components/demos/demo-shell";
import { AtelierMeridianRoot } from "@/demos/architecture-studio/atelier-meridian";

const display = Archivo({ subsets: ["latin"], variable: "--demo-display" });
const body = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--demo-body",
});

export const metadata: Metadata = {
  title: "Atelier Meridian — concept by VigApp",
  description:
    "An award-winning architecture practice concept: a scroll-tracking manifesto, an expanding project index and a museum-grade portfolio, designed by VigApp.",
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <DemoShell demoName="Atelier Meridian">
      <div className={`${display.variable} ${body.variable}`}>
        <AtelierMeridianRoot locale={locale} />
      </div>
    </DemoShell>
  );
}
