import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Fraunces, Work_Sans } from "next/font/google";
import { DemoShell } from "@/components/demos/demo-shell";
import { FornoNeroRoot } from "@/demos/pizzeria/forno-nero";

const display = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--demo-display",
});
const body = Work_Sans({ subsets: ["latin"], variable: "--demo-body" });

export const metadata: Metadata = {
  title: "Forno Nero — concept by VigApp",
  description:
    "Neapolitan family pizzeria concept with a wood-fired menu, size-aware ordering and a working cart drawer.",
};

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <DemoShell demoName="Forno Nero">
      <div className={`${display.variable} ${body.variable}`}>
        <FornoNeroRoot locale={locale} />
      </div>
    </DemoShell>
  );
}
