import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Fraunces, Work_Sans } from "next/font/google";
import { DemoShell } from "@/components/demos/demo-shell";
import { AtlasRoot } from "@/demos/travel-agency/atlas-root";

const display = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--demo-display",
});
const body = Work_Sans({ subsets: ["latin"], variable: "--demo-body" });

export const metadata: Metadata = {
  title: "Atlas Voyages — concept by VigApp",
  description:
    "A tailor-made travel studio concept: hand-drawn journeys, a day-by-day itinerary explorer and a travel-style quiz, designed by VigApp.",
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <DemoShell demoName="Atlas Voyages">
      <div className={`${display.variable} ${body.variable}`}>
        <AtlasRoot locale={locale} />
      </div>
    </DemoShell>
  );
}
