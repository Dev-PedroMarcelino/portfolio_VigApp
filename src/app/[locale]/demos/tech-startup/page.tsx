import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Inter, Space_Grotesk } from "next/font/google";
import { DemoShell } from "@/components/demos/demo-shell";
import { NebulaLabs } from "@/demos/tech-startup/nebula-labs";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--demo-display",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--demo-body",
});

export const metadata: Metadata = {
  title: "Nebula Labs — concept by VigApp",
  description:
    "Venture-backed dev-tools startup concept: aurora hero, sticky-scroll product tour, CSS terminal, live changelog and a working waitlist.",
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <DemoShell demoName="Nebula Labs">
      <div className={`${display.variable} ${body.variable}`}>
        <NebulaLabs locale={locale} />
      </div>
    </DemoShell>
  );
}
