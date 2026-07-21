import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Inter, JetBrains_Mono } from "next/font/google";
import { DemoShell } from "@/components/demos/demo-shell";
import { Relaty } from "@/demos/crm-platform/relaty";

const body = Inter({
  subsets: ["latin"],
  variable: "--demo-body",
});

const display = Inter({
  subsets: ["latin"],
  variable: "--demo-display",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--demo-mono",
});

export const metadata: Metadata = {
  title: "Relaty — concept by VigApp",
  description:
    "Focused CRM concept: an interactive revenue pipeline, live contact search, no-code automation recipes and a seat-based pricing slider.",
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <DemoShell demoName="Relaty">
      <div className={`${display.variable} ${body.variable} ${mono.variable}`}>
        <Relaty locale={locale} />
      </div>
    </DemoShell>
  );
}
