import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Anton, Barlow, IBM_Plex_Mono } from "next/font/google";
import { DemoShell } from "@/components/demos/demo-shell";
import { GaragemBurger } from "@/demos/burger-restaurant/garagem-burger";

const display = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--demo-display",
});

const body = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--demo-body",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--demo-mono",
});

export const metadata: Metadata = {
  title: "Garagem Burger — concept by VigApp",
  description:
    "Brazilian rock-bar burger joint in Cambuí, Campinas: smash burgers with rock'n'roll names, a digital menu board, live cover bands and a 3D guitar on stage.",
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <DemoShell demoName="Garagem Burger">
      <div className={`${display.variable} ${body.variable} ${mono.variable}`}>
        <GaragemBurger locale={locale} />
      </div>
    </DemoShell>
  );
}
