import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Archivo_Black, IBM_Plex_Mono } from "next/font/google";
import { DemoShell } from "@/components/demos/demo-shell";
import { VertexBuildRoot } from "@/demos/construction/vertex-build";

const display = Archivo_Black({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--demo-display",
});
const body = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--demo-body",
});

export const metadata: Metadata = {
  title: "Vertex Build — concept by VigApp",
  description:
    "A heavy-civil construction contractor concept: hazard-stripe hero, animated live project progress, expanding capabilities and a working quote request, designed by VigApp.",
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <DemoShell demoName="Vertex Build">
      <div className={`${display.variable} ${body.variable}`}>
        <VertexBuildRoot locale={locale} />
      </div>
    </DemoShell>
  );
}
