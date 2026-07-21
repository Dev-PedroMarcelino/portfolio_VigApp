import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Inter, Space_Grotesk } from "next/font/google";
import { DemoShell } from "@/components/demos/demo-shell";
import { Orbitflow } from "@/demos/enterprise-saas/orbitflow";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--demo-display",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--demo-body",
});

export const metadata: Metadata = {
  title: "Orbitflow — concept by VigApp",
  description:
    "Enterprise work-management SaaS concept with glassmorphism product UI, interactive kanban, integration search and localized pricing.",
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <DemoShell demoName="Orbitflow">
      <div className={`${display.variable} ${body.variable}`}>
        <Orbitflow locale={locale} />
      </div>
    </DemoShell>
  );
}
