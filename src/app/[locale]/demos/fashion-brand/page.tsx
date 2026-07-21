import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Bodoni_Moda, Inter_Tight } from "next/font/google";
import { DemoShell } from "@/components/demos/demo-shell";
import { NoirAtelierRoot } from "@/demos/fashion-brand/noir-atelier";

const display = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--demo-display",
});
const body = Inter_Tight({ subsets: ["latin"], variable: "--demo-body" });

export const metadata: Metadata = {
  title: "NOIR Atelier — concept by VigApp",
  description:
    "A Parisian luxury fashion maison: a crossfading lookbook, an eight-piece collection, an atelier craft story and a private request-a-piece experience designed by VigApp.",
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <DemoShell demoName="NOIR Atelier">
      <div className={`${display.variable} ${body.variable}`}>
        <NoirAtelierRoot locale={locale} />
      </div>
    </DemoShell>
  );
}
