import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Archivo_Black, Space_Mono } from "next/font/google";
import { DemoShell } from "@/components/demos/demo-shell";
import { VielaStore } from "@/demos/sneaker-store/viela-store";

const display = Archivo_Black({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--demo-display",
});

const body = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--demo-body",
});

export const metadata: Metadata = {
  title: "VIELA — concept by VigApp",
  description:
    "Brazilian streetwear store concept: a filterable catalog of sneakers, apparel and accessories, an interactive 360° Sketchfab product view, live drop countdown and a limited raffle.",
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <DemoShell demoName="VIELA">
      <div className={`${display.variable} ${body.variable}`}>
        <VielaStore locale={locale} />
      </div>
    </DemoShell>
  );
}
