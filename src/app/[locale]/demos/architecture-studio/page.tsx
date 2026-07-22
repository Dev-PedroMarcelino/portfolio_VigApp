import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Archivo, IBM_Plex_Mono, Instrument_Serif } from "next/font/google";
import { DemoShell } from "@/components/demos/demo-shell";
import { Prumo } from "@/demos/architecture-studio/prumo";

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--demo-display",
});

const body = Archivo({
  subsets: ["latin"],
  variable: "--demo-body",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--demo-mono",
});

export const metadata: Metadata = {
  title: "Prumo Arquitetura — concept by VigApp",
  description:
    "A Brazilian high-end residential architecture studio concept: full-bleed house film, an editorial project index, interactive Sketchfab room tours and a conversion-first quote flow, designed by VigApp.",
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <DemoShell demoName="Prumo Arquitetura">
      <div className={`${display.variable} ${body.variable} ${mono.variable}`}>
        <Prumo locale={locale} />
      </div>
    </DemoShell>
  );
}
