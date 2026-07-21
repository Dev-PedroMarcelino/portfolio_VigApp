import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Baloo_2, Nunito } from "next/font/google";
import { DemoShell } from "@/components/demos/demo-shell";
import { Brightpath } from "@/demos/school/brightpath";

const display = Baloo_2({
  subsets: ["latin"],
  variable: "--demo-display",
});

const body = Nunito({
  subsets: ["latin"],
  variable: "--demo-body",
});

export const metadata: Metadata = {
  title: "Brightpath — concept by VigApp",
  description:
    "Joyful K-12 school concept with age-based programs, a day-in-the-life timeline, campus gallery lightbox and an open-day RSVP flow.",
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <DemoShell demoName="Brightpath">
      <div className={`${display.variable} ${body.variable}`}>
        <Brightpath locale={locale} />
      </div>
    </DemoShell>
  );
}
