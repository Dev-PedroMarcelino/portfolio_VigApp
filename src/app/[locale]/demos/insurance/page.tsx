import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { DemoShell } from "@/components/demos/demo-shell";
import { Shieldline } from "@/demos/insurance/shieldline";

const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--demo-display",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--demo-body",
});

export const metadata: Metadata = {
  title: "Shieldline — concept by VigApp",
  description:
    "Plain-language insurance concept with an instant quote stepper, tiered coverage comparison, a transparent claims timeline and named advisors.",
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <DemoShell demoName="Shieldline">
      <div className={`${display.variable} ${body.variable}`}>
        <Shieldline locale={locale} />
      </div>
    </DemoShell>
  );
}
