import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Lora, Plus_Jakarta_Sans } from "next/font/google";
import { DemoShell } from "@/components/demos/demo-shell";
import { AuroraHealth } from "@/demos/medical-clinic/aurora-health";

const display = Lora({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--demo-display",
});

const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--demo-body",
});

export const metadata: Metadata = {
  title: "Aurora Health — concept by VigApp",
  description:
    "Calm, human healthcare clinic concept with a working appointment stepper, filterable doctor directory and membership plans.",
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <DemoShell demoName="Aurora Health">
      <div className={`${display.variable} ${body.variable}`}>
        <AuroraHealth locale={locale} />
      </div>
    </DemoShell>
  );
}
