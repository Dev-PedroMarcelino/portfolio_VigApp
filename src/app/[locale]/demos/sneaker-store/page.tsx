import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Archivo_Black, Space_Mono } from "next/font/google";
import { DemoShell } from "@/components/demos/demo-shell";
import { KynetikStore } from "@/demos/sneaker-store/kynetik-store";

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
  title: "KYNETIK — concept by VigApp",
  description:
    "Hype sneaker-drop concept with a live countdown, size-select add-to-cart, a limited raffle and kinetic tilt-on-hover product cards.",
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <DemoShell demoName="KYNETIK">
      <div className={`${display.variable} ${body.variable}`}>
        <KynetikStore locale={locale} />
      </div>
    </DemoShell>
  );
}
