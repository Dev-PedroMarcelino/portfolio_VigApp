import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Inter, Sora } from "next/font/google";
import { DemoShell } from "@/components/demos/demo-shell";
import { SlotlyDemo } from "@/demos/scheduling-platform/slotly";

const display = Sora({
  subsets: ["latin"],
  variable: "--demo-display",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--demo-body",
});

export const metadata: Metadata = {
  title: "Slotly — concept by VigApp",
  description:
    "Scheduling SaaS concept with a fully working booking widget, live integrations wall, team routing modes and per-seat pricing slider.",
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <DemoShell demoName="Slotly">
      <div className={`${display.variable} ${body.variable}`}>
        <SlotlyDemo locale={locale} />
      </div>
    </DemoShell>
  );
}
