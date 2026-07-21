import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Archivo_Black, Space_Mono } from "next/font/google";
import { DemoShell } from "@/components/demos/demo-shell";
import { LoudHaus } from "@/demos/marketing-agency/loud-haus";

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
  title: "LOUD/HAUS — concept by VigApp",
  description:
    "Brutalist creative-agency concept: shouting glitch hero, pausable services marquee, cursor-trailing case studies, strikethrough manifesto and a contact form that yells.",
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <DemoShell demoName="LOUD/HAUS">
      <div className={`${display.variable} ${body.variable}`}>
        <LoudHaus locale={locale} />
      </div>
    </DemoShell>
  );
}
