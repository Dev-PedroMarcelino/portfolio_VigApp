import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { DM_Serif_Display, Nunito_Sans } from "next/font/google";
import { DemoShell } from "@/components/demos/demo-shell";
import { Crateful } from "@/demos/subscription-platform/crateful";

const display = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--demo-display",
});

const body = Nunito_Sans({
  subsets: ["latin"],
  variable: "--demo-body",
});

export const metadata: Metadata = {
  title: "Crateful — concept by VigApp",
  description:
    "Artisanal snack box subscription concept with a live plan builder, flip-reveal monthly crate and gifting mode.",
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <DemoShell demoName="Crateful">
      <div className={`${display.variable} ${body.variable}`}>
        <Crateful locale={locale} />
      </div>
    </DemoShell>
  );
}
