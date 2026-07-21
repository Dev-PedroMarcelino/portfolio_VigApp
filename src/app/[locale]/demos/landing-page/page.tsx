import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Inter, Space_Grotesk } from "next/font/google";
import { DemoShell } from "@/components/demos/demo-shell";
import { Halo } from "@/demos/landing-page/halo";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--demo-display",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--demo-body",
});

export const metadata: Metadata = {
  title: "HALO — concept by VigApp",
  description:
    "Single-product conversion page for the HALO smart ring: CSS product render, sticky-scroll score dials, a live pricing configurator, comparison and countdown.",
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <DemoShell demoName="HALO">
      <div className={`${display.variable} ${body.variable}`}>
        <Halo locale={locale} />
      </div>
    </DemoShell>
  );
}
