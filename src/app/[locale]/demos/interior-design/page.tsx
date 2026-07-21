import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Fraunces, Inter_Tight } from "next/font/google";
import { DemoShell } from "@/components/demos/demo-shell";
import { StudioAmbra } from "@/demos/interior-design/studio-ambra";

const display = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--demo-display",
});

const body = Inter_Tight({
  subsets: ["latin"],
  variable: "--demo-body",
});

export const metadata: Metadata = {
  title: "Studio Ambra — concept by VigApp",
  description:
    "Warm minimal interior design studio concept with a room-filterable portfolio, a draggable before-and-after slider and an interactive material palette.",
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <DemoShell demoName="Studio Ambra">
      <div className={`${display.variable} ${body.variable}`}>
        <StudioAmbra locale={locale} />
      </div>
    </DemoShell>
  );
}
