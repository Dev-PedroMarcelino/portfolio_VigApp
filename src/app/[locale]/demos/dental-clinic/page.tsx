import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Inter, Sora } from "next/font/google";
import { DemoShell } from "@/components/demos/demo-shell";
import { LuminaDental } from "@/demos/dental-clinic/lumina-dental";

const display = Sora({
  subsets: ["latin"],
  variable: "--demo-display",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--demo-body",
});

export const metadata: Metadata = {
  title: "Lumina Dental — concept by VigApp",
  description:
    "Modern dental studio concept with transparent pricing tabs, a before-and-after smile gallery and a live appointment picker.",
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <DemoShell demoName="Lumina Dental">
      <div className={`${display.variable} ${body.variable}`}>
        <LuminaDental locale={locale} />
      </div>
    </DemoShell>
  );
}
