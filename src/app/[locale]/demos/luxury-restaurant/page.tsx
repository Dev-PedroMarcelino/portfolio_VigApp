import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { DemoShell } from "@/components/demos/demo-shell";
import { MaisonLumiereRoot } from "@/demos/luxury-restaurant/maison-lumiere";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--demo-display",
});
const body = Jost({ subsets: ["latin"], variable: "--demo-body" });

export const metadata: Metadata = {
  title: "Maison Lumière — concept by VigApp",
  description:
    "A candlelit fine-dining concept in São Paulo: seven tasting courses, a living wine cellar and a reservation experience designed by VigApp.",
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <DemoShell demoName="Maison Lumière">
      <div className={`${display.variable} ${body.variable}`}>
        <MaisonLumiereRoot locale={locale} />
      </div>
    </DemoShell>
  );
}
