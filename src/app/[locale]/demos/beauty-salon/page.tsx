import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Cormorant_Garamond, Karla } from "next/font/google";
import { DemoShell } from "@/components/demos/demo-shell";
import { EclatStudioRoot } from "@/demos/beauty-salon/eclat-studio";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--demo-display",
});
const body = Karla({ subsets: ["latin"], variable: "--demo-body" });

export const metadata: Metadata = {
  title: "Éclat Studio — concept by VigApp",
  description:
    "A blush-lit beauty atelier in São Paulo: unhurried hair, skin, nail and body rituals with a booking experience designed by VigApp.",
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <DemoShell demoName="Éclat Studio">
      <div className={`${display.variable} ${body.variable}`}>
        <EclatStudioRoot locale={locale} />
      </div>
    </DemoShell>
  );
}
