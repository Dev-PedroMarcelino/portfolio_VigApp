import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Bungee, Space_Grotesk } from "next/font/google";
import { DemoShell } from "@/components/demos/demo-shell";
import { EmberStackRoot } from "@/demos/burger-restaurant/ember-stack";

const display = Bungee({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--demo-display",
});
const body = Space_Grotesk({ subsets: ["latin"], variable: "--demo-body" });

export const metadata: Metadata = {
  title: "Ember & Stack — concept by VigApp",
  description:
    "Loud smash-burger joint concept with a working cart, live combo builder and category-driven menu.",
};

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <DemoShell demoName="Ember & Stack">
      <div className={`${display.variable} ${body.variable}`}>
        <EmberStackRoot locale={locale} />
      </div>
    </DemoShell>
  );
}
