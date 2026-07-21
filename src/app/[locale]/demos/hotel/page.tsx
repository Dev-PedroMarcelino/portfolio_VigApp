import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Cormorant_Garamond, Karla } from "next/font/google";
import { DemoShell } from "@/components/demos/demo-shell";
import { SolaceRoot } from "@/demos/hotel/solace-root";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--demo-display",
});
const body = Karla({ subsets: ["latin"], variable: "--demo-body" });

export const metadata: Metadata = {
  title: "The Solace — concept by VigApp",
  description:
    "A forest retreat and spa concept: forty rooms wrapped in old-growth pine, a spring-fed spa and a live booking experience designed by VigApp.",
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <DemoShell demoName="The Solace">
      <div className={`${display.variable} ${body.variable}`}>
        <SolaceRoot locale={locale} />
      </div>
    </DemoShell>
  );
}
