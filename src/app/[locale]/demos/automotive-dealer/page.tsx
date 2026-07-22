import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import { DemoShell } from "@/components/demos/demo-shell";
import { Barcellos } from "@/demos/automotive-dealer/barcellos";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--demo-display",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--demo-body",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--demo-mono",
});

export const metadata: Metadata = {
  title: "Barcellos Veículos — concept by VigApp",
  description:
    "Premium Brazilian dealership concept: a real Sketchfab 3D showroom stage, filterable stock of pre-owned and armored cars, a live financing simulator and trade-in appraisal — graphite and champagne identity.",
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <DemoShell demoName="Barcellos Veículos">
      <div className={`${display.variable} ${body.variable} ${mono.variable}`}>
        <Barcellos locale={locale} />
      </div>
    </DemoShell>
  );
}
