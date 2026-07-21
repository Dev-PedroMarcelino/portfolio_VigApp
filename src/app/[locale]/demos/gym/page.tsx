import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Anton, Space_Grotesk } from "next/font/google";
import { DemoShell } from "@/components/demos/demo-shell";
import { ForgeAthletic } from "@/demos/gym/forge-athletic";

const display = Anton({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--demo-display",
});

const body = Space_Grotesk({
  subsets: ["latin"],
  variable: "--demo-body",
});

export const metadata: Metadata = {
  title: "Forge Athletic — concept by VigApp",
  description:
    "Blackout performance-gym concept: giant condensed hero, program grid, day-by-day class schedule, billing toggle, coaches, live counters and a working 1RM calculator.",
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <DemoShell demoName="Forge Athletic">
      <div className={`${display.variable} ${body.variable}`}>
        <ForgeAthletic locale={locale} />
      </div>
    </DemoShell>
  );
}
