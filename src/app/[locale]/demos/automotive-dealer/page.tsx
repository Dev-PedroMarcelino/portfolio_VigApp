import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Michroma, Archivo } from "next/font/google";
import { DemoShell } from "@/components/demos/demo-shell";
import { ApexMotors } from "@/demos/automotive-dealer/apex-motors";

const display = Michroma({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--demo-display",
});

const body = Archivo({
  subsets: ["latin"],
  variable: "--demo-body",
});

export const metadata: Metadata = {
  title: "Apex Motors — concept by VigApp",
  description:
    "Performance-car dealer concept with a cinematic hero, live build-and-price configurator, model lineup selector and financing calculator.",
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <DemoShell demoName="Apex Motors">
      <div className={`${display.variable} ${body.variable}`}>
        <ApexMotors locale={locale} />
      </div>
    </DemoShell>
  );
}
