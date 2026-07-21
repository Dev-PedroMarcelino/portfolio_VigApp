import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import { DemoShell } from "@/components/demos/demo-shell";
import { PratoRoot } from "@/demos/food-delivery/prato";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--demo-display",
});
const body = Inter({ subsets: ["latin"], variable: "--demo-body" });

export const metadata: Metadata = {
  title: "Prato — concept by VigApp",
  description:
    "Food delivery super-app concept with cuisine filters, a live floating cart and animated real-time order tracking.",
};

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <DemoShell demoName="Prato">
      <div className={`${display.variable} ${body.variable}`}>
        <PratoRoot locale={locale} />
      </div>
    </DemoShell>
  );
}
