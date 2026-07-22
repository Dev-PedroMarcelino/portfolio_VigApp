import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Bricolage_Grotesque, IBM_Plex_Mono, Inter } from "next/font/google";
import { DemoShell } from "@/components/demos/demo-shell";
import { Iara } from "@/demos/ai-platform/iara";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
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
  title: "IARA — concept by VigApp",
  description:
    "Brazilian AI platform concept: a live Portuguese-first playground, generic-AI-vs-IARA editorial comparison, sector cases, LGPD depth layers and BRL token pricing with a cost calculator.",
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <DemoShell demoName="IARA">
      <div className={`${display.variable} ${body.variable} ${mono.variable}`}>
        <Iara locale={locale} />
      </div>
    </DemoShell>
  );
}
