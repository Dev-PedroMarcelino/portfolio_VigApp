import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Libre_Caslon_Text, Source_Sans_3 } from "next/font/google";
import { DemoShell } from "@/components/demos/demo-shell";
import { Northgate } from "@/demos/university/northgate";

const display = Libre_Caslon_Text({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--demo-display",
});

const body = Source_Sans_3({
  subsets: ["latin"],
  variable: "--demo-body",
});

export const metadata: Metadata = {
  title: "Northgate — concept by VigApp",
  description:
    "Historic university concept with a crest and Latin motto, a searchable program finder across six faculties, research centres, an expandable admissions timeline, animated campus counters and an application countdown.",
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <DemoShell demoName="Northgate">
      <div className={`${display.variable} ${body.variable}`}>
        <Northgate locale={locale} />
      </div>
    </DemoShell>
  );
}
