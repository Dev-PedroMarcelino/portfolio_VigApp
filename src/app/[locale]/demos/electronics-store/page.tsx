import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { IBM_Plex_Sans, Space_Grotesk } from "next/font/google";
import { DemoShell } from "@/components/demos/demo-shell";
import { VoltixStore } from "@/demos/electronics-store/voltix-store";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--demo-display",
});

const body = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--demo-body",
});

export const metadata: Metadata = {
  title: "Voltix — concept by VigApp",
  description:
    "Flagship tech retail concept with a live device comparison engine, deal countdowns and a working cart drawer.",
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <DemoShell demoName="Voltix">
      <div className={`${display.variable} ${body.variable}`}>
        <VoltixStore locale={locale} />
      </div>
    </DemoShell>
  );
}
