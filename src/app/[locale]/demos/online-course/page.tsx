import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Fraunces, Inter } from "next/font/google";
import { DemoShell } from "@/components/demos/demo-shell";
import { Mentora } from "@/demos/online-course/mentora";

const display = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--demo-display",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--demo-body",
});

export const metadata: Metadata = {
  title: "Mentora — concept by VigApp",
  description:
    "A premium ten-week product design cohort concept: live curriculum accordion, solo and team pricing, an enrollment countdown and a working application flow.",
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <DemoShell demoName="Mentora">
      <div className={`${display.variable} ${body.variable}`}>
        <Mentora locale={locale} />
      </div>
    </DemoShell>
  );
}
