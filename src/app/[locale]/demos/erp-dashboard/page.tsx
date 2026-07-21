import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { setRequestLocale } from "next-intl/server";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { DemoShell } from "@/components/demos/demo-shell";
import { Coreledger } from "@/demos/erp-dashboard/coreledger";

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--demo-sans",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--demo-mono",
});

export const metadata: Metadata = {
  title: "Coreledger — concept by VigApp",
  description:
    "Operations ERP command center concept: a working dashboard shell with switchable panels, sortable inventory, live order stream, animated finance chart and an alerts drawer.",
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <DemoShell demoName="Coreledger">
      <div
        className={`${sans.variable} ${mono.variable}`}
        style={
          {
            "--demo-display": "var(--demo-sans)",
            "--demo-body": "var(--demo-sans)",
          } as CSSProperties
        }
      >
        <Coreledger locale={locale} />
      </div>
    </DemoShell>
  );
}
